import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StampTitle.css'

gsap.registerPlugin(ScrollTrigger)

// 섹션 진입 직전 제목이 도장처럼 뿅! 찍혔다가, 인터랙션이 시작되면 팟 하고 사라짐
export default function StampTitle({ text }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const section = el.closest('section') || el.parentElement

    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 0 })
      // 뿅! — 튕기며 등장
      gsap.fromTo(
        el,
        { scale: 0, rotation: -12, autoAlpha: 0 },
        {
          scale: 1,
          rotation: -4,
          autoAlpha: 1,
          duration: 0.55,
          ease: 'back.out(2.4)',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        },
      )
      // 섹션이 상단에 붙는 순간(인터랙션 시작) 팟 하고 사라짐
      gsap.to(el, {
        scale: 1.5,
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: section,
          start: 'top 6%',
          toggleActions: 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="stamp-title" aria-hidden="true">
      <span className="stamp-star">{'✳︎'}</span>
      {text}
    </div>
  )
}
