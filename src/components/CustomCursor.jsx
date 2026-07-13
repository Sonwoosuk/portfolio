import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CustomCursor.css'

// 이동 속도에 따라 젤리처럼 늘어나는 반전 블롭 커서
export default function CustomCursor() {
  const blobRef = useRef(null)

  useEffect(() => {
    // 터치 기기에서는 표시하지 않음
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const blob = blobRef.current
    if (!blob) return

    gsap.set(blob, { xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(blob, 'x', { duration: 0.25, ease: 'power3' })
    const yTo = gsap.quickTo(blob, 'y', { duration: 0.25, ease: 'power3' })

    let prev = { x: 0, y: 0 }
    let shown = false

    const move = (e) => {
      if (!shown) {
        shown = true
        prev = { x: e.clientX, y: e.clientY }
        gsap.set(blob, { x: e.clientX, y: e.clientY, opacity: 1 })
      }
      xTo(e.clientX)
      yTo(e.clientY)
    }

    // 프레임마다 실제 이동 속도를 재서 방향으로 늘리고(스트레치) 수직으론 눌러줌
    const tick = () => {
      const x = gsap.getProperty(blob, 'x')
      const y = gsap.getProperty(blob, 'y')
      const dx = x - prev.x
      const dy = y - prev.y
      prev = { x, y }
      // 겁나 늘어나는 스트레치 — 빠르게 휘두르면 최대 4배 이상 길어짐
      const speed = Math.min(Math.hypot(dx, dy), 60)
      const stretch = 1 + speed * 0.055
      gsap.set(blob, {
        rotation: (Math.atan2(dy, dx) * 180) / Math.PI,
        scaleX: stretch,
        scaleY: Math.max(0.35, 1 / stretch),
      })
    }
    gsap.ticker.add(tick)

    const over = (e) => {
      const interactive = e.target.closest(
        'a, button, .portfolio-rows li, .skills-list li, .manifesto-line, .process-row',
      )
      blob.classList.toggle('is-hover', !!interactive)
    }
    const leaveWindow = () => {
      shown = false
      gsap.set(blob, { opacity: 0 })
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.documentElement.addEventListener('mouseleave', leaveWindow)
    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leaveWindow)
    }
  }, [])

  return <div ref={blobRef} className="cursor-blob" />
}
