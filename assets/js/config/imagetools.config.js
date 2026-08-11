/* =========================================================
   ⚙️ GÖRSEL ÜRETİM ARAÇLARI — HESAPLAYICI LİSTESİ
   ---------------------------------------------------------
   ⚠️ YALNIZCA SON KULLANICI ÜRÜNLERİ LİSTELENİR.
   Öğrencinin tarayıcıdan açıp gerçekten kullanabileceği araçlar
   vardır. İndirilip kurulan açık ağırlıklar (ham SDXL, FLUX,
   Stable Diffusion checkpoint'leri) ve yerel çalıştırma araçları
   listede YOKTUR — öğrenci onları atölyede kullanamaz.

   ℹ️ Ama ÖLÇÜMLERİ kullanılır: kapalı ürünlerin sayısı, açık
   modellerde yapılmış ölçümlerden ölçeklenir. Sayının kaynağı
   her satırda yazılıdır.

   ⭐ top5: true olan beş araç listenin EN ÜSTÜNDE ayrı grupta durur.

   basis: 'olcum'  → bağımsız bir ölçüme dayanır (kaynak: src)
   basis: 'tahmin' → ölçüm yok; benzer mimari/adım sayısından
                     ölçeklenmiş SINIF TAHMİNİDİR (turuncu rozet).

   ELİMİZDEKİ GERÇEK ÖLÇÜMLER (tahminler bunlara göre ölçeklenir):
     ~0,3 Wh  → az adımda üreten hızlı modeller
     ~1,5 Wh  → SDXL, ~30 adım (Luccioni vd., 2024 — HF/CMU)
     ~2,9 Wh  → ölçülmüş en pahalı sınıf (Luccioni vd., 2024)

   ⚠️ Kapalı ticari araçların ÇOĞU hiçbir enerji verisi yayımlamaz.
   Bu bir eksiklik değil, atölyenin konusudur: turuncu rozet
   öğrenciye tam olarak bunu gösterir (bkz. SITE_RULES 1.4a).
   ========================================================= */

window.IMAGE_TOOLS_GROUPS = [
  '⭐ En çok kullanılan 5',
  'Diğer araçlar'
];

window.IMAGE_TOOLS = [

  /* ---- ⭐ EN ÇOK KULLANILAN BEŞ ---- */
  { key: 'gpt-image', label: 'ChatGPT görsel (GPT Image)', org: 'OpenAI', top5: true,
    group: '⭐ En çok kullanılan 5', wh: 2.90, steps: 50,
    basis: 'olcum', src: 'Luccioni vd. (2024) — DALL·E sınıfı, ölçülmüş en pahalı grup',
    free: false, open: false, url: 'https://chatgpt.com/',
    note: 'Sohbetin içinden üretir. Ölçümü olan sınıfın üst ucundadır.' },

  { key: 'nano-banana', label: 'Gemini görsel (Nano Banana)', org: 'Google', top5: true,
    group: '⭐ En çok kullanılan 5', wh: 2.20, steps: 0,
    basis: 'tahmin', src: 'Sohbet modeli içinden üreten sınıf — Google görsel için enerji yayımlamadı',
    free: true, open: false, url: 'https://gemini.google.com/',
    note: 'Ayrı bir difüzyon modeli değil; Gemini’nin kendisi üretir. Ücretsiz kotayla denenebilir.' },

  { key: 'midjourney', label: 'Midjourney', org: 'Midjourney', top5: true,
    group: '⭐ En çok kullanılan 5', wh: 2.60, steps: 45,
    basis: 'tahmin', src: 'Büyük difüzyon üst sınıfı — Midjourney hiçbir enerji verisi yayımlamaz',
    free: false, open: false, url: 'https://www.midjourney.com/',
    note: 'Tek “üret” tıklamasında 4’lü ızgara verir — dördünün de enerjisi harcanır.' },

  { key: 'grok-image', label: 'Grok Imagine', org: 'xAI', top5: true,
    group: '⭐ En çok kullanılan 5', wh: 2.50, steps: 0,
    basis: 'tahmin', src: 'Sohbet modeli içinden üreten sınıf — xAI enerji verisi yayımlamaz',
    free: true, open: false, url: 'https://grok.com/',
    note: 'X/Grok uygulamasının içinde çalışır.' },

  { key: 'firefly', label: 'Adobe Firefly', org: 'Adobe', top5: true,
    group: '⭐ En çok kullanılan 5', wh: 2.00, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı — Adobe enerji verisi yayımlamaz',
    free: true, open: false, url: 'https://firefly.adobe.com/',
    note: 'Aylık ücretsiz kredi. Lisanslı veriyle eğitildiği belirtilir.' },

  /* ---- DİĞER SON KULLANICI ARAÇLARI ---- */
  { key: 'designer', label: 'Microsoft Designer', org: 'Microsoft (DALL·E tabanlı)',
    group: 'Diğer araçlar', wh: 2.90, steps: 50,
    basis: 'olcum', src: 'DALL·E ile aynı sınıf (Luccioni vd., 2024)',
    free: true, open: false, url: 'https://designer.microsoft.com/image-creator',
    note: 'Microsoft hesabıyla ücretsiz. Arkasında DALL·E çalışır.' },

  { key: 'canva', label: 'Canva Magic Media', org: 'Canva',
    group: 'Diğer araçlar', wh: 2.00, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı; arkadaki model değişebilir',
    free: true, open: false, url: 'https://www.canva.com/',
    note: 'Okul hesaplarında yaygın. Hangi modeli çalıştırdığını göstermez.' },

  { key: 'ideogram', label: 'Ideogram', org: 'Ideogram AI',
    group: 'Diğer araçlar', wh: 2.00, steps: 35,
    basis: 'tahmin', src: 'Büyük difüzyon sınıfı',
    free: true, open: false, url: 'https://ideogram.ai/',
    note: 'Görsel içine yazı yazmada iyi. Ücretsiz kotası var.' },

  { key: 'craiyon', label: 'Craiyon', org: 'Craiyon',
    group: 'Diğer araçlar', wh: 0.60, steps: 20,
    basis: 'tahmin', src: 'Küçük model sınıfı · hızlı modeller ölçümünden ölçeklendi',
    free: true, open: false, url: 'https://www.craiyon.com/',
    note: 'Üyeliksiz ve tamamen ücretsiz. Kalite düşük ama sınıfta hiç engele takılmaz.' },

  { key: 'pollinations', label: 'Pollinations.ai', org: 'Pollinations',
    group: 'Diğer araçlar', wh: 0.90, steps: 25,
    basis: 'tahmin', src: '⚠️ Kendi modeli yok — orta hâlli açık difüzyon varsayıldı',
    free: true, open: false, url: 'https://pollinations.ai/',
    note: 'Üyeliksiz. Arkada başkasının modelleri çalışır; hangisi olduğunu göstermez.' }
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
