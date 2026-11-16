/* Product catalogue: the real 565 SKUs from akintraktor.com.tr (code, name, product group,
   compatible models). Groups are mapped to tractor systems for the Part Finder. */
import raw from '@/data/products.json';

export type Lang = 'tr' | 'en';
export type SystemId = 'powertrain' | 'brakes' | 'hydraulics' | 'steering' | 'cooling' | 'fasteners' | 'cab' | 'misc';
export type ModelKind = 'gear' | 'clutch' | 'brake' | 'toplink' | 'lever' | 'pin' | 'bolt' | 'radiator' | 'canopy' | 'shaft';

type RawProduct = { id: number; name: string; code: string; cat: string; desc: string; img: string };

export const GROUPS: Record<string, { slug: string; tr: string; en: string; system: SystemId; model: ModelKind; brand?: string }> = {
  'DEBRİYAJ & ŞANZIMAN': { slug: 'debriyaj-sanziman', tr: 'Debriyaj & Şanzıman', en: 'Clutch & Gearbox', system: 'powertrain', model: 'clutch' },
  'VİTES AKSAMI': { slug: 'vites-aksami', tr: 'Vites Aksamı', en: 'Gearshift', system: 'powertrain', model: 'gear' },
  'FREN AKSAMI': { slug: 'fren-aksami', tr: 'Fren Aksamı', en: 'Brake System', system: 'brakes', model: 'brake' },
  'HİDROLİK AKSAM': { slug: 'hidrolik-aksam', tr: 'Hidrolik Aksam', en: 'Hydraulics & Linkage', system: 'hydraulics', model: 'toplink' },
  'ÖN DÜZEN': { slug: 'on-duzen', tr: 'Ön Düzen', en: 'Front Axle & Steering', system: 'steering', model: 'shaft' },
  'RADYATÖR': { slug: 'radyator', tr: 'Radyatör', en: 'Cooling', system: 'cooling', model: 'radiator' },
  'PİM GRUBU': { slug: 'pim-grubu', tr: 'Pim Grubu', en: 'Pins', system: 'fasteners', model: 'pin' },
  'SOMUN CİVATA': { slug: 'somun-civata', tr: 'Somun & Cıvata', en: 'Nuts & Bolts', system: 'fasteners', model: 'bolt' },
  'BRANDA': { slug: 'branda', tr: 'Branda', en: 'Canopy', system: 'cab', model: 'canopy' },
  'MUHTELİF': { slug: 'muhtelif', tr: 'Muhtelif', en: 'Miscellaneous', system: 'misc', model: 'lever' },
  'FORD TRAKTÖR': { slug: 'ford', tr: 'Ford Traktör', en: 'Ford Tractor', system: 'misc', model: 'lever', brand: 'Ford' },
  'MASSEY FERGUSON TRAKTÖR': { slug: 'massey-ferguson', tr: 'Massey Ferguson Traktör', en: 'Massey Ferguson Tractor', system: 'misc', model: 'lever', brand: 'Massey Ferguson' },
  'UTB TRAKTÖR': { slug: 'utb', tr: 'UTB Traktör', en: 'UTB Tractor', system: 'misc', model: 'lever', brand: 'UTB' },
  'ŞTEYR TRAKTÖR': { slug: 'steyr', tr: 'Steyr Traktör', en: 'Steyr Tractor', system: 'misc', model: 'lever', brand: 'Steyr' },
  '50NC GRUBU': { slug: '50nc', tr: '50NC Grubu', en: '50NC Series', system: 'powertrain', model: 'gear', brand: '50NC' },
};

export const SYSTEMS: Record<SystemId, { tr: string; en: string; trD: string; enD: string }> = {
  powertrain: { tr: 'Güç Aktarma', en: 'Powertrain', trD: 'Debriyaj, şanzıman, vites ve dişli grupları', enD: 'Clutch, gearbox, gearshift and gear sets' },
  hydraulics: { tr: 'Hidrolik & Üç Nokta', en: 'Hydraulics & 3-Point', trD: 'Orta kol, çeki kolları, hidrolik bağlantılar', enD: 'Top links, lift arms, hydraulic fittings' },
  brakes: { tr: 'Fren Sistemi', en: 'Brakes', trD: 'Fren diskleri, pedallar, el freni', enD: 'Brake discs, pedals, hand brake' },
  steering: { tr: 'Ön Düzen & Direksiyon', en: 'Front Axle & Steering', trD: 'Dingil, pernolar, direksiyon pistonu', enD: 'Axle, king pins, steering cylinder' },
  cooling: { tr: 'Soğutma', en: 'Cooling', trD: 'Radyatör, kapaklar, bağlantılar', enD: 'Radiators, caps, fittings' },
  fasteners: { tr: 'Bağlantı Elemanları', en: 'Fasteners', trD: 'Pimler, somunlar, cıvatalar', enD: 'Pins, nuts, bolts' },
  cab: { tr: 'Kabin & Branda', en: 'Cab & Canopy', trD: 'Branda ve kabin aksamı', enD: 'Canopies and cab parts' },
  misc: { tr: 'Marka & Muhtelif', en: 'Brand & Misc.', trD: 'Ford, MF, UTB, Steyr ve muhtelif parçalar', enD: 'Ford, MF, UTB, Steyr and other parts' },
};

export type Product = {
  id: number; code: string; slug: string; name: string; models: string[]; modelsRaw: string;
  group: string; groupSlug: string; system: SystemId; model: ModelKind; brand?: string;
};

const titleCase = (s: string) => s.toLocaleLowerCase('tr').replace(/(^|[\s(\-./])(\p{L})/gu, (m, a, b) => a + b.toLocaleUpperCase('tr'));

export const PRODUCTS: Product[] = (raw as RawProduct[]).map(p => {
  const g = GROUPS[p.cat] || GROUPS['MUHTELİF'];
  const modelsRaw = p.desc.trim();
  const models = modelsRaw && !/^hepsine$/i.test(modelsRaw) ? modelsRaw.split(/\s*[-\/,]\s*(?=\S)/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 16) : [];
  return {
    id: p.id, code: p.code, slug: p.code.toLowerCase(), name: titleCase(p.name.replace(/\s*-\s*$/, '')), models, modelsRaw,
    group: p.cat, groupSlug: g.slug, system: g.system, model: g.model, brand: g.brand,
  };
});

export const BRANDS = ['Ford', 'Massey Ferguson', 'UTB', 'Steyr', '50NC', 'Tümosan', 'New Holland / Fiat'];

export function groupName(cat: string, lang: Lang) { const g = GROUPS[cat]; return g ? g[lang] : cat; }
export function bySlug(slug: string) { return PRODUCTS.find(p => p.slug === slug); }
export const STATS = { skus: PRODUCTS.length, groups: Object.keys(GROUPS).length, since: 1998, customers: 5000, staff: 50 };
