import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image parallax + entrance
      gsap.fromTo(
        imageRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
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

      // Parallax on image
      gsap.to(imageRef.current, {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Text stagger
      const textEls = [labelRef.current, headlineRef.current, bodyRef.current, ctaRef.current];
      gsap.fromTo(
        textEls,
        { y: 40, opacity: 0 },
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
      id="sobre"
      className="bg-crema py-32 lg:py-40"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image */}
          <div ref={imageRef} className="lg:w-[40%] opacity-0">
            <img
              src="/assets/hero-main.jpg"
              alt="Estudiante gestionando sus finanzas"
              className="w-full rounded-2xl shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="lg:w-[60%]">
            <span
              ref={labelRef}
              className="font-mono font-medium text-xs tracking-[0.1em] text-frambuesa uppercase opacity-0"
            >
              Sobre el proyecto
            </span>

            <h2
              ref={headlineRef}
              className="mt-4 font-display font-bold text-[clamp(36px,4vw,56px)] leading-tight text-cacao opacity-0"
            >
              No es un curso.
              <br />
              Es una experiencia.
            </h2>

            <p
              ref={bodyRef}
              className="mt-6 font-body text-[17px] leading-[1.7] text-cacao/80 max-w-lg opacity-0"
            >
              FinEmpoder no es un curso teórico y aburrido; es una experiencia
              interactiva y práctica. Cubrimos desde lo más básico (¿cómo armar un
              presupuesto desde cero?) hasta las decisiones más importantes a largo
              plazo (estrategias de ahorro, inversión y hábitos de gasto
              inteligente). Todo a través de lecciones dinámicas, herramientas
              integradas y un sistema que recompensa constantemente tu esfuerzo.
            </p>

            <a
              ref={ctaRef}
              href="https://www.finempoder.com.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 font-display font-medium text-base text-cacao relative group opacity-0"
            >
              Explorar módulos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-frambuesa transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
