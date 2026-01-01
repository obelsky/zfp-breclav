'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import InsuranceCalculator from '@/components/InsuranceCalculator';
import CalculatorCTA from '@/components/CalculatorCTA';
import InsuranceIcon from '@/components/icons/services/InsuranceIcon';

export default function PojisteniPage() {
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
            <div className="mb-6 text-zfp-gold"><InsuranceIcon className="w-16 h-16" /></div>
            <h1 className="mb-6">Pojištění</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Pojištění není o tom, že se něco stane. Je o tom, že pokud se něco stane, 
              neztratíte všechno, na čem vám záleží.
            </p>
          </motion.div>

          {/* Calculator CTA */}
          <CalculatorCTA
            icon={
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            title="Jsem správně pojištěný?"
            description="Interaktivní test odhalí mezery ve vašem pojištění a ukáže, co vám chybí. Zabere to jen pár minut."
            targetId="insurance-calculator"
          />

          {/* Why insurance */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Proč se pojistit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Ochrana rodiny', desc: 'Pokud vy nebo partner přestanete vydělávat, rodina má z čeho žít.' },
                { title: 'Ochrana majetku', desc: 'Dům, byt, auto - velké investice, které stojí za ochranu.' },
                { title: 'Zdravotní výdaje', desc: 'Vážná nemoc nebo úraz mohou stát statisíce. Pojištění pokryje náklady.' },
                { title: 'Právní ochrana', desc: 'Spory, nehody, problémy - právník stojí peníze. Pojištění je zaplatí.' },
                { title: 'Klidný spánek', desc: 'Vědět, že jste chráněni, je něco, co se nedá koupit jinak.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-zfp-gold/20 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance types */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Typy pojištění</h2>
            <div className="space-y-8">
              {[
                { category: 'Životní pojištění', items: ['Rizikové životní pojištění - ochrana rodiny při úmrtí', 'Investiční životní pojištění - pojištění + spoření', 'Úrazové pojištění - trvalé následky úrazu'] },
                { category: 'Majetkové pojištění', items: ['Pojištění nemovitosti - dům, byt, chata', 'Pojištění domácnosti - vybavení, elektro, cennosti', 'Pojištění odpovědnosti - škody, které způsobíte'] },
                { category: 'Pojištění vozidel', items: ['Povinné ručení - zákonná povinnost', 'Havarijní pojištění - škody na vašem vozidle', 'Úrazové pojištění řidiče a posádky'] },
                { category: 'Ostatní pojištění', items: ['Cestovní pojištění - léčba a problémy v zahraničí', 'Právní ochrana - právní spory a problémy', 'Pojištění profesní odpovědnosti - pro OSVČ a podnikatele'] },
              ].map((cat, i) => (
                <div key={i}>
                  <h3 className="text-xl font-semibold mb-4 text-zfp-orange">{cat.category}</h3>
                  <div className="space-y-2">
                    {cat.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-4">
                        <svg className="w-5 h-5 text-zfp-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-white/70">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How we help */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Jak pomáháme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Analýza potřeb', desc: 'Zjistíme, co potřebujete chránit a v jaké výši' },
                { title: 'Porovnání nabídek', desc: 'Srovnáme pojistky z více pojišťoven a najdeme nejlepší' },
                { title: 'Vysvětlení podmínek', desc: 'Projdeme všechny body, abyste věděli, co podepisujete' },
                { title: 'Vyřízení pojistky', desc: 'Pomůžeme s dokumenty a celým procesem' },
                { title: 'Správa pojistek', desc: 'Sledujeme platnost, termíny a změny' },
                { title: 'Pomoc při škodě', desc: 'Když se něco stane, pomůžeme s hlášením a vyřízením' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-gold">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Common mistakes */}
          <div className="mb-20 bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-8 lg:p-10">
            <h2 className="text-3xl mb-8">Časté chyby v pojištění</h2>
            <div className="space-y-4">
              {[
                { mistake: 'Podpojištění', detail: 'Pojistná částka je příliš nízká. Při škodě nedostanete dost.' },
                { mistake: 'Přepojištění', detail: 'Platíte za pojistky, které se překrývají nebo nepotřebujete.' },
                { mistake: 'Nečtení smlouvy', detail: 'Nevíte, co je kryto a co ne. Překvapení při škodě.' },
                { mistake: 'Zastaralé pojistky', detail: 'Podmínky se mění, vy je ale nemáte aktualizované.' },
                { mistake: 'Nejlevnější = nejlepší', detail: 'Nízká cena často znamená nízké krytí nebo špatný servis.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                  <svg className="w-6 h-6 text-zfp-orange flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-zfp-orange">{item.mistake}</h3>
                    <p className="text-white/60 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Calculator */}
          <div id="insurance-calculator" className="mb-20">
            <InsuranceCalculator onContactClick={handleContactClick} />
          </div>

          {/* CTA */}
          <div className="text-center bg-zfp-dark border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Probereme vaše pojištění</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Zjistíme, jestli jste chráněni dostatečně a jestli neplatíte zbytečně moc
            </p>
            <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105">
              Chci audit pojištění
            </button>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="Pojištění - nezávazná konzultace" subject="pojisteni" calculatorData={calculatorData} />
    </>
  );
}
