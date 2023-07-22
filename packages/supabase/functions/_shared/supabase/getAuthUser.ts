import { supabaseClient } from './supabaseClient.js'

export const getAuthUser = async (request: Request) => await supabaseClient(request).auth.getUser()
