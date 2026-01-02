'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import SavingsCalculator from '@/components/SavingsCalculator';
import RetirementCalculator from '@/components/RetirementCalculator';
import CalculatorCTA from '@/components/CalculatorCTA';
import InvestmentServiceIcon from '@/components/icons/services/InvestmentServiceIcon';

export default function InvesticePage() {
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
            href="/poradenstvi"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na Poradenství
          </Link>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <div className="mb-6"><div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" /></div>
            <div className="mb-6 text-zfp-gold"><InvestmentServiceIcon className="w-16 h-16" /></div>
            <h1 className="mb-6">Investice</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Peníze na účtu inflace pomalu znehodnocuje. Investice umožňují zhodnotit úspory 
              dlouhodobě a chytře.
            </p>
          </motion.div>

          {/* Calculator CTA */}
          <CalculatorCTA
            icon={
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            title="Kalkulačka pravidelného spoření"
            description="Zjistěte, jak může růst váš kapitál při pravidelném investování. Interaktivní graf zobrazí vývoj v čase."
            targetId="savings-calculator"
          />

          {/* Why invest */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Proč investovat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Ochrana proti inflaci', desc: 'Inflace každý rok ubírá hodnotu vašim penězům. Investice ji mohou předběhnout.' },
                { title: 'Zhodnocení kapitálu', desc: 'Dlouhodobě mohou investice růst více než běžné spoření.' },
                { title: 'Finanční nezávislost', desc: 'Investice mohou časem vytvořit pasivní příjem.' },
                { title: 'Příprava na důchod', desc: 'Státní důchod nebude stačit. Investice pomáhají vytvořit rezervu.' },
                { title: 'Cíle a sny', desc: 'Vzdělání dětí, vlastní bydlení, cestování - investice pomáhají k cílům.' },
                { title: 'Diverzifikace majetku', desc: 'Nemít všechny peníze jen na účtu nebo v nemovitostech.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-orange">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Investment types */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Typy investic</h2>
            <div className="space-y-6">
              {[
                { title: 'Investiční fondy', desc: 'Profesionálně spravované portfolio akcií, dluhopisů nebo jiných aktiv. Vhodné pro začátečníky.', risk: 'Střední', horizon: '5+ let' },
                { title: 'Akcie', desc: 'Podíl na vlastnictví firmy. Vyšší potenciální výnos, ale i vyšší riziko.', risk: 'Vyšší', horizon: '10+ let' },
                { title: 'Dluhopisy', desc: 'Půjčka státu nebo firmě s pevným úrokem. Konzervativnější než akcie.', risk: 'Nižší', horizon: '3-10 let' },
                { title: 'ETF (indexové fondy)', desc: 'Kopírují index (např. S&P 500). Nízké poplatky, široká diverzifikace.', risk: 'Střední', horizon: '7+ let' },
                { title: 'Penzijní spoření', desc: 'Dlouhodobé spoření s daňovými výhodami. Vhodné jako základ důchodové strategie.', risk: 'Nízká-střední', horizon: '20+ let' },
                { title: 'Nemovitosti', desc: 'Investice do bytů k pronájmu nebo k prodeji. Vyšší vstupní kapitál.', risk: 'Střední', horizon: '10+ let' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold">{i + 1}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/70 text-sm mb-2">{item.desc}</p>
                    <div className="flex gap-4 text-xs">
                      <span className="text-zfp-gold">Riziko: {item.risk}</span>
                      <span className="text-white/50">Horizont: {item.horizon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Principles */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Základní principy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { principle: 'Dlouhodobost', detail: 'Investice potřebují čas. Krátkodobé výkyvy jsou normální, dlouhodobý trend je důležitý.' },
                { principle: 'Diverzifikace', detail: 'Neinvestujte všechno do jednoho. Rozložte riziko mezi různá aktiva a trhy.' },
                { principle: 'Pravidelnost', detail: 'Pravidelné investování (DCA) snižuje riziko špatného načasování vstupu.' },
                { principle: 'Trpělivost', detail: 'Panika při poklesu trhu je chyba. Držte strategii, netlačte na prodej.' },
                { principle: 'Poplatky', detail: 'Sledujte náklady. Vysoké poplatky mohou sníst značnou část výnosu.' },
                { principle: 'Znalosti', detail: 'Investujte čas do vzdělání. Rozumět tomu, co děláte, je klíčové.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-zfp-gold/20 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.principle}</h3>
                    <p className="text-white/60 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risks */}
          <div className="mb-20 bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-8 lg:p-10">
            <h2 className="text-3xl mb-8">Rizika investování</h2>
            <p className="text-lg text-white/70 mb-8">Investice nejsou zaručený výdělek. Je důležité znát rizika:</p>
            <div className="space-y-4">
              {[
                'Tržní riziko - hodnota investice může klesnout',
                'Inflační riziko - výnos nemusí pokrýt inflaci',
                'Měnové riziko - změny kurzů ovlivňují hodnotu',
                'Riziko likvidity - někdy není snadné rychle prodat',
                'Riziko výběru - špatně vybraná investice může zkrachovat',
              ].map((risk, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-zfp-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-white/70">{risk}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How we help */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Jak vám pomůžeme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Investiční strategie', desc: 'Navrhneme strategii podle vašeho věku, cílů a ochoty riskovat' },
                { title: 'Výběr nástrojů', desc: 'Pomůžeme vybrat vhodné fondy, ETF nebo jiné nástroje' },
                { title: 'Diverzifikace', desc: 'Nastavíme portfolio tak, aby bylo vyvážené a rozložené' },
                { title: 'Daňová optimalizace', desc: 'Využijeme daňové úlevy a výhody, které zákon nabízí' },
                { title: 'Pravidelné kontroly', desc: 'Průběžně sledujeme portfolio a upravujeme podle potřeby' },
                { title: 'Vzdělávání', desc: 'Vysvětlíme, co se děje a proč. Nebudete ve tmě' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-gold">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Tipy pro začáteční investory</h2>
            <div className="space-y-4">
              {[
                'Začněte brzy - čas je váš největší spojenec díky složenému úročení',
                'Neinvestujte peníze, které budete potřebovat do 3-5 let',
                'Vytvořte si nejdřív rezervu (3-6 měsíčních výdajů)',
                'Nesledujte trh každý den - krátkodobé výkyvy jsou normální',
                'Nesnažte se "časovat trh" - pravidelné investování je lepší strategie',
                'Vzdělávejte se - čím víc víte, tím lepší rozhodnutí děláte',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-zfp-orange/20 rounded-full flex items-center justify-center text-zfp-orange font-bold text-xs">{i + 1}</div>
                  <p className="text-white/70">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Calculator */}
          <div id="savings-calculator" className="mb-20">
            <SavingsCalculator onContactClick={handleContactClick} />
          </div>

          {/* Retirement Calculator */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl mb-4">Plánujete důchod?</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Spočítejte si, kolik potřebujete naspořit na důchod. Stát vám nepomůže.
              </p>
            </div>
            <RetirementCalculator onContactClick={handleContactClick} />
          </div>

          {/* CTA */}
          <div className="text-center bg-zfp-dark border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Začněte investovat chytře</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Pomůžeme vám nastavit investiční strategii, která dává smysl
            </p>
            <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105">
              Chci konzultaci
            </button>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="Investice - nezávazná konzultace" subject="investice" calculatorData={calculatorData} />
    </>
  );
}
