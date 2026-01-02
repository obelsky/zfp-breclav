'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickActionsProps {
  phone?: string;
  email?: string;
  leadId?: string;
}

export default function QuickActions({ phone, email, leadId }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCall = () => {
    if (phone) {
      window.location.href = `tel:${phone}`;
      setIsOpen(false);
    }
  };

  const handleWhatsApp = () => {
    if (phone) {
      // Remove spaces and format phone number
      const cleanPhone = phone.replace(/\s/g, '').replace(/^\+/, '');
      window.open(`https://wa.me/${cleanPhone}`, '_blank');
      setIsOpen(false);
    }
  };

  const handleEmail = () => {
    if (email) {
      window.location.href = `mailto:${email}`;
      setIsOpen(false);
    }
  };

  const handleSMS = () => {
    if (phone) {
      window.location.href = `sms:${phone}`;
      setIsOpen(false);
    }
  };

  const actions = [
    {
      id: 'call',
      label: 'Zavolat',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      color: 'bg-green-500 hover:bg-green-600',
      onClick: handleCall,
      disabled: !phone,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: 'bg-[#25D366] hover:bg-[#128C7E]',
      onClick: handleWhatsApp,
      disabled: !phone,
    },
    {
      id: 'email',
      label: 'Email',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: handleEmail,
      disabled: !email,
    },
    {
      id: 'sms',
      label: 'SMS',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: handleSMS,
      disabled: !phone,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-20 right-0 space-y-3">
            {actions.filter(action => !action.disabled).map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                onClick={action.onClick}
                className={`${action.color} text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-90`}
                whileTap={{ scale: 0.9 }}
              >
                {action.icon}
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-full shadow-2xl flex items-center justify-center transition-all"
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>

      {/* Labels */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-20 right-20 space-y-3">
            {actions.filter(action => !action.disabled).map((action, index) => (
              <motion.div
                key={`label-${action.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
              >
                {action.label}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
