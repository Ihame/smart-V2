-- Comprehensive Sample Data for SmartGarage
-- This creates realistic sample data for testing and demonstration

-- First, let's create some sample users (these will be created via the auth system)
-- We'll insert profiles for them after they're created

-- Insert comprehensive sample community posts
INSERT INTO community_posts (user_id, content, created_at) VALUES
-- We'll use placeholder UUIDs - these will need to be updated with real user IDs after registration
('00000000-0000-0000-0000-000000000001', 'Welcome to the SmartGarage community! Just bought my first Tesla Model 3 and excited to connect with fellow EV owners in Rwanda! 🚗⚡', NOW() - INTERVAL '5 days'),
('00000000-0000-0000-0000-000000000002', 'Just completed my virtual diagnosis with SmartGarage - absolutely amazing service! They identified my Prius battery issue remotely and saved me a trip to Kigali. Worth every franc! 💯', NOW() - INTERVAL '4 days'),
('00000000-0000-0000-0000-000000000003', 'Question for the community: Does anyone have experience with hybrid battery replacement costs in Rwanda? My Honda Insight is showing some warning signs and I want to budget properly.', NOW() - INTERVAL '3 days'),
('00000000-0000-0000-0000-000000000001', 'Update on my Tesla: The SmartGarage team helped me optimize my charging schedule. Now getting 15% better range! Their AI battery prediction was spot on. 🔋', NOW() - INTERVAL '2 days'),
('00000000-0000-0000-0000-000000000004', 'Shoutout to SmartGarage for helping me find genuine Nissan Leaf parts! Took only 2 days through their Spares Hunter service. Excellent work! 👏', NOW() - INTERVAL '1 day'),
('00000000-0000-0000-0000-000000000002', 'Pro tip: If you own a BMW i3, make sure to use the SmartGarage OBD scanner recommendations. The diagnostic data is incredibly detailed compared to generic scanners.', NOW() - INTERVAL '12 hours'),
('00000000-0000-0000-0000-000000000005', 'New to EVs - just got a Hyundai Ioniq 5. Any maintenance tips from experienced owners? The SmartGarage community seems very knowledgeable! 🤝', NOW() - INTERVAL '6 hours'),
('00000000-0000-0000-0000-000000000003', 'SmartGarage virtual diagnosis saved me 200,000 RWF! They correctly identified that my "battery issue" was actually a faulty sensor. Amazing AI technology! 🤖', NOW() - INTERVAL '3 hours'),
('00000000-0000-0000-0000-000000000006', 'For garage owners: The SmartGarage ERP system is a game-changer. Our efficiency increased by 40% and customer satisfaction is through the roof! 📈', NOW() - INTERVAL '2 hours'),
('00000000-0000-0000-0000-000000000004', 'Just used the AI Battery Prediction service - mind blown! 🤯 They predicted my Prius battery would need attention in 6 months, and provided a detailed maintenance plan. Worth every penny!', NOW() - INTERVAL '1 hour'),
('00000000-0000-0000-0000-000000000007', 'Calling all Kigali EV owners! Let''s organize a meetup to share experiences and tips. SmartGarage community is growing fast! 🚗💨', NOW() - INTERVAL '30 minutes'),
('00000000-0000-0000-0000-000000000005', 'Question: Has anyone tried the SmartGarage OBD scanners on a Volkswagen ID.4? Looking to purchase one and want real user feedback.', NOW() - INTERVAL '15 minutes'),
('00000000-0000-0000-0000-000000000008', 'SmartGarage team: Thank you for the excellent service! My Mercedes EQC diagnostics were completed professionally and the follow-up support was outstanding. 5 stars! ⭐⭐⭐⭐⭐', NOW() - INTERVAL '5 minutes');

-- Insert sample virtual diagnosis requests
INSERT INTO virtual_diagnosis_requests (user_id, vehicle_brand, vehicle_model, vehicle_year, issue_description, contact_phone, status, created_at) VALUES
('00000000-0000-0000-0000-000000000001', 'Tesla', 'Model 3', 2022, 'Battery charging seems slower than usual, taking 2+ hours longer to reach full charge. No error messages displayed.', '+250788123456', 'completed', NOW() - INTERVAL '5 days'),
('00000000-0000-0000-0000-000000000002', 'Toyota', 'Prius', 2020, 'Hybrid system warning light appeared yesterday. Car still drives but fuel efficiency dropped significantly.', '+250788234567', 'completed', NOW() - INTERVAL '4 days'),
('00000000-0000-0000-0000-000000000003', 'Honda', 'Insight', 2021, 'Strange noise from electric motor during acceleration. Happens mostly when battery is below 30%.', '+250788345678', 'in_progress', NOW() - INTERVAL '3 days'),
('00000000-0000-0000-0000-000000000004', 'Nissan', 'Leaf', 2023, 'Rapid charging not working at public stations. Home charging works fine. Need urgent diagnosis.', '+250788456789', 'completed', NOW() - INTERVAL '2 days'),
('00000000-0000-0000-0000-000000000005', 'Hyundai', 'Ioniq 5', 2023, 'Dashboard showing "Check EV System" message. Performance seems normal but concerned about warranty.', '+250788567890', 'pending', NOW() - INTERVAL '1 day'),
('00000000-0000-0000-0000-000000000006', 'BMW', 'i3', 2022, 'Range extender engine not starting automatically. Pure electric mode works perfectly.', '+250788678901', 'in_progress', NOW() - INTERVAL '12 hours');

-- Insert sample battery prediction requests
INSERT INTO battery_prediction_requests (user_id, vehicle_brand, vehicle_model, vehicle_year, daily_usage_km, charging_method, contact_phone, status, created_at) VALUES
('00000000-0000-0000-0000-000000000001', 'Tesla', 'Model 3', 2022, 85, 'Home AC Charging (Level 2)', '+250788123456', 'completed', NOW() - INTERVAL '6 days'),
('00000000-0000-0000-0000-000000000002', 'Toyota', 'Prius', 2020, 45, 'Mixed Charging Methods', '+250788234567', 'completed', NOW() - INTERVAL '5 days'),
('00000000-0000-0000-0000-000000000007', 'Mercedes', 'EQC', 2023, 120, 'DC Fast Charging', '+250788789012', 'completed', NOW() - INTERVAL '3 days'),
('00000000-0000-0000-0000-000000000008', 'Audi', 'e-tron', 2022, 95, 'Home AC Charging (Level 2)', '+250788890123', 'in_progress', NOW() - INTERVAL '2 days'),
('00000000-0000-0000-0000-000000000003', 'Honda', 'Insight', 2021, 60, 'Home AC Charging (Level 1)', '+250788345678', 'pending', NOW() - INTERVAL '1 day');

-- Insert sample smart car reminders
INSERT INTO smart_car_reminders (user_id, title, message, reminder_type, due_date, is_read, created_at) VALUES
('00000000-0000-0000-0000-000000000001', 'Battery Health Check Due', 'Based on your Tesla Model 3 usage patterns (85km daily), we recommend a comprehensive battery health check. This will help optimize performance and extend battery life.', 'service', CURRENT_DATE + INTERVAL '7 days', false, NOW() - INTERVAL '2 days'),
('00000000-0000-0000-0000-000000000002', 'Annual Technical Inspection', 'Your Toyota Prius annual technical inspection expires on March 15th. Please schedule your appointment to avoid penalties. We can recommend certified inspection centers.', 'inspection', '2024-03-15', false, NOW() - INTERVAL '1 day'),
('00000000-0000-0000-0000-000000000003', 'Hybrid System Maintenance', 'Your Honda Insight has reached 50,000km. Time for hybrid system maintenance including coolant check, air filter replacement, and software updates.', 'maintenance', CURRENT_DATE + INTERVAL '14 days', true, NOW() - INTERVAL '3 days'),
('00000000-0000-0000-0000-000000000004', 'Charging Port Cleaning', 'Regular charging port maintenance is recommended every 6 months for your Nissan Leaf. This prevents corrosion and ensures optimal charging speeds.', 'maintenance', CURRENT_DATE + INTERVAL '5 days', false, NOW() - INTERVAL '1 day'),
('00000000-0000-0000-0000-000000000005', 'Software Update Available', 'Hyundai has released a software update for your Ioniq 5 that improves charging efficiency by up to 8%. Schedule an appointment for installation.', 'service', CURRENT_DATE + INTERVAL '10 days', false, NOW() - INTERVAL '6 hours'),
('00000000-0000-0000-0000-000000000006', 'Brake Fluid Check', 'BMW i3 brake fluid should be checked every 2 years. Your vehicle is approaching this milestone. Regenerative braking systems require specific brake fluid types.', 'maintenance', CURRENT_DATE + INTERVAL '21 days', false, NOW() - INTERVAL '12 hours'),
('00000000-0000-0000-0000-000000000007', 'Tire Rotation Reminder', 'Your Mercedes EQC has completed 15,000km. Time for tire rotation to ensure even wear. EV tires wear differently due to instant torque delivery.', 'maintenance', CURRENT_DATE + INTERVAL '3 days', true, NOW() - INTERVAL '2 days'),
('00000000-0000-0000-0000-000000000008', 'Cabin Air Filter', 'Audi e-tron cabin air filter replacement is due. Clean air filters improve HVAC efficiency and reduce battery drain during climate control use.', 'maintenance', CURRENT_DATE + INTERVAL '7 days', false, NOW() - INTERVAL '8 hours');

-- Insert sample spare parts requests
INSERT INTO spare_parts_requests (user_id, vehicle_brand, vehicle_model, vehicle_year, part_description, contact_phone, status, created_at) VALUES
('00000000-0000-0000-0000-000000000004', 'Nissan', 'Leaf', 2023, 'Original charging cable (Type 2 to household plug) - mine got damaged during transport', '+250788456789', 'completed', NOW() - INTERVAL '3 days'),
('00000000-0000-0000-0000-000000000001', 'Tesla', 'Model 3', 2022, 'Door handle mechanism (front passenger side) - not extending properly', '+250788123456', 'in_progress', NOW() - INTERVAL '2 days'),
('00000000-0000-0000-0000-000000000007', 'Mercedes', 'EQC', 2023, 'Air suspension compressor - getting error codes related to air suspension system', '+250788789012', 'pending', NOW() - INTERVAL '1 day'),
('00000000-0000-0000-0000-000000000005', 'Hyundai', 'Ioniq 5', 2023, 'Side mirror with blind spot monitoring (left side) - damaged in parking incident', '+250788567890', 'completed', NOW() - INTERVAL '4 days'),
('00000000-0000-0000-0000-000000000008', 'Audi', 'e-tron', 2022, 'Brake pads (front set) - need genuine Audi parts for optimal regenerative braking performance', '+250788890123', 'in_progress', NOW() - INTERVAL '1 day');

-- Note: The user_id values used here are placeholders. 
-- In a real scenario, you would:
-- 1. Register actual users through the application
-- 2. Get their real UUIDs from the auth.users table
-- 3. Update these records with the correct user_id values

-- To update with real user IDs after registration, you can use queries like:
-- UPDATE community_posts SET user_id = 'real-uuid-here' WHERE user_id = '00000000-0000-0000-0000-000000000001';

-- You can also create a function to help with this:
CREATE OR REPLACE FUNCTION update_sample_data_user_ids()
RETURNS TEXT AS $$
DECLARE
    result TEXT := 'Sample data user IDs need to be updated manually with real user UUIDs after registration.';
BEGIN
    -- This function serves as a reminder that user IDs need to be updated
    -- after real users register in the system
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Create some sample profiles that match our sample data
-- Note: These will only work if the corresponding auth.users exist
-- You'll need to register users first, then update these profiles

-- Sample function to create admin user profile
CREATE OR REPLACE FUNCTION create_admin_profile()
RETURNS TEXT AS $$
BEGIN
    -- This will be called automatically when the admin user registers
    -- The trigger will create the profile, then we update it to admin
    RETURN 'Admin profile will be created on first login';
END;
$$ LANGUAGE plpgsql;
