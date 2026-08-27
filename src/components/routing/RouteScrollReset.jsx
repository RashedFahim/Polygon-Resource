import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteScrollReset() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
}
