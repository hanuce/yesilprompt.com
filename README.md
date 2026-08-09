# 🌿 Yeşil Prompt Atölyesi

Yapay zekânın görünmeyen **enerji ve su** maliyetini, gündelik birimlerle (telefon şarjı,
video izleme süresi, LED ampul, baraj kapasitesi) anlaşılır kılan interaktif bir eğitim sitesi.

Site; öğrencilerin bir metin sorgusunun, bir görsel üretiminin ya da bir modelin baştan
eğitilmesinin neye mal olduğunu **canlı hesaplayarak** görmesini amaçlar. Sayılar eğitim
amaçlı tahminlerdir ve her sayfada kaynakça ile birlikte sunulur.

**Anasayfa doğrudan sergidir.** Ziyaretçiyi önce eserler karşılar: her birinin altında
prompt, model, deneme sayısı ve çevre maliyeti yazar. Atölyenin tamamına buradaki
"Atölyeye gir" tuşundan geçilir.

🔗 **Canlı site:** [yesilprompt](https://hanuce.github.io/yesilprompt.com/)

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
- **Ne Kadar?** — 29 görsel üretim aracı arasından seçip kendi eserinin
  enerji/su/karbon maliyetini hesaplar ve sergiye eklenecek etiketi üretir. Ölçüme dayanan
  değerler ile sınıf tahminleri **ayrı ayrı işaretlenir**.
- **Yeşil Prompt Resim Sergisi** — menüsüz bir sergi salonu. Her eserin altında müze etiketi
  gibi bir künye durur (eser adı, üreten, model, enerji); esere tıklayınca prompt, oluşturulma
  tarihi, deneme sayısı ve çevre maliyetinin tamamı okunur.

## Sayfalar

| Sayfa | İçerik |
|---|---|
| **Sergi** (anasayfa) | Menüsüz galeri, künyeli ve enerji damgalı eserler |
| **Atölye Girişi** | Açılış soruları, materyal ve kaynak havuzu |
| **Modeller & Tarih** | Yapay zekâ tarihi, Transformer nasıl çalışır, modelin nasıl eğitildiği, eğitim verisi, model aileleri, sektör büyümesi |
| **Token Lab** | Token nedir, canlı tokenizer, çok dillilik, enerji & su hesaplayıcı |
| **Prompt Mühendisliği** | Shot tipleri, iyi promptun parçaları, Yeşil Prompt Kuralları |
| **Ne Kadar?** | Kendi görselinin maliyetini hesapla, araçları karşılaştır, sergi etiketini üret |

Sergi dışındaki her sayfa, künye · site haritası · telif bilgisini taşıyan **ortak bir
footer** ile biter. Karşılaştırılan tüm enerji değerleri tek bir birimden — **telefon
şarjından** — okunur; böylece iki sonuç her zaman birbiriyle kıyaslanabilir.

Anasayfada üst menü yoktur: ziyaretçiyi doğrudan eserler karşılar, gezinme sağ alttaki
yuvarlak "Atölyeye gir" düğmesiyle olur. Eserler kendi en/boy oranlarına göre dizilir — bir satırda kaç eser
olacağını görsellerin biçimi belirler. **Atölye sayfaları** ise tam ekran slaytlardan oluşur;
fare tekeri, ok tuşları, dokunma ya da yan noktalarla gezilir.

## Teknoloji

Saf **HTML + CSS + JavaScript**. Çerçeve, build adımı veya sunucu yoktur — site doğrudan
GitHub Pages'te yayınlanır ve tüm hesaplamalar tarayıcıda çalışır. Tek dış bağımlılıklar
Google Fonts ve `gpt-tokenizer` (CDN üzerinden) ile gerçek token sayımıdır.

Sergide **ses yoktur**: sayfa sessizdir, odak tamamen eserlerin üzerindedir.

İçerik (model değerleri, birim katsayıları, galeri, künye) `assets/js/config/` altındaki
yapılandırma dosyalarında tutulur; böylece metin ve veri, kod mantığından ayrı düzenlenebilir.

## Yerelde çalıştırma

Statik bir site olduğu için basit bir yerel sunucu yeterlidir (CDN'ler için internet gerekir):

```bash
python -m http.server 8080      # veya:  npx serve .
```

Ardından tarayıcıda `http://localhost:8080` adresini açın.

## Katkı ve proje notları

Atölyenin pedagojik planı ve kaynakları için `plans/` klasörüne bakabilirsiniz.

## Lisans ve kaynaklar

Sayılar eğitim amaçlı tahminlerdir; model, donanım, veri merkezi ve enerji kaynağına göre değişir.
Tüm kaynakça her sayfada APA biçiminde verilir. İlham: Jay Alammar — *The Illustrated Transformer*.
