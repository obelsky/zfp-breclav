'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import EducationIcon from '@/components/icons/EducationIcon';
import AdvisoryIcon from '@/components/icons/AdvisoryIcon';
import TeamIcon from '@/components/icons/TeamIcon';

export default function HowWeCanHelpPage() {
  return (
    <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
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

          <h1 className="mb-6">Jak vám můžeme pomoci</h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            Každý z nás je někde jinde. Proto nabízíme tři legitimní cesty, jak s námi můžete pracovat. 
            Žádná z nich není lepší nebo horší. Záleží jen na vás.
          </p>
        </motion.div>

        {/* Three Paths */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Path 1 */}
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
                  <EducationIcon className="w-20 h-20" />
                </div>
                
                <h2 className="text-3xl mb-4 group-hover:text-zfp-gold transition-colors duration-300">
                  Chci rozumět svým financím
                </h2>
                
                <p className="text-white/60 mb-6 leading-relaxed text-lg">
                  Chcete se orientovat ve financích, pochopit souvislosti a dělat informovaná rozhodnutí. 
                  Bez tlaku na sjednání čehokoli.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-zfp-orange mb-3 uppercase tracking-wider">Co získáte:</h3>
                  <ul className="space-y-2">
                    {[
                      'Vzdělávací programy ZFP',
                      'Osobní konzultace',
                      'Finanční gramotnost',
                      'Nezávislé informace',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-white/60">
                        <svg className="w-5 h-5 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center text-zfp-orange text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">Zjistit více</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Path 2 */}
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
                  <AdvisoryIcon className="w-20 h-20" />
                </div>
                
                <h2 className="text-3xl mb-4 group-hover:text-zfp-gold transition-colors duration-300">
                  Chci mít přehled, ale neřešit detaily
                </h2>
                
                <p className="text-white/60 mb-6 leading-relaxed text-lg">
                  Chcete rozumět základům, ale odpovědnost za exekuci raději delegujete na odborníka, 
                  kterému důvěřujete.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-zfp-orange mb-3 uppercase tracking-wider">Co získáte:</h3>
                  <ul className="space-y-2">
                    {[
                      'Osobní finanční poradce',
                      'Komplexní služby',
                      'Pravidelné konzultace',
                      'Dlouhodobá péče',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-white/60">
                        <svg className="w-5 h-5 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center text-zfp-orange text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">Zjistit více</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Path 3 */}
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
                  <TeamIcon className="w-20 h-20" />
                </div>
                
                <h2 className="text-3xl mb-4 group-hover:text-zfp-gold transition-colors duration-300">
                  Chci se stát finančním profesionálem
                </h2>
                
                <p className="text-white/60 mb-6 leading-relaxed text-lg">
                  Zajímá vás vzdělávání ZFP, profesionální rozvoj ve financích, 
                  případně zvažujete spolupráci nebo kariéru.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-zfp-orange mb-3 uppercase tracking-wider">Co získáte:</h3>
                  <ul className="space-y-2">
                    {[
                      'Profesní vzdělávání',
                      'Systém ZFP',
                      'Kariérní možnosti',
                      'Mentoring',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-white/60">
                        <svg className="w-5 h-5 text-zfp-gold mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl mb-6">Nevíte, která cesta je pro vás?</h2>
          <p className="text-xl text-white/70 mb-8">
            Rádi vám pomůžeme zorientovat se. První konzultace je vždy nezávazná.
          </p>
          
          <Link
            href="/kontakt"
            className="inline-flex items-center px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Kontaktujte nás
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
