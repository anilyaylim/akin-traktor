/* Small shared UI pieces (server-safe): split-text heading, arrow icon, logo, system icons. */
import { Fragment } from 'react';
import type { SystemId } from '@/lib/catalog';
import { LIGHT } from '@/lib/theme';
import { HYBRID, HYBRID_VB } from '@/lib/logos';

export function Split({ lines, className = '', as: Tag = 'h2' }: { lines: string[] | string; className?: string; as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' }) {
  const ls = Array.isArray(lines) ? lines : [lines]; let i = 0;
  return (
    <Tag className={'split ' + className}>
      {ls.map((l, k) => (
        <span key={k} style={{ display: 'block' }}>
          {l.split(' ').map((w, j) => <Fragment key={j}><span className="w"><span style={{ ['--i' as string]: i++ }}>{w}</span></span>{' '}</Fragment>)}
        </span>
      ))}
    </Tag>
  );
}

export const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M2 8h11M9 4l4 4-4 4" /></svg>
);
export const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" /></svg>
);
export const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M4 5h2l2 11h10l2-8H7.5" /><circle cx="9.5" cy="19.5" r="1.2" /><circle cx="17" cy="19.5" r="1.2" /></svg>
);

/* New identity proposal: a nut-shaped mark (hexagon = engineering) cut by the "A" arrow,
   paired with a wide geometric wordmark. */
export function Logo({ sub }: { sub?: string }) {
  if (LIGHT) return (
    <span className="logo">
      <svg className="hyb" viewBox={HYBRID_VB} aria-label="akın" dangerouslySetInnerHTML={{ __html: HYBRID }} />
      {sub && <small>{sub}</small>}
    </span>
  );
  return (
    <span className="logo">
      <svg viewBox="0 0 132 30" aria-label="AKIN">
        <g>
          <path d="M15 1.5 27.2 8.5v13L15 28.5 2.8 21.5v-13z" fill="#e3232a" />
          <path d="M9 21.5 15 7l6 14.5M11.6 16.2h6.8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinejoin="round" />
        </g>
        <text x="38" y="22.5" fill="currentColor" style={{ font: '700 21px var(--font-geist-sans)', letterSpacing: '.16em' }}>AKIN</text>
      </svg>
      {sub && <small>{sub}</small>}
    </span>
  );
}

const P: Record<SystemId, string> = {
  powertrain: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0-5.5 1.4 2.6 2.9-.8.5 3 2.9.9-1 2.8L21 13l-2.3 2 .9 2.9-3 .4-.8 2.9-2.8-1L12 21l-2-2.3-2.9.9-.4-3-2.9-.8 1-2.8L3 11l2.3-2-.9-2.9 3-.4.8-2.9 2.8 1z',
  hydraulics: 'M3 17h4l3-10h4l3 10h4M8 12h8M10 7V4M14 7V4',
  brakes: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 3v3M21 12h-3M12 21v-3M3 12h3',
  steering: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 13l5-1M20 13l-5-1M12 15v6',
  cooling: 'M4 5h16v14H4zM8 5v14M12 5v14M16 5v14M4 9h16',
  fasteners: 'M12 2l7 4v8l-7 4-7-4V6zm0 6a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM12 18v4',
  cab: 'M4 20V9l3-5h10l3 5v11M4 9h16M9 4v5M15 4v5',
  misc: 'M14 4l6 6-9 9H5v-6zM12 6l6 6',
};
export function SysIcon({ id }: { id: SystemId }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden><path d={P[id]} /></svg>;
}
