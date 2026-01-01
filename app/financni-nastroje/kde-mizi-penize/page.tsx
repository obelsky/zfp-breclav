'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function KdeMiziPenizePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [calculatorData, setCalculatorData] = useState<Record<string, any> | undefined>();

  // Income
  const [monthlyIncome, setMonthlyIncome] = useState(50000);

  // Fixed expenses
  const [mortgage, setMortgage] = useState(15000);
  const [utilities, setUtilities] = useState(3000);
  const [insurance, setInsurance] = useState(2000);
  const [carLoan, setCarLoan] = useState(5000);

  // Variable expenses
  const [groceries, setGroceries] = useState(8000);
  const [restaurants, setRestaurants] = useState(4000);
  const [transport, setTransport] = useState(2000);
  const [entertainment, setEntertainment] = useState(3000);
  const [shopping, setShopping] = useState(5000);
  const [other, setOther] = useState(2000);

  // Calculate totals
  const fixedTotal = mortgage + utilities + insurance + carLoan;
  const variableTotal = groceries + restaurants + transport + entertainment + shopping + other;
  const totalExpenses = fixedTotal + variableTotal;
  const remaining = monthlyIncome - totalExpenses;
  const remainingPercent = (remaining / monthlyIncome) * 100;

  // Calculate percentages
  const expenses = [
    { name: 'Bydlení (hypotéka/nájem)', amount: mortgage, category: 'fixed' },
    { name: 'Energie a služby', amount: utilities, category: 'fixed' },
    { name: 'Pojištění', amount: insurance, category: 'fixed' },
    { name: 'Úvěr na auto', amount: carLoan, category: 'fixed' },
    { name: 'Potraviny', amount: groceries, category: 'variable' },
    { name: 'Restaurace a kavárny', amount: restaurants, category: 'variable' },
    { name: 'Doprava', amount: transport, category: 'variable' },
    { name: 'Zábava', amount: entertainment, category: 'variable' },
    { name: 'Oblečení a shopping', amount: shopping, category: 'variable' },
    { name: 'Ostatní', amount: other, category: 'variable' },
  ].sort((a, b) => b.amount - a.amount);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Yearly projections
  const yearlyExpenses = totalExpenses * 12;
  const yearlyRemaining = remaining * 12;

  // Insights
  const getInsights = () => {
    const insights = [];
    
    if (restaurants > groceries * 0.5) {
      const saving = restaurants * 0.3;
      insights.push({
        type: 'warning',
        title: 'Příliš vysoké výdaje na restaurace',
        text: `Utrácíte ${formatCurrency(restaurants)} měsíčně za restaurace. Snížením o 30% ušetříte ${formatCurrency(saving)}/měsíc.`,
        savings: saving * 12
      });
    }

    if (shopping > monthlyIncome * 0.1) {
      const saving = shopping * 0.4;
      insights.push({
        type: 'warning',
        title: 'Vysoké výdaje na shopping',
        text: `Shopping zabírá ${((shopping / monthlyIncome) * 100).toFixed(0)}% příjmu. Ušetřete ${formatCurrency(saving)}/měsíc.`,
        savings: saving * 12
      });
    }

    if (remaining < monthlyIncome * 0.2) {
      insights.push({
        type: 'danger',
        title: 'Nízká úsporová rezerva',
        text: `Šetříte pouze ${remainingPercent.toFixed(0)}% příjmu. Doporučujeme alespoň 20%.`,
        savings: 0
      });
    }

    if (fixedTotal > monthlyIncome * 0.5) {
      insights.push({
        type: 'info',
        title: 'Vysoké fixní náklady',
        text: `Fixní náklady zabírají ${((fixedTotal / monthlyIncome) * 100).toFixed(0)}% příjmu. Zvažte refinancování nebo přestěhování.`,
        savings: 0
      });
    }

    if (remaining > monthlyIncome * 0.3) {
      insights.push({
        type: 'success',
        title: 'Výborné hospodaření!',
        text: `Šetříte ${remainingPercent.toFixed(0)}% příjmu. To je skvělé! Zvažte investování přebytku.`,
        savings: 0
      });
    }

    return insights;
  };

  const insights = getInsights();
  const totalPotentialSavings = insights.reduce((sum, i) => sum + i.savings, 0);

  const handleContactClick = () => {
    setCalculatorData({
      type: 'analyzér výdajů',
      mesicniPrijem: monthlyIncome,
      celkoveVydaje: totalExpenses,
      fixniNaklady: fixedTotal,
      variabilniNaklady: variableTotal,
      zbyvaPenize: remaining,
      rocniUspora: yearlyRemaining,
      potencialniUspora: totalPotentialSavings
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

            <h1 className="mb-6">Kde mizí moje peníze?</h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Vyplňte své měsíční výdaje a zjistěte, kam vám peníze mizí. 
              Nástroj vám ukáže překvapivá čísla a najde potenciální úspory.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker border border-white/10 rounded-2xl p-8 lg:p-12">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Left - Inputs */}
                <div className="space-y-8">
                  
                  {/* Income */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 text-green-300">Měsíční příjem</h3>
                    <div className="mb-3">
                      <div className="text-3xl font-bold text-green-400 mb-3">
                        {formatCurrency(monthlyIncome)}
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
                  </div>

                  {/* Fixed Expenses */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-zfp-gold">Fixní náklady</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Bydlení (hypotéka/nájem)', value: mortgage, setter: setMortgage },
                        { label: 'Energie a služby', value: utilities, setter: setUtilities },
                        { label: 'Pojištění', value: insurance, setter: setInsurance },
                        { label: 'Úvěr na auto', value: carLoan, setter: setCarLoan },
                      ].map((item, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-sm text-white/70">{item.label}</label>
                            <span className="font-bold text-white">{formatCurrency(item.value)}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="30000"
                            step="500"
                            value={item.value}
                            onChange={(e) => item.setter(Number(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-right">
                      <span className="text-sm text-white/60">Celkem fixní: </span>
                      <span className="text-lg font-bold text-zfp-gold">{formatCurrency(fixedTotal)}</span>
                    </div>
                  </div>

                  {/* Variable Expenses */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-orange-400">Variabilní výdaje</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Potraviny', value: groceries, setter: setGroceries },
                        { label: 'Restaurace', value: restaurants, setter: setRestaurants },
                        { label: 'Doprava', value: transport, setter: setTransport },
                        { label: 'Zábava', value: entertainment, setter: setEntertainment },
                        { label: 'Shopping', value: shopping, setter: setShopping },
                        { label: 'Ostatní', value: other, setter: setOther },
                      ].map((item, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-sm text-white/70">{item.label}</label>
                            <span className="font-bold text-white">{formatCurrency(item.value)}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="20000"
                            step="500"
                            value={item.value}
                            onChange={(e) => item.setter(Number(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-right">
                      <span className="text-sm text-white/60">Celkem variabilní: </span>
                      <span className="text-lg font-bold text-orange-400">{formatCurrency(variableTotal)}</span>
                    </div>
                  </div>

                </div>

                {/* Right - Results */}
                <div className="space-y-6">
                  
                  {/* Summary */}
                  <motion.div 
                    className="bg-gradient-to-br from-zfp-gold/20 to-zfp-orange/20 border-2 border-zfp-gold/30 rounded-xl p-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <h3 className="text-lg font-semibold mb-4 text-zfp-gold">Shrnutí</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70">Celkové výdaje:</span>
                        <span className="font-bold text-red-400">{formatCurrency(totalExpenses)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Zbývá:</span>
                        <span className={`font-bold text-2xl ${remaining > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(remaining)}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-white/10">
                        <div className="text-sm text-white/60 mb-1">Šetříte</div>
                        <div className="text-3xl font-bold text-zfp-gold">
                          {remainingPercent.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Breakdown */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Kam peníze mizí</h3>
                    <div className="space-y-2">
                      {expenses.filter(e => e.amount > 0).slice(0, 5).map((expense, i) => {
                        const percent = (expense.amount / monthlyIncome) * 100;
                        return (
                          <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white/70">{expense.name}</span>
                              <span className="font-semibold">{formatCurrency(expense.amount)}</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-zfp-gold to-zfp-orange rounded-full transition-all duration-500"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <div className="text-xs text-white/50 text-right mt-1">
                              {percent.toFixed(0)}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Yearly Projection */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 text-blue-300">Za rok</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70">Utratíte:</span>
                        <span className="font-bold text-red-400">{formatCurrency(yearlyExpenses)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Ušetříte:</span>
                        <span className="font-bold text-green-400">{formatCurrency(yearlyRemaining)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Insights */}
                  {insights.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <h3 className="text-lg font-semibold">Doporučení</h3>
                      {insights.map((insight, i) => (
                        <div 
                          key={i}
                          className={`p-4 rounded-xl border-2 ${
                            insight.type === 'success' ? 'bg-green-500/10 border-green-500/30' :
                            insight.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                            insight.type === 'danger' ? 'bg-red-500/10 border-red-500/30' :
                            'bg-blue-500/10 border-blue-500/30'
                          }`}
                        >
                          <div className="font-semibold mb-1">{insight.title}</div>
                          <div className="text-sm text-white/70">{insight.text}</div>
                          {insight.savings > 0 && (
                            <div className="mt-2 text-sm font-semibold text-green-400">
                              Roční úspora: {formatCurrency(insight.savings)}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {totalPotentialSavings > 0 && (
                        <div className="mt-4 p-4 bg-green-500/20 border-2 border-green-500/40 rounded-xl text-center">
                          <div className="text-sm text-green-300 mb-1">Celková potenciální úspora</div>
                          <div className="text-3xl font-bold text-green-400">
                            {formatCurrency(totalPotentialSavings)}/rok
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* CTA */}
                  <button
                    onClick={handleContactClick}
                    className="w-full px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-bold tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Chci optimalizovat výdaje
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
        title="Optimalizace výdajů - konzultace"
        subject="financni-planovani"
        calculatorData={calculatorData}
      />
    </>
  );
}
