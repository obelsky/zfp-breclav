-- ============================================
-- PŘIDÁNÍ SLOUPCE ICON DO KATEGORIÍ
-- ============================================

-- Přidej sloupec pro ikonu (pokud neexistuje)
ALTER TABLE article_categories 
ADD COLUMN IF NOT EXISTS icon VARCHAR(50) DEFAULT 'folder';

-- Aktualizuj existující kategorie s výchozími ikonami
UPDATE article_categories SET icon = 'dollar' WHERE slug = 'finance';
UPDATE article_categories SET icon = 'chart' WHERE slug = 'investovani';
UPDATE article_categories SET icon = 'shield' WHERE slug = 'pojisteni';
UPDATE article_categories SET icon = 'home' WHERE slug = 'reality';
UPDATE article_categories SET icon = 'document' WHERE slug = 'legislativa';
UPDATE article_categories SET icon = 'building' WHERE slug = 'hypoteky';
UPDATE article_categories SET icon = 'heart' WHERE slug = 'duchod';

-- Ověření
SELECT name, slug, icon, color FROM article_categories ORDER BY sort_order;
