'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadZone from '@/components/dashboard/UploadZone';
import { ColumnMapping } from '@/lib/types';
import { Download } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [step, setStep] = useState<'upload' | 'map' | 'analyze'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [datasetId, setDatasetId] = useState<string>('');
  const [columns, setColumns] = useState<string[]>([]);
  const [institutionName, setInstitutionName] = useState('');
  const [columnMap, setColumnMap] = useState<Partial<ColumnMapping>>({
    additional: {},
  });
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setDatasetId(data.datasetId);
      setColumns(data.columns);
      setStep('map');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!columnMap.applicant_id || !columnMap.decision || !columnMap.protected_class) {
      setError('Please map all required fields');
      return;
    }

    if (!institutionName) {
      setError('Please enter institution name');
      return;
    }

    setAnalyzing(true);
    setError('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datasetId,
          columnMap: columnMap as ColumnMapping,
          institutionName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      router.push(`/audit/${data.auditId}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      setAnalyzing(false);
    }
  };

  const renderColumnSelect = (label: string, field: keyof ColumnMapping, required: boolean = false) => (
    <div>
      <label className="block text-sm font-mono font-semibold text-gray-700 mb-2">
        {label} {required && '*'}
      </label>
      <select
        value={(columnMap[field] as string) || ''}
        onChange={(e) => setColumnMap({ ...columnMap, [field]: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6EA8FE] font-mono"
      >
        <option value="">Select column...</option>
        {columns.map((col) => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">New Fairness Audit</h1>
        <p className="text-gray-600 font-mono text-sm">
          Upload your model decision data and run an audit
        </p>
      </div>

      {step === 'upload' && (
        <div className="space-y-6">
          <UploadZone onUpload={handleUpload} uploading={uploading} />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700 font-mono">{error}</p>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Required Columns</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4 font-mono font-semibold">Column</th>
                    <th className="text-left py-2 px-4 font-mono font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4 text-gray-900">applicant_id</td>
                    <td className="py-2 px-4 text-gray-600">Unique identifier for each applicant</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4 text-gray-900">decision</td>
                    <td className="py-2 px-4 text-gray-600">approved or denied</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4 text-gray-900">race</td>
                    <td className="py-2 px-4 text-gray-600">Demographic indicator (protected class)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4 text-gray-900">income</td>
                    <td className="py-2 px-4 text-gray-600">Applicant income (optional)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4 text-gray-900">credit_score</td>
                    <td className="py-2 px-4 text-gray-600">Credit score (optional)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-gray-900">dti</td>
                    <td className="py-2 px-4 text-gray-600">Debt-to-income ratio (optional)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="mt-4 flex items-center gap-2 text-[#6EA8FE] hover:text-[#2B58D8] font-mono text-sm">
              <Download size={16} />
              Download Sample CSV
            </button>
          </div>
        </div>
      )}

      {step === 'map' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Map Your Columns</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-mono font-semibold text-gray-700 mb-2">
                  Institution Name *
                </label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="Your Institution Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6EA8FE] font-mono"
                />
              </div>

              {renderColumnSelect('Applicant ID Column', 'applicant_id', true)}
              {renderColumnSelect('Decision Column', 'decision', true)}
              {renderColumnSelect('Protected Class Column', 'protected_class', true)}
              {renderColumnSelect('Income Column (optional)', 'income')}
              {renderColumnSelect('Credit Score Column (optional)', 'credit_score')}
              {renderColumnSelect('DTI Column (optional)', 'dti')}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-700 font-mono">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep('upload')}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-mono rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="flex-1 px-6 py-3 bg-[#6EA8FE] text-white font-mono rounded-lg hover:bg-[#2B58D8] transition-colors disabled:opacity-50"
              >
                {analyzing ? 'Running Analysis...' : 'Run Audit'}
              </button>
            </div>
          </div>

          {analyzing && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Analysis in Progress</h3>
              <div className="space-y-3 font-mono text-sm">
                {['Parsing data', 'Calculating approval rate disparities', 'Identifying proxy variables', 'Generating recommendations'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full "></div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Building report</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
