'use client';
/* B2B dealer portal login (demo). Nothing is sent anywhere: on submit the page explains that the portal is
   connected to the live B2B system at launch. Left: what dealers get + a sample order panel; right: login card. */
import Link from 'next/link';
import { useState } from 'react';
import type { Lang } from '@/lib/catalog';
import { href } from '@/lib/i18n';
import { LOGO_B_ICON, WHEEL, WHEEL_VB } from '@/lib/logos';
import { LIGHT } from '@/lib/theme';
import { Arrow } from './ui';

const T = {
  tr: {
    eyebrow: 'Bayi Portalı · B2B', title: ['Bayiler için', 'sipariş merkezi.'], lead: 'Size özel fiyat listesi, stok durumu ve sipariş takibi tek ekranda. 7/24 sipariş verin, sevkiyatınızı anlık izleyin.',
    feats: [['Özel fiyat listesi', 'Bayi iskontonuz her üründe otomatik uygulanır.'], ['Canlı stok', '565 stok kodunda anlık adet ve depo bilgisi.'], ['Hızlı sipariş', 'Kodla toplu giriş ya da Excel listesi yükleyin.'], ['Cari & fatura', 'Bakiye, ekstre ve faturalar her an elinizde.']],
    sample: 'Örnek görünüm', orders: 'Son siparişler', st: ['Hazırlanıyor', 'Kargoda', 'Teslim edildi'],
    h: 'Bayi girişi', sub: 'Bayi kodunuz ya da e-posta adresinizle giriş yapın.', user: 'Bayi kodu / e-posta', userPh: 'ör. AKN-0421', pass: 'Şifre', show: 'Göster', hide: 'Gizle',
    remember: 'Beni hatırla', forgot: 'Şifremi unuttum', forgotMsg: 'Şifre sıfırlama için satış ekibimizle iletişime geçin; yeni şifreniz aynı gün e-postanıza gönderilir.',
    submit: 'Giriş yap', wait: 'Kontrol ediliyor…', demo: 'Bu bir önizleme: giriş bilgileri hiçbir yere gönderilmez. Portal yayına alındığında mevcut B2B sisteminize bağlanacak.',
    req: 'Bayi kodu ve şifre gerekli.', not: 'Bayimiz değil misiniz?', apply: 'Bayilik başvurusu', secure: 'Şifreli bağlantı · KVKK uyumlu',
  },
  en: {
    eyebrow: 'Dealer Portal · B2B', title: ['An order desk', 'for dealers.'], lead: 'Your own price list, stock levels and order tracking on one screen. Order 24/7 and follow every shipment live.',
    feats: [['Personal price list', 'Your dealer discount applies to every item automatically.'], ['Live stock', 'Quantities and warehouse for all 565 stock codes.'], ['Fast ordering', 'Bulk entry by code or upload an Excel list.'], ['Account & invoices', 'Balance, statements and invoices at any time.']],
    sample: 'Sample view', orders: 'Recent orders', st: ['Preparing', 'Shipped', 'Delivered'],
    h: 'Dealer login', sub: 'Sign in with your dealer code or email address.', user: 'Dealer code / email', userPh: 'e.g. AKN-0421', pass: 'Password', show: 'Show', hide: 'Hide',
    remember: 'Remember me', forgot: 'Forgot password', forgotMsg: 'Contact our sales team to reset your password; a new one is emailed the same day.',
    submit: 'Sign in', wait: 'Checking…', demo: 'This is a preview: sign-in details are not sent anywhere. At launch the portal connects to your existing B2B system.',
    req: 'Dealer code and password are required.', not: 'Not a dealer yet?', apply: 'Apply to become a dealer', secure: 'Encrypted connection · GDPR/KVKK',
  },
};
const IC = [
  'M4 7h16M4 12h10M4 17h7M17 14l3 3-3 3',
  'M4 19V9l8-5 8 5v10M9 19v-6h6v6',
  'M13 3 5 13h6l-1 8 8-10h-6z',
  'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5',
];

export default function B2BLogin({ lang }: { lang: Lang }) {
  const x = T[lang]; const [show, setShow] = useState(false); const [state, setState] = useState<'idle' | 'wait' | 'done' | 'err' | 'forgot'>('idle');
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const fd = new FormData(e.currentTarget);
    if (!String(fd.get('u') || '').trim() || !String(fd.get('p') || '')) { setState('err'); return; }
    setState('wait'); setTimeout(() => setState('done'), 900);
  };
  const rows: [string, string, number][] = [['#24-1187', 'A004 · 12', 0], ['#24-1179', 'F112 · 4', 1], ['#24-1162', 'S020 · 30', 2]];
  return (
    <section className="b2bp">
      <div className="wrap b2bp-in">
        <aside className="b2bp-side">
          <div className="b2bp-grid" aria-hidden />
          <span className="eyebrow">{x.eyebrow}</span>
          <h1 className="h2">{x.title[0]}<br />{x.title[1]}</h1>
          <p className="lead">{x.lead}</p>
          <ul className="b2bp-feats">{x.feats.map(([h, d], i) => (
            <li key={h}><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={IC[i]} /></svg></span><div><b>{h}</b><p>{d}</p></div></li>))}
          </ul>
          <div className="b2bp-mock" aria-hidden>
            <div className="bm-h"><b>{x.orders}</b><span className="mono">{x.sample}</span></div>
            {rows.map(([no, it, s]) => <div className="bm-r" key={no}><span className="mono">{no}</span><span className="mono muted">{it}</span><em className={'s' + s}>{x.st[s]}</em></div>)}
          </div>
        </aside>

        <div className="b2bp-card">
          <span className="b2bp-ic" aria-hidden>{LIGHT ? <svg viewBox={WHEEL_VB} className="wheel" dangerouslySetInnerHTML={{ __html: WHEEL }} /> : <svg viewBox="0 0 100 100" className="tread" dangerouslySetInnerHTML={{ __html: LOGO_B_ICON }} />}</span>
          <h2 className="h3">{x.h}</h2><p className="muted">{x.sub}</p>
          <form onSubmit={submit} noValidate>
            <div className="field"><label htmlFor="b2b-u">{x.user}</label><input id="b2b-u" name="u" autoComplete="username" placeholder={x.userPh} onChange={() => state === 'err' && setState('idle')} /></div>
            <div className="field"><label htmlFor="b2b-p">{x.pass}</label>
              <div className="pw"><input id="b2b-p" name="p" type={show ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••" onChange={() => state === 'err' && setState('idle')} />
                <button type="button" onClick={() => setShow(!show)} aria-pressed={show}>{show ? x.hide : x.show}</button></div>
            </div>
            <div className="b2bp-row">
              <label className="chk"><input type="checkbox" name="r" /><i aria-hidden />{x.remember}</label>
              <button type="button" className="lnk" onClick={() => setState('forgot')}>{x.forgot}</button>
            </div>
            <button className="btn btn-red b2bp-go" disabled={state === 'wait'}>{state === 'wait' ? x.wait : x.submit} {state !== 'wait' && <Arrow />}</button>
            <p className={'b2bp-msg' + (state === 'done' || state === 'forgot' || state === 'err' ? ' on' : '') + (state === 'err' ? ' err' : '')} role="status">
              {state === 'done' ? x.demo : state === 'forgot' ? x.forgotMsg : state === 'err' ? x.req : ''}
            </p>
          </form>
          <div className="b2bp-foot">
            <span className="muted">{x.not}</span>
            <Link href={href(lang, 'contact')} className="btn btn-ghost btn-sm">{x.apply} <Arrow /></Link>
          </div>
          <p className="b2bp-sec mono"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>{x.secure}</p>
        </div>
      </div>
    </section>
  );
}
