'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import AdvisoryIcon from '@/components/icons/AdvisoryIcon';

export default function GetOverviewPage() {
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
            className="mb-16"
          >
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <div className="mb-6 text-zfp-gold">
              <AdvisoryIcon className="w-16 h-16" />
            </div>

            <h1 className="mb-6">Chci mít přehled, ale neřešit detaily</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Rozumíte tomu, že finance jsou důležité, ale nechcete trávit čas mikromanagementem. 
              Chcete mít spolehlivého partnera.
            </p>
          </motion.div>

          {/* Služby poradenství */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Naše služby pro vás</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Finanční plánování */}
              <Link href="/poradenstvi/sluzby/financni-planovani">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-xl p-6 hover:border-blue-500/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        Komplexní finanční plán
                      </h3>
                      <p className="text-white/60 text-sm">
                        Kompletní analýza vaší finanční situace a strategie pro budoucnost
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Investice */}
              <Link href="/poradenstvi/sluzby/investice">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group h-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-xl p-6 hover:border-green-500/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">
                        Správa investic a spoření
                      </h3>
                      <p className="text-white/60 text-sm">
                        Dlouhodobé investice, spoření na cíle a důchod
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Hypotéky */}
              <Link href="/bydleni-hypoteky">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                        Hypotéky a úvěry
                      </h3>
                      <p className="text-white/60 text-sm">
                        Najdeme nejlepší řešení pro bydlení z celého trhu
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Pojištění */}
              <Link href="/poradenstvi/sluzby/pojisteni">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group h-full bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-xl p-6 hover:border-orange-500/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                        Pojištění rodiny a majetku
                      </h3>
                      <p className="text-white/60 text-sm">
                        Optimální ochrana pro vás a vaše blízké
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Reality */}
              <Link href="/poradenstvi/sluzby/reality">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group h-full bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500/30 rounded-xl p-6 hover:border-yellow-500/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors">
                        Poradenství v oblasti nemovitostí
                      </h3>
                      <p className="text-white/60 text-sm">
                        Zjistěte, kolik si můžete dovolit a jak na financování
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Další služby */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="group h-full bg-gradient-to-br from-gray-500/10 to-slate-500/10 border-2 border-gray-500/30 rounded-xl p-6 hover:border-gray-500/60 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      Daňová optimalizace a další služby
                    </h3>
                    <p className="text-white/60 text-sm">
                      Pravidelné kontroly a průběžná optimalizace vašich financí
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Co získáte */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Co získáte</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Ušetříte čas',
                  description: 'Nemusíte se prokousávat složitými produkty a srovnávat nabídky',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Objektivní přehled',
                  description: 'Pracujeme s celým trhem, nejsme vázáni na jednu společnost',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Optimalizace nákladů',
                  description: 'Často najdeme úspory, které vám zaplatí naše služby několikrát',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  title: 'Podpora kdykoliv',
                  description: 'Jsme tu pro vás, když potřebujete poradit nebo něco změnit',
                },
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-zfp-gold mt-1">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-white/60 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl mb-6">Chcete mít finance v pořádku?</h2>
            <p className="text-xl text-white/70 mb-8">
              Domluvíme si nezávaznou schůzku a probereme vaši situaci
            </p>
            
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Chci osobního poradce
            </button>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Zájem o poradenství"
        subject="poradenstvi"
      />
    </>
  );
}
