/* Build-time theme. The site is exported twice: the dark original (default) and the light v2
   (NEXT_PUBLIC_THEME=light). NEXT_PUBLIC_ALT_BASE points at the other build for the version switch. */
export const THEME: 'dark' | 'light' = process.env.NEXT_PUBLIC_THEME === 'light' ? 'light' : 'dark';
export const LIGHT = THEME === 'light';
const alt = process.env.NEXT_PUBLIC_ALT_BASE || '';
export const ALT_ON = alt !== '';
export const ALT_BASE = alt === '/' ? '' : alt;   // '/' = the other build lives at the domain root
