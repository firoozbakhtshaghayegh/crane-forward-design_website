import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function useKeyboardControls() {
  const keys = useRef<{ [k: string]: boolean }>({});
  useEffect(() => {
    const down = (e: KeyboardEvent) => (keys.current[e.key.toLowerCase()] = true);
    const up = (e: KeyboardEvent) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);
  return keys;
}

function Cargo({ position, color = "#a8b0b8" }: { position: [number, number, number]; color?: string }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[0.22, 0.22, 0.22]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.6} />
    </mesh>
  );
}

export function CraneScene() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 3, 6], fov: 40 }} gl={{ alpha: true }}>
      <hemisphereLight intensity={0.6} groundColor="#111" />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <CraneRig />
      <ContactShadows opacity={0.35} position={[0, -0.5, 0]} blur={2.8} far={10} />
      <OrbitControls enableDamping dampingFactor={0.1} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} maxDistance={10} />
    </Canvas>
  );
}

function CraneRig() {
  const trolley = useRef<THREE.Group>(null!);
  const cable = useRef<THREE.Mesh>(null!);
  const hook = useRef<THREE.Mesh>(null!);
  const cargosRef = useRef<THREE.Group>(null!);
  const [grabbedIndex, setGrabbedIndex] = useState<number | null>(null);

  const keys = useKeyboardControls();

  // Precreate cargo refs for picking
  const cargoRefs = useMemo(() => [React.createRef<THREE.Mesh>(), React.createRef<THREE.Mesh>(), React.createRef<THREE.Mesh>()], []);

  const state = useRef({ x: -1.0, len: 0.6 });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === " ") {
        e.preventDefault();
        toggleGrab();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleGrab = () => {
    if (!hook.current) return;

    // If carrying, release
    if (grabbedIndex !== null) {
      const cargo = cargoRefs[grabbedIndex].current!;
      // Get world position from hook, then reparent under cargosRef and keep world pos
      const worldPos = new THREE.Vector3();
      cargo.getWorldPosition(worldPos);
      cargosRef.current.add(cargo);
      const local = cargosRef.current.worldToLocal(worldPos.clone());
      cargo.position.copy(local);
      // Drop to floor height
      cargo.position.y = -0.39; // slightly above platform
      setGrabbedIndex(null);
      return;
    }

    // Try to pick nearest
    const hookPos = new THREE.Vector3();
    hook.current.getWorldPosition(hookPos);
    let nearest = -1;
    let minD = 0.18;
    cargoRefs.forEach((ref, i) => {
      const c = ref.current!;
      // Ignore if already parented to hook
      if (!c.parent) return;
      const pos = new THREE.Vector3();
      c.getWorldPosition(pos);
      const d = pos.distanceTo(hookPos);
      if (d < minD) {
        minD = d;
        nearest = i;
      }
    });
    if (nearest >= 0) {
      const c = cargoRefs[nearest].current!;
      // Reparent to hook and reset local position
      hook.current.add(c);
      c.position.set(0, -0.06, 0);
      setGrabbedIndex(nearest);
    }
  };

  useFrame((_, dt) => {
    const speed = 1.2;
    const lift = 0.9;
    const s = state.current;

    // Horizontal movement (A/D or Left/Right)
    if (keys.current["arrowleft"] || keys.current["a"]) s.x -= dt * speed;
    if (keys.current["arrowright"] || keys.current["d"]) s.x += dt * speed;
    s.x = THREE.MathUtils.clamp(s.x, -1.4, 1.4);

    // Vertical cable (W/S or Up/Down)
    if (keys.current["arrowup"] || keys.current["w"]) s.len -= dt * lift;
    if (keys.current["arrowdown"] || keys.current["s"]) s.len += dt * lift;
    s.len = THREE.MathUtils.clamp(s.len, 0.2, 1.2);

    if (trolley.current) trolley.current.position.x = s.x;
    if (cable.current) {
      cable.current.scale.y = s.len; // stretch cable
      cable.current.position.y = -0.3 * s.len; // keep top attached to trolley
    }
    if (hook.current) hook.current.position.y = -(0.6 * s.len + 0.35);
  });

  return (
    <group>
      {/* Base platform */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.2, 2]} />
        <meshStandardMaterial color="#151515" metalness={0.6} roughness={0.6} />
      </mesh>

      {/* Tower */}
      <mesh position={[-1.5, 0.6, 0]} castShadow>
        <boxGeometry args={[0.2, 1.8, 0.2]} />
        <meshStandardMaterial color="#9aa0a6" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Boom */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[3, 0.12, 0.12]} />
        <meshStandardMaterial color="#ff3b30" metalness={0.2} roughness={0.4} />
      </mesh>

      {/* Trolley */}
      <group ref={trolley} position={[0, 1.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.2, 0.28]} />
          <meshStandardMaterial color="#ff6a00" metalness={0.2} roughness={0.5} />
        </mesh>
        {/* Cable (scaled) */}
        <mesh ref={cable} position={[0, -0.3, 0]}>
          <boxGeometry args={[0.02, 0.6, 0.02]} />
          <meshStandardMaterial color="#cfcfcf" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Hook */}
        <mesh ref={hook} position={[0, -0.65, 0]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial color="#ff3b30" metalness={0.3} roughness={0.4} />
        </mesh>
      </group>

      {/* Cargos */}
      <group ref={cargosRef}>
        <mesh ref={cargoRefs[0]} position={[-0.8, -0.39, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshStandardMaterial color="#a8b0b8" metalness={0.4} roughness={0.6} />
        </mesh>
        <mesh ref={cargoRefs[1]} position={[0, -0.39, 0.3]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshStandardMaterial color="#7aa2ff" metalness={0.3} roughness={0.7} />
        </mesh>
        <mesh ref={cargoRefs[2]} position={[0.8, -0.39, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshStandardMaterial color="#ffcf6a" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

export default CraneScene;
