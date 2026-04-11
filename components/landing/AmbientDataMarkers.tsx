'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

interface Marker {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
  duration: number;
  delay: number;
  parallaxFactor: number;
  anim: 'a' | 'b' | 'c' | 'd';
}

const MARKERS: Marker[] = [
  { id: 0, x:  8,  y: 12, w:  6, h:  6, opacity: 0.040, duration: 22, delay: 0.0, parallaxFactor: 0.45, anim: 'a' },
  { id: 1, x: 83,  y:  9, w: 22, h:  4, opacity: 0.030, duration: 35, delay: 2.5, parallaxFactor: 0.70, anim: 'b' },
  { id: 2, x: 73,  y: 20, w:  8, h:  8, opacity: 0.050, duration: 28, delay: 1.0, parallaxFactor: 0.55, anim: 'c' },
  { id: 3, x: 91,  y: 31, w: 16, h:  3, opacity: 0.030, duration: 40, delay: 5.0, parallaxFactor: 0.85, anim: 'd' },
  { id: 4, x: 67,  y: 43, w:  5, h:  5, opacity: 0.040, duration: 25, delay: 3.0, parallaxFactor: 0.40, anim: 'a' },
  { id: 5, x: 87,  y: 54, w: 26, h:  4, opacity: 0.025, duration: 38, delay: 7.0, parallaxFactor: 0.90, anim: 'b' },
  { id: 6, x: 12,  y: 67, w: 10, h:  4, opacity: 0.035, duration: 31, delay: 4.0, parallaxFactor: 0.60, anim: 'c' },
  { id: 7, x: 76,  y: 75, w:  7, h:  7, opacity: 0.050, duration: 24, delay: 1.5, parallaxFactor: 0.50, anim: 'd' },
  { id: 8, x: 59,  y: 85, w: 18, h:  3, opacity: 0.030, duration: 36, delay: 6.0, parallaxFactor: 0.75, anim: 'a' },
];

const KEYFRAMES = `
  @keyframes marker-float-a { 0%{transform:translate(0,0)} 100%{transform:translate(6px,-18px)} }
  @keyframes marker-float-b { 0%{transform:translate(0,0)} 100%{transform:translate(-6px,18px)} }
  @keyframes marker-float-c { 0%{transform:translate(0,0)} 100%{transform:translate(6px,18px)} }
  @keyframes marker-float-d { 0%{transform:translate(0,0)} 100%{transform:translate(-6px,-18px)} }
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
                width: `${m.w}px`,
                height: `${m.h}px`,
                opacity: m.opacity,
                backgroundColor: '#B7B7B0',
                animation: reducedMotion
                  ? 'none'
                  : `marker-float-${m.anim} ${m.duration}s ease-in-out ${m.delay}s infinite alternate`,
              } as CSSProperties}
            />
          </div>
        );
      })}
    </div>
  );
}
