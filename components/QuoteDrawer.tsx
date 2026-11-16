'use client';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS, groupName, type Lang } from '@/lib/catalog';
import { CONTACT, href, t } from '@/lib/i18n';
import { useQuote } from './Providers';
import { Arrow, SysIcon, WaIcon } from './ui';

const byCode = new Map(PRODUCTS.map(p => [p.code, p]));

export function quoteText(lang: Lang, lines: { code: string; qty: number }[], extra = '') {
  const head = lang === 'tr' ? 'Merhaba, aşağıdaki parçalar için fiyat teklifi rica ediyorum:' : 'Hello, I would like a quote for the following parts:';
  const rows = lines.map(l => { const p = byCode.get(l.code); return `• ${l.code} – ${p?.name ?? ''} × ${l.qty}`; });
  return [head, '', ...rows, extra ? '\n' + extra : ''].join('\n');
}

export default function QuoteDrawer({ lang }: { lang: Lang }) {
  const d = t(lang).quote; const { lines, open, setOpen, setQty, remove, clear, count } = useQuote();
  const [sent, setSent] = useState(false);
  const wa = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(quoteText(lang, lines))}`;
  return (
    <>
      <div className={'drawer-bg' + (open ? ' open' : '')} onClick={() => setOpen(false)} />
      <aside className={'drawer' + (open ? ' open' : '')} aria-hidden={!open} aria-label={d.title} data-lenis-prevent>
        <div className="drawer-h">
          <div><div className="eyebrow">{d.title}</div><div className="mono muted" style={{ fontSize: 12, marginTop: 6 }}>{count} {d.items}</div></div>
          <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>✕</button>
        </div>
        <div className="drawer-b">
          {lines.length === 0 && (
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <p className="muted" style={{ marginBottom: 20 }}>{d.empty}</p>
              <Link href={href(lang, 'products')} className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>{d.browse} <Arrow /></Link>
            </div>
          )}
          {lines.map(l => {
            const p = byCode.get(l.code); if (!p) return null;
            return (
              <div className="q-item" key={l.code}>
                <div className="ic"><SysIcon id={p.system} /></div>
                <div><span className="mono muted" style={{ fontSize: 11 }}>{p.code} · {groupName(p.group, lang)}</span><b>{p.name}</b>
                  <button className="mono muted" style={{ fontSize: 11, marginTop: 4, textDecoration: 'underline' }} onClick={() => remove(l.code)}>{d.remove}</button></div>
                <div className="qty"><button onClick={() => setQty(l.code, l.qty - 1)} aria-label="-">−</button><span>{l.qty}</span><button onClick={() => setQty(l.code, l.qty + 1)} aria-label="+">+</button></div>
              </div>
            );
          })}
        </div>
        {lines.length > 0 && (
          <div className="drawer-f">
            {sent && <p style={{ fontSize: 13.5, color: 'var(--steel-2)' }}>{d.sent}</p>}
            <Link href={href(lang, 'quote')} className="btn btn-red" style={{ justifyContent: 'center' }} onClick={() => { setOpen(false); setSent(false); }}>{d.send} <Arrow /></Link>
            <a href={wa} target="_blank" rel="noopener" className="btn btn-ghost" style={{ justifyContent: 'center' }}><span style={{ width: 18, display: 'inline-flex' }}><WaIcon /></span>{d.wa}</a>
            <button className="mono muted" style={{ fontSize: 12 }} onClick={clear}>{d.clear}</button>
          </div>
        )}
      </aside>
    </>
  );
}
