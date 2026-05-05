# Lyrabit Veri Üretimi Tamamlandı

PayPal alternatifi projeniz için 5000 satırlık sentetik banka işlem verisi ve gerekli dokümantasyon başarıyla oluşturuldu.

## Yapılan Çalışmalar

1.  **[veri_ureteci.py](file:///c:/Users/semra/Desktop/Alternative/veri_ureteci.py)**: `Faker` ve `pandas` kullanarak 5000 satırlık gerçekçi veri üreten Python kodu yazıldı.
2.  **[risk_hesaplayici.py](file:///c:/Users/semra/Desktop/Alternative/risk_hesaplayici.py)**: İşlemleri 0-100 arası puanlayan algoritma yazıldı.
    - **Tutar Riski (%40)**, **Zaman Riski (%30)** ve **IP Riski (%30)** ağırlıkları kullanıldı.
3.  **[README.md](file:///c:/Users/semra/Desktop/Alternative/README.md)**: Matematiksel formül ve kriterler README'ye eklendi.
4.  **[proje_ozeti.md](file:///c:/Users/semra/Desktop/Alternative/proje_ozeti.md)**: Teknik bilgisi olmayanlar için süreci anlatan basit bir rehber hazırlandı.
5.  **[lyrabit_riskli_islem_verisi.csv](file:///c:/Users/semra/Desktop/Alternative/lyrabit_riskli_islem_verisi.csv)**: Risk puanları hesaplanmış nihai veri seti oluşturuldu.

## Risk Skorlama Sonuçları

- **Ortalama Risk Puanı:** 39.84
- **Yüksek Riskli (>70) İşlem Sayısı:** 68
- **Tespit Edilen Senaryolar:** Hem gece vakti, hem daha önce kullanılmamış bir IP'den, hem de normal harcamanın 3 katı üzerinde bir işlem yapıldığında sistem doğrudan **100 tam puan** risk atamaktadır.

## Sonraki Adımlar
Veri seti hazır olduğuna göre, bu veriyi Pandas kullanarak analiz edebilir veya dolandırıcılık tespiti için Makine Öğrenmesi (Scikit-learn) modelleri eğitmeye başlayabiliriz. Bir sonraki adımda ne yapmak istersin?
