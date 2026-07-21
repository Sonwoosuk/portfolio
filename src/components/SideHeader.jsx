import { useState } from 'react'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import './SideHeader.css'

// 왼쪽 고정 세로 헤더 (rogue.studio 참고) — 로고 / 점 메뉴 / 하단 CTA
// 메뉴 항목·CTA 문구는 교체 지점 (target은 각 섹션의 클래스 선택자)
const MENU = [
  { label: 'ABOUT', target: '.about-me' },
  { label: 'SKILLS', target: '.skills' },
  { label: 'AI', target: '.ai-capability' },
  { label: 'WORKS', target: '.horizontal-works' },
  { label: 'PORTFOLIO', target: '.portfolio-chart' },
  { label: 'PLAYGROUND', target: '.playground' },
  { label: 'CONTACT', target: '.epilogue' },
]

export default function SideHeader() {
  const [open, setOpen] = useState(false)
  // 모바일은 플레이그라운드 섹션이 렌더링되지 않으므로 메뉴에서도 제외
  const menu = window.matchMedia('(max-width: 768px)').matches
    ? MENU.filter((m) => m.label !== 'PLAYGROUND')
    : MENU

  const toggle = () => {
    const next = !open
    setOpen(next)
    // 오버레이가 떠 있는 동안 관성 스크롤 정지
    ScrollSmoother.get()?.paused(next)
  }

  const go = (target) => {
    setOpen(false)
    const smoother = ScrollSmoother.get()
    if (!smoother) return
    smoother.paused(false)
    smoother.scrollTo(target, true, 'top top')
  }

  return (
    <>
      <header className="side-header">
        <button
          className="side-logo"
          aria-label="맨 위로"
          onClick={() => go(0)}
        >
          {'✳︎'}
        </button>
        <button
          className={`side-menu-btn ${open ? 'is-open' : ''}`}
          aria-label="메뉴"
          aria-expanded={open}
          onClick={toggle}
        >
          <i />
          <i />
          <i />
        </button>
        <button className="side-cta" onClick={() => go('.epilogue')}>
          GET IN TOUCH
        </button>
      </header>

      <nav className={`side-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <ul>
          {menu.map((m, i) => (
            <li key={m.label} style={{ transitionDelay: `${0.05 + i * 0.05}s` }}>
              <button onClick={() => go(m.target)}>
                <span className="menu-index">{String(i + 1).padStart(2, '0')}</span>
                {m.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
