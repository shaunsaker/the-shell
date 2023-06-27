create table "public"."users" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "first_name" text,
    "last_name" text
);

alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

set check_function_bodies = off;

create policy "Users can view their own profile."
on "public"."users"
for select
using ((auth.uid() = id));

create policy "Users can insert their own profile."
on "public"."users"
as permissive
for insert
to public
with check ((auth.uid() = id));

create policy "Users can update own profile."
on "public"."users"
as permissive
for update
to public
using ((auth.uid() = id));

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.users (id, first_name, last_name)
  values (new.id, new.first_name, new.last_name);
  return new;
end;
$function$
;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();