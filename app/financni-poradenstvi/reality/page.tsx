'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import RealtyCalculator from '@/components/RealtyCalculator';
import CalculatorCTA from '@/components/CalculatorCTA';
import RealtyIcon from '@/components/icons/services/RealtyIcon';

export default function RealityPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [calculatorData, setCalculatorData] = useState<Record<string, any> | undefined>();

  const handleContactClick = (data?: Record<string, any>) => {
    setCalculatorData(data);
    setIsContactFormOpen(true);
  };

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <Link href="/poradenstvi" className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na Poradenství
          </Link>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <div className="mb-6"><div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" /></div>
            <div className="mb-6 text-zfp-gold"><RealtyIcon className="w-16 h-16" /></div>
            <h1 className="mb-6">ZFP Reality</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Prodej nebo koupě nemovitosti je důležité rozhodnutí. Pomůžeme vám celým procesem - od ocenění po předání klíčů.
            </p>
          </motion.div>

          {/* Calculator CTA */}
          <CalculatorCTA
            icon={
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            }
            title="Kolik si můžu dovolit?"
            description="Spočítejte si maximální cenu nemovitosti podle vašeho příjmu a úspor. Kalkulačka zohledňuje DTI ratio."
            targetId="realty-calculator"
          />

          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co nabízíme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Prodej nemovitosti', desc: 'Oceníme, nafotíme, inzerujeme, zajistíme prohlídky a prodáme za nejlepší cenu.' },
                { title: 'Koupě nemovitosti', desc: 'Pomůžeme najít vhodnou nemovitost, provede legal check a vyjednáme cenu.' },
                { title: 'Ocenění', desc: 'Reálné tržní ocenění na základě aktuální situace v lokalitě.' },
                { title: 'Právní servis', desc: 'Zajistíme právní kontrolu, smlouvy a bezpečný převod vlastnictví.' },
                { title: 'Financování', desc: 'Pomůžeme s hypotékou nebo jiným financováním koupě.' },
                { title: 'Komplexní péče', desc: 'Vše pod jednou střechou - od hledání až po předání.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-orange">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Jak pracujeme</h2>
            <div className="space-y-6">
              {[
                { title: 'Ocenění zdarma', desc: 'Prohlédneme nemovitost a stanovíme reálnou tržní cenu.' },
                { title: 'Marketingová strategie', desc: 'Profesionální fotky, inzerce na hlavních portálech, cílení na správnou skupinu.' },
                { title: 'Organizace prohlídek', desc: 'Domluvíme a provedeme zájemce, odpovíme na dotazy.' },
                { title: 'Vyjednávání', desc: 'Získáme pro vás nejlepší podmínky při prodeji nebo koupi.' },
                { title: 'Právní servis', desc: 'Právník zkontroluje všechny dokumenty a zajistí bezpečný převod.' },
                { title: 'Předání', desc: 'Pomůžeme s předáním a vyřízením všech formalit.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold">{i + 1}</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl mb-8">Proč ZFP Reality</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Zkušenosti', desc: 'Roky praxe v prodeji a koupi nemovitostí' },
                { title: 'Lokální znalost', desc: 'Známe trh v Břeclavi a okolí' },
                { title: 'Komplexnost', desc: 'Reality + hypotéky + pojištění pod jednou střechou' },
                { title: 'Transparentnost', desc: 'Žádné skryté poplatky, vše vysvětlíme předem' },
                { title: 'Právní jistota', desc: 'Právník kontroluje každý dokument' },
                { title: 'Osobní přístup', desc: 'Nejste jen číslo, jsme tu pro vás' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-gold">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Realty Calculator */}
          <div id="realty-calculator" className="mb-20">
            <RealtyCalculator onContactClick={handleContactClick} />
          </div>

          <div className="text-center bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Máte nemovitost k prodeji nebo hledáte bydlení?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Nezávazně vás provedeme celým procesem
            </p>
            <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105">
              Chci konzultaci
            </button>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="ZFP Reality - nezávazná konzultace" subject="reality" calculatorData={calculatorData} />
    </>
  );
}
