import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Playground.css'

// 커서를 움직이면 궤적을 따라 이미지가 튀어나왔다 사라지는 놀이 구간
// 인스타 콘텐츠(grid)와 랜딩페이지 캡처(still)를 섞고, 원본 비율 그대로 제각각의 크기로 표시
const POOL = [
  '/grid-1.jpg',
  '/works/landing/still-1.jpg',
  '/works/rakkojae/feat-main.png',
  '/grid-5.jpg',
  '/works/landing/still-3.jpg',
  '/works/gyeol/screenshot-hero.png',
  '/grid-9.jpg',
  '/works/landing/still-2.jpg',
  '/works/chungnam/hero.jpg',
  '/grid-13.jpg',
  '/works/landing/still-4.jpg',
  '/works/rakkojae/feat-map.png',
  '/grid-17.jpg',
  '/works/landing/still-5.jpg',
  '/works/gyeol/screenshot-water.png',
  '/works/landing/still-6.jpg',
]
const SPAWN_DISTANCE = 90 // 이미지 하나가 나올 때까지의 커서 이동 거리(px)

export default function Playground() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let last = { x: -9999, y: -9999 }
    let idx = 0

    const spawn = (x, y) => {
      const img = document.createElement('img')
      const src = POOL[idx++ % POOL.length]
      img.src = src
      img.className = 'trail-img'
      img.alt = ''
      section.appendChild(img)
      // 크기를 일부러 통일하지 않음 — 원본 비율 그대로, 폭만 제각각
      // 가로형 사이트 캡처(/works/)는 세로형 인스타 콘텐츠보다 크게
      // 모바일에서는 화면이 좁은 만큼 vw 기준을 키워 비슷한 체감 크기로
      const isWide = src.includes('/works/')
      const mobile = window.innerWidth <= 768
      const [min, max] = isWide ? (mobile ? [38, 54] : [20, 30]) : (mobile ? [20, 30] : [10, 16])
      img.style.width = `${gsap.utils.random(min, max)}vw`
      gsap.set(img, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        rotation: gsap.utils.random(-14, 14),
      })
      gsap.fromTo(
        img,
        { scale: 0.3, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.28, ease: 'power2.out' },
      )
      gsap.to(img, {
        autoAlpha: 0,
        scale: 0.85,
        y: y + 70,
        delay: 0.55,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => img.remove(),
      })
    }

    const move = (e) => {
      const r = section.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (Math.hypot(x - last.x, y - last.y) > SPAWN_DISTANCE) {
        last = { x, y }
        spawn(x, y)
      }
    }

    // 터치 — 탭한 자리에서 바로 이미지가 튀어나옴
    const down = (e) => {
      const r = section.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      last = { x, y }
      spawn(x, y)
    }

    section.addEventListener('pointermove', move)
    section.addEventListener('pointerdown', down)
    return () => {
      section.removeEventListener('pointermove', move)
      section.removeEventListener('pointerdown', down)
      section.querySelectorAll('.trail-img').forEach((el) => el.remove())
    }
  }, [])

  const isTouch =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none), (pointer: coarse)').matches

  return (
    <section ref={sectionRef} className="playground">
      <h2 className="playground-hint">{isTouch ? 'TAP THE SCREEN' : 'MOVE YOUR MOUSE'}</h2>
    </section>
  )
}
