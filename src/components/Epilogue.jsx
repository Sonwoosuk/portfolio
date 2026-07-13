import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Epilogue.css'

gsap.registerPlugin(ScrollTrigger)

const LINES = ["LET'S WORK", 'TOGETHER']

const CONTACTS = [
  { label: 'PHONE', value: '010-5012-8205', href: 'tel:010-5012-8205' },
  {
    label: 'EMAIL',
    value: 'sws042666@gmail.com',
    href: 'mailto:sws042666@gmail.com',
  },
  {
    label: 'INSTAGRAM',
    value: '@the.studio.wave',
    href: 'https://www.instagram.com/the.studio.wave',
  },
]

export default function Epilogue() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    let bounceCall

    const ctx = gsap.context(() => {
      const wraps = gsap.utils.toArray('.epilogue-linewrap')
      const chars = gsap.utils
        .toArray('.epilogue-headline .char')
        .filter((c) => c.textContent.trim())

      // 랜덤 바운스 — 나타난 글자 중 '한 글자만' 빠르게 위로 틩,
      // 지속적으로 시간차를 두고 반복 (y(px) 사용 → 리빌 yPercent 와 충돌 없음)
      const bounceChar = (el) => {
        const up = -(el.offsetHeight || 60) * 0.5
        gsap
          .timeline()
          .to(el, { y: up, duration: 0.16, ease: 'power2.out' })
          .to(el, { y: 0, duration: 0.5, ease: 'back.out(2.4)' })
      }
      const tick = () => {
        bounceChar(gsap.utils.random(chars))
        bounceCall = gsap.delayedCall(gsap.utils.random(0.6, 1.4), tick)
      }
      const startBounce = () => {
        if (!bounceCall || !bounceCall.isActive()) {
          bounceCall = gsap.delayedCall(0.8, tick)
        }
      }
      const stopBounce = () => bounceCall?.kill()

      // 글자가 마스크 아래에서 회전하며 솟아오르는 리빌
      gsap.fromTo(
        '.epilogue-headline .char',
        { yPercent: 130, rotate: 9 },
        {
          yPercent: 0,
          rotate: 0,
          stagger: 0.035,
          duration: 0.9,
          ease: 'power4.out',
          // 리빌 완료 후 마스크를 열어 위로 튕겨도 안 잘리게 하고 바운스 시작
          onComplete: () => {
            gsap.set(wraps, { overflow: 'visible' })
            startBounce()
          },
          scrollTrigger: {
            trigger: wrap,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
            onLeaveBack: () => {
              stopBounce()
              gsap.set(wraps, { overflow: 'hidden' })
            },
          },
        },
      )
      gsap.fromTo(
        '.epilogue-contact li',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrap,
            start: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, wrap)

    // 연락처 행 자석 효과 — 커서 방향으로 살짝 끌려옴
    const cleanups = []
    wrap.querySelectorAll('.epilogue-contact a').forEach((row) => {
      const xTo = gsap.quickTo(row, 'x', { duration: 0.4, ease: 'power3' })
      const yTo = gsap.quickTo(row, 'y', { duration: 0.4, ease: 'power3' })
      const move = (e) => {
        const r = row.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.05)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.3)
      }
      const leave = () => {
        xTo(0)
        yTo(0)
      }
      row.addEventListener('mousemove', move)
      row.addEventListener('mouseleave', leave)
      cleanups.push(() => {
        row.removeEventListener('mousemove', move)
        row.removeEventListener('mouseleave', leave)
      })
    })

    return () => {
      bounceCall?.kill()
      ctx.revert()
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <section ref={wrapRef} className="epilogue">
      <div className="epilogue-inner">
        <h2 className="epilogue-headline">
          {LINES.map((line) => (
            <span key={line} className="epilogue-linewrap">
              {line.split('').map((ch, i) => (
                <span key={i} className="char">
                  {ch === ' ' ? ' ' : ch}
                </span>
              ))}
            </span>
          ))}
        </h2>
        <p className="epilogue-line">START FROM THE BASICS, END UP DIFFERENT.</p>
        <ul className="epilogue-contact">
          {CONTACTS.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <span className="contact-label">{c.label}</span>
                <span className="contact-value">{c.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
