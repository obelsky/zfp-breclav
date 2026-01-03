'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import InvestmentIcon from '@/components/icons/mortgage/InvestmentIcon';
import MortgageCalculatorBanner from '@/components/MortgageCalculatorBanner';

// SEO Metadata
export const metadata = {
  title: 'Hypotéka na investici do nemovitostí Břeclav | Investiční úvěr | ZFP GROUP',
  description: 'Hypotéka na investici do nemovitostí v Břeclavi. Financování investičního bytu nebo domu k pronájmu. Výhodné podmínky pro investory. Bezplatná konzultace.',
  keywords: 'hypotéka investice nemovitosti, investiční úvěr, financování pronájmu, byt k pronájmu, investiční nemovitost, Břeclav',
  openGraph: {
    title: 'Hypotéka na investici do nemovitostí | ZFP GROUP Břeclav',
    description: 'Nemovitost jako investice přináší stabilní výnos. Pomůžeme s financováním investičního bytu nebo domu k pronájmu.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky/situace/investice',
    type: 'website',
    locale: 'cs_CZ'
  }
};

export default function InvestmentPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Hypotéka na investici do nemovitostí - ZFP GROUP Břeclav",
    "description": "Specializujeme se na financování investičních nemovitostí. Pomůžeme získat výhodný úvěr na byt či dům k pronájmu.",
    "provider": {
      "@type": "FinancialService",
      "name": "ZFP GROUP Břeclav",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "náměstí T. G. Masaryka 28/10",
        "addressLocality": "Břeclav",
        "postalCode": "690 02",
        "addressCountry": "CZ"
      }
    },
    "serviceType": "Hypoteční úvěr na investici do nemovitostí"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
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
              <InvestmentIcon className="w-16 h-16" />
            </div>

            <h1 className="mb-6">Hypotéka na investici do nemovitostí</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Nemovitost jako investice může přinášet stabilní výnos z pronájmu. Pomůžeme vám 
              s financováním investičního bytu nebo domu včetně výhodných podmínek.
            </p>
          </motion.div>

          {/* Mortgage Calculator CTA */}
          <MortgageCalculatorBanner 
            title="Spočítejte si hypotéku pro investici do nemovitosti"
            description="Zjistěte výši měsíční splátky a návratnost investice do pronajímatelné nemovitosti."
          />

          {/* Types of Investment */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Typy investic do nemovitostí</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  type: 'Pronájem dlouhodobý',
                  detail: 'Byt nebo dům k dlouhodobému pronájmu. Stabilní příjem, nižší riziko.',
                  yield: 'Výnos: 3-6 % p.a.',
                },
                {
                  type: 'Pronájem krátkodobý',
                  detail: 'Airbnb, Booking. Vyšší výnosy, ale i vyšší náklady a administrativ a.',
                  yield: 'Výnos: 5-10 % p.a.',
                },
                {
                  type: 'Koupě s rekonstrukcí',
                  detail: 'Starší byt, rekonstrukce, prodej nebo pronájem. Vyšší zhodnocení.',
                  yield: 'Zisk: 15-30 %',
                },
                {
                  type: 'Výstavba na pozemku',
                  detail: 'Stavba domu na vlastním pozemku s následným prodejem.',
                  yield: 'Zisk: 20-40 %',
                },
                {
                  type: 'Druhé bydlení',
                  detail: 'Rekreační nemovitost, kterou část roku pronajímáte.',
                  yield: 'Výnos: 2-4 % p.a.',
                },
                {
                  type: 'Komerční nemovitosti',
                  detail: 'Kanceláře, sklady, provozovny. Pro zkušenější investory.',
                  yield: 'Výnos: 5-8 % p.a.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                  <h3 className="text-lg font-semibold mb-3 text-zfp-orange">{item.type}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">{item.detail}</p>
                  <div className="text-xs text-zfp-gold font-semibold">{item.yield}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Specifics */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Specifika investičních hypoték</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Vyšší úroková sazba',
                  description: 'Investiční hypotéky mají obvykle o 0,5-1 % vyšší úrok než na vlastní bydlení.',
                  note: 'Je to dané vyšším rizikem pro banku',
                },
                {
                  title: 'Nižší LTV',
                  description: 'Banky obvykle financují max. 70-80 % hodnoty nemovitosti, zbytek musíte mít vlastní.',
                  note: 'U vlastního bydlení je to až 90 %',
                },
                {
                  title: 'Vyšší požadavky na bonitu',
                  description: 'Potřebujete vyšší příjem nebo existující nemovitosti jako zajištění.',
                  note: 'Příjem z pronájmu se započítává jen částečně',
                },
                {
                  title: 'Detailnější prověření',
                  description: 'Banky zkoumají lokalitu, potenciál pronájmu, vaše zkušenosti s investicemi.',
                  note: 'Proces trvá o něco déle',
                },
                {
                  title: 'Daňové aspekty',
                  description: 'Příjem z pronájmu zdaňujete. Můžete si odečíst úroky z hypotéky a další náklady.',
                  note: 'Poradíme, jak to nastavit optimálně',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-4">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-1">{item.description}</p>
                    <p className="text-white/50 text-xs italic">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Calculator */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Jak posoudit investici</h2>
            
            <div className="bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-8 lg:p-10">
              <h3 className="text-2xl mb-6">Základní ukazatele</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    metric: 'Hrubý výnos',
                    formula: 'Roční nájem / Cena nemovitosti × 100',
                    example: 'Příklad: 180 000 Kč / 3 000 000 Kč = 6 %',
                  },
                  {
                    metric: 'Čistý výnos',
                    formula: 'Hrubý výnos mínus náklady (daně, údržba, poplatky)',
                    example: 'Příklad: 6 % hrubý mínus 2 % náklady = 4 % čistý',
                  },
                  {
                    metric: 'Cash flow',
                    formula: 'Nájem mínus splátka hypotéky a náklady',
                    example: 'Mělo by být kladné nebo minimálně nula',
                  },
                  {
                    metric: 'Návratnost',
                    formula: 'Cena nemovitosti / Čistý roční výnos',
                    example: 'Příklad: 3 mil. / 120 tis. = 25 let',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-2 text-zfp-gold">{item.metric}</h4>
                    <p className="text-white/70 text-sm mb-2">{item.formula}</p>
                    <p className="text-white/50 text-xs italic">{item.example}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h4 className="text-lg font-semibold mb-3 text-zfp-orange">Důležité upozornění</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Investice do nemovitostí není zaručený výdělek. Počítejte s prázdným bytem 1-2 měsíce ročně, 
                  nečekanými opravami a kolísáním cen. Vyplatí se dlouhodobě.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Tipy pro investory</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Lokalita je klíč',
                  tip: 'Dobré místo se vždycky pronajme. Blízkost MHD, služeb, škol, zaměstnanosti.',
                },
                {
                  title: 'Počítejte reálně',
                  tip: 'Do nákladů zahrňte opravy, fondy, daně, prázdný měsíc. Ne jen hypotéku.',
                },
                {
                  title: 'Diverzifikace',
                  tip: 'Lepší dva menší byty než jeden velký. Riziko prázdného bytu je nižší.',
                },
                {
                  title: 'Začít malé',
                  tip: 'První investice by měla být konzerv ativní. Zkušenosti přijdou s časem.',
                },
                {
                  title: 'Nákup pod cenou',
                  tip: 'Hledejte byty, které se nevyplatí developerům, ale vyplatí se vám.',
                },
                {
                  title: 'Právní čistota',
                  tip: 'Nechte si prověřit nemovitost právně. Problémy vás můžou draze stát.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-gold">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-zfp-dark border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Připravíme financování vaší investice</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Poradíme s výběrem nemovitosti, vyjednáme nejlepší podmínky hypotéky
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
        title="Investiční hypotéka - nezávazná poptávka"
        subject="hypoteky"
      />
    </>
  );
}
