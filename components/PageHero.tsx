import { Split } from './ui';
import HeroVisual from './HeroVisual';
import type { ModelKind } from '@/lib/catalog';

/* Inner-page hero: eyebrow, two-line headline, lead, optional slowly turning 3D part on the right. */
export default function PageHero({ eyebrow, title, lead, kind, children }: { eyebrow: string; title: string[]; lead?: string; kind?: ModelKind; children?: React.ReactNode }) {
  return (
    <section className={'phero' + (kind ? ' phero-3d' : '')}>
      <div className="wrap phero-in">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <Split as="h1" className="h1" lines={title} />
          {lead && <p className="lead fade">{lead}</p>}
          {children}
        </div>
        {kind && <div className="phero-vis" aria-hidden><HeroVisual kind={kind} /></div>}
      </div>
    </section>
  );
}
