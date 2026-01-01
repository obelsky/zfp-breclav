'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import ContactIcon from '@/components/icons/ContactIcon';

export default function ContactPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 min-h-screen">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <div className="mb-6 text-zfp-gold">
              <ContactIcon className="w-16 h-16" />
            </div>

            <h1 className="mb-6">Kontaktujte nás</h1>
            <p className="text-xl text-white/70 max-w-3xl">
              Jsme tu pro vás. Ať už máte dotaz, chcete konzultaci, nebo se jen chcete dozvědět více 
              o našich službách – ozvěte se nám.
            </p>
          </motion.div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-8">
                {/* Address */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <div className="flex items-start mb-4">
                    <svg className="w-6 h-6 text-zfp-gold mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Adresa kanceláře</h3>
                      <p className="text-white/70">
                        Na Řádku 3416/2<br />
                        690 02 Břeclav<br />
                        Jihomoravský kraj
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <div className="flex items-start mb-4">
                    <svg className="w-6 h-6 text-zfp-gold mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Telefon</h3>
                      <a 
                        href="tel:+420519361240" 
                        className="text-white/70 hover:text-zfp-orange transition-colors text-lg"
                      >
                        +420 519 361 240
                      </a>
                      <p className="text-sm text-white/50 mt-2">
                        Po–Pá: 9:00 – 17:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <div className="flex items-start mb-4">
                    <svg className="w-6 h-6 text-zfp-gold mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">E-mail</h3>
                      <a 
                        href="mailto:info@zfpgroup.cz" 
                        className="text-white/70 hover:text-zfp-orange transition-colors text-lg"
                      >
                        info@zfpgroup.cz
                      </a>
                      <p className="text-sm text-white/50 mt-2">
                        Odpovíme do 24 hodin
                      </p>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <div className="flex items-start mb-4">
                    <svg className="w-6 h-6 text-zfp-gold mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Otevírací doba</h3>
                      <div className="space-y-2 text-white/70">
                        <div className="flex justify-between">
                          <span>Pondělí – Pátek:</span>
                          <span className="font-medium">9:00 – 17:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sobota – Neděle:</span>
                          <span className="font-medium">Po domluvě</span>
                        </div>
                      </div>
                      <p className="text-sm text-white/50 mt-4">
                        Doporučujeme předchozí objednání na konzultaci
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Quick Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:sticky lg:top-24">
                <h2 className="text-2xl mb-6">Napište nám</h2>
                
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full py-4 px-8 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 mb-6"
                >
                  Otevřít kontaktní formulář
                </button>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-lg mb-4">Nebo nás navštivte osobně</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Naše kancelář se nachází v centru Břeclavi, snadno dostupná autem i MHD. 
                    Parkování je možné v okolních ulicích.
                  </p>
                  
                  {/* Map */}
                  <div className="aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2638.8!2d16.8825!3d48.7592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQ1JzMzLjEiTiAxNsKwNTInNTcuMCJF!5e0!3m2!1scs!2scz!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mapa kanceláře ZFP Břeclav"
                    />
                  </div>
                  
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Na+%C5%98%C3%A1dku+3416%2F2%2C+690+02+B%C5%99eclav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-zfp-orange hover:text-zfp-orange-hover text-sm mt-4 transition-colors"
                  >
                    <span className="mr-2">Zobrazit v Google Maps</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Area Served - GEO Optimization */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12"
          >
            <h2 className="text-2xl mb-6">Poskytujeme služby pro celý region</h2>
            <p className="text-white/70 mb-8">
              Naše regionální kancelář v Břeclavi poskytuje finanční poradenství, hypoteční služby 
              a vzdělávání pro klienty z celého Jihomoravského kraje. Působíme zejména v těchto oblastech:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Břeclav',
                'Hodonín',
                'Mikulov',
                'Hustopeče',
                'Podivín',
                'Lanžhot',
                'Lednice',
                'Valtice',
                'Starý Poddvorov',
                'Týnec',
                'Bulhary',
                'Moravský Žižkov',
              ].map((city, index) => (
                <div 
                  key={index}
                  className="flex items-center text-white/60 text-sm"
                >
                  <svg className="w-4 h-4 text-zfp-gold mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {city}
                </div>
              ))}
            </div>

            <p className="text-sm text-white/50 mt-8">
              Poskytujeme také online konzultace pro klienty z celé České republiky.
            </p>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <h2 className="text-2xl mb-8">Často kladené dotazy</h2>
            
            <div className="space-y-4">
              {[
                {
                  q: 'Jsou konzultace zdarma?',
                  a: 'Ano, první nezávazná konzultace je vždy zdarma. Chceme vám nejprve pomoci zorientovat se ve vaší situaci.',
                },
                {
                  q: 'Musím se objednat předem?',
                  a: 'Doporučujeme předchozí objednání, abychom vám mohli věnovat dostatek času a připravit se na vaši situaci. Můžete nás kontaktovat telefonicky nebo e-mailem.',
                },
                {
                  q: 'Poskytujete služby i online?',
                  a: 'Ano, nabízíme online konzultace přes videohovor pro klienty z celé ČR. Osobní schůzky preferujeme pro komplexnější záležitosti.',
                },
                {
                  q: 'Jak jste placeni?',
                  a: 'Naše odměna je hrazena poskytovateli finančních produktů (bankami, pojišťovnami). Pro vás jsou naše služby zdarma. Vždy vám transparentně sdělíme, jak jsme placeni.',
                },
              ].map((faq, index) => (
                <details 
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg overflow-hidden group"
                >
                  <summary className="p-6 cursor-pointer hover:bg-white/10 transition-colors flex justify-between items-center">
                    <span className="font-semibold">{faq.q}</span>
                    <svg className="w-5 h-5 text-zfp-gold transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-white/70">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ContactForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
}
