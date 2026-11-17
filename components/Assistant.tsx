'use client';
/* AKIN site assistant. Same approach as the Menzil assistant: rule-based, runs in the browser,
   no AI service, nothing stored or sent. Two engines:
   1. intents – keyword match (TR/EN) to answers taken from the site's own texts;
   2. catalogue search – stock codes (E007), models (70.56) and part names are searched in the real
      565-item catalogue and answered with part cards that can go straight into the quote list. */
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PRODUCTS, groupName, type Lang, type Product, type SystemId } from '@/lib/catalog';
import { CONTACT, href } from '@/lib/i18n';
import { useQuote } from './Providers';
import { LIGHT } from '@/lib/theme';
import { LOGO_B_ICON, WHEEL, WHEEL_VB } from '@/lib/logos';

type L = { l: string; h: string };
type Msg = { who: 'bot' | 'me'; text: string; links?: L[]; parts?: Product[]; more?: { q: string; n: number }; chips?: boolean };

const norm = (s: string) => ' ' + s.toLocaleLowerCase('tr').replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9.\-/ ]+/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
const HAY = PRODUCTS.map(p => ({ p, h: norm([p.name, p.code, p.modelsRaw, p.group].join(' ')) }));

const UI = {
  tr: {
    name: 'AKIN Asistan', sub: 'Katalog ve site bilgileriyle otomatik yanıt', open: 'Asistanı aç', close: 'Kapat', ph: 'Parça, kod ya da soru yazın …',
    hello: 'Merhaba! Parça arayabilirim (ör. “70.56 fren”, “E007”, “hidrolik orta kol”) ya da teslimat, bayilik ve iletişim sorularınızı yanıtlarım.',
    fallback: 'Bunu tam anlayamadım. Parça adı, stok kodu veya traktör modeli yazarsanız katalogda arayayım; ya da ekibimize doğrudan ulaşın.',
    found: (n: number) => `Katalogda ${n} parça buldum:`, more: (n: number) => `${n} sonucun tamamını Parça Bulucu’da gör`, add: 'Sepete ekle', added: 'Sepette',
    note: 'Canlı destek değildir · girdiğiniz bilgiler saklanmaz',
    chips: ['Parça nasıl bulurum?', 'Teklif almak', 'Teslimat', 'Bayilik / B2B', 'Hangi markalar?', 'İletişim'],
  },
  en: {
    name: 'AKIN Assistant', sub: 'Automatic answers from the catalogue and site', open: 'Open assistant', close: 'Close', ph: 'Type a part, code or question …',
    hello: 'Hello! I can search parts (e.g. “70.56 brake”, “E007”, “hydraulic top link”) or answer questions about delivery, dealership and contact.',
    fallback: 'I didn’t quite get that. Type a part name, stock code or tractor model and I’ll search the catalogue, or contact our team directly.',
    found: (n: number) => `I found ${n} parts in the catalogue:`, more: (n: number) => `See all ${n} results in the Part Finder`, add: 'Add to quote', added: 'In list',
    note: 'Not a live chat · nothing you type is stored',
    chips: ['How do I find a part?', 'Getting a quote', 'Delivery', 'Dealers / B2B', 'Which brands?', 'Contact'],
  },
};
const CHIP_IDS = ['finder', 'quote', 'delivery', 'b2b', 'brands', 'contact'];

function intents(lang: Lang) {
  const tr = lang === 'tr'; const H = (p: string) => href(lang, p);
  const call: L = { l: tr ? 'Ara' : 'Call', h: `tel:${CONTACT.phone.replace(/\s/g, '')}` }, wa: L = { l: 'WhatsApp', h: `https://wa.me/${CONTACT.whatsapp}` };
  return [
    { id: 'greet', kw: ['merhaba', 'selam', 'gunaydin', 'iyi gunler', 'hello', 'hi', 'hey'], a: tr ? 'Merhaba! Parça arayabilir ya da sorularınızı yanıtlayabilirim.' : 'Hello! I can search parts or answer your questions.', links: [] as L[] },
    { id: 'finder', kw: ['nasil bul', 'parca bul', 'arama', 'bulamiyorum', 'how do i find', 'find a part', 'search', 'part finder'], a: tr ? 'Parça Bulucu’da traktör üzerinde sistemi seçin ya da ürün adını, stok kodunu (ör. E007) veya modeli (ör. 70.56) yazın. Bana da yazabilirsiniz, katalogda ararım.' : 'In the Part Finder pick a system on the tractor or type the part name, stock code (e.g. E007) or model (e.g. 70.56). You can also type it here and I’ll search.', links: [{ l: tr ? 'Parça Bulucu' : 'Part Finder', h: H('finder') }] },
    { id: 'quote', kw: ['teklif', 'fiyat', 'kac para', 'ne kadar', 'sepet', 'siparis', 'quote', 'price', 'cost', 'order', 'how much'], a: tr ? 'Parçaları teklif sepetine ekleyin, ardından e-posta ya da WhatsApp ile gönderin. Satış ekibimiz fiyat ve termini aynı gün iletir.' : 'Add parts to your quote list, then send it by email or WhatsApp. Our sales team replies with price and lead time the same day.', links: [{ l: tr ? 'Teklif Sepeti' : 'Quote List', h: H('quote') }, wa] },
    { id: 'delivery', kw: ['kargo', 'teslim', 'sevkiyat', 'gonderi', 'ne zaman gelir', 'ambar', 'delivery', 'shipping', 'dispatch', 'ship'], a: tr ? 'Stoktaki parçalar aynı gün kargoya verilir. Konya’dan Türkiye geneline kargo ve ağır parçalar için ambar ile gönderim yapılır.' : 'Parts in stock ship the same day, from Konya across Turkey by courier, with freight for heavy parts.', links: [{ l: tr ? 'Hizmetler' : 'Services', h: H('services') }] },
    { id: 'b2b', kw: ['bayi', 'bayilik', 'b2b', 'toptan', 'servis', 'dealer', 'wholesale', 'reseller'], a: tr ? 'Bayi ve servisler için özel fiyat listesi, toplu sipariş ve sipariş takibi B2B platformunda. Bayimiz olmak için bize yazın.' : 'Dealers and workshops get personal price lists, bulk orders and order tracking on the B2B platform. Write to us to become a dealer.', links: [{ l: 'B2B', h: H('b2b') }, { l: tr ? 'İletişim' : 'Contact', h: H('contact') }] },
    { id: 'brands', kw: ['marka', 'hangi traktor', 'uyumlu', 'ford', 'massey', 'mf ', 'utb', 'steyr', 'tumosan', 'fiat', 'new holland', 'brand', 'compatible'], a: tr ? 'Ford, Massey Ferguson, UTB, Steyr, 50NC (Fiat) ve Tümosan uyumlu parçalarımız var. Model numarasını yazarsanız (ör. 480, 55.46, TT50) uyumlu parçaları listelerim.' : 'We stock parts for Ford, Massey Ferguson, UTB, Steyr, 50NC (Fiat) and Tümosan. Type a model number (e.g. 480, 55.46, TT50) and I’ll list compatible parts.', links: [{ l: tr ? 'Parça Bulucu' : 'Part Finder', h: H('finder') }] },
    { id: 'contact', kw: ['iletisim', 'telefon', 'numara', 'adres', 'nerede', 'konum', 'mail', 'e-posta', 'whatsapp', 'contact', 'phone', 'address', 'where', 'email'], a: tr ? `Adres: ${CONTACT.address}. E-posta: ${CONTACT.email}. ${CONTACT.hours.tr}.` : `Address: ${CONTACT.address}. Email: ${CONTACT.email}. ${CONTACT.hours.en}.`, links: [call, wa, { l: tr ? 'İletişim' : 'Contact', h: H('contact') }] },
    { id: 'hours', kw: ['saat', 'acik mi', 'calisma', 'cumartesi', 'hours', 'open', 'saturday'], a: CONTACT.hours[lang], links: [call] },
    { id: 'about', kw: ['hakkinda', 'kimsiniz', 'ne zamandan', 'kurulus', 'kac yil', 'tecrube', 'about', 'since', 'founded', 'who are'], a: tr ? '1998’de Konya’da aile işletmesi olarak kurulduk. Bugün 50’yi aşkın uzman ve 15 ürün grubunda 565 stok koduyla çalışıyoruz.' : 'We were founded in Konya in 1998 as a family business. Today 50+ specialists work with 565 stock codes in 15 product groups.', links: [{ l: tr ? 'Hakkımızda' : 'About', h: H('about') }] },
    { id: 'photo', kw: ['fotograf', 'resim', 'kodu bilmiyorum', 'bilmiyorum', 'photo', 'picture', "don't know the code"], a: tr ? 'Kodu bilmiyorsanız parçanın fotoğrafını WhatsApp’tan gönderin; uzmanlarımız eşleştirsin.' : 'Don’t know the code? Send a photo of the part on WhatsApp and our specialists will match it.', links: [wa] },
    { id: 'refs', kw: ['referans', 'musteri', 'proje', 'kooperatif', 'belediye', 'reference', 'customer', 'project'], a: tr ? '5.000’i aşkın müşterimiz var: tarım işletmeleri, kooperatifler, belediyeler, eğitim kurumları ve servis/bayiler. Proje ve müşteri görüşlerini Referanslar sayfasında bulabilirsiniz.' : 'We serve more than 5,000 customers: farms, co-operatives, municipalities, schools and workshops/dealers. Projects and customer quotes are on the References page.', links: [{ l: tr ? 'Referanslar' : 'References', h: H('references') }] },
    { id: 'blog', kw: ['blog', 'haber', 'rehber', 'bakim', 'ariza', 'belirti', 'kis', 'news', 'guide', 'maintenance', 'symptom', 'winter'], a: tr ? 'Bakım ve parça seçimi üzerine rehberlerimiz var: debriyaj belirtileri, hidrolik orta kol seçimi ve kış öncesi soğutma kontrolü.' : 'We publish guides on maintenance and choosing parts: clutch symptoms, choosing a top link and a winter cooling checklist.', links: [{ l: tr ? 'Haberler & Blog' : 'News & Blog', h: H('news') }] },
    { id: 'thanks', kw: ['tesekkur', 'sagol', 'eyvallah', 'thank', 'thx'], a: tr ? 'Rica ederim! Başka bir parça arıyorsanız yazmanız yeterli.' : 'You’re welcome! Just type if you need another part.', links: [] },
  ].map(it => ({ ...it, kw: it.kw.map(k => ' ' + norm(k).trim()) }));
}

/** system words → filter */
const SYS_WORDS: [string[], SystemId][] = [
  [['fren', 'brake'], 'brakes'], [['hidrolik', 'hydraulic', 'orta kol', 'top link', 'ceki', 'kaldirma'], 'hydraulics'],
  [['debriyaj', 'sanziman', 'vites', 'disli', 'clutch', 'gear', 'gearbox', 'senkromec'], 'powertrain'], [['on duzen', 'dingil', 'direksiyon', 'perno', 'steering', 'axle'], 'steering'],
  [['radyator', 'sogutma', 'radiator', 'cooling'], 'cooling'], [['pim', 'civata', 'somun', 'pin', 'bolt', 'nut'], 'fasteners'], [['branda', 'canopy'], 'cab'],
];
const STOP = new Set(['ve', 'ile', 'icin', 'bir', 'var', 'mi', 'mu', 'lazim', 'ariyorum', 'istiyorum', 'parca', 'parcasi', 'the', 'for', 'a', 'need', 'part', 'parts', 'do', 'you', 'have']);

function search(q: string) {
  const t = norm(q);
  const sys = SYS_WORDS.find(([ws]) => ws.some(w => t.includes(' ' + norm(w).trim())))?.[1];
  const terms = t.trim().split(' ').filter(w => w.length > 1 && !STOP.has(w) && !(sys && SYS_WORDS.find(([, s]) => s === sys)![0].some(x => norm(x).trim().startsWith(w))));
  const code = terms.find(w => /^[a-z]{1,3}\d{2,3}$/.test(w));
  if (code) { const p = PRODUCTS.find(x => norm(x.code).trim() === code); if (p) return { list: [p], q: p.code }; }
  if (!terms.length && !sys) return null;
  const list = HAY.filter(({ p, h }) => (!sys || p.system === sys) && terms.every(w => h.includes(w))).map(x => x.p);
  return list.length ? { list, q: [...terms].join(' ') } : null;
}

export default function Assistant({ lang }: { lang: Lang }) {
  const u = UI[lang]; const q = useQuote();
  const ints = useMemo(() => intents(lang), [lang]);
  const [open, setOpen] = useState(false); const [msgs, setMsgs] = useState<Msg[]>([]); const [typing, setTyping] = useState(false); const [val, setVal] = useState('');
  const logRef = useRef<HTMLDivElement>(null); const inRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open && !msgs.length) setMsgs([{ who: 'bot', text: u.hello, chips: true }]); if (open) setTimeout(() => inRef.current?.focus(), 250); }, [open]); // eslint-disable-line
  useEffect(() => { logRef.current?.scrollTo({ top: 1e6, behavior: 'smooth' }); }, [msgs, typing]);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  useEffect(() => { if (open) q.lenis.current?.stop(); else q.lenis.current?.start(); }, [open, q.lenis]);

  const reply = (text: string) => {
    const t = norm(text); let best: (typeof ints)[number] | null = null, score = 0;
    for (const it of ints) { let s = 0; for (const k of it.kw) if (t.includes(k)) s += k.length > 5 ? 2 : 1; if (s > score) { score = s; best = it; } }
    const hit = search(text);
    const out: Msg[] = [];
    // a found part beats a weak intent match ("fren diski" is a part, not a brands question)
    if (hit && (!best || score < 2 || ['brands', 'greet'].includes(best.id))) {
      out.push({ who: 'bot', text: u.found(hit.list.length), parts: hit.list.slice(0, 4), more: hit.list.length > 4 ? { q: hit.q, n: hit.list.length } : undefined });
    } else if (best) out.push({ who: 'bot', text: best.a, links: best.links });
    else out.push({ who: 'bot', text: u.fallback, links: [{ l: 'WhatsApp', h: `https://wa.me/${CONTACT.whatsapp}` }, { l: lang === 'tr' ? 'Parça Bulucu' : 'Part Finder', h: href(lang, 'finder') }], chips: true });
    setTyping(true); setTimeout(() => { setTyping(false); setMsgs(m => [...m, ...out]); }, 420);
  };
  const ask = (text: string) => { text = text.trim(); if (!text) return; setMsgs(m => [...m, { who: 'me', text }]); reply(text); };
  const chip = (i: number) => { const it = ints.find(x => x.id === CHIP_IDS[i])!; setMsgs(m => [...m, { who: 'me', text: u.chips[i] }]); setTyping(true); setTimeout(() => { setTyping(false); setMsgs(m => [...m, { who: 'bot', text: it.a, links: it.links }]); }, 380); };

  return (
    <div className={'asst' + (open ? ' open' : '')}>
      <div className="asst-panel" role="dialog" aria-label={u.name} aria-hidden={!open} data-lenis-prevent>
        <div className="asst-head">
          <span className="asst-ava" aria-hidden>{LIGHT ? <svg viewBox={WHEEL_VB} className="wheel" dangerouslySetInnerHTML={{ __html: WHEEL }} /> : <svg viewBox="0 0 100 100" className="tread" dangerouslySetInnerHTML={{ __html: LOGO_B_ICON }} />}<i /></span>
          <div><b>{u.name}</b><span>{u.sub}</span></div>
          <button className="asst-x" onClick={() => setOpen(false)} aria-label={u.close}>✕</button>
        </div>
        <div className="asst-log" ref={logRef} aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={'amsg ' + m.who}>
              <p>{m.text}</p>
              {m.parts && <div className="aparts">{m.parts.map(p => (
                <div className="apart" key={p.code}>
                  <Link href={href(lang, `products/${p.slug}`)} onClick={() => setOpen(false)}><span className="mono">{p.code} · {groupName(p.group, lang)}</span><b>{p.name}</b>{p.modelsRaw && <em className="mono">{p.modelsRaw}</em>}</Link>
                  <button className={q.has(p.code) ? 'on' : ''} onClick={() => { q.add(p.code); q.toast(`${p.code} · ${lang === 'tr' ? 'teklif sepetine eklendi' : 'added to quote list'}`); }}>{q.has(p.code) ? '✓ ' + u.added : '+ ' + u.add}</button>
                </div>))}</div>}
              {m.more && <Link className="amore" href={href(lang, 'finder') + `?q=${encodeURIComponent(m.more.q)}`} onClick={() => setOpen(false)}>{u.more(m.more.n)} →</Link>}
              {m.links && m.links.length > 0 && <div className="alinks">{m.links.map(l => /^https?:|^tel:/.test(l.h) ? <a key={l.h} href={l.h} target={l.h.startsWith('http') ? '_blank' : undefined} rel="noopener">{l.l} →</a> : <Link key={l.h} href={l.h} onClick={() => setOpen(false)}>{l.l} →</Link>)}</div>}
              {m.chips && <div className="achips">{u.chips.map((c, k) => <button key={c} onClick={() => chip(k)}>{c}</button>)}</div>}
            </div>
          ))}
          {typing && <div className="amsg bot typing"><span /><span /><span /></div>}
        </div>
        <form className="asst-form" onSubmit={e => { e.preventDefault(); ask(val); setVal(''); }}>
          <input ref={inRef} value={val} onChange={e => setVal(e.target.value)} placeholder={u.ph} aria-label={u.ph} maxLength={160} autoComplete="off" />
          <button aria-label="send"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 8h11M9 4l4 4-4 4" /></svg></button>
        </form>
        <div className="asst-note">{u.note}</div>
      </div>
      <button className="asst-fab" onClick={() => setOpen(!open)} aria-label={open ? u.close : u.open} aria-expanded={open}>
        <svg className="i-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10.5h.01M12 10.5h.01M16 10.5h.01" strokeWidth="2.6" strokeLinecap="round" /></svg>
        <svg className="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
    </div>
  );
}

