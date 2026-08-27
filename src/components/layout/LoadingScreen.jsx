import { useEffect, useState } from 'react';

// LoadingScreen: shown on first load for ~2s using the site's logo.png and
// text.png, then fades out to reveal the page. Scroll is locked while it's up.
export default function LoadingScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Stay fully visible for ~1.6s, then fade out over ~0.4s so the whole
    // thing reads as "2 seconds" before the page appears.
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600);
    const doneTimer = setTimeout(() => {
      document.body.style.overflow = original;
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = original;
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A2A1A] transition-opacity duration-[400ms] ease-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <style>{`
        @keyframes loaderFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes loaderGlow {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 0.75; transform: scale(1.2); }
        }
        @keyframes loaderTextIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderBarFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes leafFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-120px) rotate(40deg); opacity: 0; }
        }
        @keyframes leafFloatRight {
          0%, 100% { transform: translateY(0) rotate(0deg) scaleX(-1); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-120px) rotate(-40deg) scaleX(-1); opacity: 0; }
        }
        @keyframes seedFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100px) scale(0.8); opacity: 0; }
        }
        @keyframes soilParticle {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          30% { opacity: 0.5; }
          70% { opacity: 0.5; }
          100% { transform: translateY(-80px) rotate(20deg); opacity: 0; }
        }
        @keyframes sunGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        .leaf-animation {
          animation: leafFloat 2.5s ease-in infinite;
        }
        .leaf-animation-right {
          animation: leafFloatRight 2.5s ease-in infinite;
        }
        .seed-animation {
          animation: seedFloat 2s ease-in infinite;
        }
        .soil-animation {
          animation: soilParticle 1.8s ease-in infinite;
        }
        .sun-animation {
          animation: sunGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Agriculture Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sun glow */}
        <div className="absolute top-[5%] right-[10%] w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#DD8F2A]/20 blur-2xl sun-animation"></div>
        
        {/* Floating Leaves - Left side */}
        <svg className="absolute left-[5%] top-[10%] w-6 h-6 sm:w-8 sm:h-8 text-[#6BA539] leaf-animation" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 8 8 8 14C8 18 10 22 12 22C14 22 16 18 16 14C16 8 12 2 12 2Z" />
          <path d="M12 2C12 2 16 6 18 10C20 14 18 20 12 22" fillOpacity="0.5" />
        </svg>

        <svg className="absolute left-[15%] bottom-[20%] w-5 h-5 sm:w-7 sm:h-7 text-[#6BA539] leaf-animation-right" style={{ animationDelay: '1s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 8 8 8 14C8 18 10 22 12 22C14 22 16 18 16 14C16 8 12 2 12 2Z" />
          <path d="M12 2C12 2 16 6 18 10C20 14 18 20 12 22" fillOpacity="0.5" />
        </svg>

        <svg className="absolute left-[8%] top-[60%] w-4 h-4 sm:w-6 sm:h-6 text-[#6BA539] leaf-animation" style={{ animationDelay: '1.8s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 8 8 8 14C8 18 10 22 12 22C14 22 16 18 16 14C16 8 12 2 12 2Z" />
          <path d="M12 2C12 2 16 6 18 10C20 14 18 20 12 22" fillOpacity="0.5" />
        </svg>

        {/* Floating Leaves - Right side */}
        <svg className="absolute right-[5%] top-[15%] w-6 h-6 sm:w-8 sm:h-8 text-[#6BA539] leaf-animation-right" style={{ animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 8 8 8 14C8 18 10 22 12 22C14 22 16 18 16 14C16 8 12 2 12 2Z" />
          <path d="M12 2C12 2 16 6 18 10C20 14 18 20 12 22" fillOpacity="0.5" />
        </svg>

        <svg className="absolute right-[12%] bottom-[25%] w-5 h-5 sm:w-7 sm:h-7 text-[#6BA539] leaf-animation" style={{ animationDelay: '1.3s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 8 8 8 14C8 18 10 22 12 22C14 22 16 18 16 14C16 8 12 2 12 2Z" />
          <path d="M12 2C12 2 16 6 18 10C20 14 18 20 12 22" fillOpacity="0.5" />
        </svg>

        <svg className="absolute right-[8%] top-[70%] w-4 h-4 sm:w-6 sm:h-6 text-[#6BA539] leaf-animation-right" style={{ animationDelay: '2.1s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 8 8 8 14C8 18 10 22 12 22C14 22 16 18 16 14C16 8 12 2 12 2Z" />
          <path d="M12 2C12 2 16 6 18 10C20 14 18 20 12 22" fillOpacity="0.5" />
        </svg>

        {/* Floating Seeds/Grains */}
        <div className="absolute left-[20%] top-[30%] w-2 h-3 bg-[#DD8F2A] rounded-full seed-animation"></div>
        <div className="absolute right-[20%] top-[40%] w-2 h-3 bg-[#DD8F2A] rounded-full seed-animation" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute left-[12%] top-[80%] w-2 h-3 bg-[#DD8F2A] rounded-full seed-animation" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute right-[15%] top-[75%] w-2 h-3 bg-[#DD8F2A] rounded-full seed-animation" style={{ animationDelay: '1.6s' }}></div>

        {/* Soil Particles */}
        <div className="absolute left-[25%] top-[50%] w-1.5 h-1.5 bg-[#6BA539]/40 rounded-full soil-animation"></div>
        <div className="absolute right-[25%] top-[55%] w-1.5 h-1.5 bg-[#6BA539]/40 rounded-full soil-animation" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute left-[35%] top-[70%] w-1 h-1 bg-[#6BA539]/30 rounded-full soil-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute right-[35%] top-[65%] w-1 h-1 bg-[#6BA539]/30 rounded-full soil-animation" style={{ animationDelay: '1.4s' }}></div>

        {/* Wheat/Plant stalks at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg className="absolute bottom-0 left-[2%] w-8 h-16 text-[#6BA539]/30" viewBox="0 0 20 40" fill="currentColor">
            <path d="M10 40 L10 10 M10 10 L6 18 M10 10 L14 18 M10 15 L7 23 M10 15 L13 23" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          <svg className="absolute bottom-0 left-[8%] w-8 h-16 text-[#6BA539]/25" style={{ transform: 'scaleX(-1)' }} viewBox="0 0 20 40" fill="currentColor">
            <path d="M10 40 L10 10 M10 10 L6 18 M10 10 L14 18 M10 15 L7 23 M10 15 L13 23" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          <svg className="absolute bottom-0 left-[15%] w-10 h-20 text-[#6BA539]/20" viewBox="0 0 20 40" fill="currentColor">
            <path d="M10 40 L10 8 M10 8 L5 16 M10 8 L15 16 M10 13 L6 21 M10 13 L14 21" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          <svg className="absolute bottom-0 left-[25%] w-8 h-16 text-[#6BA539]/25" style={{ transform: 'scaleX(-1)' }} viewBox="0 0 20 40" fill="currentColor">
            <path d="M10 40 L10 10 M10 10 L6 18 M10 10 L14 18 M10 15 L7 23 M10 15 L13 23" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          <svg className="absolute bottom-0 left-[35%] w-10 h-20 text-[#6BA539]/20" viewBox="0 0 20 40" fill="currentColor">
            <path d="M10 40 L10 8 M10 8 L5 16 M10 8 L15 16 M10 13 L6 21 M10 13 L14 21" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          <svg className="absolute bottom-0 left-[50%] w-8 h-14 text-[#6BA539]/30" viewBox="0 0 20 40" fill="currentColor">
            <path d="M10 40 L10 12 M10 12 L6 20 M10 12 L14 20 M10 17 L7 25 M10 17 L13 25" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          <svg className="absolute bottom-0 left-[60%] w-10 h-18 text-[#6BA539]/20" style={{ transform: 'scaleX(-1)' }} viewBox="0 0 20 40" fill="currentColor">
            <path d="M10 40 L10 8 M10 8 L5 16 M10 8 L15 16 M10 13 L6 21 M10 13 L14 21" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          <svg className="absolute bottom-0 left-[70%] w-8 h-16 text-[#6BA539]/25" viewBox="0 0 20 40" fill="currentColor">
            <path d="M10 40 L10 10 M10 10 L6 18 M10 10 L14 18 M10 15 L7 23 M10 15 L13 23" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          <svg className="absolute bottom-0 left-[80%] w-10 h-20 text-[#6BA539]/20" style={{ transform: 'scaleX(-1)' }} viewBox="0 0 20 40" fill="currentColor">
            <path d="M10 40 L10 8 M10 8 L5 16 M10 8 L15 16 M10 13 L6 21 M10 13 L14 21" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
          <svg className="absolute bottom-0 left-[90%] w-8 h-16 text-[#6BA539]/25" viewBox="0 0 20 40" fill="currentColor">
            <path d="M10 40 L10 10 M10 10 L6 18 M10 10 L14 18 M10 15 L7 23 M10 15 L13 23" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
        </div>

        {/* Ground line with soil texture */}
        <div className="absolute bottom-[58px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6BA539]/20 to-transparent"></div>
        <div className="absolute bottom-[55px] left-[10%] right-[10%] h-[1px] bg-[#6BA539]/10"></div>
        <div className="absolute bottom-[52px] left-[20%] right-[20%] h-[0.5px] bg-[#6BA539]/5"></div>
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center z-10">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(221,143,42,0.5) 0%, transparent 70%)',
              filter: 'blur(10px)',
              animation: 'loaderGlow 1.6s ease-in-out infinite',
            }}
          />
          <img
            src="/logo.png"
            alt="Polygon Resource Logo"
            className="relative w-16 h-16 sm:w-20 sm:h-20 object-contain"
            style={{ animation: 'loaderFloat 1.6s ease-in-out infinite' }}
          />
        </div>

        <img
          src="/text.png"
          alt="Polygon Resource"
          className="h-[50px] sm:h-[42px] md:h-[48px] w-auto object-contain mt-5"
          style={{ animation: 'loaderTextIn 0.7s ease-out 0.25s both' }}
        />

        <div className="mt-8 w-[140px] sm:w-[160px] h-[3px] rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #1F4732, #6BA539)',
              animation: 'loaderBarFill 1.6s ease-out forwards',
            }}
          />
        </div>
      </div>
    </div>
  );
}
