import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, BookOpen, Users, User, Play, Flame, CircleDollarSign, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Colores de la paleta de la app, asignados con psicología del color:
// Presupuesto = amarillo/mango (claridad, atención, control)
// Ahorro     = verde menta (crecimiento, abundancia, calma)
// Inversión  = azul cielo (confianza, estabilidad, visión a largo plazo)
// Metas      = lavanda/morado (constancia, sabiduría, transformación)
const SLIDES = [
  {
    tag: 'Presupuesto',
    dot: 'bg-mango',
    bar: 'bg-mango',
    time: '45 min',
    title: 'La regla 50/30/20 para tu quincena',
    xp: '+40 XP',
    progress: 'w-2/3',
    bg: '#F5B842', // mango
    fg: 'text-cacao',
  },
  {
    tag: 'Ahorro',
    dot: 'bg-menta',
    bar: 'bg-menta',
    time: '1 sem',
    title: 'Gastos hormiga: a dónde se va tu dinero',
    xp: '+30 XP',
    progress: 'w-1/3',
    bg: '#4DD0B5', // menta
    fg: 'text-cacao',
  },
  {
    tag: 'Inversión',
    dot: 'bg-cielo',
    bar: 'bg-cielo',
    time: '20 min',
    title: 'Interés compuesto: tu dinero trabajando',
    xp: '+80 XP',
    progress: 'w-1/2',
    bg: '#74C0FC', // cielo
    fg: 'text-cacao',
  },
  {
    tag: 'Metas',
    dot: 'bg-lavanda',
    bar: 'bg-lavanda',
    time: '5 min',
    title: 'Tu racha y tu meta diaria, contigo',
    xp: '+15 XP',
    progress: 'w-3/4',
    bg: '#B197FC', // lavanda
    fg: 'text-cacao',
  },
];

const SLIDE_MS = 4000;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  // Rotación del contenido del teléfono (cada SLIDE_MS)
  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline entrance
      gsap.fromTo(
        headline1Ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo(
        headline2Ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.22 }
      );

      // Phone entrance (sin float, sin rotación)
      gsap.fromTo(
        phoneRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.35 }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      {/* Fondo sólido sincronizado con la pantalla activa (sin degradado) */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: SLIDES[slide].bg }}
      />

      {/* Decoración sutil: formas del mismo tono, semitransparentes */}
      <div className="absolute top-24 right-[8%] w-10 h-10 rounded-lg bg-white/25 rotate-12 pointer-events-none hidden md:block" />
      <div className="absolute bottom-44 left-[4%] w-6 h-6 rounded-full bg-white/25 pointer-events-none hidden md:block" />
      <div className="absolute top-1/3 left-[42%] w-4 h-4 rounded-full bg-cacao/10 pointer-events-none hidden md:block" />
      <div className="absolute bottom-32 right-[14%] w-8 h-8 rounded-full bg-white/20 pointer-events-none hidden md:block" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-8 lg:py-10">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-14 items-center">
          {/* Text Column (móvil: centrada; solo copy, sin botones) */}
          <div className="max-w-xl mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="inline-block font-mono font-medium text-xs tracking-[0.1em] text-crema uppercase bg-cacao px-4 py-1.5 rounded-full">
              100% gratis
            </span>

            <h1 className="mt-3 lg:mt-6 font-display leading-[1.04] tracking-tight">
                          <span
                            ref={headline1Ref}
                            className="block text-[clamp(30px,8vw,88px)] font-black text-cacao opacity-0"
                          >
                            El dinero no se enseña en la escuela.
                          </span>
                          <span
                            ref={headline2Ref}
                            className="block mt-2 lg:mt-3 text-[clamp(19px,6vw,40px)] font-medium text-cacao/85 opacity-0"
                          >
                Lo aprendemos aquí.
                <br />
                <span className="text-cacao font-bold">Gratis, para todos.</span>
              </span>
            </h1>
          </div>

          {/* Phone Mockup: proporción real de smartphone, derecho */}
          <div ref={phoneRef} className="relative w-[235px] sm:w-[290px] mx-auto opacity-0">
            {/* Phone frame */}
            <div className="relative bg-black/90 rounded-[2.6rem] sm:rounded-[2.9rem] p-2.5 sm:p-3 shadow-2xl">
              {/* Dynamic island */}
              <div className="mx-auto mb-1.5 sm:mb-2 w-20 sm:w-24 h-5 sm:h-6 bg-black rounded-full border border-white/10" />
              {/* Pantalla con proporción de teléfono real (9:19) */}
              <div className="bg-white rounded-[2rem] sm:rounded-[2.2rem] overflow-hidden flex flex-col aspect-[9/18.5]">
                {/* App header */}
                <div className="px-5 pt-5 pb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-display font-bold text-[15px] text-cacao">
                    <CircleDollarSign className="w-5 h-5 text-mango" />
                    FinEmpoder
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-cacao bg-mantequilla/70 px-2.5 py-1 rounded-full">
                    <Flame className="w-3.5 h-3.5 text-frambuesa" />
                    3
                  </span>
                </div>

                <div className="px-5 pt-1.5">
                  <p className="font-display font-semibold text-[16px] text-cacao leading-snug">
                    Listo para tu lección de hoy.
                  </p>
                </div>

                {/* Slides con crossfade (llenan el área flexible) */}
                <div className="grid flex-1 px-4 sm:px-5 mt-3 sm:mt-4 pb-1">
                  {SLIDES.map((s, i) => (
                    <div
                      key={s.tag}
                      className={`col-start-1 row-start-1 flex transition-opacity duration-500 ${
                        i === slide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="flex-1 flex flex-col rounded-2xl bg-crema p-4 border border-cacao/5">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cacao/70">
                            <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                            {s.tag}
                          </span>
                          <span className="text-[10px] text-cacao/50 font-medium">{s.time}</span>
                        </div>
                        <p className="mt-2 font-display font-semibold text-[14px] sm:text-[15px] text-cacao leading-snug">
                          {s.title}
                        </p>
                        <div className="mt-3 h-1.5 w-full bg-cacao/10 rounded-full overflow-hidden">
                          <div className={`h-full ${s.progress} ${s.bar} rounded-full`} />
                        </div>

                        {/* Meta diaria (componente fijo de la app) */}
                        <div className="mt-3 rounded-xl bg-white/80 border border-cacao/5 px-3 py-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-cacao/70">
                              <Target className="w-3.5 h-3.5 text-frambuesa" />
                              Meta diaria
                            </span>
                            <span className="text-[10px] text-cacao/50 font-medium">1 lección</span>
                          </div>
                          <div className="mt-1.5 h-1 w-full bg-cacao/10 rounded-full overflow-hidden">
                            <div className={`h-full w-3/5 ${s.bar} rounded-full`} />
                          </div>
                        </div>

                        <div className="mt-auto pt-3 flex items-center justify-between">
                          <span className="text-[11px] text-cacao/50 font-medium">{s.xp}</span>
                          <span className="flex items-center gap-1.5 bg-cacao text-crema text-[11px] font-semibold px-3 py-1.5 rounded-full">
                            <Play className="w-3 h-3" />
                            Continuar
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tab bar */}
                <div className="mt-2 border-t border-cacao/10 bg-crema/70 px-7 sm:px-8 py-2 sm:py-3 flex items-center justify-between">
                  <Home className="w-5 h-5 text-cacao/40" />
                  <BookOpen className="w-5 h-5 text-cacao" />
                  <Users className="w-5 h-5 text-cacao/40" />
                  <User className="w-5 h-5 text-cacao/40" />
                </div>
              </div>
            </div>

            {/* Indicadores de slide */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.tag}
                  type="button"
                  onClick={() => setSlide(i)}
                  aria-label={`Lección ${s.tag}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === slide ? 'w-5 bg-cacao' : 'w-2 bg-cacao/25 hover:bg-cacao/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}