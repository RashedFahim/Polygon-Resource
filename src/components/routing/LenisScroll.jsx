import { Lenis as ReactLenis } from 'lenis/react';

export default function LenisScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        autoToggle: true,
        lerp: 0.15,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
