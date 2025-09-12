-- Fix security vulnerability: Remove public access to walker profiles with phone numbers
-- Only allow authenticated users with legitimate relationships to view walker profiles

DROP POLICY IF EXISTS "Walker profiles with conditional phone access" ON public.walker_profiles;

-- Create new policy that requires authentication for viewing walker profiles
CREATE POLICY "Authenticated users can view walker profiles" 
ON public.walker_profiles 
FOR SELECT 
USING (
  (is_active = true) AND (
    -- Walker can see their own profile
    (auth.uid() = user_id) OR 
    -- Authenticated users who have bookings with this walker can see full profile
    ((auth.uid() IS NOT NULL) AND user_has_booking_with_walker(id)) OR
    -- Admins can see all profiles
    is_admin()
  )
);

-- Create a separate policy for public viewing with limited information (no phone numbers)
-- This will be handled at the application level by selecting only safe fields