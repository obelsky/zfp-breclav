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
  console.log('[Push Subscribe] Starting subscription process...');
  
  try {
    // Check VAPID key first
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    console.log('[Push Subscribe] VAPID key present:', !!vapidPublicKey);
    
    if (!vapidPublicKey) {
      console.error('[Push Subscribe] ❌ VAPID public key not configured!');
      throw new Error('VAPID klíč není nakonfigurován. Kontaktujte administrátora.');
    }

    // Request permission first
    console.log('[Push Subscribe] Requesting permission...');
    const permission = await requestNotificationPermission();
    console.log('[Push Subscribe] Permission result:', permission);
    
    if (permission !== 'granted') {
      console.log('[Push Subscribe] Permission denied');
      throw new Error('Notifikace nebyly povoleny v prohlížeči.');
    }

    // Register service worker if not already registered
    console.log('[Push Subscribe] Getting service worker...');
    const registration = await getServiceWorkerRegistration();
    
    if (!registration) {
      console.error('[Push Subscribe] ❌ Service Worker not registered');
      throw new Error('Service Worker není dostupný. Zkuste obnovit stránku.');
    }
    console.log('[Push Subscribe] Service Worker ready');

    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();
    console.log('[Push Subscribe] Existing subscription:', !!subscription);
    
    if (!subscription) {
      console.log('[Push Subscribe] Creating new subscription...');
      
      try {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
        });
        console.log('[Push Subscribe] ✅ Subscription created');
      } catch (subError: any) {
        console.error('[Push Subscribe] ❌ Subscribe failed:', subError);
        throw new Error('Nepodařilo se vytvořit subscription: ' + subError.message);
      }

      // Send subscription to backend
      console.log('[Push Subscribe] Saving to backend...');
      await saveSubscriptionToBackend(subscription);
      console.log('[Push Subscribe] ✅ Saved to backend');
    } else {
      console.log('[Push Subscribe] Using existing subscription');
      // Update backend with existing subscription (in case it was lost)
      await saveSubscriptionToBackend(subscription);
    }

    return subscription;
  } catch (error: any) {
    console.error('[Push Subscribe] ❌ Error:', error);
    throw error; // Re-throw so UI can show the message
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
 * Get service worker registration - waits for SW to be active
 */
export async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service Worker not supported');
    return null;
  }

  try {
    // First, try to register if not already registered
    let registration = await navigator.serviceWorker.getRegistration();
    
    if (!registration) {
      console.log('[SW] Registering new Service Worker...');
      registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('[SW] Service Worker registered');
    }

    // Wait for the service worker to be ready (active)
    console.log('[SW] Waiting for Service Worker to be ready...');
    const readyRegistration = await navigator.serviceWorker.ready;
    console.log('[SW] Service Worker is ready and active');
    
    return readyRegistration;
  } catch (error) {
    console.error('[SW] Service Worker registration failed:', error);
    return null;
  }
}

/**
 * Send a test notification (for testing)
 */
export async function sendTestNotification(payload: Partial<PushNotificationPayload> = {}): Promise<void> {
  console.log('[Push] Sending test notification...');
  
  const permission = await requestNotificationPermission();
  console.log('[Push] Permission:', permission);
  
  if (permission !== 'granted') {
    throw new Error('Notification permission not granted');
  }

  const registration = await getServiceWorkerRegistration();
  console.log('[Push] Service Worker registration:', registration);
  
  if (!registration) {
    throw new Error('Service Worker not registered');
  }

  // Počkej až bude SW aktivní
  if (registration.waiting) {
    console.log('[Push] Waiting for SW to activate...');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Základní notifikace bez ikon (funguje vždy)
  const notificationOptions: NotificationOptions = {
    body: payload.body || 'Toto je testovací notifikace z ZFP Břeclav CRM',
    tag: payload.tag || 'test-notification-' + Date.now(),
    requireInteraction: false,
    silent: false,
    data: {
      url: payload.url || '/crm/dashboard',
      ...payload.data
    }
  };

  // Zkus přidat ikonu (může selhat na některých zařízeních)
  try {
    // Zkontroluj jestli ikona existuje
    const iconResponse = await fetch('/android-chrome-192x192.png', { method: 'HEAD' });
    if (iconResponse.ok) {
      notificationOptions.icon = '/android-chrome-192x192.png';
    }
  } catch (e) {
    console.log('[Push] Icon not available, skipping');
  }

  console.log('[Push] Showing notification with options:', notificationOptions);

  try {
    await registration.showNotification(payload.title || '🔔 Test Notifikace', notificationOptions);
    console.log('[Push] Notification shown successfully!');
  } catch (error) {
    console.error('[Push] Error showing notification:', error);
    
    // Fallback: Použij nativní Notification API
    try {
      console.log('[Push] Trying fallback Notification API...');
      new Notification(payload.title || '🔔 Test Notifikace', {
        body: payload.body || 'Toto je testovací notifikace z ZFP Břeclav CRM',
        tag: 'test-fallback'
      });
      console.log('[Push] Fallback notification shown!');
    } catch (fallbackError) {
      console.error('[Push] Fallback also failed:', fallbackError);
      throw new Error('Nepodařilo se zobrazit notifikaci. Zkuste zavřít a znovu otevřít aplikaci.');
    }
  }
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
    // Get advisor ID from localStorage (set by CRM login)
    let advisorId = null;
    if (typeof window !== 'undefined') {
      const crmUser = localStorage.getItem('crm_user');
      if (crmUser) {
        try {
          const user = JSON.parse(crmUser);
          advisorId = user.id;
        } catch (e) {
          console.log('[Push] No CRM user found');
        }
      }
    }

    console.log('[Push] Saving subscription for advisor:', advisorId);

    const response = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        advisorId,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    });

    const data = await response.json();
    console.log('[Push] Subscription save response:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Failed to save subscription');
    }

    console.log('[Push] Subscription saved to backend');
  } catch (error) {
    console.error('[Push] Error saving subscription:', error);
    // Don't throw - subscription still works locally
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
