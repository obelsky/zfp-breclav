# VAPID Keys Setup Guide for ZFP Břeclav Push Notifications

## Co jsou VAPID klíče?

VAPID (Voluntary Application Server Identification) klíče slouží k autentizaci vašeho serveru při odesílání push notifikací. Jsou potřeba pro bezpečnou komunikaci mezi vaším backendem a push notifikačními službami prohlížečů.

## Quick Setup (3 kroky):

### 1. Vygenerujte VAPID klíče

Použijte `web-push` npm balíček:

```bash
npx web-push generate-vapid-keys
```

Výstup:
```
=======================================
Public Key:
BEl62iUYgUivxIkv69yViEuiBIa-Ib27SzV8-4_iyQgF4Yh-QYoH9E3SsIJ4Cxf3
...

Private Key:
VCxH1zNdKRjyEDPPPgP_xL4fI2UG8qKz7WKqF4h2_xA
...
=======================================
```

### 2. Přidejte do .env.local

Vytvořte soubor `.env.local` v rootu projektu:

```env
# VAPID Keys for Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BEl62iUYgUivxIkv69yViEuiBIa-Ib27SzV8-4_iyQgF4Yh-QYoH9E3SsIJ4Cxf3...
VAPID_PRIVATE_KEY=VCxH1zNdKRjyEDPPPgP_xL4fI2UG8qKz7WKqF4h2_xA...
VAPID_SUBJECT=mailto:breclav@zfp.cz
```

**DŮLEŽITÉ:** 
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` - Public key (prefix NEXT_PUBLIC_ znamená že je dostupný v browseru)
- `VAPID_PRIVATE_KEY` - Private key (BEZ prefixu = server-only, NIKDY nesdílet!)
- `VAPID_SUBJECT` - Email nebo URL pro identifikaci

### 3. Restart dev serveru

```bash
npm run dev
```

---

## Jak to funguje:

### Frontend (Browser):
1. Service Worker se zaregistruje
2. User klikne "Povolit notifikace"
3. Browser vygeneruje PushSubscription s public VAPID key
4. Subscription se uloží do Supabase

### Backend (Supabase Edge Function nebo API Route):
1. Nová poptávka přijde
2. Backend najde všechny aktivní subscriptions
3. Odešle push notifikaci pomocí private VAPID key
4. Push service (Firebase/browser) doručí notifikaci

---

## Supabase Integration:

### Create push_subscriptions table:

```sql
create table push_subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  subscription jsonb not null,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table push_subscriptions enable row level security;

-- Policy: Users can only manage their own subscriptions
create policy "Users can manage their subscriptions"
  on push_subscriptions
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### Create API routes:

**app/api/push/subscribe/route.ts:**
```typescript
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { subscription } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('push_subscriptions')
    .upsert({
      user_id: user.id,
      subscription,
      user_agent: request.headers.get('user-agent'),
      updated_at: new Date().toISOString()
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

**app/api/push/send/route.ts:**
```typescript
import { NextResponse } from 'next/server';
import webPush from 'web-push';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Configure web-push with VAPID keys
webPush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
  const { title, body, url, leadId } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  // Get all active subscriptions
  const { data: subscriptions } = await supabase
    .from('push_subscriptions')
    .select('subscription');

  if (!subscriptions || subscriptions.length === 0) {
    return NextResponse.json({ message: 'No subscriptions found' });
  }

  // Send notification to all subscriptions
  const notifications = subscriptions.map(({ subscription }) =>
    webPush.sendNotification(
      subscription,
      JSON.stringify({
        title,
        body,
        url,
        leadId,
        actions: [
          { action: 'open', title: 'Otevřít' },
          { action: 'later', title: 'Později' }
        ]
      })
    ).catch(err => {
      console.error('Error sending push notification:', err);
      // Delete invalid subscriptions
      if (err.statusCode === 410) {
        supabase
          .from('push_subscriptions')
          .delete()
          .eq('subscription', subscription);
      }
    })
  );

  await Promise.allSettled(notifications);

  return NextResponse.json({ 
    success: true, 
    sent: subscriptions.length 
  });
}
```

---

## Testování:

### 1. V prohlížeči:
```javascript
// Open DevTools Console
await Notification.requestPermission();
// Should show "granted"
```

### 2. Odeslat test notifikaci:
```bash
curl -X POST http://localhost:3000/api/push/send \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Notifikace",
    "body": "Toto je test",
    "url": "/crm/dashboard"
  }'
```

---

## Production Deployment:

### Vercel:
1. Přejděte do Settings → Environment Variables
2. Přidejte:
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
   - `VAPID_PRIVATE_KEY`
   - `VAPID_SUBJECT`
3. Redeploy

### Testing on mobile:
- PWA musí být nainstalováno
- HTTPS je povinné (localhost funguje bez)
- iOS Safari nepodporuje push notifications (zatím)
- Android Chrome/Firefox/Edge fungují perfektně

---

## Troubleshooting:

### Notifikace nefungují:
1. Check VAPID keys jsou správně nastavené
2. Check service worker je zaregistrovaný: `navigator.serviceWorker.getRegistration()`
3. Check permission: `Notification.permission` === 'granted'
4. Check subscription exists v Supabase

### iOS nepodporuje push:
- iOS Safari nepodporuje Web Push API
- Alternativa: Progressive Web App + Badge API
- Nebo native iOS app

---

## Další kroky:

1. ✅ Vygenerovat VAPID keys
2. ✅ Přidat do .env.local
3. ✅ Vytvořit Supabase tabulku
4. ✅ Implementovat API routes
5. ✅ Test na localhost
6. ✅ Deploy na Vercel
7. ✅ Test na produkci

**Ready to go! 🚀**
