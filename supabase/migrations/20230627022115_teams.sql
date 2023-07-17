/* TEAMS */
CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  NAME TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  created_by UUID REFERENCES users(id)
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
  team_id INT REFERENCES teams(id),
  user_id UUID REFERENCES users(id),
  role team_member_role NOT NULL,
  status team_member_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow team owners to insert team_members to their teams." ON team_members AS PERMISSIVE FOR
INSERT TO PUBLIC WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1
      FROM teams
      WHERE teams.id = team_members.team_id
        AND teams.created_by = auth.uid()
    )
  );

CREATE POLICY "Allow team owners to view team_members in their teams." ON team_members AS PERMISSIVE FOR
SELECT USING (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1
      FROM teams
      WHERE teams.id = team_members.team_id
        AND teams.created_by = auth.uid()
    )
  );

CREATE
OR replace FUNCTION get_teams_with_admin_role_for_authenticated_user() returns setof INT LANGUAGE SQL security definer AS $$
SELECT team_id
FROM team_members
WHERE user_id = auth.uid()
  AND role = 'admin' $$;

CREATE policy "Team admins can insert team members" ON team_members FOR ALL USING (
  team_id IN (
    SELECT get_teams_with_admin_role_for_authenticated_user()
  )
);

/* When a user confirms their email, if they have any team member records, change the status to active */
CREATE
OR REPLACE FUNCTION handle_auth_user_updated_teams() returns TRIGGER LANGUAGE plpgsql security definer AS $$
BEGIN IF NEW .email_confirmed_at IS NOT NULL
  AND OLD .email_confirmed_at IS NULL THEN
UPDATE PUBLIC .team_members
SET status = 'active'
WHERE user_id = NEW .id;

END IF;

RETURN NEW;

END;

$$;

CREATE
OR REPLACE TRIGGER on_auth_user_updated_teams AFTER
UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_auth_user_updated_teams();