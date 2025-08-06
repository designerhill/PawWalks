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
  gen_random_uuid(),
  gen_random_uuid(),
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
  gen_random_uuid(),
  gen_random_uuid(),
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
  gen_random_uuid(),
  gen_random_uuid(),
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
  gen_random_uuid(),
  gen_random_uuid(),
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
  gen_random_uuid(),
  gen_random_uuid(),
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

-- Get walker IDs for services
WITH walker_data AS (
  SELECT id, display_name FROM walker_profiles WHERE display_name IN ('Sarah Johnson', 'Mike Rodriguez', 'Emily Chen', 'David Thompson', 'Lisa Park')
)

-- Insert demo services
INSERT INTO public.services (
  id,
  walker_id,
  name,
  description,
  service_type,
  duration_minutes,
  price,
  is_active
) 
SELECT 
  gen_random_uuid(),
  wd.id,
  service_name,
  service_description,
  service_type_val,
  duration,
  price_val,
  true
FROM walker_data wd
CROSS JOIN (
  VALUES 
    ('30-Minute Walk', 'Perfect for a quick energy burn and bathroom break', 'walk', 30, 15.00),
    ('60-Minute Adventure Walk', 'Extended walk with playtime and exploration', 'walk', 60, 25.00),
    ('Drop-in Visit', 'Quick check-in with feeding and bathroom break', 'visit', 15, 12.00)
) AS services(service_name, service_description, service_type_val, duration, price_val)
WHERE 
  (wd.display_name = 'Sarah Johnson') OR
  (wd.display_name = 'Mike Rodriguez') OR
  (wd.display_name = 'Emily Chen' AND service_name != 'Drop-in Visit') OR
  (wd.display_name = 'David Thompson' AND service_name = '60-Minute Adventure Walk') OR
  (wd.display_name = 'Lisa Park' AND service_name IN ('30-Minute Walk', '60-Minute Adventure Walk'));

-- Insert demo dogs (these will be for demo user IDs)
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
  gen_random_uuid(),
  gen_random_uuid(),
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
  gen_random_uuid(),
  gen_random_uuid(),
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
  gen_random_uuid(),
  gen_random_uuid(),
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
  gen_random_uuid(),
  gen_random_uuid(),
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
  gen_random_uuid(),
  gen_random_uuid(),
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

-- Insert demo reviews
WITH walker_data AS (
  SELECT id, display_name FROM walker_profiles LIMIT 5
),
demo_bookings AS (
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
  )
  SELECT 
    gen_random_uuid(),
    gen_random_uuid(),
    wd.id,
    (SELECT id FROM dogs ORDER BY random() LIMIT 1),
    (SELECT id FROM services WHERE walker_id = wd.id ORDER BY random() LIMIT 1),
    CURRENT_DATE - INTERVAL '7 days',
    '10:00:00',
    '11:00:00',
    'completed',
    25.00,
    'Please use the back gate entrance'
  FROM walker_data wd
  RETURNING id, dog_owner_id, walker_id
)
INSERT INTO public.reviews (
  id,
  booking_id,
  reviewer_id,
  walker_id,
  rating,
  comment
)
SELECT 
  gen_random_uuid(),
  db.id,
  db.dog_owner_id,
  db.walker_id,
  rating_val,
  comment_text
FROM demo_bookings db
CROSS JOIN (
  VALUES 
    (5, 'Amazing walker! Sarah was so caring with Buddy and sent great photo updates throughout the walk. Highly recommend!'),
    (5, 'Mike is fantastic! Very professional and clearly experienced with large dogs. Bella came back happy and tired.'),
    (4, 'Emily did a great job with Luna. She understood her high energy needs and gave her a good workout.'),
    (5, 'David is excellent with training reinforcement. Charlie came back more focused and calm.'),
    (4, 'Lisa was great for a weekend adventure! Perfect for active dogs who need extra exercise.')
) AS review_data(rating_val, comment_text);