// Push Notifications Utilities for ZFP Břeclav Master Prototyp

export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  url?: string;
  leadId?: string;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
  data?: any;
}

/**
 * Request permission for push notifications
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
}

/**
 * Subscribe user to push notifications
 */
export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  try {
    // Request permission first
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    // Register service worker if not already registered
    const registration = await getServiceWorkerRegistration();
    if (!registration) {
      console.error('Service Worker not registered');
      return null;
    }

    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      // Subscribe to push notifications
      // Note: In production, you'll need to get VAPID keys from Supabase or your push service
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
        )
      });

      // Send subscription to backend
      await saveSubscriptionToBackend(subscription);
    }

    return subscription;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return null;
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    const registration = await getServiceWorkerRegistration();
    if (!registration) return false;

    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      await removeSubscriptionFromBackend(subscription);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error unsubscribing from push notifications:', error);
    return false;
  }
}

/**
 * Get service worker registration
 */
export async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    return null;
  }

  try {
    let registration = await navigator.serviceWorker.getRegistration();
    
    if (!registration) {
      registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('Service Worker registered:', registration);
    }

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
}

/**
 * Send a test notification (for testing)
 */
export async function sendTestNotification(payload: Partial<PushNotificationPayload> = {}): Promise<void> {
  const permission = await requestNotificationPermission();
  
  if (permission !== 'granted') {
    throw new Error('Notification permission not granted');
  }

  const registration = await getServiceWorkerRegistration();
  if (!registration) {
    throw new Error('Service Worker not registered');
  }

  await registration.showNotification(payload.title || 'Test Notifikace', {
    body: payload.body || 'Toto je testovací notifikace z ZFP Břeclav',
    icon: payload.icon || '/android-chrome-192x192.png',
    badge: payload.badge || '/favicon-72x72.png',
    tag: payload.tag || 'test-notification',
    requireInteraction: false,
    actions: payload.actions || [
      { action: 'open', title: 'Otevřít' },
      { action: 'close', title: 'Zavřít' }
    ],
    data: {
      url: payload.url || '/crm/dashboard',
      ...payload.data
    }
  });
}

/**
 * Check if push notifications are supported
 */
export function isPushNotificationSupported(): boolean {
  return 'Notification' in window && 
         'serviceWorker' in navigator && 
         'PushManager' in window;
}

/**
 * Check current notification permission status
 */
export function getNotificationPermission(): NotificationPermission {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

/**
 * Save push subscription to backend (Supabase)
 */
async function saveSubscriptionToBackend(subscription: PushSubscription): Promise<void> {
  try {
    const response = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save subscription');
    }

    console.log('Push subscription saved to backend');
  } catch (error) {
    console.error('Error saving subscription:', error);
    throw error;
  }
}

/**
 * Remove push subscription from backend
 */
async function removeSubscriptionFromBackend(subscription: PushSubscription): Promise<void> {
  try {
    const response = await fetch('/api/push/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: subscription.toJSON()
      })
    });

    if (!response.ok) {
      throw new Error('Failed to remove subscription');
    }

    console.log('Push subscription removed from backend');
  } catch (error) {
    console.error('Error removing subscription:', error);
    throw error;
  }
}

/**
 * Convert VAPID key from base64 to Uint8Array
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Request periodic background sync permission (if supported)
 */
export async function requestPeriodicBackgroundSync(): Promise<boolean> {
  try {
    const registration = await getServiceWorkerRegistration();
    if (!registration) return false;

    // Check if periodic sync is supported
    if ('periodicSync' in registration) {
      const status = await (navigator as any).permissions.query({
        name: 'periodic-background-sync',
      });

      if (status.state === 'granted') {
        // Register periodic sync to check for new leads every hour
        await (registration as any).periodicSync.register('check-new-leads', {
          minInterval: 60 * 60 * 1000, // 1 hour
        });
        console.log('Periodic background sync registered');
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error registering periodic sync:', error);
    return false;
  }
}
