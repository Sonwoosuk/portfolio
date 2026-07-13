import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollProgress.css'

gsap.registerPlugin(ScrollTrigger)

// 페이지 전체 진행도를 보여주는 상단 레드 바
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return <div ref={barRef} className="scroll-progress" />
}
