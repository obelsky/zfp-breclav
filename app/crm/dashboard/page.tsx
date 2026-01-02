'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NotificationSettings from '@/components/crm/NotificationSettings';
import PWAInstallPrompt from '@/components/crm/PWAInstallPrompt';
import { useCRMAuth } from '@/contexts/CRMAuthContext';
import { getLeads, getLeadStats } from '@/utils/crmStorage';
import { Lead, STATUS_LABELS, SOURCE_LABELS } from '@/types/crm';

export default function Dashboard() {
  const { user } = useCRMAuth();
  const [stats, setStats] = useState({ total: 0, new: 0, inProgress: 0, closed: 0 });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const statsData = await getLeadStats();
    setStats(statsData);
    
    const leads = await getLeads();
    const recent = leads
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
    setRecentLeads(recent);
  };

  const statCards = [
    { 
      label: 'Celkem poptávek', 
      value: stats.total, 
      color: 'from-blue-500/20 to-cyan-500/20',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      label: 'Nové', 
      value: stats.new, 
      color: 'from-green-500/20 to-emerald-500/20',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    { 
      label: 'V řešení', 
      value: stats.inProgress, 
      color: 'from-orange-500/20 to-yellow-500/20',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      label: 'Uzavřené', 
      value: stats.closed, 
      color: 'from-purple-500/20 to-pink-500/20',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex-1 px-4 md:px-8 pt-20 lg:pt-8 lg:ml-64">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/60 mb-4">Vítejte zpět, {user?.name}</p>
        
        {/* Quick Navigation - Desktop only */}
        <div className="hidden lg:flex gap-3 mt-4">
          <Link 
            href="/crm/dashboard"
            className="px-4 py-2 bg-zfp-orange text-white rounded-lg font-medium transition-all"
          >
            Dashboard
          </Link>
          <Link 
            href="/crm/leads"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all"
          >
            Poptávky
          </Link>
          {user?.role === 'admin' && (
            <Link 
              href="/crm/advisors"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all"
            >
              Poradci
            </Link>
          )}
        </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${card.color} border border-white/10 rounded-xl p-6`}
            >
              <div className="text-zfp-gold mb-3">{card.icon}</div>
              <div className="text-3xl font-bold mb-1">{card.value}</div>
              <div className="text-sm text-white/60">{card.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Notification Settings - Mobile CRM Features */}
        <div className="mb-8">
          <NotificationSettings />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Poslední poptávky</h2>
            <Link href="/crm/leads" className="text-sm text-zfp-orange hover:text-zfp-orange-hover">
              Zobrazit vše →
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg mb-2">Zatím žádné poptávky</p>
              <p className="text-sm">Poptávky se zobrazí jakmile je klient odešle přes formulář nebo kalkulačku</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/crm/leads/${lead.id}`}
                  className="block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{lead.first_name} {lead.last_name}</div>
                      <div className="text-sm text-white/60">{lead.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/40">{SOURCE_LABELS[lead.source]}</div>
                      <div className="text-xs text-white/60 mt-1">
                        {new Date(lead.created_at).toLocaleDateString('cs-CZ')}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}
