'use client';
/* Part Finder tractor: a stylised "digital twin" built from primitives. Every assembly is
   tagged with its system; picking a system x-rays the rest of the tractor and makes the
   chosen parts glow, the catalogue filters to match. */
import * as THREE from 'three';
import { asset } from '@/lib/i18n';
import { LIGHT } from '@/lib/theme';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
      <mesh geometry={rim} material={m.rim} rotation-x={Math.PI / 2} />
      <mesh geometry={hub} material={m.steel} rotation-x={Math.PI / 2} />
    </group>
  );
}

function Tractor({ sel, onSel, labels }: { sel: Sel; onSel: (s: Sel) => void; labels: Record<SystemId, string> }) {
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
        let gm = glowCache.get(orig); if (!gm) { gm = orig.clone(); gm.emissive = new THREE.Color(LIGHT ? 0x2d6bff : 0xff2a30); glowCache.set(orig, gm); }
        mesh.material = gm; glows.current.push(gm); mesh.castShadow = true;
      } else { mesh.material = ghost; mesh.castShadow = false; }
    }));
  }, [sel, ghost, glowCache]);
  /* selection sequence: 1) the system glows and blinks, 2) it detaches from the tractor, flies towards the
     camera and grows, 3) a dashed vector line keeps pointing at the place it came from. Deselect = reverse. */
  const root = useRef<THREE.Group>(null!);
  const { camera, size } = useThree();
  const st = useRef<Partial<Record<SystemId, { c: THREE.Vector3; S: number; q: number; tgt: THREE.Vector3 }>>>({});
  const selAt = useRef(0); const clockRef = useRef(0);
  useEffect(() => { selAt.current = clockRef.current; }, [sel]);
  const line = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const l = new THREE.Line(g, new THREE.LineDashedMaterial({ color: LIGHT ? 0x2d6bff : 0xff3b3f, dashSize: 0.12, gapSize: 0.08, transparent: true, depthTest: false }));
    l.renderOrder = 10; l.frustumCulled = false; return l;
  }, []);
  const dotA = useMemo(() => new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), new THREE.MeshBasicMaterial({ color: LIGHT ? 0x2d6bff : 0xff3b3f, depthTest: false, transparent: true })), []);
  const ringB = useMemo(() => new THREE.Mesh(new THREE.RingGeometry(0.16, 0.2, 40), new THREE.MeshBasicMaterial({ color: LIGHT ? 0x2d6bff : 0xff3b3f, depthTest: false, transparent: true, side: THREE.DoubleSide })), []);
  useEffect(() => { [line, dotA, ringB].forEach(o => { o.renderOrder = 10; o.visible = false; }); }, [line, dotA, ringB]);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const selQ = useRef(0);
  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime; clockRef.current = t; const since = t - selAt.current;
    // 1) blink: three quick flashes after selection, then a calm pulse
    const k = since < 0.9 ? 0.15 + 0.95 * Math.abs(Math.sin(since * Math.PI * 3.3)) : 0.35 + Math.sin(t * 3) * 0.15;
    glows.current.forEach(g => { g.emissiveIntensity = k; });
    const r = root.current; if (!r) return;
    const mobile = size.width < 760;
    // 2) stage: the tractor steps back (smaller, aside) so the detached part has room
    const goalG = sel && since > 0.9 ? 1 : 0;
    selQ.current += (goalG - selQ.current) * Math.min(1, dt * (goalG ? 2.6 : 4));
    const E = selQ.current * selQ.current * (3 - 2 * selQ.current);
    const right = tmp.set(1, 0, 0).applyQuaternion(camera.quaternion).setY(0).normalize();
    r.position.set(-0.2, 0, 0).addScaledVector(right, -(mobile ? 0.2 : 1.9) * E);
    r.position.y = (mobile ? 1.9 : 0) * E;
    r.scale.setScalar(1 - (mobile ? 0.3 : 0.24) * E);
    // rest centres (tractor-local) – measured once while everything is assembled
    (Object.keys(sys.current) as (SystemId | 'body')[]).forEach(key => {
      if (key === 'body' || st.current[key]) return; const g = sys.current[key]!;
      const box3 = new THREE.Box3().setFromObject(g); const c = box3.getCenter(new THREE.Vector3()); r.worldToLocal(c);
      const sz = box3.getSize(new THREE.Vector3()).length() / r.getWorldScale(new THREE.Vector3()).x;
      st.current[key] = { c, S: Math.max(sz, 0.3), q: 0, tgt: new THREE.Vector3() };
    });
    // 3) the part flies to the free side of the stage (screen-space anchor, so it stays put while orbiting)
    const look = new THREE.Vector3(0, 1.3, 0); const dist = camera.position.distanceTo(look) * 0.6;
    const anchor = new THREE.Vector3(mobile ? 0.12 : 0.44, mobile ? -0.1 : 0.24, 0.5).unproject(camera).sub(camera.position).normalize().multiplyScalar(dist).add(camera.position);
    const viewH = 2 * Math.tan(THREE.MathUtils.degToRad((camera as THREE.PerspectiveCamera).fov / 2)) * dist;
    const rs = r.scale.x;
    let shown: { c: THREE.Vector3; cur: THREE.Vector3; q: number } | null = null;
    (Object.keys(st.current) as SystemId[]).forEach(key => {
      const s = st.current[key]!; const g = sys.current[key]!;
      const goal = key === sel && since > 0.9 ? 1 : 0;
      if (key === sel) s.tgt.copy(r.worldToLocal(anchor.clone()));
      s.q += (goal - s.q) * Math.min(1, dt * (goal ? 2.6 : 5));
      const e = s.q * s.q * (3 - 2 * s.q);
      const viewW = viewH * (size.width / Math.max(size.height, 1));
      const fit = Math.min(viewH * (mobile ? 0.17 : 0.36), viewW * (mobile ? 0.62 : 0.27));
      const want = THREE.MathUtils.clamp(fit / (s.S * rs), 0.4, 4.5);   // zoom-in: part fills the frame, never wider than it
      const sc = 1 + (want - 1) * e;
      const cur = s.c.clone().lerp(s.tgt, e);
      g.position.copy(cur).addScaledVector(s.c, -sc); g.scale.setScalar(sc);
      if (key === sel || s.q > 0.02) g.rotation.y = e * (0.35 + Math.sin(t * 0.7) * 0.3);
      if (s.q > 0.02 && (!shown || key === sel)) shown = { c: s.c, cur, q: s.q };
    });
    const on = !!shown; line.visible = dotA.visible = ringB.visible = on;
    if (shown) {
      const sh = shown as { c: THREE.Vector3; cur: THREE.Vector3; q: number };
      const pos = line.geometry.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(0, sh.c.x, sh.c.y, sh.c.z); pos.setXYZ(1, sh.cur.x, sh.cur.y, sh.cur.z); pos.needsUpdate = true; line.computeLineDistances();
      (line.material as THREE.LineDashedMaterial).opacity = Math.min(1, sh.q * 1.4);
      dotA.position.copy(sh.c); ringB.position.copy(sh.c); ringB.lookAt(camera.position); ringB.scale.setScalar(1 + ((t * 1.2) % 1) * 1.6);
      (ringB.material as THREE.MeshBasicMaterial).opacity = (1 - ((t * 1.2) % 1)) * sh.q;
    }
  });

  const box = (w: number, h: number, d: number, mat: THREE.Material, p: [number, number, number], r = 0.04) => <RoundedBox args={[w, h, d]} radius={r} smoothness={3} position={p} material={mat} castShadow receiveShadow />;
  return (
    <group ref={root} position={[-0.2, 0, 0]}>
      <primitive object={line} /><primitive object={dotA} /><primitive object={ringB} />
        {SPOTS.map(([id, p]) => (
        <Html key={id} position={p} center zIndexRange={[6, 0]}>
          <button className={'tspot' + (sel === id ? ' on' : '')} onClick={() => onSel(sel === id ? null : id)} aria-pressed={sel === id}>
            <i /><span>{labels[id]}</span>
          </button>
        </Html>
      ))}
      {/* chassis & bodywork */}
      <group ref={reg('body')}>
        {box(1.85, 0.5, 0.95, m.body, [1.55, 1.62, 0], 0.12)}
        {box(0.5, 0.42, 0.7, m.body, [0.42, 1.68, 0], 0.08)}
        {box(1.5, 0.08, 1.0, m.dark, [1.55, 1.38, 0])}
        <mesh position={[1.25, 2.25, 0.32]} castShadow material={m.dark}><cylinderGeometry args={[0.06, 0.07, 1.3, 16]} /></mesh>
        {[-1, 1].map(s => <mesh key={s} position={[-1.6, 1.15, s * 1.05]} rotation-x={Math.PI / 2} castShadow><cylinderGeometry args={[1.36, 1.36, 0.66, 48, 1, true, Math.PI - 1.3, 2.6]} /><meshPhysicalMaterial color={LIGHT ? "#14365e" : "#d0242b"} metalness={0.5} roughness={0.3} clearcoat={0.7} side={THREE.DoubleSide} /></mesh>)}
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
      <Environment files={asset('/hdr/studio.hdr')} environmentIntensity={0.85} />
      <directionalLight position={[5, 9, 5]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-6, 3, -4]} intensity={40} color={LIGHT ? "#2d6bff" : "#ff2a2f"} distance={18} />
      <Bounds fit observe margin={1.12}><Tractor sel={sel} onSel={onSel} labels={labels} /></Bounds>
      <ContactShadows color={LIGHT ? "#0f2a4a" : "#000000"} position={[0, 0.001, 0]} opacity={0.6} scale={14} blur={2.2} far={4} />
      <OrbitControls makeDefault target={[0, 1.3, 0]} enablePan={false} enableZoom={false} autoRotate={!sel} autoRotateSpeed={0.6} minPolarAngle={0.6} maxPolarAngle={1.45} enableDamping />
    </Canvas>
  );
}
