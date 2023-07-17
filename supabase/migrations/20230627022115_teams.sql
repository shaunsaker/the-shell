/* TEAMS */
CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  NAME TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  -- Note we do not reference the users table here because if a user is deleted, we want to keep the team
  created_by UUID
);

/* Note: teams and team_members are selected and updated using supabase functions to remove complexity in creating policies */
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

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