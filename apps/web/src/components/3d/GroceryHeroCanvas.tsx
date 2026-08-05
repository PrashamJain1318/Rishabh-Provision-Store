import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshWobbleMaterial, Sparkles, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

// Floating 3D Shopping Cart Model Primitive
function FloatingCart({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.3 + mouse.current[0] * 0.4;
      meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.15 + mouse.current[1] * 0.2;
      meshRef.current.position.y = Math.sin(t * 1.2) * 0.25;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]} scale={1.2}>
      {/* Basket Frame Mesh */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 1.2, 1.6]} />
        <meshStandardMaterial
          color="#10B981"
          metalness={0.6}
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* Cart Inner Solid Glow */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.0, 1.0, 1.4]} />
        <meshStandardMaterial color="#059669" opacity={0.7} transparent />
      </mesh>

      {/* Wheels */}
      {[-0.8, 0.8].map((x, i) =>
        [-0.6, 0.6].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, -0.8, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.15, 24]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
        ))
      )}
    </group>
  );
}

// Floating Apple 🍎
function FloatingApple({ position, color = "#ef4444" }: { position: [number, number, number]; color?: string }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.position.y += Math.sin(t * 1.5 + position[0]) * 0.003;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={ref} position={position} scale={0.65}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshWobbleMaterial factor={0.2} speed={1.5} color={color} roughness={0.3} />
      </mesh>
    </Float>
  );
}

// Floating Milk Bottle 🥛
function FloatingMilkBottle({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.z = Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1} floatIntensity={1.5}>
      <group ref={ref} position={position} scale={0.7}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 1.6, 24]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.1} />
        </mesh>
        {/* Cap */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.2, 24]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </group>
    </Float>
  );
}

// Scene Root Container
export const GroceryHeroCanvas: React.FC = () => {
  const mouse = useRef<[number, number]>([0, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouse.current = [
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    ];
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-full h-[450px] sm:h-[550px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-soft-lg"
    >
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        {/* Lighting Setup */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#10B981" castShadow />
        <pointLight position={[-5, -3, -2]} intensity={1.2} color="#F59E0B" />

        {/* Ambient Floating Sparkle Particles */}
        <Sparkles count={80} scale={10} size={3} speed={0.4} color="#10B981" />

        {/* 3D Objects */}
        <FloatingCart mouse={mouse} />
        <FloatingApple position={[-2.8, 1.2, 0.5]} color="#ef4444" />
        <FloatingApple position={[2.6, -1.0, 0.8]} color="#f97316" />
        <FloatingMilkBottle position={[2.4, 1.4, -0.5]} />

        {/* Floating Price Tag 3D Badge */}
        <Float speed={2} floatIntensity={1.5}>
          <group position={[-2.2, -1.2, 1]}>
            <mesh>
              <boxGeometry args={[1.6, 0.6, 0.1]} />
              <meshStandardMaterial color="#10B981" metalness={0.3} />
            </mesh>
          </group>
        </Float>
      </Canvas>

      {/* Hero Canvas Floating Overlay Tags */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold font-mono">
          3D Interactive Scene • Move Cursor
        </span>
      </div>
    </div>
  );
};

export default GroceryHeroCanvas;
