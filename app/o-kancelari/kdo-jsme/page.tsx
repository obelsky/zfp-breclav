'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function KdoJsmePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const team = [
    {
      name: 'Ing. Marek Franc, PFP',
      role: 'Vedoucí regionální kanceláře',
      photo: '/images/team/marek-franc.png',
      specialization: ['Hypotéky', 'Investice', 'Pojištění', 'Finanční plánování'],
    },
    {
      name: 'Vladimír Poliak ml.',
      role: 'Finanční specialista',
      photo: '/images/team/vladimir-poliak-ml.png',
      specialization: ['Investice', 'Pojištění', 'Penzijní připojištění'],
    },
    {
      name: 'Anna Tučková',
      role: 'Finanční specialistka',
      photo: '/images/team/anna-tuckova.png',
      specialization: ['Pojištění', 'Spoření', 'Finanční plánování'],
    },
    {
      name: 'Tereza Kopecká, DiS.',
      role: 'Finanční specialistka',
      photo: '/images/team/tereza-kopecka.png',
      specialization: ['Hypotéky', 'Pojištění', 'Reality'],
    },
    {
      name: 'Lukáš Špinar',
      role: 'Finanční specialista',
      photo: '/images/team/lukas-spinar.png',
      specialization: ['Investice', 'Pojištění', 'Úvěry'],
    },
  ];

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
            <h1 className="mb-6">Náš tým</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Finanční poradenství je o lidech. Poznejte tým, který vám pomůže s vašimi financemi.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-zfp-gold transition-all duration-300"
                >
                  <div className="relative w-full h-80">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-zfp-gold mb-4 text-sm">{member.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialization.map((spec, j) => (
                        <span key={j} className="text-xs px-3 py-1 bg-zfp-orange/20 text-zfp-orange rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Specializations */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Specializace týmu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { spec: 'Hypoteční specialisté', desc: 'Znají trh, banky a dokážou vyjednat nejlepší podmínky' },
                { spec: 'Investiční poradci', desc: 'Pomáhají s nastavením investiční strategie a výběrem nástrojů' },
                { spec: 'Pojišťovací specialisté', desc: 'Porovnají pojistky a najdou optimální krytí' },
                { spec: 'Realitní makléři', desc: 'Pomohou prodat nebo koupit nemovitost' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-zfp-gold/20 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.spec}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co nás spojuje</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { value: 'Vzdělání', desc: 'Certifikace, školení a neustálé vzdělávání' },
                { value: 'Zkušenosti', desc: 'Roky praxe v oboru, stovky spokojených klientů' },
                { value: 'Transparentnost', desc: 'Jasná komunikace, žádné skryté informace' },
                { value: 'Osobní přístup', desc: 'Každý klient je pro nás jedinečný' },
                { value: 'Dlouhodobost', desc: 'Budujeme vztahy, ne jen uzavíráme smlouvy' },
                { value: 'Etika', desc: 'Vždy na straně klienta, ne produktu' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-orange">{item.value}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Rádi vám pomůžeme</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Spojte se s námi a probereme vaši situaci
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105">
                Kontaktovat tým
              </button>
              <Link href="/financni-poradenstvi/jak-pracujeme" className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all">
                Jak pracujeme
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="Kontakt s týmem" subject="tym" />
    </>
  );
}
