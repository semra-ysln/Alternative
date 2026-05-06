"use client";

import React from 'react';
import { Plus, Send, Wallet } from 'lucide-react';

const BalanceCard = () => {
  return (
    <section className="bg-lyraBlue rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20 card-hover">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-blue-100 text-sm font-medium opacity-90">Ana Cüzdan (TL)</span>
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
            <Wallet size={20} />
          </div>
        </div>
        
        <div className="flex items-baseline gap-2 mb-10">
          <h3 className="text-5xl font-bold tracking-tight">84.250,50</h3>
          <span className="text-2xl font-semibold opacity-80">TL</span>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-white text-lyraBlue py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-md">
            <Plus size={20} strokeWidth={3} /> Para Yükle
          </button>
          <button className="flex-1 bg-white/20 backdrop-blur-md text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/30 transition-all">
            <Send size={20} strokeWidth={2} /> Para Gönder
          </button>
        </div>
      </div>
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
    </section>
  );
};

export default BalanceCard;