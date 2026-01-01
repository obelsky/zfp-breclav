'use client';

import { motion } from 'framer-motion';

interface CalculatorCTAProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  targetId: string;
  accentColor?: string;
}

export default function CalculatorCTA({ 
  icon, 
  title, 
  description, 
  targetId,
  accentColor = 'zfp-gold'
}: CalculatorCTAProps) {
  
  const handleScrollToCalculator = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-12"
    >
      <div className="bg-gradient-to-r from-zfp-gold/10 via-zfp-orange/10 to-zfp-gold/10 border-2 border-zfp-gold/30 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-zfp-gold to-zfp-orange rounded-2xl flex items-center justify-center shadow-lg">
              <div className="text-zfp-darker">
                {icon}
              </div>
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
            <button
              onClick={handleScrollToCalculator}
              className="group px-8 py-4 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-bold tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span>Vyzkoušet</span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>

        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-zfp-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-zfp-orange/5 rounded-full blur-3xl" />
      </div>
    </motion.div>
  );
}
