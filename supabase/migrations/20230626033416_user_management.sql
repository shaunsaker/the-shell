create table "public"."users" (
    -- UUID from auth.users
    id uuid references auth.users not null primary key,
    "updated_at" timestamp with time zone,
    "first_name" text,
    "last_name" text
);

alter table "public"."users" enable row level security;

create policy "Users can view their own data."
on "public"."users"
for select
using (auth.uid() = id);

create policy "Users can insert their own data."
on "public"."users"
as permissive
for insert
to public
with check (auth.uid() = id);

create policy "Users can update own data."
on "public"."users"
as permissive
for update
to public
using (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.users (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name');
  return new;
end;
$function$
;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();