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

/* --- 3) YEŞİL PROMPT RESİM SERGİSİ ---
   Öğrenci eserleri buraya eklenecek. Şimdilik kürasyonlu
   placeholder’lar var. GERÇEK RESİM EKLEMEK:
   - Resmi  assets/img/galeri/  klasörüne at.
   - Aşağıya bir satır ekle ve "img" alanına dosya yolunu yaz
     (örn. img: 'assets/img/galeri/eser1.jpg').
   - "img" boş bırakılırsa şık bir degrade placeholder gösterilir;
     "ph" alanı (ph-a/ph-b/ph-c/ph-d) placeholder rengini seçer. */
window.GALLERY = [
  { title: 'Yenilenebilir İstanbul, 2050', img: '', ph: 'ph-a', emoji: '🌇',
    prompt: '2050, güneş panelli çatılar, yeşil teraslar, izometrik illüstrasyon',
    model: 'FLUX.1-schnell', attempts: 1, wh: 0.5 },
  { title: 'Yeşil Veri Merkezi', img: '', ph: 'ph-b', emoji: '🏞️',
    prompt: 'Doğayla uyumlu, su soğutmalı yeşil bir veri merkezi, gün ışığı',
    model: 'SDXL', attempts: 2, wh: 3.0 },
  { title: 'Suyu Koruyan Şehir', img: '', ph: 'ph-c', emoji: '💧',
    prompt: 'Yağmur suyu hasadı yapan gelecek şehri, dijital sanat',
    model: 'SD 3.5', attempts: 1, wh: 2.1 },
  { title: 'Rüzgâr Tarlaları', img: '', ph: 'ph-d', emoji: '🌬️',
    prompt: 'Tepelerde rüzgâr türbinleri, pastel gökyüzü, minimalist',
    model: 'FLUX.1-schnell', attempts: 1, wh: 0.5 },
  { title: 'Güneşli Köy', img: '', ph: 'ph-a', emoji: '☀️',
    prompt: 'Çatıları güneş panelli Anadolu köyü, sıcak ışık, suluboya',
    model: 'SDXL', attempts: 1, wh: 1.5 },
  { title: 'Orman ve Devre', img: '', ph: 'ph-b', emoji: '🌲',
    prompt: 'Yaprakları devre kartına dönüşen ağaç, kavramsal, koyu zemin',
    model: 'SD 3.5', attempts: 3, wh: 6.3 }
];
