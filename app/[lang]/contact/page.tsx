import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import MapPin from '@/components/MapPin';
import PageHero from '@/components/PageHero';
import { WaIcon } from '@/components/ui';
import type { Lang } from '@/lib/catalog';
import { CONTACT, t } from '@/lib/i18n';
import { p } from '@/lib/pages';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'İletişim' : 'Contact' }; }

const ICON: Record<string, React.ReactNode> = {
  wa: <WaIcon />,
  tel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
  map: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>,
};

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = t(lang).contact; const x = p(lang).contact;
  const ld = { '@context': 'https://schema.org', '@type': 'AutoPartsStore', name: 'Akın Traktör', foundingDate: '1998', email: CONTACT.email, telephone: [CONTACT.phone, CONTACT.phone2], address: { '@type': 'PostalAddress', streetAddress: 'Fevziçakmak Mah. 10763 Sk. No: 1/C', addressLocality: 'Karatay', addressRegion: 'Konya', postalCode: '42050', addressCountry: 'TR' }, geo: { '@type': 'GeoCoordinates', latitude: CONTACT.geo.lat, longitude: CONTACT.geo.lng }, hasMap: CONTACT.map };
  const hrefOf = (k: string) => k === 'wa' ? `https://wa.me/${CONTACT.whatsapp}` : k === 'tel' ? `tel:${CONTACT.phone2.replace(/\s/g, '')}` : k === 'mail' ? `mailto:${CONTACT.email}` : CONTACT.map;
  const val = (k: string) => k === 'wa' ? CONTACT.phone : k === 'tel' ? CONTACT.phone2 : k === 'mail' ? CONTACT.email : 'Fevziçakmak, Karatay';
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero eyebrow={d.eyebrow} title={d.title} lead={d.sub} />
      <section className="section" style={{ paddingTop: 30 }}><div className="wrap">
        <div className="chan">{x.channels.map(([h, s, k], i) => (
          <a key={k} className="chan-c fade" style={{ transitionDelay: i * 70 + 'ms' }} href={hrefOf(k)} target={k === 'wa' || k === 'map' ? '_blank' : undefined} rel="noopener">
            <span className="chan-ic">{ICON[k]}</span><b>{h}</b><span className="muted">{s}</span><em className="mono">{val(k)}</em><i aria-hidden>↗</i>
          </a>))}</div>
      </div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap cgrid">
        <dl className="cinfo fade">
          <div><dt>{d.address}</dt><dd>{CONTACT.address}</dd></div>
          <div><dt>{d.phone}</dt><dd><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a><br /><a href={`tel:${CONTACT.phone2.replace(/\s/g, '')}`}>{CONTACT.phone2}</a></dd></div>
          <div><dt>{d.email}</dt><dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br /><a href={`mailto:${CONTACT.email2}`}>{CONTACT.email2}</a></dd></div>
          <div><dt>{d.hours}</dt><dd>{CONTACT.hours[lang]}</dd></div>
        </dl>
        <ContactForm lang={lang} />
      </div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <MapPin lang={lang} title={x.mapT} />
      </div></section>
    </>
  );
}
