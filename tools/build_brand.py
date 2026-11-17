"""Builds public/brand/index.html — AKIN brand identity proposals (4 logo directions, colours,
type, applications). Run: python3 tools/build_brand.py"""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from brand_svg import WM, WM_ACC, TREAD, HYB, RWG, HYB_CAPS, HYB_CAPS_ICON, RET2

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = lambda t, x, y, w, size=11, anchor='start': f'<text class="d" x="{x}" y="{y}" font-size="{size}" textLength="{w}" lengthAdjust="spacing" text-anchor="{anchor}">{t}</text>'

# ── lockups (full logo) and icons (square mark), coloured through CSS vars --c/--a/--b ──
LOCK = {
  'A': ('-4 -6 278 122', f'<g class="c1">{WM}</g><g class="acc">{WM_ACC}</g>' + D('TRAKTÖR · YEDEK PARÇA', 1, 108, 268, 12.5)),
  'B': ('-4 -4 382 108', f'{TREAD}<g transform="translate(116 14) scale(.82)"><g class="c1">{WM}</g><g class="acc">{WM_ACC}</g></g>' + D('TRAKTÖR · YEDEK PARÇA', 117, 98, 222, 11)),
  'C': ('-8 -10 310 168', HYB + D('TRAKTÖR · YEDEK PARÇA', 2, 152, 270, 12)),
  'C2': ('-12 -30 298 194', HYB_CAPS + D('TRAKTÖR · YEDEK PARÇA', 0, 158, 270, 12.5)),
  'D': ('-4 0 440 146', RET2 + D('TRAKTÖR VE DEMİRYOLU', 112, 136, 318, 14)),
}
ICON = {
  'A': f'<g transform="translate(14 14) scale(.9)"><g class="c1"><path d="M0 80L28 0H52L80 80H59L40 24L21 80Z"/></g><g class="acc"><rect x="31" y="51" width="18" height="10"/></g></g>',
  'B': TREAD,
  'C': f'<g transform="translate(-16 -16)">{RWG}</g>',
  'C2': f'<g transform="translate(23 2) scale(.7)">{HYB_CAPS_ICON}</g>',
  'D': '<g transform="translate(2 -4)"><rect class="acc" x="0" y="6" width="96" height="96" rx="22"/><path fill="#fff" fill-rule="evenodd" d="M14 92L40 18H58L84 92H66L60 74H38L32 92ZM43 60H55L49 40Z"/></g>',
}
def svg(key, kind='lock', cls=''):
    if kind == 'lock': vb, body = LOCK[key]
    else: vb, body = '0 0 100 100', ICON[key]
    return f'<svg class="lg {cls}" viewBox="{vb}" role="img" aria-label="AKIN {key}">{body}</svg>'

CONCEPTS = [
  ('A', 'Sadece yazı · Wordmark', 'Güçlü, sade bir “AKIN”.',
   ['Geometrik, kalın harfler: ağır sanayi güveni, uzaktan okunur.', 'A’nın ara çizgisi kırmızı bir “parça” – marka işaretinin tamamı bu küçük blok.', 'Tabela, araç giydirme ve ürün etiketinde tek renkte bile çalışır.']),
  ('B', 'İkon + yazı', 'Lastik izi içinde “A”.',
   ['İkon: traktör lastiğinin tırtıkları ile dişli çarkın birleşimi, içinde AKIN’ın “A”sı.', 'İkon tek başına uygulama simgesi, favicon ve sosyal medya profili olur.', 'Yazı ile ikon ayrı ayrı da kullanılabilen esnek bir sistem.']),
  ('C', 'Hybrid · Traktör + Akın', 'Harflerden kurulmuş bir traktör.',
   ['“akın” yazısı traktörün kendisi: “a” arka teker, “k” kabin direği, “ı” egzoz, “n” motor kaputu.', 'Altta şasi, “n”nin altında ön teker. Akın soyadı ile traktör simgesi tek işarette birleşir.', 'Arka teker tek başına ikon olarak kullanılabilir; dijitalde tekerler dönebilir.']),
  ('C2', 'Hybrid · büyük harf', 'A harfi traktörün kabini.',
   ['A’nın tepesi “–” tente (kabin tavanı), iki bacağı “/ \\” kabin direkleri; kırmızı ara çizgi gösterge paneli.', 'Dönen arka teker A’nın tam altında ortalı; teker, direklere çamurluk kavisi açar. “I” egzoz bacası, “N”nin altında ön teker.', 'Tek başına ikon: tenteli A ve altındaki teker. Uzaktan okunur, dijitalde tekerlekler döner.']),
  ('D', 'Mevcut logoya güçlü alternatif', 'Kırmızı rozet, hız çizgisi, traktör.',
   ['Bugünkü logonun kırmızı “A”sı, keskin köşeli bir rozete dönüştü: tek başına ikon olur.', '“KIN” ağır, eğik ve lacivert; hareket ve güç hissi verir.', 'Traktör artık dolu ve kırmızı bir silüet, AKIN ile aynı zemin çizgisinde ilerliyor.']),
]
PALETTE = [
  ('Akın Lacivert', '#0F2A4A', 'Ana renk · güven, kurumsal ağırlık'), ('Derin Lacivert', '#0A1C33', 'Başlıklar, koyu yüzeyler'),
  ('Sinyal Kırmızı', '#E3262A', 'Marka vurgusu · mevcut logodan'), ('Teknik Mavi', '#2D6BFF', 'Etkileşim, bağlantı, veri'),
  ('Elektrik Mavi', '#3D7BFF', 'Koyu temada vurgu, buton ve işaretler'),
  ('Çelik', '#5B6B7F', 'Yardımcı metin, ikonlar'), ('Bulut', '#F3F5F8', 'Açık zemin'), ('Beyaz', '#FFFFFF', 'Kartlar, yüzeyler'),
]

def hex2rgb(h): h = h.lstrip('#'); return ', '.join(str(int(h[i:i + 2], 16)) for i in (0, 2, 4))

def concept_section(i, key, sub, title, bullets):
    icon_cls = ' wide' if key == 'C' else ''
    return f'''
<section class="concept" id="c{key}"><div class="wrap">
  <div class="c-head">
    <span class="c-tag">Öneri {key}</span>
    <div><p class="c-sub">{sub}</p><h2>{title}</h2></div>
  </div>
  <div class="c-grid">
    <figure class="tile hero light">{svg(key)}</figure>
    <div class="c-side">
      <ul>{''.join(f'<li>{b}</li>' for b in bullets)}</ul>
      <div class="c-mini">
        <figure class="tile navy">{svg(key)}</figure>
        <figure class="tile icon light">{svg(key, 'icon')}</figure>
        <figure class="tile icon navy">{svg(key, 'icon')}</figure>
      </div>
      <div class="c-scale"><span>Küçük boyut testi</span>{svg(key, cls='s40')}{svg(key, cls='s24')}{svg(key, 'icon', 's16')}</div>
    </div>
  </div>
</div></section>'''

PAGE = f'''<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>AKIN · Marka Kimliği Önerileri</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {{ --navy:#0F2A4A; --navy-2:#0A1C33; --red:#E3262A; --blue:#2D6BFF; --steel:#5B6B7F; --cloud:#F3F5F8; --line:#E2E7EE; --ink:#0A1C33; }}
* {{ box-sizing:border-box; margin:0; padding:0; }}
html {{ scroll-behavior:smooth; }}
body {{ font-family:Geist, system-ui, sans-serif; background:var(--cloud); color:var(--ink); -webkit-font-smoothing:antialiased; }}
.mono {{ font-family:'Geist Mono', ui-monospace, monospace; }}
.wrap {{ max-width:1320px; margin:0 auto; padding:0 clamp(20px,4vw,48px); }}
nav.top {{ position:sticky; top:0; z-index:10; background:rgba(243,245,248,.82); backdrop-filter:blur(14px); border-bottom:1px solid var(--line); }}
nav.top .wrap {{ display:flex; align-items:center; gap:24px; height:64px; }}
nav.top b {{ font-weight:600; letter-spacing:.02em; }} nav.top b span {{ color:var(--red); }}
nav.top a {{ color:var(--steel); text-decoration:none; font-size:14px; }} nav.top a:hover {{ color:var(--ink); }}
nav.top .links {{ margin-left:auto; display:flex; gap:20px; }}
@media (max-width:760px) {{ nav.top .links {{ display:none; }} }}
header.hero {{ padding:110px 0 70px; }}
.eyebrow {{ font-family:'Geist Mono'; font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:var(--steel); display:flex; gap:10px; align-items:center; }}
.eyebrow::before {{ content:''; width:8px; height:8px; background:var(--red); border-radius:2px; }}
h1 {{ font-size:clamp(44px,7vw,104px); line-height:.95; letter-spacing:-.045em; font-weight:600; margin:22px 0 26px; max-width:14ch; }}
.lead {{ font-size:clamp(17px,1.4vw,21px); line-height:1.55; color:var(--steel); max-width:58ch; }}
.meta {{ display:flex; gap:28px; flex-wrap:wrap; margin-top:34px; font-size:13px; color:var(--steel); }} .meta b {{ color:var(--ink); font-weight:500; display:block; }}
.toc {{ display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-top:56px; }}
.toc a {{ background:#fff; border:1px solid var(--line); border-radius:18px; padding:18px; text-decoration:none; color:inherit; display:grid; gap:14px; transition:transform .5s cubic-bezier(.2,.7,0,1), box-shadow .4s; }}
.toc a:hover {{ transform:translateY(-4px); box-shadow:0 24px 50px -28px rgba(15,42,74,.35); }}
.toc .mono {{ font-size:11px; color:var(--steel); letter-spacing:.1em; }} .toc .tile-like {{ height:84px; display:flex; align-items:center; }} .toc .lg {{ max-height:84px; width:auto; max-width:100%; }}
@media (max-width:900px) {{ .toc {{ grid-template-columns:1fr 1fr; }} }}
section {{ padding:90px 0; border-top:1px solid var(--line); }}
.current {{ display:grid; grid-template-columns:1fr 1.2fr; gap:40px; align-items:center; }}
.current figure {{ background:#fff; border:1px solid var(--line); border-radius:24px; padding:50px; display:grid; place-items:center; }}
.current img {{ width:100%; max-width:420px; image-rendering:auto; }}
.current ul, .c-side ul {{ list-style:none; display:grid; gap:12px; }}
.current li, .c-side li {{ display:flex; gap:12px; color:#33465c; line-height:1.5; }}
.current li::before, .c-side li::before {{ content:''; flex:none; width:7px; height:7px; margin-top:8px; background:var(--red); border-radius:1px; transform:rotate(45deg); }}
.current li.minus::before {{ background:var(--steel); }}
h2 {{ font-size:clamp(32px,4vw,58px); letter-spacing:-.035em; line-height:1; font-weight:600; }}
.c-head {{ display:flex; gap:28px; align-items:flex-end; margin-bottom:36px; }}
.c-tag {{ font-family:'Geist Mono'; font-size:13px; background:var(--navy); color:#fff; padding:8px 12px; border-radius:8px; white-space:nowrap; }}
.c-sub {{ font-family:'Geist Mono'; font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:var(--steel); margin-bottom:10px; }}
.c-grid {{ display:grid; grid-template-columns:1.35fr 1fr; gap:18px; }}
.tile {{ border-radius:22px; display:grid; place-items:center; padding:clamp(24px,4vw,56px); position:relative; overflow:hidden; }}
.tile.light {{ background:#fff; border:1px solid var(--line); --c:#0F2A4A; --a:#E3262A; --b:#fff; }}
.tile.navy {{ background:var(--navy); --c:#fff; --a:#FF3B3F; --b:var(--navy); }}
.tile.hero {{ min-height:420px; }} .tile.hero .lg {{ width:min(100%,560px); height:auto; }}
.tile.hero::after {{ content:''; position:absolute; inset:0; background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px); background-size:32px 32px; opacity:.45; pointer-events:none; mask-image:radial-gradient(closest-side, transparent 55%, #000); }}
.c-side {{ display:grid; gap:18px; align-content:start; }}
.c-mini {{ display:grid; grid-template-columns:1.6fr 1fr 1fr; gap:12px; }}
.c-mini .tile {{ padding:22px; min-height:130px; }} .c-mini .tile .lg {{ width:100%; height:auto; max-height:80px; }}
.tile.icon .lg {{ width:64px; height:64px; }}
.c-scale {{ display:flex; align-items:center; gap:22px; background:#fff; border:1px solid var(--line); border-radius:16px; padding:16px 20px; --c:#0F2A4A; --a:#E3262A; --b:#fff; flex-wrap:wrap; }}
.c-scale span {{ font-family:'Geist Mono'; font-size:11px; color:var(--steel); letter-spacing:.1em; text-transform:uppercase; margin-right:auto; }}
.s40 {{ height:40px; width:auto; }} .s24 {{ height:24px; width:auto; }} .s16 {{ height:16px; width:16px; }}
@media (max-width:900px) {{ .c-grid, .current {{ grid-template-columns:1fr; }} .c-head {{ flex-direction:column; align-items:flex-start; }} }}
.lg .c1 {{ fill:var(--c); }} .lg .ln {{ stroke:var(--c); }} .lg .acc {{ fill:var(--a); }} .lg .bg {{ fill:var(--b); }}
.lg text.d {{ fill:var(--c); font-family:Geist, sans-serif; font-weight:600; letter-spacing:.2em; }}
.lg .spin {{ animation:spin 6s linear infinite; }} .lg .spin.f {{ animation-duration:3.2s; }}
@keyframes spin {{ to {{ transform:rotate(360deg); }} }}
@media (prefers-reduced-motion:reduce) {{ .lg .spin {{ animation:none; }} }}
.tile.hero .lg {{ animation:rise 1.2s cubic-bezier(.2,.7,0,1) both; }}
@keyframes rise {{ from {{ opacity:0; transform:translateY(24px) scale(.97); }} }}
.pal {{ display:grid; grid-template-columns:repeat(8,1fr); gap:10px; margin-top:34px; }}
.sw {{ border-radius:18px; overflow:hidden; border:1px solid var(--line); background:#fff; }}
.sw i {{ display:block; height:150px; }} .sw div {{ padding:14px; font-size:13px; display:grid; gap:3px; }}
.sw b {{ font-weight:600; }} .sw .mono {{ font-size:11.5px; color:var(--steel); }}
@media (max-width:1000px) {{ .pal {{ grid-template-columns:repeat(2,1fr); }} }}
.type {{ display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:34px; }}
.type > div {{ background:#fff; border:1px solid var(--line); border-radius:22px; padding:34px; }}
.type .big {{ font-size:96px; letter-spacing:-.05em; font-weight:600; line-height:1; margin:10px 0 18px; }}
.type .mono.big {{ font-size:64px; letter-spacing:0; font-weight:500; }}
@media (max-width:800px) {{ .type {{ grid-template-columns:1fr; }} }}
.switch {{ display:flex; gap:8px; margin:26px 0 30px; flex-wrap:wrap; }}
.switch button {{ font:500 14px Geist; padding:11px 18px; border-radius:999px; border:1px solid var(--line); background:#fff; cursor:pointer; color:var(--ink); }}
.switch button.on {{ background:var(--navy); color:#fff; border-color:var(--navy); }}
.apps {{ display:grid; grid-template-columns:1.1fr 1fr; gap:18px; }}
.mock {{ border-radius:22px; padding:30px; display:grid; place-items:center; min-height:300px; position:relative; }}
.mock.desk {{ background:linear-gradient(135deg,#dfe5ee,#eef2f7); }}
.card {{ width:min(100%,400px); aspect-ratio:85/55; border-radius:12px; padding:24px; box-shadow:0 30px 60px -30px rgba(10,28,51,.45); display:flex; flex-direction:column; justify-content:space-between; }}
.card.front {{ background:#fff; --c:#0F2A4A; --a:#E3262A; --b:#fff; }} .card.front .lg {{ height:auto; width:62%; align-self:flex-start; }} .card.front [data-slot] {{ display:block; }}
.card .who {{ font-size:13px; color:#33465c; line-height:1.5; }} .card .who b {{ color:var(--ink); font-size:15px; display:block; }}
.card.back {{ background:var(--navy); --c:#fff; --a:#FF3B3F; --b:var(--navy); align-items:center; justify-content:center; transform:rotate(-7deg); position:absolute; width:min(64%,300px); left:4%; top:10px; }}
.card.front {{ position:relative; transform:rotate(3deg) translate(22%, 18%); }}
.card.back .lg {{ width:70px; height:70px; }}
.cards {{ position:relative; width:100%; min-height:330px; display:grid; place-items:center; }}
.sign {{ width:100%; background:var(--navy); border-radius:14px; padding:30px 40px; display:flex; align-items:center; justify-content:center; --c:#fff; --a:#FF3B3F; --b:var(--navy); box-shadow:0 30px 60px -30px rgba(10,28,51,.6); }}
.sign .lg {{ height:auto; width:min(78%, 420px); }}
.mock.wall {{ background:linear-gradient(180deg,#c9d1dc,#b6c0cd); align-items:end; }}
.icons {{ display:flex; gap:22px; align-items:end; }}
.app {{ border-radius:24%; display:grid; place-items:center; box-shadow:0 18px 30px -18px rgba(10,28,51,.6); }}
.app.n {{ background:var(--navy); --c:#fff; --a:#FF3B3F; --b:var(--navy); }} .app.w {{ background:#fff; --c:#0F2A4A; --a:#E3262A; --b:#fff; }}
.app .lg {{ width:66%; height:66%; }}
.browser {{ width:100%; background:#fff; border-radius:14px; overflow:hidden; box-shadow:0 30px 60px -30px rgba(10,28,51,.45); --c:#0F2A4A; --a:#E3262A; --b:#fff; }}
.browser .bar {{ height:30px; background:#eef1f5; display:flex; gap:6px; align-items:center; padding:0 12px; }} .browser .bar i {{ width:9px; height:9px; border-radius:50%; background:#cdd5df; }}
.browser .hd {{ display:flex; align-items:center; gap:20px; padding:16px 22px; border-bottom:1px solid var(--line); font-size:13px; color:var(--steel); }}
.browser .hd .lg {{ height:38px; width:auto; }} .browser .hd [data-slot] {{ display:flex; }} .browser .hd span:last-child {{ margin-left:auto; background:var(--navy); color:#fff; border-radius:999px; padding:8px 14px; }}
.browser .bd {{ padding:28px 22px 34px; }} .browser .bd b {{ font-size:28px; letter-spacing:-.03em; display:block; max-width:16ch; line-height:1.05; }}
@media (max-width:900px) {{ .apps {{ grid-template-columns:1fr; }} }}
footer {{ padding:70px 0 90px; border-top:1px solid var(--line); color:var(--steel); font-size:14px; display:block; }}
footer h3 {{ font-size:clamp(26px,3vw,40px); letter-spacing:-.03em; color:var(--ink); margin-bottom:14px; font-weight:600; }}
</style>
</head>
<body>
<nav class="top"><div class="wrap"><b>AKIN<span>.</span> Marka Kimliği</b><div class="links"><a href="#current">Bugün</a><a href="#cA">A</a><a href="#cB">B</a><a href="#cC">C</a><a href="#cC2">C2</a><a href="#cD">D</a><a href="#renk">Renkler</a><a href="#tipo">Tipografi</a><a href="#uygulama">Uygulamalar</a></div></div></nav>
<header class="hero"><div class="wrap">
  <span class="eyebrow">Marka kimliği · konsept önerileri</span>
  <h1>Yeni AKIN kimliği için beş yön.</h1>
  <p class="lead">1998’den bu yana Konya’dan Türkiye’ye traktör yedek parçası. Yeni kimlik, Akın ailesinin adını ve traktörü aynı güvenle taşımalı: teknik, net ve her boyutta okunur.</p>
  <div class="meta"><div><b>Hazırlayan</b>No7 Software</div><div><b>Tarih</b>Kasım 2026</div><div><b>Durum</b>Taslak · v2</div><div><b>Kullanım</b>Web · baskı · tabela · araç</div></div>
  <div class="toc">{''.join(f'<a href="#c{k}"><span class="mono">ÖNERİ {k}</span><span class="tile-like" style="--c:#0F2A4A;--a:#E3262A;--b:#fff">{svg(k)}</span><span>{sub}</span></a>' for k, sub, _, _ in CONCEPTS)}</div>
</div></header>

<section id="current"><div class="wrap current">
  <figure><img src="current-logo.png" alt="Mevcut Akın Traktör logosu"></figure>
  <div>
    <span class="eyebrow">Bugünkü logo</span>
    <h2 style="margin:16px 0 22px">Güçlü bir tanınırlık, eskiyen bir uygulama.</h2>
    <ul>
      <li>Kırmızı–lacivert renkler ve dairedeki “A” akılda kalıcı; korunmaya değer.</li>
      <li>Traktör simgesi işi anında anlatıyor.</li>
      <li class="minus">Raster (piksel) dosya: büyütünce bozuluyor, küçükte okunmuyor.</li>
      <li class="minus">İtalik ve gölgeli yazı, simge ile yazı arasındaki denge bugünün dijital standartlarının gerisinde.</li>
    </ul>
  </div>
</div></section>

{''.join(concept_section(i, *c) for i, c in enumerate(CONCEPTS))}

<section id="renk"><div class="wrap">
  <span class="eyebrow">Renk sistemi · açık tema (v2)</span>
  <h2 style="margin-top:16px">Lacivert güven, kırmızı imza, mavi teknoloji, sarı işaret.</h2>
  <p class="lead" style="margin-top:18px">Mevcut logodaki kırmızı ve lacivert korunur. Açık zeminler, çelik griler ve etkileşimde kullanılan teknik mavi ile 28 yıllık bir firmanın güveni modern bir dijital dile taşınır.</p>
  <div class="pal">{''.join(f'<div class="sw"><i style="background:{h}"></i><div><b>{n}</b><span class="mono">{h} · RGB {hex2rgb(h)}</span><span style="color:var(--steel)">{d}</span></div></div>' for n, h, d in PALETTE)}</div>
</div></section>

<section id="tipo"><div class="wrap">
  <span class="eyebrow">Tipografi</span>
  <h2 style="margin-top:16px">İki yazı ailesi, tek ses.</h2>
  <div class="type">
    <div><span class="eyebrow">Başlık & metin · Geist</span><div class="big">Aa Ğğ Şş</div><p class="lead">Traktörün kalbindeki hassasiyet. Güç aktarmadan hidroliğe 565 stok kodu.</p></div>
    <div><span class="eyebrow">Teknik etiket · Geist Mono</span><div class="big mono">E007</div><p class="lead mono" style="font-size:15px">STOK KODU · NC026 · 70.56 · 55.46 · TT50</p></div>
  </div>
</div></section>

<section id="uygulama"><div class="wrap">
  <span class="eyebrow">Uygulamalar</span>
  <h2 style="margin-top:16px">Gerçek hayatta nasıl duruyor?</h2>
  <div class="switch" role="group" aria-label="Öneri seç">{''.join(f'<button data-k="{k}"{" class=on" if k == "C" else ""}>Öneri {k}</button>' for k, *_ in CONCEPTS)}</div>
  <div class="apps">
    <div class="mock desk"><div class="cards">
      <div class="card back" data-slot="icon"></div>
      <div class="card front"><span data-slot="lock"></span><div class="who"><b>Mustafa Akın</b>Akın Traktör · Konya<br>info@akintraktor.com</div></div>
    </div></div>
    <div class="mock desk"><div class="browser"><div class="bar"><i></i><i></i><i></i></div>
      <div class="hd"><span data-slot="lock"></span><span>Ürünler</span><span>Parça Bulucu</span><span>Teklif Al</span></div>
      <div class="bd"><span class="eyebrow">Konya · 1998’den beri</span><b style="margin-top:12px">Traktörün kalbindeki hassasiyet.</b></div></div></div>
    <div class="mock wall"><div class="sign" data-slot="lock"></div></div>
    <div class="mock desk"><div class="icons">
      <div class="app n" style="width:120px;height:120px" data-slot="icon"></div><div class="app w" style="width:84px;height:84px" data-slot="icon"></div><div class="app n" style="width:56px;height:56px" data-slot="icon"></div><div class="app w" style="width:36px;height:36px" data-slot="icon"></div>
    </div></div>
  </div>
</div></section>

<footer><div class="wrap">
  <h3>Hangi yön size daha yakın?</h3>
  <p>Beğendiğiniz öneriyi (A, B, C, C2 veya D) ya da birleştirmek istediğiniz özellikleri iletin; seçilen yön renk, tipografi ve tüm uygulamalarla kurumsal kimlik rehberine dönüştürülür. · No7 Software</p>
</div></footer>
<script>
const L = {json.dumps({k: svg(k) for k in LOCK})}, I = {json.dumps({k: svg(k, 'icon') for k in ICON})};
function show(k) {{
  document.querySelectorAll('[data-slot=lock]').forEach(e => e.innerHTML = L[k]);
  document.querySelectorAll('[data-slot=icon]').forEach(e => e.innerHTML = I[k]);
  document.querySelectorAll('.switch button').forEach(b => b.classList.toggle('on', b.dataset.k === k));
}}
document.querySelectorAll('.switch button').forEach(b => b.addEventListener('click', () => show(b.dataset.k)));
show('C');
</script>
</body>
</html>
'''

if __name__ == '__main__':
    out = os.path.join(ROOT, 'public', 'brand', 'index.html')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(PAGE)
    print('wrote', out, len(PAGE))
