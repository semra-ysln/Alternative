import { Transaction, UserProfile } from "@/types";

const API_BASE = "http://localhost:5000/api/v1";

// Hackathon için yardımcı fetch sarmalayıcısı
const lyraFetch = async (endpoint: string, options: any = {}) => {
  const token = localStorage.getItem("token");
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "X-Device-Id": "lyra-web-secure-id", // Fraud detection için şart
    "X-Lyrabit-Channel": "Web",
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  
  if (!response.ok) {
    const error = await response.json();
    throw error; // ProblemDetails formatında döner
  }
  
  return response.json();
};

export const ApiService = {
  getWallet: () => lyraFetch("/wallet"),
  getTransactions: () => lyraFetch("/transactions"),
  transfer: (data: { receiverEmailOrUsername: string, amount: number, description?: string }) => 
    lyraFetch("/transactions/transfer", { method: "POST", body: JSON.stringify(data) }),
};