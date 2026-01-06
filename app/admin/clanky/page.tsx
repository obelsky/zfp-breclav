'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface Article {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  view_count: number;
  author_id: string | null;
  category_id: string | null;
  category_name?: string;
  author_name?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export default function ArticlesListPage() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>(statusFilter);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load articles with author and category info
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select(`
          *,
          article_categories(name, slug, color),
          advisors(name)
        `)
        .order('created_at', { ascending: false });

      if (!articlesError && articlesData) {
        const formattedArticles = articlesData.map(a => ({
          ...a,
          category_name: a.article_categories?.name,
          author_name: a.advisors?.name,
        }));
        setArticles(formattedArticles);
      }

      // Load categories
      const { data: categoriesData } = await supabase
        .from('article_categories')
        .select('*')
        .order('sort_order');

      if (categoriesData) {
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Opravdu chcete smazat článek "${title}"?`)) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (!error) {
        setArticles(articles.filter(a => a.id !== id));
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category_id === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'Všechny stavy' },
    { value: 'draft', label: 'Koncepty' },
    { value: 'review', label: 'K revizi' },
    { value: 'published', label: 'Publikované' },
    { value: 'archived', label: 'Archivované' },
  ];

  const statusLabels: Record<string, { label: string; color: string }> = {
    draft: { label: 'Koncept', color: 'bg-yellow-500/20 text-yellow-400' },
    review: { label: 'K revizi', color: 'bg-blue-500/20 text-blue-400' },
    published: { label: 'Publikováno', color: 'bg-green-500/20 text-green-400' },
    archived: { label: 'Archivováno', color: 'bg-gray-500/20 text-gray-400' },
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Články</h1>
          <p className="text-white/60 mt-1">Správa článků v poradně</p>
        </div>
        <Link
          href="/admin/clanky/novy"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nový článek
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Hledat články..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50"
            />
          </div>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
          >
            <option value="all">Všechny kategorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-zfp-orange border-t-transparent rounded-full" />
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Žádné články</h3>
          <p className="text-white/60 mb-6">
            {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
              ? 'Žádné články neodpovídají vašim filtrům'
              : 'Začněte vytvořením prvního článku'}
          </p>
          {!searchQuery && selectedCategory === 'all' && selectedStatus === 'all' && (
            <Link
              href="/admin/clanky/novy"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Vytvořit první článek
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-white/5 border-b border-white/10 text-sm font-medium text-white/60">
            <div className="col-span-5">Článek</div>
            <div className="col-span-2">Kategorie</div>
            <div className="col-span-2">Stav</div>
            <div className="col-span-2">Datum</div>
            <div className="col-span-1">Akce</div>
          </div>

          {/* Articles */}
          <div className="divide-y divide-white/10">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors group"
              >
                {/* Title & Author */}
                <div className="md:col-span-5">
                  <Link
                    href={`/admin/clanky/${article.id}`}
                    className="text-white font-medium hover:text-zfp-orange transition-colors block truncate"
                  >
                    {article.title}
                  </Link>
                  <p className="text-white/60 text-sm mt-1">
                    {article.author_name || 'Bez autora'}
                    {article.view_count > 0 && (
                      <span className="ml-2">• {article.view_count} zobrazení</span>
                    )}
                  </p>
                </div>

                {/* Category */}
                <div className="md:col-span-2 flex items-center">
                  {article.category_name ? (
                    <span className="px-2 py-1 bg-white/10 rounded text-sm text-white/80">
                      {article.category_name}
                    </span>
                  ) : (
                    <span className="text-white/40 text-sm">—</span>
                  )}
                </div>

                {/* Status */}
                <div className="md:col-span-2 flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[article.status]?.color || 'bg-gray-500/20 text-gray-400'}`}>
                    {statusLabels[article.status]?.label || article.status}
                  </span>
                </div>

                {/* Date */}
                <div className="md:col-span-2 flex items-center text-white/60 text-sm">
                  {new Date(article.updated_at || article.created_at).toLocaleDateString('cs-CZ')}
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex items-center gap-2">
                  <Link
                    href={`/admin/clanky/${article.id}`}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    title="Upravit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}
                    className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Smazat"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      {!loading && filteredArticles.length > 0 && (
        <p className="text-white/60 text-sm mt-4">
          Zobrazeno {filteredArticles.length} z {articles.length} článků
        </p>
      )}
    </div>
  );
}
