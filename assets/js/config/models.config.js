/* =========================================================
   ⚙️ MODEL ENERJİ DEĞERLERİ — BURAYI DÜZENLEYEBİLİRSİN
   ---------------------------------------------------------
   Tüm değerler Wh (watt-saat) cinsindendir. Eğitim amaçlı
   TAHMİNLERDİR; gerçek tüketim model/donanım/şebekeye göre
   değişir. Yeni model eklemek için listeye aynı biçimde bir
   satır eklemen yeterli.

   NOT: model adları gerçek ailelerdir; enerji sayıları ise
   kamuya açık ölçümlerden (Google 2025, Epoch AI 2025,
   Hugging Face AI Energy Score) türetilmiş YAKLAŞIK değerlerdir.
   ========================================================= */

/* --- METİN MODELLERİ ---
   inWh1k   = 1000 GİRDİ token'ı işlemenin enerjisi (ucuz, "promptun tamamı tek seferde okunur")
   outWh1k  = 1000 ÇIKTI token'ı üretmenin enerjisi (pahalı, "cevap kelime kelime üretilir")
   maxOut   = bu modelin tek cevapta üretebildiği EN FAZLA çıktı token'ı.
              (Bunu kullanıcı belirlemez; MODEL belirler. Hesaplayıcıdaki
              "çıktı uzunluğu" kaydırıcısının üst sınırı budur.) */
window.TEXT_MODELS = {
  'gemini-flash': { label: 'Gemini Flash · Google',    inWh1k: 0.02, outWh1k: 0.90, maxOut: 8192 },
  'gpt':          { label: 'ChatGPT (GPT) · OpenAI',   inWh1k: 0.03, outWh1k: 1.10, maxOut: 8192 },
  'llama':        { label: 'Llama (açık) · Meta',      inWh1k: 0.03, outWh1k: 1.00, maxOut: 4096 },
  'claude':       { label: 'Claude · Anthropic',       inWh1k: 0.05, outWh1k: 2.00, maxOut: 8192 }
};

/* --- EFOR (REASONING EFFORT) ---
   Web arayüzlerinde modele genelde sayısal bir "düşünme bütçesi"
   GİRMEZSİN; bunun yerine bir EFOR seviyesi seçersin (ya da düğme).
   Daha yüksek efor = arka planda daha çok GİZLİ düşünme token'ı =
   daha çok enerji. hidden = eklenen yaklaşık gizli token sayısı. */
window.EFFORT_LEVELS = {
  off:    { label: 'Kapalı', hidden: 0 },
  low:    { label: 'Düşük',  hidden: 300 },
  medium: { label: 'Orta',   hidden: 1200 },
  high:   { label: 'Yüksek', hidden: 4000 }
};

/* --- GÖRSEL MODELLERİ ---
   whPer = 1 görsel üretmenin enerjisi (difüzyon adımı sayısına bağlı)
   steps = yaklaşık difüzyon adımı (animasyon ve anlatım için) */
window.IMAGE_MODELS = {
  'flux-schnell': { label: 'FLUX.1-schnell · Black Forest Labs', whPer: 0.50, steps: 4  },
  'sdxl':         { label: 'Stable Diffusion XL · Stability AI', whPer: 1.50, steps: 30 },
  'sd35':         { label: 'Stable Diffusion 3.5 · Stability AI',whPer: 2.10, steps: 40 },
  'dalle':        { label: 'DALL·E sınıfı · OpenAI',             whPer: 2.90, steps: 50 }
};

/* --- VIDEO MODELLERİ ---
   whPerSecond = üretilen videonun 1 saniyesi kaç Wh?
   fps = saniyedeki kare sayısı (1 video ≈ kaç görsel olduğunu anlatmak için) */
window.VIDEO_MODELS = {
  'runway':  { label: 'Runway Gen (kısa) · Runway', whPerSecond: 22,  fps: 24 },
  'veo':     { label: 'Veo sınıfı · Google',        whPerSecond: 60,  fps: 24 },
  'sora':    { label: 'Sora sınıfı (HQ) · OpenAI',  whPerSecond: 140, fps: 30 }
};

/* --- METİN vs GÖRSEL vs VIDEO özet (anlatım kartları için) --- */
window.COMPARE_BASELINE = {
  text:  { label: '1 metin cevabı',  wh: 0.30,  note: '~1 hafif geçiş / token' },
  image: { label: '1 görsel',        wh: 1.50,  note: '~30 ağır geçiş (difüzyon)' },
  video: { label: '5 sn video',      wh: 300,   note: 'her kare bir görsel gibi' }
};
