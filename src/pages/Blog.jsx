import { useNavigate } from 'react-router-dom';
import AnimatedText from '../components/animations/AnimatedText';
import { Reveal } from '../components/animations/Reveal';
import EdgeHoneycombCluster from '../components/decorations/EdgeHoneycombCluster';
import OrganicSectionDecoration from '../components/decorations/OrganicSectionDecoration';
import ScrollToTopButton from '../components/floating/ScrollToTopButton';
import WhatsAppButton from '../components/floating/WhatsAppButton';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

export default function Blog() {
  const navigate = useNavigate();

  const scrollToContact = () => {
    navigate('/#contact');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;900&family=Lora:wght@400;500;600;700&display=swap');
      `}</style>
      <div className="App min-h-screen w-full overflow-x-hidden bg-cream font-['Barlow',sans-serif] text-[16px] leading-[1.5]">
        <Navbar onGetInTouch={scrollToContact} isProductPage />

        <main className="bg-[linear-gradient(135deg,#f8fcf4_0%,#edf6e7_28%,#dfedd6_58%,#cfe3c4_100%)] pt-24 sm:pt-28">
          <section
            id="blog"
            aria-labelledby="blog-title"
            className="relative flex min-h-[calc(100vh-6rem)] w-full items-center overflow-hidden bg-[linear-gradient(135deg,#f8fcf4_0%,#edf6e7_28%,#dfedd6_58%,#cfe3c4_100%)] py-[60px] sm:py-[80px] lg:py-[100px]"
          >
            <EdgeHoneycombCluster side="left" position="bottom" color="#A9711F" fillColor="#E8B33D" opacity={0.48} />
            <OrganicSectionDecoration />

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10">
              <div className="mx-auto max-w-7xl">
                <Reveal direction="up" distance={35}>
                  <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-2.5 flex items-center justify-center gap-3">
                      <span className="h-px w-7 bg-[#DD8F2A]/60 sm:w-10" />
                      <span className="font-['Barlow',sans-serif] text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-[#A9711F] sm:text-[0.7rem]">
                        Blog
                      </span>
                      <span className="h-px w-7 bg-[#DD8F2A]/60 sm:w-10" />
                    </div>

                    <h1 id="blog-title" className="font-['Lora',serif] text-[2rem] font-bold text-[#1F4732] sm:text-[2.5rem] lg:text-[3rem]">
                      <AnimatedText text="Blog" />
                    </h1>

                    <div className="relative mt-10 overflow-hidden rounded-2xl border border-[#1F4732]/10 bg-white/75 px-6 py-14 shadow-[0_12px_35px_rgba(31,71,50,0.1)] backdrop-blur-md sm:mt-12 sm:px-10 sm:py-20">
                      <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#1F4732] via-[#3D7A4A] to-[#6BA539]" />
                      <p className="font-['Barlow',sans-serif] text-[0.9rem] text-[#666666] sm:text-[1rem]">
                        Blog articles will be added here.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
        <ScrollToTopButton />
      </div>
    </>
  );
}
