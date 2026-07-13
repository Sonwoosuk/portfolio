import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SurveillanceHUD.css'

gsap.registerPlugin(ScrollTrigger)

// 섹션 진입 시 '삐빅' 하고 떴다 사라지는 감시 인터페이스(HUD) — 구간 안내 라벨
const SECTORS = [
  { selector: '.hero', label: 'SECTOR 01: INTRO' },
  { selector: '.about-me', label: 'SECTOR 02: ABOUT ME' },
  { selector: '.manifesto', label: 'SECTOR 03: MANIFESTO' },
  { selector: '.skills', label: 'SECTOR 04: SKILLS' },
  { selector: '.ai-capability', label: 'SECTOR 05: AI CAPABILITY' },
  { selector: '.process', label: 'SECTOR 06: PROCESS' },
  { selector: '.services', label: 'SECTOR 07: SERVICES' },
  { selector: '.horizontal-works', label: 'SECTOR 08: SELECTED WORKS' },
  { selector: '.column-gallery', label: 'SECTOR 09: GALLERY' },
  { selector: '.portfolio-chart', label: 'SECTOR 10: PORTFOLIO' },
  { selector: '.playground', label: 'SECTOR 11: PLAYGROUND' },
  { selector: '.epilogue', label: 'SECTOR 12: OUTRO' },
]

const pad = (n, l = 2) => String(n).padStart(l, '0')

export default function SurveillanceHUD() {
  const rootRef = useRef(null)
  const labelRef = useRef(null)
  const timeRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const play = (label) => {
      const labelEl = labelRef.current
      const timeEl = timeRef.current
      if (!labelEl || !timeEl) return

      const now = new Date()
      timeEl.textContent = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(
        now.getDate(),
      )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(
        now.getMilliseconds(),
        3,
      )}`

      tlRef.current?.kill()
      const typing = { n: 0 }
      const tl = gsap.timeline({ defaults: { ease: 'none' } })
      // 삐빅 — 두 번 깜빡이며 등장
      tl.set(root, { autoAlpha: 1 })
        .set(labelEl, { textContent: '' })
        .fromTo(
          root,
          { opacity: 0 },
          { opacity: 1, duration: 0.28, ease: 'steps(3)' },
        )
        // 판독 바가 위에서 살짝 내려앉으며 고정
        .fromTo(
          '.hud-readout',
          { y: -14 },
          { y: 0, duration: 0.32, ease: 'power3.out' },
          0,
        )
        // 라벨 타이핑
        .to(
          typing,
          {
            n: label.length,
            duration: 0.45,
            onUpdate: () => {
              labelEl.textContent = label.slice(0, Math.round(typing.n))
            },
          },
          0.18,
        )
        // 잠시 유지 후 페이드아웃
        .to(root, { autoAlpha: 0, duration: 0.35, ease: 'power1.in' }, '+=1.1')
      tlRef.current = tl
    }

    const triggers = SECTORS.map(({ selector, label }) => {
      const el = document.querySelector(selector)
      if (!el) return null
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => play(label),
        onEnterBack: () => play(label),
      })
    }).filter(Boolean)

    return () => {
      tlRef.current?.kill()
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <div ref={rootRef} className="surv-hud" aria-hidden="true">
      {/* 화면 네 귀퉁이 크롭마크 */}
      <span className="hud-corner is-tl" />
      <span className="hud-corner is-tr" />
      <span className="hud-corner is-bl" />
      <span className="hud-corner is-br" />
      {/* 상단 판독 정보 */}
      <div className="hud-readout">
        <span ref={labelRef} className="hud-label" />
        <span className="hud-track">▸ TRACKING</span>
        <span ref={timeRef} className="hud-time" />
      </div>
    </div>
  )
}
