'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface InsuranceCalculatorProps {
  onContactClick?: (data?: Record<string, any>) => void;
}

export default function InsuranceCalculator({ onContactClick }: InsuranceCalculatorProps) {
  const [familyStatus, setFamilyStatus] = useState<'single' | 'couple' | 'family'>('family');
  const [children, setChildren] = useState(2);
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [hasProperty, setHasProperty] = useState(true);
  const [hasCar, setHasCar] = useState(true);

  // Current insurance checkboxes
  const [hasLife, setHasLife] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);
  const [hasHomeInsurance, setHasHomeInsurance] = useState(false);
  const [hasLiability, setHasLiability] = useState(false);
  const [hasCarInsurance, setHasCarInsurance] = useState(true);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate recommended insurance amounts
  const recommendedLifeInsurance = familyStatus !== 'single' ? monthlyIncome * 60 : monthlyIncome * 36; // 5 let vs 3 roky příjmu
  const recommendedDisabilityBenefit = monthlyIncome * 0.7; // 70% příjmu

  // Calculate coverage score
  const getTotalScore = () => {
    let score = 0;
    let maxScore = 3; // Base essentials

    if (familyStatus !== 'single') {
      maxScore += 2; // Life insurance more important for families
      if (hasLife) score += 2;
    } else {
      if (hasLife) score += 1;
    }

    if (hasDisability) score += 2;
    if (hasLiability) score += 1;

    if (hasProperty) {
      maxScore += 1;
      if (hasHomeInsurance) score += 1;
    }

    if (hasCar) {
      maxScore += 1;
      if (hasCarInsurance) score += 1;
    }

    return { score, maxScore, percentage: Math.round((score / maxScore) * 100) };
  };

  const scoreData = getTotalScore();
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return { emoji: '✅', text: 'Výborné!', desc: 'Máte dobré pokrytí' };
    if (percentage >= 50) return { emoji: '⚠️', text: 'Ujde to', desc: 'Ale můžete lépe' };
    return { emoji: '❌', text: 'Pozor!', desc: 'Máte významné mezery' };
  };

  const scoreMessage = getScoreMessage(scoreData.percentage);

  // Missing insurance list
  const getMissingInsurance = () => {
    const missing = [];
    
    if (familyStatus !== 'single' && !hasLife) {
      missing.push({
        type: 'pojištění',
        reason: 'Ochrana rodiny v případě úmrtí živitele',
        priority: 'Vysoká',
        recommended: formatCurrency(recommendedLifeInsurance),
      });
    }
    
    if (!hasDisability) {
      missing.push({
        type: 'Pojištění invalidity',
        reason: 'Příjem při dlouhodobé pracovní neschopnosti',
        priority: familyStatus !== 'single' ? 'Vysoká' : 'Střední',
        recommended: `${formatCurrency(recommendedDisabilityBenefit)}/měsíc`,
      });
    }
    
    if (!hasLiability) {
      missing.push({
        type: 'Pojištění odpovědnosti',
        reason: 'Ochrana proti škodám třetím stranám',
        priority: 'Střední',
        recommended: 'Od 500 Kč/rok',
      });
    }
    
    if (hasProperty && !hasHomeInsurance) {
      missing.push({
        type: 'Pojištění domácnosti/nemovitosti',
        reason: 'Ochrana majetku proti živelním pohromám a krádežím',
        priority: 'Vysoká',
        recommended: 'Podle hodnoty majetku',
      });
    }

    return missing;
  };

  const missingInsurance = getMissingInsurance();

  const handleContactClick = () => {
    if (onContactClick) {
      const scoreData = getTotalScore();
      onContactClick({
        type: 'pojištění',
        rodinnyStav: familyStatus,
        pocetDeti: children,
        mesicniPrijem: monthlyIncome,
        maNemovitost: hasProperty,
        maAuto: hasCar,
        pojisteniScore: scoreData.percentage,
        doporuceneZivotni: recommendedLifeInsurance,
        doporucenaInvalidita: recommendedDisabilityBenefit,
        chybejiPojisteni: missingInsurance.map(i => i.type).join(', ')
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker border border-white/10 rounded-2xl p-8 lg:p-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg className="w-8 h-8 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h2 className="text-3xl font-bold">Jsem správně pojištěný?</h2>
          </div>
          <p className="text-white/60 text-lg">
            Zjistěte, jaké pojištění vám chybí a zda jste dostatečně chráněni
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            
            <h3 className="text-xl font-semibold mb-4">Vaše situace</h3>

            {/* Family Status */}
            <div>
              <label className="text-sm font-medium text-white/80 mb-3 block">
                Rodinný stav
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'single' as const, label: 'Svobodný' },
                  { value: 'couple' as const, label: 'Pár' },
                  { value: 'family' as const, label: 'Rodina' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFamilyStatus(option.value)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      familyStatus === option.value
                        ? 'bg-zfp-gold text-zfp-darker'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Children */}
            {familyStatus === 'family' && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-white/80">
                    Počet dětí
                  </label>
                  <span className="text-lg font-bold text-zfp-gold">{children}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            )}

            {/* Monthly Income */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-white/80">
                  Měsíční příjem rodiny
                </label>
                <span className="text-lg font-bold text-zfp-gold">
                  {formatCurrency(monthlyIncome)}
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="150000"
                step="5000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Assets */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/80 block mb-3">
                Co vlastníte?
              </label>
              <label className="flex items-center gap-3 cursor-pointer bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={hasProperty}
                  onChange={(e) => setHasProperty(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 text-zfp-orange focus:ring-zfp-orange"
                />
                <span>Nemovitost (byt/dům)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={hasCar}
                  onChange={(e) => setHasCar(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 text-zfp-orange focus:ring-zfp-orange"
                />
                <span>Auto</span>
              </label>
            </div>

            {/* Current Insurance */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/80 block mb-3">
                Jaké pojištění už máte?
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={hasLife}
                  onChange={(e) => setHasLife(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 text-zfp-orange focus:ring-zfp-orange"
                />
                <span>Životní pojištění</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={hasDisability}
                  onChange={(e) => setHasDisability(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 text-zfp-orange focus:ring-zfp-orange"
                />
                <span>Pojištění invalidity</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={hasLiability}
                  onChange={(e) => setHasLiability(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 text-zfp-orange focus:ring-zfp-orange"
                />
                <span>Pojištění odpovědnosti</span>
              </label>

              {hasProperty && (
                <label className="flex items-center gap-3 cursor-pointer bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasHomeInsurance}
                    onChange={(e) => setHasHomeInsurance(e.target.checked)}
                    className="w-5 h-5 rounded border-white/20 text-zfp-orange focus:ring-zfp-orange"
                  />
                  <span>Pojištění domácnosti/nemovitosti</span>
                </label>
              )}

              {hasCar && (
                <label className="flex items-center gap-3 cursor-pointer bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasCarInsurance}
                    onChange={(e) => setHasCarInsurance(e.target.checked)}
                    className="w-5 h-5 rounded border-white/20 text-zfp-orange focus:ring-zfp-orange"
                  />
                  <span>Havarijní pojištění auta</span>
                </label>
              )}
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            
            <h3 className="text-xl font-semibold mb-4">Vyhodnocení</h3>

            {/* Score Box */}
            <motion.div 
              className={`border-2 rounded-xl p-8 text-center ${
                scoreData.percentage >= 80 
                  ? 'bg-green-500/10 border-green-500/30'
                  : scoreData.percentage >= 50
                  ? 'bg-yellow-500/10 border-yellow-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-6xl mb-4">{scoreMessage.emoji}</div>
              <div className={`text-5xl font-bold mb-2 ${getScoreColor(scoreData.percentage)}`}>
                {scoreData.percentage}%
              </div>
              <div className={`text-2xl font-semibold mb-1 ${getScoreColor(scoreData.percentage)}`}>
                {scoreMessage.text}
              </div>
              <div className="text-white/60">
                {scoreMessage.desc}
              </div>
              <div className="mt-4 text-sm text-white/40">
                Pokrytí: {scoreData.score}/{scoreData.maxScore} klíčových pojištění
              </div>
            </motion.div>

            {/* Missing Insurance */}
            {missingInsurance.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold mb-4 text-zfp-gold">
                  ⚠️ Co vám chybí:
                </h4>
                <div className="space-y-3">
                  {missingInsurance.map((insurance, i) => (
                    <div
                      key={i}
                      className={`bg-white/5 border rounded-xl p-4 ${
                        insurance.priority === 'Vysoká'
                          ? 'border-red-500/30'
                          : 'border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-white">
                          {insurance.type}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            insurance.priority === 'Vysoká'
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}
                        >
                          {insurance.priority}
                        </span>
                      </div>
                      <p className="text-sm text-white/60 mb-2">
                        {insurance.reason}
                      </p>
                      <div className="text-xs text-zfp-gold font-semibold">
                        Doporučeno: {insurance.recommended}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {missingInsurance.length === 0 && (
              <motion.div
                className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-4xl mb-3">🎉</div>
                <div className="text-lg font-semibold text-green-400 mb-2">
                  Skvělé pokrytí!
                </div>
                <p className="text-sm text-white/70">
                  Máte všechna klíčová pojištění podle vaší situace.
                  Můžeme ještě zkontrolovat výši pojistek a podmínky.
                </p>
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.button
              onClick={handleContactClick}
              className="w-full px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-bold tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Chci optimalizovat pojištění
            </motion.button>

          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-white/70">
              <strong className="text-blue-300">Důležité:</strong> Tento test je orientační. Skutečné potřeby závisí na vaší konkrétní situaci, zdravotním stavu, profesi a dalších faktorech. Doporučujeme osobní konzultaci s poradcem.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
