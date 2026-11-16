'use client';
/* Product-group index above the Part Finder: one tile per group with count; a click filters the finder. */
import { GROUPS, PRODUCTS, type Lang } from '@/lib/catalog';
import { SysIcon } from './ui';

export default function GroupGrid({ lang }: { lang: Lang }) {
  const go = (cat: string) => {
    window.dispatchEvent(new CustomEvent('akin-filter', { detail: { group: cat } }));
    document.getElementById('finder')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="ggrid">
      {Object.entries(GROUPS).map(([cat, g], i) => (
        <button key={cat} className="gtile fade" style={{ transitionDelay: (i % 5) * 50 + 'ms' }} onClick={() => go(cat)}>
          <span className="gtile-ic"><SysIcon id={g.system} /></span>
          <b>{g[lang]}</b>
          <span className="mono">{String(PRODUCTS.filter(p => p.group === cat).length).padStart(3, '0')}</span>
        </button>
      ))}
    </div>
  );
}
