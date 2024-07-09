import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eayqhfetczsnvubekzub.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVheXFoZmV0Y3pzbnZ1YmVrenViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1MDk3MTMsImV4cCI6MjAzNjA4NTcxM30.f2cucNTTz8ZrxmY7BSZ1qmxRDJRfK-vuEtWkQYeUUfw'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase