-- ============================================
-- CMS PRO ZFP BŘECLAV - DATABÁZOVÉ SCHÉMA
-- EEAT/YMYL/SEO OPTIMALIZOVANÉ
-- ============================================

-- 1. PŘIDÁNÍ CMS PŘÍSTUPU K PORADCŮM
-- ============================================
ALTER TABLE advisors ADD COLUMN IF NOT EXISTS cms_access BOOLEAN DEFAULT false;
ALTER TABLE advisors ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE advisors ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE advisors ADD COLUMN IF NOT EXISTS specializations TEXT[];
ALTER TABLE advisors ADD COLUMN IF NOT EXISTS certifications TEXT[];
ALTER TABLE advisors ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE advisors ADD COLUMN IF NOT EXISTS years_experience INTEGER DEFAULT 0;

-- Aktualizuj stávajícího admina - má CMS přístup
UPDATE advisors SET cms_access = true WHERE role = 'admin';

COMMENT ON COLUMN advisors.cms_access IS 'Přístup do CMS systému';
COMMENT ON COLUMN advisors.bio IS 'Biografie autora pro EEAT';
COMMENT ON COLUMN advisors.specializations IS 'Oblasti specializace (pole)';
COMMENT ON COLUMN advisors.certifications IS 'Certifikace a kvalifikace pro YMYL';

-- 2. KATEGORIE ČLÁNKŮ
-- ============================================
CREATE TABLE IF NOT EXISTS article_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#D4A853',
  icon VARCHAR(50),
  parent_id UUID REFERENCES article_categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Výchozí kategorie
INSERT INTO article_categories (name, slug, description, color, icon, sort_order) VALUES
  ('Finanční plánování', 'financni-planovani', 'Jak správně plánovat rodinné finance', '#3B82F6', 'chart-pie', 1),
  ('Investování', 'investovani', 'Průvodce světem investic', '#10B981', 'trending-up', 2),
  ('Pojištění', 'pojisteni', 'Vše o pojištění a ochraně', '#F59E0B', 'shield-check', 3),
  ('Hypotéky', 'hypoteky', 'Financování bydlení a nemovitostí', '#8B5CF6', 'home', 4),
  ('Důchod', 'duchod', 'Příprava na důchod a penzijní spoření', '#EC4899', 'clock', 5),
  ('Daně', 'dane', 'Daňová optimalizace a poradenství', '#6366F1', 'calculator', 6)
ON CONFLICT (slug) DO NOTHING;

-- 3. ČLÁNKY
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Základní info
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  
  -- Kategorie a autor
  category_id UUID REFERENCES article_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES advisors(id) ON DELETE SET NULL,
  
  -- SEO metadata
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  meta_keywords TEXT[],
  canonical_url TEXT,
  
  -- Open Graph
  og_title VARCHAR(100),
  og_description VARCHAR(200),
  og_image TEXT,
  
  -- Obrázky
  featured_image TEXT,
  featured_image_alt VARCHAR(255),
  
  -- EEAT/YMYL specifické
  reviewed_by UUID REFERENCES advisors(id),
  reviewed_at TIMESTAMPTZ,
  sources TEXT[],
  disclaimer TEXT,
  last_fact_check TIMESTAMPTZ,
  
  -- Publikace
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  
  -- Schema.org strukturovaná data
  schema_type VARCHAR(50) DEFAULT 'Article',
  reading_time INTEGER,
  
  -- Statistiky
  view_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexy pro rychlé vyhledávání
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC) WHERE status = 'published';

-- Full-text search
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles USING gin(to_tsvector('czech', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, '')));

-- 4. TAGY
-- ============================================
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Propojení článků a tagů (M:N)
CREATE TABLE IF NOT EXISTS article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- 5. REVIZE ČLÁNKŮ (historie změn)
-- ============================================
CREATE TABLE IF NOT EXISTS article_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  changed_by UUID REFERENCES advisors(id),
  change_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MEDIA KNIHOVNA
-- ============================================
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  file_type VARCHAR(50),
  file_size INTEGER,
  url TEXT NOT NULL,
  alt_text VARCHAR(255),
  caption TEXT,
  uploaded_by UUID REFERENCES advisors(id),
  folder VARCHAR(100) DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. RLS POLICIES
-- ============================================
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Politiky pro čtení (veřejné pro publikované)
CREATE POLICY "articles_public_read" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "articles_cms_all" ON articles FOR ALL USING (true);
CREATE POLICY "categories_public_read" ON article_categories FOR SELECT USING (true);
CREATE POLICY "categories_cms_all" ON article_categories FOR ALL USING (true);
CREATE POLICY "tags_public_read" ON tags FOR SELECT USING (true);
CREATE POLICY "tags_cms_all" ON tags FOR ALL USING (true);
CREATE POLICY "article_tags_all" ON article_tags FOR ALL USING (true);
CREATE POLICY "revisions_cms_all" ON article_revisions FOR ALL USING (true);
CREATE POLICY "media_cms_all" ON media FOR ALL USING (true);

-- 8. FUNKCE PRO AUTOMATICKÉ AKTUALIZACE
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggery
DROP TRIGGER IF EXISTS articles_updated_at ON articles;
CREATE TRIGGER articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS categories_updated_at ON article_categories;
CREATE TRIGGER categories_updated_at BEFORE UPDATE ON article_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 9. FUNKCE PRO GENEROVÁNÍ SLUG
-- ============================================
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
BEGIN
  slug := lower(title);
  slug := translate(slug, 'áčďéěíňóřšťúůýž', 'acdeeinorstuuyz');
  slug := regexp_replace(slug, '[^a-z0-9\s-]', '', 'g');
  slug := regexp_replace(slug, '\s+', '-', 'g');
  slug := regexp_replace(slug, '-+', '-', 'g');
  slug := trim(both '-' from slug);
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

-- 10. FUNKCE PRO VÝPOČET ČASU ČTENÍ
-- ============================================
CREATE OR REPLACE FUNCTION calculate_reading_time(content TEXT)
RETURNS INTEGER AS $$
DECLARE
  word_count INTEGER;
BEGIN
  word_count := array_length(regexp_split_to_array(content, '\s+'), 1);
  RETURN GREATEST(1, ROUND(word_count / 200.0)); -- 200 slov za minutu
END;
$$ LANGUAGE plpgsql;

-- 11. VIEW PRO ČLÁNKY S AUTORY
-- ============================================
CREATE OR REPLACE VIEW articles_with_authors AS
SELECT 
  a.*,
  c.name as category_name,
  c.slug as category_slug,
  c.color as category_color,
  au.name as author_name,
  au.email as author_email,
  au.photo_url as author_photo,
  au.bio as author_bio,
  au.specializations as author_specializations,
  au.certifications as author_certifications,
  au.linkedin_url as author_linkedin,
  au.years_experience as author_experience,
  rev.name as reviewer_name
FROM articles a
LEFT JOIN article_categories c ON a.category_id = c.id
LEFT JOIN advisors au ON a.author_id = au.id
LEFT JOIN advisors rev ON a.reviewed_by = rev.id;

-- 12. OVĚŘENÍ
-- ============================================
SELECT 'CMS Schema created successfully!' as status;
SELECT COUNT(*) as categories_count FROM article_categories;
