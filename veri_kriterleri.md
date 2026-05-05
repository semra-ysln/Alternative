# Lyrabit Banka Verisi Analiz Kriterleri

Bu doküman, üretilen sentetik banka verisindeki dolandırıcılık sinyallerini ve veri yapısını detaylandırır.

## Veri Seti Yapısı

| Sütun Adı | Açıklama | Tip | Örnek Veri |
| :--- | :--- | :--- | :--- |
| `islem_id` | İşlemin benzersiz kimliği | String | `a1b2c3d4e5` |
| `zaman_damgasi` | İşlemin yapıldığı tarih ve saat | DateTime | `2024-03-20 14:30:00` |
| `kullanici_id` | Gönderen kullanıcının kimliği | String | `USR-001` |
| `tutar` | İşlem tutarı (TL) | Float | `1250.50` |
| `alici_adi` | Paranın gönderildiği kurum/şahıs | String | `Netflix`, `Starbucks` |
| `kategori` | Harcama kategorisi | String | `Eğlence`, `Gıda` |
| `sehir` | İşlemin yapıldığı şehir | String | `İstanbul` |
| `cihaz_id` | İşlemde kullanılan cihazın ID'si | String | `dev-88x` |
| `ip_adresi` | Bağlantı IP adresi | String | `192.168.1.1` |
| `hesap_yasi_gun` | Hesabın kaç günlük olduğu | Integer | `365` |
| `islem_kanali` | İşlem yöntemi | String | `Mobil Uygulama`, `QR` |
| `dolandiricilik_mi` | Hedef değişken (1: Fraud, 0: Normal) | Boolean | `1` |

## Dolandırıcılık Sinyalleri (Fraud Signals)

Analiz sırasında aşağıdaki kriterlere odaklanılmalıdır:

1.  **Yüksek Tutar Sinyali:** Normal harcama alışkanlıklarının çok üzerinde (örneğin > 5000 TL) yapılan işlemler şüpheli olarak işaretlenmiştir.
2.  **Şüpheli Saat Sinyali:** Gece yarısından sonra, özellikle 02:00 ile 05:00 saatleri arasında yapılan alışverişler riskli kabul edilir.
3.  **Konum Tutarsızlığı:** Kullanıcının kayıtlı olduğu "Ev Şehri" dışındaki şehirlerden yapılan ve yüksek tutarlı olan işlemler dolandırıcılık emaresi taşır.
4.  **Yeni Hesap Riski:** Hesabı açılalı henüz 30 gün dolmamış kullanıcıların yaptığı yüksek tutarlı işlemler "Hoş geldin dolandırıcılığı" olarak simüle edilmiştir.
5.  **Cihaz Değişikliği:** Aynı işlem kanalında farklı cihaz ID'leri üzerinden gelen tekrarlı talepler.

## Teknik Notlar
- Veri seti `Faker` kütüphanesi kullanılarak `tr_TR` yerelleştirmesiyle üretilmiştir.
- Toplam 5000 satır veri bulunmaktadır.
- Veri seti dengesizdir (Gerçek hayat senaryosu gereği dolandırıcılık oranı düşüktür).
