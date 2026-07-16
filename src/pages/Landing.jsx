import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import Preloader from '../components/Preloader'
import SideHeader from '../components/SideHeader'
import CustomCursor from '../components/CustomCursor'
import Grain from '../components/Grain'
import SurveillanceHUD from '../components/SurveillanceHUD'
import PaperTear from '../components/PaperTear'
import Hero from '../components/Hero'
import VelocityMarquee from '../components/VelocityMarquee'
import AboutMe from '../components/AboutMe'
import Manifesto from '../components/Manifesto'
import Skills from '../components/Skills'
import AICapability from '../components/AICapability'
import Process from '../components/Process'
import Services from '../components/Services'
import HorizontalWorks from '../components/HorizontalWorks'
import ColumnGallery from '../components/ColumnGallery'
import PortfolioChart from '../components/PortfolioChart'
import Playground from '../components/Playground'
import Epilogue from '../components/Epilogue'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// 포트폴리오 랜딩 (원페이지)
// 인트로 → 브랜드 마퀴 → 어바웃미(워드필) → 매니페스토(글리치) → 스킬 룰렛
// → AI 활용능력(톤온톤 타이포) → 프로세스 → 서비스(스택 카드) → 가로스크롤 웍스 → 그리드 티저
// → 포트폴리오 표 → 플레이그라운드(이미지 트레일) → 에필로그
export default function Landing() {
  // 사이트 전체 관성 스크롤 — 고정 요소(커서·그레인 등)는 wrapper 밖에 둠.
  // 섹션들의 pin이 transform 방식으로 잡히려면 ScrollSmoother가 먼저 만들어져야
  // 하므로, 스무더 생성 후에 섹션들을 마운트한다.
  const [smootherReady, setSmootherReady] = useState(false)
  // 작품 세부에서 INDEX로 돌아온 경우 — 로더 없이 포트폴리오 표로 바로 복귀
  const { state } = useLocation()
  const fromWork = Boolean(state?.fromWork)

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({ smooth: 1.2, effects: false })
    setSmootherReady(true)
    return () => smoother.kill()
  }, [])

  useEffect(() => {
    if (!smootherReady || !fromWork) return
    // 포트폴리오 표의 핀 구간 안, 흩어지는 연출이 끝나고 표가 완성된
    // 지점(진행도 50%)으로 바로 이동 — 물리 애니메이션을 다시 볼 필요 없게.
    // 표의 ScrollTrigger는 폰트 로딩 후 생성되므로 준비될 때까지 재시도
    let tries = 0
    let id
    const attempt = () => {
      ScrollTrigger.refresh()
      const smoother = ScrollSmoother.get()
      // 모바일은 표가 핀 없이 바로 완성돼 있으므로 섹션 상단으로 이동
      if (window.matchMedia('(max-width: 768px)').matches) {
        const el = document.querySelector('.portfolio-chart')
        if (smoother && el) {
          smoother.scrollTo(el, false, 'top top')
          window.history.replaceState(null, '')
          return
        }
        if (tries++ < 20) id = setTimeout(attempt, 100)
        return
      }
      const st = ScrollTrigger.getAll().find(
        (t) => t.trigger?.classList?.contains('portfolio-chart') && t.pin,
      )
      if (smoother && st) {
        smoother.scrollTo(st.start + (st.end - st.start) * 0.5, false)
        // 복귀 상태를 소비하고 지움 — 새로고침하면 평소처럼 로딩화면부터 시작
        window.history.replaceState(null, '')
      } else if (tries++ < 20) {
        id = setTimeout(attempt, 100)
      }
    }
    id = setTimeout(attempt, 100)
    return () => clearTimeout(id)
  }, [smootherReady, fromWork])

  return (
    <>
      {!fromWork && <Preloader />}
      <SideHeader />
      <CustomCursor />
      <Grain />
      {/* 섹션 진입마다 뜨는 감시 인터페이스 — 고정 요소라 wrapper 밖 */}
      {smootherReady && <SurveillanceHUD />}
      {smootherReady && <PaperTear />}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {smootherReady && (
            <>
              <Hero />
              <VelocityMarquee
                items={[
                  'BRANDING',
                  'UI/UX',
                  'WEB EXPERIENCE',
                  'REACT',
                  'DESIGN SYSTEM',
                  'INTERACTION',
                  'PROBLEM SOLVING',
                ]}
              />
              <AboutMe />
              <Manifesto />
              <Skills />
              <AICapability />
              <Process />
              <Services />
              <HorizontalWorks />
              <ColumnGallery />
              <PortfolioChart />
              <Playground />
              <Epilogue />
            </>
          )}
        </div>
      </div>
    </>
  )
}
