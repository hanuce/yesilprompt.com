/* =========================================================
   ⚙️ MODEL EĞİTİMİ VERİLERİ — BURAYI DÜZENLEYEBİLİRSİN
   ---------------------------------------------------------
   "Veri" ve "Bir modeli eğitmek ne harcar?" bölümleri. Gerçek,
   atıflı kaynaklara dayanır; tahmin olanlar AÇIKÇA tahmin diye
   işaretlenmiştir.
   (Not: "Model nedir, nasıl eğitilir?" slaytının kod / örnek veri /
   epoch animasyonu içeriği doğrudan modeller.html içindedir.)
   ========================================================= */

/* --- 1) Modeller veriyi tam olarak NEREDEN buluyor? ---
   Kaynak: The Pile (Gao vd., 2020) — https://arxiv.org/abs/2101.00027

   NEDEN GPT-3 DEĞİL DE BU: GPT-3'ün makalesindeki karışımda "Books1"
   ve "Books2" diye iki satır vardır ve OpenAI bunların ne olduğunu
   HİÇ AÇIKLAMAMIŞTIR. Öğrenciye "kitap derlemi" diye geçiştirilen bir
   satır göstermek, "gerçek kaynağı göster" amacının tam tersidir.
   The Pile ise 825 GB'lık içeriğinin 22 parçasını da tek tek adıyla,
   oranıyla ve kaç kez okunduğuyla yayımlar — hepsi doğrulanabilir.

   Aşağıdaki oranlar ve tekrar sayıları makalenin 1. tablosundandır.
   ÖĞRETTİĞİ ŞEY: en büyük kaynak (web taraması) 1 kez okunurken,
   en küçüklerden Wikipedia 3 kez okunur → "her veri değil, SEÇİLMİŞ veri".
   'reps' = o kaynağın eğitim boyunca kaç kez okunduğu (epoch). */
window.TRAINING_DATA = {
  source: 'The Pile — 825 GB, 22 kaynak',
  cite:   'Gao vd. (2020), “The Pile: An 800GB Dataset of Diverse Text”',
  url:    'https://arxiv.org/abs/2101.00027',
  rows: [
    { name: 'Web sayfaları (Pile-CC)', size: '227 GB', share: '%18,1', reps: '1×',
      note: 'Common Crawl’ın süzülmüş hâli: internetin açık taraması.' },
    { name: 'PubMed Central',          size: '90 GB',  share: '%14,4', reps: '2×',
      note: 'Tıp ve biyoloji makalelerinin tam metinleri.' },
    { name: 'Books3 (kitaplar)',       size: '101 GB', share: '%12,1', reps: '1,5×',
      note: 'Kitap arşivi. Telif hakkı davaları sonrası veri kümesinden çıkarıldı.' },
    { name: 'OpenWebText2',            size: '63 GB',  share: '%10,0', reps: '2×',
      note: 'Reddit’te paylaşılıp beğenilen bağlantıların metinleri.' },
    { name: 'arXiv',                   size: '56 GB',  share: '%9,0',  reps: '2×',
      note: 'Fizik, matematik, bilgisayar bilimi ön baskıları.' },
    { name: 'GitHub',                  size: '95 GB',  share: '%7,6',  reps: '1×',
      note: 'Açık kaynak kod. Modellerin kod yazmayı öğrendiği yer.' },
    { name: 'FreeLaw',                 size: '51 GB',  share: '%6,1',  reps: '1,5×',
      note: 'ABD mahkeme kararları ve hukuk metinleri.' },
    { name: 'Stack Exchange',          size: '32 GB',  share: '%5,1',  reps: '2×',
      note: 'Soru-cevap siteleri; “nasıl yapılır” bilgisinin kaynağı.' },
    { name: 'Patentler (USPTO)',       size: '23 GB',  share: '%3,7',  reps: '2×',
      note: 'ABD patent başvurularının teknik açıklamaları.' },
    { name: 'PubMed özetleri',         size: '19 GB',  share: '%3,1',  reps: '2×',
      note: 'Tıp makalelerinin kısa özetleri.' },
    { name: 'Project Gutenberg',       size: '11 GB',  share: '%2,2',  reps: '2,5×',
      note: 'Telifi düşmüş klasik edebiyat; serbestçe kullanılabilir.' },
    { name: 'Wikipedia (İngilizce)',   size: '6 GB',   share: '%1,5',  reps: '3×',
      note: 'Listenin en küçüklerinden — ama EN ÇOK okunanı. Kalite böyle ödüllendirilir.' }
  ],
  /* Tabloda yer almayan, payı küçük kalan 10 kaynak */
  restNote: 'Kalan %7’lik pay 10 kaynağa dağılır: film altyazıları, matematik ' +
            'problemleri, Avrupa Parlamentosu çevirileri, Ubuntu sohbet kayıtları, ' +
            'HackerNews, YouTube altyazıları, felsefe makaleleri, ABD sağlık ' +
            'araştırma özetleri, BookCorpus2 ve Enron şirketinin mahkemeye ' +
            'sunulmuş e-postaları.'
};

/* --- 2) Veriyi kim topluyor, kim düzenliyor? ---
   Modeller "her veriyle" değil, insanların tek tek toplayıp
   düzenlediği veri kümeleriyle çalışır. Adı bilinen gerçek örnekler: */
window.DATA_PROJECTS = [
  { name: 'ImageNet', year: '2009', who: 'Stanford · Fei-Fei Li',
    what: '~14 milyon görsel, 1000 sınıf. Görseller insanlar tarafından (Amazon Mechanical Turk) ELLE etiketlendi. Görsel tanımanın temeli oldu.' },
  { name: 'LAION-5B', year: '2022', who: 'LAION (açık topluluk)',
    what: '~5,85 milyar görsel–metin çifti. Stable Diffusion gibi görsel üreten modeller bununla eğitildi.' },
  { name: 'Common Crawl', year: '2008→', who: 'Common Crawl (kâr amacı gütmeyen)',
    what: 'İnternetin petabaytlarca açık taraması. Metin modellerinin ham kaynağı; ama ham hâliyle değil, temizlenerek kullanılır.' },
  { name: 'The Pile', year: '2020', who: 'EleutherAI',
    what: '825 GB metin: makale, kod, kitap, mahkeme kararı, soru-cevap. İçindeki 22 kaynağın her birini adıyla ve oranıyla yayımladığı için eğitim verisinin en şeffaf örneği.' },
  { name: 'C4', year: '2020', who: 'Google',
    what: 'Common Crawl’ın temizlenmiş sürümü (~750 GB): tekrar eden, anlamsız ve uygunsuz içerik ayıklanmış hâli.' }
];

/* --- 3) Eğitim ENERJİSİ (tek seferlik ama dev) ---
   Bilinen modeller: GPT, Llama, Claude, Qwen, DeepSeek.
   gwh sadece gösterim; wh = gerçek hesap (gwh * 1e9).
   src 'tahmin' olanların resmî verisi YOKTUR; benzer büyüklükteki
   modellerden hesaplanmış tahmindir. */
window.TRAINING_COSTS = [
  { model: 'GPT (GPT-3, 175B)', gwh: 1.287, wh: 1.287e9, co2: '~552 t CO₂', src: 'Patterson vd., 2021',
    extra: 'Binlerce GPU, haftalarca; tek seferlik.' },
  { model: 'Llama (Meta)', gwh: 2.638, wh: 2.638e9, co2: '~1.015 t CO₂', src: 'Meta model kartları',
    extra: '~2048 A100 GPU; Llama 2-70B tek başına ~1,7 milyon GPU-saat.' },
  { model: 'Claude (Anthropic)', gwh: 8.0, wh: 8.0e9, co2: 'tahmin', src: 'Resmî veri yok · tahmin',
    extra: 'Anthropic enerji rakamı yayımlamaz; en büyük modeller sınıfı için yapılmış bir tahmindir.' },
  { model: 'Qwen (Alibaba)', gwh: 3.5, wh: 3.5e9, co2: 'tahmin', src: 'Resmî veri yok · tahmin',
    extra: 'Çok dilli, açık ağırlıklı büyük bir aile; rakam benzer modellerden tahmin edilmiştir.' },
  { model: 'DeepSeek (V3)', gwh: 2.0, wh: 2.0e9, co2: 'düşük maliyet vurgusu', src: 'DeepSeek-V3 teknik raporu, 2024',
    extra: '~2,79 milyon H800 GPU-saat; verimlilikle dikkat çekti.' }
];
