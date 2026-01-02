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
      transition={{ duration: 0.5 }}
      className="my-12"
    >
      <Link href="/bydleni-hypoteky/kalkulacka#kalkulacka">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zfp-orange via-zfp-orange-hover to-orange-700 p-8 md:p-12 group cursor-pointer transition-all hover:shadow-2xl hover:shadow-zfp-orange/20">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-4">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-white">Hypoteční kalkulačka</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {title}
                </h3>
                
                <p className="text-white/90 text-base md:text-lg max-w-2xl">
                  {description}
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <div className="inline-flex items-center gap-3 px-6 py-4 bg-white text-zfp-orange rounded-xl font-semibold group-hover:bg-white/95 transition-all group-hover:scale-105">
                  <span>Spočítat hypotéku</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
