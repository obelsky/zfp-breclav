'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function SpecialistsPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const specialists = [
    {
      name: 'Jan Novák',
      role: 'Vedoucí hypotečního oddělení',
      phone: '+420 123 456 789',
      email: 'jan.novak@zfp-breclav.cz',
      specialization: 'Složité případy, refinancování, OSVČ',
      experience: '12 let',
      deals: '500+',
    },
    {
      name: 'Petra Svobodová',
      role: 'Hypoteční specialistka',
      phone: '+420 123 456 790',
      email: 'petra.svobodova@zfp-breclav.cz',
      specialization: 'První bydlení, mladé rodiny',
      experience: '8 let',
      deals: '350+',
    },
    {
      name: 'Martin Dvořák',
      role: 'Hypoteční poradce',
      phone: '+420 123 456 791',
      email: 'martin.dvorak@zfp-breclav.cz',
      specialization: 'Investiční nemovitosti, rekonstrukce',
      experience: '10 let',
      deals: '400+',
    },
  ];

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <Link 
            href="/bydleni-hypoteky"
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

            <h1 className="mb-6">Naši hypoteční specialisté</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Zkušený tým odborníků, kteří vám pomohou najít tu pravou hypotéku. 
              Máme přístup k nabídkám všech významných bank v ČR.
            </p>
          </motion.div>

          {/* Why Choose Us */}
          <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Nezávislé poradenství',
                description: 'Nejsme vázáni na jednu banku. Porovnáme nabídky a najdeme tu nejlepší pro vás.',
                icon: '🎯',
              },
              {
                title: 'Bez poplatků',
                description: 'Naše služby jsou pro vás zdarma. Odměnu dostáváme od bank při uzavření smlouvy.',
                icon: '💰',
              },
              {
                title: 'Podpora od A do Z',
                description: 'Pomůžeme s výběrem, dokumenty, jednáním s bankou i podpisem smlouvy.',
                icon: '🤝',
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-zfp-dark border border-white/10 rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-zfp-gold">{benefit.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Team */}
          <div className="mb-20">
            <h2 className="text-3xl mb-12">Náš tým</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {specialists.map((specialist, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-zfp-dark border border-white/10 rounded-2xl p-8 hover:border-zfp-gold transition-all"
                >
                  {/* Avatar Placeholder */}
                  <div className="w-24 h-24 bg-zfp-orange/20 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                    👤
                  </div>

                  {/* Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">{specialist.name}</h3>
                    <p className="text-zfp-orange text-sm mb-4">{specialist.role}</p>
                    
                    <div className="space-y-2">
                      <a 
                        href={`tel:${specialist.phone}`}
                        className="flex items-center justify-center text-sm text-white/60 hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {specialist.phone}
                      </a>
                      
                      <a 
                        href={`mailto:${specialist.email}`}
                        className="flex items-center justify-center text-sm text-white/60 hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {specialist.email}
                      </a>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 border-t border-white/10 pt-6">
                    <div>
                      <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Specializace:</p>
                      <p className="text-sm text-white/70">{specialist.specialization}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Zkušenosti:</p>
                        <p className="text-lg font-semibold text-zfp-orange">{specialist.experience}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Smluv:</p>
                        <p className="text-lg font-semibold text-zfp-orange">{specialist.deals}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-20 bg-gradient-to-br from-zfp-dark to-zfp-darker border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Jak spolupráce probíhá</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Kontakt',
                  description: 'Ozvete se nám telefonicky, e-mailem nebo přes formulář',
                },
                {
                  step: '2',
                  title: 'Konzultace',
                  description: 'Probereme vaši situaci, možnosti a požadavky',
                },
                {
                  step: '3',
                  title: 'Nabídky',
                  description: 'Připravíme porovnání nabídek z více bank',
                },
                {
                  step: '4',
                  title: 'Vyřízení',
                  description: 'Pomůžeme s dokumenty a celým procesem',
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-zfp-orange/20 rounded-full flex items-center justify-center text-2xl font-bold text-zfp-orange mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-white/60">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Banks */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8 text-center">Spolupracujeme se všemi významnými bankami</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                'Česká spořitelna',
                'ČSOB',
                'Komerční banka',
                'Moneta',
                'Raiffeisenbank',
                'UniCredit Bank',
                'Air Bank',
                'mBank',
                'Hypoteční banka',
                'Fio banka',
                'Trinity Bank',
                'Oberbank',
              ].map((bank, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 text-center flex items-center justify-center min-h-[80px]"
                >
                  <p className="text-sm text-white/60">{bank}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-zfp-orange/20 to-zfp-dark border border-zfp-orange/30 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Domluvte si nezávaznou konzultaci</h2>
            <p className="text-xl text-white/70 mb-8">
              Společně najdeme tu nejlepší hypotéku pro vaši situaci
            </p>
            
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Kontaktovat specialistu
            </button>

            <p className="text-sm text-white/40 mt-6">
              Odpovíme do 24 hodin • Konzultace zdarma • Bez závazků
            </p>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Konzultace s hypotečním specialistou"
        subject="hypoteky"
      />
    </>
  );
}
