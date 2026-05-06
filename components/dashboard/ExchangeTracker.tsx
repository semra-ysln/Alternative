"use client";

import React from 'react';
import { TrendingUp } from 'lucide-react';

const ExchangeTracker = () => {
  return (
    <section className="bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-slate-700/50 rounded-[28px] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-bold text-gray-900 dark:text-white">Kur Takibi</h4>
        <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          <TrendingUp size={16} className="text-[#2563EB]" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400 font-medium">Hedef: USD/TRY</span>
          <span className="text-sm font-bold text-[#2563EB]">40,00 ₺</span>
        </div>

        {/* İlerleme çubuğu */}
        <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div className="bg-[#2563EB] h-full w-[85%] rounded-full transition-all duration-1000" />
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <span>Mevcut: 38,40 ₺</span>
          <span>%85</span>
        </div>

        <p className="text-xs text-gray-400 italic leading-snug border-t border-gray-50 dark:border-slate-800 pt-3">
          Dolar 40 ₺ olduğunda otomatik 1.000 USD alımı tetiklenecek.
        </p>
      </div>
    </section>
  );
};

export default ExchangeTracker;
