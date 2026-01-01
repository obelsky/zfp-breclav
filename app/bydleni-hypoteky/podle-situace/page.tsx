'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function BySituationPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [selectedSituation, setSelectedSituation] = useState('');

  const situations = [
    {
      id: 'first-home',
      title: 'První vlastní bydlení',
      emoji: '🏠',
      description: 'Kupujete svůj první byt nebo dům',
      challenges: [
        'Malá nebo žádná hotovost na zálohu',
        'Krátká pracovní historie',
        'Neznalost procesu',
      ],
      solutions: [
        'Začít spořit co nejdříve - i 10% záloha pomůže',
        'Zvážit byt místo domu (nižší cena)',
        'Mladí do 36 let: zvýhodněné podmínky u některých bank',
        'Rodiče jako spoludlužníci nebo ručitelé',
      ],
      tips: 'Pro první hypotéku se vyplatí osobní schůzka s bankou. Prokážete odpovědný přístup.',
    },
    {
      id: 'family-upgrade',
      title: 'Změna pro rodinu',
      emoji: '👨‍👩‍👧‍👦',
      description: 'Potřebujete větší bydlení kvůli rodině',
      challenges: [
        'Mateřská/rodičovská - snížený příjem',
        'Prodej stávající nemovitosti',
        'Překlenovací období',
      ],
      solutions: [
        'Překlenovací úvěr - krátkodobé financování mezi prodejem a koupí',
        'Do bonity se počítá i rodičovský příspěvek',
        'Partner/ka mimo MD/RD může být hlavní žadatel',
        'Zvážit pronájem stávající nemovitosti místo prodeje',
      ],
      tips: 'Naplánujte časově tak, aby prodej a koupě proběhly v rozumném intervalu.',
    },
    {
      id: 'investment',
      title: 'Investice do nemovitosti',
      emoji: '💼',
      description: 'Nemovitost k pronájmu nebo investice',
      challenges: [
        'Vyšší požadavky na bonitu',
        'Investiční nemovitost ≠ bydlení',
        'Horší podmínky úvěru',
      ],
      solutions: [
        'Prokázat stabilní příjem z hlavní činnosti',
        'Předpokládaný nájem se může započítat do bonity',
        'Vyšší vlastní zdroje (20-30%)',
        'Doložit business plán pronájmu',
      ],
      tips: 'Investiční hypotéky mají obvykle o 0,5-1% vyšší úrok než na vlastní bydlení.',
    },
    {
      id: 'refinancing',
      title: 'Refinancování',
      emoji: '🔄',
      description: 'Přefinancování stávající hypotéky',
      challenges: [
        'Poplatek za předčasné splacení',
        'Nové ocenění nemovitosti',
        'Změněné podmínky bonity',
      ],
      solutions: [
        'Počkat na konec fixace (bez poplatku)',
        'Porovnat RPSN, ne jen úrokovou sazbu',
        'Vyjednat odpuštění/snížení poplatku',
        'Zvážit prodloužení splatnosti = nižší splátka',
      ],
      tips: 'Refinancování se vyplatí při rozdílu úroku 0,5% a více. Spočítejte si reálnou úsporu.',
    },
    {
      id: 'self-employed',
      title: 'OSVČ a podnikatelé',
      emoji: '🚀',
      description: 'Podnikáte nebo jste na volné noze',
      challenges: [
        'Nestabilní příjem',
        'Složitější doložení bonity',
        'Daňová optimalizace × bonita',
      ],
      solutions: [
        'Potřebujete 2-3 roky daňových přiznání',
        'Banka počítá průměr z let',
        'Některé banky akceptují výpisy z účtu',
        'Kombinace s příjmem partnera/ky',
      ],
      tips: 'Pokud plánujete hypotéku, minimalizujte daňovou optimalizaci rok předem.',
    },
    {
      id: 'inheritance',
      title: 'Dědictví nebo darování',
      emoji: '🎁',
      description: 'Získáváte nemovitost dědictvím nebo darem',
      challenges: [
        'Spoluvlastníci nesouhlasí',
        'Potřeba vyplatit ostatní',
        'Daňové povinnosti',
      ],
      solutions: [
        'Hypotéka na vypořádání spoluvlastníků',
        'Znalecký posudek hodnoty',
        'Daň z nabytí: 0% u příbuzných v linii',
        'Právní pomoc s vypořádáním dědictví',
      ],
      tips: 'Dědictví po příbuzných v přímé linii je bez daně, ale vyplatit ostatní musíte.',
    },
    {
      id: 'seniors',
      title: 'Senioři 55+',
      emoji: '👴',
      description: 'Hypotéka v seniorském věku',
      challenges: [
        'Věková hranice (obvykle 70-75 let)',
        'Důchodový příjem',
        'Pojištění schopnosti splácet',
      ],
      solutions: [
        'Kratší doba splatnosti (do 70-75 let)',
        'Důchod se počítá do bonity',
        'Spoludlužník (dítě) pro prodloužení',
        'Možnost reverzní hypotéky',
      ],
      tips: 'Reverzní hypotéka: banka platí vám, ale po smrti připadne nemovitost bance.',
    },
    {
      id: 'reconstruction',
      title: 'Rekonstrukce',
      emoji: '🔨',
      description: 'Půjčka na opravu nebo modernizaci',
      challenges: [
        'Prokázat účel čerpání',
        'Postupné čerpání',
        'Ocenění po rekonstrukci',
      ],
      solutions: [
        'Detailní rozpočet prací',
        'Čerpání na základě faktur',
        'Kombinace: hypotéka + American',
        'Některé banky: paušální částka bez dokládání',
      ],
      tips: 'Hypotéka na rekonstrukci má často nižší úrok než spotřebitelský úvěr.',
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

            <h1 className="mb-6">Hypotéky podle situace</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Každá životní situace je jiná. Ukážeme vám, co řešit a jak postupovat 
              ve vaší konkrétní situaci.
            </p>
          </motion.div>

          {/* Situations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
            {situations.map((situation, i) => (
              <motion.div
                key={situation.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="bg-zfp-dark border border-white/10 rounded-2xl p-8 hover:border-zfp-gold transition-all cursor-pointer"
                onClick={() => setSelectedSituation(selectedSituation === situation.id ? '' : situation.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-4xl mb-3">{situation.emoji}</div>
                    <h3 className="text-2xl font-semibold mb-2">{situation.title}</h3>
                    <p className="text-white/60 text-sm">{situation.description}</p>
                  </div>
                  
                  <svg 
                    className={`w-6 h-6 text-zfp-orange transition-transform ${selectedSituation === situation.id ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {selectedSituation === situation.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-white/10 space-y-6"
                  >
                    {/* Challenges */}
                    <div>
                      <h4 className="text-sm font-semibold text-zfp-orange mb-3 uppercase tracking-wider">
                        Výzvy:
                      </h4>
                      <ul className="space-y-2">
                        {situation.challenges.map((challenge, j) => (
                          <li key={j} className="flex items-start text-sm text-white/60">
                            <svg className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                      <h4 className="text-sm font-semibold text-zfp-gold mb-3 uppercase tracking-wider">
                        Řešení:
                      </h4>
                      <ul className="space-y-2">
                        {situation.solutions.map((solution, j) => (
                          <li key={j} className="flex items-start text-sm text-white/70">
                            <svg className="w-4 h-4 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tip */}
                    <div className="bg-zfp-orange/10 border border-zfp-orange/20 rounded-lg p-4">
                      <p className="text-sm text-white/80">
                        <strong className="text-zfp-orange">💡 Tip:</strong> {situation.tips}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-zfp-orange/20 to-zfp-dark border border-zfp-orange/30 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Nevíte si rady s vaší situací?</h2>
            <p className="text-xl text-white/70 mb-8">
              Každý případ je individuální. Probereme to spolu.
            </p>
            
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Nezávazná konzultace
            </button>
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
