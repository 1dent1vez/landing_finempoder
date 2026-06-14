import './App.css';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import About from './sections/About';
import Features from './sections/Features';
import Target from './sections/Target';
import PWA from './sections/PWA';
import Install from './sections/Install';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import { Routes, Route } from 'react-router';
import MantenimientoPage from './pages/MantenimientoPage';

function HomeLanding() {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-crema">
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Features />
        <Target />
        <PWA />
        <Install />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLanding />} />
      <Route path="/mantenimiento" element={<MantenimientoPage />} />
    </Routes>
  );
}
