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

    const mm = gsap.matchMedia(section)

    // 데스크톱 — 핀 + 워드필 + 프로필 슬라이드
    mm.add('(min-width: 769px)', () => {
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
      // 프로필 사진 — 섹션이 화면에 완전히 들어와 고정된 뒤에 페이드 인
      gsap.fromTo(
        '.about-profile',
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top top' },
        },
      )
      // 프로필 사진 — 섹션 안에서 위→제자리(하단)로 스크롤에 맞춰 내려옴.
      // 시작 높이는 사진이 섹션 상단에 '통째로' 보이는 지점까지만 —
      // 섹션 밖으로 잘려 얼굴이 반만 보이는 상태가 생기지 않게 함
      gsap.fromTo(
        '.about-profile',
        {
          y: () => {
            const profile = section.querySelector('.about-profile')
            if (!profile) return 0
            return -Math.max(0, profile.offsetTop - section.offsetHeight * 0.12)
          },
        },
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
    })

    // 모바일 — 핀·스크럽 없이 심플한 페이드만 (문장 → 프로필 순서대로)
    mm.add('(max-width: 768px)', () => {
      gsap.fromTo(
        '.about-statement',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        },
      )
      gsap.fromTo(
        '.about-backdrop',
        { autoAlpha: 0 },
        {
          autoAlpha: 0.22,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        },
      )
      gsap.fromTo(
        '.about-profile',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.about-profile', start: 'top 88%' },
        },
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="about-me">
      {/* 뒤로 깔리는 배경 사진 — 옆으로 페이드되어 검정 배경에 녹아듦 */}
      <img className="about-backdrop" src="/about/backdrop.jpg" alt="" aria-hidden="true" />
      {/* 하단 작은 프로필 사진 + 이름 캡션 */}
      <figure className="about-profile">
        <img src="/about/profile.png" alt="프로필 사진" loading="lazy" />
        <figcaption className="about-name">
          <span className="about-name-text">Name: Son WooSuk</span>
          <span className="about-name-sub">우송정보대 시각디자인과 전공</span>
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
