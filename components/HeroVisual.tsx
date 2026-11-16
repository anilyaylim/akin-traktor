'use client';
import dynamic from 'next/dynamic';
import type { ModelKind } from '@/lib/catalog';
const PartViewer = dynamic(() => import('./three/PartViewer'), { ssr: false });
export default function HeroVisual({ kind }: { kind: ModelKind }) { return <PartViewer kind={kind} />; }
