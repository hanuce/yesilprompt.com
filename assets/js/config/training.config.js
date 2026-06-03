/* =========================================================
   ⚙️ MODEL EĞİTİMİ VERİLERİ — BURAYI DÜZENLEYEBİLİRSİN
   ---------------------------------------------------------
   "Veri" ve "Bir modeli eğitmek ne harcar?" bölümleri. Gerçek,
   atıflı kaynaklara dayanır; tahmin olanlar AÇIKÇA tahmin diye
   işaretlenmiştir.
   (Not: "Model nedir, nasıl eğitilir?" slaytının kod / örnek veri /
   epoch animasyonu içeriği doğrudan modeller.html içindedir.)
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
   Bilinen modeller: GPT, Llama, Claude, Qwen, DeepSeek.
   gwh sadece gösterim; wh = gerçek hesap (gwh * 1e9).
   src 'tahmin' olanlar resmî veri YOK; sınıf-içi büyüklük tahminidir. */
window.TRAINING_COSTS = [
  { model: 'GPT (GPT-3, 175B)', gwh: 1.287, wh: 1.287e9, co2: '~552 t CO₂', src: 'Patterson vd., 2021',
    extra: 'Binlerce GPU, haftalarca; tek seferlik.' },
  { model: 'Llama (Meta)', gwh: 2.638, wh: 2.638e9, co2: '~1.015 t CO₂', src: 'Meta model kartları',
    extra: '~2048 A100 GPU; Llama 2-70B tek başına ~1,7 milyon GPU-saat.' },
  { model: 'Claude (Anthropic)', gwh: 8.0, wh: 8.0e9, co2: 'tahmin', src: 'Resmî veri yok · tahmin',
    extra: 'Anthropic enerji rakamı yayımlamaz; frontier ölçek için büyüklük tahminidir.' },
  { model: 'Qwen (Alibaba)', gwh: 3.5, wh: 3.5e9, co2: 'tahmin', src: 'Resmî veri yok · tahmin',
    extra: 'Çok dilli, açık ağırlıklı büyük aile; rakam sınıf-içi tahmindir.' },
  { model: 'DeepSeek (V3)', gwh: 2.0, wh: 2.0e9, co2: 'düşük maliyet vurgusu', src: 'DeepSeek-V3 teknik raporu, 2024',
    extra: '~2,79 milyon H800 GPU-saat; verimlilikle dikkat çekti.' }
];
