'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function ByTypePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const types = [
    {
      title: 'Klasická hypotéka',
      best: 'Koupě nemovitosti k bydlení',
      interest: '4-6%',
      features: [
        'Nemovitost slouží jako zástava',
        'Dlouhá doba splatnosti (až 30 let)',
        'Nejnižší úroková sazba',
        'Fixace úroku na 1-10 let',
      ],
      pros: [
        'Nejlepší podmínky',
        'Dlouhá splatnost = nízká splátka',
        'Možnost mimořádných splátek',
      ],
      cons: [
        'Nutná zástavní práva k nemovitosti',
        'Zdlouhavý schvalovací proces',
        'Ocenění nemovitosti',
      ],
    },
    {
      title: 'Americká hypotéka',
      best: 'Rekonstrukce, vypořádání dědictví',
      interest: '5-7%',
      features: [
        'Zajištění jinou nemovitostí',
        'Volné použití peněz',
        'Bez dokládání účelu',
        'Rychlejší schválení',
      ],
      pros: [
        'Nemusíte dokládat faktury',
        'Rychlejší proces',
        'Vhodné na cokoli',
      ],
      cons: [
        'Vyšší úrok než klasická',
        'Potřebujete jinou nemovitost',
        'Kratší doba splatnosti',
      ],
    },
    {
      title: 'Překlenovací úvěr',
      best: 'Prodej stávající + koupě nové nemovitosti',
      interest: '6-8%',
      features: [
        'Krátkodobý (6-24 měsíců)',
        'Vyšší úrok',
        'Rychlé schválení',
        'Splácí se až na konci',
      ],
      pros: [
        'Nemusíte čekat na prodej',
        'Můžete jednat jako hotovostní kupec',
        'Flexibilní podmínky',
      ],
      cons: [
        'Vysoký úrok',
        'Tlak na rychlý prodej',
        'Splácíte dvě nemovitosti',
      ],
    },
    {
      title: 'Předhypoteční úvěr',
      best: 'Koupě družstevního bytu, dražby',
      interest: '5-7%',
      features: [
        'Nemovitost není ještě vaše',
        'Krátkodobý (do 2 let)',
        'Po převodu automaticky přechází na hypotéku',
        'Bez LTV limitu',
      ],
      pros: [
        'Pro družstevní byty',
        'Pro nemovitosti bez LV',
        'Automatický převod na hypotéku',
      ],
      cons: [
        'Vyšší úrok než hypotéka',
        'Jen do převodu vlastnictví',
        'Ne všechny banky nabízejí',
      ],
    },
    {
      title: 'Hypotéka bez doložení příjmu',
      best: 'OSVČ, podnikatelé se složitými příjmy',
      interest: '6-9%',
      features: [
        'Není třeba doložit příjem',
        'Vyšší vlastní zdroje (30-40%)',
        'Vyšší úrok',
        'Limit výše úvěru',
      ],
      pros: [
        'Bez dokládání příjmu',
        'Rychlejší vyřízení',
        'Pro OSVČ bez historie',
      ],
      cons: [
        'Vysoký úrok',
        'Vysoké požadavky na zálohu',
        'Nižší LTV',
      ],
    },
    {
      title: 'Reverzní hypotéka',
      best: 'Senioři 60+ potřebující hotovost',
      interest: 'Proměnlivý',
      features: [
        'Banka platí vám',
        'Nesplácíte za života',
        'Po smrti připadne nemovitost bance',
        'Nebo dědici splatí hypotéku',
      ],
      pros: [
        'Příjem v důchodu',
        'Žádné splátky',
        'Zůstáváte ve vlastním',
      ],
      cons: [
        'Dědici nemusí dědit nic',
        'Složité podmínky',
        'Vysoké náklady',
      ],
    },
  ];

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

            <h1 className="mb-6">Typy hypoték</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Hypotéka není jen hypotéka. Existuje několik typů pro různé účely. 
              Každý má svá pravidla, výhody a nevýhody.
            </p>
          </motion.div>

          {/* Types List */}
          <div className="space-y-8 mb-20">
            {types.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-zfp-dark border border-white/10 rounded-2xl p-8 hover:border-zfp-gold transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Header */}
                  <div className="lg:w-1/3">
                    <h3 className="text-2xl font-semibold mb-3 text-zfp-gold">{type.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{type.best}</p>
                    
                    <div className="inline-flex items-center gap-2 bg-zfp-orange/20 border border-zfp-orange/30 rounded-lg px-4 py-2">
                      <span className="text-xs text-white/60">Úrok:</span>
                      <span className="text-lg font-bold text-zfp-orange">{type.interest}</span>
                    </div>
                  </div>

                  {/* Features & Pros/Cons */}
                  <div className="lg:w-2/3 space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">
                        Vlastnosti:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {type.features.map((feature, j) => (
                          <div key={j} className="flex items-start text-sm text-white/60">
                            <svg className="w-4 h-4 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pros & Cons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Pros */}
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <h5 className="text-xs font-semibold text-green-300 mb-2 uppercase tracking-wider">
                          ✓ Výhody:
                        </h5>
                        <ul className="space-y-1">
                          {type.pros.map((pro, j) => (
                            <li key={j} className="text-xs text-white/70">{pro}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <h5 className="text-xs font-semibold text-red-300 mb-2 uppercase tracking-wider">
                          ✗ Nevýhody:
                        </h5>
                        <ul className="space-y-1">
                          {type.cons.map((con, j) => (
                            <li key={j} className="text-xs text-white/70">{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Rychlé srovnání</h2>
            
            <div className="bg-zfp-dark border border-white/10 rounded-2xl overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-white/80">Typ</th>
                    <th className="text-left p-4 text-sm font-semibold text-white/80">Úrok</th>
                    <th className="text-left p-4 text-sm font-semibold text-white/80">Splatnost</th>
                    <th className="text-left p-4 text-sm font-semibold text-white/80">Nejlepší pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-white/5">
                    <td className="p-4 text-sm text-white/80">Klasická</td>
                    <td className="p-4 text-sm text-zfp-gold">Nejnižší</td>
                    <td className="p-4 text-sm text-white/60">Až 30 let</td>
                    <td className="p-4 text-sm text-white/60">Běžná koupě</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="p-4 text-sm text-white/80">Americká</td>
                    <td className="p-4 text-sm text-amber-400">Střední</td>
                    <td className="p-4 text-sm text-white/60">10-20 let</td>
                    <td className="p-4 text-sm text-white/60">Rekonstrukce</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="p-4 text-sm text-white/80">Překlenovací</td>
                    <td className="p-4 text-sm text-red-400">Vysoký</td>
                    <td className="p-4 text-sm text-white/60">6-24 měsíců</td>
                    <td className="p-4 text-sm text-white/60">Změna bydlení</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="p-4 text-sm text-white/80">Předhypoteční</td>
                    <td className="p-4 text-sm text-amber-400">Střední</td>
                    <td className="p-4 text-sm text-white/60">Do 2 let</td>
                    <td className="p-4 text-sm text-white/60">Družstevní byty</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="p-4 text-sm text-white/80">Bez doložení</td>
                    <td className="p-4 text-sm text-red-400">Vysoký</td>
                    <td className="p-4 text-sm text-white/60">10-30 let</td>
                    <td className="p-4 text-sm text-white/60">OSVČ</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="p-4 text-sm text-white/80">Reverzní</td>
                    <td className="p-4 text-sm text-white/60">Variabilní</td>
                    <td className="p-4 text-sm text-white/60">Doživotně</td>
                    <td className="p-4 text-sm text-white/60">Senioři 60+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl mb-6">Nevíte, který typ vybrat?</h2>
            <p className="text-xl text-white/70 mb-8">
              Pomůžeme vám najít ten správný podle vaší situace
            </p>
            
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Poradit se
            </button>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Výběr typu hypotéky"
        subject="hypoteky"
      />
    </>
  );
}
