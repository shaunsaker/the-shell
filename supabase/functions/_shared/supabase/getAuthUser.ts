import { supabaseClient } from './supabaseClient.ts'

export const getAuthUser = async (request: Request) => await supabaseClient(request).auth.getUser()
