# Lyrabit Risk Skorlama Sistemi Planı (Adım 2)

Bu aşamada, üretilen veriler üzerinde her bir işlemin ne kadar riskli olduğunu gösteren 0-100 arası bir "Risk Puanı" (fraud_score) hesaplayacağız.

## Önerilen Değişiklikler

### [Analiz ve Modelleme]

#### [YENİ] [risk_hesaplayici.py](file:///c:/Users/semra/Desktop/Alternative/risk_hesaplayici.py)
İşlem verilerini okuyan ve aşağıdaki kriterlere göre ağırlıklı risk puanı hesaplayan Python kodu:
- **Tutar Riski (%40)**: Son 10 işlem ortalamasının 3 katı üzerindeki harcamalar.
- **Zaman Riski (%30)**: Gece 00:00 - 05:00 arası işlemler.
- **IP/Konum Riski (%30)**: Kullanıcının daha önce kullanmadığı yeni bir IP adresi.

#### [GÜNCELLEME] [README.md](file:///c:/Users/semra/Desktop/Alternative/README.md)
Risk puanı formülünün matematiksel açıklaması eklenecektir.

#### [YENİ] [proje_ozeti.md](file:///c:/Users/semra/Desktop/Alternative/proje_ozeti.md)
Yapılan tüm işlemlerin teknik bilgisi olmayan birine anlatılır gibi basit bir dille özetlendiği doküman.

## Risk Formülü
`Risk Puanı = (Tutar_Skoru * 0.4) + (Zaman_Skoru * 0.3) + (IP_Skoru * 0.3)`

## Doğrulama Planı

### Otomatik Testler
- Fonksiyonun 0 ile 100 arasında değer ürettiğini doğrula.
- Birkaç uç senaryo (örneğin hem gece, hem yüksek tutar, hem yeni IP) için puanın 100 olduğunu kontrol et.

### Manuel Doğrulama
- `README.md` dosyasındaki formülün doğruluğunu kontrol et.
- `proje_ozeti.md` dosyasındaki anlatımın sadeliğini kontrol et.
