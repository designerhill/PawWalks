-- Add approval fields to walker_profiles
ALTER TABLE public.walker_profiles 
ADD COLUMN approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
ADD COLUMN approved_by UUID REFERENCES auth.users(id),
ADD COLUMN approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN rejection_reason TEXT;

-- Create admin functions for walker management
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = $1 AND profiles.user_type = 'admin'
  );
$$;

-- Update RLS policies for admin access to walker profiles
CREATE POLICY "Admins can view all walker profiles" 
ON public.walker_profiles 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can update walker profiles" 
ON public.walker_profiles 
FOR UPDATE 
USING (public.is_admin());

-- Create policy for admin access to all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin() OR auth.uid() = user_id OR true);

-- Create policy for admin access to all bookings
CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (public.is_admin());

-- Update services policy for admin access
DROP POLICY IF EXISTS "Services are viewable by everyone" ON public.services;
CREATE POLICY "Services are viewable by everyone" 
ON public.services 
FOR SELECT 
USING (public.is_admin() OR is_active = true);