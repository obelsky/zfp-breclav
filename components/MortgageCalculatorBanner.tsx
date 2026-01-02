'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface MortgageCalculatorBannerProps {
  title: string;
  description?: string;
}

export default function MortgageCalculatorBanner({ 
  title, 
  description = "Zjistěte si výši měsíční splátky, celkové náklady a další parametry hypotéky přesně na míru vaší situaci."
}: MortgageCalculatorBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-12"
    >
      <Link href="/bydleni-hypoteky/kalkulacka#kalkulacka">
        <div className="bg-gradient-to-r from-zfp-gold/10 via-zfp-orange/10 to-zfp-gold/10 border-2 border-zfp-gold/30 rounded-2xl p-6 md:p-8 relative overflow-hidden cursor-pointer group transition-all duration-300 hover:border-zfp-gold/50">
          
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-zfp-gold to-zfp-orange rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-zfp-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                {title}
              </h3>
              <p className="text-white/70 text-sm md:text-base">
                {description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <div className="px-8 py-4 bg-zfp-orange group-hover:bg-zfp-orange-hover text-white font-bold tracking-wider uppercase rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg group-hover:shadow-xl flex items-center gap-2">
                <span>Spočítat</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-zfp-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-zfp-orange/5 rounded-full blur-3xl" />
        </div>
      </Link>
    </motion.div>
  );
}
