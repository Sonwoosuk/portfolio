import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WORKS } from '../data/works'
import './WorkDetail.css'

gsap.registerPlugin(ScrollTrigger)

// 작품 세부 페이지 (roshan-sahu.com 컨셉 — 밝은 바탕 · 헤어라인 · 얇은 대형 타이포)
// 흐름: 작은 스냅샷이 돌며 등장 → 왼쪽 README 발췌 설명 → 기능 캡처 →
// 풀페이지 자동 스크롤(영상 느낌) → 이미지가 화면을 꽉 채우면 라이브 사이트가 그대로 로딩
export default function WorkDetail() {
  const { slug } = useParams()
  const work = WORKS.find((w) => w.slug === slug)
  const next = work ? WORKS[(WORKS.indexOf(work) + 1) % WORKS.length] : null
  const rootRef = useRef(null)

  useEffect(() => {
    if (!work) return
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      // 인트로 — 아주 작은 스냅샷이 빙글 돌며 날아와 자리잡음
      const tl = gsap.timeline()
      tl.fromTo(
        '.wd-snap',
        { scale: 0.08, rotation: -480, yPercent: 40, autoAlpha: 0 },
        {
          scale: 1,
          rotation: 0,
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.7,
          ease: 'power3.out',
        },
      ).fromTo(
        '.wd-title, .wd-intro-left > *',
        { y: 36, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.7, ease: 'power2.out' },
        '-=1.0',
      )
      // 자리잡은 뒤엔 은은하게 둥둥
      gsap.to('.wd-snap', {
        y: -12,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.8,
      })

      // 공통 스크롤 리빌
      gsap.utils.toArray('.wd-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 56, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 86%' },
          },
        )
      })

      // 풀페이지 자동 스크롤 — 섹션이 화면에 들어온 뒤에야 처음부터 재생
      const cast = root.querySelector('.wd-scrollcast')
      if (cast) {
        ScrollTrigger.create({
          trigger: cast,
          start: 'top 60%',
          once: true,
          onEnter: () => cast.classList.add('is-cast'),
        })
      }

      // 피날레 — 프레임이 화면을 꽉 채울 때까지 커지고, 다 차면 라이브 사이트 활성화
      const finale = root.querySelector('.wd-finale')
      if (finale) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: finale,
              start: 'top top',
              end: '+=150%', // 라이브 전환은 짧게 — 기능 캡처는 FEATURES에서 충분히 보여줌
              pin: true,
              scrub: 0.5,
              onUpdate: (self) => {
                finale.classList.toggle('is-live', self.progress > 0.9)
              },
            },
          })
          .fromTo(
            '.wd-finale-frame',
            { scale: 0.55 },
            { scale: 1, ease: 'none' },
          )
          .to({}, { duration: 0.6 })
      }
    }, root)

    // 이미지(특히 대용량 GIF)가 늦게 로드되면 페이지 높이가 바뀌어
    // 핀·리빌 위치가 전부 어긋남 — 로드될 때마다 트리거 위치 재계산
    const imgs = Array.from(root.querySelectorAll('img')).filter((img) => !img.complete)
    const onImgLoad = () => ScrollTrigger.refresh()
    imgs.forEach((img) => img.addEventListener('load', onImgLoad, { once: true }))

    return () => {
      imgs.forEach((img) => img.removeEventListener('load', onImgLoad))
      ctx.revert()
    }
  }, [work])

  if (!work) {
    return (
      <div className="work-detail wd-missing">
        <p>[ 404 — WORK NOT FOUND ]</p>
        <Link to="/">← BACK TO INDEX</Link>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="work-detail">
      {/* 상단 바 */}
      <header className="wd-top">
        <Link to="/" state={{ fromWork: true }} className="wd-back">
          ← INDEX
        </Link>
        <span className="wd-top-label">
          [ WORK {work.index} — {work.title} ]
        </span>
        {work.live ? (
          <a href={work.live} target="_blank" rel="noreferrer" className="wd-visit">
            VISIT LIVE ↗
          </a>
        ) : (
          <span />
        )}
      </header>

      {/* 인트로 — 왼쪽 설명 + 오른쪽 스냅샷 */}
      <section className="wd-intro">
        <h1 className="wd-title">{work.title}</h1>
        <div className="wd-intro-left">
          <span className="wd-label">[ WORK {work.index} ]</span>
          <ul className="wd-tags">
            {work.tags.map((t) => (
              <li key={t} className={/kakao/i.test(t) ? 'wd-tag-featured' : undefined}>
                {t}
              </li>
            ))}
          </ul>
          {work.intro && <p className="wd-desc">{work.intro}</p>}
          {work.pending && <p className="wd-pending">[ CONTENT IN PREPARATION ]</p>}
          {work.overview && (
            <dl className="wd-overview">
              {work.overview.map((o) => (
                <div key={o.k}>
                  <dt>{o.k}</dt>
                  <dd>{o.v}</dd>
                </div>
              ))}
            </dl>
          )}
          {(work.live || work.github || work.plan || work.design) && (
            <div className="wd-links">
              {work.live && (
                <a href={work.live} target="_blank" rel="noreferrer" className="wd-link-live">
                  VISIT LIVE SITE ↗
                </a>
              )}
              {work.github && (
                <a href={work.github} target="_blank" rel="noreferrer" className="wd-link-git">
                  GITHUB ↗
                </a>
              )}
              {work.plan && (
                <a href={work.plan} target="_blank" rel="noreferrer" className="wd-link-git">
                  기획서 ↗
                </a>
              )}
              {work.design && (
                <a href={work.design} target="_blank" rel="noreferrer" className="wd-link-git">
                  디자인 (FIGMA) ↗
                </a>
              )}
            </div>
          )}
        </div>
        <figure className="wd-snap">
          <img src={work.hero} alt={work.title} />
          <figcaption>[ SNAPSHOT — {work.slug.toUpperCase()} ]</figcaption>
        </figure>
      </section>

      {/* 메타 정보 */}
      {work.meta && (
        <section className="wd-meta wd-reveal">
          {work.meta.map((m) => (
            <div key={m.k}>
              <span className="wd-label">{m.k}</span>
              <p>{m.v}</p>
            </div>
          ))}
        </section>
      )}

      {/* 핵심 구현 */}
      {work.highlights && (
        <section className="wd-highlights">
          <h2 className="wd-h2 wd-reveal">KEY BUILDS</h2>
          {work.highlights.map((h, i) => (
            <article key={h.t} className="wd-highlight wd-reveal">
              <span className="wd-label">{String(i + 1).padStart(2, '0')}</span>
              <h3>{h.t}</h3>
              <p>{h.d}</p>
            </article>
          ))}
        </section>
      )}

      {/* 기능 캡처 */}
      {work.features && (
        <section className="wd-features">
          <h2 className="wd-h2 wd-reveal">FEATURES</h2>
          <div className="wd-feature-grid">
            {work.features.map((f) => (
              <figure key={f.img} className="wd-feature wd-reveal">
                <img src={f.img} alt={f.caption} loading="lazy" />
                <figcaption>[ {f.caption} ]</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* 영상 작업 */}
      {work.videos && (
        <section className="wd-reels">
          <h2 className="wd-h2 wd-reveal">VIDEO</h2>
          <div className="wd-reel-grid">
            {work.videos.map((v) => (
              <video key={v} src={v} autoPlay muted loop playsInline className="wd-reveal" />
            ))}
          </div>
        </section>
      )}

      {/* 풀페이지 자동 스크롤 — 영상처럼 사이트 전체를 훑음 */}
      {work.fullpage && (
        <section className="wd-scrollcast wd-reveal">
          <h2 className="wd-h2">FULL PAGE</h2>
          <div className="wd-browser">
            <div className="wd-browser-bar">
              <i />
              <i />
              <i />
              <span>{work.live?.replace('https://', '')}</span>
            </div>
            <div className="wd-browser-view">
              <img src={work.fullpage} alt={`${work.title} full page`} loading="lazy" />
            </div>
          </div>
        </section>
      )}

      {/* 피날레 — 화면을 꽉 채우면 라이브 사이트가 그대로 로딩 */}
      {work.live && (
        <section className="wd-finale">
          <div className="wd-finale-frame">
            <img src={work.hero} alt="" className="wd-finale-shot" />
            <iframe
              src={work.live}
              title={work.title}
              loading="lazy"
              className="wd-finale-live"
            />
            <a
              href={work.live}
              target="_blank"
              rel="noreferrer"
              className="wd-finale-open"
            >
              ENTER REAL SITE ↗
            </a>
          </div>
          <span className="wd-finale-hint">[ KEEP SCROLLING — LOADING LIVE SITE ]</span>
        </section>
      )}

      {/* 다음 작품 */}
      <footer className="wd-next">
        <span className="wd-label">[ NEXT WORK ]</span>
        <Link to={`/works/${next.slug}`} className="wd-next-title">
          {next.title} →
        </Link>
        <Link to="/" state={{ fromWork: true }} className="wd-next-index">
          BACK TO INDEX
        </Link>
      </footer>
    </div>
  )
}
