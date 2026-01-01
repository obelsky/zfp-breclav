'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CalculatorsPage() {
  const calculators = [
    {
      title: 'Hypoteční kalkulačka',
      description: 'Spočítejte si měsíční splátku, celkovou částku a úrok. Základní kalkulačka pro první odhad.',
      href: '/bydleni-hypoteky/kalkulacka',
      icon: '🏠',
      features: [
        'Výše hypotéky',
        'Měsíční splátka',
        'Celkový úrok',
        'LTV poměr',
      ],
    },
    {
      title: 'Kalkulačka bonity',
      description: 'Zjistěte, kolik si můžete půjčit podle vašeho příjmu a výdajů.',
      href: '/bydleni-hypoteky/kalkulacky/bonita',
      icon: '💰',
      features: [
        'Výše příjmu',
        'Pravidelné výdaje',
        'Maximální úvěr',
        'Maximální splátka',
      ],
      soon: true,
    },
    {
      title: 'Refinancování',
      description: 'Porovnejte stávající hypotéku s novou nabídkou. Vypočítejte úsporu.',
      href: '/bydleni-hypoteky/kalkulacky/refinancovani',
      icon: '🔄',
      features: [
        'Aktuální úrok',
        'Nový úrok',
        'Měsíční úspora',
        'Celková úspora',
      ],
      soon: true,
    },
    {
      title: 'Předčasné splacení',
      description: 'Spočítejte si, kolik ušetříte předčasným splacením části hypotéky.',
      href: '/bydleni-hypoteky/kalkulacky/predcasne-splaceni',
      icon: '⚡',
      features: [
        'Mimořádná splátka',
        'Úspora na úrocích',
        'Zkrácení doby',
        'Nová splátka',
      ],
      soon: true,
    },
  ];

  return (
    <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <Link 
          href="/bydleni-hypoteky"
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
          <div className="mb-6">
            <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
          </div>

          <h1 className="mb-6">Hypoteční kalkulačky</h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            Rychlé výpočty, které vám pomohou zorientovat se v možnostech. 
            Výsledky jsou orientační - pro přesnou nabídku nás kontaktujte.
          </p>
        </motion.div>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {calculators.map((calc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={calc.soon ? '#' : calc.href}
                className={`block h-full bg-zfp-dark border border-white/10 rounded-2xl p-8 transition-all ${
                  calc.soon 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:border-zfp-gold hover:bg-white/5'
                }`}
                onClick={(e) => calc.soon && e.preventDefault()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-5xl">{calc.icon}</div>
                  {calc.soon && (
                    <span className="bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs px-3 py-1 rounded-full">
                      Připravujeme
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-semibold mb-3">{calc.title}</h3>
                <p className="text-white/60 mb-6 leading-relaxed">{calc.description}</p>

                {/* Features */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-zfp-orange uppercase tracking-wider mb-3">
                    Co spočítáte:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {calc.features.map((feature, j) => (
                      <div key={j} className="flex items-center text-sm text-white/60">
                        <svg className="w-4 h-4 text-zfp-gold mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {!calc.soon && (
                  <div className="mt-6 flex items-center text-zfp-orange text-sm font-medium">
                    <span className="mr-2">Spočítat</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Important Note */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-semibold mb-4 text-amber-200">⚠️ Důležité upozornění</h3>
          <p className="text-white/70 leading-relaxed">
            Výsledky všech kalkulaček jsou <strong className="text-white">pouze orientační</strong>. 
            Skutečná výše hypotéky, úrok a podmínky závisí na mnoha faktorech: bonita, LTV, 
            délka fixace, typ nemovitosti, konkrétní banka, aktuální nabídka a další. 
            Pro přesnou nabídku nás kontaktujte.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl mb-6">Chcete přesnou nabídku?</h2>
          <p className="text-xl text-white/70 mb-8">
            Kalkulačky dají orientační představu. Pro konkrétní podmínky a nabídky 
            z více bank nás kontaktujte.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-block px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Nezávazná poptávka
            </Link>
            
            <Link
              href="/bydleni-hypoteky/nasi-specialiste"
              className="inline-block px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all text-lg"
            >
              Naši specialisté
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
