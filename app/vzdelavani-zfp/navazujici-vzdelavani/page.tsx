'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function AdvancedEducationPage() {
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
              <span className="text-sm text-zfp-gold font-semibold tracking-wider uppercase">Úroveň 3</span>
            </div>

            <h1 className="mb-6">Navazující vzdělávání</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Specializace na konkrétní oblasti. Hypotéky, investice, korporátní finance. 
              Pro ty, kdo zvažují profesionální kariéru ve financích nebo chtějí být opravdovými experty.
            </p>
          </motion.div>

          {/* Prerequisites */}
          <div className="mb-16 bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-amber-200">Předpoklad</h3>
            <p className="text-white/70">
              Absolvování <Link href="/vzdelavani-zfp/financni-prehled" className="text-zfp-orange hover:underline">Finančního přehledu</Link> a zájem o profesionální rozvoj ve financích.
            </p>
          </div>

          {/* Specializations */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Oblasti specializace</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: 'Hypotéky a bydlení',
                  description: 'Staňte se expertem na hypotéky. Bonity, LTV, fixace, refinancování. Právní aspekty. Práce s klientem v procesu získání hypotéky.',
                  topics: ['Hypoteční produkty', 'Bonita klienta', 'Proces schvalování', 'Rizika a zajištění'],
                },
                {
                  title: 'Investice a kapitálové trhy',
                  description: 'Hlubší pochopení investic. Akcie, dluhopisy, fondy, alternativní investice. Portfolio management. Analýza rizik.',
                  topics: ['Akciové trhy', 'Dluhopisyy', 'Fondy', 'Diverzifikace portfolia'],
                },
                {
                  title: 'Korporátní finance',
                  description: 'Finance pro firmy a podnikatele. Financování podnikání. Cash flow management. Daňová optimalizace pro OSVČ.',
                  topics: ['Podnikové finance', 'Financování růstu', 'Daně pro firmy', 'Risk management'],
                },
                {
                  title: 'Pojištění - pokročilé',
                  description: 'Komplexní pojistná řešení. Korporátní pojištění. Náhrada škody. Reklamace. Legislativa.',
                  topics: ['Složité případy', 'Korporátní pojištění', 'Právní aspekty', 'Likvidace škod'],
                },
              ].map((spec, i) => (
                <div key={i} className="bg-zfp-dark border border-white/10 rounded-xl p-8 hover:border-zfp-gold transition-all">
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-6">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3 text-zfp-gold">{spec.title}</h3>
                      <p className="text-white/70 leading-relaxed mb-6">{spec.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {spec.topics.map((topic, j) => (
                          <span 
                            key={j} 
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Path */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Kariérní cesta</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10">
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Navazující vzdělávání je vstupní branou do profesionální kariéry ve financích. 
                Po absolvování můžete:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Finanční poradce',
                    description: 'Poskytování komplexního finančního poradenství klientům',
                  },
                  {
                    title: 'Hypoteční specialista',
                    description: 'Specializace na hypotéky a financování bydlení',
                  },
                  {
                    title: 'Investiční poradce',
                    description: 'Správa portfolií a investičíporadenství',
                  },
                  {
                    title: 'Lektor',
                    description: 'Předávání znalostí dalším na seminářích ZFP',
                  },
                ].map((path, i) => (
                  <div key={i} className="flex items-start">
                    <svg className="w-6 h-6 text-zfp-gold mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold mb-1">{path.title}</h4>
                      <p className="text-sm text-white/60">{path.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co od vás očekáváme</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Znalost základů',
                  description: 'Absolvované Finanční minimum a Přehled',
                },
                {
                  title: 'Časová kapacita',
                  description: 'Ochota věnovat se dalšímu studiu',
                },
                {
                  title: 'Profesionální přístup',
                  description: 'Zájem o kariéru ve financích',
                },
              ].map((req, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3 text-zfp-gold">{req.title}</h3>
                  <p className="text-white/60 text-sm">{req.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-zfp-orange/20 to-zfp-dark border border-zfp-orange/30 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Zajímá vás profesionální kariéra?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Ozvěte se nám a probereme vaše možnosti rozvoje ve financích
            </p>
            
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Chci vědět více o kariéře
            </button>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Zájem o navazující vzdělávání"
        subject="kariera"
      />
    </>
  );
}
