/* Blueprint-style cover art for articles: technical line drawing of the part type on a grid,
   drawn in SVG (no photos needed, crisp at every size, follows the theme colours). */
import type { ModelKind } from '@/lib/catalog';

const ART: Partial<Record<ModelKind, string>> = {
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

export default function PostCover({ kind, label }: { kind: ModelKind; label?: string }) {
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
