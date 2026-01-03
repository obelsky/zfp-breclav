'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import EntrepreneurIcon from '@/components/icons/mortgage/EntrepreneurIcon';
import MortgageCalculatorBanner from '@/components/MortgageCalculatorBanner';


export default function EntrepreneurPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Hypotéka pro OSVČ a podnikatele - ZFP GROUP Břeclav",
    "description": "Specializujeme se na hypotéky pro OSVČ a podnikatele. Známe banky s vstřícným přístupem k živnostníkům.",
    "provider": {
      "@type": "FinancialService",
      "name": "ZFP GROUP Břeclav",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "náměstí T. G. Masaryka 28/10",
        "addressLocality": "Břeclav",
        "postalCode": "690 02",
        "addressCountry": "CZ"
      }
    },
    "serviceType": "Hypoteční úvěr pro OSVČ a podnikatele"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <Link 
            href="/bydleni-hypoteky"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na Bydlení & hypotéky
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
              <EntrepreneurIcon className="w-16 h-16" />
            </div>

            <h1 className="mb-6">Hypotéka pro OSVČ a podnikatele</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Hypotéka pro podnikatele a živnostníky má svá specifika. Známe je a víme, které banky 
              k OSVČ přistupují vstřícně. Pomůžeme vám získat úvěr i bez dokladování příjmů.
            </p>
          </motion.div>

          {/* Mortgage Calculator CTA */}
          <MortgageCalculatorBanner 
            title="Spočítejte si hypotéku pro OSVČ a podnikatele"
            description="Zjistěte výši měsíční splátky hypotéky uzpůsobené pro podnikatele a osoby samostatně výdělečně činné."
          />

          {/* Challenges */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Specifika hypotéky pro OSVČ</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  challenge: 'Proměnlivý příjem',
                  detail: 'Banky vyžadují delší historii podnikání a průměrují příjmy za několik let',
                },
                {
                  challenge: 'Daňové přiznání',
                  detail: 'Základ je příjem po odpočtu výdajů, odvodů a daní – ne celkový obrat',
                },
                {
                  challenge: 'Nižší bonita',
                  detail: 'Banky často počítají s nižší schopností splácet než u zaměstnanců',
                },
                {
                  challenge: 'Více dokumentů',
                  detail: 'Daňová přiznání za 2-3 roky, výpisy z účtů, doklady o podnikání',
                },
                {
                  challenge: 'Delší proces',
                  detail: 'Schvalování trvá déle, banky pečlivěji kontrolují podklady',
                },
                {
                  challenge: 'Vyšší úrok',
                  detail: 'Některé banky nabízejí OSVČ o něco vyšší úrokovou sazbu',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3 text-zfp-orange">{item.challenge}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Jak vám pomůžeme</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Banky přátelské k OSVČ',
                  description: 'Známe banky, které mají lepší podmínky pro podnikatele a nižší nároky na dobu podnikání.',
                },
                {
                  title: 'Optimalizace podkladů',
                  description: 'Pomůžeme připravit dokumenty tak, aby maximalizovaly vaši bonitu. Víme, na co banky koukají.',
                },
                {
                  title: 'Vyšší LTV možné',
                  description: 'U některých bank lze i jako OSVČ získat hypotéku s nižší akontací (85-90 % LTV).',
                },
                {
                  title: 'Kombinované řešení',
                  description: 'Možnost přidat spoludlužníka se stálým příjmem, kombinovat s příjmy z pronájmu.',
                },
                {
                  title: 'Strategické načasování',
                  description: 'Poradíme, kdy podat žádost s ohledem na vaše daňové přiznání a aktuální cash flow.',
                },
                {
                  title: 'Vyjednávání podmínek',
                  description: 'Díky objemu hypoték, které zprostředkováváme, můžeme vyjednat lepší podmínky.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-4">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co budete potřebovat</h2>
            
            <div className="bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-8 lg:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-zfp-gold">Základní dokumenty</h3>
                  <div className="space-y-3">
                    {[
                      'Daňová přiznání za poslední 2-3 roky',
                      'Výpisy z běžných účtů za 6-12 měsíců',
                      'Doklad o podnikání (živnostenský list, výpis z OR)',
                      'Výpisy z OSSZ, VZP (doklad o odvodech)',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/70 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-zfp-gold">Podle situace navíc</h3>
                  <div className="space-y-3">
                    {[
                      'Smlouvy o pronájmu (při příjmu z pronájmu)',
                      'Faktury, objednávky (doklad o zakázkách)',
                      'Účetní výkazy (u účetních jednotek)',
                      'Osobní výpis z katastru (další nemovitosti)',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/70 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Tipy pro OSVČ</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Nesnižujte daňový základ zbytečně',
                  tip: 'Poslední 2 roky před hypotékou neodpisujte maximum. Banky počítají z čistého zisku.',
                },
                {
                  title: 'Ideální doba podnikání',
                  tip: 'Nejlepší je minimálně 3 roky. Některé banky akceptují i 2 roky, ale s horšími podmínkami.',
                },
                {
                  title: 'Stabilní cash flow',
                  tip: 'Na výpisech z účtu by měl být vidět pravidelný příjem. Příliš kolísavé toky jsou problém.',
                },
                {
                  title: 'Zváž spoludlužníka',
                  tip: 'Partner nebo rodinný příslušník se stálým příjmem výrazně pomůže.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-gold">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-zfp-dark border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Hypotéka i pro OSVČ je reálná</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Znalost bankovního prostředí je klíčová. Poradíme vám, jak na to.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Chci konzultaci
              </button>
              
              <Link
                href="/bydleni-hypoteky/kalkulacka"
                className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all"
              >
                Spočítat hypotéku
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Hypotéka pro OSVČ - nezávazná poptávka"
        subject="hypoteky"
      />
    </>
  );
}
