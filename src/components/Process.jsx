import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RotatingBadge from './RotatingBadge'
import './Process.css'

gsap.registerPlugin(ScrollTrigger)

// 작업 프로세스 단계
const STEPS = [
  { n: '01', title: 'RESEARCH', desc: '레퍼런스와 시장 자료 탐색' },
  { n: '02', title: 'EXPLORATION', desc: '콘셉트와 레이아웃 가능성 확장' },
  { n: '03', title: 'PROTOTYPING', desc: '빠른 화면 및 인터랙션 검증' },
  { n: '04', title: 'DEVELOPMENT SUPPORT', desc: '코드 초안과 디버깅' },
  { n: '05', title: 'HUMAN DIRECTION', desc: '최종 디자인 판단과 품질 관리' },
]

export default function Process() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.process-row').forEach((row) => {
        // 행 전체가 왼쪽에서 와이프로 열림 — 구분선까지 같이 그려지는 효과
        gsap.fromTo(
          row,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top 92%',
              end: 'top 48%',
              scrub: true,
            },
          },
        )
        // 번호는 반대편에서 미끄러져 들어옴
        gsap.fromTo(
          row.querySelector('.process-num'),
          { xPercent: 80, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top 92%',
              end: 'top 48%',
              scrub: true,
            },
          },
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="process">
      <RotatingBadge />
      <div className="process-rows">
        {STEPS.map((step) => (
          <div key={step.n} className="process-row">
            <div className="process-text">
              <h3>{step.title}</h3>
              <p className="process-desc">{step.desc}</p>
            </div>
            <span className="process-num">{step.n}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
