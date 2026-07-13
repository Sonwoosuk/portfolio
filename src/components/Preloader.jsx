import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Preloader.css'

gsap.registerPlugin(ScrollTrigger)

// 다크 배경 위에서 이미지가 촤라락 넘어가고, 초대형 레드 카운터가 차오르는 로더
// 이미지 교체 지점: public의 jpg 전부 재사용
// 세로 박스와 비율이 맞는 세로 이미지(grid)만 사용해 잘림 없이 연사
const POOL = Array.from({ length: 20 }, (_, i) => `/grid-${i + 1}.jpg`)
const STEP = 0.085 // 한 장이 머무는 시간(초) — 작을수록 촤라락

export default function Preloader() {
  const [done, setDone] = useState(false)
  const overlayRef = useRef(null)
  const brandRef = useRef(null)
  const countRef = useRef(null)
  const stackRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const count = countRef.current
    const stack = stackRef.current
    if (!overlay || !count || !stack) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const imgs = Array.from(stack.querySelectorAll('img'))
    const total = imgs.length * STEP

    const obj = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow
        // 로더가 걷힌 뒤 고정(pin) 구간들의 위치를 다시 계산
        ScrollTrigger.refresh()
        setDone(true)
      },
    })

    // 이미지 연사 — 장마다 미세하게 흔들리고 커졌다 작아지며 핸드헬드 느낌
    imgs.forEach((img, i) => {
      tl.set(
        img,
        {
          autoAlpha: 1,
          scale: gsap.utils.random(1, 1.07),
          rotation: gsap.utils.random(-2.2, 2.2),
        },
        i * STEP,
      )
      if (i > 0) tl.set(imgs[i - 1], { autoAlpha: 0 }, i * STEP)
    })

    // 화면을 뒤덮는 카운터 — 연사와 같은 호흡으로 차오름
    tl.to(
      obj,
      {
        v: 100,
        duration: total,
        ease: 'power1.in',
        onUpdate: () => {
          count.textContent = String(Math.round(obj.v)).padStart(3, '0')
        },
      },
      0,
    )
      // 100 도달 순간 카운터가 쿵 하고 펀치
      .fromTo(
        count,
        { scale: 1 },
        { scale: 1.07, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' },
        total,
      )
      .to(
        [brandRef.current, stack, count],
        { yPercent: -8, autoAlpha: 0, duration: 0.4, ease: 'power2.in' },
        total + 0.4,
      )
      .to(overlay, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '-=0.1')

    return () => {
      tl.kill()
      document.body.style.overflow = prevOverflow
    }
  }, [])

  if (done) return null

  return (
    <div ref={overlayRef} className="preloader">
      <span ref={brandRef} className="preloader-brand">PORTFOLIO BY WOOSUK</span>
      <div ref={stackRef} className="preloader-stack" aria-hidden="true">
        {POOL.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>
      <span ref={countRef} className="preloader-count">000</span>
    </div>
  )
}
