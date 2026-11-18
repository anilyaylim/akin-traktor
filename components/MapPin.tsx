'use client';
/* Contact map: the official Yandex map widget centred on Akın Traktör's coordinates (its own info balloon off),
   with our own location pin on top. Clicking the pin opens an info card with the Part Finder's frame
   animation: the pin pulses, a dashed vector line draws out to the card, the corner brackets open and the
   card fades in. The map itself is not draggable, so the pin always sits on the exact spot; "Get directions"
   opens the full Yandex listing. */
import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/lib/catalog';
import { CONTACT } from '@/lib/i18n';

const T = {
  tr: { eyebrow: 'Konum', name: 'Akın Traktör', sub: 'Traktör yedek parça · Konya', hours: 'Çalışma saatleri', phone: 'Telefon', dir: 'Yol tarifi al', open: 'Haritada aç', pin: 'Konum bilgisini göster', close: 'Kapat' },
  en: { eyebrow: 'Location', name: 'Akın Traktör', sub: 'Tractor spare parts · Konya', hours: 'Opening hours', phone: 'Phone', dir: 'Get directions', open: 'Open in maps', pin: 'Show location details', close: 'Close' },
};

export default function MapPin({ lang, title }: { lang: Lang; title: string }) {
  const x = T[lang]; const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false); const [seen, setSeen] = useState(false);
  // first time the map scrolls into view the card opens by itself (after the pin has landed)
  useEffect(() => {
    const el = ref.current!; let t = 0;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); t = window.setTimeout(() => setOpen(true), 1400); io.disconnect(); } }, { threshold: 0.45 });
    io.observe(el); return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  const src = `https://yandex.com.tr/map-widget/v1/?ll=${CONTACT.geo.lng}%2C${CONTACT.geo.lat}&z=17&l=map&lang=${lang === 'tr' ? 'tr_TR' : 'en_US'}`;
  return (
    <div ref={ref} className={'mapw mapx' + (seen ? ' seen' : '') + (open ? ' open' : '')}>
      <iframe title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={src} tabIndex={-1} />
      <div className="mx-shield" aria-hidden />
      <button className="mx-pin" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={x.pin}>
        <i className="mx-ring" /><i className="mx-ring r2" />
        <svg viewBox="0 0 40 52" aria-hidden><path d="M20 51C20 51 4 31.5 4 19a16 16 0 0 1 32 0c0 12.5-16 32-16 32z" className="mx-drop" /><circle cx="20" cy="19" r="7" className="mx-dot" /></svg>
      </button>
      <i className="mx-line" aria-hidden />
      <aside className="mx-card" aria-hidden={!open}>
        <i className="pf-c tl" /><i className="pf-c tr" /><i className="pf-c bl" /><i className="pf-c br" />
        <button className="pf-x" onClick={() => setOpen(false)} aria-label={x.close} tabIndex={open ? 0 : -1}>✕</button>
        <div className="mx-b">
          <span className="eyebrow">{x.eyebrow}</span>
          <div><b className="mx-name">{x.name}</b><span className="mono mx-sub">{x.sub}</span></div>
          <ul className="mx-rows">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg><span>{CONTACT.address}</span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg><span>{CONTACT.hours[lang]}</span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} tabIndex={open ? 0 : -1}>{CONTACT.phone}</a></li>
          </ul>
          <div className="mx-act">
            <a className="btn btn-red btn-sm" href={CONTACT.map} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>{x.dir} ↗</a>
            <span className="mono mx-geo">{CONTACT.geo.lat.toFixed(5)}° N · {CONTACT.geo.lng.toFixed(5)}° E</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
