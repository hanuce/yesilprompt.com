/* =========================================================
   ⚙️ TOKEN LAB (Faz 3) — İÇERİK
   ---------------------------------------------------------
   Bu faz "nasıl çalışıyor" sorusunu YÜZEYSEL ama DOĞRU anlatır.
   Derinlik "Meraklısına" sayfasındadır — burada boğulmayacağız.

   ❌ Öğrenci cevabı toplanmaz, kaydedilmez (SITE_RULES 2c).
   ========================================================= */

/* --- 1) LLM ÇALIŞMA MANTIĞI · ana akış ---------------------
   Metin modelinin döngüsü. Kritik nokta 5→3 geri dönüşüdür:
   her kelime için model BAŞTAN çalışır. Çıktının pahalı
   olmasının sebebi tam olarak budur. */
window.AKIS_ADIMLARI = [
  { no: 1, ikon: '⌨️', ad: 'Girdi',
    m: 'Yazdığın prompt olduğu gibi alınır. Türkçeyse Türkçe kalır — <b>çeviri yapılmaz</b>.' },
  { no: 2, ikon: '✂️', ad: 'Tokenizasyon',
    m: 'Metin <b>token</b> denen parçalara bölünür ("Sürdür-üle-bilir"). Her token bir sayıya karşılık gelir.' },
  { no: 3, ikon: '🔢', ad: 'Sayıya çevir',
    m: 'Her token, anlamını taşıyan uzun bir <b>sayı listesine</b> dönüşür. Yakın anlamlılar yakın sayılar alır.' },
  { no: 4, ikon: '🕸️', ad: 'Ağırlıklardan geç',
    m: 'Milyarlarca <b>ağırlık</b> arasından geçer. Her katmanda model "hangi kelime hangisiyle ilgili" diye bakar; ' +
       '<b>zayıf bağlantıları yok sayar</b>, güçlü olanlara odaklanır.' },
  { no: 5, ikon: '🎯', ad: 'Tahmin',
    m: 'Model tek bir şey yapar: <b>sıradaki token ne olmalı?</b> Bütün kelimeler için bir olasılık listesi çıkarır ve birini seçer.' },
  { no: 6, ikon: '🔁', ad: 'Ve baştan…',
    m: 'Seçilen token <b>girdinin sonuna eklenir</b> ve 3. adıma dönülür. Cevaptaki her kelime için bu döngü yeniden çalışır.' },
  { no: 7, ikon: '📤', ad: 'Çıktı',
    m: 'Döngü bitince token’lar tekrar harflere çevrilir (<b>detokenizasyon</b>) ve cevabı ekranda görürsün.' }
];

window.AKIS_VURGU =
  'Dikkat et: <b>4–6 arası döngü, cevaptaki HER kelime için yeniden çalışır.</b> ' +
  '500 kelimelik bir cevap, modelin 500 kez baştan sona çalışması demektir. ' +
  'Promptun ise yalnızca <b>bir kez</b> okunur — girdinin ucuz, çıktının pahalı olmasının sebebi budur.';

/* --- Üç üretim türünün arka plan akışı --------------------- */
window.AKIS_TURLERI = [
  { ikon: '💬', ad: 'Metin', renk: 'text',
    akis: ['prompt', 'token’lara böl', 'ağırlıklardan geç', '1 token tahmin et', '↺ tekrar', 'metne çevir'],
    yuk: 'Her token için <b>1 hafif geçiş</b>. Dizi tek boyutlu.',
    maliyet: '≈ 0,30 Wh' },
  { ikon: '🖼️', ad: 'Görsel', renk: 'image',
    akis: ['prompt', 'metni anlama', 'saf gürültüyle başla', 'gürültüyü azalt', '↺ ~30 adım', 'resme çevir'],
    yuk: 'Her adım <b>tam bir geçiş</b> ve görüntü <b>iki boyutlu</b> bir ızgara. Prompt uzunluğu neredeyse hiç etkilemez.',
    maliyet: '≈ 1,50 Wh' },
  { ikon: '🎬', ad: 'Video', renk: 'video',
    akis: ['prompt', 'metni anlama', 'gürültülü kareler', 'kareleri birlikte arıt', '↺ adım × kare', 'videoya çevir'],
    yuk: 'Görselin üstüne bir de <b>zaman</b> boyutu: kareler birbirini tutmak zorunda, hepsi birlikte üretilir.',
    maliyet: '≈ 944 Wh (5 sn)' }
];

/* --- 2) SENİN ELİNDE OLAN / OLMAYAN ------------------------
   Fazın ahlaki çekirdeği: suçlamak değil, kaldıracı göstermek. */
window.ELINDE = [
  { ikon: '🔢', b: 'Ne sıklıkla kullandığın',
    m: 'En basit ve en güçlüsü. Her sorgu küçük, ama günde milyarlarca kez tekrarlanıyor.' },
  { ikon: '✍️', b: 'Nasıl istediğin',
    m: 'Net prompt = tek seferde hedef = az deneme. Belirsiz prompt her seferinde tam bedel ödetir.' },
  { ikon: '🧩', b: 'Neyi seçtiğin',
    m: 'Görsel şart değilse metinle yetin. Metin ucuz, görsel ~5 kat, video ~3.000 kat.' },
  { ikon: '🧠', b: 'Ne kadar düşündürdüğün',
    m: 'Basit soruda derin düşünmeyi açık bırakmak, enerjiyi ölçülen ortalamayla <b>30 kat</b> artırıyor.' },
  { ikon: '🧵', b: 'Sohbeti ne kadar şişirdiğin',
    m: 'Uzun sohbette her turda tüm geçmiş yeniden okunur. Yeni konuya yeni sohbet aç.' },
  { ikon: '💾', b: 'İyi promptu sakladığın',
    m: 'Çalışan bir promptu kaydet; her seferinde sıfırdan deneme yapma.' }
];

window.ELINDE_DEGIL = [
  { ikon: '🌍', b: 'Modelin hangi ülkede çalıştığı' },
  { ikon: '🏭', b: 'Veri merkezini besleyen santral' },
  { ikon: '💧', b: 'Soğutmanın su verimliliği' },
  { ikon: '🏗️', b: 'Modelin nasıl eğitildiği' },
  { ikon: '🔌', b: 'Şebekenin karbon yoğunluğu' },
  { ikon: '🖥️', b: 'Hangi ekran kartında çalıştığı' }
];

window.ELINDE_DERS =
  'Sol taraftaki hiçbir şeye karar veremezsin — ülkeyi de santrali de sen seçmiyorsun. ' +
  'Ama sağ taraftaki <b>altı şeyin hepsi senin elinde</b> ve hepsi çarpan etkisi yapıyor. ' +
  '<b>Bu atölyenin tamamı bu altı satırdan ibaret.</b>';

/* --- 3) TOKEN AVI · üç tür için üç kutu -------------------- */
window.AVCI_KUTULARI = [
  { tur: 'metin', ikon: '💬', ad: 'Metin',
    baslik: 'Bir şey sor ya da yazdır',
    ornek: 'Yapay zekânın su tüketimini 9. sınıf öğrencisine 3 maddede anlat.',
    not: 'Metinde hem promptun hem cevabın uzunluğu maliyeti belirler.' },
  { tur: 'gorsel', ikon: '🖼️', ad: 'Görsel',
    baslik: 'Bir görsel tarif et',
    ornek: '2050, yenilenebilir enerjiyle çalışan İstanbul; güneş panelli çatılar, izometrik illüstrasyon.',
    not: 'Görselde prompt uzunluğunun etkisi neredeyse yok — bedel difüzyon adımlarında.' },
  { tur: 'video', ikon: '🎬', ad: 'Video',
    baslik: 'Bir video tarif et',
    ornek: 'Rüzgâr türbinlerinin arasından geçen drone çekimi, gün batımı, 5 saniye.',
    not: 'Videoda saniye başına maliyet ödenir; prompt yine neredeyse etkisiz.' }
];

/* --- 4) ÖNCE / SONRA · üç bozuk prompt --------------------- */
window.ONCE_SONRA = [
  { tur: 'metin', ikon: '💬', ad: 'Metin',
    kotu: 'Bana yapay zeka ve çevre hakkında bilebildiğin her şeyi uzun uzun, detaylıca ve kapsamlı bir şekilde anlatır mısın acaba?',
    ipucu: 'Kime, kaç maddede, ne uzunlukta? Cevabın sınırını sen çiz.' },
  { tur: 'gorsel', ikon: '🖼️', ad: 'Görsel',
    kotu: 'Güzel bir gelecek şehri çiz.',
    ipucu: 'Konu + zaman + ışık + stil + kompozisyon — hepsini tek seferde ver ki tekrar üretmek zorunda kalma.' },
  { tur: 'video', ikon: '🎬', ad: 'Video',
    kotu: 'Doğayla ilgili güzel bir video yap.',
    ipucu: 'Ne, nereden, ne kadar süre? Videoda her saniye ayrı bedel — süreyi de sen söyle.' }
];
