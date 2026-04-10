'use client';

interface DIRGaugeProps {
  value: number;
  label?: string;
}

export default function DIRGauge({ value, label }: DIRGaugeProps) {
  // Gauge spans -135° to +135° (270° sweep)
  const clamp = Math.max(0, Math.min(1, value));
  const angleDeg = -135 + clamp * 270;
  const rad = (angleDeg * Math.PI) / 180;
  const cx = 100; const cy = 100; const r = 72;
  const nx = cx + r * Math.cos(rad);
  const ny = cy + r * Math.sin(rad);

  // four-fifths rule threshold angle
  const thresholdDeg = -135 + 0.8 * 270;
  const thresholdRad = (thresholdDeg * Math.PI) / 180;
  const tx = cx + (r + 12) * Math.cos(thresholdRad);
  const ty = cy + (r + 12) * Math.sin(thresholdRad);

  const passes = clamp >= 0.8;
  const gaugeColor = clamp < 0.8 ? '#ef4444' : clamp < 0.9 ? '#f59e0b' : '#4A7C6F';

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 140" className="w-full max-w-[260px]">
        {/* background track */}
        <path
          d="M28,120 A72,72 0 0,1 172,120"
          fill="none" stroke="#2A2A2A" strokeWidth="12" strokeLinecap="round"
        />
        {/* danger zone 0–0.8 */}
        <path
          d="M28,120 A72,72 0 0,1 114,31"
          fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.2"
        />
        {/* filled arc */}
        <path
          d={`M28,120 A72,72 0 ${clamp > 0.5 ? 1 : 0},1 ${nx.toFixed(2)},${ny.toFixed(2)}`}
          fill="none"
          stroke={gaugeColor}
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* threshold tick */}
        <line
          x1={(cx + (r - 8) * Math.cos(thresholdRad)).toFixed(2)}
          y1={(cy + (r - 8) * Math.sin(thresholdRad)).toFixed(2)}
          x2={(cx + (r + 8) * Math.cos(thresholdRad)).toFixed(2)}
          y2={(cy + (r + 8) * Math.sin(thresholdRad)).toFixed(2)}
          stroke="#ef4444" strokeWidth="2" strokeOpacity="0.7"
        />
        <text x={tx.toFixed(2)} y={ty.toFixed(2)} fill="#ef4444" fontSize="8" fontFamily="monospace" textAnchor="middle">0.80</text>

        {/* needle */}
        <line
          x1={cx} y1={cy}
          x2={nx.toFixed(2)} y2={ny.toFixed(2)}
          stroke={gaugeColor} strokeWidth="3" strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="6" fill={gaugeColor} />

        {/* center value */}
        <text x={cx} y={cy + 28} textAnchor="middle" fill={gaugeColor} fontSize="22" fontFamily="monospace" fontWeight="bold">
          {clamp.toFixed(2)}
        </text>
        <text x={cx} y={cy + 42} textAnchor="middle" fill="#A0A0A0" fontSize="8" fontFamily="monospace">
          Disparate Impact Ratio
        </text>

        {/* scale labels */}
        <text x="22" y="135" fill="#A0A0A0" fontSize="8" fontFamily="monospace">0.0</text>
        <text x="163" y="135" fill="#A0A0A0" fontSize="8" fontFamily="monospace">1.0</text>
      </svg>

      {/* status pill */}
      <div className={`mt-2 px-4 py-1.5 rounded-full border font-mono text-xs font-semibold ${
        passes
          ? 'border-[#4A7C6F]/40 bg-[#4A7C6F]/10 text-[#4A7C6F]'
          : 'border-red-800/40 bg-red-900/20 text-red-400'
      }`}>
        {passes
          ? `Pass — DIR ${clamp.toFixed(2)} ≥ 0.80 (four-fifths rule)`
          : `⚠ Fail — DIR ${clamp.toFixed(2)} < 0.80 (four-fifths rule)`}
      </div>
      {label && <p className="mt-1 font-mono text-[10px] text-[#A0A0A0]">{label}</p>}
    </div>
  );
}
