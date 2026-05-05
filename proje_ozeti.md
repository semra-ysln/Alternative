# Lyrabit Proje Özeti (Herkes İçin)

Merhaba! Bu belgede, Lyrabit projesinde şimdiye kadar neler yaptığımızı en basit haliyle anlatıyoruz. Eğer veri analizi veya yazılım konusunda yeniysen, doğru yerdesin.

## 1. Veri Üretimi (Ne Yaptık?)
Bir bankanın veya PayPal gibi bir sistemin elinde olan binlerce işlem verisini simüle ettik (uydurduk ama gerçekçi olsun diye özendik). 
- **5000 tane** sahte işlem oluşturduk.
- Bu işlemlere; paranın ne zaman gönderildiği, kime gittiği (Netflix, Starbucks vb.), hangi şehirden yapıldığı gibi bilgiler ekledik.

## 2. Risk Skorlama (Neden Yaptık?)
Her gün binlerce işlem yapılıyor. Güvenlik ekibinin her işleme tek tek bakması imkansız. Bu yüzden bir **"Risk Puanı"** sistemi kurduk. Bu sistem her işleme 0 ile 100 arası bir not veriyor.

### Puanı Nasıl Belirliyoruz?
Bir dedektif gibi düşün! Üç temel ipucuna bakıyoruz:
1.  **Harcama Miktarı:** Eğer her zaman 100 TL harcayan biriyseniz ve aniden 5000 TL harcanıyorsa, bu şüphelidir.
2.  **Zaman:** Çoğu insan gece 03:00'te uyur. Eğer o saatte büyük bir para transferi oluyorsa, "Acaba hesap mı çalındı?" diye soruyoruz.
3.  **Yabancı IP:** Sizin telefonunuz veya bilgisayarınız her zaman bir adres (IP) kullanır. Eğer daha önce hiç görmediğimiz bir adresten işlem geliyorsa, bunu riskli buluyoruz.

## 3. Sonuç
Artık elimizde her işlemin ne kadar riskli olduğunu gösteren bir tablomuz var. Puanı yüksek olan işlemleri sistem otomatik olarak durdurabilir veya size "Gerçekten siz misiniz?" diye soran bir mesaj gönderebilir.

Böylece Lyrabit, sadece bir cüzdan değil, aynı zamanda akıllı bir koruma kalkanı haline geliyor!
