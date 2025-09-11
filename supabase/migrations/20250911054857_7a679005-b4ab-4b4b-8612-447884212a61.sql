-- Function to promote a user to admin (replace the email with actual admin email)
-- This function can be called to make any existing user an admin
CREATE OR REPLACE FUNCTION promote_user_to_admin(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Find the user by email from auth.users (this requires service role)
    SELECT au.id INTO target_user_id
    FROM auth.users au
    WHERE au.email = user_email;
    
    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'User with email % not found', user_email;
    END IF;
    
    -- Update the user's profile to admin
    UPDATE profiles 
    SET user_type = 'admin'::user_type
    WHERE user_id = target_user_id;
    
    -- If no profile exists, create one
    IF NOT FOUND THEN
        INSERT INTO profiles (user_id, user_type, display_name)
        VALUES (target_user_id, 'admin'::user_type, split_part(user_email, '@', 1));
    END IF;
END;
$$;

-- Example usage (uncomment and replace with actual admin email):
-- SELECT promote_user_to_admin('admin@example.com');