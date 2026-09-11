import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

export default function RouteScrollReset() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;

      if (lenis) {
        lenis.scrollTo(target || 0, { immediate: !target });
      } else if (target) {
        target.scrollIntoView({ behavior: 'auto' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname, hash, lenis]);

  return null;
}
