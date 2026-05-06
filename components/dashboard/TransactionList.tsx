"use client";

import React from 'react';
import { ChevronRight, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { MOCK_TRANSACTIONS } from "@/constants/mockData";

const statusLabel: Record<string, { label: string; className: string }> = {
  Completed: { label: 'Tamamlandı', className: 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400' },
  FlaggedForReview: { label: 'İnceleniyor', className: 'bg-amber-100 text-amber-600' },
  Pending: { label: 'Bekliyor', className: 'bg-blue-50 text-blue-500' },
  Failed: { label: 'Başarısız', className: 'bg-red-50 text-red-500' },
};

const TransactionList = () => {
  return (
    <section className="bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-slate-700/50 rounded-[28px] p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">Son İşlemler</h4>
        <button className="text-[#2563EB] font-semibold text-sm hover:underline flex items-center gap-1">
          Tümünü Gör <ChevronRight size={14} />
        </button>
      </div>
      
      <div className="space-y-3">
        {MOCK_TRANSACTIONS.map((tx) => {
          const isIncoming = tx.amount > 0;
          const isFlagged = tx.status === 'FlaggedForReview';
          const status = statusLabel[tx.status] ?? statusLabel.Completed;

          return (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-slate-800 last:border-0 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                {/* İkon */}
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  isFlagged
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : isIncoming
                    ? 'bg-emerald-50 dark:bg-emerald-900/20'
                    : 'bg-red-50 dark:bg-red-900/10'
                }`}>
                  {isIncoming ? (
                    <ArrowDownLeft size={20} className="text-emerald-500" />
                  ) : (
                    <ArrowUpRight size={20} className={isFlagged ? 'text-amber-500' : 'text-red-400'} />
                  )}
                </div>

                {/* Bilgi */}
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{tx.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {tx.date} • {tx.category?.toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Tutar & Durum */}
              <div className="text-right">
                <p className={`text-sm font-bold ${
                  isIncoming ? 'text-emerald-500' : 'text-gray-900 dark:text-white'
                }`}>
                  {isIncoming ? '+' : ''}{tx.amount.toLocaleString('tr-TR', { minimumFractionDigits: 0 })} TL
                </p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${status.className}`}>
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TransactionList;
