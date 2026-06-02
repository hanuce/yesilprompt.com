/* =========================================================
   ⚙️ MODEL ENERJİ DEĞERLERİ — BURAYI DÜZENLEYEBİLİRSİN
   ---------------------------------------------------------
   Tüm değerler Wh (watt-saat) cinsinden. Eğitim amaçlı
   TAHMİNLERDİR; model/donanım/şebekeye göre değişir.
   Yeni model eklemek için listeye aynı biçimde bir satır ekle.
   ========================================================= */

/* --- METİN MODELLERİ ---
   inWh1k  = 1000 GİRDİ token'ı işlemenin enerjisi (ucuz, "prefill")
   outWh1k = 1000 ÇIKTI token'ı üretmenin enerjisi (pahalı, "decode") */
window.TEXT_MODELS = {
  'gemini-flash': { label: 'Gemini Flash (verimli)', inWh1k: 0.02, outWh1k: 0.90 },
  'gpt-mini':     { label: 'GPT sınıfı (mini)',       inWh1k: 0.03, outWh1k: 1.10 },
  'gpt-large':    { label: 'Büyük model (frontier)',  inWh1k: 0.06, outWh1k: 2.40 }
};

/* --- DÜŞÜNME BÜTÇESİ ---
   Modelin görünmez "düşünme" token'ları. Çıktı gibi pahalıdır.
   hidden = eklenen gizli token sayısı. */
window.THINKING_LEVELS = {
  off:    { label: 'Kapalı', hidden: 0 },
  low:    { label: 'Düşük',  hidden: 300 },
  medium: { label: 'Orta',   hidden: 1200 },
  high:   { label: 'Yüksek', hidden: 4000 }
};

/* --- GÖRSEL MODELLERİ ---
   whPer = 1 görsel üretmenin enerjisi (difüzyon adımı sayısına bağlı)
   steps = yaklaşık difüzyon adımı (animasyon ve anlatım için) */
window.IMAGE_MODELS = {
  'flux-schnell': { label: 'FLUX.1-schnell', whPer: 0.50, steps: 4  },
  'sdxl':         { label: 'SDXL',           whPer: 1.50, steps: 30 },
  'sd35':         { label: 'SD 3.5',         whPer: 2.10, steps: 40 },
  'big-diffusion':{ label: 'Büyük difüzyon', whPer: 2.90, steps: 50 }
};

/* --- VIDEO MODELLERİ ---
   whPerSecond = üretilen videonun 1 saniyesi kaç Wh?
   fps = saniyedeki kare sayısı (1 video ≈ kaç görsel olduğunu anlatmak için) */
window.VIDEO_MODELS = {
  'short-fast': { label: 'Hızlı kısa-video modeli', whPerSecond: 22,  fps: 24 },
  'standard':   { label: 'Standart video modeli',   whPerSecond: 60,  fps: 24 },
  'hq':         { label: 'Yüksek kalite video',     whPerSecond: 140, fps: 30 }
};

/* --- METİN vs GÖRSEL vs VIDEO özet (anlatım kartları için) --- */
window.COMPARE_BASELINE = {
  text:  { label: '1 metin cevabı',  wh: 0.30,  note: '~1 hafif geçiş / token' },
  image: { label: '1 görsel',        wh: 1.50,  note: '~30 ağır geçiş (difüzyon)' },
  video: { label: '5 sn video',      wh: 300,   note: 'her kare bir görsel gibi' }
};
