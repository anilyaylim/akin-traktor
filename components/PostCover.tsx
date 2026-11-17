/* Blueprint-style cover art for articles: technical line drawing of the part type on a grid,
   drawn in SVG (no photos needed, crisp at every size, follows the theme colours). */
import type { ModelKind } from '@/lib/catalog';
export type { ArtKind };

type ArtKind = ModelKind | 'tractor' | 'fleet' | 'stand' | 'meet';
const ART: Partial<Record<ArtKind, string>> = {
  brake: '<circle cx="200" cy="130" r="92"/><circle cx="200" cy="130" r="34"/><path d="M200 46v36" transform="rotate(0 200 130)"/><path d="M200 46v36" transform="rotate(45 200 130)"/><path d="M200 46v36" transform="rotate(90 200 130)"/><path d="M200 46v36" transform="rotate(135 200 130)"/><path d="M200 46v36" transform="rotate(180 200 130)"/><path d="M200 46v36" transform="rotate(225 200 130)"/><path d="M200 46v36" transform="rotate(270 200 130)"/><path d="M200 46v36" transform="rotate(315 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(15 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(45 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(75 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(105 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(135 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(165 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(195 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(225 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(255 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(285 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(315 200 130)"/><circle cx="200" cy="58" r="5" transform="rotate(345 200 130)"/>',
  lever: '<path d="M90 150l210-40"/><path d="M84 168l222-42"/><circle cx="86" cy="160" r="26"/><circle cx="86" cy="160" r="12"/><circle cx="306" cy="118" r="16"/><circle cx="306" cy="118" r="6"/><path d="M60 208h280" stroke-dasharray="6 6"/>',
  pin: '<rect x="110" y="114" width="200" height="32" rx="14"/><rect x="92" y="104" width="22" height="52" rx="4"/><circle cx="286" cy="130" r="5"/><path d="M286 130c28-38 60-10 40 18"/><path d="M92 196h236" stroke-dasharray="6 6"/>',
  bolt: '<path d="M150 70l26-15h48l26 15v30l-26 15h-48l-26-15z"/><rect x="180" y="115" width="40" height="110"/><path d="M180 130l40 6"/><path d="M180 142l40 6"/><path d="M180 154l40 6"/><path d="M180 166l40 6"/><path d="M180 178l40 6"/><path d="M180 190l40 6"/><path d="M180 202l40 6"/><path d="M180 214l40 6"/>',
  canopy: '<path d="M90 90q110-40 220 0"/><path d="M100 92v130M300 92v130M140 80v142M260 80v142"/><path d="M70 222h260" stroke-dasharray="6 6"/>',
  shaft: '<rect x="60" y="116" width="280" height="28" rx="6"/><path d="M80 112v36M280 112v36"/><path d="M88 112v36M288 112v36"/><path d="M96 112v36M296 112v36"/><path d="M104 112v36M304 112v36"/><path d="M112 112v36M312 112v36"/><path d="M120 112v36M320 112v36"/><rect x="170" y="104" width="22" height="52" rx="4"/><rect x="214" y="104" width="22" height="52" rx="4"/>',
  tractor: '<circle cx="140" cy="182" r="46"/><circle cx="140" cy="182" r="20"/><circle cx="282" cy="196" r="28"/><circle cx="282" cy="196" r="10"/><path d="M104 136V70h62l14 66"/><path d="M114 80h44l10 46h-54z"/><path d="M94 136h214v34"/><path d="M262 136V96"/><path d="M60 228h290" stroke-dasharray="6 6"/>',
  fleet: '<g transform="translate(28 30) scale(.44)"><circle cx="140" cy="182" r="46"/><circle cx="140" cy="182" r="20"/><circle cx="282" cy="196" r="28"/><circle cx="282" cy="196" r="10"/><path d="M104 136V70h62l14 66"/><path d="M114 80h44l10 46h-54z"/><path d="M94 136h214v34"/><path d="M262 136V96"/><path d="M60 228h290" stroke-dasharray="6 6"/></g><g transform="translate(212 30) scale(.44)"><circle cx="140" cy="182" r="46"/><circle cx="140" cy="182" r="20"/><circle cx="282" cy="196" r="28"/><circle cx="282" cy="196" r="10"/><path d="M104 136V70h62l14 66"/><path d="M114 80h44l10 46h-54z"/><path d="M94 136h214v34"/><path d="M262 136V96"/><path d="M60 228h290" stroke-dasharray="6 6"/></g><g transform="translate(120 112) scale(.44)"><circle cx="140" cy="182" r="46"/><circle cx="140" cy="182" r="20"/><circle cx="282" cy="196" r="28"/><circle cx="282" cy="196" r="10"/><path d="M104 136V70h62l14 66"/><path d="M114 80h44l10 46h-54z"/><path d="M94 136h214v34"/><path d="M262 136V96"/><path d="M60 228h290" stroke-dasharray="6 6"/></g>',
  stand: '<path d="M80 70h240v20H80z"/><path d="M80 90v140M320 90v140"/><rect x="120" y="140" width="160" height="70" rx="6"/><path d="M150 140v-24h100v24"/><circle cx="200" cy="116" r="0"/><path d="M110 60l20-28h140l20 28"/><path d="M60 236h280" stroke-dasharray="6 6"/>',
  meet: '<rect x="110" y="130" width="180" height="16" rx="4"/><path d="M130 146v60M270 146v60"/><circle cx="140" cy="102" r="14"/><path d="M118 128q22-26 44 0"/><circle cx="200" cy="102" r="14"/><path d="M178 128q22-26 44 0"/><circle cx="260" cy="102" r="14"/><path d="M238 128q22-26 44 0"/><rect x="150" y="40" width="100" height="40" rx="6"/><path d="M164 54h50M164 66h30"/>',

  clutch: '<circle cx="200" cy="130" r="92"/><circle cx="200" cy="130" r="62"/><circle cx="200" cy="130" r="26"/>' +
    Array.from({ length: 6 }, (_, i) => { const a = i * 60 + 20; return `<rect x="190" y="74" width="20" height="30" rx="4" transform="rotate(${a} 200 130)"/>`; }).join('') +
    Array.from({ length: 18 }, (_, i) => `<path d="M200 104v-8" transform="rotate(${i * 20} 200 130)"/>`).join(''),
  toplink: '<path d="M70 130h70M260 130h70"/><rect x="140" y="112" width="120" height="36" rx="6"/><circle cx="54" cy="130" r="18"/><circle cx="346" cy="130" r="18"/><circle cx="54" cy="130" r="8"/><circle cx="346" cy="130" r="8"/>' +
    Array.from({ length: 8 }, (_, i) => `<path d="M${84 + i * 6} 122v16M${290 + i * 6} 122v16"/>`).join('') + '<path d="M170 112v-18h60v18"/><path d="M60 196h280" stroke-dasharray="6 6"/><path d="M60 188v16M340 188v16"/>',
  radiator: '<rect x="110" y="60" width="180" height="150" rx="8"/>' + Array.from({ length: 13 }, (_, i) => `<path d="M${124 + i * 12.5} 74v122"/>`).join('') +
    '<rect x="172" y="34" width="56" height="26" rx="6"/><path d="M160 34h80"/><path d="M290 100h30v40h-30"/>',
  gear: Array.from({ length: 24 }, (_, i) => `<rect x="192" y="34" width="16" height="22" rx="2" transform="rotate(${i * 15} 200 130)"/>`).join('') +
    '<circle cx="200" cy="130" r="78"/><circle cx="200" cy="130" r="50"/><circle cx="200" cy="130" r="20"/><path d="M200 130L300 40" stroke-dasharray="4 5"/><circle cx="300" cy="40" r="4"/>',
};

export default function PostCover({ kind, label }: { kind: ArtKind; label?: string }) {
  const art = ART[kind] || ART.gear!;
  return (
    <svg className="pcover" viewBox="0 0 400 260" role="img" aria-label={label || kind} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={'g-' + kind} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" className="pc-grid" /></pattern>
        <radialGradient id={'r-' + kind} cx="50%" cy="50%" r="60%"><stop offset="0" className="pc-glow0" /><stop offset="1" className="pc-glow1" /></radialGradient>
      </defs>
      <rect width="400" height="260" className="pc-bg" /><rect width="400" height="260" fill={`url(#g-${kind})`} /><rect width="400" height="260" fill={`url(#r-${kind})`} />
      <g className="pc-art" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: art }} />
      <g className="pc-meta"><path d="M16 16h18M16 16v18M384 244h-18M384 244v-18" fill="none" /></g>
    </svg>
  );
}
