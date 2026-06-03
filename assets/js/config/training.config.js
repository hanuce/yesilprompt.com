/* =========================================================
   ⚙️ MODEL EĞİTİMİ VERİLERİ — BURAYI DÜZENLEYEBİLİRSİN
   ---------------------------------------------------------
   "Model nasıl eğitilir?" bölümü: hangi veriyle, ne kadar
   tekrarla (epoch), ne kadar enerjiyle. Hepsi GERÇEK, atıflı
   kaynaklardan; uydurma yok.
   ========================================================= */

/* --- 1) GPT-3 hangi veriyle eğitildi? (Brown vd., 2020) ---
   GPT-3 toplam ~300 milyar token üzerinde eğitildi. Aşağıdaki
   karışım ve "epoch" (her verinin kaç kez görüldüğü) gerçek
   makaleden alınmıştır. Dikkat: en büyük kaynak (Common Crawl)
   bir kezden AZ görülürken, küçük ama kaliteli Wikipedia 3+ kez
   görülmüştür → "her veri değil, DÜZENLENMİŞ/kaliteli veri". */
window.GPT3_DATA = {
  trainedTokens: '≈ 300 milyar token',
  params: '175 milyar parametre',
  rows: [
    { name: 'Common Crawl (filtreli)', tokens: '410 mlr', share: '%60', epochs: '0,44×',
      note: 'İnternetin devasa açık taraması — ama temizlenip filtrelenmiş hâli.' },
    { name: 'WebText2',                tokens: '19 mlr',  share: '%22', epochs: '2,9×',
      note: 'Kaliteli web sayfaları (Reddit’te beğenilen bağlantılar).' },
    { name: 'Books1',                  tokens: '12 mlr',  share: '%8',  epochs: '1,9×',
      note: 'Kitap derlemi.' },
    { name: 'Books2',                  tokens: '55 mlr',  share: '%8',  epochs: '0,43×',
      note: 'İkinci kitap derlemi.' },
    { name: 'Wikipedia (İng.)',        tokens: '3 mlr',   share: '%3',  epochs: '3,4×',
      note: 'Küçük ama yüksek kaliteli → bilerek daha çok tekrarlandı.' }
  ]
};

/* --- 2) Veri TİPLERİ ve düzenleme/sınıflandırma projeleri ---
   Modeller "her veriyle" değil, insanların derleyip düzenlediği
   tasniflerle çalışır. Meşhur, gerçek örnekler: */
window.DATA_PROJECTS = [
  { name: 'ImageNet', year: '2009', who: 'Stanford · Fei-Fei Li',
    what: '~14 milyon görsel, 1000 sınıf. Görseller insanlar tarafından (Amazon Mechanical Turk) ELLE etiketlendi. Görsel tanımanın temeli oldu.' },
  { name: 'LAION-5B', year: '2022', who: 'LAION (açık topluluk)',
    what: '~5,85 milyar görsel–metin çifti. Stable Diffusion gibi görsel üreten modeller bununla eğitildi.' },
  { name: 'Common Crawl', year: '2008→', who: 'Common Crawl (kâr amacı gütmeyen)',
    what: 'İnternetin petabaytlarca açık taraması. Metin modellerinin ham kaynağı; ama ham hâliyle değil, temizlenerek kullanılır.' },
  { name: 'The Pile', year: '2020', who: 'EleutherAI',
    what: '825 GB derli toplu metin (kitap, makale, kod). Açık modellerin eğitimi için titizce seçilmiş tasnif.' },
  { name: 'C4', year: '2020', who: 'Google',
    what: '“Colossal Clean Crawled Corpus”: Common Crawl’ın temizlenmiş, küfür/çöp ayıklanmış sürümü (~750 GB).' }
];

/* --- 3) Eğitim ENERJİSİ (tek seferlik ama dev) ---
   gwh sadece gösterim; wh = gerçek hesap (gwh * 1e9). */
window.TRAINING_COSTS = [
  { model: 'GPT-3 (175B)', gwh: 1.287, wh: 1.287e9, co2: '~552 t CO₂', src: 'Patterson vd., 2021',
    extra: 'Binlerce GPU, haftalarca; tek seferlik.' },
  { model: 'Llama ailesi', gwh: 2.638, wh: 2.638e9, co2: '~1.015 t CO₂', src: 'Meta model kartları',
    extra: '~2048 A100 GPU; Llama 2-70B tek başına ~1,7 milyon GPU-saat.' },
  { model: 'BLOOM (176B)', gwh: 0.433, wh: 0.433e9, co2: '~25 t CO₂', src: 'Luccioni vd., 2022',
    extra: 'Düşük-karbon şebekede eğitildiği için CO₂’si görece düşük.' }
];

/* --- 4) Eğitim mantığı: katman katman, epoch epoch (anlatım) --- */
window.TRAINING_FACTS = [
  { icon: '🧩', title: 'Model = kod + ağırlıklar',
    body: 'Model, Transformer mimarisini çalıştıran kod + eğitimle “öğrenilmiş” milyarlarca sayıdır (parametre/ağırlık). Kod aynıdır; değerli olan, eğitimle ayarlanan ağırlıklardır.' },
  { icon: '📚', title: 'Eğitim = veriyi tahmin ettire ettire ayarlamak',
    body: 'Modele milyarlarca cümle gösterilir; “bir sonraki token ne?” diye tahmin ettirilir, her hatada ağırlıklar minik adımlarla düzeltilir. Bu, katman katman (deep) yapılır.' },
  { icon: '🔁', title: 'Epoch = verinin kaç kez görüldüğü',
    body: 'Bir “epoch” tüm verinin bir kez geçmesidir. GPT-3’te kaliteli Wikipedia ~3 kez, devasa Common Crawl ise 1 kezden az görüldü. Yani çok değil, DOĞRU veriyi doğru sıklıkta görmek önemli.' }
];
