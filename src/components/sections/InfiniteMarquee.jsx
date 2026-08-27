export default function InfiniteMarquee({ children, edgeColor }) {
  const leftFadeStyle = {
    background: `linear-gradient(to right, ${edgeColor}, transparent)`,
  };
  const rightFadeStyle = {
    background: `linear-gradient(to left, ${edgeColor}, transparent)`,
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 sm:w-20 lg:w-28"
        style={leftFadeStyle}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 sm:w-20 lg:w-28"
        style={rightFadeStyle}
      />

      <div className="infinite-marquee-track flex w-max items-center will-change-transform">
        {[0, 1, 2, 3].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy > 0 ? 'true' : undefined}
          >
            {children(copy)}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes infiniteMarqueeScroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-25%, 0, 0);
          }
        }

        .infinite-marquee-track {
          animation: infiniteMarqueeScroll 32s linear infinite;
        }

        @media (max-width: 640px) {
          .infinite-marquee-track {
            animation-duration: 24s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .infinite-marquee-track {
            animation-duration: 70s;
          }
        }
      `}</style>
    </div>
  );
}
