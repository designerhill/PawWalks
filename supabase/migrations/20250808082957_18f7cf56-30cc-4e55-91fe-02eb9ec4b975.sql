-- Insert demo walker profile using your user ID
INSERT INTO walker_profiles (id, user_id, display_name, bio, hourly_rate, experience_years, service_radius, phone, available_days, is_verified, is_active) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'Sarah Johnson', 'Experienced dog walker with 5 years of experience. I love all breeds and sizes!', 25.00, 5, 10, '+1234567890', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], true, true);

-- Insert demo services for the walker
INSERT INTO services (id, walker_id, name, description, service_type, duration_minutes, price, is_active) VALUES
('a47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '30-Minute Walk', 'Perfect for daily exercise and bathroom breaks', 'walk', 30, 15.00, true),
('a47ac10b-58cc-4372-a567-0e02b2c3d480', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', '60-Minute Adventure Walk', 'Extended walk with playtime at the park', 'walk', 60, 25.00, true);

-- Insert additional demo dogs with correct size values
INSERT INTO dogs (id, owner_id, name, breed, age, weight, size, temperament, special_needs, medical_notes, photo_url, is_active) VALUES
('d47ac10b-58cc-4372-a567-0e02b2c3d480', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'Luna', 'Border Collie', 2, 45.0, 'medium', 'Intelligent and active', 'Needs mental stimulation', 'Very smart, likes puzzle toys', null, true),
('d47ac10b-58cc-4372-a567-0e02b2c3d481', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'Max', 'French Bulldog', 5, 28.0, 'small', 'Calm and gentle', 'Breathing issues in hot weather', 'Cannot walk long distances in summer', null, true);

-- Insert demo bookings
INSERT INTO bookings (id, dog_owner_id, walker_id, dog_id, service_id, scheduled_date, start_time, end_time, special_instructions, status, total_price) VALUES
('b47ac10b-58cc-4372-a567-0e02b2c3d479', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d480', 'a47ac10b-58cc-4372-a567-0e02b2c3d479', '2025-08-10', '14:00:00', '14:30:00', 'Luna loves to fetch!', 'confirmed', 15.00),
('b47ac10b-58cc-4372-a567-0e02b2c3d480', 'bbcd6e5d-f19c-40d7-b551-dd7abe5db2e0', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d481', 'a47ac10b-58cc-4372-a567-0e02b2c3d480', '2025-08-11', '10:00:00', '11:00:00', 'Max gets tired easily', 'pending', 25.00);