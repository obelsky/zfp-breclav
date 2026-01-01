'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function OKancelariPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const sections = [
    {
      title: 'Kdo jsme',
      description: 'Poznejte tým lidí, kteří vám pomohou s financemi',
      href: '/o-kancelari/kdo-jsme',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Hodnoty',
      description: 'Principy, kterými se řídíme při práci s klienty',
      href: '/o-kancelari/hodnoty',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Vzdělávání jako základ',
      description: 'Proč se neustále vzděláváme a jak to pomáhá vám',
      href: '/o-kancelari/vzdelavani',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Napojení na ZFP',
      description: 'Výhody spolupráce s celou skupinou ZFP GROUP',
      href: '/o-kancelari/napojeni-na-zfp',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Licence & odpovědnost',
      description: 'Certifikace, zkoušky a profesní odpovědnost našeho týmu',
      href: '/o-kancelari/licence-odpovednost',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          {/* Hero with Team Photo */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
            <div className="mb-6"><div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" /></div>
            <h1 className="mb-6">O kanceláři</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <p className="text-xl text-white/70 leading-relaxed mb-6">
                  Jsme finanční kancelář v Břeclavi s jasným cílem: pomoct vám rozumět financím 
                  a dělat rozhodnutí, která vám dávají smysl.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-zfp-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-white/80">Součást <strong className="text-zfp-gold">ZFP GROUP</strong> - finanční skupiny s tradicí od roku 1995</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-zfp-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-white/80">Tým <strong className="text-zfp-gold">certifikovaných specialistů</strong> s profesní odpovědností</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-zfp-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-white/80">Komplexní služby: <strong className="text-zfp-gold">hypotéky, investice, pojištění, reality</strong></p>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/team/tym-zfp-breclav.png"
                  alt="Tým ZFP GROUP Břeclav"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { number: '30+', label: 'Let zkušeností ZFP GROUP' },
              { number: '5', label: 'Specialistů v týmu' },
              { number: '500+', label: 'Spokojených klientů' },
              { number: '100%', label: 'Osobní přístup' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-xl p-6 text-center"
              >
                <div className="text-4xl font-bold text-zfp-orange mb-2">{stat.number}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Sections Grid */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Poznejte nás blíž</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={section.href} className="block h-full group">
                    <div className="h-full bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-zfp-gold transition-all duration-300">
                      <div className="text-zfp-gold mb-4 group-hover:text-zfp-orange transition-colors">
                        {section.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-zfp-gold transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {section.description}
                      </p>
                      <div className="inline-flex items-center text-zfp-orange text-sm group-hover:translate-x-2 transition-transform">
                        <span className="font-semibold">Zjistit více</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Proč ZFP GROUP Břeclav</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: 'Silné zázemí', 
                  desc: 'Součást ZFP GROUP s tradicí od roku 1995. Finanční stabilita a 500+ poradců po celé ČR.' 
                },
                { 
                  title: 'Komplexní řešení', 
                  desc: 'Hypotéky, investice, pojištění, reality - všechno pod jednou střechou.' 
                },
                { 
                  title: 'Certifikovaní specialisté', 
                  desc: 'Tým s profesními certifikacemi (PFP, DiS.) a pojištěním odpovědnosti.' 
                },
                { 
                  title: 'Transparentnost', 
                  desc: 'Vysvětlíme vše srozumitelně. Žádné skryté poplatky ani překvapení.' 
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-zfp-gold/20 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-zfp-orange">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl mb-6">Chcete nás poznat osobně?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Přijďte na konzultaci do naší kanceláře v Břeclavi nebo se spojte online
            </p>
            <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105">
              Domluvit setkání
            </button>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="Kontakt s kanceláří" subject="o-kancelari" />
    </>
  );
}
