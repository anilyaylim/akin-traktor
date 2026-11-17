'use client';
/* Part Finder: a large 3D tractor stage (pick a system → it blinks, detaches, flies to the free side and
   is framed with a short description) + a tidy filter bar (search · group · brand · system tabs) over the
   real 565-code catalogue, with quote-list integration. mode="teaser" shows only the stage (home page). */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BRANDS, GROUPS, PRODUCTS, SYSTEMS, groupName, type Lang, type SystemId } from '@/lib/catalog';
import { href, t } from '@/lib/i18n';
import { p as pages } from '@/lib/pages';
import { Arrow, SysIcon } from './ui';
import ProductCard from './ProductCard';

const TractorScene = dynamic(() => import('./three/TractorScene'), { ssr: false, loading: () => <div className="finder-load mono">3D …</div> });

export const norm = (s: string) => s.toLocaleLowerCase('tr').replace(/[ıi̇]/g, 'i').replace(/[şs]/g, 's').replace(/[ğg]/g, 'g').replace(/[üu]/g, 'u').replace(/[öo]/g, 'o').replace(/[çc]/g, 'c');
const INDEX = PRODUCTS.map(p => ({ p, hay: norm([p.name, p.code, p.modelsRaw, p.group].join(' ')) }));
export const brandMatch = (p: (typeof PRODUCTS)[number], hay: string, brand: string) =>
  brand === 'New Holland / Fiat' ? /\d{2}[.\-]\d{2}|\b(480|540|640|TT\d|TD\d)/i.test(p.modelsRaw) : brand === 'Tümosan' ? /tümosan|tumosan/i.test(p.name) : p.brand === brand || hay.includes(norm(brand));
const PAGE = 24;
const sysCount = (s: SystemId) => PRODUCTS.filter(p => p.system === s).length;

export default function Finder({ lang, mode = 'full' }: { lang: Lang; mode?: 'full' | 'teaser' }) {
  const d = t(lang).finder; const x = pages(lang);
  const [sys, setSys] = useState<SystemId | null>(null); const [group, setGroup] = useState<string | null>(null); const [brand, setBrand] = useState<string | null>(null);
  const [query, setQuery] = useState(''); const [n, setN] = useState(PAGE);
  const [framed, setFramed] = useState(false); const listRef = useRef<HTMLDivElement>(null);
  // deep links: ?s=<system>, ?q=<text>, ?g=<group-slug>
  useEffect(() => {
    const u = new URLSearchParams(location.search);
    const g = u.get('g'); if (g) { const k = Object.keys(GROUPS).find(k => GROUPS[k].slug === g); if (k) { setGroup(k); setSys(GROUPS[k].system); } }
    const s = u.get('s') as SystemId | null; if (s && SYSTEMS[s]) setSys(s);
    const qq = u.get('q'); if (qq) setQuery(qq);
  }, []);
  useEffect(() => setN(PAGE), [sys, group, brand, query]);
  // the description frame appears once the part has detached (blink 0.9 s + flight)
  useEffect(() => { setFramed(false); if (!sys) return; const id = setTimeout(() => setFramed(true), 1500); return () => clearTimeout(id); }, [sys]);
  const labels = useMemo(() => Object.fromEntries(Object.entries(SYSTEMS).map(([k, v]) => [k, v[lang]])) as Record<SystemId, string>, [lang]);
  const res = useMemo(() => {
    const terms = norm(query).split(/\s+/).filter(Boolean);
    return INDEX.filter(({ p, hay }) => (!sys || p.system === sys) && (!group || p.group === group) && (!brand || brandMatch(p, hay, brand)) && terms.every(w => hay.includes(w))).map(i => i.p);
  }, [sys, group, brand, query]);
  const groupsHere = useMemo(() => Object.keys(GROUPS).filter(k => !sys || GROUPS[k].system === sys), [sys]);
  const reset = () => { setSys(null); setGroup(null); setBrand(null); setQuery(''); };
  const pick = useCallback((s: SystemId | null) => { setSys(s); setGroup(null); }, []);
  const seeParts = () => mode === 'full' ? listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) : undefined;

  return (
    <div className={'finder2 ' + mode}>
      <div className={'stage' + (sys ? ' has-sel' : '')} data-cursor>
        <TractorScene sel={sys} onSel={pick} labels={labels} />
        <div className="stage-cap">
          <span className="eyebrow">{d.tap}</span>
          <p className="muted">{x.frame.hint}</p>
        </div>
        <aside className={'pframe' + (sys && framed ? ' on' : '')} aria-live="polite">
          {sys && <>
            <i className="pf-c tl" /><i className="pf-c tr" /><i className="pf-c bl" /><i className="pf-c br" />
            <button className="pf-x" onClick={() => pick(null)} aria-label={x.frame.close}>✕</button>
            <div className="pf-b">
              <div className="pf-h"><span className="pf-ic"><SysIcon id={sys} /></span><div><span className="eyebrow">{SYSTEMS[sys][lang]}</span><b className="mono">{sysCount(sys)} {x.frame.parts}</b></div></div>
              <p>{x.sysDetail[sys]}</p>
              {mode === 'full'
                ? <button className="btn btn-red btn-sm" onClick={seeParts}>{x.frame.see} <Arrow /></button>
                : <Link className="btn btn-red btn-sm" href={href(lang, 'finder') + `?s=${sys}`}>{x.frame.see} <Arrow /></Link>}
            </div>
          </>}
        </aside>
      </div>

      {mode === 'full' && (
        <div className="flist" ref={listRef}>
          <div className="fbar">
            <div className="fbar-row">
              <label className="finder-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder={d.search} aria-label={d.search} />
                {query && <button onClick={() => setQuery('')} aria-label="clear">✕</button>}
              </label>
              <label className="fsel"><span>{x.filters.group}</span>
                <select value={group ?? ''} onChange={e => setGroup(e.target.value || null)}>
                  <option value="">{x.filters.allGroups}</option>
                  {groupsHere.map(k => <option key={k} value={k}>{groupName(k, lang)} ({PRODUCTS.filter(p => p.group === k).length})</option>)}
                </select></label>
              <label className="fsel"><span>{x.filters.brand}</span>
                <select value={brand ?? ''} onChange={e => setBrand(e.target.value || null)}>
                  <option value="">{x.filters.allBrands}</option>
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select></label>
            </div>
            <div className="systabs" role="tablist" aria-label={d.systems}>
              <button role="tab" aria-selected={!sys} className={!sys ? 'on' : ''} onClick={() => pick(null)}>{d.all}<span className="mono">{PRODUCTS.length}</span></button>
              {(Object.keys(SYSTEMS) as SystemId[]).map(s => (
                <button role="tab" aria-selected={sys === s} key={s} className={sys === s ? 'on' : ''} onClick={() => pick(sys === s ? null : s)}>
                  <span className="st-ic"><SysIcon id={s} /></span>{SYSTEMS[s][lang]}<span className="mono">{sysCount(s)}</span>
                </button>))}
            </div>
          </div>
          <div className="finder-meta mono">
            <span><b>{res.length}</b> {d.results}</span>
            <span className="fpills">
              {sys && <button onClick={() => pick(null)}>{SYSTEMS[sys][lang]} ✕</button>}
              {group && <button onClick={() => setGroup(null)}>{groupName(group, lang)} ✕</button>}
              {brand && <button onClick={() => setBrand(null)}>{brand} ✕</button>}
              {query && <button onClick={() => setQuery('')}>“{query}” ✕</button>}
              {(sys || group || brand || query) && <button className="clr" onClick={reset}>{d.reset}</button>}
            </span>
          </div>
          <div className="pgrid pgrid4">{res.slice(0, n).map(p => <ProductCard key={p.code} p={p} lang={lang} />)}</div>
          {res.length === 0 && <div className="finder-empty"><p>{d.empty}</p><button className="btn btn-ghost btn-sm" onClick={reset}>{d.reset}</button></div>}
          {res.length > n && <div style={{ textAlign: 'center', marginTop: 34 }}><button className="btn btn-ghost" onClick={() => setN(n + PAGE * 2)}>{d.more} ({res.length - n})</button></div>}
        </div>
      )}
    </div>
  );
}
