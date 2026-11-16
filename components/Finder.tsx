'use client';
/* Part Finder: 3D tractor (pick a system) + instant search over the real 565-code catalogue
   (name, stock code, compatible model), group/brand chips, quote list integration. */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { BRANDS, GROUPS, PRODUCTS, SYSTEMS, groupName, type Lang, type SystemId } from '@/lib/catalog';
import { href, t } from '@/lib/i18n';
import { useQuote } from './Providers';
import { Arrow, SysIcon } from './ui';

const TractorScene = dynamic(() => import('./three/TractorScene'), { ssr: false, loading: () => <div className="finder-load mono">3D …</div> });

const norm = (s: string) => s.toLocaleLowerCase('tr').replace(/[ıi̇]/g, 'i').replace(/[şs]/g, 's').replace(/[ğg]/g, 'g').replace(/[üu]/g, 'u').replace(/[öo]/g, 'o').replace(/[çc]/g, 'c');
const INDEX = PRODUCTS.map(p => ({ p, hay: norm([p.name, p.code, p.modelsRaw, p.group].join(' ')) }));
const PAGE = 24;

export default function Finder({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const d = t(lang).finder; const q = useQuote();
  const [sys, setSys] = useState<SystemId | null>(null); const [group, setGroup] = useState<string | null>(null); const [brand, setBrand] = useState<string | null>(null);
  const [query, setQuery] = useState(''); const [n, setN] = useState(PAGE);
  // deep links: ?g=<group-slug>, ?s=<system>, ?q=<text>
  useEffect(() => {
    const u = new URLSearchParams(location.search);
    const g = u.get('g'); if (g) { const k = Object.keys(GROUPS).find(k => GROUPS[k].slug === g); if (k) { setGroup(k); setSys(GROUPS[k].system); } }
    const s = u.get('s') as SystemId | null; if (s && SYSTEMS[s]) setSys(s);
    const qq = u.get('q'); if (qq) setQuery(qq);
  }, []);
  useEffect(() => setN(PAGE), [sys, group, brand, query]);
  // product-group tiles on the products page talk to the finder through a window event
  useEffect(() => {
    const on = (e: Event) => { const g = (e as CustomEvent).detail?.group as string; if (g && GROUPS[g]) { setSys(GROUPS[g].system); setGroup(g); setBrand(null); setQuery(''); } };
    addEventListener('akin-filter', on); return () => removeEventListener('akin-filter', on);
  }, []);
  const labels = useMemo(() => Object.fromEntries(Object.entries(SYSTEMS).map(([k, v]) => [k, v[lang]])) as Record<SystemId, string>, [lang]);
  const res = useMemo(() => {
    const terms = norm(query).split(/\s+/).filter(Boolean);
    return INDEX.filter(({ p, hay }) =>
      (!sys || p.system === sys) && (!group || p.group === group) &&
      (!brand || (brand === 'New Holland / Fiat' ? /\d{2}[.\-]\d{2}|\b(480|540|640|TT\d|TD\d)/i.test(p.modelsRaw) : brand === 'Tümosan' ? /tümosan|tumosan/i.test(p.name) : p.brand === brand || hay.includes(norm(brand)))) &&
      terms.every(t => hay.includes(t))).map(x => x.p);
  }, [sys, group, brand, query]);
  const groupsHere = useMemo(() => Object.keys(GROUPS).filter(k => !sys || GROUPS[k].system === sys), [sys]);
  const count = (k: string) => PRODUCTS.filter(p => p.group === k).length;
  const reset = () => { setSys(null); setGroup(null); setBrand(null); setQuery(''); };

  return (
    <div className={'finder' + (compact ? ' compact' : '')}>
      <div className="finder-3d" data-cursor>
        <TractorScene sel={sys} onSel={s => { setSys(s); setGroup(null); }} labels={labels} />
        <div className="finder-3d-cap">
          <span className="eyebrow">{sys ? SYSTEMS[sys][lang] : d.tap}</span>
          <p className="muted">{sys ? SYSTEMS[sys][lang === 'tr' ? 'trD' : 'enD'] : d.sub}</p>
        </div>
      </div>
      {!compact && (
        <div className="finder-list">
          <div className="finder-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={d.search} aria-label={d.search} />
            {query && <button onClick={() => setQuery('')} aria-label="clear">✕</button>}
          </div>
          <div className="finder-chips">
            <span className="mono muted lbl">{d.systems}</span>
            <button className={'chip' + (!sys ? ' on' : '')} onClick={() => { setSys(null); setGroup(null); }}>{d.all}</button>
            {(Object.keys(SYSTEMS) as SystemId[]).map(s => <button key={s} className={'chip' + (sys === s ? ' on' : '')} onClick={() => { setSys(sys === s ? null : s); setGroup(null); }}><SysIco id={s} />{SYSTEMS[s][lang]}</button>)}
          </div>
          <div className="finder-chips">
            {groupsHere.map(k => <button key={k} className={'chip' + (group === k ? ' on' : '')} onClick={() => setGroup(group === k ? null : k)}>{groupName(k, lang)} <span className="n">{count(k)}</span></button>)}
          </div>
          <div className="finder-chips">
            <span className="mono muted lbl">{d.brands}</span>
            {BRANDS.map(b => <button key={b} className={'chip' + (brand === b ? ' on' : '')} onClick={() => setBrand(brand === b ? null : b)}>{b}</button>)}
          </div>
          <div className="finder-meta mono"><span><b>{res.length}</b> {d.results}</span>{(sys || group || brand || query) && <button onClick={reset}>{d.reset} ✕</button>}</div>
          <div className="pgrid">
            {res.slice(0, n).map(p => {
              const inQ = q.has(p.code);
              return (
                <article key={p.code} className="pcard">
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
            })}
          </div>
          {res.length === 0 && <div className="finder-empty"><p>{d.empty}</p><button className="btn btn-ghost btn-sm" onClick={reset}>{d.reset}</button></div>}
          {res.length > n && <div style={{ textAlign: 'center', marginTop: 34 }}><button className="btn btn-ghost" onClick={() => setN(n + PAGE * 2)}>{d.more} ({res.length - n})</button></div>}
        </div>
      )}
    </div>
  );
}
const SysIco = ({ id }: { id: SystemId }) => <span style={{ width: 16, display: 'inline-flex' }}><SysIcon id={id} /></span>;
