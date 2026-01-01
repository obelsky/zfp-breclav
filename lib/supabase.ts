import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TypeScript types
export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  priority: string;
  assigned_to?: string;
  form_data?: any;
};

export type Note = {
  id: string;
  lead_id: string;
  created_at: string;
  created_by: string;
  content: string;
};

export type Activity = {
  id: string;
  lead_id: string;
  timestamp: string;
  type: string;
  description: string;
  user_id?: string;
};
