import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabaseUrl = "https://tgqzcxojwaojnqwvjiag.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRncXpjeG9qd2Fvam5xd3ZqaWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjA1OTUsImV4cCI6MjA4OTEzNjU5NX0.VoRF9XVztM7nXvfJnO-lW80t1AzhQfM6zJ_MpELRYIw"

export const supabase = createClient(supabaseUrl, supabaseKey)