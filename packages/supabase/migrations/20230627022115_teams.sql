/* TEAMS */
CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  NAME TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  created_by UUID REFERENCES users(id) NOT NULL
);

/* Note: teams and team_members are selected and updated using supabase functions to remove complexity in creating policies */
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to create their own teams." ON teams AS PERMISSIVE FOR
INSERT TO PUBLIC WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Allow team owners to view their teams." ON teams AS PERMISSIVE FOR
SELECT USING (auth.uid() = created_by);

DROP TYPE IF EXISTS team_member_role;

CREATE TYPE team_member_role AS ENUM ('admin', 'member');

DROP TYPE IF EXISTS team_member_status;

CREATE TYPE team_member_status AS ENUM ('active', 'invited');

/* TEAM MEMBERS */
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  team_id INT REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role team_member_role NOT NULL,
  status team_member_status NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

/* When a team is created, create a team_member record for the owner */
CREATE 
OR REPLACE FUNCTION handle_team_inserted() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    INSERT INTO team_members (team_id, user_id, role, status, first_name, last_name, email)
    SELECT NEW.id, NEW.created_by, 'admin', 'active', u.first_name, u.last_name, u.email
    FROM users u
    WHERE u.id = NEW.created_by;

    RETURN NEW;
END;
$$;

CREATE
OR REPLACE TRIGGER on_team_inserted AFTER
INSERT ON teams FOR EACH ROW EXECUTE FUNCTION handle_team_inserted();

CREATE
OR replace FUNCTION get_teams_with_admin_role_for_authenticated_user() returns setof INT LANGUAGE SQL security definer AS $$
SELECT team_id
FROM team_members
WHERE user_id = auth.uid()
  AND role = 'admin' $$;

CREATE POLICY "Team admins can manage teams" ON teams FOR ALL TO PUBLIC USING (
  id IN (
    SELECT get_teams_with_admin_role_for_authenticated_user()
  )
);

CREATE POLICY "Team admins can manage team members" ON team_members FOR ALL TO PUBLIC USING (
  team_id IN (
    SELECT get_teams_with_admin_role_for_authenticated_user()
  )
);

CREATE
OR replace FUNCTION get_teams_for_authenticated_user() returns setof INT LANGUAGE SQL security definer AS $$
SELECT team_id
FROM team_members
WHERE user_id = auth.uid() $$;

CREATE POLICY "Team members can select teams" ON teams FOR SELECT USING (
  id IN (
    SELECT get_teams_for_authenticated_user()
  )
);

CREATE POLICY "Team members can select team members" ON team_members FOR SELECT USING (
  team_id IN (
    SELECT get_teams_for_authenticated_user()
  )
);

/* When a user confirms their email, if they have any team member records, change the status to active */
CREATE
OR REPLACE FUNCTION handle_auth_user_confirm_email() returns TRIGGER LANGUAGE plpgsql security definer AS $$
BEGIN IF NEW .email_confirmed_at IS NOT NULL
  AND OLD .email_confirmed_at IS NULL THEN
UPDATE PUBLIC. team_members
SET status = 'active'
WHERE user_id = NEW .id;

END IF;

RETURN NEW;

END;

$$;

CREATE
OR REPLACE TRIGGER on_auth_user_updated_teams AFTER
UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_auth_user_confirm_email();

/* When a user updates their details, update the user details in the team_members table.
  Note: this replaces the same function from the user_management.sql migration so we need to preserve existing behaviour */
CREATE
OR REPLACE FUNCTION handle_auth_user_updated() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
UPDATE PUBLIC. users
SET first_name = NEW .raw_user_meta_data->>'first_name',
  last_name = NEW .raw_user_meta_data->>'last_name',
  email = NEW .email
WHERE id = NEW .id;

UPDATE PUBLIC. team_members
SET first_name = NEW .raw_user_meta_data->>'first_name',
  last_name = NEW .raw_user_meta_data->>'last_name',
  email = NEW .email
WHERE user_id = NEW .id;

RETURN NEW;

END;

$$;

CREATE
OR REPLACE TRIGGER on_auth_user_updated AFTER
UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_auth_user_updated();