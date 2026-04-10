export default function Footer() {
  return (
    <footer className="px-8 py-10 border-t border-[#1F2E48]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-sm text-[#E8EDF5] font-semibold">noema</p>
        <p className="font-mono text-xs text-[#7A90A8] text-center">
          Statistical analysis only. Noema does not provide legal advice or certify regulatory compliance.
        </p>
        <p className="font-mono text-xs text-[#7A90A8]">
          &copy; {new Date().getFullYear()} Noema
        </p>
      </div>
    </footer>
  );
}
