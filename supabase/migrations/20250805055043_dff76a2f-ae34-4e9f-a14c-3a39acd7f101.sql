-- Create walker profiles table
CREATE TABLE public.walker_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  bio TEXT,
  hourly_rate DECIMAL(10,2),
  experience_years INTEGER,
  available_days TEXT[] DEFAULT '{}',
  service_radius INTEGER DEFAULT 5,
  phone TEXT,
  profile_image_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create dogs table
CREATE TABLE public.dogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  breed TEXT,
  age INTEGER,
  weight DECIMAL(5,2),
  size TEXT CHECK (size IN ('small', 'medium', 'large')),
  temperament TEXT,
  special_needs TEXT,
  medical_notes TEXT,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  walker_id UUID NOT NULL REFERENCES public.walker_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  service_type TEXT CHECK (service_type IN ('walk', 'sitting', 'overnight', 'daycare')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dog_owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  walker_id UUID NOT NULL REFERENCES public.walker_profiles(id) ON DELETE CASCADE,
  dog_id UUID NOT NULL REFERENCES public.dogs(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  special_instructions TEXT,
  total_price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  walker_id UUID NOT NULL REFERENCES public.walker_profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(booking_id)
);

-- Enable Row Level Security
ALTER TABLE public.walker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for walker_profiles
CREATE POLICY "Walker profiles are viewable by everyone" 
ON public.walker_profiles 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Users can create their own walker profile" 
ON public.walker_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own walker profile" 
ON public.walker_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for dogs
CREATE POLICY "Users can view their own dogs" 
ON public.dogs 
FOR SELECT 
USING (auth.uid() = owner_id);

CREATE POLICY "Users can create their own dogs" 
ON public.dogs 
FOR INSERT 
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own dogs" 
ON public.dogs 
FOR UPDATE 
USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own dogs" 
ON public.dogs 
FOR DELETE 
USING (auth.uid() = owner_id);

-- RLS Policies for services
CREATE POLICY "Services are viewable by everyone" 
ON public.services 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Walkers can create their own services" 
ON public.services 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.walker_profiles 
    WHERE id = walker_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Walkers can update their own services" 
ON public.services 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.walker_profiles 
    WHERE id = walker_id AND user_id = auth.uid()
  )
);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (
  auth.uid() = dog_owner_id OR 
  EXISTS (
    SELECT 1 FROM public.walker_profiles 
    WHERE id = walker_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Dog owners can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (auth.uid() = dog_owner_id);

CREATE POLICY "Users can update their related bookings" 
ON public.bookings 
FOR UPDATE 
USING (
  auth.uid() = dog_owner_id OR 
  EXISTS (
    SELECT 1 FROM public.walker_profiles 
    WHERE id = walker_id AND user_id = auth.uid()
  )
);

-- RLS Policies for reviews
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create reviews for their completed bookings" 
ON public.reviews 
FOR INSERT 
WITH CHECK (
  auth.uid() = reviewer_id AND
  EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE id = booking_id AND dog_owner_id = auth.uid() AND status = 'completed'
  )
);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_walker_profiles_updated_at
    BEFORE UPDATE ON public.walker_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dogs_updated_at
    BEFORE UPDATE ON public.dogs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();