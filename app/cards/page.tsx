"use client";

import React from 'react';
import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";
import { CreditCard } from 'lucide-react';

export default function CardsPage() {
  return (
    <div className="flex min-h-screen bg-[#eef2ff] dark:bg-[#0f172a] transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8 max-w-[900px] mx-auto w-full">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Kartlarım</h2>
          <div className="bg-white dark:bg-[#1e293b] rounded-[28px] p-10 shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <CreditCard size={32} className="text-[#2563EB]" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">Henüz kart eklenmedi</p>
            <p className="text-sm text-gray-400">İlk sanal kartınızı oluşturmak için aşağıya tıklayın.</p>
            <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-md shadow-blue-500/20 mt-2">
              Kart Ekle
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
