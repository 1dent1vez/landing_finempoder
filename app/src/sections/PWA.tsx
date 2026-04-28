import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PWA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image entrance
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Text stagger
      const textEls = [labelRef.current, headlineRef.current, bodyRef.current];
      gsap.fromTo(
        textEls,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-crema py-32 lg:py-40"
    >
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        {/* Image */}
        <div ref={imageRef} className="max-w-[400px] mx-auto mb-12 opacity-0">
          <img
            src="/assets/pwa-offline.jpg"
            alt="App funcionando en modo offline"
            className="w-full rounded-3xl"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <span
          ref={labelRef}
          className="font-mono font-medium text-xs tracking-[0.1em] text-menta uppercase opacity-0"
        >
          Modo Offline
        </span>

        <h2
          ref={headlineRef}
          className="mt-4 font-display font-bold text-[clamp(32px,4vw,48px)] leading-tight text-cacao opacity-0"
        >
          ¿Te quedaste sin datos?
          <br />
          No hay problema.
        </h2>

        <p
          ref={bodyRef}
          className="mt-6 font-body text-[17px] leading-[1.7] text-cacao/80 max-w-[560px] mx-auto opacity-0"
        >
          FinEmpoder está construida con tecnología PWA, lo que te permite seguir
          aprendiendo y usando tus herramientas sin conexión a internet.
        </p>
      </div>
    </section>
  );
}
