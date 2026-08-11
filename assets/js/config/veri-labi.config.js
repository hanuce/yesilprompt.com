/* =========================================================
   ⚙️ VERİLERLE YAPAY ZEKA KULLANIMI — Faz 2 içeriği
   ---------------------------------------------------------
   Bu faz iki şey yapar:
     1) Kullanımın ne kadar büyüdüğünü GÖSTERİR (grafik)
     2) Öğrenciye CODAP'ta kendi grafiğini KURDURUR

   ⚠️ Site yalnızca ilk slayttaki büyüme grafiğini çizer.
   Geri kalan bütün grafikler CODAP'ta ÖĞRENCİ tarafından kurulur —
   iki tanesi adım adım gösterilir, kalanı yalnızca SORU olarak verilir.

   ❌ Öğrenci cevabı toplanmaz, kaydedilmez (bkz. SITE_RULES 2c).
   ========================================================= */

/* --- 1) BÜYÜME GRAFİĞİ ---------------------------------------
   İki zaman serisi, ortak yıl ekseninde, ÇİFT Y EKSENİ:
     sol  → haftalık aktif kullanıcı (milyon)
     sağ  → işlenen token (trilyon / ay)

   Her nokta gerçek ve tarihli bir açıklamadan gelir; ara yıllar
   uydurulmadı. 2023'te token verisi YOK — çizgi orada başlamaz. */
window.KULLANIM_SERISI = {
  yillar: ['2023', '2024', '2025', '2026'],
  seriler: [
    { key: 'kullanici', ad: 'ChatGPT haftalık kullanıcı (milyon)', kisa: 'kullanıcı', eksen: 'sol',
      birim: 'M', degerler: [100, 300, 700, 1000],
      notlar: ['Kas 2023', 'Ara 2024', 'Eyl 2025', 'Tem 2026'] },
    { key: 'token', ad: 'Google’ın işlediği token (trilyon/ay)', kisa: 'işlenen token', eksen: 'sag',
      birim: 'T', degerler: [null, 9.7, 480, 3200],
      notlar: ['—', 'Nis 2024', 'May 2025', 'May 2026'] }
  ],
  ders: '⚠️ İki çizgi de grafiğin tepesine çıkıyor ama bu bir <b>göz yanılması</b>: ' +
        'her biri kendi ölçeğinde çizili. Aynı iki yıla (2024 → 2026) bakınca gerçek şu: ' +
        'kullanıcı sayısı <b>3 kat</b>, işlenen token <b>330 kat</b> arttı.' +
        '<br><br>Yani sadece daha çok kişi kullanmıyor — <b>kişi başına çok daha fazla</b> ' +
        'kullanıyoruz. Sürdürülebilirlik sorusunun asıl kaynağı bu makas.',
  kaynak: 'OpenAI kullanıcı açıklamaları (2023–2026) · Sundar Pichai, Google I/O 2024–2026 — aylık işlenen token'
};

/* --- 2) İNDİRİLECEK VERİ DOSYALARI --------------------------- */
window.VERI_DOSYALARI = [
  { ad: 'enerji_verileri.csv', url: 'assets/data/enerji_verileri.csv',
    aciklama: '25 satır: fiziksel etkinlikler, yapay zekâ sorguları ve model eğitimleri yan yana.' },
  { ad: 'modeller.csv', url: 'assets/data/modeller.csv',
    aciklama: '12 model: eğitim enerjisi, karbon, bölge ve şeffaflık sütunu.' }
];

/* --- 3) ADIM ADIM GÖSTERİLEN İKİ ÖRNEK ----------------------- */
window.ORNEK_GRAFIKLER = [
  {
    no: 1,
    dosya: 'enerji_verileri.csv',
    baslik: 'Bir yapay zekâ sorgusu, gündelik hayatın neresinde duruyor?',
    adimlar: [
      'Grafik (Graph) aracını aç',
      'X ekseni: <b>Aktivite</b>',
      'Y ekseni: <b>Enerji_Wh</b>',
      '<b>Tur</b> sütununu grafiğin ortasına sürükle → renkler ayrışır'
    ],
    beklenen: 'Metin sorguları en alttaki minik noktalar olarak kalır; çikolata ve hamburger ' +
              'grafiği yukarı doğru ezer. <b>Model eğitimi satırları ise grafiği tamamen okunmaz hâle getirir.</b>',
    ders: 'Bu bir hata değil, gerçeğin kendisi: eğitim <b>bir kez</b>, kullanım <b>milyarlarca kez</b> olur. ' +
          'İkisi aynı eksende karşılaştırılamaz — bu yüzden bir sonraki slaytta ayrı bakacağız.'
  },
  {
    no: 2,
    dosya: 'enerji_verileri.csv',
    baslik: 'Aynı grafiği SU ile kur — sıralama değişiyor mu?',
    adimlar: [
      'Aynı grafikte kal',
      'Y eksenini değiştir: <b>Su_Tuketimi_mL</b>',
      '<b>Tur</b> rengi kalsın',
      'Bir önceki grafikle yan yana koy'
    ],
    beklenen: 'Sıralama <b>değişir</b>. Hamburger su devidir; model eğitimi ise enerji devidir. ' +
              'Aynı satırlar, farklı sıralama.',
    ders: 'Tek bir sayıyla “çevreye zararlı mı?” sorusu cevaplanmaz. Bir şey enerjide temiz, ' +
          'suda kirli olabilir. Bu yüzden atölye boyunca <b>üç ölçüyü birden</b> takip ediyoruz.'
  }
];

/* --- 4) ÖĞRENCİNİN KENDİ KURACAĞI GRAFİKLER ------------------
   ⚠️ Burada ADIM VERİLMEZ. Yalnızca soru ve hangi dosyayla
   çalışılacağı yazar; ekseni öğrenci seçer. Tartışılması gereken
   yerler de burada soru olarak karşımıza çıkar. */
window.OGRENCI_SORULARI = [
  { dosya: 'enerji_verileri.csv',
    soru: 'Bir görsel üretmek, bir metin sorgusunun kaç katı enerji harcıyor? Peki ya video?',
    ipucu: 'Tur sütununda “Gorsel” ve “Metin” satırlarını karşılaştır.' },

  { dosya: 'enerji_verileri.csv',
    soru: 'Düşünme açık ve kapalı iki satır var. Aradaki fark kaç kat? Bu fark seni şaşırttı mı?',
    ipucu: 'Aktivite sütununda “dusunme KAPALI” ve “dusunme ACIK” satırlarını bul.' },

  { dosya: 'enerji_verileri.csv',
    soru: 'Aynı işi (10 sayfalık rapor) iki farklı modele yaptırınca su tüketimi ne oluyor?',
    ipucu: 'İki “10 sayfalik rapor” satırını Su_Tuketimi_mL ekseninde karşılaştır.' },

  { dosya: 'modeller.csv',
    soru: 'En çok enerji harcayan model, en çok karbonu da salan model mi? Neden?',
    ipucu: 'Bolge sütununu renge sürüklemeyi dene.' },

  { dosya: 'modeller.csv',
    soru: 'Şeffaflık sütununu renklendirdiğinde ne görüyorsun? En çok kullandığın araçlar hangi renkte?',
    ipucu: 'Egitim_Enerjisi_kWh sütununda kaç hücre BOŞ, say.' }
];

/* --- 5) ŞEFFAFLIK TABLOSU ------------------------------------
   Aynı modele iki bağımsız kaynağın verdiği sayı yan yana.
   Boş hücre bir eksik değil, DERSİN KENDİSİDİR (SITE_RULES 1.4a).

   sarj = eğitim enerjisinin telefon şarjı karşılığı
          (kWh × 1000 ÷ 12 Wh). Elde bir sayı yoksa boş bırakılır. */
window.SEFFAFLIK_TABLOSU = {
  baslik: 'Aynı araç, iki kaynak, farklı sayı',
  aciklama: 'Aşağıdaki araçların hepsini kullanıyorsun. Peki eğitilmeleri ne harcadı? ' +
            'İki bağımsız veri kaynağına birden bakalım.',
  satirlar: [
    { model: 'ChatGPT (GPT-4)',      resmi: false, kaggle: '16.099.378 kWh', epoch: '45.473.159 kWh', sarj: '≈ 3,8 milyar şarj' },
    { model: 'ChatGPT (GPT-5)',      resmi: false, kaggle: '—',              epoch: 'yalnızca FLOP',  sarj: '—' },
    { model: 'Gemini (1.0 Ultra)',   resmi: false, kaggle: 'açıklanmadı',    epoch: '92.217.360 kWh', sarj: '≈ 7,7 milyar şarj' },
    { model: 'Claude (3.7 Sonnet)',  resmi: false, kaggle: 'açıklanmadı',    epoch: 'yalnızca FLOP',  sarj: '—' },
    { model: 'Grok (3)',             resmi: false, kaggle: '154.000.000 kWh', epoch: '237.489.097 kWh', sarj: '≈ 19,8 milyar şarj' },
    { model: 'DeepSeek (V3)',        resmi: true,  kaggle: '1.123.598 kWh',  epoch: '1.122.170 kWh',  sarj: '≈ 94 milyon şarj' },
    { model: 'Qwen (3)',             resmi: false, kaggle: 'açıklanmadı',    epoch: 'yalnızca FLOP',  sarj: '—' },
    { model: 'Midjourney',           resmi: false, kaggle: '—',              epoch: '—',              sarj: '—' },
    { model: 'DALL·E',               resmi: false, kaggle: '—',              epoch: '—',              sarj: '—' },
    { model: 'Nano Banana (Gemini görsel)', resmi: false, kaggle: '—',       epoch: '—',              sarj: '—' },
    { model: 'Veo (video)',          resmi: false, kaggle: '—',              epoch: '—',              sarj: '—' }
  ],
  ders: 'Tabloda <b>tek bir yeşil satır</b> var: DeepSeek. Üretici GPU-saatini yayımladığı için ' +
        'iki bağımsız kaynak <b>binde bir</b> uyuşuyor. Yayımlamayanlarda kaynaklar <b>1,5–2,8 kat</b> ' +
        'ayrılıyor; görsel ve video araçlarında ise <b>hiçbir kaynakta hiçbir sayı yok</b>.' +
        '<br><br>Yani en çok kullandığımız araçlar, hakkında en az şey bildiklerimiz.',
  kaynak: 'kaggle.com — LLM Energy Consumption Dataset · epoch.ai — Notable AI Models · DeepSeek-V3 teknik raporu'
};

/* --- 6) EĞİTİM vs KULLANIM ----------------------------------
   Sezgiye ters gelen ama doğru olan şey: tek seferlik dev eğitim,
   günlük kullanımın yanında küçük kalıyor. */
window.EGITIM_VS_KULLANIM = {
  baslik: 'Model Eğitimi vs. Modeli Kullanmak',
  giris: 'Herkes “yapay zekâyı eğitmek çok enerji yiyor” der. Doğru — ama hikâyenin ' +
         '<b>küçük</b> tarafı orası.',
  kartlar: [
    { ikon: '🏗️', baslik: 'EĞİTİM — bir kez',
      buyuk: '45 GWh',
      alt: 'GPT-4’ü baştan eğitmek (Epoch AI tahmini)',
      detay: 'Aylarca, on binlerce ekran kartı. Ama <b>yalnızca bir kez</b> yapılır ve model yıllarca kullanılır.' },
    { ikon: '🔁', baslik: 'KULLANIM — her gün',
      buyuk: '850 MWh',
      alt: 'ChatGPT’nin BİR GÜNLÜK kullanımı',
      detay: '2,5 milyar prompt/gün × 0,34 Wh. Küçük bir sayı, <b>milyarlarca kez</b> tekrarlanıyor.' }
  ],
  hesap:
'EĞİTİM (tek seferlik)\n' +
'  GPT-4 eğitimi                        ≈ 45.473.159 kWh\n' +
'\n' +
'KULLANIM (her gün, yeniden)\n' +
'  günlük prompt sayısı                 ≈  2.500.000.000\n' +
'  bir prompt                           ≈          0,34 Wh\n' +
'  2,5 milyar × 0,34 Wh                 ≈     850.000 kWh/gün\n' +
'\n' +
'KAÇ GÜNDE EŞİTLENİYOR?\n' +
'  45.473.159 ÷ 850.000                 ≈            53 gün\n' +
'\n' +
'BİR YILDA\n' +
'  850.000 × 365                        ≈ 310.250.000 kWh  =  310 GWh\n' +
'  eğitim                               ≈  45.473.159 kWh  =   45 GWh\n' +
'  ────────────────────────────────────────────────────────\n' +
'  kullanım, eğitimin                   ≈           6,8 KATI',
  sonuc: 'Eğitimin bedeli <b>53 günde</b> geri ödeniyor. Bir yılda kullanım, eğitimin ' +
         '<b>6,8 katı</b> enerji harcıyor — ve model her yıl yeniden kullanılıyor.',
  neden: [
    { ikon: '📈', b: 'Tekrar sayısı',
      m: 'Eğitim 1 kez olur; kullanım günde milyarlarca kez. Küçük sayı × dev tekrar = büyük toplam.' },
    { ikon: '🧠', b: 'Düşünme modu',
      m: 'Yeni modeller cevaptan önce gizli token üretiyor. Ölçülen fark: aynı soruda <b>154 kata</b> kadar.' },
    { ikon: '🖼️', b: 'Görsel ve video',
      m: 'Metin ucuz, görsel ~5 kat, 5 sn video ~3.000 kat. Kullanım pahalı işlere kayıyor.' },
    { ikon: '👥', b: 'Kullanıcı büyümesi',
      m: 'Dört yılda kullanıcı 10 kat, işlenen token 330 kat arttı. Kullanım tarafı hızlanıyor.' }
  ],
  ders: '<b>Bu yüzden bu atölye promptu konuşuyor.</b> Bir modelin eğitimine sen karar veremezsin — ' +
        'ama günde kaç kez, hangi araçla, ne kadar uzun bir cevap istediğine karar verebilirsin. ' +
        'Kaldıraç <b>kullanım</b> tarafında.',
  kaynak: 'Epoch AI (GPT-4 eğitimi) · TechCrunch/OpenAI 2025 (2,5 milyar prompt/gün) · Altman 2025 (0,34 Wh/prompt)'
};

/* --- 7) TARTIŞMA ---------------------------------------------
   Cevaplar BURADA VERİLMEZ; ilk iki sorunun cevabı Faz 3'te açılır. */
window.TARTISMA_SORULARI = [
  { s: 'Görsel üretimi neden metinden pahalı?', c: 'Cevabı Faz 3’te difüzyon animasyonuyla açacağız — şimdilik tahmin edin.' },
  { s: 'Düşünme modunu açmak neden bu kadar fark yaratıyor?', c: 'Cevabı Faz 3’te ölçülmüş sayılarla göreceğiz.' },
  { s: 'Su ekseninde sıralama neden değişti?', c: 'İpucu: bazı maliyetler tarlada, bazıları veri merkezinde ödeniyor.' },
  { s: 'Aynı model, iki farklı ülkede — neden farklı karbon salıyor?', c: 'İpucu: şebekedeki elektrik neyden üretiliyor?' }
];
