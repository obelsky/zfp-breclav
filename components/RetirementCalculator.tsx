'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface RetirementCalculatorProps {
  onContactClick?: (data?: Record<string, any>) => void;
}

export default function RetirementCalculator({ onContactClick }: RetirementCalculatorProps) {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSalary, setCurrentSalary] = useState(50000);
  const [desiredRetirementIncome, setDesiredRetirementIncome] = useState(35000);
  const [yearsInRetirement, setYearsInRetirement] = useState(20);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlySaving, setMonthlySaving] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(5);

  const yearsToRetirement = retirementAge - currentAge;
  const monthsToRetirement = yearsToRetirement * 12;
  
  const statePension = 18000;
  const monthlyGap = desiredRetirementIncome - statePension;
  const totalNeeded = monthlyGap * 12 * yearsInRetirement;
  
  const fvCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
  
  const monthlyRate = expectedReturn / 100 / 12;
  const fvMonthlySavings = monthlyRate > 0 
    ? monthlySaving * ((Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate)
    : monthlySaving * monthsToRetirement;
    
  const totalSaved = fvCurrentSavings + fvMonthlySavings;
  const gap = totalNeeded - totalSaved;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick({
        type: 'důchodová kalkulačka',
        soucasnyVek: currentAge,
        duchodovyVek: retirementAge,
        pozadovanyPrijem: desiredRetirementIncome,
        celkemPotrebuje: totalNeeded,
        celkemUsporim: totalSaved,
        chybi: gap
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker border border-white/10 rounded-2xl p-8 lg:p-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Inputs */}
          <div className="space-y-6">
            
            {[
              { label: 'Současný věk', value: currentAge, setter: setCurrentAge, min: 20, max: 60, step: 1, unit: 'let' },
              { label: 'Věk odchodu do důchodu', value: retirementAge, setter: setRetirementAge, min: 60, max: 70, step: 1, unit: 'let' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-white/80">{item.label}</label>
                  <span className="text-lg font-bold text-zfp-gold">{item.value} {item.unit}</span>
                </div>
                <input type="range" min={item.min} max={item.max} step={item.step} value={item.value} onChange={(e) => item.setter(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider" />
              </div>
            ))}

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">Současný měsíční příjem</label>
                <span className="text-lg font-bold text-zfp-gold">{formatCurrency(currentSalary)}</span>
              </div>
              <input type="range" min="20000" max="150000" step="5000" value={currentSalary} onChange={(e) => setCurrentSalary(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">Požadovaný příjem v důchodu</label>
                <span className="text-lg font-bold text-zfp-gold">{formatCurrency(desiredRetirementIncome)}</span>
              </div>
              <input type="range" min="15000" max="80000" step="5000" value={desiredRetirementIncome} onChange={(e) => setDesiredRetirementIncome(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">Délka důchodu (roky)</label>
                <span className="text-lg font-bold text-zfp-gold">{yearsInRetirement} let</span>
              </div>
              <input type="range" min="10" max="40" step="5" value={yearsInRetirement} onChange={(e) => setYearsInRetirement(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">Současné úspory</label>
                <span className="text-lg font-bold text-zfp-gold">{formatCurrency(currentSavings)}</span>
              </div>
              <input type="range" min="0" max="5000000" step="100000" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">Měsíční spoření</label>
                <span className="text-lg font-bold text-zfp-gold">{formatCurrency(monthlySaving)}</span>
              </div>
              <input type="range" min="0" max="30000" step="1000" value={monthlySaving} onChange={(e) => setMonthlySaving(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">Očekávaný výnos p.a.</label>
                <span className="text-lg font-bold text-zfp-gold">{expectedReturn}%</span>
              </div>
              <input type="range" min="0" max="10" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider" />
            </div>

          </div>

          {/* Results */}
          <div className="space-y-6">
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-300">Časová osa</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Do důchodu zbývá:</span>
                  <span className="font-bold">{yearsToRetirement} let</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Délka důchodu:</span>
                  <span className="font-bold">{yearsInRetirement} let</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-300">Státní důchod</h3>
              <div className="text-3xl font-bold text-yellow-400">{formatCurrency(statePension)}</div>
              <div className="text-sm text-white/70 mt-2">Odhadovaný měsíčně</div>
              <div className="mt-4 text-xs text-white/50">
                To je pouze {((statePension / currentSalary) * 100).toFixed(0)}% vašeho současného příjmu
              </div>
            </div>

            <motion.div 
              className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-red-300">Měsíční deficit</h3>
              <div className="text-4xl font-bold text-red-400 mb-2">{formatCurrency(monthlyGap)}</div>
              <div className="text-sm text-white/70">Musíte pokrýt ze svých úspor</div>
            </motion.div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Celkem budete potřebovat</h3>
              <div className="text-4xl font-bold text-zfp-gold mb-2">{formatCurrency(totalNeeded)}</div>
              <div className="text-sm text-white/70">Na pokrytí {yearsInRetirement} let důchodu</div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-300">Kolik naspoříte</h3>
              <div className="text-3xl font-bold text-green-400 mb-2">{formatCurrency(totalSaved)}</div>
              <div className="text-xs text-white/60 space-y-1">
                <div>Současné úspory: {formatCurrency(fvCurrentSavings)}</div>
                <div>Budoucí spoření: {formatCurrency(fvMonthlySavings)}</div>
              </div>
            </div>

            {gap > 0 ? (
              <motion.div 
                className="bg-red-500/20 border-2 border-red-500/40 rounded-xl p-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-2xl font-bold text-red-400 mb-2">Chybí vám</h3>
                <div className="text-4xl font-bold text-red-400 mb-4">{formatCurrency(gap)}</div>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-green-500/20 border-2 border-green-500/40 rounded-xl p-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-2xl font-bold text-green-400 mb-2">Jste na dobré cestě!</h3>
                <div className="text-sm text-white/70">Vaše úspory pokryjí důchod</div>
              </motion.div>
            )}

            <button
              onClick={handleContactClick}
              className="w-full px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-bold tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Chci plán na důchod
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
