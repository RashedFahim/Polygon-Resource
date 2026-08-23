import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function App() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App font-sans text-[#1C1A14] bg-cream w-full">
      <Header onGetInTouch={scrollToContact} />
      <NewHero onGetInTouch={scrollToContact} />
      <Divider />
      <About />
      <CEOMessage />
      <Products />
      <Routes />
      <CTA onGetInTouch={scrollToContact} />
      <ContactSection />
      <Footer />
    </div>
  );
}

// ----- HEADER (FIXED - Contact US removed from mobile) -----
function Header({ onGetInTouch }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items with correct IDs
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About us', id: 'about' },
    { label: 'Products', id: 'products' },
    { label: 'Blogs', id: 'blogs' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-[#1F4732]/10' 
          : 'bg-transparent backdrop-blur-none'
      }`}
    >
      <nav className="w-full px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between py-[14px] sm:py-[18px] transition-all duration-300">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] flex-shrink-0 relative">
            <img 
              src="/Polygon Logo-2.jpg.jpeg" 
              alt="Polygon Resource Logo" 
              className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
            {/* Glow ring around logo */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
              background: 'radial-gradient(circle, rgba(221,143,42,0.3) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}></div>
          </div>
          <div className={`font-['Fraunces',serif] font-bold text-[0.9rem] sm:text-[1.05rem] leading-tight transition-all duration-300 group-hover:translate-x-0.5 ${
            scrolled ? 'text-[#1F4732]' : 'text-cream'
          }`}>
            <span className={`${
              scrolled 
                ? 'bg-gradient-to-r from-[#1F4732] to-[#6BA539] bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-cream to-[#DD8F2A] bg-clip-text text-transparent'
            }`}>
              POLYGON RESOURCE
            </span>
            <span className={`block font-['Space_Mono',monospace] font-normal text-[0.55rem] sm:text-[0.62rem] tracking-[0.14em] mt-0.5 transition-all duration-300 group-hover:text-[#DD8F2A] ${
              scrolled ? 'text-[#6BA539]/70' : 'text-[#DD8F2A]/70'
            }`}>
              xplore possibilities
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-[34px] text-[0.85rem] lg:text-[0.9rem] font-medium">
          {navItems.map((item, index) => {
            const isHovered = hoveredLink === index;
            return (
              <a
                key={index}
                href={`#${item.id}`}
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative pb-1 transition-all duration-300 group ${
                  scrolled ? 'text-[#4a6b5a] hover:text-[#1F4732]' : 'text-cream/70 hover:text-cream'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Glowing underline */}
                <span 
                  className={`absolute -bottom-0.5 left-0 h-[2px] transition-all duration-500 ${
                    isHovered ? 'w-full' : 'w-0'
                  }`}
                  style={{
                    background: scrolled 
                      ? 'linear-gradient(90deg, #1F4732, #6BA539)'
                      : 'linear-gradient(90deg, #DD8F2A, #6BA539)',
                    boxShadow: scrolled 
                      ? '0 0 20px rgba(31,71,50,0.3)'
                      : '0 0 20px rgba(221,143,42,0.4)',
                  }}
                />
                {/* Permanent subtle underline */}
                <span className={`absolute -bottom-0.5 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                  scrolled ? 'bg-[#1F4732]/20' : 'bg-cream/20'
                }`}></span>
              </a>
            );
          })}
        </div>

        {/* Get in Touch Button - Only visible on desktop (md and up) */}
        <button 
          onClick={onGetInTouch}
          className={`hidden md:block group relative font-['Space_Mono',monospace] text-[0.65rem] sm:text-[0.72rem] uppercase tracking-[0.08em] px-3 sm:px-4 py-[7px] sm:py-[9px] rounded-[2px] overflow-hidden transition-all duration-300 hover:scale-105 ${
            scrolled 
              ? 'bg-[#1F4732] text-white hover:bg-[#6BA539]' 
              : 'border border-cream/30 text-cream hover:bg-cream hover:text-[#12301F]'
          }`}
        >
          <span className="relative z-10">Contact US</span>
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
        </button>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden ml-2 transition-colors ${
            scrolled ? 'text-[#1F4732] hover:text-[#6BA539]' : 'text-cream hover:text-[#DD8F2A]'
          }`}
          onClick={() => setMenuOpen((v) => !v)} 
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`lg:hidden px-4 pb-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto backdrop-blur-xl border-t ${
          scrolled 
            ? 'bg-white/98 border-[#1F4732]/10' 
            : 'bg-[#0A2A1A]/98 border-[#DD8F2A]/10'
        }`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className={`text-sm text-left font-medium tracking-wide py-2 px-3 rounded hover:bg-cream/5 transition-all duration-300 hover:pl-5 ${
                scrolled 
                  ? 'text-[#4a6b5a] hover:text-[#1F4732]' 
                  : 'text-cream/70 hover:text-cream'
              }`}
              style={{ 
                fontFamily: "'JetBrains Mono', monospace"
              }}
            >
              {item.label.toUpperCase()}
            </a>
          ))}
          {/* Contact US button in mobile menu */}
          <div className="pt-2 border-t border-cream/10">
            <button 
              onClick={() => { onGetInTouch(); setMenuOpen(false); }}
              className={`w-full text-sm font-medium py-2 px-3 rounded transition-all duration-300 ${
                scrolled 
                  ? 'bg-[#1F4732] text-white hover:bg-[#6BA539]' 
                  : 'bg-gradient-to-r from-[#DD8F2A] to-[#6BA539] text-[#12301F] hover:scale-[1.02]'
              }`}
              style={{ 
                fontFamily: "'JetBrains Mono', monospace"
              }}
            >
              GET IN TOUCH
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ----- NEW HERO (EXPORT BANGLADESH STYLE WITH DARK OVERLAY) -----
function NewHero({ onGetInTouch }) {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0e1813] via-[#143021] to-[#215031] pt-16">
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30"></div>
    

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-cream">
              <div className="inline-block mb-4 px-3 py-1 rounded-full border border-[#DD8F2A]/30 bg-[#DD8F2A]/10">
                <span className="text-[0.6rem] sm:text-[0.7rem] font-['Space_Mono',monospace] uppercase tracking-[0.15em] text-[#DD8F2A]">
                  Navigating New Pathways
                </span>
              </div>
              
              <h1 className="font-['Fraunces',serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-4">
                <span className="text-cream">Export Bangladesh:</span>
                <br />
                <span className="text-[#dd8f2aec]">Empowering Bangladesh's</span>
                <br />
                <span className="text-[#dd8f2aec]">Global Exports</span>
              </h1>
              
              <p className="text-base sm:text-lg text-cream/80 max-w-xl leading-relaxed mb-6">
                Dive into Bangladesh's evolving export landscape — explore market intelligence, discover emerging sectors, and connect with world-class sourcing opportunities.
              </p>
              
              {/* Contact US button - Visible only on mobile (hidden on lg screens and up) */}
              <button 
                onClick={onGetInTouch}
                className="lg:hidden group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#DD8F2A] text-[#12301F] font-semibold rounded hover:bg-[#f0a746] transition-all duration-300 hover:scale-105"
              >
                Contact us
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* Right Content - Stats/Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-2xl sm:text-3xl font-['Fraunces',serif] font-bold text-[#DD8F2A]">15+</div>
                <div className="text-xs sm:text-sm text-cream/80 font-['Space_Mono',monospace] uppercase tracking-wider">Years in Agri-Trade</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-2xl sm:text-3xl font-['Fraunces',serif] font-bold text-[#DD8F2A]">8</div>
                <div className="text-xs sm:text-sm text-cream/80 font-['Space_Mono',monospace] uppercase tracking-wider">Export Countries</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-2xl sm:text-3xl font-['Fraunces',serif] font-bold text-[#DD8F2A]">#1</div>
                <div className="text-xs sm:text-sm text-cream/80 font-['Space_Mono',monospace] uppercase tracking-wider">Own Grading Plant in BD</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-2xl sm:text-3xl font-['Fraunces',serif] font-bold text-[#DD8F2A]">100+</div>
                <div className="text-xs sm:text-sm text-cream/80 font-['Space_Mono',monospace] uppercase tracking-wider">Farmers Partnered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="h-[1px] w-full bg-repeat-x bg-[length:14px_1px]" style={{ backgroundImage: 'linear-gradient(90deg, rgba(28,26,20,0.22) 60%, transparent 0%)' }}></div>
    </div>
  );
}

// ----- ABOUT (WITH CORE VALUES & MISSION/VISION INCLUDED - FULL WIDTH FIX) -----
function About() {
  const values = [
    { 
      num: '01', 
      title: 'Quality Excellence', 
      desc: 'Every product exceeds customer expectations, reinforcing our reputation in global markets.' 
    },
    { 
      num: '02', 
      title: 'Sustainability', 
      desc: 'Responsible resource use that empowers local communities, farmers, and the resilience of the agro-industry.' 
    },
    { 
      num: '03', 
      title: 'Integrity & Ethics', 
      desc: 'Transparency and fairness in every dealing — the foundation of trust with our partners and customers.' 
    },
    { 
      num: '04', 
      title: 'Innovation & Growth', 
      desc: 'Continuously improving products and processes to open new markets and advance the agro-industry.' 
    }
  ];

  return (
    <section className="min-h-screen py-[40px] sm:py-[60px] lg:py-[80px] w-full flex items-center bg-white overflow-x-hidden" id="about">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        {/* About Us & Core Values Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-10 lg:mb-16 w-full">
          {/* Left Column - About Us Content */}
          <div className="w-full">
            <div className="font-['Space_Mono',monospace] uppercase text-[0.6rem] sm:text-[0.65rem] lg:text-[0.72rem] tracking-[0.18em] text-[#6BA539] flex items-center gap-2.5 before:content-[''] before:w-[16px] sm:before:w-[18px] lg:before:w-[22px] before:h-[1px] before:bg-[#6BA539] before:inline-block before:flex-shrink-0">
              About Us
            </div>
            <h2 className="font-['Fraunces',serif] text-[1.4rem] sm:text-[1.6rem] lg:text-[2rem] xl:text-[2.3rem] my-[8px] sm:my-[10px] lg:my-[14px] leading-tight text-[#1F4732] break-words">A decade-old name in Bangladesh's export trade.</h2>
            <p className="text-[#4a6b5a] mb-2 sm:mb-3 lg:mb-4 text-[0.85rem] sm:text-[0.9rem] lg:text-[1rem] leading-relaxed break-words">Registered under the Companies Act with a Certificate of Incorporation issued in 2015, Polygon Resource's roots in agro-export trace back to 2008.</p>
            <p className="text-[#4a6b5a] mb-2 sm:mb-3 lg:mb-4 text-[0.85rem] sm:text-[0.9rem] lg:text-[1rem] leading-relaxed break-words">Today the company specializes in fruits, vegetables, potatoes and grains — backed by its own potato grading, sorting and cleaning plant in Rangpur, and Bangladesh's first modern packing and bagging system of its kind.</p>
          </div>

          {/* Right Column - Core Values */}
          <div className="w-full">
            <div className="font-['Space_Mono',monospace] uppercase text-[0.6rem] sm:text-[0.65rem] lg:text-[0.72rem] tracking-[0.18em] text-[#6BA539] flex items-center gap-2.5 mb-[8px] sm:mb-[10px] before:content-[''] before:w-[16px] sm:before:w-[18px] lg:before:w-[22px] before:h-[1px] before:bg-[#6BA539] before:inline-block before:flex-shrink-0">
              Core Values
            </div>
            <h3 className="font-['Fraunces',serif] text-[1.2rem] sm:text-[1.4rem] lg:text-[1.8rem] xl:text-[2.1rem] mb-4 sm:mb-5 lg:mb-6 text-[#1F4732] break-words">What holds the crate together.</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
              {values.map((v, i) => (
                <div 
                  key={i} 
                  className="bg-cream p-[16px_14px] sm:p-[20px_18px] lg:p-[24px_22px] rounded-lg border border-[rgba(28,26,20,0.1)] hover:border-[#1F4732] hover:shadow-[0_8px_30px_rgba(31,71,50,0.15)] transition-all duration-300 hover:-translate-y-1 w-full"
                >
                  <div className="font-['Space_Mono',monospace] text-[0.6rem] sm:text-[0.65rem] lg:text-[0.72rem] text-[#6BA539] mb-1 sm:mb-2">{v.num}</div>
                  <h4 className="font-['Fraunces',serif] text-[0.9rem] sm:text-[0.95rem] lg:text-[1.1rem] text-[#1F4732] font-semibold mb-1 sm:mb-2 break-words">{v.title}</h4>
                  <p className="text-[0.75rem] sm:text-[0.8rem] lg:text-[0.85rem] text-[#4a6b5a] leading-relaxed break-words">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-8 sm:pt-10 border-t border-[rgba(31,71,50,0.1)] w-full">
          <div className="bg-[#1F4732] text-cream p-[24px_20px] sm:p-[28px_24px] lg:p-[38px_34px] rounded-[4px] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full overflow-hidden">
            <div className="font-['Space_Mono',monospace] uppercase text-[0.6rem] sm:text-[0.65rem] lg:text-[0.72rem] tracking-[0.18em] text-[#9fd18a] flex items-center gap-2.5 before:content-[''] before:w-[16px] sm:before:w-[18px] lg:before:w-[22px] before:h-[1px] before:bg-[#9fd18a] before:inline-block before:flex-shrink-0">
              Mission
            </div>
            <h3 className="font-['Fraunces',serif] text-[1.1rem] sm:text-[1.2rem] lg:text-[1.5rem] text-cream mb-[8px] sm:mb-[10px] lg:mb-[14px] break-words">Quality, at every step.</h3>
            <p className="text-[0.85rem] sm:text-[0.9rem] lg:text-[0.95rem] opacity-90 leading-relaxed break-words">To provide the highest quality agricultural products to global markets while fostering sustainable practices — delivering value through innovation, ethical sourcing and unwavering commitment to excellence.</p>
          </div>
          <div className="bg-[#6BA539] text-cream p-[24px_20px] sm:p-[28px_24px] lg:p-[38px_34px] rounded-[4px] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full overflow-hidden">
            <div className="font-['Space_Mono',monospace] uppercase text-[0.6rem] sm:text-[0.65rem] lg:text-[0.72rem] tracking-[0.18em] text-[#DD8F2A] flex items-center gap-2.5 before:content-[''] before:w-[16px] sm:before:w-[18px] lg:before:w-[22px] before:h-[1px] before:bg-[#DD8F2A] before:inline-block before:flex-shrink-0">
              Vision
            </div>
            <h3 className="font-['Fraunces',serif] text-[1.1rem] sm:text-[1.2rem] lg:text-[1.5rem] text-cream mb-[8px] sm:mb-[10px] lg:mb-[14px] break-words">A globally recognized leader.</h3>
            <p className="text-[0.85rem] sm:text-[0.9rem] lg:text-[0.95rem] opacity-90 leading-relaxed break-words">To become a globally recognized leader in agricultural exports — building lasting relationships through superior products and high standards of quality, innovation and environmental stewardship.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- CEO MESSAGE (PREMIUM & ATTRACTIVE) -----
function CEOMessage() {
  return (
    <section className="min-h-screen py-[60px] sm:py-[80px] lg:py-[100px] w-full bg-gradient-to-b from-[#fafcf8] to-[#f0f5ed] flex items-center" id="ceo-message">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Decorative Elements */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#6BA539]"></div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6BA539]"></span>
                <span className="font-['Space_Mono',monospace] uppercase text-[0.6rem] sm:text-[0.7rem] tracking-[0.25em] text-[#6BA539] font-semibold">
                  Message from Our CEO
                </span>
                <span className="w-2 h-2 rounded-full bg-[#6BA539]"></span>
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#6BA539]"></div>
            </div>
            <h2 className="font-['Fraunces',serif] text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] text-[#1F4732] leading-tight">
              A Commitment to <br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="text-[#6BA539]">Quality & Sustainability</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#6BA539] to-[#DD8F2A] rounded-full opacity-60"></span>
              </span>
            </h2>
          </div>

          {/* Main Content Card */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-0 lg:gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden border border-[rgba(31,71,50,0.08)] hover:shadow-[0_25px_70px_rgba(31,71,50,0.12)] transition-all duration-700">
            
            {/* Left - Message Content */}
            <div className="p-8 sm:p-10 lg:p-14 order-2 lg:order-1 relative">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#6BA539]/5 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#DD8F2A]/5 to-transparent rounded-full translate-x-20 translate-y-20"></div>
              
              {/* Large quote mark */}
              <div className="absolute top-6 right-8 text-8xl font-serif text-[#6BA539]/8 leading-none">"</div>
              
              <div className="relative z-10">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 font-['Space_Mono',monospace] text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.15em] text-[#6BA539] bg-gradient-to-r from-[#e8f5e8] to-[#f0f8f0] px-4 py-2 rounded-full border border-[#6BA539]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6BA539] animate-pulse"></span>
                    Dear Valued Partners and Customers
                  </span>
                </div>
                
                <div className="space-y-4 text-[#3a382e]">
                  <p className="text-[0.95rem] sm:text-[1.05rem] lg:text-[1.1rem] leading-relaxed">
                    Welcome to <span className="font-semibold text-[#1F4732] relative">
                      Polygon Resource
                      <span className="absolute -bottom-0.5 left-0 w-full h-0.5 rounded-full"></span>
                    </span>! As the CEO, I am proud to lead a team dedicated to excellence in the agricultural export industry. Our commitment is to provide you not only with the highest quality products but also with an unmatched service rooted in integrity and sustainability.
                  </p>
                  
                  <p className="text-[0.95rem] sm:text-[1.05rem] lg:text-[1.1rem] leading-relaxed">
                    In an ever-changing world, we understand the importance of ensuring food security and promoting responsible sourcing practices. Our partnerships with local farmers and communities allow us to bring fresh, ethically produced agricultural goods to markets around the globe. Together, we are not just exporting goods; we are building bridges between cultures and economies.
                  </p>
                  
                  <p className="text-[0.95rem] sm:text-[1.05rem] lg:text-[1.1rem] leading-relaxed">
                    At Polygon Resource, we believe that collaboration and innovation drive success. We continually seek ways to improve our processes and services to meet the evolving needs of our customers while preserving the environment and supporting the livelihoods of the farmers we work with.
                  </p>
                  
                  <p className="text-[0.95rem] sm:text-[1.05rem] lg:text-[1.1rem] leading-relaxed">
                    Thank you for choosing us as your partner in agricultural exports. Together, we can cultivate a sustainable future.
                  </p>
                </div>

                {/* Signature Section with Design */}
                <div className="mt-8 pt-6 border-t-2 border-[rgba(31,71,50,0.06)] relative">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1F4732] to-[#6BA539] flex items-center justify-center text-white font-['Fraunces',serif] text-2xl font-bold shadow-lg shadow-[#1F4732]/20">
                        RS
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#DD8F2A] rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-['Fraunces',serif] text-[1.1rem] sm:text-[1.3rem] text-[#1F4732] font-semibold">
                        Warm regards,
                      </p>
                      <p className="font-['Fraunces',serif] text-[1rem] sm:text-[1.1rem] text-[#1F4732] font-bold mt-0.5">
                        Md. Rashed Shamim Chowdhury
                      </p>
                      <p className="font-['Space_Mono',monospace] text-[0.55rem] sm:text-[0.6rem] text-[#6BA539] uppercase tracking-[0.1em] mt-0.5 flex items-center gap-2">
                        <span className="w-6 h-px bg-[#6BA539]"></span>
                        CEO & Managing Director
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Image Side (Premium) */}
            <div className="order-1 lg:order-2 relative overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-[450px] group">
              <img 
                src="/dp.jpeg"
                alt="CEO - Md. Rashed Shamim Chowdhury"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Gradient overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10"></div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-6 right-6 w-20 h-20 border-t-2 border-r-2 border-white/30 rounded-tr-xl"></div>
              <div className="absolute bottom-6 left-6 w-20 h-20 border-b-2 border-l-2 border-white/30 rounded-bl-xl"></div>
              
              {/* CEO Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-16 bg-gradient-to-b from-[#000000] to-[#325018] rounded-full"></div>
                  <div>
                    <p className="font-['Fraunces',serif] text-xl sm:text-2xl text-white font-semibold tracking-wide">
                      Md. Rashed Shamim Chowdhury
                    </p>
                    <p className="font-['Space_Mono',monospace] text-xs sm:text-sm text-white/80 uppercase tracking-[0.1em] flex items-center gap-2 mt-1">
                      <span className="w-6 h-px bg-[#a35e03]"></span>
                      CEO & Managing Director
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          

          {/* Bottom decorative element */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#6BA539]"></div>
              <div className="w-2 h-2 rounded-full bg-[#6BA539]"></div>
              <div className="w-16 h-px bg-[#6BA539]"></div>
              <div className="w-2 h-2 rounded-full bg-[#6BA539]"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#6BA539]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- PRODUCTS (FIXED IMAGE LOADING) -----
const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Oilseeds'];

function Products() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [imageErrors, setImageErrors] = useState({});

  const products = [
    { 
      name: 'Pineapple', 
      category: 'Fruits', 
      desc: 'Sourced from Madhupur, the "Pineapple Capital" of Bangladesh, prized for its red-soil sweetness.', 
      tags: ['Jun–Aug harvest', 'Madhupur & Tangail'], 
      bg: 'linear-gradient(140deg,#DD8F2A,#a85f13)',
      image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      fallback: 'https://images.unsplash.com/photo-1550258987-190f2d41a8ba?w=400&h=300&fit=crop'
    },
    { 
      name: 'Guava', 
      category: 'Fruits', 
      desc: 'Thai guava varieties make up the bulk of national production, grown across Rajshahi\'s hill and riverine districts.', 
      tags: ['430K+ tonnes/yr BD', 'Rajshahi'], 
      bg: 'linear-gradient(140deg,#9CC96B,#5f8a3a)',
      image: 'https://images.unsplash.com/photo-1689996647327-5d263fbbc79d?w=500&auto=format&fit=crop&q=60',
      fallback: 'https://images.unsplash.com/photo-1528825871115-3581a7d6b9b4?w=400&h=300&fit=crop'
    },
    { 
      name: 'Mango', 
      category: 'Fruits', 
      desc: 'Nearly 100 cultivars nationwide — Fazlee, Langda, Himsagar and more, sourced from Rajshahi\'s peak growing districts.', 
      tags: ['Dec–Feb blossom', 'Rajshahi'], 
      bg: 'linear-gradient(140deg,#6BA539,#2f6b2c)',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop'
    },
    { 
      name: 'Watermelon', 
      category: 'Fruits', 
      desc: 'Coastal-grown for peak sweetness — from Patuakhali, Khulna, Bhola, Noakhali and Barguna\'s sandy soils.', 
      tags: ['Feb–Apr season', 'Coastal belt'], 
      bg: 'linear-gradient(140deg,#E24E4E,#8f2323)',
      image: 'https://images.unsplash.com/photo-1675346980561-66d6231f8bf7?w=500&auto=format&fit=crop&q=60',
      fallback: 'https://images.unsplash.com/photo-1563114771-64e7deedb02e?w=400&h=300&fit=crop'
    },
    { 
      name: 'Potato', 
      category: 'Vegetables', 
      desc: 'Our flagship line — graded, sorted and cleaned at our own Rangpur facility with modern packing infrastructure.', 
      tags: ['Own processing plant', 'Rangpur'], 
      bg: 'linear-gradient(140deg,#8A5A32,#54371d)',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop'
    },
    { 
      name: 'Cabbage', 
      category: 'Vegetables', 
      desc: 'Fresh, crisp cabbage grown in the highlands of Bangladesh, perfect for export.', 
      tags: ['Fresh', 'Crisp'], 
      bg: 'linear-gradient(140deg,#6BA539,#4a7c32)',
      image: 'https://images.unsplash.com/photo-1652860213441-6622f9fec77f?w=500&auto=format&fit=crop&q=60',
      fallback: 'https://images.unsplash.com/photo-1594284986719-2c13062c7e9b?w=400&h=300&fit=crop'
    },
    { 
      name: 'Cauliflower', 
      category: 'Vegetables', 
      desc: 'Premium cauliflower, carefully cultivated and harvested for export markets.', 
      tags: ['Premium Quality', 'Fresh'], 
      bg: 'linear-gradient(140deg,#F5F5DC,#e0e0c8)',
      image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&h=300&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&h=300&fit=crop'
    },
    { 
      name: 'Pumpkin', 
      category: 'Vegetables', 
      desc: 'Nutritious pumpkin varieties grown across Bangladesh, rich in vitamins and minerals.', 
      tags: ['Organic', 'Nutritious'], 
      bg: 'linear-gradient(140deg,#E8A317,#c4881a)',
      image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&h=300&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&h=300&fit=crop'
    },
    { 
      name: 'Young Jackfruit', 
      category: 'Vegetables', 
      desc: 'Tender young jackfruit, a versatile vegetable popular in South Asian cuisine.', 
      tags: ['Versatile', 'Traditional'], 
      bg: 'linear-gradient(140deg,#6BA539,#2f6b2c)',
      image: 'https://images.unsplash.com/photo-1651565919334-bf81165cd0a3?w=500&auto=format&fit=crop&q=60',
      fallback: 'https://images.unsplash.com/photo-1582789295823-8c4f6c66b028?w=400&h=300&fit=crop'
    },
    { 
      name: 'Sesame Seeds', 
      category: 'Oilseeds', 
      desc: 'Premium quality sesame seeds, rich in oil content and perfect for export.', 
      tags: ['High Oil Content', 'Premium'], 
      bg: 'linear-gradient(140deg,#D4A373,#b8895c)',
      image: 'https://images.unsplash.com/photo-1731970820339-e725b78f55e4?w=500&auto=format&fit=crop&q=60',
      fallback: 'https://images.unsplash.com/photo-1615485500704-8e990f8d3c3b?w=400&h=300&fit=crop'
    },
    { 
      name: 'Groundnut', 
      category: 'Oilseeds', 
      desc: 'High-quality groundnuts sourced from Bangladeshi farmers, suitable for oil extraction.', 
      tags: ['High Yield', 'Premium Grade'], 
      bg: 'linear-gradient(140deg,#C9A227,#8a6a17)',
      image: 'https://images.unsplash.com/photo-1694654359031-e2db00bd0e93?w=500&auto=format&fit=crop&q=60',
      fallback: 'https://images.unsplash.com/photo-1694654359031-e2db00bd0e93?w=500&auto=format&fit=crop&q=60'
    },
  ];

  const filtered = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  const handleImageError = (e, productIndex) => {
    const img = e.currentTarget;
    const product = filtered[productIndex];
    
    if (product.fallback && !img.dataset.fallbackUsed) {
      img.dataset.fallbackUsed = '1';
      img.src = product.fallback;
    } else {
      img.style.display = 'none';
      if (img.parentElement) {
        img.parentElement.style.background = product.bg;
      }
    }
  };

  return (
    <section className="py-[60px] sm:py-[80px] lg:py-[100px] w-full bg-[#f8faf8]" id="products">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8 sm:mb-11 flex-wrap gap-3 sm:gap-4">
          <div>
            <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#6BA539] flex items-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#6BA539] before:inline-block">
              Our Products
            </div>
            <h2 className="font-['Fraunces',serif] text-[1.8rem] sm:text-[2rem] lg:text-[2.3rem] mt-[10px] sm:mt-[14px] text-[#1F4732]">Grown for export, graded for trust.</h2>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setImageErrors({});
              }}
              className={
                'font-["Space_Mono",monospace] text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.05em] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-colors ' +
                (activeCategory === cat
                  ? 'bg-[#1F4732] text-white border-[#1F4732]'
                  : 'border-[rgba(31,71,50,0.22)] hover:bg-[#1F4732] hover:text-white')
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-[22px]">
          {filtered.map((p, index) => (
            <div key={index} className="border border-[rgba(31,71,50,0.15)] rounded-[4px] overflow-hidden bg-white hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(31,71,50,0.15)] transition-all duration-300">
              <div className="h-[200px] sm:h-[220px] relative overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e, index)}
                  loading="lazy"
                />
                <div className="absolute top-2 right-2">
                  <span className="font-['Space_Mono',monospace] text-white text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.1em] bg-black/40 px-[7px] sm:px-[9px] py-0.5 sm:py-1 rounded-full backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>
              </div>
              <div className="p-[16px_16px_20px] sm:p-[20px_20px_24px]">
                <h4 className="font-['Fraunces',serif] text-[1.1rem] sm:text-[1.2rem] lg:text-[1.3rem] text-[#1F4732] mb-1.5 sm:mb-2">{p.name}</h4>
                <p className="text-[0.8rem] sm:text-[0.86rem] text-[#4a6b5a] mb-2 sm:mb-3 line-clamp-2">{p.desc}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {p.tags.map((tag, j) => (
                    <span key={j} className="font-['Space_Mono',monospace] text-[0.6rem] sm:text-[0.65rem] border border-[rgba(31,71,50,0.15)] px-1.5 sm:px-2 py-[2px] sm:py-[3px] rounded-full text-[#6BA539]">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----- ROUTES -----
function Routes() {
  const countries = ['Russia', 'Singapore', 'Malaysia', 'China', 'Senegal', 'Saudi Arabia', 'Italy', 'Ukraine'];
  const rotations = ['-6deg', '4deg', '-3deg', '5deg', '-5deg', '3deg', '-4deg', '6deg'];

  return (
    <section className="py-[30px] sm:py-5 pb-[60px] sm:pb-[80px] lg:pb-[110px] text-center w-full bg-white" id="routes">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#6BA539] flex items-center justify-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#6BA539] before:inline-block">
          Where We Ship
        </div>
        <h2 className="font-['Fraunces',serif] text-[1.6rem] sm:text-[1.8rem] lg:text-2xl mt-[10px] sm:mt-[14px] mb-6 sm:mb-8 lg:mb-10 text-[#1F4732]">Eight countries. One quality standard.</h2>
        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 max-w-[820px] mx-auto">
          {countries.map((c, i) => (
            <div key={i} className="w-[80px] h-[80px] sm:w-[95px] sm:h-[95px] lg:w-[110px] lg:h-[110px] rounded-full border-2 border-[#1F4732] flex flex-col items-center justify-center text-center font-['Space_Mono',monospace] text-[#1F4732] hover:bg-[#1F4732] hover:text-white transition-all duration-300" style={{ transform: `rotate(${rotations[i]})` }}>
              <b className="text-[0.65rem] sm:text-[0.7rem] lg:text-[0.78rem]">{c}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----- CTA -----
function CTA({ onGetInTouch }) {
  return (
    <section className="bg-[#1F4732] text-white py-[50px] sm:py-[60px] lg:py-[70px] text-center w-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="font-['Fraunces',serif] text-[1.6rem] sm:text-[1.8rem] lg:text-2xl text-white mb-4 sm:mb-5">Ready to source from Polygon Resource?</h2>
        <button 
          onClick={onGetInTouch}
          className="font-semibold text-[0.85rem] sm:text-[0.92rem] px-[20px] sm:px-[26px] py-[12px] sm:py-[14px] rounded-[2px] inline-flex items-center gap-2 bg-white text-[#1F4732] hover:bg-[#DD8F2A] transition-colors cursor-pointer shadow-lg hover:shadow-xl"
        >
          Start a Conversation →
        </button>
      </div>
    </section>
  );
}

// ----- CONTACT SECTION -----
function ContactSection() {
  return (
    <section className="py-[60px] sm:py-[80px] lg:py-[100px] w-full bg-white" id="contact">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#6BA539] flex items-center justify-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#6BA539] before:inline-block">
              Contact Details
            </div>
            <h2 className="font-['Fraunces',serif] text-[2rem] sm:text-[2.5rem] lg:text-[3rem] mt-3 sm:mt-4 text-[#1F4732]">Let's Discuss Opportunities</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg border border-[rgba(31,71,50,0.1)]">
                <h3 className="font-['Fraunces',serif] text-xl sm:text-2xl text-[#1F4732] mb-3">Quick Trade Inquiry</h3>
                <p className="text-[#4a6b5a] text-sm sm:text-base mb-4">
                  Connect with us to inquire about global supply pricing, samples, or tailored indenting services from Bangladesh.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-['Space_Mono',monospace] text-xs sm:text-sm text-[#6BA539] uppercase tracking-wider mb-1">Call Support</h4>
                    <p className="text-[#1C1A14] font-medium">+8801711-234567</p>
                  </div>
                  <div>
                    <h4 className="font-['Space_Mono',monospace] text-xs sm:text-sm text-[#6BA539] uppercase tracking-wider mb-1">Email Support</h4>
                    <p className="text-[#1C1A14] font-medium">trade@polygonresource.com</p>
                  </div>
                  <div>
                    <h4 className="font-['Space_Mono',monospace] text-xs sm:text-sm text-[#6BA539] uppercase tracking-wider mb-1">Our Head Office</h4>
                    <p className="text-[#1C1A14] leading-relaxed">
                      House 42, Road 12, Sector 3,<br />
                      Uttara, Dhaka-1230<br />
                      Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg border border-[rgba(31,71,50,0.1)]">
                <form className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block font-['Space_Mono',monospace] text-xs sm:text-sm text-[#6BA539] uppercase tracking-wider mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 sm:py-3 border border-[rgba(31,71,50,0.2)] rounded-md focus:outline-none focus:border-[#1F4732] transition-colors bg-[#FAF8F3] text-[#1C1A14] placeholder:text-[#8a8368]"
                    />
                  </div>

                  <div>
                    <label className="block font-['Space_Mono',monospace] text-xs sm:text-sm text-[#6BA539] uppercase tracking-wider mb-1.5">
                      Business Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. john@business.com"
                      className="w-full px-4 py-2.5 sm:py-3 border border-[rgba(31,71,50,0.2)] rounded-md focus:outline-none focus:border-[#1F4732] transition-colors bg-[#FAF8F3] text-[#1C1A14] placeholder:text-[#8a8368]"
                    />
                  </div>

                  <div>
                    <label className="block font-['Space_Mono',monospace] text-xs sm:text-sm text-[#6BA539] uppercase tracking-wider mb-1.5">
                      Detailed Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="5"
                      placeholder="Describe your import requirement, target market or specs..."
                      className="w-full px-4 py-2.5 sm:py-3 border border-[rgba(31,71,50,0.2)] rounded-md focus:outline-none focus:border-[#1F4732] transition-colors bg-[#FAF8F3] text-[#1C1A14] placeholder:text-[#8a8368] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1F4732] text-white py-3 sm:py-3.5 rounded-md font-semibold hover:bg-[#6BA539] transition-colors text-sm sm:text-base"
                  >
                    SEND TRADE INQUIRY
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- FOOTER -----
function Footer() {
  return (
    <footer className="bg-[#1F4732] text-white py-[40px] sm:py-[50px] lg:py-[60px] pb-[20px] sm:pb-[25px] lg:pb-[30px] w-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-6 sm:gap-8 lg:gap-10">
        <div className="foot-brand">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] flex-shrink-0">
              <img 
                src="/Polygon Logo-2.jpg.jpeg" 
                alt="Polygon Resource Logo" 
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <div className="font-['Fraunces',serif] font-bold text-[0.9rem] sm:text-[1.05rem] text-white leading-tight">
              POLYGON RESOURCE
              <span className="block font-['Space_Mono',monospace] font-normal text-[0.55rem] sm:text-[0.62rem] tracking-[0.14em] text-[#6BA539] mt-0.5">xplore possibilities</span>
            </div>
          </div>
          <p className="mt-[10px] sm:mt-[14px] text-[0.8rem] sm:text-[0.86rem] text-[#c7c0a9] max-w-[34ch]">An agricultural-based export company delivering premium fruits, vegetables, potatoes and grains from Bangladesh to the world.</p>
        </div>
        <div>
          <h5 className="font-['Space_Mono',monospace] text-[0.65rem] sm:text-[0.72rem] uppercase tracking-[0.1em] text-[#6BA539] mb-3 sm:mb-4">Contact</h5>
          <p className="text-[0.8rem] sm:text-[0.88rem] text-[#e5dfc9] mb-1.5 sm:mb-2">+880 1713-017391</p>
          <p className="text-[0.8rem] sm:text-[0.88rem] text-[#e5dfc9] mb-1.5 sm:mb-2">trade@polygonresource.com</p>
          <p className="text-[0.8rem] sm:text-[0.88rem] text-[#e5dfc9] mb-1.5 sm:mb-2">www.polygonresource.com</p>
        </div>
        <div>
          <h5 className="font-['Space_Mono',monospace] text-[0.65rem] sm:text-[0.72rem] uppercase tracking-[0.1em] text-[#6BA539] mb-3 sm:mb-4">Address</h5>
          <p className="text-[0.8rem] sm:text-[0.88rem] text-[#e5dfc9] mb-1.5 sm:mb-2">House 42, Road 12, Sector 3,<br/>Uttara, Dhaka-1230, Bangladesh</p>
        </div>
      </div>
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mt-[30px] sm:mt-[40px] lg:mt-[50px] pt-4 sm:pt-5 lg:pt-6 border-t border-[rgba(237,230,212,0.15)] text-[0.65rem] sm:text-[0.75rem] text-[#8a8368] flex justify-between flex-wrap gap-2 sm:gap-2.5">
        <span>© 2026 Polygon Resource. All rights reserved.</span>
        <span>Website preview — built from your business profile</span>
      </div>
    </footer>
  );
}

export default App;