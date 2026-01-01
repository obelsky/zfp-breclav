'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function JakPracujemePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

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

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <h1 className="mb-6">Jak pracujeme</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Finanční poradenství není o prodávání produktů. Je o tom, abyste rozuměli své situaci 
              a věděli, jaké máte možnosti.
            </p>
          </motion.div>

          {/* Process */}
          <div className="mb-20">
            <h2 className="text-3xl mb-12">Proces spolupráce</h2>
            
            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Úvodní konzultace zdarma',
                  description: 'Sejdeme se osobně, online nebo telefonicky. Probereme vaši situaci, cíle a očekávání. Konzultace je nezávazná.',
                  duration: '30-60 minut',
                },
                {
                  step: '02',
                  title: 'Analýza situace',
                  description: 'Projdeme vaše příjmy, výdaje, závazky a cíle. Zjistíme, kde máte rezervy a co je priorita.',
                  duration: '60-90 minut',
                },
                {
                  step: '03',
                  title: 'Návrh řešení',
                  description: 'Připravíme konkrétní návrh. Vysvětlíme všechny možnosti, výhody, nevýhody a náklady.',
                  duration: '1-2 týdny příprava',
                },
                {
                  step: '04',
                  title: 'Vysvětlení a rozhodnutí',
                  description: 'Projdeme návrh krok po kroku. Zodpovíme všechny otázky. Rozhodnete se, zda pokračovat.',
                  duration: '60-90 minut',
                },
                {
                  step: '05',
                  title: 'Realizace',
                  description: 'Pomůžeme s dokumenty, podáním žádostí a vyřízením všeho potřebného.',
                  duration: 'dle typu služby',
                },
                {
                  step: '06',
                  title: 'Dlouhodobá péče',
                  description: 'Jsme tu i po podpisu smlouvy. Změny, dotazy, optimalizace - kdykoliv.',
                  duration: 'průběžně',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-zfp-orange/20 rounded-xl flex items-center justify-center">
                      <span className="text-xl font-bold text-zfp-orange">{item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/70 mb-2 leading-relaxed">{item.description}</p>
                    <p className="text-sm text-zfp-gold">⏱ {item.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Principles */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Naše principy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  principle: 'Transparentnost',
                  description: 'Vysvětlíme vše srozumitelně. Žádné malé písmo, žádné překvapení.',
                },
                {
                  principle: 'Nezávislost',
                  description: 'Nepracujeme jen pro jednu banku nebo pojišťovnu. Hledáme nejlepší řešení pro vás.',
                },
                {
                  principle: 'Vzdělávání',
                  description: 'Chceme, abyste rozuměli tomu, co děláte. Nejen produktu, ale i důvodu proč.',
                },
                {
                  principle: 'Dlouhodobost',
                  description: 'Nejsme tu jen na podpis. Jsme tu i za rok, dva, deset.',
                },
                {
                  principle: 'Profesionalita',
                  description: 'Držíme certifikace, školíme se a držíme krok s trhem.',
                },
                {
                  principle: 'Respekt',
                  description: 'Vaše peníze, vaše rozhodnutí. My jen radíme a pomáháme.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-zfp-gold/20 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.principle}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What we don't do */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co nedělá me</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Netlačíme na rychlé rozhodnutí',
                  description: 'Máte čas si vše rozmyslet. Žádný tlak, žádné časově omezené nabídky.',
                },
                {
                  title: 'Neslibujeme nemožné',
                  description: 'Pokud něco nejde, řekneme to. Raději odmítneme, než slíbíme nereálné.',
                },
                {
                  title: 'Neschovávame poplatky',
                  description: 'Všechny náklady vysvětlíme předem. Žádná skrytá čísla.',
                },
                {
                  title: 'Nezmizíme po podpisu',
                  description: 'Dlouhodobá péče není fráze. Je to součást spolupráce.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-orange">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Časté otázky</h2>
            
            <div className="space-y-4">
              {[
                {
                  q: 'Kolik to stojí?',
                  a: 'První konzultace je zdarma. U hypoték a investic jsme placeni provizí od poskytovatelů - pro vás je to zdarma. U finančního plánování pracujeme na hodinové sazbě nebo paušálu.',
                },
                {
                  q: 'Jak dlouho to trvá?',
                  a: 'Záleží na službě. Úvodní konzultace 30-60 minut. Hypotéka 1-2 měsíce. Finanční plán několik týdnů. Vždy vás budeme informovat o časovém rámci.',
                },
                {
                  q: 'Musím se rozhodnout hned?',
                  a: 'Ne. Máte čas si vše rozmyslet. Nedáváme časové ultimáta.',
                },
                {
                  q: 'Co když se mi návrh nelíbí?',
                  a: 'Žádný problém. Upravíme ho nebo vám řekneme, že pro vás teď nemáme vhodné řešení.',
                },
                {
                  q: 'Pracujete i online?',
                  a: 'Ano. Můžeme se sejít osobně, online přes video, nebo telefonicky.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-gold">{item.q}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-zfp-dark border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Začněme s první konzultací</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Nezávazně si promluvíme o vaší situaci a navrhneme, jak dál
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Domluvit konzultaci
              </button>
              
              <Link
                href="/poradenstvi"
                className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all"
              >
                Zpět na přehled služeb
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Nezávazná konzultace"
        subject="poradenstvi"
      />
    </>
  );
}
