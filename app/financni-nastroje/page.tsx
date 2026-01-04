'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FinancniNastrojePage() {
  const tools = [
    {
      href: '/bydleni-hypoteky/kalkulacka',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Hypoteční kalkulačka',
      description: 'Spočítejte si měsíční splátku a celkové náklady hypotéky. Zjistěte, kolik přeplatíte na úrocích.',
      color: 'from-purple-500/20 to-indigo-500/20',
      borderColor: 'border-purple-500/30',
      badge: 'Hypotéka',
    },
    {
      href: '/financni-nastroje/kde-mizi-penize',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Kde mizí moje peníze?',
      description: 'Analyzér výdajů odhalí, kam vám peníze mizí. Zjistěte překvapivá čísla a najděte skryté úspory.',
      color: 'from-red-500/20 to-orange-500/20',
      borderColor: 'border-red-500/30',
      badge: 'Analýza výdajů',
    },
    {
      href: '/financni-nastroje/duchod',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Důchodová kalkulačka',
      description: 'Spočítejte si, kolik budete potřebovat na důchod. Státní důchod nebude stačit - zjistěte proč.',
      color: 'from-blue-500/20 to-purple-500/20',
      borderColor: 'border-blue-500/30',
      badge: 'Plánování budoucnosti',
    },
    {
      href: '/financni-nastroje/financni-zdravi',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Finanční zdraví score',
      description: 'Získejte své finanční skóre 0-100 bodů. Porovnejte se s průměrem a zjistěte, jak na tom jste.',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      badge: 'Gamifikace',
    },
    {
      href: '/bydleni-hypoteky/refinancovani',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: 'Refinancování hypotéky',
      description: 'Ušetřete desítky tisíc ročně refinancováním hypotéky. Zjistěte, kolik můžete ušetřit.',
      color: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'border-yellow-500/30',
      badge: 'Úspora peněz',
    },
    {
      href: '/financni-poradenstvi/investice',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Kalkulačka spoření',
      description: 'Zjistěte, jak může růst váš kapitál při pravidelném investování. Interaktivní graf zobrazí vývoj.',
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      badge: 'Investování',
    },
    {
      href: '/financni-poradenstvi/pojisteni',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Pojistná kalkulačka',
      description: 'Interaktivní test odhalí mezery ve vašem pojištění. Zjistěte, co vám chybí.',
      color: 'from-indigo-500/20 to-purple-500/20',
      borderColor: 'border-indigo-500/30',
      badge: 'Ochrana',
    },
    {
      href: '/financni-poradenstvi/reality',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Kolik si můžu dovolit?',
      description: 'Spočítejte si maximální cenu nemovitosti podle vašeho příjmu a úspor.',
      color: 'from-rose-500/20 to-pink-500/20',
      borderColor: 'border-rose-500/30',
      badge: 'Reality',
    },
    {
      href: '/esanon',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'eŠanon - Digitální přehled',
      description: 'Mějte všechny své finanční produkty na jednom místě. Mobilní aplikace pro přehled investic, pojištění a úvěrů.',
      color: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-500/30',
      badge: 'Mobilní app',
    },
  ];

  return (
    <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        
        {/* Breadcrumb */}
        <Link 
          href="/"
          className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zpět na hlavní stránku
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="mb-6">
            <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
          </div>

          <h1 className="mb-6">Finanční nástroje</h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            Kompletní sada 9 kalkulaček a nástrojů pro vaše finance. 
            Od hypotéky přes analýzu výdajů až po mobilní přehled - vše zdarma a nezávazně.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={tool.href}>
                <div className={`group h-full bg-gradient-to-br ${tool.color} border-2 ${tool.borderColor} rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden`}>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 font-medium">
                      {tool.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                    <div className="text-zfp-gold">
                      {tool.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {tool.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center text-zfp-gold group-hover:translate-x-2 transition-transform">
                    <span className="font-semibold mr-2">Vyzkoušet nástroj</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Decorative circles */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-zfp-gold/5 rounded-full blur-2xl" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center bg-gradient-to-r from-zfp-gold/10 to-zfp-orange/10 border border-zfp-gold/30 rounded-2xl p-12"
        >
          <h2 className="text-3xl mb-4">Potřebujete osobní konzultaci?</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Naše nástroje jsou skvělým začátkem, ale každá situace je jedinečná. 
            Rádi vám pomůžeme osobně.
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-bold tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Kontaktujte nás
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
