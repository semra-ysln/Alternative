import pandas as pd
import numpy as np

def risk_skoru_hesapla(df):
    """
    Her bir işleme kriterlere göre 0-100 arası bir risk puanı (fraud_score) atar.
    """
    
    # 1. Ön Hazırlık: Tarih dönüşümü ve sıralama
    df['zaman_damgasi'] = pd.to_datetime(df['zaman_damgasi'])
    df = df.sort_values(by=['kullanici_id', 'zaman_damgasi'])
    
    # --- KRİTER 1: Tutar Riski (%40) ---
    # Son 10 işlemin ortalamasını hesapla (kendisi hariç)
    df['son_10_ort'] = df.groupby('kullanici_id')['tutar'].transform(
        lambda x: x.shift().rolling(window=10, min_periods=1).mean()
    )
    # İlk işlemse ortalama 0 olacağı için tutarın kendisini alalım (ya da boş geçelim)
    df['son_10_ort'] = df['son_10_ort'].fillna(df['tutar'])
    
    # Tutar ortalamanın 3 katından büyükse 100 puan, değilse 0
    df['tutar_skoru'] = np.where(df['tutar'] > (df['son_10_ort'] * 3), 100, 0)
    
    # --- KRİTER 2: Zaman Riski (%30) ---
    # Gece 00:00 - 05:00 arası ise 100 puan
    df['saat'] = df['zaman_damgasi'].dt.hour
    df['zaman_skoru'] = np.where((df['saat'] >= 0) & (df['saat'] <= 5), 100, 0)
    
    # --- KRİTER 3: IP Riski (%30) ---
    # Kullanıcının daha önce kullandığı IP'leri takip et
    def yeni_ip_mi(group):
        seen_ips = set()
        results = []
        for ip in group:
            if ip not in seen_ips:
                results.append(100) # Yeni IP
                seen_ips.add(ip)
            else:
                results.append(0) # Bilinen IP
        return pd.Series(results, index=group.index)

    df['ip_skoru'] = df.groupby('kullanici_id')['ip_adresi'].transform(yeni_ip_mi)
    
    # --- AĞIRLIKLI HESAPLAMA ---
    # Formül: (Tutar * 0.4) + (Zaman * 0.3) + (IP * 0.3)
    df['fraud_score'] = (df['tutar_skoru'] * 0.4) + (df['zaman_skoru'] * 0.3) + (df['ip_skoru'] * 0.3)
    
    # Gereksiz ara sütunları temizle (isteğe bağlı)
    # df = df.drop(columns=['son_10_ort', 'tutar_skoru', 'zaman_skoru', 'ip_skoru', 'saat'])
    
    return df

if __name__ == "__main__":
    print("Veri okunuyor...")
    try:
        df = pd.read_csv('lyrabit_islem_verisi.csv')
        
        print("Risk skorları hesaplanıyor...")
        df_riskli = risk_skoru_hesapla(df)
        
        # Sonuçları kaydet
        df_riskli.to_csv('lyrabit_riskli_islem_verisi.csv', index=False)
        
        print("\nRisk Analizi Özeti:")
        print(f"Yüksek Riskli İşlem Sayısı (Score > 70): {len(df_riskli[df_riskli['fraud_score'] > 70])}")
        print(f"Ortalama Risk Puanı: {df_riskli['fraud_score'].mean():.2f}")
        
        print("\nEn yüksek riskli ilk 5 işlem:")
        print(df_riskli.sort_values(by='fraud_score', ascending=False)[['kullanici_id', 'tutar', 'saat', 'fraud_score']].head())
        
        print("\n'lyrabit_riskli_islem_verisi.csv' başarıyla oluşturuldu.")
        
    except FileNotFoundError:
        print("Hata: 'lyrabit_islem_verisi.csv' bulunamadı. Lütfen önce veri_ureteci.py çalıştırın.")
