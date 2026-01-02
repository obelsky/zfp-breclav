'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import ConstructionIcon from '@/components/icons/mortgage/ConstructionIcon';
import MortgageCalculatorBanner from '@/components/MortgageCalculatorBanner';

export default function ConstructionPage() {
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
            className="mb-16"
          >
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <div className="mb-6 text-zfp-gold">
              <ConstructionIcon className="w-16 h-16" />
            </div>

            <h1 className="mb-6">Stavební úpravy</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Rekonstrukce, přístavba, vestavba nebo nová stavba. Pomůžeme vám 
              financovat proměnu vašeho bydlení.
            </p>
          </motion.div>

          {/* Mortgage Calculator CTA */}
          <MortgageCalculatorBanner 
            title="Spočítejte si hypotéku pro stavební úpravy"
            description="Zjistěte výši měsíční splátky na financování rekonstrukce, přístavby nebo úprav vašeho bydlení."
          />

          {/* Types of Projects */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co lze financovat</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  type: 'Rekonstrukce bytu',
                  detail: 'Výměna koupelny, kuchyně, podlahy, oken, kompletní přestavba.',
                  amount: '200 tis. - 1 mil. Kč',
                },
                {
                  type: 'Rekonstrukce domu',
                  detail: 'Střecha, fasáda, nové rozvody, zateplení, modernizace.',
                  amount: '500 tis. - 3 mil. Kč',
                },
                {
                  type: 'Přístavba',
                  detail: 'Rozšíření domu o další místnost, garáž, zimní zahradu.',
                  amount: '500 tis. - 2 mil. Kč',
                },
                {
                  type: 'Vestavba',
                  detail: 'Půdní vestavba, vybudování podkroví, další patro.',
                  amount: '800 tis. - 3 mil. Kč',
                },
                {
                  type: 'Novostavba na pozemku',
                  detail: 'Stavba nového rodinného domu na vlastním pozemku.',
                  amount: '3 mil. - 10 mil. Kč',
                },
                {
                  type: 'Oprava po havárii',
                  detail: 'Požár, povodeň, statické problémy – nečekané opravy.',
                  amount: 'dle rozsahu škody',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                  <h3 className="text-lg font-semibold mb-3 text-zfp-orange">{item.type}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">{item.detail}</p>
                  <div className="text-xs text-zfp-gold font-semibold">{item.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Financing Options */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Možnosti financování</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Navýšení stávající hypotéky',
                  description: 'Pokud už máte hypotéku, můžeme ji navýšit na rekonstrukci. Jednodušší a rychlejší.',
                  pros: 'Jeden úvěr, nižší úrok než spotřebitelský',
                  cons: 'Vyžaduje ocenění nemovitosti',
                },
                {
                  title: 'Nová hypotéka na rekonstrukci',
                  description: 'Pokud nemáte hypotéku nebo chcete oddělit rekonstrukci od původního úvěru.',
                  pros: 'Flexibilnější podmínky čerpání',
                  cons: 'Dva úvěry = dvě splátky',
                },
                {
                  title: 'Úvěr ze stavebního spoření',
                  description: 'Pro menší rekonstrukce do 500 tis. Kč, pokud máte stavební spoření.',
                  pros: 'Rychlé, méně dokumentů',
                  cons: 'Vyšší úrok než hypotéka',
                },
                {
                  title: 'Kombinace zdrojů',
                  description: 'Hypotéka + vlastní úspory + případně dotace na zateplení, výměnu kotle apod.',
                  pros: 'Optimalizace nákladů',
                  cons: 'Složitější koordinace',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-4">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-2">{item.description}</p>
                    <div className="flex gap-4 text-xs">
                      <span className="text-zfp-gold">✓ {item.pros}</span>
                      <span className="text-white/50">⚠ {item.cons}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Jak čerpání na stavbu funguje</h2>
            
            <div className="bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-8 lg:p-10">
              <p className="text-white/70 mb-8 leading-relaxed">
                Na rozdíl od běžné hypotéky, kdy dostanete peníze najednou, u stavebních úprav 
                se hypotéka čerpá postupně podle fází stavby.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    phase: 'Fáze 1',
                    title: 'Schválení projektu',
                    detail: 'Banka schválí rozpočet stavby a harmonogram čerpání.',
                  },
                  {
                    phase: 'Fáze 2',
                    title: 'Čerpání po etapách',
                    detail: 'Peníze dostáváte postupně po dokončení jednotlivých částí.',
                  },
                  {
                    phase: 'Fáze 3',
                    title: 'Dokládání faktur',
                    detail: 'Musíte doložit faktury a technické zprávy o postupu.',
                  },
                  {
                    phase: 'Fáze 4',
                    title: 'Kolaudace',
                    detail: 'Po dokončení stavby proběhne kolaudace a ocenění.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="text-sm text-zfp-orange font-semibold mb-2">{item.phase}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h4 className="text-lg font-semibold mb-3 text-zfp-gold">Důležité upozornění</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Během stavby platíte pouze úroky z vyčerpané části hypotéky. Plná splátka 
                  začíná až po dokončení a kolaudaci.
                </p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co budete potřebovat</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-zfp-gold">Pro schválení úvěru</h3>
                <div className="space-y-3">
                  {[
                    'Projektová dokumentace nebo alespoň rozpočet',
                    'Stavební povolení (pokud je potřeba)',
                    'Ocenění nemovitosti před i po stavbě',
                    'Smlouvy s dodavateli',
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

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-zfp-gold">Během čerpání</h3>
                <div className="space-y-3">
                  {[
                    'Faktury od dodavatelů',
                    'Fotodokumentace průběhu stavby',
                    'Technická zpráva o postupu prací',
                    'Kolaudační souhlas (na konci)',
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

          {/* Tips */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Tipy pro rekonstrukci</h2>
            
            <div className="space-y-4">
              {[
                'Počítejte s rezervou 20 % navíc – vždycky se něco objeví.',
                'Mějte detailní rozpočet – banka ho bude vyžadovat a vy budete vědět, kam jdou peníze.',
                'Vyberte si kvalitní firmy – nekvalitní práce vás vyjde drážeji na opravách.',
                'Koordinujte dodavatele – špatná koordinace prodlužuje stavbu a zdražuje ji.',
                'Hlídejte si průběh – pravidelné kontroly předejdou problémům.',
              ].map((tip, i) => (
                <div key={i} className="flex items-start bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex-shrink-0 w-8 h-8 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-4 text-sm">
                    {i + 1}
                  </div>
                  <p className="text-white/70 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-zfp-dark border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Proměňme vaše bydlení</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Pomůžeme vám naplánovat financování rekonstrukce nebo stavby
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
        title="Financování stavebních úprav - nezávazná poptávka"
        subject="hypoteky"
      />
    </>
  );
}
