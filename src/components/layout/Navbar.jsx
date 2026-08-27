import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/navigation';
import ProductDropdown, { MobileProductDropdown } from '../navigation/ProductDropdown';

export default function Navbar({ onGetInTouch, onCategorySelect, isProductPage = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileExpandedCategories, setMobileExpandedCategories] = useState({});
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const menuCloseTimer = useRef(null);
  const productsCloseTimer = useRef(null);
  const productsMenuRef = useRef(null);
  // Refs mirror state so scroll handlers / repeated clicks read synchronously
  // and can never double-trigger the closing animation.
  const menuOpenRef = useRef(false);
  const menuClosingRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    menuClosingRef.current = menuClosing;
  }, [menuClosing]);

  useEffect(() => () => {
    clearTimeout(menuCloseTimer.current);
    clearTimeout(productsCloseTimer.current);
  }, []);

  // Must match the mobile-menu-closing CSS animation duration (index.css) —
  // the panel is only unmounted once the collapse has fully played out.
  const MENU_CLOSE_DURATION_MS = 320;

  // Single close path shared by manual close, link taps, and scroll-triggered
  // close — always plays the same slide-up + fade-out animation.
  const closeMenu = () => {
    if (!menuOpenRef.current || menuClosingRef.current) return;

    menuClosingRef.current = true;
    setMenuClosing(true);

    clearTimeout(menuCloseTimer.current);
    menuCloseTimer.current = setTimeout(() => {
      menuCloseTimer.current = null;
      menuClosingRef.current = false;
      menuOpenRef.current = false;
      setMenuClosing(false);
      setMenuOpen(false);
    }, MENU_CLOSE_DURATION_MS);
  };

  const toggleMenu = () => {
    clearTimeout(menuCloseTimer.current);
    menuCloseTimer.current = null;

    if (menuOpenRef.current && !menuClosingRef.current) {
      closeMenu();
      return;
    }

    // Open (or cancel an in-flight close and reopen) without flicker.
    menuClosingRef.current = false;
    menuOpenRef.current = true;
    setMenuClosing(false);
    setMenuOpen(true);
  };

  const clearProductsCloseTimer = () => {
    clearTimeout(productsCloseTimer.current);
    productsCloseTimer.current = null;
  };

  const openProducts = () => {
    clearProductsCloseTimer();
    setProductsOpen(true);
  };

  const closeProducts = () => {
    clearProductsCloseTimer();
    setProductsOpen(false);
  };

  const scheduleProductsClose = () => {
    clearProductsCloseTimer();
    productsCloseTimer.current = setTimeout(() => {
      productsCloseTimer.current = null;
      setProductsOpen(false);
    }, 160);
  };

  const handleProductClick = () => {
    closeProducts();
    setMobileProductsOpen(false);
    closeMenu();
  };

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    } else {
      navigate('/#products');
    }
    closeProducts();
  };

  const toggleMobileCategory = (category) => {
    setMobileExpandedCategories((expanded) => ({
      ...expanded,
      [category]: !expanded[category],
    }));
  };

  useEffect(() => {
    const handleOutsidePointerDown = (event) => {
      if (productsMenuRef.current && !productsMenuRef.current.contains(event.target)) {
        clearTimeout(productsCloseTimer.current);
        productsCloseTimer.current = null;
        setProductsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        clearTimeout(productsCloseTimer.current);
        productsCloseTimer.current = null;
        setProductsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Only go white once the bar has fully crossed the hero (#home), i.e.
      // the moment the hero's bottom edge passes the top of the viewport.
      const hero = document.getElementById('home');
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= 0 : isProductPage || window.scrollY > 80);
      // Auto-close with the same animation as soon as the user scrolls.
      if (menuOpenRef.current) closeMenu();
      clearTimeout(productsCloseTimer.current);
      productsCloseTimer.current = null;
      setProductsOpen(false);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // isProductPage is fixed for the lifetime of each routed navbar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[200] w-full transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-[#1F4732]/10' 
          : 'bg-[#0A2A1A]/60 backdrop-blur-sm border-b border-[#DAA520]/10'
      }`}
    >
      <nav className="w-full px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between py-[14px] sm:py-[18px] transition-all duration-300">
        <a href={pathname === '/' ? '#home' : '/#home'} className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-[52px] h-[48px] sm:w-[52px] sm:h-[56px] md:w-[60px] md:h-[60px] flex-shrink-0 relative">
            <img 
              src="/logo.png" 
              alt="Polygon Resource Logo" 
              className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
              background: 'radial-gradient(circle, rgba(184,134,11,0.3) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}></div>
          </div>
          {/* Image instead of text */}
          <div className="transition-all duration-300 group-hover:translate-x-0.5">
            <img 
              src="/text.png" 
              alt="Polygon Resource" 
              className="h-[40px] sm:h-[42px] md:h-[48px] lg:h-[54px] w-auto object-contain transition-all duration-300"
            />
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-6 lg:gap-[34px] text-[0.85rem] lg:text-[0.9rem] font-medium">
          {NAV_ITEMS.map((item, index) => {
            const isHovered = hoveredLink === index;

            if (item.label === 'Products') {
              return (
                <ProductDropdown
                  key={item.label}
                  scrolled={scrolled}
                  productsOpen={productsOpen}
                  productsMenuRef={productsMenuRef}
                  isHovered={isHovered}
                  onHover={() => setHoveredLink(index)}
                  onOpen={openProducts}
                  onScheduleClose={scheduleProductsClose}
                  onClearClose={clearProductsCloseTimer}
                  onCategoryClick={handleCategoryClick}
                  onProductClick={handleProductClick}
                />
              );
            }

            return (
              <a
                key={index}
                href={pathname === '/' ? `#${item.id}` : `/#${item.id}`}
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative pb-1 transition-all duration-300 group ${
                  scrolled ? 'text-[#4a6b5a] hover:text-[#1F4732]' : 'text-cream/90 hover:text-white font-medium'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span 
                  className={`absolute -bottom-0.5 left-0 h-[2px] transition-all duration-500 ${
                    isHovered ? 'w-full' : 'w-0'
                  }`}
                  style={{
                    background: scrolled ? 'linear-gradient(90deg, #1F4732, #6BA539)' : 'linear-gradient(90deg, #B8860B, #DAA520)',
                    boxShadow: scrolled ? '0 0 20px rgba(31,71,50,0.3)' : '0 0 20px rgba(184,134,11,0.4)',
                  }}
                />
                <span className={`absolute -bottom-0.5 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                  scrolled ? 'bg-[#1F4732]/20' : 'bg-cream/30'
                }`}></span>
              </a>
            );
          })}
        </div>

        <button 
          onClick={onGetInTouch}
          className={`hidden lg:block group relative font-['Barlow',sans-serif] text-[0.65rem] sm:text-[0.72rem] uppercase tracking-[0.08em] px-3 sm:px-4 py-[7px] sm:py-[9px] rounded-[2px] overflow-hidden transition-all duration-300 hover:scale-105 ${
            scrolled ? 'bg-[#1F4732] text-white hover:bg-[#6BA539] shadow-md shadow-[#1F4732]/20' : 'bg-[#DAA520]/20 backdrop-blur-sm border border-[#DAA520]/40 text-cream hover:bg-[#DAA520] hover:text-[#12301F]'
          }`}
        >
          <span className="relative z-10">Contact US</span>
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
        </button>

        <button 
          className={`lg:hidden ml-2 transition-colors ${
            scrolled ? 'text-[#1F4732] hover:text-[#6BA539]' : 'text-cream hover:text-[#DAA520]'
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          className={`mobile-menu-panel relative z-[210] lg:hidden px-4 pb-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto backdrop-blur-xl border-t ${
            menuClosing ? 'mobile-menu-closing' : ''
          } ${
            scrolled ? 'bg-white/98 border-[#1F4732]/10' : 'bg-[#0A2A1A]/95 border-[#DAA520]/10'
          }`}
          aria-hidden={menuClosing}
        >
          {NAV_ITEMS.map((item) => {
            if (item.label === 'Products') {
              return (
                <MobileProductDropdown
                  key={item.label}
                  scrolled={scrolled}
                  mobileProductsOpen={mobileProductsOpen}
                  mobileExpandedCategories={mobileExpandedCategories}
                  onToggleProducts={() => setMobileProductsOpen((isOpen) => !isOpen)}
                  onToggleCategory={toggleMobileCategory}
                  onProductClick={handleProductClick}
                />
              );
            }

            return (
              <a
                key={item.label}
                href={pathname === '/' ? `#${item.id}` : `/#${item.id}`}
                onClick={() => closeMenu()}
                className={`text-sm text-left font-medium tracking-wide py-2 px-3 rounded hover:bg-cream/10 transition-all duration-300 hover:pl-5 ${
                  scrolled ? 'text-[#4a6b5a] hover:text-[#1F4732]' : 'text-cream/90 hover:text-white'
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item.label.toUpperCase()}
              </a>
            );
          })}
          <div className="pt-2 border-t border-cream/10">
            <button 
              onClick={() => { onGetInTouch(); closeMenu(); }}
              className={`w-full text-sm font-medium py-2 px-3 rounded transition-all duration-300 ${
                scrolled ? 'bg-[#1F4732] text-white hover:bg-[#6BA539]' : 'bg-[#DAA520] text-[#12301F] hover:bg-[#C9A030] hover:scale-[1.02]'
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Contact US
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
