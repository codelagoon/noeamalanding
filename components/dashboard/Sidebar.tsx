'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Upload, FileText, Activity, Settings } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Command Center', icon: LayoutDashboard },
  { href: '/upload',    label: 'New Audit',       icon: Upload },
  { href: '/reports',   label: 'Reports',          icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-56 shrink-0 flex flex-col border-r border-[#1E2530] bg-[#080B0F]"
      style={{ minHeight: '100vh' }}
    >
      {/* Logo */}
      <div className="px-5 py-6 border-b border-[#1E2530]">
        <div className="flex items-center gap-2 mb-1">
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-2 rounded-full bg-[#4A7C6F]"
          />
          <span className="font-mono text-base font-semibold text-white tracking-tight">noema</span>
        </div>
        <p className="font-mono text-[10px] text-[#4A7C6F] tracking-widest uppercase ml-4">
          Fairness Console
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-mono transition-colors duration-150 ${
                  active
                    ? 'text-white bg-[#4A7C6F]/15 border border-[#4A7C6F]/25'
                    : 'text-[#5A6A7A] hover:text-[#A0B0BF] hover:bg-[#111820]'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#4A7C6F] rounded-full"
                  />
                )}
                <Icon size={15} className={active ? 'text-[#4A7C6F]' : ''} />
                <span className="text-xs">{label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#1E2530]">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={12} className="text-[#4A7C6F]" />
          <span className="font-mono text-[10px] text-[#4A7C6F]">System nominal</span>
        </div>
        <p className="font-mono text-[9px] text-[#2A3540] leading-relaxed">
          Statistical analysis only. Not legal advice.
        </p>
      </div>
    </motion.aside>
  );
}
