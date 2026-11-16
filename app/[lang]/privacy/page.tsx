import type { Lang } from '@/lib/catalog';
import { Split } from '@/components/ui';
import { t } from '@/lib/i18n';

export default async function Privacy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = t(lang).legal;
  return (
    <section className="phero"><div className="wrap">
      <Split as="h1" className="h1" lines={d.title} />
      <div className="legal fade">{d.body.map((p, i) => <p key={i}>{p}</p>)}</div>
    </div></section>
  );
}
