'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';

export default function ESanonPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center max-w-4xl mx-auto"
          >
            <div className="mb-6 flex justify-center">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <h1 className="mb-6">eŠanon - Digitální přehled vašich financí</h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Mějte všechny své finanční produkty na jednom místě. Sledujte investice, 
              pojištění, úvěry a spoření přehledně v mobilní aplikaci.
            </p>
          </motion.div>

          {/* App Preview */}
          <div className="mb-20 max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-zfp-gold/20 to-zfp-orange/20 blur-3xl rounded-full" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <Image
                  src="/esanon.webp"
                  alt="eŠanon aplikace"
                  width={800}
                  height={600}
                  className="mx-auto rounded-2xl"
                />
              </motion.div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-3xl mb-12 text-center">Co vše najdete v aplikaci eŠanon</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                  title: 'Investice',
                  items: ['Investiční účet', 'Penzijní spoření', 'Cenné kovy'],
                  color: 'from-green-500/10 to-emerald-500/10',
                  borderColor: 'border-green-500/30',
                  iconColor: 'text-green-400',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Pojištění',
                  items: ['Životní pojištění', 'Neživotní pojištění', 'Přehled krytí'],
                  color: 'from-blue-500/10 to-cyan-500/10',
                  borderColor: 'border-blue-500/30',
                  iconColor: 'text-blue-400',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ),
                  title: 'Úvěry',
                  items: ['Hypoteční úvěr', 'Spotřebitelský úvěr', 'Splátkový kalendář'],
                  color: 'from-purple-500/10 to-pink-500/10',
                  borderColor: 'border-purple-500/30',
                  iconColor: 'text-purple-400',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Spoření',
                  items: ['ZFP Rezerva', 'Stavební spoření', 'Dlouhodobé cíle'],
                  color: 'from-orange-500/10 to-red-500/10',
                  borderColor: 'border-orange-500/30',
                  iconColor: 'text-orange-400',
                },
              ].map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`bg-gradient-to-br ${category.color} border ${category.borderColor} rounded-2xl p-6 hover:scale-105 transition-transform duration-300`}
                >
                  <div className={`${category.iconColor} mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex items-start text-sm text-white/70">
                        <svg className="w-4 h-4 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8 text-center">Proč používat eŠanon?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Mobilní přístup 24/7',
                  description: 'Kontrolujte své finance kdykoliv a odkudkoliv',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: 'Přehledné grafy',
                  description: 'Vizualizace vývoje investic a úspor',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  ),
                  title: 'Notifikace',
                  description: 'Upozornění na důležité události a termíny',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: 'Bezpečné',
                  description: 'Šifrovaný přenos dat a dvojfaktorové ověření',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: 'Dokumenty online',
                  description: 'Všechny smlouvy a výpisy na jednom místě',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Historie transakcí',
                  description: 'Kompletní přehled všech operací',
                },
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-zfp-gold">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-sm text-white/60">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Get Started */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8 text-center">Jak začít s eŠanon?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'Kontaktujte nás',
                  description: 'Ozvěte se nám a my vám pomůžeme s registrací',
                },
                {
                  step: '02',
                  title: 'Aktivace účtu',
                  description: 'Získáte přístupové údaje a provedeme vás nastavením',
                },
                {
                  step: '03',
                  title: 'Začněte používat',
                  description: 'Stáhněte si aplikaci a mějte finance pod kontrolou',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-zfp-orange/20 rounded-full text-zfp-orange font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Download QR Codes Section */}
          <div className="text-center bg-gradient-to-br from-zfp-orange/10 to-zfp-gold/10 border border-zfp-orange/30 rounded-2xl p-12">
            <h2 className="text-3xl mb-4">Stáhněte si aplikaci eŠanon</h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Naskenujte QR kód a získejte rychlý přístup k vaším financím
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
              {/* Apple App Store */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-6">
                  <Image
                    src="/apple.svg"
                    alt="App Store"
                    width={200}
                    height={60}
                    className="mx-auto"
                  />
                </div>
                <div className="bg-white p-4 rounded-xl inline-block">
                  <Image
                    src="/appStoreQR.svg"
                    alt="App Store QR kód"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </div>
                <p className="text-sm text-white/60 mt-4">
                  Naskenujte pro iOS zařízení
                </p>
              </motion.div>

              {/* Google Play */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-6">
                  <Image
                    src="/google.png"
                    alt="Google Play"
                    width={200}
                    height={60}
                    className="mx-auto"
                  />
                </div>
                <div className="bg-white p-4 rounded-xl inline-block">
                  <Image
                    src="/googlePlayQR.svg"
                    alt="Google Play QR kód"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </div>
                <p className="text-sm text-white/60 mt-4">
                  Naskenujte pro Android zařízení
                </p>
              </motion.div>
            </div>

            <div className="mt-12">
              <p className="text-white/50 text-sm mb-4">
                Nebo nás kontaktujte a my vám pomůžeme s instalací
              </p>
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="inline-flex items-center gap-2 text-zfp-gold hover:text-zfp-orange transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Potřebuji pomoct s instalací</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Zájem o eŠanon"
        subject="esanon"
      />
    </>
  );
}
