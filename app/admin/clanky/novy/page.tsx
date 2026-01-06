'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useCRMAuth } from '@/contexts/CRMAuthContext';
import { supabase } from '@/lib/supabase';

// Dynamic import TipTap to avoid SSR issues
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

export default function NewArticlePage() {
  const router = useRouter();
  const { user } = useCRMAuth();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'author'>('content');

  // Article data
  const [article, setArticle] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category_id: '',
    author_id: '',
    status: 'draft',
    // SEO
    meta_title: '',
    meta_description: '',
    meta_keywords: [] as string[],
    // EEAT
    reviewed_by: '',
    sources: [] as string[],
    disclaimer: '',
    // Images
    featured_image: '',
    featured_image_alt: '',
    og_image: '',
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [sourceInput, setSourceInput] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load categories
      const { data: cats } = await supabase
        .from('article_categories')
        .select('id, name, slug')
        .order('sort_order');
      
      if (cats) setCategories(cats);

      // Load authors (advisors with cms_access or admins)
      const { data: advisors } = await supabase
        .from('advisors')
        .select('id, name, role')
        .or('cms_access.eq.true,role.eq.admin')
        .eq('active', true);
      
      if (advisors) setAuthors(advisors);

      // Set current user as default author
      if (user?.id) {
        setArticle(prev => ({ ...prev, author_id: user.id }));
      }
    } catch (error) {
      console.error('Error loading data:', error);
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setArticle(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
      meta_title: prev.meta_title || title,
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
      const articleData = {
        ...article,
        slug: article.slug || generateSlug(article.title),
        status: publish ? 'published' : article.status,
        published_at: publish ? new Date().toISOString() : null,
        reading_time: Math.ceil(article.content.split(/\s+/).length / 200),
        author_id: article.author_id || null,
        category_id: article.category_id || null,
        reviewed_by: article.reviewed_by || null,
      };

      const { data, error } = await supabase
        .from('articles')
        .insert([articleData])
        .select()
        .single();

      if (error) throw error;

      router.push(`/admin/clanky/${data.id}`);
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
            <h1 className="text-2xl font-bold text-white">Nový článek</h1>
            <p className="text-white/60 text-sm">Vytvořte nový článek do poradny</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all disabled:opacity-50"
          >
            {saving ? 'Ukládám...' : 'Uložit koncept'}
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-4 py-2 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all disabled:opacity-50"
          >
            Publikovat
          </button>
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
              placeholder="Jak správně investovat v roce 2025"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-lg placeholder-white/40 focus:outline-none focus:border-zfp-orange/50"
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
                placeholder="jak-spravne-investovat"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50"
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
                onChange={(e) => setArticle(prev => ({ ...prev, category_id: e.target.value }))}
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
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Perex (krátký popis)
            </label>
            <textarea
              value={article.excerpt}
              onChange={(e) => setArticle(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Stručný popis článku pro náhled..."
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50 resize-none"
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
              placeholder="Začněte psát obsah článku..."
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Náhledový obrázek (URL)
            </label>
            <input
              type="text"
              value={article.featured_image}
              onChange={(e) => setArticle(prev => ({ ...prev, featured_image: e.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50"
            />
            {article.featured_image && (
              <div className="mt-2">
                <img 
                  src={article.featured_image} 
                  alt="Náhled" 
                  className="max-h-40 rounded-lg"
                  onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
            <p className="text-blue-400 text-sm">
              💡 SEO metadata pomáhají vyhledávačům lépe pochopit obsah článku a zobrazit ho relevantním uživatelům.
            </p>
          </div>

          {/* Meta Title */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Meta Title <span className="text-white/40">(max 60 znaků)</span>
            </label>
            <input
              type="text"
              value={article.meta_title}
              onChange={(e) => setArticle(prev => ({ ...prev, meta_title: e.target.value }))}
              maxLength={70}
              placeholder="Název pro vyhledávače"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50"
            />
            <p className="text-white/40 text-xs mt-1">{article.meta_title.length}/70 znaků</p>
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Meta Description <span className="text-white/40">(max 160 znaků)</span>
            </label>
            <textarea
              value={article.meta_description}
              onChange={(e) => setArticle(prev => ({ ...prev, meta_description: e.target.value }))}
              maxLength={160}
              placeholder="Popis článku pro výsledky vyhledávání"
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50 resize-none"
            />
            <p className="text-white/40 text-xs mt-1">{article.meta_description.length}/160 znaků</p>
          </div>

          {/* Keywords */}
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
                placeholder="Přidejte klíčové slovo"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50"
              />
              <button
                onClick={addKeyword}
                className="px-4 py-2 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all"
              >
                Přidat
              </button>
            </div>
            {article.meta_keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.meta_keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword(keyword)}
                      className="text-white/60 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* OG Image */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              OG Image (pro sociální sítě)
            </label>
            <input
              type="text"
              value={article.og_image}
              onChange={(e) => setArticle(prev => ({ ...prev, og_image: e.target.value }))}
              placeholder="https://... (1200x630px doporučeno)"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50"
            />
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Náhled ve vyhledávači
            </label>
            <div className="bg-white rounded-lg p-4">
              <p className="text-blue-600 text-lg hover:underline cursor-pointer">
                {article.meta_title || article.title || 'Název článku'}
              </p>
              <p className="text-green-700 text-sm">
                zfpbreclav.cz/poradna/{article.slug || 'url-clanku'}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {article.meta_description || article.excerpt || 'Popis článku se zobrazí zde...'}
              </p>
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
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 text-sm">
              ⚠️ <strong>YMYL obsah:</strong> Finanční poradenství vyžaduje důvěryhodné autorství. 
              Vyplňte údaje o autorovi a recenzentovi pro lepší hodnocení E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).
            </p>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Autor článku <span className="text-red-400">*</span>
            </label>
            <select
              value={article.author_id}
              onChange={(e) => setArticle(prev => ({ ...prev, author_id: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
            >
              <option value="">Vyberte autora</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name} {author.role === 'admin' ? '(Admin)' : ''}
                </option>
              ))}
            </select>
            <p className="text-white/40 text-xs mt-1">
              Autor bude zobrazen u článku s odkazem na jeho profil
            </p>
          </div>

          {/* Reviewer */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Recenzoval/Schválil
            </label>
            <select
              value={article.reviewed_by}
              onChange={(e) => setArticle(prev => ({ ...prev, reviewed_by: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
            >
              <option value="">Vyberte recenzenta</option>
              {authors.filter(a => a.role === 'admin').map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
            <p className="text-white/40 text-xs mt-1">
              Pro YMYL obsah doporučeno mít odbornou revizi
            </p>
          </div>

          {/* Sources */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Zdroje a reference
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={sourceInput}
                onChange={(e) => setSourceInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSource())}
                placeholder="URL nebo název zdroje"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50"
              />
              <button
                onClick={addSource}
                className="px-4 py-2 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all"
              >
                Přidat
              </button>
            </div>
            {article.sources.length > 0 && (
              <div className="space-y-2">
                {article.sources.map((source, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                  >
                    <span className="text-white/80 text-sm truncate">{source}</span>
                    <button
                      onClick={() => removeSource(source)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Disclaimer / Právní upozornění
            </label>
            <textarea
              value={article.disclaimer}
              onChange={(e) => setArticle(prev => ({ ...prev, disclaimer: e.target.value }))}
              placeholder="Např.: Tento článek slouží pouze k informačním účelům a nepředstavuje finanční poradenství..."
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50 resize-none"
            />
          </div>

          {/* EEAT Tips */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3">📋 EEAT Checklist</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <span className={article.author_id ? 'text-green-400' : 'text-white/40'}>
                  {article.author_id ? '✓' : '○'}
                </span>
                Autor je vyplněn
              </li>
              <li className="flex items-center gap-2">
                <span className={article.reviewed_by ? 'text-green-400' : 'text-white/40'}>
                  {article.reviewed_by ? '✓' : '○'}
                </span>
                Článek je recenzován
              </li>
              <li className="flex items-center gap-2">
                <span className={article.sources.length > 0 ? 'text-green-400' : 'text-white/40'}>
                  {article.sources.length > 0 ? '✓' : '○'}
                </span>
                Zdroje jsou uvedeny
              </li>
              <li className="flex items-center gap-2">
                <span className={article.disclaimer ? 'text-green-400' : 'text-white/40'}>
                  {article.disclaimer ? '✓' : '○'}
                </span>
                Disclaimer je vyplněn
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
