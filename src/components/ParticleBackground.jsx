/**
 * ParticleBackground — Three.js 3D Particle Field
 *
 * A fixed-position canvas that renders:
 *  - ~150 glowing particles floating in 3D space
 *  - Connecting lines between nearby particles
 *  - Parallax reaction to mouse movement (camera tilt)
 *
 * Uses React Three Fiber + Drei for clean React integration.
 * Fully GPU-accelerated via WebGL — zero impact on main thread.
 */

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

// ─── Constants ────────────────────────────────────────────────────────────────
const PARTICLE_COUNT_DESKTOP = 150;
const PARTICLE_COUNT_MOBILE  = 60;
const CONNECTION_DISTANCE    = 3.5;
const SPREAD                 = 14;

// ─── Particles Mesh ──────────────────────────────────────────────────────────
function Particles({ count, accentColor, secondaryColor, isDark }) {
  const meshRef = useRef();
  const lineSegmentsRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  // Generate random positions & velocities once
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

  // Line geometry placeholder positions (max pairs)
  const maxLines = count * 8;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  const { camera } = useThree();

  // Listen to mouse move globally
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Parse accent colors for THREE
  const accent1 = useMemo(() => new THREE.Color(accentColor), [accentColor]);
  const accent2 = useMemo(() => new THREE.Color(secondaryColor), [secondaryColor]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array;

    // Animate each particle
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += velocities[i * 3]     * 60 * delta;
      pos[i * 3 + 1] += velocities[i * 3 + 1] * 60 * delta;
      pos[i * 3 + 2] += velocities[i * 3 + 2] * 60 * delta;

      // Wrap around edges
      for (let axis = 0; axis < 3; axis++) {
        const half = SPREAD / 2;
        if (pos[i * 3 + axis] >  half) pos[i * 3 + axis] = -half;
        if (pos[i * 3 + axis] < -half) pos[i * 3 + axis] =  half;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Build connecting lines
    if (lineSegmentsRef.current) {
      const lPos = lineSegmentsRef.current.geometry.attributes.position.array;
      const lCol = lineSegmentsRef.current.geometry.attributes.color.array;
      let lineIdx = 0;

      for (let i = 0; i < count && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < count && lineIdx < maxLines; j++) {
          const dx = pos[i * 3]     - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = 1 - dist / CONNECTION_DISTANCE;
            // Vertex A
            lPos[lineIdx * 6]     = pos[i * 3];
            lPos[lineIdx * 6 + 1] = pos[i * 3 + 1];
            lPos[lineIdx * 6 + 2] = pos[i * 3 + 2];
            // Vertex B
            lPos[lineIdx * 6 + 3] = pos[j * 3];
            lPos[lineIdx * 6 + 4] = pos[j * 3 + 1];
            lPos[lineIdx * 6 + 5] = pos[j * 3 + 2];
            // Colors (interpolate between accent1/accent2)
            const t = i / count;
            const col = accent1.clone().lerp(accent2, t);
            for (let k = 0; k < 6; k += 3) {
              lCol[lineIdx * 6 + k]     = col.r * alpha;
              lCol[lineIdx * 6 + k + 1] = col.g * alpha;
              lCol[lineIdx * 6 + k + 2] = col.b * alpha;
            }
            lineIdx++;
          }
        }
      }
      // Zero out unused line slots
      for (let k = lineIdx * 6; k < maxLines * 6; k++) {
        lPos[k] = 0;
        lCol[k] = 0;
      }
      lineSegmentsRef.current.geometry.attributes.position.needsUpdate = true;
      lineSegmentsRef.current.geometry.attributes.color.needsUpdate = true;
    }

    // Camera parallax from mouse
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.03;
    camera.position.y += (-mouse.current.y * 1.0 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Particles */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isDark ? 0.06 : 0.08}
          color={accentColor}
          transparent
          opacity={isDark ? 0.8 : 0.85}
          sizeAttenuation
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={lineSegmentsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[lineColors,    3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={isDark ? 0.4 : 0.55}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function ParticleBackground() {
  const { theme } = useTheme();
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

  const isDark = theme === "dark";
  
  // Light Mode: Gray particles (visible on white) + Orange glow accent
  // Dark Mode: Cyan + Blue (cyberpunk)
  const accentColor     = isDark ? "#22d3ee" : "#9ca3af"; // dark: cyan | light: gray-400 (مضلعات رمادية)
  const secondaryColor  = isDark ? "#2563eb" : "#ea580c"; // dark: blue  | light: orange (أجزاء متوهجة)

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{
          antialias: false,        // Faster on mobile
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={Math.min(window.devicePixelRatio, 1.5)} // Cap DPR for perf
        style={{ background: "transparent" }}
      >
        <Particles
          count={count}
          accentColor={accentColor}
          secondaryColor={secondaryColor}
          isDark={isDark}
        />
      </Canvas>
    </div>
  );
}
