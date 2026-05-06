"use client";

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Wallet, Sparkles, CreditCard, Settings, LogOut } from 'lucide-react';
import { NAV_LINKS } from "@/constants/mockData";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] hidden lg:flex flex-col p-5 sticky top-0 h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
          L
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">LyraBit</span>
      </div>

      <nav className="space-y-1 flex-1">
        {NAV_LINKS.map((link) => (
          <NavItem
            key={link.id}
            href={link.path}
            icon={getIcon(link.id)}
            label={link.label}
            active={pathname === link.path}
          />
        ))}
      </nav>

      <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-1">
        <NavItem
          href="/settings"
          icon={<Settings size={18} />}
          label="Ayarlar"
          active={pathname === '/settings'}
        />
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl transition-all">
          <LogOut size={18} />
          <span className="font-semibold text-sm">Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
};

const getIcon = (id: string) => {
  const props = { size: 18 };
  switch (id) {
    case 'dashboard': return <LayoutDashboard {...props} />;
    case 'payments':  return <Wallet {...props} />;
    case 'insights':  return <Sparkles {...props} />;
    case 'cards':     return <CreditCard {...props} />;
    default:          return <Settings {...props} />;
  }
};

const NavItem = ({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
      active
        ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-500/20'
        : 'text-gray-400 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-white'
    }`}
  >
    {icon}
    <span className="font-semibold text-sm">{label}</span>
  </Link>
);

export default Sidebar;
