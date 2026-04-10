import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-[#2A2A2A] bg-[#0A0A0A]/90 backdrop-blur-sm">
      <Link href="/" className="font-mono text-lg font-semibold text-[#F5F5F5] tracking-tight">
        noema
      </Link>
      <div className="flex items-center gap-8">
        <Link href="#how-it-works" className="font-mono text-sm text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors">
          How it works
        </Link>
        <Link href="#who-its-for" className="font-mono text-sm text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors">
          Who it&apos;s for
        </Link>
      </div>
    </nav>
  );
}
