import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Pro = {
  id: string;
  name: string;
  category: string;
  city: string;
  bio: string | null;
  image_url: string | null;
  rating: number | null;
  review_count: number | null;
  whatsapp: string | null;
  from_price: number | null;
  verified: boolean | null;
  premium: boolean | null;
  opens_at: string | null;
  closes_at: string | null;
  created_at: string | null;
};

export type Service = {
  id: string;
  pro_id: string;
  name: string;
  description: string | null;
  duration_min: number | null;
  price: number | null;
};

export type Review = {
  id: string;
  pro_id: string;
  client_name: string | null;
  rating: number | null;
  comment: string | null;
  created_at: string | null;
};
