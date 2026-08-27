import { useState } from 'react';
import { ChevronDown, Mail } from 'lucide-react';
import { COUNTRY_CODES, CONTACT_ITEMS } from '../../data/contact';
import AnimatedText from '../animations/AnimatedText';
import { Reveal } from '../animations/Reveal';
import EdgeHoneycombCluster from '../decorations/EdgeHoneycombCluster';
import OrganicSectionDecoration from '../decorations/OrganicSectionDecoration';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [phoneCode, setPhoneCode] = useState("+880");
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  const countryCodes = COUNTRY_CODES;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions while the current request is in flight.
    if (isSubmitting) return;

    setSubmitError("");
    setIsSubmitted(false);
    setIsSubmitting(true);

    const selectedCountry = countryCodes.find((country) => country.code === phoneCode);
    const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          phoneCode,
          country: selectedCountry?.name || "Unknown",
          message: formData.message.trim(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "We couldn't send your inquiry. Please try again.");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setPhoneCode("+880");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      setSubmitError(error.message || "We couldn't send your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = CONTACT_ITEMS;

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

                  {/* Submission feedback */}
                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-['Barlow',sans-serif] text-sm text-red-700"
                    >
                      {submitError}
                    </div>
                  )}

                  {isSubmitted && (
                    <div
                      role="status"
                      className="rounded-lg border border-[#6BA539]/30 bg-[#edf7e8] px-4 py-3 font-['Barlow',sans-serif] text-sm text-[#1F4732]"
                    >
                      Thank you. Your trade inquiry has been sent successfully.
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
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
                      disabled:cursor-not-allowed
                      disabled:opacity-70
                      disabled:hover:shadow-none
                      group
                    "
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="h-5 w-5 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="currentColor"
                              strokeWidth="3"
                            />
                            <path
                              className="opacity-90"
                              fill="currentColor"
                              d="M21 12a9 9 0 0 0-9-9v3a6 6 0 0 1 6 6h3Z"
                            />
                          </svg>
                          SENDING INQUIRY...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <svg
                            className="w-5 h-5"
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
                          MESSAGE SENT!
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
