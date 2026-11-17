'use client';
/* Hero: a tractor powertrain assembly on its main shaft. Scrolling (progress 0→1) pulls the
   assembly apart into an exploded view while the camera swings round; labels fade in.
   Gears keep turning, the whole set follows the pointer slightly. */
import * as THREE from 'three';
import { asset } from '@/lib/i18n';
import { ACC3D, LIGHT } from '@/lib/theme';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Html } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { BrakeDisc, ClutchDisc, HelicalGear, Shaft, SynchroRing, TopLink, useMats } from './parts';

type Prog = { current: number };
const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

function Assembly({ prog, labels }: { prog: Prog; labels: string[] }) {
  const m = useMats();
  const root = useRef<THREE.Group>(null!); const spin = useRef<THREE.Group[]>([]);
  const parts = useRef<THREE.Group[]>([]); const lab = useRef<(HTMLDivElement | null)[]>([]);
  const { camera, pointer, size } = useThree();
  const mobile = size.width < 700;
  // [assembled x, exploded x, exploded y, exploded rotY]
  const plan = useMemo(() => [
    [0, 0, 0, 0],             // shaft
    [-2.5, -4.7, 0.7, -0.35], // helical gear
    [-1.45, -2.6, -0.5, 0.25],// synchro
    [-0.6, -0.7, 0.55, -0.2], // small gear
    [1.0, 1.6, -0.4, 0.3],    // clutch
    [2.55, 3.9, 0.45, -0.3],  // brake
  ], []);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame((st, dt) => {
    const p = ease(clamp(prog.current)); const t = st.clock.elapsedTime;
    plan.forEach(([ax, ex, ey, er], i) => {
      const g = parts.current[i]; if (!g) return;
      g.position.set(THREE.MathUtils.lerp(ax, ex * (mobile ? 0.62 : 1), p), ey * p * (mobile ? 1.6 : 1), 0);
      g.rotation.y = er * p;
    });
    spin.current.forEach((g, i) => { if (g) g.rotation.z += dt * (i % 2 ? -0.5 : 0.35) * (1 - p * 0.6); });
    const tl = parts.current[6]; if (tl) { tl.position.set(THREE.MathUtils.lerp(4, 0, p), THREE.MathUtils.lerp(-5.5, -2.9, p), -1.2); tl.rotation.set(0, 0, THREE.MathUtils.lerp(0.4, 0.06, p)); }
    // camera: 3/4 close-up → wide frontal of the exploded set
    const d = mobile ? THREE.MathUtils.lerp(1.55, 2.05, p) : 1;
    camera.position.set(THREE.MathUtils.lerp(8.8, 1.2, p) * d, THREE.MathUtils.lerp(3.6, 1.6, p) * d, THREE.MathUtils.lerp(10.5, 16.5, p) * d);
    camera.lookAt(THREE.MathUtils.lerp(mobile ? 0 : -2.6, 0, p), THREE.MathUtils.lerp(mobile ? -1.6 : 0, -0.5, p), 0);   // assembly sits right of the headline, then centres
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, pointer.x * 0.18, 0.04);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -pointer.y * 0.08, 0.04);
    root.current.position.y = Math.sin(t * 0.6) * 0.08;
    const lo = clamp((prog.current - 0.45) / 0.25);
    lab.current.forEach(el => { if (el) { el.style.opacity = String(lo); el.style.transform = `translateY(${(1 - lo) * 12}px)`; } });
    void tmp;
  });
  const L = (i: number, y = 2.6) => (
    <Html position={[0, y, 0]} center zIndexRange={[5, 0]} style={{ pointerEvents: 'none' }}>
      <div ref={el => { lab.current[i] = el; }} className="hlabel"><span>0{i + 1}</span>{labels[i]}</div>
    </Html>
  );
  return (
    <group ref={root}>
      <group ref={el => { parts.current[0] = el!; }}><Shaft m={m} len={10} />{L(0, -0.9)}</group>
      <group ref={el => { parts.current[1] = el!; }}><group ref={el => { spin.current[0] = el!; }} rotation-y={Math.PI / 2}><HelicalGear m={m} r={2.1} teeth={36} width={0.95} /></group>{L(1, 2.75)}</group>
      <group ref={el => { parts.current[2] = el!; }}><group rotation-y={Math.PI / 2}><SynchroRing m={m} r={1.3} /></group>{L(2, 1.9)}</group>
      <group ref={el => { parts.current[3] = el!; }}><group ref={el => { spin.current[1] = el!; }} rotation-y={Math.PI / 2}><HelicalGear m={m} r={1.35} teeth={24} width={0.8} /></group></group>
      <group ref={el => { parts.current[4] = el!; }}><group ref={el => { spin.current[2] = el!; }} rotation-y={Math.PI / 2}><ClutchDisc m={m} r={2.45} /></group>{L(3, 3.0)}</group>
      <group ref={el => { parts.current[5] = el!; }}><group ref={el => { spin.current[3] = el!; }} rotation-y={Math.PI / 2}><BrakeDisc m={m} r={1.95} /></group>{L(4, 2.55)}</group>
      <group ref={el => { parts.current[6] = el!; }}><TopLink m={m} len={4.2} />{L(5, 0.9)}</group>
    </group>
  );
}

export default function HeroScene({ prog, labels }: { prog: Prog; labels: string[] }) {
  return (
    <Canvas shadows dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }} camera={{ fov: 32, position: [7.5, 3.2, 8.5], near: 0.1, far: 100 }}>
      <Environment files={asset('/hdr/studio.hdr')} environmentIntensity={0.9} />
      <directionalLight position={[6, 9, 6]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0005} />
      <pointLight position={[-6, 1, -5]} intensity={60} color={ACC3D} distance={20} />
      <pointLight position={[6, -2, 4]} intensity={18} color="#9fb4ff" distance={18} />
      <Assembly prog={prog} labels={labels} />
      <ContactShadows color={LIGHT ? "#0f2a4a" : "#000000"} position={[0, -3.6, 0]} opacity={0.55} scale={26} blur={2.6} far={6} />
    </Canvas>
  );
}
