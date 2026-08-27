export default function HoneycombPattern({ color = '#1F4732', opacity = 0.06, size = 40, className = '' }) {
  const hexWidth = size;
  const hexHeight = size * 1.732; // sqrt(3) * size
  
  // Generate a honeycomb pattern using SVG
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={`honeycomb-${color.replace('#', '')}`}
            patternUnits="userSpaceOnUse"
            width={hexWidth * 3}
            height={hexHeight}
            patternTransform="scale(0.8)"
          >
            {/* Hexagon shape */}
            <path
              d={`
                M ${hexWidth * 0.5} 0
                L ${hexWidth * 1.5} 0
                L ${hexWidth * 2} ${hexHeight * 0.5}
                L ${hexWidth * 1.5} ${hexHeight}
                L ${hexWidth * 0.5} ${hexHeight}
                L 0 ${hexHeight * 0.5}
                Z
              `}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Second hexagon offset */}
            <path
              d={`
                M ${hexWidth * 2} ${hexHeight * 0.5}
                L ${hexWidth * 3} 0
                L ${hexWidth * 4} 0
                L ${hexWidth * 4.5} ${hexHeight * 0.5}
                L ${hexWidth * 4} ${hexHeight}
                L ${hexWidth * 3} ${hexHeight}
                Z
              `}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Offset hexagons for honeycomb pattern */}
            <path
              d={`
                M ${hexWidth * 0.5} ${hexHeight}
                L ${hexWidth * 1.5} ${hexHeight}
                L ${hexWidth * 2} ${hexHeight * 1.5}
                L ${hexWidth * 1.5} ${hexHeight * 2}
                L ${hexWidth * 0.5} ${hexHeight * 2}
                L 0 ${hexHeight * 1.5}
                Z
              `}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d={`
                M ${hexWidth * 2.5} ${hexHeight * 0.5}
                L ${hexWidth * 3.5} ${hexHeight * 0.5}
                L ${hexWidth * 4} ${hexHeight}
                L ${hexWidth * 3.5} ${hexHeight * 1.5}
                L ${hexWidth * 2.5} ${hexHeight * 1.5}
                L ${hexWidth * 2} ${hexHeight}
                Z
              `}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#honeycomb-${color.replace('#', '')})`} />
      </svg>
    </div>
  );
}
