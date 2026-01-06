'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function LicenceOdpovednostPage() {
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
            <h1 className="mb-6">Licence & odpovědnost</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Finanční poradenství vyžaduje certifikace, zkoušky a profesní odpovědnost. 
              Náš tým splňuje všechny požadavky.
            </p>
          </motion.div>

          {/* Certifications */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Profesní kvalifikace týmu</h2>
            <div className="bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-zfp-orange">Ing. Marek Franc, PFP</h3>
                  <p className="text-white/60 mb-4 text-sm">Vedoucí regionální kanceláře</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-zfp-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white/70">Ing. - Vysokoškolské vzdělání</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-zfp-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white/70">PFP - Profesionální finanční poradce</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-zfp-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white/70">Certifikace hypotečního specialisty</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-zfp-orange">Tereza Kopecká, DiS.</h3>
                  <p className="text-white/60 mb-4 text-sm">Finanční specialistka</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-zfp-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white/70">DiS. - Vyšší odborné vzdělání</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-zfp-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white/70">Certifikace finančního poradce</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-zfp-gold/10 border border-zfp-gold/20 rounded-lg">
                <p className="text-sm text-white/70 leading-relaxed">
                  <strong className="text-zfp-gold">Další členové týmu:</strong> Vladimír Poliak ml., Anna Tučková, 
                  Lukáš Španír - všichni s certifikacemi finančního poradenství a specializacemi v jednotlivých oblastech.
                </p>
              </div>
            </div>
          </div>

          {/* What certifications mean */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co znamenají certifikace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  cert: 'PFP - Profesionální finanční poradce', 
                  desc: 'Nejvyšší certifikace v ČR. Vyžaduje rozsáhlé znalosti, praxi a složení náročných zkoušek.' 
                },
                { 
                  cert: 'Hypoteční specialista', 
                  desc: 'Certifikace pro zprostředkování hypoték. Znalost produktů, legislativy a procesů.' 
                },
                { 
                  cert: 'Pojišťovací makléř', 
                  desc: 'Oprávnění zprostředkovávat pojištění. Registrace v registru ČNB.' 
                },
                { 
                  cert: 'Investiční zprostředkovatel', 
                  desc: 'Licence pro zprostředkování investičních produktů. Dohled ČNB.' 
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex-shrink-0 w-8 h-8 bg-zfp-gold/20 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-zfp-orange">{item.cert}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional responsibility */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Profesní odpovědnost</h2>
            <div className="space-y-6">
              {[
                { 
                  title: 'Pojištění profesní odpovědnosti', 
                  desc: 'Každý poradce má pojištění profesní odpovědnosti. Pokud uděláme chybu, jste chráněni.' 
                },
                { 
                  title: 'Dohled ČNB', 
                  desc: 'Naše činnost podléhá dohledu České národní banky. Musíme dodržovat pravidla.' 
                },
                { 
                  title: 'Etický kodex', 
                  desc: 'Zavázali jsme se k etickému kodexu ZFP GROUP. Má přednost před ziskem.' 
                },
                { 
                  title: 'Průběžné vzdělávání', 
                  desc: 'Certifikace vyžadují pravidelné obnovy a školení. Neustále se vzděláváme.' 
                },
                { 
                  title: 'Transparentnost', 
                  desc: 'Musíme vést záznamy o všech radách a doporučeních. Vše je zdokumentováno.' 
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why it matters */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Proč to pro vás znamená</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { benefit: 'Bezpečí', desc: 'Pracujete s profesionály, kteří jsou za svou práci odpovědní' },
                { benefit: 'Kvalita', desc: 'Certifikace znamenají znalosti a zkušenosti' },
                { benefit: 'Jistota', desc: 'V případě problému máte kam se obrátit' },
                { benefit: 'Standardy', desc: 'Dodržujeme profesní a etické standardy' },
                { benefit: 'Ochrana', desc: 'Pojištění profesní odpovědnosti vás chrání' },
                { benefit: 'Důvěra', desc: 'Můžete nám věřit - nejsme "jen prodejci"' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-gold">{item.benefit}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Důvěřujte profesionálům</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Spojte se s certifikovanými poradci a mějte jistotu kvalitního poradenství
            </p>
            <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105">
              Chci konzultaci
            </button>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="Konzultace s certifikovanými poradci" subject="licence" />
    </>
  );
}
