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
  size: number;
}

interface DataGlyphsProps {
  className?: string;
  density?: number;
  maxOpacity?: number;
}

export default function DataGlyphs({
  className = '',
  density = 40,
  maxOpacity = 0.06,
}: DataGlyphsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawnRef = useRef(false);

  const scatter = useCallback((width: number, height: number): Glyph[] => {
    return Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      opacity: (0.25 + Math.random() * 0.75) * maxOpacity,
      size: 10 + Math.random() * 4,
    }));
  }, [density, maxOpacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || drawnRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const glyphs = scatter(rect.width, rect.height);

    glyphs.forEach((g) => {
      ctx.font = '300 ' + g.size + 'px "DM Mono", monospace';
      ctx.fillStyle = 'rgba(183, 183, 176, ' + g.opacity + ')';
      ctx.fillText(g.char, g.x, g.y);
    });

    drawnRef.current = true;

    const handleResize = () => {
      const r = canvas.parentElement?.getBoundingClientRect();
      if (!r) return;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = r.width * d;
      canvas.height = r.height * d;
      canvas.style.width = r.width + 'px';
      canvas.style.height = r.height + 'px';
      ctx.setTransform(d, 0, 0, d, 0, 0);

      const fresh = scatter(r.width, r.height);
      ctx.clearRect(0, 0, r.width, r.height);
      fresh.forEach((g) => {
        ctx.font = '300 ' + g.size + 'px "DM Mono", monospace';
        ctx.fillStyle = 'rgba(183, 183, 176, ' + g.opacity + ')';
        ctx.fillText(g.char, g.x, g.y);
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [scatter]);

  return (
    <canvas
      ref={canvasRef}
      className={'absolute inset-0 pointer-events-none ' + className}
      aria-hidden="true"
    />
  );
}
