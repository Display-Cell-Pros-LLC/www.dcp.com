"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, RoundedBox } from "@react-three/drei"
import type * as THREE from "three"

function SolderJoint({
  position,
  delay,
}: {
  position: [number, number, number]
  delay: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() + delay
    const pulse = 0.5 + Math.sin(t * 2) * 0.5
    const mat = ref.current.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 0.4 + pulse * 1.6
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.055, 16, 16]} />
      <meshStandardMaterial color="#f6a821" emissive="#f6a821" emissiveIntensity={1} />
    </mesh>
  )
}

function Trace({
  start,
  end,
}: {
  start: [number, number, number]
  end: [number, number, number]
}) {
  const mid: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ]
  const length = Math.hypot(end[0] - start[0], end[2] - start[2])
  const angle = Math.atan2(end[2] - start[2], end[0] - start[0])
  return (
    <mesh position={mid} rotation={[0, -angle, 0]}>
      <boxGeometry args={[length, 0.015, 0.03]} />
      <meshStandardMaterial color="#38c6dd" emissive="#38c6dd" emissiveIntensity={0.6} />
    </mesh>
  )
}

function Chip({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <group position={position}>
      <RoundedBox args={size} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#1a2333" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      {/* pins */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`l${i}`} position={[-size[0] / 2 - 0.04, 0, -size[2] / 2 + 0.08 + i * ((size[2] - 0.16) / 5)]}>
          <boxGeometry args={[0.08, 0.02, 0.03]} />
          <meshStandardMaterial color="#c8ccd4" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`r${i}`} position={[size[0] / 2 + 0.04, 0, -size[2] / 2 + 0.08 + i * ((size[2] - 0.16) / 5)]}>
          <boxGeometry args={[0.08, 0.02, 0.03]} />
          <meshStandardMaterial color="#c8ccd4" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function Board() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.y = -0.5 + Math.sin(t * 0.15) * 0.15 + pointer.x * 0.25
    group.current.rotation.x = 0.9 + pointer.y * -0.12
  })

  const joints = useMemo(() => {
    const pts: { pos: [number, number, number]; delay: number }[] = []
    for (let i = 0; i < 14; i++) {
      pts.push({
        pos: [(Math.random() - 0.5) * 3.4, 0.06, (Math.random() - 0.5) * 2.2],
        delay: Math.random() * 4,
      })
    }
    return pts
  }, [])

  return (
    <group ref={group} rotation={[0.9, -0.5, 0]}>
      {/* base PCB */}
      <RoundedBox args={[4, 0.12, 2.6]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0f2a24" metalness={0.3} roughness={0.6} />
      </RoundedBox>

      {/* traces */}
      <group position={[0, 0.065, 0]}>
        <Trace start={[-1.6, 0, -0.8]} end={[0.2, 0, -0.8]} />
        <Trace start={[0.2, 0, -0.8]} end={[0.2, 0, 0.4]} />
        <Trace start={[-1.2, 0, 0.6]} end={[1.4, 0, 0.6]} />
        <Trace start={[-1.5, 0, 0]} end={[-0.4, 0, 0]} />
        <Trace start={[1.4, 0, 0.6]} end={[1.4, 0, -0.5]} />
      </group>

      {/* chips */}
      <Chip position={[-0.2, 0.16, -0.1]} size={[1.1, 0.2, 1.0]} />
      <Chip position={[1.3, 0.14, -0.5]} size={[0.5, 0.16, 0.5]} />
      <Chip position={[-1.4, 0.13, 0.6]} size={[0.4, 0.14, 0.3]} />

      {/* glowing solder joints */}
      <group position={[0, 0.06, 0]}>
        {joints.map((j, i) => (
          <SolderJoint key={i} position={j.pos} delay={j.delay} />
        ))}
      </group>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 3.2, 4.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 2, -2]} intensity={30} color="#38c6dd" />
      <pointLight position={[3, 1, 2]} intensity={20} color="#f6a821" />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <Board />
      </Float>
      <Environment preset="night" />
    </Canvas>
  )
}
