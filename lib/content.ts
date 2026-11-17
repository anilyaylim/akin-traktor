/* References and News/Blog content (TR/EN).
   References: ported from the current akintraktor.com.tr "Referanslarımız" page. The brand list is
   reframed as "brands we supply parts for" (the old page claimed official distributorship). The
   testimonials and project texts are the client's current-site content and must be confirmed by
   Akın Traktör before going live. */
import type { Lang } from './catalog';
import type { ArtKind } from '@/components/PostCover';

type Block = { h?: string; p?: string; ul?: string[]; tip?: string };
export type Post = { slug: string; date: string; cat: 'guide' | 'news' | 'event'; kind: ArtKind; group?: string; loc?: string; title: string; excerpt: string; body: Block[] };

const tr = {
  refs: {
    eyebrow: 'Referanslar', title: ['Tarlada, serviste,', 'kooperatifte güvenilen ortak.'],
    lead: '1998’den bu yana çiftçilerden kooperatiflere, belediyelerden bayilere kadar 5.000’i aşkın müşteriye parça ve hizmet sağlıyoruz.',
    stats: [['5.000+', 'Mutlu müşteri'], ['1998', 'Kuruluş'], ['565', 'Stok kodu'], ['Türkiye', 'Geneline sevkiyat']],
    sectorsT: ['Hizmet verdiğimiz', 'sektörler'],
    sectors: [['Tarım işletmeleri', 'Büyük ve orta ölçekli tarım işletmelerine ekipman ve yedek parça tedariki.'], ['Kooperatifler', 'Tarım kooperatiflerine özel fiyatlandırma ve toplu sipariş.'], ['Belediyeler', 'Kamu kurumlarına yönelik ekipman, parça ve servis hizmetleri.'], ['Eğitim kurumları', 'Tarım fakülteleri ve meslek yüksekokullarına destek.'], ['Servis & bayiler', 'B2B platformu üzerinden fiyat listesi, toplu sipariş ve takip.']],
    projectsT: ['Başarılı', 'projeler'],
    projects: [
      { y: '2023', art: 'tractor' as ArtKind, loc: 'Konya', t: 'Konya Tarım Kooperatifi Mekanizasyon Projesi', d: '500 üyeli tarım kooperatifine 25 traktör ve 50 tarım ekipmanı tedariki. Proje kapsamında teknik eğitim ve 5 yıllık bakım sözleşmesi sağlandı.', k: [['25', 'traktör'], ['50', 'ekipman'], ['5 yıl', 'bakım']] },
      { y: '2024', art: 'fleet' as ArtKind, loc: 'Türkiye geneli', t: 'Tarım Holding Filo Yenileme Projesi', d: 'Ulusal ölçekte faaliyet gösteren bir tarım holdinginin ekipman filosunun yenilenmesi ve modernizasyonu. 100’ü aşkın ekipman tedarik edildi.', k: [['100+', 'ekipman'], ['Ulusal', 'ölçek'], ['Tek', 'tedarikçi']] },
    ],
    quotesT: ['Müşterilerimiz', 'ne diyor?'],
    quotes: [
      ['Yıllardır Akın Traktör ile çalışıyoruz. Hem ürün kalitesi hem de satış sonrası hizmetleri mükemmel. Özellikle teknik servis ekibinin hızlı müdahalesi çok değerli.', 'Ahmet Yılmaz', 'Yılmaz Tarım A.Ş.'],
      ['Profesyonel yaklaşımları ve uygun fiyatları ile her zaman tercih ettiğimiz bir firma. Yedek parça tedarikinde çok hızlı ve güvenilirler.', 'Mehmet Demir', 'Demir Çiftlik'],
      ['Aldığımız traktörün seçiminde çok yardımcı oldular. Danışmanlık hizmetleri gerçekten değerli. Satın alma sonrası eğitim desteği de çok faydalıydı.', 'Ayşe Kaya', 'Kaya Tarım Ürünleri'],
    ],
    brandsT: 'Parça sağladığımız traktör markaları',
    brandsNote: 'Marka adları yalnızca parça uyumunu belirtmek içindir.',
    ctaT: ['Siz de referanslarımız', 'arasına katılın.'], cta: 'Teklif iste', cta2: 'İletişime geç',
  },
  news: {
    eyebrow: 'Haberler & Blog', title: ['Sahadan haberler,', 'atölyeden rehberler.'],
    lead: 'Traktör bakımı, doğru parça seçimi ve Akın Traktör’den haberler.',
    all: 'Tümü', cats: { guide: 'Teknik rehber', news: 'Haber', event: 'Fuar & Etkinlik' }, where: 'Yer', read: 'Okumaya devam et', min: 'dk okuma', back: 'Tüm yazılar',
    related: 'Bu yazıdaki parçalar', relatedAll: 'Gruptaki tüm parçalar', more: 'Diğer yazılar', share: 'Paylaş',
    ctaT: 'Doğru parçayı birlikte bulalım.', ctaP: 'Stok kodunu ya da parçanın fotoğrafını gönderin, uzmanlarımız eşleştirsin.', cta: 'Parça Bulucu’yu aç',
  },
  posts: [
    {
      slug: 'konya-tarim-fuari-akin-standi', date: '2026-09-24', cat: 'event', kind: 'stand', loc: 'Konya',
      title: 'Konya Tarım Fuarı’nda AKIN standı',
      excerpt: 'Güç aktarmadan hidroliğe parça gruplarımızı, yeni dijital kataloğumuzu ve bayi platformumuzu standımızda tanıttık.',
      body: [
        { p: 'Konya Tarım Fuarı, bölgenin en çok ziyaret edilen tarım ve tarım makineleri buluşmalarından biri. AKIN olarak standımızda çiftçilerle, servislerle ve bayilerimizle bir araya geldik.' },
        { h: 'Standımızda neler vardı?', ul: ['Debriyaj, şanzıman ve hidrolik gruplarından örnek parçalar', 'Parça Bulucu’nun canlı demosu: stok kodu ve modelle arama', 'Bayiler için B2B platform tanıtımı', 'Fotoğrafla parça eşleştirme hizmeti'] },
        { tip: 'Fuarda tanıştığımız ziyaretçilerimiz teklif taleplerini Teklif Sepeti üzerinden bize iletebilir.' },
      ],
    },
    {
      slug: 'bayi-bulusmasi-2027', date: '2027-01-20', cat: 'event', kind: 'meet', loc: 'Konya · Akın Traktör',
      title: 'Bayi Buluşması 2027: dijital katalog ve yeni sezon',
      excerpt: 'Bayi ve servis ortaklarımızla yeni sezon stok planını, B2B platformunu ve sipariş süreçlerini konuşacağız.',
      body: [
        { p: 'Her yıl sezon öncesinde bayi ve servis ortaklarımızla bir araya geliyoruz. Bu yılın gündemi dijital katalog ve hızlı sipariş.' },
        { h: 'Gündem', ul: ['2027 sezonu stok ve ürün grubu planı', 'B2B platform: fiyat listeleri, toplu sipariş, takip', 'Parça Bulucu ve teklif sepetinin bayilerle kullanımı', 'Soru-cevap ve öneriler'] },
        { tip: 'Katılım için iletişim formundan “Bayilik” konusuyla bize yazabilirsiniz.' },
      ],
    },
    {
      slug: 'debriyaj-baski-ayagi-belirtiler', date: '2026-11-10', cat: 'guide', kind: 'clutch', group: 'DEBRİYAJ & ŞANZIMAN',
      title: 'Debriyaj baskı ayağı ne zaman değişir? 5 belirti',
      excerpt: 'Patinaj, titreme, vites geçirmede zorluk… Debriyaj sistemindeki aşınma büyük arızaya dönüşmeden önce kendini belli eder.',
      body: [
        { p: 'Traktörde debriyaj, motorun gücünü şanzımana aktaran sistemin kalbidir. Baskı ayağı, disk ve rulman birlikte çalışır; biri aşındığında diğerleri de hızla etkilenir. Erken fark edilen bir aşınma, birkaç parçalık bir onarımla çözülür; geç kalınırsa volan ve şanzıman da işin içine girer.' },
        { h: '1. Yük altında patinaj', p: 'Römork çekerken ya da toprak işlerken motor devri yükseliyor ama traktör aynı oranda hızlanmıyorsa debriyaj kayıyor demektir. Genellikle aşınmış disk ya da zayıflamış baskı yaylarının işaretidir.' },
        { h: '2. Kalkışta titreme', p: 'Pedalı bırakırken traktör sarsılıyorsa baskı ayağı yüzeyi düzgün basmıyor olabilir. Yağlanmış disk ya da eşit olmayan yay basıncı da aynı belirtiyi verir.' },
        { h: '3. Vites geçirmede zorluk', p: 'Pedal sonuna kadar basılıyken vitesler sert giriyor ya da cızırdıyorsa debriyaj tam ayırmıyordur. Ayar, baskı ayağı parmakları ya da ayırma çatalı kontrol edilmelidir.' },
        { h: '4. Pedal boşluğunun değişmesi', p: 'Pedal boşluğu (serbest hareket mesafesi) zamanla değişir. Boşluk kaybolduysa debriyaj sürekli hafifçe ayrık çalışır ve hızla aşınır; aşırı boşluk ise tam ayırmayı engeller.' },
        { h: '5. Pedala basınca ses', p: 'Pedala basıldığında gelen ıslık veya hışırtı genellikle debriyaj rulmanından gelir. Rulmanı değiştirmek, baskı ayağının zarar görmesini önler.' },
        { tip: 'Baskı ayağını değiştirirken diski ve rulmanı da kontrol edin. Aynı anda değişen bir set, ileride ikinci kez sökme masrafını ortadan kaldırır.' },
        { h: 'Doğru parçayı seçmek', p: 'Baskı ayağı ve tamir takımları traktör modeline göre farklılık gösterir. Kataloğumuzda her parçanın uyumlu modelleri (ör. 480, 540, 70.56, 110.90) listelenir; stok kodunu bilmiyorsanız parçanın fotoğrafını WhatsApp’tan gönderebilirsiniz.' },
      ],
    },
    {
      slug: 'hidrolik-orta-kol-secimi', date: '2026-10-28', cat: 'guide', kind: 'toplink', group: 'HİDROLİK AKSAM',
      title: 'Hidrolik orta kol nasıl seçilir? Kategori, ölçü ve uyum',
      excerpt: 'Üç nokta askı sisteminde orta kol, ekipmanın açısını belirler. Yanlış kategori ya da boy, hem verimi hem güvenliği düşürür.',
      body: [
        { p: 'Üç nokta askı sistemi iki alt çeki kolu ve bir orta (üst) koldan oluşur. Orta kol, pulluk ya da çapa makinesi gibi ekipmanın öne-arkaya eğimini ayarlar. Mekanik (vidalı) ya da hidrolik olabilir; hidrolik orta kol, eğimi kabinden ayarlamanızı sağlar.' },
        { h: 'Önce kategori', p: 'Askı noktaları uluslararası standartta kategorilere ayrılır. Kategori, pim ve göz çaplarını belirler; orta kolu traktörünüzün ve ekipmanınızın kategorisine göre seçmelisiniz.', ul: ['Kategori 1: küçük ve orta güçteki traktörler', 'Kategori 2: orta ve yüksek güçteki traktörlerde en yaygın sınıf', 'Kategori 3: büyük, yüksek güçlü traktörler'] },
        { h: 'Boy ve strok', p: 'Orta kolun kapalı boyu ve açılma mesafesi, ekipmanı hem yere paralel tutabilmeli hem de nakliye konumunda güvenle kaldırabilmelidir. Mevcut kolunuzun göz merkezleri arası mesafesini kapalı ve açık konumda ölçmek en güvenilir yoldur.' },
        { h: 'Mekanik mi, hidrolik mi?', p: 'Sık ekipman değiştiriyor ya da arazide eğimi sık ayarlıyorsanız hidrolik orta kol zaman kazandırır. Hidrolik kol için traktörünüzde uygun bir arka hidrolik çıkışı bulunmalıdır.' },
        { tip: 'Bağlantı pimlerini ve emniyet maşalarını orta kolla birlikte kontrol edin; aşınmış bir pim, yeni kolun boşluk yapmasına neden olur.' },
        { h: 'Katalogda', p: 'Hidrolik aksam grubumuzda orta kollar, bağlantı pimleri, lamalar ve asma kancaları dahil 167 stok kodu bulunur. Her ürünün uyumlu modelleri ürün sayfasında listelenir.' },
      ],
    },
    {
      slug: 'kisa-hazirlik-radyator-bakimi', date: '2026-10-14', cat: 'guide', kind: 'radiator', group: 'RADYATÖR',
      title: 'Kışa hazırlık: traktör soğutma sistemi kontrol listesi',
      excerpt: 'İlk soğuklardan önce yapılacak on dakikalık bir kontrol, donmuş bir blok ya da hasarlı bir radyatörün maliyetinden çok daha ucuzdur.',
      body: [
        { p: 'Soğutma sistemi yalnızca yazın değil, kışın da kritiktir. Donma noktası düşük olmayan bir soğutma sıvısı motor bloğunu ve radyatörü çatlatabilir. Sezon değişirken aşağıdaki kontrolleri yapmanızı öneririz.' },
        { h: 'Kontrol listesi', ul: ['Soğutma sıvısı seviyesi ve rengi: bulanık ya da paslı sıvı değiştirilmeli.', 'Antifriz oranı: bölgenizin en düşük sıcaklığına uygun karışım kullanın; bir antifriz ölçer ile kolayca kontrol edilir.', 'Radyatör kapağı: conta sertleşmiş veya çatlamışsa sistem basıncı tutmaz, kapağı değiştirin.', 'Hortumlar ve kelepçeler: sertleşme, şişme ve sızıntı izlerine bakın.', 'Radyatör petekleri: toz ve sap artıkları hava akışını keser; düşük basınçlı hava ile içeriden dışarıya temizleyin.', 'Fan kayışı: gerginliği ve çatlakları kontrol edin.'] },
        { tip: 'Motor sıcakken radyatör kapağını asla açmayın. Basınçlı sıcak sıvı ciddi yanıklara neden olabilir.' },
        { h: 'Kapak neden önemli?', p: 'Radyatör kapağı sistemi basınç altında tutarak sıvının kaynama noktasını yükseltir. Contası aşınmış bir kapak, sıvı kaybına ve hararete yol açar. Ucuz bir parçadır ve her sezon kontrol edilmelidir.' },
        { h: 'Katalogda', p: 'Radyatör grubumuzda kapaklar, musluklar ve bağlantı parçaları bulunur. Modelinize uygun parçayı Parça Bulucu’da “radyatör” yazarak listeleyebilirsiniz.' },
      ],
    },
    {
      slug: 'dijital-katalog-ve-parca-bulucu', date: '2026-11-17', cat: 'news', kind: 'gear',
      title: 'Yeni dijital katalog ve Parça Bulucu yayında',
      excerpt: '565 stok kodu artık tek ekranda: traktör üzerinde sistemi seçin, kodla ya da modelle arayın, teklif sepetinizi oluşturun.',
      body: [
        { p: 'Akın Traktör’ün yeni web sitesi ile tüm kataloğumuz çevrim içi. Parça aramak için artık telefonla kod okumak gerekmiyor: aradığınız parçayı birkaç saniyede bulup teklif isteyebilirsiniz.' },
        { h: 'Neler yeni?', ul: ['3D traktör üzerinde sistem seçimi: güç aktarma, hidrolik, fren, ön düzen ve daha fazlası.', 'Stok kodu, parça adı veya model numarası ile anında arama.', 'Her parça için uyumlu modeller ve 3D önizleme.', 'Teklif sepeti: parçaları ekleyin, e-posta ya da WhatsApp ile tek seferde gönderin.', 'AKIN Asistan: sorularınızı yanıtlar, katalogda sizin yerinize arar.'] },
        { h: 'Bayiler için', p: 'Bayi ve servislerimiz özel fiyat listelerine ve sipariş takibine B2B platformumuz üzerinden ulaşmaya devam ediyor.' },
        { tip: 'Kodu bilmediğiniz parçalar için fotoğraf göndermeniz yeterli; uzmanlarımız eşleştirsin.' },
      ],
    },
  ] as Post[],
};

const en: typeof tr = {
  refs: {
    eyebrow: 'References', title: ['A partner trusted in the field,', 'the workshop and the co-op.'],
    lead: 'Since 1998 we have supplied parts and services to more than 5,000 customers, from farmers and co-operatives to municipalities and dealers.',
    stats: [['5,000+', 'Happy customers'], ['1998', 'Founded'], ['565', 'Stock codes'], ['Turkey', 'Nationwide shipping']],
    sectorsT: ['Sectors', 'we serve'],
    sectors: [['Farm businesses', 'Equipment and spare parts for large and mid-sized farms.'], ['Co-operatives', 'Special pricing and bulk orders for agricultural co-operatives.'], ['Municipalities', 'Equipment, parts and service for public institutions.'], ['Education', 'Support for agricultural faculties and vocational schools.'], ['Workshops & dealers', 'Price lists, bulk orders and tracking on the B2B platform.']],
    projectsT: ['Successful', 'projects'],
    projects: [
      { y: '2023', art: 'tractor' as ArtKind, loc: 'Konya', t: 'Konya Agricultural Co-operative Mechanisation Project', d: '25 tractors and 50 implements supplied to a 500-member agricultural co-operative, with technical training and a 5-year maintenance contract.', k: [['25', 'tractors'], ['50', 'implements'], ['5 yrs', 'maintenance']] },
      { y: '2024', art: 'fleet' as ArtKind, loc: 'Nationwide', t: 'Agricultural Holding Fleet Renewal', d: 'Renewal and modernisation of the equipment fleet of a nationwide agricultural holding. More than 100 units supplied.', k: [['100+', 'units'], ['National', 'scale'], ['Single', 'supplier']] },
    ],
    quotesT: ['What our customers', 'say'],
    quotes: [
      ['We have worked with Akın Traktör for years. Product quality and after-sales service are excellent, especially the quick response of the technical service team.', 'Ahmet Yılmaz', 'Yılmaz Tarım A.Ş.'],
      ['A company we always choose for its professional approach and fair prices. Very fast and reliable in spare parts supply.', 'Mehmet Demir', 'Demir Çiftlik'],
      ['They helped us a lot in choosing our tractor. Their advice is truly valuable, and the training after the purchase was very useful.', 'Ayşe Kaya', 'Kaya Tarım Ürünleri'],
    ],
    brandsT: 'Tractor brands we supply parts for',
    brandsNote: 'Brand names are used only to indicate part compatibility.',
    ctaT: ['Join our', 'references.'], cta: 'Request a quote', cta2: 'Get in touch',
  },
  news: {
    eyebrow: 'News & Blog', title: ['News from the field,', 'guides from the workshop.'],
    lead: 'Tractor maintenance, choosing the right part and news from Akın Traktör.',
    all: 'All', cats: { guide: 'Technical guide', news: 'News', event: 'Fairs & Events' }, where: 'Venue', read: 'Read more', min: 'min read', back: 'All articles',
    related: 'Parts in this article', relatedAll: 'All parts in the group', more: 'More articles', share: 'Share',
    ctaT: 'Let’s find the right part together.', ctaP: 'Send the stock code or a photo of the part and our specialists will match it.', cta: 'Open the Part Finder',
  },
  posts: [
    {
      slug: 'konya-tarim-fuari-akin-standi', date: '2026-09-24', cat: 'event', kind: 'stand', loc: 'Konya',
      title: 'The AKIN stand at the Konya Agriculture Fair',
      excerpt: 'We presented our part groups from powertrain to hydraulics, the new digital catalogue and our dealer platform at our stand.',
      body: [
        { p: 'The Konya Agriculture Fair is one of the most visited agriculture and farm machinery events in the region. At our stand we met farmers, workshops and dealers.' },
        { h: 'What was on our stand?', ul: ['Sample parts from the clutch, gearbox and hydraulics groups', 'Live demo of the Part Finder: search by stock code and model', 'Introduction to the B2B platform for dealers', 'Part matching from a photo'] },
        { tip: 'Visitors we met at the fair can send their quote requests through the Quote List.' },
      ],
    },
    {
      slug: 'bayi-bulusmasi-2027', date: '2027-01-20', cat: 'event', kind: 'meet', loc: 'Konya · Akın Traktör',
      title: 'Dealer Meeting 2027: digital catalogue and the new season',
      excerpt: 'With our dealers and workshop partners we will discuss the new season’s stock plan, the B2B platform and ordering.',
      body: [
        { p: 'Every year before the season we meet our dealers and workshop partners. This year’s agenda: the digital catalogue and fast ordering.' },
        { h: 'Agenda', ul: ['2027 season stock and product group plan', 'B2B platform: price lists, bulk orders, tracking', 'Using the Part Finder and quote list with dealers', 'Q&A and suggestions'] },
        { tip: 'To join, write to us via the contact form with the subject “Dealership”.' },
      ],
    },
    {
      slug: 'debriyaj-baski-ayagi-belirtiler', date: '2026-11-10', cat: 'guide', kind: 'clutch', group: 'DEBRİYAJ & ŞANZIMAN',
      title: 'When should a clutch pressure plate be replaced? 5 signs',
      excerpt: 'Slipping, judder, hard gear changes… Wear in the clutch shows itself long before it becomes a major failure.',
      body: [
        { p: 'The clutch is the heart of the system that carries engine power to the gearbox. Pressure plate, disc and release bearing work together; when one wears, the others follow quickly. Caught early, it is a repair of a few parts; caught late, the flywheel and gearbox get involved.' },
        { h: '1. Slipping under load', p: 'If engine speed rises while pulling a trailer or working the soil but the tractor does not speed up accordingly, the clutch is slipping, usually a worn disc or weakened pressure springs.' },
        { h: '2. Judder when pulling away', p: 'If the tractor shudders as you release the pedal, the pressure plate may not be clamping evenly. An oily disc or uneven spring pressure gives the same symptom.' },
        { h: '3. Hard gear changes', p: 'If gears go in hard or grind with the pedal fully down, the clutch is not disengaging fully. Check the adjustment, the pressure plate fingers and the release fork.' },
        { h: '4. Changing pedal free play', p: 'Pedal free play changes over time. With no free play the clutch runs slightly disengaged and wears fast; too much free play prevents full disengagement.' },
        { h: '5. Noise when the pedal is pressed', p: 'A whine or rustle when the pedal is pressed usually comes from the release bearing. Replacing it in time protects the pressure plate.' },
        { tip: 'When replacing the pressure plate, check the disc and the bearing too. Replacing them as a set saves you a second strip-down later.' },
        { h: 'Choosing the right part', p: 'Pressure plates and repair kits differ by tractor model. Our catalogue lists the compatible models of every part (e.g. 480, 540, 70.56, 110.90); if you don’t know the stock code, send a photo on WhatsApp.' },
      ],
    },
    {
      slug: 'hidrolik-orta-kol-secimi', date: '2026-10-28', cat: 'guide', kind: 'toplink', group: 'HİDROLİK AKSAM',
      title: 'How to choose a hydraulic top link: category, length and fit',
      excerpt: 'In the three-point hitch the top link sets the implement’s pitch. The wrong category or length costs both efficiency and safety.',
      body: [
        { p: 'The three-point hitch consists of two lower links and a top link. The top link sets the fore-and-aft pitch of implements such as ploughs or cultivators. It can be mechanical (screw) or hydraulic; a hydraulic top link lets you adjust the pitch from the cab.' },
        { h: 'Category first', p: 'Hitch points are grouped into categories in the international standard. The category defines pin and eye diameters, so choose a top link that matches your tractor and implement.', ul: ['Category 1: small and mid-power tractors', 'Category 2: the most common class on mid to high-power tractors', 'Category 3: large, high-power tractors'] },
        { h: 'Length and stroke', p: 'Closed length and stroke must keep the implement level on the ground and still lift it safely into transport position. Measuring the eye-to-eye distance of your current link, closed and open, is the most reliable way.' },
        { h: 'Mechanical or hydraulic?', p: 'If you change implements often or adjust the pitch on slopes, a hydraulic top link saves time. It needs a suitable rear hydraulic outlet on the tractor.' },
        { tip: 'Check the hitch pins and linch pins together with the top link; a worn pin will let even a new link play.' },
        { h: 'In the catalogue', p: 'Our hydraulics group holds 167 stock codes including top links, hitch pins, plates and hooks. The compatible models are listed on every product page.' },
      ],
    },
    {
      slug: 'kisa-hazirlik-radyator-bakimi', date: '2026-10-14', cat: 'guide', kind: 'radiator', group: 'RADYATÖR',
      title: 'Getting ready for winter: tractor cooling system checklist',
      excerpt: 'A ten-minute check before the first frost costs far less than a frozen block or a damaged radiator.',
      body: [
        { p: 'The cooling system matters in winter as much as in summer. Coolant without enough frost protection can crack the engine block and the radiator. We recommend these checks at every change of season.' },
        { h: 'Checklist', ul: ['Coolant level and colour: cloudy or rusty coolant should be replaced.', 'Antifreeze ratio: use a mixture suited to the lowest temperature in your region; an antifreeze tester checks it in seconds.', 'Radiator cap: if the seal is hard or cracked the system won’t hold pressure, so replace the cap.', 'Hoses and clamps: look for hardening, swelling and leaks.', 'Radiator fins: dust and chaff block the airflow; clean with low-pressure air from the inside out.', 'Fan belt: check tension and cracks.'] },
        { tip: 'Never open the radiator cap while the engine is hot. Hot coolant under pressure can cause serious burns.' },
        { h: 'Why the cap matters', p: 'The radiator cap keeps the system under pressure, which raises the boiling point of the coolant. A cap with a worn seal leads to coolant loss and overheating. It is a cheap part and should be checked every season.' },
        { h: 'In the catalogue', p: 'Our cooling group includes caps, drain taps and fittings. Type “radiator” in the Part Finder to list the parts that fit your model.' },
      ],
    },
    {
      slug: 'dijital-katalog-ve-parca-bulucu', date: '2026-11-17', cat: 'news', kind: 'gear',
      title: 'New digital catalogue and Part Finder are live',
      excerpt: '565 stock codes on one screen: pick a system on the tractor, search by code or model, build your quote list.',
      body: [
        { p: 'With Akın Traktör’s new website our entire catalogue is online. No more reading codes over the phone: find the part you need in seconds and request a quote.' },
        { h: 'What’s new?', ul: ['System selection on a 3D tractor: powertrain, hydraulics, brakes, front axle and more.', 'Instant search by stock code, part name or model number.', 'Compatible models and a 3D preview for every part.', 'Quote list: add parts and send them in one go by email or WhatsApp.', 'AKIN Assistant: answers your questions and searches the catalogue for you.'] },
        { h: 'For dealers', p: 'Our dealers and workshops keep using the B2B platform for their price lists and order tracking.' },
        { tip: 'For parts whose code you don’t know, simply send a photo and our specialists will match it.' },
      ],
    },
  ] as Post[],
};

export const CONTENT = { tr, en };
export const c = (lang: Lang) => CONTENT[lang];
export const postsSorted = (lang: Lang) => [...CONTENT[lang].posts].sort((a, b) => b.date.localeCompare(a.date));
export const readMin = (p: Post) => Math.max(2, Math.round(p.body.map(b => [b.h, b.p, b.tip, ...(b.ul || [])].join(' ')).join(' ').split(/\s+/).length / 180));
export const fmtDate = (d: string, lang: Lang) => new Date(d + 'T12:00:00').toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
export const COMPAT_BRANDS = ['Ford', 'Massey Ferguson', 'UTB', 'Steyr', 'Fiat · 50NC', 'Tümosan', 'New Holland'];
