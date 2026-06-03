# 🌿 Yeşil Prompt Atölyesi

Yapay zekânın **enerji ve su** maliyetini anlaşılır birimlerle (telefon şarjı, video izleme süresi,
LED ampul, TR baraj kapasitesi) gösteren **çok sayfalı** interaktif eğitim sitesi.
Saf HTML/CSS/JS — **çerçeve yok, build yok, sunucu yok**. Beyaz/yeşil tema.

> **Stil kuralı:** Tüm görünüm yalnızca `assets/css/style.css` dosyasından gelir.
> HTML etiketlerinde ve JS içinde **hiçbir satır-içi (inline) stil yoktur.**

## Sayfalar (her menü = ayrı sayfa)
| Dosya | Menü | İçerik |
|---|---|---|
| `index.html` | **Giriş** | Tanıtım, etik sorular, künye, materyal & kaynak havuzu |
| `modeller.html` | **Modeller & Tarih** | Turing→Transformer tarihçesi, model/veri/eğitim/epoch, güvenlik & etik, CPU/GPU/NPU, model aileleri (logo+ülke), Yapay Zeka Rallisi |
| `token-lab.html` | **Token Lab** | Token nedir, canlı tokenizer, çok dillilik, enerji & su hesaplayıcı (metin/görsel/video + efor), çıktı maliyeti |
| `prompt-muhendisligi.html` | **Prompt Mühendisliği** | Shot tipleri, iyi promptun parçaları, önce/sonra, Yeşil Prompt Kuralları |
| `sergi.html` | **Yeşil Prompt Resim Sergisi** | Kürasyonlu galeri; her eserde enerji damgası |

Her sayfa **tam ekran slaytlardan** oluşur: fare tekeri / ok tuşları / dokunma / yan noktalar /
**sağ-alttaki dikey ileri-geri** kontrolüyle her harekette tek slayt kayar.

## 🗂️ Dosya yapısı — neyi nereden düzenlersin
```
assets/
├── css/
│   └── style.css            # 🎨 TÜM görünüm tek dosyada. En üstte :root renkleri + bölüm başlıkları
├── img/
│   ├── logos/               # model aile logoları (chatgpt.svg, gemini.svg … buraya at)
│   └── galeri/              # sergi görselleri (öğrenci eserleri buraya)
├── js/
│   ├── config/                       ⭐ EN ÇOK BURAYI DÜZENLERSİN
│   │   ├── units.config.js      # 📱 telefon, 💡 LED, 📺 video, 🏞️ baraj, 💧 su, 🏭 CO₂ katsayıları
│   │   ├── models.config.js     # metin/görsel/video modelleri + EFOR seviyeleri + max output
│   │   ├── families.config.js   # model aileleri: ad, logo, ülke, tanıtım
│   │   ├── valuations.config.js # Yapay Zeka Rallisi: şirket değerleri + zaman çizelgesi
│   │   ├── timeline.config.js   # tarihsel zaman çizelgesi (Turing→…)
│   │   ├── training.config.js   # eğitim verisi, epoch, enerji, veri projeleri
│   │   └── site.config.js       # künye, materyal havuzu, galeri öğeleri
│   ├── core/                         (paylaşılan motor — dokunmana gerek yok)
│   │   ├── fullpage.js          # slayt geçiş motoru (sağ-alt dikey kontrol)
│   │   ├── units.js             # Wh → anlaşılır birim çevirici
│   │   ├── tokenize.js          # token sayma yardımcısı
│   │   ├── tokenizer.module.js  # gerçek tokenizer (CDN)
│   │   ├── print.js             # "Kartı yazdır" düğmesi
│   │   └── nav.js               # mobil menü
│   └── pages/                        (her sayfanın kendi mantığı)
│       ├── giris.js
│       ├── modeller.js
│       ├── token-lab.js
│       ├── prompt-muhendisligi.js
│       └── sergi.js
└── data/
    └── enerji_verileri.csv      # CODAP veri seti (gerçek kaynaklı)
```

### Sık yapılan düzenlemeler (JS bilmeden)
- **Renk teması**: `assets/css/style.css` → en üstteki `:root` bloğundaki `--green-*` vb.
- **Birim katsayıları** (telefon şarjı kaç Wh, hangi barajlar): `assets/js/config/units.config.js`.
- **Model enerji değerleri / efor seviyeleri**: `assets/js/config/models.config.js`.
- **Model aileleri + logolar**: `assets/js/config/families.config.js` (+ logoyu `assets/img/logos/`).
- **Şirket değerleri (rally)**: `assets/js/config/valuations.config.js`.
- **Künye / materyal havuzu / galeri**: `assets/js/config/site.config.js`.
- **Slayt metinleri**: doğrudan ilgili `.html` dosyasındaki `<section class="fp-section">` bloğu.

> Düzenlerken tırnak `"`, virgül `,` ve süslü parantez `{ }` dengesini bozma — JS bunlara duyarlıdır.

## Yerelde çalıştırma (CDN'ler için internet gerekir)
```bash
python -m http.server 8080      # veya:  npx serve .
```
`http://localhost:8080` → tarayıcıda aç.

## Teknoloji
Bootstrap/Vue **yok** — bilinçli olarak sade tutuldu. Sadece: Google Fonts + `gpt-tokenizer` (CDN).
Tüm hesaplar tarayıcıda çalışır. Sayılar **eğitim amaçlı tahminlerdir**, kaynakça her sayfada APA biçiminde verilir.
