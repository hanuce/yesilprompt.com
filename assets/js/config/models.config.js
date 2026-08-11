/* =========================================================
   ⚙️ MODEL ENERJİ DEĞERLERİ — BURAYI DÜZENLEYEBİLİRSİN
   ---------------------------------------------------------
   ⚠️ LİSTELERDE YALNIZCA SON KULLANICI ÜRÜNLERİ VARDIR.
   Öğrencinin tarayıcıdan açıp kullanabileceği araçlar listelenir.
   Araştırma modelleri, indirilip kurulan açık ağırlıklar ve
   yerel çalıştırma araçları (Ollama, ham Llama/SDXL indirmesi vb.)
   listede YER ALMAZ — öğrenci onları atölyede kullanamaz.
   ℹ️ Bunların ÖLÇÜMLERİ yine de kullanılır: kapalı ürünlerin
   sayısı, ölçümü yapılmış benzer modellerden ölçeklenir.

   ⭐ top5: true olan araçlar listelerin EN ÜSTÜNDE ayrı bir
   grupta durur — en çok kullanılan beş araç her zaman önce gelir.

   ⚠️ İKİ FARKLI ÖLÇÜM ÖLÇEĞİ VARDIR — KARIŞTIRMA:
   (a) BURADAKİ değerler, milyonlarca kişiye hizmet eden
       OPTİMİZE EDİLMİŞ sistemlerin ortalamasıdır.
   (b) Giriş fazındaki "53 litre" ise TEK BAŞINA çalışan bir
       sunucuda ölçülmüş bir değerdir. Aynı model için 40 kata
       kadar farklı çıkabilir — çünkü aynı şeyi ölçmüyorlar.

   seffaflik alanı: sayının nereden geldiğini söyler —
     'resmi'   → üretici yöntemiyle birlikte yayımladı
     'beyan'   → şirket sayıyı söyledi, yöntemini yayımlamadı
     'olculdu' → üretici değil, bağımsız araştırmacı ölçtü
     'tahmini' → kimse ölçmedi; yöntemi açık bir tahmin
   ========================================================= */

/* --- METİN ARAÇLARI (sohbet uygulamaları) ---
   inWh1k  = 1000 GİRDİ token'ı işlemenin enerjisi (ucuz)
   outWh1k = 1000 ÇIKTI token'ı üretmenin enerjisi (pahalı)
   maxOut  = tek cevapta üretilebilen en fazla çıktı token'ı */
window.TEXT_MODELS = {
  /* ⭐ EN ÇOK KULLANILAN BEŞ */
  'chatgpt': {
    label: 'ChatGPT · OpenAI', top5: true, inWh1k: 0.03, outWh1k: 1.35, maxOut: 8192, tipikCikti: 400,
    seffaflik: 'beyan',
    src: 'Altman (2025) — ortalama sorgu 0,34 Wh · 0,000085 galon su. Yöntem yayımlanmadı.'
  },
  'gemini': {
    label: 'Gemini · Google', top5: true, inWh1k: 0.02, outWh1k: 0.90, maxOut: 8192, tipikCikti: 300,
    seffaflik: 'resmi',
    src: 'Google (2025), arXiv:2508.15734 — medyan metin promptu 0,24 Wh · 0,26 mL su · 0,03 gCO₂e'
  },
  'claude': {
    label: 'Claude · Anthropic', top5: true, inWh1k: 0.05, outWh1k: 2.00, maxOut: 8192, tipikCikti: 500,
    seffaflik: 'tahmini',
    src: 'EcoLogits tahmini. Anthropic hiçbir enerji/su verisi yayımlamıyor.'
  },
  'grok': {
    label: 'Grok · xAI', top5: true, inWh1k: 0.05, outWh1k: 2.20, maxOut: 8192, tipikCikti: 450,
    seffaflik: 'tahmini',
    src: 'Büyük model sınıfından ölçeklendi. xAI yalnızca veri merkezi güç kapasitesini açıkladı.'
  },
  'deepseek': {
    label: 'DeepSeek · DeepSeek', top5: true, inWh1k: 0.03, outWh1k: 1.00, maxOut: 8192, tipikCikti: 400,
    seffaflik: 'olculdu',
    src: 'Hugging Face AI Energy Score v2 — ağırlıkları açık olduğu için bağımsız ölçülebiliyor.'
  },

  /* DİĞER SON KULLANICI ARAÇLARI */
  'copilot': {
    label: 'Copilot · Microsoft', inWh1k: 0.03, outWh1k: 1.35, maxOut: 8192, tipikCikti: 350,
    seffaflik: 'tahmini',
    src: 'Arkasında GPT ailesi çalışır; ChatGPT değerleri kullanıldı.'
  },
  'meta-ai': {
    label: 'Meta AI · Meta', inWh1k: 0.03, outWh1k: 1.00, maxOut: 4096, tipikCikti: 300,
    seffaflik: 'olculdu',
    src: 'Arkasındaki Llama ailesinin ağırlıkları açık; bağımsız ölçümü var.'
  },
  'le-chat': {
    label: 'Le Chat · Mistral AI', inWh1k: 0.04, outWh1k: 1.60, maxOut: 8192, tipikCikti: 350,
    seffaflik: 'resmi',
    src: 'Mistral + Carbone 4 / ADEME yaşam döngüsü analizi — 400 token: 1,14 gCO₂e · 45 mL su.'
  },
  'qwen-chat': {
    label: 'Qwen Chat · Alibaba', inWh1k: 0.04, outWh1k: 1.50, maxOut: 8192, tipikCikti: 400,
    seffaflik: 'tahmini',
    src: 'Alibaba, Stanford şeffaflık raporunda enerji/karbon/su için “bilgi yok” dedi.'
  },
  'perplexity': {
    label: 'Perplexity', inWh1k: 0.05, outWh1k: 1.60, maxOut: 4096, tipikCikti: 300,
    seffaflik: 'tahmini',
    src: 'Hem arama hem model çalıştırdığı için sınıf ortalamasının üstü varsayıldı.'
  }
};

/* --- DÜŞÜNME MODU (Faz 3 · ince ayar) ---
   2026'da düşünmeyen model neredeyse kalmadı; mesele düşünmenin
   var/yok olması değil, NE KADAR düşünüldüğü.

   gizliToken = cevaptan ÖNCE üretilen, kullanıcıya gösterilmeyen
   token sayısı. Bunlar da tıpkı cevap gibi tek tek üretilir ve
   aynı bedeli öder.

   ⚠️ Sayılar sınıf varsayımıdır (üretici yayımlamaz), ama uydurma
   değildir: ÖLÇÜLMÜŞ çapaya oturtuldu. Hugging Face AI Energy
   Score v2 (2025), düşünme açıkken enerjinin ortalama 30 kat
   arttığını ölçtü. "Derin" kademesi tipik bir cevapta bu ~30 katı
   yeniden üretir. */
window.EFFORT_LEVELS = {
  hizli:    { label: '⚡ Hızlı',          gizliToken: 0,
              not: 'Model doğrudan cevabı yazmaya başlar.' },
  standart: { label: '⚖️ Standart',       gizliToken: 1500,
              not: 'Kısa bir plan yapıp yazar. Çoğu sohbet uygulamasının varsayılanı.' },
  derin:    { label: '🧠 Derin Düşünme',  gizliToken: 11000,
              not: 'Cevaptan önce binlerce gizli token üretir — ölçülen ortalama artış ~30 kat.' }
};

/* Günlük ayak izi kartı için sadeleştirilmiş iki mod.
   carpan = ölçülen ortalama (30 kat) — sayı uydurulmadı. */
window.DUSUNME_MODU = {
  hizli: { label: '⚡ Ücretsiz · Hızlı', carpan: 1,
           not: 'Model doğrudan cevap yazar.' },
  derin: { label: '🧠 Derin Düşünme',    carpan: 30,
           not: 'Cevaptan önce binlerce gizli token üretir — ölçülen 166 modelde ortalama 30 kat.' }
};

/* Google araması — kıyas çizgisi */
window.ARAMA_WH = 0.30;

/* --- GÖRSEL ARAÇLARI (öğretim listesi: difüzyon adımını anlatır) --- */
window.IMAGE_MODELS = {
  'gpt-image':  { label: 'ChatGPT görsel · OpenAI',       top5: true, whPer: 2.90, steps: 50 },
  'nano-banana':{ label: 'Gemini görsel · Google',        top5: true, whPer: 2.20, steps: 0  },
  'midjourney': { label: 'Midjourney',                    top5: true, whPer: 2.60, steps: 45 },
  'grok-image': { label: 'Grok Imagine · xAI',            top5: true, whPer: 2.50, steps: 0  },
  'firefly':    { label: 'Adobe Firefly',                 top5: true, whPer: 2.00, steps: 35 },
  'designer':   { label: 'Microsoft Designer',            whPer: 2.90, steps: 50 },
  'craiyon':    { label: 'Craiyon',                       whPer: 0.60, steps: 20 }
};

/* --- VIDEO ARAÇLARI ---
   Akışın adımı DEĞİLDİR; hesaplayıcıda isteğe bağlı sekmedir.
   Hiçbir ticari video aracı enerji verisi yayımlamıyor. Tek ölçüm
   noktası açık bir araştırma modeli: 5 sn = 944 Wh → 189 Wh/sn
   (MIT Technology Review, 2025). Aşağıdakiler bu noktadan ölçeklendi. */
window.VIDEO_MODELS = {
  'sora':    { label: 'Sora · OpenAI',    top5: true, whPerSecond: 240, fps: 30 },
  'veo':     { label: 'Veo · Google',     top5: true, whPerSecond: 190, fps: 24 },
  'kling':   { label: 'Kling · Kuaishou', top5: true, whPerSecond: 165, fps: 24 },
  'runway':  { label: 'Runway Gen',       top5: true, whPerSecond: 130, fps: 24 },
  'hailuo':  { label: 'Hailuo · MiniMax', top5: true, whPerSecond: 150, fps: 25 }
};

/* --- METİN vs GÖRSEL vs VIDEO özet (anlatım kartları için) --- */
window.COMPARE_BASELINE = {
  text:  { label: '1 metin cevabı',  wh: 0.30,  note: '~1 hafif geçiş / token' },
  image: { label: '1 görsel',        wh: 1.50,  note: '~30 ağır geçiş (difüzyon)' },
  video: { label: '5 sn video',      wh: 944,   note: 'ölçüm: 3,4 milyon joule' }
};
