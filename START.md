# 🚀 JAK ZAČÍT

## ⚡ RYCHLÝ START (2 MINUTY)

### 1. Otevři ve VS Code
```
File → Open Folder → vyber složku zfp-breclav
```

### 2. Otevři terminál
```
View → Terminal (nebo Ctrl+`)
```

### 3. Nainstaluj a spusť
```bash
npm install
npm run dev
```

### 4. Otevři prohlížeč
```
http://localhost:3000
```

**✅ Web běží!**

---

## 🔧 POKUD VIDÍŠ EMOTIKONY (místo SVG ikon)

```bash
# Zastav server (Ctrl+C)
rm -rf .next
npm run dev
# V prohlížeči: Ctrl+Shift+R
```

---

## 📤 NAHRÁT NA GITHUB (5 MINUT)

### 1. Vytvoř GitHub repository
- Jdi na https://github.com/new
- Repository name: `zfp-breclav`
- Private nebo Public
- **NEVYBER** "Initialize with README"
- Create repository

### 2. V terminálu VS Code:
```bash
# Inicializuj git
git init

# Přidej soubory (node_modules se automaticky ignorují!)
git add .

# Commit
git commit -m "Initial commit"

# Připoj GitHub (NAHRAĎ 'tvuj-username'!)
git remote add origin https://github.com/tvuj-username/zfp-breclav.git

# Push
git push -u origin main
```

**✅ Kód na GitHubu!**

**Velikost: ~2-3 MB** (node_modules se NEnahrávají!)

---

## 🌐 DEPLOY NA VERCEL (5 MINUT)

### 1. Jdi na Vercel
```
https://vercel.com
Sign up with GitHub
```

### 2. Import projektu
```
Dashboard → Add New → Project
Import zfp-breclav repository
```

### 3. Konfigurace
```
Framework: Next.js ✓ (auto-detected)
Build Command: npm run build ✓
Output Directory: .next ✓

Environment Variables:
  NEXT_PUBLIC_SUPABASE_URL = (zatím prázdné)
  NEXT_PUBLIC_SUPABASE_ANON_KEY = (zatím prázdné)

Deploy!
```

**✅ Web je LIVE!**

---

## 🗄️ SUPABASE DATABÁZE (10 MINUT)

### 1. Vytvoř Supabase projekt
```
https://supabase.com
New project:
  - Name: zfp-breclav-crm
  - Password: [silné heslo - ULOŽ SI!]
  - Region: Europe (Frankfurt)
```

### 2. Spusť SQL
```
1. Levé menu → SQL Editor
2. New query
3. Otevři soubor SUPABASE_SQL.sql (v projektu)
4. Zkopíruj CELÝ obsah
5. Vlož do editoru
6. Run
```

### 3. Získej API klíče
```
1. Project Settings → API
2. Zkopíruj:
   - Project URL
   - anon public key
```

### 4. Přidej do Vercelu
```
1. Vercel Dashboard → tvůj projekt
2. Settings → Environment Variables
3. Přidej:
   NEXT_PUBLIC_SUPABASE_URL = [tvoje URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [tvůj key]
4. Deployments → Redeploy
```

**✅ CRM s databází funguje!**

---

## 🎯 DENNÍ WORKFLOW

```bash
# Ráno
npm run dev

# Během dne
# - Změň kód
# - Ulož (Ctrl+S)
# - Prohlížeč se auto-refresh

# Večer (když chceš deploynout změny)
git add .
git commit -m "popis změny"
git push

# Vercel auto-deployne za 2 min!
```

---

## ✅ KONTROLA ŽE VŠE FUNGUJE

- [ ] `npm install` úspěšný
- [ ] `npm run dev` běží
- [ ] Web otevřený na http://localhost:3000
- [ ] Vidíš SVG ikony (ne emotikony)
- [ ] CRM funguje na /crm (login: breclav/breclav)
- [ ] GitHub repository vytvořen
- [ ] `git push` úspěšný (velikost ~2-3 MB)
- [ ] Vercel deployment úspěšný
- [ ] Web běží live

---

## 🆘 ŘEŠENÍ PROBLÉMŮ

### "npm: command not found"
```
→ Nainstaluj Node.js: https://nodejs.org
```

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### Emotikony místo ikon
```bash
rm -rf .next
npm run dev
# Ctrl+Shift+R v prohlížeči
```

### Git push - node_modules error
```
→ NEMŮŽE SE STÁT! .gitignore je správně
→ Pokud se stane: smaž .git a začni znovu
```

### Vercel build failed
```
→ Zkontroluj že máš environment variables
→ Redeploy
```

---

## 📁 CO JE V PROJEKTU

```
zfp-breclav/
├── START.md              ← Tento soubor
├── README.md             ← Info o projektu
├── SUPABASE_SQL.sql      ← SQL pro databázi
├── app/                  → Všechny stránky
├── components/           → React komponenty
├── types/                → TypeScript typy
├── utils/                → Utility funkce
└── public/              → Obrázky, loga
```

---

## 📖 DALŠÍ DOKUMENTACE

- **QUICK_START_VSCODE.md** - Detailní návod s příkazy
- **PRODUCTION_DEPLOYMENT.md** - Advanced production setup
- **SUPABASE_SQL.sql** - Databázové schéma

---

**Hotovo! Máš funkční web!** 🎉

**Pro produkci:** Následuj sekce GitHub + Vercel + Supabase
