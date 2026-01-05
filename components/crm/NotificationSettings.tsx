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
    error: subscribeError,
    subscribe, 
    unsubscribe,
    requestPermission,
    clearError
  } = usePushNotifications();
  
  const [showSettings, setShowSettings] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);

  const handleToggleNotifications = async () => {
    setTestError(null);
    if (permission === 'granted' && isSubscribed) {
      // User wants to disable
      const success = await unsubscribe();
      if (success) {
        alert('Notifikace vypnuty. Pro úplné zrušení změňte nastavení v prohlížeči.');
      }
    } else {
      // Request permission and subscribe
      const success = await subscribe();
      if (success) {
        console.log('Notifications enabled successfully');
      }
    }
  };

  const handleTestNotification = async () => {
    setIsSendingTest(true);
    setTestError(null);
    try {
      await sendTestNotification({
        title: '🔥 Test Notifikace',
        body: 'Push notifikace fungují! Budete dostávat instant upozornění na nové poptávky.',
        url: '/crm/dashboard'
      });
    } catch (error: any) {
      console.error('Error sending test notification:', error);
      setTestError(error?.message || 'Chyba při odesílání testovací notifikace');
    } finally {
      setIsSendingTest(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-sm">
        <div className="flex items-center gap-2 text-yellow-400">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-xs">Push notifikace nejsou podporovány vaším prohlížečem</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Info */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isSubscribed && permission === 'granted' ? 'bg-green-500/20' : 'bg-orange-500/20'
          }`}>
            <svg className={`w-4 h-4 ${isSubscribed && permission === 'granted' ? 'text-green-400' : 'text-orange-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white">Push notifikace</h3>
            <p className="text-xs text-white/60">
              {isSubscribed && permission === 'granted' ? '✓ Aktivní' : 
               permission === 'denied' ? '✗ Zakázáno' : '○ Neaktivní'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {isSubscribed && permission === 'granted' && (
            <button
              onClick={handleTestNotification}
              disabled={isSendingTest}
              className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded transition-all disabled:opacity-50"
            >
              {isSendingTest ? 'Odesílání...' : 'Test'}
            </button>
          )}
          <button
            onClick={handleToggleNotifications}
            disabled={isLoading || permission === 'denied'}
            className={`px-3 py-1.5 text-xs rounded transition-all font-medium ${
              isSubscribed && permission === 'granted'
                ? 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                : 'bg-zfp-orange hover:bg-zfp-orange-hover text-white'
            }`}
          >
            {isLoading ? 'Načítání...' : (isSubscribed && permission === 'granted') ? 'Vypnout' : 'Zapnout'}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 hover:bg-white/5 rounded transition-all"
            title="Nastavení"
          >
            <svg 
              className={`w-4 h-4 text-white/60 transition-transform ${showSettings ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Subscribe Error */}
      {subscribeError && (
        <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start justify-between">
          <p className="text-xs text-red-400">{subscribeError}</p>
          <button 
            onClick={clearError}
            className="text-red-400 hover:text-red-300 ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

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
                  permission === 'granted' ? 'bg-green-500' : 'bg-white/20'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{ x: permission === 'granted' ? 24 : 0 }}
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
          {permission === 'granted' && (
            <button
              onClick={handleTestNotification}
              disabled={isSendingTest}
              className="w-full px-4 py-3 bg-zfp-orange/20 hover:bg-zfp-orange/30 text-zfp-orange rounded-lg transition-all text-sm font-semibold disabled:opacity-50"
            >
              {isSendingTest ? 'Odesílám...' : 'Odeslat testovací notifikaci'}
            </button>
          )}

          {/* Test Error */}
          {testError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start justify-between">
              <p className="text-xs text-red-400">{testError}</p>
              <button 
                onClick={() => setTestError(null)}
                className="text-red-400 hover:text-red-300 ml-2"
              >
                Zavřít
              </button>
            </div>
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
