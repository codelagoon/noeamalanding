import { ProxyVariable } from '@/lib/types';
import { AlertTriangle } from 'lucide-react';

interface VariableTableProps {
  variables: ProxyVariable[];
}

const levelStyles: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-green-100 text-green-700',
};

const levelLabels: Record<string, string> = {
  High: 'High — likely proxy',
  Medium: 'Medium — monitor',
  Low: 'Low — acceptable',
};

export default function VariableTable({ variables }: VariableTableProps) {
  if (variables.length === 0) {
    return (
      <div className="py-8 text-center font-mono text-sm text-gray-500">
        No numeric variables available for correlation analysis
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left px-4 py-3 font-mono text-xs font-semibold text-gray-600 uppercase tracking-wider">Variable</th>
            <th className="text-left px-4 py-3 font-mono text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Demographic Correlation
            </th>
            <th className="text-left px-4 py-3 font-mono text-xs font-semibold text-gray-600 uppercase tracking-wider">Score</th>
            <th className="text-left px-4 py-3 font-mono text-xs font-semibold text-gray-600 uppercase tracking-wider">Reconstruction Risk</th>
            <th className="text-left px-4 py-3 font-mono text-xs font-semibold text-gray-600 uppercase tracking-wider">Notes</th>
          </tr>
        </thead>
        <tbody>
          {variables
            .slice()
            .sort((a, b) => b.correlationScore - a.correlationScore)
            .map((v) => (
              <tr key={v.variable} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono font-semibold text-gray-900">{v.variable}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-mono font-semibold ${levelStyles[v.correlationLevel]}`}>
                    {levelLabels[v.correlationLevel]}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-gray-700">{v.correlationScore.toFixed(2)}</td>
                <td className="px-4 py-3">
                  {v.reconstructionRisk ? (
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                      <span className="font-mono text-xs text-amber-700 font-semibold">Present</span>
                    </div>
                  ) : (
                    <span className="font-mono text-xs text-gray-400">Low</span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-600 max-w-xs">{v.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <p className="mt-3 font-mono text-xs text-gray-400 px-1">
        Reconstruction Risk: models frequently recover equivalent disparity from remaining correlated features after
        a proxy variable is removed (Gillis &amp; Spiess, 2019). High-risk variables require post-removal disparity retesting.
      </p>
    </div>
  );
}
