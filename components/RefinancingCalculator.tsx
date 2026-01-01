'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface RefinancingCalculatorProps {
  onContactClick?: (data?: Record<string, any>) => void;
}

export default function RefinancingCalculator({ onContactClick }: RefinancingCalculatorProps) {
  // Input states
  const [remainingDebt, setRemainingDebt] = useState(2500000);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [remainingYears, setRemainingYears] = useState(20);
  const [newRate, setNewRate] = useState(4.2);

  // Results states
  const [currentMonthly, setCurrentMonthly] = useState(0);
  const [newMonthly, setNewMonthly] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [yearlySavings, setYearlySavings] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick({
        type: 'refinancování',
        zbyvajiciDluh: remainingDebt,
        soucasnaUrokova: currentRate,
        zbyvajiciRoky: remainingYears,
        novaUrokova: newRate,
        soucasnaSplatka: currentMonthly,
        novaSplatka: newMonthly,
        mesicniUspora: monthlySavings,
        celkovaUspora: totalSavings
      });
    }
  };

  useEffect(() => {
    const months = remainingYears * 12;
    
    // Calculate current monthly payment
    const currentMonthlyRate = currentRate / 100 / 12;
    if (remainingDebt > 0 && months > 0 && currentMonthlyRate > 0) {
      const currentPayment = (remainingDebt * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, months)) / 
                             (Math.pow(1 + currentMonthlyRate, months) - 1);
      setCurrentMonthly(currentPayment);
      
      // Calculate new monthly payment
      const newMonthlyRate = newRate / 100 / 12;
      const newPayment = (remainingDebt * newMonthlyRate * Math.pow(1 + newMonthlyRate, months)) / 
                         (Math.pow(1 + newMonthlyRate, months) - 1);
      setNewMonthly(newPayment);
      
      // Calculate savings
      const monthly = currentPayment - newPayment;
      setMonthlySavings(monthly);
      setYearlySavings(monthly * 12);
      setTotalSavings(monthly * months);
    }
  }, [remainingDebt, currentRate, remainingYears, newRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const savingsPercent = currentMonthly > 0 ? ((monthlySavings / currentMonthly) * 100).toFixed(1) : '0';

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker border border-white/10 rounded-2xl p-8 lg:p-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg className="w-8 h-8 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h2 className="text-3xl font-bold">Spočítejte si úsporu</h2>
          </div>
          <p className="text-white/60 text-lg">
            Zjistěte, kolik ušetříte refinancováním hypotéky
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            
            {/* Remaining Debt */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">
                  Zbývající dluh
                </label>
                <span className="text-lg font-bold text-zfp-gold">
                  {formatCurrency(remainingDebt)}
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="10000000"
                step="100000"
                value={remainingDebt}
                onChange={(e) => setRemainingDebt(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>500 tis.</span>
                <span>10 mil.</span>
              </div>
            </div>

            {/* Current Rate */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">
                  Současná úroková sazba
                </label>
                <span className="text-lg font-bold text-red-400">
                  {currentRate.toFixed(1)} %
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="8"
                step="0.1"
                value={currentRate}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>3 %</span>
                <span>8 %</span>
              </div>
            </div>

            {/* Remaining Years */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">
                  Zbývající doba splácení
                </label>
                <span className="text-lg font-bold text-zfp-gold">
                  {remainingYears} let
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={remainingYears}
                onChange={(e) => setRemainingYears(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>5 let</span>
                <span>30 let</span>
              </div>
            </div>

            {/* New Rate */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">
                  Nová úroková sazba
                </label>
                <span className="text-lg font-bold text-green-400">
                  {newRate.toFixed(1)} %
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="7"
                step="0.1"
                value={newRate}
                onChange={(e) => setNewRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>3 %</span>
                <span>7 %</span>
              </div>
            </div>

          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            
            {/* Current Payment */}
            <motion.div 
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-sm text-red-300 mb-2">Současná splátka</div>
              <div className="text-3xl font-bold text-red-400">
                {formatCurrency(currentMonthly)}
                <span className="text-base text-white/60">/měsíc</span>
              </div>
            </motion.div>

            {/* New Payment */}
            <motion.div 
              className="bg-green-500/10 border border-green-500/20 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-sm text-green-300 mb-2">Nová splátka</div>
              <div className="text-3xl font-bold text-green-400">
                {formatCurrency(newMonthly)}
                <span className="text-base text-white/60">/měsíc</span>
              </div>
            </motion.div>

            {/* Monthly Savings */}
            <motion.div 
              className="bg-zfp-gold/10 border-2 border-zfp-gold/30 rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-sm text-zfp-gold mb-2 font-semibold">💰 Měsíční úspora</div>
              <div className="text-4xl font-bold text-zfp-gold mb-3">
                {formatCurrency(monthlySavings)}
              </div>
              <div className="text-sm text-white/70">
                To je snížení o <span className="font-bold text-zfp-gold">{savingsPercent} %</span>
              </div>
            </motion.div>

            {/* Yearly Savings */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Úspora za rok</span>
                <span className="text-xl font-bold text-white">{formatCurrency(yearlySavings)}</span>
              </div>
            </div>

            {/* Total Savings */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Celková úspora za {remainingYears} let</span>
                <span className="text-xl font-bold text-white">{formatCurrency(totalSavings)}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        {monthlySavings > 0 && (
          <motion.div 
            className="mt-10 p-6 bg-gradient-to-r from-zfp-gold/20 to-zfp-orange/20 border border-zfp-gold/30 rounded-xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg mb-4">
              <span className="text-zfp-gold font-bold">Za {remainingYears} let ušetříte {formatCurrency(totalSavings)}</span>
              <br />
              <span className="text-white/70 text-base">
                To je cena {totalSavings > 500000 ? 'nového auta!' : totalSavings > 300000 ? 'luxusní dovolené!' : 'roční dovolené!'}
              </span>
            </p>
            <button
              onClick={handleContactClick}
              className="px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-bold tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Chci refinancovat
            </button>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 text-center text-xs text-white/40">
          * Výpočet je orientační. Skutečná úspora závisí na konkrétní nabídce banky a vašich podmínkách.
        </div>

      </div>
    </div>
  );
}
