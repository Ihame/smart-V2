-- Direct Admin User Creation Script
-- This creates a direct login for smartgaragerwanda@gmail.com

-- First, we need to insert into auth.users (this requires SUPABASE_SERVICE_ROLE)
-- Since we can't directly insert into auth.users from SQL editor, 
-- we'll create a function that can be called after the user registers

-- Create a function to make the specific email an admin immediately upon registration
CREATE OR REPLACE FUNCTION auto_make_admin()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if this is our admin email
    IF NEW.email = 'smartgaragerwanda@gmail.com' THEN
        -- Update the profile to be admin
        UPDATE profiles 
        SET is_admin = TRUE 
        WHERE id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically make smartgaragerwanda@gmail.com an admin
DROP TRIGGER IF EXISTS auto_admin_trigger ON profiles;
CREATE TRIGGER auto_admin_trigger
    AFTER INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION auto_make_admin();

-- Also create a manual function to make someone admin
CREATE OR REPLACE FUNCTION make_user_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE profiles SET is_admin = TRUE WHERE email = user_email;
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check admin status
CREATE OR REPLACE FUNCTION check_admin_status(user_email TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    is_admin_user BOOLEAN := FALSE;
BEGIN
    SELECT is_admin INTO is_admin_user 
    FROM profiles 
    WHERE email = user_email;
    
    RETURN COALESCE(is_admin_user, FALSE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Instructions for admin access:
-- 1. Register with email: smartgaragerwanda@gmail.com
-- 2. Use password: SmartGarage2024!
-- 3. The system will automatically make this user an admin
-- 4. After login, you'll see the Admin Panel option in your profile menu

-- If you need to manually make someone admin later:
-- SELECT make_user_admin('email@example.com');

-- To check if someone is admin:
-- SELECT check_admin_status('email@example.com');
