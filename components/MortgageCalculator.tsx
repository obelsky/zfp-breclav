'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MortgageData {
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
}

interface MortgageCalculatorProps {
  onContactClick?: (data?: Record<string, any>) => void;
  onDataChange?: (data: MortgageData) => void;
}

export default function MortgageCalculator({ onContactClick, onDataChange }: MortgageCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState(4000000);
  const [downPayment, setDownPayment] = useState(800000);
  const [years, setYears] = useState(25);
  const [interestRate, setInterestRate] = useState(4.2);
  
  const [loanAmount, setLoanAmount] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const loan = propertyPrice - downPayment;
    const months = years * 12;
    const monthlyRate = interestRate / 100 / 12;
    
    if (loan > 0 && months > 0 && monthlyRate > 0) {
      const monthly = (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                     (Math.pow(1 + monthlyRate, months) - 1);
      const total = monthly * months;
      const interest = total - loan;
      
      setLoanAmount(loan);
      setMonthlyPayment(monthly);
      setTotalPayment(total);
      setTotalInterest(interest);

      if (onDataChange) {
        onDataChange({
          propertyPrice,
          downPayment,
          loanAmount: loan,
          interestRate,
          loanTerm: years,
          monthlyPayment: monthly,
        });
      }
    }
  }, [propertyPrice, downPayment, years, interestRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const downPaymentPercent = (downPayment / propertyPrice) * 100;
  const ltvRatio = ((propertyPrice - downPayment) / propertyPrice) * 100;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker border border-white/10 rounded-2xl p-8 lg:p-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Inputs */}
          <div className="space-y-8">
            
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">Cena nemovitosti</label>
                <span className="text-xl font-bold text-zfp-gold">{formatCurrency(propertyPrice)}</span>
              </div>
              <input
                type="range"
                min="1000000"
                max="15000000"
                step="100000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">Vlastní prostředky</label>
                <span className="text-xl font-bold text-green-400">{formatCurrency(downPayment)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={propertyPrice}
                step="50000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/50 mt-2">
                <span>{downPaymentPercent.toFixed(0)}% z ceny</span>
                <span>LTV: {ltvRatio.toFixed(0)}%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">Splatnost</label>
                <span className="text-xl font-bold text-zfp-gold">{years} let</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">Úroková sazba p.a.</label>
                <span className="text-xl font-bold text-zfp-gold">{interestRate.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="8.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-white/50 mt-2">
                <span>Min: 2.0%</span>
                <span>Max: 8.0%</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-sm font-semibold mb-3 text-blue-300">Výše hypotéky</h3>
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {formatCurrency(loanAmount)}
              </div>
              <div className="text-sm text-white/60">
                {downPaymentPercent < 20 && (
                  <span className="text-yellow-400">⚠️ LTV nad 80% - vyšší úrok</span>
                )}
              </div>
            </div>

          </div>

          {/* Results */}
          <div className="space-y-6">
            
            <motion.div 
              className="bg-gradient-to-br from-zfp-gold/20 to-zfp-orange/20 border-2 border-zfp-gold/30 rounded-xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-sm text-white/60 mb-2">Měsíční splátka</div>
              <div className="text-5xl font-bold text-zfp-gold mb-2">
                {formatCurrency(monthlyPayment)}
              </div>
              <div className="text-sm text-white/70">na {years} let</div>
            </motion.div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Celková částka</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Výše úvěru:</span>
                  <span className="font-bold">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Zaplatíte celkem:</span>
                  <span className="font-bold">{formatCurrency(totalPayment)}</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between">
                  <span className="text-white/70">Přeplatek na úrocích:</span>
                  <span className="font-bold text-red-400">{formatCurrency(totalInterest)}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-yellow-300">Rozložení plateb</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">Jistina</span>
                    <span className="font-semibold">{((loanAmount / totalPayment) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(loanAmount / totalPayment) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">Úroky</span>
                    <span className="font-semibold">{((totalInterest / totalPayment) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-green-300">Za rok</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Zaplatíte ročně:</span>
                  <span className="font-bold">{formatCurrency(monthlyPayment * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Z toho úroky:</span>
                  <span className="font-bold text-red-400">
                    ~{formatCurrency((totalInterest / years))}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
