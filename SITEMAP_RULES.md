# SITEMAP & KURALLAR — Yeşil Prompt Atölyesi

Bu dosya sitenin **mevcut yapısını** ve **değiştirilemez kurallarını** kaydeder.
Sonraki düzenlemelerde önce buraya bakılır; her yeni düzenleme bu kurallara uymalı
ve gerekiyorsa bu dosya güncellenmelidir.

---

## 1) ALTIN KURALLAR (bozulmayacak)

1. **Hiçbir yerde inline CSS yok.** HTML etiketlerinde ve JS string'lerinde `style="..."`
   **kullanılmaz**. Tüm görünüm yalnızca `assets/css/style.css` içindedir.
   - Dinamik ölçüler (bar genişliği, slayt yüksekliği, SVG nokta koordinatları) **çalışma
     zamanında JS ile** uygulanır (ör. `el.style.width`, SVG `points`/`cx` *attribute*'leri).
     Bu, yazılı markup'ta inline stil **değildir** ve serbesttir.
2. **Site tasarımına / palete dokunma.** Renk, yazı tipi, ölçü değişkenleri (`:root`) ve
   mevcut bileşen kuralları korunur. Yeni stil gerekiyorsa **ekleme** yapılır (mevcut kural
   ezilmez); `style.css` sonundaki numaralı "EK BİLEŞENLER" bölümü bunun içindir.
3. **İçerik config-driven.** Metin/veri `assets/js/config/*.config.js` içinde tutulur;
   render mantığı `assets/js/pages/*.js` içindedir. Kod bilmeden içerik düzenlenebilir.
   (İstisna: kod örneği / animasyon gibi yapısal içerik ilgili `.html` içinde statik olabilir.)
4. **Uydurma veri yok.** Sayılar atıflı/gerçek olmalı; tahminse açıkça "tahmin" yazılmalı.
5. **Slayt motoru ortak.** Her sayfa `.fp-root > .fp-track > .fp-section` yapısını kullanır;
   `fullpage.js` slaytları, nokta göstergesini ve okları **otomatik** kurar (sabit sayı yok,
   slayt ekle/çıkar serbest). Animasyonlar `.fp-section.active ...` ile tetiklenmelidir.

---

## 2) SAYFALAR (nav menüsü sırası)

| Dosya | Menü adı | Sayfa JS | Ana config |
|---|---|---|---|
| `index.html` | Giriş | `pages/giris.js` | `site.config.js` |
| `modeller.html` | Modeller & Tarih | `pages/modeller.js` | `timeline`, `training`, `families`, `valuations` |
| `token-lab.html` | Token Lab | `pages/token-lab.js` | `units`, `models` |
| `prompt-muhendisligi.html` | Prompt Mühendisliği | `pages/prompt-muhendisligi.js` | (JS içi diziler) |
| `sergi.html` | Yeşil Prompt Resim Sergisi | `pages/sergi.js` | `site.config.js` |

Ortak/altyapı JS: `core/fullpage.js` (slayt motoru), `core/nav.js` (mobil menü),
`core/units.js` (+`units.config.js`), `core/print.js`, `core/tokenize.js`,
`core/tokenizer.module.js`.

---

## 3) modeller.html — SLAYT SIRASI (güncel)

1. **Tarihçe** (`#tarih`) — zaman tüneli → `AI_TIMELINE` (`timeline.config.js`).
   Özet duraklar: 1950, 1956, **Yapay Zeka Kışı (1974–1993)**, 2012, 2017,
   **2018–2020 Modern öncü LLM'ler**, **2022–Günümüz Yapay Zeka Patlaması**.
2. **Transformer teknolojisi nedir?** (`#transformer`) — *statik*. Transformer'ın
   sağladıkları (dikkat / paralellik / ölçek) + **CPU·GPU·NPU donanım** kartları
   (eski ayrı "CPU/GPU/NPU" slaytı buraya birleştirildi, kaldırıldı).
3. **Model nedir, nasıl eğitilir?** (`#model-nedir`) — *statik*. Üç parça:
   **Model** (örnek pseudo Python kodu, `.code-box`), **Veri** (örnek eğitim verisi:
   girdi → hedef), **Eğitim** (epoch animasyonu `.epoch-track`/`.epoch-tok`,
   verinin baştan sona okunup öğrenilmesi).
4. **Veri** (`#veri-gpt3`) — GPT-3 veri karışımı tablosu → `GPT3_DATA`.
5. **Veri projeleri** (`#veri-projeleri`) → `DATA_PROJECTS`.
6. **Eğitim enerjisi** (`#egitim-enerjisi`) → `TRAINING_COSTS`. Bilinen modeller:
   GPT, Llama, Claude, Qwen, DeepSeek. **BLOOM yok.** ("tahmin" işaretliler resmî değil.)
7. **Güvenlik & etik** (`#guvenlik`) — *statik* (RLHF, Anayasal YZ, kırmızı takım, filtre).
8. **Model aileleri** (`#aileler`) → `MODEL_FAMILIES` (`families.config.js`).
9. **Yapay Zeka Çağı** (`#cag`) → `AI_ERA` (`valuations.config.js`):
   - `impacts`: YZ'nın gerçek yaşam etkileri (eğitim, üretim, istihdam, savunma, sağlık, günlük yaşam).
   - `series` + `years`: **yıllara göre eğim** (tek tam-genişlik SVG çizgi grafiği, 2019–2026) —
     NVIDIA, OpenAI, Anthropic + kıyas için **T.C. Ekonomi Büyüklüğü (GSYİH)** ve
     **TCMB Rezervi**. Her serinin `key`'i CSS renk sınıfını (`era-<key>`) verir.
     (Eski "Kaç yılda nereden nereye" milestones kartı kaldırıldı.)
10. **Kaynakça (APA)** (`#kaynakca`) — *statik*.

> Not: 9. slayt eski "Yapay Zeka Rallisi / en pahalı şirketler" slaytının yerini aldı
> (bar grafiği → çizgi grafiği + etki kartları). Eski `RALLY` ve `TRAINING_FACTS`
> config'leri kullanımdan kaldırıldı.

---

## 4) prompt-muhendisligi.html — NOTLAR

- Slaytlar: Nedir → **Shot tipleri** → İyi promptun parçaları → Önce/Sonra → Kurallar → Kaynakça.
- **Shot tipleri (zero/one/few)** örnekleri **resim çizdirme** üzerinden verilir
  (atölyede resim üreteceğimiz için). İçerik `pages/prompt-muhendisligi.js` → `SHOTS`.

---

## 5) STYLE.CSS — BÖLÜM HARİTASI

`1) Değişkenler` · `2) Temel` · `3) Yazı` · `4) Navbar` · `5) Butonlar` · `6) Kart/çip/ızgara` ·
`7) Metrik` · `8) Tablo` · `9) Form` · `10) Rozet/segment/token` · `11) Slayt motoru` ·
`12) Slayt kontrolü` · `13) Yardımcı düzen` · `14) Bileşenler` ·
**`15) Ek bileşenler`** (modeller: `.code-box`, `.epoch-track`/`.epoch-tok` + `epochSweep`,
`.era-chart`/`.era-line`/`.era-legend` + `eraDraw`). Animasyonlar `prefers-reduced-motion`
ile kapanır.

Yeni stil eklerken: önce 14/15. bölümdeki mevcut sınıfları **yeniden kullan**; gerçekten
yeni gerekiyorsa 15. bölüme **eklemeli** kural yaz, mevcut kuralları ezme.
