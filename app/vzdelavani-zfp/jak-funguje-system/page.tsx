'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function HowSystemWorksPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <Link 
            href="/vzdelavani-zfp"
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

            <h1 className="mb-6">Jak funguje systém ZFP?</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Jedinečný vzdělávací systém s mezinárodní certifikací IES. 
              Od roku 1995 vzděláváme ve financích s důrazem na praktičnost a kvalitu.
            </p>
          </motion.div>

          {/* International Certification */}
          <div className="mb-20 bg-gradient-to-br from-zfp-orange/20 to-zfp-dark border border-zfp-orange/30 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-6">Mezinárodní certifikace</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Jsme držitelem <strong className="text-white">mezinárodního certifikátu IES</strong>, 
              který deklaruje trvale vysokou úroveň našeho vzdělávání. To znamená, že naše 
              vzdělávací programy odpovídají mezinárodním standardům kvality.
            </p>
            <p className="text-white/60">
              Certifikace nás zavazuje k neustálému zlepšování a modernizaci obsahu seminářů.
            </p>
          </div>

          {/* How Seminars Work */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Jak probíhají semináře</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 text-zfp-gold">Vlastní hotely Akademie</h3>
                <p className="text-white/70 mb-4 leading-relaxed">
                  Semináře pořádáme v komfortním prostředí našich vlastních hotelů. 
                  Moderní, klimatizované sály se špičkovou technikou.
                </p>
                <ul className="space-y-2">
                  {[
                    'Bezbariérový přístup',
                    'Klimatizace',
                    'Moderní audiovizuální technika',
                    'Komfortní sedění',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-white/60">
                      <svg className="w-5 h-5 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 text-zfp-gold">Zkušení lektoři</h3>
                <p className="text-white/70 mb-4 leading-relaxed">
                  Tým 170+ certifikovaných lektorů s praktickými zkušenostmi z finančního trhu. 
                  Každý lektor prošel důkladným školením.
                </p>
                <ul className="space-y-2">
                  {[
                    'Certifikovaní profesionálové',
                    'Praktické zkušenosti',
                    'Pravidelné školení',
                    'Moderní výukové metody',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-white/60">
                      <svg className="w-5 h-5 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 text-zfp-gold">Studijní materiály</h3>
                <p className="text-white/70 mb-4 leading-relaxed">
                  Přehledné studijní materiály v luxusních kožených deskách. 
                  Vše, co potřebujete k dalšímu studiu doma.
                </p>
                <ul className="space-y-2">
                  {[
                    'Kožené desky',
                    'Přehledný obsah',
                    'Praktické příklady',
                    'Reference a odkazy',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-white/60">
                      <svg className="w-5 h-5 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 text-zfp-gold">Občerstvení</h3>
                <p className="text-white/70 mb-4 leading-relaxed">
                  Vydatnou nálož informací doplníme kvalitním jídlem a pitím. 
                  Vše je v ceně vstupenky.
                </p>
                <ul className="space-y-2">
                  {[
                    'Snídaně v hotelu',
                    'Oběd od šéfkuchaře',
                    'Káva a dezerty',
                    'Nápoje celý den',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-white/60">
                      <svg className="w-5 h-5 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Education Levels Recap */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Struktura vzdělávání</h2>
            
            <div className="space-y-6">
              {[
                {
                  level: 'Úroveň 1',
                  title: 'Finanční minimum',
                  duration: 'Celodenní seminář',
                  for: 'Pro každého',
                  description: 'Základy financí, ochrana rodiny, investice, finanční nezávislost.',
                },
                {
                  level: 'Úroveň 2',
                  title: 'Finanční přehled',
                  duration: 'Několikadenní program',
                  for: 'Po absolvování Minima',
                  description: 'Detailní znalost produktů, trh, komplexní poradenství.',
                },
                {
                  level: 'Úroveň 3',
                  title: 'Navazující vzdělávání',
                  duration: 'Pokračující program',
                  for: 'Budoucí profesionálové',
                  description: 'Specializace: hypotéky, investice, korporátní finance.',
                },
              ].map((level, i) => (
                <div key={i} className="bg-zfp-dark border border-white/10 rounded-xl p-8 flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-6">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-zfp-gold font-semibold tracking-wider uppercase">{level.level}</span>
                      <span className="text-xs text-white/40">•</span>
                      <span className="text-xs text-white/60">{level.duration}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{level.title}</h3>
                    <p className="text-sm text-zfp-orange mb-3">{level.for}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{level.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="mb-20 bg-gradient-to-br from-zfp-dark to-zfp-darker border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-6">Naše filozofie</h2>
            <div className="space-y-4 text-lg text-white/70 leading-relaxed">
              <p>
                <strong className="text-white">Vzdělávání je základ.</strong> Informovaný člověk dělá lepší rozhodnutí. 
                Proto v ZFP staví me na tom, abyste rozuměli, ne jen slepě důvěřovali.
              </p>
              <p>
                <strong className="text-white">Praktičnost před teorií.</strong> Učíme to, co použijete hned. 
                Žádné složité teoretické koncepty, které v reálném životě nevyužijete.
              </p>
              <p>
                <strong className="text-white">Rovnocenné cesty.</strong> Nenutíme nikoho do kariéry ani k produktu. 
                Každý si vybere svou cestu – vzdělání, poradenství, nebo profesionální rozvoj.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8 text-center">Výsledky 30 let práce</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: '300 000+', label: 'Vyškolených účastníků' },
                { number: '4 200+', label: 'Seminářů celkem' },
                { number: '170+', label: 'Zkušených lektorů' },
                { number: '30 let', label: 'Na trhu' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
                  <p className="text-4xl font-bold text-zfp-orange mb-2">{stat.number}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-zfp-orange/20 to-zfp-dark border border-zfp-orange/30 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Chcete se stát částí systému ZFP?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Začněte s námi. Od základního semináře až po profesionální kariéru.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vzdelavani-zfp/financni-minimum"
                className="inline-block px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all"
              >
                Základní seminář
              </Link>
              
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all"
              >
                Kontaktovat nás
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Zájem o vzdělávání ZFP"
        subject="vzdelavani"
      />
    </>
  );
}
