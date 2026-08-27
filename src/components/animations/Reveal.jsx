import { useInView } from '../../hooks/useInView';

// Reveal: generic wrapper that fades/slides/scales its children into view as
// the user scrolls to them. Drop it around any section or element.
//   direction: 'up' | 'down' | 'left' | 'right' | 'none'
//   distance: px to travel from
//   delay: ms stagger delay
//   duration: ms transition duration
//   scale: starting scale (1 = no scale effect)
export function Reveal({
  children,
  direction = 'up',
  distance = 40,
  delay = 0,
  duration = 700,
  scale = 1,
  once = true,
  as: Tag = 'div',
  className = '',
  id,
  style = {},
}) {
  const [ref, inView] = useInView({ once });

  const offsets = {
    up: `translate3d(0, ${distance}px, 0)`,
    down: `translate3d(0, -${distance}px, 0)`,
    left: `translate3d(${distance}px, 0, 0)`,
    right: `translate3d(-${distance}px, 0, 0)`,
    none: 'translate3d(0, 0, 0)',
  };

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0) scale(1)' : `${offsets[direction]} scale(${scale})`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// Staggers reveal children with an increasing delay, so lists/grids cascade
// into view item-by-item instead of popping in all at once.
export function StaggerGroup({ children, step = 90, ...revealProps }) {
  const items = Array.isArray(children) ? children : [children];
  return items.map((child, index) => (
    <Reveal key={index} delay={index * step} {...revealProps}>
      {child}
    </Reveal>
  ));
}
