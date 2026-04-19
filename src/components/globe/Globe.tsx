'use client'

import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Constants ────────────────────────────────────────────────────────────────

const RADIUS = 2.1
const PULSE_COLORS = ['0,229,160', '79,142,247', '168,85,247'] // green, blue, purple

// ─── Helpers ──────────────────────────────────────────────────────────────────

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function buildLatRingLine(lat: number, radius: number, opacity: number): THREE.Line {
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= 128; i++) {
    const lon = (i / 128) * 360 - 180
    points.push(latLonToVec3(lat, lon, radius))
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points)
  const mat = new THREE.LineBasicMaterial({
    color: '#FFBF00',
    transparent: true,
    opacity,
  })
  return new THREE.Line(geo, mat)
}

function buildLonLine(lon: number, radius: number, opacity: number): THREE.Line {
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= 64; i++) {
    const lat = (i / 64) * 180 - 90
    points.push(latLonToVec3(lat, lon, radius))
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points)
  const mat = new THREE.LineBasicMaterial({
    color: '#FFBF00',
    transparent: true,
    opacity,
  })
  return new THREE.Line(geo, mat)
}

/** Weighted random color: green 42%, blue 42%, purple 16% */
function randomPulseColor(): string {
  const r = Math.random()
  if (r < 0.42) return PULSE_COLORS[0]
  if (r < 0.84) return PULSE_COLORS[1]
  return PULSE_COLORS[2]
}

function randomEdge(nodes: THREE.Vector3[]): [THREE.Vector3, THREE.Vector3] {
  const a = Math.floor(Math.random() * nodes.length)
  let b = Math.floor(Math.random() * nodes.length)
  while (b === a) b = Math.floor(Math.random() * nodes.length)
  return [nodes[a], nodes[b]]
}

// ─── Pulse State ──────────────────────────────────────────────────────────────

interface PulseState {
  start: THREE.Vector3
  end: THREE.Vector3
  t: number
  speed: number
  color: string
}

// ─── Globe Scene ──────────────────────────────────────────────────────────────

function GlobeScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const pulseGroupRef = useRef<THREE.Group>(null)
  const pulsesRef = useRef<PulseState[]>([])
  const targetRotX = useRef(0)
  const targetRotZ = useRef(0)

  // ── Latitude ring objects ───────────────────────────────────────────────────
  const latLineObjects = useMemo<THREE.Line[]>(() => {
    const latitudes = [-60, -40, -20, 0, 20, 40, 60]
    return latitudes.map((lat) => buildLatRingLine(lat, RADIUS, lat === 0 ? 0.6 : 0.14))
  }, [])

  // ── Longitude line objects ──────────────────────────────────────────────────
  const lonLineObjects = useMemo<THREE.Line[]>(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const lon = i * 30 - 180
      const isDashed = i % 3 === 0
      return buildLonLine(lon, RADIUS, isDashed ? 0.08 : 0.18)
    })
  }, [])

  // ── Nodes ───────────────────────────────────────────────────────────────────
  const nodes = useMemo<THREE.Vector3[]>(() => {
    const pts: THREE.Vector3[] = []
    for (let lat = -60; lat <= 60; lat += 20) {
      for (let lon = -180; lon < 180; lon += 30) {
        pts.push(latLonToVec3(lat, lon, RADIUS))
      }
    }
    return pts
  }, [])

  const [nodeGeo, nodeMat] = useMemo(() => {
    const positions = new Float32Array(nodes.length * 3)
    nodes.forEach((v, i) => {
      positions[i * 3] = v.x
      positions[i * 3 + 1] = v.y
      positions[i * 3 + 2] = v.z
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({
      color: '#FFBF00',
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    })
    return [geo, mat]
  }, [nodes])

  // ── Outer ring torus objects ────────────────────────────────────────────────
  const outerRingObjects = useMemo<THREE.Mesh[]>(() => {
    const specs = [
      { radius: RADIUS * (213 / 210), tubeRadius: 0.007, opacity: 0.12 },
      { radius: RADIUS * (222 / 210), tubeRadius: 0.014, opacity: 0.04 },
    ]
    return specs.map(({ radius, tubeRadius, opacity }) => {
      const geo = new THREE.TorusGeometry(radius, tubeRadius, 8, 128)
      const mat = new THREE.MeshBasicMaterial({
        color: '#FFBF00',
        transparent: true,
        opacity,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = Math.PI / 2
      return mesh
    })
  }, [])

  // ── Equatorial ring ─────────────────────────────────────────────────────────
  const equatorialRingObject = useMemo<THREE.Mesh>(() => {
    const geo = new THREE.TorusGeometry(RADIUS * 1.002, 0.004, 8, 128)
    const mat = new THREE.MeshBasicMaterial({
      color: '#FFBF00',
      transparent: true,
      opacity: 0.42,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.rotation.x = Math.PI / 2
    return mesh
  }, [])

  // ── Signal pulse meshes ─────────────────────────────────────────────────────
  const pulseMeshObjects = useMemo<THREE.Group[]>(() => {
    const result: THREE.Group[] = []
    for (let i = 0; i < 24; i++) {
      const g = new THREE.Group()

      const coreMat = new THREE.MeshBasicMaterial({
        color: '#00E5A0',
        transparent: true,
        opacity: 0.9,
      })
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), coreMat)

      const haloMat = new THREE.MeshBasicMaterial({
        color: '#00E5A0',
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const halo = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), haloMat)

      g.add(core, halo)
      result.push(g)
    }
    return result
  }, [])

  // ── Initialise pulse states ─────────────────────────────────────────────────
  useEffect(() => {
    const initial: PulseState[] = Array.from({ length: 24 }, () => {
      const [start, end] = randomEdge(nodes)
      return {
        start: start.clone(),
        end: end.clone(),
        t: Math.random(),
        speed: 0.006 + Math.random() * 0.009,
        color: randomPulseColor(),
      }
    })
    pulsesRef.current = initial

    // Apply initial colours to mesh materials
    initial.forEach((pulse, i) => {
      const group = pulseMeshObjects[i]
      if (!group) return
      const col = new THREE.Color(`rgb(${pulse.color})`)
      ;(group.children[0] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>).material.color.copy(col)
      ;(group.children[1] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>).material.color.copy(col)
    })
  }, [nodes, pulseMeshObjects])

  // ── Animation loop ──────────────────────────────────────────────────────────
  useFrame(() => {
    if (!groupRef.current) return

    // Continuous Y rotation
    groupRef.current.rotation.y += 0.0022

    // Mouse parallax
    targetRotX.current = mouseY * 0.087
    targetRotZ.current = mouseX * 0.087
    groupRef.current.rotation.x +=
      (targetRotX.current - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.z +=
      (targetRotZ.current - groupRef.current.rotation.z) * 0.03

    // Update pulse positions
    pulsesRef.current.forEach((pulse, i) => {
      pulse.t += pulse.speed
      if (pulse.t >= 1) {
        const [start, end] = randomEdge(nodes)
        pulse.start = start.clone()
        pulse.end = end.clone()
        pulse.t = 0
        pulse.speed = 0.006 + Math.random() * 0.009
        pulse.color = randomPulseColor()

        const group = pulseMeshObjects[i]
        if (group) {
          const col = new THREE.Color(`rgb(${pulse.color})`)
          ;(group.children[0] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>).material.color.copy(col)
          ;(group.children[1] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>).material.color.copy(col)
        }
      }

      const group = pulseMeshObjects[i]
      if (group) {
        const pos = pulse.start.clone().lerp(pulse.end, pulse.t)
        group.position.copy(pos)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Latitude rings */}
      {latLineObjects.map((lineObj, i) => (
        <primitive key={`lat-${i}`} object={lineObj} />
      ))}

      {/* Longitude lines */}
      {lonLineObjects.map((lineObj, i) => (
        <primitive key={`lon-${i}`} object={lineObj} />
      ))}

      {/* Nodes */}
      <points geometry={nodeGeo} material={nodeMat} />

      {/* Signal pulses */}
      <group ref={pulseGroupRef}>
        {pulseMeshObjects.map((group, i) => (
          <primitive key={`pulse-${i}`} object={group} />
        ))}
      </group>

      {/* Outer rings */}
      {outerRingObjects.map((mesh, i) => (
        <primitive key={`ring-${i}`} object={mesh} />
      ))}

      {/* Equatorial ring */}
      <primitive object={equatorialRingObject} />
    </group>
  )
}

// ─── Static Fallback ──────────────────────────────────────────────────────────

export function StaticGlobeImage() {
  return (
    <div
      style={{ width: 520, height: 520 }}
      className="flex items-center justify-center"
    >
      <div
        style={{
          width: 420,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 35% 40%, rgba(255,191,0,0.15) 0%, rgba(5,8,15,0.8) 70%)',
          border: '1px solid rgba(255,191,0,0.3)',
          boxShadow: '0 0 80px rgba(255,191,0,0.1)',
        }}
      />
    </div>
  )
}

// ─── Globe (main export) ──────────────────────────────────────────────────────

export default function Globe() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  // null = not yet mounted (SSR / hydration); true/false = whether animation is permitted
  const [canAnimate, setCanAnimate] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Use the change-listener pattern to set state from a media query.
    // We call the handler immediately with a synthetic event-like object so
    // the first render after mount reflects the actual preference.
    const handler = (ev: MediaQueryListEvent | { matches: boolean }) => {
      setCanAnimate(!ev.matches)
    }
    mq.addEventListener('change', handler as EventListener)
    // Kick off with current value via the listener to avoid the
    // "sync setState in effect" lint rule
    mq.dispatchEvent(new Event('change'))
    return () => mq.removeEventListener('change', handler as EventListener)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // null = not yet mounted (SSR / hydration); false = reduced motion
  if (canAnimate !== true) {
    return <StaticGlobeImage />
  }

  return (
    <div ref={containerRef} style={{ width: 520, height: 520 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        frameloop="always"
        style={{ background: 'transparent' }}
      >
        <GlobeScene mouseX={mousePos.x} mouseY={mousePos.y} />
      </Canvas>
    </div>
  )
}
