-- ============================================
-- OPRAVA EXISTUJÍCÍHO ČLÁNKU - PŘIŘAZENÍ KATEGORIE
-- ============================================

-- Najdi ID kategorie "Investování"
-- a přiřaď ji k článku "Jak správně investovat v roce 2026"

UPDATE articles 
SET category_id = (
  SELECT id FROM article_categories WHERE slug = 'investovani' LIMIT 1
)
WHERE slug = 'jak-spravne-investovat-v-roce-2026'
  AND category_id IS NULL;

-- Oprav také meta_title pokud obsahuje jen "J"
UPDATE articles
SET meta_title = title
WHERE slug = 'jak-spravne-investovat-v-roce-2026'
  AND (meta_title IS NULL OR LENGTH(meta_title) < 5);

-- Ověření
SELECT 
  title,
  slug,
  meta_title,
  status,
  category_id,
  (SELECT name FROM article_categories WHERE id = articles.category_id) as category_name
FROM articles
WHERE slug = 'jak-spravne-investovat-v-roce-2026';
