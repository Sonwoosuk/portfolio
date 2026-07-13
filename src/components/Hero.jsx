import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MetaBalls from './MetaBalls'
import GalleryScene from './GalleryScene'
import Shuffle from './Shuffle'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const wrapRef = useRef(null)
  const headlineRef = useRef(null)
  const fadeRef = useRef(null)
  const progressRef = useRef(0)
  const zoomRef = useRef(1)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      onUpdate: (self) => {
        const p = self.progress
        progressRef.current = p
        zoomRef.current = 1 + Math.pow(p, 1.5) * 14
        if (headlineRef.current) {
          headlineRef.current.style.opacity = String(Math.max(0, 1 - p * 4))
        }
        if (fadeRef.current) {
          // 마지막 구간에서 TV 꺼지듯 어둡게 전환
          fadeRef.current.style.opacity = String(
            Math.min(1, Math.max(0, (p - 0.78) / 0.22)),
          )
        }
      },
    })
    return () => st.kill()
  }, [])

  return (
    <section ref={wrapRef} className="hero">
      <GalleryScene progressRef={progressRef} />
      <MetaBalls
        color="#ffffff"
        cursorBallColor="#ffffff"
        inverted
        feather={0.6}
        zoomRef={zoomRef}
        cursorBallSize={5}
        ballCount={30}
        animationSize={18}
        enableMouseInteraction={true}
        enableTransparency={true}
        hoverSmoothness={0.25}
        clumpFactor={0.9}
        speed={0.1}
      />
      <h1 ref={headlineRef} className="hero-headline">
        <Shuffle
          text="EASY ON THE EYES,"
          tag="span"
          textAlign="left"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          ease="power3.out"
          stagger={0.03}
          threshold={0}
          rootMargin="0px"
          loop={true}
          loopDelay={1.5}
          triggerOnce={true}
          triggerOnHover={false}
          respectReducedMotion={true}
        />
        <br />
        <Shuffle
          text="HARD TO FORGET."
          tag="span"
          textAlign="left"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          ease="power3.out"
          stagger={0.03}
          threshold={0}
          rootMargin="0px"
          loop={true}
          loopDelay={1.5}
          triggerOnce={true}
          triggerOnHover={false}
          respectReducedMotion={true}
        />
      </h1>
      <div ref={fadeRef} className="hero-fade" />
    </section>
  )
}
