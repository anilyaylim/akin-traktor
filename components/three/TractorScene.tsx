'use client';
/* Part Finder tractor: a stylised "digital twin" built from primitives. Every assembly is
   tagged with its system; picking a system x-rays the rest of the tractor and makes the
   chosen parts glow, the catalogue filters to match. */
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bounds, ContactShadows, Environment, Html, OrbitControls, RoundedBox } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import type { SystemId } from '@/lib/catalog';
import { BrakeDisc, TopLink, useMats, type Mats } from './parts';

type Sel = SystemId | null;

function Tire({ r, w, lugs, m }: { r: number; w: number; lugs: number; m: Mats }) {
  const tire = useMemo(() => {
    const pts: THREE.Vector2[] = []; const rin = r * 0.62;
    for (let i = 0; i <= 16; i++) { const a = -Math.PI / 2 + (i / 16) * Math.PI; pts.push(new THREE.Vector2(r - 0.12 + Math.cos(a) * 0.12, (w / 2 - 0.12) * Math.sin(a) + Math.sin(a) * 0.12)); }
    pts.unshift(new THREE.Vector2(rin, -w / 2)); pts.push(new THREE.Vector2(rin, w / 2));
    const g = new THREE.LatheGeometry(pts, 64); g.rotateX(Math.PI / 2); return g;
  }, [r, w]);
  const lug = useMemo(() => new THREE.BoxGeometry(0.07, w * 0.42, 0.09), [w]);
  const rim = useMemo(() => new THREE.CylinderGeometry(r * 0.62, r * 0.62, w * 0.7, 48), [r, w]);
  const hub = useMemo(() => new THREE.CylinderGeometry(r * 0.22, r * 0.22, w * 0.9, 24), [r, w]);
  return (
    <group>
      <mesh geometry={tire} material={m.black} castShadow />
      {Array.from({ length: lugs }, (_, i) => { const a = (i / lugs) * Math.PI * 2; return [-1, 1].map(s => (
        <mesh key={i + ':' + s} geometry={lug} material={m.black} position={[Math.cos(a) * (r + 0.02), Math.sin(a) * (r + 0.02), s * w * 0.22]} rotation={[0, 0, a + s * 0.5]} />)); })}
      <mesh geometry={rim} material={m.red} rotation-x={Math.PI / 2} />
      <mesh geometry={hub} material={m.steel} rotation-x={Math.PI / 2} />
    </group>
  );
}

function Tractor({ sel }: { sel: Sel }) {
  const m = useMats();
  const sys = useRef<Partial<Record<SystemId | 'body', THREE.Group>>>({});
  const reg = (k: SystemId | 'body') => (g: THREE.Group | null) => { if (g) { g.userData.sys = k; sys.current[k] = g; } };
  const ghost = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x5b6470, transparent: true, opacity: 0.12, depthWrite: false, metalness: 0.2, roughness: 0.6 }), []);
  const glowCache = useMemo(() => new Map<THREE.Material, THREE.MeshPhysicalMaterial>(), []);
  const glows = useRef<THREE.MeshPhysicalMaterial[]>([]);
  useEffect(() => {
    glows.current = [];
    Object.values(sys.current).forEach(g => g?.traverse(o => {
      const mesh = o as THREE.Mesh; if (!mesh.isMesh) return;
      mesh.userData.orig ??= mesh.material;
      const orig = mesh.userData.orig as THREE.MeshPhysicalMaterial;
      if (!sel) { mesh.material = orig; mesh.castShadow = true; return; }
      if (g.userData.sys === sel) {
        let gm = glowCache.get(orig); if (!gm) { gm = orig.clone(); gm.emissive = new THREE.Color(0xff2a30); glowCache.set(orig, gm); }
        mesh.material = gm; glows.current.push(gm); mesh.castShadow = true;
      } else { mesh.material = ghost; mesh.castShadow = false; }
    }));
  }, [sel, ghost, glowCache]);
  useFrame(({ clock }) => { const k = 0.35 + Math.sin(clock.elapsedTime * 3) * 0.2; glows.current.forEach(g => { g.emissiveIntensity = k; }); });

  const box = (w: number, h: number, d: number, mat: THREE.Material, p: [number, number, number], r = 0.04) => <RoundedBox args={[w, h, d]} radius={r} smoothness={3} position={p} material={mat} castShadow receiveShadow />;
  return (
    <group position={[-0.2, 0, 0]}>
      {/* chassis & bodywork */}
      <group ref={reg('body')}>
        {box(1.85, 0.5, 0.95, m.red, [1.55, 1.62, 0], 0.12)}
        {box(0.5, 0.42, 0.7, m.red, [0.42, 1.68, 0], 0.08)}
        {box(1.5, 0.08, 1.0, m.dark, [1.55, 1.38, 0])}
        <mesh position={[1.25, 2.25, 0.32]} castShadow material={m.dark}><cylinderGeometry args={[0.06, 0.07, 1.3, 16]} /></mesh>
        {[-1, 1].map(s => <mesh key={s} position={[-1.6, 1.15, s * 1.05]} rotation-x={Math.PI / 2} castShadow><cylinderGeometry args={[1.36, 1.36, 0.66, 48, 1, true, Math.PI - 1.3, 2.6]} /><meshPhysicalMaterial color="#d0242b" metalness={0.55} roughness={0.32} clearcoat={0.6} side={THREE.DoubleSide} /></mesh>)}
        {box(0.5, 0.12, 0.5, m.black, [-1.05, 1.82, 0], 0.05)}{box(0.1, 0.5, 0.5, m.black, [-1.32, 2.05, 0], 0.04)}
        <mesh position={[-0.35, 1.95, 0]} rotation-z={0.5} material={m.dark}><cylinderGeometry args={[0.035, 0.035, 0.7, 12]} /></mesh>
        <mesh position={[-0.52, 2.27, 0]} rotation={[0, Math.PI / 2, 0.5]} material={m.black}><torusGeometry args={[0.22, 0.03, 10, 36]} /></mesh>
      </group>
      {/* powertrain: engine, clutch housing, gearbox, rear axle */}
      <group ref={reg('powertrain')}>
        {box(1.4, 0.62, 0.62, m.dark, [1.45, 1.05, 0])}
        <mesh position={[0.45, 1.08, 0]} rotation-z={Math.PI / 2} material={m.dark} castShadow><cylinderGeometry args={[0.42, 0.36, 0.5, 32]} /></mesh>
        {box(1.25, 0.66, 0.78, m.dark, [-0.45, 1.1, 0])}
        <mesh position={[-1.6, 1.15, 0]} rotation-x={Math.PI / 2} material={m.dark} castShadow><cylinderGeometry args={[0.22, 0.26, 1.7, 24]} /></mesh>
      </group>
      {/* brakes: discs at the rear axle */}
      <group ref={reg('brakes')}>
        {[-1, 1].map(s => <BrakeDisc key={s} m={m} r={0.42} position={[-1.6, 1.15, s * 0.62]} />)}
      </group>
      {/* hydraulics: lift arms, lower links, top link */}
      <group ref={reg('hydraulics')}>
        {[-1, 1].map(s => <group key={s}>
          <mesh position={[-2.35, 0.82, s * 0.42]} rotation-z={-0.35} material={m.dark} castShadow><boxGeometry args={[1.1, 0.08, 0.08]} /></mesh>
          <mesh position={[-2.2, 1.62, s * 0.36]} rotation-z={0.25} material={m.dark}><boxGeometry args={[0.8, 0.07, 0.07]} /></mesh>
        </group>)}
        <TopLink m={m} len={1.4} scale={0.42} position={[-2.35, 1.42, 0]} rotation-z={-0.18} />
      </group>
      {/* front axle & steering */}
      <group ref={reg('steering')}>
        <mesh position={[2.15, 0.62, 0]} rotation-x={Math.PI / 2} material={m.dark} castShadow><cylinderGeometry args={[0.1, 0.1, 1.55, 16]} /></mesh>
        <mesh position={[2.15, 0.9, 0]} material={m.steel}><cylinderGeometry args={[0.12, 0.12, 0.45, 16]} /></mesh>
        {[-1, 1].map(s => <group key={s} position={[2.15, 0.62, s * 0.88]}><Tire r={0.6} w={0.32} lugs={22} m={m} /></group>)}
      </group>
      {/* cooling: radiator & grille */}
      <group ref={reg('cooling')}>
        {box(0.14, 0.62, 0.78, m.black, [2.5, 1.45, 0], 0.03)}
        {Array.from({ length: 7 }, (_, i) => <mesh key={i} position={[2.58, 1.2 + i * 0.075, 0]} material={m.steel}><boxGeometry args={[0.02, 0.025, 0.72]} /></mesh>)}
      </group>
      {/* fasteners: wheel nuts on the rear rims */}
      <group ref={reg('fasteners')}>
        {[-1, 1].map(s => Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return <mesh key={s + ':' + i} position={[-1.6 + Math.cos(a) * 0.35, 1.15 + Math.sin(a) * 0.35, s * 1.25]} rotation-x={Math.PI / 2} material={m.zinc}><cylinderGeometry args={[0.045, 0.045, 0.06, 6]} /></mesh>; }))}
      </group>
      {[-1, 1].map(s => <group key={s} position={[-1.6, 1.15, s * 1.05]}><Tire r={1.15} w={0.55} lugs={30} m={m} /></group>)}
      {/* cab / canopy: ROPS frame + roof */}
      <group ref={reg('cab')}>
        {[[-2.05, -0.62], [-2.05, 0.62], [-0.65, -0.62], [-0.65, 0.62]].map(([x, z]) => <mesh key={x + ':' + z} position={[x, 2.45, z]} material={m.dark} castShadow><cylinderGeometry args={[0.035, 0.035, 1.5, 12]} /></mesh>)}
        {box(1.75, 0.07, 1.5, m.canvas, [-1.35, 3.22, 0], 0.03)}
      </group>
      {/* misc: drawbar & PTO */}
      <group ref={reg('misc')}>
        <mesh position={[-2.45, 0.55, 0]} material={m.steel} castShadow><boxGeometry args={[0.9, 0.06, 0.18]} /></mesh>
        <mesh position={[-2.45, 1.0, 0]} rotation-z={Math.PI / 2} material={m.steel}><cylinderGeometry args={[0.06, 0.06, 0.4, 16]} /></mesh>
      </group>
    </group>
  );
}

const SPOTS: [SystemId, [number, number, number]][] = [
  ['powertrain', [0.35, 1.0, 0.48]], ['hydraulics', [-2.65, 1.55, 0]], ['brakes', [-1.0, 0.72, 0.5]], ['steering', [2.0, 0.62, 0]],
  ['cooling', [2.55, 1.55, 0.3]], ['fasteners', [-1.8, 1.15, 1.34]], ['cab', [-1.35, 3.32, 0]], ['misc', [-2.95, 0.55, 0]],
];

export default function TractorScene({ sel, onSel, labels }: { sel: Sel; onSel: (s: Sel) => void; labels: Record<SystemId, string> }) {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ fov: 30, position: [7.2, 4.2, 8.2] }} gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
      <Environment files="/hdr/studio.hdr" environmentIntensity={0.85} />
      <directionalLight position={[5, 9, 5]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-6, 3, -4]} intensity={40} color="#ff2a2f" distance={18} />
      <Bounds fit observe margin={1.12}><Tractor sel={sel} /></Bounds>
      {SPOTS.map(([id, p]) => (
        <Html key={id} position={p} center zIndexRange={[6, 0]}>
          <button className={'tspot' + (sel === id ? ' on' : '')} onClick={() => onSel(sel === id ? null : id)} aria-pressed={sel === id}>
            <i /><span>{labels[id]}</span>
          </button>
        </Html>
      ))}
      <ContactShadows position={[0, 0.001, 0]} opacity={0.6} scale={14} blur={2.2} far={4} />
      <OrbitControls makeDefault target={[0, 1.3, 0]} enablePan={false} enableZoom={false} autoRotate={!sel} autoRotateSpeed={0.6} minPolarAngle={0.6} maxPolarAngle={1.45} enableDamping />
    </Canvas>
  );
}
