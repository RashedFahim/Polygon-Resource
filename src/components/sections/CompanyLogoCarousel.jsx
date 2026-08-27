import AnimatedText from '../animations/AnimatedText';
import EdgeHoneycombCluster from '../decorations/EdgeHoneycombCluster';
import { COMPANY_LOGOS } from '../../data/companies';
import InfiniteMarquee from './InfiniteMarquee';

export default function CompanyLogoCarousel() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#F7F4EA] py-10 sm:py-12 lg:py-14 border-y border-[#1F4732]/10"
      aria-labelledby="companies-worked-with-title"
    >
      <EdgeHoneycombCluster
        side="right"
        position="top"
        color="#B06F14"
        fillColor="#E2A62B"
        opacity={0.42}
      />

      <div className="relative z-10 w-full">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 mb-7 sm:mb-9">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-2.5">
              <span className="w-7 sm:w-10 h-px bg-[#DD8F2A]/60" />
              <span className="font-['Barlow',sans-serif] text-[0.63rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#A9711F]">
                Trusted Connections
              </span>
              <span className="w-7 sm:w-10 h-px bg-[#DD8F2A]/60" />
            </div>

            <h2
              id="companies-worked-with-title"
              className="font-['Lora',serif] font-bold text-[#1F4732] text-[1.35rem] sm:text-[1.6rem] lg:text-[1.8rem]"
            >
              <AnimatedText text="Companies We’ve Worked With" />
            </h2>
          </div>
        </div>

        <div className="company-marquee relative w-full overflow-hidden">
          {/* Soft edge fades keep logos entering/leaving the viewport cleanly. */}
          <InfiniteMarquee edgeColor="#F7F4EA">
            {(copy) => COMPANY_LOGOS.map((company) => (
              <div
                key={`${copy}-${company.name}`}
                className="group/logo mr-8 flex h-[128px] w-[112px] shrink-0 flex-col items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 sm:mr-12 sm:h-[140px] sm:w-[124px] sm:gap-2.5 md:mr-14 md:h-[152px] md:w-[136px] lg:mr-16 lg:h-[164px] lg:w-[148px]"
                title={company.name}
              >
                <img
                  src={company.logo}
                  alt={copy === 0 ? `${company.name} logo` : ''}
                  className="h-[82px] w-full object-contain transition-transform duration-300 group-hover/logo:scale-[1.05] sm:h-[90px] md:h-[98px] lg:h-[106px]"
                  loading="lazy"
                  draggable="false"
                />
                <span className="text-center font-['Barlow',sans-serif] text-[0.64rem] font-semibold leading-tight text-[#1F4732] sm:text-[0.68rem] md:text-[0.72rem] lg:text-[0.76rem]">
                  {company.name}
                </span>
              </div>
            ))}
          </InfiniteMarquee>
        </div>
      </div>
    </section>
  );
}
