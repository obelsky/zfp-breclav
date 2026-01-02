'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import EducationIcon from '@/components/icons/EducationIcon';

export default function UnderstandFinancePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <Link 
            href="/jak-vam-muzeme-pomoci"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na Jak vám můžeme pomoci
          </Link>

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

            <h1 className="mb-6">Chci rozumět svým financím</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Věříme, že informovaný člověk dělá lepší rozhodnutí. Proto nabízíme vzdělávání 
              bez tlaku na sjednání produktů.
            </p>
          </motion.div>

          {/* Vzdělávací programy */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Naše vzdělávací programy</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Finanční minimum */}
              <Link href="/financni-vzdelavani/financni-minimum">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        Finanční minimum
                      </h3>
                      <p className="text-blue-300/60 text-sm mb-3">Úroveň 1 • 8 lekcí</p>
                    </div>
                  </div>
                  
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Základy finanční gramotnosti - od rodinného rozpočtu po principy investování. 
                    Naučte se orientovat ve financích a dělat informovaná rozhodnutí.
                  </p>

                  <div className="flex items-center text-blue-400 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Začít vzdělávání</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.div>
              </Link>

              {/* Finanční přehled */}
              <Link href="/financni-vzdelavani/financni-prehled">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                        Finanční přehled
                      </h3>
                      <p className="text-purple-300/60 text-sm mb-3">Úroveň 2 • Pokročilé</p>
                    </div>
                  </div>
                  
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Pokročilé znalosti pro komplexní finanční plánování. Produkty, trh, 
                    daně a strategické rozhodování pro váš finanční růst.
                  </p>

                  <div className="flex items-center text-purple-400 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Pokračovat ve vzdělávání</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Praktické nástroje */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Vyzkoušejte si to v praxi</h2>
            <p className="text-xl text-white/60 mb-8 max-w-3xl">
              Máme pro vás 8 kalkulaček, které vám pomohou rychle zjistit, jak jste na tom finančně
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Finanční zdraví',
                  description: 'Zjistěte své skóre',
                  href: '/financni-nastroje/financni-zdravi',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  color: 'from-green-500/20 to-emerald-500/20',
                  borderColor: 'border-green-500/30 hover:border-green-500/60',
                  textColor: 'text-green-400',
                },
                {
                  title: 'Kde mizí peníze?',
                  description: 'Analyzujte výdaje',
                  href: '/financni-nastroje/kde-mizi-penize',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                  color: 'from-orange-500/20 to-red-500/20',
                  borderColor: 'border-orange-500/30 hover:border-orange-500/60',
                  textColor: 'text-orange-400',
                },
                {
                  title: 'Kalkulačka spoření',
                  description: 'Naplánujte budoucnost',
                  href: '/poradenstvi/sluzby/investice#savings-calculator',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                  color: 'from-blue-500/20 to-cyan-500/20',
                  borderColor: 'border-blue-500/30 hover:border-blue-500/60',
                  textColor: 'text-blue-400',
                },
                {
                  title: 'Důchodová kalkulačka',
                  description: 'Připravte se na důchod',
                  href: '/financni-nastroje/duchod',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  color: 'from-purple-500/20 to-pink-500/20',
                  borderColor: 'border-purple-500/30 hover:border-purple-500/60',
                  textColor: 'text-purple-400',
                },
              ].map((tool, i) => (
                <Link key={i} href={tool.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    className={`group bg-gradient-to-br ${tool.color} border ${tool.borderColor} rounded-xl p-6 transition-all duration-300 cursor-pointer h-full`}
                  >
                    <div className={`${tool.textColor} mb-4 group-hover:scale-110 transition-transform`}>
                      {tool.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{tool.title}</h4>
                    <p className="text-sm text-white/60">{tool.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/financni-nastroje"
                className="inline-flex items-center gap-2 text-zfp-gold hover:text-zfp-orange transition-colors"
              >
                <span>Zobrazit všech 8 kalkulaček</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Jak to funguje</h2>
            
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Nezávazná konzultace',
                  description: 'Probereme, co vás zajímá a v čem si chcete vylepšit orientaci',
                },
                {
                  step: '02',
                  title: 'Vzdělávací programy',
                  description: 'Nabídneme vám vhodné vzdělávací programy ZFP nebo osobní lekce',
                },
                {
                  step: '03',
                  title: 'Vaše tempo',
                  description: 'Postupujete svým tempem, bez tlaku a závazků',
                },
                {
                  step: '04',
                  title: 'Podpora',
                  description: 'Jsme tu, když budete potřebovat poradit nebo něco vyjasnit',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-4">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl mb-6">Začněte svou cestu ke finanční gramotnosti</h2>
            <p className="text-xl text-white/70 mb-8">
              První konzultace je zdarma a nezávazná
            </p>
            
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Chci se dozvědět více
            </button>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Zájem o finanční vzdělávání"
        subject="vzdelavani"
      />
    </>
  );
}
