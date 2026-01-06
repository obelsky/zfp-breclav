'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useCRMAuth } from '@/contexts/CRMAuthContext';
import { supabase } from '@/lib/supabase';

const TipTapEditor = dynamic(() => import('@/components/admin/TipTapEditor'), {
  ssr: false,
  loading: () => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-96 animate-pulse" />
  ),
});

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Author {
  id: string;
  name: string;
  role: string;
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  const { user } = useCRMAuth();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'author'>('content');

  const [article, setArticle] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category_id: '',
    author_id: '',
    status: 'draft',
    meta_title: '',
    meta_description: '',
    meta_keywords: [] as string[],
    reviewed_by: '',
    sources: [] as string[],
    disclaimer: '',
    featured_image: '',
    featured_image_alt: '',
    og_image: '',
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [sourceInput, setSourceInput] = useState('');

  useEffect(() => {
    loadData();
  }, [articleId]);

  const loadData = async () => {
    try {
      // Load article
      const { data: articleData, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single();

      if (error) throw error;

      if (articleData) {
        setArticle({
          ...articleData,
          meta_keywords: articleData.meta_keywords || [],
          sources: articleData.sources || [],
          category_id: articleData.category_id || '',
          author_id: articleData.author_id || '',
          reviewed_by: articleData.reviewed_by || '',
        });
      }

      // Load categories
      const { data: cats } = await supabase
        .from('article_categories')
        .select('id, name, slug')
        .order('sort_order');
      
      if (cats) setCategories(cats);

      // Load authors
      const { data: advisors } = await supabase
        .from('advisors')
        .select('id, name, role')
        .or('cms_access.eq.true,role.eq.admin')
        .eq('active', true);
      
      if (advisors) setAuthors(advisors);
    } catch (error) {
      console.error('Error loading article:', error);
      router.push('/admin/clanky');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Get category name for meta_title
  const getCategoryName = () => {
    const cat = categories.find(c => c.id === article.category_id);
    return cat?.name || 'Finanční poradna';
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const categoryName = getCategoryName();
    setArticle(prev => ({
      ...prev,
      title,
      // Don't change slug on existing articles (SEO)
      slug: prev.slug || generateSlug(title),
      meta_title: `${title} | ${categoryName} | ZFP GROUP Břeclav`,
    }));
  };

  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const excerpt = e.target.value;
    setArticle(prev => ({
      ...prev,
      excerpt,
      meta_description: excerpt.substring(0, 160),
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category_id = e.target.value;
    const cat = categories.find(c => c.id === category_id);
    const categoryName = cat?.name || 'Finanční poradna';
    
    setArticle(prev => ({
      ...prev,
      category_id,
      meta_title: prev.title ? `${prev.title} | ${categoryName} | ZFP GROUP Břeclav` : prev.meta_title,
    }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !article.meta_keywords.includes(keywordInput.trim())) {
      setArticle(prev => ({
        ...prev,
        meta_keywords: [...prev.meta_keywords, keywordInput.trim()],
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setArticle(prev => ({
      ...prev,
      meta_keywords: prev.meta_keywords.filter(k => k !== keyword),
    }));
  };

  const addSource = () => {
    if (sourceInput.trim() && !article.sources.includes(sourceInput.trim())) {
      setArticle(prev => ({
        ...prev,
        sources: [...prev.sources, sourceInput.trim()],
      }));
      setSourceInput('');
    }
  };

  const removeSource = (source: string) => {
    setArticle(prev => ({
      ...prev,
      sources: prev.sources.filter(s => s !== source),
    }));
  };

  const handleSave = async (publish: boolean = false) => {
    if (!article.title.trim()) {
      alert('Vyplňte název článku');
      return;
    }

    setSaving(true);

    try {
      const finalStatus = publish ? 'published' : article.status;
      const isNewlyPublished = finalStatus === 'published' && article.status !== 'published';
      
      const articleData: Record<string, any> = {
        title: article.title,
        slug: article.slug || generateSlug(article.title),
        excerpt: article.excerpt,
        content: article.content,
        category_id: article.category_id || null,
        author_id: article.author_id || null,
        status: finalStatus,
        // Use title as meta_title if not set
        meta_title: article.meta_title?.trim() || article.title,
        meta_description: article.meta_description,
        meta_keywords: article.meta_keywords,
        reviewed_by: article.reviewed_by || null,
        sources: article.sources,
        disclaimer: article.disclaimer,
        featured_image: article.featured_image,
        featured_image_alt: article.featured_image_alt,
        og_image: article.og_image,
        reading_time: Math.ceil((article.content || '').split(/\s+/).length / 200),
      };

      // Only set published_at when first publishing
      if (isNewlyPublished) {
        articleData.published_at = new Date().toISOString();
      }

      console.log('Updating article with data:', articleData);

      const { error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', articleId);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Reload to show updated data
      await loadData();
      
      if (publish) {
        alert('Článek byl publikován!');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Chyba při ukládání článku');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'content', label: 'Obsah', icon: '📝' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'author', label: 'Autor & EEAT', icon: '👤' },
  ];

  const statusLabels: Record<string, { label: string; color: string }> = {
    draft: { label: 'Koncept', color: 'bg-yellow-500/20 text-yellow-400' },
    review: { label: 'K revizi', color: 'bg-blue-500/20 text-blue-400' },
    published: { label: 'Publikováno', color: 'bg-green-500/20 text-green-400' },
    archived: { label: 'Archivováno', color: 'bg-gray-500/20 text-gray-400' },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin w-10 h-10 border-4 border-zfp-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/clanky')}
            className="p-2 hover:bg-white/5 rounded-lg transition-all"
          >
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">Upravit článek</h1>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusLabels[article.status]?.color || ''}`}>
                {statusLabels[article.status]?.label || article.status}
              </span>
            </div>
            <p className="text-white/60 text-sm mt-1 truncate max-w-md">{article.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {article.status === 'published' && (
            <a
              href={`/poradna/${article.slug}`}
              target="_blank"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline">Zobrazit</span>
            </a>
          )}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all disabled:opacity-50"
          >
            {saving ? 'Ukládám...' : 'Uložit'}
          </button>
          {article.status !== 'published' && (
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-4 py-2 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all disabled:opacity-50"
            >
              Publikovat
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white/5 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
              activeTab === tab.id
                ? 'bg-zfp-orange text-white'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Název článku <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={article.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-lg focus:outline-none focus:border-zfp-orange/50"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              URL slug
            </label>
            <div className="flex items-center gap-2">
              <span className="text-white/40">/poradna/</span>
              <input
                type="text"
                value={article.slug}
                onChange={(e) => setArticle(prev => ({ ...prev, slug: e.target.value }))}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
              />
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Kategorie
              </label>
              <select
                value={article.category_id}
                onChange={handleCategoryChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
              >
                <option value="">Vyberte kategorii</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Stav
              </label>
              <select
                value={article.status}
                onChange={(e) => setArticle(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
              >
                <option value="draft">Koncept</option>
                <option value="review">K revizi</option>
                <option value="published">Publikováno</option>
                <option value="archived">Archivováno</option>
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Perex <span className="text-white/40 font-normal">→ automaticky vyplní meta description</span>
            </label>
            <textarea
              value={article.excerpt}
              onChange={handleExcerptChange}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50 resize-none"
            />
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Obsah článku
            </label>
            <TipTapEditor
              content={article.content}
              onChange={(content) => setArticle(prev => ({ ...prev, content }))}
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Náhledový obrázek
            </label>
            <input
              type="text"
              value={article.featured_image}
              onChange={(e) => setArticle(prev => ({ ...prev, featured_image: e.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50"
            />
            {article.featured_image && (
              <img 
                src={article.featured_image} 
                alt="Náhled" 
                className="mt-2 max-h-40 rounded-lg"
                onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
              />
            )}
          </div>
        </motion.div>
      )}

      {/* SEO Tab - same as new article */}
      {activeTab === 'seo' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={article.meta_title}
              onChange={(e) => setArticle(prev => ({ ...prev, meta_title: e.target.value }))}
              maxLength={70}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
            />
            <p className="text-white/40 text-xs mt-1">{article.meta_title.length}/70</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Meta Description
            </label>
            <textarea
              value={article.meta_description}
              onChange={(e) => setArticle(prev => ({ ...prev, meta_description: e.target.value }))}
              maxLength={160}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50 resize-none"
            />
            <p className="text-white/40 text-xs mt-1">{article.meta_description.length}/160</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Klíčová slova
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
              />
              <button onClick={addKeyword} className="px-4 py-2 bg-zfp-orange text-white rounded-lg">
                Přidat
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.meta_keywords.map((k) => (
                <span key={k} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white flex items-center gap-1">
                  {k}
                  <button onClick={() => removeKeyword(k)} className="text-white/60 hover:text-white">×</button>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Author & EEAT Tab */}
      {activeTab === 'author' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Autor</label>
            <select
              value={article.author_id}
              onChange={(e) => setArticle(prev => ({ ...prev, author_id: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
            >
              <option value="">Vyberte autora</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Recenzent</label>
            <select
              value={article.reviewed_by}
              onChange={(e) => setArticle(prev => ({ ...prev, reviewed_by: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
            >
              <option value="">Vyberte recenzenta</option>
              {authors.filter(a => a.role === 'admin').map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Zdroje</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={sourceInput}
                onChange={(e) => setSourceInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSource())}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
              />
              <button onClick={addSource} className="px-4 py-2 bg-zfp-orange text-white rounded-lg">
                Přidat
              </button>
            </div>
            <div className="space-y-2">
              {article.sources.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-white/80 text-sm truncate">{s}</span>
                  <button onClick={() => removeSource(s)} className="text-red-400">×</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Disclaimer / Právní upozornění</label>
            <textarea
              value={article.disclaimer}
              onChange={(e) => setArticle(prev => ({ ...prev, disclaimer: e.target.value }))}
              placeholder="Vyberte příklad níže nebo napište vlastní..."
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50 resize-none"
            />
            {/* Disclaimer examples */}
            <div className="mt-3 space-y-2">
              <p className="text-xs text-white/40 mb-2">💡 Klikněte pro vložení příkladu:</p>
              <button
                type="button"
                onClick={() => setArticle(prev => ({ ...prev, disclaimer: 'Tento článek slouží pouze k informačním účelům a nepředstavuje finanční, investiční ani právní poradenství. Před jakýmkoli finančním rozhodnutím doporučujeme konzultaci s kvalifikovaným poradcem.' }))}
                className="block w-full text-left px-3 py-2 text-xs text-white/60 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-all"
              >
                📌 <strong>Obecný:</strong> „Tento článek slouží pouze k informačním účelům..."
              </button>
              <button
                type="button"
                onClick={() => setArticle(prev => ({ ...prev, disclaimer: 'Uvedené informace mají pouze vzdělávací charakter. Minulá výkonnost investic není zárukou budoucích výnosů. Hodnota investice může klesat i stoupat.' }))}
                className="block w-full text-left px-3 py-2 text-xs text-white/60 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-all"
              >
                📈 <strong>Investice:</strong> „Minulá výkonnost investic není zárukou..."
              </button>
              <button
                type="button"
                onClick={() => setArticle(prev => ({ ...prev, disclaimer: 'Informace v tomto článku jsou platné k datu publikace. Legislativa a podmínky finančních produktů se mohou měnit. Pro aktuální informace kontaktujte našeho poradce.' }))}
                className="block w-full text-left px-3 py-2 text-xs text-white/60 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-all"
              >
                ⚖️ <strong>Legislativa:</strong> „Informace jsou platné k datu publikace..."
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
