'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  subscribeToPushNotifications, 
  unsubscribeFromPushNotifications,
  getNotificationPermission,
  isPushNotificationSupported,
  requestNotificationPermission,
  getServiceWorkerRegistration
} from '@/utils/pushNotifications';

interface PushNotificationContextType {
  isSupported: boolean;
  permission: NotificationPermission;
  isSubscribed: boolean;
  isLoading: boolean;
  error: string | null;
  subscribe: () => Promise<boolean>;
  unsubscribe: () => Promise<boolean>;
  requestPermission: () => Promise<NotificationPermission>;
  clearError: () => void;
}

const PushNotificationContext = createContext<PushNotificationContextType | undefined>(undefined);

export function usePushNotifications() {
  const context = useContext(PushNotificationContext);
  if (!context) {
    throw new Error('usePushNotifications must be used within PushNotificationProvider');
  }
  return context;
}

interface PushNotificationProviderProps {
  children: ReactNode;
}

export default function PushNotificationProvider({ children }: PushNotificationProviderProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  useEffect(() => {
    // Check if push notifications are supported
    const supported = isPushNotificationSupported();
    setIsSupported(supported);
    setPermission(getNotificationPermission());

    // Register service worker early and check subscription status
    if (supported) {
      initServiceWorker();
    }
  }, []);

  const initServiceWorker = async () => {
    try {
      console.log('[Push Provider] Initializing Service Worker...');
      const registration = await getServiceWorkerRegistration();
      
      if (registration) {
        console.log('[Push Provider] SW ready, checking subscription...');
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
        console.log('[Push Provider] Subscription exists:', !!subscription);
      }
    } catch (error) {
      console.error('[Push Provider] Error initializing:', error);
    }
  };

  const subscribe = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const subscription = await subscribeToPushNotifications();
      const success = !!subscription;
      setIsSubscribed(success);
      if (success) {
        setPermission('granted');
      }
      return success;
    } catch (err: any) {
      console.error('Error subscribing to push notifications:', err);
      setError(err.message || 'Nepodařilo se zapnout notifikace');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = await unsubscribeFromPushNotifications();
      if (success) {
        setIsSubscribed(false);
      }
      return success;
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermission = async (): Promise<NotificationPermission> => {
    const perm = await requestNotificationPermission();
    setPermission(perm);
    return perm;
  };

  const value: PushNotificationContextType = {
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    error,
    subscribe,
    unsubscribe,
    requestPermission,
    clearError,
  };

  return (
    <PushNotificationContext.Provider value={value}>
      {children}
    </PushNotificationContext.Provider>
  );
}
