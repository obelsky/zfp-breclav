# 🔔 PUSH NOTIFIKACE - KOMPLETNÍ SETUP

## 📋 PŘEHLED

Push notifikace umožňují posílat upozornění na nové poptávky i když je CRM zavřené.

### Jak to funguje:
1. Poradce povolí notifikace v CRM
2. Browser vytvoří "subscription" (unikátní endpoint)
3. Subscription se uloží do Supabase
4. Když přijde nová poptávka, server pošle push všem subscriberům

---

## 🚀 SETUP - KROK ZA KROKEM

### KROK 1: Vytvořit tabulku v Supabase

Spusť SQL v **Supabase Dashboard → SQL Editor**:

```sql
-- Viz soubor: supabase-push-subscriptions.sql
```

### KROK 2: Vygenerovat VAPID klíče

VAPID klíče jsou potřeba pro autentizaci push notifikací.

**Možnost A - Online generátor:**
https://vapidkeys.com/

**Možnost B - Pomocí Node.js:**
```bash
npx web-push generate-vapid-keys
```

Dostaneš něco jako:
```
Public Key:  BEl62iUYgUiv...
Private Key: UUxI4O8r3kdf...
```

### KROK 3: Nastavit environment variables

V **Vercel Dashboard → Settings → Environment Variables** přidej:

```
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BEl62iUYgUiv...
VAPID_PRIVATE_KEY=UUxI4O8r3kdf...
```

**DŮLEŽITÉ:** 
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` musí být PUBLIC (viditelný v browseru)
- `VAPID_PRIVATE_KEY` musí být SECRET (pouze server)

### KROK 4: Nainstalovat web-push (volitelné)

Pro skutečné posílání push notifikací ze serveru:

```bash
npm install web-push
```

Pak odkomentuj kód v `app/api/push/send/route.ts`.

---

## 🧪 TESTOVÁNÍ

### Test 1: Lokální notifikace
1. Otevři CRM → Dashboard
2. Klikni "Zapnout" notifikace
3. Klikni "Test" → měla by přijít notifikace

### Test 2: Push při novém leadu
1. Otevři web v jiném tabu/zařízení
2. Odešli kontaktní formulář
3. V CRM by měla přijít push notifikace

---

## 🔧 TROUBLESHOOTING

### "VAPID keys not configured"
→ Nastav VAPID_PRIVATE_KEY v environment variables

### "No subscriptions found"
→ Poradce musí povolit notifikace v CRM

### "Push table not ready"
→ Spusť supabase-push-subscriptions.sql

### Notifikace nepřicházejí na iOS
→ iOS vyžaduje:
- iOS 16.4+
- PWA musí být nainstalovaná (Add to Home Screen)
- Povolení v systémovém nastavení

---

## 📁 SOUBORY

| Soubor | Popis |
|--------|-------|
| `utils/pushNotifications.ts` | Client-side push funkce |
| `app/api/push/subscribe/route.ts` | API pro ukládání subscriptions |
| `app/api/push/send/route.ts` | API pro posílání notifikací |
| `public/sw.js` | Service Worker |
| `supabase-push-subscriptions.sql` | SQL pro tabulku |

---

## 🔐 BEZPEČNOST

- VAPID_PRIVATE_KEY nikdy nesdílej!
- Subscriptions jsou vázané na zařízení/browser
- Push endpoint je unikátní URL - nelze zneužít
