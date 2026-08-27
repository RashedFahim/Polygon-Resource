// Small decorative honeycomb used on inner sections. Unlike HoneycombPattern,
// this only occupies a small area on the left or right edge.
export default function EdgeHoneycombCluster({
  side = 'left',
  position = 'top',
  color = '#A9711F',
  fillColor = '#E8B33D',
  opacity = 0.55,
  className = '',
}) {
  const sideClass = side === 'right' ? '-right-7 sm:-right-5' : '-left-7 sm:-left-5';
  const positionClass = position === 'bottom'
    ? 'bottom-[7%] sm:bottom-[10%]'
    : 'top-[8%] sm:top-[12%]';

  const hexes = [
    { x: 46, y: 2, filled: true },
    { x: 18, y: 51, filled: false },
    { x: 74, y: 51, filled: true },
    { x: 46, y: 100, filled: false },
    { x: 102, y: 100, filled: true },
    { x: 18, y: 149, filled: false },
    { x: 74, y: 149, filled: true },
    { x: 46, y: 198, filled: true },
  ];

  const points = (x, y) => {
    return [
      [x + 11, y],
      [x + 33, y],
      [x + 44, y + 19],
      [x + 33, y + 38],
      [x + 11, y + 38],
      [x, y + 19],
    ].map(([px, py]) => `${px},${py}`).join(' ');
  };

  return (
    <div
      className={`pointer-events-none absolute z-[1] ${sideClass} ${positionClass} ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        className="w-[125px] sm:w-[150px] lg:w-[175px] h-auto"
        viewBox="0 0 155 242"
        fill="none"
      >
        {hexes.map((hex, index) => (
          <g key={index}>
            <polygon
              points={points(hex.x, hex.y)}
              fill={hex.filled ? fillColor : 'transparent'}
              fillOpacity={hex.filled ? 0.16 : 0}
              stroke={color}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {hex.filled && (
              <polygon
                points={points(hex.x + 5, hex.y + 4.5)}
                fill="none"
                stroke={color}
                strokeWidth="0.8"
                strokeOpacity="0.55"
                strokeLinejoin="round"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
