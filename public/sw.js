// ZFP Břeclav - Master Prototyp Service Worker
// Push Notifications + Offline Support + Background Sync

const CACHE_NAME = 'zfp-breclav-v1';
const RUNTIME_CACHE = 'zfp-runtime-v1';

// Essential files to cache for offline
const PRECACHE_URLS = [
  '/crm/dashboard',
  '/crm/leads',
  '/offline',
  '/zfp-breclav-logo.png',
  '/favicon-192x192.png',
];

// Install - cache essential resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome extensions
  if (event.request.url.startsWith('chrome-extension://')) return;

  event.respondWith(
    caches.open(RUNTIME_CACHE).then(cache => {
      return fetch(event.request)
        .then(response => {
          // Cache successful responses
          if (response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return cache.match(event.request)
            .then(cached => cached || caches.match('/offline'));
        });
    })
  );
});

// Push Notification - Handle incoming push
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);
  
  let notificationData = {
    title: 'Nová poptávka',
    body: 'Máte novou poptávku k vyřízení',
    icon: '/android-chrome-192x192.png',
    tag: 'new-lead',
    requireInteraction: true,
    actions: [
      { action: 'open', title: 'Otevřít' },
      { action: 'later', title: 'Později' }
    ],
    data: {
      url: '/crm/leads'
    }
  };

  // Parse push data if available
  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        ...notificationData,
        title: data.title || notificationData.title,
        body: data.body || notificationData.body,
        data: {
          url: data.url || notificationData.data.url,
          leadId: data.leadId,
          ...data.data
        },
        actions: data.actions || notificationData.actions
      };
    } catch (e) {
      console.error('[SW] Error parsing push data:', e);
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

// Notification Click - Handle user interaction
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click:', event);
  
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/crm/dashboard';
  const action = event.action;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(windowClients => {
        // Check if there's already a window open
        for (let client of windowClients) {
          if (client.url.includes('/crm') && 'focus' in client) {
            return client.focus().then(client => {
              // Navigate to the lead if action is 'open'
              if (action === 'open' || !action) {
                return client.navigate(urlToOpen);
              }
              return client;
            });
          }
        }
        
        // No window open, open new one
        if (action === 'open' || !action) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Background Sync - Sync data when connection is restored
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-leads') {
    event.waitUntil(
      // Sync pending changes when back online
      fetch('/api/crm/sync', { method: 'POST' })
        .then(response => console.log('[SW] Sync complete'))
        .catch(err => console.error('[SW] Sync failed:', err))
    );
  }
});

// Periodic Background Sync - Check for new leads periodically
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-new-leads') {
    event.waitUntil(
      fetch('/api/crm/check-new-leads')
        .then(response => response.json())
        .then(data => {
          if (data.hasNewLeads) {
            return self.registration.showNotification('Máte nové poptávky!', {
              body: `${data.count} nových poptávek čeká na vyřízení`,
              icon: '/android-chrome-192x192.png',
              tag: 'new-leads-check',
              data: { url: '/crm/leads?filter=new' }
            });
          }
        })
        .catch(err => console.error('[SW] Periodic sync failed:', err))
    );
  }
});

console.log('[SW] Service Worker loaded - ZFP Břeclav Master Prototyp v1');
