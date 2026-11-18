/**
 * ParticleBackground — Three.js 3D Particle Field
 *
 * Dark Mode : Cyan/Blue connected plexus network
 * Light Mode: Hubble Deep Field — multi-color TWINKLING isolated stars,
 *             NO connecting lines, two depth layers (dim field + bright stars)
 *
 * Fully GPU-accelerated via WebGL — zero impact on main thread.
 */

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

// ─── Constants ────────────────────────────────────────────────────────────────
const PARTICLE_COUNT_DARK         = 140;
const PARTICLE_COUNT_LIGHT_DIM    = 240; // dense background field
const PARTICLE_COUNT_LIGHT_BRIGHT = 80;  // bright foreground stars
const PARTICLE_COUNT_MOBILE       = 65;
const CONNECTION_DISTANCE_DARK    = 3.2;
const SPREAD                      = 15;

// Hubble-inspired palette — rich saturated cosmic stars
const HUBBLE_PALETTE = [
  new THREE.Color("#ea580c"), // vivid flame orange
  new THREE.Color("#f97316"), // vibrant orange
  new THREE.Color("#d97706"), // warm amber gold
  new THREE.Color("#f59e0b"), // glowing amber
  new THREE.Color("#2563eb"), // royal sapphire
  new THREE.Color("#3b82f6"), // bright azure
  new THREE.Color("#0284c7"), // electric sky
  new THREE.Color("#7c3aed"), // cosmic violet
  new THREE.Color("#c026d3"), // fuchsia nebula
  new THREE.Color("#059669"), // deep emerald
  new THREE.Color("#e11d48"), // radiant ruby
  new THREE.Color("#0891b2"), // rich cyan
];

// ─── Camera Rig (Single parallax controller) ──────────────────────────────────
function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    const fn = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.03;
    camera.position.y += (-mouse.current.y * 1.0 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Dark Mode Plexus ────────────────────────────────────────────────────────
function DarkParticles({ count, accentColor, secondaryColor }) {
  const meshRef         = useRef();
  const lineSegmentsRef = useRef();

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
      vel[i * 3]     = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  const maxLines      = count * 8;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors    = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const accent1       = useMemo(() => new THREE.Color(accentColor),    [accentColor]);
  const accent2       = useMemo(() => new THREE.Color(secondaryColor), [secondaryColor]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += velocities[i * 3]     * 60 * delta;
      pos[i * 3 + 1] += velocities[i * 3 + 1] * 60 * delta;
      pos[i * 3 + 2] += velocities[i * 3 + 2] * 60 * delta;
      for (let a = 0; a < 3; a++) {
        const h = SPREAD / 2;
        if (pos[i * 3 + a] >  h) pos[i * 3 + a] = -h;
        if (pos[i * 3 + a] < -h) pos[i * 3 + a] =  h;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    if (lineSegmentsRef.current) {
      const lPos = lineSegmentsRef.current.geometry.attributes.position.array;
      const lCol = lineSegmentsRef.current.geometry.attributes.color.array;
      let idx = 0;
      for (let i = 0; i < count && idx < maxLines; i++) {
        for (let j = i + 1; j < count && idx < maxLines; j++) {
          const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1], dz = pos[i*3+2]-pos[j*3+2];
          const d  = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (d < CONNECTION_DISTANCE_DARK) {
            const a   = (1 - d / CONNECTION_DISTANCE_DARK) * 0.70;
            const col = accent1.clone().lerp(accent2, i / count);
            lPos[idx*6]=pos[i*3]; lPos[idx*6+1]=pos[i*3+1]; lPos[idx*6+2]=pos[i*3+2];
            lPos[idx*6+3]=pos[j*3]; lPos[idx*6+4]=pos[j*3+1]; lPos[idx*6+5]=pos[j*3+2];
            for (let k = 0; k < 6; k += 3) {
              lCol[idx*6+k]=col.r*a; lCol[idx*6+k+1]=col.g*a; lCol[idx*6+k+2]=col.b*a;
            }
            idx++;
          }
        }
      }
      for (let k = idx * 6; k < maxLines * 6; k++) { lPos[k] = 0; lCol[k] = 0; }
      lineSegmentsRef.current.geometry.attributes.position.needsUpdate = true;
      lineSegmentsRef.current.geometry.attributes.color.needsUpdate    = true;
    }
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color={accentColor} transparent opacity={0.85} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <lineSegments ref={lineSegmentsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[lineColors,    3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </>
  );
}

// Helper function to create a smooth circular glowing star texture
function getStarTexture() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.25, "rgba(255, 255, 255, 0.85)");
  grad.addColorStop(0.55, "rgba(255, 255, 255, 0.35)");
  grad.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// ─── Light Mode — Twinkling Hubble Stars ──────────────────────────────────────
function HubbleStars({ count, starSize, opacityBase, speedMult, twinkleSpeed }) {
  const meshRef = useRef();
  const starTexture = useMemo(() => getStarTexture(), []);

  const { positions, velocities, baseColors, phases } = useMemo(() => {
    const pos    = new Float32Array(count * 3);
    const vel    = new Float32Array(count * 3);
    const col    = new Float32Array(count * 3); // vertex colors (updated each frame for twinkle)
    const phs    = new Float32Array(count);     // random phase per star

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
      vel[i * 3]     = (Math.random() - 0.5) * 0.003 * speedMult;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003 * speedMult;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002 * speedMult;
      const c        = HUBBLE_PALETTE[Math.floor(Math.random() * HUBBLE_PALETTE.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      phs[i]         = Math.random() * Math.PI * 2;
    }
    return { positions: pos, velocities: vel, baseColors: col, phases: phs };
  }, [count, speedMult]);

  // Live color buffer — updated each frame for twinkle
  const liveColors = useMemo(() => new Float32Array(baseColors), [baseColors]);

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;
    const pos  = meshRef.current.geometry.attributes.position.array;
    const cols = meshRef.current.geometry.attributes.color.array;
    const t    = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Move
      pos[i * 3]     += velocities[i * 3]     * 60 * delta;
      pos[i * 3 + 1] += velocities[i * 3 + 1] * 60 * delta;
      pos[i * 3 + 2] += velocities[i * 3 + 2] * 60 * delta;
      for (let a = 0; a < 3; a++) {
        const h = SPREAD / 2;
        if (pos[i * 3 + a] >  h) pos[i * 3 + a] = -h;
        if (pos[i * 3 + a] < -h) pos[i * 3 + a] =  h;
      }

      // Twinkle — oscillate brightness per star via vertex color intensity
      const brightness = 0.40 + 0.60 * Math.sin(t * twinkleSpeed + phases[i]);
      cols[i * 3]     = baseColors[i * 3]     * brightness;
      cols[i * 3 + 1] = baseColors[i * 3 + 1] * brightness;
      cols[i * 3 + 2] = baseColors[i * 3 + 2] * brightness;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate    = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[liveColors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        map={starTexture}
        size={starSize}
        transparent
        opacity={opacityBase}
        sizeAttenuation
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function ParticleBackground() {
  const { theme } = useTheme();
  const isMobile  = window.innerWidth < 768;
  const isDark    = theme === "dark";

  const accentColor    = isDark ? "#22d3ee" : "#f97316";
  const secondaryColor = isDark ? "#2563eb" : "#fb923c";
  const darkCount      = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DARK;

  return (
    <div
      className="fixed top-0 inset-x-0 mx-auto w-full max-w-[1440px] h-screen pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        background: isDark
          ? "radial-gradient(circle at 50% 0%, rgba(34,211,238,0.03) 0%, transparent 70%)"
          : "radial-gradient(ellipse 900px 500px at 50% -80px, rgba(249,115,22,0.05), transparent 70%), radial-gradient(circle 600px at 10% 50%, rgba(251,146,60,0.03), transparent 70%), radial-gradient(circle 700px at 90% 60%, rgba(245,158,11,0.03), transparent 70%)",
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        style={{ background: "transparent" }}
      >
        <CameraRig />
        {isDark ? (
          <DarkParticles count={darkCount} accentColor={accentColor} secondaryColor={secondaryColor} />
        ) : (
          <>
            {/* Layer 1 — Dense dim background star field */}
            <HubbleStars
              count={isMobile ? 60 : PARTICLE_COUNT_LIGHT_DIM}
              starSize={0.12}
              opacityBase={0.75}
              speedMult={0.7}
              twinkleSpeed={1.5}
            />
            {/* Layer 2 — Bright foreground stars with faster twinkle */}
            <HubbleStars
              count={isMobile ? 25 : PARTICLE_COUNT_LIGHT_BRIGHT}
              starSize={0.22}
              opacityBase={0.92}
              speedMult={1.1}
              twinkleSpeed={2.4}
            />
          </>
        )}
      </Canvas>
    </div>
  );
}
