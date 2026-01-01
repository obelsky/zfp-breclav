'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import EducationIcon from '@/components/icons/EducationIcon';
import AdvisoryIcon from '@/components/icons/AdvisoryIcon';
import MortgageIcon from '@/components/icons/MortgageIcon';
import TeamIcon from '@/components/icons/TeamIcon';

export default function HomePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/team-photo.jpg"
              alt="Tým ZFP GROUP Břeclav"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zfp-darker via-zfp-darker/95 to-zfp-darker/50 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-zfp-darker via-transparent to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom py-16 px-4 md:py-20 lg:py-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="mb-4 md:mb-6">
              <div className="inline-block w-12 md:w-16 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </motion.div>

            <motion.h1 variants={fadeInUp} className="mb-4 md:mb-6 text-gradient text-3xl md:text-5xl lg:text-6xl">
              Mladý tým s tradicí.<br />Finance pro každou generaci.
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-2xl font-light leading-relaxed">
              Rozumíme potřebám mladých rodin, ale stavíme na 30 letech zkušeností. 
              Díky tomu víme, jak pomoci každému – od studentů po seniory.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm md:text-base lg:text-lg mb-8 md:mb-12 max-w-2xl text-white/70">
              Regionální kancelář ZFP v Břeclavi – postavená na základech tradice manželů Polikavových, 
              přímo podřízená vedení ZFP GROUP. Spojujeme energii s praxí.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="px-6 md:px-8 py-3 md:py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                Chci konzultaci
              </button>
              
              <Link
                href="/jak-vam-muzeme-pomoci"
                className="px-6 md:px-8 py-3 md:py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 text-center text-sm md:text-base"
              >
                Jak vám můžeme pomoci
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Hidden on mobile, shown on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden lg:block absolute bottom-10 right-10"
        >
          <div className="flex flex-col items-center">
            <span className="text-xs text-white/40 mb-2 tracking-widest uppercase">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Financial Tools Section */}
      <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker">
        <div className="container-custom px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12 md:mb-16 text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4 md:mb-6 flex justify-center">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="mb-4 md:mb-6 text-2xl md:text-4xl lg:text-5xl">
              Během 5 minut víte, jak jste na tom
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              8 kalkulaček pro rychlou orientaci. Zjistěte, kde vám mizí peníze, 
              kolik ušetříte refinancováním nebo jestli máte dostatečnou rezervu.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-2">
            {[
              {
                title: 'Hypoteční kalkulačka',
                description: 'Spočítejte si měsíční splátku během minuty',
                href: '/bydleni-hypoteky/kalkulacka',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
              },
              {
                title: 'Kde mizí peníze?',
                description: 'Odhalte skryté úspory ve vašich výdajích',
                href: '/financni-nastroje/kde-mizi-penize',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Finanční zdraví',
                description: 'Zjistěte své skóre a co zlepšit',
                href: '/financni-nastroje/financni-zdravi',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Refinancování',
                description: 'Kolik ušetříte změnou hypotéky?',
                href: '/bydleni-hypoteky/situace/refinancovani',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                ),
              },
            ].map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={tool.href}>
                  <div className="group h-full bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-zfp-gold transition-all duration-300 hover:scale-105">
                    <div className="text-zfp-gold mb-4 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-zfp-gold transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link
              href="/financni-nastroje"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Všech 8 kalkulaček
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Three Equal Paths */}
      <section className="py-20 lg:py-32 bg-zfp-dark">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="mb-6">
              Tři rovnocenné cesty
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-white/70 max-w-3xl">
              Každý z nás je někde jinde. Proto nabízíme tři legitimní cesty, jak s námi můžete pracovat. 
              Žádná z nich není lepší nebo horší. Záleží jen na vás.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Path 1: Understand */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group"
            >
              <Link href="/jak-vam-muzeme-pomoci/rozumet-financim" className="block h-full">
                <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-zfp-gold transition-all duration-500">
                  <div className="mb-6 text-zfp-gold group-hover:scale-110 transition-transform duration-500">
                    <EducationIcon className="w-16 h-16" />
                  </div>
                  
                  <h3 className="text-2xl mb-4 group-hover:text-zfp-gold transition-colors duration-300">
                    Chci rozumět svým financím
                  </h3>
                  
                  <p className="text-white/60 mb-6 leading-relaxed">
                    Chcete se orientovat ve financích, pochopit souvislosti a dělat informovaná rozhodnutí. 
                    Bez tlaku na sjednání čehokoli.
                  </p>
                  
                  <div className="flex items-center text-zfp-orange text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Zjistit více</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Path 2: Overview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <Link href="/jak-vam-muzeme-pomoci/mit-prehled" className="block h-full">
                <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-zfp-gold transition-all duration-500">
                  <div className="mb-6 text-zfp-gold group-hover:scale-110 transition-transform duration-500">
                    <AdvisoryIcon className="w-16 h-16" />
                  </div>
                  
                  <h3 className="text-2xl mb-4 group-hover:text-zfp-gold transition-colors duration-300">
                    Chci mít přehled, ale neřešit detaily
                  </h3>
                  
                  <p className="text-white/60 mb-6 leading-relaxed">
                    Chcete rozumět základům, ale odpovědnost za exekuci raději delegujete na odborníka, 
                    kterému důvěřujete.
                  </p>
                  
                  <div className="flex items-center text-zfp-orange text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Zjistit více</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Path 3: Professional */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group"
            >
              <Link href="/jak-vam-muzeme-pomoci/rozvoj" className="block h-full">
                <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-zfp-gold transition-all duration-500">
                  <div className="mb-6 text-zfp-gold group-hover:scale-110 transition-transform duration-500">
                    <TeamIcon className="w-16 h-16" />
                  </div>
                  
                  <h3 className="text-2xl mb-4 group-hover:text-zfp-gold transition-colors duration-300">
                    Chci se stát finančním profesionálem
                  </h3>
                  
                  <p className="text-white/60 mb-6 leading-relaxed">
                    Zajímá vás vzdělávání ZFP, profesionální rozvoj ve financích, 
                    případně zvažujete spolupráci nebo kariéru.
                  </p>
                  
                  <div className="flex items-center text-zfp-orange text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Zjistit více</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mortgages Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker" />
        
        <div className="relative z-10 container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
              </div>
              
              <div className="mb-6 text-zfp-gold">
                <MortgageIcon className="w-20 h-20" />
              </div>

              <h2 className="mb-6">
                Hypotéky nejsou produkt,<br />jsou životní rozhodnutí
              </h2>

              <p className="text-xl text-white/70 mb-6 leading-relaxed">
                Při řešení bydlení jde o víc než o čísla. Jde o vaši rodinu, bezpečí, 
                budoucnost. Proto pracujeme s celým kontextem vaší situace.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Hypotéky pro rodiny, OSVČ i investory',
                  'Porovnání nabídek z více než 15 bank',
                  'Lokální specialisté z Břeclavi a okolí',
                  'Transparentní proces bez skrytých poplatků',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-zfp-gold mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/bydleni-hypoteky"
                className="inline-flex items-center px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Prozkoumejte hypotéky
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker">
                <Image
                  src="/mortgage-abstract.svg"
                  alt="Hypoteční poradenství"
                  fill
                  className="object-contain p-8"
                />
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-8 -right-8 bg-zfp-dark border border-white/10 rounded-xl p-6 shadow-2xl">
                <p className="text-4xl font-bold text-zfp-orange mb-1">15+</p>
                <p className="text-sm text-white/60">Partnerských bank</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Regional Office Section */}
      <section className="py-20 lg:py-32 bg-zfp-dark">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </motion.div>

            <motion.h2 variants={fadeInUp} className="mb-8">
              Regionální kancelář pro Břeclav a okolí
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-xl text-white/70 mb-8 leading-relaxed">
              Nejsme centrála. Nejsme produktový web. Jsme tým lidí z vašeho regionu, 
              kteří rozumí místním specifikům a osobně vás provedou finančním ekosystémem ZFP.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { number: '10+', label: 'Let zkušeností' },
                { number: '500+', label: 'Spokojených klientů' },
                { number: '100%', label: 'Transparentnost' },
              ].map((stat, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6">
                  <p className="text-5xl font-bold text-zfp-orange mb-2">{stat.number}</p>
                  <p className="text-white/60">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link
                href="/o-kancelari"
                className="inline-flex items-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300"
              >
                O naší kanceláři
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zfp-orange/20 via-zfp-darker to-zfp-darker" />
        
        <div className="relative z-10 container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="mb-8">
              Začněte svou cestu k finančnímu klidu
            </h2>

            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              Ať už hledáte vzdělání, poradenství, nebo kariérní rozvoj – jsme tu pro vás. 
              První konzultace je vždy nezávazná a pomůže vám zorientovat se.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Nezávazná konzultace
              </button>
              
              <Link
                href="/kontakt"
                className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 text-center text-lg"
              >
                Kontaktní údaje
              </Link>
            </div>

            <p className="text-sm text-white/40 mt-8">
              Telefon: +420 123 456 789 | E-mail: breclav@zfp.cz
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Nezávazná konzultace"
      />
    </>
  );
}
