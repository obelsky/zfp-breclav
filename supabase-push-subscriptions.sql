-- ============================================
-- TABULKA: push_subscriptions
-- Pro ukládání push notification subscriptions
-- ============================================

-- Vytvoř tabulku
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_id UUID REFERENCES advisors(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pro rychlé vyhledávání
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_advisor ON push_subscriptions(advisor_id);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_endpoint ON push_subscriptions(endpoint);

-- RLS Policies
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Povolit všechny operace (pro CRM)
DROP POLICY IF EXISTS "push_select" ON push_subscriptions;
DROP POLICY IF EXISTS "push_insert" ON push_subscriptions;
DROP POLICY IF EXISTS "push_update" ON push_subscriptions;
DROP POLICY IF EXISTS "push_delete" ON push_subscriptions;

CREATE POLICY "push_select_policy" ON push_subscriptions FOR SELECT USING (true);
CREATE POLICY "push_insert_policy" ON push_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "push_update_policy" ON push_subscriptions FOR UPDATE USING (true);
CREATE POLICY "push_delete_policy" ON push_subscriptions FOR DELETE USING (true);

-- Ověření
SELECT * FROM push_subscriptions;
