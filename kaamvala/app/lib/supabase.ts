import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://acgvnrlogvsrvgzmqass.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZ3ZucmxvZ3ZzcnZnem1xYXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODMwODgsImV4cCI6MjA2MDA1OTA4OH0.hMGavuAGxM1evIeHEND85vSE3w0uN9PsIwcLqpb0xZA"
export const supabase = createClient(supabaseUrl, supabaseKey)
