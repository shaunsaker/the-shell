set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_user()
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
	--delete from public.profiles where id = auth.uid();
	delete from auth.users where id = auth.uid();
$function$
;


