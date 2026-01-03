'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import FirstHomeIcon from '@/components/icons/mortgage/FirstHomeIcon';
import MortgageCalculatorBanner from '@/components/MortgageCalculatorBanner';

// SEO Metadata
export const metadata = {
  title: 'Hypotéka na první bydlení Břeclav | Hypoteční úvěr pro začátečníky | ZFP GROUP',
  description: 'Hypotéka na první bydlení v Břeclavi a okolí. Pomůžeme získat výhodný hypoteční úvěr i s nízkou akontací a kratší pracovní historií. Bezplatná konzultace.',
  keywords: 'hypotéka první bydlení, hypoteční úvěr začátečníci, nízká akontace, první vlastní byt, mladá rodina hypotéka, Břeclav',
  openGraph: {
    title: 'Hypotéka na první bydlení | Finanční poradenství Břeclav',
    description: 'První krok k vlastnímu bydlení. Pomůžeme vám získat hypotéku i s nízkou akontací a kratší pracovní historií.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky/situace/prvni-bydleni',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav'
  }
};

export default function FirstHomePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Structured Data - LocalBusiness + Service
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Hypotéka na první bydlení - ZFP GROUP Břeclav",
    "description": "Specializujeme se na hypotéky pro první bydlení. Pomůžeme získat výhodný úvěr i s nízkou akontací.",
    "provider": {
      "@type": "FinancialService",
      "name": "ZFP GROUP Břeclav",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "náměstí T. G. Masaryka 28/10",
        "addressLocality": "Břeclav",
        "postalCode": "690 02",
        "addressCountry": "CZ"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "48.7589",
        "longitude": "16.8822"
      },
      "telephone": "+420-519-352-632",
      "url": "https://www.zfpbreclav.cz"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "48.7589",
        "longitude": "16.8822"
      },
      "geoRadius": "50000"
    },
    "serviceType": "Hypoteční úvěr pro první bydlení",
    "offers": {
      "@type": "Offer",
      "description": "Bezplatná konzultace k hypotéce na první bydlení"
    }
  };

  return (
    <>
      {/* Structured Data */}
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
              <FirstHomeIcon className="w-16 h-16" />
            </div>

            <h1 className="mb-6">Hypotéka na první bydlení</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              První vlastní bydlení je velký krok. Pomůžeme vám zorientovat se v možnostech 
              hypotečních úvěrů a najít financování, které vám umožní začít i s nízkou akontací.
            </p>
          </motion.div>

          {/* Mortgage Calculator CTA */}
          <MortgageCalculatorBanner 
            title="Spočítejte si hypotéku pro první bydlení"
            description="Zjistěte výši měsíční splátky, celkové náklady a další parametry hypotéky přesně pro vaši situaci jako začínající vlastník."
          />

          {/* Challenges */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Výzvy při první hypotéce</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  challenge: 'Nízká vlastní hotovost',
                  solution: 'Hypotéky s nižší akontací, kombinace se stavebním spořením nebo podporou rodičů',
                },
                {
                  challenge: 'Kratší pracovní historie',
                  solution: 'Banky, které akceptují kratší pracovní dobu, důraz na stabilitu zaměstnání',
                },
                {
                  challenge: 'Nejasný proces',
                  solution: 'Provedeme vás krok za krokem, vysvětlíme každý dokument',
                },
                {
                  challenge: 'Strach z závazku',
                  solution: 'Realistické plánování, předvídání budoucích změn, pojištění',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3 text-zfp-orange">{item.challenge}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Co vám nabízíme</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Realistické posouzení možností',
                  description: 'Zjistíme, kolik si můžete dovolit půjčit, a najdeme banku, která vám schválí hypotéku.',
                },
                {
                  title: 'Hypotéky s nižší akontací',
                  description: 'Možnosti od 10 % vlastních prostředků, státní podpora pro mladé do 36 let.',
                },
                {
                  title: 'Kombinované financování',
                  description: 'Stavební spoření, půjčka od rodičů, dotace – všechno zahrneme do plánu.',
                },
                {
                  title: 'Příprava dokumentů',
                  description: 'Pomůžeme s přípravou všech podkladů pro banku, abyste nemuseli nic řešit sami.',
                },
                {
                  title: 'Pojištění schopnosti splácet',
                  description: 'Doporučíme vhodné pojištění pro případ nemoci, úrazu nebo ztráty zaměstnání.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-4">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Jak to bude probíhat</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'První schůzka',
                  description: 'Probereme vaši situaci, příjmy, úspory a představy o bydlení.',
                },
                {
                  step: '02',
                  title: 'Návrh řešení',
                  description: 'Připravíme návrh hypotéky z více bank a vysvětlíme všechny možnosti.',
                },
                {
                  step: '03',
                  title: 'Podání žádosti',
                  description: 'Pomůžeme s dokumenty a podáme žádost do vybrané banky.',
                },
                {
                  step: '04',
                  title: 'Schvalování',
                  description: 'Komunikujeme s bankou, řešíme případné dotazy.',
                },
                {
                  step: '05',
                  title: 'Čerpání',
                  description: 'Domluvíme čerpání, provedeme vás procesem až do konce.',
                },
                {
                  step: '06',
                  title: 'Podpora i po podpisu',
                  description: 'Jsme tu i potom – refinancování, změny, dotazy.',
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

          {/* Tips */}
          <div className="mb-20 bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Tipy pro první kupující</h2>
            
            <div className="space-y-4">
              {[
                'Začněte šetřit co nejdříve – čím víc vlastních peněz, tím lepší podmínky.',
                'Neuspěchejte výběr nemovitosti. Lepší si počkat než se ukvap it.',
                'Počítejte s rezervou – hypotéka není jediný výdaj (poplatky, nábytek, opravy).',
                'Zvažte blízkost práce, škol, dopravy – bydlet se bude dlouho.',
                'Nechte si nemovitost odborně prohlédnout před koupí.',
              ].map((tip, i) => (
                <div key={i} className="flex items-start">
                  <svg className="w-6 h-6 text-zfp-gold mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white/70">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-zfp-dark border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Začněme plánovat vaše první bydlení</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              První konzultace je nezávazná a zdarma
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Chci nezávaznou konzultaci
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
        title="První bydlení - nezávazná poptávka"
        subject="hypoteky"
      />
    </>
  );
}
