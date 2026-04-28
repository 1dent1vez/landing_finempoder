import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  'Educación Financiera',
  'ITT Toluca',
  'Ahorro Inteligente',
  'Inversión para Todos',
  'Presupuesto Personal',
  'Gamificación',
  'Finanzas Sin Estrés',
  'Empoderamiento',
];

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full h-20 bg-cacao overflow-hidden flex items-center opacity-0"
    >
      <div className="marquee-track flex items-center gap-8 animate-marquee hover:[animation-play-state:paused]">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
          (item, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0">
              <span className="font-body font-medium text-sm text-crema uppercase tracking-[0.08em] whitespace-nowrap">
                {item}
              </span>
              <span className="w-2 h-2 rounded-full bg-menta shrink-0" />
            </div>
          )
        )}
      </div>
    </div>
  );
}
