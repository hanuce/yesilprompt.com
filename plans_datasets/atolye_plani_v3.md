# Yeşil Prompt Atölyesi — 80 Dakikalık Öğrenen Merkezli Plan (v3)

> **Tarih:** 10.08.2026
> **Kaynaklar:** `revised_plan.md` (v2 etkinlik planı) · `review.md` (site–plan uyum incelemesi) ·
> `SITE_RULES.md` (site kuralları) · yeni veri kümeleri ve makaleler (bkz. §8).
> **Kapsam:** Sergi (`index.html`) **hariç** sitenin tamamı.
> **Amaç:** Siteyi bir ansiklopediden, 80 dakikalık **akışın kendisi** hâline getirmek —
> her fazda öğrenci okumaz, **yapar**.

---

## 0) TEMEL KARARLAR (bu plan bunların üzerine kuruludur)

| # | Karar | Gerekçe |
|---|---|---|
| K1 | Veri analizi **CODAP'ta** yapılır. Site içine ikinci bir grafik aracı yazılmaz. | Plan ve TÜBİTAK bağlamı CODAP'ı öngörüyor. Eğitmen yedeği: **Orange Data Mining** (çevrimdışı kurulabilir) — site içi yedek geliştirmenin maliyeti buna değmez. |
| K2 | `modeller.html` **arşiv** olur; zamanlı akıştan çıkar. | `review.md` §3.1: planın tek bölümü sitenin en uzun sayfası olmuş. İçerik silinmez, akış korunur. |
| K3 | Sayı kaynağı hiyerarşisi: **① üreticinin resmî açıklaması → ② bağımsız ölçüm → ③ bağımsız tahmin (Epoch AI / EcoLogits).** Hiçbir model **çıkarılmaz**; her satır bir **şeffaflık rozeti** taşır. | `SITE_RULES` 1.4 sayının kaynaksız olmasını yasaklar, *bilinmediğini söylemeyi* değil. En çok kullanılan modelleri tablodan çıkarmak, atölyenin tam da konuştuğu modelleri görünmez yapardı (bkz. §6). |
| K4 | Öğrenci sayısı kadar cihaz, ama **2'li takım**. Faz 4 bir **turnuvadır**. | Tahminler bireysel girilir, karar takımca verilir — tartışma zorunlu hâle gelir. |
| K5 | Sergi (`index.html`) **hiç değişmez**. | Kullanıcı kapsam kararı. Sergi, Faz 5'in çıktı yüzeyidir. |

---

## 1) 80 DAKİKALIK AKIŞ — kuşbakışı

```
BLOK 1 (40 dk)                          BLOK 2 (40 dk)
┌────────────────────────────┐          ┌────────────────────────────┐
│ Faz 0 · Açılış        2 dk │          │ Faz 3 · Mekanizma    14 dk │
│ Faz 1 · MERAK        12 dk │          │ Faz 4 · TURNUVA      16 dk │
│ Faz 2 · VERİ         22 dk │          │ Faz 5 · ÖLÇ & SERGİ  10 dk │
│         (CODAP)            │          │                            │
└────────────────────────────┘          └────────────────────────────┘
      Engage + Explore                    Explain + Elaborate + Evaluate
                                          toplam 76 dk + 4 dk esneme payı
```

| Faz | 5E | Süre | Sayfa | Öğrenci ne YAPAR? |
|---|---|---|---|---|
| 0 | — | 2 dk | `atolye.html` | Takım eşleşir, takım adını yazar (deftere kaydolur) |
| 1 · **Merak** | Engage | 12 dk | `atolye.html` | 2 tahmin kilitler, 3 açık uca cevap yazar |
| 2 · **Veri** | Explore | 22 dk | `veri-labi.html` **(YENİ)** | CODAP'ta 3+1 grafik kurar, gözlem yazar |
| 3 · **Mekanizma** | Explain | 14 dk | `token-lab.html` | Token avı oynar, difüzyon adımlar, kaldıraç dener |
| 4 · **Turnuva** | Elaborate | 16 dk | `prompt-muhendisligi.html` | Prompt düellosu yapar, skor üretir |
| 5 · **Ölç & Sergi** | Evaluate | 10 dk | `hesaplayici.html` → `index.html` | Tek görsel üretir, ölçer, damgalar, sergiye ekler |

**Blok arası doğal kesim Faz 2'nin sonundadır** — CODAP tartışması blok 1'i kapatır, mekanizma anlatısı blok 2'yi açar. Bu, planın "veriyi gördükten sonra teknik açıklama" sırasını korur.

---

## 2) SAYFA HARİTASI — önce / sonra

| Dosya | Şimdi | Sonra | İşlem |
|---|---|---|---|
| `index.html` | Sergi | Sergi | **dokunulmaz** |
| `atolye.html` | 2 slayt (sorular + materyal) | **Faz 1 · Merak** — 4 slayt | yeniden yazılır |
| — | yok | **`veri-labi.html`** — **Faz 2 · Veri** — 6 slayt | **YENİ SAYFA** |
| `token-lab.html` | 5 slayt | **Faz 3 · Mekanizma** — 4 slayt | kırpılır + oyunlaştırılır |
| `prompt-muhendisligi.html` | 6 slayt | **Faz 4 · Turnuva** — 4 slayt | A/B düellosu eklenir |
| `hesaplayici.html` | 4 slayt | **Faz 5 · Ölç & Sergi** — 3 slayt | araç listesi kırpılır, defter döner |
| `modeller.html` | 10 slayt | **Arşiv** — 8 slayt, akış dışı | 2 slayt fazlara taşınır |
| — | yok | **`kaynaklar.html`** | **YENİ** — 4 kaynakça slaytı birleşir |

**Slayt sayısı: 27 → 21 içerik slaytı.** Ama asıl fark sayıda değil: şu an **3** slayt etkileşimli, sonra **13** slayt etkileşimli olacak.

### Menü değişir: nav yerine FAZ RAYI

Atölye sayfalarının üstünde artık düz bir menü değil, **süre bütçeli bir faz rayı** durur:

```
🌿 Yeşil Prompt   ① Merak 12′ ─ ② Veri 22′ ─ ③ Mekanizma 14′ ─ ④ Turnuva 16′ ─ ⑤ Ölç 10′     ⋯ Arşiv · Kaynaklar · Sergi
                                    ▲ buradasın
```

- Tamamlanan faz yeşil dolar (defterdeki kayıttan anlaşılır), içinde bulunulan faz vurgulanır.
- İkincil bağlantılar (Arşiv, Kaynaklar, Sergi) sağda, küçük ve gri.
- **Neden:** Şu an 80 dakikalık yapı sitede görünmüyor. Öğrenci nerede olduğunu ve ne kadar kaldığını bilmeli.

---

## 3) ÜÇ YENİ ALTYAPI PARÇASI

Bu üçü olmadan "öğrenen merkezli" laf olarak kalır. Hepsi `assets/js/core/` altına girer.

### 3.1 `core/defter.js` — Atölye Defteri (localStorage)

Öğrencinin yazdığı **her şey** tek bir yerde birikir ve sonra geri gelir.

```js
Defter.yaz('faz1.tahmin.cikolata', { tahmin: 200, gercek: 3454 });
Defter.yaz('faz2.gozlem.g2', 'Su ekseninde sıralama değişti, hamburger öne geçti');
Defter.oku('faz1.acikuc.1');
Defter.hepsi();          // Faz 5'te geri gösterim + yazdırma için
Defter.tamamlanan();     // faz rayının dolan halkaları
```

- Anahtar biçimi: `faz<N>.<tür>.<ad>` — düz, okunur, taşınabilir.
- **Faz 5'te "Başta ne demiştin?" bloğu** bu defteri okur: öğrenci kendi ilk tahminlerini ve ilk cevaplarını, ölçtüğü gerçek sayının yanında görür.
- Sonunda tek tuşla **"Atölye Defterim"** yazdırılır (`core/print.js` yeniden kullanılır) — öğrencide kalan somut çıktı.
- Sunucu yok, hesap yok, veri cihazdan çıkmaz. Mahremiyet açısından da doğru olan bu.

### 3.2 `core/tahmin.js` — Tahmin-Önce-Cevap bileşeni

Sitenin her yerinde tekrarlanan **tek bir ritüel**:

```
soru → öğrenci sayıyı/cevabı girer → "Kilitle" → gerçek açılır → fark gösterilir
```

Kilitlenmeden gerçek **görünmez**. Fark şöyle okunur: *"9 kat düşük tahmin ettin — çoğu insan da öyle yapıyor."*

Kullanıldığı yerler: Faz 1 (×2), Faz 2 (her görev kartında, ×4), Faz 3 (×2). Toplam 8 tahmin anı.
**Neden bu kadar önemli:** Bir sayıyı okumak unutulur; yanlış tahmin ettiğini fark etmek unutulmaz. Bütün planın öğrenme motoru bu.

### 3.3 `core/faz.js` — Faz rayı + süre bütçesi

- Nav'ın yerini alır (yalnız atölye sayfalarında; arşiv ve kaynaklar sayfasında klasik nav kalır).
- `?egitmen=1` parametresiyle **eğitmen şeridi** açılır: fazın süresi, geri sayım, "ne söylenecek", tartışma soruları ve beklenen cevaplar. `review.md` §2.6'daki "eğitmen için hiçbir şey yok" eksiğini ayrı belge yazmadan kapatır.
- Öğrenci ekranında eğitmen şeridi **yoktur**; kimse yanlışlıkla göremez.

---

## 4) FAZ FAZ PLAN

---

### FAZ 0 · AÇILIŞ — 2 dk · `atolye.html` slayt 1

**Ekranda:** Tek bir kutu. *"Takım adınızı yazın."* + *"Yanınızdaki kişiyle eş oldunuz. Bu atölyede her tahmini önce **ayrı ayrı** yapacak, sonra **birlikte** karar vereceksiniz."*

- Takım adı deftere yazılır; Faz 4 turnuva sıralamasında ve Faz 5 sergi etiketinde kullanılır.
- Hero/tanıtım slaytı **yok** (`SITE_RULES` 4d korunur) — atölyeye soruyla girilir.

---

### FAZ 1 · MERAK (Engage) — 12 dk · `atolye.html`

> **Fazın işi:** "Görünmeyen maliyet" fikrini fiziksel dünyaya çakmak ve **model seçiminin** tek başına ne kadar fark ettiğini göstermek. Teknik hiçbir şey anlatılmaz.

#### 1.1 · Tahmin: Çikolata (4 dk) — `review.md` ①'in karşılığı

**Soru:** *"1 kg çikolata üretmenin bedeliyle telefonunu kaç kez şarj edebilirsin?"*

Öğrenci sayı girer → kilitler → **iki cevap birden açılır:**

| Hangi soruyu sorduğun | Cevap | Nereden |
|---|---|---|
| **Enerji** ekseninde | ≈ **440 şarj** (5.300 Wh ÷ 12 Wh) | `enerji_verileri.csv` |
| **Karbon** ekseninde | ≈ **3.450 şarj** (19.000 g ÷ 5,5 g) | Poore & Nemecek (2018) |
| **Su** ekseninde | ≈ **17.000 litre** — 34.000 şişe su | Poore & Nemecek (2018) |

**Buradaki ders — ve v2 planındaki bir düzeltme:** Plan "3000 telefon şarjı" diyor; bu **karbon** ekseninden okunmuş bir sayıdır, enerji ekseninde ≈ 440'tır. İkisi de doğru, ikisi de aynı şeyi ölçmüyor. Slayt bunu gizlemek yerine öne çıkarır:

> *"Aynı çikolata, üç farklı cevap. Hangisi doğru? Üçü de. Önemli olan **hangi soruyu sorduğun**. Bugün üçünü de takip edeceğiz: enerji, karbon, su."*

Atölyenin üç ölçüsü bu tek slaytta kurulur.

#### 1.2 · Tahmin: 88 kat (4 dk) — **YENİ, yeni makaleden**

**Soru:** *"Aynı 10 sayfalık raporu iki farklı yapay zekâya yazdırıyorsun. Su tüketimi arasında kaç kat fark olabilir?"*

Öğrenci kat sayısı girer → kilitler → açılır:

| Aynı görev: 10 sayfalık rapor (5.000 token) | Su | Enerji |
|---|---|---|
| **Llama-3-70B** | **0,6 litre** | 52 Wh |
| **GPT-4** | **53 litre** | 4.660 Wh |

**≈ 88 kat.** Görev aynı, prompt aynı, sonuç aynı — değişen tek şey **hangi modeli seçtiğin**.
*Kaynak: Shumba, Tshekiso, Li, Fanti & Ren (2025), COMPASS '25 — hakemli.*

Yanına küçük bir ikinci kart: **kısa e-posta** (250 token) → 0,12 L vs 2,6 L. Yani fark görev küçüldükçe kaybolmuyor.

> **Neden bu slayt atölyenin belkemiği:** Site şu ana kadar öğrenciye "kısa yaz, az dene" diyordu. Bu sayı, en büyük kaldıracın çoğu zaman **araç seçimi** olduğunu tek bir hakemli veriyle gösteriyor. Faz 3, 4 ve 5 buraya geri döner.

#### 1.3 · Üç açık uç (4 dk)

Mevcut `ETHICS` kartları korunur ama **artık okunmuyor, cevaplanıyor**. Her kartın altında bir yazı kutusu:

1. *"Bir yapay zekâ sorusunun bedelini kim ödüyor sence?"*
2. *"Bir görselin 5 kez yeniden üretilmesi kimi ilgilendirir?"*
3. *"Bu atölyeden sonra neyi farklı yapacaksın?"*

Cevaplar deftere yazılır ve **Faz 5'te aynen geri gelir**. Öğrenci 70 dakika sonra kendi cümlesini, ölçtüğü gerçek sayının yanında okur. Atölyenin kapanış hamlesi budur.

- ❌ Materyal havuzu slaytı **buradan çıkar** → `kaynaklar.html`'e taşınır (akışta ölü slayt olmasın).

---

### FAZ 2 · VERİ (Explore) — 22 dk · `veri-labi.html` **(YENİ SAYFA)**

> **Fazın işi:** `review.md` §2.2'nin kapatılması — 80 dakikanın en uzun bloğu, sitenin en zayıf noktasıydı. Artık kendi sayfası var.
> **Araç:** CODAP (K1). Site **görev kartlarını, tahminleri ve gözlem kutularını** taşır; grafiği CODAP kurar.

#### Slayt 1 · Veriyi yükle (3 dk)

Adım adım görsel yönerge, üç adım, ekran görüntüsüyle:
1. `enerji_verileri.csv` dosyasını indir **(sayfadaki büyük düğme)**
2. `codap.concord.org` adresini aç
3. Dosyayı ekrana sürükle-bırak → tablo açılır

Altında küçük bir not: *"CODAP açılmıyorsa eğitmene haber ver — çevrimdışı yedek var."* (Orange Data Mining, K1.)

#### Slayt 2–5 · Dört görev kartı

Her kart **aynı üç adımlı iskelete** sahiptir — bu, fazı öğrenci yönetimli kılan şey:

```
① TAHMİN    Grafiği kurmadan önce: sence ne çıkacak?   [kutu]  → kilitle
② KUR       CODAP'ta şu adımları uygula                [görsel yönerge]
③ GÖZLEM    Ne gördün? Tahminin tuttu mu?              [kutu]  → deftere
```

| # | Görev | CODAP adımı | Keşfedilecek |
|---|---|---|---|
| **G1** | *Fiziksel mi dijital mi daha pahalı?* | X = `Aktivite`, Y = `CO2_Salinimi_Gram`, `Tur` → renk | Çikolata dijitalin **binlerce katı**. İlk şok: "demek ki yapay zekâ o kadar da kötü değil?" |
| **G2** | *Aynı grafiği **su** ile kur.* | Y = `Su_Tuketimi_mL` | **Sıralama değişiyor.** Hamburger su devi, eğitim enerji devi. "Tek bir sayıyla çevre ölçülmüyor." |
| **G3** | *Eğitim satırlarını da ekle.* | Filtreyi kaldır, `Tur = Eğitim` | Grafik **okunmaz hâle gelir** — GPT-3 eğitimi diğer her şeyi ezer. Öğrenci kendi çözümünü bulur (filtrele / ayrı bak). **Eğitim ≠ kullanım** ayrımı buradan doğar. |
| **G4** | *`modeller.csv`'yi aç.* X = `Egitim_Enerjisi_kWh`, Y = `Karbon_kgCO2e`, `Bolge` → renk | **En çok enerji harcayan, en çok karbon salan değil.** BLOOM (Finlandiya, 57 gCO₂/kWh) vs ABD/Çin'de eğitilmiş modeller. *Nerede* eğittiğin, *ne kadar* harcadığın kadar önemli. |
| **G5** *(bonus)* | *`Seffaflik` sütununu renge sürükle.* | **Kullandığımız modeller ile hakkında bilgi olan modeller aynı değil.** Bkz. §6.4 — atölyenin en sert bulgusu. |

G5 hızlı bitiren takımlar için; zorunlu değil. Bu, 22 dakikayı **herkesin hızına** göre esnetir.

#### Slayt 6 · Sınıf panosu (4 dk) — blok 1'in kapanışı

Ekranda dört tartışma sorusu; eğitmen yönetir, öğrenciler kendi gözlem kutularından okur:

1. Görsel üretimi neden metinden pahalı? *(cevap Faz 3'te açılacak — şimdilik tahmin)*
2. Bir modelin eğitimi ile tek bir sorgu arasındaki fark kaç kat? Bu fark neden yanıltıcı olabilir?
3. Su ekseninde sıralama neden değişti?
4. Aynı model, iki farklı ülkede — neden farklı karbon salıyor?

> ⚠️ **Bilinçli boşluk:** Bu soruların cevabı burada **verilmez**. Faz 3 tam olarak bunları kapatmak için vardır. `SITE_RULES` 4d'deki "soru burada açılır, orada kapanır" ilkesi tüm siteye yayılıyor.

---

### FAZ 3 · MEKANİZMA (Explain) — 14 dk · `token-lab.html`

> **Fazın işi:** Faz 2'de gözlemlenen farkların **nedenini** göstermek. Anlatarak değil, oynatarak.

#### 3.1 · Token Avı (5 dk) — mevcut tokenizer **oyuna dönüşüyor**

Ekranda bir hedef cümle ve bir sayaç:

> *"Şu isteği aynı anlamı koruyarak **en az token'la** yaz:*
> *'Yapay zekânın su tüketimini bir lise öğrencisine üç maddede anlat.'"*
> **Şu an: 24 token · Hedefin: 15 token altı · Rekorun: —**

- Canlı sayaç zaten var (`core/tokenize.js`, gerçek o200k tokenizer) — üstüne hedef, rekor ve "kilitlendi" durumu eklenir.
- Rekor deftere yazılır, Faz 4 turnuva skoruna girer.
- Ardından tek cümlelik ders: **girdi token'ı ucuz, çıktı token'ı pahalı** — ve neden.

#### 3.2 · Kendi kelimenle: TR / EN (3 dk)

Mevcut sabit tablo, **öğrencinin yazdığı kelime çiftiyle** dolan bir tabloya dönüşür.

- Öğrenci kendi kelimesini dener: "Su/Water" neredeyse aynı, "Sürdürülebilirlik/Sustainability" değil.
- **Mit yıkımı korunur:** model önce İngilizceye çevirmez. Ama artık öğrenci bunu okumuyor, **ölçüyor**.

#### 3.3 · Difüzyon: neden görsel pahalı? (3 dk) — **G1'in cevabı**

Mevcut `diffCanvas` animasyonu korunur (sitenin en iyi anlatım parçası). Eklenen tek şey bir bağ:

> *"Faz 2'de sorduk: görsel neden metinden pahalı? Cevap burada — **+1 adım**'a basmaya devam et."*
> Her adım = büyük modelden tam bir geçiş. 40 adım = 40 geçiş. Metin: 1 geçiş.

#### 3.4 · Üç kaldıraç (3 dk) — hesaplayıcı **keşif görevine** dönüşüyor

Mevcut enerji & su hesaplayıcısı kalır ama üstüne tek bir görev konur:

> *"Üç şeyi değiştirebilirsin: **çıktı uzunluğu**, **düşünme eforu**, **deneme sayısı**.
> Hangisi toplam maliyeti en çok düşürüyor? Bul ve deftere yaz."*

Öğrenci eforu açıp kapattığında yanında **ölçülmüş** bir çapa belirir — artık tahmin değil, veri:

> **Aynı model, aynı soru, tek fark düşünme:**
> DeepSeek-R1-70B · düşünme **kapalı**: **0,05 Wh** · düşünme **açık**: **7,63 Wh** → **154 kat**
> Ölçülen 166 modelde ortalama: düşünen modeller **~30 kat** daha fazla enerji harcıyor.
> *Kaynak: Hugging Face AI Energy Score v2 (2025) — CodeCarbon ile ölçüm.*

Bu, `SITE_RULES` 7'deki *"düşünme her modelde vardır; mesele ne kadar düşünüldüğüdür"* ilkesinin **sayısal karşılığıdır** ve sitede şu ana kadar eksikti.

Cevap: çoğu senaryoda **deneme sayısı** ya da **düşünme eforu** — ve bu, Faz 4'ün tam olarak konusudur. Faz 3, Faz 4'ün sorusunu kurarak biter.

**Bu sayfadan çıkanlar:** Kaynakça slaytı → `kaynaklar.html`. Video modu → hesaplayıcı içinde isteğe bağlı sekme (akış adımı değil).

---

### FAZ 4 · YEŞİL PROMPT TURNUVASI (Elaborate) — 16 dk · `prompt-muhendisligi.html`

> **Fazın işi:** `review.md` §2.3'ün kapatılması. Ölçüm döngüsü burada kapanır:
> **kötü prompt → ÖLÇ → düzelt → TEKRAR ÖLÇ → azalmayı sayıyla gör.**

#### 4.1 · A/B Prompt Düellosu (9 dk) — **sitenin en büyük yeni yapısı**

İki kutu yan yana. Sol: verilen kötü prompt (değiştirilemez). Sağ: takımın yazdığı hâli.

```
┌─ A · Verilen ──────────────┐   ┌─ B · Sizin hâliniz ────────┐
│ "Bana yapay zeka ve çevre  │   │ [öğrenci yazar]            │
│  hakkında bir şeyler yaz." │   │                            │
├────────────────────────────┤   ├────────────────────────────┤
│ girdi   12 token           │   │ girdi   28 token           │
│ çıktı   ~1200 token        │   │ çıktı   ~150 token         │
│ deneme  ×3                 │   │ deneme  ×1                 │
│ ────────────────────────── │   │ ────────────────────────── │
│ 4,3 Wh · 16 mL · 0,54 gCO₂ │   │ 0,4 Wh · 1,5 mL · 0,05 g   │
└────────────────────────────┘   └────────────────────────────┘

            ┌──────────────────────────────────┐
            │   %91 daha az enerji  ·  −11× su │
            └──────────────────────────────────┘
```

**Dürüstlük kuralı (`SITE_RULES` 1.4):** Site "kaç deneme gerekirdi" diye bir sayı **uydurmaz**. Deneme sayısını **takım girer** — tercihen gerçekten denedikten sonra. Yanında tek cümlelik uyarı: *"Deneme sayısını tahmin etme, ölç. Denemediysen 1 bırak — ama gerçek hayatta belirsiz prompt tek denemede bitmez."*

Üç tur, her turda yeni bir kötü prompt:
- **Tur 1 (metin):** yukarıdaki örnek — çıktı uzunluğu kaldıracı
- **Tur 2 (görsel):** *"Güzel bir gelecek şehri."* — deneme sayısı kaldıracı
- **Tur 3 (araç seçimi):** aynı görev, iki model — **Faz 1'deki 88 kat buraya döner**

#### 4.2 · Sekiz teknik: kart oyunu (4 dk)

Mevcut 8 statik teknik kartı bir eşleştirme oyununa dönüşür:

> Ekranda bozuk bir prompt. Altında 8 teknik kartı. *"Bu promptu hangisi düzeltir?"*
> Seçince: düzeltilmiş hâli + **hangi maliyet kaldıracının düştüğü** gösterilir.

5 tur, her tur farklı bir kaldıraç. Doğru cevap puanı turnuva skoruna eklenir.
`revised_plan.md` EK F.1'deki tablo aynen kaynak olarak kullanılır — içerik hazır, yalnızca etkileşim yazılır.

#### 4.3 · Skor kartı + turnuva kodu (3 dk)

Takımın skoru üç girdiden hesaplanır:

```
Yeşil Prompt Skoru = tasarruf yüzdesi (%50)
                   + teknik oyunu doğruları (%30)
                   + token avı rekoru (%20)
```

Site skoru hesaplar ve **doğrulanabilir bir turnuva kodu** üretir: `YP-73-412` (skor + takım no'dan türetilir).
Takım kodu tahtaya yazar; eğitmen sıralar.

> ⚠️ **Neden böyle:** Sitenin sunucusu yok (`README`: saf statik, GitHub Pages). Gerçek zamanlı canlı liderlik tablosu **yapılamaz** — uydurulmaz da. Tahta + kod, sıfır altyapıyla çalışan ve tamamen dürüst olan çözümdür.

Faz, mevcut **yazdırılabilir "Yeşil Prompt Kuralları" kartıyla** biter — ama artık kartın üstünde takımın kendi skoru ve kendi en iyi promptu yazılıdır.

**Bu sayfadan çıkanlar:** Shot tipleri (zero/one/few) → **arşiv** (`review.md` §3.3: yeşil prompt konusu değil). Kaynakça → `kaynaklar.html`.

---

### FAZ 5 · ÖLÇ & SERGİ (Evaluate) — 10 dk · `hesaplayici.html` → `index.html`

> **Fazın işi:** Tek görsel, ölçülmüş bedel, sergiye giren damga — ve öğrencinin kendi ilk cümlesiyle yüzleşmesi.

#### 5.1 · Tek görsel (4 dk)

**Ekolojik tutarlılık ilkesi korunur** (`revised_plan.md` 4. Aşama): her takım **1, en fazla 2** görsel üretir. Faz 4'te olgunlaşmış prompt kullanılır.

**Araç listesi 29 → 8'e iner** (`review.md` §3.2 — planın kendi ilkesi bunu gerektiriyor):

| Kalan | Neden |
|---|---|
| FLUX.1-schnell · SDXL · SD 3.5 · DALL·E · Bing | `basis: 'olcum'` — bağımsız ölçümü var |
| Craiyon · Perchance · +1 HF Space | Gerçekten üyeliksiz ve ücretsiz |

Kapalı ve ücretli araçlar (Midjourney, GPT Image, Seedream, Firefly, Recraft, Leonardo…) listeden çıkar — çıkarma gerekçesi **Yöntem slaytında bir cümleyle açıklanır**, gizlenmez. `basis: 'tahmin'` mekanizması ve turuncu rozet, kalan araçlarda aynen korunur.

> ⏱️ **Zaman riski — eğitmen notu:** Ücretsiz araçlarda kuyruk 2–3 dakika sürebilir. **Çözüm:** üretim, Faz 4.3 (skor kartı) sırasında **arka planda** başlatılır. Site Faz 4'ün sonunda şu hatırlatmayı basar: *"Promptunuz hazır — şimdi üretimi başlatın, skor kartınızı doldururken çalışsın."*

#### 5.2 · Ölç ve damgala (3 dk)

Mevcut hesaplayıcı aynen çalışır: araç · boyut · varyant · deneme → Wh · mL · gCO₂ · telefon şarjı → **hazır `GALLERY` satırı** → kopyala → sergiye ekle. Sergi–hesaplayıcı döngüsü sitenin en güçlü parçası, **hiç bozulmuyor** (`review.md` §7).

Tek ekleme: damganın üstünde **takım adı** ve **turnuva kodu**.

#### 5.3 · "Başta ne demiştin?" (3 dk) — kapanış

Defter geri açılır. Öğrenci yan yana görür:

| Faz 1'de yazdığın | 70 dakika sonra ölçtüğün |
|---|---|
| *"Çikolata ≈ 200 şarj"* | Gerçek: 3.450 (karbon) / 440 (enerji) |
| *"Fark 2 kat olur"* | **88 kat** |
| *"Bir yapay zekâ sorusunun bedelini kim ödüyor?"* → *[kendi cümlesi]* | *[şimdi ne diyorsun?]* → yeni kutu |

Altında üç maddelik **öz değerlendirme** (`revised_plan.md` 5. Aşama ölçütlerinden):
1. Metin ile görselin maliyet farkını açıklayabiliyor muyum?
2. Eğitim ile kullanım arasındaki farkı bir örnekle anlatabilir miyim?
3. Bir sonraki promptumda neyi değiştireceğim?

**🖨️ "Atölye Defterimi yazdır"** — tüm tahminler, gözlemler, skor, damga ve kurallar kartı tek sayfada. Öğrencide kalan somut çıktı.

---

## 5) ARŞİV VE KAYNAKLAR (akış dışı)

### `modeller.html` → **Arşiv · Meraklısına** (K2)

Zamanlı akıştan çıkar, menüde ikincil bağlantı olur. İçerik silinmez.
İki parça **fazlara taşınır**, geri kalan 8 slayt arşivde durur:

| Taşınan | Nereye | Neden |
|---|---|---|
| "Bir modeli eğitmek ne harcar?" (`#egitim-enerjisi`) özeti | Faz 2, görev G3'ün gözlem kutusunun altına küçük kart | Eğitim ≠ kullanım ayrımı orada doğuyor |
| "Aynı anda okumak = binlerce çip = enerji" kartı | Faz 3, difüzyon slaytının yanına tek cümle | Enerjinin mimariyle bağı orada gerekiyor |

Arşivde kalan: tarihçe · Transformer · model nasıl eğitilir · The Pile verisi · veri projeleri · güvenlik & etik · model aileleri · YZ Çağı. **Ek olarak buraya taşınanlar:** shot tipleri (Faz 4'ten).

Arşiv sayfasının başına tek cümle: *"Bunlar atölyenin 80 dakikasına sığmadı ama merak edenler için burada duruyor."*

### `kaynaklar.html` → **YENİ**

`modeller` · `token-lab` · `prompt-muhendisligi` · `hesaplayici` sayfalarındaki **dört ayrı tam ekran kaynakça slaytı** tek sayfada birleşir (`review.md` §3.5 — akışta 4 ölü slayt). Materyal havuzu (`MATERIALS`) da buraya taşınır.

Üç bölüm: **Atölye materyalleri** (CSV'ler, CODAP, AI Studio) · **Veri kümeleri** · **Kaynakça (APA)**.
Her faz sayfasının altında ince bir satır: *"Bu fazın kaynakları →"* ilgili çapaya gider.

---

## 6) VERİ İŞİ — hangi dosya, nereden

### 6.1 `assets/data/enerji_verileri.csv` — güncellenir

Mevcut 15 satır kalır, üç düzeltme yapılır:

| Düzeltme | Neden |
|---|---|
| LED satırı **8 W**'a çekilir (`10W` → `8W`) | `review.md` §4.2: CSV 10 W, `units.config.js` 8 W. Aynı atölyede iki farklı gerçek olamaz. CSV config'e uyar. |
| **Su satırları eklenir**: 1 e-posta (Llama-3-70B / GPT-4), 1 rapor (Llama-3-70B / GPT-4) | Faz 1.2 ve Faz 2/G2'nin veri dayanağı. Hakemli kaynak (Shumba vd., 2025). |
| `Kaynak` sütununda türetilen su değerleri **açıkça işaretlenir** | `SITE_RULES` 7: "3,69 L/kWh ile türetildi" zaten yazıyor, tutarlı hâle getirilir |

### 6.2 `assets/data/modeller.csv` — **YENİ** · sekiz aile, hiçbiri çıkarılmıyor (K3)

GPT · Gemini · Claude · Grok · DeepSeek · Qwen · Llama · Mistral — **hepsi tabloda.** Ama her satır, sayının nereden geldiğini söyleyen bir **şeffaflık rozeti** taşır. Site zaten bu deseni biliyor: `SITE_RULES` 4c'deki `basis: 'olcum' / 'tahmin'` ayrımı ve turuncu rozet. Aynı mimari veri setine genişletiliyor.

**Şeffaflık rozetleri:**

| Rozet | Anlamı | Örnek |
|---|---|---|
| 🟢 **resmî** | Üretici sayıyı **yöntemiyle birlikte** yayımladı | Gemini · Llama · DeepSeek · Mistral |
| 🟡 **beyan** | Şirket bir sayı söyledi ama **yöntemini yayımlamadı** | ChatGPT (Altman, 2025) |
| 🔵 **bağımsız ölçüm** | Üretici değil, araştırmacı **ölçtü** | HF AI Energy Score · Luccioni vd. · Shumba vd. |
| 🟠 **bağımsız tahmin** | Kimse ölçmedi; yöntemi açık bir tahmin | Epoch AI · EcoLogits |

**Sütunlar:** `Model, Kurum, Yil, Katman, Deger, Birim, Karbon_g, Su_mL, Bolge, Kaynak, Seffaflik`

#### Katman A — KULLANIM (öğrencinin gerçekten yaptığı şey)

| Model | 1 sorgu | Su | CO₂ | Kaynak | Rozet |
|---|---|---|---|---|---|
| **Gemini** (medyan metin promptu) | 0,24 Wh | 0,26 mL | 0,03 g | Google, arXiv 2508.15734 | 🟢 |
| **ChatGPT** (ortalama sorgu) | 0,34 Wh | ~0,32 mL | — | Altman (2025), OpenAI | 🟡 |
| **Mistral Large 2** (400 token soru+cevap) | — | 45 mL | 1,14 g | Mistral + Carbone 4 / ADEME LCA | 🟢 |
| **Llama-3-70B** (250 token e-posta) | ~10 Wh | 120 mL | — | Shumba vd. (2025), COMPASS | 🔵 |
| **GPT-4** (250 token e-posta) | ~232 Wh | 2.600 mL | — | Shumba vd. (2025), COMPASS | 🔵 |
| **Claude 3.7 Sonnet** (kısa sorgu) | ~0,84 Wh | — | — | EcoLogits | 🟠 |
| **DeepSeek-R1-70B** · düşünme **kapalı** | 0,05 Wh | — | — | HF AI Energy Score v2 | 🔵 |
| **DeepSeek-R1-70B** · düşünme **açık** | 7,63 Wh | — | — | HF AI Energy Score v2 | 🔵 |

> Son iki satır **aynı modeldir**: yalnızca düşünme açılmıştır. **154 kat.** Bkz. Faz 3.4.

#### Katman B — EĞİTİM (tek seferlik ama dev)

| Model | Enerji | Karbon | Kaynak | Rozet |
|---|---|---|---|---|
| **Llama 3.1 405B** | 30,84 M GPU-saat × 700 W ≈ **21.588 MWh** | 8.930 t (yer bazlı) · 0 t (piyasa bazlı) | Meta model kartı | 🟢 |
| **Llama 3.1 ailesi** (8B+70B+405B) | 39,3 M GPU-saat ≈ **27.510 MWh** | 11.390 t · 0 t | Meta model kartı | 🟢 |
| **DeepSeek-V3** | 2,788 M H800-saat × 350 W ≈ **976 MWh** | — | DeepSeek-V3 teknik raporu (arXiv 2412.19437) | 🟢 |
| **Mistral Large 2** | — | **20.400 t** · 281.000 m³ su | Mistral LCA (Carbone 4/ADEME) | 🟢 |
| **GPT-3 175B** | **1.287 MWh** | 552 t | Patterson vd. (2021) | 🟢 |
| **PaLM 540B** | **3.436 MWh** | 271 t | Patterson vd. / Google | 🟢 |
| **BLOOM 176B** | **433 MWh** | 24,7 t | Luccioni vd. (2022) | 🟢 |
| **GPT-4** | ≈ **45.473 MWh** | — | Epoch AI (güç × süre) | 🟠 |
| **Grok 3** | ≈ **237.489 MWh** | — | Epoch AI (güç × süre) | 🟠 |
| **Gemini 1.0 Ultra** | ≈ **92.217 MWh** | — | Epoch AI (güç × süre) | 🟠 |
| **Claude 3.7 Sonnet** | 3,35e25 FLOP → türetilir | — | Epoch AI | 🟠 |
| **Qwen3-Max** | 1,51e25 FLOP → türetilir | — | Epoch AI | 🟠 |

`Su_mL` sütunu, kaynağında su değeri **olmayan** satırlarda `3,69 L/kWh` ile türetilir ve `Kaynak` sütununda türetildiği yazılır (`SITE_RULES` 7). Mistral ve Google gibi kendi su ölçümünü yayımlayanlarda **onların değeri** kullanılır.

> ⚠️ **Uygulama öncesi doğrulanacak iki satır:** Claude 3.7 Sonnet'in ~0,84 Wh değeri ikincil kaynaklardan geliyor; **EcoLogits hesaplayıcısından birinci elden alınmalı** ve sürümü yazılmalı. Qwen'in eğitim enerjisi Epoch FLOP'undan türetilecekse, kullanılan donanım verimliliği varsayımı `Kaynak` sütununda **açıkça yazılmalı** — yoksa türetme, ölçüm gibi görünür.

### 6.3 ⚠️ Bir düzeltme: `llmenergy.csv` hakkındaki ilk hükmüm yanlıştı

İlk taslakta bu dosyanın Epoch ile "1,5–3 kat çeliştiği" için kullanılamayacağını yazmıştım. **Doğrulayınca örüntü tersine çıktı:**

| Model | Üretici GPU-saatini yayımlıyor mu? | `llmenergy.csv` | Resmî/Epoch | Fark |
|---|---|---|---|---|
| Llama 3.1 405B | **EVET** (Meta model kartı) | 24.841.800 kWh | 24.826.200 kWh | **%0,06** |
| DeepSeek-V3 | **EVET** (teknik rapor) | 1.123.598 kWh | 1.122.170 kWh | **%0,13** |
| GPT-4 | HAYIR | 16.099.378 kWh | 45.473.159 kWh | **2,8 kat** |
| Grok 3 | HAYIR | 154.000.000 kWh | 237.489.097 kWh | **1,5 kat** |

İki kaynak çelişmiyor. **Üreticinin GPU-saatini açıkladığı yerde binde bir uyuşuyorlar** (`llmenergy.csv` o GPU-saatlerine PUE uygulamış — hesabı birebir yeniden ürettim). Yalnızca **kimsenin bir şey açıklamadığı yerde** ayrılıyorlar.

Yani sorun veri kümelerinde değil, **kaynağında.**

### 6.4 Atölyenin en sert bulgusu — Faz 2 / G5

Yukarıdaki tablo Faz 2'de bir görev kartına dönüşür:

> **Görev:** `Seffaflik` sütununu renge sürükle. Sonra şu soruyu cevapla:
> *"En çok kullandığın üç yapay zekâyı yaz. Kaçı yeşil?"*

Beklenen keşif: **En çok kullandığımız modeller, hakkında en az şey bildiklerimiz.**
Ağırlıkları indirilebilen modeller (Llama, DeepSeek, Mistral, BLOOM) sayılarını yayımlıyor; en çok konuşulan kapalı modeller yayımlamıyor.

Dış dayanak — 2025 Foundation Model Transparency Index (Stanford CRFM):

> *"10 şirket çevresel etkiye dair anahtar bilgilerin hiçbirini açıklamıyor: AI21 Labs, Alibaba, Amazon, Anthropic, DeepSeek, Google, Midjourney, Mistral, OpenAI ve xAI."*
> Ayrıca: eğitim hesabını (compute) açıklama alanında **yalnızca IBM ve Writer** tam puan aldı.

> ⚠️ **Nüans — öğrenciye de söylenecek:** Google ve Mistral bu listede olmalarına rağmen ciddi belgeler yayımladı. Çelişki değil: FMTI, şirketin **yeni çıkardığı modelin belgesinde** çevre bilgisi olup olmadığına bakıyor. Google'ın makalesi tüm sunum filosunun **medyanını** ölçüyor, tek bir modelin eğitimini değil; Mistral'in ölçtüğü model ise artık **güncel amiral gemisi değil**. İkisi de doğru. *"Bir şirket bir kez şeffaf olduysa, hep şeffaftır"* demek yanlış — bunu ayırt edebilmek, bu atölyenin öğrettiği okuma biçimidir.

Bu kart `SITE_RULES` 1.4'ün öğrenciye görünen hâlidir ve atölyenin veri okuryazarlığı damarının zirvesidir.

### 6.4 Su birimi — `units.config.js` + `units.js` (`review.md` ⑤)

Enerji için telefon şarjı ne yapıyorsa, su için de **500 mL şişe** aynısını yapar:

```js
waterBottleMl: 500        // units.config.js'e eklenir
Units.waterText(ml)       // units.js'e eklenir
```

- 1250 mL → *"2,5 şişe su"*
- 120 mL → *"bir şişenin dörtte biri kadar"* (bir şişeden küçükse **oran olarak** yazılır — `phoneText()` ile birebir aynı mantık, `SITE_RULES` 7'nin su karşılığı)

**Tek birim ilkesi suya da uygulanır:** sitedeki her "bu kadar su" cümlesi `Units.waterText()`'ten geçer. Bardak/duş/havuz gibi ikinci bir birim **eklenmez**.

---

## 7) UYGULAMA SIRASI

| Sıra | İş | Neden bu sırada | Etki |
|---|---|---|---|
| **1** | `core/defter.js` + `core/tahmin.js` + `core/faz.js` | Diğer her şey bunların üstüne kurulu | Altyapı |
| **2** | `units.js` → `waterText()` · `units.config.js` → şişe · CSV'de LED 8 W | Ucuz, her sayfayı etkiliyor | Tutarlılık |
| **3** | `veri-labi.html` + görev kartları + `modeller.csv` | **En büyük boşluk** (22 dk, sitede karşılığı yok) | ⭐⭐⭐ |
| **4** | `atolye.html` → Faz 1 (2 tahmin + 3 açık uç) | Atölyenin ilk 12 dakikası | ⭐⭐⭐ |
| **5** | `prompt-muhendisligi.html` → A/B düellosu | Ölçüm döngüsünü kapatır | ⭐⭐⭐ |
| **6** | `token-lab.html` → token avı + kaldıraç görevi | Mevcut parçaların oyunlaştırılması | ⭐⭐ |
| **7** | `hesaplayici.html` → araç listesi 8'e iner + defter geri dönüşü | Kapanış | ⭐⭐ |
| **8** | `kaynaklar.html` + `modeller.html` → arşiv + faz rayı | Kırpma ve toparlama | ⭐⭐ |
| **9** | `?egitmen=1` şeridi | Son; içerik oturduktan sonra yazılır | ⭐ |
| **10** | `SITE_RULES.md` + `README.md` güncellemesi | Kural belgesi koddan geri kalmamalı | Zorunlu |

**Her adımda korunacak kurallar** (`SITE_RULES`): tek CSS dosyası · satır-içi stil yok · `:root` değişkenlerine dokunulmaz (yeni stiller **19. bölüm "Atölye fazları"** olarak eklenir) · içerik config-driven · uydurma veri yok · 14 yaşındaki biri ilk okuyuşta anlamalı · slayt motoru ortak · sergiye dokunulmaz · ses yok · her yeni animasyona `prefers-reduced-motion` kapatma kuralı.

---

## 8) YENİ MATERYALLERİN DEĞERLENDİRMESİ

### 8.1 Kullanılacaklar ✅

| Materyal | Nerede kullanılıyor | Değeri |
|---|---|---|
| **Shumba vd. (2025)** — *A Water Efficiency Dataset for African Data Centers* (COMPASS '25, hakemli) | **Faz 1.2 (88 kat)** · Faz 4 Tur 3 · CSV su satırları | ⭐ **En değerli yeni kaynak.** Aynı görev + iki model = 0,6 L vs 53 L. Model seçimini tek bir hakemli sayıyla atölyenin merkezine koyuyor. Ayrıca ülke/iklim/PUE/sızıntı boyutu getiriyor. |
| **`all_ai_models.csv`** (Epoch AI, 3.574 model) | `modeller.csv` Katman B'nin 🟠 kaynağı · G4 | Yöntemi yayımlanmış, en geniş doğrulama tabanı. 773 modelde eğitim gücü, 554'ünde süre → enerji hesaplanabilir. Sekiz ailenin **hepsi** var. |
| **`llmenergy.csv`** (Kaggle, 28 model) | Katman B çapraz kontrolü + **§6.3'ün kendisi** | İlk sandığımdan değerli: üreticinin GPU-saatine PUE uygulamış. `Bolge` · `Karbon_Yogunlugu` · `PUE` sütunları G4'ü mümkün kılıyor. |
| **Meta Llama 3.1 model kartı** | Katman B 🟢 | 39,3 M GPU-saat (405B: 30,84 M), H100 700 W, 11.390 t CO₂e yer bazlı / 0 piyasa bazlı. Model kartında çevre verisi yayımlayan **tek büyük ABD şirketi**. |
| **Mistral Large 2 LCA** (Carbone 4 · ADEME · Resilio · Hubblo) | Katman A + B 🟢 | Bir dil modelinin **ilk tam yaşam döngüsü analizi**: veri merkezi inşaatı + donanım üretimi + eğitim + kullanım. 20.400 t CO₂e · 281.000 m³ su · 400 token başına 1,14 g + 45 mL. |
| **Google, arXiv 2508.15734** | Katman A 🟢 | Gemini medyan metin promptu: 0,24 Wh · 0,03 gCO₂e · 0,26 mL. Ayrıca değerli bir ders: **yalnızca hızlandırıcıya bakmak maliyeti 2,4 kat düşük gösteriyor** (0,10 Wh). "Neyi saydığın sonucu değiştirir." |
| **DeepSeek-V3 teknik raporu** (arXiv 2412.19437) | Katman B 🟢 | 2,788 M H800 GPU-saat — kapalı modellerin aksine tam sayı yayımlanmış. |
| **HF AI Energy Score v2** (2025) | **Faz 3.4** · Katman A 🔵 | Düşünme açık/kapalı ölçümü: ortalama **30 kat**, tek tek modellerde **150–700 kat**. Sitenin "düşünme bütçesi" ilkesinin eksik olan sayısal dayanağı. 166 model, CodeCarbon ile ölçüm. |
| **Stanford CRFM — 2025 Foundation Model Transparency Index** | **Faz 2 / G5** · §6.4 | Şeffaflık bulgusunun dış dayanağı: 10 şirket çevresel etkiye dair hiçbir şey açıklamıyor; eğitim hesabında yalnızca IBM ve Writer tam puan. |
| **EESI** — *Data Centers and Water Consumption* | Faz 1.2 yan kartı | *100 kelimelik prompt ≈ 519 mL (bir şişe su)* — öğrenciye en çarpıcı gündelik bağ. |
| **Lincoln Institute** — *Land and Water Impacts of the AI Boom* | Faz 2 pano sorusu 4 · arşiv | *2022'den beri kurulan veri merkezlerinin üçte ikisi su stresi olan bölgelerde* — "nerede" boyutunu insanlaştırıyor. UC Riverside'ın *20 sorgu ≈ 1 şişe* bulgusu da burada. |
| **CodeCarbon / EcoLogits Calculator** | Kaynaklar sayfası, "ileri gitmek isteyene" | Tarayıcıdan çalışan, kurulum gerektirmeyen gerçek bir hesaplayıcı. |

### 8.2 Dikkatli kullanılacaklar ⚠️

| Materyal | Sorun | Karar |
|---|---|---|
| **`llmenergy.csv`**'nin bazı satırları | Dosyanın geneli sağlam (§6.3), ama "Claude 3 Opus = 2000B parametre", "Gemini 1.0 Ultra = 80.000 GPU" gibi **hiçbir yerde doğrulanamayan** satırlar da içeriyor. | Doğrulanan satırlar 🟢/🟠 rozetiyle alınır; doğrulanamayanlar **alınmaz.** Dosya toptan kabul veya toptan ret edilmez, satır satır süzülür. |
| **Claude ve Qwen** | Anthropic hiçbir enerji/su verisi yayımlamıyor. Alibaba'nın Stanford'a verdiği şeffaflık raporu da enerji, karbon, su ve hesap için **"bilgi yok"** diyor. | Tabloda **kalıyorlar** — 🟠 rozetiyle ve Epoch/EcoLogits tahminiyle. Boşluk gizlenmiyor, **etiketleniyor**; G5'in bulgusu zaten tam olarak bu. |
| **watercost.live** | Sitenin kendi ifadesiyle *"simulated visualizations scaled from real-world estimates"* — canlı gibi görünen sayaçlar simülasyon. | **Sayı kaynağı olarak kullanılmaz** (`SITE_RULES` 1.4). Yalnızca Faz 1'in sonunda 20 saniyelik bir görsel kanca olarak eğitmen gösterebilir; sitede sayısı geçmez. |
| **George vd. (2023)** — *Environmental Impact of AI: ChatGPT Water* | Dergi hakem süreci zayıf (PUII Journal); "500 mL / 20–50 soru" ve "eğitimde 700.000 L" rakamları **UC Riverside'ın Li vd. çalışmasından türetme**. | Birincil kaynak olarak kullanılmaz. Aynı bulgular için **Li vd. / Lincoln Institute** atfı kullanılır. |
| **`Experiment Documentation.pdf`** | Metodoloji ders olarak çok değerli ama ölçüm sonuçları **sınıf içi bir deney** (sabit 65 W TDP varsayımı, `.split()` ile token sayımı, 5 küçük yerel model). | **Sayı olarak kullanılmaz.** Ama **arşive bir "Nasıl ölçülür?" kartı** olarak girer: varsayım listesi, J→kWh→gCO₂ zinciri, 475 gCO₂/kWh emisyon çarpanı. Öğrenciye "bu sayılar nereden geliyor" sorusunun somut cevabı. |

### 8.3 Kullanılmayacaklar

**`Is Water Usage in AI Data Centres Sustainable` (impakter.com)** — sertifika hatası nedeniyle içeriği doğrulanamadı. Doğrulanmadan kaynakçaya girmez; erişilebilirse tekrar bakılır.

---

## 9) DEĞİŞENLERİN ÖZETİ — `review.md` maddelerine karşılık

| `review.md` maddesi | Bu planda |
|---|---|
| ① Engage sayfası (çikolata ↔ telefon) | ✅ **Faz 1.1** — üstelik üç eksenli (enerji/karbon/su) |
| ② CODAP görev sayfası | ✅ **`veri-labi.html`** — 4 görev kartı, tahmin-önce ritüeli, 22 dk |
| ③ A/B prompt karşılaştırıcısı | ✅ **Faz 4.1 Düello** — 3 tur, ölçülü deneme sayısı |
| ④ Kırpma (27 → ~18 slayt) | ✅ **27 → 21**, ama etkileşimli slayt 3 → 13 |
| ⑤ Su birimi · LED · hesaplayıcı rolleri | ✅ `Units.waterText()` · LED 8 W · Faz 3 = promptunu ölç, Faz 5 = eserini ölç |
| §2.4 Sergi karşılaştırma işlevini kaybetmiş | ⚠️ **Kapsam dışı** — sergiye dokunulmuyor (K5). Faz 4 Tur 3 ve Faz 5 damgası aynı prompt/farklı araç eserlerini doğal olarak üretecek; sergi kürasyonu ayrı bir iş olarak kalıyor. |
| §2.6 Eğitmen için hiçbir şey yok | ✅ `?egitmen=1` şeridi — her fazda süre, söylenecek, tartışma soruları |
| §7'deki korunacaklar | ✅ Dürüstlük mimarisi · tek birim ilkesi · sergi↔hesaplayıcı döngüsü · `variants` alanı — hepsi aynen duruyor |

---

## 10) İLERLEME

- [ ] 1 · `core/defter.js` · `core/tahmin.js` · `core/faz.js`
- [ ] 2 · Su birimi · LED 8 W · CSV tutarlılığı
- [ ] 3 · `veri-labi.html` + `modeller.csv` (8 aile, şeffaflık rozetli)
- [ ] 4 · `atolye.html` → Faz 1
- [ ] 5 · `prompt-muhendisligi.html` → Faz 4 turnuvası
- [ ] 6 · `token-lab.html` → Faz 3
- [ ] 7 · `hesaplayici.html` → Faz 5 + araç listesi 8'e
- [ ] 8 · `kaynaklar.html` · `modeller.html` arşiv · faz rayı
- [ ] 9 · Eğitmen modu
- [ ] 10 · `SITE_RULES.md` · `README.md`
