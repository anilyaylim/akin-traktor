'use client';
import { useState } from 'react';
import type { Lang } from '@/lib/catalog';
import { CONTACT, t } from '@/lib/i18n';
import { Arrow } from './ui';

/* Demo form: no backend – composes an email draft (mailto). */
export default function ContactForm({ lang }: { lang: Lang }) {
  const d = t(lang).contact; const [f, setF] = useState({ name: '', email: '', phone: '', subject: d.subjects[0], message: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${f.message}\n\n— ${f.name}\n${f.email}\n${f.phone}`;
    location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('[' + f.subject + '] ' + f.name)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <form className="cform fade" onSubmit={submit}>
      <h2 className="h3">{d.form}</h2>
      <div className="row">
        <div className="field"><label htmlFor="cn">{d.name}</label><input id="cn" required value={f.name} onChange={set('name')} autoComplete="name" /></div>
        <div className="field"><label htmlFor="ce">{d.email}</label><input id="ce" type="email" required value={f.email} onChange={set('email')} autoComplete="email" /></div>
      </div>
      <div className="row">
        <div className="field"><label htmlFor="cp">{d.phone}</label><input id="cp" type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" /></div>
        <div className="field"><label htmlFor="cs">{d.subject}</label><select id="cs" value={f.subject} onChange={set('subject')}>{d.subjects.map(s => <option key={s}>{s}</option>)}</select></div>
      </div>
      <div className="field"><label htmlFor="cm">{d.message}</label><textarea id="cm" rows={5} required value={f.message} onChange={set('message')} /></div>
      <button className="btn btn-red" style={{ justifySelf: 'start' }}>{d.send} <Arrow /></button>
    </form>
  );
}
