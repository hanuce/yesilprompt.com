# SITE_RULES — Yeşil Prompt Atölyesi

Bu belge, sitenin **mevcut yapısını**, **geliştirme kurallarını** ve **içerik düzenleme
rehberini** tek yerde toplar. Amaç, projeyi ilk kez açan birinin de önceki bir konuşma ya da
geçmiş bilgisine ihtiyaç duymadan kuralları anlayabilmesidir. Bu yüzden her kural, **neden var
olduğu** bağlamıyla birlikte ve **ne yapılır / ne yapılmaz** olarak açık biçimde yazılmıştır.

Yeni bir düzenleme yapmadan önce bu belgeye bakılması, düzenleme sonrası gerekiyorsa bu belgenin
güncellenmesi beklenir.

---

## 1) ALTIN KURALLAR

Bunlar sitenin tutarlılığını koruyan temel ilkelerdir.

### 1.1 — Stil yalnızca tek CSS dosyasından gelir
**Neden:** Görünümün tek bir yerden yönetilmesi, temanın bozulmadan büyümesini sağlar.

- ✅ **Yapılır:** Tüm görsel kurallar `assets/css/style.css` içinde tutulur.
- ❌ **Yapılmaz:** HTML etiketlerinde ve JS string'lerinde yazılı `style="..."` (satır-içi / inline
  CSS) bulunmaz.
- ℹ️ **İstisna (inline değildir, serbesttir):** Çalışma zamanında JS ile hesaplanan dinamik
  ölçüler — bar genişliği (`el.style.width`), slayt yüksekliği, SVG nokta koordinatları
  (`points` / `cx` *attribute*'leri) — markup'a yazılmış inline stil sayılmaz; bunlar serbesttir.

### 1.2 — Mevcut tasarıma ve palete dokunulmaz
**Neden:** Renk, tipografi ve ölçü değişkenleri sitenin kimliğidir; var olan kuralın ezilmesi her
yere yayılan kırılmalar doğurur.

- ✅ **Yapılır:** Yeni bir görünüm gerekiyorsa `style.css` sonundaki numaralı **"Ek bileşenler"**
  bölümüne **ekleme** yapılır.
- ❌ **Yapılmaz:** `:root` içindeki renk / yazı tipi / ölçü değişkenleri ve mevcut bileşen kuralları
  değiştirilmez ya da ezilmez.

### 1.3 — İçerik config-driven'dır
**Neden:** Metin ve verinin koddan ayrılması, kod bilmeyen birinin de içeriği düzenleyebilmesini
sağlar.

- ✅ **Yapılır:** Metin ve veri `assets/js/config/*.config.js` içinde; render mantığı
  `assets/js/pages/*.js` içinde tutulur.
- ℹ️ **İstisna:** Kod örneği veya animasyon gibi **yapısal** içerik, ilgili `.html` dosyasında statik
  olarak durabilir (config'e taşınması anlamsız olduğunda).

### 1.4 — Uydurma veri kullanılmaz
**Neden:** Site bir farkındalık aracıdır; güvenilirliği atıflı sayılara dayanır.

- ✅ **Yapılır:** Sayılar gerçek ve atıflı olur; tahminse açıkça **"tahmin"** olarak işaretlenir.
- ❌ **Yapılmaz:** Kaynaksız ya da uydurma (pseudo) değerler eklenmez.

### 1.5 — Slayt motoru ortaktır
**Neden:** Tüm sayfaların aynı geçiş davranışını paylaşması, slayt ekleyip çıkarmayı kolaylaştırır.

- ✅ **Yapılır:** Her sayfa `.fp-root > .fp-track > .fp-section` yapısını kullanır; `fullpage.js`
  slaytları, nokta göstergesini ve okları otomatik kurar — sabit slayt sayısı yoktur, slayt
  eklemek/çıkarmak serbesttir.
- ✅ **Yapılır:** Slayt animasyonları `.fp-section.active ...` seçicisiyle tetiklenir.

---

## 2) SAYFALAR (nav menüsü sırası)

| Dosya | Menü adı | Sayfa JS | Ana config |
|---|---|---|---|
| `index.html` | Giriş | `pages/giris.js` | `site.config.js` |
| `modeller.html` | Modeller & Tarih | `pages/modeller.js` | `timeline`, `training`, `families`, `valuations` |
| `token-lab.html` | Token Lab | `pages/token-lab.js` | `units`, `models` |
| `prompt-muhendisligi.html` | Prompt Mühendisliği | `pages/prompt-muhendisligi.js` | (JS içi diziler) |
| `sergi.html` | Yeşil Prompt Resim Sergisi | `pages/sergi.js` | `site.config.js` |

Ortak / altyapı JS (sayfaya özel değildir, dokunulması nadiren gerekir):
`core/fullpage.js` (slayt motoru), `core/nav.js` (mobil menü),
`core/units.js` + `units.config.js` (Wh → gündelik birim çevirici), `core/print.js` (kart yazdırma),
`core/tokenize.js` ve `core/tokenizer.module.js` (token sayımı, CDN tokenizer).

---

## 3) DOSYA YAPISI — neyi nereden düzenlersin

```
assets/
├── css/
│   └── style.css            # TÜM görünüm tek dosyada. En üstte :root renkleri + bölüm başlıkları
├── img/
│   ├── logos/               # model aile logoları (chatgpt.svg, gemini.svg …)
│   └── galeri/              # sergi görselleri (öğrenci eserleri)
├── js/
│   ├── config/              # İÇERİK BURADA — kod bilmeden düzenlenir
│   │   ├── units.config.js      # telefon, LED, video, baraj, su, CO₂ katsayıları
│   │   ├── models.config.js     # metin/görsel/video modelleri + efor seviyeleri + max output
│   │   ├── families.config.js   # model aileleri: ad, logo, ülke, tanıtım
│   │   ├── valuations.config.js # sektör büyümesi: şirket değerleri + zaman çizelgesi
│   │   ├── timeline.config.js   # tarihsel zaman çizelgesi (Turing→…)
│   │   ├── training.config.js   # eğitim verisi, epoch, enerji, veri projeleri
│   │   └── site.config.js       # künye, materyal havuzu, galeri öğeleri
│   ├── core/                # paylaşılan motor — genelde dokunulmaz
│   └── pages/               # her sayfanın kendi render mantığı
└── data/
    └── enerji_verileri.csv  # CODAP veri seti (gerçek kaynaklı)
```

### Sık yapılan düzenlemeler (JS bilmeden)
- **Renk teması:** `assets/css/style.css` → en üstteki `:root` bloğundaki `--green-*` vb.
- **Birim katsayıları** (telefon şarjı kaç Wh, hangi barajlar): `units.config.js`.
- **Model enerji değerleri / efor seviyeleri:** `models.config.js`.
- **Model aileleri + logolar:** `families.config.js` (+ logoyu `assets/img/logos/`).
- **Şirket değerleri:** `valuations.config.js`.
- **Künye / materyal havuzu / galeri:** `site.config.js`.
- **Slayt metinleri:** doğrudan ilgili `.html` dosyasındaki `<section class="fp-section">` bloğu.

> ⚠️ Config düzenlerken tırnak `"`, virgül `,` ve süslü parantez `{ }` dengesini koru — JS bu
> karakterlere duyarlıdır; biri eksik olursa sayfa yüklenmez.

---

## 4) modeller.html — SLAYT SIRASI

Sayfanın güncel slayt akışı ve her slaytın hangi config'ten beslendiği aşağıdadır.

1. **Tarihçe** (`#tarih`) — zaman tüneli → `AI_TIMELINE` (`timeline.config.js`).
   Özet duraklar: 1950, 1956, Yapay Zeka Kışı (1974–1993), 2012, 2017,
   2018–2020 modern öncü LLM'ler, 2022–Günümüz yapay zeka patlaması.
2. **Transformer teknolojisi nedir?** (`#transformer`) — *statik*. Transformer'ın sağladıkları
   (dikkat / paralellik / ölçek) + **CPU·GPU·NPU donanım** kartları. Donanım içeriği bu slaytın
   parçasıdır; ayrı bir donanım slaytı **yoktur**.
3. **Model nedir, nasıl eğitilir?** (`#model-nedir`) — *statik*. Üç parça: **Model** (örnek pseudo
   Python kodu, `.code-box`), **Veri** (girdi → hedef örneği), **Eğitim** (epoch animasyonu
   `.epoch-track` / `.epoch-tok`).
4. **Veri** (`#veri-gpt3`) — GPT-3 veri karışımı tablosu → `GPT3_DATA`.
5. **Veri projeleri** (`#veri-projeleri`) → `DATA_PROJECTS`.
6. **Eğitim enerjisi** (`#egitim-enerjisi`) → `TRAINING_COSTS`. Listelenen modeller:
   GPT, Llama, Claude, Qwen, DeepSeek. BLOOM bu listede **yer almaz**. Resmî olmayan değerler
   "tahmin" olarak işaretlidir.
7. **Güvenlik & etik** (`#guvenlik`) — *statik* (RLHF, Anayasal YZ, kırmızı takım, filtre).
8. **Model aileleri** (`#aileler`) → `MODEL_FAMILIES` (`families.config.js`).
9. **Yapay Zeka Çağı** (`#cag`) → `AI_ERA` (`valuations.config.js`):
   - `impacts`: YZ'nin gerçek yaşam etkileri (eğitim, üretim, istihdam, savunma, sağlık, günlük yaşam).
   - `series` + `years`: yıllara göre eğim (tek tam-genişlik SVG çizgi grafiği, 2019–2026) —
     NVIDIA, OpenAI, Anthropic + kıyas için T.C. Ekonomi Büyüklüğü (GSYİH) ve TCMB Rezervi.
     Her serinin `key`'i CSS renk sınıfını (`era-<key>`) belirler.
10. **Kaynakça (APA)** (`#kaynakca`) — *statik*.

---

## 5) prompt-muhendisligi.html — NOTLAR

- Slayt akışı: Nedir → **Shot tipleri** → İyi promptun parçaları → Önce/Sonra → Kurallar → Kaynakça.
- **Shot tipleri (zero/one/few)** örnekleri **resim çizdirme** üzerinden anlatılır — atölyede
  görsel üretileceği için örneklerin görselle hizalı olması istenir. İçerik:
  `pages/prompt-muhendisligi.js` → `SHOTS`.

---

## 6) style.css — BÖLÜM HARİTASI

`1) Değişkenler` · `2) Temel` · `3) Yazı` · `4) Navbar` · `5) Butonlar` · `6) Kart/çip/ızgara` ·
`7) Metrik` · `8) Tablo` · `9) Form` · `10) Rozet/segment/token` · `11) Slayt motoru` ·
`12) Slayt kontrolü` · `13) Yardımcı düzen` · `14) Bileşenler` ·
**`15) Ek bileşenler`** (modeller: `.code-box`, `.epoch-track` / `.epoch-tok` + `epochSweep`,
`.era-chart` / `.era-line` / `.era-legend` + `eraDraw`).

- ✅ **Yapılır:** Yeni stil eklerken önce 14/15. bölümdeki mevcut sınıflar **yeniden kullanılır**;
  gerçekten yeni gerekiyorsa 15. bölüme **ekleme** yapılır.
- ✅ **Yapılır:** Tüm animasyonlar `prefers-reduced-motion` ile kapanacak şekilde tanımlanır
  (erişilebilirlik için).
- ❌ **Yapılmaz:** Mevcut bölümlerdeki kurallar ezilmez.

---

## 7) İÇERİK İLKELERİ (pedagojik notlar)

Sitedeki bilgilerin doğruluğunu korumak için aşağıdaki içerik ilkeleri geçerlidir. Ayrıntılı plan
ve kaynaklar `plans/` klasöründedir.

- **Eğitim ≠ Kullanım ayrımı korunur.** Bir modeli baştan eğitmek (training) tek seferlik ama dev
  bir maliyettir; her sorgu (inference) küçük ama milyarlarca kez tekrarlanır. İkisi ayrı sunulur.
- **Çıktı token'ı girdi token'ından pahalıdır.** Girdi toplu işlenir (prefill); çıktı tek tek
  üretilir (decode). Hesaplayıcı ve metinler bu farkı yansıtır.
- **Görsel/video metinden çok daha pahalıdır.** Difüzyon modeli her görseli çok adımda üretir;
  bu fark açıkça gösterilir.
- **"Çeviri yok" miti düzeltilir.** Modeller girdiyi önce İngilizceye çevirmez; tokenizer metni
  kendi dilinde doğrudan parçalar. Türkçe "token cezası" abartılmadan, **canlı ölçümle** gösterilir.
- **"Düşünme" her modelde vardır.** Mesele düşünmenin var/yok olması değil, **ne kadar düşünüldüğüdür**
  (thinking budget). Basit işte düşünmeyi kısmak boşa enerjiyi önler.
- **Prompt mühendisliğinin mesajı "en kısa prompt" değil, "en az toplam maliyet"tir:**
  Toplam ≈ Girdi + Çıktı + (Deneme × üretim) + (Düşünme bütçesi). Net ama biraz uzun bir prompt,
  belirsiz kısa bir prompttan toplamda daha verimlidir.
