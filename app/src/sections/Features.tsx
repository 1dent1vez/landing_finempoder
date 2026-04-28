import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GraduationCap,
  Calculator,
  Trophy,
  TrendingUp,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: GraduationCap,
    iconBg: 'bg-menta/20',
    iconColor: 'text-menta',
    title: 'Aprende a tu propio ritmo',
    description:
      'Módulos cortos y directos al grano sobre presupuesto, ahorro e inversión que se adaptan a lo que ya sabes.',
  },
  {
    icon: Calculator,
    iconBg: 'bg-lavanda/20',
    iconColor: 'text-lavanda',
    title: 'Ponle números a tu vida real',
    description:
      'No solo leas la teoría. Usa nuestras herramientas interactivas para armar tu presupuesto mensual y descubrir exactamente en qué se te va el dinero.',
  },
  {
    icon: Trophy,
    iconBg: 'bg-cielo/20',
    iconColor: 'text-cielo',
    title: 'Gamificación: Gana mientras aprendes',
    description:
      'Mantén la motivación al máximo. Nuestro sistema te otorga puntos, mantiene tus rachas de estudio, desbloquea insignias y te permite subir de nivel en el ranking global.',
  },
  {
    icon: TrendingUp,
    iconBg: 'bg-rosa/20',
    iconColor: 'text-rosa',
    title: 'Mide y celebra tu avance',
    description:
      'Accede a un dashboard personal intuitivo donde podrás visualizar tu progreso, tus metas alcanzadas y tu evolución financiera.',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards stagger
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, scale: 0.95, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="beneficios"
      className="bg-cacao py-32 lg:py-40"
    >
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="font-mono font-medium text-xs tracking-[0.1em] text-menta uppercase">
            Beneficios
          </span>
          <h2 className="mt-4 font-display font-bold text-[clamp(40px,5vw,72px)] leading-tight text-crema">
            Aprende. Aplica.
            <br />
            Gana. Avanza.
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white/[0.06] border border-white/10 rounded-[20px] p-10 lg:p-12 opacity-0"
              >
                <div
                  className={`w-12 h-12 rounded-full ${feature.iconBg} flex items-center justify-center mb-6`}
                >
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-[22px] text-crema mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-[15px] text-crema/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
