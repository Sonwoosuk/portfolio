import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import './ScrollDrop.css'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// 오른쪽 가장자리를 스크롤 양만큼 또르르 흘러내리는 레드 유리 물방울
// 안에는 스크롤 진행도만큼 레드가 차오르고, 호버하면 'TOP?' — 클릭 시 맨 위로
export default function ScrollDrop() {
  const railRef = useRef(null)
  const moverRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const rail = railRef.current
    const mover = moverRef.current
    const fill = fillRef.current
    if (!rail || !mover || !fill) return

    let progress = 0
    let velocity = 0
    let y = 0
    let squash = 0

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        progress = self.progress
        velocity = self.getVelocity()
      },
    })

    const tick = () => {
      const range = rail.clientHeight - mover.offsetHeight
      // 목표 지점을 천천히 따라가서 또르르 흘러내리는 관성이 생김
      y += (progress * range - y) * 0.09
      // 스크롤 속도에 따라 물방울이 늘어났다 오므라드는 스쿼시
      const v = gsap.utils.clamp(-1, 1, velocity / 2600)
      squash += (v - squash) * 0.12
      velocity *= 0.9
      const s = Math.abs(squash)
      gsap.set(mover, {
        y,
        scaleY: 1 + s * 0.4,
        scaleX: 1 - s * 0.25,
        rotation: squash * 6,
        autoAlpha: progress > 0.01 ? 1 : 0,
      })
      fill.style.height = `${progress * 100}%`
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      st.kill()
    }
  }, [])

  const toTop = () => {
    const smoother = ScrollSmoother.get()
    if (smoother) smoother.scrollTo(0, true)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={railRef} className="scroll-drop-rail">
      <div ref={moverRef} className="drop-mover">
        <button className="scroll-drop" onClick={toTop} aria-label="Scroll to top">
          <span ref={fillRef} className="drop-fill" />
          <span className="drop-shine" />
          <span className="drop-ask">TOP?</span>
        </button>
      </div>
    </div>
  )
}
