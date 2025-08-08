-- Insert demo walker profiles with valid user IDs
INSERT INTO walker_profiles (id, user_id, display_name, bio, hourly_rate, experience_years, service_radius, phone, available_days, is_verified, is_active) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'Sarah Johnson', 'Experienced dog walker with 5 years of experience. I love all breeds and sizes!', 25.00, 5, 10, '+1234567890', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], true, true),
('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e1', 'Mike Chen', 'Professional pet care specialist. Great with anxious and energetic dogs.', 30.00, 3, 8, '+1234567891', ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday'], true, true),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e2', 'Emma Wilson', 'Dog lover and trainer. Specializing in puppy walks and senior dog care.', 28.00, 4, 12, '+1234567892', ARRAY['Tuesday', 'Thursday', 'Saturday', 'Sunday'], true, true);

-- Insert demo services for the walkers
INSERT INTO services (id, walker_id, name, description, service_type, duration_minutes, price, is_active) VALUES
('a47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '30-Minute Walk', 'Perfect for daily exercise and bathroom breaks', 'walk', 30, 15.00, true),
('a47ac10b-58cc-4372-a567-0e02b2c3d480', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '60-Minute Adventure Walk', 'Extended walk with playtime at the park', 'walk', 60, 25.00, true),
('a47ac10b-58cc-4372-a567-0e02b2c3d481', 'f47ac10b-58cc-4372-a567-0e02b2c3d480', 'Premium Dog Walk', 'Professional walk with photo updates', 'walk', 45, 22.00, true),
('a47ac10b-58cc-4372-a567-0e02b2c3d482', 'f47ac10b-58cc-4372-a567-0e02b2c3d480', 'Puppy Training Walk', 'Gentle walk focused on training and socialization', 'training', 30, 18.00, true),
('a47ac10b-58cc-4372-a567-0e02b2c3d483', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Senior Dog Care Walk', 'Slow-paced walk perfect for older dogs', 'walk', 25, 16.00, true),
('a47ac10b-58cc-4372-a567-0e02b2c3d484', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Pet Sitting Visit', 'Home visit for feeding and companionship', 'sitting', 30, 20.00, true);

-- Insert demo dogs for the current user
INSERT INTO dogs (id, owner_id, name, breed, age, weight, size, temperament, special_needs, medical_notes, photo_url, is_active) VALUES
('d47ac10b-58cc-4372-a567-0e02b2c3d479', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'Buddy', 'Golden Retriever', 3, 65.5, 'Large', 'Friendly and energetic', 'None', 'Gets excited around other dogs', null, true),
('d47ac10b-58cc-4372-a567-0e02b2c3d480', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'Luna', 'Border Collie', 2, 45.0, 'Medium', 'Intelligent and active', 'Needs mental stimulation', 'Very smart, likes puzzle toys', null, true),
('d47ac10b-58cc-4372-a567-0e02b2c3d481', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'Max', 'French Bulldog', 5, 28.0, 'Small', 'Calm and gentle', 'Breathing issues in hot weather', 'Cannot walk long distances in summer', null, true);

-- Insert demo bookings
INSERT INTO bookings (id, dog_owner_id, walker_id, dog_id, service_id, scheduled_date, start_time, end_time, special_instructions, status, total_price) VALUES
('b47ac10b-58cc-4372-a567-0e02b2c3d479', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d479', 'a47ac10b-58cc-4372-a567-0e02b2c3d479', '2025-08-10', '14:00:00', '14:30:00', 'Buddy loves to fetch!', 'confirmed', 15.00),
('b47ac10b-58cc-4372-a567-0e02b2c3d480', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'f47ac10b-58cc-4372-a567-0e02b2c3d480', 'd47ac10b-58cc-4372-a567-0e02b2c3d480', 'a47ac10b-58cc-4372-a567-0e02b2c3d481', '2025-08-11', '10:00:00', '10:45:00', 'Luna needs lots of exercise', 'pending', 22.00),
('b47ac10b-58cc-4372-a567-0e02b2c3d481', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'd47ac10b-58cc-4372-a567-0e02b2c3d481', 'a47ac10b-58cc-4372-a567-0e02b2c3d483', '2025-08-09', '16:00:00', '16:25:00', 'Short walk, Max gets tired easily', 'completed', 16.00);

-- Insert a demo review
INSERT INTO reviews (id, booking_id, reviewer_id, walker_id, rating, comment) VALUES
('r47ac10b-58cc-4372-a567-0e02b2c3d479', 'b47ac10b-58cc-4372-a567-0e02b2c3d481', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 5, 'Emma was wonderful with Max! Very gentle and understanding of his needs.');