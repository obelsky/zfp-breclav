'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import TeamIcon from '@/components/icons/TeamIcon';

export default function DevelopmentPage() {
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
              <TeamIcon className="w-16 h-16" />
            </div>

            <h1 className="mb-6">Chci se stát finančním profesionálem</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Zajímá vás profesionální vzdělávání ve financích, chcete se rozvíjet 
              nebo zvažujete kariéru finančního poradce.
            </p>
          </motion.div>

          {/* Vzdělávací systém ZFP */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Vzdělávací systém ZFP GROUP</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Finanční minimum */}
              <Link href="/vzdelavani-zfp/financni-minimum">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 text-2xl font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-blue-300/60 mb-1">Úroveň 1</p>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        Finanční minimum
                      </h3>
                      <p className="text-white/60 text-sm mb-4">
                        Základy finanční gramotnosti a principy poradenství
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {[
                      'Základy finančního plánování',
                      'Produkty a služby na trhu',
                      'Etika a profesní standardy',
                      'Komunikace s klienty',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-blue-400 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Prozkoumat program</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.div>
              </Link>

              {/* Finanční přehled */}
              <Link href="/vzdelavani-zfp/financni-prehled">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 text-2xl font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-purple-300/60 mb-1">Úroveň 2</p>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                        Finanční přehled
                      </h3>
                      <p className="text-white/60 text-sm mb-4">
                        Produkty, trh a komplexní poradenství
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {[
                      'Pokročilé finanční produkty',
                      'Analýza trhu a ekonomiky',
                      'Komplexní finanční plánování',
                      'Daňová optimalizace',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-purple-400 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Prozkoumat program</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </div>

            {/* Specializace */}
            <motion.div
              whileHover={{ scale: 1.01, y: -4 }}
              className="mt-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-2xl p-8 hover:border-orange-500/60 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 text-2xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-sm text-orange-300/60 mb-1">Úroveň 3</p>
                  <h3 className="text-2xl font-bold mb-2">
                    Specializace
                  </h3>
                  <p className="text-white/60">
                    Prohloubte si znalosti v konkrétních oblastech finančního poradenství
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    ),
                    title: 'Hypotéky',
                    description: 'Specialista na financování bydlení',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    ),
                    title: 'Investice',
                    description: 'Expert na správu portfolií',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    ),
                    title: 'Korporátní finance',
                    description: 'Poradenství pro firmy',
                  },
                ].map((spec, i) => (
                  <div key={i} className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <div className="text-orange-400 mb-2">
                      {spec.icon}
                    </div>
                    <h4 className="font-semibold mb-1">{spec.title}</h4>
                    <p className="text-sm text-white/60">{spec.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Kariérní možnosti */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Kariérní možnosti</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Finanční poradce',
                  description: 'Práce přímo s klienty, komplexní poradenství',
                  benefits: ['Flexibilní pracovní doba', 'Atraktivní odměňování', 'Rozvoj dovedností'],
                },
                {
                  title: 'Specializovaný konzultant',
                  description: 'Zaměření na konkrétní oblast (hypotéky, investice)',
                  benefits: ['Expertní pozice', 'Širší klientela', 'Vyšší příjmy'],
                },
                {
                  title: 'Vedoucí týmu',
                  description: 'Budování a vedení vlastního týmu poradců',
                  benefits: ['Manažerská pozice', 'Bonusy z týmu', 'Kariérní růst'],
                },
                {
                  title: 'Interní podpora',
                  description: 'Analytik, produktový specialista, školitel',
                  benefits: ['Stabilní pozice', 'Standardní pracovní doba', 'Rozvoj know-how'],
                },
              ].map((career, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                  <h3 className="text-xl font-semibold mb-2 text-zfp-gold">{career.title}</h3>
                  <p className="text-white/60 mb-4 text-sm">{career.description}</p>
                  <div className="space-y-2">
                    {career.benefits.map((benefit, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-zfp-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/70">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* O kanceláři */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Proč ZFP Břeclav?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-zfp-gold">Mladý tým s tradicí</h3>
                <p className="text-white/70 mb-4">
                  Naše kancelář spojuje energii mladého týmu s 30 lety zkušeností. Stavíme 
                  na základech, které položili manželé Polikavovi.
                </p>
                <Link 
                  href="/o-kancelari"
                  className="inline-flex items-center text-zfp-gold hover:text-zfp-orange transition-colors"
                >
                  <span>Více o kanceláři</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-zfp-gold">HRK 93 - část ZFP GROUP</h3>
                <p className="text-white/70 mb-4">
                  Jsme přímo podřízení vedení ZFP GROUP. Máte přístup k nejlepším produktům, 
                  vzdělávání a podpoře na trhu.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl mb-6">Zajímá vás kariéra ve financích?</h2>
            <p className="text-xl text-white/70 mb-8">
              Domluvme si nezávaznou schůzku a probereme vaše možnosti
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Chci vědět více
              </button>
              <Link
                href="/o-kancelari"
                className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 text-lg"
              >
                Poznat tým
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Zájem o kariéru ve financích"
        subject="kariera"
      />
    </>
  );
}
