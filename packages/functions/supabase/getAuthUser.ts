import { supabaseClient } from './supabaseClient'

export const getAuthUser = async (authHeaders?: string) => await supabaseClient(authHeaders).auth.getUser()
