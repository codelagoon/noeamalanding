'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Audit } from '@/lib/types';
import { FileText, Download, Eye } from 'lucide-react';
import Link from 'next/link';

export default function ReportsPage() {
  const router = useRouter();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pass' | 'review' | 'critical'>('all');

  useEffect(() => {
    setLoading(false);
  }, []);

  const filteredAudits = audits.filter((audit) => {
    if (filter === 'all') return true;
    return true;
  });

  if (loading) {
    return (
      <div className="p-8">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Reports</h1>
        <p className="text-gray-600 font-mono text-sm">
          View and download past fairness audits
        </p>
      </div>

      {audits.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={40} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No reports yet</h2>
          <p className="text-gray-600 font-mono text-sm mb-8 max-w-md mx-auto">
            Run your first audit to see reports here
          </p>
          <Link
            href="/upload"
            className="inline-block px-6 py-3 bg-[#6EA8FE] text-white font-mono rounded-lg hover:bg-[#2B58D8] transition-colors"
          >
            Run First Audit
          </Link>
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-6">
            {(['all', 'pass', 'review', 'critical'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                  filter === f
                    ? 'bg-[#6EA8FE] text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {f === 'all' ? 'All' : f === 'pass' ? 'Pass' : f === 'review' ? 'Review Required' : 'Critical Flags'}
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-4 text-sm font-mono font-semibold text-gray-700">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-mono font-semibold text-gray-700">Institution</th>
                  <th className="text-left px-6 py-4 text-sm font-mono font-semibold text-gray-700">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-mono font-semibold text-gray-700">Disparity Score</th>
                  <th className="text-right px-6 py-4 text-sm font-mono font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAudits.map((audit) => (
                  <tr key={audit.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">
                      {new Date(audit.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{audit.institutionName}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-mono rounded">{audit.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-gray-900">{audit.disparityScore || '--'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/audit/${audit.id}`} className="p-2 text-gray-600 hover:text-[#6EA8FE] transition-colors" title="View Report">
                          <Eye size={18} />
                        </Link>
                        <button className="p-2 text-gray-600 hover:text-[#6EA8FE] transition-colors" title="Download PDF">
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
