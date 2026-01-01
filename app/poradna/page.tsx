'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function PoradnaPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const categories = [
    {
      name: 'Finance',
      slug: 'finance',
      description: 'Praktické rady o rozpočtu, spoření a finančním plánování',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-zfp-gold',
    },
    {
      name: 'Investování',
      slug: 'investovani',
      description: 'Jak investovat, kam dát peníze a jak se vyhnout chybám',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'text-green-400',
    },
    {
      name: 'Pojištění',
      slug: 'pojisteni',
      description: 'Jak se správně pojistit a neplatit zbytečně',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'text-blue-400',
    },
    {
      name: 'Reality',
      slug: 'reality',
      description: 'Koupě, prodej a financování nemovitostí',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      color: 'text-zfp-orange',
    },
    {
      name: 'Legislativa',
      slug: 'legislativa',
      description: 'Zákony, daně a změny, které vás ovlivňují',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'text-purple-400',
    },
  ];

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <div className="mb-6"><div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" /></div>
            <h1 className="mb-6">Finanční poradna</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Praktické rady, tipy a novinky ze světa financí. Pomůžeme vám rozumět penězům lépe.
            </p>
          </motion.div>

          {/* Categories Grid */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Kategorie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/poradna/${category.slug}`} className="block h-full group">
                    <div className="h-full bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-zfp-gold transition-all duration-300">
                      <div className={`${category.color} mb-4 group-hover:text-zfp-orange transition-colors`}>
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-zfp-gold transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {category.description}
                      </p>
                      <div className="inline-flex items-center text-zfp-orange text-sm group-hover:translate-x-2 transition-transform">
                        <span className="font-semibold">Zobrazit články</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl mb-6">Máte konkrétní otázku?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Nenašli jste odpověď v článcích? Spojte se s námi a probereme vaši situaci
            </p>
            <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105">
              Zeptat se odborníka
            </button>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="Dotaz do poradny" subject="poradna" />
    </>
  );
}
