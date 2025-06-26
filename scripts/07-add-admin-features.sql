-- Add admin column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Create smart_car_reminders table
CREATE TABLE IF NOT EXISTS smart_car_reminders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    reminder_type TEXT NOT NULL CHECK (reminder_type IN ('maintenance', 'inspection', 'service', 'general')),
    due_date DATE,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on smart_car_reminders
ALTER TABLE smart_car_reminders ENABLE ROW LEVEL SECURITY;

-- Create policies for smart_car_reminders
CREATE POLICY "Users can view own reminders" ON smart_car_reminders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can insert reminders" ON smart_car_reminders
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND is_admin = TRUE
        )
    );

CREATE POLICY "Admins can view all reminders" ON smart_car_reminders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND is_admin = TRUE
        )
    );

CREATE POLICY "Users can update own reminders" ON smart_car_reminders
    FOR UPDATE USING (auth.uid() = user_id);

-- Add payment status columns to existing tables
ALTER TABLE diagnosis_requests ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';
ALTER TABLE diagnosis_requests ADD COLUMN IF NOT EXISTS amount_paid INTEGER;

ALTER TABLE battery_requests ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';
ALTER TABLE battery_requests ADD COLUMN IF NOT EXISTS amount_paid INTEGER;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_smart_car_reminders_user_id ON smart_car_reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_smart_car_reminders_created_at ON smart_car_reminders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_smart_car_reminders_is_read ON smart_car_reminders(is_read);

-- Add trigger for updated_at on smart_car_reminders
CREATE TRIGGER handle_updated_at_smart_car_reminders
    BEFORE UPDATE ON smart_car_reminders
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
