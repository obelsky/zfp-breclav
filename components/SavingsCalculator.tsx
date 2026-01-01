'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SavingsCalculatorProps {
  onContactClick?: (data?: Record<string, any>) => void;
}

export default function SavingsCalculator({ onContactClick }: SavingsCalculatorProps) {
  // Input states
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(6);
  const [inflation, setInflation] = useState(3);

  // Results
  const [totalInvested, setTotalInvested] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);
  const [realReturn, setRealReturn] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick({
        type: 'spoření',
        mesicniVklad: monthlyAmount,
        dobaSporeni: years,
        ocekavanyVynos: expectedReturn,
        inflace: inflation,
        celkemVlozeno: totalInvested,
        konecnaHodnota: finalAmount,
        celkovyZisk: totalReturn,
        realnaHodnota: realReturn
      });
    }
  };

  useEffect(() => {
    const months = years * 12;
    const monthlyRate = expectedReturn / 100 / 12;
    const inflationRate = inflation / 100 / 12;

    // Calculate future value of annuity
    let balance = 0;
    let invested = 0;
    const data = [];

    for (let month = 0; month <= months; month++) {
      if (month > 0) {
        balance = balance * (1 + monthlyRate) + monthlyAmount;
        invested += monthlyAmount;
      }

      // Add data point every 6 months
      if (month % 6 === 0) {
        const year = month / 12;
        const realValue = balance / Math.pow(1 + inflation / 100, year);
        
        data.push({
          year: year.toFixed(1),
          invested: Math.round(invested),
          balance: Math.round(balance),
          realValue: Math.round(realValue),
        });
      }
    }

    setTotalInvested(invested);
    setFinalAmount(balance);
    setTotalReturn(balance - invested);
    
    // Real return adjusted for inflation
    const realFinalAmount = balance / Math.pow(1 + inflation / 100, years);
    setRealReturn(realFinalAmount);
    
    setChartData(data);
  }, [monthlyAmount, years, expectedReturn, inflation]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const returnPercent = totalInvested > 0 ? ((totalReturn / totalInvested) * 100).toFixed(0) : '0';

  // Comparison with bank account (0.5% interest)
  const bankBalance = monthlyAmount * years * 12 * (1 + 0.005 * years);
  const comparedToBank = finalAmount - bankBalance;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker border border-white/10 rounded-2xl p-8 lg:p-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg className="w-8 h-8 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h2 className="text-3xl font-bold">Kalkulačka pravidelného spoření</h2>
          </div>
          <p className="text-white/60 text-lg">
            Zjistěte, jak může růst váš kapitál při pravidelném investování
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Monthly Amount */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="text-sm font-medium text-white/80 mb-3 block">
              Měsíční vklad
            </label>
            <div className="text-2xl font-bold text-zfp-gold mb-3">
              {formatCurrency(monthlyAmount)}
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-white/40 mt-2">
              <span>1 tis.</span>
              <span>50 tis.</span>
            </div>
          </div>

          {/* Years */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="text-sm font-medium text-white/80 mb-3 block">
              Doba spoření
            </label>
            <div className="text-2xl font-bold text-zfp-gold mb-3">
              {years} let
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-white/40 mt-2">
              <span>1 rok</span>
              <span>30 let</span>
            </div>
          </div>

          {/* Expected Return */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="text-sm font-medium text-white/80 mb-3 block">
              Očekávaný výnos p.a.
            </label>
            <div className="text-2xl font-bold text-green-400 mb-3">
              {expectedReturn} %
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-white/40 mt-2">
              <span>0 %</span>
              <span>15 %</span>
            </div>
          </div>

          {/* Inflation */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="text-sm font-medium text-white/80 mb-3 block">
              Očekávaná inflace p.a.
            </label>
            <div className="text-2xl font-bold text-orange-400 mb-3">
              {inflation} %
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-white/40 mt-2">
              <span>0 %</span>
              <span>10 %</span>
            </div>
          </div>
        </div>

        {/* Simple Chart Visualization */}
        <div className="mb-12 bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6 text-center">Vývoj investice v čase</h3>
          
          <div className="relative h-64 bg-zfp-darker rounded-lg p-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-white/40 pr-2">
              <span>{formatCurrency(Math.max(finalAmount, totalInvested))}</span>
              <span>{formatCurrency(Math.max(finalAmount, totalInvested) * 0.75)}</span>
              <span>{formatCurrency(Math.max(finalAmount, totalInvested) * 0.5)}</span>
              <span>{formatCurrency(Math.max(finalAmount, totalInvested) * 0.25)}</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="ml-16 h-full relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full border-t border-white/5" />
                ))}
              </div>

              {/* Bars visualization */}
              <div className="absolute inset-0 flex items-end justify-around gap-1">
                {chartData.slice(0, Math.min(chartData.length, 12)).map((point, i) => {
                  const investedHeight = (point.invested / Math.max(finalAmount, totalInvested)) * 100;
                  const balanceHeight = (point.balance / Math.max(finalAmount, totalInvested)) * 100;
                  
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end h-full relative group">
                      {/* Balance bar */}
                      <div 
                        className="w-full bg-gradient-to-t from-zfp-gold to-zfp-orange rounded-t transition-all duration-300"
                        style={{ height: `${balanceHeight}%` }}
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-zfp-darker border border-white/20 rounded px-2 py-1 text-xs whitespace-nowrap pointer-events-none z-10">
                          <div className="text-zfp-gold">Rok {point.year}</div>
                          <div className="text-white/60">Hodnota: {formatCurrency(point.balance)}</div>
                          <div className="text-white/40 text-xs">Vloženo: {formatCurrency(point.invested)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-axis labels */}
            <div className="ml-16 mt-2 flex justify-between text-xs text-white/40">
              <span>0</span>
              <span>{Math.floor(years / 2)} let</span>
              <span>{years} let</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-zfp-gold to-zfp-orange rounded" />
              <span className="text-sm text-white/70">Hodnota investice</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Total Invested */}
          <motion.div 
            className="bg-white/5 border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-sm text-white/60 mb-2">Celkem vloženo</div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(totalInvested)}
            </div>
          </motion.div>

          {/* Final Amount */}
          <motion.div 
            className="bg-zfp-gold/10 border-2 border-zfp-gold/30 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-sm text-zfp-gold mb-2 font-semibold">💰 Konečná hodnota</div>
            <div className="text-2xl font-bold text-zfp-gold">
              {formatCurrency(finalAmount)}
            </div>
          </motion.div>

          {/* Total Return */}
          <motion.div 
            className="bg-green-500/10 border border-green-500/20 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-sm text-green-300 mb-2">Celkový zisk</div>
            <div className="text-2xl font-bold text-green-400">
              {formatCurrency(totalReturn)}
            </div>
            <div className="text-xs text-white/60 mt-1">
              +{returnPercent} % růst
            </div>
          </motion.div>

          {/* Real Value */}
          <motion.div 
            className="bg-white/5 border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-sm text-white/60 mb-2">Reálná hodnota*</div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(realReturn)}
            </div>
            <div className="text-xs text-white/40 mt-1">
              po odečtení inflace
            </div>
          </motion.div>
        </div>

        {/* Comparison Box */}
        {comparedToBank > 0 && (
          <motion.div 
            className="mb-10 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-blue-300">
                  Oproti bankovnímu účtu získáte navíc:
                </h4>
                <p className="text-3xl font-bold text-blue-400 mb-2">
                  {formatCurrency(comparedToBank)}
                </p>
                <p className="text-sm text-white/70">
                  Peníze na spořicím účtu (0,5% p.a.) vám za {years} let přinesou pouze {formatCurrency(bankBalance)}.
                  Investováním získáte <span className="font-bold text-blue-300">o {formatCurrency(comparedToBank)} více!</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div 
          className="p-6 bg-gradient-to-r from-zfp-gold/20 to-zfp-orange/20 border border-zfp-gold/30 rounded-xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg mb-4">
            <span className="text-zfp-gold font-bold">Za {years} let můžete mít {formatCurrency(finalAmount)}</span>
            <br />
            <span className="text-white/70 text-base">
              {finalAmount > 1000000 ? 'To je víc než milion!' : finalAmount > 500000 ? 'To je skvělý začátek!' : 'Každá koruna se počítá!'}
            </span>
          </p>
          <button
            onClick={handleContactClick}
            className="px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-bold tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Chci začít investovat
          </button>
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-xs text-white/40">
          * Výpočet je ilustrativní. Skutečný výnos závisí na konkrétním investičním produktu a tržních podmínkách. 
          Investice podléhají riziku ztráty.
        </div>

      </div>
    </div>
  );
}
