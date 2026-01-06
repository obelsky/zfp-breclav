# CMS PRO ZFP BŘECLAV - DOKUMENTACE

## 📋 PŘEHLED

CMS systém pro správu článků v poradně s důrazem na EEAT/YMYL standardy.

### Funkce:
- ✅ WYSIWYG editor (TipTap)
- ✅ Kategorie článků
- ✅ SEO metadata (meta title, description, keywords)
- ✅ Stavy: Draft / K revizi / Publikováno / Archivováno
- ✅ EEAT podpora (autor, recenzent, zdroje, disclaimer)
- ✅ Jeden login pro CRM i CMS
- ✅ Přístup do CMS přes checkbox v nastavení poradce

---

## 🚀 INSTALACE

### 1. Spusť SQL v Supabase

Otevři **Supabase → SQL Editor** a spusť obsah souboru:
```
supabase-cms-schema.sql
```

Tím se vytvoří:
- Nové sloupce v tabulce `advisors` (cms_access, bio, photo_url, atd.)
- Tabulka `article_categories` s výchozími kategoriemi
- Tabulka `articles` s plnou SEO/EEAT podporou
- Tabulka `tags` a `article_tags`
- Tabulka `article_revisions`
- Tabulka `media`
- RLS policies
- Indexy a funkce

### 2. Deploy na Vercel

```bash
git add -A
git commit -m "feat: CMS systém pro správu článků"
git push origin main
```

### 3. Nastav CMS přístup poradcům

1. Jdi do **CRM → Poradci**
2. Uprav poradce
3. Zaškrtni **"Přístup do CMS"**
4. Ulož

---

## 📁 STRUKTURA SOUBORŮ

```
/app/admin/
├── layout.tsx          # Admin layout se sidebar
├── page.tsx            # Dashboard
├── login/
│   └── page.tsx        # Login (sdílený s CRM)
└── clanky/
    ├── page.tsx        # Seznam článků
    ├── novy/
    │   └── page.tsx    # Nový článek
    └── [id]/
        └── page.tsx    # Editace článku

/components/admin/
└── TipTapEditor.tsx    # WYSIWYG editor

/supabase-cms-schema.sql  # Databázové schéma
```

---

## 🔐 PŘÍSTUPOVÁ PRÁVA

| Role | CRM | CMS |
|------|-----|-----|
| Admin | ✅ Vše | ✅ Vše |
| Poradce | ✅ Své leady | ❌ Nemá |
| Poradce + CMS | ✅ Své leady | ✅ Články |

### Jak povolit CMS přístup:
1. V CRM → Poradci → Upravit
2. Zaškrtnout **"Přístup do CMS"**

---

## 📝 EEAT/YMYL STANDARD

Každý článek podporuje:

### E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
- **Autor** - propojený s profilem poradce
- **Recenzent** - pro odbornou kontrolu
- **Biografie autora** - zobrazená u článku
- **Certifikace** - kvalifikace autora

### YMYL (Your Money Your Life)
- **Zdroje** - seznam referencí
- **Disclaimer** - právní upozornění
- **Datum revize** - kdy byl článek naposledy ověřen

### SEO
- Meta title (max 60 znaků)
- Meta description (max 160 znaků)
- Klíčová slova
- Open Graph obrázek
- Canonical URL
- Schema.org strukturovaná data

---

## 🎨 WYSIWYG EDITOR

TipTap editor podporuje:
- **Formátování**: tučné, kurzíva, podtržené, přeškrtnuté
- **Nadpisy**: H2, H3, H4
- **Seznamy**: odrážkové, číslované
- **Citace a kód**
- **Odkazy a obrázky**
- **Zarovnání textu**
- **Undo/Redo**
- **Bubble menu** pro rychlé formátování

---

## 📊 DATABÁZOVÉ TABULKY

### articles
```sql
- id, title, slug, excerpt, content
- category_id, author_id
- meta_title, meta_description, meta_keywords
- og_title, og_description, og_image
- featured_image, featured_image_alt
- reviewed_by, reviewed_at, sources, disclaimer
- status (draft/review/published/archived)
- published_at, view_count, reading_time
```

### article_categories
```sql
- id, name, slug, description
- color, icon, parent_id, sort_order
```

### advisors (nové sloupce)
```sql
- cms_access (boolean)
- bio (text)
- photo_url (text)
- specializations (text[])
- certifications (text[])
- linkedin_url (text)
- years_experience (integer)
```

---

## 🔗 URL STRUKTURA

| Stránka | URL |
|---------|-----|
| Admin Dashboard | `/admin` |
| Seznam článků | `/admin/clanky` |
| Nový článek | `/admin/clanky/novy` |
| Editace článku | `/admin/clanky/[id]` |
| Článek na webu | `/poradna/[slug]` |

---

## 🛠️ ROZŠÍŘENÍ (TODO)

### Fáze 2:
- [ ] Nahrávání obrázků do Supabase Storage
- [ ] Média knihovna v adminu
- [ ] Plánované publikování
- [ ] Verzování článků

### Fáze 3:
- [ ] Stránky (O nás, Služby editovatelné)
- [ ] Menu builder
- [ ] Globální nastavení webu

---

## 📞 PODPORA

Pokud máte problémy:
1. Zkontrolujte konzoli prohlížeče (F12)
2. Zkontrolujte Vercel logs
3. Ověřte, že SQL schéma bylo správně aplikováno

---

*Vytvořeno pro ZFP GROUP Břeclav*
