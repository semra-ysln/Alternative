"use client";

import React from 'react';

const categories = [
  { label: 'Yemek', amount: 4500, color: '#3B82F6' },
  { label: 'Abonelik', amount: 280, color: '#EAB308' },
  { label: 'Ulaşım', amount: 1200, color: '#22C55E' },
  { label: 'Kira', amount: 15000, color: '#EF4444' },
];

const total = categories.reduce((s, c) => s + c.amount, 0);

// Basit SVG pasta grafiği
const PieChart = () => {
  let cumulative = 0;
  const cx = 60, cy = 60, r = 50;

  const slices = categories.map((cat) => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    cumulative += cat.amount;
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = cat.amount / total > 0.5 ? 1 : 0;

    return {
      ...cat,
      d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`,
    };
  });

  return (
    <svg viewBox="0 0 120 120" className="w-[120px] h-[120px]">
      {slices.map((s) => (
        <path key={s.label} d={s.d} fill={s.color} />
      ))}
    </svg>
  );
};

const AnalyticsCard = () => {
  return (
    <section className="bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-slate-700/50 rounded-[28px] p-6 shadow-sm space-y-5">
      <h4 className="text-lg font-bold text-gray-900 dark:text-white">AI Analiz & Bütçe</h4>

      {/* Pasta grafik + legend */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Kategori Bazlı Dağılım</p>
        <div className="flex items-center gap-5">
          <PieChart />
          <div className="space-y-2 flex-1">
            {categories.map((cat) => (
              <div key={cat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{cat.label}</span>
                </div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                  {cat.amount.toLocaleString('tr-TR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Abonelik Takibi */}
      <div className="bg-[#1e293b] rounded-[20px] p-5 text-white">
        <p className="text-xs text-slate-400 font-medium mb-1">Abonelik Takibi</p>
        <p className="text-2xl font-bold mb-1">Aylık gideriniz: 274 TL</p>
        <p className="text-xs text-slate-400">Spotify, Netflix ve iCloud tespit edildi.</p>
      </div>
    </section>
  );
};

export default AnalyticsCard;
