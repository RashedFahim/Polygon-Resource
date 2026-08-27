import { BadgeCheck, Clock, Eye, Quote, ShieldCheck, Target, Users } from 'lucide-react';
import { CORE_VALUES } from '../../data/about';
import AnimatedText from '../animations/AnimatedText';
import { Reveal } from '../animations/Reveal';
import EdgeHoneycombCluster from '../decorations/EdgeHoneycombCluster';
import OrganicSectionDecoration from '../decorations/OrganicSectionDecoration';

export default function OurPurpose() {
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
              {CORE_VALUES.map((value, index) => {
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
