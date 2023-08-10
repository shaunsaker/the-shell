CREATE TABLE IF NOT EXISTS users (
  -- UUID from auth.users
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data." ON users FOR
SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data." ON users AS PERMISSIVE FOR
INSERT TO PUBLIC WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own data." ON users AS PERMISSIVE FOR
UPDATE TO PUBLIC USING (auth.uid() = id);

/* On user signup, save their details in the users table */
CREATE
OR REPLACE FUNCTION handle_auth_user_created() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
INSERT INTO PUBLIC .users (id, first_name, last_name, email)
VALUES (
    NEW .id,
    NEW .raw_user_meta_data->>'first_name',
    NEW .raw_user_meta_data->>'last_name',
    NEW .email
  );

RETURN NEW;

END;

$$;

CREATE
OR REPLACE TRIGGER on_auth_user_created AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_auth_user_created();

/* When a user updates their details, update the user's details in the users table */
CREATE
OR REPLACE FUNCTION handle_auth_user_updated() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
UPDATE PUBLIC .users
SET first_name = NEW .raw_user_meta_data->>'first_name',
  last_name = NEW .raw_user_meta_data->>'last_name',
  email = NEW .email
WHERE id = NEW .id;

RETURN NEW;

END;

$$;

CREATE
OR REPLACE TRIGGER on_auth_user_updated AFTER
UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_auth_user_updated();