'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MortgageCalculator from '@/components/MortgageCalculator';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

interface MortgageData {
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
}

export default function CalculatorPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [calculatorData, setCalculatorData] = useState<Record<string, any> | undefined>();
  const [currentMortgageData, setCurrentMortgageData] = useState<MortgageData | null>(null);

  const handleDataChange = (data: MortgageData) => {
    setCurrentMortgageData(data);
  };

  // Auto-update calculator data when mortgage data changes
  useEffect(() => {
    if (currentMortgageData) {
      setCalculatorData({
        type: 'hypotéka',
        cenaNemovitosti: currentMortgageData.propertyPrice,
        vlastniProstredky: currentMortgageData.downPayment,
        vyseHypoteky: currentMortgageData.loanAmount,
        urokovaSazba: currentMortgageData.interestRate,
        splatnost: currentMortgageData.loanTerm,
        mesicniSplatka: currentMortgageData.monthlyPayment,
      });
    }
  }, [currentMortgageData]);

  const handleContactClick = () => {
    setIsContactFormOpen(true);
  };

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          
          {/* Breadcrumb */}
          <Link 
            href="/bydleni-hypoteky"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na Bydlení & hypotéky
          </Link>
          
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <h1 className="mb-6">Hypoteční kalkulačka</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Zjistěte si přesnou měsíční splátku hypotéky podle vašich parametrů. 
              Interaktivní kalkulačka vám ukáže, kolik zaplatíte na úrocích.
            </p>
          </motion.div>

          {/* Calculator */}
          <MortgageCalculator onDataChange={handleDataChange} />

          {/* CTA */}
          <div className="mt-16 text-center bg-zfp-dark border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl mb-6">Chcete hypotéku na míru?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Najdeme vám tu nejlepší nabídku z celého trhu. Zdarma a bez závazků.
            </p>
            
            <button
              onClick={handleContactClick}
              className="px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Chci nabídku hypotéky
            </button>
          </div>

        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Hypoteční kalkulačka - nezávazná nabídka"
        subject="hypoteka"
        calculatorData={calculatorData}
      />
    </>
  );
}
