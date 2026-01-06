-- ============================================
-- KONTROLA A OPRAVA ČLÁNKŮ
-- ============================================

-- 1. Zobraz všechny články
SELECT 
  id,
  title,
  slug,
  status,
  category_id,
  (SELECT name FROM article_categories WHERE id = articles.category_id) as category_name,
  published_at
FROM articles
ORDER BY created_at DESC;

-- 2. Zobraz všechny kategorie
SELECT id, name, slug FROM article_categories ORDER BY sort_order;

-- 3. OPRAVA: Přiřaď kategorii "Investování" ke všem článkům o investování
-- Nejdříve zjisti ID kategorie Investování:
-- SELECT id FROM article_categories WHERE slug = 'investovani';

-- Pak přiřaď ke článkům (nahraď 'CATEGORY_ID' skutečným ID):
-- UPDATE articles 
-- SET category_id = 'CATEGORY_ID'
-- WHERE title ILIKE '%invest%' AND category_id IS NULL;

-- 4. Jednoduchá oprava - přiřaď kategorii automaticky:
UPDATE articles 
SET category_id = (SELECT id FROM article_categories WHERE slug = 'investovani' LIMIT 1)
WHERE (title ILIKE '%invest%' OR slug ILIKE '%invest%')
  AND (category_id IS NULL OR category_id NOT IN (SELECT id FROM article_categories));

-- 5. Ověř výsledek
SELECT 
  title,
  status,
  category_id,
  (SELECT name FROM article_categories WHERE id = articles.category_id) as category_name
FROM articles;
