# Site–Plan Uyum İncelemesi ve Revizyon Yol Haritası

> **Tarih:** 08.08.2026
> **Kapsam:** `yesilprompt.com` sitesinin, `plans/sustainable_prompting.md` (v1) ve
> `plans/revised_plan.md` (v2) etkinlik planlarıyla karşılaştırılması.
> **Amaç:** Sitede planın karşılığı olmayan eksikleri, plana ait olmayan fazlalıkları ve
> iki kaynak arasındaki tutarsızlıkları tespit etmek; önceliklendirilmiş bir revizyon
> yol haritası çıkarmak.
>
> Bu belge bir **değerlendirmedir**, uygulanmış bir değişiklik kaydı değildir.
> Maddeler uygulandıkça buradan işaretlenmelidir (bkz. son bölüm: İlerleme).

---

## 1) TEMEL TESPİT — Ölçek uyuşmuyor

| | Plan | Site (inceleme anındaki hâli) |
|---|---|---|
| Toplam etkinlik süresi | **80 dk** (40+40 blok) | — |
| Sitenin payı (3. Aşama Explain + 4. Aşamanın bir kısmı) | **~25–30 dk** | — |
| İçerik slaytı sayısı | — | **27** (+5 footer slaytı) |

Slayt başına yaklaşık **55 saniye** düşüyor.

> **Sitenin en büyük sorunu budur: bir atölye aracı değil, bir ansiklopedi hâline gelmiş.**
> Aşağıdaki eksik ve fazla tespitlerinin çoğu bu tek tespitten türemektedir.

**Sayfa başına slayt dağılımı (inceleme anında):**

| Sayfa | Slayt | Planda karşılığı |
|---|---|---|
| `atolye.html` | 2 | 1. Aşama (Engage) — **karşılığı eksik** |
| `modeller.html` | 10 | EK E — "mini zaman tüneli", tek bölüm |
| `token-lab.html` | 5 | 3. Aşama (Explain) — dengeli |
| `prompt-muhendisligi.html` | 6 | EK F — dengeli |
| `hesaplayici.html` | 4 | 4. Aşama (Elaborate) — dengeli |

Dengesizlik `modeller.html` ile `atolye.html` arasındadır: planın en kısa bölümü sitenin
en uzun sayfası, planın en uzun aşaması ise sitenin en kısa sayfası olmuş.

---

## 2) EKSİKLER (önem sırasına göre)

### 2.1 — Açılış kancası (Engage) sitede hiç yok · ⚠️ EN KRİTİK
Plan derse çikolatayla giriyor:

> *"1 kg çikolata üretimi ≈ 19.000 g CO₂ ≈ yaklaşık 3000 telefon şarjı kadar karbon ayak izi."*

Bu, atölyenin **duygusal girişi** ve **tek fiziksel dünya çıpası**. Sitede karşılığı yok.
Üstelik veri hazır: `assets/data/enerji_verileri.csv` içinde çikolata, hamburger ve süt
satırları duruyor ama **hiçbir sayfa bu satırlara dokunmuyor.**

**Sonuç:** Site doğrudan yapay zekâdan başlıyor. "Görünmeyen maliyet" fikri kurulmadan
token anlatılıyor; öğrenci neden umursaması gerektiğini bilmeden teknik içeriğe giriyor.

### 2.2 — CODAP aşaması sitede hiç yok · ⚠️ 80 dakikanın 30'u
`enerji_verileri.csv` `assets/data/` altında duruyor ve footer'da bağlantısı var; hepsi bu.

Eksik olanlar: görev kartı · hangi grafiğin kurulacağı · eksende ne olacağı ·
"neye bakacaksın" soruları · beklenen sonuç / tartışma soruları.

**Sonuç:** Etkinliğin **en uzun aşaması**, sitenin **en zayıf noktası**. Eğitmen
doğaçlama yapmak zorunda kalıyor.

### 2.3 — Hackathon'un ölçüm döngüsü kapanmıyor
Planın (v2, 4. Aşama + EK F.4) can damarı şu döngüdür:

```
kötü prompt → ÖLÇ → düzelt → TEKRAR ÖLÇ → azalmayı sayıyla gör
```

Sitede Önce/Sonra bölümü var ama **statik bir karttır**. Öğrenci:
- kendi promptunu ölçüp kaydedemiyor,
- iki promptu yan yana koyup karşılaştıramıyor,
- "ne kadar tasarruf ettim?" sorusuna sayısal cevap alamıyor.

Token Lab hesaplayıcısı bunu yapabilecek altyapıya sahip, ancak **A/B karşılaştırma
modu yok.** Planın *"azalmayı sayısal görürler"* cümlesi karşılıksız kalıyor.

### 2.4 — Sergi, karşılaştırma işlevini kaybetmiş
Plan v2 (EK A + 4. Aşama) serginin pedagojik çekirdeğini şöyle tanımlıyor:

> *Aynı prompt, 3–4 farklı araç, yan yana → araç seçimi maliyeti kaç kat değiştiriyor?*

Mevcut galeride 6 eser var: **6 farklı prompt, 6 farklı model.** Görsel olarak güzel
ama **hiçbir şey karşılaştırılamıyor.** Sergi, bir öğrenme aracından bir vitrine dönüşmüş.

### 2.5 — Su, enerjinin gölgesinde kalmış
Plan v2 suyu enerjiyle **eşit ağırlıkta** konumluyor ("enerji **ve** su"; başlıkta,
CODAP görevinde ve damgada ayrı ayrı geçiyor).

Sitede su, altı metrik kutucuğundan biri: *"5,54 mL"*. Bu sayı bir öğrenciye hiçbir şey
anlatmıyor. Telefon şarjının enerji için yaptığını su için yapan **gündelik bir birim yok**
(bardak, şişe, duş süresi). `units.config.js` içinde su için gündelik çevirici tanımlı değil.

### 2.6 — Eğitmen için hiçbir şey yok
Site tamamen öğrenciye bakıyor. Bir TÜBİTAK 4004 etkinliğinde eğitmenin ihtiyacı olanlar:
akış · süre yönetimi · ne söyleyeceği · tartışma soruları · değerlendirme ölçütü.

`plans/` klasörü var ama **atölye anında kullanılabilir hâlde değil** (iki markdown dosyası,
biri diğerinin revizyonu; hangisinin geçerli olduğu dosyadan anlaşılmıyor).

---

## 3) FAZLALIKLAR — plana ait olmayan / atölyeye sığmayan içerik

### 3.1 — `modeller.html` 10 slayt, planda karşılığı tek bölüm
Plan EK E bunu **"mini zaman tüneli"** olarak tarif ediyor. Site bu sayfaya tek başına
25+ dakikalık içerik koymuş. İçinde **iki planın hiçbirinde geçmeyen** iki blok var:

- **Güvenlik & Etik** (`#guvenlik`) — RLHF, Anayasal YZ, kırmızı takım, filtre.
  Konu değerli, ama bu atölyenin konusu değil. Kapsam kayması.
- **Yapay Zeka Çağı / şirket değerleri grafiği** (`#cag`) — NVIDIA, OpenAI, Anthropic
  değerleri + TCMB rezervi kıyası. Planda yok **ve mesajı saptırıyor**: sürdürülebilirlik
  atölyesinde piyasa değeri grafiğinin işi ne?

### 3.2 — 28 araçlık liste, planın kendi ilkesini çiğniyor
Plan v2 EK A açıkça diyor ki:

> *"'Bedava' diye sunulup aslında saatlik kredi/refund veren ya da öğrenci hesabı isteyen
> araçlar **kullanılmaz**."*
> *"Tercih: üyeliksiz **ve modeli adı belli** araçlar — çünkü enerji tahmini ancak model
> bilinirse anlamlı olur."*

Sitedeki listede Midjourney, GPT Image 2, Seedream, Firefly, Recraft, Leonardo var —
çoğu ücretli ve/veya kapalı. Daha önemlisi: **28 aracın 23'ü `basis: 'tahmin'`.**

Rozetleme dürüst (bkz. SITE_RULES 4c), ama Midjourney seçen bir öğrencinin uydurma bir
sayıyı ölçüm sanma riski var. Atölyenin **3–4 araca** ihtiyacı var, 28'e değil.

### 3.3 — Shot tipleri (zero / one / few-shot)
İyi bir prompt mühendisliği konusu, ancak **yeşil** prompt konusu değil: hiçbir maliyet
kaldıracını düşürmüyor. İki planın da içinde yok.

### 3.4 — Token Lab'daki video modu
Planda tek cümle: *"Ses/Video: + zaman boyutu → katlanır."* Sitede model seçici + süre
kaydırıcısı + kare hesabı var. Güzel yapılmış ama 80 dakikalık akışta kullanılmayacak.

### 3.5 — Dört ayrı Kaynakça slaytı
`modeller`, `token-lab`, `prompt-muhendisligi`, `hesaplayici` sayfalarının her birinde
tam ekran bir Kaynakça slaytı var. Akademik olarak doğru; atölye akışında **4 ölü tam ekran.**

---

## 4) TUTARSIZLIKLAR

| # | Tutarsızlık | Sonucu |
|---|---|---|
| 4.1 | **İki ayrı hesaplayıcı var.** Token Lab'da metin/görsel/video, "Ne Kadar?"da görsel. | Öğrenci hangisini kullanacağını bilmiyor. Plan **tek** hesaplayıcı öngörüyor. |
| 4.2 | **LED ampul 8 W mı 10 W mı?** `units.config.js` → 8 W; `enerji_verileri.csv` → 10 W. | CODAP'ta çıkan sayı siteyle tutmuyor. Aynı atölyede iki farklı gerçek. |
| 4.3 | **Sergi anasayfa oldu, planda ise son aşama.** | Ziyaretçi için doğru; atölye katılımcısı için ters — enerji damgasının ne demek olduğunu öğrenmeden damgaları görüyor. Bilinçli bir karar olarak yeniden ele alınmalı. |
| 4.4 | **Atölye Girişi 2 slayta düştü** (hero kaldırıldıktan sonra). | Engage aşamasını taşıması gereken sayfa, sitenin en zayıf sayfası oldu. |

---

## 5) REVİZYON YOL HARİTASI

Öncelik sırası, **atölyede gerçekten boş olan yerleri doldurmak** ilkesine göre kuruldu.

### ① Engage sayfası ekle — *en yüksek etki*
- **Nerede:** `atolye.html`, açılış soruları slaytından **önce** 1–2 slayt.
- **Ne:** Çikolata ↔ telefon şarjı karşılaştırması. Etkileşimli tahmin:
  öğrenci "sence kaç şarj?" sorusuna tahminini girer → tıklar → gerçek açılır.
- **Veri:** `enerji_verileri.csv` içindeki fiziksel satırlar (çikolata, hamburger, süt)
  zaten hazır ve atıflı (Our World in Data / Poore & Nemecek, 2018).
- **Neden:** Atölyenin eksik olan **ilk 15 dakikası**. Fiziksel dünya çıpası kurulmadan
  dijital maliyet anlatısı havada kalıyor.

### ② CODAP görev sayfası ekle — *en uzun aşama için*
- **Nerede:** Yeni bir sayfa ya da `atolye.html` içinde 2–3 slayt.
- **Ne:** CSV'yi indir → CODAP'ı aç → şu 3 grafiği kur → şu 4 soruyu cevapla.
  Ekran görüntüsü / adım adım görsel yönerge ile.
- **Grafikler (plandan):** (1) X=Aktivite, Y=CO₂ · (2) Y=Su_Tuketimi_mL ·
  (3) "Tur" sütununu renge sürükle (Fiziksel / Metin / Görsel / Eğitim).
- **Neden:** 80 dakikanın 30'u burada geçiyor ve sitede hiç karşılığı yok.

### ③ Token Lab'a A/B prompt karşılaştırıcısı ekle
- **Ne:** İki prompt kutusu yan yana; altta tek bir fark rakamı ("%68 daha az enerji").
- **Neden:** Hackathon'un ölçüm döngüsünü kapatır; planın *"azalmayı sayısal görürler"*
  hedefini karşılar. Mevcut hesap altyapısı yeterli, yalnızca arayüz gerekiyor.

### ④ Kırp — *en cesaret isteyeni*
| İşlem | Kazanç |
|---|---|
| `modeller.html` → Güvenlik & Etik ve YZ Çağı slaytlarını çıkar | 10 → 8 slayt |
| Shot tiplerini çıkar | 6 → 5 slayt |
| Araç listesini 28 → ~10'a indir (yalnızca ölçümü olanlar + gerçekten ücretsiz/üyeliksiz olanlar) | Dürüstlük + sadelik |
| 4 Kaynakça slaytını tek sayfada birleştir | −3 slayt |

**Hedef: 27 slayt → ~18 slayt.**

> 80 dakikaya sığmayan bir atölye planı, atölye değil okuma listesidir.

### ⑤ Ucuz düzeltmeler
- `units.config.js` → suya gündelik birim ekle (bardak / şişe), `Units.waterText()` gibi
  bir eşlik fonksiyonu yaz. Su, `phoneText()` gibi tek bir birimden okunsun.
- LED tutarsızlığını gider (8 W ↔ 10 W): CSV ve config aynı değeri kullansın.
- İki hesaplayıcının rollerini sayfa üstünde tek cümleyle ayır ya da birleştir.

---

## 6) İLERLEME

Uygulandıkça işaretlenecek:

- [ ] ① Engage sayfası (çikolata ↔ telefon)
- [ ] ② CODAP görev sayfası
- [ ] ③ A/B prompt karşılaştırıcısı
- [ ] ④ Kırpma (27 → ~18 slayt)
- [ ] ⑤ Su birimi · LED tutarsızlığı · hesaplayıcı rolleri

---

## 7) NOT — bu incelemede DEĞİŞTİRİLMEYENLER

İnceleme sırasında iki deneme yapılıp **geri alındı**; tekrar denenmemesi için kayda geçiyor:

- **Zaman çizelgesini iki sütuna sıkıştırmak** — kronoloji soldan sağa zıplayınca
  okunmuyor, kartlar eziliyor. Tek sütun, dikey akış korunacak.
- **Örnek Python kodunu kısaltmak** — kısaltılmış hâli anlaşılırlığı düşürüyor.
  `import` satırları ve açık yapı korunacak.

Ayrıca sitenin güçlü yanları — kaldırılmamalı:
- **Dürüstlük mimarisi:** ölçüm / tahmin ayrımının rozetle gösterilmesi (SITE_RULES 1.4).
- **Tek birim ilkesi:** her eşdeğerin telefon şarjından okunması (SITE_RULES 7).
- **Sergi ↔ hesaplayıcı döngüsü:** öğrencinin hesaplayıp config satırını kopyalaması.
- **`variants` alanı:** üretilip seçilmeyen görsellerin de sayılması.
