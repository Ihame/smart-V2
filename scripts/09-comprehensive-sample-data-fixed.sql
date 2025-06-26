-- Comprehensive Sample Data for SmartGarage (Fixed Version)
-- This creates realistic sample data without foreign key violations

-- First, let's create some sample profiles directly
-- These will represent real users in our system
INSERT INTO profiles (id, full_name, email, created_at) VALUES
('11111111-1111-1111-1111-111111111111', 'Jean Baptiste Uwimana', 'jean.uwimana@gmail.com', NOW() - INTERVAL '30 days'),
('22222222-2222-2222-2222-222222222222', 'Marie Claire Mukamana', 'marie.mukamana@yahoo.com', NOW() - INTERVAL '25 days'),
('33333333-3333-3333-3333-333333333333', 'David Nkurunziza', 'david.nkurunziza@outlook.com', NOW() - INTERVAL '20 days'),
('44444444-4444-4444-4444-444444444444', 'Sarah Uwimana', 'sarah.uwimana@gmail.com', NOW() - INTERVAL '18 days'),
('55555555-5555-5555-5555-555555555555', 'Patrick Habimana', 'patrick.habimana@gmail.com', NOW() - INTERVAL '15 days'),
('66666666-6666-6666-6666-666666666666', 'Grace Nyirahabimana', 'grace.nyira@gmail.com', NOW() - INTERVAL '12 days'),
('77777777-7777-7777-7777-777777777777', 'Emmanuel Bizimana', 'emmanuel.bizimana@gmail.com', NOW() - INTERVAL '10 days'),
('88888888-8888-8888-8888-888888888888', 'Claudine Uwamahoro', 'claudine.uwamahoro@gmail.com', NOW() - INTERVAL '8 days');

-- Insert comprehensive sample community posts with real user IDs
INSERT INTO community_posts (user_id, content, created_at) VALUES
('11111111-1111-1111-1111-111111111111', 'Welcome to the SmartGarage community! Just bought my first Tesla Model 3 and excited to connect with fellow EV owners in Rwanda! 🚗⚡', NOW() - INTERVAL '5 days'),
('22222222-2222-2222-2222-222222222222', 'Just completed my virtual diagnosis with SmartGarage - absolutely amazing service! They identified my Prius battery issue remotely and saved me a trip to Kigali. Worth every franc! 💯', NOW() - INTERVAL '4 days'),
('33333333-3333-3333-3333-333333333333', 'Question for the community: Does anyone have experience with hybrid battery replacement costs in Rwanda? My Honda Insight is showing some warning signs and I want to budget properly.', NOW() - INTERVAL '3 days'),
('11111111-1111-1111-1111-111111111111', 'Update on my Tesla: The SmartGarage team helped me optimize my charging schedule. Now getting 15% better range! Their AI battery prediction was spot on. 🔋', NOW() - INTERVAL '2 days'),
('44444444-4444-4444-4444-444444444444', 'Shoutout to SmartGarage for helping me find genuine Nissan Leaf parts! Took only 2 days through their Spares Hunter service. Excellent work! 👏', NOW() - INTERVAL '1 day'),
('22222222-2222-2222-2222-222222222222', 'Pro tip: If you own a BMW i3, make sure to use the SmartGarage OBD scanner recommendations. The diagnostic data is incredibly detailed compared to generic scanners.', NOW() - INTERVAL '12 hours'),
('55555555-5555-5555-5555-555555555555', 'New to EVs - just got a Hyundai Ioniq 5. Any maintenance tips from experienced owners? The SmartGarage community seems very knowledgeable! 🤝', NOW() - INTERVAL '6 hours'),
('33333333-3333-3333-3333-333333333333', 'SmartGarage virtual diagnosis saved me 200,000 RWF! They correctly identified that my "battery issue" was actually a faulty sensor. Amazing AI technology! 🤖', NOW() - INTERVAL '3 hours'),
('66666666-6666-6666-6666-666666666666', 'For garage owners: The SmartGarage ERP system is a game-changer. Our efficiency increased by 40% and customer satisfaction is through the roof! 📈', NOW() - INTERVAL '2 hours'),
('44444444-4444-4444-4444-444444444444', 'Just used the AI Battery Prediction service - mind blown! 🤯 They predicted my Prius battery would need attention in 6 months, and provided a detailed maintenance plan. Worth every penny!', NOW() - INTERVAL '1 hour'),
('77777777-7777-7777-7777-777777777777', 'Calling all Kigali EV owners! Let''s organize a meetup to share experiences and tips. SmartGarage community is growing fast! 🚗💨', NOW() - INTERVAL '30 minutes'),
('55555555-5555-5555-5555-555555555555', 'Question: Has anyone tried the SmartGarage OBD scanners on a Volkswagen ID.4? Looking to purchase one and want real user feedback.', NOW() - INTERVAL '15 minutes'),
('88888888-8888-8888-8888-888888888888', 'SmartGarage team: Thank you for the excellent service! My Mercedes EQC diagnostics were completed professionally and the follow-up support was outstanding. 5 stars! ⭐⭐⭐⭐⭐', NOW() - INTERVAL '5 minutes');

-- Insert sample diagnosis requests
INSERT INTO diagnosis_requests (user_id, vehicle_brand, vehicle_model, vin, issue_description, contact_email, contact_phone, diagnosis_report, created_at) VALUES
('11111111-1111-1111-1111-111111111111', 'Tesla', 'Model 3', 'TSLA123456789', 'Battery charging seems slower than usual, taking 2+ hours longer to reach full charge. No error messages displayed.', 'jean.uwimana@gmail.com', '+250788123456', '{"vehicleInfo":{"brand":"Tesla","model":"Model 3","vin":"TSLA123456789"},"issueDescription":"Battery charging slower than usual","hasPhoto":false,"timestamp":"2024-01-20T10:00:00Z","status":"diagnosed","nextSteps":["Check charging cable","Update software","Schedule service"]}', NOW() - INTERVAL '5 days'),
('22222222-2222-2222-2222-222222222222', 'Toyota', 'Prius', 'TOYT987654321', 'Hybrid system warning light appeared yesterday. Car still drives but fuel efficiency dropped significantly.', 'marie.mukamana@yahoo.com', '+250788234567', '{"vehicleInfo":{"brand":"Toyota","model":"Prius","vin":"TOYT987654321"},"issueDescription":"Hybrid system warning","hasPhoto":false,"timestamp":"2024-01-21T14:30:00Z","status":"diagnosed","nextSteps":["Battery health check","Hybrid system scan","Coolant level check"]}', NOW() - INTERVAL '4 days'),
('33333333-3333-3333-3333-333333333333', 'Honda', 'Insight', 'HOND456789123', 'Strange noise from electric motor during acceleration. Happens mostly when battery is below 30%.', 'david.nkurunziza@outlook.com', '+250788345678', '{"vehicleInfo":{"brand":"Honda","model":"Insight","vin":"HOND456789123"},"issueDescription":"Electric motor noise during acceleration","hasPhoto":false,"timestamp":"2024-01-22T09:15:00Z","status":"in_progress","nextSteps":["Motor inspection","Battery calibration","Software update"]}', NOW() - INTERVAL '3 days');

-- Insert sample battery requests
INSERT INTO battery_requests (user_id, car_model, current_mileage, average_driving_distance, charging_method, contact_email, contact_phone, created_at) VALUES
('11111111-1111-1111-1111-111111111111', 'Tesla Model 3', 45000, 85, 'Home AC Charging (Level 2)', 'jean.uwimana@gmail.com', '+250788123456', NOW() - INTERVAL '6 days'),
('22222222-2222-2222-2222-222222222222', 'Toyota Prius', 78000, 45, 'Mixed Charging Methods', 'marie.mukamana@yahoo.com', '+250788234567', NOW() - INTERVAL '5 days'),
('77777777-7777-7777-7777-777777777777', 'Mercedes EQC', 32000, 120, 'DC Fast Charging', 'emmanuel.bizimana@gmail.com', '+250788789012', NOW() - INTERVAL '3 days');

-- Insert sample smart car reminders
INSERT INTO smart_car_reminders (user_id, title, message, reminder_type, due_date, is_read, created_at) VALUES
('11111111-1111-1111-1111-111111111111', 'Battery Health Check Due', 'Based on your Tesla Model 3 usage patterns (85km daily), we recommend a comprehensive battery health check. This will help optimize performance and extend battery life.', 'service', CURRENT_DATE + INTERVAL '7 days', false, NOW() - INTERVAL '2 days'),
('22222222-2222-2222-2222-222222222222', 'Annual Technical Inspection', 'Your Toyota Prius annual technical inspection expires on March 15th. Please schedule your appointment to avoid penalties. We can recommend certified inspection centers.', 'inspection', '2024-03-15', false, NOW() - INTERVAL '1 day'),
('33333333-3333-3333-3333-333333333333', 'Hybrid System Maintenance', 'Your Honda Insight has reached 50,000km. Time for hybrid system maintenance including coolant check, air filter replacement, and software updates.', 'maintenance', CURRENT_DATE + INTERVAL '14 days', true, NOW() - INTERVAL '3 days'),
('44444444-4444-4444-4444-444444444444', 'Charging Port Cleaning', 'Regular charging port maintenance is recommended every 6 months for your Nissan Leaf. This prevents corrosion and ensures optimal charging speeds.', 'maintenance', CURRENT_DATE + INTERVAL '5 days', false, NOW() - INTERVAL '1 day'),
('55555555-5555-5555-5555-555555555555', 'Software Update Available', 'Hyundai has released a software update for your Ioniq 5 that improves charging efficiency by up to 8%. Schedule an appointment for installation.', 'service', CURRENT_DATE + INTERVAL '10 days', false, NOW() - INTERVAL '6 hours'),
('66666666-6666-6666-6666-666666666666', 'Brake Fluid Check', 'BMW i3 brake fluid should be checked every 2 years. Your vehicle is approaching this milestone. Regenerative braking systems require specific brake fluid types.', 'maintenance', CURRENT_DATE + INTERVAL '21 days', false, NOW() - INTERVAL '12 hours'),
('77777777-7777-7777-7777-777777777777', 'Tire Rotation Reminder', 'Your Mercedes EQC has completed 15,000km. Time for tire rotation to ensure even wear. EV tires wear differently due to instant torque delivery.', 'maintenance', CURRENT_DATE + INTERVAL '3 days', true, NOW() - INTERVAL '2 days'),
('88888888-8888-8888-8888-888888888888', 'Cabin Air Filter', 'Audi e-tron cabin air filter replacement is due. Clean air filters improve HVAC efficiency and reduce battery drain during climate control use.', 'maintenance', CURRENT_DATE + INTERVAL '7 days', false, NOW() - INTERVAL '8 hours');

-- Insert sample spare parts requests
INSERT INTO spare_part_requests (user_id, part_description, car_brand, car_model, contact_email, contact_phone, created_at) VALUES
('44444444-4444-4444-4444-444444444444', 'Original charging cable (Type 2 to household plug) - mine got damaged during transport', 'Nissan', 'Leaf', 'sarah.uwimana@gmail.com', '+250788456789', NOW() - INTERVAL '3 days'),
('11111111-1111-1111-1111-111111111111', 'Door handle mechanism (front passenger side) - not extending properly', 'Tesla', 'Model 3', 'jean.uwimana@gmail.com', '+250788123456', NOW() - INTERVAL '2 days'),
('77777777-7777-7777-7777-777777777777', 'Air suspension compressor - getting error codes related to air suspension system', 'Mercedes', 'EQC', 'emmanuel.bizimana@gmail.com', '+250788789012', NOW() - INTERVAL '1 day');

-- Insert sample OBD inquiries
INSERT INTO obd_inquiries (user_id, product_id, product_name, user_name, email, phone, message, created_at) VALUES
('55555555-5555-5555-5555-555555555555', 'obd-pro-max', 'SmartGarage OBD Pro Max', 'Patrick Habimana', 'patrick.habimana@gmail.com', '+250788567890', 'Interested in purchasing for my Hyundai Ioniq 5. Does it support all EV diagnostics?', NOW() - INTERVAL '2 days'),
('66666666-6666-6666-6666-666666666666', 'obd-basic', 'SmartGarage OBD Basic', 'Grace Nyirahabimana', 'grace.nyira@gmail.com', '+250788678901', 'Need basic diagnostics for my BMW i3. Is this model sufficient?', NOW() - INTERVAL '1 day');

-- Insert sample garage demo requests
INSERT INTO garage_demo_requests (user_id, user_name, garage_name, email, phone, created_at) VALUES
('66666666-6666-6666-6666-666666666666', 'Grace Nyirahabimana', 'Kigali Auto Center', 'grace.nyira@gmail.com', '+250788678901', NOW() - INTERVAL '3 days'),
('77777777-7777-7777-7777-777777777777', 'Emmanuel Bizimana', 'Nyarutarama Garage Solutions', 'emmanuel.bizimana@gmail.com', '+250788789012', NOW() - INTERVAL '1 day');

-- Insert sample contact inquiries
INSERT INTO contact_inquiries (name, email, message, created_at) VALUES
('Alice Uwimana', 'alice.uwimana@gmail.com', 'I am interested in becoming a SmartGarage partner in Butare. What are the requirements?', NOW() - INTERVAL '2 days'),
('Robert Nkurunziza', 'robert.nkuru@yahoo.com', 'Can SmartGarage services work with imported Japanese hybrid vehicles?', NOW() - INTERVAL '1 day'),
('Christine Mukamana', 'christine.muka@gmail.com', 'I would like to schedule a virtual diagnosis for my electric vehicle. How do I get started?', NOW() - INTERVAL '6 hours');

-- Success message
SELECT 'Sample data inserted successfully! All foreign key constraints satisfied.' as result;
