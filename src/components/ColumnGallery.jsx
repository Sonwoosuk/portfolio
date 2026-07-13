import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ColumnGallery.css'

gsap.registerPlugin(ScrollTrigger)

// 컬럼별 등장 연출 — 방향(양수 = 아래에서), 거리, 시차, 속도, 가속 곡선, 시작 크기가 전부 다름
// 인스타 콘텐츠(grid) 사이사이에 랜딩페이지 캡처(still)를 섞어 비중 조절
const COLUMN_IMAGES = [
  ['/grid-1.jpg', '/grid-2.jpg', '/works/landing/still-1.jpg', '/grid-4.jpg', '/grid-5.jpg'],
  ['/grid-6.jpg', '/works/landing/still-3.jpg', '/grid-8.jpg', '/grid-9.jpg', '/grid-10.jpg'],
  ['/grid-11.jpg', '/grid-12.jpg', '/grid-13.jpg', '/works/landing/still-2.jpg', '/grid-15.jpg'],
  ['/grid-16.jpg', '/grid-17.jpg', '/works/landing/still-6.jpg', '/grid-19.jpg', '/grid-20.jpg'],
]

const COLUMNS = [
  { from: 55, delay: 0, duration: 1.15, ease: 'expo.out', scaleFrom: 0.92 },
  { from: -70, delay: 0.12, duration: 1.35, ease: 'power4.out', scaleFrom: 1.08 },
  { from: 42, delay: 0.05, duration: 1.0, ease: 'back.out(1.3)', scaleFrom: 0.88 },
  { from: -48, delay: 0.2, duration: 1.25, ease: 'expo.out', scaleFrom: 1.05 },
].map((col, colIndex) => ({
  ...col,
  images: COLUMN_IMAGES[colIndex],
}))

export default function ColumnGallery() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })
      // 그리드 전체가 앞으로 다가오며 페이드인
      tl.fromTo(
        '.column-gallery-inner',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' },
        0,
      )
      // 칸마다 제각각의 거리·속도·곡선으로 페이드인하며 그리드에 정착
      COLUMNS.forEach((col, i) => {
        tl.fromTo(
          `.gallery-column-${i}`,
          { yPercent: col.from, opacity: 0, scale: col.scaleFrom },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: col.duration,
            ease: col.ease,
          },
          col.delay,
        )
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrapRef} className="column-gallery">
      <div className="column-gallery-inner">
        {COLUMNS.map((col, i) => (
          <div key={i} className={`gallery-column gallery-column-${i}`}>
            {col.images.map((src) => (
              <img key={src} src={src} alt="" />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
