'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function CategoryPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const categoryInfo = {
    finance: {
      title: 'Finance',
      description: 'Praktické rady o rozpočtu, spoření a finančním plánování',
      color: 'text-zfp-gold',
    },
    investovani: {
      title: 'Investování',
      description: 'Jak investovat, kam dát peníze a jak se vyhnout chybám',
      color: 'text-green-400',
    },
    pojisteni: {
      title: 'Pojištění',
      description: 'Jak se správně pojistit a neplatit zbytečně',
      color: 'text-blue-400',
    },
    reality: {
      title: 'Reality',
      description: 'Koupě, prodej a financování nemovitostí',
      color: 'text-zfp-orange',
    },
    legislativa: {
      title: 'Legislativa',
      description: 'Zákony, daně a změny, které vás ovlivňují',
      color: 'text-purple-400',
    },
  };

  const slug = 'legislativa';
  const category = categoryInfo[slug] || categoryInfo.finance;

  const articles = [
    {
      title: 'Připravujeme obsah',
      excerpt: 'Tato sekce se právě připravuje. Brzy zde najdete užitečné články a rady.',
      date: 'Brzy',
      readTime: '-',
    },
  ];

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <Link href="/poradna" className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na Poradnu
          </Link>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <div className="mb-6"><div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" /></div>
            <h1 className={`mb-6 ${category.color}`}>{category.title}</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              {category.description}
            </p>
          </motion.div>

          {/* Articles List */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Články</h2>
            <div className="space-y-6">
              {articles.map((article, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-white/60 text-sm mb-3">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime} čtení</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl mb-6">Potřebujete osobní radu?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Spojte se s námi a probereme vaši situaci
            </p>
            <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105">
              Kontaktovat poradce
            </button>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="Dotaz" subject="poradna-${slug}" />
    </>
  );
}
