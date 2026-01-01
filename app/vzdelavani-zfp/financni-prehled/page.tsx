'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function FinancialOverviewPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <Link 
            href="/vzdelavani-zfp"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
              <span className="text-sm text-zfp-gold font-semibold tracking-wider uppercase">Úroveň 2</span>
            </div>

            <h1 className="mb-6">Finanční přehled</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Prohloubení znalostí z Finančního minima. Produkty, trh, komplexní poradenství. 
              Pro ty, kdo chtějí rozumět financím do hloubky a být nezávislí na radách ostatních.
            </p>
          </motion.div>

          {/* Prerequisites */}
          <div className="mb-16 bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-amber-200">Předpoklad</h3>
            <p className="text-white/70">
              Absolvování <Link href="/vzdelavani-zfp/financni-minimum" className="text-zfp-orange hover:underline">Finančního minima</Link> nebo ekvivalentní znalost základů financí.
            </p>
          </div>

          {/* What You'll Learn */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co se naučíte</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Podrobná analýza finančních produktů',
                'Jak funguje finanční trh v ČR',
                'Komplexní finanční plánování',
                'Porovnávání produktů a poskytovatelů',
                'Daňová optimalizace',
                'Rizika a jak se jim vyhnout',
                'Investiční strategie',
                'Dlouhodobé plánování',
              ].map((item, i) => (
                <div key={i} className="flex items-start bg-white/5 border border-white/10 rounded-xl p-4">
                  <svg className="w-6 h-6 text-zfp-gold mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Modules */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Obsah vzdělávání</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Životní pojištění',
                  description: 'Zabezpečení rodiny a blízkých. Jak nastavit pojištění na míru. Porovnání pojišťoven a produktů.',
                },
                {
                  title: 'Investice a spoření',
                  description: 'Ochrana proti inflaci. Fondy, akcie, dluhopisy. Diverzifikace portfolia. Riziko vs. výnos.',
                },
                {
                  title: 'Doplňkové penzijní spoření',
                  description: 'Příprava na penzi. Státní příspěvky. Daňové výhody. Investiční strategie v důchodu.',
                },
                {
                  title: 'Stavební spoření',
                  description: 'Bezpečné spoření. Státní podpora. Výhodný úvěr. Kdy se vyplatí.',
                },
                {
                  title: 'Úvěry a hypotéky',
                  description: 'Jak fungují hypotéky. Na co si dát pozor. Refinancování. Srovnání bank.',
                },
                {
                  title: 'Neživotní pojištění',
                  description: 'Ochrana majetku. Pojištění odpovědnosti. Co pokrývá a co ne.',
                },
              ].map((module, i) => (
                <div key={i} className="bg-zfp-dark border border-white/10 rounded-xl p-8 hover:border-zfp-gold transition-all">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-6">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3 text-zfp-gold">{module.title}</h3>
                      <p className="text-white/60 leading-relaxed">{module.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Proč Finanční přehled?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Nezávislost',
                  description: 'Nebudete závislí na radách poradců. Budete umět posoudit, co je pro vás výhodné.',
                  icon: (
                    <svg className="w-12 h-12 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Úspora',
                  description: 'Kvalitní znalosti vám ušetří peníze. Vyhnete se nevýhodným produktům.',
                  icon: (
                    <svg className="w-12 h-12 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Jistota',
                  description: 'Budete vědět, že vaše finance jsou v pořádku a správně nastavené.',
                  icon: (
                    <svg className="w-12 h-12 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
              ].map((benefit, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-zfp-gold">{benefit.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-zfp-orange/20 to-zfp-dark border border-zfp-orange/30 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Chcete rozumět financím do hloubky?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Kontaktujte nás a dozvíte se více o Finančním přehledu
            </p>
            
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Mám zájem
            </button>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Zájem o Finanční přehled"
        subject="vzdelavani"
      />
    </>
  );
}
