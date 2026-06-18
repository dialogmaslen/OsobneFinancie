import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lpwanyxztufvvrznbglv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwd2FueXh6dHVmdnZyem5iZ2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NzY2NTgsImV4cCI6MjA5NzM1MjY1OH0.UJFQB4jP2u8MlTiMYtpUiIVBhVwa3N2Puspn9No7v5A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
