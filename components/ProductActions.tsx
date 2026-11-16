'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { Lang, ModelKind } from '@/lib/catalog';
import { CONTACT, t } from '@/lib/i18n';
import { useQuote } from './Providers';
import { Arrow, WaIcon } from './ui';

const PartViewer = dynamic(() => import('./three/PartViewer'), { ssr: false });
export function Viewer({ kind }: { kind: ModelKind }) { return <PartViewer kind={kind} />; }

export default function ProductActions({ lang, code, name }: { lang: Lang; code: string; name: string }) {
  const d = t(lang).product; const q = useQuote(); const [n, setN] = useState(1);
  const wa = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`${lang === 'tr' ? 'Merhaba, bu parça hakkında bilgi almak istiyorum' : 'Hello, I would like information about this part'}: ${code} – ${name}`)}`;
  return (
    <div className="pd-buy">
      <div className="qty" aria-label={d.qty}><button onClick={() => setN(Math.max(1, n - 1))}>−</button><span>{n}</span><button onClick={() => setN(n + 1)}>+</button></div>
      <button className="btn btn-red" onClick={() => { q.add(code, n); q.toast(`${code} × ${n} · ${d.added}`); }}>{d.add} <Arrow /></button>
      <a className="btn btn-ghost" href={wa} target="_blank" rel="noopener"><span style={{ width: 18, display: 'inline-flex' }}><WaIcon /></span>{d.wa}</a>
    </div>
  );
}
