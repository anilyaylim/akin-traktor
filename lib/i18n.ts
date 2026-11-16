import type { Lang } from './catalog';

export const LANGS: Lang[] = ['tr', 'en'];
export const CONTACT = {
  phone: '+90 332 000 00 00',          // demo placeholder – real number to be supplied by Akın Traktör
  whatsapp: '903320000000',
  email: 'info@akintraktor.com',
  address: 'Fevziçakmak Mah. 10763 Sk. No: 1/C, Artar 1, 42050 Karatay / Konya',
  hours: { tr: 'Pzt–Cum 08:00–18:00 · Cmt 09:00–14:00', en: 'Mon–Fri 08:00–18:00 · Sat 09:00–14:00' },
  map: 'https://maps.google.com/?q=Fevzi%C3%A7akmak+10763+Sk+Karatay+Konya',
};

const tr = {
  nav: { products: 'Ürünler', finder: 'Parça Bulucu', about: 'Hakkımızda', services: 'Hizmetler', contact: 'İletişim', quote: 'Teklif Sepeti', b2b: 'B2B Giriş', menu: 'Menü', close: 'Kapat' },
  hero: {
    eyebrow: 'Konya · 1998’den beri',
    title: ['Traktörün', 'kalbindeki', 'hassasiyet.'],
    sub: 'Güç aktarmadan hidroliğe, 560’ı aşkın yedek parça stoktan, ölçüsünde ve hızla sahada.',
    cta1: 'Parçanı Bul', cta2: 'Kataloğu İncele', scroll: 'Kaydır · sistemi parçalarına ayır',
    labels: ['Ana mil', 'Helisel dişli', 'Senkromeç', 'Debriyaj diski', 'Fren diski', 'Hidrolik orta kol'],
    spec: ['Stok kodu', 'Ürün grubu', 'Uyum'],
  },
  stats: { title: 'Rakamlarla Akın', items: ['Kuruluş', 'Stok kodu', 'Ürün grubu', 'Mutlu müşteri', 'Uzman personel'] },
  systems: { eyebrow: 'Ürün sistemleri', title: 'Sekiz sistem. Tek tedarikçi.', sub: 'Her parça bir sisteme ait. Kataloğumuz da öyle düzenlendi: traktörün neresinde arıza varsa, parçası bir tık uzakta.', count: 'ürün', all: 'Tümünü gör' },
  finder: {
    eyebrow: 'Parça Bulucu', title: 'Parçanı traktörün üzerinde bul.', sub: 'Sistemi seç, modeli yaz ya da ürün kodunu gir. 565 stok kodu anında filtrelenir; istediklerini teklif sepetine ekle.',
    search: 'Ürün adı, kod veya model (ör. 70.56, E007)…', systems: 'Sistem', brands: 'Marka', all: 'Tümü', results: 'sonuç', empty: 'Bu kriterlere uygun parça bulunamadı.', reset: 'Filtreleri temizle',
    add: 'Sepete ekle', added: 'Sepette', details: 'Detay', models: 'Uyumlu', code: 'Kod', tap: 'Sisteme dokun', more: 'Daha fazla göster', open: 'Parça Bulucu’yu aç',
  },
  process: { eyebrow: 'Süreç', title: 'Depodan tarlaya.', steps: [
    ['Stok & kodlama', 'Her parça benzersiz bir kodla raflanır; 15 ürün grubunda 565 kalem anlık izlenir.'],
    ['Ölçü kontrolü', 'Dişli modülü, pim çapı, rakor dişi: sevkiyattan önce ölçü ve uyum kontrolü.'],
    ['Teklif & onay', 'Sepetten gelen talep satış ekibine düşer; fiyat ve termin aynı gün döner.'],
    ['Sevkiyat', 'Konya’dan Türkiye geneline kargo ve ambar ağıyla hızlı teslimat.'],
  ] },
  b2b: { eyebrow: 'Bayi & B2B', title: 'Bayiler için ayrı bir dünya.', sub: 'Özel fiyat listeleri, toplu sipariş ve sipariş takibi B2B platformunda.', cta: 'B2B Platforma Giriş', cta2: 'Bayimiz olun' },
  contactCta: { title: 'Aradığın parçayı birlikte bulalım.', sub: 'Kodu bilmiyor musun? Fotoğrafını WhatsApp’tan gönder, uzmanlarımız eşleştirsin.', wa: 'WhatsApp’tan yaz', call: 'Hemen ara' },
  footer: { tag: 'Traktör güç aktarma, hidrolik ve fren yedek parçaları. Konya’dan Türkiye’nin dört bir yanına.', rights: 'Tüm hakları saklıdır.', demo: 'Konsept tasarım · No7 Software', legal: 'KVKK & Gizlilik', cols: ['Ürünler', 'Kurumsal', 'İletişim'] },
  product: {
    back: 'Kataloğa dön', group: 'Ürün grubu', system: 'Sistem', code: 'Stok kodu', models: 'Uyumlu modeller', universal: 'Tüm modellerle uyumlu', qty: 'Adet', add: 'Teklif sepetine ekle', added: 'Sepete eklendi',
    wa: 'WhatsApp’tan sor', related: 'Aynı gruptan', specs: 'Teknik bilgiler', note: 'Görsel temsilidir. Ölçü ve uyum teyidi için ürün kodunu belirtin.', view: '3D önizleme · sürükleyerek döndür',
  },
  quote: {
    title: 'Teklif Sepeti', empty: 'Sepetin boş. Katalogdan parça ekleyerek başla.', browse: 'Kataloğa git', items: 'kalem', remove: 'Kaldır', clear: 'Sepeti temizle',
    form: 'İletişim bilgilerin', name: 'Ad Soyad', company: 'Firma', email: 'E-posta', phone: 'Telefon', note: 'Not (opsiyonel)', send: 'Teklif iste', wa: 'WhatsApp ile gönder',
    sent: 'Talebin hazır. E-posta uygulaman açıldı; gönderdiğinde satış ekibimiz aynı gün dönüş yapar.', kvkk: 'Bilgilerim yalnızca teklif için kullanılır (KVKK).',
  },
  about: {
    eyebrow: 'Hakkımızda', title: ['Bir aile işletmesinden', 'sistem tedarikçisine.'],
    intro: '1998’de Konya’da küçük bir aile işletmesi olarak başladık. Bugün 50’yi aşkın uzmanımız ve 15 ürün grubunda 565 stok kodumuzla Türkiye’nin dört bir yanındaki çiftçiye, servise ve bayiye parça yetiştiriyoruz.',
    timeline: [['1998', 'Konya’da kuruluş', 'Aile işletmesi olarak traktör yedek parçası satışı.'], ['15', 'Ürün grubu', 'Güç aktarma, hidrolik, fren, ön düzen, soğutma ve bağlantı elemanları.'], ['565', 'Stok kodu', 'Her parça benzersiz bir kodla izlenir; model uyumu kayıt altında.'], ['B2B', 'Bayi platformu', 'Bayiler için çevrim içi sipariş ve fiyat listesi.'], ['2026', 'Dijital dönüşüm', 'Parça Bulucu, teklif sepeti ve iki dilli katalog.']],
    values: [['Doğru parça', 'Kod, ölçü ve model uyumu teyit edilmeden sevkiyat yapılmaz.'], ['Hız', 'Stoktaki parça aynı gün kargoda.'], ['Süreklilik', 'Eski modeller için de parça bulma taahhüdü.'], ['Şeffaflık', 'Net fiyat, net termin, takip edilebilir sipariş.']],
    valuesTitle: 'İlkelerimiz', timelineTitle: 'Bir bakışta',
  },
  services: {
    eyebrow: 'Hizmetler', title: ['Parçadan fazlası.'], sub: 'Doğru parçayı bulmaktan sahaya ulaştırmaya kadar her adımda yanınızdayız.',
    items: [['Yedek parça tedariği', 'Güç aktarma, hidrolik, fren ve ön düzende 565 stok kodu; stokta olmayan parça için tedarik.', ['Stok kodu ile hızlı eşleştirme', 'Toplu alımda özel fiyat', 'Aynı gün kargo']],
      ['Teknik danışmanlık', 'Model, şasi ve parça uyumu konusunda uzman ekipten destek.', ['Fotoğraf ile parça tanıma', 'Ölçü ve tolerans teyidi', 'Alternatif parça önerisi']],
      ['Bayi & B2B', 'Bayiler ve servisler için özel fiyat listesi ve çevrim içi sipariş.', ['Kişiye özel fiyat listesi', 'Sipariş ve sevkiyat takibi', 'Toplu teklif']],
      ['Lojistik', 'Konya merkezli depodan Türkiye geneline kargo ve ambar ağı.', ['Güvenli paketleme', 'Takip numarası', 'Ambar ile ağır parça sevkiyatı']]],
  },
  contact: { eyebrow: 'İletişim', title: ['Konuşalım.'], sub: 'Parça, fiyat ya da bayilik: doğru kişiye hızla ulaşın.', address: 'Adres', phone: 'Telefon', email: 'E-posta', hours: 'Çalışma saatleri', map: 'Haritada aç', form: 'Mesaj gönder', name: 'Ad Soyad', subject: 'Konu', subjects: ['Parça talebi', 'Fiyat teklifi', 'Bayilik', 'Diğer'], message: 'Mesajınız', send: 'Gönder' },
  legal: { title: 'KVKK & Gizlilik', body: [
    'Bu site, Akın Traktör için hazırlanmış bir konsept tasarımdır. Formlar demo amaçlıdır; girilen bilgiler sunucuya gönderilmez, yalnızca e-posta uygulamanızda bir taslak oluşturur.',
    '6698 sayılı KVKK kapsamında; teklif ve iletişim formlarıyla paylaşılan kişisel veriler yalnızca talebinize yanıt vermek amacıyla işlenir, üçüncü kişilerle paylaşılmaz ve yasal süreler sonunda silinir.',
    'Site, tercihlerinizi (dil, teklif sepeti) yalnızca tarayıcınızda saklar; takip çerezi kullanılmaz.',
  ] },
  common: { readMore: 'Detaylı bilgi', since: 'Kuruluş', loading: 'Yükleniyor' },
};

const en: typeof tr = {
  nav: { products: 'Products', finder: 'Part Finder', about: 'About', services: 'Services', contact: 'Contact', quote: 'Quote List', b2b: 'B2B Login', menu: 'Menu', close: 'Close' },
  hero: {
    eyebrow: 'Konya · since 1998',
    title: ['Precision at', 'the heart of', 'the tractor.'],
    sub: 'From powertrain to hydraulics: more than 560 spare parts in stock, true to size and on the field fast.',
    cta1: 'Find your part', cta2: 'Browse catalogue', scroll: 'Scroll · take the system apart',
    labels: ['Main shaft', 'Helical gear', 'Synchroniser', 'Clutch disc', 'Brake disc', 'Hydraulic top link'],
    spec: ['Stock codes', 'Product groups', 'Fits'],
  },
  stats: { title: 'Akın in numbers', items: ['Founded', 'Stock codes', 'Product groups', 'Happy customers', 'Specialists'] },
  systems: { eyebrow: 'Product systems', title: 'Eight systems. One supplier.', sub: 'Every part belongs to a system, and so does our catalogue: wherever the tractor fails, the part is one click away.', count: 'products', all: 'See all' },
  finder: {
    eyebrow: 'Part Finder', title: 'Find your part on the tractor.', sub: 'Pick a system, type a model or enter a stock code. 565 codes filter instantly; add what you need to your quote list.',
    search: 'Part name, code or model (e.g. 70.56, E007)…', systems: 'System', brands: 'Brand', all: 'All', results: 'results', empty: 'No parts match these filters.', reset: 'Clear filters',
    add: 'Add to quote', added: 'In list', details: 'Details', models: 'Fits', code: 'Code', tap: 'Tap a system', more: 'Show more', open: 'Open the Part Finder',
  },
  process: { eyebrow: 'Process', title: 'From shelf to field.', steps: [
    ['Stock & coding', 'Every part is shelved under a unique code; 565 items in 15 groups tracked in real time.'],
    ['Dimensional check', 'Gear module, pin diameter, fitting thread: size and fit are checked before dispatch.'],
    ['Quote & approval', 'Requests from the quote list reach sales directly; price and lead time come back the same day.'],
    ['Dispatch', 'Fast delivery from Konya across Turkey through courier and freight partners.'],
  ] },
  b2b: { eyebrow: 'Dealers & B2B', title: 'A dedicated world for dealers.', sub: 'Dealer price lists, bulk orders and order tracking on the B2B platform.', cta: 'B2B platform login', cta2: 'Become a dealer' },
  contactCta: { title: 'Let’s find your part together.', sub: 'Don’t know the code? Send a photo on WhatsApp and our specialists will match it.', wa: 'Message on WhatsApp', call: 'Call now' },
  footer: { tag: 'Tractor powertrain, hydraulic and brake spare parts. From Konya to every corner of Turkey.', rights: 'All rights reserved.', demo: 'Concept design · No7 Software', legal: 'Privacy', cols: ['Products', 'Company', 'Contact'] },
  product: {
    back: 'Back to catalogue', group: 'Product group', system: 'System', code: 'Stock code', models: 'Compatible models', universal: 'Fits all models', qty: 'Qty', add: 'Add to quote list', added: 'Added to list',
    wa: 'Ask on WhatsApp', related: 'From the same group', specs: 'Technical data', note: 'Image is illustrative. Quote the stock code to confirm size and fit.', view: '3D preview · drag to rotate',
  },
  quote: {
    title: 'Quote List', empty: 'Your list is empty. Add parts from the catalogue to start.', browse: 'Go to catalogue', items: 'items', remove: 'Remove', clear: 'Clear list',
    form: 'Your details', name: 'Full name', company: 'Company', email: 'Email', phone: 'Phone', note: 'Note (optional)', send: 'Request quote', wa: 'Send via WhatsApp',
    sent: 'Your request is ready. Your email app has opened; once sent, our sales team replies the same day.', kvkk: 'My details are used only for this quote (KVKK/GDPR).',
  },
  about: {
    eyebrow: 'About', title: ['From a family business', 'to a systems supplier.'],
    intro: 'We started in 1998 as a small family business in Konya. Today, with more than 50 specialists and 565 stock codes in 15 product groups, we supply farmers, workshops and dealers all over Turkey.',
    timeline: [['1998', 'Founded in Konya', 'Tractor spare parts as a family business.'], ['15', 'Product groups', 'Powertrain, hydraulics, brakes, front axle, cooling and fasteners.'], ['565', 'Stock codes', 'Every part tracked under a unique code, with model fit on record.'], ['B2B', 'Dealer platform', 'Online ordering and price lists for dealers.'], ['2026', 'Digital transformation', 'Part Finder, quote list and a bilingual catalogue.']],
    values: [['The right part', 'Nothing ships before code, size and model fit are confirmed.'], ['Speed', 'Parts in stock ship the same day.'], ['Continuity', 'We commit to sourcing parts for older models too.'], ['Transparency', 'Clear price, clear lead time, trackable orders.']],
    valuesTitle: 'Our principles', timelineTitle: 'At a glance',
  },
  services: {
    eyebrow: 'Services', title: ['More than parts.'], sub: 'From finding the right part to getting it on the field, we are with you at every step.',
    items: [['Spare parts supply', '565 stock codes in powertrain, hydraulics, brakes and front axle; sourcing for parts not in stock.', ['Fast matching by stock code', 'Volume pricing', 'Same-day dispatch']],
      ['Technical advice', 'Support from specialists on model, chassis and part compatibility.', ['Part recognition from a photo', 'Size and tolerance check', 'Alternative part suggestions']],
      ['Dealers & B2B', 'Dealer price lists and online ordering for dealers and workshops.', ['Personal price lists', 'Order and shipment tracking', 'Bulk quotes']],
      ['Logistics', 'Courier and freight network across Turkey from our Konya warehouse.', ['Safe packaging', 'Tracking number', 'Freight for heavy parts']]],
  },
  contact: { eyebrow: 'Contact', title: ['Let’s talk.'], sub: 'Parts, prices or dealership: reach the right person fast.', address: 'Address', phone: 'Phone', email: 'Email', hours: 'Opening hours', map: 'Open in maps', form: 'Send a message', name: 'Full name', subject: 'Subject', subjects: ['Part request', 'Price quote', 'Dealership', 'Other'], message: 'Your message', send: 'Send' },
  legal: { title: 'Privacy', body: [
    'This site is a concept design prepared for Akın Traktör. Forms are for demonstration; nothing is sent to a server, they only create a draft in your email app.',
    'Under Turkish data protection law (KVKK), personal data shared through the quote and contact forms is processed only to answer your request, never shared with third parties and deleted after the legal retention period.',
    'The site stores your preferences (language, quote list) only in your browser; no tracking cookies are used.',
  ] },
  common: { readMore: 'Learn more', since: 'Since', loading: 'Loading' },
};

export const DICT = { tr, en };
export type Dict = typeof tr;
export const t = (lang: Lang) => DICT[lang];
export const ROUTES = { products: 'products', about: 'about', services: 'services', contact: 'contact', quote: 'quote', privacy: 'privacy' } as const;
/** prefix for files in /public (Next adds the base path to links, not to raw asset URLs) */
export const asset = (p: string) => (process.env.NEXT_PUBLIC_BASE_PATH || '') + p;
export const href = (lang: Lang, path = '') => `/${lang}/${path ? path.replace(/^\/|\/$/g, '') + '/' : ''}`;
