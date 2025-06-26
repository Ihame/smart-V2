-- This script helps you create an admin user
-- Replace 'your-email@example.com' with your actual email

-- First, you need to register normally through the app, then run this:
-- UPDATE profiles SET is_admin = TRUE WHERE email = 'your-email@example.com';

-- Or if you know the user ID:
-- UPDATE profiles SET is_admin = TRUE WHERE id = 'your-user-id-here';

-- You can also create a function to make someone admin:
CREATE OR REPLACE FUNCTION make_user_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE profiles SET is_admin = TRUE WHERE email = user_email;
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usage: SELECT make_user_admin('your-email@example.com');
