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

### 1.5 — Slayt motoru ATÖLYE sayfalarında ortaktır
**Neden:** Atölye sayfalarının aynı geçiş davranışını paylaşması, slayt ekleyip çıkarmayı
kolaylaştırır. Sergi ise bir slayt gösterisi değil, gezilen bir salondur.

- ✅ **Yapılır:** Her **atölye** sayfası `.fp-root > .fp-track > .fp-section` yapısını kullanır;
  `fullpage.js` slaytları, nokta göstergesini ve okları otomatik kurar — sabit slayt sayısı
  yoktur, slayt eklemek/çıkarmak serbesttir.
- ✅ **Yapılır:** Slayt animasyonları `.fp-section.active ...` seçicisiyle tetiklenir.
- ℹ️ **Sayfa içi bağlantı:** `<a href="#slayt-id">` yazmak yeterlidir; `fullpage.js` tıklamayı
  yakalayıp o slayta geçer. Ayrıca `onclick` yazmaya gerek yoktur.
- ⚠️ **TEK İSTİSNA — `index.html` (sergi):** Anasayfa slayt motorunu **kullanmaz**, normal
  kaydırılır. Sergi bir galeri salonudur; eserler tek akışta gezilir. `fullpage.js` bu sayfaya
  hiç yüklenmez. Görünümü 16. CSS bölümündedir.

---

## 2) SAYFALAR (nav menüsü sırası)

Anasayfa **doğrudan sergidir**. Atölyenin tamamına buradaki "Atölyeye gir" tuşundan
ya da menüden geçilir.

| Dosya | Menü adı | Sayfa JS | Ana config | Slayt motoru |
|---|---|---|---|---|
| `index.html` | *(menüsüz — sergi salonu)* | `pages/anasayfa.js` | `site.config.js` (`SERGI`, `GALLERY`, `AMBIENT`) | ❌ normal kaydırma |
| `atolye.html` | Atölye Girişi | `pages/giris.js` | `site.config.js` (`KUNYE`, `MATERIALS`) | ✅ |
| `modeller.html` | Modeller & Tarih | `pages/modeller.js` | `timeline`, `training`, `families`, `valuations` | ✅ |
| `token-lab.html` | Token Lab | `pages/token-lab.js` | `units`, `models` | ✅ |
| `prompt-muhendisligi.html` | Prompt Mühendisliği | `pages/prompt-muhendisligi.js` | (JS içi diziler) | ✅ |
| `hesaplayici.html` | Hesaplayıcı | `pages/hesaplayici.js` | `imagetools`, `units` | ✅ |

Ortak / altyapı JS (sayfaya özel değildir, dokunulması nadiren gerekir):
`core/fullpage.js` (slayt motoru), `core/nav.js` (mobil menü),
`core/units.js` + `units.config.js` (Wh → gündelik birim çevirici), `core/print.js` (kart yazdırma),
`core/tokenize.js` ve `core/tokenizer.module.js` (token sayımı, CDN tokenizer),
`core/ambient.js` (sergi fon müziği — yalnızca anasayfada yüklenir).

---

## 3) DOSYA YAPISI — neyi nereden düzenlersin

```
assets/
├── css/
│   └── style.css            # TÜM görünüm tek dosyada. En üstte :root renkleri + bölüm başlıkları
├── img/
│   └── galeri/              # sergi görselleri (öğrenci eserleri)
├── js/
│   ├── config/              # İÇERİK BURADA — kod bilmeden düzenlenir
│   │   ├── units.config.js      # telefon, LED, video, baraj, su, CO₂ katsayıları
│   │   ├── models.config.js     # Token Lab: metin/görsel/video öğretim modelleri + efor + max output
│   │   ├── imagetools.config.js # Hesaplayıcı: görsel araç listesi + Wh + dayanak + boyutlar
│   │   ├── families.config.js   # model aileleri: ad, kurum, ülke, tanıtım
│   │   ├── valuations.config.js # sektör büyümesi: şirket değerleri + zaman çizelgesi
│   │   ├── timeline.config.js   # tarihsel zaman çizelgesi (Turing→…)
│   │   ├── training.config.js   # eğitim verisi, epoch, enerji, veri projeleri
│   │   └── site.config.js       # SERGİ metni, künye, materyal havuzu, eserler, FON MÜZİĞİ
│   ├── core/                # paylaşılan motor — genelde dokunulmaz
│   │   └── ambient.js           # sergi fon müziği (Web Audio ile üretilir, dosya yok)
│   └── pages/               # her sayfanın kendi render mantığı
│       └── anasayfa.js          # sergi ızgarası + lightbox + müzik düğmesi
└── data/
    └── enerji_verileri.csv  # CODAP veri seti (gerçek kaynaklı)
```

### Sık yapılan düzenlemeler (JS bilmeden)
- **Renk teması:** `assets/css/style.css` → en üstteki `:root` bloğundaki `--green-*` vb.
- **Birim katsayıları** (telefon şarjı kaç Wh, hangi barajlar): `units.config.js`.
- **Model enerji değerleri / efor seviyeleri:** `models.config.js`.
- **Model aileleri:** `families.config.js` (kartlar bayrak emojisiyle çizilir; logo dosyası kullanılmaz).
- **Şirket değerleri:** `valuations.config.js`.
- **Künye / materyal havuzu / eserler / sergi metni / fon müziği:** `site.config.js`.
- **Slayt metinleri:** doğrudan ilgili `.html` dosyasındaki `<section class="fp-section">` bloğu.
- **Yeni eser eklemek:** görseli `assets/img/galeri/` klasörüne at, `site.config.js` →
  `GALLERY` listesine bir satır ekle (`title`, `img`, `prompt`, `model`, `attempts`, `wh`;
  `by` isteğe bağlı). Serginin toplam enerji/su künyesi otomatik güncellenir — elle yazma.

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
   GPT, Llama, Claude, Qwen, DeepSeek. BLOOM bu listede **yer almaz** — bu karar
   `assets/data/enerji_verileri.csv` için de geçerlidir; iki kaynak birbiriyle tutarlı tutulur.
   Resmî olmayan değerler "tahmin" olarak işaretlidir.
7. **Güvenlik & etik** (`#guvenlik`) — *statik* (RLHF, Anayasal YZ, kırmızı takım, filtre).
8. **Model aileleri** (`#aileler`) → `MODEL_FAMILIES` (`families.config.js`).
9. **Yapay Zeka Çağı** (`#cag`) → `AI_ERA` (`valuations.config.js`):
   - `impacts`: YZ'nin gerçek yaşam etkileri (eğitim, üretim, istihdam, savunma, sağlık, günlük yaşam).
   - `series` + `years`: yıllara göre eğim (tek tam-genişlik SVG çizgi grafiği, 2019–2026) —
     NVIDIA, OpenAI, Anthropic + kıyas için T.C. Ekonomi Büyüklüğü (GSYİH) ve TCMB Rezervi.
     Her serinin `key`'i CSS renk sınıfını (`era-<key>`) belirler.
10. **Kaynakça (APA)** (`#kaynakca`) — *statik*.

---

## 4b) index.html — RESİM GALERİSİ

Anasayfa, atölyeyle **aynı beyaz-nane tabanı** kullanır (`--mint-50`); yazı tipleri ve yeşil
palet de aynıdır. Ayrıldığı tek yer: **üst menü ve açıklama metni yoktur.**

- ✅ Sayfanın en üstünde tek bir başlık: **"Yeşil Prompt Resim Galerisi"**. Hemen altında eserler.
- ❌ **Navbar YOKTUR.** Marka, menü, tanıtım metni, künye şeridi, alt bilgi — hiçbiri yok.
- ✅ Gezinme yalnızca **sağ alttaki iki yuvarlak düğmeyle** yapılır (`.fab-dock`):
  müzik aç/kapa ve "Atölyeye gir". Site menüsüne atölye sayfalarından erişilir.

**Eser dizilimi:** sabit **3'lü ızgara** (`.gal-grid`). Dar ekranda 2'ye, telefonda 1'e iner.
Her eser **kare olarak kırpılır** (`object-fit: cover`) — satırlar hizalı ve düzenli kalır.
Bu yüzden kare üretilmiş görseller en iyi sonucu verir (çoğu model zaten kare üretir).

**Eser görünümü:** her eserin **yeşil çerçevesi** (`--green-500`, `--gal-border` kalınlığında)
ve **yükselti gölgesi** vardır (`--gal-lift`) — tablolar zeminden kalkmış gibi durur. Üzerine
gelince eser biraz daha yükselir, gölge derinleşir ve alttan ince bir perdeyle eser adı +
enerji değeri belirir. Başka metin yoktur.

**Lightbox:** esere tıklayınca açılır ve **koyu** zemin kullanır — açık sayfadan koyu kutuya
geçmek gözü esere odaklar. Resim mümkün olan en büyük alanı kaplar; bilgiler **altta tek bir
kompakt şerittir** (başlık + prompt + çipler). `←` `→` gezinir, `ESC` kapatır, boşluğa
tıklamak kapatır. Koyu bağlamın tonları (`--box-*`) yalnızca `.lightbox` içine tanımlıdır.

- ✅ **Yapılır:** Galeri mevcut palet ve değişkenleri **yeniden kullanır** (`--green-*`,
  `--mint-50`, `--font-head`, `--radius-sm`). 16. bölümde yalnızca galeriye özel birkaç
  ölçü tanımlanır; 1. bölümdeki hiçbir değişken ezilmez.
- ❌ **Yapılmaz:** Anasayfaya `.fp-section` eklenmez; sayfa normal kaydırılır (bkz. 1.5).
- ❌ **Yapılmaz:** Galeriye açıklayıcı metin, tanıtım bloğu ya da menü konmaz. Anlatılacak her
  şey atölye sayfalarına aittir; buranın işi eserleri göstermektir.

**Resim eklerken:** dosya bulunamazsa kırık resim ikonu çıkmaz — JS otomatik olarak degrade
yer tutucuya döner. Yani yol yanlış yazılsa bile galeri düzgün görünmeye devam eder.

**Damga alanları** (`GALLERY` satırı): `wh` **tek görselin** enerjisidir. Toplam,
`wh × variants × attempts` olarak hesaplanır — elle çarpma. `variants` yazılmazsa 1 sayılır,
yani eski kayıtlar aynen çalışmaya devam eder. Bu satırı elle yazmak yerine
[Hesaplayıcı](hesaplayici.html) sayfasından kopyalamak daha güvenlidir.

### Fon müziği
Sergide sürekli çalan bir fon müziği vardır. **Ses dosyası yoktur** — müzik `core/ambient.js`
içinde Web Audio API ile anlık üretilir (0 KB indirme, telif sorunu yok, hiç bitmez).
Doku sinematik/neo-klasiktir: derin pedal + org-yaylı katman + arpej ostinato + katedral yankısı.

- Ayarlar `site.config.js` → `AMBIENT`: `volume`, `chordSeconds`, `bpm`, `progression`.
- Tarayıcılar izinsiz otomatik sesi engeller; müzik **ilk tıklama/tuş/kaydırmada** başlar.
- Kullanıcının aç/kapa tercihi `localStorage`'da hatırlanır; sekme arka plana geçince ses kısılır.
- ✅ **Yapılır:** Müzik her zaman kapatılabilir olmalıdır (sağ alttaki `#musicBtn` düğmesi).
- ❌ **Yapılmaz:** Atölye sayfalarına müzik konmaz — orada odak içerikte olmalıdır.

### Sık yapılan galeri düzenlemeleri
Hepsi `style.css` → 16. bölümün başındaki değişkenlerdedir:
- **Satırdaki eser sayısı:** `.gal-grid` → `grid-template-columns: repeat(3, 1fr)`.
- **Eserler arası boşluk:** `--gal-gap`.
- **Çerçeve kalınlığı:** `--gal-border` · **çerçeve rengi:** `.gal-item` → `border-color`.
- **Yükselti gölgesi:** `--gal-lift` (duruyorken) ve `--gal-lift-hi` (üzerine gelince).
- **Galeri zemini:** `--gal-bg`.
- **Atölye düğmesinin yazısı/hedefi:** `site.config.js` → `SERGI`.

---

## 4c) hesaplayici.html — HESAPLAYICI

Öğrencinin **kendi ürettiği görselin** maliyetini hesapladığı pratik araç. Atölye akışının son
adımıdır: Prompt Mühendisliği → **Hesaplayıcı** → eseri Sergi'ye ekle.

**Girdiler:** araç (model) · görüntü boyutu · deneme sayısı · prompt · eser adı · üreten.
**Çıktılar:** Wh · mL su · g CO₂ · telefon şarjı · LED · video — yani sergideki damganın aynısı.

**Formül:**
```
Toplam = Temel(Wh) × (en × boy ÷ 1024²) × denemedeki görsel × deneme
```
Enerji, piksel sayısıyla **yaklaşık orantılı** kabul edilir. Bu bir yaklaşımdır; çok yüksek
çözünürlükte gerçek maliyeti bir miktar düşük tahmin eder.

**Denemedeki görsel sayısı (`variants`) neden var:** çoğu araç tek "üret" tıklamasında birden
fazla alternatif verir (Midjourney 4'lü ızgara gibi). Kullanıcı bir tanesini seçse bile
**hepsinin enerjisi harcanmıştır.** Bunu saymamak maliyeti 4 katına kadar düşük gösterirdi.
Üretilen `wh` değeri **tek görselin** enerjisidir; galeri toplamı `wh × variants × attempts`
olarak kendisi hesaplar.

**Sergi etiketi üretici:** sayfa, `GALLERY` listesine doğrudan yapıştırılabilecek hazır bir
config satırı üretir (kopyala düğmesiyle). Hesaplayıcı ile sergi arasındaki döngüyü kapatır —
öğrenci hesaplar, satırı kopyalar, eser sergiye girer.

### ⚠️ Model listesinde DÜRÜSTLÜK KURALI
`imagetools.config.js` içindeki her aracın bir `basis` alanı vardır:

- `basis: 'olcum'` → bağımsız bir **ölçüme** dayanır; `src` alanında kaynağı yazar.
  Şu an yalnızca 5 araç bu durumdadır (FLUX.1-schnell, SDXL, SD 3.5, DALL·E, Bing).
- `basis: 'tahmin'` → **yayımlanmış ölçüm yoktur.** Sayı, benzer mimari ve adım sayısındaki
  ölçülmüş modellerden ölçeklenmiş bir **sınıf tahminidir**. Arayüzde turuncu "tahmin"
  rozetiyle gösterilir ve dayanağı `src` alanında açıklanır.

- ✅ **Yapılır:** Yeni araç eklerken ölçümü yoksa `basis: 'tahmin'` bırakılır ve `src` alanına
  hangi sınıftan ölçeklendiği yazılır.
- ❌ **Yapılmaz:** Tahmini bir sayı `'olcum'` olarak işaretlenmez. Kapalı modellerin (Midjourney,
  GPT Image, Grok, Seedream…) enerji verisi **yoktur**; bunu gizlemek sitenin güvenilirliğini bitirir.

**Ölçek çapaları** (literatürün uçları, `Yöntem` slaytında da anlatılır):
~0,3 Wh damıtılmış az adımlı · ~1,5 Wh SDXL 30 adım (Luccioni vd., 2024) · ~2,9 Wh büyük difüzyon üst sınırı.

> **Not:** Token Lab'daki `IMAGE_MODELS` ile bu liste **ayrıdır ve bilerek öyledir**. Orası
> difüzyon adımını anlatan 4 zıt örnektir (pedagoji), burası öğrencinin gerçekten kullandığı
> aracı seçtiği tam listedir (pratik). Ortak modellerin (FLUX.1-schnell, SDXL, SD 3.5, DALL·E)
> Wh değerleri **iki dosyada da aynı tutulmalıdır**.

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
`.era-chart` / `.era-line` / `.era-legend` + `eraDraw`) ·
**`16) Sergi salonu`** (`.gal-*` ızgara, `.lightbox` / `.box-*`, `.fab-*` yüzen düğmeler) ·
**`17) Hesaplayıcı`** (`.tag-*` dayanak rozetleri, `.stamp-*` damga önizlemesi, `.tool-scroll`).

Dosyanın sonunda iki blok daha vardır: **hareket azaltma** (`prefers-reduced-motion`) ve
**yazdırma** (`@media print`). Sergi anasayfası her ikisinde de ele alınmıştır — yazdırıldığında
katalog gibi basılır.

- ✅ **Yapılır:** Yeni stil eklerken önce 14/15. bölümdeki mevcut sınıflar **yeniden kullanılır**;
  gerçekten yeni gerekiyorsa 15. bölüme **ekleme** yapılır.
- ✅ **Yapılır:** Yeni bir animasyon ya da hareketli geçiş eklendiğinde, dosya sonundaki
  `prefers-reduced-motion` bloğuna da **kapatma kuralı eklenir** (erişilebilirlik için).
  O blok içeriği gizlemez, yalnızca hareketi durdurur.
- ❌ **Yapılmaz:** Mevcut bölümlerdeki kurallar ezilmez.
- ❌ **Yapılmaz:** Hiçbir yerde kullanılmayan (ölü) stil bırakılmaz — bir bileşen kaldırılırsa
  CSS'i de kaldırılır.

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
- **Karşılaştırılan değerler TEK bir birimde verilir.** Sergideki ve hesaplayıcıdaki eşdeğer
  her zaman **telefon şarjı** cinsindendir (`Units.phoneText`). Bir şarjdan küçükse yüzde olarak
  yazılır ("telefon şarjının %4 kadarı") — "0,04 telefon şarjı" kimseye bir şey anlatmaz.
  ❌ `Units.human()` yan yana duran değerlerde **kullanılmaz**: değere göre birim değiştirdiği
  için (şarj / video / LED) eserler birbiriyle karşılaştırılamaz hâle gelir. `human()` yalnızca
  Token Lab'ın metin–görsel–video karşıtlığı gibi, birim çeşitliliğinin bilerek istendiği
  yerlerde kullanılır.
- **Üretilen ama seçilmeyen görseller de sayılır.** Bir araç tek denemede 4 alternatif
  veriyorsa, harcanan enerji dördününküdür. `GALLERY` ve hesaplayıcıdaki `variants` alanı bunu
  taşır; yazılmazsa 1 kabul edilir.
- **Su, tek bir katsayıdan türetilir.** Kaynağında su verisi olmayan satırlarda su değeri
  `3,69 L/kWh` ile hesaplanır (`units.config.js` → `waterLitrePerKwh`; "How Hungry is AI?", 2025)
  ve `Kaynak` sütununda türetildiği belirtilir. İstisna: kaynağın kendi ölçtüğü su değeri varsa
  (örn. Google'ın 0,26 mL'si) o kullanılır. Farklı katsayılarla karışık hesap yapılmaz.
- **Prompt mühendisliğinin mesajı "en kısa prompt" değil, "en az toplam maliyet"tir:**
  Toplam ≈ Girdi + Çıktı + (Deneme × üretim) + (Düşünme bütçesi). Net ama biraz uzun bir prompt,
  belirsiz kısa bir prompttan toplamda daha verimlidir.
