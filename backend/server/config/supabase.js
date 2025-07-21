import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qjrzsoincphydmaewhap.supabase.co'
const supabaseKey = "sb_publishable_yd0YuFQg4oqmdaJ5jh0MsA_15T4ppEe"

export const supabase = createClient(supabaseUrl, supabaseKey)
