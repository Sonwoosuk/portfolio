import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FallingText.css';

gsap.registerPlugin(ScrollTrigger);

const FallingText = ({
  className = '',
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem'
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const [effectStarted, setEffectStarted] = useState(false);
  const reassembleRef = useRef(null);
  const dropRef = useRef(null);
  const stateRef = useRef('intact');

  // 섹션을 고정(pin)하고 스크롤 진행도에 따라 상태 전환:
  // 0~5% 멀쩡함 / 5~60% 와장창 / 60%~ 재정렬 — 위로 스크롤하면 역방향으로도 전환
  useEffect(() => {
    if (!containerRef.current) return;
    const pinTarget =
      containerRef.current.closest('section') || containerRef.current;
    const st = ScrollTrigger.create({
      trigger: pinTarget,
      start: 'top top',
      end: '+=200%',
      pin: true,
      onUpdate: self => {
        const p = self.progress;
        const desired = p < 0.05 ? 'intact' : p < 0.6 ? 'fallen' : 'assembled';
        if (desired === stateRef.current) return;
        if (!dropRef.current || !reassembleRef.current) return;
        if (desired === 'fallen') {
          dropRef.current();
        } else {
          reassembleRef.current();
        }
        stateRef.current = desired;
      }
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(' ');
    const newHTML = words
      .map(word => {
        const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${word}</span>`;
      })
      .join(' ');
    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) {
      return;
    }

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    const wordSpans = textRef.current.querySelectorAll('.word');
    const wordBodies = [...wordSpans].map(elem => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2
      });

      // 스크롤로 추락이 시작되기 전까지는 제자리에 고정
      Matter.Body.setStatic(body, true);
      return { elem, body, originalX: x, originalY: y };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = 'none';
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });
    render.mouse = mouse;
    // matter 마우스가 휠·터치 스크롤을 preventDefault로 막지 않도록 해제 (드래그는 유지)
    mouse.element.removeEventListener('wheel', mouse.mousewheel);
    mouse.element.removeEventListener('touchmove', mouse.mousemove);
    mouse.element.removeEventListener('touchstart', mouse.mousedown);

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // 스크롤 지점 도달 시 원래 자리로 재정렬 (한 번만)
    const tweens = [];

    const reassemble = () => {
      tweens.forEach(t => t.kill());
      tweens.length = 0;
      wordBodies.forEach(({ body, originalX, originalY }) => {
        Matter.Body.setStatic(body, true);
        // 누적된 회전각을 한 바퀴 이내로 정규화해서 과회전 없이 복귀
        const normalizedAngle =
          body.angle - Math.round(body.angle / (Math.PI * 2)) * Math.PI * 2;
        Matter.Body.setAngle(body, normalizedAngle);
        const proxy = { x: body.position.x, y: body.position.y, angle: normalizedAngle };
        tweens.push(
          gsap.to(proxy, {
            x: originalX,
            y: originalY,
            angle: 0,
            duration: 1.2,
            ease: 'power3.inOut',
            onUpdate: () => {
              Matter.Body.setPosition(body, { x: proxy.x, y: proxy.y });
              Matter.Body.setAngle(body, proxy.angle);
            }
          })
        );
      });
    };

    reassembleRef.current = reassemble;

    const drop = () => {
      tweens.forEach(t => t.kill());
      tweens.length = 0;
      wordBodies.forEach(({ body }) => {
        Matter.Body.setStatic(body, false);
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 5,
          y: 0
        });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
      });
    };
    dropRef.current = drop;

    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine);
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      reassembleRef.current = null;
      dropRef.current = null;
      stateRef.current = 'intact';
      tweens.forEach(t => t.kill());
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{
          fontSize: fontSize,
          lineHeight: 1.4
        }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
