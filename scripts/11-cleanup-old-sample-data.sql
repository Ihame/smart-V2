-- Clean up any existing sample data that might cause conflicts
-- Run this BEFORE running the fixed sample data script

-- Delete existing sample data (if any)
DELETE FROM community_posts WHERE user_id LIKE '00000000-0000-0000-0000-%';
DELETE FROM diagnosis_requests WHERE user_id LIKE '00000000-0000-0000-0000-%';
DELETE FROM battery_requests WHERE user_id LIKE '00000000-0000-0000-0000-%';
DELETE FROM smart_car_reminders WHERE user_id LIKE '00000000-0000-0000-0000-%';
DELETE FROM spare_part_requests WHERE user_id LIKE '00000000-0000-0000-0000-%';
DELETE FROM obd_inquiries WHERE user_id LIKE '00000000-0000-0000-0000-%';
DELETE FROM garage_demo_requests WHERE user_id LIKE '00000000-0000-0000-0000-%';

-- Also clean up any profiles that might have been created with placeholder IDs
DELETE FROM profiles WHERE id LIKE '00000000-0000-0000-0000-%';

SELECT 'Old sample data cleaned up successfully!' as result;
