'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function HodnotyPage() {
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
            <h1 className="mb-6">Hodnoty</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Principy, kterými se řídíme při práci s klienty. Nejsou to jen slova na webu - jsou to pravidla, která dodržujeme každý den.
            </p>
          </motion.div>

          <div className="mb-20">
            <h2 className="text-3xl mb-8">Naše hodnoty</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Transparentnost', desc: 'Vše vysvětlíme srozumitelně. Žádné malé písmo, žádné skryté poplatky. Víte, do čeho jdete.' },
                { title: 'Nezávislost', desc: 'Nepracujeme jen pro jednu banku nebo pojišťovnu. Hledáme nejlepší řešení pro vás, ne pro poskytovatele.' },
                { title: 'Vzdělávání', desc: 'Chceme, abyste rozuměli tomu, co děláte. Vysvětlíme proč, ne jen jak.' },
                { title: 'Dlouhodobost', desc: 'Nejsme tu jen na podpis smlouvy. Jsme tu i za rok, dva, deset.' },
                { title: 'Profesionalita', desc: 'Držíme certifikace, školíme se a držíme krok s trhem. Finanční poradenství je naše profese.' },
                { title: 'Respekt', desc: 'Vaše peníze, vaše rozhodnutí. My jen radíme a pomáháme. Konečné slovo je vždycky vaše.' },
                { title: 'Etika', desc: 'Vždy na straně klienta. Nedoporučíme produkt, který by nebyl v vašem zájmu.' },
                { title: 'Otevřenost', desc: 'Pokud něco nevíme, řekneme to. Pokud něco nejde, taky. Upřímnost je základ důvěry.' },
              ].map((value, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-gold/20 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-6 h-6 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-zfp-orange">{value.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Vyzkoušejte nás</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Nejlepší způsob, jak poznat naše hodnoty, je osobní setkání
            </p>
            <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105">
              Domluvit konzultaci
            </button>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="Konzultace" subject="hodnoty" />
    </>
  );
}
