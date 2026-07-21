import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './VelocityMarquee.css'

gsap.registerPlugin(ScrollTrigger)

// 스크롤 속도에 반응하는 초대형 마퀴 — 빨리 내릴수록 빨라지고 기울어짐
export default function VelocityMarquee({ items = ['THE STUDIO WAVE'], baseSpeed = 5 }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // 모바일 — 터치 플릭 스크롤은 속도값이 훨씬 커서 그대로 쓰면 마퀴가 과하게 빨라짐
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const speed = isMobile ? baseSpeed * 0.5 : baseSpeed
    let x = 0
    let skew = 0
    let velocity = 0
    const wrapX = gsap.utils.wrap(-50, 0)
    const clampBoost = gsap.utils.clamp(-30, 30)
    const clampSkew = gsap.utils.clamp(-15, 15)
    const boostDivisor = isMobile ? 320 : 120

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        velocity = self.getVelocity()
      },
    })

    const tick = (time, deltaTime) => {
      const dt = deltaTime / 1000
      x = wrapX(x - (speed + clampBoost(velocity / boostDivisor)) * dt)
      skew += (clampSkew(velocity / 350) - skew) * 0.1
      velocity *= 0.92
      gsap.set(track, { xPercent: x, skewX: skew })
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      st.kill()
    }
  }, [baseSpeed])

  // -50% 지점에서 끊김 없이 이어지도록 동일한 절반을 두 번 렌더
  // 키워드 목록을 2회 반복해 절반 폭을 확보하고, 채움/아웃라인이 번갈아 흐르게 함
  const half = (key) => (
    <div key={key} className="vm-half">
      {Array.from({ length: 2 }).flatMap((_, r) =>
        items.map((item, i) => (
          <span key={`${r}-${i}`} className="vm-item">
            <span className={(r * items.length + i) % 2 ? 'vm-outline' : ''}>{item}</span>
            <span className="vm-star">{'✳︎'}</span>
          </span>
        )),
      )}
    </div>
  )

  return (
    <div className="velocity-marquee" aria-hidden="true">
      <div ref={trackRef} className="vm-track">
        {[half(0), half(1)]}
      </div>
    </div>
  )
}
