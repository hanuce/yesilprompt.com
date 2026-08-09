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

### 1.4b — Dil insan diliyle yazılır, sözlükle değil
**Neden:** Site bir ortaokul/lise atölyesidir. İngilizce terimi kelimesi kelimesine çevirmek,
Türkçede karşılığı olmayan tuhaf sözler üretir; öğrenci anlamadığı için okumayı bırakır.

- ❌ **Yapılmaz:** Birebir çeviri. Gerçek örnekler ve düzeltilmiş hâlleri:
  | ❌ makine çevirisi | ✅ insan Türkçesi |
  |---|---|
  | ölçüm çapaları / çapa | elimizdeki gerçek ölçümler · referans ölçüm |
  | damıtılmış model | az adımda üretecek şekilde hızlandırılmış model |
  | çok-kipli (multimodal) | metni ve görseli birlikte işleyen |
  | tasnif / derlem (corpus) | veri kümesi |
  | prefill / decode | promptu okumak / cevabı kelime kelime yazmak |
  | otoregresif üretim | kelime kelime üretme |
  | çıkarım (inference) | kullanım · sorgu |
  | sınıf-içi büyüklük tahmini | benzer büyüklükteki modellerden hesaplanmış tahmin |
  | re-roll | yeniden üretme |
  | frontier model | en büyük modellerden biri |

- ✅ **Yapılır:** Terim gerçekten öğretilecekse **önce Türkçesi anlatılır**, İngilizcesi
  parantez içinde bir kez verilir: “dikkat (attention)”, “token”. Bir daha tekrarlanmaz.
- ✅ **Yapılır:** Ölçüt şudur: **cümleyi 14 yaşındaki biri ilk okuyuşta anlıyor mu?**
  Anlamıyorsa terim değil, cümle değişir.
- ℹ️ Kurumsal/teknik adlar (Transformer, Common Crawl, SDXL) çevrilmez — bunlar özel addır.

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
| `index.html` | *(menüsüz — sergi salonu)* | `pages/anasayfa.js` | `site.config.js` (`SERGI`, `GALLERY`) | ❌ normal kaydırma |
| `atolye.html` | Atölye Girişi | `pages/giris.js` | `site.config.js` (`MATERIALS`) | ✅ |
| `modeller.html` | Modeller & Tarih | `pages/modeller.js` | `timeline`, `training`, `families`, `valuations` | ✅ |
| `token-lab.html` | Token Lab | `pages/token-lab.js` | `units`, `models` | ✅ |
| `prompt-muhendisligi.html` | Prompt Mühendisliği | `pages/prompt-muhendisligi.js` | (JS içi diziler) | ✅ |
| `hesaplayici.html` | **Ne Kadar?** | `pages/hesaplayici.js` | `imagetools`, `units` | ✅ |

> ℹ️ **Dosya adı ≠ menü adı.** `hesaplayici.html` menüde **"Ne Kadar?"** olarak görünür.
> Dosya adı bilerek değiştirilmedi: paylaşılmış bağlantılar ve yer imleri kırılmasın.
> Menü adı değişirse `site.config.js` → `FOOTER.sitemap` de aynı ada güncellenir.

Ortak / altyapı JS (sayfaya özel değildir, dokunulması nadiren gerekir):
`core/fullpage.js` (slayt motoru), `core/nav.js` (mobil menü),
`core/footer.js` (künye + site haritası footer'ı — sergi hariç her sayfada),
`core/units.js` + `units.config.js` (Wh → gündelik birim çevirici), `core/print.js` (kart yazdırma),
`core/tokenize.js` ve `core/tokenizer.module.js` (token sayımı, CDN tokenizer).

> ℹ️ Sitede **ses yoktur.** Sergide bir dönem Web Audio ile üretilen bir fon müziği vardı;
> kaldırıldı. Yeniden ses eklenmez — ne sergiye ne atölye sayfalarına.

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
│   │   ├── imagetools.config.js # Ne Kadar?: görsel araç listesi + Wh + dayanak + boyutlar
│   │   ├── families.config.js   # model aileleri: ad, kurum, ülke, tanıtım
│   │   ├── valuations.config.js # sektör büyümesi: şirket değerleri + zaman çizelgesi
│   │   ├── timeline.config.js   # tarihsel zaman çizelgesi (Turing→…)
│   │   ├── training.config.js   # eğitim verisi, epoch, enerji, veri projeleri
│   │   └── site.config.js       # SERGİ metni, künye, FOOTER, materyal havuzu, eserler
│   ├── core/                # paylaşılan motor — genelde dokunulmaz
│   │   └── footer.js            # ortak footer (son slayt olarak eklenir)
│   └── pages/               # her sayfanın kendi render mantığı
│       └── anasayfa.js          # sergi ızgarası + lightbox
└── data/
    └── enerji_verileri.csv  # CODAP veri seti (gerçek kaynaklı)
```

### Sık yapılan düzenlemeler (JS bilmeden)
- **Renk teması:** `assets/css/style.css` → en üstteki `:root` bloğundaki `--green-*` vb.
- **Birim katsayıları** (telefon şarjı kaç Wh, hangi barajlar): `units.config.js`.
- **Model enerji değerleri / efor seviyeleri:** `models.config.js`.
- **Model aileleri:** `families.config.js` (kartlar bayrak emojisiyle çizilir; logo dosyası kullanılmaz).
- **Şirket değerleri:** `valuations.config.js`.
- **Künye / footer metni / site haritası / materyal havuzu / eserler:** `site.config.js`.
- **Slayt metinleri:** doğrudan ilgili `.html` dosyasındaki `<section class="fp-section">` bloğu.
- **Yeni eser eklemek:** görseli `assets/img/galeri/` klasörüne at, `site.config.js` →
  `GALLERY` listesine bir satır ekle (`title`, `img`, `prompt`, `model`, `attempts`, `wh`;
  `by` ve `date` isteğe bağlı). Serginin toplam enerji/su künyesi otomatik güncellenir —
  elle yazma.

> ⚠️ Config düzenlerken tırnak `"`, virgül `,` ve süslü parantez `{ }` dengesini koru — JS bu
> karakterlere duyarlıdır; biri eksik olursa sayfa yüklenmez.

---

## 4) modeller.html — SLAYT SIRASI

Sayfanın güncel slayt akışı ve her slaytın hangi config'ten beslendiği aşağıdadır.

1. **Tarihçe** (`#tarih`) — zaman tüneli → `AI_TIMELINE` (`timeline.config.js`).
   Yedi durak: 1950, 1956, Yapay Zeka Kışı (1974–1993), 2012, 2017, 2018–2020, 2022–Günümüz.
   ⚠️ **Tek sütun, dikey akış.** İki sütuna sıkıştırmak denendi ve geri alındı: kronoloji
   soldan sağa zıplayınca okunmuyor, kartlar da eziliyor. Slayt uzunsa kaydırılır —
   `.fp-section` zaten kendi içinde kayar. Aynı şekilde 3. slayttaki örnek Python kodu da
   kısaltılmaz; kısaltılmış hâli anlaşılırlığı düşürdüğü için eski hâline döndürüldü.
2. **Transformer teknolojisi nedir?** (`#transformer`) — *statik*. Üç parça: **öncesi/sonrası**
   karşılaştırması, **bir cümle modelden nasıl geçer** (4 adım) ve **neden önemli** (dikkat /
   aynı anda okumak / büyüdükçe iyileşmek).
   ❌ **Donanım (CPU · GPU · NPU) içeriği bu sayfadan kaldırıldı.** Geri eklenmez: slaytın
   konusu mimaridir, çip değil. Donanımın enerjiyle bağı, "aynı anda okumak" kartında tek
   cümleyle kurulur — paralellik = aynı anda çalışan binlerce çip = enerji faturası.
3. **Model nedir, nasıl eğitilir?** (`#model-nedir`) — *statik*. Üç parça: **Model** (örnek pseudo
   Python kodu, `.code-box`), **Veri** (girdi → hedef örneği), **Eğitim** (epoch animasyonu
   `.epoch-track` / `.epoch-tok`).
4. **Veri** (`#veri-gpt3`) — eğitim verisinin gerçek içeriği → `TRAINING_DATA`.
   ⚠️ Burada **GPT-3'ün karışımı KULLANILMAZ.** GPT-3 makalesindeki "Books1 / Books2"
   satırlarının ne olduğunu OpenAI hiç açıklamamıştır; öğrenciye "kitap derlemi" diye
   geçiştirilen bir satır göstermek, "gerçek kaynağı göster" amacının tersidir.
   Onun yerine **The Pile** (Gao vd., 2020) kullanılır: 825 GB'lık içeriğinin 22 parçasını
   da adıyla, oranıyla ve kaç kez okunduğuyla yayımlar — hepsi doğrulanabilir.
   Tabloda payı en büyük 12 kaynak listelenir; kalan %7 `restNote` ile özetlenir.
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
- ✅ Gezinme yalnızca **sağ alttaki yuvarlak "Atölyeye gir" düğmesiyle** yapılır (`.fab-dock`).
  Site menüsüne atölye sayfalarından erişilir.

**Eser dizilimi:** sabit **3'lü ızgara** (`.gal-grid`). Dar ekranda 2'ye, telefonda 1'e iner.
Her eser **kare olarak kırpılır** (`object-fit: cover`) — satırlar hizalı ve düzenli kalır.
Bu yüzden kare üretilmiş görseller en iyi sonucu verir (çoğu model zaten kare üretir).

**Eser görünümü:** her eserin **yeşil çerçevesi** (`--green-500`, `--gal-border` kalınlığında)
ve **yükselti gölgesi** vardır (`--gal-lift`) — tablolar zeminden kalkmış gibi durur. Üzerine
gelince eser biraz daha yükselir, gölge derinleşir ve resim hafifçe yakınlaşır.

**Künye şeridi** (`.gal-cap`): resmin **altında, her zaman görünür** bir müze etiketi.
Üstte eser adı; altında solda **üreten (👤) + model (🧩)**, sağda **enerji damgası (⚡)**.
Bu bilgi hover'a bağlı **değildir** — dokunmatik cihazda hover yoktur, gizlenirse okunamaz.
Boş alanlar (ör. `by` yazılmamışsa) hiç basılmaz.

- ✅ **Yapılır:** Künye şeridinde yalnızca **künye** durur: ad, üreten, model, enerji.
- ❌ **Yapılmaz:** Şeride prompt, açıklama ya da yorum yazılmaz — onlar lightbox'a aittir.
- ℹ️ **Tarih künye şeridinde gösterilmez**, yalnızca lightbox çiplerinde. Izgarada altı satır
  bilgi eserin önüne geçer; tarih detay isteyenin bakacağı bir bilgidir.

**Lightbox:** esere tıklayınca açılır ve **koyu** zemin kullanır — açık sayfadan koyu kutuya
geçmek gözü esere odaklar. Resim mümkün olan en büyük alanı kaplar; bilgiler **altta tek bir
kompakt şerittir** (başlık + prompt + çipler). `←` `→` gezinir, `ESC` kapatır, boşluğa
tıklamak kapatır. Koyu bağlamın tonları (`--box-*`) yalnızca `.lightbox` içine tanımlıdır.

**Çip sırası** (`.box-chips`): 👤 üreten · 📅 tarih · 🧩 model · 🔁 deneme · 🖼️ varyant ·
⚡ enerji · 💧 su · 🏭 karbon · 📱 eşdeğer. Önce eserin **kimliği** (kim, ne zaman, neyle),
sonra **maliyeti** okunur. Emoji etiketin yerini tutar; metin karşılığı `title` ve
`.sr-only` içinde durur (ekran okuyucu için).

- ✅ **Yapılır:** Galeri mevcut palet ve değişkenleri **yeniden kullanır** (`--green-*`,
  `--mint-50`, `--font-head`, `--radius-sm`). 16. bölümde yalnızca galeriye özel birkaç
  ölçü tanımlanır; 1. bölümdeki hiçbir değişken ezilmez.
- ❌ **Yapılmaz:** Anasayfaya `.fp-section` eklenmez; sayfa normal kaydırılır (bkz. 1.5).
- ❌ **Yapılmaz:** Galeriye açıklayıcı metin, tanıtım bloğu ya da menü konmaz. Anlatılacak her
  şey atölye sayfalarına aittir; buranın işi eserleri ve künyelerini göstermektir.

**Resim eklerken:** dosya bulunamazsa kırık resim ikonu çıkmaz — JS otomatik olarak degrade
yer tutucuya döner. Yani yol yanlış yazılsa bile galeri düzgün görünmeye devam eder.

**Damga alanları** (`GALLERY` satırı): `wh` **tek görselin** enerjisidir. Toplam,
`wh × variants × attempts` olarak hesaplanır — elle çarpma. `variants` yazılmazsa 1 sayılır,
yani eski kayıtlar aynen çalışmaya devam eder. Bu satırı elle yazmak yerine
[Hesaplayıcı](hesaplayici.html) sayfasından kopyalamak daha güvenlidir.

**Tarih alanı** (`date`): config'e **ISO** yazılır — `'2026-03-14'`. Böylece alan hem
sıralanabilir hem de dil/biçim tartışması çıkmaz. Ekrana çevirme işi JS'in
`fmtDate()` fonksiyonundadır ve künyeyle aynı biçimi verir: **14.03.2026**.

- ✅ **Yapılır:** Alan **isteğe bağlıdır**; yazılmazsa çip hiç basılmaz (eski kayıtlar bozulmaz).
- ✅ **Yapılır:** ISO'ya uymayan bir değer (ör. `'Mart 2026'`) yazılırsa olduğu gibi gösterilir —
  içerik kaybolmaz.
- ❌ **Yapılmaz:** Bilinmeyen bir tarih **uydurulmaz** (bkz. 1.4); tarih bilinmiyorsa alan boş bırakılır.

### Ses yoktur
Sergi **sessizdir**. Eskiden Web Audio ile üretilen bir fon müziği vardı; kaldırıldı
(`core/ambient.js`, `AMBIENT` config'i, `#musicBtn` düğmesi ve `.fab-ghost` / `.ico-*` stilleri
artık yoktur).

- ❌ **Yapılmaz:** Ne sergiye ne atölye sayfalarına ses/müzik eklenmez — odak eserlerde ve
  içerikte olmalıdır.

### Sık yapılan galeri düzenlemeleri
Hepsi `style.css` → 16. bölümün başındaki değişkenlerdedir:
- **Satırdaki eser sayısı:** `.gal-grid` → `grid-template-columns: repeat(3, 1fr)`.
- **Eserler arası boşluk:** `--gal-gap`.
- **Çerçeve kalınlığı:** `--gal-border` · **çerçeve rengi:** `.gal-item` → `border-color`.
- **Yükselti gölgesi:** `--gal-lift` (duruyorken) ve `--gal-lift-hi` (üzerine gelince).
- **Galeri zemini:** `--gal-bg`.
- **Atölye düğmesinin yazısı/hedefi:** `site.config.js` → `SERGI`.

---

## 4c) hesaplayici.html — “NE KADAR?”

Öğrencinin **kendi ürettiği görselin** maliyetini hesapladığı pratik araç. Atölye akışının son
adımıdır: Prompt Mühendisliği → **Ne Kadar?** → eseri Sergi'ye ekle.

**Girdiler:** araç (model) · görüntü boyutu · deneme sayısı · prompt · eser adı · üreten ·
**oluşturulma tarihi** (`#dateIn`, varsayılan **bugün**).
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

> ⚠️ **Bu iki taraf birlikte değişir.** `GALLERY` satırına yeni bir alan eklenirse (ör. `date`),
> hesaplayıcının ürettiği satıra da eklenir — yoksa öğrenci eksik satır kopyalar. Aynı şekilde
> `#stampPreview` çipleri lightbox çipleriyle **aynı sırayı** izler: öğrenci burada gördüğünü
> sergide de aynı biçimde görmelidir. `type="date"` girdisi zaten ISO döndürür; ekrandaki
> `14.03.2026` biçimi `fmtDate()` ile üretilir (galerideki fonksiyonun eşi).

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

**Elimizdeki gerçek ölçümler** (`Yöntem` slaytında da anlatılır): ~0,3 Wh az adımda üreten
hızlı modeller · ~1,5 Wh SDXL 30 adım (Luccioni vd., 2024) · ~2,9 Wh ölçülmüş en pahalı sınıf.
Ölçümü olmayan her araç, mimarisi ve adım sayısı en çok benzeyen bu üç noktadan birine göre
ölçeklenir.

### Araç listesi bakımı
- ✅ **Yapılır:** Her aracın `url` alanı **dolu** olur — tablodaki ad, aracın kendi sayfasına
  açılan bir bağlantıdır (yeni sekmede). URL'siz satır düz metin olarak basılır.
- ✅ **Yapılır:** Bağlantı, aracın **kendisine** gider (model kartı / ürün sayfası), firmanın
  ana sayfasına değil. Öğrenci hangi modelden söz edildiğini görebilmelidir.
- ❌ **Yapılmaz:** Var olduğu doğrulanmamış, adı uydurulmuş ya da artık yayında olmayan
  araç listede tutulmaz. Şüpheliyse önce doğrula, doğrulayamıyorsan **çıkar**.
- ℹ️ **Kendi modeli olmayan siteler** (Pollinations, Creen gibi arayüzler) ayrı bir grupta
  durur: bunlar model değil, başkasının modelini çalıştıran ekranlardır. Sayıları bir
  varsayımdır ve `src` alanında ⚠️ ile işaretlenir.

> **Not:** Token Lab'daki `IMAGE_MODELS` ile bu liste **ayrıdır ve bilerek öyledir**. Orası
> difüzyon adımını anlatan 4 zıt örnektir (pedagoji), burası öğrencinin gerçekten kullandığı
> aracı seçtiği tam listedir (pratik). Ortak modellerin (FLUX.1-schnell, SDXL, SD 3.5, DALL·E)
> Wh değerleri **iki dosyada da aynı tutulmalıdır**.

---

## 4d) atolye.html — ATÖLYE GİRİŞİ

Sayfa **doğrudan soruyla başlar.** Tanıtım/hero slaytı bilerek **yoktur**: atölyeye
"şunu öğreneceksin" diye değil, cevaplanmamış bir soruyla girilir.

1. **Başlamadan: birkaç soru** (`#sorular`) → `pages/giris.js` → `ETHICS`.
2. **Materyaller & Kaynaklar** (`#materyaller`) → `site.config.js` → `MATERIALS`.
3. *(otomatik)* **Künye & site haritası** — ortak footer slaytı (bkz. 4e).

**Soruların kuralı:** iki damar birlikte yürür ve her ikisinin de cevabı atölyenin
ilerleyen sayfalarındadır — soru burada açılır, orada kapanır.

- **(a) Sürdürülebilirlik:** enerji, su, deneme sayısı, model seçimi.
- **(b) Üretme mantığı:** token (girdi toplu / çıktı tek tek), tokenizer'ın çeviri
  yapmaması, difüzyon adımı, eğitim ≠ kullanım, düşünme bütçesi.

- ✅ **Yapılır:** Her soru **açık uçludur** ve bir kaldıraca ya da bir mekanizmaya işaret eder.
- ❌ **Yapılmaz:** Cevabı burada verilmez; soru bir bilgi kartına dönüştürülmez.
- ❌ **Yapılmaz:** Sayfaya hero/tanıtım slaytı geri konmaz.

---

## 4e) ORTAK FOOTER — `core/footer.js`

Künye, site haritası ve telif; **sergi (`index.html`) hariç her sayfada** bulunur.

**Neden son slayt?** Atölye sayfalarında `.fp-root` sabit konumludur (`position: fixed`)
ve ekranı tamamen kaplar; gövdenin sonuna konan bir `<footer>` **hiçbir zaman görünmez.**
Bu yüzden footer, `.fp-track`ın son `.fp-section`'ı olarak eklenir — slayt motoru onu
kendiliğinden sayar, noktasını ve okunu üretir.

- ⚠️ **Sıra kuralı:** `core/footer.js`, `core/fullpage.js`ten **ÖNCE** yüklenmelidir;
  yoksa slayt motoru footer'ı görmez. Ayrıca `site.config.js` ikisinden de önce gelir.
- ✅ **Yapılır:** İçerik `site.config.js` → `FOOTER` (+ `KUNYE`) içinden düzenlenir.
  Telif yılı otomatiktir (`startYear` geçmişse "2026–2027" yazar) — elle yazma.
- ✅ **Yapılır:** Menü adı değişirse `FOOTER.sitemap` de güncellenir; site haritası
  üst menüyle aynı sırayı ve aynı adları taşır.
- ❌ **Yapılmaz:** Sergiye footer eklenmez (bkz. 4b: anasayfada künye şeridi, alt bilgi yoktur).
- ❌ **Yapılmaz:** Künye ayrıca bir slayta kopyalanmaz — tek kaynağı footer'dır.

Görünüm 18. CSS bölümündedir; koyu tonlar (`--foot-*`) lightbox'ta olduğu gibi
yalnızca `.fp-footer` içine kapalı tanımlıdır.

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
**`14) Bileşenler`** (`.q-card` açılış soruları, `.timeline` iki sütunlu zaman çizelgesi,
`.pool`, `.fam-*`, `.diff-*`, `.shot-*`, `.ph-*`, `.refs`) ·
**`15) Ek bileşenler`** (modeller: `.code-box`, `.epoch-track` / `.epoch-tok` + `epochSweep`,
`.era-chart` / `.era-line` / `.era-legend` + `eraDraw`) ·
**`16) Sergi salonu`** (`.gal-*` ızgara, `.lightbox` / `.box-*`, `.fab-*` yüzen düğmeler) ·
**`17) Hesaplayıcı`** (`.tag-*` dayanak rozetleri, `.stamp-*` damga önizlemesi, `.tool-scroll`) ·
**`18) Footer`** (`.fp-footer`, `.foot-*` — sergi hariç her sayfanın son slaytı).

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
- **Eşdeğer HER ZAMAN telefon şarjıdır — istisnasız.** Sitedeki her "bu kadar enerji şuna
  eşdeğer" cümlesi `Units.phoneText()` ile yazılır. Bir şarjdan küçükse yüzde olarak verilir
  ("telefon şarjının %4 kadarı") — "0,04 telefon şarjı" kimseye bir şey anlatmaz.
  **Neden tek birim:** değere göre birim seçen bir yardımcı (şarj / video / LED) kullanıldığında
  kaydırıcıyı oynatınca birim de değişiyor, yan yana duran iki sonuç karşılaştırılamaz hâle
  geliyordu. Bu yüzden eski `Units.human()` **kaldırıldı**; geri eklenmez.
  ℹ️ **Tek istisna değil, ayrı bir şey:** `Units.damSentence()` — baraj cümlesi yalnızca
  *eğitim* enerjileri gibi telefon şarjıyla anlamsızlaşan dev değerler içindir (Modeller sayfası).
  ℹ️ Metrik kutucukları (📱 💡 📺 💧 🏭 ⚡) ayrı bir şeydir: her biri **sabit** bir birimi
  gösterir, değere göre değişmez — onlar kalabilir.
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
