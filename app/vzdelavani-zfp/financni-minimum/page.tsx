'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function FinancialMinimumPage() {
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
            Zpět na Vzdělávání ZFP
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
              <span className="text-sm text-zfp-gold font-semibold tracking-wider uppercase">Úroveň 1</span>
            </div>

            <h1 className="mb-6">Finanční minimum</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Základní seminář pro každého, kdo chce mít ve financích konečně jasno. 
              Bez odborného žargonu, bez složitých teorií. Jen praktické znalosti, které použijete hned.
            </p>
          </motion.div>

          {/* What You'll Learn */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co se naučíte</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: 'Ochočte své finance',
                  description: 'Ať už řešíte bydlení, každodenní finance, pojištění nebo zajištění na stáří.',
                  icon: (
                    <svg className="w-12 h-12 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Získejte solidní know-how',
                  description: 'Nejv íce peněz vám vydělají kvalitní informace. Nebuďte závislí na radách ostatních.',
                  icon: (
                    <svg className="w-12 h-12 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Pro každého',
                  description: 'Studenty, zaměstnance, podnikatele, rodiny i seniory. Každý najde užitečné informace.',
                  icon: (
                    <svg className="w-12 h-12 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl mb-3 text-zfp-gold">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Topics */}
            <div className="bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-10">
              <h3 className="text-2xl mb-6">Hlavní témata semináře</h3>
              
              <div className="space-y-6">
                {[
                  {
                    title: 'Filozofie ZFP',
                    description: 'Představení společnosti, firemní filozofie a principů, na kterých staví ZFP. Proč je vzdělávání základ všeho.',
                  },
                  {
                    title: 'Rodinné finance I',
                    description: 'Jak efektivně zabezpečit sebe i svou rodinu. Ochrana majetku, rizika a jak se proti nim bránit. Rozdělení rezerv, zajištění a budoucnosti.',
                  },
                  {
                    title: 'Rodinné finance II',
                    description: 'Investování do aktiv a pasivní příjem. Jak chránit peníze proti inflaci a nechat je na vás pracovat.',
                  },
                  {
                    title: 'Finanční nezávislost',
                    description: 'Možnosti spolupráce s ZFP a dalšího rozvoje. Jak se stát finančním profesionálem, pokud vás to zajímá.',
                  },
                ].map((topic, i) => (
                  <div key={i} className="flex items-start border-b border-white/10 pb-6 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-4">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{topic.title}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{topic.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Program */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Průběh semináře</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="divide-y divide-white/10">
                {[
                  { time: '07:30', title: 'Registrace', desc: 'Registrace a studijní materiály' },
                  { time: '08:30', title: 'Filozofie', desc: 'Úvod do světa ZFP' },
                  { time: '09:25', title: 'Coffee Break', desc: 'Káva a dezert' },
                  { time: '09:55', title: 'Rodinné finance I', desc: 'Zabezpečení rodiny a majetku' },
                  { time: '10:50', title: 'Přestávka', desc: 'Čas vstřebat informace' },
                  { time: '11:05', title: 'Rodinné finance II', desc: 'Investice a pasivní příjem' },
                  { time: '12:00', title: 'Přestávka', desc: '15 minut' },
                  { time: '12:15', title: 'Finanční nezávislost', desc: 'Spolupráce a kariéra' },
                  { time: '13:30', title: 'Oběd', desc: 'Zasloužený oběd' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center p-6 hover:bg-white/5 transition-colors">
                    <div className="flex-shrink-0 w-20 text-zfp-orange font-semibold">{item.time}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What You Get */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co si odnesete</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Studijní materiály',
                  description: 'Přehledné materiály v luxusních kožených deskách',
                  icon: '📚',
                },
                {
                  title: 'Občerstvení celý den',
                  description: 'Snídaně, oběd, káva a nápoje zdarma',
                  icon: '☕',
                },
                {
                  title: 'Komfortní prostředí',
                  description: 'Klimatizované sály se špičkovou technikou',
                  icon: '🏨',
                },
                {
                  title: 'Zkušení lektoři',
                  description: 'Tým 170+ certifikovaných lektorů',
                  icon: '👨‍🏫',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-start">
                    <div className="text-4xl mr-4">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-10">
            <h2 className="text-3xl mb-8">Co říkají účastníci</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  text: 'Forma a způsob podání se mi líbil. Líbí se mi teorie o rozdělení rezerv, zajištění a budoucnosti. Oba přednášející mě nadchli ve smyslu dál se vzdělávat.',
                  author: 'Tomáš P., Brno',
                },
                {
                  text: 'Dozvěděl jsem se dost užitečných informací, hlavně to, co vám nikde neřeknou. Prakticky přehled do života, jak naložit s penězi.',
                  author: 'Tomáš V., Letovice',
                },
              ].map((testimonial, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-6">
                  <p className="text-white/70 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                  <p className="text-sm text-zfp-gold font-semibold">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-zfp-orange/20 to-zfp-dark border border-zfp-orange/30 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Chcete se zúčastnit?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Ozvěte se nám a domluvíme termín nejbližšího semináře v našem regionu
            </p>
            
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Mám zájem o seminář
            </button>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Zájem o Finanční minimum"
        subject="vzdelavani"
      />
    </>
  );
}
