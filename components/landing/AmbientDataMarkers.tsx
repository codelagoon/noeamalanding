'use client';

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
}

function generateMarkers(): Marker[] {
  const cols = 4;
  const rows = 3;
  const cellW = 100 / cols;
  const cellH = 100 / rows;

  const cells: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push([c, r]);
    }
  }

  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  const count = 8 + Math.floor(Math.random() * 4);
  const selected = cells.slice(0, count);

  return selected.map(([col, row], i) => {
    const isSquare = Math.random() > 0.55;
    const pad = 3;
    const angle = Math.random() * Math.PI * 2;
    const mag = 3 + Math.random() * 5;

    return {
      id: i,
      x: col * cellW + pad + Math.random() * (cellW - pad * 2),
      y: row * cellH + pad + Math.random() * (cellH - pad * 2),
      w: isSquare ? 4 + Math.random() * 5 : 10 + Math.random() * 16,
      h: isSquare ? 4 + Math.random() * 5 : 3 + Math.random() * 4,
      opacity: 0.02 + Math.random() * 0.04,
      duration: 22 + Math.random() * 18,
      delay: Math.random() * 10,
      dx: Math.cos(angle) * mag,
      dy: Math.sin(angle) * mag,
      parallaxRate: 0.015 + Math.random() * 0.035,
    };
  });
}

const KEYFRAMES = '@keyframes ambient-drift{0%{transform:translate(0,0)}100%{transform:translate(var(--dx),var(--dy))}}';

export default function AmbientDataMarkers() {
  const [markers] = useState(generateMarkers);
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
    mq.addEventListener('change', onPrefChange);

    const onScroll = () => {
      if (reducedMotionRef.current || ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrollOffset(window.scrollY);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', onPrefChange);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {markers.map((m) => (
        <div
          key={m.id}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            transform: `translateY(${isReducedMotion ? 0 : -(scrollOffset * m.parallaxRate)}px)`,
            willChange: isReducedMotion ? 'auto' : 'transform',
          }}
        >
          <div
            style={{
              width: `${m.w}px`,
              height: `${m.h}px`,
              opacity: m.opacity,
              backgroundColor: '#B7B7B0',
              '--dx': `${m.dx}px`,
              '--dy': `${m.dy}px`,
              animation: isReducedMotion
                ? 'none'
                : `ambient-drift ${m.duration}s ease-in-out ${m.delay}s infinite alternate`,
            } as React.CSSProperties}
          />
        </div>
      ))}
    </div>
  );
}
