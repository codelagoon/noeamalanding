'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

interface Marker {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  parallaxFactor: number;
  floatAnim: 'a' | 'b' | 'c' | 'd';
  fadeAnim: 'fade-in-out-a' | 'fade-in-out-b' | 'fade-in-out-c';
}

const MARKERS: Marker[] = [
  { id: 0, x: 8, y: 12, size: 4, opacity: 0.25, duration: 28, delay: 0.0, parallaxFactor: 0.45, floatAnim: 'a', fadeAnim: 'fade-in-out-a' },
  { id: 1, x: 83, y: 9, size: 5, opacity: 0.20, duration: 35, delay: 2.5, parallaxFactor: 0.70, floatAnim: 'b', fadeAnim: 'fade-in-out-b' },
  { id: 2, x: 73, y: 20, size: 3, opacity: 0.22, duration: 32, delay: 1.0, parallaxFactor: 0.55, floatAnim: 'c', fadeAnim: 'fade-in-out-c' },
  { id: 3, x: 91, y: 31, size: 4, opacity: 0.18, duration: 40, delay: 5.0, parallaxFactor: 0.85, floatAnim: 'd', fadeAnim: 'fade-in-out-a' },
  { id: 4, x: 67, y: 43, size: 3, opacity: 0.24, duration: 26, delay: 3.0, parallaxFactor: 0.40, floatAnim: 'a', fadeAnim: 'fade-in-out-b' },
  { id: 5, x: 87, y: 54, size: 5, opacity: 0.19, duration: 38, delay: 7.0, parallaxFactor: 0.90, floatAnim: 'b', fadeAnim: 'fade-in-out-c' },
  { id: 6, x: 12, y: 67, size: 4, opacity: 0.21, duration: 31, delay: 4.0, parallaxFactor: 0.60, floatAnim: 'c', fadeAnim: 'fade-in-out-a' },
  { id: 7, x: 76, y: 75, size: 3, opacity: 0.23, duration: 27, delay: 1.5, parallaxFactor: 0.50, floatAnim: 'd', fadeAnim: 'fade-in-out-b' },
  { id: 8, x: 59, y: 85, size: 4, opacity: 0.20, duration: 36, delay: 6.0, parallaxFactor: 0.75, floatAnim: 'a', fadeAnim: 'fade-in-out-c' },
];

const KEYFRAMES = `
  @keyframes marker-float-a { 
    0% { transform: translate(0, 0); }
    100% { transform: translate(8px, -12px); }
  }
  @keyframes marker-float-b { 
    0% { transform: translate(0, 0); }
    100% { transform: translate(-8px, 12px); }
  }
  @keyframes marker-float-c { 
    0% { transform: translate(0, 0); }
    100% { transform: translate(8px, 12px); }
  }
  @keyframes marker-float-d { 
    0% { transform: translate(0, 0); }
    100% { transform: translate(-8px, -12px); }
  }
  
  @keyframes fade-in-out-a {
    0% { opacity: 0; }
    20% { opacity: 0.25; }
    50% { opacity: 0.25; }
    80% { opacity: 0; }
    100% { opacity: 0; }
  }
  @keyframes fade-in-out-b {
    0% { opacity: 0; }
    25% { opacity: 0; }
    45% { opacity: 0.25; }
    75% { opacity: 0.25; }
    95% { opacity: 0; }
    100% { opacity: 0; }
  }
  @keyframes fade-in-out-c {
    0% { opacity: 0; }
    30% { opacity: 0; }
    50% { opacity: 0.25; }
    70% { opacity: 0.25; }
    90% { opacity: 0; }
    100% { opacity: 0; }
  }
`;

export default function AmbientDataMarkers() {
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rmRef = useRef(false);
  const ticking = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    rmRef.current = mq.matches;
    setReducedMotion(mq.matches);

    const onPref = (e: MediaQueryListEvent) => {
      rmRef.current = e.matches;
      setReducedMotion(e.matches);
    };

    const onScroll = () => {
      if (rmRef.current || ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking.current = false;
      });
    };

    mq.addEventListener('change', onPref);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      mq.removeEventListener('change', onPref);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {MARKERS.map((m) => {
        const parallaxShift = reducedMotion ? 0 : -(scrollY * m.parallaxFactor * 0.04);
        return (
          <div
            key={m.id}
            className="absolute"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              transform: `translate3d(0,${parallaxShift}px,0)`,
              willChange: reducedMotion ? 'auto' : 'transform',
            }}
          >
            <div
              style={{
                width: `${m.size}px`,
                height: `${m.size}px`,
                backgroundColor: '#8BA7FF',
                animation: reducedMotion
                  ? 'none'
                  : `marker-float-${m.floatAnim} ${m.duration}s ease-in-out ${m.delay}s infinite alternate, fade-in-out-${m.fadeAnim} ${m.duration * 1.5}s ease-in-out ${m.delay}s infinite`,
              } as CSSProperties}
            />
          </div>
        );
      })}
    </div>
  );
}
