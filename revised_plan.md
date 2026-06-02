# Sürdürülebilir Yeşil Prompt Atölyesi — Revize Edilmiş Etkinlik Planı (v2)

> Bu dosya, `sustainable_prompting.md` dosyasının gözden geçirilmiş halidir. (Orijinal dosyaya dokunulmadı.)
>
> **v2 değişiklikleri (kullanıcı geri bildirimi doğrultusunda):**
> 1. Pollinations ve "ücretsiz" sanılan ama aslında kredili/üyelikli araçlar çıkarıldı → gerçekten ücretsiz, üyeliksiz, modeli belli 3–4 araçla değiştirildi; ekolojik tutarlılık için "her öğrenci onlarca görsel üretsin" yerine **kürasyonlu karşılaştırma seti** modeli getirildi.
> 2. Token gösterimi için **Google AI Studio** (gerçek, canlı sayaç) referans alındı; Türkçe-İngilizce token iddiası **düzeltildi** (abartılıydı) ve "girdi önce İngilizceye çevriliyor mu?" sorusu **doğru** açıklandı.
> 3. Sahte (pseudo) veri yok: CODAP veri seti **gerçek, atıflı kaynaklardan** (Hugging Face, Kaggle, OSF, hakemli makaleler) türetilecek.
> 4. "Reasoning ayrı bir model türüdür" çerçevesi düzeltildi: 2025–2026'da **neredeyse tüm modeller "düşünür"**; mesele düşünmenin var/yok olması değil, **ne kadar düşündüğü (thinking budget)**.
> 5. Yeni bölüm: **"Model nasıl oluşur?"** — tarihsel + güncel + mantık; eğitim (training) maliyeti, kaynakları, süresi; neden bunu yalnızca ~8–10 firma yapabiliyor.
> 6. Görsel üretim araçları: **tema belirlendi**, 3–4 araçla **aynı prompt** üretilip karşılaştırılacak; her görselin altında **prompt + model + tahmini enerji × su** bilgisi olacak.

---

## ETKİNLİK PLANI

- **Etkinlik No:** 01 · **Tarih:** .../.../202... · **Adı:** Sürdürülebilir Yeşil Prompt Atölyesi
- **Hedef Kitle:** (ör. Ortaokul/Lise) · **Süre:** 40 + 40 (Blok) · **Katılımcı:** 20–25
- **Amaç:**
  1. Fiziksel ve dijital aktivitelerin enerji + **su** + karbon ayak izini **gerçek verilerle** karşılaştırarak farkındalık.
  2. LLM'lerde **"Token"** kavramı ve bunun enerji/su maliyetiyle ilişkisi.
  3. **En az kaynakla en verimli sonuç** (Prompt Mühendisliği) becerisi.
  4. Metin / görsel / ses üretiminin **neden farklı enerji harcadığını** anlamak.
  5. Bir modelin **nasıl oluştuğunu** (eğitim süreci, kaynakları, neden az sayıda firmanın yapabildiğini) kavramak.

### Kullanılacak Materyaller
- **Veri Analizi:** CODAP (codap.concord.org) + gerçek veri setinden türetilmiş `enerji_verileri.csv` (EK D).
- **Token gösterimi:** **Google AI Studio** (aistudio.google.com — canlı token sayacı, gerçek model) + site içi tokenizasyon laboratuvarı.
- **Görsel üretim (ücretsiz, üyeliksiz, modeli belli):** EK A'daki 3–4 araç. *(Öğrenci başına çok az üretim; ağırlık kürasyonlu karşılaştırma setinde.)*
- **Hesaplama:** "Token, Enerji & Su Hesaplayıcı" sitesi (GitHub Pages).
- **Etiketleme:** site içi otomatik "enerji damgası" veya Canva.

---

## ETKİNLİĞİN DETAYLI AKIŞI

### 1. AŞAMA — GİRİŞ (Engage): Görünmeyen Buzdağı (15 dk)
Eğitmen elinde bir kutu çikolata ve bir telefon ile girer.
- **Soru:** "Bu çikolatayı üretmenin enerjisiyle bu telefonu kaç kez şarj edebilirim?"
- **Bilgi (gerçek kaynak):** Karşılaştırma, *Our World in Data / Poore & Nemecek (2018)* gıda LCA verileri ve telefon şarjı enerjisi (~12 Wh, ~5–7 g CO₂) üzerinden mertebe olarak verilir. *(Kesin sayı değil, büyüklük sırası vurgulanır.)*
- **Köprü:** "Peki ChatGPT'ye soru sorduğumda ya da bir resim çizdirdiğimde arkada ne yakıyoruz — elektrik **ve su**? Hem de bu modeli baştan eğitirken ne harcandı?"

### 2. AŞAMA — KEŞFETME (Explore): Veri ile Yüzleşme — CODAP (30 dk)
Gerçek verilerden türetilmiş `enerji_verileri.csv` öğrencilere verilir (kaynaklar EK D).
1. `codap.concord.org` → CSV sürükle-bırak.
2. **Görevler:**
   - Grafik 1: X = **Aktivite**, Y = **CO2_Salinimi_Gram**.
   - Grafik 2: Y = **Su_Tuketimi_mL** (su boyutu).
   - **"Tur"** sütununu (Fiziksel / Metin / Görsel / Eğitim) renge sürükle.
   - **Tartışma:** "Görsel üretimi neden metinden çok daha yüksek? Bir de **modelin eğitimi** sütununa bak — tek bir kullanımla kıyasla, fark kaç kat?"

### 3. AŞAMA — AÇIKLAMA (Explain): Token, Enerji, Su (20 dk)

**A) Token neden enerji harcar?**
- Model = dev bir matris çarpımı makinesi. Her token, milyarlarca parametreden bir **geçiş** ister → GPU elektrik çeker → ısınır → **soğutma suyu**.
- **Girdi token'ları ucuz** (toplu işlenir, "prefill"); **çıktı token'ları pahalı** (tek tek, sırayla üretilir, "decode"). Cevap uzadıkça maliyet artar.
- **Kaba dönüşüm:** ~1000 token ≈ 750 kelime (İngilizce için; bkz. aşağıdaki Türkçe notu).

**B) Tokenizasyon ve diller — DOĞRU versiyon (düzeltme):**
- **Mit yıkımı:** Frontier LLM'ler girdiyi **önce İngilizceye çevirmez.** Tokenizer (Gemini: SentencePiece, GPT: BPE) metni **kendi dilinde, doğrudan** alt-parçalara böler. Ayrı bir çeviri adımı **yoktur**.
- **İlginç nüans (ileri öğrenci için):** Mekanistik yorumlanabilirlik çalışmaları, modelin **ara katmanlarda** kavramları çoğu zaman "İngilizce/latin" bir iç temsile yaklaştırdığını gösteriyor — ama bu bir ön-çeviri değil, içsel bir temsildir ve **token sayısını değiştirmez.**
- **Türkçe "cezası" — abartmadan:** Modern tokenizer'lar (o200k, Gemini) yaygın kısa kelimelerde farkı **ciddi biçimde kapattı.** Bu yüzden Google AI Studio'da "Hello" ve "Merhaba" benzer sayıda token çıkabilir — bu normaldir. Fark, **uzun/ekli/nadir kelimelerde** (örn. "Sürdürülebilirlik", "evlerimizdekilerden") ve nadir alfabelerde belirginleşir.
- **Ders yöntemi:** Sabit sayı dayatmak yerine **canlı ölç:** Google AI Studio veya site içi sayaçta birkaç kelimeyi Türkçe/İngilizce karşılaştır, sonucu öğrenci kendi gözlemlesin (veri okuryazarlığı).

**C) Neden görsel/ses metinden çok daha fazla harcar?**
- Metin: 1 token = 1 hafif geçiş (1B dizi).
- Görsel (difüzyon): görüntü gürültüden başlar, **~20–50 adımda** adım adım netleşir; her adım büyük bir modelden **tam geçiş**, üstelik **2B ızgara**. Yani 1 görsel ≈ 20–50 ağır geçiş.
- Ses/Video: + **zaman boyutu** → katlanır.
- Gerçek veri (HF/CMU, Luccioni vd.): 1000 metin üretimi ≈ bir telefon şarjının küçük bir kısmı; **1 görsel ≈ neredeyse tam bir telefon şarjı**.

**D) "Düşünme" her yerde (düzeltme):**
- 2025–2026'da **neredeyse tüm frontier modeller düşünür** (extended thinking / reasoning). "Reasoning modeli var mı yok mu" ayrımı artık geçersiz.
- Önemli olan **ne kadar düşündüğü:** çoğu modelde ayarlanabilir bir **"düşünme bütçesi / çaba (low/medium/high)"** var. Basit bir soruya yüksek çabayla cevap vermek **binlerce gizli token** = boşa enerji demek.
- **Ders mesajı:** "Basit işte düşünmeyi kıs, zor işte aç." Buzdağının görünmeyen kısmı = düşünme token'ları.

**E) Prompt Mühendisliğinin doğru mesajı (çelişki giderildi):**
> Amaç "en kısa prompt" **değil**, **en az toplam maliyet**:
> **Toplam ≈ Girdi + Çıktı + (Deneme × üretim) + (Düşünme bütçesi).**
> Belirsiz prompt → çok deneme → çok enerji. Biraz daha uzun ama **net** prompt → tek seferde hedef → toplamda az enerji. Yani: **net ol, gereksiz uzun çıktı/aşırı düşünme isteme, az dene.**

### 4. AŞAMA — DERİNLEŞTİRME (Elaborate): Yeşil Prompt Hackathonu (40 dk)
**Ekolojik tutarlılık ilkesi:** Atölyenin mesajı "boşa üretme" olduğundan, **herkes onlarca görsel üretmez.** Akış:
1. Eğitmen, **EK A'daki 3–4 araçla aynı prompt'u** önceden üreterek bir **karşılaştırma seti** hazırlar (EK C). Öğrenci bunları analiz eder: hangi araç/model, tahmini enerji × su nasıl değişiyor?
2. Her öğrenci/grup, hesaplayıcıda promptunu optimize ettikten sonra **yalnızca 1 (en fazla 2) görsel** üretir. Her "üret" tıklaması = sayaçta görünür maliyet.
3. Hesaplayıcı; girdi/çıktı token, üretim türü (metin/görsel), seçilen **model** ve **deneme sayısı** ile **Wh, mL su, g CO₂** ve "telefon şarjı / LED dk" eşdeğerini verir; yeşil/sarı/kırmızı gösterir (uzunluğa değil **toplam tahmini maliyete** göre).

### 5. AŞAMA — DEĞERLENDİRME (Evaluate): Dijital Sergi & Damgalama (15 dk)
Her görselin altına **enerji damgası**: `Prompt · Araç/Model · Deneme · ~Wh · ~mL su · ~g CO₂ · eşdeğer`. Damgalı görseller "Sürdürülebilir Prompt Galerisi"ne eklenir.
**Değerlendirme ölçütleri:** prompt netliği, az deneme, metin/görsel farkını açıklayabilme, su–enerji ilişkisini ve **eğitim vs kullanım** farkını yorumlayabilme.

---

## EK A — Görsel Üretim Araçları (ücretsiz, üyeliksiz, modeli belli)

**İlke:** "Bedava" diye sunulup aslında saatlik kredi/refund veren ya da öğrenci hesabı + girdisi isteyen araçlar **kullanılmaz** (hem maliyet hem mahremiyet/ekoloji sorunu). Tercih: üyeliksiz **ve modeli adı belli** araçlar — çünkü enerji tahmini ancak model bilinirse anlamlı olur.

| Araç | Erişim | Model bilinirliği | Not |
|---|---|---|---|
| **Craiyon** (craiyon.com) | Üyeliksiz | Kendi modeli | Bilinen, sınıf dostu; kalite düşük ama "ücretsiz örnek" için ideal |
| **Hugging Face Spaces** (örn. SDXL, FLUX.1-schnell, SD 3.5 demoları) | Üyeliksiz (çoğu) | **Model adı net** (SDXL, FLUX…) | Enerji tahmini için en uygun: ML.ENERGY/AI Energy Score'da ölçümü var |
| **Perchance AI Image Generator** | Üyeliksiz, limitsiz | Açık model tabanlı | Yedek araç |
| **Mage.space / Stable Diffusion demoları** | Çoğu üyeliksiz | SD ailesi | Karşılaştırma için 3. veya 4. araç |

> **Doğrulama notu:** Bu siteler hızlı değişiyor; etkinlikten önce her birinin (a) gerçekten üyeliksiz/ücretsiz ve (b) okul ağında erişilebilir olduğu **tekrar kontrol edilmeli.** En kararlı seçenek, modeli adıyla bilinen **Hugging Face Space**'leridir.

**Görsel teması (öneri — biri seçilir, 3–4 araçta aynı prompt):**
1. "2050'de yenilenebilir enerjiyle çalışan İstanbul" (orijinal tema)
2. "Suyu ve enerjiyi koruyan gelecek şehri"
3. "Doğayla uyumlu, yeşil bir veri merkezi"

---

## EK B — Web Sitesi: Teknoloji Tavsiyesi

**Tavsiye: Saf JS statik site (HTML+CSS+JS), GitHub Pages.** Sunucusuz; token sayımı (`gpt-tokenizer`/`js-tiktoken`) ve animasyonlar tarayıcıda çalışır; jalammar tarzı akıcı gösterim için en uygunu. **Google AI Studio**, gerçek/canlı token sayacı olarak siteye **link** olarak gömülür (token sayma motorunu yeniden yazmaya gerek yok). Görsel üretimi siteye gömmek yerine **dış araç linki + kürasyonlu karşılaştırma galerisi** olarak verilir (ekolojik tutarlılık ve araç değişkenliği nedeniyle).

Streamlit yalnızca Python veri paneli önceliği varsa düşünülür; bu atölyede veri tarafı CODAP'ta olduğundan gerek yok.

### Önerilen bölümler
1. Çikolata vs telefon kıyas (Engage).
2. **Tokenizasyon laboratuvarı** (canlı sayaç + TR/EN karşılaştırma; "çeviri yok" mitini gösteren kısa animasyon).
3. **Enerji & Su Hesaplayıcı** (EK C sabitleri).
4. **Metin vs Görsel** difüzyon-adımı animasyonu.
5. **Model nasıl oluşur?** mini zaman tüneli (EK E).
6. **Karşılaştırma galerisi** (aynı prompt, farklı araç/model + enerji damgası).

---

## EK C — Hesaplayıcı Sabitleri (gerçek, atıflı tahminler)

```
# Kullanım (inference)
metin_sorgu_Gemini ≈ 0.24 Wh, ~0.03 gCO2e, ~0.26 mL su   (Google, 2025 — medyan metin promptu)
metin_sorgu_ChatGPT≈ 0.3  Wh                              (Epoch AI, 2025)
gorsel_uretim      ≈ 0.5–2.9 Wh / görsel                  (model/donanıma göre; SDXL ~1 telefon şarjı/görsel — Luccioni/HF-CMU)
su_orani           = 3.69 L / kWh   → mL = Wh/1000*3690   ("How Hungry is AI?", 2025)
telefon_tam_sarj   ≈ 12 Wh ; LED ampul = 10 W

# Eğitim (training) — TEK SEFERLİK ama DEV (EK E)
GPT-3 (175B)       ≈ 1.287 GWh, ~552 tCO2e               (Patterson vd., 2021)
Llama 2 (70B)      ≈ ~1.273 GWh-mertebe, ~539 tCO2e       (Meta model kartı)
Llama ailesi (hepsi)≈ 2.638 GWh, ~1.015 tCO2e             (Meta)
BLOOM (176B)       ≈ 0.433 GWh, ~25 tCO2e                 (Luccioni vd., 2022)
```
> Siteye uyarı: **"Bu sayılar eğitim amaçlı tahminlerdir; model, donanım, veri merkezi ve enerji kaynağına göre değişir."** Kaynak linkleri görünür olmalı.

---

## EK D — `enerji_verileri.csv` (yalnızca GERÇEK kaynaklardan)

**Sütunlar:** `Aktivite, Tur, Enerji_Wh, CO2_Salinimi_Gram, Su_Tuketimi_mL, Kaynak`

Her satır bir **gerçek kaynağa** dayanır (pseudo veri yok). Önerilen kaynak eşlemesi:

| Aktivite örneği | Tur | Kaynak |
|---|---|---|
| 1 metin sorgusu | Metin/Dijital | Google 2025; Epoch AI |
| 1 görsel üretimi | Görsel/Dijital | HF Energy Score / ML.ENERGY / Luccioni |
| 1 telefon şarjı, 1 Google araması | Fiziksel/Dijital | yayınlanmış mertebe değerleri |
| 1 kutu çikolata, 1 bardak süt vb. | Fiziksel | Our World in Data (Poore & Nemecek 2018) |
| Modelin **eğitimi** (GPT-3/Llama/BLOOM) | Eğitim | Patterson 2021; Meta kartları; Luccioni 2022 |

**Birincil veri kaynakları (gerçek, açık):**
- Hugging Face — `ejhusom/llm-inference-energy-consumption` (gerçek ölçümler, Llama/Gemma/CodeLlama)
- Hugging Face — **AI Energy Score Leaderboard** (model bazında inference enerjisi)
- Kaggle — `nitishkumar2k01/llms-energy-consumption-dataset`
- OSF / hakemli: "How Hungry is AI?" (arXiv 2505.09598) — enerji+su+karbon tabloları; PUE/WUE çarpanları
- ML.ENERGY Leaderboard (ml.energy)

> **Not:** OSF'te bu başlıkta hazır tek bir "resmi" set bulamadım; en güvenilir yol, yukarıdaki HF/Kaggle setleri + hakemli makale tablolarından **her satırı tek tek atıflandırarak** CSV'yi kurmak. İstersen bu CSV'yi bu kaynaklardan ben derleyebilirim.

---

## EK E — "Model Nasıl Oluşur?" (yeni bölüm: tarihsel + güncel + mantık)

**1) Model ≠ Eğitim ≠ Kullanım (3 ayrı şey):**
- **Model:** ağırlıkları (parametreleri) donmuş dev bir matematiksel fonksiyon.
- **Eğitim (training):** bu ağırlıkların **internet ölçeğinde metin/görselle** aylarca, binlerce GPU'da **bir kez** öğrenilmesi. Çok pahalı, tek seferlik, dev enerji/su.
- **Kullanım (inference):** eğitilmiş modele her soru sorulduğunda yapılan **küçük ama milyarlarca kez tekrarlanan** işlem.
- **Ders sezgisi:** Eğitim = bir barajı **inşa etmek** (devasa, bir kez). Kullanım = musluğu **her açışın** (küçük, ama milyarlarca kez → toplamda yine büyük).

**2) Eğitim hangi kaynakları yer?**
- **Donanım:** binlerce GPU (örn. Llama için ~2048 A100, ~5 ay).
- **Veri:** internet ölçeğinde derlem (trilyonlarca token).
- **Elektrik + su + zaman + para:** GPT-3 ~1.287 GWh / ~552 t CO₂; Llama ailesi ~2.638 GWh / ~1.015 t CO₂; BLOOM ~0.433 GWh / ~25 t CO₂.

**3) Kısa tarihsel hat (zaman tüneli için):**
- **2017** "Attention Is All You Need" → **Transformer** mimarisi (her şeyin temeli).
- **2018–2020** BERT, GPT-2, **GPT-3 (175B)** → ölçek çağı.
- **2022** ChatGPT → kamuoyu patlaması.
- **2023–2024** çok-kipli (multimodal: metin+görsel+ses) modeller, açık ağırlıklı Llama/Mistral/Qwen.
- **2025–2026** **"düşünen" modeller standart** + ayarlanabilir düşünme bütçesi.

**4) Neden herkes model yapamıyor? (kullanıcı notu 5):**
- Frontier model eğitmek **on/yüz milyonlarca dolar + dev enerji** ister. Bu yüzden gerçek anlamda frontier model eğiten **~8–10 kuruluş** var: **OpenAI, Google DeepMind, Anthropic, Meta, xAI, Mistral, DeepSeek, Alibaba (Qwen)** + birkaçı (Microsoft, Amazon, Cohere…). Pazarın ~%90'ını ise yalnızca **birkaç** firma tutuyor.
- Gördüğümüz yüzlerce "yapay zekâ uygulaması" çoğunlukla bu **az sayıda temel modelin** üstüne kurulu (API, ince ayar, sarmalayıcı). Yani "çok model" değil, **az sayıda temel model + çok sayıda paketleme**.
- **Sürdürülebilirlik bağı:** Az sayıda dev modelin eğitimi büyük ve tek seferlik; asıl kümülatif yük milyarlarca **kullanım**dan geliyor → bireysel "verimli prompt" davranışı bu yüzden önemli.

---

## EK F — Ekolojik Prompt Mühendisliği Eğitimi

**Temel ilke:** Her token ve her **yeniden deneme** elektrik + su harcar. Bu yüzden **verimli prompt = ekolojik prompt.** Amaç "tek kelimelik prompt" değil, **toplam maliyeti** düşürmek:
> **Toplam ≈ Girdi + Çıktı + (Deneme × üretim) + (Düşünme bütçesi)**
> En büyük kaldıraç genelde **deneme sayısıdır** (özellikle görselde): belirsiz prompt = çok re-roll = çok enerji.

### F.1 — Sekiz Ekolojik Teknik (her biri bir maliyet kaldıracına bağlı)

| # | Teknik | Hangi maliyeti düşürür | Örnek |
|---|---|---|---|
| 1 | **Net & spesifik ol (ilk seferde doğru)** | Deneme sayısı | "güzel resim" yerine: konu + stil + kompozisyon + ışık tek promptta |
| 2 | **Çıktı uzunluğunu sınırla** | Çıktı token (en pahalı) | "Kısaca, 3 madde" / "tek cümle" / "en fazla 100 kelime" |
| 3 | **Doğru görevi doğru araca ver** | Üretim türü | Görsel şart değilse metinle yetin (görsel ~yüzlerce kat pahalı); basit işe küçük/hızlı model |
| 4 | **Düşünme bütçesini ayarla** | Düşünme token | Basit soruda "düşünme"yi kıs; sadece zor problemde aç |
| 5 | **Bağlamı şişirme** | Girdi token | Uzun sohbette her tur tüm geçmiş yeniden işlenir → yeni konuya yeni sohbet |
| 6 | **Baştan tam şartname (iteratif değil)** | Deneme × üretim | "şunu ekle, bunu değiştir" her seferinde TAM yeni üretim; baştan tam tarif et |
| 7 | **Önce ucuzda prova, sonra pahalıda üret** | Üretim türü | Fikri/prompt'u metinde olgunlaştır → sonra TEK görsel üret ("prova metinde, gösteri görselde") |
| 8 | **İyi prompt'u sakla & yeniden kullan** | Deneme sayısı | Çalışan prompt'u kaydet; her seferinde sıfırdan deneme yapma |

### F.2 — Önce/Sonra (öğrenci hesaplayıcıda ölçer)
- **Kötü (metin):** "Bana yapay zeka ve çevre hakkında bir şeyler yaz." → uzun, dağınık, muhtemelen 2-3 kez yeniden istenir.
- **İyi (metin):** "Yapay zekanın su tüketimini 9. sınıf öğrencisine 3 maddede, her madde tek cümle anlat." → kısa çıktı, tek seferde hedef.
- **Kötü (görsel):** "Güzel bir gelecek şehri." → 6-7 re-roll.
- **İyi (görsel):** "2050, yenilenebilir enerjiyle çalışan İstanbul; gündüz, güneş panelli çatılar, yeşil teraslar, izometrik illüstrasyon." → 1-2 üretim.

### F.3 — Anti-pattern (yanlış anlaşılan "verimlilik")
- **Aşırı kısaltma → ters teper:** Çok belirsiz prompt re-roll'u artırır; "az token" diye eksik tarif etmek toplam maliyeti **yükseltir.** Hedef: *gereksizi at, gerekeni bırak.*
- **Görsel/ses ile gösteriş:** Metin yeterken görsel/video üretmek en pahalı hatadır.
- **"Bir daha dene" refleksi:** Beğenmeyince düşünmeden tekrar üretmek; önce prompt'u düzelt, sonra tek sefer üret.

### F.4 — Atölye uygulaması (Aşama 3E + 4 ile entegre)
1. **Prompt yeniden yazma yarışı:** Öğrencilere "kötü" prompt verilir; hesaplayıcıda token + tahmini Wh/su ölçülür; sonra optimize edip **azalmayı sayısal görürler.**
2. **Yeşil Prompt Skoru:** netlik (tek seferde hedef) + çıktı sınırı + doğru araç seçimi + tahmini Wh/su üzerinden puan.
3. Çıktı: yazdırılabilir **"Yeşil Prompt Kuralları" kartı** (F.1 tablosunun özeti) öğrencide kalır.

### F.5 — "Yeşil Prompt Kuralları" kartı (özet)
> 1) Net ol, ilk seferde doğru iste · 2) Kısa çıktı iste · 3) Görsel şart değilse metinle yetin · 4) Basit işte düşünmeyi kıs · 5) Bağlamı şişirme · 6) Baştan tam tarif et, iteratif düzeltme · 7) Önce metinde prova, sonra tek görsel · 8) İyi prompt'u sakla.

---

## Kaynaklar
- MIT Technology Review — AI image ≈ phone charge: https://www.technologyreview.com/2023/12/01/1084189/making-an-image-with-generative-ai-uses-as-much-energy-as-charging-your-phone/
- Gizmodo — AI images energy (HF/CMU, Luccioni): https://gizmodo.com/ai-images-as-much-energy-as-charging-phone-hugging-face-1851065091
- Epoch AI — How much energy does ChatGPT use?: https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use
- MIT News — Generative AI environmental impact: https://news.mit.edu/2025/explained-generative-ai-environmental-impact-0117
- "How Hungry is AI?" (enerji+su+karbon, PUE/WUE): https://arxiv.org/html/2505.09598v1
- HF dataset — LLM inference energy (ejhusom): https://huggingface.co/datasets/ejhusom/llm-inference-energy-consumption
- HF — AI Energy Score Leaderboard: https://huggingface.co/spaces/AIEnergyScore/Leaderboard
- ML.ENERGY Leaderboard: https://ml.energy/leaderboard/
- Kaggle — LLM Energy Consumption Dataset: https://www.kaggle.com/datasets/nitishkumar2k01/llms-energy-consumption-dataset
- Patterson vd. 2021 — Carbon Emissions and Large Neural Network Training (GPT-3): https://arxiv.org/pdf/2104.10350
- Luccioni vd. 2022 — Carbon Footprint of BLOOM (JMLR): https://www.jmlr.org/papers/volume24/23-0069/23-0069.pdf
- Meta — Llama carbon footprint açıklaması: https://kaspergroesludvigsen.medium.com/facebook-disclose-the-carbon-footprint-of-their-new-llama-models-9629a3c5c28b
- HF blog — Tokenization & multilingual (çeviri miti/nüans): https://huggingface.co/blog/omarkamali/tokenization
- Token gösterimi (gerçek): Google AI Studio — https://aistudio.google.com/ ; Tiktokenizer — https://tiktokenizer.vercel.app/
- Görsel araçları: Craiyon https://www.craiyon.com/ ; HF Spaces https://huggingface.co/spaces ; Perchance https://perchance.org/ai-text-to-image-generator
- Gıda LCA (çikolata vb.): Our World in Data / Poore & Nemecek 2018 — https://ourworldindata.org/environmental-impacts-of-food
- İlham — Jay Alammar, The Illustrated Transformer: https://jalammar.github.io/illustrated-transformer/
