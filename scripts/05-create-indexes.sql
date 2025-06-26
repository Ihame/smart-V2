-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_diagnosis_requests_user_id ON diagnosis_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnosis_requests_created_at ON diagnosis_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_battery_requests_user_id ON battery_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_battery_requests_created_at ON battery_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_spare_part_requests_user_id ON spare_part_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_spare_part_requests_created_at ON spare_part_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_obd_inquiries_user_id ON obd_inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_obd_inquiries_created_at ON obd_inquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_garage_demo_requests_user_id ON garage_demo_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_garage_demo_requests_created_at ON garage_demo_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);
