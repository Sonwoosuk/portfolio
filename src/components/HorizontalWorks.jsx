import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HorizontalWorks.css'

gsap.registerPlugin(ScrollTrigger)

// 가로 스크롤 갤러리 — 이미지 교체 지점: public/gallery-1.jpg ~ gallery-6.jpg
const PANELS = Array.from({ length: 6 }, (_, i) => `/gallery-${i + 1}.jpg`)

export default function HorizontalWorks() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const bigTextRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getScroll = () => track.scrollWidth - window.innerWidth

      // 세로 스크롤을 가로 이동으로 변환해 트랙 전체를 통과
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + getScroll(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      tl.to(track, { x: () => -getScroll(), ease: 'none' }, 0)
        // 거대 배경 텍스트는 절반 속도로 따라와 깊이감이 생김
        .to(bigTextRef.current, { x: () => -getScroll() * 0.45, ease: 'none' }, 0)

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="horizontal-works">
      <div ref={bigTextRef} className="hw-bigtext">
        SELECTED WORKS
      </div>
      <div ref={trackRef} className="hw-track">
        {PANELS.map((src, i) => (
          <figure key={src} className="hw-panel">
            <img src={src} alt="" />
            {/* 호버하면 다른 컷으로 교체 (serotonin의 이미지 스왑) */}
            <img className="hw-alt" src={`/grid-${i + 15}.jpg`} alt="" />
          </figure>
        ))}
      </div>
    </section>
  )
}
