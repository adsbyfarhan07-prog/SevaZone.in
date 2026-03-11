import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ndobzcoyktohbjmskdbk.supabase.co";
const supabaseKey = "PASTE_YOUR_PUBLISHABLE_KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);
