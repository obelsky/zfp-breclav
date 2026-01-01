'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MortgageData {
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
}

interface MortgageOfferFormProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorData?: MortgageData | null;
  hasUserChangedData: boolean;
}

export default function MortgageOfferForm({ 
  isOpen, 
  onClose, 
  calculatorData,
  hasUserChangedData 
}: MortgageOfferFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    includeCalculatorData: false,
    gdprConsent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Zde by bylo odeslání dat na server
    console.log('Form submitted:', {
      ...formData,
      calculatorData: formData.includeCalculatorData ? calculatorData : null,
    });
    
    // Zobrazit úspěšnou zprávu a zavřít
    alert('Děkujeme! Brzy se vám ozveme s nezávaznou nabídkou.');
    onClose();
  };

  const handleScrollToCalculator = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            style={{ pointerEvents: 'auto' }}
          />

          {/* Sliding Form */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-zfp-dark shadow-2xl z-[60] overflow-y-auto"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Připravíme pro vás nezávaznou nabídku</h2>
                    <p className="text-white/70 text-sm">
                      Náš hypoteční specialista vám zavolá a během jednoho hovoru získáte jasnější představu, 
                      jak můžete financovat své nové bydlení.
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Jméno a příjmení */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Jméno a příjmení <span className="text-zfp-orange">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jan Novák"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-zfp-gold focus:outline-none transition-colors"
                  />
                </div>

                {/* E-mail */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-mail <span className="text-zfp-orange">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jan.novak@email.cz"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-zfp-gold focus:outline-none transition-colors"
                  />
                  <p className="text-xs text-white/50 mt-1">Vyplňte prosím toto pole.</p>
                </div>

                {/* Telefon */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Telefon <span className="text-zfp-orange">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+420 777 123 456"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-zfp-gold focus:outline-none transition-colors"
                  />
                </div>

                {/* Conditional Box - Calculator Data */}
                {hasUserChangedData && calculatorData ? (
                  /* Box: Zahrnout data z kalkulačky */
                  <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.includeCalculatorData}
                        onChange={(e) => setFormData({ ...formData, includeCalculatorData: e.target.checked })}
                        className="mt-0.5 w-5 h-5 rounded border-blue-500/50 text-zfp-orange focus:ring-zfp-orange"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span className="font-semibold text-blue-300">Zahrnout data z hypoteční kalkulačky</span>
                        </div>
                        <p className="text-sm text-white/70">
                          Pomůže nám lépe porozumět vašim finančním možnostem
                        </p>
                        {formData.includeCalculatorData && calculatorData && (
                          <div className="mt-3 pt-3 border-t border-blue-500/20 space-y-1 text-xs text-white/60">
                            <div>Cena nemovitosti: {calculatorData.propertyPrice.toLocaleString('cs-CZ')} Kč</div>
                            <div>Vlastní prostředky: {calculatorData.downPayment.toLocaleString('cs-CZ')} Kč</div>
                            <div>Výše úvěru: {calculatorData.loanAmount.toLocaleString('cs-CZ')} Kč</div>
                            <div>Splatnost: {calculatorData.loanTerm} let</div>
                            <div>Měsíční splátka: {Math.round(calculatorData.monthlyPayment).toLocaleString('cs-CZ')} Kč</div>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                ) : (
                  /* Box: Odkaz na kalkulačku */
                  <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-blue-300 mb-1">Vyzkoušeli jste naši hypoteční kalkulačku?</h4>
                        <p className="text-sm text-white/70 mb-3">
                          Nastavte si osobní preference v kalkulačce výše a pomozte nám lépe porozumět vašim finančním možnostem.
                        </p>
                        <button
                          type="button"
                          onClick={handleScrollToCalculator}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          Přejít na kalkulačku nahoře
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vaše zpráva */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Vaše zpráva (volitelně)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Například: Hledám hypotéku na byt v Praze..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-zfp-gold focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* GDPR Consent */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.gdprConsent}
                      onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
                      className="mt-0.5 w-5 h-5 rounded border-white/20 text-zfp-orange focus:ring-zfp-orange"
                    />
                    <div className="text-sm text-white/70">
                      <span className="text-zfp-orange">*</span> Souhlasím se{' '}
                      <a href="/gdpr" className="text-zfp-orange hover:text-zfp-orange-hover underline">
                        zpracováním osobních údajů
                      </a>{' '}
                      za účelem kontaktování hypotečním specialistou ZFP Reality. Tento souhlas mohu kdykoli odvolat. 
                      Více informací v{' '}
                      <a href="/gdpr" className="text-zfp-orange hover:text-zfp-orange-hover underline">
                        zásadách ochrany osobních údajů
                      </a>.
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formData.gdprConsent}
                  className="w-full px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover disabled:bg-white/10 disabled:cursor-not-allowed text-white font-bold text-lg tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
                >
                  Chci nezávaznou nabídku
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
