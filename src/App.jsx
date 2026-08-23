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
      <Hero />
      <Divider />
      <About />
      <MissionVision />
      <Values />
      {/* <CEO /> */}
      <CEOMessage /> {/* New component added here */}
      <Products />
      <Routes />
      <CTA onGetInTouch={scrollToContact} />
      <ContactSection />
      <Footer />
    </div>
  );
}

// ----- HEADER -----
function Header({ onGetInTouch }) {
  return (
    <header className="sticky top-0 z-50 bg-cream/92 backdrop-blur-sm border-b border-[rgba(28,26,20,0.22)] w-full">
      <nav className="w-full px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between py-[18px]">
        <a href="#home" className="flex items-center gap-2 sm:gap-3">
          <div className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] flex-shrink-0">
            <img 
              src="/Polygon Logo-2.jpg.jpeg" 
              alt="Polygon Resource Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="font-['Fraunces',serif] font-bold text-[0.9rem] sm:text-[1.05rem] text-[#12301F] leading-tight">
            POLYGON RESOURCE
            <span className="block font-['Space_Mono',monospace] font-normal text-[0.55rem] sm:text-[0.62rem] tracking-[0.14em] text-[#8A5A32] mt-0.5">xplore possibilities</span>
          </div>
        </a>
        <div className="hidden md:flex gap-6 lg:gap-[34px] text-[0.85rem] lg:text-[0.9rem] font-medium">
          <a href="#home" className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#1F4732] after:transition-[width] after:duration-300 hover:after:w-full">Home</a>
          <a href="#about" className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#1F4732] after:transition-[width] after:duration-300 hover:after:w-full">About us</a>
          <a href="#products" className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#1F4732] after:transition-[width] after:duration-300 hover:after:w-full">Products</a>
          <a href="#blogs" className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#1F4732] after:transition-[width] after:duration-300 hover:after:w-full">Blogs</a>
        </div>
        <button 
          onClick={onGetInTouch}
          className="font-['Space_Mono',monospace] text-[0.65rem] sm:text-[0.72rem] uppercase tracking-[0.08em] border border-[#12301F] px-3 sm:px-4 py-[7px] sm:py-[9px] rounded-[2px] hover:bg-[#12301F] hover:text-cream transition-colors whitespace-nowrap cursor-pointer"
        >
          Get in Touch
        </button>
      </nav>
    </header>
  );
}

// ----- HERO -----
const HERO_STATS = [
  { num: '15+', label: 'Years in agri-trade' },
  { num: '08', label: 'Export countries' },
  { num: '#1', label: 'Own grading plant in BD' }
];

const CHIP_ROTATIONS = ['-4deg', '2deg', '-2deg', '3deg', '-3deg', '1deg'];

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden z-[1] w-full py-[60px] sm:py-[80px] lg:py-[88px] pb-[40px] sm:pb-[50px] lg:pb-[60px]">
      <div className="hero-blob hero-blob-green" aria-hidden="true"></div>
      <div className="hero-blob hero-blob-orange" aria-hidden="true"></div>

      <div className="relative w-full px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 sm:gap-8 lg:gap-14 items-center">
        <div className="hero-copy">
          <div className="hero-fade font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#8A5A32] flex items-center gap-2.5 mb-[18px] sm:mb-[22px] before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#8A5A32] before:inline-block" style={{ animationDelay: '0.05s' }}>
            Est. 2015 · Dhaka, Bangladesh
          </div>
          <h1 className="hero-fade font-['Fraunces',serif] text-[clamp(2rem,6vw,4.1rem)] font-bold leading-[0.98] tracking-[-0.02em]" style={{ animationDelay: '0.15s' }}>
            From Bangladesh's soil<br className="hidden sm:block"/>to the world's <em className="table-accent not-italic font-medium text-[#6BA539]">table.</em>
          </h1>
          <p className="hero-fade mt-4 sm:mt-6 max-w-[46ch] text-[0.95rem] sm:text-[1.08rem] text-[#3a382e]" style={{ animationDelay: '0.25s' }}>
            Polygon Resource grows, grades and exports premium fruits, vegetables, potatoes and grains — built on a decade of trade relationships from Rangpur's processing floor to ports across three continents.
          </p>
          <div className="hero-fade flex gap-3 sm:gap-3.5 mt-[26px] sm:mt-[34px] flex-wrap" style={{ animationDelay: '0.35s' }}>
            <a href="#products" className="group font-semibold text-[0.85rem] sm:text-[0.92rem] px-[20px] sm:px-[26px] py-[12px] sm:py-[14px] rounded-[2px] inline-flex items-center gap-2 bg-[#12301F] text-cream hover:bg-[#1F4732] transition-colors">
              View Our Products <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </a>
          </div>
          <div className="hero-fade mt-[30px] sm:mt-[40px] pt-[16px] sm:pt-[20px] border-t border-dashed border-[rgba(28,26,20,0.25)] flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-4" style={{ animationDelay: '0.5s' }}>
            {HERO_STATS.map((s, i) => (
              <div key={i} className="cursor-default">
                <div className="font-['Fraunces',serif] text-[1.35rem] sm:text-[1.6rem] font-bold text-[#1F4732] leading-none">{s.num}</div>
                <div className="font-['Space_Mono',monospace] uppercase text-[0.55rem] sm:text-[0.62rem] tracking-[0.08em] text-[#8A5A32] mt-[5px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-fade relative mt-[30px] lg:mt-0" style={{ animationDelay: '0.3s' }}>
          
          <div className="manifest-card bg-[#12301F] text-cream rounded-[4px] p-[24px_20px] sm:p-[30px_28px] shadow-[8px_8px_0_#DD8F2A] sm:shadow-[10px_10px_0_#DD8F2A]">
            <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
              <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#9fd18a] flex items-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#9fd18a] before:inline-block">
                Shipping Manifest
              </div>
              <span className="live-pill shrink-0 font-['Space_Mono',monospace] uppercase text-[0.5rem] sm:text-[0.55rem] tracking-[0.1em] text-[#9fd18a] border border-[rgba(159,209,138,0.5)] rounded-full px-[8px] py-[3px] pl-[16px]">Active</span>
            </div>
            <div className="manifest-row flex justify-between py-2 border-b border-dashed border-[rgba(237,230,212,0.25)] font-['Space_Mono',monospace] text-[0.7rem] sm:text-[0.82rem]">
              <span>Product line</span><b className="font-bold">Fruit · Veg · Potato · Grain</b>
            </div>
            <div className="manifest-row flex justify-between py-2 border-b border-dashed border-[rgba(237,230,212,0.25)] font-['Space_Mono',monospace] text-[0.7rem] sm:text-[0.82rem]">
              <span>Origin facility</span><b className="font-bold">Rangpur District</b>
            </div>
            <div className="manifest-row flex justify-between py-2 border-b border-dashed border-[rgba(237,230,212,0.25)] font-['Space_Mono',monospace] text-[0.7rem] sm:text-[0.82rem]">
              <span>Grading system</span><b className="font-bold">Own plant — 1st in BD</b>
            </div>
            <div className="manifest-row flex justify-between py-2 border-b border-dashed border-[rgba(237,230,212,0.25)] font-['Space_Mono',monospace] text-[0.7rem] sm:text-[0.82rem]">
              <span>Trading since</span><b className="font-bold">2008</b>
            </div>
            <div className="manifest-row flex justify-between py-2 font-['Space_Mono',monospace] text-[0.7rem] sm:text-[0.82rem]">
              <span>Incorporated</span><b className="font-bold">Oct 14, 2015</b>
            </div>
            <div className="mt-[16px] sm:mt-[22px] flex flex-wrap gap-1.5 sm:gap-2">
              {['Russia','Singapore','Malaysia','China','Italy','+3 more'].map((item, i) => (
                <span key={item} style={{ '--r': CHIP_ROTATIONS[i] }} className="chip font-['Space_Mono',monospace] text-[0.55rem] sm:text-[0.62rem] uppercase tracking-[0.05em] border border-[rgba(237,230,212,0.5)] rounded-full px-[8px] sm:px-[11px] py-[4px] sm:py-[5px] text-[#d7cfb8]">
                  {item}
                </span>
              ))}
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

// ----- ABOUT -----
function About() {
  return (
    <section className="py-[60px] sm:py-[80px] lg:py-[100px] w-full" id="about">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 sm:gap-8 lg:gap-16">
        <div>
          <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#8A5A32] flex items-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#8A5A32] before:inline-block">
            About Us
          </div>
          <h2 className="font-['Fraunces',serif] text-[1.8rem] sm:text-[2rem] lg:text-[2.3rem] my-[10px] sm:my-[14px] leading-tight text-[#12301F]">A decade-old name in Bangladesh's export trade.</h2>
          <p className="text-[#3a382e] mb-3 sm:mb-4 max-w-[56ch] text-[0.9rem] sm:text-[1rem]">Registered under the Companies Act with a Certificate of Incorporation issued in 2015, Polygon Resource's roots in agro-export trace back to 2008.</p>
          <p className="text-[#3a382e] mb-3 sm:mb-4 max-w-[56ch] text-[0.9rem] sm:text-[1rem]">Today the company specializes in fruits, vegetables, potatoes and grains — backed by its own potato grading, sorting and cleaning plant in Rangpur, and Bangladesh's first modern packing and bagging system of its kind.</p>
        </div>
        <div className="grid grid-cols-2 gap-[1px] bg-[rgba(28,26,20,0.22)] border border-[rgba(28,26,20,0.22)] mt-0 sm:mt-2">
          <div className="bg-cream p-[18px_16px] sm:p-[24px_22px]">
            <div className="font-['Fraunces',serif] text-[1.6rem] sm:text-[1.8rem] lg:text-[2.1rem] font-bold text-[#1F4732]">2008</div>
            <div className="text-[0.65rem] sm:text-[0.78rem] text-[#8A5A32] font-['Space_Mono',monospace] uppercase tracking-[0.06em] mt-1">Trading Since</div>
          </div>
          <div className="bg-cream p-[18px_16px] sm:p-[24px_22px]">
            <div className="font-['Fraunces',serif] text-[1.6rem] sm:text-[1.8rem] lg:text-[2.1rem] font-bold text-[#1F4732]">2015</div>
            <div className="text-[0.65rem] sm:text-[0.78rem] text-[#8A5A32] font-['Space_Mono',monospace] uppercase tracking-[0.06em] mt-1">Incorporated</div>
          </div>
          <div className="bg-cream p-[18px_16px] sm:p-[24px_22px]">
            <div className="font-['Fraunces',serif] text-[1.6rem] sm:text-[1.8rem] lg:text-[2.1rem] font-bold text-[#1F4732]">8</div>
            <div className="text-[0.65rem] sm:text-[0.78rem] text-[#8A5A32] font-['Space_Mono',monospace] uppercase tracking-[0.06em] mt-1">Export Countries</div>
          </div>
          <div className="bg-cream p-[18px_16px] sm:p-[24px_22px]">
            <div className="font-['Fraunces',serif] text-[1.6rem] sm:text-[1.8rem] lg:text-[2.1rem] font-bold text-[#1F4732]">01</div>
            <div className="text-[0.65rem] sm:text-[0.78rem] text-[#8A5A32] font-['Space_Mono',monospace] uppercase tracking-[0.06em] mt-1">Own Grading Plant, Rangpur</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- MISSION / VISION -----
function MissionVision() {
  return (
    <section className="pb-[60px] sm:pb-[80px] lg:pb-[100px] w-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-[#1F4732] text-cream p-[28px_24px] sm:p-[38px_34px] rounded-[4px]">
          <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#9fd18a] flex items-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#9fd18a] before:inline-block">
            Mission
          </div>
          <h3 className="font-['Fraunces',serif] text-[1.3rem] sm:text-[1.5rem] text-cream mb-[10px] sm:mb-[14px]">Quality, at every step.</h3>
          <p className="text-[0.9rem] sm:text-[0.95rem] opacity-90">To provide the highest quality agricultural products to global markets while fostering sustainable practices — delivering value through innovation, ethical sourcing and unwavering commitment to excellence.</p>
        </div>
        <div className="bg-[#8A5A32] text-cream p-[28px_24px] sm:p-[38px_34px] rounded-[4px]">
          <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#f0d9b8] flex items-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#f0d9b8] before:inline-block">
            Vision
          </div>
          <h3 className="font-['Fraunces',serif] text-[1.3rem] sm:text-[1.5rem] text-cream mb-[10px] sm:mb-[14px]">A globally recognized leader.</h3>
          <p className="text-[0.9rem] sm:text-[0.95rem] opacity-90">To become a globally recognized leader in agricultural exports — building lasting relationships through superior products and high standards of quality, innovation and environmental stewardship.</p>
        </div>
      </div>
    </section>
  );
}

// ----- CORE VALUES -----
function Values() {
  const values = [
    { num: '01', title: 'Quality Excellence', desc: 'Every product exceeds customer expectations, reinforcing our reputation in global markets.' },
    { num: '02', title: 'Sustainability', desc: 'Responsible resource use that empowers local communities, farmers, and the resilience of the agro-industry.' },
    { num: '03', title: 'Integrity & Ethics', desc: 'Transparency and fairness in every dealing — the foundation of trust with our partners and customers.' },
    { num: '04', title: 'Innovation & Growth', desc: 'Continuously improving products and processes to open new markets and advance the agro-industry.' }
  ];

  return (
    <section className="py-[30px] sm:py-5 pb-[60px] sm:pb-[80px] lg:pb-[100px] w-full" id="values">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-[30px] sm:mb-[40px] lg:mb-[50px]">
          <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#8A5A32] flex items-center justify-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#8A5A32] before:inline-block">
            Core Values
          </div>
          <h2 className="font-['Fraunces',serif] text-[1.8rem] sm:text-[2rem] lg:text-[2.1rem] mt-[10px] sm:mt-[14px] text-[#12301F]">What holds the crate together.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[rgba(28,26,20,0.22)] border border-[rgba(28,26,20,0.22)]">
          {values.map((v, i) => (
            <div key={i} className="bg-cream p-[24px_18px] sm:p-[32px_24px]">
              <div className="font-['Space_Mono',monospace] text-[0.65rem] sm:text-[0.72rem] text-[#DD8F2A]">{v.num}</div>
              <h4 className="font-['Fraunces',serif] text-[1rem] sm:text-[1.15rem] my-2 sm:my-3 text-[#12301F]">{v.title}</h4>
              <p className="text-[0.8rem] sm:text-[0.86rem] text-[#4a483c]">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----- CEO -----
function CEO() {
  return (
    <section className="bg-[#12301F] text-cream py-[60px] sm:py-[80px] lg:py-[100px] w-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 sm:gap-12 items-center">
        <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] lg:w-[180px] lg:h-[180px] rounded-full bg-gradient-to-br from-[#6BA539] to-[#1F4732] flex items-center justify-center font-['Fraunces',serif] text-[2rem] sm:text-[2.3rem] lg:text-[2.6rem] font-bold border-3 border-[#DD8F2A] mx-auto md:mx-0">
          RS
        </div>
        <div className="text-center md:text-left">
          <blockquote className="font-['Fraunces',serif] italic font-medium text-[1.2rem] sm:text-[1.4rem] lg:text-[1.55rem] leading-[1.45] text-cream">"Together, we are not just exporting goods; we are building bridges between cultures and economies."</blockquote>
          <cite className="block mt-4 sm:mt-6 not-italic font-['Space_Mono',monospace] text-[0.7rem] sm:text-[0.78rem] tracking-[0.04em] text-[#9fd18a]">Md. Rashed Shamim Chowdhury (Shamim) — CEO & Managing Director</cite>
        </div>
      </div>
    </section>
  );
}

// ----- CEO MESSAGE (NEW) -----
function CEOMessage() {
  return (
    <section className="py-[60px] sm:py-[80px] lg:py-[100px] w-full bg-cream" id="ceo-message">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#8A5A32] flex items-center justify-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#8A5A32] before:inline-block">
              Message from Our CEO
            </div>
            <h2 className="font-['Fraunces',serif] text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] mt-3 sm:mt-4 text-[#12301F] leading-tight">
              A Commitment to Quality & Sustainability
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-12 items-center bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Message Content */}
            <div className="p-6 sm:p-8 lg:p-12 order-2 lg:order-1">
              <div className="mb-4">
                <span className="inline-block font-['Space_Mono',monospace] text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.1em] text-[#8A5A32] bg-[#EDE6D4] px-3 py-1 rounded-full">
                  Dear Valued Partners and Customers
                </span>
              </div>
              
              <p className="text-[#3a382e] text-[0.95rem] sm:text-[1.05rem] leading-relaxed mb-4">
                Welcome to <span className="font-semibold text-[#12301F]">Polygon Resource</span>! As the CEO, I am proud to lead a team dedicated to excellence in the agricultural export industry. Our commitment is to provide you not only with the highest quality products but also with an unmatched service rooted in integrity and sustainability.
              </p>
              
              <p className="text-[#3a382e] text-[0.95rem] sm:text-[1.05rem] leading-relaxed mb-4">
                In an ever-changing world, we understand the importance of ensuring food security and promoting responsible sourcing practices. Our partnerships with local farmers and communities allow us to bring fresh, ethically produced agricultural goods to markets around the globe. Together, we are not just exporting goods; we are building bridges between cultures and economies.
              </p>
              
              <p className="text-[#3a382e] text-[0.95rem] sm:text-[1.05rem] leading-relaxed mb-4">
                At Polygon Resource, we believe that collaboration and innovation drive success. We continually seek ways to improve our processes and services to meet the evolving needs of our customers while preserving the environment and supporting the livelihoods of the farmers we work with.
              </p>
              
              <p className="text-[#3a382e] text-[0.95rem] sm:text-[1.05rem] leading-relaxed mb-4">
                Thank you for choosing us as your partner in agricultural exports. Together, we can cultivate a sustainable future.
              </p>

              <div className="mt-6 pt-6 border-t border-[rgba(28,26,20,0.1)]">
                <p className="font-['Fraunces',serif] text-[1.1rem] sm:text-[1.2rem] text-[#12301F] font-semibold">
                  Warm regards,
                </p>
                <p className="font-['Fraunces',serif] text-[1rem] sm:text-[1.1rem] text-[#1F4732] font-bold mt-1">
                  Md. Rashed Shamim Chowdhury (Shamim)
                </p>
                <p className="font-['Space_Mono',monospace] text-[0.65rem] sm:text-[0.7rem] text-[#8A5A32] uppercase tracking-[0.08em]">
                  CEO & Managing Director
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div className="order-1 lg:order-2 h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] relative overflow-hidden">
              <img 
                src="/public/dp.jpeg"
                alt="CEO - Md. Rashed Shamim Chowdhury"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6">
                <div className="text-white">
                  <p className="font-['Fraunces',serif] text-lg sm:text-xl font-semibold">Md. Rashed Shamim Chowdhury</p>
                  <p className="font-['Space_Mono',monospace] text-xs sm:text-sm opacity-80">CEO & Managing Director</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Stats under the message */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 sm:mt-12">
            {[
              { num: '15+', label: 'Years of Excellence' },
              { num: '8', label: 'Export Countries' },
              { num: '100+', label: 'Farmers Partnered' },
              { num: '100%', label: 'Quality Assured' }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-lg p-4 sm:p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="font-['Fraunces',serif] text-[1.5rem] sm:text-[2rem] text-[#1F4732] font-bold">{stat.num}</div>
                <div className="font-['Space_Mono',monospace] text-[0.55rem] sm:text-[0.6rem] text-[#8A5A32] uppercase tracking-[0.06em] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- PRODUCTS -----
function Products() {
  const products = [
    // Fruits
    { 
      name: 'Pineapple', 
      category: 'Fruits', 
      desc: 'Sourced from Madhupur, the "Pineapple Capital" of Bangladesh, prized for its red-soil sweetness.', 
      tags: ['Jun–Aug harvest', 'Madhupur & Tangail'], 
      bg: 'linear-gradient(140deg,#DD8F2A,#a85f13)',
      image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGluZWFwcGxlfGVufDB8fDB8fHww',
      fallback: 'https://images.unsplash.com/photo-1550258987-190f2d41a8ba?w=400&h=300&fit=crop'
    },
    { 
      name: 'Guava', 
      category: 'Fruits', 
      desc: 'Thai guava varieties make up the bulk of national production, grown across Rajshahi\'s hill and riverine districts.', 
      tags: ['430K+ tonnes/yr BD', 'Rajshahi'], 
      bg: 'linear-gradient(140deg,#9CC96B,#5f8a3a)',
      image: 'https://images.unsplash.com/photo-1689996647327-5d263fbbc79d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEd1YXZhfGVufDB8fDB8fHww',
      fallback: 'https://images.unsplash.com/photo-1528825871115-3581a7d6b9b4?w=400&h=300&fit=crop'
    },
    { 
      name: 'Mango', 
      category: 'Fruits', 
      desc: 'Nearly 100 cultivars nationwide — Fazlee, Langda, Himsagar and more, sourced from Rajshahi\'s peak growing districts.', 
      tags: ['Dec–Feb blossom', 'Rajshahi'], 
      bg: 'linear-gradient(140deg,#6BA539,#2f6b2c)',
      image: '/images/mango.jpg',
      fallback: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop'
    },
    { 
      name: 'Watermelon', 
      category: 'Fruits', 
      desc: 'Coastal-grown for peak sweetness — from Patuakhali, Khulna, Bhola, Noakhali and Barguna\'s sandy soils.', 
      tags: ['Feb–Apr season', 'Coastal belt'], 
      bg: 'linear-gradient(140deg,#E24E4E,#8f2323)',
      image: 'https://images.unsplash.com/photo-1675346980561-66d6231f8bf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHdhdGVybWVsb258ZW58MHx8MHx8fDA%3D',
      fallback: 'https://images.unsplash.com/photo-1563114771-64e7deedb02e?w=400&h=300&fit=crop'
    },
    // Vegetables
    { 
      name: 'Potato', 
      category: 'Vegetables', 
      desc: 'Our flagship line — graded, sorted and cleaned at our own Rangpur facility with modern packing infrastructure.', 
      tags: ['Own processing plant', 'Rangpur'], 
      bg: 'linear-gradient(140deg,#8A5A32,#54371d)',
      image: '/images/potato.jpg',
      fallback: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop'
    },
    { 
      name: 'Cabbage', 
      category: 'Vegetables', 
      desc: 'Fresh, crisp cabbage grown in the highlands of Bangladesh, perfect for export.', 
      tags: ['Fresh', 'Crisp'], 
      bg: 'linear-gradient(140deg,#6BA539,#4a7c32)',
      image: 'https://images.unsplash.com/photo-1652860213441-6622f9fec77f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FiYmFnZXxlbnwwfHwwfHx8MA%3D%3D',
      fallback: 'https://images.unsplash.com/photo-1594284986719-2c13062c7e9b?w=400&h=300&fit=crop'
    },
    { 
      name: 'Cauliflower', 
      category: 'Vegetables', 
      desc: 'Premium cauliflower, carefully cultivated and harvested for export markets.', 
      tags: ['Premium Quality', 'Fresh'], 
      bg: 'linear-gradient(140deg,#F5F5DC,#e0e0c8)',
      image: '/images/cauliflower.jpg',
      fallback: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&h=300&fit=crop'
    },
    { 
      name: 'Pumpkin', 
      category: 'Vegetables', 
      desc: 'Nutritious pumpkin varieties grown across Bangladesh, rich in vitamins and minerals.', 
      tags: ['Organic', 'Nutritious'], 
      bg: 'linear-gradient(140deg,#E8A317,#c4881a)',
      image: '/images/pumpkin.jpg',
      fallback: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&h=300&fit=crop'
    },
    { 
      name: 'Young Jackfruit', 
      category: 'Vegetables', 
      desc: 'Tender young jackfruit, a versatile vegetable popular in South Asian cuisine.', 
      tags: ['Versatile', 'Traditional'], 
      bg: 'linear-gradient(140deg,#6BA539,#2f6b2c)',
      image: 'https://images.unsplash.com/photo-1651565919334-bf81165cd0a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW91bmclMjBqYWNrZnJ1aXR8ZW58MHx8MHx8fDA%3D',
      fallback: 'https://images.unsplash.com/photo-1582789295823-8c4f6c66b028?w=400&h=300&fit=crop'
    },
    // Oilseeds
    { 
      name: 'Sesame Seeds', 
      category: 'Oilseeds', 
      desc: 'Premium quality sesame seeds, rich in oil content and perfect for export.', 
      tags: ['High Oil Content', 'Premium'], 
      bg: 'linear-gradient(140deg,#D4A373,#b8895c)',
      image: 'https://images.unsplash.com/photo-1731970820339-e725b78f55e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNlc2FtZSUyMHNlZWRzfGVufDB8fDB8fHww',
      fallback: 'https://images.unsplash.com/photo-1615485500704-8e990f8d3c3b?w=400&h=300&fit=crop'
    },
    { 
      name: 'Groundnut', 
      category: 'Oilseeds', 
      desc: 'High-quality groundnuts sourced from Bangladeshi farmers, suitable for oil extraction.', 
      tags: ['High Yield', 'Premium Grade'], 
      bg: 'linear-gradient(140deg,#C9A227,#8a6a17)',
      image: '/https://images.unsplash.com/photo-1694654359031-e2db00bd0e93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R3JvdW5kbnV0fGVufDB8fDB8fHww',
      fallback: 'https://images.unsplash.com/photo-1694654359031-e2db00bd0e93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R3JvdW5kbnV0fGVufDB8fDB8fHww'
    },
  ];

  return (
    <section className="py-[60px] sm:py-[80px] lg:py-[100px] w-full" id="products">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8 sm:mb-11 flex-wrap gap-3 sm:gap-4">
          <div>
            <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#8A5A32] flex items-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#8A5A32] before:inline-block">
              Our Products
            </div>
            <h2 className="font-['Fraunces',serif] text-[1.8rem] sm:text-[2rem] lg:text-[2.3rem] mt-[10px] sm:mt-[14px] text-[#12301F]">Grown for export, graded for trust.</h2>
          </div>
        </div>
        
        {/* Category labels */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {['All', 'Fruits', 'Vegetables', 'Oilseeds'].map((cat) => (
            <button key={cat} className="font-['Space_Mono',monospace] text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.05em] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[rgba(28,26,20,0.2)] hover:bg-[#12301F] hover:text-cream transition-colors">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-[22px]">
          {products.map((p, i) => (
            <div key={i} className="border border-[rgba(28,26,20,0.22)] rounded-[4px] overflow-hidden bg-cream hover:-translate-y-1.5 hover:shadow-[8px_10px_0_rgba(28,26,20,0.22)] transition-all duration-300">
              <div className="h-[200px] sm:h-[220px] relative overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (p.fallback && !img.dataset.fallbackUsed) {
                      img.dataset.fallbackUsed = '1';
                      img.src = p.fallback;
                    } else {
                      img.style.display = 'none';
                      img.parentElement.style.background = p.bg;
                    }
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className="font-['Space_Mono',monospace] text-white text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.1em] bg-black/40 px-[7px] sm:px-[9px] py-0.5 sm:py-1 rounded-full backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>
              </div>
              <div className="p-[16px_16px_20px] sm:p-[20px_20px_24px]">
                <h4 className="font-['Fraunces',serif] text-[1.1rem] sm:text-[1.2rem] lg:text-[1.3rem] text-[#12301F] mb-1.5 sm:mb-2">{p.name}</h4>
                <p className="text-[0.8rem] sm:text-[0.86rem] text-[#4a483c] mb-2 sm:mb-3 line-clamp-2">{p.desc}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {p.tags.map((tag, j) => (
                    <span key={j} className="font-['Space_Mono',monospace] text-[0.6rem] sm:text-[0.65rem] border border-[rgba(28,26,20,0.22)] px-1.5 sm:px-2 py-[2px] sm:py-[3px] rounded-full text-[#8A5A32]">{tag}</span>
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
    <section className="py-[30px] sm:py-5 pb-[60px] sm:pb-[80px] lg:pb-[110px] text-center w-full" id="routes">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#8A5A32] flex items-center justify-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#8A5A32] before:inline-block">
          Where We Ship
        </div>
        <h2 className="font-['Fraunces',serif] text-[1.6rem] sm:text-[1.8rem] lg:text-2xl mt-[10px] sm:mt-[14px] mb-6 sm:mb-8 lg:mb-10 text-[#12301F]">Eight countries. One quality standard.</h2>
        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 max-w-[820px] mx-auto">
          {countries.map((c, i) => (
            <div key={i} className="w-[80px] h-[80px] sm:w-[95px] sm:h-[95px] lg:w-[110px] lg:h-[110px] rounded-full border-2 border-[#1F4732] flex flex-col items-center justify-center text-center font-['Space_Mono',monospace] text-[#12301F]" style={{ transform: `rotate(${rotations[i]})` }}>
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
    <section className="bg-[#1F4732] text-cream py-[50px] sm:py-[60px] lg:py-[70px] text-center w-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="font-['Fraunces',serif] text-[1.6rem] sm:text-[1.8rem] lg:text-2xl text-cream mb-4 sm:mb-5">Ready to source from Polygon Resource?</h2>
        <button 
          onClick={onGetInTouch}
          className="font-semibold text-[0.85rem] sm:text-[0.92rem] px-[20px] sm:px-[26px] py-[12px] sm:py-[14px] rounded-[2px] inline-flex items-center gap-2 bg-[#DD8F2A] text-[#12301F] hover:bg-[#f0a746] transition-colors cursor-pointer"
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
    <section className="py-[60px] sm:py-[80px] lg:py-[100px] w-full bg-cream" id="contact">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="font-['Space_Mono',monospace] uppercase text-[0.65rem] sm:text-[0.72rem] tracking-[0.18em] text-[#8A5A32] flex items-center justify-center gap-2.5 before:content-[''] before:w-[18px] sm:before:w-[22px] before:h-[1px] before:bg-[#8A5A32] before:inline-block">
              Contact Details
            </div>
            <h2 className="font-['Fraunces',serif] text-[2rem] sm:text-[2.5rem] lg:text-[3rem] mt-3 sm:mt-4 text-[#12301F]">Let's Discuss Opportunities</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg">
                <h3 className="font-['Fraunces',serif] text-xl sm:text-2xl text-[#12301F] mb-3">Quick Trade Inquiry</h3>
                <p className="text-[#4a483c] text-sm sm:text-base mb-4">
                  Connect with us to inquire about global supply pricing, samples, or tailored indenting services from Bangladesh.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-['Space_Mono',monospace] text-xs sm:text-sm text-[#8A5A32] uppercase tracking-wider mb-1">Call Support</h4>
                    <p className="text-[#1C1A14] font-medium">+8801711-234567</p>
                  </div>
                  <div>
                    <h4 className="font-['Space_Mono',monospace] text-xs sm:text-sm text-[#8A5A32] uppercase tracking-wider mb-1">Email Support</h4>
                    <p className="text-[#1C1A14] font-medium">trade@polygonresource.com</p>
                  </div>
                  <div>
                    <h4 className="font-['Space_Mono',monospace] text-xs sm:text-sm text-[#8A5A32] uppercase tracking-wider mb-1">Our Head Office</h4>
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
              <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg">
                <form className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block font-['Space_Mono',monospace] text-xs sm:text-sm text-[#8A5A32] uppercase tracking-wider mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 sm:py-3 border border-[rgba(28,26,20,0.2)] rounded-md focus:outline-none focus:border-[#1F4732] transition-colors bg-[#FAF8F3] text-[#1C1A14] placeholder:text-[#8a8368]"
                    />
                  </div>

                  <div>
                    <label className="block font-['Space_Mono',monospace] text-xs sm:text-sm text-[#8A5A32] uppercase tracking-wider mb-1.5">
                      Business Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. john@business.com"
                      className="w-full px-4 py-2.5 sm:py-3 border border-[rgba(28,26,20,0.2)] rounded-md focus:outline-none focus:border-[#1F4732] transition-colors bg-[#FAF8F3] text-[#1C1A14] placeholder:text-[#8a8368]"
                    />
                  </div>

                  <div>
                    <label className="block font-['Space_Mono',monospace] text-xs sm:text-sm text-[#8A5A32] uppercase tracking-wider mb-1.5">
                      Detailed Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="5"
                      placeholder="Describe your import requirement, target market or specs..."
                      className="w-full px-4 py-2.5 sm:py-3 border border-[rgba(28,26,20,0.2)] rounded-md focus:outline-none focus:border-[#1F4732] transition-colors bg-[#FAF8F3] text-[#1C1A14] placeholder:text-[#8a8368] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#12301F] text-cream py-3 sm:py-3.5 rounded-md font-semibold hover:bg-[#1F4732] transition-colors text-sm sm:text-base"
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
    <footer className="bg-[#12301F] text-cream py-[40px] sm:py-[50px] lg:py-[60px] pb-[20px] sm:pb-[25px] lg:pb-[30px] w-full">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-6 sm:gap-8 lg:gap-10">
        <div className="foot-brand">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] flex-shrink-0">
              <img 
                src="/Polygon Logo-2.jpg.jpeg" 
                alt="Polygon Resource Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="font-['Fraunces',serif] font-bold text-[0.9rem] sm:text-[1.05rem] text-cream leading-tight">
              POLYGON RESOURCE
              <span className="block font-['Space_Mono',monospace] font-normal text-[0.55rem] sm:text-[0.62rem] tracking-[0.14em] text-[#8A5A32] mt-0.5">xplore possibilities</span>
            </div>
          </div>
          <p className="mt-[10px] sm:mt-[14px] text-[0.8rem] sm:text-[0.86rem] text-[#c7c0a9] max-w-[34ch]">An agricultural-based export company delivering premium fruits, vegetables, potatoes and grains from Bangladesh to the world.</p>
        </div>
        <div>
          <h5 className="font-['Space_Mono',monospace] text-[0.65rem] sm:text-[0.72rem] uppercase tracking-[0.1em] text-[#9fd18a] mb-3 sm:mb-4">Contact</h5>
          <p className="text-[0.8rem] sm:text-[0.88rem] text-[#e5dfc9] mb-1.5 sm:mb-2">+880 1713-017391</p>
          <p className="text-[0.8rem] sm:text-[0.88rem] text-[#e5dfc9] mb-1.5 sm:mb-2">trade@polygonresource.com</p>
          <p className="text-[0.8rem] sm:text-[0.88rem] text-[#e5dfc9] mb-1.5 sm:mb-2">www.polygonresource.com</p>
        </div>
        <div>
          <h5 className="font-['Space_Mono',monospace] text-[0.65rem] sm:text-[0.72rem] uppercase tracking-[0.1em] text-[#9fd18a] mb-3 sm:mb-4">Address</h5>
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