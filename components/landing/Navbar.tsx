import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-[#1F2E48] bg-[#080D1A]/90 backdrop-blur-sm">
      <Link href="/" className="font-mono text-lg font-semibold text-[#E8EDF5] tracking-tight">
        noema
      </Link>
      <div className="flex items-center gap-8">
        <Link href="#how-it-works" className="font-mono text-sm text-[#7A90A8] hover:text-[#E8EDF5] transition-colors">
          How it works
        </Link>
        <Link href="#who-its-for" className="font-mono text-sm text-[#7A90A8] hover:text-[#E8EDF5] transition-colors">
          Who it&apos;s for
        </Link>
      </div>
    </nav>
  );
}
