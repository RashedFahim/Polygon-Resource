import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    let timeoutId = null;

    const toggleVisibility = () => {
      // Clear any pending timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position
    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const scrollToTop = () => {
    // Hide the button immediately
    setIsVisible(false);
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Force reset after scroll animation completes
    setTimeout(() => {
      // Check if we're still at the top
      if (window.scrollY <= 10) {
        setIsVisible(false);
      }
    }, 100);
  };

  // Handle scroll events to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-[100] 
        bg-[#1F4732] hover:bg-[#6BA539] 
        text-white rounded-full 
        w-12 h-12 sm:w-14 sm:h-14 
        flex items-center justify-center 
        shadow-lg shadow-[#1F4732]/30 hover:shadow-xl hover:shadow-[#1F4732]/40
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-16 pointer-events-none'}
        hover:scale-110 active:scale-95
      `}
      aria-label="Scroll to top"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6BA539]/20 to-[#DD8F2A]/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      
      <ChevronUp 
        size={24} 
        className="transition-all duration-300 hover:-translate-y-1.5 active:translate-y-1"
        strokeWidth={2.5}
        style={{
          animation: isVisible ? 'arrowFloat 2s ease-in-out infinite' : 'none',
        }}
      />
      
      <style>{`
        @keyframes arrowFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </button>
  );
}
