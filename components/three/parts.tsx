'use client';
/* Procedural, true-to-type tractor parts built from code (no external CAD yet):
   helical gears with real tooth profiles, synchroniser ring, clutch disc with damper
   springs, ventilated brake disc, hydraulic top link, lever, pin, bolt & nut, radiator cap,
   splined shaft. Units: 1 = 10 cm. */
import * as THREE from 'three';
import { useMemo } from 'react';
import type { ThreeElements } from '@react-three/fiber';
import type { ModelKind } from '@/lib/catalog';
import { LIGHT } from '@/lib/theme';

/* ── materials ── */
export function useMats() {
  return useMemo(() => ({
    steel: new THREE.MeshPhysicalMaterial({ color: LIGHT ? 0x6f7782 : 0xa7adb4, metalness: 1, roughness: LIGHT ? 0.32 : 0.28, clearcoat: 0.2 }),   // darker on light backgrounds
    dark: new THREE.MeshPhysicalMaterial({ color: 0x3a3f46, metalness: 0.9, roughness: 0.42 }),
    black: new THREE.MeshPhysicalMaterial({ color: 0x15171a, metalness: 0.5, roughness: 0.55 }),
    brass: new THREE.MeshPhysicalMaterial({ color: 0xc9a46a, metalness: 1, roughness: 0.3 }),
    // two-tone tractor in both versions: pearl bodywork + accent rims (light: technical blue · dark: electric blue)
    body: new THREE.MeshPhysicalMaterial({ color: LIGHT ? 0xdfe5ec : 0xe3e8ee, metalness: 0.35, roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.15 }),
    rim: new THREE.MeshPhysicalMaterial({ color: LIGHT ? 0x2d6bff : 0x3a74f0, metalness: 0.55, roughness: 0.35, clearcoat: 0.6 }),
    red: new THREE.MeshPhysicalMaterial({ color: LIGHT ? 0x2d6bff : 0x3a74f0, metalness: 0.55, roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
    friction: new THREE.MeshStandardMaterial({ color: 0x2b2724, metalness: 0.05, roughness: 0.95 }),
    zinc: new THREE.MeshPhysicalMaterial({ color: 0xd8d2c0, metalness: 1, roughness: 0.25 }),
    canvas: new THREE.MeshStandardMaterial({ color: 0x23272d, roughness: 0.9, side: THREE.DoubleSide }),
  }), []);
}
export type Mats = ReturnType<typeof useMats>;

/* ── geometry builders ── */
function gearShape(teeth: number, r: number, depth: number, bore: number, boreSides = 0) {
  const s = new THREE.Shape(), rr = r - depth, step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step, pts: [number, number][] = [
      [rr, a], [rr, a + step * 0.12], [r, a + step * 0.32], [r, a + step * 0.58], [rr, a + step * 0.78], [rr, a + step],
    ];
    pts.forEach(([R, A], k) => { const x = Math.cos(A) * R, y = Math.sin(A) * R; if (i === 0 && k === 0) s.moveTo(x, y); else s.lineTo(x, y); });
  }
  const h = new THREE.Path();
  if (boreSides) { for (let i = 0; i <= boreSides; i++) { const a = (i / boreSides) * Math.PI * 2, R = i % 2 ? bore * 1.12 : bore; i ? h.lineTo(Math.cos(a) * R, Math.sin(a) * R) : h.moveTo(Math.cos(a) * R, Math.sin(a) * R); } }
  else h.absarc(0, 0, bore, 0, Math.PI * 2, true);
  s.holes.push(h); return s;
}
/** gear: extruded tooth profile; helix twists the teeth along the face width */
export function gearGeo(teeth: number, r: number, width: number, bore: number, helix = 0, spline = 0) {
  const g = new THREE.ExtrudeGeometry(gearShape(teeth, r, r * 0.09 + 0.05, bore, spline), { depth: width, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2, steps: helix ? 6 : 1, curveSegments: 6 });
  g.translate(0, 0, -width / 2);
  if (helix) { const p = g.attributes.position; const v = new THREE.Vector3(); for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); const a = (v.z / width) * helix; p.setXY(i, v.x * Math.cos(a) - v.y * Math.sin(a), v.x * Math.sin(a) + v.y * Math.cos(a)); } }
  g.computeVertexNormals(); return g;
}
function ringGeo(rOut: number, rIn: number, depth: number, segs = 96) {
  const s = new THREE.Shape(); s.absarc(0, 0, rOut, 0, Math.PI * 2, false); const h = new THREE.Path(); h.absarc(0, 0, rIn, 0, Math.PI * 2, true); s.holes.push(h);
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 2, curveSegments: segs }); g.translate(0, 0, -depth / 2); return g;
}
const cyl = (r: number, h: number, seg = 48) => new THREE.CylinderGeometry(r, r, h, seg);

/* ── parts (each lies along / faces the local Z axis unless noted) ── */
type P = { m: Mats } & ThreeElements['group'];

export function HelicalGear({ m, teeth = 34, r = 2, width = 0.9, ...g }: P & { teeth?: number; r?: number; width?: number }) {
  const geo = useMemo(() => gearGeo(teeth, r, width, 0.42, 0.35, 16), [teeth, r, width]);
  const hub = useMemo(() => ringGeo(0.95, 0.42, width + 0.35), [width]);
  const web = useMemo(() => ringGeo(r * 0.78, 0.9, width * 0.45), [r, width]);
  return (
    <group {...g}>
      <mesh geometry={geo} material={m.steel} castShadow receiveShadow />
      <mesh geometry={hub} material={m.dark} castShadow />
      <mesh geometry={web} material={m.dark} position-z={0.001} />
    </group>
  );
}
export function SynchroRing({ m, r = 1.25, ...g }: P & { r?: number }) {
  const geo = useMemo(() => gearGeo(42, r, 0.32, r * 0.78), [r]);
  const cone = useMemo(() => new THREE.CylinderGeometry(r * 0.8, r * 0.72, 0.42, 64, 1, true), [r]);
  return (
    <group {...g}>
      <mesh geometry={geo} material={m.brass} castShadow />
      <mesh geometry={cone} material={m.brass} rotation-x={Math.PI / 2} position-z={0.3} />
    </group>
  );
}
export function ClutchDisc({ m, r = 2.4, ...g }: P & { r?: number }) {
  const plate = useMemo(() => ringGeo(r * 0.92, 0.55, 0.06), [r]);
  const lining = useMemo(() => ringGeo(r, r * 0.62, 0.12), [r]);
  const hub = useMemo(() => gearGeo(18, 0.75, 0.6, 0.38, 0, 14), []);
  const spring = useMemo(() => new THREE.CylinderGeometry(0.16, 0.16, 0.55, 20), []);
  const coil = useMemo(() => new THREE.TorusGeometry(0.17, 0.035, 8, 20), []);
  return (
    <group {...g}>
      <mesh geometry={plate} material={m.steel} castShadow />
      <mesh geometry={lining} material={m.friction} position-z={0.09} castShadow /><mesh geometry={lining} material={m.friction} position-z={-0.09} />
      <mesh geometry={hub} material={m.dark} castShadow />
      {Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2 + 0.3; return (
        <group key={i} position={[Math.cos(a) * 1.15, Math.sin(a) * 1.15, 0]} rotation-z={a + Math.PI / 2}>
          <mesh geometry={spring} material={m.red} rotation-z={Math.PI / 2} />
          {[-0.2, -0.07, 0.07, 0.2].map(x => <mesh key={x} geometry={coil} material={m.dark} position-x={x} rotation-y={Math.PI / 2} />)}
        </group>); })}
    </group>
  );
}
export function BrakeDisc({ m, r = 1.9, ...g }: P & { r?: number }) {
  const k = r / 1.9;   // everything scales with the disc radius (tractor discs are small)
  const disc = useMemo(() => ringGeo(r, 0.62 * k, 0.22 * Math.max(k, 0.45)), [r, k]);
  const pad = useMemo(() => { const s = new THREE.Shape(); s.absarc(0, 0, r * 0.98, -0.22, 0.22, false); s.absarc(0, 0, r * 0.66, 0.22, -0.22, true); return new THREE.ExtrudeGeometry(s, { depth: 0.08 * Math.max(k, 0.45), bevelEnabled: false, curveSegments: 16 }); }, [r]);
  const hub = useMemo(() => gearGeo(24, 0.66 * k, 0.4 * Math.max(k, 0.45), 0.4 * k, 0, 12), [k]);
  const hole = useMemo(() => cyl(0.07 * k, 0.24 * Math.max(k, 0.45), 16), [k]);
  return (
    <group {...g}>
      <mesh geometry={disc} material={m.dark} castShadow receiveShadow />
      <mesh geometry={hub} material={m.steel} />
      {[0.11 * Math.max(k, 0.45), -0.19 * Math.max(k, 0.45)].map(z => Array.from({ length: 8 }, (_, i) => <mesh key={z + ':' + i} geometry={pad} material={m.friction} rotation-z={(i / 8) * Math.PI * 2} position-z={z} />))}
      {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <mesh key={i} geometry={hole} material={m.black} position={[Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.82, 0]} rotation-x={Math.PI / 2} />; })}
    </group>
  );
}
/** hydraulic top link: along X */
export function TopLink({ m, len = 3.4, ...g }: P & { len?: number }) {
  const body = useMemo(() => cyl(0.3, len * 0.5), [len]);
  const rod = useMemo(() => cyl(0.16, len * 0.32, 24), [len]);
  const thread = useMemo(() => new THREE.TorusGeometry(0.17, 0.018, 6, 24), []);
  const eye = useMemo(() => new THREE.TorusGeometry(0.28, 0.11, 16, 40), []);
  const nut = useMemo(() => new THREE.CylinderGeometry(0.36, 0.36, 0.22, 6), []);
  const handle = useMemo(() => cyl(0.06, 0.9, 16), []);
  return (
    <group {...g}>
      <mesh geometry={body} material={m.red} rotation-z={Math.PI / 2} castShadow />
      <mesh geometry={handle} material={m.steel} position-y={0.32} rotation-z={Math.PI / 2} />
      {[-1, 1].map(s => (
        <group key={s}>
          <mesh geometry={rod} material={m.steel} rotation-z={Math.PI / 2} position-x={s * len * 0.37} castShadow />
          {Array.from({ length: 9 }, (_, k) => <mesh key={k} geometry={thread} material={m.steel} rotation-y={Math.PI / 2} position-x={s * (len * 0.26 + k * 0.05)} />)}
          <mesh geometry={nut} material={m.dark} rotation-z={Math.PI / 2} position-x={s * len * 0.26} />
          <mesh geometry={eye} material={m.dark} position-x={s * (len * 0.53 + 0.1)} castShadow />
        </group>
      ))}
    </group>
  );
}
/** shift / control lever (like the real NC026) */
export function Lever({ m, ...g }: P) {
  const geo = useMemo(() => {
    const s = new THREE.Shape(); s.moveTo(-1.6, 0.45); s.lineTo(1.4, 0.3); s.absarc(1.45, 0, 0.32, Math.PI / 2, -Math.PI / 2, true); s.lineTo(-1.6, -0.45); s.absarc(-1.6, 0, 0.45, -Math.PI / 2, Math.PI / 2, true);
    const h1 = new THREE.Path(); h1.absarc(1.45, 0, 0.16, 0, Math.PI * 2, true); const h2 = new THREE.Path(); h2.absarc(-1.6, 0, 0.24, 0, Math.PI * 2, true); s.holes.push(h1, h2);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.32, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 3, curveSegments: 32 }); g.translate(0, 0, -0.16); return g;
  }, []);
  const boss = useMemo(() => ringGeo(0.45, 0.24, 0.7), []);
  const side = useMemo(() => cyl(0.18, 0.5, 24), []);
  return (
    <group {...g}>
      <mesh geometry={geo} material={m.dark} castShadow />
      <mesh geometry={boss} material={m.dark} position-x={-1.6} />
      <mesh geometry={side} material={m.steel} position={[-1.85, -0.35, 0]} rotation-z={0.6} />
    </group>
  );
}
export function Pin({ m, ...g }: P) {
  const body = useMemo(() => cyl(0.22, 2.6), []); const head = useMemo(() => cyl(0.36, 0.16), []);
  const ring = useMemo(() => new THREE.TorusGeometry(0.28, 0.035, 8, 32, Math.PI * 1.7), []);
  const hole = useMemo(() => cyl(0.06, 0.46, 12), []);
  return (
    <group {...g}>
      <mesh geometry={body} material={m.zinc} castShadow /><mesh geometry={head} material={m.zinc} position-y={1.33} castShadow />
      <mesh geometry={hole} material={m.black} position-y={-1.05} rotation-z={Math.PI / 2} />
      <mesh geometry={ring} material={m.steel} position={[0.05, -1.05, 0]} rotation-y={Math.PI / 2} />
    </group>
  );
}
export function BoltNut({ m, ...g }: P) {
  const head = useMemo(() => new THREE.CylinderGeometry(0.5, 0.5, 0.32, 6), []); const shank = useMemo(() => cyl(0.26, 2.2), []);
  const thread = useMemo(() => new THREE.TorusGeometry(0.265, 0.025, 6, 24), []); const nut = useMemo(() => new THREE.CylinderGeometry(0.48, 0.48, 0.36, 6), []);
  const washer = useMemo(() => ringGeo(0.55, 0.28, 0.06), []);
  return (
    <group {...g}>
      <mesh geometry={head} material={m.zinc} position-y={1.25} castShadow /><mesh geometry={shank} material={m.zinc} castShadow />
      {Array.from({ length: 16 }, (_, k) => <mesh key={k} geometry={thread} material={m.zinc} rotation-x={Math.PI / 2} position-y={-1 + k * 0.07} />)}
      <mesh geometry={washer} material={m.steel} rotation-x={Math.PI / 2} position-y={-0.15} />
      <mesh geometry={nut} material={m.dark} position-y={-0.38} castShadow />
    </group>
  );
}
export function RadiatorCap({ m, ...g }: P) {
  const top = useMemo(() => new THREE.CylinderGeometry(1.1, 1.15, 0.35, 64), []); const neck = useMemo(() => cyl(0.75, 0.6), []);
  const ear = useMemo(() => new THREE.BoxGeometry(0.5, 0.3, 0.9), []); const spring = useMemo(() => new THREE.TorusGeometry(0.45, 0.04, 8, 32), []);
  return (
    <group {...g}>
      <mesh geometry={top} material={m.zinc} castShadow /><mesh geometry={neck} material={m.steel} position-y={-0.45} />
      {[-1, 1].map(s => <mesh key={s} geometry={ear} material={m.zinc} position-x={s * 1.25} castShadow />)}
      {[0, 1, 2, 3].map(k => <mesh key={k} geometry={spring} material={m.dark} rotation-x={Math.PI / 2} position-y={-0.85 - k * 0.12} />)}
    </group>
  );
}
export function Shaft({ m, len = 9, ...g }: P & { len?: number }) {
  const core = useMemo(() => cyl(0.36, len, 40), [len]); const spline = useMemo(() => gearGeo(20, 0.44, 1.6, 0.1), []);
  const collar = useMemo(() => ringGeo(0.58, 0.35, 0.18), []);
  return (
    <group {...g}>
      <mesh geometry={core} material={m.steel} rotation-z={Math.PI / 2} castShadow />
      <mesh geometry={spline} material={m.steel} rotation-y={Math.PI / 2} position-x={len * 0.38} />
      <mesh geometry={spline} material={m.steel} rotation-y={Math.PI / 2} position-x={-len * 0.4} />
      {[-0.32, 0.05, 0.2].map(f => <mesh key={f} geometry={collar} material={m.dark} rotation-y={Math.PI / 2} position-x={len * f} />)}
    </group>
  );
}
export function CanopyFrame({ m, ...g }: P) {
  const tube = useMemo(() => cyl(0.07, 3, 16), []); const roof = useMemo(() => { const g = new THREE.PlaneGeometry(3.2, 2.6, 12, 1); const p = g.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, -Math.pow(p.getX(i) / 1.6, 2) * 0.25); g.computeVertexNormals(); return g; }, []);
  return (
    <group {...g}>
      {[[-1.4, -1.1], [1.4, -1.1], [-1.4, 1.1], [1.4, 1.1]].map(([x, z]) => <mesh key={x + ':' + z} geometry={tube} material={m.dark} position={[x, 0, z]} castShadow />)}
      <mesh geometry={roof} material={m.canvas} rotation-x={-Math.PI / 2} position-y={1.55} castShadow />
    </group>
  );
}

/** one representative model per product group (detail page + catalogue thumbnails) */
export function PartModel({ kind, m }: { kind: ModelKind; m: Mats }) {
  switch (kind) {
    case 'gear': return <HelicalGear m={m} r={1.6} teeth={28} />;
    case 'clutch': return <ClutchDisc m={m} r={1.9} />;
    case 'brake': return <BrakeDisc m={m} r={1.7} />;
    case 'toplink': return <TopLink m={m} len={3.2} />;
    case 'lever': return <Lever m={m} />;
    case 'pin': return <Pin m={m} rotation-z={0.5} />;
    case 'bolt': return <BoltNut m={m} rotation-z={0.4} />;
    case 'radiator': return <RadiatorCap m={m} rotation-x={0.5} />;
    case 'canopy': return <CanopyFrame m={m} scale={0.8} position-y={-0.6} />;
    case 'shaft': return <Shaft m={m} len={4.2} />;
  }
}
