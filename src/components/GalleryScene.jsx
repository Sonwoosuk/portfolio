import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'

// 액체 안 3D 공간에 떠 있는 이미지들 — public/gallery-1.jpg ~ gallery-6.jpg 교체 시 바뀜
const IMAGES = [
  '/gallery-1.jpg',
  '/gallery-2.jpg',
  '/gallery-3.jpg',
  '/gallery-4.jpg',
  '/gallery-5.jpg',
  '/gallery-6.jpg',
]

// 판 크기를 각 이미지의 원본 비율에 맞춰 왜곡·잘림 없이 표시
// (1·4·5·6 = 사이트 캡처 16:10, 2·3 = 팜플렛 A4 가로 1.41:1)
const PANELS = [
  { pos: [-2.6, 0.6, -2], rot: [0, 0.25, 0], size: [2.6, 1.63] },
  { pos: [1.8, -0.4, -1], rot: [0, -0.2, 0], size: [2.1, 1.48] },
  { pos: [0.2, 1.2, -5], rot: [0, 0.1, 0], size: [2.8, 1.98] },
  { pos: [-2.2, -1.4, -7], rot: [0, 0.3, 0.05], size: [2.24, 1.4] },
  { pos: [2.6, 1.0, -10], rot: [0, -0.25, 0], size: [2.72, 1.7] },
  { pos: [-0.6, -0.6, -13], rot: [0, 0.15, 0], size: [2.4, 1.5] },
]

function Panels({ progressRef }) {
  const textures = useLoader(THREE.TextureLoader, IMAGES)

  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace
    })
  }, [textures])

  useFrame((state) => {
    const p = progressRef.current
    // 스크롤 진행에 따라 카메라가 이미지들 사이를 뚫고 전진
    state.camera.position.z = 7 - p * 24
  })

  return (
    <group>
      {PANELS.map((panel, i) => (
        <mesh key={i} position={panel.pos} rotation={panel.rot}>
          <planeGeometry args={panel.size} />
          <meshBasicMaterial map={textures[i]} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

// 암흑 공간 속에서 춤추는 모델 — 스크롤 시 회전하다가 마지막에 오퍼시티로 사라짐
// Dancing Stormtrooper by StrykerDoesAnimation (CC Attribution)
function Dancer({ progressRef }) {
  const collada = useLoader(
    ColladaLoader,
    '/models/stormtrooper/stormtrooper.dae',
  )
  const groupRef = useRef(null)
  const mixerRef = useRef(null)
  const materialsRef = useRef([])

  const avatar = collada.scene

  useEffect(() => {
    const materials = []
    avatar.traverse((child) => {
      if (child.material) {
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material]
        mats.forEach((m) => {
          m.transparent = true
          // 이미지 판에 가려지지 않고 항상 앞에 보이도록
          m.depthTest = false
          materials.push(m)
        })
        child.renderOrder = 10
      }
    })
    materialsRef.current = materials

    const animations = avatar.animations
    if (animations && animations.length > 0) {
      const mixer = new THREE.AnimationMixer(avatar)
      mixer.clipAction(animations[0]).play()
      mixerRef.current = mixer
    }
    return () => {
      if (mixerRef.current) mixerRef.current.stopAllAction()
    }
  }, [avatar])

  useFrame((state, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta)
    const p = progressRef.current
    if (groupRef.current) {
      // 블랙홀 흡입 컨셉: 처음엔 똑바로 서 있다가 후반(55%~)에 흡입 시작
      const pull = Math.min(1, Math.max(0, (p - 0.55) / 0.35))
      // 시작은 정면(180도 돌려둠), 흡입되면 제자리에서 점점 빠르게 돌며 기울어짐
      groupRef.current.rotation.y = Math.PI + pull * pull * Math.PI * 6
      groupRef.current.rotation.x = Math.sin(pull * Math.PI * 2.1) * 0.5 * pull
      groupRef.current.rotation.z = pull * 1.1
      // 위치 고정 — 화면 중앙 아래쪽, 카메라 앞 일정 거리 유지
      const depth = 8 + pull * 10
      groupRef.current.position.set(0, -1.2, state.camera.position.z - depth)
      // 기본 크기 0.5배, 빨려 들어가며 더 작아짐
      groupRef.current.scale.setScalar(0.5 * (1 - pull * 0.85))
      // 20% 지점부터 페이드인, 72% 지점부터 페이드아웃
      const fadeIn = Math.min(1, Math.max(0, (p - 0.2) / 0.08))
      const fadeOut = 1 - Math.min(1, Math.max(0, (p - 0.72) / 0.2))
      const opacity = fadeIn * fadeOut
      materialsRef.current.forEach((m) => {
        m.opacity = opacity
      })
      groupRef.current.visible = opacity > 0.01
    }
  })

  return (
    <group ref={groupRef} position={[0, -2, -16]}>
      <primitive object={avatar} />
    </group>
  )
}

export default function GalleryScene({ progressRef }) {
  return (
    <div className="gallery-scene">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[1.5, 1, -1.5]} intensity={3} />
        <Suspense fallback={null}>
          <Panels progressRef={progressRef} />
          <Dancer progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
