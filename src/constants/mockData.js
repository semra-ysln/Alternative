export const DASHBOARD_DATA = {
    // 1. Cüzdanlar
    wallets: [
        { id: '1', balance: 84250.50, currency: 'TRY', label: 'Ana Cüzdan' },
        { id: '2', balance: 1250.00, currency: 'USD', label: 'Dolar Hesabı' },
        { id: '3', balance: 450.00, currency: 'EUR', label: 'Euro Hesabı' },
    ],

    // 2. Ana Bütçe Özeti (Mavi Panel Verileri)
    budgetSummary: {
        monthlyBudget: 15000,
        spent: 12164,
        remaining: 2836,
        usagePercentage: 81,
        statusText: "Ay sonuna kadar 2.836 TL kaldı"
    },

    // 3. Yaklaşan Abonelikler (Görseldeki Detaylarla Birebir)
    subscriptions: [
        {
            id: 's1',
            name: 'Spotify Türkiye',
            price: 89.90,
            dateInfo: 'Yarın yenilenecek',
            icon: 'music'
        },
        {
            id: 's2',
            name: 'Netflix Türkiye',
            price: 149.90,
            dateInfo: '4 gün sonra',
            icon: 'video'
        },
        {
            id: 's3',
            name: 'Disney+',
            price: 79.90,
            dateInfo: '11 gün sonra',
            icon: 'video'
        },
    ],
    // Abonelik yönetim sayfası alt toplamı için
    subscriptionSummary: {
        period: "Önümüzdeki 14 gün",
        total: "319,70 TL"
    },

    // 4. Tasarruf Hedefleri
    savingsGoals: [
        { id: 'g1', title: 'Yaz Tatili', current: 12800, target: 20000, color: '#1A5CFF', deadline: '2026-07-15' },
        { id: 'g2', title: 'Yeni Telefon', current: 8400, target: 35000, color: '#9B51E0', deadline: '2026-09-01' },
        { id: 'g3', title: 'Ev Depozitosu', current: 32500, target: 80000, color: '#27AE60', deadline: '2026-12-31' },
        { id: 'g4', title: 'Master Programı', current: 5000, target: 50000, color: '#F2994A', deadline: '2027-02-01' },
    ],

    // 5. Kategori Limitleri (Analiz Sayfası Grafikleri İçin)
    categoryLimits: [
        { name: "Yemek", spent: 4250, limit: 3500, color: "#F2C94C" },
        { name: "Ulaşım", spent: 1890, limit: 2000, color: "#1A5CFF" },
        { name: "Abonelik", spent: 974, limit: 1000, color: "#27AE60" },
        { name: "Market", spent: 3120, limit: 4000, color: "#9B51E0" },
        { name: "Eğlence", spent: 1450, limit: 1500, color: "#EB5757" },
    ],

    // 6. AI Analiz Mesajı ve Güvenlik
    insights: "Bu ay yemek harcamaların bütçenin %12 üzerine çıktı. Haftaya yapılacak kira ödemen için 5.000 TL kenara ayırdım.",
    securityWarning: "1 işlem incelenmeyi bekliyor.",

    // 7. Bildirimler
    notifications: [
        { id: 'n1', title: 'Yeni Transfer', message: 'Zeynep Yılmaz size 2.500 TL gönderdi.', time: 'Şimdi', type: 'transfer', isRead: false },
        { id: 'n2', title: 'Güvenlik İncelemesi', message: '50.000 TL tutarındaki işleminiz incelemeye alındı.', time: '2 saat önce', type: 'security', isRead: false }
    ],

    // 8. Son İşlemler
    recentTransactions: [
        { id: '1', title: 'Midpoint Gastro', category: 'restaurant', amount: -420.00, status: 'Completed', date: 'Bugün' },
        { id: '4', title: 'Aylık Kira', category: 'housing', amount: -15000.00, status: 'Completed', date: 'Dün', description: 'Mayıs ayı ev kirası' },
    ]
};

export const PAYMENTS_DATA = {
    summary: [
        { id: '1', label: 'BEKLEYEN', amount: '1.318,80 TL', subtext: '3 fatura ödenmeyi bekliyor', color: '#FFFBEB' },
        { id: '2', label: 'BU AY ÖDENEN', amount: '623,90 TL', subtext: '3 fatura ödendi', color: '#FFF' },
        { id: '3', label: 'OTOMATİK ÖDEME', amount: '2', subtext: 'Aktif sözleşme', color: '#FFF' },
    ],
    categories: [
        { id: '1', name: 'BEDAŞ', icon: 'lightbulb', color: '#FEF3C7' },
        { id: '2', name: 'İSKİ', icon: 'droplets', color: '#E0F2FE' },
        { id: '3', name: 'İGDAŞ', icon: 'flame', color: '#FFEDD5' },
        { id: '4', name: 'Turkcell', icon: 'smartphone', color: '#FEF3C7' },
    ],
    bills: [
        { id: 'b1', provider: 'BEDAŞ', date: '2026-05-12', amount: '487,50 TL', icon: 'lightbulb', color: '#FEF3C7' },
        { id: 'b2', provider: 'İSKİ', date: '2026-05-15', amount: '142,30 TL', icon: 'droplets', color: '#E0F2FE' },
        { id: 'b3', provider: 'İGDAŞ', date: '2026-05-20', amount: '689,00 TL', icon: 'flame', color: '#FFEDD5' },
    ]
};