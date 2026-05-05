# Lyrabit Sentetik Veri Üretim Planı (Adım 1)

Bu plan, PayPal alternatifi olan "lyrabit" projesi için 5.000 satırlık sentetik banka işlem verisi oluşturulmasını kapsamaktadır. Veriler, dolandırıcılık tespiti (fraud detection) analizi için özel olarak tasarlanacaktır.

## Kullanıcı Geri Bildirimi ve Açıklamalar

> [!NOTE]
> **IP Adresi Nedir?**: İşlemin yapıldığı internet bağlantısının kimliğidir. Dolandırıcılık analizinde, kullanıcının her zamanki konumundan farklı bir ülkeden veya "Proxy/VPN" kullanarak işlem yapıp yapmadığını anlamamıza yardımcı olur.
> 
> **İşlem Kanalı Nedir?**: İşlemin hangi platform üzerinden yapıldığını belirtir (örneğin: Mobil Uygulama, Web Sitesi, QR Kod, API). Bazı dolandırıcılık yöntemleri belirli kanallarda daha yoğun görülebilir.

## Uygulanan Değişiklikler

### [Veri Mühendisliği]

#### [TAMAMLANDI] [veri_ureteci.py](file:///c:/Users/semra/Desktop/Alternative/veri_ureteci.py)
`pandas` ve `Faker` kütüphanelerini kullanarak 5000 satırlık işlem verisi üreten Python kodu.

#### [TAMAMLANDI] [veri_kriterleri.md](file:///c:/Users/semra/Desktop/Alternative/veri_kriterleri.md)
Veri seti yapısını, sütun açıklamalarını ve dolandırıcılık sinyallerini listeleyen doküman.

#### [TAMAMLANDI] [ozellikler.txt](file:///c:/Users/semra/Desktop/Alternative/ozellikler.txt)
Backend ekibi için hazırlanan özet özellik listesi.

## Veri Seti Özellikleri (Sütunlar)
1.  **islem_id**: Benzersiz işlem numarası.
2.  **zaman_damgasi**: İşlemin gerçekleştiği tarih ve saat.
3.  **kullanici_id**: Gönderen kullanıcının ID'si.
4.  **tutar**: İşlem miktarı (TL).
5.  **alici_adi**: Alıcı (Netflix, Starbucks, Shell vb.).
6.  **kategori**: Harcama kategorisi (Eğlence, Gıda, Yakıt vb.).
7.  **sehir/ulke**: İşlemin yapıldığı konum.
8.  **cihaz_id**: İşlemin yapıldığı cihazın kimliği.
9.  **ip_adresi**: İnternet bağlantı adresi.
10. **hesap_yasi_gun**: Kullanıcının hesabını açtığı günden bugüne geçen süre.
11. **islem_kanali**: Mobil, Web, QR.
12. **kullanici_ortalama_harcama**: Kullanıcının geçmişteki ortalama harcama tutarı.
13. **dolandiricilik_mi**: Hedef değişken (1: Evet, 0: Hayır).

## Doğrulama Planı

### Otomatik Testler
- [x] `python veri_ureteci.py` komutu çalıştırıldı ve 5000 satırlık çıktı doğrulandı.
- [x] Eksik (null) veri kontrolü yapıldı.
- [x] Dolandırıcılık sinyallerinin verideki dağılımı kontrol edildi.

### Manuel Doğrulama
- [x] Alıcı isimleri ve kategoriler gözden geçirildi.
- [x] `veri_kriterleri.md` dosyasının eksiksiz olduğu teyit edildi.
