-- Fix the security definer view issue by removing it and using proper RLS policies instead

-- Drop the problematic view
DROP VIEW IF EXISTS public.walker_profiles_public;

-- Update the RLS policies to properly handle phone number visibility
-- Drop existing policies first
DROP POLICY IF EXISTS "Basic walker profiles are viewable by everyone" ON public.walker_profiles;
DROP POLICY IF EXISTS "Authenticated users can see phone numbers for their booked walkers" ON public.walker_profiles;

-- Create a single comprehensive policy that handles phone number visibility
CREATE POLICY "Walker profiles with conditional phone access" 
ON public.walker_profiles 
FOR SELECT 
USING (
  is_active = true 
  AND (
    -- Case 1: User is the walker themselves (can see their own phone)
    auth.uid() = user_id
    -- Case 2: User has a booking relationship (can see phone)
    OR (
      auth.uid() IS NOT NULL 
      AND public.user_has_booking_with_walker(id)
    )
    -- Case 3: Public access (phone will be NULL in application logic)
    OR auth.uid() IS NULL
  )
);