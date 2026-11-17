import Link from 'next/link';
import { GROUPS, type Lang } from '@/lib/catalog';
import { CONTACT, href, t } from '@/lib/i18n';
import { Logo } from './ui';

export default function Footer({ lang }: { lang: Lang }) {
  const d = t(lang); const groups = Object.values(GROUPS).slice(0, 6);
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div><Logo /><p className="muted" style={{ marginTop: 20, maxWidth: 340 }}>{d.footer.tag}</p></div>
          <div><h5>{d.footer.cols[0]}</h5><ul>{groups.map(g => <li key={g.slug}><Link href={href(lang, 'products') + `?g=${g.slug}`}>{g[lang]}</Link></li>)}</ul></div>
          <div><h5>{d.footer.cols[1]}</h5><ul>
            <li><Link href={href(lang, 'about')}>{d.nav.about}</Link></li><li><Link href={href(lang, 'services')}>{d.nav.services}</Link></li><li><Link href={href(lang, 'references')}>{d.nav.refs}</Link></li><li><Link href={href(lang, 'news')}>{d.nav.news}</Link></li>
            <li><Link href={href(lang, 'products') + '#finder'}>{d.nav.finder}</Link></li><li><Link href={href(lang, 'quote')}>{d.nav.quote}</Link></li><li><Link href={href(lang, 'privacy')}>{d.footer.legal}</Link></li>
          </ul></div>
          <div><h5>{d.footer.cols[2]}</h5><ul>
            <li className="muted" style={{ maxWidth: 260 }}>{CONTACT.address}</li>
            <li><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a></li><li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li className="mono muted" style={{ fontSize: 12 }}>{CONTACT.hours[lang]}</li>
          </ul></div>
        </div>
        <div className="ftr-word" aria-hidden>AKIN</div>
        <div className="ftr-bot"><span>© {new Date().getFullYear()} Akın Traktör. {d.footer.rights}</span><span className="mono">{d.footer.demo}</span></div>
      </div>
    </footer>
  );
}
