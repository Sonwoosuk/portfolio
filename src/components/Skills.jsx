import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

// 스킬 목록 — 스크롤에 따라 3D 룰렛처럼 회전하며 하나씩 지나감
const SKILLS = [
  'Adobe Illustrator',
  'Adobe Photoshop',
  'Figma',
  'Canva',
  'HTML5',
  'CSS3',
  'JavaScript',
  'React',
  'GSAP',
  'Visual Studio Code',
  'Git',
  'GitHub',
  'Vercel',
  'Firebase',
  'Supabase',
  'ChatGPT',
  'Claude',
  'Codex',
  'Antigravity',
  'Gemini',
  'Perplexity',
  'Figma AI',
  'Canva AI',
]

export default function Skills() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const counterRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const list = listRef.current
    if (!section || !list) return

    const items = itemRefs.current.filter(Boolean)
    let activeIndex = -1

    const update = (progress) => {
      const itemH = items[0] ? items[0].offsetHeight : 0
      if (!itemH) return
      const active = progress * (items.length - 1)
      // 활성 항목이 항상 화면 세로 중앙에 오도록 리스트 전체를 이동
      gsap.set(list, { xPercent: -50, y: -(active + 0.5) * itemH })
      items.forEach((el, i) => {
        const d = i - active
        const abs = Math.abs(d)
        gsap.set(el, {
          rotationX: gsap.utils.clamp(-80, 80, d * -38),
          scale: Math.max(0.55, 1 - abs * 0.16),
          opacity: Math.max(0, 1 - abs * 0.32),
          transformPerspective: 900,
        })
      })
      const idx = gsap.utils.clamp(0, items.length - 1, Math.round(active))
      if (idx !== activeIndex) {
        activeIndex = idx
        items.forEach((el, i) => el.classList.toggle('is-active', i === idx))
        if (counterRef.current) {
          counterRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(
            items.length,
          ).padStart(2, '0')}`
        }
      }
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=550%',
      pin: true,
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => update(self.progress),
    })
    update(0)

    return () => st.kill()
  }, [])

  return (
    <section ref={sectionRef} className="skills">
      <span ref={counterRef} className="skills-counter">
        01 / 23
      </span>
      <div className="skills-viewport">
        <ul ref={listRef} className="skills-list">
          {SKILLS.map((skill, i) => (
            <li
              key={skill}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
