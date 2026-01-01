'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RealtyCalculatorProps {
  onContactClick?: (data?: Record<string, any>) => void;
}

export default function RealtyCalculator({ onContactClick }: RealtyCalculatorProps) {
  // Input states
  const [monthlyIncome, setMonthlyIncome] = useState(60000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(25000);
  const [downPayment, setDownPayment] = useState(500000);
  const [interestRate, setInterestRate] = useState(4.2);
  const [loanTerm, setLoanTerm] = useState(25);

  // Results
  const [maxLoan, setMaxLoan] = useState(0);
  const [maxPropertyPrice, setMaxPropertyPrice] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [dti, setDti] = useState(0); // Debt-to-Income ratio

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick({
        type: 'reality',
        mesicniPrijem: monthlyIncome,
        mesicniNaklady: monthlyExpenses,
        vlastniProstredky: downPayment,
        urokovaSazba: interestRate,
        dobaSplaceni: loanTerm,
        maxHypoteka: maxLoan,
        maxCenaNemovitosti: maxPropertyPrice,
        mesicniSplatka: monthlyPayment,
        dtiRatio: dti
      });
    }
  };

  useEffect(() => {
    // Calculate available income for mortgage
    const availableIncome = monthlyIncome - monthlyExpenses;
    
    // Bank typically allows max 40% of available income for mortgage
    const maxMonthlyPayment = availableIncome * 0.4;
    
    // Calculate max loan based on monthly payment
    const months = loanTerm * 12;
    const monthlyRate = interestRate / 100 / 12;
    
    if (monthlyRate > 0 && months > 0) {
      // Reverse mortgage calculation: P = M × [(1 + r)^n - 1] / [r(1 + r)^n]
      const loan = maxMonthlyPayment * ((Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months)));
      
      setMaxLoan(loan);
      setMaxPropertyPrice(loan + downPayment);
      setMonthlyPayment(maxMonthlyPayment);
      setDti((maxMonthlyPayment / monthlyIncome) * 100);
    }
  }, [monthlyIncome, monthlyExpenses, downPayment, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const ltvRatio = maxLoan > 0 ? ((maxLoan / maxPropertyPrice) * 100).toFixed(0) : '0';
  const downPaymentPercent = downPayment > 0 && maxPropertyPrice > 0 ? ((downPayment / maxPropertyPrice) * 100).toFixed(0) : '0';

  const canAfford = dti <= 40 && Number(ltvRatio) <= 90;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker border border-white/10 rounded-2xl p-8 lg:p-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg className="w-8 h-8 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h2 className="text-3xl font-bold">Kolik si můžu dovolit?</h2>
          </div>
          <p className="text-white/60 text-lg">
            Spočítejte si orientační maximální cenu nemovitosti podle vašeho příjmu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            
            {/* Monthly Income */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">
                  Čistý měsíční příjem domácnosti
                </label>
                <span className="text-lg font-bold text-zfp-gold">
                  {formatCurrency(monthlyIncome)}
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="200000"
                step="5000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>20 tis.</span>
                <span>200 tis.</span>
              </div>
            </div>

            {/* Monthly Expenses */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">
                  Měsíční náklady (bez hypotéky)
                </label>
                <span className="text-lg font-bold text-red-400">
                  {formatCurrency(monthlyExpenses)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>10 tis.</span>
                <span>100 tis.</span>
              </div>
              <p className="text-xs text-white/50 mt-2">
                Bydlení, jídlo, doprava, spoření, zábava...
              </p>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">
                  Vlastní prostředky
                </label>
                <span className="text-lg font-bold text-green-400">
                  {formatCurrency(downPayment)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5000000"
                step="100000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>0</span>
                <span>5 mil.</span>
              </div>
              <p className="text-xs text-white/50 mt-2">
                Úspory, prodej stávajícího bytu, dar, dědictví...
              </p>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">
                  Úroková sazba
                </label>
                <span className="text-lg font-bold text-zfp-gold">
                  {interestRate.toFixed(1)} %
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="7"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>3 %</span>
                <span>7 %</span>
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">
                  Doba splácení
                </label>
                <span className="text-lg font-bold text-zfp-gold">
                  {loanTerm} let
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>10 let</span>
                <span>30 let</span>
              </div>
            </div>

          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            
            {/* Max Property Price */}
            <motion.div 
              className={`border-2 rounded-xl p-8 text-center ${
                canAfford 
                  ? 'bg-zfp-gold/10 border-zfp-gold/30' 
                  : 'bg-red-500/10 border-red-500/30'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-sm text-white/60 mb-2">Maximální cena nemovitosti</div>
              <div className={`text-4xl font-bold mb-2 ${canAfford ? 'text-zfp-gold' : 'text-red-400'}`}>
                {formatCurrency(maxPropertyPrice)}
              </div>
              {!canAfford && (
                <div className="text-xs text-red-300 mt-2">
                  ⚠️ Náklady na hypotéku by byly příliš vysoké
                </div>
              )}
            </motion.div>

            {/* Breakdown */}
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white/60">Vlastní prostředky ({downPaymentPercent}%)</span>
                  <span className="font-bold text-green-400">{formatCurrency(downPayment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Hypotéka ({ltvRatio}%)</span>
                  <span className="font-bold text-white">{formatCurrency(maxLoan)}</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Měsíční splátka</span>
                  <span className="font-bold text-zfp-gold">{formatCurrency(monthlyPayment)}</span>
                </div>
                <div className="text-xs text-white/40 mt-2">
                  {dti.toFixed(0)}% z vašeho příjmu
                </div>
                {dti > 40 && (
                  <div className="text-xs text-red-300 mt-1">
                    ⚠️ Nad doporučených 40%
                  </div>
                )}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Zbývající příjem po splátce</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(monthlyIncome - monthlyExpenses - monthlyPayment)}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <motion.div
              className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-white/70">
                  <h4 className="font-semibold text-blue-300 mb-2">Jak to počítáme?</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Banky typicky umožňují splátku max 40% volných příjmů</li>
                    <li>• Minimální vlastní prostředky jsou obvykle 10-20%</li>
                    <li>• Výpočet zohledňuje aktuální úrokové sazby</li>
                    <li>• Počítáme s DTI (Debt-to-Income) max 40%</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.button
              onClick={handleContactClick}
              className="w-full px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-bold tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Chci najít nemovitost
            </motion.button>

          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 text-center text-xs text-white/40">
          * Výpočet je orientační. Skutečná výše hypotéky závisí na bonitě, hodnocení nemovitosti a podmínkách konkrétní banky.
          Konečné podmínky určí banka na základě kompletních podkladů.
        </div>

      </div>
    </div>
  );
}
