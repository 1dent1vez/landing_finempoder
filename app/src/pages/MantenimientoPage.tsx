import { Link } from 'react-router';
import { FECard } from '../components/FECard';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function MantenimientoPage() {
  return (
    <div className="min-h-screen bg-brand-crema flex flex-col items-center justify-center p-6 relative overflow-hidden font-body text-brand-dark">
      {/* Inline styles for the custom gear and pulse animations */}
      <style>{`
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes pulse-light {
          0%, 100% { opacity: 0.6; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        .animate-gear-cw {
          transform-origin: 100px 100px;
          animation: spin-cw 12s linear infinite;
        }
        .animate-gear-ccw {
          transform-origin: 160px 145px;
          animation: spin-ccw 9s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-light 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-gear-cw, .animate-gear-ccw, .animate-pulse-slow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Decorative background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-accent/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />

      {/* Main Container Card using FECard with premium variant */}
      <FECard variant="premium" className="max-w-xl w-full text-center relative z-10 py-12 px-8 sm:px-12">
        
        {/* Animated Work-in-Progress Gear Illustration */}
        <div 
          className="flex justify-center mb-8"
          role="img" 
          aria-label="Animación interactiva de dos engranajes girando, simbolizando que la aplicación está en mantenimiento."
        >
          <svg
            width="240"
            height="220"
            viewBox="0 0 240 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-48 h-auto drop-shadow-md"
          >
            {/* Background Accent circle */}
            <circle cx="120" cy="110" r="80" fill="url(#bg-gradient)" opacity="0.15" className="animate-pulse-slow" />
            
            {/* Gear 1 (Large - Orange) */}
            <g className="animate-gear-cw">
              {/* Central base */}
              <circle cx="100" cy="100" r="45" fill="var(--color-brand-primary)" />
              {/* Inner cutout */}
              <circle cx="100" cy="100" r="18" fill="#FFF9E6" />
              {/* Spokes / Teeth */}
              {[...Array(8)].map((_, i) => {
                const angle = i * 45;
                return (
                  <path
                    key={i}
                    d="M 92 48 L 108 48 L 112 60 L 88 60 Z"
                    fill="var(--color-brand-primary)"
                    transform={`rotate(${angle} 100 100)`}
                  />
                );
              })}
            </g>

            {/* Gear 2 (Small - Cacao) */}
            <g className="animate-gear-ccw">
              {/* Central base */}
              <circle cx="160" cy="145" r="30" fill="var(--color-brand-dark)" />
              {/* Inner cutout */}
              <circle cx="160" cy="145" r="12" fill="#FFF9E6" />
              {/* Spokes / Teeth */}
              {[...Array(6)].map((_, i) => {
                const angle = i * 60;
                return (
                  <path
                    key={i}
                    d="M 154 110 L 166 110 L 169 120 L 151 120 Z"
                    fill="var(--color-brand-dark)"
                    transform={`rotate(${angle} 160 145)`}
                  />
                );
              })}
            </g>

            <defs>
              <linearGradient id="bg-gradient" x1="40" y1="30" x2="200" y2="190" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--color-brand-primary)" />
                <stop offset="1" stopColor="var(--color-brand-accent)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Maintenance Message */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
            <AlertCircle className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider">Sitio en actualización</span>
          </div>

          <h1 className="font-outfit font-bold text-3xl sm:text-4xl text-brand-dark tracking-tight leading-tight pt-2">
            ¡Disculpa la molestia!
          </h1>
          
          <h2 className="font-display font-semibold text-lg sm:text-xl text-brand-primary">
            FinEmpoder está en mantenimiento para traerte mejor contenido.
          </h2>

          <p className="font-body text-base text-brand-dark/75 leading-relaxed max-w-md mx-auto">
            Estamos trabajando arduamente en optimizaciones y nuevas lecciones de educación financiera gamificada. ¡Vuelve muy pronto!
          </p>
        </div>

        {/* Pulse Progress Bar */}
        <div className="mt-8 mb-10 max-w-[280px] mx-auto bg-brand-dark/10 h-3 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-primary rounded-full animate-pulse-slow w-4/5" 
            style={{
              backgroundImage: 'linear-gradient(90deg, var(--color-brand-primary) 0%, var(--color-brand-accent) 100%)',
            }}
          />
        </div>

        {/* Return Button */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-display font-medium text-base bg-brand-dark text-brand-light px-8 py-3.5 rounded-full hover:bg-brand-primary hover:scale-[1.03] transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </Link>
        </div>
      </FECard>
    </div>
  );
}
