import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline scale entrance
      gsap.fromTo(
        headlineRef.current,
        { scale: 0.95, opacity: 0 },
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

      // Body fade
      gsap.fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Button bounce
      gsap.fromTo(
        btnRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.6)',
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Link fade
      gsap.fromTo(
        linkRef.current,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
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
      className="bg-mantequilla py-28 lg:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-[clamp(40px,6vw,72px)] leading-tight text-cacao opacity-0"
        >
          Tu futuro financiero
          <br />
          empieza ahora.
        </h2>

        <p
          ref={bodyRef}
          className="mt-6 font-body text-lg text-cacao/80 max-w-[480px] mx-auto opacity-0"
        >
          Únete a miles de estudiantes que ya están tomando el control de su
          dinero con FinEmpoder.
        </p>

        <a
          ref={btnRef}
          href="https://app.finempoder.com.mx/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 font-display font-medium text-lg bg-cacao text-crema px-10 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(45,27,46,0.25)] transition-all duration-300 opacity-0"
        >
          Crear mi cuenta gratis
        </a>

        <div className="mt-5">
          <a
            ref={linkRef}
            href="https://app.finempoder.com.mx/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-cacao/70 hover:underline transition-all opacity-0"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </a>
        </div>
      </div>
    </section>
  );
}
