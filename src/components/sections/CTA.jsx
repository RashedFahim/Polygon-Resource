import AnimatedText from '../animations/AnimatedText';
import EdgeHoneycombCluster from '../decorations/EdgeHoneycombCluster';
import OrganicSectionDecoration from '../decorations/OrganicSectionDecoration';

export default function CTA({ onGetInTouch }) {
  return (
    <section className="relative bg-[#1F4732] text-white py-[50px] sm:py-[60px] lg:py-[70px] text-center w-full overflow-hidden">
      <EdgeHoneycombCluster side="left" position="bottom" color="#A9711F" fillColor="#E8B33D" opacity={0.42} />
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
