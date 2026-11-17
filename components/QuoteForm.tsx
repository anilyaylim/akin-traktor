'use client';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS, groupName, type Lang } from '@/lib/catalog';
import { CONTACT, href, t } from '@/lib/i18n';
import { useQuote } from './Providers';
import { quoteText } from './QuoteDrawer';
import { Arrow, SysIcon, WaIcon } from './ui';

const byCode = new Map(PRODUCTS.map(p => [p.code, p]));

/* Quote list page: lines + contact details → email draft or WhatsApp message (demo, no backend). */
export default function QuoteForm({ lang }: { lang: Lang }) {
  const d = t(lang).quote; const q = useQuote();
  const [f, setF] = useState({ name: '', company: '', email: '', phone: '', note: '' }); const [sent, setSent] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const who = `${f.name}${f.company ? ' · ' + f.company : ''}\n${f.email}${f.phone ? ' · ' + f.phone : ''}${f.note ? '\n\n' + f.note : ''}`;
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent((lang === 'tr' ? 'Teklif talebi – ' : 'Quote request – ') + (f.company || f.name))}&body=${encodeURIComponent(quoteText(lang, q.lines, who))}`; };
  if (!q.lines.length) return (
    <div style={{ padding: '40px 0 80px' }}><p className="lead" style={{ marginBottom: 26 }}>{d.empty}</p><Link className="btn btn-red" href={href(lang, 'finder')}>{d.browse} <Arrow /></Link></div>
  );
  return (
    <div className="cgrid" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
      <div>
        <div className="mono muted" style={{ fontSize: 12, marginBottom: 10 }}>{q.count} {d.items}</div>
        {q.lines.map(l => { const p = byCode.get(l.code); if (!p) return null; return (
          <div className="q-item" key={l.code} style={{ gridTemplateColumns: '54px 1fr auto auto' }}>
            <div className="ic"><SysIcon id={p.system} /></div>
            <div><span className="mono muted" style={{ fontSize: 11 }}>{p.code} · {groupName(p.group, lang)}</span><Link href={href(lang, `products/${p.slug}`)}><b>{p.name}</b></Link></div>
            <div className="qty"><button onClick={() => q.setQty(l.code, l.qty - 1)}>−</button><span>{l.qty}</span><button onClick={() => q.setQty(l.code, l.qty + 1)}>+</button></div>
            <button className="mono muted" style={{ fontSize: 12, paddingLeft: 10 }} onClick={() => q.remove(l.code)} aria-label={d.remove}>✕</button>
          </div>); })}
        <button className="mono muted" style={{ fontSize: 12, marginTop: 16, textDecoration: 'underline' }} onClick={q.clear}>{d.clear}</button>
      </div>
      <form className="cform" onSubmit={submit}>
        <h2 className="h3">{d.form}</h2>
        <div className="row">
          <div className="field"><label htmlFor="qn">{d.name}</label><input id="qn" required value={f.name} onChange={set('name')} autoComplete="name" /></div>
          <div className="field"><label htmlFor="qc">{d.company}</label><input id="qc" value={f.company} onChange={set('company')} autoComplete="organization" /></div>
        </div>
        <div className="row">
          <div className="field"><label htmlFor="qe">{d.email}</label><input id="qe" type="email" required value={f.email} onChange={set('email')} autoComplete="email" /></div>
          <div className="field"><label htmlFor="qp">{d.phone}</label><input id="qp" type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" /></div>
        </div>
        <div className="field"><label htmlFor="qnote">{d.note}</label><textarea id="qnote" rows={3} value={f.note} onChange={set('note')} /></div>
        <p className="mono muted" style={{ fontSize: 11.5 }}>{d.kvkk}</p>
        {sent && <p style={{ fontSize: 14, color: 'var(--steel-2)' }}>{d.sent}</p>}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-red">{d.send} <Arrow /></button>
          <a className="btn btn-ghost" target="_blank" rel="noopener" href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(quoteText(lang, q.lines, who.trim()))}`}><span style={{ width: 18, display: 'inline-flex' }}><WaIcon /></span>{d.wa}</a>
        </div>
      </form>
    </div>
  );
}
