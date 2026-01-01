'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function NapojeniNaZfpPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <Link href="/o-kancelari" className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na O kanceláři
          </Link>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <div className="mb-6"><div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" /></div>
            <h1 className="mb-6">Napojení na ZFP GROUP</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Nejsme sami. Jsme součástí ZFP GROUP - finanční skupiny s tradicí od roku 1995.
            </p>
          </motion.div>

          {/* About ZFP GROUP */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-6">ZFP GROUP</h2>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              ZFP GROUP je finanční skupina založená v roce 1995. Od té doby pomohla tisícům klientů 
              s financemi, investicemi a vzděláváním.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { stat: '1995', label: 'Rok založení' },
                { stat: '10 000+', label: 'Klientů' },
                { stat: '500+', label: 'Finančních poradců' },
                { stat: '30+', label: 'Let zkušeností' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-zfp-orange mb-2">{item.stat}</div>
                  <div className="text-sm text-white/60">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co vám přináší napojení na ZFP</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: 'Silné zázemí', 
                  desc: 'Máme za sebou celou skupinu. Finanční stabilitu, právní podporu, technologie.' 
                },
                { 
                  title: 'Rozsáhlá síť', 
                  desc: 'Přístup k 500+ poradcům po celé ČR. Pokud něco nevíme, někdo jiný ve skupině ano.' 
                },
                { 
                  title: 'Lepší podmínky', 
                  desc: 'Díky objemu dokážeme vyjednat výhodnější podmínky u bank a pojišťoven.' 
                },
                { 
                  title: 'Vzdělávání', 
                  desc: 'Pravidelná školení, certifikace a vzdělávací programy pro poradce i klienty.' 
                },
                { 
                  title: 'Komplexní řešení', 
                  desc: 'Hypotéky, investice, pojištění, reality - všechno pod jednou střechou.' 
                },
                { 
                  title: 'Profesionalita', 
                  desc: 'Standardy kvality, etický kodex a profesní odpovědnost celé skupiny.' 
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex-shrink-0 w-8 h-8 bg-zfp-gold/20 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-zfp-orange">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ZFP Portfolio */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Portfolio ZFP GROUP</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'ZFP Akademie', desc: 'Vzdělávací centrum pro finanční gramotnost', link: 'https://zfpa.cz/' },
                { name: 'ZFP Investments', desc: 'Investiční produkty a správa portfolia', link: 'https://www.zfpinvest.com/' },
                { name: 'ZFP Finance', desc: 'Finanční poradenství a zprostředkování', link: 'https://www.zfp-finance.cz/' },
                { name: 'ZFP Reality', desc: 'Realitní makléřství a zprostředkování', link: 'https://www.zfpreality.cz/' },
                { name: 'ZFP Gold', desc: 'Investice do drahých kovů', link: 'https://www.zfp-gold.cz/' },
                { name: 'ZFP World Index', desc: 'Globální investiční řešení', link: 'https://www.zfpwi.cz/' },
              ].map((company, i) => (
                <a 
                  key={i} 
                  href={company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zfp-gold hover:bg-white/10 transition-all group"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-zfp-gold transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">{company.desc}</p>
                  <div className="inline-flex items-center text-zfp-orange text-sm">
                    <span>Navštívit web</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="mb-20 bg-gradient-to-br from-zfp-gold/10 to-zfp-dark border border-zfp-gold/20 rounded-2xl p-8 lg:p-10">
            <h2 className="text-3xl mb-8">Jak to funguje v praxi</h2>
            <div className="space-y-4">
              {[
                'Potřebujete hypotéku? Využijeme kontakty a zkušenosti celé sítě poradců.',
                'Chcete investovat? Propojíme vás s investičními specialisty ze ZFP Investments.',
                'Řešíte koupi nemovitosti? ZFP Reality vám pomůže najít nebo prodat.',
                'Potřebujete školení? ZFP Akademie nabízí kurzy pro každou úroveň.',
                'Máte složitý případ? Konzultujeme ho s kolegy napříč celou skupinou.',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-zfp-gold/20 rounded-full flex items-center justify-center text-zfp-gold font-bold text-xs mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Vyzkoušejte sílu ZFP GROUP</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Spojte se s námi a využijte výhody spolupráce s celou skupinou
            </p>
            <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105">
              Domluvit schůzku
            </button>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="Kontakt" subject="zfp-group" />
    </>
  );
}
