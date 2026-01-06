'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCRMAuth } from '@/contexts/CRMAuthContext';
import { supabase } from '@/lib/supabase';

interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
}

interface RecentArticle {
  id: string;
  title: string;
  status: string;
  created_at: string;
  author_name?: string;
  category_name?: string;
}

export default function AdminDashboard() {
  const { user } = useCRMAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalViews: 0,
  });
  const [recentArticles, setRecentArticles] = useState<RecentArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load articles stats
      const { data: articles, error } = await supabase
        .from('articles')
        .select('id, title, status, created_at, view_count, author_id, category_id');

      if (!error && articles) {
        setStats({
          totalArticles: articles.length,
          publishedArticles: articles.filter(a => a.status === 'published').length,
          draftArticles: articles.filter(a => a.status === 'draft').length,
          totalViews: articles.reduce((sum, a) => sum + (a.view_count || 0), 0),
        });

        // Get recent articles with joins
        const recent = articles
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5);
        
        setRecentArticles(recent);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Celkem článků',
      value: stats.totalArticles,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Publikované',
      value: stats.publishedArticles,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-400',
    },
    {
      label: 'Koncepty',
      value: stats.draftArticles,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-400',
    },
    {
      label: 'Celkem zobrazení',
      value: stats.totalViews,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
    },
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
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Vítejte zpět, {user?.name}
        </h1>
        <p className="text-white/60">
          Spravujte obsah webu ZFP Břeclav
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} border border-white/10 rounded-xl p-4 md:p-6`}
          >
            <div className={`${stat.iconColor} mb-3`}>{stat.icon}</div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {loading ? '...' : stat.value}
            </div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
          href="/admin/clanky/novy"
          className="group bg-gradient-to-r from-zfp-gold/20 to-zfp-orange/20 border border-zfp-gold/30 rounded-xl p-6 hover:border-zfp-gold/50 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zfp-gold/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">Nový článek</h3>
              <p className="text-white/60 text-sm">Vytvořte nový obsah</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/clanky?status=draft"
          className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">Rozpracované</h3>
              <p className="text-white/60 text-sm">{stats.draftArticles} konceptů</p>
            </div>
          </div>
        </Link>

        <Link
          href="/poradna"
          target="_blank"
          className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">Zobrazit poradnu</h3>
              <p className="text-white/60 text-sm">Otevřít na webu</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Articles */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Poslední články</h2>
          <Link
            href="/admin/clanky"
            className="text-sm text-zfp-orange hover:text-zfp-orange-hover transition-colors"
          >
            Zobrazit vše →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-zfp-orange border-t-transparent rounded-full" />
          </div>
        ) : recentArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Zatím žádné články</h3>
            <p className="text-white/60 mb-4">Začněte vytvořením prvního článku</p>
            <Link
              href="/admin/clanky/novy"
              className="inline-flex items-center gap-2 px-4 py-2 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Vytvořit článek
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/admin/clanky/${article.id}`}
                className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all group"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="text-white font-medium truncate group-hover:text-zfp-orange transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {new Date(article.created_at).toLocaleDateString('cs-CZ')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[article.status]?.color || 'bg-gray-500/20 text-gray-400'}`}>
                  {statusLabels[article.status]?.label || article.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
