import { EXPORT_COUNTRIES, COUNTRY_ROTATIONS } from '../../data/about';
import AnimatedText from '../animations/AnimatedText';
import { Reveal } from '../animations/Reveal';
import EdgeHoneycombCluster from '../decorations/EdgeHoneycombCluster';
import OrganicSectionDecoration from '../decorations/OrganicSectionDecoration';

export default function About() {
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
                  <AnimatedText text="Ten countries. One quality standard." />
                </h4>
              </div>
              <div className="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto">
                {EXPORT_COUNTRIES.map((country, i) => (
                  <div 
                    key={i} 
                    className="w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[75px] md:h-[75px] lg:w-[85px] lg:h-[85px] rounded-full border-2 border-[#1F4732] flex flex-col items-center justify-center text-center font-['Barlow',sans-serif] text-[#1F4732] hover:bg-[#1F4732] hover:text-white transition-all duration-300 text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] lg:text-[0.65rem] font-bold cursor-default" 
                    style={{ transform: `rotate(${COUNTRY_ROTATIONS[i]})` }}
                  >
                    {country}
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
