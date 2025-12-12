import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wjwvbtistdreukbwsndm.supabase.co";
const supabaseKey = "sb_publishable_2dKrJmaf5ZJ2NTQyMfwEOA_BOy14l6z";
export const supabase = createClient(supabaseUrl, supabaseKey);
