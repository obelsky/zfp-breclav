-- ============================================
-- OPRAVA BARVY KATEGORIE HYPOTÉKY
-- ============================================

-- Aktualizuj barvu na cyan
UPDATE article_categories
SET color = '#06B6D4'
WHERE slug = 'hypoteky';

-- Ověření
SELECT name, slug, color FROM article_categories ORDER BY sort_order;
