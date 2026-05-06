import { Transaction } from "@/types";

export const USER_DATA = {
  userId: "1",
  name: "Furkan",
  balance: 84250.50,
  currency: "TRY",
};

// BU DİZİYİ EKLE: Sidebar hatasını çözer
export const NAV_LINKS = [
  { id: 'dashboard', label: 'Dashboard', path: '/' },
  { id: 'payments', label: 'Ödemeler', path: '/payments' },
  { id: 'insights', label: 'AI Insights', path: '/insights' },
  { id: 'cards', label: 'Kartlarım', path: '/cards' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    name: 'Midpoint Gastro',
    senderUsername: 'furkan',
    receiverUsername: 'Midpoint',
    amount: -420.00,
    currency: 'TRY',
    status: 'Completed',
    category: 'YEMEK',
    createdAt: '2026-05-05T14:20:00Z',
    time: '14:20',
    date: 'Bugün',
    icon: '🍴' // İkon bilgisini ekle
  },
  {
    id: '99',
    name: 'Bilinmeyen Hesap',
    senderUsername: 'furkan',
    receiverUsername: 'Bilinmeyen',
    amount: -50000.00,
    currency: 'TRY',
    status: 'FlaggedForReview',
    riskScore: 85,
    category: 'TRANSFER',
    createdAt: '2026-05-05T03:00:00Z',
    time: '03:00',
    date: 'Bugün',
    icon: '⚠️'
  }
];