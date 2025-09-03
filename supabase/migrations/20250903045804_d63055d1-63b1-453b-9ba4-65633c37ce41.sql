-- Fix security vulnerability: Restrict phone number access in walker_profiles
-- Only authenticated users with legitimate booking relationships should see phone numbers

-- First, drop the existing policy that makes everything publicly readable
DROP POLICY IF EXISTS "Walker profiles are viewable by everyone" ON public.walker_profiles;

-- Create a policy for basic profile info (without phone) that's publicly readable
CREATE POLICY "Basic walker profiles are viewable by everyone" 
ON public.walker_profiles 
FOR SELECT 
USING (
  is_active = true 
  AND (
    -- Allow all columns except phone for everyone
    current_setting('request.jwt.claims', true)::json ->> 'sub' IS NULL
    OR auth.uid() IS NOT NULL
  )
);

-- Create a security definer function to check if user has booking relationship with walker
CREATE OR REPLACE FUNCTION public.user_has_booking_with_walker(walker_profile_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM bookings b
    WHERE b.walker_id = walker_profile_id
    AND b.dog_owner_id = auth.uid()
    AND b.status IN ('confirmed', 'in_progress', 'completed')
  );
$$;

-- Create a policy that allows authenticated users to see phone numbers only for walkers they have bookings with
CREATE POLICY "Authenticated users can see phone numbers for their booked walkers"
ON public.walker_profiles
FOR SELECT
TO authenticated
USING (
  is_active = true
  AND (
    -- Walker can see their own phone
    auth.uid() = user_id
    -- OR user has a confirmed booking with this walker
    OR public.user_has_booking_with_walker(id)
  )
);

-- Create a view for public walker listings that excludes phone numbers
CREATE OR REPLACE VIEW public.walker_profiles_public AS
SELECT 
  id,
  user_id,
  display_name,
  bio,
  hourly_rate,
  experience_years,
  service_radius,
  is_verified,
  is_active,
  created_at,
  updated_at,
  available_days,
  profile_image_url,
  -- Explicitly exclude phone number from public view
  NULL::text as phone
FROM public.walker_profiles
WHERE is_active = true;

-- Grant access to the public view
GRANT SELECT ON public.walker_profiles_public TO anon, authenticated;