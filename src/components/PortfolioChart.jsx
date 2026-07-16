import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Matter from 'matter-js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PortfolioChart.css'

gsap.registerPlugin(ScrollTrigger)

// 프로젝트 제목·캡처 이미지 교체 지점 — 이미지: public/work-1.jpg ~ work-5.jpg
// slug는 세부 페이지(/works/:slug) 연결용
const PROJECTS = [
  {
    title: 'RAKKOJAE REDESIGN',
    tags: 'UX/UI • React • Responsive • Firebase',
    image: '/work-1.jpg',
    slug: 'rakkojae',
  },
  {
    title: 'GYEOL BRAND IDENTITY',
    tags: 'Branding • Logo • Package • Visual Identity',
    image: '/work-2.jpg',
    slug: 'gyeol',
  },
  {
    title: 'LANDING PAGE DESIGN',
    tags: 'UI Design • Interaction • Motion',
    image: '/works/landing/hero.jpg',
    slug: 'landing',
  },
  {
    title: 'SOCIAL CONTENT DESIGN',
    tags: 'Graphic Design • Marketing • Instagram',
    image: '/work-4.jpg',
    slug: 'social',
  },
  {
    title: 'CHUNGNAM TOURISM FOUNDATION CLONE',
    tags: 'UI Implementation',
    image: '/work-3.jpg',
    slug: 'chungnam',
  },
  {
    title: 'VISIT JAPAN LANDING PAGE',
    tags: 'Interaction • GSAP ScrollTrigger • i18n',
    image: '/works/trip/hero.jpg',
    slug: 'trip',
  },
]

export default function PortfolioChart() {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)
  const titleRefs = useRef([])
  const [assembled, setAssembled] = useState(false)
  const [active, setActive] = useState(0)
  const scrollActiveRef = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    const overlay = overlayRef.current
    if (!section || !overlay) return

    // 모바일 — 물리 낙하·핀 연출 없이 완성된 표를 바로 보여줌 (심플)
    if (window.matchMedia('(max-width: 768px)').matches) {
      setAssembled(true)
      return
    }

    let killed = false
    let cleanup = () => {}

    const init = () => {
      if (killed) return
      const { Engine, World, Bodies, Runner, Mouse, MouseConstraint } = Matter

      const rect = section.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      if (width <= 0 || height <= 0) return

      const engine = Engine.create()
      engine.world.gravity.y = 0.9

      const boundaryOptions = { isStatic: true }
      const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions)
      const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions)
      const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions)
      const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions)

      // 실제 표의 제목 위치를 측정해서 물리용 클론 생성 — 재배열 목표 지점이 곧 표 자리
      const items = titleRefs.current.filter(Boolean).map((el) => {
        const r = el.getBoundingClientRect()
        const w = r.width
        const h = r.height
        const x = r.left - rect.left + w / 2
        const y = r.top - rect.top + h / 2

        const clone = el.cloneNode(true)
        clone.classList.add('chart-fly')
        clone.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px)`
        overlay.appendChild(clone)

        const body = Bodies.rectangle(x, y, w, h, {
          restitution: 0.8,
          frictionAir: 0.01,
          friction: 0.2,
        })
        Matter.Body.setStatic(body, true)
        return { el, clone, body, originalX: x, originalY: y, w, h }
      })

      const mouse = Mouse.create(section)
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.9, render: { visible: false } },
      })
      // matter 마우스가 휠·터치 스크롤을 preventDefault로 막지 않도록 해제 (드래그는 유지)
      mouse.element.removeEventListener('wheel', mouse.mousewheel)
      mouse.element.removeEventListener('touchmove', mouse.mousemove)
      mouse.element.removeEventListener('touchstart', mouse.mousedown)

      World.add(engine.world, [
        floor,
        leftWall,
        rightWall,
        ceiling,
        mouseConstraint,
        ...items.map((i) => i.body),
      ])

      const runner = Runner.create()
      Runner.run(runner, engine)

      let raf
      const loop = () => {
        items.forEach(({ body, clone, w, h }) => {
          clone.style.transform = `translate(${body.position.x - w / 2}px, ${
            body.position.y - h / 2
          }px) rotate(${body.angle}rad)`
        })
        raf = requestAnimationFrame(loop)
      }
      loop()

      const tweens = []
      const killTweens = () => {
        tweens.forEach((t) => t.kill())
        tweens.length = 0
      }

      // 클론은 물리 연출 중에만 보이도록 개별 visibility까지 함께 전환
      // (부모 오버레이만 숨기면 클론이 남아 원본 제목·호버 마퀴와 겹침)
      const showOverlay = () => {
        overlay.style.visibility = 'visible'
        items.forEach(({ el, clone }) => {
          el.style.visibility = 'hidden'
          clone.style.visibility = 'visible'
        })
      }

      const hideOverlay = () => {
        overlay.style.visibility = 'hidden'
        items.forEach(({ el, clone }) => {
          el.style.visibility = ''
          clone.style.visibility = 'hidden'
        })
      }

      const drop = () => {
        killTweens()
        setAssembled(false)
        showOverlay()
        items.forEach(({ body }) => {
          Matter.Body.setStatic(body, false)
          // 위로 강하게 던져 화면 전체로 흩어진 뒤 위에서부터 쏟아지도록
          Matter.Body.setVelocity(body, {
            x: (Math.random() - 0.2) * 30,
            y: -(10 + Math.random() * 12),
          })
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25)
        })
      }

      const assemble = (showChart) => {
        killTweens()
        showOverlay()
        let done = 0
        items.forEach(({ body, originalX, originalY }) => {
          Matter.Body.setStatic(body, true)
          const normalizedAngle =
            body.angle - Math.round(body.angle / (Math.PI * 2)) * Math.PI * 2
          Matter.Body.setAngle(body, normalizedAngle)
          const proxy = {
            x: body.position.x,
            y: body.position.y,
            angle: normalizedAngle,
          }
          tweens.push(
            gsap.to(proxy, {
              x: originalX,
              y: originalY,
              angle: 0,
              duration: 1.1,
              ease: 'power3.inOut',
              onUpdate: () => {
                Matter.Body.setPosition(body, { x: proxy.x, y: proxy.y })
                Matter.Body.setAngle(body, proxy.angle)
              },
              onComplete: () => {
                done += 1
                if (done === items.length) {
                  hideOverlay()
                  if (showChart) setAssembled(true)
                }
              },
            }),
          )
        })
      }

      // 스크롤 진행도에 따른 상태 전환 (양방향):
      // 0~3% 제자리 / 3~35% 와장창 / 35%~ 재배열 후 차트 완성 / 42%~ 프로젝트 하나씩 넘기기
      let state = 'intact'
      const stepStart = 0.42
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=350%',
        pin: true,
        onUpdate: (self) => {
          const p = self.progress
          const desired = p < 0.03 ? 'intact' : p < 0.35 ? 'fallen' : 'assembled'
          if (desired !== state) {
            state = desired
            if (desired === 'fallen') drop()
            else assemble(desired === 'assembled')
          }
          // 차트 완성 후 스크롤에 따라 활성 프로젝트가 하나씩 넘어감
          if (p >= stepStart) {
            const span = (1 - stepStart) / PROJECTS.length
            const idx = Math.max(
              0,
              Math.min(PROJECTS.length - 1, Math.floor((p - stepStart) / span)),
            )
            if (idx !== scrollActiveRef.current) {
              scrollActiveRef.current = idx
              setActive(idx)
            }
          }
        },
      })

      cleanup = () => {
        st.kill()
        killTweens()
        cancelAnimationFrame(raf)
        Runner.stop(runner)
        World.clear(engine.world)
        Engine.clear(engine)
        items.forEach(({ clone, el }) => {
          clone.remove()
          el.style.visibility = ''
        })
      }
    }

    // 폰트 로딩 후 측정해야 클론과 실제 표 위치가 정확히 일치
    if (!('fonts' in document) || document.fonts.status === 'loaded') {
      init()
    } else {
      document.fonts.ready.then(init)
    }

    return () => {
      killed = true
      cleanup()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`portfolio-chart ${assembled ? 'is-assembled' : ''}`}
    >
      <div className="chart-inner">
        {/* 모바일 전용 섹션 제목 */}
        <h2 className="chart-title">포트폴리오</h2>
        <ul className="portfolio-rows">
          {PROJECTS.map((project, i) => (
            <li
              key={project.title}
              className={i === active ? 'is-active' : ''}
              onMouseEnter={() => setActive(i)}
              onClick={() => navigate(`/works/${project.slug}`)}
            >
              <span className="row-index">{String(i + 1).padStart(2, '0')}</span>
              <span
                className="row-title"
                ref={(el) => {
                  titleRefs.current[i] = el
                }}
              >
                {project.title}
              </span>
              <span className="row-tags">{project.tags}</span>
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
      </div>
      <div ref={overlayRef} className="chart-overlay" />
    </section>
  )
}
