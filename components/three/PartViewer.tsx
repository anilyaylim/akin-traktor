'use client';
/* Product detail: turntable 3D preview of the part type, drag to rotate. */
import * as THREE from 'three';
import { asset } from '@/lib/i18n';
import { LIGHT } from '@/lib/theme';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import type { ModelKind } from '@/lib/catalog';
import { PartModel, useMats } from './parts';

function Model({ kind }: { kind: ModelKind }) {
  const m = useMats(); const g = useRef<THREE.Group>(null!);
  useFrame((_, dt) => { g.current.rotation.y += dt * 0.25; });
  const tilt: Record<ModelKind, [number, number, number]> = {
    gear: [0.5, 0, 0], clutch: [0.5, 0, 0], brake: [0.5, 0, 0], toplink: [0, 0, 0.2], lever: [0.9, 0, 0], pin: [0, 0, 0], bolt: [0, 0, 0], radiator: [0, 0, 0], canopy: [0, 0, 0], shaft: [0, 0, 0.15],
  };
  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={g}><group rotation={tilt[kind]}><PartModel kind={kind} m={m} /></group></group>
    </Float>
  );
}

export default function PartViewer({ kind }: { kind: ModelKind }) {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ fov: 30, position: [0, 1.2, 9.5] }} gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
      <Environment files={asset('/hdr/studio.hdr')} environmentIntensity={1} />
      <directionalLight position={[4, 8, 5]} intensity={2} castShadow />
      <pointLight position={[-5, 1, -4]} intensity={45} color={LIGHT ? "#2d6bff" : "#ff2a2f"} distance={16} />
      <Model kind={kind} />
      <ContactShadows color={LIGHT ? "#0f2a4a" : "#000000"} position={[0, -2.4, 0]} opacity={0.5} scale={12} blur={2.4} far={5} />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.5} maxPolarAngle={2.2} />
    </Canvas>
  );
}
