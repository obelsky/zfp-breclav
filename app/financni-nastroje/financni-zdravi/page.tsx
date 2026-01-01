'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function FinancniZdraviPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [calculatorData, setCalculatorData] = useState<Record<string, any> | undefined>();

  // Inputs
  const [hasEmergencyFund, setHasEmergencyFund] = useState(true);
  const [emergencyFundMonths, setEmergencyFundMonths] = useState(3);
  const [savingsRate, setSavingsRate] = useState(20);
  const [hasDebt, setHasDebt] = useState(false);
  const [debtToIncome, setDebtToIncome] = useState(30);
  const [hasInsurance, setHasInsurance] = useState(true);
  const [investsRegularly, setInvestsRegularly] = useState(true);
  const [hasRetirementPlan, setHasRetirementPlan] = useState(false);
  const [tracksExpenses, setTracksExpenses] = useState(true);

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    const details = [];

    // Emergency fund (25 points)
    if (hasEmergencyFund) {
      if (emergencyFundMonths >= 6) {
        score += 25;
        details.push({ category: 'Rezerva', points: 25, max: 25, status: 'excellent' });
      } else if (emergencyFundMonths >= 3) {
        score += 15;
        details.push({ category: 'Rezerva', points: 15, max: 25, status: 'good' });
      } else {
        score += 5;
        details.push({ category: 'Rezerva', points: 5, max: 25, status: 'poor' });
      }
    } else {
      details.push({ category: 'Rezerva', points: 0, max: 25, status: 'critical' });
    }

    // Savings rate (20 points)
    if (savingsRate >= 20) {
      score += 20;
      details.push({ category: 'Spoření', points: 20, max: 20, status: 'excellent' });
    } else if (savingsRate >= 10) {
      score += 12;
      details.push({ category: 'Spoření', points: 12, max: 20, status: 'good' });
    } else if (savingsRate >= 5) {
      score += 5;
      details.push({ category: 'Spoření', points: 5, max: 20, status: 'poor' });
    } else {
      details.push({ category: 'Spoření', points: 0, max: 20, status: 'critical' });
    }

    // Debt management (20 points)
    if (!hasDebt) {
      score += 20;
      details.push({ category: 'Dluhy', points: 20, max: 20, status: 'excellent' });
    } else {
      if (debtToIncome <= 30) {
        score += 12;
        details.push({ category: 'Dluhy', points: 12, max: 20, status: 'good' });
      } else if (debtToIncome <= 50) {
        score += 5;
        details.push({ category: 'Dluhy', points: 5, max: 20, status: 'poor' });
      } else {
        details.push({ category: 'Dluhy', points: 0, max: 20, status: 'critical' });
      }
    }

    // Insurance (15 points)
    if (hasInsurance) {
      score += 15;
      details.push({ category: 'Pojištění', points: 15, max: 15, status: 'excellent' });
    } else {
      details.push({ category: 'Pojištění', points: 0, max: 15, status: 'critical' });
    }

    // Investing (10 points)
    if (investsRegularly) {
      score += 10;
      details.push({ category: 'Investice', points: 10, max: 10, status: 'excellent' });
    } else {
      details.push({ category: 'Investice', points: 0, max: 10, status: 'critical' });
    }

    // Retirement planning (5 points)
    if (hasRetirementPlan) {
      score += 5;
      details.push({ category: 'Důchod', points: 5, max: 5, status: 'excellent' });
    } else {
      details.push({ category: 'Důchod', points: 0, max: 5, status: 'critical' });
    }

    // Expense tracking (5 points)
    if (tracksExpenses) {
      score += 5;
      details.push({ category: 'Evidence', points: 5, max: 5, status: 'excellent' });
    } else {
      details.push({ category: 'Evidence', points: 0, max: 5, status: 'critical' });
    }

    return { score, details };
  };

  const result = calculateScore();
  
  const getScoreLabel = (score: number) => {
    if (score >= 90) return { label: 'Výborné', color: 'text-green-400', desc: 'Jste finanční profík!' };
    if (score >= 75) return { label: 'Velmi dobré', color: 'text-lime-400', desc: 'Jste na skvělé cestě' };
    if (score >= 60) return { label: 'Dobré', color: 'text-yellow-400', desc: 'Solidní základ' };
    if (score >= 40) return { label: 'Průměrné', color: 'text-orange-400', desc: 'Je co zlepšovat' };
    return { label: 'Slabé', color: 'text-red-400', desc: 'Potřebujete pomoc' };
  };

  const scoreLabel = getScoreLabel(result.score);

  const handleContactClick = () => {
    setCalculatorData({
      type: 'finanční zdraví',
      score: result.score,
      hodnoceni: scoreLabel.label,
      rezerva: hasEmergencyFund ? `${emergencyFundMonths} měsíců` : 'Nemá',
      sporeniProcent: savingsRate,
      maDluhy: hasDebt ? 'Ano' : 'Ne'
    });
    setIsContactFormOpen(true);
  };

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          
          <Link 
            href="/financni-nastroje"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na Finanční nástroje
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>

            <h1 className="mb-6">Finanční zdraví score</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Zjistěte své finanční skóre 0-100 bodů. Porovnejte se s průměrem a zjistěte, jak na tom jste.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker border border-white/10 rounded-2xl p-8 lg:p-12">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Questions */}
                <div className="space-y-6">
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasEmergencyFund}
                        onChange={(e) => setHasEmergencyFund(e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 text-zfp-orange focus:ring-zfp-orange"
                      />
                      <div>
                        <div className="font-semibold">Mám finanční rezervu</div>
                        <div className="text-sm text-white/60">Na nepředvídané výdaje</div>
                      </div>
                    </label>
                    {hasEmergencyFund && (
                      <div className="mt-4">
                        <div className="text-sm mb-2">Kolik měsíců pokryje?</div>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          value={emergencyFundMonths}
                          onChange={(e) => setEmergencyFundMonths(Number(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="text-center text-lg font-bold text-zfp-gold mt-2">
                          {emergencyFundMonths} měsíců
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="font-semibold mb-2">Kolik procent příjmu šetřím?</div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={savingsRate}
                      onChange={(e) => setSavingsRate(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="text-center text-2xl font-bold text-zfp-gold mt-2">
                      {savingsRate}%
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasDebt}
                        onChange={(e) => setHasDebt(e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 text-zfp-orange focus:ring-zfp-orange"
                      />
                      <div>
                        <div className="font-semibold">Mám dluhy</div>
                        <div className="text-sm text-white/60">Úvěry, půjčky (kromě hypotéky)</div>
                      </div>
                    </label>
                    {hasDebt && (
                      <div className="mt-4">
                        <div className="text-sm mb-2">Splátky z příjmu (%)</div>
                        <input
                          type="range"
                          min="10"
                          max="80"
                          step="5"
                          value={debtToIncome}
                          onChange={(e) => setDebtToIncome(Number(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="text-center text-lg font-bold text-red-400 mt-2">
                          {debtToIncome}%
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: 'Mám životní/úrazové pojištění', checked: hasInsurance, setter: setHasInsurance },
                      { label: 'Pravidelně investuji', checked: investsRegularly, setter: setInvestsRegularly },
                      { label: 'Mám plán na důchod', checked: hasRetirementPlan, setter: setHasRetirementPlan },
                      { label: 'Sleduji své výdaje', checked: tracksExpenses, setter: setTracksExpenses },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={(e) => item.setter(e.target.checked)}
                            className="w-5 h-5 rounded border-white/20 text-zfp-orange focus:ring-zfp-orange"
                          />
                          <span className="font-semibold">{item.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Results */}
                <div className="space-y-6">
                  
                  <motion.div 
                    className={`border-4 rounded-2xl p-8 text-center relative overflow-hidden ${
                      result.score >= 90 ? 'bg-green-500/20 border-green-500/50' :
                      result.score >= 75 ? 'bg-lime-500/20 border-lime-500/50' :
                      result.score >= 60 ? 'bg-yellow-500/20 border-yellow-500/50' :
                      result.score >= 40 ? 'bg-orange-500/20 border-orange-500/50' :
                      'bg-red-500/20 border-red-500/50'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="relative z-10">
                      <div className="text-sm text-white/60 mb-2">Vaše skóre</div>
                      <div className={`text-7xl font-bold mb-2 ${scoreLabel.color}`}>
                        {result.score}
                      </div>
                      <div className="text-2xl font-bold mb-1">{scoreLabel.label}</div>
                      <div className="text-white/70">{scoreLabel.desc}</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  </motion.div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Detailní hodnocení</h3>
                    <div className="space-y-3">
                      {result.details.map((detail, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">{detail.category}</span>
                            <span className={`font-bold ${
                              detail.status === 'excellent' ? 'text-green-400' :
                              detail.status === 'good' ? 'text-yellow-400' :
                              detail.status === 'poor' ? 'text-orange-400' :
                              'text-red-400'
                            }`}>
                              {detail.points}/{detail.max}
                            </span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                detail.status === 'excellent' ? 'bg-green-500' :
                                detail.status === 'good' ? 'bg-yellow-500' :
                                detail.status === 'poor' ? 'bg-orange-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${(detail.points / detail.max) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 text-blue-300">Srovnání</h3>
                    <div className="text-sm text-white/70 space-y-2">
                      <div className="flex justify-between">
                        <span>Průměrný Čech:</span>
                        <span className="font-bold">45 bodů</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vaše skóre:</span>
                        <span className={`font-bold ${result.score >= 45 ? 'text-green-400' : 'text-red-400'}`}>
                          {result.score} bodů
                        </span>
                      </div>
                    </div>
                  </div>

                  {result.score < 90 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-3 text-yellow-300">Jak zlepšit skóre</h3>
                      <ul className="text-sm text-white/70 space-y-2">
                        {!hasEmergencyFund && <li>• Vytvořte si finanční rezervu</li>}
                        {savingsRate < 20 && <li>• Zvyšte míru spoření na 20%</li>}
                        {hasDebt && debtToIncome > 30 && <li>• Snižte zatížení dluhy</li>}
                        {!hasInsurance && <li>• Zajistěte si pojištění</li>}
                        {!investsRegularly && <li>• Začněte pravidelně investovat</li>}
                        {!hasRetirementPlan && <li>• Připravte plán na důchod</li>}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={handleContactClick}
                    className="w-full px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-bold tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Chci zlepšit své skóre
                  </button>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Finanční zdraví - konzultace"
        subject="financni-planovani"
        calculatorData={calculatorData}
      />
    </>
  );
}
