'use client';
import Link from 'next/link';
import { groupName, type Lang, type Product } from '@/lib/catalog';
import { href, t } from '@/lib/i18n';
import { useQuote } from './Providers';
import { Arrow, SysIcon } from './ui';

/* One catalogue card (code, name, group, compatible models, add-to-quote) – shared by finder and catalogue. */
export default function ProductCard({ p, lang }: { p: Product; lang: Lang }) {
  const d = t(lang).finder; const q = useQuote(); const inQ = q.has(p.code);
  return (
    <article className="pcard">
      <Link href={href(lang, `products/${p.slug}`)} className="pcard-link" aria-label={p.name} />
      <div className="pcard-top"><span className="pcard-ic"><SysIcon id={p.system} /></span><span className="tag">{p.code}</span></div>
      <h3>{p.name}</h3>
      <p className="mono muted">{groupName(p.group, lang)}</p>
      {p.models.length > 0 && <p className="pcard-models"><span className="mono">{d.models}</span>{p.models.slice(0, 4).join(' · ')}{p.models.length > 4 ? ' …' : ''}</p>}
      <div className="pcard-act">
        <button className={'btn btn-sm ' + (inQ ? 'btn-white' : 'btn-ghost')} onClick={() => { q.add(p.code); q.toast(`${p.code} · ${lang === 'tr' ? 'teklif sepetine eklendi' : 'added to quote list'}`); }}>{inQ ? `✓ ${d.added}` : `+ ${d.add}`}</button>
        <Link href={href(lang, `products/${p.slug}`)} className="pcard-more">{d.details} <Arrow /></Link>
      </div>
    </article>
  );
}
