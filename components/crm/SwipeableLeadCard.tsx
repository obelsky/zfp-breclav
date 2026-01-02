'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Lead } from '@/types/crm';
import { formatDistanceToNow } from 'date-fns';
import { cs } from 'date-fns/locale';

interface SwipeableLeadCardProps {
  lead: Lead;
  onSwipeLeft: () => void;  // Assign to someone else
  onSwipeRight: () => void; // Take the lead
  onTap: () => void;        // View details
}

export default function SwipeableLeadCard({ 
  lead, 
  onSwipeLeft, 
  onSwipeRight, 
  onTap 
}: SwipeableLeadCardProps) {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const SWIPE_THRESHOLD = 100;
    
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      // Swipe detected
      setExitX(info.offset.x > 0 ? 500 : -500);
      
      if (info.offset.x > 0) {
        // Swipe right - take lead
        setTimeout(() => onSwipeRight(), 200);
      } else {
        // Swipe left - assign to someone else
        setTimeout(() => onSwipeLeft(), 200);
      }
    } else {
      // No swipe, return to center
      x.set(0);
    }
  };

  // Determine urgency color
  const getUrgencyColor = () => {
    if (lead.priority === 'high') return 'border-red-500/50 bg-red-500/5';
    if (lead.priority === 'medium') return 'border-yellow-500/50 bg-yellow-500/5';
    return 'border-white/10 bg-white/5';
  };

  // Format amount
  const formatAmount = (amount: any) => {
    if (!amount || !lead.form_data?.calculatorData) return null;
    const num = parseFloat(String(amount));
    if (isNaN(num)) return null;
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 0
    }).format(num);
  };

  const calculatorData = lead.form_data?.calculatorData;
  const amount = calculatorData?.vyseHypoteky || calculatorData?.cenaNemovitosti || null;

  return (
    <motion.div
      className="absolute top-0 left-0 right-0"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileTap={{ scale: 0.95 }}
      onClick={onTap}
    >
      <div className={`relative rounded-3xl border-2 ${getUrgencyColor()} p-6 shadow-2xl backdrop-blur-sm cursor-grab active:cursor-grabbing`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-white">
                {lead.first_name} {lead.last_name}
              </h3>
              {lead.priority === 'high' && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  URGENT
                </span>
              )}
            </div>
            
            {amount && (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-zfp-gold">
                  {formatAmount(amount)}
                </span>
                {calculatorData?.type && (
                  <span className="px-2 py-1 bg-zfp-orange/20 text-zfp-orange text-xs font-semibold rounded-lg uppercase">
                    {calculatorData.type}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="text-xs text-white/50 mb-1">
              {formatDistanceToNow(new Date(lead.created_at), { 
                addSuffix: true, 
                locale: cs 
              })}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm text-white/80 break-all overflow-hidden">{lead.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="text-sm text-white/80 break-all overflow-hidden">{lead.phone}</span>
          </div>
        </div>

        {/* Message Preview */}
        {lead.form_data?.message && (
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <p className="text-sm text-white/70 line-clamp-3">
              "{lead.form_data.message}"
            </p>
          </div>
        )}

        {/* Swipe Instructions */}
        <div className="flex items-center justify-between text-xs text-white/40 mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Přiřadit</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Tap = Detail</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Převzít</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Swipe Indicators (shown during drag) */}
        <motion.div
          className="absolute top-1/2 left-8 -translate-y-1/2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg"
          style={{ opacity: useTransform(x, [-150, -50], [1, 0]) }}
        >
          Přiřadit jinému
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-8 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg"
          style={{ opacity: useTransform(x, [50, 150], [0, 1]) }}
        >
          Převzít poptávku
        </motion.div>
      </div>
    </motion.div>
  );
}
