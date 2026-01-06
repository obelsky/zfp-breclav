-- ============================================
-- SUPABASE STORAGE BUCKET PRO MÉDIA
-- Spustit po vytvoření CMS tabulek
-- ============================================

-- Vytvoření storage bucketu pro média
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880;

-- RLS politiky pro storage
CREATE POLICY "Public media access"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY "Auth users can upload media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Auth users can delete media"
ON storage.objects FOR DELETE
USING (bucket_id = 'media');

-- Ověření
SELECT 'Storage bucket "media" created!' as status;
