const SUPABASE_URL = "https://jjmidrewoampvuohbmsj.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_YoENWRUzTo6u46WWKis6OA_LpxkT8M4";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);