import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/animations/Reveal';
import CTA from '../components/sections/CTA';
import Contact from '../components/sections/Contact';
import HoneycombPattern from '../components/decorations/HoneycombPattern';
import OrganicSectionDecoration from '../components/decorations/OrganicSectionDecoration';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import ScrollToTopButton from '../components/floating/ScrollToTopButton';
import WhatsAppButton from '../components/floating/WhatsAppButton';
import ProductDetails from './ProductDetails';

export default function ProductPage({ product }) {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${product.name} | Polygon Resource`;

    return () => {
      document.title = previousTitle;
    };
  }, [product]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;900&family=Lora:wght@400;500;600;700&display=swap');
      `}</style>
      <div className="App font-['Barlow',sans-serif] text-[#666666] bg-cream w-full text-[16px] leading-[1.5]">
        <Navbar onGetInTouch={scrollToContact} isProductPage={Boolean(product.details)} />

        <main>
          {!product.details && (
            <section className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(135deg,#07140c_0%,#0e1813_35%,#1F4732_70%,#6BA539_100%)] pt-28 sm:pt-32 lg:pt-36">
              <HoneycombPattern color="#A9711F" opacity={0.08} size={50} />
              <OrganicSectionDecoration dark />

              <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 md:px-8 lg:px-10 lg:pb-28">
                <Link
                  to="/#products"
                  className="mb-8 inline-flex items-center gap-2 font-['Barlow',sans-serif] text-[0.7rem] uppercase tracking-[0.16em] text-white/70 transition-colors duration-300 hover:text-[#DD8F2A] sm:mb-12"
                >
                  &larr; Back to all products
                </Link>

                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <Reveal direction="right" distance={45} scale={0.97}>
                    <div className="relative overflow-hidden rounded-2xl border border-white/20 p-2 shadow-[0_25px_80px_rgba(0,0,0,0.3)]" style={{ background: product.bg }}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#f5f5f0]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07140c]/35 via-transparent to-white/10" />
                        <span className="absolute left-4 top-4 rounded-full bg-[#1F4732]/85 px-3 py-1 font-['Barlow',sans-serif] text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal direction="left" distance={45}>
                    <div className="text-white">
                      <p className="mb-3 flex items-center gap-3 font-['Barlow',sans-serif] text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#DD8F2A]">
                        <span className="h-px w-8 bg-[#DD8F2A]" />
                        Polygon Resource / {product.category}
                      </p>
                      <h1 className="font-['Lora',serif] text-[2.8rem] font-bold leading-[1.05] sm:text-[4rem] lg:text-[5rem]">
                        {product.name}
                      </h1>
                      <p className="mt-6 max-w-xl font-['Barlow',sans-serif] text-[1rem] leading-relaxed text-white/85 sm:text-[1.1rem]">
                        {product.desc}
                      </p>

                      <div className="mt-7 flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#DD8F2A]/35 bg-[#DD8F2A]/15 px-3 py-1.5 font-['Barlow',sans-serif] text-[0.62rem] uppercase tracking-[0.08em] text-[#f4c078]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={scrollToContact}
                        className="group mt-8 inline-flex items-center gap-2 rounded-[2px] bg-[#DD8F2A] px-5 py-3 font-['Barlow',sans-serif] text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#12301F] shadow-lg shadow-[#DD8F2A]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#f0a746]"
                      >
                        Discuss your requirements
                        <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                      </button>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          )}

          <ProductDetails product={product} details={product.details} onGetInTouch={scrollToContact} />

          <Reveal direction="up" distance={40}>
            <CTA onGetInTouch={scrollToContact} />
          </Reveal>
          <Reveal direction="up" distance={50}>
            <Contact />
          </Reveal>
        </main>

        <Footer />
        <WhatsAppButton />
        <ScrollToTopButton />
      </div>
    </>
  );
}
