"use client";

import React from 'react';
import { Bell, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-8 py-5 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 sticky top-0 z-20">
      {/* Sol: Kullanıcı selamı (app'teki gibi) */}
      <div className="flex items-center gap-3">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Furkan"
          alt="Profile"
          className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800 bg-blue-100 shadow-sm"
        />
        <div>
          <p className="text-xs text-gray-400 font-medium leading-none">Merhaba, Furkan 👋</p>
          <p className="text-base font-bold text-gray-900 dark:text-white leading-snug">LyraBit</p>
        </div>
      </div>

      {/* Sağ: Arama + Tema + Bildirim */}
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="İşlem ara..."
            className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all w-52"
          />
        </div>

        <ThemeToggle />

        <div className="relative w-9 h-9 rounded-full border border-gray-200 dark:border-slate-700 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
