import { Metadata } from 'next';

export const siteConfig = {
  name: 'ZFP GROUP Břeclav',
  description: 'Finanční poradenství v Břeclavi - Hypotéky, investice, pojištění',
  url: 'https://zfpbreclav.cz',
  ogImage: 'https://zfpbreclav.cz/og-image.jpg',
};

// Homepage
export const homeMetadata: Metadata = {
  title: 'Finanční poradenství Břeclav | Hypotéky, Investice, Pojištění',
  description: 'Regionální kancelář ZFP v Břeclavi. Finanční poradenství postavené na vzdělávání - hypotéky, investice, pojištění. 10 let zkušeností, součást ZFP GROUP.',
  keywords: 'finanční poradenství Břeclav, hypotéky Břeclav, investice, pojištění, ZFP, finanční poradce',
  openGraph: {
    title: 'Finanční poradenství Břeclav | ZFP GROUP',
    description: 'Regionální kancelář ZFP - Hypotéky, investice, pojištění. Osobní přístup, 10 let zkušeností.',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
    locale: 'cs_CZ',
    type: 'website',
  },
};

// Bydlení & hypotéky
export const mortgageMetadata: Metadata = {
  title: 'Hypotéky Břeclav | Hypoteční kalkulačka | ZFP GROUP',
  description: 'Hypoteční poradenství v Břeclavi. Srovnáme nabídky bank, pomůžeme s refinancováním. Hypoteční kalkulačka zdarma. 10 let zkušeností.',
  keywords: 'hypotéky Břeclav, hypoteční kalkulačka, refinancování, hypoteční poradce',
};

// Finanční vzdělávání
export const educationMetadata: Metadata = {
  title: 'Finanční vzdělávání Břeclav | Kurzy finanční gramotnosti',
  description: 'Kurzy a semináře finanční gramotnosti v Břeclavi. Naučte se rozumět penězům, investovat a dělat informovaná rozhodnutí. ZFP má 30 let zkušeností.',
  keywords: 'finanční vzdělávání, finanční gramotnost, kurzy, semináře, Břeclav',
};

// Finanční poradenství
export const advisoryMetadata: Metadata = {
  title: 'Finanční poradenství Břeclav | Nezávislý finanční poradce',
  description: 'Profesionální finanční poradenství v Břeclavi. Hypotéky, investice, pojištění, reality. Osobní přístup, důraz na vzdělávání. Součást ZFP GROUP.',
  keywords: 'finanční poradenství, finanční poradce, Břeclav, hypotéky, investice, pojištění',
};

// Kontakt
export const contactMetadata: Metadata = {
  title: 'Kontakt | ZFP GROUP Břeclav - Finanční poradenství',
  description: 'Kontaktujte nás pro nezávaznou konzultaci. ZFP GROUP Břeclav - Finanční poradenství, hypotéky, investice. Jsme tu pro vás.',
  keywords: 'kontakt, Břeclav, finanční poradenství, konzultace',
};

// O kanceláři
export const aboutMetadata: Metadata = {
  title: 'O kanceláři | ZFP GROUP Břeclav - Náš tým a hodnoty',
  description: 'Regionální kancelář ZFP v Břeclavi. Poznejte náš tým, naše hodnoty a filozofii. 10 let zkušeností, součást ZFP GROUP s 30letou tradicí.',
  keywords: 'o nás, tým, ZFP Břeclav, hodnoty, finanční poradci',
};

// Finanční nástroje
export const toolsMetadata: Metadata = {
  title: 'Finanční kalkulačky | Hypoteční, důchodová, investiční kalkulačka',
  description: 'Bezplatné finanční kalkulačky - hypoteční, důchodová, spoření, finanční zdraví. Zjistěte si své možnosti okamžitě online.',
  keywords: 'kalkulačka, hypoteční kalkulačka, důchodová kalkulačka, spoření, investice',
};

// CRM
export const crmMetadata: Metadata = {
  title: 'CRM | ZFP GROUP Břeclav - Administrace',
  description: 'CRM systém pro správu poptávek a klientů. Přístup pouze pro autorizované poradce ZFP GROUP Břeclav.',
  keywords: 'CRM, administrace, poptávky, klienti',
  robots: {
    index: false,
    follow: false,
  },
};
