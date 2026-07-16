import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AICapability.css'

gsap.registerPlugin(ScrollTrigger)

// AI 활용능력 — 톤온톤 초대형 타이포 + 떠 있는 이미지 + 패럴랙스 알약 라벨
// (rogue.studio 'WHEN THEY NEED' 섹션 참고)
// ⚠ 이미지·알약 문구는 임시 — 교체 지점
const HEADING = { light: 'WHAT I BUILD', bold: 'WITH AI' }

// 프로젝트에서 실제로 활용한 AI 도구 — 이미지 자리에서 크게 보이는 에디토리얼 노트
const ROWS = [
  {
    word: 'DESIGN RESEARCH',
    tools: [
      {
        name: 'Claude',
        logo: '/logos/claude.svg',
        role: 'Build Partner',
        desc: ['디자인을 React 화면으로 옮기고,', '인터랙션과 기능까지 하나의 흐름으로.'],
        side: 'left',
      },
    ],
  },
  {
    word: 'PROMPT ENGINEERING',
    tools: [
      {
        name: 'Codex',
        logo: '/logos/codex.svg',
        role: 'Fix & Refine',
        desc: ['프로젝트 안으로 들어가 막힌 부분을 찾고,', '고치고, 다시 더 나은 버전으로.'],
        side: 'right',
      },
    ],
  },
  {
    word: 'CONCEPT DEVELOPMENT',
    tools: [
      {
        name: 'Figma AI',
        logo: '/logos/figma.svg',
        role: 'Explore',
        desc: ['하나의 디자인 방향을 여러 레이아웃과', 'UI 가능성으로 빠르게 펼쳐보기.'],
        side: 'left',
      },
    ],
  },
  {
    word: 'CONTENT ASSISTANCE',
    tools: [
      {
        name: 'ChatGPT',
        logo: '/logos/openai.svg',
        role: 'Think & Write',
        desc: ['흩어진 자료와 생각을 브랜드 방향,', '콘텐츠 구조, 카피로 연결하기.'],
        side: 'right',
      },
    ],
  },
  {
    word: 'IDEA TO LAUNCH',
    tools: [
      {
        name: 'Canva',
        logo: '/logos/canva.svg',
        role: 'Content',
        desc: ['하나의 메인 비주얼을 SNS 콘텐츠,', '광고 이미지, 프레젠테이션으로 확장하기.'],
        side: 'left',
      },
    ],
  },
  {
    word: 'DOCUMENTATION',
    tools: [
      {
        name: 'Gemini',
        logo: '/logos/googlegemini.svg',
        role: 'Check & Discover',
        desc: ['정보를 교차 확인하고, 익숙한 시선 밖의', '새로운 레퍼런스까지 탐색하기.'],
        side: 'right',
      },
    ],
  },
  {
    word: 'WORKFLOW OPTIMIZATION',
    tools: [
      {
        name: 'Antigravity',
        logo: '/logos/antigravity.svg',
        role: 'Optimize',
        desc: ['커진 프로젝트의 구조를 정리하고,', '여러 파일의 수정 흐름을 한 번에 연결하기.'],
        side: 'left',
      },
    ],
  },
]
// mTop/mLeft — 모바일에서 화면 밖으로 잘리지 않는 좌표
const PILLS = [
  { text: 'Claude In The Loop', top: '22%', left: '64%', mTop: '17%', mLeft: '8%', speed: 0.6 },
  { text: 'Prompt To Product', top: '45%', left: '68%', mTop: '40%', mLeft: '42%', speed: 1.5, accent: true },
  { text: 'Idea To Launch, Fast', top: '58%', left: '8%', mTop: '61%', mLeft: '6%', speed: 1 },
  { text: 'Human Finish', top: '76%', left: '45%', mTop: '83%', mLeft: '48%', speed: 1.9 },
]

// 카드가 아닌, 디자인 프로세스를 설명하는 에디토리얼 노트 — 이미지 자리를 대신함
function AINote({ tool }) {
  return (
    <aside
      className={`ai-note is-${tool.side}`}
      aria-label={`${tool.name} — ${tool.role}`}
    >
      <span className="ai-note-head">
        <img className="ai-note-logo" src={tool.logo} alt="" />
        <span className="ai-note-name">{tool.name}</span>
      </span>
      <p className="ai-note-role">{tool.role}</p>
      <p className="ai-note-desc">
        {tool.desc.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {i > 0 && ' '}
            {line}
          </span>
        ))}
      </p>
    </aside>
  )
}

export default function AICapability() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia(section)

    // 각 줄의 초대형 단어 — 홀짝 번갈아 좌우로 흐르는 패럴랙스 (양쪽 공통, 절제된 이동)
    const wordParallax = () => {
      gsap.utils.toArray('.ai-word').forEach((word, i) => {
        const dir = i % 2 ? -1 : 1
        gsap.fromTo(
          word,
          { xPercent: 4 * dir },
          {
            xPercent: -4 * dir,
            ease: 'none',
            scrollTrigger: {
              trigger: word.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }

    mm.add('(min-width: 769px)', () => {
      wordParallax()

      // AI 노트 — 스크롤에 따라 하나씩 나타났다 다음으로 이어짐 (opacity + y + 약한 blur만)
      gsap.utils.toArray('.ai-note').forEach((note) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: note.parentElement,
              start: 'top 72%',
              end: 'bottom 30%',
              scrub: true,
            },
          })
          .fromTo(
            note,
            { opacity: 0, y: 18, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.3, ease: 'none' },
          )
          .to(note, { opacity: 1, duration: 0.45, ease: 'none' })
          .to(note, { opacity: 0, y: -12, duration: 0.25, ease: 'none' })
      })

      // 알약 라벨 — 섹션 전체를 가로질러 서로 다른 속도로 떠오름
      gsap.utils.toArray('.ai-pill').forEach((pill) => {
        const speed = Number(pill.dataset.speed) || 1
        gsap.fromTo(
          pill,
          { y: 130 * speed, rotation: 4 * speed },
          {
            y: -130 * speed,
            rotation: -4 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    })

    // 모바일 — 노트는 스크럽·블러 없이 한 번 페이드 인, 알약은 회전 없이 약한 이동만
    mm.add('(max-width: 768px)', () => {
      wordParallax()

      gsap.utils.toArray('.ai-note').forEach((note) => {
        gsap.fromTo(
          note,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: note, start: 'top 85%' },
          },
        )
      })

      gsap.utils.toArray('.ai-pill').forEach((pill) => {
        const speed = Number(pill.dataset.speed) || 1
        gsap.fromTo(
          pill,
          { y: 36 * speed },
          {
            y: -36 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="ai-capability">
      <span className="section-label">AI CAPABILITY</span>
      <h2 className="ai-heading">
        <span>{HEADING.light}</span>
        <strong>{HEADING.bold}</strong>
      </h2>
      <div className="ai-rows">
        {ROWS.map((row) => (
          <div key={row.word} className="ai-row">
            <h3 className="ai-word">{row.word}</h3>
            {row.tools.map((tool) => (
              <AINote key={tool.name} tool={tool} />
            ))}
          </div>
        ))}
      </div>
      {PILLS.map((p) => (
        <span
          key={p.text}
          className={`ai-pill ${p.accent ? 'is-accent' : ''}`}
          data-speed={p.speed}
          style={{ top: p.top, left: p.left, '--m-top': p.mTop, '--m-left': p.mLeft }}
        >
          {p.text}
        </span>
      ))}
    </section>
  )
}
