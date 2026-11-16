import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Split } from '@/components/ui';
import type { Lang } from '@/lib/catalog';
import { CONTACT, t } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'İletişim' : 'Contact' }; }

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = t(lang).contact;
  const ld = { '@context': 'https://schema.org', '@type': 'AutoPartsStore', name: 'Akın Traktör', foundingDate: '1998', email: CONTACT.email, address: { '@type': 'PostalAddress', streetAddress: 'Fevziçakmak Mah. 10763 Sk. No: 1/C', addressLocality: 'Karatay', addressRegion: 'Konya', postalCode: '42050', addressCountry: 'TR' } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="phero"><div className="wrap">
        <span className="eyebrow">{d.eyebrow}</span><Split as="h1" className="h1" lines={d.title} /><p className="lead fade">{d.sub}</p>
      </div></section>
      <section className="section" style={{ paddingTop: 50 }}><div className="wrap cgrid">
        <dl className="cinfo fade">
          <div><dt>{d.address}</dt><dd>{CONTACT.address}</dd><a className="mono muted" style={{ fontSize: 12, textDecoration: 'underline' }} href={CONTACT.map} target="_blank" rel="noopener">{d.map} ↗</a></div>
          <div><dt>{d.phone}</dt><dd><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a></dd></div>
          <div><dt>{d.email}</dt><dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
          <div><dt>{d.hours}</dt><dd>{CONTACT.hours[lang]}</dd></div>
        </dl>
        <ContactForm lang={lang} />
      </div></section>
    </>
  );
}
