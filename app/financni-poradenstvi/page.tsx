'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import FinancialPlanningIcon from '@/components/icons/services/FinancialPlanningIcon';
import InvestmentServiceIcon from '@/components/icons/services/InvestmentServiceIcon';
import InsuranceIcon from '@/components/icons/services/InsuranceIcon';
import RealtyIcon from '@/components/icons/services/RealtyIcon';
import MortgageIcon from '@/components/icons/MortgageIcon';

// SEO Metadata is handled by layout.tsx for client components
// Title: Finanční poradenství Břeclav | Nezávislý finanční poradce
// Description: Profesionální finanční poradenství v Břeclavi. Hypotéky, investice, pojištění. Osobní přístup, 10 let zkušeností, zázemí ZFP GROUP s 30letou tradicí.

export default function PoradenstviPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const services = [
    {
      title: 'Finanční plánování',
      description: 'Nastavíme rozpočet, cíle a strategii pro vaše finance',
      Icon: FinancialPlanningIcon,
      href: '/financni-poradenstvi/financni-planovani',
    },
    {
      title: 'Hypotéky',
      description: 'Najdeme nejlepší hypotéku z více bank',
      Icon: MortgageIcon,
      href: '/bydleni-hypoteky',
    },
    {
      title: 'Investice',
      description: 'Zhodnoťte peníze chytře a dlouhodobě',
      Icon: InvestmentServiceIcon,
      href: '/financni-poradenstvi/investice',
    },
    {
      title: 'Pojištění',
      description: 'Ochrana vás a vaší rodiny pro každou situaci',
      Icon: InsuranceIcon,
      href: '/financni-poradenstvi/pojisteni',
    },
    {
      title: 'Reality',
      description: 'ZFP Reality - pomůžeme prodat i koupit nemovitost',
      Icon: RealtyIcon,
      href: '/financni-poradenstvi/reality',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <h1 className="mb-6">Finanční poradenství Břeclav</h1>

            <p className="text-xl lg:text-2xl mb-8 text-white/70 leading-relaxed">
              Nezávislé finanční poradenství pro hypotéky, investice a pojištění v Břeclavi. 
              Osobní přístup, 10 let zkušeností, zázemí ZFP GROUP s 30letou tradicí.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/financni-poradenstvi/jak-pracujeme"
                className="inline-flex items-center justify-center px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Jak pracujeme
              </Link>
              
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all"
              >
                Nezávazná konzultace
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl mb-6">S čím pomáháme</h2>
            <p className="text-xl text-white/70 max-w-3xl">
              Komplexní finanční poradenství pro jednotlivce, rodiny i podnikatele
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href} className="block h-full group">
                  <div className="h-full bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-zfp-gold transition-all duration-300">
                    <div className="text-zfp-gold mb-6 group-hover:text-zfp-orange transition-colors">
                      <service.Icon className="w-14 h-14" />
                    </div>
                    
                    <h3 className="text-2xl mb-3 group-hover:text-zfp-gold transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-white/60 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-6 inline-flex items-center text-zfp-orange group-hover:translate-x-2 transition-transform">
                      <span className="text-sm font-semibold">Zjistit více</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-32 bg-zfp-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-6">Proč s námi</h2>
            <p className="text-xl text-white/70">
              Není to jen o produktech. Je to o tom, abyste měli jasno a věděli, do čeho jdete.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Nezávislost',
                description: 'Pracujeme s více poskytovateli, ne jen s jednou bankou nebo pojišťovnou',
              },
              {
                title: 'Transparentnost',
                description: 'Vysvětlíme vám všechno. Žádné zkratky, žádné nesrozumitelné dokumenty',
              },
              {
                title: 'Dlouhodobost',
                description: 'Nejsme tu jen na podpis smlouvy. Jsme tu i potom, když něco potřebujete změnit',
              },
              {
                title: 'Vzdělávání',
                description: 'Součástí spolupráce je vzdělání. Chceme, abyste rozuměli tomu, co děláte',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-zfp-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-zfp-orange">{i + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl mb-6">Začněme spolu</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              První konzultace je zdarma a nezávazná. Probereme vaši situaci a navrhneme řešení.
            </p>
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Domluvit konzultaci
            </button>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Nezávazná konzultace"
        subject="poradenstvi"
      />
    </>
  );
}
