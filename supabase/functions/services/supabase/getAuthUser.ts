import { supabaseClient } from './index.ts'

export const getAuthUser = async (request: Request) => await supabaseClient(request).auth.getUser()
