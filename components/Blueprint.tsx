/* Blueprint-style mechanical drawings for the "successful projects" cards: white line work on blueprint
   blue, with centre lines, dimension chains, part balloons and a title block. Pure SVG, no images. */

type Kind = 'tractor' | 'fleet';

const f = (n: number) => +n.toFixed(1);
/** horizontal dimension: extension lines from yRef down/up to y, arrowed line, centred label */
function hdim(x1: number, x2: number, y: number, yRef: number, label: string, id: string) {
  const d = y > yRef ? 6 : -6;
  return `<path class="ext" d="M${x1} ${yRef + (y > yRef ? 4 : -4)}V${y + d}M${x2} ${yRef + (y > yRef ? 4 : -4)}V${y + d}"/>` +
    `<path class="dim" d="M${x1} ${y}H${x2}" marker-start="url(#a-${id})" marker-end="url(#a-${id})"/>` +
    `<rect class="lbg" x="${f((x1 + x2) / 2 - label.length * 3.6 - 5)}" y="${y - 8}" width="${f(label.length * 7.2 + 10)}" height="16"/>` +
    `<text class="t" x="${f((x1 + x2) / 2)}" y="${y + 4}" text-anchor="middle">${label}</text>`;
}
/** vertical dimension */
function vdim(y1: number, y2: number, x: number, xRef: number, label: string, id: string) {
  const d = x < xRef ? -6 : 6;
  return `<path class="ext" d="M${xRef + (x < xRef ? -4 : 4)} ${y1}H${x + d}M${xRef + (x < xRef ? -4 : 4)} ${y2}H${x + d}"/>` +
    `<path class="dim" d="M${x} ${y1}V${y2}" marker-start="url(#a-${id})" marker-end="url(#a-${id})"/>` +
    `<g transform="translate(${x} ${f((y1 + y2) / 2)}) rotate(-90)"><rect class="lbg" x="${f(-label.length * 3.6 - 5)}" y="-8" width="${f(label.length * 7.2 + 10)}" height="16"/><text class="t" x="0" y="4" text-anchor="middle">${label}</text></g>`;
}
const cross = (x: number, y: number, r: number) => `<path class="cl" d="M${x - r} ${y}H${x + r}M${x} ${y - r}V${y + r}"/>`;
const balloon = (n: number | string, bx: number, by: number, tx: number, ty: number) =>
  `<path class="ldr" d="M${tx} ${ty}L${bx} ${by}"/><circle class="dot" cx="${tx}" cy="${ty}" r="2.6"/><circle class="bl" cx="${bx}" cy="${by}" r="11"/><text class="t b" x="${bx}" y="${by + 4}" text-anchor="middle">${n}</text>`;
function titleBlock(x: number, y: number, title: string, no: string, scale: string) {
  return `<g class="tb"><rect x="${x}" y="${y}" width="228" height="58"/><path d="M${x} ${y + 20}H${x + 228}M${x + 120} ${y + 20}V${y + 58}M${x + 120} ${y + 39}H${x + 228}"/></g>` +
    `<text class="t s" x="${x + 8}" y="${y + 14}">AKIN · ${title}</text>` +
    `<text class="t xs" x="${x + 8}" y="${y + 34}">ÇİZİM NO</text><text class="t" x="${x + 8}" y="${y + 50}">${no}</text>` +
    `<text class="t xs" x="${x + 128}" y="${y + 33}">ÖLÇEK ${scale}</text><text class="t xs" x="${x + 128}" y="${y + 52}">KONYA · TR</text>`;
}
const tyre = (cx: number, cy: number, r: number, n: number) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="${f(r * 0.78)}"/><circle cx="${cx}" cy="${cy}" r="${f(r * 0.34)}"/><circle cx="${cx}" cy="${cy}" r="${f(r * 0.1)}"/>` +
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return `<path d="M${f(cx + Math.cos(a) * r * 0.8)} ${f(cy + Math.sin(a) * r * 0.8)}L${f(cx + Math.cos(a + 0.12) * r)} ${f(cy + Math.sin(a + 0.12) * r)}"/>`; }).join('') +
  Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2 + 0.3; return `<circle cx="${f(cx + Math.cos(a) * r * 0.22)}" cy="${f(cy + Math.sin(a) * r * 0.22)}" r="1.8"/>`; }).join('');

/* 1 · tractor: side elevation + front elevation, main dimensions, part balloons */
function tractor(id: string) {
  const G = 330;
  const side =
    `<g class="ln">` + tyre(250, 260, 70, 22) + tyre(478, 290, 40, 16) +
    `<path d="M168 ${G - 2}h40M168 ${G - 2}l14 -8"/>` +                                        // ground hatch tick
    `<path d="M186 200V108h112l18 92"/><path d="M200 120h88l14 70h-102z"/><path d="M176 104h140"/>` + // cab + roof
    `<path d="M176 200h346v42h-18"/><path d="M316 200v-14h196l10 14"/><path d="M506 200v42"/>` +  // hood
    `<path d="M440 186V140h10v46"/><path d="M436 140h18"/>` +                                       // exhaust
    `<path d="M170 222a82 82 0 0 1 162 0"/>` +                                                       // fender
    `<path d="M178 250l-30 16 6 12 30-14M150 272l-20 12"/>` +                                        // 3-point hitch
    `<path d="M300 222h70v20h-70z"/><path d="M322 222v20M346 222v20"/>` +                             // gearbox housing
    `<path d="M512 210h10v26h-10" /><path d="M514 214h6M514 220h6M514 226h6M514 232h6"/>` +           // grille
    `<circle cx="300" cy="166" r="9"/><path d="M300 175l14 25"/>` +                                   // steering wheel
    `</g>` +
    `<path class="gnd" d="M130 ${G}H540"/>` + Array.from({ length: 21 }, (_, i) => `<path class="ext" d="M${134 + i * 20} ${G + 1}l-8 8"/>`).join('') +
    cross(250, 260, 84) + cross(478, 290, 52) +
    hdim(250, 478, 362, G, '2.150', id) + hdim(146, 530, 392, G, '3.640', id) + vdim(104, G, 112, 176, '2.480', id) +
        balloon(1, 222, 64, 240, 104) + balloon(2, 470, 104, 445, 140) + balloon(3, 560, 168, 514, 220) + balloon(4, 560, 262, 486, 286) + balloon(5, 352, 300, 258, 262);
  const fx = 668;   // front elevation centre
  const front =
    `<g class="ln"><rect x="${fx - 78}" y="190" width="30" height="140" rx="10"/><rect x="${fx + 48}" y="190" width="30" height="140" rx="10"/>` +
    `<path d="M${fx - 48} 260H${fx + 48}"/><path d="M${fx - 40} 200V108h80v92"/><path d="M${fx - 32} 118h64v70h-64z"/><path d="M${fx - 50} 104h100"/>` +
    `<rect x="${fx - 26}" y="200" width="52" height="44"/><path d="M${fx - 20} 208h40M${fx - 20} 216h40M${fx - 20} 224h40M${fx - 20} 232h40"/>` +
    `<path d="M${fx + 22} 186V140h8v46"/></g>` +
    `<path class="gnd" d="M${fx - 100} ${G}H${fx + 100}"/>` + `<path class="cl" d="M${fx} 92V${G + 10}"/>` +
    hdim(fx - 63, fx + 63, 346, G, '1.650', id) +
    `<text class="t s" x="${fx}" y="80" text-anchor="middle">ÖN GÖRÜNÜŞ</text><text class="t s" x="330" y="56" text-anchor="middle">YAN GÖRÜNÜŞ</text>`;
  return side + front + titleBlock(560, 360, 'MEKANİZASYON PROJESİ', 'AK-2023-01', '1:25');
}

/* 2 · fleet: plan view of three units with spacing chain + enlarged hub detail */
function fleet(id: string) {
  const unit = (y: number, n: number) => {
    const x = 140;
    return `<g class="ln">` +
      `<rect x="${x}" y="${y - 46}" width="64" height="20" rx="5"/><rect x="${x}" y="${y + 26}" width="64" height="20" rx="5"/>` +   // rear tyres
      `<rect x="${x + 196}" y="${y - 38}" width="40" height="12" rx="4"/><rect x="${x + 196}" y="${y + 26}" width="40" height="12" rx="4"/>` + // front tyres
      `<path d="M${x + 32} ${y - 26}V${y + 26}M${x + 216} ${y - 26}V${y + 26}"/>` +                     // axles
      `<rect x="${x + 6}" y="${y - 22}" width="76" height="44" rx="4"/><path d="M${x + 14} ${y - 14}h60v28h-60z"/>` +   // cab roof
      `<rect x="${x + 82}" y="${y - 14}" width="168" height="28" rx="6"/><path d="M${x + 238} ${y - 14}v28"/>` +        // hood
      `<circle cx="${x + 196}" cy="${y - 6}" r="4"/>` +                                                                  // exhaust
      `<path d="M${x - 2} ${y}h-22M${x - 24} ${y - 8}v16"/>` +                                                            // drawbar
      `<path d="M${x - 24} ${y - 30}h-56v60h56z"/><path d="M${x - 80} ${y - 18}h56M${x - 80} ${y - 6}h56M${x - 80} ${y + 6}h56M${x - 80} ${y + 18}h56"/>` + // implement
      `</g>` + `<path class="cl" d="M${x - 92} ${y}H${x + 268}"/>` +
      `<circle class="bl" cx="${x + 290}" cy="${y}" r="11"/><text class="t b" x="${x + 290}" y="${y + 4}" text-anchor="middle">${n}</text><path class="ldr" d="M${x + 250} ${y}H${x + 279}"/>`;
  };
  const ys = [106, 210, 314];
  const hub = { x: 612, y: 172, r: 92 };
  const bolts = Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return `<circle cx="${f(hub.x + Math.cos(a) * 58)}" cy="${f(hub.y + Math.sin(a) * 58)}" r="7"/>`; }).join('');
  const hatch = Array.from({ length: 14 }, (_, i) => `<path class="ext" d="M${hub.x - 92 + i * 13} ${hub.y + 112}l-12 12"/>`).join('');
  return ys.map((y, i) => unit(y, i + 1)).join('') +
    vdim(ys[0], ys[1], 30, 54, '3.000', id) + vdim(ys[1], ys[2], 30, 54, '3.000', id) +
    hdim(60, 390, 390, 364, '6.200', id) +
    // detail circle on unit 1's rear wheel → enlarged hub
    `<circle class="dt" cx="172" cy="${ys[0] - 36}" r="20"/><path class="ldr" d="M190 ${ys[0] - 44}Q380 ${ys[0] - 96} ${hub.x - 98} ${hub.y - 40}"/><text class="t b" x="198" y="${ys[0] - 58}">A</text>` +
    `<g class="ln"><circle cx="${hub.x}" cy="${hub.y}" r="${hub.r}"/><circle cx="${hub.x}" cy="${hub.y}" r="76"/><circle cx="${hub.x}" cy="${hub.y}" r="30"/>${bolts}` +
    `<path d="M${hub.x - 6} ${hub.y - 30}v-8h12v8"/></g>` +
    `<circle class="pcd" cx="${hub.x}" cy="${hub.y}" r="58"/>` + cross(hub.x, hub.y, 108) +
    `<path class="ldr" d="M${f(hub.x + 41)} ${f(hub.y - 41)}L${hub.x + 96} ${hub.y - 96}H${hub.x + 150}"/><text class="t" x="${hub.x + 100}" y="${hub.y - 101}">PCD Ø275</text>` +
    `<path class="ldr" d="M${f(hub.x + 58 * Math.cos(Math.PI / 4))} ${f(hub.y + 58 * Math.sin(Math.PI / 4))}L${hub.x + 100} ${hub.y + 84}H${hub.x + 160}"/><text class="t" x="${hub.x + 104}" y="${hub.y + 79}">8 × M18</text>` +
    `<path class="ldr" d="M${hub.x - 21} ${hub.y + 21}L${hub.x - 100} ${hub.y + 92}H${hub.x - 150}"/><text class="t" x="${hub.x - 150}" y="${hub.y + 87}">Ø60 H7</text>` +
    // section strip under the hub (hub flange in section)
    `<g class="ln"><path d="M${hub.x - 92} ${hub.y + 112}h184v16h-184z"/></g>${hatch}` +
    `<text class="t s" x="${hub.x}" y="64" text-anchor="middle">DETAY A · 1:5</text><text class="t s" x="240" y="32" text-anchor="middle">PLAN GÖRÜNÜŞ · FİLO DİZİLİMİ</text>` +
    titleBlock(560, 360, 'FİLO YENİLEME', 'AK-2024-02', '1:50');
}

export default function Blueprint({ kind, label }: { kind: Kind; label?: string }) {
  const id = 'bp' + kind;
  const body = kind === 'fleet' ? fleet(id) : tractor(id);
  const defs = `<defs><pattern id="g1-${id}" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" class="g1"/></pattern>` +
    `<pattern id="g2-${id}" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80" class="g2"/></pattern>` +
    `<radialGradient id="v-${id}" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#1f5fd0"/><stop offset="1" stop-color="#0c2f78"/></radialGradient>` +
    `<marker id="a-${id}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" class="ah"/></marker></defs>`;
  const frame = `<rect class="fr" x="8" y="8" width="784" height="409"/>` +
    Array.from({ length: 9 }, (_, i) => `<path class="fr" d="M${88 * (i + 1) - 4} 8v6M${88 * (i + 1) - 4} 417v-6"/>`).join('');
  return (
    <svg className="bp" viewBox="0 0 800 425" role="img" aria-label={label || kind} preserveAspectRatio="xMidYMid meet"
      dangerouslySetInnerHTML={{ __html: defs + `<rect width="800" height="425" fill="url(#v-${id})"/><rect width="800" height="425" fill="url(#g1-${id})"/><rect width="800" height="425" fill="url(#g2-${id})"/>` + frame + body }} />
  );
}
