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

export default function App() {
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
