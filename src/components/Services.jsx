import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

// 서비스 카드 — 문구·이미지 교체 지점 (이미지: public/work-*.jpg)
const SERVICES = [
  {
    n: '01',
    title: 'WEB DESIGN',
    desc: '화면을 예쁘게 만드는 것보다, 스크롤 한 번에 의도가 읽히는 구조를 먼저 설계합니다. 타이포 위계와 여백으로 시선의 흐름을 만드는 데 집중합니다.',
    img: '/work-1.jpg',
    theme: 'light',
  },
  {
    n: '02',
    title: 'BRANDING',
    desc: 'GYEOL처럼 콘셉트 — 네이밍 — 로고 — 비주얼 아이덴티티까지, 브랜드가 하나의 세계로 읽히도록 처음부터 끝까지 직접 만듭니다.',
    img: '/work-2.jpg',
    theme: 'dark',
  },
  {
    n: '03',
    title: 'EDITORIAL DESIGN',
    desc: '인쇄물의 밀도를 웹과 지면에 가져옵니다. 그리드와 타이포그래피만으로 긴장감을 만드는 구성을 실험합니다.',
    img: '/editorial-1.jpg',
    theme: 'red',
  },
  {
    n: '04',
    title: 'DEVELOPMENT',
    desc: '디자인을 시안으로 끝내지 않고 React로 직접 구현합니다. GSAP 인터랙션과 Firebase 연동까지, 작동하는 결과물로 완성합니다.',
    img: '/works/landing/still-1.jpg',
    theme: 'light',
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card')
      cards.forEach((card, i) => {
        // 카드를 화면에 고정하고 다음 카드가 그 위로 미끄러져 쌓임
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: () => `+=${(cards.length - 1 - i) * window.innerHeight}`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        })
        // 다음 카드가 올라오는 동안 이전 카드는 축소되며 어두워짐
        if (i) {
          gsap.fromTo(
            cards[i - 1],
            { scale: 1, filter: 'brightness(1)' },
            {
              scale: 0.9,
              filter: 'brightness(0.45)',
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
              },
            },
          )
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="services">
      {SERVICES.map((s) => (
        <article key={s.n} className={`service-card theme-${s.theme}`}>
          <div className="service-text">
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
          </div>
          <div className="service-img">
            <img src={s.img} alt="" />
          </div>
        </article>
      ))}
    </section>
  )
}
