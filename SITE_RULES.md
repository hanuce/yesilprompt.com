# SITE_RULES — Yeşil Prompt Atölyesi

Bu belge, sitenin **mevcut yapısını**, **geliştirme kurallarını** ve **içerik düzenleme
rehberini** tek yerde toplar. Site bir ansiklopedi değil, **80 dakikalık beş fazlı bir
atölye akışıdır**; buradaki kuralların çoğu bu süreyi ve akışı korumak içindir. Amaç, projeyi ilk kez açan birinin de önceki bir konuşma ya da
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

### 1.4a — Bilinmeyen sayı GİZLENMEZ, ETİKETLENİR
**Neden:** 1.4 kuralı "kaynaksız sayı yazma" der; "bilinmediğini söyleme" demez. En çok
kullanılan modelleri (GPT, Gemini, Claude, Grok, DeepSeek, Qwen, Llama, Mistral) tablodan
çıkarmak, atölyenin tam da konuştuğu modelleri görünmez yapardı.

Kaynak hiyerarşisi — her satıra **tek tek** uygulanır:

```
① Üretici sayıyı yöntemiyle yayımladı mı?  → 🟢 resmi
② Şirket sayıyı söyledi, yöntemi yok mu?   → 🟡 beyan
③ Bağımsız bir araştırmacı ölçtü mü?       → 🔵 olculdu
④ Yalnızca yöntemi açık bir tahmin var mı? → 🟠 tahmini
⑤ Hiçbiri yoksa                            → hücre BOŞ + "veri yok" rozeti
```

- ✅ **Yapılır:** Her model tabloda kalır; rozeti sayının **nereden geldiğini** söyler.
  CSS: `.tag-resmi` · `.tag-beyan` · `.tag-olculdu` · `.tag-tahmini` (19.10).
- ✅ **Yapılır:** `modeller.csv`'de Claude ve Qwen'in enerji hücreleri **boştur** — çünkü
  Anthropic ve Alibaba hiçbir şey yayımlamıyor. Boş hücre bir hata değil, **dersin kendisidir**
  (Faz 2 / Görev 5).
- ❌ **Yapılmaz:** Bir tahmin `resmi` diye işaretlenmez.
- ❌ **Yapılmaz:** Bilinmeyen bir değer için makul görünen bir sayı yazılmaz — boş bırakılır.

### 1.4c — Listelerde YALNIZCA son kullanıcı ürünleri olur
**Neden:** Öğrenci atölyede yalnızca tarayıcıdan açabildiği bir aracı kullanabilir.
İndirilip kurulan açık ağırlıklar (ham SDXL, FLUX, Stable Diffusion checkpoint'i),
yerel çalıştırma araçları (Ollama) ve araştırma modelleri bir *ürün* değildir;
listede durursa öğrenci seçer ve kullanamaz.

- ✅ **Yapılır:** `TEXT_MODELS`, `IMAGE_MODELS`, `VIDEO_MODELS` ve `IMAGE_TOOLS`
  yalnızca **açıp kullanılabilen** araçları içerir: ChatGPT, Gemini, Claude, Grok,
  DeepSeek, Copilot, Midjourney, Firefly, Canva, Sora, Veo…
- ✅ **Yapılır:** `top5: true` olan beş araç listelerin **en üstünde ayrı bir grupta**
  durur (`<optgroup>` — "⭐ En çok kullanılan 5"). Metin, görsel ve videoda ayrı ayrı.
- ✅ **Yapılır:** Araştırma modellerinin **ÖLÇÜMLERİ** kullanılmaya devam eder — kapalı
  ürünlerin sayısı onlardan ölçeklenir. Kullanılmayan şey model değil, **liste satırıdır**.
- ❌ **Yapılmaz:** Ollama, ham Llama/SDXL indirmesi, HF Space demoları listeye konmaz.
- ❌ **Yapılmaz:** Ölçümü yok diye popüler bir ürün listeden çıkarılmaz — 1.4a'daki
  rozetle işaretlenir. Öğrencinin gerçekten kullandığı aracı görememesi daha kötüdür.

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

## 2) SAYFALAR (faz rayı sırası)

Site bir ansiklopedi değil, **80 dakikalık bir akıştır**. Sergi dışındaki her sayfa bu akışın
bir **fazıdır** ve süresi bellidir. Anasayfa doğrudan sergidir.

| # | Dosya | Faz adı | Süre | Sayfa JS | Ana config | Slayt motoru |
|---|---|---|---|---|---|---|
| — | `index.html` | *(menüsüz — sergi salonu)* | — | `pages/anasayfa.js` | `site.config.js` (`SERGI`, `GALLERY`) | ❌ normal kaydırma |
| 1 | `atolye.html` | **Giriş** (Engage) | 12 dk | `pages/faz1.js` | `tahminler.config.js`, `TARTISMALAR`, `models` | ✅ |
| 2 | `veri-labi.html` | **Veri** (Explore · CODAP) | 22 dk | `pages/veri-labi.js` | `veri-labi.config.js` | ✅ |
| 3 | `token-lab.html` | **Token Lab** (Explain) | 14 dk | `pages/token-lab.js` | `mekanizma.config.js`, `models` | ✅ |
| 4 | `prompt-muhendisligi.html` | **Yeşil Prompt** (Elaborate) | 16 dk | `pages/prompt-muhendisligi.js` | `yesil-prompt.config.js`, `imagetools` | ✅ |
| 5 | `hesaplayici.html` | **Ölç & Sergile** (Evaluate) | 10 dk | `pages/hesaplayici.js` | `imagetools`, `units` | ✅ |
| — | `modeller.html` | **Meraklısına** — akış dışı | — | `pages/modeller.js` | `timeline`, `training`, `families`, `valuations` | ✅ |
| — | `kaynaklar.html` | **Kaynaklar** — akış dışı | — | `pages/kaynaklar.js` | `site.config.js` (`MATERIALS`) | ✅ |

> ⏱️ **Süre toplamı 80 dakikadır** ve `site.config.js` → `FAZLAR` içinde tutulur:
> 12 + 22 + 14 + 16 + 10 = 74 dk içerik + geçişler ve esneme payı.
> ⚠️ Bu süreler **öğrenci ekranında görünmez**; yalnızca eğitmen şeridindedir (bkz. 2b.2).

> ℹ️ **Dosya adı ≠ faz adı.** `hesaplayici.html` rayda **"Ölç"**, `token-lab.html` **"Mekanizma"**,
> `prompt-muhendisligi.html` **"Turnuva"** olarak görünür. Dosya adları bilerek değiştirilmedi:
> paylaşılmış bağlantılar ve yer imleri kırılmasın. Ad değişirse `FAZLAR` **ve**
> `FOOTER.sitemap` birlikte güncellenir.

Ortak / altyapı JS (sayfaya özel değildir):
`core/fullpage.js` (slayt motoru), `core/nav.js` (mobil menü),
`core/footer.js` (künye + site haritası — sergi hariç her sayfada),
`core/units.js` + `units.config.js` (Wh → gündelik birim çevirici),
`core/tokenize.js` + `core/tokenizer.module.js` (token sayımı),
**`core/tahmin.js`** (tahmin kartı), **`core/faz.js`** (faz rayı + eğitmen modu).

> ℹ️ Sitede **ses yoktur.** Yeniden ses eklenmez — ne sergiye ne atölye sayfalarına.

---

## 2b) İKİ ALTYAPI PARÇASI

### 2b.1 `core/tahmin.js` — Tahmin kartı
`soru → öğrenci tahminini yazar → "Cevabı Gör" → gerçek + HESAP`

- ✅ **Yapılır:** İçerik `tahminler.config.js`'e yazılır; HTML'de yalnızca
  `<div class="tahmin" data-tahmin="anahtar"></div>` durur.
- ✅ **Yapılır:** Her kartın bir **`hesap`** alanı olur: sayının nereden çıktığı
  adım adım gösterilir. Bir sayıyı göstermek yetmez (SITE_RULES 1.4).
- ❌ **Yapılmaz: KİLİT YOKTUR.** Öğrenci cevabı istediği zaman açar, tekrar kapatır,
  tahminini değiştirebilir. Amaç sınav değil, merak uyandırmaktır.
- ❌ **Yapılmaz:** "Senin tahminin X'ti, gerçek N katı" gibi bir karşılaştırma
  cümlesi basılmaz — öğrenciyi yanlış cevabıyla yüzleştirmek fazının işi değildir.

### 2b.2 `core/faz.js` — Faz rayı + eğitmen modu
- ✅ **Yapılır:** Atölye sayfaları `<nav class="nav faz-nav"><div class="wrap"></div></nav>` kullanır;
  rayı `faz.js` doldurur. `faz.js`, `nav.js`'ten **ÖNCE** yüklenmelidir.
- ❌ **Yapılmaz: Rayda DAKİKA YAZMAZ.** Süre bütçesi yalnızca eğitmen şeridindedir —
  öğrencinin üzerinde saat baskısı kurulmaz.
- ✅ **Yapılır:** Eğitmen notları `FAZLAR[i].egitmen` içindedir ve **yalnızca `?egitmen=1`** ile görünür.

---

## 2c) ⛔ SİTE VERİ TUTMAZ

**Neden:** Atölye ortaokul/lise öğrencileriyle yapılıyor. Öğrenci cevabı toplamak
mahremiyet sorumluluğu doğurur; üstelik pedagojik bir karşılığı da yok — tartışma
sözlü, takım eşleştirmesi eğitmenin işi.

- ❌ **Yapılmaz:** `localStorage`, `sessionStorage`, çerez ya da sunucuya kayıt ile
  **hiçbir öğrenci cevabı saklanmaz.** (Tek istisna: `sessionStorage`'daki
  `yp.egitmen` bayrağı — bu bir öğrenci verisi değil, eğitmenin kendi ekran tercihi.)
- ❌ **Yapılmaz:** "Atölye defteri", "başta ne demiştin", ilerleme takibi gibi
  kalıcı kayıt gerektiren özellikler eklenmez. Eskiden `core/defter.js` vardı; **kaldırıldı**.
- ✅ **Yapılır:** Yazı kutuları öğrencinin **kendi düşünmesi** içindir; sayfa yenilenince
  içeriği kaybolur ve bu normaldir.
- ✅ **Yapılır:** Oturum içi durumlar (turnuva skoru, token avı rekoru, eklenen kelime
  çiftleri) sıradan JS değişkenlerinde tutulur — yenilemede sıfırlanır.
- ✅ **Yapılır:** Bir yerde takım adı gerekiyorsa (turnuva kodu gibi) **o an** bir kutuya
  yazdırılır; başka sayfaya taşınmaz.

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
│   │   ├── units.config.js      # telefon, LED, video, baraj, SU ŞİŞESİ, CO₂ katsayıları
│   │   ├── tahminler.config.js  # tahmin kartları (soru + gerçek + HESAP + kaynak)
│   │   ├── mekanizma.config.js  # Faz 3: akış adımları, elinde olan/olmayan, token avı, önce/sonra
│   │   ├── veri-labi.config.js  # Faz 2: CODAP görev kartları, sınıf panosu, çelişki kartı
│   │   ├── yesil-prompt.config.js # Faz 4: 8 kural, üretim adımları, prompt reçetesi
│   │   ├── models.config.js     # Token Lab: metin/görsel/video öğretim modelleri + efor + max output
│   │   ├── imagetools.config.js # Ne Kadar?: görsel araç listesi + Wh + dayanak + boyutlar
│   │   ├── families.config.js   # model aileleri: ad, kurum, ülke, tanıtım
│   │   ├── valuations.config.js # sektör büyümesi: şirket değerleri + zaman çizelgesi
│   │   ├── timeline.config.js   # tarihsel zaman çizelgesi (Turing→…)
│   │   ├── training.config.js   # eğitim verisi, epoch, enerji, veri projeleri
│   │   └── site.config.js       # SERGİ metni, künye, FOOTER, materyal havuzu, eserler
│   ├── core/                # paylaşılan motor — genelde dokunulmaz
│   │   ├── footer.js            # ortak footer (son slayt olarak eklenir)
│   │   ├── tahmin.js            # tahmin kartı (soru → Cevabı Gör → gerçek + hesap)
│   │   └── faz.js               # faz rayı + eğitmen modu (?egitmen=1)
│   └── pages/               # her sayfanın kendi render mantığı
│       ├── anasayfa.js          # sergi ızgarası + lightbox
│       ├── faz1.js              # tartışma kartları + günlük ayak izi ölçer
│       ├── veri-labi.js         # CODAP görev kartları
│       └── kaynaklar.js         # materyal havuzu
└── data/
    ├── enerji_verileri.csv  # CODAP · Görev 1-3 (25 satır, gerçek kaynaklı)
    └── modeller.csv         # CODAP · Görev 4-5 (12 model + ŞEFFAFLIK sütunu)
```

### Sık yapılan düzenlemeler (JS bilmeden)
- **Renk teması:** `assets/css/style.css` → en üstteki `:root` bloğundaki `--green-*` vb.
- **Birim katsayıları** (telefon şarjı kaç Wh, hangi barajlar): `units.config.js`.
- **Model enerji değerleri / efor seviyeleri:** `models.config.js`.
- **Model aileleri:** `families.config.js` (kartlar bayrak emojisiyle çizilir; logo dosyası kullanılmaz).
- **Şirket değerleri:** `valuations.config.js`.
- **Künye / footer / site haritası / FAZLAR (süreler, eğitmen notları) / materyal havuzu / eserler:** `site.config.js`.
- **Tahmin kartları** (soru, gerçek, ders, kaynak): `tahminler.config.js`.
- **CODAP görevleri** (tahmin, adımlar, gözlem, keşif): `veri-labi.config.js`.
- **Yeşil Prompt kuralları / üretim adımları / prompt reçetesi:** `yesil-prompt.config.js`.
- **Slayt metinleri:** doğrudan ilgili `.html` dosyasındaki `<section class="fp-section">` bloğu.
- **Yeni eser eklemek:** görseli `assets/img/galeri/` klasörüne at, `site.config.js` →
  `GALLERY` listesine bir satır ekle (`title`, `img`, `prompt`, `model`, `attempts`, `wh`;
  `by` ve `date` isteğe bağlı). Serginin toplam enerji/su künyesi otomatik güncellenir —
  elle yazma.

> ⚠️ Config düzenlerken tırnak `"`, virgül `,` ve süslü parantez `{ }` dengesini koru — JS bu
> karakterlere duyarlıdır; biri eksik olursa sayfa yüklenmez.

---

## 4) modeller.html — MERAKLISINA (akış dışı)

Bu sayfa **80 dakikalık akışın parçası değildir.** Faz rayında yer almaz; sağdaki ikincil
bağlantılardan ulaşılır. Sebebi: planın tek bir bölümü (“mini zaman tüneli”) burada
25+ dakikalık içeriğe şişmişti — akışa sığmıyordu ama silinmesi de doğru değildi.

Sayfanın başına bir **arşiv girişi** slaytı eklendi; ne olduğunu tek cümleyle söyler.

1. **Arşiv girişi** (`#arsiv`) — *statik*, "bunlar 80 dakikaya sığmadı".
2. **Tarihçe** (`#tarih`) → `AI_TIMELINE`.
   ⚠️ **Tek sütun, dikey akış.** İki sütuna sıkıştırmak denendi ve geri alındı: kronoloji
   soldan sağa zıplayınca okunmuyor, kartlar da eziliyor. Aynı şekilde 4. slayttaki örnek
   Python kodu da **kısaltılmaz**.
3. **Transformer teknolojisi nedir?** (`#transformer`) — *statik*.
   ❌ Donanım (CPU · GPU · NPU) içeriği geri eklenmez: slaytın konusu mimaridir, çip değil.
4. **Model nedir, nasıl eğitilir?** (`#model-nedir`) — *statik* (kod + veri + epoch animasyonu).
5. **Veri** (`#veri-gpt3`) → `TRAINING_DATA`.
   ⚠️ GPT-3'ün karışımı **KULLANILMAZ** (Books1/Books2 hiç açıklanmadı); yerine **The Pile**.
6. **Veri projeleri** (`#veri-projeleri`) → `DATA_PROJECTS`.
7. **Eğitim enerjisi** (`#egitim-enerjisi`) → `TRAINING_COSTS`.
8. **Güvenlik & etik** (`#guvenlik`) — *statik*.
9. **Model aileleri** (`#aileler`) → `MODEL_FAMILIES`.
10. **Yapay Zeka Çağı** (`#cag`) → `AI_ERA`.
11. **Diller ve token** (`#diller`) — “model önce İngilizceye mi çeviriyor?” miti ve
    öğrencinin kendi kelime çiftini ölçebildiği tablo. **Token Lab'dan buraya taşındı.**
12. **Shot tipleri** (`#shot`) — *statik*. Faz 4'ten **buraya taşındı**: iyi bir prompt
    mühendisliği konusudur ama **yeşil** prompt konusu değildir — hiçbir maliyet
    kaldıracını doğrudan düşürmez. Slaytın kendisi bunu öğrenciye de söyler.

> ❌ **Kaynakça slaytı burada YOKTUR** — `kaynaklar.html`'e taşındı (bkz. 4f).
> ✅ **Yapılır:** Akışa sığmayan ama değerli içerik silinmez, arşive alınır.
> ❌ **Yapılmaz:** Arşiv içeriği faz rayına geri konmaz; 80 dakika kutsaldır.

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

## 4c) hesaplayici.html — HESAP MANTIĞI VE ARAÇ LİSTESİ

> Fazın akış içindeki yeri ve “Başta ne demiştin?” bloğu için bkz. **4h**.

Öğrencinin **kendi ürettiği görselin** maliyetini hesapladığı pratik araç. Atölye akışının son
adımıdır: Faz 4 Turnuva → **Faz 5 Ölç** → eseri Sergi'ye ekle.

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
  Şu an yalnızca DALL·E sınıfı (ChatGPT görsel, Microsoft Designer) bu durumdadır.
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

> ⚠️ **Liste yalnızca SON KULLANICI ÜRÜNLERİNDEN oluşur** (bkz. 1.4c). İndirilip kurulan
> açık ağırlıklar (ham SDXL, FLUX, SD 3.5) listeden çıkarıldı — öğrenci onları atölyede
> kullanamaz. Ölçümleri ise duruyor: kapalı ürünlerin sayısı onlardan ölçeklendi.
> ✅ İlk beş araç `top5: true` ile en üstte ayrı grupta durur.
> ⚠️ Bu listede ölçümü olan araç **azdır** ve bu bir kusur değil, konunun kendisidir:
> popüler ticari araçların neredeyse hiçbiri enerji verisi yayımlamıyor. "Neyi bilmiyoruz"
> kartı bunu öğrenciye açıkça söyler.

> **Not:** Token Lab'daki `IMAGE_MODELS` ile bu liste **ayrıdır ve bilerek öyledir**. Orası
> difüzyon adımını anlatan 4 zıt örnektir (pedagoji), burası öğrencinin gerçekten kullandığı
> aracı seçtiği tam listedir (pratik). Ortak modellerin (FLUX.1-schnell, SDXL, SD 3.5, DALL·E)
> Wh değerleri **iki dosyada da aynı tutulmalıdır**.

---

## 4d) atolye.html — GİRİŞ (Engage, 12 dk)

Sayfa **doğrudan soruyla başlar.** Tanıtım/hero slaytı bilerek **yoktur**.
Takım eşleştirmesi **site üzerinden yapılmaz** — onu eğitmen sınıfta sözlü yapar.

1. **Görünmeyen buzdağı** (`#buzdagi`) — iki tahmin kartı yan yana:
   `TAHMINLER.cikolata` (fiziksel çıpa) ve `TAHMINLER.buzdolabi` (dijital çıpa).
2. **Tartışmalar** (`#tartismalar`) → `TARTISMALAR` — 6 soru, kart olarak, **kutusuz**.
3. **Aynı işler farklı parametreler** (`#parametreler`) — günlük yapay zekâ ayak izi ölçer.

### Buzdağı slaytının kuralı
İki kart da aynı iskelettedir: soru → "Cevabı Gör" → **üç eksen + hesap dökümü**.

- ✅ **Yapılır:** Satır etiketleri kısadır: **Enerji · Karbon · Su**. ("… ekseninde" yazılmaz.)
- ✅ **Yapılır:** Her kartta sayının **nasıl çıktığı** gösterilir. Çikolatanın suyu
  kakao ağacından geriye doğru hesaplanır (yıllık yağmur × ağaç başına alan → 13.500 L/yıl),
  video ise ölçülen 3,4 milyon joule'den kWh'e çevrilir.
- ❌ **Yapılmaz:** Ara adımlar uydurulmaz. Yalnızca kaynağı olan değerler ve onlardan
  yapılan **açık aritmetik** yazılır (SITE_RULES 1.4).
- ❌ **Yapılmaz:** "Aynı çikolata üç farklı cevap…" gibi yorum paragrafı eklenmez;
  yerini hesap dökümü aldı.

### Tartışmalar slaytının kuralı
- ✅ **Yapılır:** Sorular **kart** olarak basılır ve **okunur**; sınıfça sözlü tartışılır.
- ❌ **Yapılmaz:** Cevap kutusu konmaz, cevap toplanmaz (bkz. 2c).
- ❌ **Yapılmaz:** Soru sayısı çoğaltılmaz — 6 soru bir 3'lü ızgaraya tam oturur.

### Ayak izi ölçerin kuralı
Öğrenci **kendi günlük kullanımını** girer: araç · günlük sorgu · günlük Google araması ·
düşünme modu · ortalama cevap uzunluğu. Sağda günlük enerji/su/karbon + telefon şarjı
ve **yıllık** toplam çıkar.

- ✅ **Yapılır:** Düşünme modu iki seçenektir — **Ücretsiz · Hızlı** (×1) ve
  **Derin Düşünme** (×30). Çarpan uydurma değildir: ölçülen 166 modelin ortalamasıdır
  (`DUSUNME_MODU`, HF AI Energy Score v2).
- ✅ **Yapılır:** Google araması kıyas çizgisi olarak ayrı bir kaydırıcıdır (`ARAMA_WH`).
- ✅ **Yapılır:** Seçilen aracın şeffaflık rozeti ve kaynağı listenin altında yazar.

---

## 4e) veri-labi.html — FAZ 2 · VERİ (Explore, 22 dk)

Atölyenin **en uzun bloğu**. Bakış açısı şudur: konumuz **sürdürülebilir yeşil prompt**,
o yüzden veri fazı da "yapay zekâ kullanımı ne kadar büyüdü ve bunun bedeli ne" sorusuna
odaklanır.

Altı slayt:
1. **Verilerle Yapay Zeka Kullanımı** (`#buyume`) — sitenin çizdiği **tek** grafik.
2. **CODAP’ta ilk iki grafik** (`#ornekler`) — dosya indirme + **adım adım iki örnek**.
3. **Şimdi sen kur** (`#sen-kur`) — yalnızca **sorular**; ekseni öğrenci seçer.
4. **Veri okuryazarlığı** (`#seffaflik`) — iki kaynak, aynı araç, farklı sayı.
5. **Model Eğitimi vs. Modeli Kullanmak** (`#egitim-kullanim`).
6. **Tartışma** (`#tartisma`) — dört soru, sözlü.

### Grafik kuralları
- ❌ **Yapılmaz: siteye genel amaçlı bir grafik aracı yazılmaz.** Site yalnızca 1. slayttaki
  büyüme eğrisini çizer; diğer bütün grafikleri **CODAP'ta öğrenci kurar**.
- ✅ **Yapılır:** İkisi adım adım gösterilir (`ORNEK_GRAFIKLER`), gerisi yalnızca soru olarak
  verilir (`OGRENCI_SORULARI`) — adım verilmez, ekseni öğrenci seçer.
- ⚠️ **Çift eksenin tuzağı:** Büyüme grafiğinde iki seri kendi ölçeğinde çizilir, bu yüzden
  ikisi de tepeye çıkar ve "aynı hızda büyümüşler" yanılsaması doğar. Bu yüzden grafiğin
  altına **aynı yıl aralığında hesaplanmış kat artışları** basılır (`.kat-serit`: ×3 ↔ ×330)
  ve ders metni yanılsamayı **açıkça söyler**. Bu şerit kaldırılmaz.
- ✅ **Yapılır:** Grafiğin her noktası tarihli ve kaynaklı bir açıklamadan gelir; ara yıllar
  uydurulmaz. Veri olmayan yıl (2023 · token) **boş bırakılır**, çizgi orada başlamaz.
- ✅ **Yapılır:** Görünüm için 15.3'teki `.era-*` bileşeni yeniden kullanılır; 19.10b'de
  yalnızca iki serinin rengi tanımlıdır.

### Şeffaflık tablosu (`SEFFAFLIK_TABLOSU`)
Sütunlar: **Araç · Resmî · KAGGLE.COM · EPOCH.AI · Şarj birimi**

- ✅ **Yapılır:** Satırlar **son kullanıcı araçlarıdır** (ChatGPT, Gemini, Claude, Grok,
  DeepSeek, Qwen, Midjourney, DALL·E, Nano Banana, Veo) — bkz. 1.4c.
- ✅ **Yapılır:** "Şarj birimi", eğitim enerjisinin telefon şarjı karşılığıdır
  (`kWh × 1000 ÷ 12 Wh`). Sitenin tek eşdeğer birimi budur (SITE_RULES 7).
- ✅ **Yapılır:** Elde sayı yoksa hücre **“—”** kalır. Görsel ve video araçlarının satırı
  baştan sona tiredir — **bu bir eksiklik değil, dersin kendisidir** (1.4a).
- ℹ️ Tabloda tek "evet" DeepSeek'tedir: üretici GPU-saatini yayımladığı için iki bağımsız
  kaynak binde bir uyuşur. Yayımlamayanlarda 1,5–2,8 kat ayrılırlar.

### Eğitim vs Kullanım (`EGITIM_VS_KULLANIM`)
Sezgiye ters gelen ama doğru olan şeyi kurar: **tek seferlik dev eğitim, günlük kullanımın
yanında küçük kalır.** GPT-4 eğitimi ≈ 45 GWh; ChatGPT'nin bir günlük kullanımı ≈ 850 MWh
→ eğitim **53 günde** geri ödenir, bir yılda kullanım eğitimin **6,8 katıdır**.

- ✅ **Yapılır:** Hesap adım adım gösterilir; ara adımlar uydurulmaz.
- ✅ **Yapılır:** Slayt, atölyenin varlık sebebini söyleyerek biter: *bir modelin eğitimine
  sen karar veremezsin, ama günde kaç kez ve hangi araçla kullandığına karar verebilirsin.*

### Kaldırılanlar — geri eklenmez
- ❌ Beş adet **"Görev N / 5"** slaytı (tahmin → kur → gözlem iskeleti) kaldırıldı; yerlerini
  iki örnek + soru listesi aldı.
- ❌ Görev kartlarındaki **cevap kutuları** kaldırıldı (bkz. 2c).
- ❌ Öğrenci ekranında **süre yazmaz** ("22 dakika · en uzun blok" ibaresi kaldırıldı).

---

## 4f) token-lab.html — FAZ 3 · TOKEN LAB (Explain, 14 dk)

Faz 2'de **bilerek açık bırakılan** soruların kapandığı yer. Altı slayt:

1. **Nasıl çalışıyor** (`#nasil`) → `AKIS_ADIMLARI` · `AKIS_TURLERI`
2. **Görsel neden pahalı** (`#difuzyon`) — **üç sütun**, ortada difüzyon tuvali
3. **Hangi parametre en çok değiştiriyor** (`#parametreler`) — canlı hesaplayıcı
4. **Senin elinde ne var** (`#elinde`) → `ELINDE` · `ELINDE_DEGIL`
5. **Token avı** (`#token-avi`) → `AVCI_KUTULARI` — metin · görsel · video
6. **Önce / Sonra** (`#once-sonra`) → `ONCE_SONRA` — 2 sütun × 3 satır

### Akış slaytının kuralı
- ✅ **Yapılır:** Yedi adım anlatılır ama **6. adım (döngü) vurgulanır** (`.akis-donus`):
  cevaptaki her kelime için 3–5 arası yeniden çalışır. Girdinin ucuz, çıktının pahalı
  olmasının sebebi tam olarak budur.
- ✅ **Yapılır:** Slayt, derinliği **Meraklısına**'ya havale eden bir satırla biter.
- ❌ **Yapılmaz:** Dikkat mekanizması, matris çarpımı, eğitim döngüsü burada anlatılmaz —
  bu faz 14 dakikadır ve yüzeyde kalmak bilinçli bir karardır.

### “Hangi parametre” slaytının kuralı
Öğrencinin değiştirebildiği **üç** şey vardır: **araç · düşünme modu · kaç promptta hedefe ulaştığı.**

- ❌ **Yapılmaz: “kaldıraç” kelimesi kullanılmaz.** Sayfa boyunca “parametre” denir.
- ❌ **Yapılmaz: Cevabın uzunluğunu KULLANICI ayarlamaz.** Bu bir model özelliğidir;
  `TEXT_MODELS[...].tipikCikti` değeri okunur ve `.sabit-kutu` içinde **salt okunur** gösterilir.
  Araç değişince değer de değişir.
- ✅ **Yapılır:** Düşünme modu üç kademedir: **Hızlı · Standart · Derin Düşünme**
  (`EFFORT_LEVELS`). 2026'da düşünmeyen model neredeyse kalmadığı için “kapalı” kademesi yoktur.
  Gizli token sayıları sınıf varsayımıdır ama ölçülmüş ~30 kat çapasına oturtulmuştur.
- ✅ **Yapılır:** Deneme sorusu **“Kaç promptta hedefine ulaştın?”** biçimindedir —
  “kaç kez yeniden ürettin” değil.

### “Senin elinde ne var” slaytının kuralı
Fazın ahlaki çekirdeği: suçlamak değil, **kaldıracın nerede olduğunu** göstermek.

- ✅ **Yapılır:** Solda **değiştiremediklerin** (ülke, santral, soğutma, eğitim, şebeke, donanım),
  sağda **değiştirebildiklerin** (sıklık, nasıl istediğin, neyi seçtiğin, düşünme, bağlam, saklama).
- ✅ **Yapılır:** Slayt “bu atölyenin tamamı bu altı satırdan ibaret” diyerek biter.

### Token avı ve Önce/Sonra
- ✅ **Yapılır:** Token avında **üç kutu** vardır (metin · görsel · video); her biri kendi
  araç listesini kullanır ve seçilen araca göre tahmini enerji verir.
- ✅ **Yapılır:** Görsel ve videoda token sayısı **gösterilir ama enerjiye katılmaz** —
  öğrencinin göreceği şey “prompt uzun ama fark etmiyor” gerçeğidir.
- ⚠️ **Önce/Sonra kartı “kısa = iyi” dersi vermez.** Metinde kısalık kazandırır; görsel ve
  videoda asıl kazanç **netlikten** gelir (deneme sayısını düşürür). Sonuç metni bunu
  tür bazında ayrı yazar.

### Buradan taşınanlar
- ❌ **“Mit yıkımı” (TR/EN token karşılaştırması)** bu sayfadan **Meraklısına**'ya taşındı;
  geri getirilmez. Konu değerli ama Faz 3'ün 14 dakikasında sürdürülebilirlik kaldıracı değil.

---

## 4g) prompt-muhendisligi.html — FAZ 4 · YEŞİL PROMPT (Elaborate, 16 dk)

**Yalnızca iki slayt.** Bu faz eskiden bir turnuvaydı (düello + teknik oyunu + skor);
hepsi kaldırıldı. Sebebi: Faz 3 zaten her parametreyi tek tek ölçtürüyor — aynı ölçümü
ikinci kez yarışma biçiminde tekrarlamak 16 dakikayı yiyordu ve asıl çıktıyı
(sergiye girecek görsel) sıkıştırıyordu.

1. **Yeşil Prompt Kuralları** (`#kurallar`) → `KURALLAR` · `KURALLAR_OZET`
2. **Sergi için resim üretimi** (`#uretim`) → `URETIM_ADIMLARI` · `RECETE` · `URETIM_UYARI`

### Kurallar slaytının kuralı
- ✅ **Yapılır:** Sekiz kartın her biri **hangi maliyet kalemine dokunduğunu** söyler
  (`azaltir` alanı, `.tag-meas` rozeti) ve **somut bir örnek** verir.
- ✅ **Yapılır:** Slayt tek cümlelik özetle biter: *amaç en kısa prompt değil,
  en az toplam maliyet.* Toplam ≈ Girdi + Çıktı + (Deneme × üretim) + Düşünme.
- ❌ **Yapılmaz:** Kural sayısı çoğaltılmaz; sekiz kart 4×2 ızgaraya tam oturur.

### Üretim slaytının kuralı
Öğrenci burada **gerçek bir araca gidip TEK görsel üretir**, sonra Ölç fazına geçer.

- ✅ **Yapılır:** Araç listesi **`imagetools.config.js`'ten** okunur — bu sayfaya ayrı bir
  liste yazılmaz. Tek kaynak ilkesi: yoksa iki yerde iki farklı gerçek oluşur.
- ✅ **Yapılır:** Sıralama **önce gerçekten ücretsiz olanlar**, sonra en çok kullanılanlar,
  sonra enerjisi düşükler. Öğrenci en erişilebilir aracı üstte görsün.
- ✅ **Yapılır:** Her satırda ücretsiz/ölçüm-tahmin rozeti ve **bir görselin enerjisi** yazar;
  bağlantı aracın kendi sayfasına, yeni sekmede açılır.
- ✅ **Yapılır:** Slayt açıkça **Ölç fazına** yönlendirir; öğrenciye hangi aracı seçtiğini
  not etmesi söylenir (orada tekrar seçecek).
- ✅ **Yapılır:** “Neden tek görsel?” uyarısı durur: her “üret” tıklaması tam bedel öder,
  çoğu araç tek tıkta 4 alternatif üretir ve **dördünün de** bedeli ödenir.
- ℹ️ Taslak kutusu yalnızca token sayar ve reçetenin kaç parçasının yazıldığını gösterir;
  **kaydedilmez** (bkz. 2c). Parça sayımı kesin bir ölçüm değil, hatırlatıcıdır.

### Kaldırılanlar — geri eklenmez
- ❌ **Prompt Düellosu** (A/B karşılaştırma) — Faz 3'teki “Önce / Sonra” slaytı aynı işi yapıyor.
- ❌ **“Bu promptu hangi teknik düzeltir?” oyunu** — kurallar slaytı örneklerle aynı bilgiyi veriyor.
- ❌ **Yeşil Prompt Skoru ve turnuva kodu** — puanlama, atölyenin amacı değildi.
- ❌ **“Kuralları ve skoru yazdır” düğmesi** ve `core/print.js` — sayfada yazdırılacak
  bir skor kalmadı; dosya tamamen silindi.
- ❌ `config/turnuva.config.js` silindi; yerine `config/yesil-prompt.config.js` geldi.

---

## 4h) hesaplayici.html — FAZ 5 · ÖLÇ & SERGİLE (Evaluate, 10 dk)

Bkz. 4c (araç listesi ve dürüstlük kuralı). Faz 5'e özgü iki ekleme:

- **Kapanış** (`#kapanis`) — dört öz değerlendirme sorusu **kart olarak** durur; sınıfça
  sözlü konuşulur. Cevap kutusu yoktur, cevap toplanmaz (bkz. 2c).

### Ölç slaytının form düzeni — bu sıra bilinçlidir
`prompt → araç → boyut → eser adı / üreten / tarih → (çizgi) → varyant → deneme`

- ✅ **Yapılır:** Öğrenci **promptuyla başlar** — elinde ilk duran şey odur.
- ✅ **Yapılır:** Sayaç niteliğindeki iki alan (varyant, deneme) **en alta**, ayırıcı çizginin
  altına konur; bunlar "hatırla ve say" alanlarıdır, tarif alanları değil.
- ❌ **Yapılmaz:** Alanların altına uzun açıklama yazılmaz. Öğrenci Faz 1–4 boyunca deneme
  sayısının ve varyantların neden önemli olduğunu zaten öğrendi; burada tekrar anlatmak
  formu okunmaz yapar.
- ℹ️ **Tek istisna:** Araç seçicinin altındaki **dayanak** satırı kalır (rozet + kaynak).
  Sayının nereden geldiği hiçbir yerde gizlenmez (SITE_RULES 1.4).
- ✅ **Yapılır:** Varsayılan araç hem **ücretsiz** hem **ölçümü olan** araçtır; öğrenci listeyi
  hiç açmasa bile doğru bir başlangıç görür.
- ❌ **Yapılmaz:** Sağ kartta "maliyet dökümü" tablosu tutulmaz — formül zaten Yöntem
  slaytında, sonuç da metrik kutucuklarında duruyor.

---

## 4i) kaynaklar.html — KAYNAKLAR (akış dışı)

`modeller`, `token-lab`, `prompt-muhendisligi`, `hesaplayici` sayfalarındaki **dört ayrı
tam ekran kaynakça slaytı** burada birleşti — akışta dört ölü slayt duruyordu.
Materyal havuzu (`MATERIALS`) da atölye girişinden buraya taşındı.

Üç slayt: **Materyaller & araçlar** · **Veri kümeleri ve şeffaflık** · **Kaynakça (APA)**.

- ✅ **Yapılır:** Her faz sayfasının altında “Bu fazın kaynakları →” bağlantısı durur.
- ❌ **Yapılmaz:** Faz sayfalarına tam ekran kaynakça slaytı geri konmaz. Slayt içi
  `<p class="src">` atıfları elbette kalır — kaldırılan şey **ölü tam ekran slayttır**.

---

## 4j) ORTAK FOOTER — `core/footer.js`

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
**`18) Footer`** (`.fp-footer`, `.foot-*` — sergi hariç her sayfanın son slaytı) ·
**`19) Atölye fazları`** (`.faz-rail` / `.faz-step` faz rayı — **dakika rozeti yok**,
`.egitmen-bar` eğitmen şeridi, `.tahmin-*` tahmin kartı, `.gorev-*` CODAP görev kartı, `.duello-*` prompt düellosu,
`.oyun-*` teknik oyunu, `.avci-*` token avı, `.skor-*` skor kartı,
`.tag-resmi/-beyan/-olculdu/-tahmini` şeffaflık rozetleri).

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
- **Su da TEK birimden okunur: 500 mL şişe.** Enerji için `Units.phoneText()` ne yapıyorsa,
  su için `Units.waterText()` aynısını yapar. Bir şişeden küçük değerler oran olarak verilir
  ("bir şişe suyun %12 kadarı") — "0,06 şişe su" kimseye bir şey anlatmaz.
  ❌ Bardak / duş / havuz gibi **ikinci bir su birimi eklenmez**; iki sonuç ancak aynı
  birimden okunursa karşılaştırılabilir.
- **Su, tek bir katsayıdan türetilir.** Kaynağında su verisi olmayan satırlarda su değeri
  `3,69 L/kWh` ile hesaplanır (`units.config.js` → `waterLitrePerKwh`; "How Hungry is AI?", 2025)
  ve `Kaynak` sütununda türetildiği belirtilir. İstisna: kaynağın kendi ölçtüğü su değeri varsa
  (örn. Google'ın 0,26 mL'si) o kullanılır. Farklı katsayılarla karışık hesap yapılmaz.
- **Prompt mühendisliğinin mesajı "en kısa prompt" değil, "en az toplam maliyet"tir:**
  Toplam ≈ Girdi + Çıktı + (Deneme × üretim) + (Düşünme bütçesi). Net ama biraz uzun bir prompt,
  belirsiz kısa bir prompttan toplamda daha verimlidir.
- **En büyük kaldıraç çoğu zaman ARAÇ SEÇİMİDİR.** Aynı 10 sayfalık raporu Llama-3-70B
  0,6 litre suyla, GPT-4 53 litreyle yazar — **≈88 kat** (Shumba vd., 2025, hakemli).
  Promptu kısaltarak bu kadar tasarruf edilemez. Site bu sayıyı Faz 1'de kanca, Faz 4 Tur 3'te
  turnuva turu, Faz 5'te araç listesi olarak **üç kez** kullanır.
- **"Düşünme"nin bedeli ölçülmüştür.** Aynı model, aynı soru, tek fark düşünmenin açık olması:
  0,05 Wh → 7,63 Wh, yani **154 kat** (HF AI Energy Score v2, 2025). Ölçülen 166 modelde
  ortalama 30 kat. SITE_RULES'un "mesele ne kadar düşünüldüğüdür" ilkesinin sayısal dayanağı budur.
