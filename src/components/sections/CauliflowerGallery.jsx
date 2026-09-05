import AnimatedText from '../animations/AnimatedText';
import EdgeHoneycombCluster from '../decorations/EdgeHoneycombCluster';
import InfiniteMarquee from './InfiniteMarquee';

const CAULIFLOWER_IMAGES = [
  '/cauliflower/cauliflower1.png',
  '/cauliflower/cauliflower2.png',
  '/cauliflower/cauliflower3.png',
];

export default function CauliflowerGallery() {
  return (
    <section
      className="relative w-full overflow-hidden border-y border-[#1F4732]/10 bg-[#F7F4EA] py-12 sm:py-14 lg:py-16"
      aria-labelledby="cauliflower-gallery-title"
    >
      <EdgeHoneycombCluster
        side="right"
        position="top"
        color="#B06F14"
        fillColor="#E2A62B"
        opacity={0.3}
      />

      <div className="relative z-10 w-full">
        <div className="mb-8 px-3 sm:mb-10 sm:px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-2.5 flex items-center justify-center gap-3">
              <span className="h-px w-7 bg-[#DD8F2A]/60 sm:w-10" />
              <span className="font-['Barlow',sans-serif] text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-[#A9711F] sm:text-[0.7rem]">
                Product Gallery
              </span>
              <span className="h-px w-7 bg-[#DD8F2A]/60 sm:w-10" />
            </div>

            <h2
              id="cauliflower-gallery-title"
              className="font-['Lora',serif] text-[1.7rem] font-bold text-[#1F4732] sm:text-[2rem] lg:text-[2.3rem]"
            >
              <AnimatedText text="Cauliflower Images" />
            </h2>
          </div>
        </div>

        <InfiniteMarquee edgeColor="#F7F4EA" pauseOnHover={false}>
          {(copy) => CAULIFLOWER_IMAGES.map((image, index) => (
            <div
              key={`${copy}-${image}`}
              className="group/cauliflower mr-5 flex h-[220px] w-[250px] shrink-0 items-center justify-center overflow-hidden p-4 transition-transform duration-300 hover:-translate-y-1 sm:mr-7 sm:h-[260px] sm:w-[310px] sm:p-5 md:mr-8 md:h-[285px] md:w-[340px] lg:mr-10 lg:h-[310px] lg:w-[380px]"
            >
              <img
                src={image}
                alt={copy === 0 ? `Cauliflower image ${index + 1}` : ''}
                className="h-full w-full object-contain transition-transform duration-300 group-hover/cauliflower:scale-[1.03]"
                loading="lazy"
                draggable="false"
              />
            </div>
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
}
