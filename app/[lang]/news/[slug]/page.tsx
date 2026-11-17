import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import PostCover from '@/components/PostCover';
import { Arrow, SysIcon } from '@/components/ui';
import { GROUPS, PRODUCTS, groupName, type Lang, type ModelKind } from '@/lib/catalog';
const MODEL: ModelKind[] = ['gear', 'clutch', 'brake', 'toplink', 'lever', 'pin', 'bolt', 'radiator', 'canopy', 'shaft'];
import { c, fmtDate, postsSorted, readMin } from '@/lib/content';
import { LANGS, href } from '@/lib/i18n';

export const dynamicParams = false;
export function generateStaticParams() { return LANGS.flatMap(lang => c(lang).posts.map(p => ({ lang, slug: p.slug }))); }
type Params = Promise<{ lang: string; slug: string }>;
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params; const p = c(lang as Lang).posts.find(x => x.slug === slug); return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function Article({ params }: { params: Params }) {
  const { lang: l, slug } = await params; const lang = l as Lang; const d = c(lang).news;
  const p = c(lang).posts.find(x => x.slug === slug); if (!p) notFound();
  const parts = p.group ? PRODUCTS.filter(x => x.group === p.group).slice(0, 4) : [];
  const more = postsSorted(lang).filter(x => x.slug !== p.slug).slice(0, 3);
  const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.excerpt, datePublished: p.date, inLanguage: lang, author: { '@type': 'Organization', name: 'Akın Traktör' }, publisher: { '@type': 'Organization', name: 'Akın Traktör' } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero eyebrow={d.cats[p.cat]} title={[p.title]} lead={p.excerpt} kind={MODEL.includes(p.kind as ModelKind) ? (p.kind as ModelKind) : undefined}>
        <div className="post-meta mono" style={{ marginTop: 22 }}>{fmtDate(p.date, lang)}{p.loc ? ` · ${d.where}: ${p.loc}` : ` · ${readMin(p)} ${d.min}`} · Akın Traktör</div>
      </PageHero>
      {!MODEL.includes(p.kind as ModelKind) && <div className="wrap"><div className="art-cover"><PostCover kind={p.kind} label={p.title} /></div></div>}
      <section className="section" style={{ paddingTop: 20 }}><div className="wrap art-grid">
        <aside className="art-side"><Link className="pcard-more" href={href(lang, 'news')}>← {d.back}</Link></aside>
        <article className="prose">
          {p.body.map((b, i) => (
            <div key={i} className="fade">
              {b.h && <h2>{b.h}</h2>}
              {b.p && <p>{b.p}</p>}
              {b.ul && <ul>{b.ul.map(x => <li key={x}>{x}</li>)}</ul>}
              {b.tip && <div className="tip"><b>{lang === 'tr' ? 'İpucu' : 'Tip'}</b><p>{b.tip}</p></div>}
            </div>
          ))}
          {parts.length > 0 && (
            <div className="art-parts">
              <div className="art-parts-h"><h3 className="h3">{d.related}</h3><Link className="pcard-more" href={href(lang, 'products') + `?g=${GROUPS[p.group!].slug}`}>{d.relatedAll} <Arrow /></Link></div>
              <div className="pgrid">{parts.map(r => (
                <Link key={r.code} href={href(lang, `products/${r.slug}`)} className="pcard">
                  <div className="pcard-top"><span className="pcard-ic"><SysIcon id={r.system} /></span><span className="tag">{r.code}</span></div>
                  <h3>{r.name}</h3><p className="mono muted">{groupName(r.group, lang)} · {r.modelsRaw}</p>
                </Link>))}</div>
            </div>
          )}
          <div className="art-cta"><div><b>{d.ctaT}</b><p className="muted">{d.ctaP}</p></div><Link className="btn btn-red" href={href(lang, 'finder')}>{d.cta} <Arrow /></Link></div>
        </article>
      </div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <h2 className="h3" style={{ marginBottom: 22 }}>{d.more}</h2>
        <div className="posts">{more.map(m => (
          <Link key={m.slug} href={href(lang, `news/${m.slug}`)} className="post">
            <div className="post-img"><PostCover kind={m.kind} label={m.title} /></div>
            <div className="post-meta mono"><span className="tag">{d.cats[m.cat]}</span>{fmtDate(m.date, lang)}</div>
            <h3 className="h3">{m.title}</h3>
          </Link>))}</div>
      </div></section>
    </>
  );
}
