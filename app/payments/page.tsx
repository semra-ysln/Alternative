"use client";

import React from 'react';
import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";
import { Send } from 'lucide-react';

export default function PaymentsPage() {
  return (
    <div className="flex min-h-screen bg-[#eef2ff] dark:bg-[#0f172a] transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8 max-w-[900px] mx-auto w-full">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Para Gönder</h2>
          <div className="bg-white dark:bg-[#1e293b] rounded-[28px] p-8 shadow-sm border border-gray-100 dark:border-slate-700/50 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-slate-400 mb-2">
                Alıcı (E-posta veya Kullanıcı Adı)
              </label>
              <input
                type="text"
                placeholder="ayse veya ali@mail.com"
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-slate-400 mb-2">
                Tutar (TRY)
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-slate-400 mb-2">
                Açıklama (Opsiyonel)
              </label>
              <textarea
                placeholder="Örn: Kira bedeli"
                rows={3}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              />
            </div>
            <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20">
              <Send size={18} /> Transferi Başlat
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
