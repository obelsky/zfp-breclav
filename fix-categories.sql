-- ============================================
-- OPRAVA KATEGORIÍ - SJEDNOCENÍ S WEBEM
-- ============================================

-- Smazat existující kategorie
DELETE FROM article_categories;

-- Vložit správné kategorie (podle webu)
INSERT INTO article_categories (name, slug, description, color, sort_order) VALUES
  ('Finance', 'finance', 'Praktické rady o rozpočtu, spoření a finančním plánování', '#D4A853', 1),
  ('Investování', 'investovani', 'Jak investovat, kam dát peníze a jak se vyhnout chybám', '#10B981', 2),
  ('Pojištění', 'pojisteni', 'Jak se správně pojistit a neplatit zbytečně', '#3B82F6', 3),
  ('Reality', 'reality', 'Koupě, prodej a financování nemovitostí', '#F97316', 4),
  ('Legislativa', 'legislativa', 'Zákony, daně a změny, které vás ovlivňují', '#8B5CF6', 5);

-- Ověření
SELECT name, slug, color, sort_order FROM article_categories ORDER BY sort_order;

-- Poznámka: Pokud máte články přiřazené ke starým kategoriím,
-- budete je muset ručně přiřadit k novým kategoriím v adminu.
