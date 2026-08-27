import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, PRODUCT_DATA } from '../../data/products';
import AnimatedText from '../animations/AnimatedText';
import EdgeHoneycombCluster from '../decorations/EdgeHoneycombCluster';
import OrganicSectionDecoration from '../decorations/OrganicSectionDecoration';
import ProductCard from './ProductCard';

export default function Products({ activeCategory, onCategoryChange }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 0 });

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getFilteredProducts = () => {
    if (activeCategory === 'All') {
      return PRODUCT_DATA;
    }
    return PRODUCT_DATA.filter(p => p.category === activeCategory);
  };

  const filteredProducts = getFilteredProducts();

  const scroll = (direction) => {
    // On mobile, don't scroll - just show animation
    if (isMobile) {
      return;
    }
    
    if (scrollContainerRef.current && !isAnimating) {
      setIsAnimating(true);
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.product-card')?.offsetWidth || 280;
      const gap = parseInt(getComputedStyle(container).gap) || 24;
      
      // Scroll by 4 on desktop
      const cardsToScroll = 4;
      const scrollAmount = (cardWidth + gap) * cardsToScroll;
      
      const targetScroll = direction === 'left' 
        ? Math.max(0, container.scrollLeft - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount);
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      setShowLeftArrow(container.scrollLeft > 10);
      setShowRightArrow(container.scrollLeft < maxScroll - 10);

      // Calculate which products are visible based on scroll position
      const cardWidth = container.querySelector('.product-card')?.offsetWidth || 280;
      const gap = parseInt(getComputedStyle(container).gap) || 24;
      const cardTotalWidth = cardWidth + gap;
      const scrollLeft = container.scrollLeft;
      const visibleStart = Math.floor(scrollLeft / cardTotalWidth);
      const visibleEnd = Math.ceil((scrollLeft + container.clientWidth) / cardTotalWidth);
      setVisibleRange({ start: visibleStart, end: visibleEnd });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      setTimeout(() => {
        handleScroll();
      }, 300);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [filteredProducts]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setTimeout(() => {
        handleScroll();
      }, 300);
    }
  }, [activeCategory]);

  return (
    <section className="relative py-[60px] sm:py-[80px] lg:py-[100px] w-full bg-gradient-to-b from-[#f8faf8] to-[#eef5ec] overflow-hidden" id="products">
      <EdgeHoneycombCluster side="left" position="bottom" color="#A9711F" fillColor="#E8B33D" opacity={0.44} />
      <OrganicSectionDecoration />
      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 gap-4">
            <div>
              <div className="font-['Barlow',sans-serif] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#6BA539] flex items-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#6BA539] before:inline-block">
                Our Products
              </div>
              <h2 className="font-['Lora',serif] font-bold text-[1.8rem] sm:text-[2rem] lg:text-[2.3rem] mt-[10px] sm:mt-[14px] text-[#1F4732]"><AnimatedText text="Premium export produce." /></h2>
            </div>
            <div className="text-sm font-['Barlow',sans-serif] text-[#6BA539]">
              {filteredProducts.length} products
            </div>
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={
                  'font-["Barlow",sans-serif] text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.05em] px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border transition-all duration-300 ' +
                  (activeCategory === cat
                    ? 'bg-[#1F4732] text-white border-[#1F4732] shadow-md shadow-[#1F4732]/20'
                    : 'border-[rgba(31,71,50,0.2)] hover:bg-[#1F4732] hover:text-white hover:border-[#1F4732]')
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            {/* Left Arrow - with animation on mobile */}
            {showLeftArrow && (
              <button
                onClick={() => scroll('left')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#1F4732] hover:bg-[#6BA539] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#1F4732]/30 hover:shadow-xl hover:scale-110 ${
                  isAnimating ? 'opacity-50' : ''
                } ${isMobile ? 'animate-pulse' : ''}`}
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Right Arrow - with animation on mobile */}
            {showRightArrow && (
              <button
                onClick={() => scroll('right')}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#1F4732] hover:bg-[#6BA539] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#1F4732]/30 hover:shadow-xl hover:scale-110 ${
                  isAnimating ? 'opacity-50' : ''
                } ${isMobile ? 'animate-pulse' : ''}`}
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .product-card {
                  min-width: 220px;
                  max-width: 280px;
                  flex: 0 0 auto;
                  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                  background: rgba(255, 255, 255, 0.85);
                  backdrop-filter: blur(8px);
                  border: 1px solid rgba(31, 71, 50, 0.08);
                }
                @media (min-width: 640px) {
                  .product-card {
                    min-width: 240px;
                    max-width: 260px;
                  }
                }
                @media (min-width: 1024px) {
                  .product-card {
                    min-width: 260px;
                    max-width: 280px;
                  }
                }
                @media (min-width: 1280px) {
                  .product-card {
                    min-width: 280px;
                    max-width: 300px;
                  }
                }
                .product-card:hover {
                  transform: translateY(-6px);
                  background: rgba(255, 255, 255, 0.95);
                  box-shadow: 0 12px 40px rgba(31, 71, 50, 0.15);
                  border-color: #1F4732;
                }
                @keyframes pulse {
                  0%, 100% { opacity: 0.6; transform: scale(1); }
                  50% { opacity: 1; transform: scale(1.05); }
                }
                .animate-pulse {
                  animation: pulse 1.5s ease-in-out infinite;
                }
              `}</style>
              
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} index={index} />
              ))}
            </div>
          </div>

          {/* Scroll Indicators - Dots showing how many products */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {filteredProducts.map((_, index) => {
              const isVisible = index >= visibleRange.start && index < visibleRange.end;
              return (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    isVisible 
                      ? 'w-6 bg-[#6BA539]' 
                      : 'w-3 bg-[#6BA539]/30'
                  }`}
                />
              );
            })}
          </div>

          {/* Swipe indicator text for mobile */}
          {isMobile && (
            <div className="text-center mt-4 text-xs text-[#8a8368] font-['Barlow',sans-serif] tracking-wide">
              ← Swipe to browse →
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
