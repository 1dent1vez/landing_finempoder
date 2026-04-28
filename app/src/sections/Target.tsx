import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Target() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image parallax + entrance
      gsap.fromTo(
        imageRef.current,
        { x: 40, opacity: 0 },
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

      // Parallax (reversed)
      gsap.to(imageRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Text stagger
      const textEls = [labelRef.current, headlineRef.current, bodyRef.current, highlightRef.current];
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
      id="para-quien"
      className="bg-crema py-32 lg:py-40"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text */}
          <div className="lg:w-[55%]">
            <span
              ref={labelRef}
              className="font-mono font-medium text-xs tracking-[0.1em] text-frambuesa uppercase opacity-0"
            >
              Nuestra comunidad
            </span>

            <h2
              ref={headlineRef}
              className="mt-4 font-display font-bold text-[clamp(36px,4vw,56px)] leading-tight text-cacao opacity-0"
            >
              Creado para
              <br />
              estudiantes.
              <br />
              Abierto a todos.
            </h2>

            <p
              ref={bodyRef}
              className="mt-6 font-body text-[17px] leading-[1.7] text-cacao/80 max-w-lg opacity-0"
            >
              Creado originalmente pensando en los estudiantes del Instituto
              Tecnológico de Toluca (ITT), pero abierto a cualquier joven o
              estudiante que quiera dejar de llegar a fin de mes con la cuenta en
              ceros. No necesitas conocimientos previos en finanzas para empezar.
            </p>

            <div
              ref={highlightRef}
              className="mt-8 bg-mantequilla/20 border-l-4 border-mantequilla py-5 px-6 rounded-r-xl opacity-0"
            >
              <p className="font-display font-medium text-base text-cacao">
                No necesitas conocimientos previos en finanzas para empezar.
              </p>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="lg:w-[45%] opacity-0">
            <img
              src="/assets/students-celebrate.jpg"
              alt="Estudiantes celebrando su educación financiera"
              className="w-full rounded-2xl shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
