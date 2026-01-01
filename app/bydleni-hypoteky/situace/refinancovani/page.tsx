'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import RefinancingCalculator from '@/components/RefinancingCalculator';
import CalculatorCTA from '@/components/CalculatorCTA';
import RefinancingIcon from '@/components/icons/mortgage/RefinancingIcon';

export default function RefinancingPage() {
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
              <RefinancingIcon className="w-16 h-16" />
            </div>

            <h1 className="mb-6">Refinancování hypotéky</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Máte hypotéku s vysokým úrokem nebo nevýhodnými podmínkami? 
              Refinancování může ročně ušetřit desítky tisíc korun.
            </p>
          </motion.div>

          {/* Calculator CTA */}
          <CalculatorCTA
            icon={
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
            title="Spočítejte si úsporu"
            description="Zjistěte za pár vteřin, kolik můžete ušetřit refinancováním vaší hypotéky. Kalkulačka je níže na stránce."
            targetId="refinancing-calculator"
          />

          {/* When to Refinance */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Kdy refinancovat</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  reason: 'Konec fixace',
                  detail: 'Ideální doba pro změnu. Neplatíte penále za předčasné splacení.',
                },
                {
                  reason: 'Vysoký úrok',
                  detail: 'Máte hypotéku nad 5 %? Dnes lze získat výrazně nižší sazbu.',
                },
                {
                  reason: 'Změna situace',
                  detail: 'Vyšší příjem, nižší LTV – můžete získat lepší podmínky.',
                },
                {
                  reason: 'Nevýhodné podmínky',
                  detail: 'Penále za mimořádné splátky, vysoké poplatky, rigidní banka.',
                },
                {
                  reason: 'Potřeba více peněz',
                  detail: 'Navýšení hypotéky na rekonstrukci, vestavbu, koupi dalšího bytu.',
                },
                {
                  reason: 'Konsolidace dluhů',
                  detail: 'Splacení drahých spotřebitelských úvěrů výhodnou hypotékou.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                  <h3 className="text-lg font-semibold mb-3 text-zfp-orange">{item.reason}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Co refinancování přináší</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Nižší úrok',
                  description: 'Hlavní důvod. I rozdíl 0,5 % p.a. znamená desítky tisíc ročně.',
                  example: 'Příklad: 3 mil. Kč, rozdíl 1 % = úspora 30 000 Kč/rok',
                },
                {
                  title: 'Nižší měsíční splátka',
                  description: 'Pokud nechcete zkrátit dobu splácení, splátka klesne.',
                  example: 'Příklad: Splátka z 15 000 Kč může klesnout na 12 000 Kč',
                },
                {
                  title: 'Lepší podmínky',
                  description: 'Možnost mimořádných splátek zdarma, nižší poplatky, flexibilnější banka.',
                  example: 'Žádné penále za předčasné splacení',
                },
                {
                  title: 'Navýšení úvěru',
                  description: 'Dostanete víc peněz na rekonstrukci, vestavbu nebo jinou investici.',
                  example: 'Výhodnější než spotřebitelský úvěr',
                },
                {
                  title: 'Sjednocení úvěrů',
                  description: 'Konsolidace několika úvěrů do jedné hypotéky s nízkým úrokem.',
                  example: 'Úspora na poplatcích a administrativě',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-4">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-1">{item.description}</p>
                    <p className="text-white/50 text-xs italic">{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Jak refinancování probíhá</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Analýza',
                  description: 'Probereme vaši stávající hypotéku a možnosti úspory.',
                },
                {
                  step: '02',
                  title: 'Porovnání nabídek',
                  description: 'Najdeme nejlepší nabídky z více bank.',
                },
                {
                  step: '03',
                  title: 'Podání žádosti',
                  description: 'Pomůžeme s dokumenty a podáme žádost.',
                },
                {
                  step: '04',
                  title: 'Schválení',
                  description: 'Komunikujeme s novou i starou bankou.',
                },
                {
                  step: '05',
                  title: 'Přechod',
                  description: 'Zajistíme splacení staré a čerpání nové hypotéky.',
                },
                {
                  step: '06',
                  title: 'Hotovo',
                  description: 'Nová hypotéka běží, ušetřené peníze jdou k vám.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-sm text-zfp-orange font-semibold mb-3">{item.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator Example */}
          <div className="mb-20 bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-8 lg:p-10">
            <h2 className="text-3xl mb-8">Kolik můžete ušetřit?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-sm text-white/60 mb-2">Výše hypotéky</div>
                <div className="text-3xl font-bold text-white mb-1">3 000 000 Kč</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-sm text-white/60 mb-2">Rozdíl v úroku</div>
                <div className="text-3xl font-bold text-zfp-orange mb-1">1,0 %</div>
                <div className="text-xs text-white/40">např. z 5,5 % na 4,5 %</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-sm text-white/60 mb-2">Úspora za rok</div>
                <div className="text-3xl font-bold text-zfp-gold mb-1">≈ 30 000 Kč</div>
              </div>
            </div>
            
            <p className="text-center text-white/60 text-sm">
              Přesný výpočet závisí na zbývající době splácení a dalších faktorech. 
              Spočítáme vám to konkrétně.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Časté otázky</h2>
            
            <div className="space-y-4">
              {[
                {
                  q: 'Platí se penále za předčasné splacení?',
                  a: 'Záleží na smlouvě. Během fixace ano, po fixaci ne. Vyplatí se i s penále, pokud je úspora dost velká.',
                },
                {
                  q: 'Musím znovu oceňovat nemovitost?',
                  a: 'Většinou ano, ale některé banky při refinancování akceptují starší ocenění nebo dělají zjednodušený odhad.',
                },
                {
                  q: 'Jak dlouho refinancování trvá?',
                  a: 'Cca 1-2 měsíce od podání žádosti po vyplacení. Závisí na rychlosti banky a kompletnosti dokumentů.',
                },
                {
                  q: 'Kolik to stojí?',
                  a: 'Ocenění nemovitosti (3-5 tis. Kč), případně penále staré bance. Nová banka často hradí část nákladů.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-gold">{item.q}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Refinancing Calculator */}
          <div id="refinancing-calculator" className="mb-20">
            <RefinancingCalculator onContactClick={handleContactClick} />
          </div>

          {/* CTA */}
          <div className="text-center bg-zfp-dark border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Zjistěte, kolik můžete ušetřit</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Analýza je zdarma a nezávazná. Pokud se refinancování nevyplatí, řekneme vám to.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Chci analýzu zdarma
              </button>
              
              <Link
                href="/bydleni-hypoteky/kalkulacka"
                className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all"
              >
                Spočítat úsporu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Refinancování hypotéky - nezávazná analýza"
        subject="hypoteky"
        calculatorData={calculatorData}
      />
    </>
  );
}
