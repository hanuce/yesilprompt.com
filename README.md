# 🌿 Yeşil Prompt Atölyesi

Yapay zekânın görünmeyen **enerji ve su** maliyetini, gündelik birimlerle (telefon şarjı,
video izleme süresi, LED ampul, baraj kapasitesi) anlaşılır kılan interaktif bir eğitim sitesi.

Site; öğrencilerin bir metin sorgusunun, bir görsel üretiminin ya da bir modelin baştan
eğitilmesinin neye mal olduğunu **canlı hesaplayarak** görmesini amaçlar. Sayılar eğitim
amaçlı tahminlerdir ve her sayfada kaynakça ile birlikte sunulur.

🔗 **Canlı site:** [yesilprompt.com](https://yesilprompt.com)

---

## Ne sunuyor?

- **Canlı tokenizer** — yazdığınız metnin kaç token'a bölündüğünü anında gösterir; Türkçe/İngilizce
  karşılaştırması yapılabilir.
- **Enerji & su hesaplayıcı** — metin / görsel / video üretiminin tahmini Wh, mL su ve g CO₂
  değerlerini hesaplar; sonucu "kaç telefon şarjı" gibi gündelik eşdeğerlere çevirir.
- **Yapay zeka tarihi ve modeller** — Turing'den Transformer'a uzanan zaman tüneli, modellerin
  nasıl eğitildiği, model aileleri ve sektörün büyüme grafikleri.
- **Prompt mühendisliği** — daha az kaynakla daha iyi sonuç almanın yolları; örneklerle önce/sonra
  karşılaştırmaları.
- **Yeşil Prompt Resim Sergisi** — her eserin altında çevreye maliyetinin yer aldığı kürasyonlu galeri.

## Sayfalar

| Sayfa | İçerik |
|---|---|
| **Giriş** | Tanıtım, etik sorular, künye, materyal ve kaynak havuzu |
| **Modeller & Tarih** | Yapay zeka tarihi, modelin nasıl eğitildiği, donanım, model aileleri, sektör büyümesi |
| **Token Lab** | Token nedir, canlı tokenizer, çok dillilik, enerji & su hesaplayıcı |
| **Prompt Mühendisliği** | Shot tipleri, iyi promptun parçaları, Yeşil Prompt Kuralları |
| **Yeşil Prompt Resim Sergisi** | Enerji damgalı görsel galerisi |

Her sayfa tam ekran slaytlardan oluşur; fare tekeri, ok tuşları, dokunma ya da yan noktalarla
slaytlar arasında gezilir.

## Teknoloji

Saf **HTML + CSS + JavaScript**. Çerçeve, build adımı veya sunucu yoktur — site doğrudan
GitHub Pages'te yayınlanır ve tüm hesaplamalar tarayıcıda çalışır. Tek dış bağımlılıklar
Google Fonts ve `gpt-tokenizer` (CDN üzerinden) ile gerçek token sayımıdır.

İçerik (model değerleri, birim katsayıları, galeri, künye) `assets/js/config/` altındaki
yapılandırma dosyalarında tutulur; böylece metin ve veri, kod mantığından ayrı düzenlenebilir.

## Yerelde çalıştırma

Statik bir site olduğu için basit bir yerel sunucu yeterlidir (CDN'ler için internet gerekir):

```bash
python -m http.server 8080      # veya:  npx serve .
```

Ardından tarayıcıda `http://localhost:8080` adresini açın.

## Katkı ve proje notları

Sitenin yapısı, geliştirme kuralları ve içerik düzenleme rehberi ayrı bir belgede toplanmıştır:
👉 **[SITE_RULES.md](SITE_RULES.md)**

Atölyenin pedagojik planı ve kaynakları için `plans/` klasörüne bakabilirsiniz.

## Lisans ve kaynaklar

Sayılar eğitim amaçlı tahminlerdir; model, donanım, veri merkezi ve enerji kaynağına göre değişir.
Tüm kaynakça her sayfada APA biçiminde verilir. İlham: Jay Alammar — *The Illustrated Transformer*.
