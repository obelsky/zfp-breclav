'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeableLeadCard from './SwipeableLeadCard';
import { Lead } from '@/types/crm';
import { useRouter } from 'next/navigation';

interface SwipeStackProps {
  leads: Lead[];
  onTakeLead: (leadId: string) => Promise<boolean>;
  onAssignLead: (leadId: string) => void;
  onRefresh: () => void;
}

export default function SwipeStack({ 
  leads, 
  onTakeLead, 
  onAssignLead,
  onRefresh 
}: SwipeStackProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentLead = leads[currentIndex];
  const nextLead = leads[currentIndex + 1];

  const handleSwipeRight = async () => {
    if (!currentLead) return;
    
    setIsLoading(true);
    const success = await onTakeLead(currentLead.id);
    setIsLoading(false);

    if (success) {
      // Show success animation
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
    }
  };

  const handleSwipeLeft = () => {
    if (!currentLead) return;
    
    onAssignLead(currentLead.id);
    setCurrentIndex(prev => prev + 1);
  };

  const handleTap = () => {
    if (!currentLead) return;
    router.push(`/crm/leads/${currentLead.id}`);
  };

  // Reset when all leads are swiped
  useEffect(() => {
    if (currentIndex >= leads.length && leads.length > 0) {
      setTimeout(() => {
        setCurrentIndex(0);
        onRefresh();
      }, 1000);
    }
  }, [currentIndex, leads.length, onRefresh]);

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] text-center px-4">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Skvělá práce! 🎉
        </h3>
        <p className="text-white/60 max-w-sm">
          Momentálně nejsou žádné nové poptávky. Budeme vás informovat, jakmile nějaká přijde.
        </p>
        <button
          onClick={onRefresh}
          className="mt-6 px-6 py-3 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-xl font-semibold transition-all"
        >
          Obnovit
        </button>
      </div>
    );
  }

  if (currentIndex >= leads.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
        >
          <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">
          Všechny poptávky projity!
        </h3>
        <p className="text-white/60">
          Načítám nové poptávky...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Stack of cards */}
      <div className="relative h-[600px]">
        {/* Next card preview (behind) */}
        {nextLead && (
          <motion.div
            className="absolute top-4 left-4 right-4 bottom-4"
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: 0.95, opacity: 0.5 }}
          >
            <div className="bg-white/5 rounded-3xl border border-white/10 h-full backdrop-blur-sm" />
          </motion.div>
        )}

        {/* Current card */}
        <AnimatePresence mode="wait">
          {currentLead && (
            <motion.div
              key={currentLead.id}
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <SwipeableLeadCard
                lead={currentLead}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onTap={handleTap}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Counter */}
      <div className="mt-6 text-center">
        <p className="text-sm text-white/60">
          {currentIndex + 1} / {leads.length}
        </p>
        <div className="flex gap-1 justify-center mt-2">
          {leads.slice(0, Math.min(5, leads.length)).map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === currentIndex 
                  ? 'w-8 bg-zfp-orange' 
                  : idx < currentIndex 
                  ? 'w-4 bg-green-500' 
                  : 'w-4 bg-white/20'
              }`}
            />
          ))}
          {leads.length > 5 && (
            <div className="h-1 w-4 rounded-full bg-white/20" />
          )}
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl flex items-center justify-center">
          <div className="bg-white/10 rounded-2xl p-6">
            <div className="animate-spin w-12 h-12 border-4 border-zfp-orange border-t-transparent rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}
