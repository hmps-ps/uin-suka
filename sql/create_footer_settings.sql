-- SQL: Create table footer_settings
-- Run this in Supabase SQL editor

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS footer_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_name text NOT NULL DEFAULT 'HMPS Perbankan Syariah',
  org_description text,
  address text,
  email text,
  phone text,
  instagram_url text,
  youtube_url text,
  linkedin_url text,
  maps_embed_url text,
  copyright_text text,
  updated_at timestamptz DEFAULT now()
);

-- Optional: enforce single-row (commented out; enable if desired)
-- CREATE UNIQUE INDEX IF NOT EXISTS single_footer_row ON footer_settings ((true));
