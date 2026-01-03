'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import FinancialPlanningIcon from '@/components/icons/services/FinancialPlanningIcon';
import FinancialHealthCalculator from '@/components/FinancialHealthCalculator';
import ExpenseAnalyzerCalculator from '@/components/ExpenseAnalyzerCalculator';

export default function FinancialPlanningPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'health' | 'expenses'>('health');
  const [calculatorData, setCalculatorData] = useState<Record<string, any> | undefined>();

  const handleContactClick = (data?: Record<string, any>) => {
    setCalculatorData(data);
    setIsContactFormOpen(true);
  };

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <Link 
            href="/poradenstvi"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na Poradenství
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <div className="mb-6 text-zfp-gold">
              <FinancialPlanningIcon className="w-16 h-16" />
            </div>

            <h1 className="mb-6">Finanční plánování</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Nechcete jen šetřit, ale mít jasno v tom, kam peníze jdou a proč. Finanční plán vám 
              ukáže, kde jste teď a jak se dostat tam, kam chcete.
            </p>
          </motion.div>

          {/* What is it */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Co je finanční plán</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Finanční plán není seznam produktů, které si máte koupit. Je to analýza toho, 
                jak hospodaříte, co vás čeká a jak se na to připravit.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Ukáže vám, kolik utrácíte za co, kde máte rezervy a jak dosáhnout cílů, které máte - 
                vlastní bydlení, finanční nezávislost, důchod bez starostí.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Rozpočet a přehled',
                  description: 'Kam vám každý měsíc mizí peníze. Kde můžete ušetřit bez toho, že byste se omezovali.',
                },
                {
                  title: 'Cíle a priority',
                  description: 'Co chcete dokázat - vlastní byt, děti na škole, předčasný důchod. A jak k tomu dojít.',
                },
                {
                  title: 'Rezerva a pojištění',
                  description: 'Kolik potřebujete na krizi. Jak se chránit před výpadkem příjmu, nemocí, úrazem.',
                },
                {
                  title: 'Investice a důchod',
                  description: 'Kam investovat, aby to dávalo smysl. Jak se připravit na stáří.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-orange">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What you get */}
          <div className="mb-20 bg-zfp-dark border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Co dostanete</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Analýzu současné situace',
                  description: 'Probereme příjmy, výdaje, dluhy, majetek. Zjistíte, kde skutečně jste.',
                },
                {
                  title: 'Přehled peněžních toků',
                  description: 'Kam vám odchází peníze každý měsíc. Kde jsou skryté náklady.',
                },
                {
                  title: 'Návrh rozpočtu',
                  description: 'Realistický rozpočet, který můžete dodržet. Ne spartánské šetření.',
                },
                {
                  title: 'Plán pro cíle',
                  description: 'Konkrétní kroky, jak dosáhnout toho, co chcete. Kolik kam, jak dlouho.',
                },
                {
                  title: 'Investiční strategii',
                  description: 'Kam investovat vzhledem k vašemu věku, riziku a cílům.',
                },
                {
                  title: 'Pravidelné kontroly',
                  description: 'Plán se přizpůsobuje životu. Děti, práce, hypotéka - vše se promítne.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center text-zfp-orange font-bold mr-4">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who is it for */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Pro koho je finanční plán</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  who: 'Mladí lidé',
                  description: 'Začínáte s prací, chcete šetřit na bydlení nebo nevíte, jak začít investovat.',
                },
                {
                  who: 'Rodiny s dětmi',
                  description: 'Peníze jsou napnuté, potřebujete vědět, kde ušetřit a jak plánovat do budoucna.',
                },
                {
                  who: 'Střední věk',
                  description: 'Děláte slušně, ale nevíte, jestli jdete správným směrem. Chcete zajistit důchod.',
                },
                {
                  who: 'Před důchodem',
                  description: 'Za pár let půjdete do důchodu a potřebujete vědět, jestli máte dost.',
                },
                {
                  who: 'Po změně',
                  description: 'Rozvod, dědictví, prodej firmy - velká změna vyžaduje nový plán.',
                },
                {
                  who: 'OSVČ',
                  description: 'Proměnlivý příjem, daně, odvody - potřebujete systém.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-zfp-gold">{item.who}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-20 bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-8 lg:p-10">
            <h2 className="text-3xl mb-8">Jak to probíhá</h2>
            
            <div className="space-y-6">
              {[
                {
                  step: 'Úvodní konzultace',
                  detail: 'Probereme, co řešíte a co potřebujete. Zdarma, 30-60 minut.',
                },
                {
                  step: 'Sběr podkladů',
                  detail: 'Výpisy z účtů, smlouvy, přehled majetku. Pošlete nám, co máte.',
                },
                {
                  step: 'Analýza a návrh',
                  detail: 'Připravíme plán - kde jste, kam chcete, jak se tam dostat.',
                },
                {
                  step: 'Vysvětlení',
                  detail: 'Projdeme plán krok po kroku. Zodpovíme všechny otázky.',
                },
                {
                  step: 'Realizace',
                  detail: 'Začnete plnit kroky. My jsme tu pro rady a úpravy.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-zfp-orange rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <span className="font-semibold text-white">{item.step}:</span>
                    <span className="text-white/70 ml-2">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-20">
            <h2 className="text-3xl mb-8">Cena</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                První konzultace je zdarma. Pokud se rozhodnete pokračovat:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-zfp-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-white/70">
                    <span className="font-semibold text-white">Hodinová sazba:</span> Pro jednoduché dotazy a konzultace
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-zfp-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-white/70">
                    <span className="font-semibold text-white">Paušál:</span> Pro kompletní finanční plán s pravidelnou péčí
                  </p>
                </div>
              </div>

              <p className="text-white/60 text-sm mt-6 italic">
                Konkrétní cenu řekneme po první konzultaci, když budeme vědět, co potřebujete.
              </p>
            </div>
          </div>

          {/* Interactive Tools */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl mb-4">Vyzkoušejte naše nástroje</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Zjistěte své finanční zdraví nebo analyzujte, kam vám mizí peníze
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveTab('health')}
                className={`px-8 py-4 rounded-lg font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'health'
                    ? 'bg-zfp-orange text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                Finanční zdraví
              </button>
              <button
                onClick={() => setActiveTab('expenses')}
                className={`px-8 py-4 rounded-lg font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'expenses'
                    ? 'bg-zfp-orange text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                Kde mizí peníze?
              </button>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'health' && (
                <FinancialHealthCalculator onContactClick={handleContactClick} />
              )}
              {activeTab === 'expenses' && (
                <ExpenseAnalyzerCalculator onContactClick={handleContactClick} />
              )}
            </motion.div>
          </div>

          {/* CTA */}
          <div className="text-center bg-zfp-dark border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Začněte s finančním plánem</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              První konzultace je zdarma. Probereme vaši situaci a navrhneme, jak dál.
            </p>
            
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Chci finanční plán
            </button>
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Finanční plánování - nezávazná konzultace"
        subject="financni-planovani"
        calculatorData={calculatorData}
      />
    </>
  );
}
