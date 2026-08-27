import { useEffect, useState } from 'react';
import { HERO_STATS } from '../../data/hero';
import ScriptWritingText from '../animations/ScriptWritingText';
import HoneycombPattern from '../decorations/HoneycombPattern';

export default function Hero({ onGetInTouch, startWriting = false }) {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Show content after typing starts or immediately if already started
  useEffect(() => {
    if (startWriting) {
      // Preserve the original reveal transition once typing starts.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowContent(true);
    }
  }, [startWriting]);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-visible pb-0 bg-[linear-gradient(135deg,#07140c_0%,#0e1813_35%,#1F4732_70%,#6BA539_100%)] pt-16"
    >
      {/* Honeycomb Pattern - Light and subtle */}
      <HoneycombPattern color="#A9711F" opacity={0.08} size={50} />

      {/* Reference-inspired organic agricultural decoration */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
        {/* Large green sweep from the top-right */}
        <svg
          className="absolute -top-[8%] -right-[9%] w-[72%] md:w-[62%] lg:w-[55%] h-auto opacity-40 md:opacity-90"
          viewBox="0 0 700 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M700 -10H435C515 87 560 190 572 305C580 385 557 454 518 520C632 410 697 239 700 -10Z"
            fill="#1F4732"
          />
          <path
            d="M676 0H541C584 68 615 139 627 212C642 305 625 390 584 469C655 382 694 242 676 0Z"
            fill="#6BA539"
            fillOpacity="0.42"
          />
        </svg>

        {/* Broad leaf-like sweep from the left */}
        <svg
          className="absolute top-[7%] -left-[15%] w-[76%] md:w-[68%] lg:w-[61%] h-auto opacity-40 md:opacity-95"
          viewBox="0 0 760 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-5 118C145 4 335 2 509 52C604 79 690 119 760 170C639 126 535 117 438 139C336 162 249 214 181 289C112 364 57 403 -5 430V118Z"
            fill="#1F7A31"
          />
          <path
            d="M75 115C215 44 367 48 511 88C586 109 653 140 710 178C588 143 482 148 387 185C294 220 219 280 157 356C128 391 102 415 75 430V115Z"
            fill="#6BA539"
            fillOpacity="0.22"
          />
        </svg>

        {/* White/cream negative-space swoosh - HIDDEN ON MOBILE */}
        <svg
          className="absolute top-[14%] right-[5%] w-[48%] md:w-[42%] lg:w-[38%] h-auto opacity-[0.92] hidden md:block"
          viewBox="0 0 580 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 286C104 182 203 119 310 95C400 75 492 84 572 119C481 45 372 5 270 10C158 15 65 82 8 286Z"
            fill="#F7F4EA"
          />
        </svg>

        {/* Circular agriculture image - HIDDEN ON MOBILE */}
        <div className="absolute top-[19%] right-[5%] md:right-[7%] lg:right-[8%] w-[190px] h-[190px] sm:w-[230px] sm:h-[230px] md:w-[280px] md:h-[280px] lg:w-[330px] lg:h-[330px] xl:w-[370px] xl:h-[370px] rounded-full border-[10px] sm:border-[12px] border-[#F7F4EA] shadow-[0_28px_80px_rgba(0,0,0,0.32)] overflow-hidden opacity-95 hidden sm:block">
          <img
            src="/bg.jpeg"
            alt=""
            className="w-full h-full object-cover object-[65%_55%] scale-125"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#6BA539]/10 via-transparent to-[#1F4732]/30"></div>
          <div className="absolute inset-[9%] rounded-full border border-white/35"></div>
          <div className="absolute inset-[22%] rounded-full border border-white/20"></div>
        </div>

        {/* Bottom-left organic curve */}
        <svg
          className="absolute -bottom-[16%] -left-[12%] w-[48%] md:w-[40%] lg:w-[34%] h-auto opacity-40 md:opacity-95"
          viewBox="0 0 460 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 360V208C95 108 205 52 330 35C374 29 418 29 460 34C331 82 233 153 166 247C130 297 101 333 73 360H0Z"
            fill="#1F7A31"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div className="text-cream">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                <div className="w-4 sm:w-8 h-px bg-[#DD8F2A]/50"></div>
                <div className="inline-block px-2 sm:px-4 py-0.5 sm:py-1.5 rounded-full border border-[#DD8F2A]/30 bg-[#DD8F2A]/15 backdrop-blur-sm shadow-lg shadow-[#DD8F2A]/5">
                  <span className="text-[0.45rem] sm:text-[0.6rem] md:text-[0.7rem] font-['Barlow',sans-serif] uppercase tracking-[0.08em] sm:tracking-[0.15em] text-[#DD8F2A] font-semibold whitespace-nowrap">
                    🌱 Navigating New Pathways
                  </span>
                </div>
                <div className="flex-1 h-px bg-[#DD8F2A]/20"></div>
              </div>
              
              <h1 className="mb-2 sm:mb-4 lg:mb-0">
                <div className="
                  font-['Dancing_Script',cursive]
                  font-bold
                  text-white
                  drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]
                  text-[2.8rem]
                  sm:text-[3rem]
                  md:text-[4rem]
                  lg:text-[5rem]
                  xl:text-[6rem]
                  leading-[1.05]
                  break-words
                ">
                  {showContent && (
                    <ScriptWritingText 
                      text="Stay Fresh," 
                      speed={35} 
                      delay={50}
                      autoStart={true}
                      className="block"
                    />
                  )}
                </div>

                <div className="
                  font-['Dancing_Script',cursive]
                  font-bold
                  text-[#DD8F2A]
                  drop-shadow-[0_4px_30px_rgba(221,143,42,0.3)]
                  text-[2.8rem]
                  sm:text-[3rem]
                  md:text-[4rem]
                  lg:text-[5rem]
                  xl:text-[6rem]
                  leading-[1.05]
                  break-words
                ">
                  {showContent && (
                    <ScriptWritingText 
                      text="Stay with Nature" 
                      speed={35} 
                      delay={800}
                      autoStart={true}
                      onComplete={() => setIsTypingComplete(true)}
                      className="block"
                    />
                  )}
                </div>
              </h1>
              
              {/* Subtitle text - types after the heading */}
              <div className={`transition-all duration-700 ${isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="font-['Barlow',sans-serif] italic text-[15px] sm:text-[16px] md:text-[18px] leading-[1.4] sm:leading-[1.5] text-white/95 max-w-xl mb-3 sm:mb-6 drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
                  {isTypingComplete && (
                    <ScriptWritingText
                      text="From Bangladesh's fertile lands to global markets — delivering farm-fresh produce with quality you can trust, naturally."
                      speed={24}
                      delay={250}
                      autoStart={true}
                      onComplete={() => setIsTextComplete(true)}
                    />
                  )}
                </p>
              </div>

              {/* Mobile CTA - animates in together with the stat cards */}
              <button
                onClick={onGetInTouch}
                className={`lg:hidden group inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-[#DD8F2A] to-[#f0a746] text-[#12301F] font-['Barlow',sans-serif] text-[14px] sm:text-[16px] leading-[1.5] font-semibold rounded-lg hover:scale-105 transition-all duration-700 shadow-lg shadow-[#DD8F2A]/30 hover:shadow-[#DD8F2A]/50 ${
                  isTextComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Contact us
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
            
            {/* Stats Cards - appear with the subtitle */}
            <div className={`grid grid-cols-2 gap-2 sm:gap-4 lg:translate-y-28 xl:translate-y-32 transition-all duration-700 ${isTextComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {HERO_STATS.map((stat, i) => (
                <div key={i} className="group bg-black/35 backdrop-blur-md border border-white/20 rounded-xl p-2.5 sm:p-4 md:p-6 hover:bg-black/45 transition-all duration-500 hover:scale-105 hover:border-[#DD8F2A]/50 shadow-xl shadow-black/20 hover:shadow-[#DD8F2A]/10">
                  <div className="text-xl sm:text-2xl md:text-3xl font-['Lora',serif] font-bold text-[#DD8F2A] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_2px_10px_rgba(221,143,42,0.3)]">{stat.value}</div>
                  <div className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] text-white/90 font-['Barlow',sans-serif] uppercase tracking-[0.05em] sm:tracking-[0.08em] mt-0.5 sm:mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Paper Tear / Wave Effect at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] w-full overflow-hidden pointer-events-none">
        <svg
          className="relative w-full h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px]"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Main wave shape - creates a paper tear effect */}
          <path
            d="M0 120 L0 40 Q180 80 360 45 Q540 10 720 50 Q900 90 1080 35 Q1260 -20 1440 40 L1440 120 L0 120 Z"
            fill="#f8fcf4"
          />
          {/* Second wave layer for depth */}
          <path
            d="M0 120 L0 60 Q200 100 400 55 Q600 10 800 60 Q1000 110 1200 45 Q1320 15 1440 60 L1440 120 L0 120 Z"
            fill="rgba(248, 252, 244, 0.5)"
          />
          {/* Third wave layer for more organic feel */}
          <path
            d="M0 120 L0 80 Q150 110 300 75 Q450 40 600 85 Q750 130 900 70 Q1050 10 1200 80 Q1320 115 1440 80 L1440 120 L0 120 Z"
            fill="rgba(248, 252, 244, 0.2)"
          />
        </svg>
      </div>

      {/* Add Google Font for Dancing Script */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
        .break-words {
          word-break: break-word;
          overflow-wrap: break-word;
        }
      `}</style>
    </section>
  );
}
