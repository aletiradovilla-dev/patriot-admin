import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xdxqqxpfleypkhgwuguf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeHFxeHBmbGV5cGtoZ3d1Z3VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMTY5MjgsImV4cCI6MjA5MzY5MjkyOH0.fLzC803pAJEwEIUZtxvQquyRHcWeb7O4rmvn6OyLcGY';
const supabaseServiceKey = 'sb_secret_WB_cCJaRa2-J4CbRzRoxVA_XtfF6d26';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);