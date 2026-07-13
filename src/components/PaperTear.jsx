import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import './PaperTear.css'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// 오른쪽 가장자리의 종이 띠 — 스크롤 양만큼 위에서부터 찢어져 내려감.
// 실사 표현: 기본 찢김 선은 완만한 곡선만 잡고, SVG 필터가
// ① 변위(feDisplacementMap)로 단면을 섬유처럼 잘게 뜯고
// ② 노이즈 범프맵 조명(feDiffuseLighting)으로 종이 표면 요철 질감을 입힘.
const FRONT_JAGS = [2, 6, 3, 8, 4, 7, 2, 8, 5, 7, 3, 6, 2, 5]
const MID_JAGS = [5, 2, 7, 4, 8, 3, 6, 2, 7, 5, 8, 4, 6, 3]
const MAX_JAG = Math.max(...FRONT_JAGS, ...MID_JAGS)
// 스크롤 전에는 변위로 흔들려도 단면이 화면 위로 숨어 있도록 여유분만큼 올림
const EDGE_LIFT = 16

const tearPath = (w, h, y, jags, shift = 0) => {
  const pts = jags.map((j, i) => [
    (i / (jags.length - 1)) * w,
    y + j - MAX_JAG - EDGE_LIFT + shift,
  ])
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length - 1; i++) {
    const xc = ((pts[i][0] + pts[i + 1][0]) / 2).toFixed(1)
    const yc = ((pts[i][1] + pts[i + 1][1]) / 2).toFixed(1)
    d += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${xc} ${yc}`
  }
  const [lx, ly] = pts[pts.length - 1]
  d += ` L ${lx.toFixed(1)} ${ly.toFixed(1)} L ${w} ${h} L 0 ${h} Z`
  return `path('${d}')`
}

export default function PaperTear() {
  const railRef = useRef(null)
  const frontRef = useRef(null)
  const midRef = useRef(null)
  const askRef = useRef(null)

  useEffect(() => {
    const rail = railRef.current
    const front = frontRef.current
    const mid = midRef.current
    const ask = askRef.current
    if (!rail || !front || !mid || !ask) return

    let progress = 0
    let y = 0

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        progress = self.progress
      },
    })

    const tick = () => {
      const w = rail.clientWidth
      const h = rail.clientHeight
      // 찢어지는 지점이 천천히 따라와 뜯기는 관성이 생김
      y += (progress * h - y) * 0.1
      front.style.clipPath = tearPath(w, h, y, FRONT_JAGS)
      // 속지는 앞장보다 살짝 위까지 찢겨 층이 드러남
      mid.style.clipPath = tearPath(w, h, y, MID_JAGS, -7)
      // 'TOP?'은 뜯어진 영역 가운데 — 충분히 뜯긴 후에만
      ask.style.top = `${y / 2}px`
      ask.style.opacity = y > 100 ? '' : '0'
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
    <div ref={railRef} className="paper-tear">
      {/* 종이 실사 필터 정의 — 변위(섬유 단면) + 범프맵 조명(표면 요철) */}
      <svg className="tear-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id="paperRealFront" x="-15%" y="-2%" width="130%" height="104%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014 0.09"
              numOctaves="3"
              seed="7"
              result="warp"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="warp"
              scale="9"
              xChannelSelector="R"
              yChannelSelector="G"
              result="torn"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.55"
              numOctaves="3"
              seed="11"
              result="grain"
            />
            <feDiffuseLighting
              in="grain"
              surfaceScale="0.75"
              diffuseConstant="1.12"
              lightingColor="#ffffff"
              result="relief"
            >
              <feDistantLight azimuth="235" elevation="58" />
            </feDiffuseLighting>
            <feComposite in="relief" in2="torn" operator="in" result="reliefClipped" />
            <feBlend in="torn" in2="reliefClipped" mode="multiply" />
          </filter>
          <filter id="paperRealMid" x="-15%" y="-2%" width="130%" height="104%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.11"
              numOctaves="3"
              seed="23"
              result="warp"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="warp"
              scale="13"
              xChannelSelector="R"
              yChannelSelector="G"
              result="torn"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="3"
              seed="31"
              result="grain"
            />
            <feDiffuseLighting
              in="grain"
              surfaceScale="0.55"
              diffuseConstant="1.15"
              lightingColor="#ffffff"
              result="relief"
            >
              <feDistantLight azimuth="235" elevation="60" />
            </feDiffuseLighting>
            <feComposite in="relief" in2="torn" operator="in" result="reliefClipped" />
            <feBlend in="torn" in2="reliefClipped" mode="multiply" />
          </filter>
        </defs>
      </svg>
      <button className="tear-hit" onClick={toTop} aria-label="Scroll to top">
        {/* 뜯어진 안쪽 면 — 레드 */}
        <span className="tear-inside">
          <span ref={askRef} className="tear-ask">
            <i>T</i>
            <i>O</i>
            <i>P</i>
            <i>?</i>
          </span>
        </span>
        {/* 흰 속지 — 앞장과 다른 모양으로 찢겨 층이 드러남 */}
        <span className="tear-cast is-mid">
          <span ref={midRef} className="tear-paper tear-mid" />
        </span>
        {/* 아이보리 앞장 */}
        <span className="tear-cast is-front">
          <span ref={frontRef} className="tear-paper tear-front" />
        </span>
      </button>
    </div>
  )
}
