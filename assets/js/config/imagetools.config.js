/* =========================================================
   ⚙️ GÖRSEL ÜRETİM ARAÇLARI — HESAPLAYICI LİSTESİ
   ---------------------------------------------------------
   Hesaplayıcı sayfasındaki model listesi. Token Lab'daki kısa
   öğretim listesinden (models.config.js → IMAGE_MODELS) AYRIDIR:
   orası 4 zıt örnekle difüzyon adımını anlatır, burası öğrencinin
   gerçekten kullandığı aracı seçtiği pratik listedir.

   ⚠️ DÜRÜSTLÜK NOTU (SITE_RULES 1.4):
   Bu araçların ÇOĞUNUN yayımlanmış enerji ölçümü YOKTUR. Bu yüzden
   her satırda dayanağı açıkça yazılıdır:

     basis: 'olcum'  → bağımsız bir ölçüme dayanır (kaynak: src)
     basis: 'tahmin' → ölçüm yok; benzer mimari/adım sayısından
                       ölçeklenmiş SINIF TAHMİNİDİR. Sayfada da
                       "tahmin" rozetiyle gösterilir.

   ELİMİZDEKİ GERÇEK ÖLÇÜMLER (tahminler bunlara göre ölçeklenir):
     ~0,3 Wh  → az adımda üreten hızlı modeller
     ~1,5 Wh  → SDXL, ~30 adım (Luccioni vd., 2024 — HF/CMU)
     ~2,9 Wh  → ölçülmüş en pahalı sınıf (Luccioni vd., 2024)

   wh    = 1024×1024 tek görselin tahmini enerjisi (Wh)
   steps = yaklaşık difüzyon adımı (anlatım ve dayanak için)
   free  = üyeliksiz ya da ücretsiz kotayla denenebilir
   open  = açık ağırlıklı (indirip kendi cihazında çalıştırabilirsin)

   YENİ ARAÇ EKLEMEK: aynı biçimde bir satır ekle. Ölçümün yoksa
   basis'i 'tahmin' bırak — uydurma sayıyı "ölçüm" diye yazma.
   ========================================================= */

window.IMAGE_TOOLS_GROUPS = [
  'Az adımda üreten hızlı modeller',
  'Açık kaynak / standart',
  'Büyük difüzyon modelleri',
  'Sohbet modelinin içinden üretenler',
  'Hazır arayüzler (kendi modeli yok)'
];

window.IMAGE_TOOLS = [

  /* ---- A) HIZLI MODELLER — 1-8 adımda üretir ---- */
  { key: 'sdxl-turbo', label: 'SDXL Turbo', org: 'Stability AI',
    group: 'Az adımda üreten hızlı modeller', wh: 0.30, steps: 3,
    basis: 'tahmin', src: 'Az adımlı hızlı modeller sınıfı · ~0,3 Wh referans ölçümü',
    free: true, open: true, url: 'https://huggingface.co/stabilityai/sdxl-turbo',
    note: 'SDXL’in 1-4 adımda üretecek şekilde hızlandırılmış sürümü. Listenin en ucuzu; kalite biraz düşer.' },

  { key: 'z-image-turbo', label: 'Z-Image Turbo', org: 'Alibaba (Tongyi)',
    group: 'Az adımda üreten hızlı modeller', wh: 0.35, steps: 8,
    basis: 'tahmin', src: 'Az adımlı hızlı modeller sınıfı · 6B parametre, 8 adım',
    free: true, open: true, url: 'https://huggingface.co/Tongyi-MAI/Z-Image-Turbo',
    note: 'Kasım 2025’te açık ağırlıkla yayımlandı. 6B parametre, 8 adım; kalite/enerji dengesi çok iyi.' },

  { key: 'qwen-lightning', label: 'Qwen-Image Lightning (4 adım)', org: 'Alibaba · LightX2V',
    group: 'Az adımda üreten hızlı modeller', wh: 0.40, steps: 4,
    basis: 'tahmin', src: 'Hızlandırılmış sürüm · 40 adım yerine 4 adım',
    free: true, open: true, url: 'https://huggingface.co/lightx2v/Qwen-Image-Lightning',
    note: 'Qwen-Image’in hızlandırılmış sürümü: ~10 kat hızlı, kalite kaybı az.' },

  { key: 'flux-schnell', label: 'FLUX.1-schnell', org: 'Black Forest Labs',
    group: 'Az adımda üreten hızlı modeller', wh: 0.50, steps: 4,
    basis: 'olcum', src: 'Hugging Face — AI Energy Score',
    free: true, open: true, url: 'https://huggingface.co/black-forest-labs/FLUX.1-schnell',
    note: 'Apache-2.0 lisanslı, 4 adım. Ölçümü yapılmış olduğu için atölye için en uygun açık model.' },

  /* ---- B) AÇIK KAYNAK / STANDART DİFÜZYON — ~20-30 adım ---- */
  { key: 'craiyon', label: 'Craiyon', org: 'Craiyon',
    group: 'Açık kaynak / standart', wh: 0.60, steps: 20,
    basis: 'tahmin', src: 'Küçük model sınıfı',
    free: true, open: false, url: 'https://www.craiyon.com/',
    note: 'Üyeliksiz ve tamamen ücretsiz. Kalite düşük ama sınıf dostu.' },

  { key: 'sd15', label: 'Stable Diffusion 1.5', org: 'Stability AI / RunwayML',
    group: 'Açık kaynak / standart', wh: 0.90, steps: 25,
    basis: 'tahmin', src: 'SDXL ölçümünden model boyutuna göre ölçeklendi',
    free: true, open: true, url: 'https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5',
    note: 'Klasik açık model; sıradan bilgisayarda bile çalışabilir.' },

  { key: 'deepai', label: 'DeepAI Image Generator', org: 'DeepAI',
    group: 'Açık kaynak / standart', wh: 1.20, steps: 28,
    basis: 'tahmin', src: 'SD tabanlı standart difüzyon sınıfı',
    free: true, open: false, url: 'https://deepai.org/machine-learning-model/text2img',
    note: 'Ücretsiz kotayla denenebilir.' },

  { key: 'playground25', label: 'Playground v2.5', org: 'Playground AI',
    group: 'Açık kaynak / standart', wh: 1.40, steps: 30,
    basis: 'tahmin', src: 'SDXL sınıfı (aynı mimari ailesi)',
    free: true, open: true, url: 'https://huggingface.co/playgroundai/playground-v2.5-1024px-aesthetic',
    note: 'SDXL mimarisi üzerine kurulu açık model.' },

  { key: 'sdxl', label: 'Stable Diffusion XL (SDXL)', org: 'Stability AI',
    group: 'Açık kaynak / standart', wh: 1.50, steps: 30,
    basis: 'olcum', src: 'Luccioni vd. (2024) — Hugging Face / CMU',
    free: true, open: true, url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0',
    note: 'Ölçümü yapılmış referans model — listedeki en güvenilir sayı.' },

  /* ---- C) BÜYÜK DİFÜZYON — ~30-50 adım, büyük modeller ---- */
  { key: 'leonardo', label: 'Leonardo.ai', org: 'Leonardo / Canva',
    group: 'Büyük difüzyon modelleri', wh: 1.80, steps: 32,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: true, open: false, url: 'https://leonardo.ai/',
    note: 'Günlük ücretsiz kredi verir.' },

  { key: 'flux-dev', label: 'FLUX.1-dev', org: 'Black Forest Labs',
    group: 'Büyük difüzyon modelleri', wh: 1.90, steps: 28,
    basis: 'tahmin', src: 'schnell ölçümünden adım sayısına göre ölçeklendi',
    free: true, open: true, url: 'https://huggingface.co/black-forest-labs/FLUX.1-dev',
    note: 'Açık ağırlıklı (ticari olmayan kullanım). schnell’den kaliteli, daha pahalı.' },

  { key: 'firefly', label: 'Adobe Firefly', org: 'Adobe',
    group: 'Büyük difüzyon modelleri', wh: 2.00, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: true, open: false, url: 'https://firefly.adobe.com/',
    note: 'Aylık ücretsiz kredi. Lisanslı veriyle eğitildiği belirtilir.' },

  { key: 'canva', label: 'Canva Magic Media', org: 'Canva',
    group: 'Büyük difüzyon modelleri', wh: 2.00, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı (Firefly/Imagen tabanlı)',
    free: true, open: false, url: 'https://www.canva.com/',
    note: 'Arkadaki model değişebilir; sayı sınıf ortalamasıdır.' },

  { key: 'ideogram', label: 'Ideogram', org: 'Ideogram AI',
    group: 'Büyük difüzyon modelleri', wh: 2.00, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: true, open: false, url: 'https://ideogram.ai/',
    note: 'Görsel içine yazı yazmada iyi. Ücretsiz kotası var.' },

  { key: 'recraft', label: 'Recraft', org: 'Recraft',
    group: 'Büyük difüzyon modelleri', wh: 2.00, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: true, open: false, url: 'https://www.recraft.ai/',
    note: 'Vektör ve ikon üretiminde güçlü. Ücretsiz kotası var.' },

  { key: 'sd35', label: 'Stable Diffusion 3.5', org: 'Stability AI',
    group: 'Büyük difüzyon modelleri', wh: 2.10, steps: 40,
    basis: 'olcum', src: 'ML.ENERGY Leaderboard · SD3 ölçümleri',
    free: true, open: true, url: 'https://huggingface.co/stabilityai/stable-diffusion-3.5-large',
    note: 'Açık ağırlıklı büyük difüzyon modeli.' },

  { key: 'wanx', label: 'Wanx / Wan', org: 'Alibaba',
    group: 'Büyük difüzyon modelleri', wh: 2.20, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: true, open: true, url: 'https://huggingface.co/Wan-AI',
    note: 'Alibaba’nın görsel/video ailesi; açık sürümleri var.' },

  { key: 'flux2-dev', label: 'FLUX.2 [dev]', org: 'Black Forest Labs',
    group: 'Büyük difüzyon modelleri', wh: 2.40, steps: 40,
    basis: 'tahmin', src: 'FLUX.1 ölçümünden model büyümesine göre ölçeklendi (32B)',
    free: false, open: true, url: 'https://huggingface.co/black-forest-labs/FLUX.2-dev',
    note: 'Kasım 2025’te çıkan yeni kuşak, 32 milyar parametre. Açık ağırlıklı ama ticari kullanım lisansa bağlı.' },

  { key: 'seedream', label: 'Seedream 5.0 Pro', org: 'ByteDance',
    group: 'Büyük difüzyon modelleri', wh: 2.40, steps: 40,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: false, open: false, url: 'https://www.volcengine.com/',
    note: 'ByteDance’in güncel görsel modeli (Temmuz 2026). Kapalı; enerji verisi yayımlamaz.' },

  { key: 'midjourney', label: 'Midjourney', org: 'Midjourney',
    group: 'Büyük difüzyon modelleri', wh: 2.60, steps: 45,
    basis: 'tahmin', src: 'Büyük difüzyon üst sınıfı',
    free: false, open: false, url: 'https://www.midjourney.com/',
    note: 'Kapalı model; hiçbir enerji verisi yayımlamaz.' },

  { key: 'qwen-image2', label: 'Qwen-Image 2.0', org: 'Alibaba',
    group: 'Büyük difüzyon modelleri', wh: 2.60, steps: 40,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı · 7B, doğrudan 2K çıktı',
    free: true, open: true, url: 'https://huggingface.co/Qwen/Qwen-Image',
    note: 'Şubat 2026’da çıktı. 7B parametre; doğrudan 2048×2048 ürettiği için pahalıdır.' },

  /* ---- D) ÇOK-KİPLİ (LLM TABANLI) ---- */
  { key: 'nano-banana', label: 'Nano Banana (Gemini Image)', org: 'Google',
    group: 'Sohbet modelinin içinden üretenler', wh: 2.20, steps: 0,
    basis: 'tahmin', src: 'Sohbet modeli içinden üreten sınıf — adım sayısı yok',
    free: true, open: false, url: 'https://aistudio.google.com/',
    note: 'AI Studio üzerinden ücretsiz denenebilir. Ayrı bir difüzyon modeli değil; Gemini’nin kendisi üretir.' },

  { key: 'grok-imagine', label: 'Grok Imagine', org: 'xAI',
    group: 'Sohbet modelinin içinden üretenler', wh: 2.50, steps: 0,
    basis: 'tahmin', src: 'Sohbet modeli içinden üreten sınıf',
    free: true, open: false, url: 'https://grok.com/',
    note: 'X/Grok uygulamasının içinde çalışır. Enerji verisi yayımlanmamıştır.' },

  { key: 'dalle', label: 'DALL·E 3', org: 'OpenAI',
    group: 'Sohbet modelinin içinden üretenler', wh: 2.90, steps: 50,
    basis: 'olcum', src: 'Luccioni vd. (2024) — ölçülmüş en pahalı sınıf',
    free: false, open: false, url: 'https://openai.com/index/dall-e-3/',
    note: 'Ölçümü olan en pahalı model. Microsoft’un ücretsiz aracı üzerinden de denenebilir.' },

  { key: 'bing', label: 'Microsoft Designer — Image Creator', org: 'Microsoft (DALL·E tabanlı)',
    group: 'Sohbet modelinin içinden üretenler', wh: 2.90, steps: 50,
    basis: 'olcum', src: 'DALL·E ile aynı sınıf (Luccioni vd., 2024)',
    free: true, open: false, url: 'https://designer.microsoft.com/image-creator',
    note: 'Microsoft hesabıyla ücretsiz. Arkasında DALL·E çalışır (eski adı Bing Image Creator).' },

  { key: 'gpt-image2', label: 'GPT Image 2', org: 'OpenAI',
    group: 'Sohbet modelinin içinden üretenler', wh: 3.20, steps: 0,
    basis: 'tahmin', src: 'Sohbet modeli içinden üreten sınıfın üst ucu',
    free: false, open: false, url: 'https://platform.openai.com/docs/models/gpt-image-2',
    note: 'Nisan 2026’da çıktı. Üretmeden önce “düşündüğü” ve 2K çıktı verdiği için sınıfın en pahalısı sayılır.' },

  /* ---- E) HAZIR ARAYÜZLER — kendi modeli yok, başkasınınkini çalıştırır ----
     Bunlar birer model DEĞİL, model çalıştıran ücretsiz sitelerdir. Gerçek
     maliyet, içeride hangi modeli seçtiğine bağlıdır; buradaki sayı yalnızca
     "orta hâlli bir difüzyon modeli" varsayımıdır. Hangi modeli kullandığını
     biliyorsan onu seç — bu satırları son çare olarak kullan. */
  { key: 'pollinations', label: 'Pollinations.ai', org: 'Pollinations',
    group: 'Hazır arayüzler (kendi modeli yok)', wh: 0.90, steps: 25,
    basis: 'tahmin', src: '⚠️ Kendi modeli yok — orta hâlli açık difüzyon varsayıldı',
    free: true, open: false, url: 'https://pollinations.ai/',
    note: 'Üyeliksiz ve sınırsız. Arkada açık modeller çalışır; hangisi olduğunu göstermez.' },

  { key: 'creen', label: 'Creen AI', org: 'Creen',
    group: 'Hazır arayüzler (kendi modeli yok)', wh: 1.50, steps: 30,
    basis: 'tahmin', src: '⚠️ Kendi modeli yok — orta hâlli difüzyon varsayıldı',
    free: true, open: false, url: 'https://www.creen.ai/',
    note: 'Üyeliksiz. Tek ekrandan başka firmaların modellerini çalıştırır; maliyet seçtiğin modele göre değişir.' }
];

/* --- GÖRÜNTÜ BOYUTLARI ---
   Enerji, piksel sayısıyla yaklaşık ORANTILI kabul edilir:
   1024×1024 temel alınır, diğer boyutlar buna göre ölçeklenir. */
window.IMAGE_SIZES = [
  { label: '512 × 512 (küçük kare)',        w: 512,  h: 512 },
  { label: '768 × 768 (orta kare)',         w: 768,  h: 768 },
  { label: '1024 × 1024 (standart kare)',   w: 1024, h: 1024 },
  { label: '1024 × 576 (16:9 yatay)',       w: 1024, h: 576 },
  { label: '768 × 1024 (3:4 dikey)',        w: 768,  h: 1024 },
  { label: '1280 × 1280 (büyük kare)',      w: 1280, h: 1280 },
  { label: '1536 × 1536 (çok büyük)',       w: 1536, h: 1536 },
  { label: '1920 × 1080 (Full HD)',         w: 1920, h: 1080 },
  { label: '2048 × 2048 (2K kare)',         w: 2048, h: 2048 }
];
