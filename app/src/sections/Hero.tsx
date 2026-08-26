import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';
import Coin from '../components/Coin';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const coinContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline entrance
      gsap.fromTo(
        headline1Ref.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo(
        headline2Ref.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.22 }
      );

      // Subtitle and CTA
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.4 }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.5 }
      );

      // Coin entrance
      gsap.fromTo(
        coinContainerRef.current,
        { scale: 0.8, rotation: -15, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.2,
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-crema flex items-center pt-16"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 py-20 lg:py-0">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Column */}
          <div className="flex-1 max-w-xl">
            <h1 className="font-display font-bold leading-[1.05] tracking-tight">
              <span
                ref={headline1Ref}
                className="block text-[clamp(42px,6vw,84px)] text-cacao opacity-0"
              >
                El dinero no se enseña
                <br />
                en la escuela.
              </span>
              <span
                ref={headline2Ref}
                className="block text-[clamp(42px,6vw,84px)] opacity-0"
              >
                <span className="text-cacao">Lo aprendemos aquí.</span>
                <br />
                <span className="text-mango">Gratis, para todo México.</span>
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-10 lg:mt-16 font-body text-lg leading-relaxed text-cacao/75 max-w-[480px] opacity-0"
            >
              La app de educación financiera hecha para México, con datos y casos
              reales del país. Aprende presupuesto, ahorro e inversión a tu ritmo,
              gana recompensas y toma el control de tu dinero, sin pagar nada.
            </p>

            <Link
              ref={ctaRef}
              to="/mantenimiento"
              className="inline-block mt-8 font-display font-medium text-base bg-cacao text-crema px-8 py-3.5 rounded-full hover:bg-mango hover:scale-[1.03] transition-all duration-300 opacity-0"
            >
              Crear mi cuenta gratis
            </Link>

            <Link
              to="/mantenimiento"
              className="inline-block mt-4 font-body text-sm text-cacao/60 hover:text-cacao transition-colors duration-300"
            >
              Explorar sin cuenta
            </Link>
          </div>

          {/* Coin Column */}
          <div
            ref={coinContainerRef}
            className="w-[280px] sm:w-[350px] lg:w-[min(45vw,500px)] opacity-0"
          >
            <Coin />
          </div>
        </div>
      </div>
    </section>
  );
}