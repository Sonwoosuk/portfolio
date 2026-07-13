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
      const isWide = src.includes('/works/')
      img.style.width = `${gsap.utils.random(isWide ? 20 : 10, isWide ? 30 : 16)}vw`
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

    section.addEventListener('mousemove', move)
    return () => {
      section.removeEventListener('mousemove', move)
      section.querySelectorAll('.trail-img').forEach((el) => el.remove())
    }
  }, [])

  return (
    <section ref={sectionRef} className="playground">
      <h2 className="playground-hint">MOVE YOUR MOUSE</h2>
    </section>
  )
}
