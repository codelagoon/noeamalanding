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

// Clustered around the hero headline area, creating a constellation effect
const MARKERS: Marker[] = [
  // Left cluster
  { id: 0, x: 5, y: 20, size: 3, opacity: 0.30, duration: 28, delay: 0.0, parallaxFactor: 0.45, floatAnim: 'a', fadeAnim: 'fade-in-out-a' },
  { id: 1, x: 8, y: 24, size: 2, opacity: 0.25, duration: 35, delay: 0.8, parallaxFactor: 0.70, floatAnim: 'b', fadeAnim: 'fade-in-out-b' },
  { id: 2, x: 3, y: 28, size: 3, opacity: 0.28, duration: 32, delay: 1.5, parallaxFactor: 0.55, floatAnim: 'c', fadeAnim: 'fade-in-out-c' },
  { id: 3, x: 10, y: 26, size: 2, opacity: 0.22, duration: 40, delay: 2.2, parallaxFactor: 0.85, floatAnim: 'd', fadeAnim: 'fade-in-out-a' },
  
  // Top center cluster
  { id: 4, x: 45, y: 8, size: 2, opacity: 0.26, duration: 26, delay: 0.5, parallaxFactor: 0.40, floatAnim: 'a', fadeAnim: 'fade-in-out-b' },
  { id: 5, x: 48, y: 12, size: 3, opacity: 0.24, duration: 38, delay: 1.2, parallaxFactor: 0.90, floatAnim: 'b', fadeAnim: 'fade-in-out-c' },
  { id: 6, x: 42, y: 10, size: 2, opacity: 0.27, duration: 31, delay: 0.3, parallaxFactor: 0.60, floatAnim: 'c', fadeAnim: 'fade-in-out-a' },
  { id: 7, x: 50, y: 15, size: 2, opacity: 0.23, duration: 27, delay: 1.8, parallaxFactor: 0.50, floatAnim: 'd', fadeAnim: 'fade-in-out-b' },
  
  // Right cluster
  { id: 8, x: 88, y: 18, size: 3, opacity: 0.29, duration: 36, delay: 1.0, parallaxFactor: 0.75, floatAnim: 'a', fadeAnim: 'fade-in-out-c' },
  { id: 9, x: 92, y: 22, size: 2, opacity: 0.24, duration: 34, delay: 2.5, parallaxFactor: 0.65, floatAnim: 'b', fadeAnim: 'fade-in-out-a' },
  { id: 10, x: 85, y: 25, size: 2, opacity: 0.26, duration: 29, delay: 0.7, parallaxFactor: 0.55, floatAnim: 'c', fadeAnim: 'fade-in-out-b' },
  { id: 11, x: 90, y: 28, size: 3, opacity: 0.25, duration: 39, delay: 2.0, parallaxFactor: 0.80, floatAnim: 'd', fadeAnim: 'fade-in-out-c' },
  
  // Bottom left accent
  { id: 12, x: 12, y: 35, size: 2, opacity: 0.20, duration: 33, delay: 1.3, parallaxFactor: 0.50, floatAnim: 'a', fadeAnim: 'fade-in-out-a' },
  { id: 13, x: 15, y: 38, size: 2, opacity: 0.22, duration: 37, delay: 2.8, parallaxFactor: 0.70, floatAnim: 'b', fadeAnim: 'fade-in-out-b' },
];

const KEYFRAMES = `
  @keyframes marker-float-a { 
    0% { transform: translate(0, 0); }
    100% { transform: translate(6px, -10px); }
  }
  @keyframes marker-float-b { 
    0% { transform: translate(0, 0); }
    100% { transform: translate(-6px, 10px); }
  }
  @keyframes marker-float-c { 
    0% { transform: translate(0, 0); }
    100% { transform: translate(6px, 10px); }
  }
  @keyframes marker-float-d { 
    0% { transform: translate(0, 0); }
    100% { transform: translate(-6px, -10px); }
  }
  
  @keyframes fade-in-out-a {
    0% { opacity: 0; }
    15% { opacity: 0.3; }
    50% { opacity: 0.3; }
    85% { opacity: 0; }
    100% { opacity: 0; }
  }
  @keyframes fade-in-out-b {
    0% { opacity: 0; }
    25% { opacity: 0; }
    40% { opacity: 0.3; }
    75% { opacity: 0.3; }
    95% { opacity: 0; }
    100% { opacity: 0; }
  }
  @keyframes fade-in-out-c {
    0% { opacity: 0; }
    35% { opacity: 0; }
    50% { opacity: 0.3; }
    70% { opacity: 0.3; }
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
                backgroundColor: '#6B8E7F',
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
