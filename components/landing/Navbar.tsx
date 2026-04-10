import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14 border-b border-[#1E2635] bg-[#06070A]/95 backdrop-blur-sm">
      <Link href="/" className="font-mono text-sm font-semibold text-[#F5F7FA] tracking-tight">
        Noema
      </Link>
      <div className="flex items-center gap-7">
        <Link href="#how-it-works" className="font-mono text-xs text-[#6E788A] hover:text-[#A7B0C0] transition-colors">
          How it works
        </Link>
        <Link href="#who-its-for" className="font-mono text-xs text-[#6E788A] hover:text-[#A7B0C0] transition-colors">
          Who it&apos;s for
        </Link>
        <Link href="#regulatory" className="font-mono text-xs text-[#6E788A] hover:text-[#A7B0C0] transition-colors">
          Compliance
        </Link>
        <Link
          href="/dashboard"
          className="font-mono text-xs px-4 py-1.5 border border-[#1E2635] rounded-[5px] text-[#A7B0C0] hover:border-accent/40 hover:text-[#F5F7FA] transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
