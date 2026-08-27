import { useInView } from '../../hooks/useInView';

// AnimatedText: splits a string into words and reveals them one by one
// (masked slide-up) as the text scrolls into view — the "modern site"
// headline animation, used on the big section titles throughout the page.
export default function AnimatedText({
  text,
  as: Tag = 'span',
  className = '',
  stagger = 35,
  delay = 0,
  duration = 650,
  once = true,
  threshold = 0.2,
}) {
  const [ref, inView] = useInView({ once, threshold, rootMargin: '0px 0px -5% 0px' });
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <span
            style={{
              display: 'inline-block',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0%)' : 'translateY(115%)',
              transition: `transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms, opacity ${Math.round(duration * 0.7)}ms ease ${delay + i * stagger}ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
