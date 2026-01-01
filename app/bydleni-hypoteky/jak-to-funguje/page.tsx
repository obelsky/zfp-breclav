'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function HowItWorksPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

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
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <h1 className="mb-6">Jak získat hypotéku</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Hypotéka není raketová věda. Ukážeme vám, jak celý proces funguje krok za krokem, 
              a na co si dát pozor.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="mb-20">
            <h2 className="text-3xl mb-12">Proces v 7 krocích</h2>
            
            <div className="space-y-6">
              {[
                {
                  number: '01',
                  title: 'Zjistěte si bonitu',
                  description: 'Kolik si můžete půjčit? Závisí na vašem příjmu, výdajích a stávajících závazcích. Základní pravidlo: měsíční splátka by neměla přesáhnout 40-45% čistého příjmu domácnosti.',
                  time: '10 minut',
                  tips: [
                    'Sečtěte všechny čisté příjmy domácnosti',
                    'Odečtěte pravidelné výdaje (nájem, splátky, alimenty)',
                    'Zbytek × 40% = maximální splátka',
                  ],
                },
                {
                  number: '02',
                  title: 'Najděte nemovitost',
                  description: 'Ideálně mít konkrétní nemovitost před žádostí. Banka pak lépe posoudí hodnotu a riziko. Rezervační smlouva vám dá čas na vyřízení hypotéky.',
                  time: 'Individuální',
                  tips: [
                    'Cena by měla odpovídat tržní hodnotě',
                    'Zkontrolujte právní stav nemovitosti',
                    'Dejte si rezervační smlouvu s prodávajícím',
                  ],
                },
                {
                  number: '03',
                  title: 'Vyberte typ hypotéky',
                  description: 'Fixace úroku, délka splatnosti, variabilní nebo fixní? Každá varianta má své výhody a rizika podle vaší situace.',
                  time: '30 minut',
                  tips: [
                    'Krátká fixace (1-3 roky) = nižší úrok, vyšší riziko',
                    'Dlouhá fixace (5-10 let) = jistota, vyšší úrok',
                    'Delší splatnost = nižší splátka, vyšší celkové náklady',
                  ],
                },
                {
                  number: '04',
                  title: 'Připravte dokumenty',
                  description: 'Banka potřebuje doložit váš příjem, nemovitost a další náležitosti. Čím lépe připraveno, tím rychleji to půjde.',
                  time: '1-2 dny',
                  tips: [
                    'Potvrzení o příjmu (ideálně 3-6 měsíců)',
                    'Výpisy z účtů',
                    'Doklady k nemovitosti (nabývací titul, výpis z KN)',
                    'Občanský průkaz',
                  ],
                },
                {
                  number: '05',
                  title: 'Podejte žádost',
                  description: 'S kompletními dokumenty se můžete obrátit na banku nebo hypotečního specialistu. Ten vám pomůže vybrat nejvhodnější variantu.',
                  time: '1-2 hodiny',
                  tips: [
                    'Můžete podat žádost do více bank',
                    'Hypoteční specialista má přístup k více bankám',
                    'Nezávazně porovnejte nabídky',
                  ],
                },
                {
                  number: '06',
                  title: 'Počkejte na schválení',
                  description: 'Banka posoudí vaši bonitu, ocení nemovitost a vyhodnotí riziko. Standardně 5-14 dní, u složitějších případů déle.',
                  time: '5-14 dní',
                  tips: [
                    'Banka si může vyžádat doplňující dokumenty',
                    'Proběhne ocenění nemovitosti',
                    'Můžete dostat předběžný souhlas podmíněný',
                  ],
                },
                {
                  number: '07',
                  title: 'Podepište smlouvu',
                  description: 'Po schválení podepíšete hypoteční smlouvu a kupní smlouvu k nemovitosti. Pak následuje vklad do katastru a čerpání hypotéky.',
                  time: '1 den + vklad',
                  tips: [
                    'Pečlivě si přečtěte smlouvu',
                    'Zeptejte se na nejasnosti',
                    'Vklad do katastru trvá cca 2-4 týdny',
                  ],
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-zfp-dark border border-white/10 rounded-2xl p-8 hover:border-zfp-gold transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-zfp-orange/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-zfp-orange">{step.number}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-semibold text-zfp-gold">{step.title}</h3>
                        <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
                          {step.time}
                        </span>
                      </div>
                      
                      <p className="text-white/70 mb-4 leading-relaxed">{step.description}</p>
                      
                      {step.tips && (
                        <div className="space-y-2">
                          {step.tips.map((tip, j) => (
                            <div key={j} className="flex items-start text-sm text-white/60">
                              <svg className="w-4 h-4 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              {tip}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20 bg-gradient-to-br from-zfp-orange/20 to-zfp-dark border border-zfp-orange/30 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Celková časová náročnost</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-white/70">Příprava a výběr</span>
                <span className="text-zfp-orange font-semibold">1-2 týdny</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-white/70">Schvalovací proces</span>
                <span className="text-zfp-orange font-semibold">1-2 týdny</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-white/70">Podpis smluv</span>
                <span className="text-zfp-orange font-semibold">1 den</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-white/70">Vklad do katastru</span>
                <span className="text-zfp-orange font-semibold">2-4 týdny</span>
              </div>
              <div className="flex items-center justify-between pt-4">
                <span className="text-lg font-semibold">Celkem</span>
                <span className="text-2xl font-bold text-zfp-orange">4-8 týdnů</span>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Na co si dát pozor</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'LTV (Loan to Value)',
                  description: 'Poměr výše úvěru k hodnotě nemovitosti. Ideálně do 80%. Nad 80% se často prodražuje.',
                  icon: '📊',
                },
                {
                  title: 'RPSN',
                  description: 'Skutečná roční procentní sazba nákladů. Zahrnuje i poplatky. Porovnávejte RPSN, ne jen úrokovou sazbu.',
                  icon: '💰',
                },
                {
                  title: 'Pojištění',
                  description: 'Pojištění nemovitosti je povinné. Pojištění schopnosti splácet dobrovolné, ale doporučené.',
                  icon: '🛡️',
                },
                {
                  title: 'Předčasné splacení',
                  description: 'Zjistěte si podmínky a poplatky za předčasné splacení hypotéky. Může se hodit.',
                  icon: '⚡',
                },
              ].map((note, i) => (
                <div key={i} className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
                  <div className="text-4xl mb-3">{note.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-amber-200">{note.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{note.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl mb-6">Potřebujete pomoc s hypotékou?</h2>
            <p className="text-xl text-white/70 mb-8">
              Naši specialisté vám pomohou vybrat tu pravou
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Konzultace zdarma
              </button>
              
              <Link
                href="/bydleni-hypoteky/kalkulacky"
                className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all text-lg"
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
        title="Konzultace k hypotéce"
        subject="hypoteky"
      />
    </>
  );
}
