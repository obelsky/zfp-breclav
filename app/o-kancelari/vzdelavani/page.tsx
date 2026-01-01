'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function VzdelavaniPage() {
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
            <h1 className="mb-6">Vzdělávání jako základ</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Neustálé vzdělávání není pro nás povinnost. Je to základ kvalitního poradenství.
            </p>
          </motion.div>

          {/* Why education */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Proč se vzděláváme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Trh se mění', desc: 'Nové produkty, nové banky, nové podmínky. Musíme držet krok.' },
                { title: 'Zákony se mění', desc: 'Legislativa se neustále vyvíjí. Musíme vědět, co platí dnes.' },
                { title: 'Klienti se mění', desc: 'Každý má jiné potřeby. Musíme umět poradit v různých situacích.' },
                { title: 'Technologie se vyvíjejí', desc: 'Nové nástroje, nové možnosti. Využíváme je pro vás.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex-shrink-0 w-8 h-8 bg-zfp-gold/20 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-zfp-orange">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What we do */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Jak se vzděláváme</h2>
            <div className="space-y-6">
              {[
                { activity: 'Pravidelná školení ZFP', detail: 'Každý měsíc školení o produktech, legislativě a trendech' },
                { activity: 'Certifikace a zkoušky', detail: 'Profesní kvalifikace, které dokládají naše znalosti' },
                { activity: 'Konference a semináře', detail: 'Účast na odborných akcích a networkingových setkáních' },
                { activity: 'Samostudium', detail: 'Sledujeme trh, čteme odbornou literaturu, analyzujeme trendy' },
                { activity: 'Výměna zkušeností', detail: 'Pravidelné meetingy týmu, kde si vyměňujeme know-how' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.activity}</h3>
                    <p className="text-white/60 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits for clients */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co z toho máte</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { benefit: 'Aktuální informace', desc: 'Víme o nejnovějších produktech a podmínkách na trhu' },
                { benefit: 'Lepší podmínky', desc: 'Známe detaily a dokážeme vyjednat výhodnější řešení' },
                { benefit: 'Méně chyb', desc: 'Odbornost znamená méně riziko špatného rozhodnutí' },
                { benefit: 'Rychlejší proces', desc: 'Víme, jak věci fungují, takže to jde rychleji' },
                { benefit: 'Kvalitní poradenství', desc: 'Dokážeme vysvětlit složité věci srozumitelně' },
                { benefit: 'Jistota', desc: 'Víte, že pracujete s profesionály, ne s amatéry' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-gold">{item.benefit}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Link to Education section */}
          <div className="mb-20 bg-gradient-to-br from-zfp-gold/10 to-zfp-dark border border-zfp-gold/20 rounded-2xl p-8">
            <h2 className="text-2xl mb-4">Vzdělávání ZFP</h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              Vzdělávání není jen pro nás. Je i pro vás. V sekci Vzdělávání ZFP najdete kurzy, 
              které vám pomohou rozumět financím lépe.
            </p>
            <Link href="/vzdelavani-zfp" className="inline-flex items-center text-zfp-gold hover:text-zfp-orange transition-colors">
              <span className="font-semibold">Prohlédnout vzdělávací programy</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Chcete se poradit s profesionály?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Rezervujte si konzultaci a zjistěte, jak vám můžeme pomoci
            </p>
            <button onClick={() => setIsContactFormOpen(true)} className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105">
              Rezervovat konzultaci
            </button>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} title="Konzultace" subject="vzdelavani" />
    </>
  );
}
