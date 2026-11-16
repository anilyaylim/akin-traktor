# AKIN · Traktör Yedek Parça — konsept demo

Akın Traktör için hazırlanan yeni nesil kurumsal site ve parça kataloğu konsepti (No7 Software).

**Öne çıkanlar**
- Kaydırmayla parçalarına ayrılan gerçek zamanlı 3D güç aktarma grubu (React Three Fiber, kodla modellenmiş dişli, senkromeç, debriyaj ve fren diski, hidrolik orta kol)
- **Parça Bulucu:** 3D traktör üzerinde sistem seçimi (x-ray vurgulama) + gerçek 565 stok kodunda anlık arama (ad, kod, uyumlu model)
- Teklif sepeti (localStorage), e-posta veya WhatsApp ile teklif isteme
- 565 ürün detay sayfası (3D önizleme, uyumlu modeller, schema.org Product)
- TR / EN, Lenis + GSAP ScrollTrigger animasyonları, statik export

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:3100/tr/
npm run build    # statik çıktı: ./out
```

## Yayın (Cloudflare Pages)

- Framework preset: **None**
- Build command: `npm run build`
- Build output directory: `out`
- Environment variable: `NODE_VERSION = 22`

Demo `noindex` yayınlanır (`public/_headers`, `robots.txt`). Müşteriye şifreli göstermek için Cloudflare Pages → Settings → **Access policy** (Cloudflare Access) ile e-posta bazlı erişim verilebilir.

## Veri ve yer tutucular

- `data/products.json`: akintraktor.com.tr kataloğundaki 565 ürün (kod, ad, grup, uyumlu modeller).
- Telefon / WhatsApp numarası `lib/i18n.ts` → `CONTACT` içinde **yer tutucudur**; gerçek numara Akın Traktör'den alınacak.
- 3D modeller temsilidir; gerçek CAD / fotoğraf geldiğinde `components/three/parts.tsx` değiştirilebilir.
