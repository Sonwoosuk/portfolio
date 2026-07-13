import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Manifesto.css'

gsap.registerPlugin(ScrollTrigger)

// 선언 문구 교체 지점 — 호버하면 글자가 두 겹으로 벌어지는 글리치(ilcapo 참고)
const LINES = ['KEEP THE BASICS', 'BREAK THE SAME']

export default function Manifesto() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const lines = Array.from(section.querySelectorAll('.manifesto-line'))

    // 스크롤 속도에 비례하는 텍스트 섀도 스플릿 글리치
    let velocity = 0
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        velocity = self.getVelocity()
      },
    })
    const tick = () => {
      const v = gsap.utils.clamp(0, 24, Math.abs(velocity) / 90)
      lines.forEach((line, i) => {
        const dir = i % 2 ? -1 : 1
        line.style.textShadow =
          v < 0.5
            ? 'none'
            : `${dir * v * 0.4}px 0 #0a0a0a, ${-dir * v * 0.4}px 0 rgba(255, 255, 255, 0.9)`
      })
      velocity *= 0.9
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      st.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="manifesto">
      {LINES.map((line) => (
        <h2 key={line} className="manifesto-line">
          {line.split('').map((ch, i) =>
            ch === ' ' ? (
              <span key={i} className="m-space"> </span>
            ) : (
              <span
                key={i}
                className="m-letter"
                data-char={ch}
                style={{ '--d': `${i * 0.02}s` }}
              >
                {ch}
              </span>
            ),
          )}
        </h2>
      ))}
    </section>
  )
}
