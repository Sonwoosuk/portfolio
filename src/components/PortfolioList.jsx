import { useState } from 'react'
import './PortfolioList.css'

// 프로젝트 제목·캡처 이미지 교체 지점 — 이미지: public/work-1.jpg ~ work-5.jpg
const PROJECTS = [
  { title: 'RAKKOJAE RENEWAL', image: '/work-1.jpg' },
  { title: 'GYEOL BRANDING', image: '/work-2.jpg' },
  { title: 'CHUNGNAM CLONE CODING', image: '/work-3.jpg' },
  { title: 'THE STUDIO WAVE', image: '/work-4.jpg' },
]

export default function PortfolioList() {
  const [active, setActive] = useState(0)

  return (
    <section className="portfolio-list">
      <ul className="portfolio-rows">
        {PROJECTS.map((project, i) => (
          <li
            key={project.title}
            className={i === active ? 'is-active' : ''}
            onMouseEnter={() => setActive(i)}
          >
            <span className="row-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="row-title">{project.title}</span>
            <div className="row-marquee" aria-hidden="true">
              <span>{`${project.title} — `.repeat(10)}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="portfolio-preview">
        {PROJECTS.map((project, i) => (
          <img
            key={project.image}
            src={project.image}
            alt=""
            className={i === active ? 'is-visible' : ''}
          />
        ))}
      </div>
    </section>
  )
}
