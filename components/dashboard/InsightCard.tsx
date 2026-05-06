"use client";

import React from 'react';
import { TrendingDown, AlertTriangle } from 'lucide-react';

const InsightCard = () => {
  return (
    <div className="space-y-3">
      {/* Pozitif insight */}
      <div className="bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-slate-700/50 rounded-[20px] px-5 py-4 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
          <TrendingDown size={20} className="text-emerald-500" />
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-snug">
          Bu ay <span className="font-bold text-gray-900 dark:text-white">4.350 TL</span> harcadın, geçen aydan{' '}
          <span className="text-emerald-600 font-bold">%12 az.</span>
        </p>
      </div>

      {/* Uyarı insight */}
      <div className="bg-white dark:bg-[#1e293b] border border-red-100 dark:border-red-900/30 rounded-[20px] px-5 py-4 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
          <AlertTriangle size={20} className="text-red-500" />
        </div>
        <p className="text-sm text-red-600 dark:text-red-400 font-medium leading-snug">
          <span className="font-bold">1 işlem</span> incelenmeyi bekliyor.
        </p>
      </div>
    </div>
  );
};

export default InsightCard;
