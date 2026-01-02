'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import FamilyIcon from '@/components/icons/mortgage/FamilyIcon';
import MortgageCalculatorBanner from '@/components/MortgageCalculatorBanner';

export default function FamilyPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <Link href="/bydleni-hypoteky" className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět
          </Link>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <div className="mb-6"><div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" /></div>
            <div className="mb-6 text-zfp-gold"><FamilyIcon className="w-16 h-16" /></div>
            <h1 className="mb-6">Rodina s dětmi</h1>
            <p className="text-xl text-white/70 max-w-3xl">Rostoucí rodina potřebuje větší prostor. Pomůžeme vám přejít do většího bydlení nebo financovat přístavbu.</p>
          </motion.div>

          {/* Mortgage Calculator CTA */}
          <MortgageCalculatorBanner 
            title="Spočítejte si hypotéku pro svou rodinu"
            description="Zjistěte výši měsíční splátky a celkové náklady hypotéky uzpůsobené potřebám rostoucí rodiny s dětmi."
          />

          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co řešíme nejčastěji</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Přestěhování do většího', desc: 'Prodej stávající nemovitosti a koupě větší, případně překlenovací úvěr' },
                { title: 'Přístavba nebo vestavba', desc: 'Financování rozšíření stávajícího bydlení' },
                { title: 'Kombinace hypotéky a úspor', desc: 'Využití vlastních prostředků z prodeje menšího bytu' },
                { title: 'Státní podpora', desc: 'Využití podpory pro rodiny s dětmi' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-gold">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Naše řešení</h2>
            <div className="space-y-6">
              {[
                { title: 'Překlenovací úvěr', desc: 'Pokud potřebujete koupit nové, než prodáte staré bydlení' },
                { title: 'Refinancování s navýšením', desc: 'Navýšení stávající hypotéky na rekonstrukci nebo přístavbu' },
                { title: 'Optimalizace splátek', desc: 'Přizpůsobení výše splátek aktuálním příjmům rodiny' },
                { title: 'Flexibilní podmínky', desc: 'Možnost mimořádných splátek, odkladů při rodičovské' },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-4">{i + 1}</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center bg-zfp-dark border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Najděme větší bydlení pro vaši rodinu</h2>
            <p className="text-xl text-white/70 mb-8">Nezávazná konzultace zdarma</p>
            <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all">
              Chci konzultaci
            </button>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="Hypotéka pro rodinu" subject="hypoteky" />
    </>
  );
}
