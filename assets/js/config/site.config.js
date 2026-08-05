/* =========================================================
   ⚙️ SİTE GENELİ İÇERİK — BURAYI DÜZENLEYEBİLİRSİN
   ---------------------------------------------------------
   Künye (etkinlik kimliği), materyal/kaynak havuzu ve
   Resim Sergisi öğeleri. Kod bilmene gerek yok; yalnızca
   tırnak içindeki metinleri değiştir.
   ========================================================= */

/* --- 1) KÜNYE — etkinlik kimlik bilgileri ---
   [köşeli parantezli] yerleri kendi proje bilgilerinle doldur. */
window.KUNYE = {
  program:   'TÜBİTAK 4004 — Doğa Eğitimi ve Bilim Okulları',
  proje:     '[Proje Adı]',
  projeNo:   '[Proje No: 4004-…]',
  atolye:    'Sürdürülebilir Yeşil Prompt Atölyesi',
  tarih:     '[GG.AA.YYYY]',
  yer:       '[Kurum / Şehir]',
  yurutucu:  '[Proje Yürütücüsü]',
  egitmen:   '[Atölye Eğitmeni]',
  hedef:     'Ortaokul / Lise öğrencileri',
  not:       'Bu atölye yukarıdaki TÜBİTAK 4004 projesi kapsamında sunulmuştur.'
};

/* --- 2) MATERYAL & KAYNAK HAVUZU ---
   Girişte "bağlantı havuzu" olarak gösterilir.
   kind: 'dosya' (indirilir) | 'arac' (dış site) | 'kaynak' (okuma) */
window.MATERIALS = [
  { label: 'enerji_verileri.csv (CODAP için)', url: 'assets/data/enerji_verileri.csv', kind: 'dosya', download: true },
  { label: 'CODAP — veri görselleştirme',       url: 'https://codap.concord.org/',                 kind: 'arac' },
  { label: 'Google AI Studio — canlı token sayacı', url: 'https://aistudio.google.com/',           kind: 'arac' },
  { label: 'Tiktokenizer — token görselleştirme', url: 'https://tiktokenizer.vercel.app/',          kind: 'arac' },
  { label: 'Hugging Face — AI Energy Score',     url: 'https://huggingface.co/spaces/AIEnergyScore/Leaderboard', kind: 'kaynak' },
  { label: 'ML.ENERGY Leaderboard',             url: 'https://ml.energy/leaderboard/',             kind: 'kaynak' },
  { label: '“How Hungry is AI?” (enerji+su)',   url: 'https://arxiv.org/html/2505.09598v1',        kind: 'kaynak' },
  { label: 'Our World in Data — gıda etkisi',   url: 'https://ourworldindata.org/environmental-impacts-of-food', kind: 'kaynak' }
];

/* --- 3) SERGİ (ANASAYFA) AYARLARI ---
   Anasayfa doğrudan sergidir: menü, başlık ve tanıtım metni YOKTUR.
   Ziyaretçiyi ilk eser karşılar. Buradaki tek ayar, sağ alttaki
   yuvarlak "atölyeye gir" düğmesidir. */
window.SERGI = {
  ctaLabel: 'Atölyeye gir',
  ctaHref:  'atolye.html'
};

/* --- 4) YEŞİL PROMPT RESİM SERGİSİ — ESERLER ---
   Öğrenci eserleri buraya eklenecek. Şimdilik kürasyonlu
   placeholder’lar var. GERÇEK RESİM EKLEMEK:
   - Resmi  assets/img/galeri/  klasörüne at.
   - Aşağıya bir satır ekle ve "img" alanına dosya yolunu yaz
     (örn. img: 'assets/img/galeri/eser1.jpg').
   - "img" boş bırakılırsa şık bir degrade placeholder gösterilir;
     "ph" alanı (ph-a/ph-b/ph-c/ph-d) placeholder rengini seçer.
   - "by" (eseri üreten öğrenci) isteğe bağlıdır; boşsa gösterilmez.
   - "variants" = tek "üret" tıklamasında kaç görsel üretildiği.
     Çoğu araç 4'lü ızgara verir; harcanan enerji seçtiğin tek görselin
     değil, ÜRETİLEN HEPSİNİN enerjisidir. Yazmazsan 1 kabul edilir.
       Toplam enerji = wh × variants × attempts

   NOT: Galeri sabit 3'lü ızgaradır ve her eser KARE olarak kırpılır
   (object-fit: cover). Bu yüzden kare üretilmiş görseller en iyi
   sonucu verir — çoğu model zaten varsayılan olarak kare üretir. */
window.GALLERY = [
  { title: 'Yenilenebilir İstanbul, 2050', by: 'H.N.Çetinkaya', img: 'assets/img/galeri/Yenilenebilir_Istanbul2050.png', ph: 'ph-a', emoji: '🌇',
    prompt: '2050, güneş panelli çatılar, yeşil teraslar, izometrik illüstrasyon',
    model: 'GPT Image 2', attempts: 1, wh: 0.5 },
  { title: 'Yeşil Veri Merkezi', by: '', img: 'assets/img/galeri/Green_Data_Center.jpg', ph: 'ph-b', emoji: '🏞️',
    prompt: 'Doğayla uyumlu, su soğutmalı yeşil bir veri merkezi, gün ışığı',
    model: 'Qwen Image 2.0', attempts: 2, wh: 3.0 },
  { title: 'Suyu Koruyan Şehir', by: '', img: 'assets/img/galeri/Water_Protect_City.jpg', ph: 'ph-c', emoji: '💧',
    prompt: 'Yağmur suyu hasadı yapan gelecek şehri, dijital sanat',
    model: 'Creen AI 2.0', attempts: 1, wh: 2.1 },
  { title: 'Rüzgâr Tarlaları', by: '', img: 'assets/img/galeri/Wind_Farms.jpg', ph: 'ph-d', emoji: '🌬️',
    prompt: 'Tepelerde rüzgâr türbinleri, pastel gökyüzü, minimalist',
    model: 'Seedream 4.5', attempts: 1, wh: 0.5 },
  { title: 'Güneşli Köy', by: '', img: 'assets/img/galeri/Sunny-Village.png', ph: 'ph-a', emoji: '☀️',
    prompt: 'Çatıları güneş panelli Anadolu köyü, sıcak ışık, suluboya',
    model: 'GPT Image 2', attempts: 1, wh: 1.5 },
  { title: 'Orman ve Devre', by: '', img: 'assets/img/galeri/Forest_Circuit.png', ph: 'ph-b', emoji: '🌲',
    prompt: 'Yaprakları devre kartına dönüşen ağaç, kavramsal, koyu zemin',
    model: 'Nano Banana 2', attempts: 3, wh: 6.3 }
];

/* --- 5) FON MÜZİĞİ (anasayfa) ---
   Ses DOSYASI YOKTUR. Müzik tarayıcıda Web Audio ile üretilir:
   0 KB indirme, telif yok, hiç bitmez. Sinematik/neo-klasik bir doku
   (derin pedal + org-yaylı katman + arpej + katedral yankısı).

   RAHATÇA DEĞİŞTİREBİLECEKLERİN:
   - volume        : 0 (sessiz) … 1 (en yüksek). 0.14 sakin bir galeri seviyesidir.
   - chordSeconds  : bir akorun kaç saniye sürdüğü. Büyütürsen daha ağır, daha epik.
   - bpm           : arpejin hızı (vuruş/dakika).
   - progression   : akor yürüyüşü. Her satır: [kök nota, akor tipi]
                     Tipler: 'min' (minör), 'maj' (majör), 'sus4'.
                     Nota adları: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
   Not: Müzik kullanıcı sayfayla ilk kez etkileşime geçince başlar
   (tarayıcılar izinsiz otomatik sesi engeller). Tercih hatırlanır. */
window.AMBIENT = {
  volume: 0.14,
  chordSeconds: 13,
  bpm: 72,
  /* D minör merkezli, ağır ve geniş bir yürüyüş */
  progression: [
    ['D',  'min'],
    ['A#', 'maj'],
    ['F',  'maj'],
    ['C',  'maj'],
    ['G',  'min'],
    ['A#', 'maj'],
    ['C',  'sus4'],
    ['D',  'min']
  ]
};
