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

   ÖLÇEK ÇAPALARI (literatürün uçları):
     ~0,3 Wh  → damıtılmış, az adımlı modeller (yeni nesil)
     ~1,5 Wh  → SDXL, ~30 adım (Luccioni vd., 2024 — HF/CMU)
     ~2,9 Wh  → büyük difüzyon üst sınırı (Luccioni vd., 2024)

   wh    = 1024×1024 tek görselin tahmini enerjisi (Wh)
   steps = yaklaşık difüzyon adımı (anlatım ve dayanak için)
   free  = üyeliksiz ya da ücretsiz kotayla denenebilir
   open  = açık ağırlıklı (indirip kendi cihazında çalıştırabilirsin)

   YENİ ARAÇ EKLEMEK: aynı biçimde bir satır ekle. Ölçümün yoksa
   basis'i 'tahmin' bırak — uydurma sayıyı "ölçüm" diye yazma.
   ========================================================= */

window.IMAGE_TOOLS_GROUPS = [
  'Çok verimli (az adımlı)',
  'Açık kaynak / standart',
  'Büyük difüzyon',
  'Çok-kipli (LLM tabanlı)'
];

window.IMAGE_TOOLS = [

  /* ---- A) ÇOK VERİMLİ — damıtılmış, 1-8 adım ---- */
  { key: 'sdxl-turbo', label: 'SDXL Turbo', org: 'Stability AI',
    group: 'Çok verimli (az adımlı)', wh: 0.30, steps: 3,
    basis: 'tahmin', src: 'Az adımlı damıtılmış sınıf · ~0,3 Wh çapası',
    free: true, open: true, url: 'https://huggingface.co/stabilityai/sdxl-turbo',
    note: '1-4 adımda üretir. Sınıfının en ucuzu; kalite biraz düşer.' },

  { key: 'z-image-turbo', label: 'Z-Image Turbo', org: 'Alibaba (Tongyi)',
    group: 'Çok verimli (az adımlı)', wh: 0.35, steps: 8,
    basis: 'tahmin', src: 'Az adımlı damıtılmış sınıf · 6B parametre, 8 adım',
    free: true, open: true, url: 'https://huggingface.co/Tongyi-MAI/Z-Image-Turbo',
    note: '6B parametre, 8 adım. Kalite/enerji dengesi çok iyi olan açık model.' },

  { key: 'qwen-lightning', label: 'Qwen-Image Lightning (4 adım)', org: 'Alibaba · LightX2V',
    group: 'Çok verimli (az adımlı)', wh: 0.40, steps: 4,
    basis: 'tahmin', src: 'Damıtılmış sürüm · 40 adım yerine 4 adım',
    free: true, open: true, url: 'https://huggingface.co/lightx2v',
    note: 'Qwen-Image’in damıtılmışı: ~10 kat hızlı, kalite kaybı az.' },

  { key: 'flux-schnell', label: 'FLUX.1-schnell', org: 'Black Forest Labs',
    group: 'Çok verimli (az adımlı)', wh: 0.50, steps: 4,
    basis: 'olcum', src: 'Hugging Face — AI Energy Score',
    free: true, open: true, url: 'https://huggingface.co/black-forest-labs/FLUX.1-schnell',
    note: 'Apache-2.0 lisanslı, 4 adım. Atölye için en uygun açık model.' },

  /* ---- B) AÇIK KAYNAK / STANDART DİFÜZYON — ~20-30 adım ---- */
  { key: 'craiyon', label: 'Craiyon', org: 'Craiyon',
    group: 'Açık kaynak / standart', wh: 0.60, steps: 20,
    basis: 'tahmin', src: 'Küçük model sınıfı',
    free: true, open: false, url: 'https://www.craiyon.com/',
    note: 'Üyeliksiz ve tamamen ücretsiz. Kalite düşük ama sınıf dostu.' },

  { key: 'sd15', label: 'Stable Diffusion 1.5', org: 'Stability AI / RunwayML',
    group: 'Açık kaynak / standart', wh: 0.90, steps: 25,
    basis: 'tahmin', src: 'SDXL ölçümünden model boyutuna göre ölçeklendi',
    free: true, open: true, url: 'https://huggingface.co/spaces',
    note: 'Klasik açık model; sıradan bilgisayarda bile çalışabilir.' },

  { key: 'pollinations', label: 'Pollinations.ai', org: 'Pollinations (açık altyapı)',
    group: 'Açık kaynak / standart', wh: 0.90, steps: 25,
    basis: 'tahmin', src: 'Açık difüzyon sınıfı',
    free: true, open: false, url: 'https://pollinations.ai/',
    note: 'Üyeliksiz, sınırsız. Arkada açık modeller çalışır.' },

  { key: 'deepai', label: 'DeepAI Image Generator', org: 'DeepAI',
    group: 'Açık kaynak / standart', wh: 1.20, steps: 28,
    basis: 'tahmin', src: 'SD tabanlı standart difüzyon sınıfı',
    free: true, open: false, url: 'https://deepai.org/machine-learning-model/text2img',
    note: 'Ücretsiz kotayla denenebilir.' },

  { key: 'kandinsky', label: 'Kandinsky 3', org: 'Sber AI',
    group: 'Açık kaynak / standart', wh: 1.30, steps: 30,
    basis: 'tahmin', src: 'Standart difüzyon sınıfı',
    free: true, open: true, url: 'https://huggingface.co/kandinsky-community',
    note: 'Açık ağırlıklı; Hugging Face üzerinde denenebilir.' },

  { key: 'playground25', label: 'Playground v2.5', org: 'Playground AI',
    group: 'Açık kaynak / standart', wh: 1.40, steps: 30,
    basis: 'tahmin', src: 'SDXL sınıfı (aynı mimari ailesi)',
    free: true, open: true, url: 'https://huggingface.co/playgroundai',
    note: 'SDXL mimarisi üzerine kurulu açık model.' },

  { key: 'sdxl', label: 'Stable Diffusion XL (SDXL)', org: 'Stability AI',
    group: 'Açık kaynak / standart', wh: 1.50, steps: 30,
    basis: 'olcum', src: 'Luccioni vd. (2024) — Hugging Face / CMU',
    free: true, open: true, url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0',
    note: 'Ölçümü yapılmış referans model — listedeki en güvenilir sayı.' },

  /* ---- C) BÜYÜK DİFÜZYON — ~30-50 adım, büyük modeller ---- */
  { key: 'creen', label: 'Creen', org: 'belirsiz',
    group: 'Büyük difüzyon', wh: 1.50, steps: 30,
    basis: 'tahmin', src: '⚠️ Mimarisi doğrulanamadı — genel difüzyon varsayıldı',
    free: false, open: false, url: '',
    note: 'Bu araç hakkında kamuya açık teknik bilgi bulunamadı; sayı yalnızca sınıf ortalamasıdır.' },

  { key: 'leonardo', label: 'Leonardo.ai', org: 'Leonardo / Canva',
    group: 'Büyük difüzyon', wh: 1.80, steps: 32,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: true, open: false, url: 'https://leonardo.ai/',
    note: 'Günlük ücretsiz kredi verir.' },

  { key: 'flux-dev', label: 'FLUX.1-dev', org: 'Black Forest Labs',
    group: 'Büyük difüzyon', wh: 1.90, steps: 28,
    basis: 'tahmin', src: 'schnell ölçümünden adım sayısına göre ölçeklendi',
    free: true, open: true, url: 'https://huggingface.co/black-forest-labs/FLUX.1-dev',
    note: 'Açık ağırlıklı (ticari olmayan kullanım). schnell’den kaliteli, daha pahalı.' },

  { key: 'firefly', label: 'Adobe Firefly', org: 'Adobe',
    group: 'Büyük difüzyon', wh: 2.00, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: true, open: false, url: 'https://firefly.adobe.com/',
    note: 'Aylık ücretsiz kredi. Lisanslı veriyle eğitildiği belirtilir.' },

  { key: 'canva', label: 'Canva Magic Media', org: 'Canva',
    group: 'Büyük difüzyon', wh: 2.00, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı (Firefly/Imagen tabanlı)',
    free: true, open: false, url: 'https://www.canva.com/',
    note: 'Arkadaki model değişebilir; sayı sınıf ortalamasıdır.' },

  { key: 'ideogram', label: 'Ideogram', org: 'Ideogram AI',
    group: 'Büyük difüzyon', wh: 2.00, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: true, open: false, url: 'https://ideogram.ai/',
    note: 'Görsel içine yazı yazmada iyi. Ücretsiz kotası var.' },

  { key: 'recraft', label: 'Recraft', org: 'Recraft',
    group: 'Büyük difüzyon', wh: 2.00, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: true, open: false, url: 'https://www.recraft.ai/',
    note: 'Vektör ve ikon üretiminde güçlü. Ücretsiz kotası var.' },

  { key: 'sd35', label: 'Stable Diffusion 3.5', org: 'Stability AI',
    group: 'Büyük difüzyon', wh: 2.10, steps: 40,
    basis: 'olcum', src: 'ML.ENERGY Leaderboard · SD3 ölçümleri',
    free: true, open: true, url: 'https://huggingface.co/stabilityai/stable-diffusion-3.5-large',
    note: 'Açık ağırlıklı büyük difüzyon modeli.' },

  { key: 'wanx', label: 'Wanx / Wan', org: 'Alibaba',
    group: 'Büyük difüzyon', wh: 2.20, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: true, open: true, url: 'https://huggingface.co/Wan-AI',
    note: 'Alibaba’nın görsel/video ailesi; açık sürümleri var.' },

  { key: 'flux2', label: 'FLUX.2', org: 'Black Forest Labs',
    group: 'Büyük difüzyon', wh: 2.40, steps: 40,
    basis: 'tahmin', src: 'FLUX.1 ölçümünden model büyümesine göre ölçeklendi',
    free: false, open: true, url: 'https://blackforestlabs.ai/',
    note: 'FLUX ailesinin yeni ve daha büyük kuşağı.' },

  { key: 'seedream', label: 'Seedream', org: 'ByteDance',
    group: 'Büyük difüzyon', wh: 2.40, steps: 40,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: false, open: false, url: 'https://www.volcengine.com/',
    note: 'ByteDance’in görsel modeli; teknik ayrıntı sınırlı yayımlanmıştır.' },

  { key: 'midjourney', label: 'Midjourney', org: 'Midjourney',
    group: 'Büyük difüzyon', wh: 2.60, steps: 45,
    basis: 'tahmin', src: 'Büyük difüzyon üst sınıfı',
    free: false, open: false, url: 'https://www.midjourney.com/',
    note: 'Kapalı model; hiçbir enerji verisi yayımlamaz.' },

  { key: 'qwen-image2', label: 'Qwen-Image 2.0', org: 'Alibaba',
    group: 'Büyük difüzyon', wh: 2.60, steps: 40,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı · 7B, doğal 2K çıktı',
    free: true, open: true, url: 'https://huggingface.co/Qwen',
    note: 'Açık ağırlıklı, doğrudan 2048×2048 üretir — bu yüzden pahalıdır.' },

  /* ---- D) ÇOK-KİPLİ (LLM TABANLI) ---- */
  { key: 'nano-banana', label: 'Nano Banana (Gemini Image)', org: 'Google',
    group: 'Çok-kipli (LLM tabanlı)', wh: 2.20, steps: 0,
    basis: 'tahmin', src: 'Çok-kipli LLM sınıfı — adım tabanlı değil',
    free: true, open: false, url: 'https://aistudio.google.com/',
    note: 'AI Studio üzerinden ücretsiz denenebilir. Difüzyon değil, çok-kipli üretim.' },

  { key: 'grok-imagine', label: 'Grok Imagine', org: 'xAI',
    group: 'Çok-kipli (LLM tabanlı)', wh: 2.50, steps: 0,
    basis: 'tahmin', src: 'Çok-kipli LLM sınıfı',
    free: true, open: false, url: 'https://grok.com/',
    note: 'X/Grok içine gömülü. Enerji verisi yayımlanmamıştır.' },

  { key: 'dalle', label: 'DALL·E 3', org: 'OpenAI',
    group: 'Çok-kipli (LLM tabanlı)', wh: 2.90, steps: 50,
    basis: 'olcum', src: 'Luccioni vd. (2024) — büyük difüzyon üst sınırı',
    free: false, open: false, url: 'https://openai.com/dall-e-3',
    note: 'Ölçülen en pahalı sınıf. Bing üzerinden ücretsiz erişilebilir.' },

  { key: 'bing', label: 'Bing Image Creator', org: 'Microsoft (DALL·E tabanlı)',
    group: 'Çok-kipli (LLM tabanlı)', wh: 2.90, steps: 50,
    basis: 'olcum', src: 'DALL·E ile aynı sınıf (Luccioni vd., 2024)',
    free: true, open: false, url: 'https://www.bing.com/images/create',
    note: 'Microsoft hesabıyla ücretsiz. Arkasında DALL·E çalışır.' },

  { key: 'gpt-image2', label: 'GPT Image 2', org: 'OpenAI',
    group: 'Çok-kipli (LLM tabanlı)', wh: 3.20, steps: 0,
    basis: 'tahmin', src: 'Çok-kipli LLM sınıfı üst ucu',
    free: false, open: false, url: 'https://openai.com/',
    note: 'Otoregresif çok-kipli üretim; difüzyondan da pahalı olduğu değerlendirilir.' }
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
