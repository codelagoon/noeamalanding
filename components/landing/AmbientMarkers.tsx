'use client';

import { useEffect, useRef, useState } from 'react';

interface Marker {
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
  speed: number;
  parallax: number;
  delay: number;
}

function seed(count: number): Marker[] {
  return Array.from({ length: count }, () => {
    const isSquare = Math.random() > 0.5;
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      w: isSquare ? 4 + Math.random() * 6 : 8 + Math.random() * 20,
      h: isSquare ? 4 + Math.random() * 6 : 3 + Math.random() * 5,
      opacity: 0.025 + Math.random() * 0.035,
      speed: 0.15 + Math.random() * 0.25,
      parallax: 0.3 + Math.random() * 0.7,
      delay: Math.random() * 6,
    };
  });
}

export default function AmbientMarkers() {
  const [markers] = useState(() => seed(9));
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const [offset, setOffset] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => { reducedMotion.current = e.matches; };
    mq.addEventListener('change', onChange);

    let ticking = false;
    const onScroll = () => {
      scrollY.current = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (!reducedMotion.current) {
            setOffset(scrollY.current);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {markers.map((m, i) => {
        const drift = reducedMotion.current ? 0 : offset * m.parallax * 0.04;

        return (
          <div
            key={i}
            className="absolute rounded-sm"
            style={{
              left: m.x + '%',
              top: m.y + '%',
              width: m.w + 'px',
              height: m.h + 'px',
              opacity: m.opacity,
              backgroundColor: '#B7B7B0',
              transform: 'translateY(' + (-drift) + 'px)',
              willChange: 'transform',
              animation: reducedMotion.current
                ? 'none'
                : 'marker-float ' + (20 + m.speed * 30) + 's ease-in-out ' + m.delay + 's infinite alternate',
            }}
          />
        );
      })}

      <style jsx>{`
        @keyframes marker-float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          100% {
            transform: translateY(-18px) translateX(6px);
          }
        }
      `}</style>
    </div>
  );
}
