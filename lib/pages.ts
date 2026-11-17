/* Extra copy for the inner pages (about, services, contact, products). Facts used: founded 1998 in
   Konya as a family business, 50+ staff, 5,000+ customers, 565 stock codes in 15 groups, B2B platform. */
import type { Lang } from './catalog';

const tr = {
  sysDetail: {
    powertrain: 'Motorun gücünü tekerlere taşıyan zincir: debriyaj baskı ayağı ve diski, şanzıman dişlileri, senkromeçler ve vites kumanda parçaları.',
    hydraulics: 'Ekipmanı kaldıran ve taşıyan üç nokta askı sistemi: hidrolik orta kol, alt çeki kolları, kaldırma kolları ve bağlantı pimleri.',
    brakes: 'Traktörü güvenle durduran sistem: fren diskleri ve balataları, pedal mekanizması, yaylar ve el freni parçaları.',
    steering: 'Ön aks ve direksiyon: dingil pernoları, diferansiyel kovanları, direksiyon pistonu ve bağlantı parçaları.',
    cooling: 'Motoru ideal sıcaklıkta tutan sistem: radyatör kapakları, muslukları ve bağlantı parçaları.',
    fasteners: 'Her şeyi bir arada tutan elemanlar: pimler, emniyet maşaları, somun ve cıvatalar.',
    cab: 'Sürücüyü güneşten ve yağmurdan koruyan branda ve kabin aksamı.',
    misc: 'Ford, Massey Ferguson, UTB ve Steyr’e özel parçalar ile çeki demiri, kuyruk mili ve muhtelif ekipman parçaları.',
  },
  frame: { parts: 'parça', see: 'Bu sistemdeki parçaları gör', close: 'Kapat', hint: 'Sürükleyerek çevir · başka bir sisteme dokun' },
  filters: { group: 'Ürün grubu', brand: 'Marka', allGroups: 'Tüm gruplar', allBrands: 'Tüm markalar', active: 'Aktif filtreler' },
  catalog: {
    eyebrow: 'Ürün kataloğu', title: ['565 parça,', '15 ürün grubu.'], lead: 'Tüm stokumuz ürün gruplarına göre düzenli. Bir grup seçin, listeyi inceleyin; parçanın yerini bilmiyorsanız Parça Bulucu’yu kullanın.',
    groups: 'Ürün grupları', browse: 'Grubu incele', all: 'Tüm ürünler', search: 'Bu listede ara…', sort: 'Sırala', byCode: 'Stok koduna göre', byName: 'Ada göre',
    finderT: 'Parçanın yerini mi biliyorsunuz?', finderP: 'Traktör üzerinde sistemi seçin, parça kendini göstersin.', finderB: 'Parça Bulucu’yu aç',
  },
  finderPage: { eyebrow: 'Parça Bulucu', title: ['Parçanı traktörün', 'üzerinde bul.'], lead: 'Traktörde bir noktaya dokunun: sistem parlar, traktörden ayrılır ve yakından görünür. Aşağıdan kod, model ya da ada göre arayın.' },
  about: {
    storyEyebrow: 'Hikâyemiz',
    story: ['Konya’da bir tezgâhla başladı.', 'Bugün Türkiye’nin dört bir yanına parça yetiştiriyor.'],
    paras: [
      'Akın Traktör, 1998’de Konya’da bir aile işletmesi olarak kuruldu. İlk günden beri işimiz aynı: çiftçinin, servisin ve bayinin traktörünü durduran parçayı en kısa sürede doğru ölçüde bulmak.',
      'Yıllar içinde stok büyüdü; güç aktarmadan hidroliğe, frenden ön düzene 15 ürün grubunda 565 stok koduna ulaştık. Her parça benzersiz bir kodla raflanıyor, hangi modele uyduğu kayıt altında tutuluyor.',
      'Bugün 50’yi aşkın uzmanımızla 5.000’den fazla müşteriye hizmet veriyoruz. Bayiler için B2B platformumuz, herkes için Parça Bulucu ve çevrim içi teklif sepetimiz var.',
    ],
    why: 'Neden Akın?',
    reasons: [['Kodla çalışırız', 'Her parça bir stok koduyla izlenir; yanlış parça göndermeyiz.'], ['Modeli biliriz', 'Ford, Massey Ferguson, UTB, Steyr, 50NC: uyum bilgisi parçanın yanında.'], ['Hızlı çıkarız', 'Stoktaki parça aynı gün kargoda.'], ['Yanınızdayız', 'Kodu bilmiyorsanız fotoğraf gönderin, biz eşleştirelim.']],
    ctaT: ['Bir parçadan fazlası:', 'güvenilir bir ortak.'], ctaB: 'Parça Bulucu’yu aç',
  },
  services: {
    how: 'Nasıl çalışıyoruz?',
    steps: [['Parçayı tanımla', 'Stok kodu, model numarası ya da fotoğraf: hangisi elinizdeyse.'], ['Eşleştirelim', 'Uzmanlarımız ölçü ve model uyumunu teyit eder.'], ['Teklifi al', 'Fiyat ve termin aynı gün e-posta veya WhatsApp ile.'], ['Sahada', 'Stoktaki parça aynı gün kargoya verilir.']],
    faqT: 'Sık sorulan sorular',
    faq: [
      ['Parçanın kodunu bilmiyorum, ne yapmalıyım?', 'Parçanın fotoğrafını ve traktörünüzün marka/modelini WhatsApp’tan gönderin. Uzmanlarımız katalogdaki doğru stok koduyla eşleştirir.'],
      ['Hangi traktör markalarına parça veriyorsunuz?', 'Ford, Massey Ferguson, UTB, Steyr, 50NC (Fiat) ve Tümosan uyumlu parçalarımız var. Her ürün sayfasında uyumlu modeller listelenir.'],
      ['Fiyat nasıl öğrenirim?', 'İstediğiniz parçaları teklif sepetine ekleyip e-posta ya da WhatsApp ile gönderin. Fiyat ve termin aynı gün iletilir. Bayilerimiz fiyatları B2B platformunda görür.'],
      ['Ne kadar sürede gönderiyorsunuz?', 'Stoktaki parçalar aynı gün kargoya verilir. Ağır parçalar ambar ile gönderilir; takip numarası paylaşılır.'],
      ['Bayi olmak için ne gerekir?', 'İletişim formundan “Bayilik” konusuyla yazın; ekibimiz koşulları ve B2B platform erişimini sizinle paylaşsın.'],
    ],
  },
  contact: {
    channels: [['WhatsApp', 'Fotoğraf gönder, kodu birlikte bulalım', 'wa'], ['Telefon', 'Pzt–Cmt mesai saatlerinde', 'tel'], ['E-posta', 'Teklif ve kurumsal talepler', 'mail'], ['Ziyaret', 'Karatay / Konya', 'map']],
    mapT: 'Bizi ziyaret edin', open: 'Yol tarifi al',
  },
  products: { groupsT: 'Ürün grupları', groupsSub: 'Bir gruba dokunun, Parça Bulucu o gruba göre filtrelensin.' },
};

const en: typeof tr = {
  sysDetail: {
    powertrain: 'The chain that carries engine power to the wheels: clutch pressure plate and disc, gearbox gears, synchronisers and gearshift parts.',
    hydraulics: 'The three-point hitch that lifts and carries implements: hydraulic top link, lower links, lift arms and hitch pins.',
    brakes: 'The system that stops the tractor safely: brake discs and linings, pedal mechanism, springs and hand-brake parts.',
    steering: 'Front axle and steering: king pins, differential housings, steering cylinder and linkage.',
    cooling: 'Keeps the engine at the right temperature: radiator caps, drain taps and fittings.',
    fasteners: 'What holds everything together: pins, linch pins, nuts and bolts.',
    cab: 'Canopy and cab parts that protect the driver from sun and rain.',
    misc: 'Parts specific to Ford, Massey Ferguson, UTB and Steyr, plus drawbar, PTO shaft and other implement parts.',
  },
  frame: { parts: 'parts', see: 'See the parts of this system', close: 'Close', hint: 'Drag to rotate · tap another system' },
  filters: { group: 'Product group', brand: 'Brand', allGroups: 'All groups', allBrands: 'All brands', active: 'Active filters' },
  catalog: {
    eyebrow: 'Product catalogue', title: ['565 parts,', '15 product groups.'], lead: 'Our whole stock, organised by product group. Pick a group and browse; if you don’t know where the part sits, use the Part Finder.',
    groups: 'Product groups', browse: 'Browse group', all: 'All products', search: 'Search this list…', sort: 'Sort', byCode: 'By stock code', byName: 'By name',
    finderT: 'Know where the part sits?', finderP: 'Pick the system on the tractor and let the part show itself.', finderB: 'Open the Part Finder',
  },
  finderPage: { eyebrow: 'Part Finder', title: ['Find your part', 'on the tractor.'], lead: 'Tap a point on the tractor: the system lights up, detaches and comes closer. Search below by code, model or name.' },
  about: {
    storyEyebrow: 'Our story',
    story: ['It started at a counter in Konya.', 'Today it supplies parts across Turkey.'],
    paras: [
      'Akın Traktör was founded in Konya in 1998 as a family business. Our job has been the same since day one: find the part that stops a farmer’s, workshop’s or dealer’s tractor, true to size and as fast as possible.',
      'Over the years the stock grew to 565 stock codes in 15 product groups, from powertrain to hydraulics, brakes and front axle. Every part is shelved under a unique code and its model fit is on record.',
      'Today more than 50 specialists serve over 5,000 customers. Dealers have our B2B platform; everyone has the Part Finder and an online quote list.',
    ],
    why: 'Why Akın?',
    reasons: [['We work by code', 'Every part is tracked by a stock code, so the wrong part never ships.'], ['We know the models', 'Ford, Massey Ferguson, UTB, Steyr, 50NC: fit data sits next to every part.'], ['We ship fast', 'Parts in stock leave the same day.'], ['We’re here for you', 'Don’t know the code? Send a photo and we’ll match it.']],
    ctaT: ['More than a part:', 'a partner you can trust.'], ctaB: 'Open the Part Finder',
  },
  services: {
    how: 'How we work',
    steps: [['Identify the part', 'Stock code, model number or a photo: whatever you have.'], ['We match it', 'Our specialists confirm size and model fit.'], ['Get the quote', 'Price and lead time the same day by email or WhatsApp.'], ['On the field', 'Parts in stock ship the same day.']],
    faqT: 'Frequently asked questions',
    faq: [
      ['I don’t know the part code. What should I do?', 'Send a photo of the part and your tractor’s make and model on WhatsApp. Our specialists match it to the right stock code.'],
      ['Which tractor brands do you supply?', 'We stock parts for Ford, Massey Ferguson, UTB, Steyr, 50NC (Fiat) and Tümosan. Every product page lists the compatible models.'],
      ['How do I get a price?', 'Add the parts to your quote list and send it by email or WhatsApp. Price and lead time come back the same day. Dealers see prices on the B2B platform.'],
      ['How fast do you ship?', 'Parts in stock ship the same day. Heavy parts go by freight, with a tracking number.'],
      ['How can I become a dealer?', 'Write to us via the contact form with the subject “Dealership”; our team will share the terms and B2B access.'],
    ],
  },
  contact: {
    channels: [['WhatsApp', 'Send a photo, we’ll find the code', 'wa'], ['Phone', 'Mon–Sat during opening hours', 'tel'], ['Email', 'Quotes and company requests', 'mail'], ['Visit', 'Karatay / Konya', 'map']],
    mapT: 'Visit us', open: 'Get directions',
  },
  products: { groupsT: 'Product groups', groupsSub: 'Tap a group and the Part Finder filters to it.' },
};

export const PAGES = { tr, en };
export const p = (lang: Lang) => PAGES[lang];
