import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from '../components/floating/ScrollToTopButton';
import WhatsAppButton from '../components/floating/WhatsAppButton';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Testimonials from '../components/sections/Testimonials';

export default function TestimonialsPage() {
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
          <Testimonials />
        </main>

        <Footer />
        <WhatsAppButton />
        <ScrollToTopButton />
      </div>
    </>
  );
}
