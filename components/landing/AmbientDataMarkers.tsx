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
  dx: number;
  dy: number;
  parallaxRate: number;
  hideOnMobile?: boolean;
}

const MARKERS: Marker[] = [
  { id: 0, x: 78, y: 8,  w: 20, h: 4,  opacity: 0.75, duration: 28, delay: 0,   dx: -5,  dy:  14, parallaxRate: 0.018 },
  { id: 1, x: 89, y: 16, w:  7, h:  7, opacity: 0.75, duration: 36, delay: 4,   dx:  4,  dy: -16, parallaxRate: 0.014 },
  { id: 2, x: 71, y: 23, w:  6, h:  6, opacity: 0.75, duration: 30, delay: 1.5, dx: -3,  dy:  13, parallaxRate: 0.022 },
  { id: 3, x: 87, y: 32, w: 24, h:  4, opacity: 0.75, duration: 34, delay: 6,   dx:  6,  dy: -15, parallaxRate: 0.016 },
  { id: 4, x: 93, y: 44, w: 13, h:  4, opacity: 0.75, duration: 24, delay: 2.5, dx: -2,  dy:  12, parallaxRate: 0.012, hideOnMobile: true },
  { id: 5, x: 82, y: 54, w:  8, h:  8, opacity: 0.75, duration: 38, delay: 5,   dx:  4,  dy: -17, parallaxRate: 0.019 },
  { id: 6, x: 15, y: 72, w:  6, h:  6, opacity: 0.75, duration: 32, delay: 2,   dx: -3,  dy:  15, parallaxRate: 0.015, hideOnMobile: true },
  { id: 7, x: 62, y: 77, w: 16, h:  5, opacity: 0.75, duration: 27, delay: 7,   dx:  5,  dy:  13, parallaxRate: 0.020 },
  { id: 8, x: 81, y: 65, w:  7, h:  7, opacity: 0.75, duration: 35, delay: 1,   dx:  3,  dy: -14, parallaxRate: 0.013 },
  { id: 9, x: 91, y: 84, w: 18, h:  4, opacity: 0.75, duration: 40, delay: 0.5, dx: -5,  dy:  17, parallaxRate: 0.017 },
];

const KEYFRAMES =
  '@keyframes ambient-drift{0%{transform:translate(0,0)}100%{transform:translate(var(--dx),var(--dy))}}';

export default function AmbientDataMarkers() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const reducedMotionRef = useRef(false);
  const ticking = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    setIsReducedMotion(mq.matches);

    const onPrefChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      setIsReducedMotion(e.matches);
    };

    const onScroll = () => {
      if (reducedMotionRef.current || ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrollOffset(window.scrollY);
        ticking.current = false;
      });
    };

    mq.addEventListener('change', onPrefChange);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      mq.removeEventListener('change', onPrefChange);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {MARKERS.map((marker) => (
        <div
          key={marker.id}
          className={marker.hideOnMobile ? 'absolute hidden sm:block' : 'absolute'}
          style={{
            left: `${marker.x}%`,
            top: `${marker.y}%`,
            transform: `translate3d(0,${isReducedMotion ? 0 : -(scrollOffset * marker.parallaxRate)}px,0)`,
            willChange: isReducedMotion ? 'auto' : 'transform',
          }}
        >
          <div
            style={{
              width: `${marker.w}px`,
              height: `${marker.h}px`,
              opacity: marker.opacity,
              backgroundColor: '#C8C8C0',
              '--dx': `${marker.dx}px`,
              '--dy': `${marker.dy}px`,
              animation: isReducedMotion
                ? 'none'
                : `ambient-drift ${marker.duration}s ease-in-out ${marker.delay}s infinite alternate`,
            } as CSSProperties}
          />
        </div>
      ))}
    </div>
  );
}
