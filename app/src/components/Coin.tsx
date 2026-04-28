import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT_COLORS = ['#4DD0B5', '#B197FC', '#74C0FC', '#FF85B3'];

export default function Coin() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<SVGSVGElement>(null);
  const starRef = useRef<SVGPolygonElement>(null);
  const circle1Ref = useRef<SVGCircleElement>(null);
  const circle2Ref = useRef<SVGCircleElement>(null);
  const glowCircle1Ref = useRef<SVGCircleElement>(null);
  const glowCircle2Ref = useRef<SVGCircleElement>(null);
  const glowStarRef = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const coin = coinRef.current;
    if (!wrapper || !coin) return;

    // Continuous slow rotation
    const rotateTween = gsap.to(coin, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
    });

    // Scroll-driven 3D flip
    const flipTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    flipTl.to(coin, {
      rotateY: -360,
      rotateX: 15,
      duration: 1,
      ease: 'none',
    });

    // Counter-rotate star
    if (starRef.current) {
      gsap.to(starRef.current, {
        rotation: -360,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Color morphing on scroll through hero
    const colorElements = [circle1Ref.current, circle2Ref.current, starRef.current];
    const glowElements = [glowCircle1Ref.current, glowCircle2Ref.current, glowStarRef.current];
    const allColorElements = [...colorElements, ...glowElements].filter(Boolean);

    const colorTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    });

    ACCENT_COLORS.forEach((color) => {
      colorTl.to(allColorElements, {
        stroke: color,
        fill: color,
        duration: 0.25,
        ease: 'none',
      });
    });

    // Return to first color
    colorTl.to(allColorElements, {
      stroke: ACCENT_COLORS[0],
      fill: ACCENT_COLORS[0],
      duration: 0.25,
      ease: 'none',
    });

    return () => {
      rotateTween.kill();
      flipTl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) st.kill();
      });
    };
  }, []);

  const coinSvg = (
    <svg
      ref={coinRef}
      viewBox="0 0 350 350"
      className="w-full h-auto"
      style={{ willChange: 'transform' }}
    >
      {/* Base coin (shadow/depth) */}
      <circle
        ref={circle2Ref}
        cx="175"
        cy="178"
        r="140"
        fill="none"
        stroke="#4DD0B5"
        strokeWidth="12"
      />
      {/* Main coin */}
      <circle
        ref={circle1Ref}
        cx="175"
        cy="175"
        r="140"
        fill="none"
        stroke="#4DD0B5"
        strokeWidth="12"
      />
      {/* Center star */}
      <polygon
        ref={starRef}
        points="175,115 192,155 235,155 200,180 213,220 175,195 137,220 150,180 115,155 158,155"
        fill="#4DD0B5"
      />
    </svg>
  );

  return (
    <div ref={wrapperRef} className="relative" style={{ perspective: '1000px' }}>
      {/* Glow duplicate */}
      <div
        className="absolute inset-0"
        style={{ zIndex: -1, filter: 'blur(40px)', opacity: 0.35 }}
      >
        <svg
          ref={glowRef}
          viewBox="0 0 350 350"
          className="w-full h-auto"
        >
          <circle
            ref={glowCircle2Ref}
            cx="175"
            cy="178"
            r="140"
            fill="none"
            stroke="#4DD0B5"
            strokeWidth="12"
          />
          <circle
            ref={glowCircle1Ref}
            cx="175"
            cy="175"
            r="140"
            fill="none"
            stroke="#4DD0B5"
            strokeWidth="12"
          />
          <polygon
            ref={glowStarRef}
            points="175,115 192,155 235,155 200,180 213,220 175,195 137,220 150,180 115,155 158,155"
            fill="#4DD0B5"
          />
        </svg>
      </div>
      {/* Main coin */}
      {coinSvg}
    </div>
  );
}
