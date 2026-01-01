'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalculatorDataDisplay from './CalculatorDataDisplay';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subject?: string;
  calculatorData?: Record<string, any>;
}

export default function ContactForm({ isOpen, onClose, title, subject, calculatorData }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });
  const [includeCalculatorData, setIncludeCalculatorData] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        ...formData,
        ...(includeCalculatorData && calculatorData && { calculatorData })
      };
      
      // Save to CRM
      if (typeof window !== 'undefined') {
        const { saveLead } = await import('@/utils/crmStorage');
        const [firstName, ...lastNameParts] = formData.name.split(' ');
        const lastName = lastNameParts.join(' ') || '';
        
        const leadData = {
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          phone: formData.phone,
          source: (subject === 'esanon' ? 'esanon' : 
                   calculatorData ? 'mortgage_calculator' : 
                   'contact_form') as any,
          status: 'new' as any,
          priority: 'medium' as any,
          assigned_to: undefined,
          form_data: {
            message: formData.message,
            ...(includeCalculatorData && calculatorData && { calculatorData })
          }
        };
        
        await saveLead(leadData);
      }
      
      console.log('Form submitted:', submissionData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          consent: false,
        });
        setSubmitStatus('idle');
        setIncludeCalculatorData(false);
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-zfp-dark border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
                aria-label="Close form"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="mb-8">
                <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange mb-4" />
                <h2 className="text-3xl font-bold mb-2">
                  {title || 'Kontaktujte nás'}
                </h2>
                <p className="text-white/60 text-sm">
                  Rádi s vámi probereme vaši situaci a najdeme nejlepší řešení
                </p>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                >
                  <p className="text-green-400 text-sm">
                    Děkujeme! Vaši zprávu jsme přijali a brzy se vám ozveme.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <p className="text-red-400 text-sm">
                    Něco se pokazilo. Zkuste to prosím znovu nebo nás kontaktujte telefonicky.
                  </p>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-light mb-2 text-white/80">
                    Jméno a příjmení <span className="text-zfp-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-zfp-orange transition-colors"
                    placeholder="Jan Novák"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-light mb-2 text-white/80">
                    E-mail <span className="text-zfp-orange">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-zfp-orange transition-colors"
                    placeholder="jan@email.cz"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-light mb-2 text-white/80">
                    Telefon <span className="text-zfp-orange">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-zfp-orange transition-colors"
                    placeholder="+420 123 456 789"
                  />
                </div>

                {/* Calculator Data Display */}
                {calculatorData && (
                  <CalculatorDataDisplay
                    data={calculatorData}
                    checked={includeCalculatorData}
                    onChange={setIncludeCalculatorData}
                  />
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-light mb-2 text-white/80">
                    Zpráva
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-zfp-orange transition-colors resize-none"
                    placeholder="Popište nám vaši situaci..."
                  />
                </div>

                <div>
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-zfp-orange focus:ring-zfp-orange focus:ring-offset-0"
                    />
                    <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
                      Souhlasím se zpracováním osobních údajů za účelem zodpovězení mého dotazu. 
                      Více informací v <a href="/ochrana-osobnich-udaju" className="text-zfp-orange hover:underline">podmínkách ochrany osobních údajů</a>.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Odesílám...' : 'Odeslat zprávu'}
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-white/40 mb-4">
                  Nebo nás kontaktujte přímo:
                </p>
                <div className="space-y-2 text-sm">
                  <a href="tel:+420123456789" className="flex items-center text-white/60 hover:text-zfp-orange transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +420 123 456 789
                  </a>
                  <a href="mailto:breclav@zfp.cz" className="flex items-center text-white/60 hover:text-zfp-orange transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    breclav@zfp.cz
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
