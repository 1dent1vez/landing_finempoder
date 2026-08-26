import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';
import { Home, BookOpen, Users, User, Play, Flame, Zap } from 'lucide-react';
import Coin from '../components/Coin';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

      // Phone entrance + gentle float
      gsap.fromTo(
        phoneRef.current,
        { y: 80, opacity: 0, rotate: 2 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.35 }
      );

      gsap.to(phoneRef.current, {
        y: -10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.5,
      });

      // Stats bar entrance (visible al cargar)
      gsap.fromTo(
        statsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.8 }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16 bg-gradient-to-br from-[#FF9E3D] via-mango to-mantequilla"
    >
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,transparent_40%,rgba(45,27,46,0.07)_100%)] pointer-events-none" />

      {/* Decorative shapes */}
      <div className="absolute top-24 right-[8%] w-10 h-10 rounded-lg bg-white/30 rotate-12 pointer-events-none hidden md:block" />
      <div className="absolute bottom-40 left-[4%] w-6 h-6 rounded-full bg-white/40 pointer-events-none hidden md:block" />
      <div className="absolute top-1/3 left-[45%] w-4 h-4 rounded-full bg-cacao/10 pointer-events-none hidden md:block" />
      <div className="absolute -right-6 top-16 w-40 h-40 opacity-25 pointer-events-none hidden lg:block">
        <Coin />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-12 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Column (móvil: centrada, distribución estilo HelloChinese) */}
          <div className="max-w-xl mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="inline-block font-mono font-medium text-xs tracking-[0.1em] text-crema uppercase bg-cacao px-4 py-1.5 rounded-full">
              100% gratis
            </span>

            <h1 className="mt-4 lg:mt-6 font-display leading-[1.04] tracking-tight">
              <span
                ref={headline1Ref}
                className="block text-[clamp(32px,8vw,88px)] font-black text-cacao opacity-0"
              >
                El dinero no se enseña en la escuela.
              </span>
              <span
                ref={headline2Ref}
                className="block mt-3 text-[clamp(20px,6vw,40px)] font-medium text-cacao/85 opacity-0"
              >
                Lo aprendemos aquí.
                <br />
                <span className="text-cacao font-bold">Gratis, para todos.</span>
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-8 font-body text-lg leading-relaxed text-cacao/90 max-w-[480px] opacity-0 hidden md:block"
            >
              La app de educación financiera con datos y casos reales. Aprende
              presupuesto, ahorro e inversión a tu ritmo, gana recompensas y
              toma el control de tu dinero, sin pagar nada.
            </p>

            <div
              ref={ctaRef}
              className="mt-6 lg:mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-4 opacity-0"
            >
              <Link
                to="/mantenimiento"
                className="inline-block font-display font-medium text-sm lg:text-base bg-cacao text-crema px-6 lg:px-8 py-3.5 lg:py-4 rounded-full hover:bg-[#1f1420] hover:scale-[1.03] transition-all duration-300 shadow-lg"
              >
                Crear mi cuenta gratis
              </Link>
              <Link
                to="/mantenimiento"
                className="inline-block font-display font-medium text-sm lg:text-base text-cacao border-2 border-cacao/50 bg-white/40 backdrop-blur-sm px-6 lg:px-8 py-3.5 lg:py-4 rounded-full hover:border-cacao/80 hover:bg-white/60 transition-all duration-300"
              >
                Explorar sin cuenta
              </Link>
            </div>
          </div>

          {/* Phone Mockup Column */}
          <div ref={phoneRef} className="relative w-[250px] sm:w-[330px] mx-auto opacity-0">
            {/* Aura */}
            <div className="absolute -inset-10 bg-white/40 blur-3xl rounded-full" />

            {/* Phone frame */}
            <div className="relative bg-cacao rounded-[2.4rem] sm:rounded-[2.8rem] p-2.5 sm:p-3 shadow-2xl rotate-2">
              <div className="mx-auto mb-2 w-20 sm:w-24 h-5 sm:h-6 bg-cacao rounded-full border border-white/10" />
              <div className="bg-crema rounded-[1.9rem] sm:rounded-[2.2rem] overflow-hidden">
                {/* App header */}
                <div className="px-4 sm:px-5 pt-5 sm:pt-6 pb-2 flex items-center justify-between">
                  <span className="font-display font-bold text-sm sm:text-[15px] text-cacao">
                    FinEmpoder
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-cacao bg-mantequilla/70 px-2.5 py-1 rounded-full mt-1">
                    <Flame className="w-3.5 h-3.5 text-frambuesa" />
                    3
                  </span>
                </div>

                <div className="px-4 sm:px-5 pt-2">
                  <p className="font-display font-semibold text-[15px] sm:text-[17px] text-cacao leading-snug">
                    Listo para tu lección de hoy.
                  </p>
                </div>

                {/* Lesson card 1 */}
                <div className="mx-4 sm:mx-5 mt-3 sm:mt-4 rounded-2xl bg-white p-3.5 sm:p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-menta">
                      Presupuesto
                    </span>
                    <span className="text-[10px] text-cacao/50 font-medium">45 min</span>
                  </div>
                  <p className="mt-1.5 font-display font-semibold text-[14px] sm:text-[15px] text-cacao leading-snug">
                    La regla 50/30/20 para tu quincena
                  </p>
                  <div className="mt-3 h-1.5 w-full bg-cacao/10 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-menta rounded-full" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-cacao/50 font-medium">+40 XP</span>
                    <span className="flex items-center gap-1.5 bg-cacao text-crema text-[11px] font-semibold px-3 py-1.5 rounded-full">
                      <Play className="w-3 h-3" />
                      Continuar
                    </span>
                  </div>
                </div>

                {/* Lesson card 2 (solo >= sm: en móvil se muestra una, como la referencia) */}
                <div className="hidden sm:block mx-5 mt-3 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-lavanda">
                      Ahorro
                    </span>
                    <span className="text-[10px] text-cacao/50 font-medium">1 sem</span>
                  </div>
                  <p className="mt-1.5 font-display font-semibold text-[15px] text-cacao leading-snug">
                    Gastos hormiga: a dónde se va tu dinero
                  </p>
                  <div className="mt-3 h-1.5 w-full bg-cacao/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-lavanda rounded-full" />
                  </div>
                </div>

                {/* Tab bar */}
                <div className="mt-3 sm:mt-4 border-t border-cacao/10 bg-white/80 px-7 sm:px-8 py-2 sm:py-3 flex items-center justify-between">
                  <Home className="w-5 h-5 text-cacao/40" />
                  <BookOpen className="w-5 h-5 text-cacao" />
                  <Users className="w-5 h-5 text-cacao/40" />
                  <User className="w-5 h-5 text-cacao/40" />
                </div>
              </div>
            </div>

            {/* Floating XP card (solo >= sm para no tapar el mockup en móvil) */}
            <div className="hidden sm:flex absolute -left-12 top-36 bg-white rounded-xl shadow-lg px-3.5 py-2.5 items-center gap-2 rotate-[-6deg]">
              <Zap className="w-4 h-4 text-mango" />
              <span className="text-xs font-bold text-cacao">+120 XP</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="relative mt-8 lg:mt-20 -mb-16 lg:-mb-20 bg-white rounded-3xl shadow-xl px-6 py-5 lg:py-6 grid grid-cols-3 divide-x divide-cacao/20 opacity-0"
        >
          <div className="text-center px-2">
            <p className="font-display font-black text-[clamp(24px,3.5vw,44px)] text-cacao leading-none">
              45
            </p>
            <p className="mt-1.5 font-body text-xs sm:text-sm text-cacao/60">
              lecciones interactivas
            </p>
          </div>
          <div className="text-center px-2">
            <p className="font-display font-black text-[clamp(24px,3.5vw,44px)] text-cacao leading-none">
              3
            </p>
            <p className="mt-1.5 font-body text-xs sm:text-sm text-cacao/60">
              módulos: presupuesto, ahorro, inversión
            </p>
          </div>
          <div className="text-center px-2">
            <p className="font-display font-black text-[clamp(24px,3.5vw,44px)] text-cacao leading-none">
              100%
            </p>
            <p className="mt-1.5 font-body text-xs sm:text-sm text-cacao/60">
              gratis, siempre
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}