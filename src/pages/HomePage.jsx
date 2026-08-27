import { useEffect, useState } from 'react';
import About from '../components/sections/About';
import CompanyLogoCarousel from '../components/sections/CompanyLogoCarousel';
import Contact from '../components/sections/Contact';
import CTA from '../components/sections/CTA';
import Divider from '../components/sections/Divider';
import Hero from '../components/sections/Hero';
import OurPurpose from '../components/sections/OurPurpose';
import Products from '../components/sections/Products';
import { Reveal } from '../components/animations/Reveal';
import LoadingScreen from '../components/layout/LoadingScreen';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTopButton from '../components/floating/ScrollToTopButton';
import WhatsAppButton from '../components/floating/WhatsAppButton';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [startWriting, setStartWriting] = useState(false);
  const [activeProductCategory, setActiveProductCategory] = useState('All');

  // Smooth native scrolling for anchor links and scrollIntoView calls.
  useEffect(() => {
    const original = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = original;
    };
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProductCategory = (category) => {
    setActiveProductCategory(category);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Start writing animation immediately after loading completes
  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure DOM is ready, then start writing
    setTimeout(() => {
      setStartWriting(true);
    }, 100);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;900&family=Lora:wght@400;500;600;700&display=swap');
      `}</style>
      <div className="App font-['Barlow',sans-serif] text-[#666666] bg-cream w-full text-[16px] leading-[1.5]">
        <Navbar
          onGetInTouch={scrollToContact}
          onCategorySelect={scrollToProductCategory}
        />

        {/* 1. Hero Section */}
        <Hero onGetInTouch={scrollToContact} startWriting={startWriting} />

        {/* Divider */}
        <Reveal direction="none" scale={0.98} duration={900}>
          <Divider />
        </Reveal>

        {/* 2. About Us Section */}
        <Reveal direction="up" distance={50}>
          <About />
        </Reveal>

        {/* 3. Products Section */}
        <Reveal direction="up" distance={50}>
          <Products
            activeCategory={activeProductCategory}
            onCategoryChange={setActiveProductCategory}
          />
        </Reveal>

        {/* 4. Our Purpose + Message from CEO (combined section) */}
        <Reveal direction="up" distance={50}>
          <OurPurpose />
        </Reveal>

        {/* 6. Companies We’ve Worked With */}
        <Reveal direction="up" distance={35}>
          <CompanyLogoCarousel />
        </Reveal>

        {/* 7. CTA Section */}
        <Reveal direction="up" distance={40} scale={0.97}>
          <CTA onGetInTouch={scrollToContact} />
        </Reveal>

        {/* 8. Contact Section */}
        <Reveal direction="up" distance={50}>
          <Contact />
        </Reveal>

        {/* 9. Footer */}
        <Reveal direction="up" distance={30}>
          <Footer />
        </Reveal>

        {/* WhatsApp + Scroll to Top Buttons */}
        <WhatsAppButton />
        <ScrollToTopButton />
      </div>
    </>
  );
}
