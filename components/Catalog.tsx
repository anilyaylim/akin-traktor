'use client';
/* Products page = catalogue: group showcase cards (blueprint covers) + a sidebar/grid browser.
   Different from the Part Finder: you browse by product group, not by place on the tractor. */
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BRANDS, GROUPS, PRODUCTS, SYSTEMS, groupName, type Lang } from '@/lib/catalog';
import { href, t } from '@/lib/i18n';
import { p as pages } from '@/lib/pages';
import PostCover from './PostCover';
import ProductCard from './ProductCard';
import { brandMatch, norm } from './Finder';
import { Arrow, SysIcon } from './ui';

const PAGE = 24;
const COUNT = Object.fromEntries(Object.keys(GROUPS).map(k => [k, PRODUCTS.filter(p => p.group === k).length]));
const ORDERED = Object.keys(GROUPS).sort((a, b) => COUNT[b] - COUNT[a]);

export default function Catalog({ lang }: { lang: Lang }) {
  const x = pages(lang).catalog; const f = pages(lang).filters; const d = t(lang).finder;
  const [group, setGroup] = useState<string | null>(null); const [brand, setBrand] = useState<string | null>(null);
  const [query, setQuery] = useState(''); const [sort, setSort] = useState<'code' | 'name'>('code'); const [n, setN] = useState(PAGE);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const g = new URLSearchParams(location.search).get('g'); const k = g && Object.keys(GROUPS).find(k => GROUPS[k].slug === g); if (k) setGroup(k); }, []);
  useEffect(() => setN(PAGE), [group, brand, query, sort]);
  const res = useMemo(() => {
    const terms = norm(query).split(/\s+/).filter(Boolean);
    const l = PRODUCTS.filter(p => { const hay = norm([p.name, p.code, p.modelsRaw].join(' ')); return (!group || p.group === group) && (!brand || brandMatch(p, hay, brand)) && terms.every(w => hay.includes(w)); });
    return sort === 'name' ? [...l].sort((a, b) => a.name.localeCompare(b.name, 'tr')) : l;
  }, [group, brand, query, sort]);
  const open = (k: string | null) => { setGroup(k); setTimeout(() => listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30); };
  return (
    <>
      <div className="gshow">
        {ORDERED.slice(0, 6).map((k, i) => (
          <button key={k} className={'gcard fade' + (i < 2 ? ' big' : '')} style={{ transitionDelay: (i % 3) * 70 + 'ms' }} onClick={() => open(k)}>
            <span className="gcard-img"><PostCover kind={GROUPS[k].model} label={groupName(k, lang)} /></span>
            <span className="gcard-b"><span className="mono">{String(COUNT[k]).padStart(3, '0')} · {SYSTEMS[GROUPS[k].system][lang]}</span><b>{groupName(k, lang)}</b><em>{x.browse} <Arrow /></em></span>
          </button>))}
      </div>
      <div className="finder-cta">
        <div><b>{x.finderT}</b><p className="muted">{x.finderP}</p></div>
        <Link className="btn btn-red" href={href(lang, 'finder')}>{x.finderB} <Arrow /></Link>
      </div>
      <div className="catalog" ref={listRef}>
        <aside className="cat-side" data-lenis-prevent>
          <span className="eyebrow">{x.groups}</span>
          <button className={'cat-g' + (!group ? ' on' : '')} onClick={() => setGroup(null)}><b>{x.all}</b><span className="mono">{PRODUCTS.length}</span></button>
          {ORDERED.map(k => <button key={k} className={'cat-g' + (group === k ? ' on' : '')} onClick={() => setGroup(k)}><span className="cg-ic"><SysIcon id={GROUPS[k].system} /></span><b>{groupName(k, lang)}</b><span className="mono">{COUNT[k]}</span></button>)}
        </aside>
        <div className="cat-main">
          <div className="cat-head">
            <div><span className="eyebrow">{group ? SYSTEMS[GROUPS[group].system][lang] : x.eyebrow}</span><h2 className="h3">{group ? groupName(group, lang) : x.all}</h2><span className="mono muted">{res.length} {d.results}</span></div>
            <div className="cat-tools">
              <label className="finder-search sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg><input value={query} onChange={e => setQuery(e.target.value)} placeholder={x.search} aria-label={x.search} /></label>
              <label className="fsel"><span>{f.brand}</span><select value={brand ?? ''} onChange={e => setBrand(e.target.value || null)}><option value="">{f.allBrands}</option>{BRANDS.map(b => <option key={b} value={b}>{b}</option>)}</select></label>
              <label className="fsel"><span>{x.sort}</span><select value={sort} onChange={e => setSort(e.target.value as 'code' | 'name')}><option value="code">{x.byCode}</option><option value="name">{x.byName}</option></select></label>
            </div>
          </div>
          <div className="pgrid pgrid3">{res.slice(0, n).map(p => <ProductCard key={p.code} p={p} lang={lang} />)}</div>
          {res.length === 0 && <div className="finder-empty"><p>{d.empty}</p></div>}
          {res.length > n && <div style={{ textAlign: 'center', marginTop: 34 }}><button className="btn btn-ghost" onClick={() => setN(n + PAGE * 2)}>{d.more} ({res.length - n})</button></div>}
        </div>
      </div>
    </>
  );
}
