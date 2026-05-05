import pandas as pd
import numpy as np
from faker import Faker
import random
from datetime import datetime, timedelta

# Faker ayarları (Türkçe veri için)
fake = Faker('tr_TR')
Faker.seed(42)
random.seed(42)
np.random.seed(42)

def veri_ureti(satir_sayisi=5000):
    veriler = []
    
    # Sabit kategoriler ve alıcılar
    kategoriler = {
        'Eğlence': ['Netflix', 'Spotify', 'Steam', 'PlayStation Store'],
        'Gıda': ['Starbucks', 'Burger King', 'Yemeksepeti', 'Getir Yemek'],
        'Yakıt': ['Shell', 'Opet', 'Petrol Ofisi', 'BP'],
        'Alışveriş': ['Amazon', 'Trendyol', 'Hepsiburada', 'N11'],
        'Teknoloji': ['Apple', 'Samsung', 'MediaMarkt', 'Teknosa'],
        'Ulaşım': ['Uber', 'BiTaksi', 'Martı', 'Turkish Airlines'],
        'Market': ['Migros', 'CarrefourSA', 'BIM', 'A101']
    }
    
    kanallar = ['Mobil Uygulama', 'Web Sitesi', 'Hızlı QR', 'API']
    sehirler = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana']
    
    # Kullanıcı havuzu oluştur (Veriyi daha tutarlı yapmak için)
    kullanici_havuzu = [f"USR-{i:04d}" for i in range(1, 501)]
    kullanici_ayarlari = {uid: {
        'ev_sehri': random.choice(sehirler),
        'ortalama_harcama': random.uniform(50, 500),
        'hesap_yasi': random.randint(10, 2000),
        'cihaz_id': fake.uuid4()[:8]
    } for uid in kullanici_havuzu}

    for _ in range(satir_sayisi):
        kullanici_id = random.choice(kullanici_havuzu)
        ayar = kullanici_ayarlari[kullanici_id]
        
        # Temel bilgiler
        zaman = fake.date_time_between(start_date='-30d', end_date='now')
        kategori = random.choice(list(kategoriler.keys()))
        alici = random.choice(kategoriler[kategori])
        islem_kanali = random.choice(kanallar)
        
        # Tutar (Normal dağılım etrafında ama bazı yüksek tutarlar)
        if random.random() < 0.05: # %5 olasılıkla yüksek tutar
            tutar = round(random.uniform(2000, 10000), 2)
        else:
            tutar = round(abs(np.random.normal(ayar['ortalama_harcama'], 100)), 2)
        
        # Konum (Normalde ev şehri, bazen farklı)
        sehir = ayar['ev_sehri'] if random.random() < 0.9 else random.choice(sehirler)
        ulke = 'Türkiye'
        
        # Dolandırıcılık Sinyalleri (Kural bazlı etiketleme)
        is_fraud = 0
        fraud_sebebi = ""
        
        # 1. Sinyal: Çok yüksek tutar
        if tutar > 5000:
            is_fraud = 1
            fraud_sebebi = "Yüksek Tutar"
        
        # 2. Sinyal: Alışılmadık saat (Gece 02:00 - 05:00 arası)
        if 2 <= zaman.hour <= 5 and random.random() < 0.7:
            is_fraud = 1
            fraud_sebebi = "Şüpheli Saat"
            
        # 3. Sinyal: Konum tutarsızlığı (Ev şehrinden farklı ve tutar yüksekse)
        if sehir != ayar['ev_sehri'] and tutar > 1000:
            is_fraud = 1
            fraud_sebebi = "Konum Değişikliği"

        # 4. Sinyal: Yeni hesap ve yüksek harcama
        if ayar['hesap_yasi'] < 30 and tutar > 500:
            is_fraud = 1
            fraud_sebebi = "Yeni Hesap/Yüksek Harcama"

        veriler.append({
            'islem_id': fake.uuid4()[:13],
            'zaman_damgasi': zaman,
            'kullanici_id': kullanici_id,
            'tutar': tutar,
            'alici_adi': alici,
            'kategori': kategori,
            'sehir': sehir,
            'ulke': ulke,
            'cihaz_id': ayar['cihaz_id'] if random.random() < 0.95 else fake.uuid4()[:8],
            'ip_adresi': fake.ipv4(),
            'hesap_yasi_gun': ayar['hesap_yasi'],
            'is_fraud': is_fraud,
            'islem_kanali': random.choice(['Mobil Uygulama', 'Web Sitesi']) if is_fraud == 1 and random.random() < 0.3 else islem_kanali, 
            'kullanici_ortalama_harcama': round(ayar['ortalama_harcama'], 2),
            'dolandiricilik_mi': is_fraud
        })

    return pd.DataFrame(veriler)

if __name__ == "__main__":
    print("Veri üretiliyor...")
    df = veri_ureti(5000)
    
    # CSV olarak kaydet
    df.to_csv('lyrabit_islem_verisi.csv', index=False)
    
    print("\nÜretilen Veri Özeti:")
    print(df.head())
    print("\nDolandırıcılık Dağılımı:")
    print(df['dolandiricilik_mi'].value_counts())
    print("\n'lyrabit_islem_verisi.csv' dosyası oluşturuldu.")
