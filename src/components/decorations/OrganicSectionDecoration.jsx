export default function OrganicSectionDecoration({ dark = false, flip = false }) {
  const primary = dark ? '#6BA539' : '#1F7A31';
  const secondary = dark ? '#1F4732' : '#6BA539';
  const negative = dark ? '#F7F4EA' : '#FFFFFF';

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${flip ? 'scale-x-[-1]' : ''}`}
      aria-hidden="true"
    >
      <svg className="absolute -top-[7%] -right-[12%] w-[54%] sm:w-[44%] lg:w-[36%] h-auto opacity-[0.10]" viewBox="0 0 700 520" fill="none">
        <path d="M700 -10H435C515 87 560 190 572 305C580 385 557 454 518 520C632 410 697 239 700 -10Z" fill={primary} />
        <path d="M676 0H541C584 68 615 139 627 212C642 305 625 390 584 469C655 382 694 242 676 0Z" fill={secondary} fillOpacity="0.48" />
      </svg>

      <svg className="absolute top-[4%] -left-[18%] w-[62%] sm:w-[52%] lg:w-[43%] h-auto opacity-[0.09]" viewBox="0 0 760 430" fill="none">
        <path d="M-5 118C145 4 335 2 509 52C604 79 690 119 760 170C639 126 535 117 438 139C336 162 249 214 181 289C112 364 57 403 -5 430V118Z" fill={primary} />
        <path d="M75 115C215 44 367 48 511 88C586 109 653 140 710 178C588 143 482 148 387 185C294 220 219 280 157 356C128 391 102 415 75 430V115Z" fill={secondary} fillOpacity="0.35" />
      </svg>

      <svg className="absolute -bottom-[15%] -left-[10%] w-[38%] sm:w-[31%] lg:w-[27%] h-auto opacity-[0.09]" viewBox="0 0 460 360" fill="none">
        <path d="M0 360V208C95 108 205 52 330 35C374 29 418 29 460 34C331 82 233 153 166 247C130 297 101 333 73 360H0Z" fill={primary} />
      </svg>

      <svg className="absolute top-[12%] right-[4%] w-[34%] lg:w-[27%] h-auto opacity-[0.10] hidden md:block" viewBox="0 0 580 300" fill="none">
        <path d="M8 286C104 182 203 119 310 95C400 75 492 84 572 119C481 45 372 5 270 10C158 15 65 82 8 286Z" fill={negative} />
      </svg>

    </div>
  );
}
