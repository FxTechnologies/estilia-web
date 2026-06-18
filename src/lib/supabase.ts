import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type Pro = {
  id: string;
  name: string;
  category: string;
  city: string;
  bio?: string | null;
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
  user_id?: string | null;
  distance_km?: number | null;
};

export type Service = {
  id: string;
  pro_id: string;
  name: string;
  description: string | null;
  duration_min: number | null;
  price: number | null;
  created_at?: string | null;
};

export type Review = {
  id: string;
  pro_id: string;
  user_id: string | null;
  rating: number | null;
  comment: string | null;
  created_at: string | null;
};

export type Appointment = {
  id: string;
  pro_id: string;
  user_id: string | null;
  service_id: string | null;
  scheduled_at: string | null;
  status: string | null;
  created_at: string | null;
};

export type Profile = {
  id: string;
  role: string | null;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string | null;
};
