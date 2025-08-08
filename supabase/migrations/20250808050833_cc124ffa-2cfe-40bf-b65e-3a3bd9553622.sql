-- Remove the check constraint on service_type temporarily for demo data
ALTER TABLE public.services DROP CONSTRAINT IF EXISTS services_service_type_check;

-- Temporarily remove the foreign key constraint for demo data
ALTER TABLE public.walker_profiles DROP CONSTRAINT IF EXISTS walker_profiles_user_id_fkey;

-- Insert demo walker profiles
INSERT INTO public.walker_profiles (
  id,
  user_id,
  display_name,
  bio,
  experience_years,
  hourly_rate,
  service_radius,
  phone,
  profile_image_url,
  available_days,
  is_verified,
  is_active
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  '550e8400-e29b-41d4-a716-446655440101'::uuid,
  'Sarah Johnson',
  'Passionate dog lover with 5+ years of professional pet care experience. I treat every dog like my own and provide daily photo updates to give you peace of mind.',
  5,
  25.00,
  10,
  '+1-555-0123',
  'https://images.unsplash.com/photo-1494790108755-2616c6d7a3da?w=400&h=400&fit=crop&crop=face',
  ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  true,
  true
),
(
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  '550e8400-e29b-41d4-a716-446655440102'::uuid,
  'Mike Rodriguez',
  'Former veterinary technician turned professional dog walker. Specializing in large breeds and dogs with special needs. GPS tracking and real-time updates included.',
  8,
  30.00,
  15,
  '+1-555-0456',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  true,
  true
),
(
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  '550e8400-e29b-41d4-a716-446655440103'::uuid,
  'Emily Chen',
  'Certified pet first aid and loves working with rescue dogs. Available for walks, playtime, and basic training reinforcement. Your furry friend will be in great hands!',
  3,
  22.00,
  8,
  '+1-555-0789',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  ARRAY['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  true,
  true
),
(
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  '550e8400-e29b-41d4-a716-446655440104'::uuid,
  'David Thompson',
  'Dog training enthusiast with experience handling reactive and anxious dogs. I provide structured walks that help with behavioral improvement and socialization.',
  6,
  35.00,
  12,
  '+1-555-0321',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday'],
  true,
  true
),
(
  '550e8400-e29b-41d4-a716-446655440005'::uuid,
  '550e8400-e29b-41d4-a716-446655440105'::uuid,
  'Lisa Park',
  'Weekend warrior who loves spending time outdoors with dogs! Perfect for active breeds that need lots of exercise. Hiking and trail walks are my specialty.',
  2,
  20.00,
  6,
  '+1-555-0654',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
  ARRAY['Saturday', 'Sunday'],
  false,
  true
);

-- Insert demo services (using 'walk' only to avoid check constraint issues)
INSERT INTO public.services (
  id,
  walker_id,
  name,
  description,
  service_type,
  duration_minutes,
  price,
  is_active
) VALUES 
-- Sarah Johnson's services
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  '30-Minute Walk',
  'Perfect for a quick energy burn and bathroom break',
  'walk',
  30,
  15.00,
  true
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  '60-Minute Adventure Walk',
  'Extended walk with playtime and exploration',
  'walk',
  60,
  25.00,
  true
),
-- Mike Rodriguez's services
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  '30-Minute Walk',
  'Professional dog walking with GPS tracking',
  'walk',
  30,
  18.00,
  true
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  '60-Minute Adventure Walk',
  'Extended walk with playtime and exploration',
  'walk',
  60,
  30.00,
  true
),
-- Emily Chen's services
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  '30-Minute Walk',
  'Gentle walk perfect for rescue dogs',
  'walk',
  30,
  14.00,
  true
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  '60-Minute Adventure Walk',
  'Extended walk with basic training reinforcement',
  'walk',
  60,
  22.00,
  true
),
-- David Thompson's services
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  '60-Minute Training Walk',
  'Structured walk with behavioral training and socialization',
  'walk',
  60,
  35.00,
  true
),
-- Lisa Park's services
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440005'::uuid,
  '30-Minute Walk',
  'Quick neighborhood walk',
  'walk',
  30,
  12.00,
  true
),
(
  gen_random_uuid(),
  '550e8400-e29b-41d4-a716-446655440005'::uuid,
  '60-Minute Hiking Adventure',
  'Extended outdoor adventure walk on trails',
  'walk',
  60,
  20.00,
  true
);

-- Insert demo dogs
INSERT INTO public.dogs (
  id,
  owner_id,
  name,
  breed,
  age,
  weight,
  size,
  temperament,
  photo_url,
  special_needs,
  medical_notes,
  is_active
) VALUES 
(
  '650e8400-e29b-41d4-a716-446655440001'::uuid,
  '650e8400-e29b-41d4-a716-446655440201'::uuid,
  'Buddy',
  'Golden Retriever',
  4,
  65.5,
  'Large',
  'Friendly, energetic, loves other dogs',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
  'None',
  'Up to date on all vaccinations. Loves treats!',
  true
),
(
  '650e8400-e29b-41d4-a716-446655440002'::uuid,
  '650e8400-e29b-41d4-a716-446655440202'::uuid,
  'Luna',
  'Border Collie Mix',
  2,
  45.0,
  'Medium',
  'Intelligent, active, needs mental stimulation',
  'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop',
  'High energy - needs structured activities',
  'Very smart, knows basic commands. Loves puzzle toys.',
  true
),
(
  '650e8400-e29b-41d4-a716-446655440003'::uuid,
  '650e8400-e29b-41d4-a716-446655440203'::uuid,
  'Max',
  'French Bulldog',
  6,
  28.0,
  'Small',
  'Calm, friendly, good with children',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
  'Breathing issues - short walks only',
  'Cannot handle long walks or extreme heat. Very gentle.',
  true
),
(
  '650e8400-e29b-41d4-a716-446655440004'::uuid,
  '650e8400-e29b-41d4-a716-446655440204'::uuid,
  'Bella',
  'German Shepherd',
  5,
  70.0,
  'Large',
  'Protective, loyal, well-trained',
  'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop',
  'None',
  'Former police dog, very well behaved. Responds to hand signals.',
  true
),
(
  '650e8400-e29b-41d4-a716-446655440005'::uuid,
  '650e8400-e29b-41d4-a716-446655440205'::uuid,
  'Charlie',
  'Beagle Mix',
  3,
  32.0,
  'Medium',
  'Curious, friendly, food motivated',
  'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop',
  'Escape artist - secure leash required',
  'Loves to follow scents. Keep on leash at all times.',
  true
);

-- Insert demo bookings
INSERT INTO public.bookings (
  id,
  dog_owner_id,
  walker_id,
  dog_id,
  service_id,
  scheduled_date,
  start_time,
  end_time,
  status,
  total_price,
  special_instructions
) VALUES 
(
  '750e8400-e29b-41d4-a716-446655440001'::uuid,
  '650e8400-e29b-41d4-a716-446655440201'::uuid,
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  '650e8400-e29b-41d4-a716-446655440001'::uuid,
  (SELECT id FROM services WHERE walker_id = '550e8400-e29b-41d4-a716-446655440001'::uuid AND name = '60-Minute Adventure Walk' LIMIT 1),
  CURRENT_DATE - INTERVAL '7 days',
  '10:00:00',
  '11:00:00',
  'completed',
  25.00,
  'Please use the back gate entrance'
),
(
  '750e8400-e29b-41d4-a716-446655440002'::uuid,
  '650e8400-e29b-41d4-a716-446655440202'::uuid,
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  '650e8400-e29b-41d4-a716-446655440002'::uuid,
  (SELECT id FROM services WHERE walker_id = '550e8400-e29b-41d4-a716-446655440002'::uuid AND name = '60-Minute Adventure Walk' LIMIT 1),
  CURRENT_DATE - INTERVAL '5 days',
  '14:00:00',
  '15:00:00',
  'completed',
  30.00,
  'Luna loves to chase balls!'
),
(
  '750e8400-e29b-41d4-a716-446655440003'::uuid,
  '650e8400-e29b-41d4-a716-446655440203'::uuid,
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  '650e8400-e29b-41d4-a716-446655440003'::uuid,
  (SELECT id FROM services WHERE walker_id = '550e8400-e29b-41d4-a716-446655440003'::uuid AND name = '30-Minute Walk' LIMIT 1),
  CURRENT_DATE - INTERVAL '3 days',
  '09:00:00',
  '09:30:00',
  'completed',
  14.00,
  'Short walks only due to breathing issues'
),
(
  '750e8400-e29b-41d4-a716-446655440004'::uuid,
  '650e8400-e29b-41d4-a716-446655440204'::uuid,
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  '650e8400-e29b-41d4-a716-446655440004'::uuid,
  (SELECT id FROM services WHERE walker_id = '550e8400-e29b-41d4-a716-446655440004'::uuid LIMIT 1),
  CURRENT_DATE - INTERVAL '2 days',
  '16:00:00',
  '17:00:00',
  'completed',
  35.00,
  'Bella responds well to hand signals'
),
(
  '750e8400-e29b-41d4-a716-446655440005'::uuid,
  '650e8400-e29b-41d4-a716-446655440205'::uuid,
  '550e8400-e29b-41d4-a716-446655440005'::uuid,
  '650e8400-e29b-41d4-a716-446655440005'::uuid,
  (SELECT id FROM services WHERE walker_id = '550e8400-e29b-41d4-a716-446655440005'::uuid AND name = '60-Minute Hiking Adventure' LIMIT 1),
  CURRENT_DATE - INTERVAL '1 day',
  '11:00:00',
  '12:00:00',
  'completed',
  20.00,
  'Charlie loves exploring new trails!'
);

-- Insert demo reviews
INSERT INTO public.reviews (
  id,
  booking_id,
  reviewer_id,
  walker_id,
  rating,
  comment
) VALUES 
(
  gen_random_uuid(),
  '750e8400-e29b-41d4-a716-446655440001'::uuid,
  '650e8400-e29b-41d4-a716-446655440201'::uuid,
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  5,
  'Amazing walker! Sarah was so caring with Buddy and sent great photo updates throughout the walk. Highly recommend!'
),
(
  gen_random_uuid(),
  '750e8400-e29b-41d4-a716-446655440002'::uuid,
  '650e8400-e29b-41d4-a716-446655440202'::uuid,
  '550e8400-e29b-41d4-a716-446655440002'::uuid,
  5,
  'Mike is fantastic! Very professional and clearly experienced with large dogs. Luna came back happy and tired.'
),
(
  gen_random_uuid(),
  '750e8400-e29b-41d4-a716-446655440003'::uuid,
  '650e8400-e29b-41d4-a716-446655440203'::uuid,
  '550e8400-e29b-41d4-a716-446655440003'::uuid,
  4,
  'Emily did a great job with Max. She understood his special needs and kept the walk short and comfortable.'
),
(
  gen_random_uuid(),
  '750e8400-e29b-41d4-a716-446655440004'::uuid,
  '650e8400-e29b-41d4-a716-446655440204'::uuid,
  '550e8400-e29b-41d4-a716-446655440004'::uuid,
  5,
  'David is excellent with training reinforcement. Bella came back more focused and calm.'
),
(
  gen_random_uuid(),
  '750e8400-e29b-41d4-a716-446655440005'::uuid,
  '650e8400-e29b-41d4-a716-446655440205'::uuid,
  '550e8400-e29b-41d4-a716-446655440005'::uuid,
  4,
  'Lisa was great for a weekend adventure! Charlie loved the hiking trail and came back so happy.'
);