'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/lib/catalog';
import { href, t } from '@/lib/i18n';
import { useQuote } from './Providers';
import { Arrow, CartIcon, Logo } from './ui';
import QuoteDrawer from './QuoteDrawer';
import { ALT_BASE, ALT_ON, LIGHT } from '@/lib/theme';

const LockIcon = () => <svg className="lock-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>;

export default function Header({ lang }: { lang: Lang }) {
  const d = t(lang); const path = usePathname() || `/${lang}/`;
  const { count, setOpen } = useQuote();
  const [scrolled, setScrolled] = useState(false); const [hide, setHide] = useState(false); const [menu, setMenu] = useState(false);
  const [bump, setBump] = useState(false); const prev = useRef(count);
  useEffect(() => {
    let last = 0;
    const on = () => { const y = scrollY; setScrolled(y > 30); setHide(y > 400 && y > last); last = y; };
    on(); addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on);
  }, []);
  useEffect(() => { if (count > prev.current) { setHide(false); setBump(true); setTimeout(() => setBump(false), 650); } prev.current = count; }, [count]);   // reveal the header so the cart bump is seen
  useEffect(() => setMenu(false), [path]);
  const other: Lang = lang === 'tr' ? 'en' : 'tr';
  const swap = path.replace(/^\/(tr|en)(?=\/|$)/, '/' + other);
  const items: [string, string][] = [['products', d.nav.products], ['about', d.nav.about], ['services', d.nav.services], ['references', d.nav.refs], ['news', d.nav.news], ['contact', d.nav.contact]];
  const mitems: [string, string][] = [['products', d.nav.products], ['finder', d.nav.finder], ...items.slice(1)];
  const on = (p: string) => path.startsWith(href(lang, p.split('/#')[0])) && !p.includes('#');
  return (
    <>
      <header className={'hdr' + (scrolled ? ' scrolled' : '') + (hide && !menu ? ' hide' : '')}>
        <div className="wrap hdr-in">
          <Link href={href(lang)} aria-label="AKIN"><Logo sub={lang === 'tr' ? 'Traktör\nYedek Parça' : 'Tractor\nParts'} /></Link>
          <nav className="nav" aria-label="main">
            {items.map(([p, l]) => <Link key={p} href={href(lang, p.split('#')[0]) + (p.includes('#') ? '#finder' : '')} className={on(p) ? 'on' : ''}>{l}</Link>)}
          </nav>
          <div className="hdr-r">
            <div className="lang"><Link href={lang === 'tr' ? path : swap} className={lang === 'tr' ? 'on' : ''}>TR</Link><Link href={lang === 'en' ? path : swap} className={lang === 'en' ? 'on' : ''}>EN</Link></div>
            {ALT_ON && <a className="ver" href={ALT_BASE + path} title={LIGHT ? (lang === 'tr' ? 'Koyu versiyon' : 'Dark version') : (lang === 'tr' ? 'Açık versiyon' : 'Light version')}><i /><span>{LIGHT ? (lang === 'tr' ? 'Koyu' : 'Dark') : (lang === 'tr' ? 'Açık' : 'Light')}</span></a>}
            <Link className={'b2b-btn' + (on('b2b') ? ' on' : '')} href={href(lang, 'b2b')} title={d.b2b.cta}><LockIcon /><span>{d.nav.b2b}</span></Link>
            <button className={'cart-btn' + (bump ? ' bump' : '')} onClick={() => setOpen(true)} aria-label={d.nav.quote}><CartIcon />{count > 0 && <b>{count}</b>}</button>
            <Link href={href(lang, 'finder')} className="btn btn-red btn-sm">{d.nav.finder} <Arrow /></Link>
            <button className={'burger' + (menu ? ' open' : '')} onClick={() => setMenu(!menu)} aria-label={menu ? d.nav.close : d.nav.menu} aria-expanded={menu}><i /><i /></button>
          </div>
        </div>
      </header>
      <nav className={'mnav' + (menu ? ' open' : '')} aria-hidden={!menu}>
        {mitems.map(([p, l], i) => <Link key={p} className="big" href={href(lang, p.split('#')[0]) + (p.includes('#') ? '#finder' : '')}>{l}<span>0{i + 1}</span></Link>)}
        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <Link href={swap} className="btn btn-ghost btn-sm">{other.toUpperCase()}</Link>
          <button className="btn btn-red btn-sm" onClick={() => { setMenu(false); setOpen(true); }}>{d.nav.quote} ({count})</button>
          <Link className="btn btn-ghost btn-sm" href={href(lang, 'b2b')}><LockIcon /> {d.nav.b2b}</Link>
        </div>
      </nav>
      <QuoteDrawer lang={lang} />
    </>
  );
}
