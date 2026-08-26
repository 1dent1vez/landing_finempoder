import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Home,
  BookOpen,
  Users,
  User,
  Play,
  Flame,
  Target,
  Coffee,
  Landmark,
  PiggyBank,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Slides con contenido REAL de las lecciones de la app (verificadas en el repo):
// P-L03 Gasto hormiga · A-L08 Fondo de emergencias · I-L06 CETES · Gamificación (racha + meta diaria)
// Colores de la paleta de la app asignados con psicología del color.
const SLIDES = [
  {
    tag: 'Presupuesto · L03',
    dot: 'bg-mango',
    bar: 'bg-mango',
    bg: '#F5B842', // mango: claridad, atención, control
    content: (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cacao/70">
            <span className="w-2 h-2 rounded-full bg-mango" />
            Presupuesto · L03
          </span>
          <span className="text-[10px] text-cacao/50 font-medium">Lección 3 de 15</span>
        </div>
        <p className="mt-2 font-display font-semibold text-[15px] text-cacao leading-snug">
          Gasto hormiga: el ladrón silencioso
        </p>
        <p className="mt-1.5 text-[12px] text-cacao/70 leading-relaxed">
          No te roba de golpe. Te roba de a poquito. Todos los días.
        </p>
        <div className="mt-2.5 space-y-1.5">
                  {['Café de camino', 'Snack de máquina', 'Envío exprés'].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-lg bg-white/80 border border-cacao/5 px-2.5 py-1"
                    >
                      <Coffee className="w-3.5 h-3.5 text-mango" />
                      <span className="text-[11px] text-cacao font-medium">{item}</span>
                      <span className="ml-auto text-[10px] text-cacao/50">—</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2.5">
                  <p className="text-[10px] font-semibold text-cacao/70 mb-1">Su impacto al año</p>
                  <div className="h-2 w-full bg-cacao/10 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-mango rounded-full" />
                  </div>
                </div>
                <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-[11px] text-cacao/50 font-medium">Calculadora diario → anual</span>
          <span className="flex items-center gap-1.5 bg-cacao text-crema text-[11px] font-semibold px-3 py-1.5 rounded-full">
            <Play className="w-3 h-3" />
            Continuar
          </span>
        </div>
      </div>
    ),
  },
  {
    tag: 'Ahorro · L08',
    dot: 'bg-menta',
    bar: 'bg-menta',
    bg: '#4DD0B5', // menta: crecimiento, abundancia, calma
    content: (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cacao/70">
            <span className="w-2 h-2 rounded-full bg-menta" />
            Ahorro · L08
          </span>
          <span className="text-[10px] text-cacao/50 font-medium">Lección 8 de 15</span>
        </div>
        <p className="mt-2 font-display font-semibold text-[15px] text-cacao leading-snug">
          Fondo de emergencias: tu red de seguridad
        </p>
        <p className="mt-1.5 text-[12px] text-cacao/70 leading-relaxed">
          Guarda entre 3 y 6 meses de tus gastos. Nunca sabes cuándo los necesitas.
        </p>
        <div className="mt-3 rounded-xl bg-white/80 border border-cacao/5 px-3 py-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-cacao/80">
              <PiggyBank className="w-4 h-4 text-menta" />
              META 3–6 MESES
            </span>
            <span className="text-[10px] text-cacao/50 font-medium">6 meses cubiertos</span>
          </div>
          <div className="mt-2 flex gap-1">
            {[0, 1, 2, 3, 4, 5].map((m) => (
              <div key={m} className="h-4 flex-1 rounded-sm bg-menta/90" />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[9px] text-cacao/50 font-medium">
            <span>1</span>
            <span>3</span>
            <span>6</span>
          </div>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-[11px] text-cacao/50 font-medium">Calcula el tuyo</span>
          <span className="flex items-center gap-1.5 bg-cacao text-crema text-[11px] font-semibold px-3 py-1.5 rounded-full">
            <Play className="w-3 h-3" />
            Continuar
          </span>
        </div>
      </div>
    ),
  },
  {
    tag: 'Inversión · L06',
    dot: 'bg-cielo',
    bar: 'bg-cielo',
    bg: '#74C0FC', // cielo: confianza, estabilidad, visión
    content: (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cacao/70">
            <span className="w-2 h-2 rounded-full bg-cielo" />
            Inversión · L06
          </span>
          <span className="text-[10px] text-cacao/50 font-medium">Lección 6 de 15</span>
        </div>
        <p className="mt-2 font-display font-semibold text-[15px] text-cacao leading-snug">
          CETES: presta al gobierno, cobra intereses
        </p>
        <p className="mt-1.5 text-[12px] text-cacao/70 leading-relaxed">
          La puerta de entrada más segura y accesible al mundo de las inversiones.
        </p>
        <div className="mt-3 rounded-xl bg-white/80 border border-cacao/5 px-3 py-3 text-center">
          <Landmark className="w-6 h-6 text-cielo mx-auto" />
          <p className="mt-1.5 font-display font-bold text-[22px] text-cacao leading-none">
            $100
          </p>
          <p className="mt-1 text-[10px] text-cacao/60">
            para hacer tu primera inversión real
          </p>
        </div>
        <div className="mt-3 rounded-lg bg-white/70 border border-cacao/5 px-2.5 py-1.5 flex items-center justify-between">
          <span className="text-[10px] text-cacao/70 font-medium">cetesdirecto.com</span>
          <span className="text-[10px] font-semibold text-menta">Cuenta gratis</span>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-[11px] text-cacao/50 font-medium">Empieza con $100</span>
          <span className="flex items-center gap-1.5 bg-cacao text-crema text-[11px] font-semibold px-3 py-1.5 rounded-full">
            <Play className="w-3 h-3" />
            Continuar
          </span>
        </div>
      </div>
    ),
  },
  {
    tag: 'Racha · Gamificación',
    dot: 'bg-lavanda',
    bar: 'bg-lavanda',
    bg: '#B197FC', // lavanda: constancia, sabiduría, transformación
    content: (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cacao/70">
            <span className="w-2 h-2 rounded-full bg-lavanda" />
            Racha · Gamificación
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-cacao bg-mantequilla/70 px-2 py-0.5 rounded-full">
            <Flame className="w-3 h-3 text-frambuesa" />
            3 días
          </span>
        </div>
        <p className="mt-2 font-display font-semibold text-[15px] text-cacao leading-snug">
          Tu racha: 3 días seguidos aprendiendo
        </p>
        <div className="mt-3 flex justify-between gap-1">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, j) => (
            <div
              key={d}
              className={`flex-1 rounded-lg py-2 text-center text-[10px] font-bold ${
                j < 3 ? 'bg-lavanda text-crema' : 'bg-cacao/5 text-cacao/40'
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-white/80 border border-cacao/5 px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-cacao/70">
              <Target className="w-3.5 h-3.5 text-frambuesa" />
              Meta diaria
            </span>
            <span className="text-[10px] text-cacao/50 font-medium">1 lección</span>
          </div>
          <div className="mt-1.5 h-1 w-full bg-cacao/10 rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-lavanda rounded-full" />
          </div>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-[11px] text-cacao/50 font-medium">+15 XP por la racha</span>
          <span className="flex items-center gap-1.5 bg-cacao text-crema text-[11px] font-semibold px-3 py-1.5 rounded-full">
            <Play className="w-3 h-3" />
            Continuar
          </span>
        </div>
      </div>
    ),
  },
];

const SLIDE_MS = 4000;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  // Rotación automática del contenido del teléfono (sin indicadores visibles)
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

      {/* Decoración sutil */}
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

            <h1 className="mt-6 lg:mt-10 font-display leading-[1.02] tracking-tight">
                          <span
                            ref={headline1Ref}
                            className="block text-[clamp(54px,15vw,150px)] font-black text-cacao opacity-0"
                          >
                            El dinero no se enseña en la escuela.
                          </span>
                          <span
                            ref={headline2Ref}
                            className="block mt-4 lg:mt-6 text-[clamp(24px,6.5vw,56px)] font-semibold text-cacao opacity-0"
                          >
                            Lo aprendemos aquí.
                            <br />
                            <span className="text-frambuesa font-bold">Gratis, para todos.</span>
                          </span>
                        </h1>
          </div>

          {/* Phone Mockup: device frame Flowbite, derecho */}
          <div ref={phoneRef} className="relative mx-auto opacity-0">
            {/* Frame del dispositivo */}
                        <div className="relative mx-auto bg-black border-[11px] sm:border-[14px] border-black rounded-[2rem] sm:rounded-[2.5rem] h-[520px] sm:h-[660px] w-[260px] sm:w-[330px] shadow-2xl">
              {/* Speaker */}
              <div className="w-[100px] sm:w-[148px] h-[12px] sm:h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute" />
              {/* Botones laterales */}
              <div className="h-[36px] sm:h-[46px] w-[3px] sm:w-[2px] bg-black absolute left-[-9px] sm:left-[-11px] top-[100px] sm:top-[124px] rounded-l-lg" />
              <div className="h-[36px] sm:h-[46px] w-[3px] sm:w-[2px] bg-black absolute left-[-9px] sm:left-[-11px] top-[143px] sm:top-[178px] rounded-l-lg" />
              <div className="h-[50px] sm:h-[64px] w-[3px] sm:w-[2px] bg-black absolute right-[-9px] sm:right-[-11px] top-[114px] sm:top-[142px] rounded-r-lg" />

              {/* Pantalla */}
                            <div className="rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden w-[238px] sm:w-[302px] h-[498px] sm:h-[632px] bg-white flex flex-col">
                {/* App header */}
                                <div className="px-5 pt-5 pb-1 flex items-center justify-between">
                                  <span className="flex items-center gap-1.5 font-display font-bold text-[15px] text-cacao">
                                    <img
                                                          src="/assets/finni.png"
                                                          alt="Finni, la mascota de FinEmpoder"
                                                          className="w-8 h-8 rounded-full object-cover ring-2 ring-white/80"
                                                        />
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

                {/* Slides con crossfade automático (contenido real y distinto por slide) */}
                <div className="grid flex-1 px-4 sm:px-5 mt-3 sm:mt-4 pb-1">
                  {SLIDES.map((s, i) => (
                    <div
                      key={s.tag}
                      className={`col-start-1 row-start-1 flex transition-opacity duration-500 ${
                        i === slide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="flex-1 rounded-2xl bg-crema p-4 border border-cacao/5">
                        {s.content}
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
          </div>
        </div>
      </div>
    </section>
  );
}