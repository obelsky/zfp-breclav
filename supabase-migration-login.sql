-- ============================================
-- MIGRACE: Přidání login údajů do advisors
-- Spusť v Supabase SQL Editor
-- ============================================

-- 1. Přidat sloupec username (pokud neexistuje)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'advisors' AND column_name = 'username'
  ) THEN
    ALTER TABLE advisors ADD COLUMN username TEXT UNIQUE;
  END IF;
END $$;

-- 2. Přidat sloupec password (pokud neexistuje)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'advisors' AND column_name = 'password'
  ) THEN
    ALTER TABLE advisors ADD COLUMN password TEXT;
  END IF;
END $$;

-- 3. Přidat sloupec last_login_at (pokud neexistuje)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'advisors' AND column_name = 'last_login_at'
  ) THEN
    ALTER TABLE advisors ADD COLUMN last_login_at TIMESTAMPTZ;
  END IF;
END $$;

-- 4. Index pro rychlé vyhledávání podle username
CREATE INDEX IF NOT EXISTS idx_advisors_username ON advisors(username);

-- 5. RLS Policies - povolit všechny operace (pro CRM)
-- Nejprve smazat staré policies pokud existují
DROP POLICY IF EXISTS "Enable read access for all users" ON advisors;
DROP POLICY IF EXISTS "Enable insert for all" ON advisors;
DROP POLICY IF EXISTS "Enable update for all" ON advisors;
DROP POLICY IF EXISTS "Enable delete for all" ON advisors;
DROP POLICY IF EXISTS "advisors_select" ON advisors;
DROP POLICY IF EXISTS "advisors_insert" ON advisors;
DROP POLICY IF EXISTS "advisors_update" ON advisors;
DROP POLICY IF EXISTS "advisors_delete" ON advisors;

-- Povolit RLS
ALTER TABLE advisors ENABLE ROW LEVEL SECURITY;

-- Povolit SELECT všem (pro login)
CREATE POLICY "advisors_select_policy" ON advisors
  FOR SELECT USING (true);

-- Povolit INSERT všem (pro vytváření poradců)
CREATE POLICY "advisors_insert_policy" ON advisors
  FOR INSERT WITH CHECK (true);

-- Povolit UPDATE všem (pro úpravu poradců)
CREATE POLICY "advisors_update_policy" ON advisors
  FOR UPDATE USING (true);

-- Povolit DELETE všem (pro mazání poradců)
CREATE POLICY "advisors_delete_policy" ON advisors
  FOR DELETE USING (true);

-- 6. Nastav výchozí login pro admina
UPDATE advisors 
SET username = 'breclav', password = 'breclav' 
WHERE id = (
  SELECT id FROM advisors 
  WHERE role = 'admin' AND username IS NULL 
  LIMIT 1
);

-- 7. Ověření
SELECT id, name, email, username, role, active FROM advisors;
