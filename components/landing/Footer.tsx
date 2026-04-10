export default function Footer() {
  return (
    <footer className="px-8 py-10 border-t border-[#1E2635]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-mono text-sm font-semibold text-[#F5F7FA] mb-1">Noema</p>
          <p className="font-mono text-[11px] text-[#6E788A]">Fair lending audit infrastructure</p>
        </div>
        <p className="font-mono text-[11px] text-[#6E788A] max-w-md leading-relaxed text-right">
          Statistical analysis only. Noema does not provide legal advice
          or certify regulatory compliance. Results should be reviewed
          with qualified fair-lending counsel.
        </p>
        <p className="font-mono text-[11px] text-[#6E788A] shrink-0">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
