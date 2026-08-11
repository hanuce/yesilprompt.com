# 🌿 Yeşil Prompt Atölyesi

Yapay zekânın görünmeyen **enerji ve su** maliyetini, gündelik birimlerle (telefon şarjı,
su şişesi, LED ampul, baraj kapasitesi) anlaşılır kılan **80 dakikalık, öğrenen merkezli**
bir atölye sitesi.

Site bir ansiklopedi değil, **akışın kendisidir**: beş fazın her birinde öğrenci okumaz,
**yapar** — tahmin eder, grafik kurar, ölçer, düzeltir, tekrar ölçer.

🔗 **Canlı site:** [yesilprompt](https://hanuce.github.io/yesilprompt.com/)

---

## 80 dakikalık akış

```
BLOK 1 (40 dk)                        BLOK 2 (40 dk)
① Giriş        12 dk  Engage         ③ Token Lab  14 dk  Explain
② Veri         22 dk  Explore        ④ Yeşil Prompt 16 dk Elaborate
   (CODAP)                           ⑤ Ölç        10 dk  Evaluate
```

| Faz | Sayfa | Öğrenci ne yapar? |
|---|---|---|
| **1 · Giriş** | `atolye.html` | İki tahmin kartını açar, 6 soruyu tartışır, kendi günlük ayak izini ölçer |
| **2 · Veri** | `veri-labi.html` | Kullanımın büyümesini okur; 2 örnek grafiği kurar, kalanını kendi kurar |
| **3 · Token Lab** | `token-lab.html` | Akışı görür, difüzyonu adımlar, parametreleri dener, promptu düzeltir |
| **4 · Yeşil Prompt** | `prompt-muhendisligi.html` | Sekiz kuralı görür, kendi resmini bir araçta **tek seferde** ürettirir |
| **5 · Ölç & Sergile** | `hesaplayici.html` | Tek görsel üretir, ölçer, damgalar, sergiye ekler |

Akış dışı: **Meraklısına** (`modeller.html`) — 80 dakikaya sığmayan ama silinmeyen içerik ·
**Kaynaklar** (`kaynaklar.html`) — materyaller, veri kümeleri ve tam kaynakça ·
**Sergi** (`index.html`) — menüsüz galeri salonu, akışın çıktı yüzeyi.

## Öğrenen merkezli yapan şey

- **🎯 Tahmin kartları** (`core/tahmin.js`) — öğrenci önce kendi sayısını yazar, sonra
  "Cevabı Gör" der. Açılan kutuda yalnızca sonuç değil, **sayının nasıl çıktığı** da vardır:
  çikolatanın suyu kakao ağacından geriye doğru, videonun enerjisi ölçülen joule'den kWh'e.
- **🎛️ Kendi ayak izini ölç** — günlük sorgu sayını, aracını ve düşünme modunu gir;
  günlük ve yıllık enerji · su · karbon çıkar.
- **🚩 Faz rayı** (`core/faz.js`) — beş faz numaralı ve sıralı. `?egitmen=1` ile eğitmene
  özel bir şerit açılır: süre bütçesi, geri sayım, ne söyleneceği ve tartışma soruları.
  **Öğrenci ekranında bu şerit ve dakika bilgisi yoktur.**

## ⛔ Site veri tutmaz

Öğrenci cevabı **toplanmaz, kaydedilmez, hiçbir yere gönderilmez.** Ne localStorage,
ne çerez, ne sunucu. Yazı kutuları öğrencinin kendi düşünmesi içindir; sayfa yenilenince
içeriği kaybolur. Takım eşleştirmesi ve tartışma sınıfta, eğitmenle yapılır.

## Listelerde yalnızca son kullanıcı ürünleri

Öğrencinin tarayıcıdan açıp gerçekten kullanabileceği araçlar listelenir: ChatGPT, Gemini,
Claude, Grok, DeepSeek, Copilot, Midjourney, Firefly, Sora, Veo… İndirilip kurulan açık
ağırlıklar ve yerel çalıştırma araçları listede **yoktur**. En çok kullanılan **beş araç
her listenin en üstünde** ayrı bir grupta durur.

ℹ️ Açık modellerin **ölçümleri** yine de kullanılır — kapalı ürünlerin sayısı onlardan
ölçeklenir ve her satırda kaynağı yazar.

## Sayıların dürüstlüğü

Sitedeki her sayının bir kaynağı vardır — ve kaynağın **türü** de sayı kadar önemlidir:

| Rozet | Anlamı | Örnek |
|---|---|---|
| 🟢 **resmî** | Üretici, sayıyı yöntemiyle birlikte yayımladı | Google (Gemini) · Meta (Llama) · DeepSeek · Mistral |
| 🟡 **beyan** | Şirket sayıyı söyledi, yöntemini yayımlamadı | OpenAI — ChatGPT 0,34 Wh |
| 🔵 **bağımsız ölçüm** | Üretici değil, araştırmacı ölçtü | HF AI Energy Score · Luccioni vd. · Shumba vd. |
| 🟠 **bağımsız tahmin** | Kimse ölçmedi; yöntemi açık bir tahmin var | Epoch AI · EcoLogits |
| ⬜ **boş** | Kimse hiçbir şey yayımlamıyor | Claude · Qwen — hücre boş bırakılır |

**Boş hücre bir eksik değil, dersin kendisidir:** Faz 2'nin son görevi tam olarak şudur —
*en çok kullandığımız modeller, hakkında en az şey bildiklerimiz.*

Atölyenin üç omurga sayısı:

- **≈ 88 kat** — aynı 10 sayfalık rapor: Llama-3-70B 0,6 L su, GPT-4 53 L (Shumba vd., 2025, hakemli).
  *En büyük kaldıraç çoğu zaman promptun değil, seçtiğin araçtır.*
- **154 kat** — aynı model, aynı soru, tek fark düşünmenin açık olması: 0,05 → 7,63 Wh
  (HF AI Energy Score v2, 2025).
- **binde 1 ↔ 2,8 kat** — iki bağımsız veri kümesi, üreticinin GPU-saatini açıkladığı yerde
  binde bir uyuşuyor, açıklamadığı yerde 2,8 kat ayrılıyor. *Sorun veride değil, kaynağında.*

## Veri kümeleri

| Dosya | İçerik | Nerede |
|---|---|---|
| `assets/data/enerji_verileri.csv` | 25 satır: fiziksel etkinlikler, YZ sorguları, model eğitimleri | Faz 2 · Görev 1-3 |
| `assets/data/modeller.csv` | 12 model: eğitim enerjisi, karbon, bölge, **şeffaflık sütunu** | Faz 2 · Görev 4-5 |

Veri analizi **CODAP**'ta yapılır (siteye ikinci bir grafik aracı yazılmaz); eğitmen yedeği
çevrimdışı **Orange Data Mining**'dir.

## Teknoloji

Saf **HTML + CSS + JavaScript**. Çerçeve, build adımı veya sunucu yoktur — site doğrudan
GitHub Pages'te yayınlanır ve tüm hesaplamalar tarayıcıda çalışır. Tek dış bağımlılıklar
Google Fonts ve `gpt-tokenizer` (CDN) ile gerçek token sayımıdır.

İçerik (model değerleri, birim katsayıları, tahmin kartları, CODAP görevleri, turnuva turları,
galeri, künye) `assets/js/config/` altındaki yapılandırma dosyalarında tutulur; böylece metin
ve veri, kod mantığından ayrı düzenlenebilir.

Sitede **ses yoktur**.

## Yerelde çalıştırma

```bash
python -m http.server 8080      # veya:  npx serve .
```

Ardından `http://localhost:8080`. Eğitmen modu için: `.../atolye.html?egitmen=1`

## Katkı ve proje notları

- **`SITE_RULES.md`** — sitenin yapısı, geliştirme kuralları ve içerik rehberi.
  Düzenleme yapmadan önce buraya bakılması, sonrasında gerekiyorsa güncellenmesi beklenir.
- **`plans_datasets/atolye_plani_v3.md`** — atölyenin pedagojik planı (faz faz, dakika dakika).

## Lisans ve kaynaklar

Sayılar eğitim amaçlı tahminlerdir; model, donanım, veri merkezi ve enerji kaynağına göre
değişir. Tüm kaynakça `kaynaklar.html` sayfasında APA biçiminde verilir.
İlham: Jay Alammar — *The Illustrated Transformer*.
