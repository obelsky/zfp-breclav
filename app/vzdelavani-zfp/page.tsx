'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import EducationIcon from '@/components/icons/EducationIcon';

export default function EducationZFPPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <div className="mb-6 text-zfp-gold">
              <EducationIcon className="w-16 h-16" />
            </div>

            <h1 className="mb-6">Vzdělávání ZFP</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Trochu jiné vzdělávání. Ne teoretické, ale praktické. Ne složité, ale jasné. 
              Naučte se rozumět financím tak, abyste mohli dělat informovaná rozhodnutí.
            </p>
          </motion.div>

          {/* Philosophy */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-6">Proč vzdělávání?</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Mnoho lidí chce mít v penězích jasno, ale neví, jak začít. Závislost na radách ostatních 
              může být riskantní. Nejlepší investicí jsou kvalitní informace.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              Proto ZFP staví na vzdělávání. Od roku 1995 jsme proškolili přes 300 000 účastníků 
              na 4 200 seminářích. Víme, jak vysvětlit finance srozumitelně.
            </p>
          </div>

          {/* Education Levels */}
          <div className="mb-20">
            <h2 className="text-3xl mb-12">Tři úrovně vzdělání</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Level 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <Link href="/vzdelavani-zfp/financni-minimum" className="block h-full">
                  <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-zfp-gold transition-all duration-500">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-zfp-gold font-semibold tracking-wider uppercase">Úroveň 1</span>
                      <div className="w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold">
                        1
                      </div>
                    </div>
                    
                    <h3 className="text-2xl mb-4 group-hover:text-zfp-gold transition-colors">
                      Finanční minimum
                    </h3>
                    
                    <p className="text-white/60 mb-6 leading-relaxed">
                      Základní seminář pro každého. Naučíte se ochočit své finance, 
                      zabezpečit rodinu a efektivně spravovat peníze.
                    </p>
                    
                    <div className="flex items-center text-zfp-orange text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-2">Zjistit více</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Level 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group"
              >
                <Link href="/vzdelavani-zfp/financni-prehled" className="block h-full">
                  <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-zfp-gold transition-all duration-500">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-zfp-gold font-semibold tracking-wider uppercase">Úroveň 2</span>
                      <div className="w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold">
                        2
                      </div>
                    </div>
                    
                    <h3 className="text-2xl mb-4 group-hover:text-zfp-gold transition-colors">
                      Finanční přehled
                    </h3>
                    
                    <p className="text-white/60 mb-6 leading-relaxed">
                      Prohloubení znalostí. Produkty, trh, komplexní poradenství. 
                      Pro ty, kdo chtějí rozumět financím do hloubky.
                    </p>
                    
                    <div className="flex items-center text-zfp-orange text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-2">Zjistit více</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Level 3 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <Link href="/vzdelavani-zfp/navazujici-vzdelavani" className="block h-full">
                  <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-zfp-gold transition-all duration-500">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-zfp-gold font-semibold tracking-wider uppercase">Úroveň 3</span>
                      <div className="w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold">
                        3
                      </div>
                    </div>
                    
                    <h3 className="text-2xl mb-4 group-hover:text-zfp-gold transition-colors">
                      Navazující vzdělávání
                    </h3>
                    
                    <p className="text-white/60 mb-6 leading-relaxed">
                      Specializace na konkrétní oblasti. Hypotéky, investice, 
                      korporátní finance. Pro budoucí profesionály.
                    </p>
                    
                    <div className="flex items-center text-zfp-orange text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-2">Zjistit více</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* How System Works */}
          <div className="mb-20">
            <Link
              href="/vzdelavani-zfp/jak-funguje-system"
              className="block group"
            >
              <div className="bg-gradient-to-br from-zfp-orange/20 to-zfp-dark border border-zfp-orange/30 rounded-2xl p-8 lg:p-12 hover:border-zfp-orange transition-all duration-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-3xl mb-4 group-hover:text-zfp-orange transition-colors">
                      Jak funguje systém ZFP?
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
                      Jedinečný vzdělávací systém s mezinárodní certifikací. 
                      Zjistěte, jak probíhají semináře a co vás čeká.
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0 ml-6">
                    <div className="w-12 h-12 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange group-hover:bg-zfp-orange group-hover:text-white transition-all">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '300 000+', label: 'Vyškolených účastníků' },
              { number: '4 200+', label: 'Seminářů celkem' },
              { number: '170+', label: 'Zkušených lektorů' },
              { number: '30 let', label: 'Zkušeností' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-zfp-orange mb-2">{stat.number}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl mb-6">Máte zájem o vzdělávání?</h2>
            <p className="text-xl text-white/70 mb-8">
              Ozvěte se nám a probereme vaše možnosti
            </p>
            
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Chci vědět více
            </button>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Zájem o vzdělávání ZFP"
        subject="vzdelavani"
      />
    </>
  );
}
