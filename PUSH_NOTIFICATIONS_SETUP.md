# 🔔 PUSH NOTIFIKACE - SETUP GUIDE

## ❌ PROČ NEFUNGUJÍ:

Push notifikace jsou povolené v UI, ale **NECHODÍ** protože:

### **Chybí VAPID klíče!**

VAPID (Voluntary Application Server Identification) klíče jsou potřeba pro komunikaci mezi serverem a push servisem (FCM, APNs, atd).

---

## ✅ JAK TO OPRAVIT:

### **KROK 1: Vygeneruj VAPID klíče**

Máš 2 možnosti:

#### **A) Online generátor (nejjednodušší):**
```
1. Jdi na: https://vapidkeys.com
2. Klikni "Generate VAPID Keys"
3. Zkopíruj:
   - Public Key
   - Private Key
```

#### **B) NPM balíček:**
```bash
npx web-push generate-vapid-keys
```

Dostaneš output:
```
Public Key: BJw...
Private Key: Xk...
```

---

### **KROK 2: Přidej klíče do .env.local**

```env
# .env.local

# VAPID Public Key (frontend)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BJw...tvůj-public-key...

# VAPID Private Key (backend - NEVER commit!)
VAPID_PRIVATE_KEY=Xk...tvůj-private-key...
```

⚠️ **DŮLEŽITÉ:**
- Public key = `NEXT_PUBLIC_` prefix (dostupný v browseru)
- Private key = BEZ prefixu (pouze server-side)
- Private key NIKDY necommituj do gitu!

---

### **KROK 3: Přidej klíče do Vercel**

```
1. Vercel Dashboard → Tvůj projekt
2. Settings → Environment Variables
3. Přidej:
   - NEXT_PUBLIC_VAPID_PUBLIC_KEY = tvůj-public-key
   - VAPID_PRIVATE_KEY = tvůj-private-key
4. Nastav pro: Production, Preview, Development
5. Save
6. Redeploy
```

---

### **KROK 4: Nastav Supabase Edge Function (optional)**

Pro plnou funkčnost potřebuješ backend endpoint který pošle notifikace.

#### **A) Vytvoř Edge Function:**

```bash
# V Supabase projektu
supabase functions new send-push-notification
```

#### **B) Kód funkce:**

```typescript
// supabase/functions/send-push-notification/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import webpush from "npm:web-push@3.5.0"

serve(async (req) => {
  try {
    const { subscription, payload } = await req.json()
    
    // Set VAPID keys
    webpush.setVapidDetails(
      'mailto:info@zfpgroup.cz',
      Deno.env.get('VAPID_PUBLIC_KEY')!,
      Deno.env.get('VAPID_PRIVATE_KEY')!
    )
    
    // Send notification
    await webpush.sendNotification(subscription, JSON.stringify(payload))
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
```

#### **C) Deploy funkce:**

```bash
supabase functions deploy send-push-notification
```

#### **D) Nastav secrets:**

```bash
supabase secrets set VAPID_PUBLIC_KEY=tvůj-public-key
supabase secrets set VAPID_PRIVATE_KEY=tvůj-private-key
```

---

## 🔍 OVĚŘENÍ ŽE TO FUNGUJE:

### **Test 1: Service Worker**
```
1. Otevři DevTools (F12)
2. Application → Service Workers
3. Měl bys vidět: sw.js (activated)
```

### **Test 2: Subscription**
```
1. Otevři /crm/dashboard
2. Klikni "Povolit notifikace"
3. Browser prompt: Povolit
4. DevTools → Application → Push Messaging
5. Měl bys vidět subscription object
```

### **Test 3: Pošli test notifikaci**
```javascript
// V DevTools Console:
navigator.serviceWorker.ready.then(registration => {
  registration.showNotification('Test Notifikace', {
    body: 'Tohle je test',
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-72x72.png'
  });
});
```

---

## 📱 DEVICE-SPECIFIC:

### **iOS:**
```
- Push notifikace fungují od iOS 16.4+
- Musí být instalováno jako PWA (Add to Home Screen)
- Nefunguje v Safari browseru!
```

### **Android:**
```
- Funguje všude (Chrome, Firefox, Edge)
- Funguje i bez PWA instalace
- Nejlepší support
```

### **Desktop:**
```
- Chrome: ✅ Full support
- Firefox: ✅ Full support
- Edge: ✅ Full support
- Safari: ⚠️ Limited support
```

---

## 🛠️ TROUBLESHOOTING:

### **"Permission denied"**
```
- User zakázal notifikace v browseru
- Settings → Site Settings → Notifications → Allow
```

### **"Service Worker not registered"**
```
- Zkontroluj že sw.js existuje v /public
- Zkontroluj že je HTTPS (ne HTTP)
- Clear cache a refresh
```

### **"VAPID key is required"**
```
- Chybí NEXT_PUBLIC_VAPID_PUBLIC_KEY v .env.local
- Restartuj dev server: npm run dev
```

### **"Subscription failed"**
```
- Neplatný VAPID key
- Vygeneruj nový pár klíčů
- Update .env.local a Vercel variables
```

---

## 🎯 JAK TO POUŽÍT:

### **Automatické notifikace při nové poptávce:**

```typescript
// app/api/leads/route.ts

export async function POST(req: Request) {
  const lead = await req.json();
  
  // Save lead to database
  await saveLead(lead);
  
  // Send push notification to all subscribed advisors
  await sendPushNotification({
    title: 'Nová poptávka!',
    body: `${lead.first_name} ${lead.last_name} - ${lead.source}`,
    url: `/crm/leads/${lead.id}`,
    leadId: lead.id
  });
  
  return Response.json({ success: true });
}
```

---

## 📊 MONITORING:

### **Log všech notifikací:**

```sql
-- Supabase: Create notifications table
CREATE TABLE push_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  clicked BOOLEAN DEFAULT false,
  clicked_at TIMESTAMPTZ
);
```

---

## ✅ CHECKLIST:

- [ ] Vygenerovat VAPID klíče
- [ ] Přidat do .env.local
- [ ] Přidat do Vercel Environment Variables
- [ ] Restartovat dev server
- [ ] Redeploy na production
- [ ] Test: DevTools → Service Worker registered?
- [ ] Test: Povolit notifikace v CRM
- [ ] Test: Poslat test notifikaci
- [ ] Vytvořit Edge Function (optional)
- [ ] Setup monitoring table (optional)

---

## 🚀 READY!

Po dokončení těchto kroků budou push notifikace **plně funkční**! 🎉

**Pro další pomoc:**
- Web Push docs: https://web.dev/push-notifications/
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- VAPID spec: https://datatracker.ietf.org/doc/html/rfc8292
