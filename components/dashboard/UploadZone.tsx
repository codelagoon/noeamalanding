'use client';

import { useCallback, useState } from 'react';
import { Upload, FileText } from 'lucide-react';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  uploading: boolean;
}

export default function UploadZone({ onUpload, uploading }: UploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith('.csv')) {
        alert('Please upload a CSV file');
        return;
      }
      setSelectedFile(file);
      onUpload(file);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
        dragOver
          ? 'border-[#6366F1] bg-[#6366F1]/5'
          : selectedFile
          ? 'border-green-400 bg-green-50'
          : 'border-gray-300 bg-white hover:border-[#6366F1] hover:bg-gray-50'
      }`}
    >
      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
        disabled={uploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />

      {uploading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-sm text-gray-700">Uploading...</p>
        </div>
      ) : selectedFile ? (
        <div className="flex flex-col items-center gap-3">
          <FileText size={36} className="text-green-600" />
          <p className="font-mono text-sm font-semibold text-gray-900">{selectedFile.name}</p>
          <p className="font-mono text-xs text-gray-500">
            {(selectedFile.size / 1024).toFixed(1)} KB
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Upload size={36} className="text-gray-400" />
          <div>
            <p className="font-mono text-sm font-semibold text-gray-900 mb-1">
              Drop your CSV file here
            </p>
            <p className="font-mono text-xs text-gray-500">or click to browse</p>
          </div>
          <p className="font-mono text-xs text-gray-400">CSV files only</p>
        </div>
      )}
    </div>
  );
}
