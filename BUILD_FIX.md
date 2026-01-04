# 🔧 BUILD ERROR FIX GUIDE

## Možné příčiny:

### 1. **Vercel Cache**
Vercel si cachuje build a může používat staré soubory.

**Řešení:**
```bash
# V Vercel dashboardu:
Settings → Build & Development Settings
→ Zkontroluj "Build Command": npm run build
→ Klikni "Redeploy" → ✅ "Clear build cache and retry"
```

### 2. **Missing Dependencies**
Node modules nejsou nainstalovány.

**Řešení:**
```bash
# Lokálně:
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 3. **TypeScript Strict Mode**
Možné type errors v nových souborech.

**Kontrola:**
```bash
# Zkontroluj TypeScript errors:
npm run type-check
# nebo
npx tsc --noEmit
```

### 4. **Environment Variables**
Chybějící env proměnné.

**Řešení:**
```bash
# V Vercel dashboardu:
Settings → Environment Variables
→ Zkontroluj, že máš všechny potřebné proměnné
```

## Rychlá oprava (Vercel):

1. **Jdi na Vercel Dashboard**
2. **Vyber projekt**
3. **Deployments tab**
4. **Klikni na poslední deployment**
5. **⋯ (tři tečky) → Redeploy**
6. **✅ Zaškrtni "Clear build cache and retry"**
7. **Klikni "Redeploy"**

## Rychlá oprava (Lokálně):

```bash
# 1. Clean
rm -rf .next node_modules

# 2. Reinstall
npm install

# 3. Build
npm run build

# 4. Test
npm run dev
```

## Debug Build Locally:

```bash
# Zkus build lokálně s verbose output:
npm run build -- --debug

# Nebo s type checking:
npx tsc --noEmit

# Nebo check specific files:
npx tsc app/o-kancelari/kdo-jsme/layout.tsx --noEmit
```

## Zkontroluj logy:

V Vercel dashboardu klikni na **failed deployment** a podívej se na **Build Logs**.

Hledej:
- `Error:` - konkrétní chyba
- `Type error:` - TypeScript error
- `Module not found:` - chybějící import
- `Unexpected token:` - syntax error

---

**Pokud build stále selhává, pošli mi celý build log z Vercelu!**
