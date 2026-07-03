'use client';

import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useDeviceQuality } from '@/lib/useDeviceQuality';

/* ---------- Heliks ganda DNA dari partikel bercahaya ---------- */
const HELIX = {
  segments: 130, // titik di sepanjang sumbu
  radius: 1.05,
  turns: 4.6,
  height: 8.6,
  strandParticles: 34, // partikel per simpul untai
  rungParticles: 16, // partikel per anak tangga
};

// pseudo-gaussian kecil untuk menyebar partikel jadi seperti debu
function jitter(scale: number) {
  return (Math.random() + Math.random() + Math.random() - 1.5) * scale;
}

// tekstur titik bulat lembut (radial gradient) agar partikel berpendar halus
function useSoftDot() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(255,255,255,0.85)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.25)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function DNAHelix({ low, reduced }: { low: boolean; reduced: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const tiltRef = useRef<THREE.Group>(null!);
  const dot = useSoftDot();

  // Posisi kursor ternormalisasi (-1..1) — dilacak dari window agar tetap
  // terbaca meski kursor berada di atas teks hero (bukan langsung di kanvas)
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const { positions, colors, sizes } = useMemo(() => {
    const { radius, turns, height } = HELIX;
    // Kurangi jumlah partikel di perangkat ringan demi kelancaran
    const segments = low ? 80 : HELIX.segments;
    const strandParticles = low ? 16 : HELIX.strandParticles;
    const rungParticles = low ? 8 : HELIX.rungParticles;
    const pos: number[] = [];
    const col: number[] = [];
    const siz: number[] = [];

    // gradien warna: biru di bawah → ungu/magenta di atas
    const cBottom = new THREE.Color('#3b82f6');
    const cTop = new THREE.Color('#c084fc');
    const white = new THREE.Color('#e0f2fe');

    const pushParticle = (x: number, y: number, z: number, t: number, spread: number) => {
      pos.push(x + jitter(spread), y + jitter(spread), z + jitter(spread));
      const base = cBottom.clone().lerp(cTop, t);
      // sebagian kecil partikel terang keputihan (sejuk) untuk kilau
      if (Math.random() > 0.94) base.lerp(white, 0.6);
      col.push(base.r, base.g, base.b);
      siz.push(Math.random() > 0.92 ? 2.2 : 1);
    };

    for (let i = 0; i < segments; i++) {
      const t = i / (segments - 1);
      const y = THREE.MathUtils.lerp(-height / 2, height / 2, t);
      const angle = t * Math.PI * 2 * turns;

      const ax = Math.cos(angle) * radius;
      const az = Math.sin(angle) * radius;
      const bx = Math.cos(angle + Math.PI) * radius;
      const bz = Math.sin(angle + Math.PI) * radius;

      // gugus partikel di kedua untai
      for (let p = 0; p < strandParticles; p++) {
        pushParticle(ax, y, az, t, 0.06);
        pushParticle(bx, y, bz, t, 0.06);
      }

      // anak tangga (base pair) tiap 2 segmen
      if (i % 2 === 0) {
        for (let p = 0; p < rungParticles; p++) {
          const k = p / (rungParticles - 1);
          pushParticle(
            THREE.MathUtils.lerp(ax, bx, k),
            y,
            THREE.MathUtils.lerp(az, bz, k),
            t,
            0.03,
          );
        }
      }
    }

    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
      sizes: new Float32Array(siz),
    };
  }, [low]);

  useFrame((state) => {
    if (reduced) return; // hormati prefers-reduced-motion: diam
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
    // Helix "menoleh" halus ke arah kursor (lerp agar lembut)
    const t = tiltRef.current;
    t.rotation.x = THREE.MathUtils.lerp(t.rotation.x, mouse.current.y * -0.12, 0.045);
    t.rotation.z = THREE.MathUtils.lerp(t.rotation.z, mouse.current.x * -0.1, 0.045);
  });

  return (
    <Float speed={reduced ? 0 : 1} rotationIntensity={reduced ? 0 : 0.1} floatIntensity={reduced ? 0 : 0.5}>
      <group ref={tiltRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
            args={[colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length}
            array={sizes}
            itemSize={1}
            args={[sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={dot}
          alphaMap={dot}
          size={0.062}
          vertexColors
          transparent
          opacity={1}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      </group>
    </Float>
  );
}

function SceneContent({ low, reduced }: { low: boolean; reduced: boolean }) {
  return (
    <>
      <color attach="background" args={['#05060f']} />
      <fog attach="fog" args={['#05060f', 7, 16]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1} color="#bae6fd" />
      <pointLight position={[-4, 0, 2]} intensity={20} color="#a855f7" />
      <pointLight position={[4, 0, 2]} intensity={20} color="#22d3ee" />

      <DNAHelix low={low} reduced={reduced} />

      <Stars radius={70} depth={50} count={low ? 600 : 1500} factor={2.5} saturation={0} fade speed={reduced ? 0 : 0.5} />

      <Environment resolution={low ? 128 : 256}>
        <Lightformer intensity={2.5} color="#22d3ee" position={[-3, 2, 2]} scale={[4, 4, 1]} />
        <Lightformer intensity={2} color="#a855f7" position={[3, -2, 2]} scale={[4, 4, 1]} />
        <Lightformer intensity={1.4} color="#f0abfc" position={[0, 3, -3]} scale={[6, 2, 1]} />
      </Environment>

      <EffectComposer multisampling={low ? 0 : 4}>
        <Bloom intensity={0.55} luminanceThreshold={0.45} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette offset={0.32} darkness={0.95} eskil={false} />
        {/* Film grain hanya di perangkat mumpuni */}
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={low ? 0 : 0.16} />
      </EffectComposer>
    </>
  );
}

export default function Scene3D() {
  const { low, reduced } = useDeviceQuality();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Hentikan render 3D sepenuhnya saat hero tidak terlihat,
  // agar scroll di bagian bawah halaman tetap mulus.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 0.3] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ antialias: !low, alpha: false, powerPreference: 'high-performance' }}
        dpr={low ? [1, 1.5] : [1, 2]}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <SceneContent low={low} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
