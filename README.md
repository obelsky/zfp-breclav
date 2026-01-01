# ZFP Břeclav - Webová prezentace s CRM

Kompletní Next.js 14 web s CRM systémem pro správu poptávek.

## 🚀 Rychlý start

```bash
npm install
npm run dev
```

Otevři: **http://localhost:3000**

**Detailní návod:** otevři **START.md**

---

## 📦 Co obsahuje

### Web (35+ stránek)
- Homepage s plným přehledem služeb
- Služby (hypotéky, investice, pojištění, reality, ...)
- 9 finančních kalkulaček
- eŠanon landing page s QR kódy
- O nás, Kontakt, Blog

### CRM Systém
- URL: `/crm`
- Login: `breclav` / `breclav`
- Dashboard se statistikami
- Správa poptávek
- Filtrace a vyhledávání
- Propojení s formuláři

---

## 🗄️ Databáze

**Lokální (testing):**
- localStorage v prohlížeči
- Skvělé pro vývoj

**Production (Supabase):**
- PostgreSQL databáze
- SQL schéma: `SUPABASE_SQL.sql`
- Setup: viz **START.md**

---

## 🌐 Production deployment

1. **GitHub** - nahrát kód
2. **Vercel** - hosting webu  
3. **Supabase** - databáze

**Návod:** otevři **START.md**

---

## 🔧 Užitečné příkazy

```bash
npm run dev      # Development server
npm run build    # Test production build
npm run start    # Production server
npm run lint     # Kontrola kódu
```

---

## 📁 Struktura

```
zfp-breclav/
├── app/              # Next.js pages
│   ├── crm/         # CRM system
│   ├── sluzby/      # Services
│   └── kalkulacky/  # Calculators
├── components/       # React components
├── contexts/         # React contexts
├── types/           # TypeScript types
├── utils/           # Utilities
└── public/          # Static assets
```

---

## 🆘 Potřebuješ pomoct?

**Otevři START.md** - obsahuje:
- Krok za krokem návod
- Řešení všech problémů
- GitHub + Vercel + Supabase setup

---

## 📝 Technologie

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (production)

---

**Status:** ✅ Production Ready  
**Vytvořeno:** 2024
