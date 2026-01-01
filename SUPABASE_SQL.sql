-- ============================================
-- ZFP BRECLAV CRM - SUPABASE SQL SCHÉMA
-- ============================================
-- Zkopíruj celý tento soubor do Supabase SQL Editor a spusť
-- ============================================

-- 1. Tabulka pro leads (poptávky)
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Informace o klientovi
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Detaily poptávky
  source TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  priority TEXT NOT NULL DEFAULT 'medium',
  
  -- Přiřazení poradci
  assigned_to UUID,
  
  -- Data z formulářů (JSON)
  form_data JSONB,
  
  -- Validace hodnot
  CONSTRAINT valid_source CHECK (source IN (
    'contact_form',
    'mortgage_calculator',
    'retirement_calculator',
    'expense_analyzer',
    'financial_health',
    'savings_calculator',
    'insurance_calculator',
    'refinancing',
    'property_affordability',
    'esanon'
  )),
  
  CONSTRAINT valid_status CHECK (status IN (
    'new',
    'contacted',
    'meeting_scheduled',
    'in_progress',
    'offer_sent',
    'closed_won',
    'closed_lost',
    'postponed'
  )),
  
  CONSTRAINT valid_priority CHECK (priority IN ('low', 'medium', 'high'))
);

-- 2. Tabulka pro poznámky
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT NOT NULL,
  content TEXT NOT NULL
);

-- 3. Tabulka pro aktivity
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id TEXT,
  
  CONSTRAINT valid_activity_type CHECK (type IN (
    'created',
    'status_changed',
    'assigned',
    'note_added',
    'contacted'
  ))
);

-- 4. Indexy pro rychlost
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_notes_lead_id ON notes(lead_id);
CREATE INDEX idx_activities_lead_id ON activities(lead_id);

-- 5. Demo data (3 testovací poptávky)
INSERT INTO leads (first_name, last_name, email, phone, source, status, priority, form_data) VALUES
(
  'Jan', 
  'Novák', 
  'jan.novak@email.cz', 
  '+420 123 456 789', 
  'mortgage_calculator', 
  'new', 
  'high',
  '{"propertyPrice": 3500000, "downPayment": 700000, "loanTerm": 30, "interestRate": 5.5}'::jsonb
),
(
  'Eva', 
  'Svobodová', 
  'eva.svobodova@email.cz', 
  '+420 987 654 321', 
  'contact_form', 
  'contacted', 
  'medium',
  '{"message": "Zajímá mě investování do podílových fondů", "subject": "investice"}'::jsonb
),
(
  'Petr', 
  'Dvořák', 
  'petr.dvorak@email.cz', 
  '+420 111 222 333', 
  'retirement_calculator', 
  'in_progress', 
  'high',
  '{"currentAge": 45, "retirementAge": 65, "currentSavings": 500000}'::jsonb
);

-- 6. Přidání aktivit k demo datům
INSERT INTO activities (lead_id, type, description, user_id)
SELECT 
  id,
  'created',
  'Poptávka vytvořena',
  'system'
FROM leads;

-- ============================================
-- HOTOVO! 
-- Měl by ses vidět: "Success. No rows returned"
-- ============================================
