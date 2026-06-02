# 🌿 Yeşil Prompt Atölyesi

Yapay zekânın **enerji ve su** maliyetini anlaşılır birimlerle (telefon şarjı, video izleme süresi,
LED ampul, TR baraj kapasitesi) gösteren **çok sayfalı** interaktif eğitim sitesi.
Saf HTML/CSS/JS — **çerçeve yok, build yok, sunucu yok**. Yeşilay tarzı beyaz/yeşil tema.

## Sayfalar (her menü = ayrı sayfa)
| Dosya | Menü | İçerik |
|---|---|---|
| `index.html` | **Giriş** | Tanıtım, yol haritası, "görünmeyen buzdağı", atölye akışı |
| `modeller.html` | **Modeller & Tarih** | Model/eğitim/kullanım farkı, token, zaman tüneli, eğitim maliyeti (baraj birimi), neden ~8–10 firma |
| `token-hesaplayici.html` | **Token Hesaplayıcı** | Canlı tokenizer, enerji & su hesaplayıcı, yeşil prompt kuralları |
| `metin-vs-gorsel.html` | **Metin vs Görsel** | Difüzyon simülasyonu, neden görsel pahalı, birimli karşılaştırma |
| `gorsel-vs-video.html` | **Görsel vs Video** | Video = görsel + zaman; video maliyet hesaplayıcı |

Her sayfa **tam ekran slaytlardan** oluşur: fare tekeri / ok tuşları / dokunma / yan noktalar /
alt ileri-geri ile her harekette **tek slayt** kayar (scroll-snap kilidi).

## 🗂️ Dosya yapısı — neyi nereden düzenlersin
```
assets/
├── css/
│   ├── theme.css            # 🎨 RENKLER & görünüm (Yeşilay beyaz/yeşil) — en üstteki :root
│   └── fullpage.css         # slayt düzeni (genelde dokunmana gerek yok)
├── js/
│   ├── config/                       ⭐ EN ÇOK BURAYI DÜZENLERSİN
│   │   ├── units.config.js  # 📱 telefon, 💡 LED, 📺 video, 🏞️ baraj, 💧 su, 🏭 CO₂ katsayıları
│   │   └── models.config.js # metin/görsel/video modellerinin enerji değerleri
│   ├── core/                         (paylaşılan motor — dokunmana gerek yok)
│   │   ├── fullpage.js      # slayt geçiş motoru
│   │   ├── units.js         # Wh → anlaşılır birim çevirici
│   │   ├── tokenize.js      # token sayma yardımcısı
│   │   ├── tokenizer.module.js  # gerçek tokenizer (CDN)
│   │   └── nav.js           # mobil menü
│   └── pages/                        (her sayfanın kendi mantığı — ayrı ayrı)
│       ├── giris.js
│       ├── modeller.js      # zaman tüneli + eğitim kartları (TIMELINE, TRAINING dizileri)
│       ├── token-hesaplayici.js  # tokenizer lab + hesaplayıcı + kurallar
│       ├── metin-vs-gorsel.js    # difüzyon + karşılaştırma
│       └── gorsel-vs-video.js    # video hesaplayıcı
└── data/
    └── enerji_verileri.csv  # CODAP veri seti (gerçek kaynaklı)
```

### Sık yapılan düzenlemeler (JS bilmeden)
- **Birim katsayıları** (örn. telefon şarjı kaç Wh, hangi barajlar): `assets/js/config/units.config.js`.
- **Model enerji değerleri / yeni model**: `assets/js/config/models.config.js`.
- **Renk teması**: `assets/css/theme.css` → en üstteki `:root` bloğundaki `--green-*` vb.
- **Slayt metinleri**: doğrudan ilgili `.html` dosyasındaki `<section class="fp-section">` bloğu.
- **Zaman tüneli / eğitim maliyeti satırları**: `assets/js/pages/modeller.js` (`TIMELINE`, `TRAINING`).

> Düzenlerken tırnak `"`, virgül `,` ve süslü parantez `{ }` dengesini bozma — JS bunlara duyarlıdır.

## Yerelde çalıştırma (CDN'ler için internet gerekir)
```bash
python -m http.server 8080      # veya:  npx serve .
```
`http://localhost:8080` → tarayıcıda aç.

## GitHub Pages'e deploy
**Basit yol:** Bu klasörün içeriğini bir GitHub deposunun **köküne** koy (`index.html` kökte olmalı):
```bash
git init && git add . && git commit -m "Yeşil Prompt Atölyesi"
git branch -M main
git remote add origin https://github.com/<kullanici>/<repo>.git
git push -u origin main
```
GitHub → **Settings → Pages → Source: Deploy from a branch → main / (root)**.
Birkaç dakika sonra: `https://<kullanici>.github.io/<repo>/`

Alternatif: `.github/workflows/deploy.yml` dahildir; Pages kaynağını **GitHub Actions** seçersen push'ta otomatik yayınlar.

## Teknoloji
Bootstrap/Vue **yok** — bilinçli olarak sade tutuldu. Sadece: Google Fonts + `gpt-tokenizer` (CDN).
Tüm hesaplar tarayıcıda çalışır. Sayılar **eğitim amaçlı tahminlerdir**.
