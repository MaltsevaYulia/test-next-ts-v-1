import { createClient } from "@supabase/supabase-js";


const supabaseUrl:string = process.env.NEXT_PUBLIC_APP_SUPABASE_URL;
const supabaseKey:string = process.env.NEXT_PUBLIC_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;