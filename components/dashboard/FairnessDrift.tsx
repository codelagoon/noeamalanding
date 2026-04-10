'use client';

interface DataPoint { quarter: string; dir: number; }

interface FairnessDriftProps {
  data?: DataPoint[];
  threshold?: number;
}

const defaultData: DataPoint[] = [
  { quarter: 'Q1', dir: 0.91 },
  { quarter: 'Q2', dir: 0.89 },
  { quarter: 'Q3', dir: 0.87 },
  { quarter: 'Q4', dir: 0.85 },
  { quarter: 'Q5', dir: 0.83 },
  { quarter: 'Q6', dir: 0.81 },
  { quarter: 'Q7', dir: 0.80 },
  { quarter: 'Q8', dir: 0.77 },
];

export default function FairnessDrift({ data = defaultData, threshold = 0.8 }: FairnessDriftProps) {
  const W = 560; const H = 180;
  const padL = 36; const padR = 20; const padT = 16; const padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const minY = Math.min(...data.map((d) => d.dir)) - 0.03;
  const maxY = Math.max(...data.map((d) => d.dir)) + 0.03;

  const toX = (i: number) => padL + (i / (data.length - 1)) * chartW;
  const toY = (v: number) => padT + ((maxY - v) / (maxY - minY)) * chartH;

  const linePoints = data.map((d, i) => `${toX(i)},${toY(d.dir)}`).join(' ');
  const thresholdY = toY(threshold);
  const breachIdx = data.findIndex((d) => d.dir < threshold);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Fairness Drift — DIR over Time
        </p>
        {breachIdx >= 0 && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50 border border-red-200 rounded">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] text-red-600 font-semibold">
              Four-fifths rule breach at {data[breachIdx].quarter}
            </span>
          </div>
        )}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* grid lines */}
        {[0.78, 0.82, 0.86, 0.90].map((v) => (
          <g key={v}>
            <line x1={padL} y1={toY(v)} x2={W - padR} y2={toY(v)} stroke="#e5e7eb" strokeWidth="1" />
            <text x={padL - 4} y={toY(v) + 3} fill="#9ca3af" fontSize="8" fontFamily="monospace" textAnchor="end">{v.toFixed(2)}</text>
          </g>
        ))}

        {/* threshold line */}
        <line x1={padL} y1={thresholdY} x2={W - padR} y2={thresholdY} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,4" />
        <text x={W - padR + 2} y={thresholdY + 4} fill="#ef4444" fontSize="8" fontFamily="monospace">0.80</text>

        {/* breach zone fill */}
        {breachIdx >= 0 && (
          <rect
            x={toX(breachIdx - 0.5)}
            y={thresholdY}
            width={W - padR - toX(breachIdx - 0.5)}
            height={H - padB - thresholdY}
            fill="#ef4444"
            fillOpacity="0.06"
          />
        )}

        {/* area fill under line */}
        <defs>
          <linearGradient id="drift-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A7C6F" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#4A7C6F" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <polygon
          points={`${padL},${H - padB} ${linePoints} ${W - padR},${H - padB}`}
          fill="url(#drift-grad)"
        />

        {/* main line */}
        <polyline
          points={linePoints}
          fill="none"
          stroke="#4A7C6F"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* dots */}
        {data.map((d, i) => {
          const breached = d.dir < threshold;
          return (
            <g key={d.quarter}>
              <circle
                cx={toX(i)} cy={toY(d.dir)} r={breached ? 5 : 4}
                fill={breached ? '#ef4444' : '#4A7C6F'}
                stroke={breached ? '#fca5a5' : '#ffffff'}
                strokeWidth="1.5"
              />
              <text x={toX(i)} y={H - padB + 14} fill="#9ca3af" fontSize="8" fontFamily="monospace" textAnchor="middle">{d.quarter}</text>
            </g>
          );
        })}
      </svg>

      <p className="mt-1 font-mono text-[10px] text-gray-400">
        Fairness drift: equitable performance at model launch decays as the economic environment evolves. Quarterly monitoring surfaces decline before it reaches the four-fifths threshold.
      </p>
    </div>
  );
}
