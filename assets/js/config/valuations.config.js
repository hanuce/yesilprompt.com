/* =========================================================
   ⚙️ YAPAY ZEKA ÇAĞI — ETKİLER + ŞİRKET DEĞERLERİ (DÜZENLE)
   ---------------------------------------------------------
   "Yapay Zeka Çağı" slaytını besler:
     impacts    → YZ'nın gerçek yaşam etkileri (alan + örnek)
     years      → grafik için yıl ekseni
     series     → yıllara göre değer/büyüklük (TRİLYON $)
                  values[i], years[i] ile eşleşir; null = veri yok

   Şirket değerleri kamuya açık kaynaklardan (CompaniesMarketCap,
   Axios/CNBC, Crunchbase); T.C. GSYİH IMF/Dünya Bankası, rezerv
   TCMB verilerine dayalı YAKLAŞIK değerlerdir. Piyasa/veri değişir.

   SON GÜNCELLEME — Ağustos 2026:
   · NVIDIA 2026 = 5,14 T$ (borsa değeri, 4 Ağustos 2026)
   · OpenAI 0,852 T$ ve Anthropic 0,965 T$ = Mayıs 2026 yatırım turları
     (halka açık değiller; değer ancak yeni turda değişir)
   · T.C. GSYİH 2026 = 1,64 T$ (IMF projeksiyonu)
   · TCMB toplam rezerv = 164,2 milyar $ (31 Temmuz 2026 haftası)
   ========================================================= */
window.AI_ERA = {
  asOf: 'Ağustos 2026',

  /* YZ'nın gerçek yaşam etkileri — gerçek örneklerle */
  impacts: [
    { icon: '🎓', area: 'Eğitim',
      ex: 'Khan Academy’nin “Khanmigo” yapay zeka öğretmeni öğrencilere birebir özel ders veriyor; öğretmenler ders planı ve soruları YZ ile hazırlıyor.' },
    { icon: '🏭', area: 'Üretim & Sanayi',
      ex: 'Fabrikalarda YZ’li görüntü işleme, üretim hattındaki kusurlu parçaları insandan hızlı ayıklıyor; arızalar olmadan önce tahmin ediliyor (kestirimci bakım).' },
    { icon: '💼', area: 'İstihdam',
      ex: 'Müşteri hizmetleri, çağrı merkezi ve yazılım geliştirmede YZ asistanları işin bir kısmını üstlendi; bazı işler dönüşürken “prompt” gibi yeni meslekler doğdu.' },
    { icon: '🛡️', area: 'Savunma Sanayi',
      ex: 'İnsansız hava araçları (İHA/SİHA) hedef tanıma ve otonom seyir için YZ kullanıyor; karar-destek ve durumsal farkındalık sistemleri yaygınlaştı.' },
    { icon: '🩺', area: 'Sağlık',
      ex: 'YZ, mamografi ve röntgende kanseri erken yakalıyor; DeepMind’ın AlphaFold’u 200M+ proteinin yapısını çözerek ilaç geliştirmeyi hızlandırdı.' },
    { icon: '🚗', area: 'Günlük Yaşam',
      ex: 'Telefon kamerasında gece modu, navigasyonda trafik tahmini, çeviri ve sesli asistanlar hep YZ. Waymo robotaksileri ABD’de ücretli yolcu taşıyor.' }
  ],

  /* Grafik: değer/büyüklük (trilyon $) yıllara göre.
     key = CSS renk sınıfı (era-<key>); values[i], years[i] ile eşleşir; null = veri yok.
     YZ şirketleri, kıyas için T.C. ekonomi büyüklüğü (GSYİH) ve TCMB rezervi ile birlikte. */
  years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
  series: [
    { name: 'NVIDIA',    key: 'nvidia',    values: [0.14, 0.32, 0.73, 0.36, 1.22, 3.28, 4.50, 5.14] },
    { name: 'OpenAI',    key: 'openai',    values: [null, null, 0.014, 0.020, 0.029, 0.157, 0.50, 0.852] },
    { name: 'Anthropic', key: 'anthropic', values: [null, null, null, 0.004, 0.005, 0.018, 0.183, 0.965] },
    { name: 'T.C. Ekonomi Büyüklüğü (GSYİH)', key: 'trgdp', values: [0.76, 0.72, 0.82, 0.91, 1.12, 1.32, 1.44, 1.64] },
    { name: 'T.C. Merkez Bankası Rezervi',    key: 'trrez', values: [0.11, 0.09, 0.11, 0.13, 0.14, 0.16, 0.17, 0.164] }
  ]
};
