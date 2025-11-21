-- migrations/001_create_links.sql
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) NOT NULL UNIQUE,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deleted BOOLEAN DEFAULT FALSE,
  total_clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP WITH TIME ZONE,
  -- optional: owner_user_id for later auth
  CONSTRAINT code_format CHECK (code ~ '^[A-Za-z0-9]{6,8}$')
);
