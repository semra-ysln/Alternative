# Lyrabit - PayPal Alternatifi Güvenli Ödeme Sistemi

Lyrabit, finansal işlemlerde güvenliği ön planda tutan bir ödeme platformu projesidir. Bu proje kapsamında işlemler gerçek zamanlı olarak risk skorlamasına tabi tutulmaktadır.

## Risk Skorlama Modeli

Her bir işlem için hesaplanan **fraud_score** (0-100), aşağıdaki matematiksel ağırlıklandırma formülüne dayanmaktadır:

### Formül:
$$Risk Puanı = (S_{tutar} \times 0.40) + (S_{zaman} \times 0.30) + (S_{IP} \times 0.30)$$

### Kriterler:
1.  **Tutar Skoru ($S_{tutar}$):** İşlem tutarı, kullanıcının son 10 işlem ortalamasının 3 katından büyükse 100 puan, aksi halde 0 puan.
2.  **Zaman Skoru ($S_{zaman}$):** İşlem gece yarısı (00:00 - 05:00) arasında gerçekleşiyorsa 100 puan, aksi halde 0 puan.
3.  **IP Skoru ($S_{IP}$):** İşlem yapılan IP adresi, kullanıcının geçmişinde daha önce görülmemişse 100 puan, aksi halde 0 puan.

Bu model sayesinde, şüpheli işlemler anında tespit edilerek güvenlik katmanına (2FA vb.) yönlendirilebilir.