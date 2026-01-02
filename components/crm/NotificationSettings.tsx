'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePushNotifications } from './PushNotificationProvider';
import { sendTestNotification } from '@/utils/pushNotifications';

export default function NotificationSettings() {
  const { 
    isSupported, 
    permission, 
    isSubscribed, 
    isLoading,
    subscribe, 
    unsubscribe,
    requestPermission 
  } = usePushNotifications();
  
  const [showSettings, setShowSettings] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);

  const handleToggleNotifications = async () => {
    if (isSubscribed) {
      await unsubscribe();
    } else {
      await subscribe();
    }
  };

  const handleTestNotification = async () => {
    setIsSendingTest(true);
    try {
      await sendTestNotification({
        title: '🔥 Test Notifikace',
        body: 'Push notifikace fungují! Budete dostávat instant upozornění na nové poptávky.',
        url: '/crm/dashboard'
      });
    } catch (error) {
      console.error('Error sending test notification:', error);
      alert('Chyba při odesílání testovací notifikace');
    } finally {
      setIsSendingTest(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-zfp-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-white">Push Notifikace</h3>
            <p className="text-xs text-white/60">
              {isSubscribed ? 'Aktivní' : 'Neaktivní'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-white/5 rounded-lg transition-all"
        >
          <svg 
            className={`w-5 h-5 text-white/60 transition-transform ${showSettings ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4 pt-4 border-t border-white/10"
        >
          {/* Permission Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">Stav oprávnění</span>
            <span className={`text-sm font-semibold ${
              permission === 'granted' ? 'text-green-400' : 
              permission === 'denied' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {permission === 'granted' ? 'Povoleno' : 
               permission === 'denied' ? 'Zakázáno' : 'Nevyžádáno'}
            </span>
          </div>

          {/* Toggle Switch */}
          {permission !== 'denied' && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Povolit notifikace</span>
              <button
                onClick={handleToggleNotifications}
                disabled={isLoading}
                className={`relative w-14 h-8 rounded-full transition-all ${
                  isSubscribed ? 'bg-green-500' : 'bg-white/20'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{ x: isSubscribed ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          )}

          {/* Permission Denied Message */}
          {permission === 'denied' && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-xs text-red-400">
                Notifikace jsou zakázány v nastavení prohlížeče. Pro povolení přejděte do nastavení webu.
              </p>
            </div>
          )}

          {/* Test Notification */}
          {isSubscribed && (
            <button
              onClick={handleTestNotification}
              disabled={isSendingTest}
              className="w-full px-4 py-3 bg-zfp-orange/20 hover:bg-zfp-orange/30 text-zfp-orange rounded-lg transition-all text-sm font-semibold disabled:opacity-50"
            >
              {isSendingTest ? 'Odesílám...' : 'Odeslat testovací notifikaci'}
            </button>
          )}

          {/* Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-xs text-blue-400">
              <strong>Co dostanete:</strong><br/>
              • Instant upozornění na nové poptávky<br/>
              • Možnost převzít poptávku přímo z notifikace<br/>
              • Funguje i když je aplikace zavřená
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
