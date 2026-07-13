import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AboutMe.css'

gsap.registerPlugin(ScrollTrigger)

// 자기소개 문장 — 스크롤 진행에 따라 단어가 하나씩 차오르며 채워짐
const LINES = [
  '보이는 것을 만드는 일보다,',
  '사람이 느끼고 기억하는 경험을',
  '만드는 일에 더 끌립니다.',
  '디자인을 넘어 브랜드가 전해지는',
  '방식까지 함께 고민합니다.',
]
const HIGHLIGHTS = ['경험', '브랜드']

export default function AboutMe() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.about-word')
      gsap.set(words, { opacity: 0.12, y: 16 })
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 0.4,
          },
        })
        .to(words, { opacity: 1, y: 0, stagger: 0.4, duration: 0.8, ease: 'none' })

      // 배경 사진 — 페이드 (헌장: opacity)
      gsap.fromTo(
        '.about-backdrop',
        { autoAlpha: 0 },
        {
          autoAlpha: 0.3,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        },
      )
      // 프로필 사진 — 페이드
      gsap.fromTo(
        '.about-profile',
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        },
      )
      // 프로필 사진 — 섹션 안에서 맨 위→제자리(하단)로 스크롤에 맞춰 내려옴
      gsap.fromTo(
        '.about-profile',
        { y: () => -(section.offsetHeight * 0.7) },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=180%',
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        },
      )

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="about-me">
      {/* 뒤로 깔리는 배경 사진 — 옆으로 페이드되어 검정 배경에 녹아듦 */}
      <img className="about-backdrop" src="/about/backdrop.jpg" alt="" aria-hidden="true" />
      {/* 하단 작은 프로필 사진 + 이름 캡션 */}
      <figure className="about-profile">
        <img src="/about/profile.jpg" alt="프로필 사진" loading="lazy" />
        <figcaption className="about-name">
          <span className="about-name-text">SON WOOSUK</span>
        </figcaption>
      </figure>
      <p className="about-statement">
        {LINES.map((line, li) => (
          <span key={li} className="about-line">
            {line.split(' ').map((word, i) => (
              <span
                key={i}
                className={`about-word ${
                  HIGHLIGHTS.some((h) => word.startsWith(h)) ? 'is-red' : ''
                }`}
              >
                {word.split('').map((ch, j) => (
                  <span key={j} className="about-char">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </span>
        ))}
      </p>
    </section>
  )
}
