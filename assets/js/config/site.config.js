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

/* --- 1b) FOOTER — sergi (anasayfa) HARİÇ her sayfanın son slaytı ---
   Künye yukarıdaki KUNYE'den gelir; burada footer'ın geri kalanı vardır.
   Telif yılı otomatik yazılır: startYear geçmişse "2026–2027" olur. */
window.FOOTER = {
  title: 'Künye & site haritası',      // slayt noktasının ipucu metni
  about: 'Sürdürülebilir Yeşil Prompt Atölyesi; veri okuryazarlığı, yapay zekâ ' +
         'okuryazarlığı ve sürdürülebilir sanat temalarını birleştirir. Amacı, bir ' +
         'sorgunun ya da bir görselin görünmeyen enerji ve su maliyetini gündelik ' +
         'birimlerle anlaşılır kılmaktır.',
  note:  'Sayılar eğitim amaçlı tahminlerdir; model, donanım, veri merkezi ve enerji ' +
         'kaynağına göre değişir. Kaynakça her sayfada APA biçiminde verilir.',
  owner: 'Yeşil Prompt Atölyesi',
  startYear: 2026,
  /* Site haritası — faz rayıyla aynı sırada tutulmalıdır */
  sitemap: [
    { label: 'Sergi',                    href: 'index.html' },
    { label: '1 · Giriş',                href: 'atolye.html' },
    { label: '2 · Veri Laboratuvarı',    href: 'veri-labi.html' },
    { label: '3 · Token Lab',            href: 'token-lab.html' },
    { label: '4 · Yeşil Prompt',          href: 'prompt-muhendisligi.html' },
    { label: '5 · Ölç & Sergile',        href: 'hesaplayici.html' },
    { label: 'Meraklısına',              href: 'modeller.html' },
    { label: 'Kaynaklar',                href: 'kaynaklar.html' }
  ]
};

/* --- 1c) FAZ RAYI — atölye sayfalarının üst şeridi ---
   80 dakikalık akış beş fazdır; ray bunu görünür kılar.
   sure  = fazın dakika bütçesi. ⚠️ Öğrenci ekranında GÖRÜNMEZ;
           yalnızca eğitmen şeridinde ve geri sayımda kullanılır.
   egitmen = YALNIZCA ?egitmen=1 ile görünür; öğrenci ekranında yoktur.

   ⚠️ Süreleri değiştirirsen toplamı 80'de tut:
      2 (açılış, Faz 1'in içinde) + 12 + 22 + 14 + 16 + 10 = 76 + 4 esneme payı */
window.FAZLAR = [
  { ad: 'Giriş',     sure: 12, href: 'atolye.html',
    egitmen: {
      soyle: 'Takımları SEN eşleştir (site yapmıyor). Tanıtım yapma; doğrudan çikolata sorusunu sor, ' +
             'tahminleri sözlü AL, sonra “Cevabı Gör”e bas. Buzdolabı kartında da aynısını yap.',
      sorular: ['Tahmininizi neye dayandırdınız?', 'Enerji mi karbon mu su mu — hangisi “gerçek” maliyet?',
                'Ayak izi ölçerde düşünme modunu açınca ne oldu?']
    } },
  { ad: 'Veri',      sure: 22, href: 'veri-labi.html',
    egitmen: {
      soyle: 'CSV’yi indirtip CODAP’a sürüklet. Sen grafik kurma — dolaş, takılanı çöz. ' +
             'Her görevde önce tahmini SÖZLÜ al; “Bulduk” düğmesine erken basılmasın.',
      sorular: ['Grafiğin neden okunmuyor?', 'Su ekseninde sıralama neden değişti?',
                'En çok kullandığın modelin verisi neden yok?']
    } },
  { ad: 'Token Lab', sure: 14, href: 'token-lab.html',
    egitmen: {
      soyle: 'Akış slaytında boğulma — derinliği Meraklısına’ya bırak. Faz 2’de açık bıraktığın iki soruyu ' +
             'burada kapat: görsel neden pahalı, düşünme ne yapıyor. Parametre slaytında öğrenciye ÜÇÜNÜ DE denet.',
      sorular: ['Hangi parametre rakamı en çok oynattı?', 'Senin elinde olmayan neydi, olan neydi?']
    } },
  { ad: 'Yeşil Prompt', sure: 16, href: 'prompt-muhendisligi.html',
    egitmen: {
      soyle: 'Kuralları hızlı geç — hepsi zaten Faz 3’te tek tek ölçüldü. Asıl zaman ikinci slaytta: ' +
             'takımlar promptunu yazsın, TEK araç seçsin, TEK görsel üretsin. Üretim kuyruğu ' +
             'birkaç dakika sürebilir; ürettirmeye erken başlat.',
      sorular: ['Promptunda reçetenin kaç parçası var?', 'Kaç denemede istediğini aldın?']
    } },
  { ad: 'Ölç',       sure: 10, href: 'hesaplayici.html',
    egitmen: {
      soyle: 'Tek görsel kuralını hatırlat. Damgayı ürettirip sergiye ekle. ' +
             'Son dakikaları öz değerlendirme sorularına ayır — kapanış orada.',
      sorular: ['Metin ile görselin maliyet farkını açıklayabiliyor musun?',
                'Bir sonraki promptunda neyi değiştireceksin?']
    } }
];

/* İkincil bağlantılar — rayın sağında, küçük ve gri */
window.FAZ_EK = [
  { label: 'Meraklısına', href: 'modeller.html' },
  { label: 'Kaynaklar', href: 'kaynaklar.html' },
  { label: 'Sergi',     href: 'index.html' }
];

/* --- 2) MATERYAL & KAYNAK HAVUZU ---
   Artık atölye girişinde değil, kaynaklar.html sayfasındadır —
   akışta ölü bir slayt olmasın (bkz. review.md §3.5).
   kind: 'dosya' (indirilir) | 'arac' (dış site) | 'kaynak' (okuma) */
window.MATERIALS = [
  { label: 'enerji_verileri.csv (CODAP · Görev 1-3)', url: 'assets/data/enerji_verileri.csv', kind: 'dosya', download: true },
  { label: 'modeller.csv (CODAP · Görev 4-5)',   url: 'assets/data/modeller.csv',                   kind: 'dosya', download: true },
  { label: 'CODAP — veri görselleştirme',        url: 'https://codap.concord.org/',                 kind: 'arac' },
  { label: 'Orange Data Mining (çevrimdışı yedek)', url: 'https://orangedatamining.com/download/', kind: 'arac' },
  { label: 'Google AI Studio — canlı token sayacı', url: 'https://aistudio.google.com/',            kind: 'arac' },
  { label: 'Tiktokenizer — token görselleştirme', url: 'https://tiktokenizer.vercel.app/',          kind: 'arac' },
  { label: 'EcoLogits Calculator (tarayıcıdan)', url: 'https://huggingface.co/spaces/genai-impact/ecologits-calculator', kind: 'arac' },
  { label: 'Hugging Face — AI Energy Score',     url: 'https://huggingface.co/spaces/AIEnergyScore/Leaderboard', kind: 'kaynak' },
  { label: 'ML.ENERGY Leaderboard',             url: 'https://ml.energy/leaderboard/',             kind: 'kaynak' },
  { label: 'Epoch AI — Notable AI Models',      url: 'https://epoch.ai/data/notable-ai-models',    kind: 'kaynak' },
  { label: '“How Hungry is AI?” (enerji+su)',   url: 'https://arxiv.org/html/2505.09598v1',        kind: 'kaynak' },
  { label: 'Our World in Data — gıda etkisi',   url: 'https://ourworldindata.org/environmental-impacts-of-food', kind: 'kaynak' }
];

/* --- 2b) GİRİŞ · TARTIŞMA SORULARI ---
   Bu sorular OKUNMAZ, KONUŞULUR. Sınıfta sesli tartışılır;
   site hiçbir cevap toplamaz, kaydetmez, hiçbir yere göndermez.

   İki damar birlikte yürür ve her ikisinin de cevabı atölyenin
   ilerleyen fazlarındadır — soru burada açılır, orada kapanır:
     (a) sürdürülebilirlik: enerji, su, deneme sayısı, araç seçimi
     (b) üretme mantığı: token, difüzyon, eğitim ≠ kullanım, düşünme */
window.TARTISMALAR = [
  'Bir tıkla 10 görsel üretmek “bedava” geliyorsa, bedeli kim ve nerede ödüyor?',
  'Veri merkezini soğutan su buharlaşıp gidiyor. Tek bir promptun “birkaç damlası”, günde milyarlarca kez tekrarlanınca ne olur?',
  'Aynı cevabı küçük ve verimli bir araçtan da alabiliyorsan, en büyüğünü seçmek tercih mi, alışkanlık mı?',
  'Model promptunu toplu okur ama cevabı tek tek üretir. Öyleyse tasarruf için promptu mu kısaltmalı, istenen cevabı mı?',
  'Bir modeli baştan eğitmek tek seferlik dev bir maliyet; her sorgu ise küçük ama milyarlarca kez tekrarlanıyor. Gezegen için hangisi daha belirleyici?',
  'Model, izin alınmadan toplanmış metin ve çizimlerden öğrendiyse; ürettiği eser gerçekten “yeni” mi?'
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
   - "date" (eserin oluşturulma tarihi) isteğe bağlıdır. YIL-AY-GÜN
     biçiminde yaz (örn. '2026-03-14'); sitede 14.03.2026 olarak görünür.
     Esere tıklayınca açılan pencerede 📅 etiketiyle gösterilir.
   - "variants" = tek "üret" tıklamasında kaç görsel üretildiği.
     Çoğu araç 4'lü ızgara verir; harcanan enerji seçtiğin tek görselin
     değil, ÜRETİLEN HEPSİNİN enerjisidir. Yazmazsan 1 kabul edilir.
       Toplam enerji = wh × variants × attempts

   NOT: Galeri sabit 3'lü ızgaradır ve her eser KARE olarak kırpılır
   (object-fit: cover). Bu yüzden kare üretilmiş görseller en iyi
   sonucu verir — çoğu model zaten varsayılan olarak kare üretir. */
window.GALLERY = [
  { title: 'Yenilenebilir İstanbul, 2050', by: 'H.N.Çetinkaya', date: '2026-08-05', img: 'assets/img/galeri/Yenilenebilir_Istanbul2050.png', ph: 'ph-a', emoji: '🌇',
    prompt: '2050, güneş panelli çatılar, yeşil teraslar, izometrik illüstrasyon',
    model: 'GPT Image 2', attempts: 1, wh: 0.5 },
  { title: 'Yeşil Veri Merkezi', by: '', date: '2026-08-05', img: 'assets/img/galeri/Green_Data_Center.jpg', ph: 'ph-b', emoji: '🏞️',
    prompt: 'Doğayla uyumlu, su soğutmalı yeşil bir veri merkezi, gün ışığı',
    model: 'Qwen Image 2.0', attempts: 2, wh: 3.0 },
  { title: 'Suyu Koruyan Şehir', by: '', date: '2026-08-05', img: 'assets/img/galeri/Water_Protect_City.jpg', ph: 'ph-c', emoji: '💧',
    prompt: 'Yağmur suyu hasadı yapan gelecek şehri, dijital sanat',
    model: 'Creen AI 2.0', attempts: 1, wh: 2.1 },
  { title: 'Rüzgâr Tarlaları', by: '', date: '2026-08-05', img: 'assets/img/galeri/Wind_Farms.jpg', ph: 'ph-d', emoji: '🌬️',
    prompt: 'Tepelerde rüzgâr türbinleri, pastel gökyüzü, minimalist',
    model: 'Seedream 4.5', attempts: 1, wh: 0.5 },
  { title: 'Güneşli Köy', by: '', date: '2026-08-05', img: 'assets/img/galeri/Sunny-Village.png', ph: 'ph-a', emoji: '☀️',
    prompt: 'Çatıları güneş panelli Anadolu köyü, sıcak ışık, suluboya',
    model: 'GPT Image 2', attempts: 1, wh: 1.5 },
  { title: 'Orman ve Devre', by: '', date: '2026-08-05', img: 'assets/img/galeri/Forest_Circuit.png', ph: 'ph-b', emoji: '🌲',
    prompt: 'Yaprakları devre kartına dönüşen ağaç, kavramsal, koyu zemin',
    model: 'Nano Banana 2', attempts: 3, wh: 6.3 }
];
