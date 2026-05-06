"use client";

import React from 'react';
import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";
import BalanceCard from "@/components/dashboard/BalanceCard";
import TransactionList from "@/components/dashboard/TransactionList";
import InsightCard from "@/components/dashboard/InsightCard";
import ExchangeTracker from "@/components/dashboard/ExchangeTracker";
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#eef2ff] dark:bg-[#0f172a] transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Sol kolon - Ana içerik */}
            <div className="lg:col-span-8 space-y-6">
              <BalanceCard />
              <InsightCard />
              <TransactionList />
            </div>

            {/* Sağ kolon - Yan içerik */}
            <div className="lg:col-span-4 space-y-6">
              <AnalyticsCard />
              <ExchangeTracker />
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
