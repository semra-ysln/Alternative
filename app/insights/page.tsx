"use client";

import React from 'react';
import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen bg-[#eef2ff] dark:bg-[#0f172a] transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8 max-w-[900px] mx-auto w-full">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">AI Analiz & Bütçe</h2>
          <AnalyticsCard />
        </main>
      </div>
    </div>
  );
}
