-- Create advisors table
CREATE TABLE IF NOT EXISTS advisors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'advisor')),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS (Row Level Security) to advisors
ALTER TABLE advisors ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Enable read access for all users" ON advisors;
DROP POLICY IF EXISTS "Enable insert for admins only" ON advisors;
DROP POLICY IF EXISTS "Enable update for admins only" ON advisors;
DROP POLICY IF EXISTS "Enable delete for admins only" ON advisors;

-- Policy: Anyone can read advisors
CREATE POLICY "Enable read access for all users" ON advisors
  FOR SELECT USING (true);

-- Policy: Only admins can insert advisors
CREATE POLICY "Enable insert for admins only" ON advisors
  FOR INSERT WITH CHECK (true);

-- Policy: Only admins can update advisors
CREATE POLICY "Enable update for admins only" ON advisors
  FOR UPDATE USING (true);

-- Policy: Only admins can delete advisors
CREATE POLICY "Enable delete for admins only" ON advisors
  FOR DELETE USING (true);

-- Add assigned_advisor_id column to existing leads table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'assigned_advisor_id'
  ) THEN
    ALTER TABLE leads 
      ADD COLUMN assigned_advisor_id UUID REFERENCES advisors(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Create index for faster lookups (if not exists)
CREATE INDEX IF NOT EXISTS idx_leads_assigned_advisor 
  ON leads(assigned_advisor_id);

-- Insert default admin (update with your actual data)
INSERT INTO advisors (name, email, phone, role, active)
VALUES 
  ('Ondřej Bělský', 'ondrej@zfpbreclav.cz', '+420 777 123 456', 'admin', true)
ON CONFLICT (email) DO NOTHING;

-- Grant permissions
GRANT ALL ON advisors TO authenticated;
GRANT ALL ON advisors TO anon;
