import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { CircleDollarSign } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Para Quién', href: '#para-quien' },
  { label: 'Instalar', href: '#instalar' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-crema/80 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 font-display font-bold text-lg tracking-tight text-cacao"
        >
          <CircleDollarSign className="w-6 h-6 text-mango" />
          FinEmpoder
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body font-medium text-sm text-cacao/70 hover:text-cacao transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cacao transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA responsive (mobile-first) */}
        <Link
          to="/mantenimiento"
          className="font-display font-medium text-xs sm:text-sm bg-cacao text-crema px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-mango hover:text-cacao transition-colors duration-300"
        >
          Comenzar ahora
        </Link>
      </div>
    </header>
  );
}