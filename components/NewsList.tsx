'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Lang } from '@/lib/catalog';
import { c, fmtDate, postsSorted, readMin } from '@/lib/content';
import { href } from '@/lib/i18n';
import PostCover from './PostCover';
import { Arrow } from './ui';

export default function NewsList({ lang }: { lang: Lang }) {
  const d = c(lang).news; const all = postsSorted(lang); const [cat, setCat] = useState<'all' | 'guide' | 'news' | 'event'>('all');
  const list = all.filter(p => cat === 'all' || p.cat === cat); const [first, ...rest] = list;
  return (
    <>
      <div className="finder-chips" style={{ marginTop: 0, marginBottom: 26 }}>
        {(['all', 'guide', 'news', 'event'] as const).map(k => <button key={k} className={'chip' + (cat === k ? ' on' : '')} onClick={() => setCat(k)}>{k === 'all' ? d.all : d.cats[k]} <span className="n">{k === 'all' ? all.length : all.filter(p => p.cat === k).length}</span></button>)}
      </div>
      {first && (
        <Link href={href(lang, `news/${first.slug}`)} className="feat">
          <div className="feat-img"><PostCover kind={first.kind} label={first.title} /></div>
          <div className="feat-b">
            <div className="post-meta mono"><span className="tag">{d.cats[first.cat]}</span>{fmtDate(first.date, lang)}{first.loc ? ` · ${first.loc}` : ` · ${readMin(first)} ${d.min}`}</div>
            <h2 className="h2">{first.title}</h2><p className="lead">{first.excerpt}</p>
            <span className="pcard-more">{d.read} <Arrow /></span>
          </div>
        </Link>
      )}
      <div className="posts">{rest.map(p => (
        <Link key={p.slug} href={href(lang, `news/${p.slug}`)} className="post">
          <div className="post-img"><PostCover kind={p.kind} label={p.title} /></div>
          <div className="post-meta mono"><span className="tag">{d.cats[p.cat]}</span>{fmtDate(p.date, lang)}{p.loc ? ` · ${p.loc}` : ` · ${readMin(p)} ${d.min}`}</div>
          <h3 className="h3">{p.title}</h3><p className="muted">{p.excerpt}</p>
          <span className="pcard-more">{d.read} <Arrow /></span>
        </Link>))}</div>
    </>
  );
}
