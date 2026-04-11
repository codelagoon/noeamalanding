'use client';

import { useEffect, useRef, useCallback } from 'react';

const GLYPHS = [
  '\u03C3', '\u03BC', '\u03A3', '\u0394', '\u03BB', '\u03B8', '\u03B1', '\u03B2', '\u03B3', '\u03B5',
  '\u2202', '\u222B', '\u2248', '\u2260', '\u2208', '\u2282', '\u2200', '\u2203', '\u221D', '\u221E',
  'p<.05', 'r\u00B2', 'AUC', 'ROC', 'FPR', 'TPR',
  '0.82', '0.91', '0.74', '0.65', '0.97',
  'ECOA', 'DPD', 'EOD', 'SPD',
  '||', '::', '{}', '[]', '//', '>>',
];

interface Glyph {
  x: number;
  y: number;
  char: string;
  opacity: number;
  targetOpacity: number;
  speed: number;
  size: number;
  drift: number;
  phase: number;
  lifetime: number;
  age: number;
}

interface DataGlyphsProps {
  className?: string;
  density?: number;
  maxOpacity?: number;
}

export default function DataGlyphs({
  className = '',
  density = 40,
  maxOpacity = 0.07,
}: DataGlyphsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glyphsRef = useRef<Glyph[]>([]);
  const frameRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  const createGlyph = useCallback((width: number, height: number, startRandom = true): Glyph => {
    const lifetime = 600 + Math.random() * 1200;
    return {
      x: Math.random() * width,
      y: startRandom ? Math.random() * height : height + 20,
      char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      opacity: 0,
      targetOpacity: (0.3 + Math.random() * 0.7) * maxOpacity,
      speed: 0.08 + Math.random() * 0.15,
      size: 10 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
      lifetime,
      age: startRandom ? Math.random() * lifetime : 0,
    };
  }, [maxOpacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mq.addEventListener('change', handleMotionChange);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getDpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const dpr = getDpr();
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const displayWidth = () => canvas.width / getDpr();
    const displayHeight = () => canvas.height / getDpr();

    glyphsRef.current = Array.from({ length: density }, () =>
      createGlyph(displayWidth(), displayHeight(), true)
    );

    let lastTime = 0;

    const render = (time: number) => {
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      const w = displayWidth();
      const h = displayHeight();

      ctx.clearRect(0, 0, w, h);

      if (reducedMotion.current) {
        glyphsRef.current.forEach((g) => {
          ctx.font = '300 ' + g.size + 'px "DM Mono", monospace';
          ctx.fillStyle = 'rgba(183, 183, 176, ' + (g.targetOpacity * 0.5) + ')';
          ctx.fillText(g.char, g.x, g.y);
        });
        frameRef.current = requestAnimationFrame(render);
        return;
      }

      const dt = delta / 16.67;

      glyphsRef.current.forEach((g) => {
        g.age += dt;

        const lifeProgress = g.age / g.lifetime;
        if (lifeProgress < 0.15) {
          g.opacity = (lifeProgress / 0.15) * g.targetOpacity;
        } else if (lifeProgress > 0.8) {
          g.opacity = ((1 - lifeProgress) / 0.2) * g.targetOpacity;
        } else {
          g.opacity = g.targetOpacity;
        }

        g.y -= g.speed * dt;
        g.x += Math.sin(g.phase + g.age * 0.005) * g.drift * dt;

        ctx.font = '300 ' + g.size + 'px "DM Mono", monospace';
        ctx.fillStyle = 'rgba(183, 183, 176, ' + Math.max(0, g.opacity) + ')';
        ctx.fillText(g.char, g.x, g.y);
      });

      glyphsRef.current = glyphsRef.current.filter((g) => {
        return g.age < g.lifetime && g.y > -30;
      });

      while (glyphsRef.current.length < density) {
        glyphsRef.current.push(createGlyph(w, h, false));
      }

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      mq.removeEventListener('change', handleMotionChange);
    };
  }, [density, createGlyph]);

  return (
    <canvas
      ref={canvasRef}
      className={'absolute inset-0 pointer-events-none ' + className}
      aria-hidden="true"
    />
  );
}
