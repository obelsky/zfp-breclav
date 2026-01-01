'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MortgageCalculator from '@/components/MortgageCalculator';
import ContactForm from '@/components/ContactForm';
import MortgageIcon from '@/components/icons/MortgageIcon';
import TeamIcon from '@/components/icons/TeamIcon';
import ProcessIcon from '@/components/icons/ProcessIcon';
import FirstHomeIcon from '@/components/icons/mortgage/FirstHomeIcon';
import FamilyIcon from '@/components/icons/mortgage/FamilyIcon';
import EntrepreneurIcon from '@/components/icons/mortgage/EntrepreneurIcon';
import RefinancingIcon from '@/components/icons/mortgage/RefinancingIcon';
import InvestmentIcon from '@/components/icons/mortgage/InvestmentIcon';
import ConstructionIcon from '@/components/icons/mortgage/ConstructionIcon';

export default function MortgagePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const situations = [
    {
      title: 'První bydlení',
      description: 'Hypotéka na váš první byt nebo dům',
      Icon: FirstHomeIcon,
      href: '/bydleni-hypoteky/situace/prvni-bydleni',
    },
    {
      title: 'Rodina s dětmi',
      description: 'Větší bydlení pro rostoucí rodinu',
      Icon: FamilyIcon,
      href: '/bydleni-hypoteky/situace/rodina-s-detmi',
    },
    {
      title: 'OSVČ / Podnikatelé',
      description: 'Řešení pro osoby samostatně výdělečně činné',
      Icon: EntrepreneurIcon,
      href: '/bydleni-hypoteky/situace/osvc-podnikatele',
    },
    {
      title: 'Refinancování',
      description: 'Přefinancování stávající hypotéky',
      Icon: RefinancingIcon,
      href: '/bydleni-hypoteky/situace/refinancovani',
    },
    {
      title: 'Investice',
      description: 'Nemovitost jako investice',
      Icon: InvestmentIcon,
      href: '/bydleni-hypoteky/situace/investice',
    },
    {
      title: 'Stavební úpravy',
      description: 'Financování rekonstrukce nebo dostavby',
      Icon: ConstructionIcon,
      href: '/bydleni-hypoteky/situace/stavebni-upravy',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker" />
        
        <div className="relative z-10 container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <div className="mb-8 text-zfp-gold">
              <MortgageIcon className="w-20 h-20" />
            </div>

            <h1 className="mb-6">
              Bydlení & hypotéky
            </h1>

            <p className="text-xl lg:text-2xl mb-8 max-w-3xl text-white/80 leading-relaxed">
              Hypotéka není jen o číslech. Je o vaší budoucnosti, bezpečí rodiny a životních prioritách. 
              Proto k ní přistupujeme s respektem a transparentností.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/bydleni-hypoteky/kalkulacka"
                className="inline-flex items-center justify-center px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Hypoteční kalkulačka
              </Link>
              
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300"
              >
                Nezávazná poptávka
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* E-E-A-T Notice */}
      <section className="py-8 bg-zfp-orange/10 border-y border-zfp-orange/20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <p className="text-sm text-white/80">
              <strong>Upozornění:</strong> Informace na této stránce slouží k obecné orientaci. 
              Každá hypoteční situace je individuální a vyžaduje osobní posouzení. Nejsme banka, 
              ale nezávislí hypoteční poradci. Poradenství poskytujeme transparentně – 
              <Link href="/poradenstvi" className="text-zfp-orange hover:underline"> více o tom, jak pracujeme</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Mortgages by Situation */}
      <section className="py-20 lg:py-32 bg-zfp-dark">
        <div className="container-custom">
          <div className="mb-16">
            <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange mb-6" />
            <h2 className="mb-6">Hypotéky podle vaší situace</h2>
            <p className="text-xl text-white/70 max-w-3xl">
              Každý má jinou situaci. Proto nabízíme řešení šitá na míru vašim potřebám a možnostem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {situations.map((situation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={situation.href} className="block h-full">
                  <div className="h-full bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-zfp-gold transition-all duration-300">
                    <div className="text-zfp-gold mb-4 group-hover:text-zfp-orange transition-colors">
                      <situation.Icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl mb-2 group-hover:text-zfp-gold transition-colors">
                      {situation.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {situation.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
              </div>

              <div className="mb-6 text-zfp-gold">
                <ProcessIcon className="w-16 h-16" />
              </div>

              <h2 className="mb-6">
                Jak k hypotékám přistupujeme
              </h2>

              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Jsme nezávislí hypoteční poradci. To znamená, že pro vás hledáme 
                nejlepší řešení z nabídky více než 15 bank, ne jen jedné.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  {
                    step: '01',
                    title: 'Osobní konzultace',
                    description: 'Probereme vaši situaci, cíle a možnosti'
                  },
                  {
                    step: '02',
                    title: 'Analýza a návrh',
                    description: 'Najdeme nejlepší hypotéku z více bank'
                  },
                  {
                    step: '03',
                    title: 'Asistence při vyřízení',
                    description: 'Pomůžeme s dokumenty a celým procesem'
                  },
                  {
                    step: '04',
                    title: 'Dlouhodobá péče',
                    description: 'Jsme tu i po sjednání hypotéky'
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-4">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/bydleni-hypoteky/proces"
                className="inline-flex items-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300"
              >
                Detailní proces
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl mb-6">Proč nezávislý poradce?</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      title: 'Širší výběr',
                      description: 'Porovnáme nabídky z více než 15 bank'
                    },
                    {
                      title: 'Bez skrytých poplatků',
                      description: 'Odmě nu platí banka, ne vy'
                    },
                    {
                      title: 'Úspora času',
                      description: 'Nemusíte chodit do každé banky zvlášť'
                    },
                    {
                      title: 'Odborná asistence',
                      description: 'Pomůžeme s dokumenty a celým procesem'
                    },
                    {
                      title: 'Transparentnost',
                      description: 'Víte, jaké produkty porovnáváme a proč'
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-zfp-gold mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="font-semibold mb-1">{benefit.title}</p>
                        <p className="text-sm text-white/60">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 lg:py-32 bg-zfp-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <MortgageCalculator onContactClick={() => setIsContactFormOpen(true)} />
          </div>
        </div>
      </section>

      {/* Our Specialists */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange mb-6" />
            <h2 className="mb-6">Naši hypoteční specialisté</h2>
            <p className="text-xl text-white/70">
              Hypotéky řeší tým zkušených poradců z Břeclavi, kteří znají místní trh 
              a osobně vás provedou celým procesem.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/poradenstvi/nas-tym"
              className="inline-flex items-center px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <TeamIcon className="w-6 h-6 mr-2" />
              Poznejte náš tým
            </Link>
          </div>
        </div>
      </section>

      {/* Risk Warning - YMYL Compliance */}
      <section className="py-12 bg-amber-500/10 border-y border-amber-500/20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-amber-200">
              ⚠️ Důležité upozornění
            </h3>
            <div className="space-y-3 text-sm text-white/80 leading-relaxed">
              <p>
                <strong>Hypotéka je dlouhodobý závazek:</strong> Před sjednáním hypotéky důkladně zvažte 
                svou finanční situaci a budoucí příjmy. Nesplácení hypotéky může vést k exekuci nemovitosti.
              </p>
              <p>
                <strong>Nezávazná poptávka neznamená závazek:</strong> Naše služby jsou zdarma a nezávazné. 
                Můžete kdykoli odstoupit bez jakýchkoli sankcí.
              </p>
              <p>
                <strong>Informace na této stránce:</strong> Slouží k obecné orientaci. Konkrétní podmínky 
                hypotéky závisí na vaší bonitě, ceně nemovitosti a aktuální nabídce bank.
              </p>
              <p>
                <strong>Licencované poradenství:</strong> Naši poradci jsou držiteli příslušných licencí 
                ČNB. Více informací v sekci <Link href="/o-kancelari/licence" className="text-zfp-orange hover:underline">
                  Licence a oprávnění
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Začněte s hypotékou ještě dnes</h2>
            <p className="text-xl text-white/70 mb-8">
              Nezávazně se poraďte s naším týmem. Najdeme pro vás nejlepší řešení.
            </p>
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Nezávazná poptávka hypotéky
            </button>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Poptávka hypotéky"
        subject="hypoteky"
      />
    </>
  );
}
