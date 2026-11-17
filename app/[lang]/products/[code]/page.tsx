import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductActions, { Viewer } from '@/components/ProductActions';
import { Arrow, SysIcon } from '@/components/ui';
import { PRODUCTS, SYSTEMS, bySlug, groupName, GROUPS, type Lang } from '@/lib/catalog';
import { LANGS, href, t } from '@/lib/i18n';

export const dynamicParams = false;
export function generateStaticParams() { return LANGS.flatMap(lang => PRODUCTS.map(p => ({ lang, code: p.slug }))); }
type Params = Promise<{ lang: string; code: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, code } = await params; const p = bySlug(code); if (!p) return {};
  return { title: `${p.name} · ${p.code}`, description: `${p.name} (${p.code}) – ${groupName(p.group, lang as Lang)}. ${p.modelsRaw}` };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { lang: l, code } = await params; const lang = l as Lang; const p = bySlug(code); if (!p) notFound();
  const d = t(lang).product; const g = GROUPS[p.group];
  const related = PRODUCTS.filter(x => x.group === p.group && x.code !== p.code).slice(0, 4);
  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.name, sku: p.code, category: groupName(p.group, lang), brand: { '@type': 'Brand', name: 'AKIN' }, description: p.modelsRaw };
  return (
    <section className="pd">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap">
        <nav className="breadcrumb" style={{ marginBottom: 28 }}>
          <Link href={href(lang, 'products')}>← {d.back}</Link><span>/</span><Link href={href(lang, 'products') + `?g=${g.slug}`}>{groupName(p.group, lang)}</Link><span>/</span><span>{p.code}</span>
        </nav>
        <div className="pd-grid">
          <div className="pd-view" data-cursor>
            <Viewer kind={p.model} />
            <span className="code-big mono" aria-hidden>{p.code}</span>
            <span className="cap mono">{d.view}</span>
          </div>
          <div className="pd-info">
            <span className="eyebrow">{groupName(p.group, lang)}</span>
            <h1>{p.name}</h1>
            <ProductActions lang={lang} code={p.code} name={p.name} />
            <dl className="spec">
              <div><dt>{d.code}</dt><dd className="mono">{p.code}</dd></div>
              <div><dt>{d.group}</dt><dd>{groupName(p.group, lang)}</dd></div>
              <div><dt>{d.system}</dt><dd style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ width: 20, color: 'var(--red-2)', display: 'inline-flex' }}><SysIcon id={p.system} /></span>{SYSTEMS[p.system][lang]}</dd></div>
              <div><dt>{d.models}</dt><dd>{p.models.length ? <span className="models">{p.models.map(m => <span key={m} className="tag">{m}</span>)}</span> : <span className="muted">{p.modelsRaw && !/hepsine/i.test(p.modelsRaw) ? p.modelsRaw : d.universal}</span>}</dd></div>
            </dl>
            <p className="muted" style={{ fontSize: 13.5 }}>{d.note}</p>
          </div>
        </div>
        {related.length > 0 && (
          <div style={{ marginTop: 90 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 22 }}><h2 className="h3">{d.related}</h2><Link className="pcard-more" href={href(lang, 'products') + `?g=${g.slug}`}>{t(lang).systems.all} <Arrow /></Link></div>
            <div className="pgrid">
              {related.map(r => (
                <Link key={r.code} href={href(lang, `products/${r.slug}`)} className="pcard">
                  <div className="pcard-top"><span className="pcard-ic"><SysIcon id={r.system} /></span><span className="tag">{r.code}</span></div>
                  <h3>{r.name}</h3><p className="mono muted">{r.modelsRaw}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
