import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    title: 'Abre el sitio',
    description:
      'Ingresa a www.finempoder.com.mx desde cualquier navegador en tu celular o computadora.',
    accent: 'bg-menta',
  },
  {
    number: '02',
    title: 'Agrega a inicio',
    description:
      "Toca el menú de tu navegador y selecciona 'Agregar a pantalla principal' o 'Instalar aplicación'.",
    accent: 'bg-lavanda',
  },
  {
    number: '03',
    title: '¡Listo!',
    description:
      'Tendrás el ícono de FinEmpoder junto a tus demás apps, con notificaciones y funcionamiento sin internet.',
    accent: 'bg-rosa',
  },
];

export default function Install() {
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
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Number count-up animation
        Array.from(cards).forEach((card, i) => {
          const numEl = card.querySelector('.step-number');
          if (numEl) {
            gsap.fromTo(
              numEl,
              { textContent: '00' },
              {
                textContent: STEPS[i].number,
                duration: 0.6,
                delay: 0.3 + i * 0.15,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                  trigger: cardsRef.current,
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instalar"
      className="bg-cacao py-32 lg:py-40"
    >
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="font-mono font-medium text-xs tracking-[0.1em] text-menta uppercase">
            Instalación
          </span>
          <h2 className="mt-4 font-display font-bold text-[clamp(40px,5vw,72px)] leading-tight text-crema">
            Tu app en
            <br />
            3 pasos.
          </h2>
          <p className="mt-4 font-body text-base text-crema/70 max-w-lg mx-auto">
            No necesitas buscarla en tiendas de aplicaciones. FinEmpoder es una
            Progressive Web App de última generación.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12"
        >
          {STEPS.map((step) => (
            <div key={step.number} className="text-center opacity-0">
              <span
                className="step-number font-display font-bold text-[72px] leading-none"
                style={{
                  WebkitTextStroke: '2px #F5B842',
                  color: 'transparent',
                }}
              >
                {step.number}
              </span>
              <h3 className="mt-4 font-display font-bold text-xl text-crema">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-[15px] text-crema/70 leading-relaxed">
                {step.description}
              </p>
              <div className={`mt-6 mx-auto w-10 h-0.5 ${step.accent}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
