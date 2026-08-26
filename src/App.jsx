import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';
import { Phone, Mail, MapPin, Eye, Target, ShieldCheck, Clock, Users, BadgeCheck, Quote, ChevronDown } from "lucide-react";

// ---------------------------------------------------------------------------
// Scroll animation system
// ---------------------------------------------------------------------------
// useInView: tracks whether an element has entered the viewport, using
// IntersectionObserver so it's cheap and works for any element on the page.
function useInView({ threshold = 0.1, rootMargin = '0px 0px -5% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who prefer reduced motion: show immediately, no animation.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

// Reveal: generic wrapper that fades/slides/scales its children into view as
// the user scrolls to them. Drop it around any section or element.
//   direction: 'up' | 'down' | 'left' | 'right' | 'none'
//   distance: px to travel from
//   delay: ms stagger delay
//   duration: ms transition duration
//   scale: starting scale (1 = no scale effect)
function Reveal({
  children,
  direction = 'up',
  distance = 40,
  delay = 0,
  duration = 700,
  scale = 1,
  once = true,
  as: Tag = 'div',
  className = '',
  style = {},
}) {
  const [ref, inView] = useInView({ once });

  const offsets = {
    up: `translate3d(0, ${distance}px, 0)`,
    down: `translate3d(0, -${distance}px, 0)`,
    left: `translate3d(${distance}px, 0, 0)`,
    right: `translate3d(-${distance}px, 0, 0)`,
    none: 'translate3d(0, 0, 0)',
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0) scale(1)' : `${offsets[direction]} scale(${scale})`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// Staggers reveal children with an increasing delay, so lists/grids cascade
// into view item-by-item instead of popping in all at once.
function StaggerGroup({ children, step = 90, ...revealProps }) {
  const items = Array.isArray(children) ? children : [children];
  return items.map((child, index) => (
    <Reveal key={index} delay={index * step} {...revealProps}>
      {child}
    </Reveal>
  ));
}

// AnimatedText: splits a string into words and reveals them one by one
// (masked slide-up) as the text scrolls into view — the "modern site"
// headline animation, used on the big section titles throughout the page.
function AnimatedText({
  text,
  as: Tag = 'span',
  className = '',
  stagger = 35,
  delay = 0,
  duration = 650,
  once = true,
  threshold = 0.2,
}) {
  const [ref, inView] = useInView({ once, threshold, rootMargin: '0px 0px -5% 0px' });
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <span
            style={{
              display: 'inline-block',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0%)' : 'translateY(115%)',
              transition: `transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms, opacity ${Math.round(duration * 0.7)}ms ease ${delay + i * stagger}ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}

// Add this new component for the writing animation with script font
function ScriptWritingText({
  text,
  className = '',
  speed = 35,
  delay = 200,
  onComplete,
  autoStart = false,
}) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Keep the latest callback without making the typing effect restart
  // whenever the parent re-renders.
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!autoStart) return;

    let charIndex = 0;
    let intervalId = null;

    setDisplayText('');
    setIsComplete(false);

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setDisplayText(text.slice(0, charIndex));

        if (charIndex >= text.length) {
          clearInterval(intervalId);
          intervalId = null;
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, delay, autoStart]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 400);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span
        className="inline-block w-[3px] h-[0.8em] bg-current ml-0.5 align-middle"
        style={{
          opacity: isComplete ? 0 : cursorVisible ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// HONEYCOMB PATTERN COMPONENT
// ---------------------------------------------------------------------------
function HoneycombPattern({ color = '#1F4732', opacity = 0.06, size = 40, className = '' }) {
  const hexWidth = size;
  const hexHeight = size * 1.732; // sqrt(3) * size
  
  // Generate a honeycomb pattern using SVG
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={`honeycomb-${color.replace('#', '')}`}
            patternUnits="userSpaceOnUse"
            width={hexWidth * 3}
            height={hexHeight}
            patternTransform="scale(0.8)"
          >
            {/* Hexagon shape */}
            <path
              d={`
                M ${hexWidth * 0.5} 0
                L ${hexWidth * 1.5} 0
                L ${hexWidth * 2} ${hexHeight * 0.5}
                L ${hexWidth * 1.5} ${hexHeight}
                L ${hexWidth * 0.5} ${hexHeight}
                L 0 ${hexHeight * 0.5}
                Z
              `}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Second hexagon offset */}
            <path
              d={`
                M ${hexWidth * 2} ${hexHeight * 0.5}
                L ${hexWidth * 3} 0
                L ${hexWidth * 4} 0
                L ${hexWidth * 4.5} ${hexHeight * 0.5}
                L ${hexWidth * 4} ${hexHeight}
                L ${hexWidth * 3} ${hexHeight}
                Z
              `}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Offset hexagons for honeycomb pattern */}
            <path
              d={`
                M ${hexWidth * 0.5} ${hexHeight}
                L ${hexWidth * 1.5} ${hexHeight}
                L ${hexWidth * 2} ${hexHeight * 1.5}
                L ${hexWidth * 1.5} ${hexHeight * 2}
                L ${hexWidth * 0.5} ${hexHeight * 2}
                L 0 ${hexHeight * 1.5}
                Z
              `}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d={`
                M ${hexWidth * 2.5} ${hexHeight * 0.5}
                L ${hexWidth * 3.5} ${hexHeight * 0.5}
                L ${hexWidth * 4} ${hexHeight}
                L ${hexWidth * 3.5} ${hexHeight * 1.5}
                L ${hexWidth * 2.5} ${hexHeight * 1.5}
                L ${hexWidth * 2} ${hexHeight}
                Z
              `}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#honeycomb-${color.replace('#', '')})`} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// EDGE HONEYCOMB CLUSTER
// Small decorative honeycomb used on inner sections. Unlike HoneycombPattern,
// this only occupies a small area on the left or right edge.
// ---------------------------------------------------------------------------
function EdgeHoneycombCluster({
  side = 'left',
  position = 'top',
  color = '#A9711F',
  fillColor = '#E8B33D',
  opacity = 0.55,
  className = '',
}) {
  const sideClass = side === 'right' ? '-right-7 sm:-right-5' : '-left-7 sm:-left-5';
  const positionClass = position === 'bottom'
    ? 'bottom-[7%] sm:bottom-[10%]'
    : 'top-[8%] sm:top-[12%]';

  const hexes = [
    { x: 46, y: 2, filled: true },
    { x: 18, y: 51, filled: false },
    { x: 74, y: 51, filled: true },
    { x: 46, y: 100, filled: false },
    { x: 102, y: 100, filled: true },
    { x: 18, y: 149, filled: false },
    { x: 74, y: 149, filled: true },
    { x: 46, y: 198, filled: true },
  ];

  const points = (x, y) => {
    const w = 44;
    const h = 38;
    return [
      [x + 11, y],
      [x + 33, y],
      [x + 44, y + 19],
      [x + 33, y + 38],
      [x + 11, y + 38],
      [x, y + 19],
    ].map(([px, py]) => `${px},${py}`).join(' ');
  };

  return (
    <div
      className={`pointer-events-none absolute z-[1] ${sideClass} ${positionClass} ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        className="w-[125px] sm:w-[150px] lg:w-[175px] h-auto"
        viewBox="0 0 155 242"
        fill="none"
      >
        {hexes.map((hex, index) => (
          <g key={index}>
            <polygon
              points={points(hex.x, hex.y)}
              fill={hex.filled ? fillColor : 'transparent'}
              fillOpacity={hex.filled ? 0.16 : 0}
              stroke={color}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {hex.filled && (
              <polygon
                points={points(hex.x + 5, hex.y + 4.5)}
                fill="none"
                stroke={color}
                strokeWidth="0.8"
                strokeOpacity="0.55"
                strokeLinejoin="round"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

// LoadingScreen: shown on first load for ~2s using the site's logo.png and
// text.png, then fades out to reveal the page. Scroll is locked while it's up.
function LoadingScreen({ onComplete }) {
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

// ----- SCROLL TO TOP BUTTON -----
function ScrollToTop() {
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
        className={`transition-all duration-300 hover:-translate-y-1.5 active:translate-y-1`}
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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [startWriting, setStartWriting] = useState(false);

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
        <Header onGetInTouch={scrollToContact} />

        {/* 1. Hero Section */}
        <NewHero onGetInTouch={scrollToContact} startWriting={startWriting} />

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
          <Products />
        </Reveal>

        {/* 4. Our Purpose + Message from CEO (combined section) */}
        <Reveal direction="up" distance={50}>
          <OurPurpose />
        </Reveal>

        {/* 6. CTA Section */}
        <Reveal direction="up" distance={40} scale={0.97}>
          <CTA onGetInTouch={scrollToContact} />
        </Reveal>

        {/* 7. Contact Section */}
        <Reveal direction="up" distance={50}>
          <ContactSection />
        </Reveal>

        {/* 8. Footer */}
        <Reveal direction="up" distance={30}>
          <Footer />
        </Reveal>

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </div>
    </>
  );
}


//Header Section
function Header({ onGetInTouch }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const menuCloseTimer = useRef(null);
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

  useEffect(() => () => clearTimeout(menuCloseTimer.current), []);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      // Auto-close with the same animation as soon as the user scrolls.
      if (menuOpenRef.current) closeMenu();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About us', id: 'about' },
    { label: 'Products', id: 'products' },
    { label: 'Blog', id: 'ceo-message' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-[#1F4732]/10' 
          : 'bg-[#0A2A1A]/60 backdrop-blur-sm border-b border-[#DAA520]/10'
      }`}
    >
      <nav className="w-full px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between py-[14px] sm:py-[18px] transition-all duration-300">
        <a href="#home" className="flex items-center gap-2 sm:gap-3 group">
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
              className={`h-[40px] sm:h-[42px] md:h-[48px] lg:h-[54px] w-auto object-contain transition-all duration-300`}
            />
          </div>
        </a>

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
          className={`hidden md:block group relative font-['Barlow',sans-serif] text-[0.65rem] sm:text-[0.72rem] uppercase tracking-[0.08em] px-3 sm:px-4 py-[7px] sm:py-[9px] rounded-[2px] overflow-hidden transition-all duration-300 hover:scale-105 ${
            scrolled ? 'bg-[#1F4732] text-white hover:bg-[#6BA539] shadow-md shadow-[#1F4732]/20' : 'bg-[#DAA520]/20 backdrop-blur-sm border border-[#DAA520]/40 text-cream hover:bg-[#DAA520] hover:text-[#12301F]'
          }`}
        >
          <span className="relative z-10">Contact US</span>
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
        </button>

        <button 
          className={`md:hidden ml-2 transition-colors ${
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
          className={`mobile-menu-panel lg:hidden px-4 pb-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto backdrop-blur-xl border-t ${
            menuClosing ? 'mobile-menu-closing' : ''
          } ${
            scrolled ? 'bg-white/98 border-[#1F4732]/10' : 'bg-[#0A2A1A]/95 border-[#DAA520]/10'
          }`}
          aria-hidden={menuClosing}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={() => closeMenu()}
              className={`text-sm text-left font-medium tracking-wide py-2 px-3 rounded hover:bg-cream/10 transition-all duration-300 hover:pl-5 ${
                scrolled ? 'text-[#4a6b5a] hover:text-[#1F4732]' : 'text-cream/90 hover:text-white'
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {item.label.toUpperCase()}
            </a>
          ))}
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

// ----- NEW HERO -----
function NewHero({ onGetInTouch, startWriting = false }) {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Show content after typing starts or immediately if already started
  useEffect(() => {
    if (startWriting) {
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
              {[
                { value: '15+', label: 'Years in Agri-Trade' },
                { value: '9', label: 'Export Countries' },
                { value: '#1', label: 'Own Grading Plant in BD' },
                { value: '100+', label: 'Farmers Partnered' }
              ].map((stat, i) => (
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

function Divider() {
  return (
    <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="h-[1px] w-full bg-repeat-x bg-[length:14px_1px]" style={{ backgroundImage: 'linear-gradient(90deg, rgba(28,26,20,0.22) 60%, transparent 0%)' }}></div>
    </div>
  );
}


// ----- SHARED ORGANIC SECTION BACKGROUND -----
function OrganicSectionDecoration({ dark = false, flip = false }) {
  const primary = dark ? '#6BA539' : '#1F7A31';
  const secondary = dark ? '#1F4732' : '#6BA539';
  const negative = dark ? '#F7F4EA' : '#FFFFFF';

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${flip ? 'scale-x-[-1]' : ''}`}
      aria-hidden="true"
    >
      <svg className="absolute -top-[7%] -right-[12%] w-[54%] sm:w-[44%] lg:w-[36%] h-auto opacity-[0.10]" viewBox="0 0 700 520" fill="none">
        <path d="M700 -10H435C515 87 560 190 572 305C580 385 557 454 518 520C632 410 697 239 700 -10Z" fill={primary} />
        <path d="M676 0H541C584 68 615 139 627 212C642 305 625 390 584 469C655 382 694 242 676 0Z" fill={secondary} fillOpacity="0.48" />
      </svg>

      <svg className="absolute top-[4%] -left-[18%] w-[62%] sm:w-[52%] lg:w-[43%] h-auto opacity-[0.09]" viewBox="0 0 760 430" fill="none">
        <path d="M-5 118C145 4 335 2 509 52C604 79 690 119 760 170C639 126 535 117 438 139C336 162 249 214 181 289C112 364 57 403 -5 430V118Z" fill={primary} />
        <path d="M75 115C215 44 367 48 511 88C586 109 653 140 710 178C588 143 482 148 387 185C294 220 219 280 157 356C128 391 102 415 75 430V115Z" fill={secondary} fillOpacity="0.35" />
      </svg>

      <svg className="absolute -bottom-[15%] -left-[10%] w-[38%] sm:w-[31%] lg:w-[27%] h-auto opacity-[0.09]" viewBox="0 0 460 360" fill="none">
        <path d="M0 360V208C95 108 205 52 330 35C374 29 418 29 460 34C331 82 233 153 166 247C130 297 101 333 73 360H0Z" fill={primary} />
      </svg>

      <svg className="absolute top-[12%] right-[4%] w-[34%] lg:w-[27%] h-auto opacity-[0.10] hidden md:block" viewBox="0 0 580 300" fill="none">
        <path d="M8 286C104 182 203 119 310 95C400 75 492 84 572 119C481 45 372 5 270 10C158 15 65 82 8 286Z" fill={negative} />
      </svg>

    </div>
  );
}

// ----- ABOUT -----
function About() {
  const countries = ['Russia', 'Singapore', 'Malaysia', 'China', 'Senegal', 'Saudi Arabia', 'Italy', 'Ukraine','Nepal'];
  const rotations = ['-6deg', '4deg', '-3deg', '5deg', '-5deg', '3deg', '-4deg', '6deg'];

  return (
    <section
      id="about"
      className="
        relative
        w-full
        overflow-hidden
        py-[60px]
        sm:py-[80px]
        lg:py-[100px]
        bg-[linear-gradient(135deg,#f8fcf4_0%,#edf6e7_28%,#dfedd6_58%,#cfe3c4_100%)]
      "
    >
      {/* Honeycomb Pattern */}
      <EdgeHoneycombCluster side="right" position="top" color="#A9711F" fillColor="#E8B33D" opacity={0.48} />
      
      {/* Existing organic decoration */}
      <OrganicSectionDecoration />

      {/* ==================================================
          BACKGROUND THEME DECORATION
      ================================================== */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        {/* Top-left green atmosphere */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_12%_18%,rgba(107,165,57,0.14),transparent_30%)]
          "
        />

        {/* Right dark-green atmosphere */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_90%_68%,rgba(31,71,50,0.10),transparent_32%)]
          "
        />

        {/* Middle light area */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.45),transparent_40%)]
          "
        />

        {/* Top transition */}
        <div
          className="
            absolute
            top-0
            left-0
            w-full
            h-24
            bg-gradient-to-b
            from-white/30
            to-transparent
          "
        />

        {/* Bottom transition */}
        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            h-24
            bg-gradient-to-t
            from-[#1F4732]/[0.07]
            to-transparent
          "
        />

        {/* Large soft green circle */}
        <div
          className="
            absolute
            top-[16%]
            -left-24
            w-72
            h-72
            sm:w-96
            sm:h-96
            rounded-full
            bg-[#6BA539]/[0.06]
            blur-3xl
          "
        />

        {/* Right atmospheric circle */}
        <div
          className="
            absolute
            top-[45%]
            -right-24
            w-80
            h-80
            sm:w-[430px]
            sm:h-[430px]
            rounded-full
            bg-[#1F4732]/[0.06]
            blur-3xl
          "
        />

        {/* Bottom-left glow */}
        <div
          className="
            absolute
            -bottom-32
            left-[10%]
            w-96
            h-96
            rounded-full
            bg-[#6BA539]/[0.07]
            blur-3xl
          "
        />

        {/* Decorative leaf */}
        <svg
          className="
            absolute
            -bottom-12
            right-[1%]
            w-44
            sm:w-56
            lg:w-72
            opacity-[0.045]
          "
          viewBox="0 0 220 220"
          fill="none"
        >
          <path
            d="M23 198C31 112 84 42 194 19C180 119 122 186 23 198Z"
            fill="#1F4732"
          />

          <path
            d="M43 178C85 138 126 94 174 42"
            stroke="#1F4732"
            strokeWidth="8"
            strokeLinecap="round"
          />

          <path
            d="M88 130C82 103 87 80 99 60"
            stroke="#1F4732"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <path
            d="M122 94C143 90 158 80 170 66"
            stroke="#1F4732"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        {/* Small top-right leaf */}
        <svg
          className="
            absolute
            top-[8%]
            right-[4%]
            w-28
            sm:w-36
            opacity-[0.04]
            rotate-[-18deg]
          "
          viewBox="0 0 120 120"
          fill="none"
        >
          <path
            d="M18 99C23 52 49 18 103 11C97 61 68 93 18 99Z"
            fill="#6BA539"
          />

          <path
            d="M27 90C45 72 66 50 94 22"
            stroke="#1F4732"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="max-w-4xl mb-8 sm:mb-10 lg:mb-12">
            <div
              className="
                font-['Barlow',sans-serif]
                uppercase
                text-[0.62rem]
                sm:text-[0.7rem]
                tracking-[0.2em]
                text-[#6BA539]
                flex
                items-center
                gap-3
                mb-3
              "
            >
              <span className="w-8 h-px bg-[#6BA539]" />
              About Us
            </div>

            <h2
              className="
                font-['Lora',serif]
                font-bold
                text-[2rem]
                sm:text-[2.7rem]
                lg:text-[3.5rem]
                leading-[1.08]
                text-[#1F4732]
              "
            >
              <AnimatedText text="Built on experience." />

              <AnimatedText
                text="Driven by possibilities."
                className="block text-[#6BA539]"
                delay={200}
              />
            </h2>

            <p
              className="
                font-['Barlow',sans-serif]
                text-[16px]
                leading-[1.5]
                text-[#666666]
                mt-4
                text-[0.92rem]
                sm:text-[1rem]
                lg:text-[1.06rem]
                max-w-3xl
              "
            >
              Established in 2008,{" "}
              <span className="font-semibold text-[#1F4732]">
                POLYGON RESOURCE
              </span>{" "}
              is a Bangladesh-based export company with practical experience
              in supplying agricultural commodities and marine by-products to
              international markets.
            </p>
          </div>

          {/* Company Story + Slogan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mb-6 lg:mb-8">

            {/* Company Story */}
            <Reveal direction="up" distance={40} duration={600} as="div" className="lg:col-span-7">
              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  bg-white/80
                  backdrop-blur-md
                  border
                  border-[#1F4732]/10
                  shadow-[0_12px_40px_rgba(31,71,50,0.08)]
                  hover:shadow-[0_18px_55px_rgba(31,71,50,0.14)]
                  hover:-translate-y-1
                  transition-all
                  duration-500
                "
              >
                <div
                  className="
                    absolute
                    top-0
                    left-0
                    right-0
                    h-[3px]
                    bg-gradient-to-r
                    from-[#1F4732]
                    via-[#3D7A4A]
                    to-[#6BA539]
                  "
                />

                <div className="relative p-6 sm:p-8 lg:p-10">
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[#edf6e8]
                      border
                      border-[#6BA539]/20
                      px-3.5
                      py-1.5
                      mb-5
                    "
                  >
                    <span className="w-2 h-2 rounded-full bg-[#6BA539] animate-pulse" />
                    <span
                      className="
                        font-['Barlow',sans-serif]
                        uppercase
                        tracking-[0.12em]
                        text-[0.58rem]
                        sm:text-[0.64rem]
                        text-[#5e9638]
                      "
                    >
                      Since 2008
                    </span>
                  </div>

                  <h3
                    className="
                      font-['Lora',serif]
                      font-normal
                      text-[1.35rem]
                      sm:text-[1.7rem]
                      lg:text-[2rem]
                      text-[#1F4732]
                      mb-4
                    "
                  >
                    A practical trading partner from Bangladesh.
                  </h3>

                  <div
                    className="
                      space-y-4
                      font-['Barlow',sans-serif]
                      text-[16px]
                      leading-[1.5]
                      text-[#666666]
                      text-[0.86rem]
                      sm:text-[0.94rem]
                      lg:text-[1rem]
                    "
                  >
                    <p>
                      POLYGON RESOURCE has built its foundation on integrity, product quality, responsive communication and dependable trade coordination.
                    </p>
                    <p>
                      The company has successfully exported fresh pineapple, shrimp shells, potatoes, cabbage, cauliflower, pumpkin and headgear cap to international markets across the globe.
                    </p>
                    <p>
                      Now expanding to include mangoes, sesame seeds and young jackfruit, while exploring import and indenting opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Slogan Card */}
            <Reveal direction="up" distance={40} duration={600} delay={100} as="div" className="lg:col-span-5">
              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#173d29]
                  via-[#1F4732]
                  to-[#315f3d]
                  text-white
                  shadow-[0_14px_45px_rgba(31,71,50,0.2)]
                  hover:-translate-y-1
                  hover:shadow-[0_20px_55px_rgba(31,71,50,0.28)]
                  transition-all
                  duration-500
                  h-full
                "
              >
                <div className="relative z-10 p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-center">
                  <div
                    className="
                      font-['Barlow',sans-serif]
                      uppercase
                      text-[0.58rem]
                      sm:text-[0.65rem]
                      tracking-[0.2em]
                      text-[#a8d68f]
                      mb-3
                    "
                  >
                    Our Guiding Idea
                  </div>

                  <div
                    className="
                      text-[#DD8F2A]
                      font-['Barlow',sans-serif]
                      text-[0.7rem]
                      tracking-[0.16em]
                      uppercase
                      mb-3
                    "
                  >
                    “Xplore Possibilities”
                  </div>

                  <h3
                    className="
                      font-['Lora',serif]
                      font-normal
                      text-[1.55rem]
                      sm:text-[2rem]
                      lg:text-[2.3rem]
                      leading-tight
                      mb-4
                      text-white
                    "
                  >
                    Understanding buyers. Adapting to markets. Growing responsibly.
                  </h3>

                  <p
                    className="
                      font-['Barlow',sans-serif]
                      text-[16px]
                      leading-[1.5]
                      text-white/80
                      text-[0.86rem]
                      sm:text-[0.94rem]
                    "
                  >
                    POLYGON RESOURCE remains committed to understanding buyer requirements, maintaining consistent quality and adapting to evolving global trade needs.
                  </p>

                  <div
                    className="
                      mt-6
                      pt-5
                      border-t
                      border-white/10
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span className="w-8 h-px bg-[#DD8F2A]" />
                    <span
                      className="
                        font-['Barlow',sans-serif]
                        text-[0.58rem]
                        uppercase
                        tracking-[0.14em]
                        text-white/60
                      "
                    >
                      Export · Import · Indenting
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Export Markets - Animated Country Circles - Full Width */}
          <Reveal direction="up" distance={30} duration={500} delay={150}>
            <div className="w-full bg-white/75 backdrop-blur-md rounded-2xl border border-[#6BA539]/20 p-5 sm:p-6 lg:p-8 shadow-[0_8px_25px_rgba(31,71,50,0.08)] hover:shadow-[0_12px_35px_rgba(31,71,50,0.14)] transition-all duration-500">
              <div className="text-center mb-4 sm:mb-5">
                <div className="font-['Barlow',sans-serif] uppercase text-[0.55rem] sm:text-[0.6rem] tracking-[0.18em] text-[#6BA539] flex items-center justify-center gap-2 before:content-[''] before:w-[14px] sm:before:w-[18px] before:h-[1px] before:bg-[#6BA539] before:inline-block after:content-[''] after:w-[14px] sm:after:w-[18px] after:h-[1px] after:bg-[#6BA539] after:inline-block">
                  Export Footprint
                </div>
                <h4 className="font-['Lora',serif] font-normal text-[1rem] sm:text-[1.1rem] lg:text-[1.2rem] text-[#1F4732] mt-1">
                  <AnimatedText text="Nine countries. One quality standard." />
                </h4>
              </div>
              <div className="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto">
                {countries.map((c, i) => (
                  <div 
                    key={i} 
                    className="w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[75px] md:h-[75px] lg:w-[85px] lg:h-[85px] rounded-full border-2 border-[#1F4732] flex flex-col items-center justify-center text-center font-['Barlow',sans-serif] text-[#1F4732] hover:bg-[#1F4732] hover:text-white transition-all duration-300 text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] lg:text-[0.65rem] font-bold cursor-default" 
                    style={{ transform: `rotate(${rotations[i]})` }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ----- OUR PURPOSE (VISION, MISSION & CORE VALUES) -----
function OurPurpose() {
  const coreValues = [
    {
      num: "01",
      title: "Integrity",
      desc: "Integrity in every business relationship, from sourcing to shipment and long-term partnerships.",
    },
    {
      num: "02",
      title: "Reliability",
      desc: "Dependable coordination, timely communication and consistent follow-through across every trade process.",
    },
    {
      num: "03",
      title: "Customer Focus",
      desc: "Responsive, buyer-focused coordination shaped around market requirements, specifications and expectations.",
    },
    {
      num: "04",
      title: "Quality & Compliance",
      desc: "Respect for product quality, responsible sourcing and the compliance standards required by global markets.",
    },
  ];

  const coreValueIcons = [ShieldCheck, Clock, Users, BadgeCheck];

  return (
    <section
      id="purpose"
      className="
        relative
        w-full
        overflow-hidden
        py-[60px]
        sm:py-[80px]
        lg:py-[100px]
        bg-[linear-gradient(135deg,#f8fcf4_0%,#edf6e7_28%,#dfedd6_58%,#cfe3c4_100%)]
      "
    >
      <EdgeHoneycombCluster side="right" position="top" color="#A9711F" fillColor="#E8B33D" opacity={0.48} />
      <OrganicSectionDecoration flip />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-['Barlow',sans-serif] uppercase text-[0.55rem] sm:text-[0.6rem] tracking-[0.18em] text-[#6BA539] flex items-center justify-center gap-2 before:content-[''] before:w-[14px] sm:before:w-[18px] before:h-[1px] before:bg-[#6BA539] before:inline-block after:content-[''] after:w-[14px] sm:after:w-[18px] after:h-[1px] after:bg-[#6BA539] after:inline-block">
              Our Purpose
            </div>
            <h2 className="font-['Lora',serif] font-bold text-[2rem] sm:text-[2.5rem] lg:text-[3rem] mt-3 sm:mt-4 text-[#1F4732]">
              <AnimatedText text="Shaping the future of agricultural trade." />
            </h2>
          </div>

          {/* Main layout: Message from CEO (left 1/3) + Purpose content (right 2/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Message from CEO - left third on desktop */}
            <Reveal direction="up" distance={30} duration={500} delay={200} as="div">
              <div
                id="ceo-message"
                className="
                  group
                  relative
                  h-full
                  overflow-hidden
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#173d29]
                  to-[#28573a]
                  text-white
                  p-6
                  sm:p-7
                  shadow-[0_12px_35px_rgba(31,71,50,0.2)]
                  hover:-translate-y-1
                  hover:shadow-[0_18px_45px_rgba(31,71,50,0.28)]
                  transition-all
                  duration-500
                "
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-white/[0.06] to-transparent rounded-full translate-x-14 -translate-y-14"></div>
                <Quote className="absolute top-5 right-5 w-10 h-10 text-white/[0.08] select-none" strokeWidth={1.5} />

                <div className="relative z-10">
                  {/* Small circular photo at top-left corner */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src="/dp.jpeg"
                      alt="Rashed Shamim - Founder & CEO"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white/40 ring-2 ring-[#6BA539]/60 shadow-lg shadow-black/25 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="font-['Barlow',sans-serif] uppercase text-[0.55rem] tracking-[0.18em] text-[#a8d68f] flex items-center gap-2">
                        <span className="w-5 h-px bg-[#DD8F2A] shrink-0" />
                        Message from Our CEO
                      </span>
                      <p className="font-['Lora',serif] text-[1rem] sm:text-[1.05rem] font-semibold text-white mt-1">Rashed Shamim</p>
                      <p className="font-['Barlow',sans-serif] text-[0.55rem] uppercase tracking-[0.12em] text-white/60 mt-0.5">Founder &amp; CEO</p>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-[#DD8F2A]/60 via-white/15 to-transparent mb-4"></div>

                  <p className="font-['Lora',serif] italic text-center text-[#DD8F2A]  text-[0.95rem] sm:text-[1rem] mb-4">
                    A commitment to quality &amp; sustainability.
                  </p>

                  <div className="space-y-4 font-['Book_Antiqua','Palatino_Linotype',Palatino,serif] leading-relaxed text-ita text-center italic text-white/85 text-[0.95rem] sm:text-[1.05rem]">
                    <p>
                      In today's rapidly changing world, food security, responsible sourcing and reliable international trade are more important than ever. By working closely with local producers and suppliers, <span className="font-semibold text-white">POLYGON RESOURCE</span> aims to deliver fresh, quality agricultural products from Bangladesh to markets around the world.
                    </p>
                    <p>
                      We believe every successful business relationship begins with trust, transparency and a shared willingness to explore new possibilities. Building on our export experience since 2008, we remain committed to strengthening relationships with international buyers, suppliers and strategic partners.
                    </p>
                    <p>
                      Our work goes beyond exporting products — we build lasting connections between producers and global markets, creating opportunities that support communities and contribute to sustainable economic growth.
                    </p>
                    <p>
                      Thank you for considering POLYGON RESOURCE as your agricultural export partner. Together, we can cultivate a more connected, prosperous and sustainable future.
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/15 flex items-center gap-4">
                    {/* <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#DD8F2A] to-[#a35e03] flex items-center justify-center text-white font-['Lora',serif] text-base font-bold shadow-lg shadow-black/20">RS</div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#6BA539] rounded-full border-2 border-[#173d29]"></div>
                    </div>
                    <div>
                      <p className="font-['Lora',serif] italic text-[0.9rem] text-[#a8d68f]">Sincerely,</p>
                      <p className="font-['Lora',serif] font-bold text-[1rem] text-white leading-tight mt-0.5">Rashed Shamim</p>
                      <p className="font-['Barlow',sans-serif] text-[0.55rem] uppercase tracking-[0.12em] text-[#DD8F2A] mt-0.5">Proprietor &amp; CEO</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Purpose content - right two thirds on desktop */}
            <div className="lg:col-span-2 min-w-0">

              {/* Vision & Mission */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">

                {/* Vision */}
                <Reveal direction="up" distance={30} duration={500} delay={0}>
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-2xl
                      bg-white/80
                      backdrop-blur-md
                      border
                      border-[#1F4732]/10
                      p-6
                      sm:p-7
                      shadow-[0_8px_24px_rgba(31,71,50,0.07)]
                      hover:-translate-y-1.5
                      hover:border-[#6BA539]/40
                      hover:shadow-[0_18px_40px_rgba(31,71,50,0.13)]
                      transition-all
                      duration-500
                    "
                  >
                    {/* Animated top line */}
                    <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[3px] bg-gradient-to-r from-[#1F4732] via-[#3D7A4A] to-[#6BA539] transition-all duration-500" />

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#173d29] to-[#28573a] flex items-center justify-center shadow-md shadow-[#1F4732]/20 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#1F4732]/30 transition-all duration-300">
                        <Eye size={20} strokeWidth={1.8} className="text-white" />
                      </div>
                      <span className="font-['Barlow',sans-serif] uppercase text-[0.55rem] sm:text-[0.6rem] tracking-[0.18em] text-[#6BA539] font-semibold">
                        Our Vision
                      </span>
                    </div>

                    <h3 className="font-['Lora',serif] font-semibold text-[1.25rem] sm:text-[1.35rem] lg:text-[1.45rem] mb-2.5 text-[#1F4732] leading-snug">
                      A trusted trading partner from Bangladesh.
                    </h3>

                    <p className="font-['Barlow',sans-serif] leading-relaxed text-[#666666] text-[0.85rem] sm:text-[0.9rem]">
                      To become a trusted trading partner from Bangladesh, recognized for exploring sustainable opportunities across export, import and indenting activities.
                    </p>
                  </div>
                </Reveal>

                {/* Mission */}
                <Reveal direction="up" distance={30} duration={500} delay={80}>
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-2xl
                      bg-white/80
                      backdrop-blur-md
                      border
                      border-[#1F4732]/10
                      p-6
                      sm:p-7
                      shadow-[0_8px_24px_rgba(31,71,50,0.07)]
                      hover:-translate-y-1.5
                      hover:border-[#6BA539]/40
                      hover:shadow-[0_18px_40px_rgba(31,71,50,0.13)]
                      transition-all
                      duration-500
                    "
                  >
                    {/* Animated top line */}
                    <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[3px] bg-gradient-to-r from-[#DD8F2A] via-[#6BA539] to-[#3D7A4A] transition-all duration-500" />

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6BA539] to-[#3f7728] flex items-center justify-center shadow-md shadow-[#6BA539]/25 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#6BA539]/35 transition-all duration-300">
                        <Target size={20} strokeWidth={1.8} className="text-white" />
                      </div>
                      <span className="font-['Barlow',sans-serif] uppercase text-[0.55rem] sm:text-[0.6rem] tracking-[0.18em] text-[#6BA539] font-semibold">
                        Our Mission
                      </span>
                    </div>

                    <h3 className="font-['Lora',serif] font-semibold text-[1.25rem] sm:text-[1.35rem] lg:text-[1.45rem] mb-2.5 text-[#1F4732] leading-snug">
                      Connecting global markets with quality products.
                    </h3>

                    <div className="space-y-2 font-['Barlow',sans-serif] leading-relaxed text-[#666666] text-[0.85rem] sm:text-[0.9rem]">
                      <p>
                        To connect global markets with quality agricultural products from Bangladesh while promoting responsible sourcing and sustainable trade practices.
                      </p>
                      <p>
                        Through transparent communication and lasting partnerships with producers and international buyers.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

          {/* Core Values */}
          <div>
            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-end
                sm:justify-between
                gap-3
                mb-6
              "
            >
              <div>
                <div
                  className="
                    font-['Barlow',sans-serif]
                    uppercase
                    text-[0.55rem]
                    sm:text-[0.6rem]
                    tracking-[0.18em]
                    text-[#6BA539]
                    mb-2
                  "
                >
                  Core Values
                </div>

                <h3
                  className="
                    font-['Lora',serif]
                    font-normal
                    text-[1.3rem]
                    sm:text-[1.5rem]
                    text-[#1F4732]
                  "
                >
                  The principles behind every partnership.
                </h3>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <span className="w-8 h-px bg-[#6BA539]/40" />
                <span className="w-2 h-2 rounded-full bg-[#6BA539]" />
                <span className="w-16 h-px bg-[#6BA539]/40" />
              </div>
            </div>

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
                sm:gap-5
              "
            >
              {coreValues.map((value, index) => {
                const ValueIcon = coreValueIcons[index];
                return (
                  <Reveal
                    key={value.num}
                    direction="up"
                    distance={30}
                    duration={500}
                    delay={index * 80}
                    as="div"
                  >
                    <div
                      className="
                        group
                        relative
                        h-full
                        overflow-hidden
                        rounded-2xl
                        bg-white/80
                        backdrop-blur-md
                        border
                        border-[#1F4732]/10
                        p-5
                        sm:p-6
                        shadow-[0_8px_24px_rgba(31,71,50,0.07)]
                        hover:-translate-y-2
                        hover:border-[#6BA539]/40
                        hover:shadow-[0_16px_36px_rgba(31,71,50,0.14)]
                        transition-all
                        duration-500
                      "
                    >
                      {/* Ghost numeral watermark */}
                      <span className="absolute top-1 right-4 font-['Lora',serif] font-bold text-[3.2rem] leading-none text-[#1F4732]/[0.06] select-none">
                        {value.num}
                      </span>

                      {/* Animated top line */}
                      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[3px] bg-gradient-to-r from-[#1F4732] via-[#3D7A4A] to-[#6BA539] transition-all duration-500" />

                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#edf7e8] to-[#dbeed1] border border-[#6BA539]/25 flex items-center justify-center mb-4 group-hover:bg-[#1F4732] group-hover:border-[#1F4732] group-hover:scale-105 transition-all duration-300">
                          <ValueIcon size={19} strokeWidth={1.8} className="text-[#5f9f3d] group-hover:text-white transition-colors duration-300" />
                        </div>

                        <h4 className="font-['Lora',serif] font-semibold text-[1.05rem] sm:text-[1.15rem] text-[#1F4732] mb-2">
                          {value.title}
                        </h4>

                        <p className="font-['Barlow',sans-serif] leading-relaxed text-[#666666] text-[0.8rem] sm:text-[0.85rem]">
                          {value.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- PRODUCTS (WITH THEMED CARD BACKGROUNDS) -----
const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Oilseeds'];

function Products() {
  const [activeCategory, setActiveCategory] = useState('All');
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

  const products = [
    // Fruits (4 products)
    { 
      name: 'Pineapple', 
      category: 'Fruits', 
      desc: 'Sourced from Madhupur, the "Pineapple Capital" of Bangladesh, prized for its red-soil sweetness.', 
      tags: ['Jun–Aug harvest', 'Madhupur & Tangail'], 
      bg: 'linear-gradient(140deg,#DD8F2A,#a85f13)',
      image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    { 
      name: 'Guava', 
      category: 'Fruits', 
      desc: 'Thai guava varieties make up the bulk of national production, grown across Rajshahi\'s hill and riverine districts.', 
      tags: ['430K+ tonnes/yr BD', 'Rajshahi'], 
      bg: 'linear-gradient(140deg,#9CC96B,#5f8a3a)',
      image: 'https://images.unsplash.com/photo-1689996647327-5d263fbbc79d?w=500&auto=format&fit=crop&q=60',
    },
    { 
      name: 'Mango', 
      category: 'Fruits', 
      desc: 'Nearly 100 cultivars nationwide — Fazlee, Langda, Himsagar and more, sourced from Rajshahi\'s peak growing districts.', 
      tags: ['Dec–Feb blossom', 'Rajshahi'], 
      bg: 'linear-gradient(140deg,#6BA539,#2f6b2c)',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop',
    },
    { 
      name: 'Watermelon', 
      category: 'Fruits', 
      desc: 'Coastal-grown for peak sweetness — from Patuakhali, Khulna, Bhola, Noakhali and Barguna\'s sandy soils.', 
      tags: ['Feb–Apr season', 'Coastal belt'], 
      bg: 'linear-gradient(140deg,#E24E4E,#8f2323)',
      image: 'https://images.unsplash.com/photo-1675346980561-66d6231f8bf7?w=500&auto=format&fit=crop&q=60',
    },
    // Vegetables (4 products)
    { 
      name: 'Potato', 
      category: 'Vegetables', 
      desc: 'Our flagship line — graded, sorted and cleaned at our own Rangpur facility with modern packing infrastructure.', 
      tags: ['Own processing plant', 'Rangpur'], 
      bg: 'linear-gradient(140deg,#8A5A32,#54371d)',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
    },
    { 
      name: 'Cabbage', 
      category: 'Vegetables', 
      desc: 'Fresh, crisp cabbage grown in the highlands of Bangladesh, perfect for export.', 
      tags: ['Fresh', 'Crisp'], 
      bg: 'linear-gradient(140deg,#6BA539,#4a7c32)',
      image: 'https://images.unsplash.com/photo-1652860213441-6622f9fec77f?w=500&auto=format&fit=crop&q=60',
    },
    { 
      name: 'Cauliflower', 
      category: 'Vegetables', 
      desc: 'Premium cauliflower, carefully cultivated and harvested for export markets.', 
      tags: ['Premium Quality', 'Fresh'], 
      bg: 'linear-gradient(140deg,#F5F5DC,#e0e0c8)',
      image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&h=300&fit=crop',
    },
    { 
      name: 'Pumpkin', 
      category: 'Vegetables', 
      desc: 'Nutritious pumpkin varieties grown across Bangladesh, rich in vitamins and minerals.', 
      tags: ['Organic', 'Nutritious'], 
      bg: 'linear-gradient(140deg,#E8A317,#c4881a)',
      image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&h=300&fit=crop',
    },
    // Oilseeds (4 products)
    { 
      name: 'Sesame Seeds', 
      category: 'Oilseeds', 
      desc: 'Premium quality sesame seeds, rich in oil content and perfect for export.', 
      tags: ['High Oil Content', 'Premium'], 
      bg: 'linear-gradient(140deg,#D4A373,#b8895c)',
      image: 'https://images.unsplash.com/photo-1731970820339-e725b78f55e4?w=500&auto=format&fit=crop&q=60',
    },
    { 
      name: 'Groundnut', 
      category: 'Oilseeds', 
      desc: 'High-quality groundnuts sourced from Bangladeshi farmers, suitable for oil extraction.', 
      tags: ['High Yield', 'Premium Grade'], 
      bg: 'linear-gradient(140deg,#C9A227,#8a6a17)',
      image: 'https://images.unsplash.com/photo-1694654359031-e2db00bd0e93?w=500&auto=format&fit=crop&q=60',
    },
  ];

  const getFilteredProducts = () => {
    if (activeCategory === 'All') {
      return products;
    }
    return products.filter(p => p.category === activeCategory);
  };

  const filteredProducts = getFilteredProducts();

  const handleImageError = (e) => {
    const img = e.currentTarget;
    img.style.display = 'none';
    if (img.parentElement) {
      img.parentElement.style.background = '#f0f0f0';
    }
  };

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
                onClick={() => setActiveCategory(cat)}
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
              
              {filteredProducts.map((p, index) => (
                <Reveal 
                  key={index} 
                  direction="up" 
                  distance={30} 
                  duration={500} 
                  delay={index * 60}
                  as="div"
                  className="product-card rounded-xl overflow-hidden"
                >
                  <div className="relative overflow-hidden bg-[#f5f5f0] aspect-[4/3]">
                    <img 
                      src={p.image} 
                      alt={p.name}
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                      <span className="font-['Barlow',sans-serif] text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.08em] bg-[#1F4732]/80 backdrop-blur-sm text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                        {p.category}
                      </span>
                    </div>
                    {/* Gradient overlay on image bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1F4732]/20 to-transparent"></div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h4 className="font-['Lora',serif] font-normal text-[1rem] sm:text-[1.1rem] text-[#1F4732] font-semibold mb-1">
                      {p.name}
                    </h4>
                    <p className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] text-[#666666] text-[0.75rem] sm:text-[0.8rem] leading-relaxed line-clamp-2 mb-2">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {p.tags.slice(0, 2).map((tag, j) => (
                        <span 
                          key={j} 
                          className="font-['Barlow',sans-serif] text-[0.5rem] sm:text-[0.55rem] text-[#6BA539] bg-[#e8f5e8] px-1.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-1 font-['Barlow',sans-serif] text-[0.65rem] sm:text-[0.7rem] text-[#6BA539] hover:text-[#1F4732] transition-colors duration-300 group/link"
                    >
                      Know More
                      <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </a>
                  </div>
                </Reveal>
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

// ----- CTA -----
function CTA({ onGetInTouch }) {
  return (
    <section className="relative bg-[#1F4732] text-white py-[50px] sm:py-[60px] lg:py-[70px] text-center w-full overflow-hidden">
      <EdgeHoneycombCluster side="left" position="bottom" color="#A9711F" fillColor="#E8B33D" opacity={0.35} />
      <OrganicSectionDecoration dark />
      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="font-['Lora',serif] font-bold text-[1.6rem] sm:text-[1.8rem] lg:text-2xl text-white mb-4 sm:mb-5"><AnimatedText text="Ready to source from Polygon Resource?" /></h2>
        <button 
          onClick={onGetInTouch}
          className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] font-semibold text-[0.85rem] sm:text-[0.92rem] px-[20px] sm:px-[26px] py-[12px] sm:py-[14px] rounded-[2px] inline-flex items-center gap-2 bg-white text-[#1F4732] hover:bg-[#DD8F2A] transition-colors cursor-pointer shadow-lg hover:shadow-xl"
        >
          Start a Conversation →
        </button>
      </div>
    </section>
  );
}

// ----- CONTACT SECTION -----
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [phoneCode, setPhoneCode] = useState("+880");
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  const countryCodes = [
    { iso: "BD", name: "Bangladesh", code: "+880" },
    { iso: "AU", name: "Australia", code: "+61" },
    { iso: "BH", name: "Bahrain", code: "+973" },
    { iso: "BE", name: "Belgium", code: "+32" },
    { iso: "CA", name: "Canada", code: "+1" },
    { iso: "CN", name: "China", code: "+86" },
    { iso: "DK", name: "Denmark", code: "+45" },
    { iso: "EG", name: "Egypt", code: "+20" },
    { iso: "FR", name: "France", code: "+33" },
    { iso: "DE", name: "Germany", code: "+49" },
    { iso: "HK", name: "Hong Kong", code: "+852" },
    { iso: "IN", name: "India", code: "+91" },
    { iso: "ID", name: "Indonesia", code: "+62" },
    { iso: "IT", name: "Italy", code: "+39" },
    { iso: "JP", name: "Japan", code: "+81" },
    { iso: "KW", name: "Kuwait", code: "+965" },
    { iso: "MY", name: "Malaysia", code: "+60" },
    { iso: "MV", name: "Maldives", code: "+960" },
    { iso: "NP", name: "Nepal", code: "+977" },
    { iso: "NL", name: "Netherlands", code: "+31" },
    { iso: "NZ", name: "New Zealand", code: "+64" },
    { iso: "NO", name: "Norway", code: "+47" },
    { iso: "OM", name: "Oman", code: "+968" },
    { iso: "PK", name: "Pakistan", code: "+92" },
    { iso: "PH", name: "Philippines", code: "+63" },
    { iso: "QA", name: "Qatar", code: "+974" },
    { iso: "SA", name: "Saudi Arabia", code: "+966" },
    { iso: "SG", name: "Singapore", code: "+65" },
    { iso: "KR", name: "South Korea", code: "+82" },
    { iso: "ES", name: "Spain", code: "+34" },
    { iso: "SE", name: "Sweden", code: "+46" },
    { iso: "CH", name: "Switzerland", code: "+41" },
    { iso: "TW", name: "Taiwan", code: "+886" },
    { iso: "TH", name: "Thailand", code: "+66" },
    { iso: "TR", name: "Turkey", code: "+90" },
    { iso: "AE", name: "United Arab Emirates", code: "+971" },
    { iso: "GB", name: "United Kingdom", code: "+44" },
    { iso: "US", name: "United States", code: "+1" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your form submission logic here
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const contactItems = [
    {
      icon: Phone,
      label: "Call Support",
      value: "+880 1713017391",
    },
    {
      icon: Mail,
      label: "Email Support",
      value: "polygon.resource@gmail.com",
    },
    {
      icon: MapPin,
      label: "Our Head Office",
      value: "69, Dilkusha C/A, Dhaka-1000, Bangladesh",
    },
  ];

  return (
    <section
      id="contact"
      className="
        relative
        py-[60px]
        sm:py-[80px]
        lg:py-[100px]
        w-full
        bg-gradient-to-b
        from-[#f8faf8]
        via-[#f4f8ef]
        to-[#eaf3e4]
        overflow-hidden
      "
    >
      <EdgeHoneycombCluster side="right" position="bottom" color="#A9711F" fillColor="#E8B33D" opacity={0.42} />
      <OrganicSectionDecoration />

      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* ================= SECTION HEADER ================= */}
          <div className="text-center mb-10 sm:mb-14 animate-fadeInUp">
            <div
              className="
                font-['Barlow',sans-serif]
                uppercase
                text-[0.65rem]
                sm:text-[0.72rem]
                tracking-[0.18em]
                text-[#6BA539]
                flex
                items-center
                justify-center
                gap-2.5

                before:content-['']
                before:w-[18px]
                sm:before:w-[22px]
                before:h-[1px]
                before:bg-[#6BA539]
                before:inline-block

                after:content-['']
                after:w-[18px]
                sm:after:w-[22px]
                after:h-[1px]
                after:bg-[#6BA539]
                after:inline-block
              "
            >
              Contact Details
            </div>

            <h2
              className="
                font-['Lora',serif]
                font-bold
                text-[2rem]
                sm:text-[2.5rem]
                lg:text-[3rem]
                mt-3
                sm:mt-4
                text-[#1F4732]
                animate-slideInUp
              "
            >
              <AnimatedText text="Let's Discuss Opportunities" />
            </h2>

            <div
              className="
                w-20
                h-1
                bg-gradient-to-r
                from-[#1F4732]
                to-[#6BA539]
                mx-auto
                mt-4
                rounded-full
                animate-pulse
              "
            />
          </div>

          {/* ================= MAIN GRID ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">

              {/* Quick Trade Inquiry */}
              <div
                className="
                  relative
                  overflow-hidden
                  bg-gradient-to-br
                  from-[#fffdf6]
                  via-[#f6faef]
                  to-[#e7f2df]
                  rounded-2xl
                  p-6
                  sm:p-8
                  border
                  border-[#6BA539]/20
                  shadow-[0_12px_35px_rgba(31,71,50,0.12)]
                  hover:shadow-[0_20px_50px_rgba(31,71,50,0.18)]
                  hover:border-[#6BA539]/35
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  animate-fadeInLeft
                  group
                "
              >
                {/* Decorative circles */}
                <div
                  className="
                    absolute
                    -top-12
                    -right-12
                    w-32
                    h-32
                    rounded-full
                    bg-[#6BA539]/10
                  "
                />

                <div
                  className="
                    absolute
                    -bottom-10
                    -left-10
                    w-28
                    h-28
                    rounded-full
                    bg-[#1F4732]/[0.06]
                  "
                />

                {/* Agriculture Leaf */}
                <svg
                  className="
                    absolute
                    -top-1
                    right-0
                    w-28
                    h-28
                    opacity-[0.08]
                    transition-transform
                    duration-700
                    group-hover:scale-110
                    group-hover:-rotate-6
                  "
                  viewBox="0 0 120 120"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M18 99C23 52 49 18 103 11C97 61 68 93 18 99Z"
                    fill="#1F4732"
                  />

                  <path
                    d="M27 90C45 72 66 50 94 22"
                    stroke="#1F4732"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  <path
                    d="M51 67C48 55 50 44 56 34"
                    stroke="#1F4732"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  <path
                    d="M66 52C75 50 82 46 89 39"
                    stroke="#1F4732"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Top Gradient Line */}
                <div
                  className="
                    absolute
                    top-0
                    left-0
                    right-0
                    h-[3px]
                    bg-gradient-to-r
                    from-[#1F4732]
                    via-[#3D7A4A]
                    to-[#6BA539]
                  "
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">

                    {/* Modern Message Icon */}
                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        bg-gradient-to-br
                        from-[#edf7e8]
                        to-[#dbeed1]
                        flex
                        items-center
                        justify-center
                        border
                        border-[#6BA539]/20
                        shadow-sm
                        group-hover:bg-[#1F4732]
                        group-hover:border-[#1F4732]
                        group-hover:scale-105
                        transition-all
                        duration-300
                      "
                    >
                      <Mail
                        size={20}
                        strokeWidth={1.8}
                        className="
                          text-[#5f9f3d]
                          group-hover:text-white
                          transition-colors
                          duration-300
                        "
                      />
                    </div>

                    <h3
                      className="
                        font-['Lora',serif]
                        font-normal
                        text-xl
                        sm:text-2xl
                        text-[#1F4732]
                      "
                    >
                      Quick Trade Inquiry
                    </h3>
                  </div>

                  <p
                    className="
                      font-['Barlow',sans-serif]
                      text-[16px]
                      leading-[1.5]
                      text-[#666666]
                      text-sm
                      sm:text-base
                    "
                  >
                    Connect with us to inquire about global supply pricing,
                    samples, or tailored indenting services from Bangladesh.
                  </p>
                </div>
              </div>

              {/* ================= CONTACT CARDS ================= */}

              {contactItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal 
                    key={index} 
                    direction="up" 
                    distance={30} 
                    duration={500} 
                    delay={index * 80}
                    as="div"
                  >
                    <div
                      className="
                        relative
                        overflow-hidden
                        bg-gradient-to-br
                        from-[#fffdf7]
                        via-[#fafcf5]
                        to-[#edf5e7]
                        rounded-xl
                        p-4
                        sm:p-5
                        border
                        border-[#6BA539]/15
                        shadow-[0_6px_18px_rgba(31,71,50,0.07)]
                        hover:shadow-[0_14px_32px_rgba(31,71,50,0.14)]
                        hover:border-[#6BA539]/35
                        transition-all
                        duration-500
                        hover:-translate-y-1
                        group
                        animate-fadeInLeft
                      "
                      style={{
                        animationDelay: `${(index + 1) * 150}ms`,
                      }}
                    >
                      {/* Background accent */}
                      <div
                        className="
                          absolute
                          -right-7
                          -bottom-7
                          w-20
                          h-20
                          rounded-full
                          bg-[#6BA539]/[0.06]
                          group-hover:scale-125
                          transition-transform
                          duration-500
                        "
                      />

                      {/* Leaf */}
                      <svg
                        className="
                          absolute
                          right-1
                          bottom-0
                          w-16
                          h-16
                          opacity-[0.06]
                          transition-all
                          duration-500
                          group-hover:opacity-[0.10]
                          group-hover:scale-110
                        "
                        viewBox="0 0 70 70"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M7 61C9 33 27 12 62 7C57 39 39 57 7 61Z"
                          fill="#1F4732"
                        />

                        <path
                          d="M14 55C27 43 39 31 55 14"
                          stroke="#1F4732"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>

                      <div className="relative z-10 flex items-start gap-4">

                        {/* Modern Lucide Icon */}
                        <div
                          className="
                            w-12
                            h-12
                            flex-shrink-0
                            rounded-xl
                            bg-gradient-to-br
                            from-[#edf7e8]
                            to-[#dbeed1]
                            border
                            border-[#6BA539]/20
                            flex
                            items-center
                            justify-center
                            shadow-sm

                            group-hover:bg-[#1F4732]
                            group-hover:border-[#1F4732]
                            group-hover:shadow-[0_7px_18px_rgba(31,71,50,0.20)]
                            group-hover:scale-105
                            group-hover:-translate-y-[2px]

                            transition-all
                            duration-300
                          "
                        >
                          <Icon
                            size={21}
                            strokeWidth={1.8}
                            className="
                              text-[#5f9f3d]
                              group-hover:text-white
                              transition-colors
                              duration-300
                            "
                          />
                        </div>

                        {/* Text */}
                        <div className="min-w-0 pt-[1px]">
                          <h4
                            className="
                              font-['Barlow',sans-serif]
                              text-xs
                              sm:text-sm
                              text-[#6BA539]
                              uppercase
                              tracking-wider
                              mb-1
                            "
                          >
                            {item.label}
                          </h4>

                          <p
                            className="
                              font-['Barlow',sans-serif]
                              text-[16px]
                              leading-[1.5]
                              text-[#666666]
                              text-[#1C1A14]
                              text-sm
                              sm:text-base
                              break-words
                              group-hover:text-[#1F4732]
                              transition-colors
                              duration-300
                            "
                          >
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* ================= RIGHT COLUMN / FORM ================= */}

            <div className="lg:col-span-2 animate-fadeInRight">
              <div
                className="
                  relative
                  overflow-hidden
                  bg-gradient-to-br
                  from-[#fffdf8]
                  via-white
                  to-[#edf5e8]
                  rounded-2xl
                  p-6
                  sm:p-8
                  border
                  border-[#6BA539]/20
                  shadow-[0_15px_45px_rgba(31,71,50,0.12)]
                  hover:shadow-[0_22px_60px_rgba(31,71,50,0.17)]
                  transition-all
                  duration-500
                  group/form
                "
              >
                {/* Top Gradient */}
                <div
                  className="
                    absolute
                    top-0
                    left-0
                    right-0
                    h-[3px]
                    bg-gradient-to-r
                    from-[#1F4732]
                    via-[#3D7A4A]
                    to-[#6BA539]
                  "
                />

                {/* Decorative Circles */}
                <div
                  className="
                    absolute
                    -top-20
                    -right-20
                    w-48
                    h-48
                    rounded-full
                    bg-[#6BA539]/[0.07]
                  "
                />

                <div
                  className="
                    absolute
                    -bottom-24
                    -left-24
                    w-56
                    h-56
                    rounded-full
                    bg-[#1F4732]/[0.04]
                  "
                />

                {/* Large Agriculture Leaf */}
                <svg
                  className="
                    absolute
                    -bottom-7
                    right-0
                    w-52
                    h-52
                    opacity-[0.04]
                    transition-transform
                    duration-1000
                    group-hover/form:scale-110
                    group-hover/form:-rotate-3
                  "
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M20 181C25 104 74 39 176 16C163 109 111 169 20 181Z"
                    fill="#1F4732"
                  />

                  <path
                    d="M37 165C74 129 111 88 157 39"
                    stroke="#1F4732"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />

                  <path
                    d="M81 119C76 96 80 75 92 57"
                    stroke="#1F4732"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  <path
                    d="M111 87C131 83 145 74 156 62"
                    stroke="#1F4732"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>

                {/* ================= FORM ================= */}

                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-4 sm:space-y-5"
                >

                  {/* Full Name */}
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                        className="
                          w-full
                          px-4
                          pt-5
                          pb-2
                          border
                          border-[rgba(31,71,50,0.18)]
                          rounded-lg
                          focus:outline-none
                          focus:border-[#1F4732]
                          focus:ring-2
                          focus:ring-[#1F4732]/15
                          transition-all
                          duration-300
                          bg-[#FFFEFA]/90
                          font-['Barlow',sans-serif]
                          text-[16px]
                          leading-[1.5]
                          text-[#1C1A14]
                          hover:border-[#6BA539]/50
                          peer
                        "
                        required
                      />
                      <label
                        htmlFor="name"
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          font-['Barlow',sans-serif]
                          text-[16px]
                          text-[#8a8368]
                          transition-all
                          duration-300
                          pointer-events-none
                          origin-left
                          peer-placeholder-shown:top-1/2
                          peer-placeholder-shown:-translate-y-1/2
                          peer-placeholder-shown:text-base
                          peer-focus:top-1
                          peer-focus:-translate-y-0
                          peer-focus:text-xs
                          peer-focus:text-[#1F4732]
                          peer-focus:font-semibold
                          peer-not-placeholder-shown:top-1
                          peer-not-placeholder-shown:-translate-y-0
                          peer-not-placeholder-shown:text-xs
                          peer-not-placeholder-shown:text-[#1F4732]
                          peer-not-placeholder-shown:font-semibold
                        "
                      >
                        Name
                        <span className="text-[#DD8F2A]"> *</span>
                      </label>

                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          w-0
                          h-0.5
                          bg-gradient-to-r
                          from-[#1F4732]
                          via-[#3D7A4A]
                          to-[#6BA539]
                          transition-all
                          duration-300
                          peer-focus:w-full
                        "
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        className="
                          w-full
                          px-4
                          pt-5
                          pb-2
                          border
                          border-[rgba(31,71,50,0.18)]
                          rounded-lg
                          focus:outline-none
                          focus:border-[#1F4732]
                          focus:ring-2
                          focus:ring-[#1F4732]/15
                          transition-all
                          duration-300
                          bg-[#FFFEFA]/90
                          font-['Barlow',sans-serif]
                          text-[16px]
                          leading-[1.5]
                          text-[#1C1A14]
                          hover:border-[#6BA539]/50
                          peer
                        "
                        required
                      />
                      <label
                        htmlFor="email"
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          font-['Barlow',sans-serif]
                          text-[16px]
                          text-[#8a8368]
                          transition-all
                          duration-300
                          pointer-events-none
                          origin-left
                          peer-placeholder-shown:top-1/2
                          peer-placeholder-shown:-translate-y-1/2
                          peer-placeholder-shown:text-base
                          peer-focus:top-1
                          peer-focus:-translate-y-0
                          peer-focus:text-xs
                          peer-focus:text-[#1F4732]
                          peer-focus:font-semibold
                          peer-not-placeholder-shown:top-1
                          peer-not-placeholder-shown:-translate-y-0
                          peer-not-placeholder-shown:text-xs
                          peer-not-placeholder-shown:text-[#1F4732]
                          peer-not-placeholder-shown:font-semibold
                        "
                      >
                        Business Email Address
                        <span className="text-[#DD8F2A]"> *</span>
                      </label>

                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          w-0
                          h-0.5
                          bg-gradient-to-r
                          from-[#1F4732]
                          via-[#3D7A4A]
                          to-[#6BA539]
                          transition-all
                          duration-300
                          peer-focus:w-full
                        "
                      />
                    </div>
                  </div>

                  {/* Phone Number with Country Code */}
                  <div className="group relative">
                    <div
                      className="
                        flex
                        items-stretch
                        border
                        border-[rgba(31,71,50,0.18)]
                        rounded-lg
                        bg-[#FFFEFA]/90
                        transition-all
                        duration-300
                        focus-within:border-[#1F4732]
                        focus-within:ring-2
                        focus-within:ring-[#1F4732]/15
                        hover:border-[#6BA539]/50
                      "
                    >
                      <div className="relative shrink-0 w-[88px] sm:w-[104px]">
                        <button
                          type="button"
                          onClick={() => setIsCodeOpen((o) => !o)}
                          aria-haspopup="listbox"
                          aria-expanded={isCodeOpen}
                          aria-label="Country calling code"
                          className="
                            w-full
                            h-full
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            px-1
                            bg-transparent
                            cursor-pointer
                            whitespace-nowrap
                            font-['Barlow',sans-serif]
                            text-[16px]
                            leading-[1.5]
                            text-[#1C1A14]
                            focus:outline-none
                          "
                        >
                          <img
                            src={`https://flagcdn.com/w40/${(countryCodes.find((c) => c.code === phoneCode)?.iso || 'bd').toLowerCase()}.png`}
                            alt=""
                            aria-hidden="true"
                            width={21}
                            height={16}
                            loading="lazy"
                            draggable={false}
                            className="w-[21px] h-auto rounded-[2px] shadow-sm"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <span>{phoneCode}</span>
                          <ChevronDown size={14} className={`shrink-0 text-[#8a8368] transition-transform duration-300 ${isCodeOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isCodeOpen && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsCodeOpen(false)} />
                            <div
                              role="listbox"
                              className="
                                absolute
                                left-0
                                top-[calc(100%+6px)]
                                z-20
                                w-56
                                max-w-[72vw]
                                max-h-56
                                overflow-y-auto
                                bg-white
                                border
                                border-[#1F4732]/15
                                rounded-lg
                                shadow-xl
                                shadow-[#1F4732]/15
                                py-1
                              "
                            >
                              {countryCodes.map((c) => (
                                <button
                                  key={c.iso}
                                  type="button"
                                  role="option"
                                  aria-selected={phoneCode === c.code}
                                  onClick={() => {
                                    setPhoneCode(c.code);
                                    setIsCodeOpen(false);
                                  }}
                                  className={`
                                    w-full
                                    flex
                                    items-center
                                    gap-2
                                    px-3
                                    py-2
                                    text-left
                                    cursor-pointer
                                    font-['Barlow',sans-serif]
                                    text-[13px]
                                    sm:text-sm
                                    transition-colors
                                    duration-150
                                    ${phoneCode === c.code ? 'bg-[#edf6e8] text-[#1F4732] font-semibold' : 'text-[#333333] hover:bg-[#f4f9ef]'}
                                  `}
                                >
                                  <img
                                    src={`https://flagcdn.com/w40/${c.iso.toLowerCase()}.png`}
                                    alt=""
                                    aria-hidden="true"
                                    width={21}
                                    height={16}
                                    loading="lazy"
                                    draggable={false}
                                    className="w-[21px] h-auto rounded-[2px] shadow-sm shrink-0"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                  />
                                  <span className="flex-1 truncate">{c.name}</span>
                                  <span className="shrink-0 text-[#5f9f3d] font-medium">{c.code}</span>
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <span className="w-px self-stretch my-2.5 bg-[rgba(31,71,50,0.12)]" />

                      <div className="relative flex-1 min-w-0">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder=" "
                          pattern="[0-9\s\-()]{6,15}"
                          title="Please enter your phone number (digits only)"
                          className="
                            w-full
                            px-4
                            pt-5
                            pb-2
                            border-0
                            rounded-none
                            focus:outline-none
                            focus:ring-0
                            transition-all
                            duration-300
                            bg-transparent
                            font-['Barlow',sans-serif]
                            text-[16px]
                            leading-[1.5]
                            text-[#1C1A14]
                            peer
                          "
                          required
                        />
                        <label
                          htmlFor="phone"
                          className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            font-['Barlow',sans-serif]
                            text-[16px]
                            text-[#8a8368]
                            transition-all
                            duration-300
                            pointer-events-none
                            origin-left
                            peer-placeholder-shown:top-1/2
                            peer-placeholder-shown:-translate-y-1/2
                            peer-placeholder-shown:text-base
                            peer-focus:top-1
                            peer-focus:-translate-y-0
                            peer-focus:text-xs
                            peer-focus:text-[#1F4732]
                            peer-focus:font-semibold
                            peer-not-placeholder-shown:top-1
                            peer-not-placeholder-shown:-translate-y-0
                            peer-not-placeholder-shown:text-xs
                            peer-not-placeholder-shown:text-[#1F4732]
                            peer-not-placeholder-shown:font-semibold
                          "
                        >
                          Phone Number
                          <span className="text-[#DD8F2A]"> *</span>
                        </label>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-0.5 bg-gradient-to-r from-[#1F4732] via-[#3D7A4A] to-[#6BA539] transition-all duration-300 pointer-events-none" />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <div className="relative">
                      <textarea
                        rows="5"
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder=" "
                        className="
                          w-full
                          px-4
                          pt-5
                          pb-2
                          border
                          border-[rgba(31,71,50,0.18)]
                          rounded-lg
                          focus:outline-none
                          focus:border-[#1F4732]
                          focus:ring-2
                          focus:ring-[#1F4732]/15
                          transition-all
                          duration-300
                          bg-[#FFFEFA]/90
                          font-['Barlow',sans-serif]
                          text-[16px]
                          leading-[1.5]
                          text-[#1C1A14]
                          hover:border-[#6BA539]/50
                          resize-none
                          peer
                          min-h-[120px]
                        "
                        required
                      />
                      <label
                        htmlFor="message"
                        className="
                          absolute
                          left-4
                          top-4
                          font-['Barlow',sans-serif]
                          text-[16px]
                          text-[#8a8368]
                          transition-all
                          duration-300
                          pointer-events-none
                          origin-left
                          peer-placeholder-shown:top-4
                          peer-placeholder-shown:text-base
                          peer-focus:top-1
                          peer-focus:text-xs
                          peer-focus:text-[#1F4732]
                          peer-focus:font-semibold
                          peer-not-placeholder-shown:top-1
                          peer-not-placeholder-shown:text-xs
                          peer-not-placeholder-shown:text-[#1F4732]
                          peer-not-placeholder-shown:font-semibold
                        "
                      >
                        Detailed Message
                        <span className="text-[#DD8F2A]"> *</span>
                      </label>

                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          w-0
                          h-0.5
                          bg-gradient-to-r
                          from-[#1F4732]
                          via-[#3D7A4A]
                          to-[#6BA539]
                          transition-all
                          duration-300
                          peer-focus:w-full
                        "
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="
                      relative
                      w-full
                      bg-gradient-to-r
                      from-[#163d29]
                      via-[#1F4732]
                      to-[#315f3d]
                      text-white
                      py-3
                      sm:py-3.5
                      rounded-lg
                      font-['Barlow',sans-serif]
                      text-[16px]
                      leading-[1.5]
                      font-semibold
                      overflow-hidden
                      transition-all
                      duration-300
                      hover:from-[#558d2f]
                      hover:via-[#6BA539]
                      hover:to-[#7fb64d]
                      hover:shadow-[0_10px_25px_rgba(107,165,57,0.28)]
                      group
                    "
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitted ? (
                        <>
                          <svg
                            className="w-5 h-5 animate-bounce"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>

                          Message Sent!
                        </>
                      ) : (
                        <>
                          SEND TRADE INQUIRY

                          <svg
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isHovered ? "translate-x-1" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </span>

                    {/* Shine */}
                    <span
                      className="
                        absolute
                        inset-0
                        -translate-x-full
                        group-hover:translate-x-full
                        transition-transform
                        duration-700
                        bg-gradient-to-r
                        from-transparent
                        via-white/20
                        to-transparent
                      "
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ================= BOTTOM DECORATION ================= */}

          <div className="flex justify-center mt-12 sm:mt-16 animate-fadeInUp">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#6BA539]" />

              <div className="w-2 h-2 rounded-full bg-[#6BA539] animate-pulse" />

              <div className="w-16 h-px bg-[#6BA539]" />

              <div
                className="w-2 h-2 rounded-full bg-[#6BA539] animate-pulse"
                style={{
                  animationDelay: "0.5s",
                }}
              />

              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#6BA539]" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= ANIMATIONS ================= */}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out both;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out both;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out both;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out both;
        }
      `}</style>
    </section>
  );
}

//Footer Section
function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <footer className="relative bg-[#1F4732] text-white pt-[60px] pb-[30px] sm:pt-[80px] sm:pb-[40px] lg:pt-[100px] lg:pb-[50px] w-full overflow-hidden">
      <EdgeHoneycombCluster side="left" position="top" color="#A9711F" fillColor="#E8B33D" opacity={0.32} />
      <OrganicSectionDecoration dark flip />
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image - switches based on screen size */}
        <div 
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{
            backgroundImage: `url('${isMobile ? '/mobile_footer.png' : '/footer.png'}')`,
          }}
        />
        {/* Dark overlay to make text visible - INCREASED OPACITY */}
        <div className="absolute inset-0 bg-[#1F4732]/45"></div>
      </div>

      {/* Wave transition blending the Contact section into the Footer.
          Filled with the Contact section's exact bottom gradient color
          (#eaf3e4) so the two backgrounds melt together with no seam. */}
      <div className="absolute inset-x-0 top-0 z-[2] pointer-events-none" aria-hidden="true">
        <svg
          className="block w-full h-[48px] sm:h-[70px] lg:h-[92px]"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 H1440 V30 Q1350,60 1200,42 T960,40 T720,42 T480,40 T240,42 T0,44 Z"
            fill="#eaf3e4"
          />
        </svg>
      </div>
      
      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            
            {/* Column 1 - Brand & Tagline with Logo and Text Image */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] flex-shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="Polygon Resource Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <img 
                    src="/text.png" 
                    alt="Polygon Resource" 
                    className="h-[28px] sm:h-[32px] md:h-[38px] w-auto object-contain transition-all duration-300"
                  />
                </div>
              </div>
              <p className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] text-[#666666] text-[0.85rem] sm:text-[0.9rem] text-[#e5dfc9] leading-relaxed max-w-[300px] font-semibold">
                An agricultural-based export company delivering premium fruits, vegetables, potatoes and grains from Bangladesh to the world.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h4 className="font-['Barlow',sans-serif] font-se text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.15em] text-[#6BA539] mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5 font-semibold">
                {['Home', 'About Us', 'Products', 'Blog'].map((item, index) => {
                  const id = item.toLowerCase();
                  const href = id === 'home' ? '#home' : id === 'ceo' ? '#ceo-message' : `#${id}`;
                  return (
                    <li key={index}>
                      <a 
                        href={href}
                        className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] text-[#666666] text-[0.85rem] sm:text-[0.9rem] text-[#e5dfc9] hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-0 h-px bg-[#6BA539] transition-all duration-300 group-hover:w-4"></span>
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3 - Products */}
            <div>
              <h4 className="font-['Barlow',sans-serif] text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.15em] text-[#6BA539] mb-4">
                Products
              </h4>
              <ul className="space-y-2.5 font-semibold">
                {['Potato', 'Pineapple', 'Mango', 'Guava', 'Watermelon'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#products"
                      className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] text-[#666666] text-[0.85rem] sm:text-[0.9rem] text-[#e5dfc9] hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-[#6BA539] transition-all duration-300 group-hover:w-4"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Official Info */}
            <div>
              <h4 className="font-['Barlow',sans-serif] text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.15em] text-[#6BA539] mb-4">
                Official Info
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#6BA539] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] text-[#666666] text-[0.8rem] sm:text-[0.85rem] text-[#e5dfc9] leading-relaxed font-semibold">
                    69, Dilkusha C/A,<br />Dhaka-1000, Bangladesh
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#6BA539] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:polygonresource@gmail.com" className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] text-[#666666] text-[0.8rem] font-semibold sm:text-[0.85rem] text-[#e5dfc9] hover:text-white transition-colors duration-300">
                    polygon.resource@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#6BA539] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+8801713017391" className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] text-[#666666] text-[0.8rem] font-semibold sm:text-[0.85rem] text-[#e5dfc9] hover:text-white transition-colors duration-300">
                    +880 1713017391
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 sm:mt-12 lg:mt-14 pt-6 sm:pt-8 border-t border-[rgba(237,230,212,0.1)] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] text-[#666666] text-[0.7rem] sm:text-[0.75rem] text-[#e5dfc9] text-center sm:text-left">
              © 2026 Polygon Resource. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="text-[#8a8368] hover:text-[#6BA539] transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="text-[#8a8368] hover:text-[#6BA539] transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="text-[#8a8368] hover:text-[#6BA539] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="text-[#8a8368] hover:text-[#6BA539] transition-colors duration-300"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;