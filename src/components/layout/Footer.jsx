import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FOOTER_PRODUCT_NAMES } from '../../data/footer';
import { getProductPath } from '../../utils/productPaths';
import EdgeHoneycombCluster from '../decorations/EdgeHoneycombCluster';
import OrganicSectionDecoration from '../decorations/OrganicSectionDecoration';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

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
                        href={pathname === '/' ? href : `/${href}`}
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
                {FOOTER_PRODUCT_NAMES.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={getProductPath(item)}
                      className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] text-[#666666] text-[0.85rem] sm:text-[0.9rem] text-[#e5dfc9] hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-[#6BA539] transition-all duration-300 group-hover:w-4"></span>
                      {item}
                    </Link>
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
                  <a href="mailto:polygon.resource@gmail.com" className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] text-[#666666] text-[0.8rem] font-semibold sm:text-[0.85rem] text-[#e5dfc9] hover:text-white transition-colors duration-300">
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
