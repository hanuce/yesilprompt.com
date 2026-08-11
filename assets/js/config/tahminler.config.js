/* =========================================================
   ⚙️ TAHMİN KARTLARI — BURAYI DÜZENLEYEBİLİRSİN
   ---------------------------------------------------------
   Öğrenci önce bir sayı yazar, sonra "Cevabı Gör" der.
   Kilit yoktur, veri tutulmaz.

   Bileşen: core/tahmin.js   ·   Görünüm: style.css → 19.3
   HTML'de kullanımı:  <div class="tahmin" data-tahmin="cikolata"></div>

   Bir kartın alanları:
     soru        → ekranda görünen soru
     birim       → giriş kutusunun yanındaki birim
     varsayilan  → kutuda hazır duran sayı
     gercek[]    → "Cevabı Gör" ile açılan satırlar (etiket · değer · not)
     hesap       → SAYININ NASIL ÇIKTIĞI (düz metin, kod kutusunda basılır)
     kaynak      → APA kısaltması

   ⚠️ hesap alanı zorunlu sayılır: bir sayıyı göstermek yetmez,
   NEREDEN geldiğini de göstermek gerekir (SITE_RULES 1.4).
   Ara adımlar uydurulmaz — yalnızca kaynağı olan değerler ve
   onlardan yapılan açık aritmetik yazılır.
   ========================================================= */

window.TAHMINLER = {

  /* --- GİRİŞ · Fiziksel dünya çıpası --- */
  cikolata: {
    soru: '1 kg çikolata üretmek için harcanan enerjiyle telefonunu kaç kez şarj edebilirsin?',
    birim: 'telefon şarjı',
    varsayilan: 50,
    gercek: [
      { etiket: '⚡ Enerji', deger: '≈ 440 şarj',      not: '5.300 Wh' },
      { etiket: '🏭 Karbon', deger: '≈ 3.450 şarj',    not: '19.000 g CO₂ — en büyük pay ormansızlaşma ve süt tozu' },
      { etiket: '💧 Su',     deger: '≈ 34.000 şişe',   not: '17.000 litre' }
    ],
    hesap:
'⚡ ENERJİ\n' +
'  1 kg çikolata (tarla → fabrika → raf)   ≈  5.300 Wh\n' +
'  bir telefonun tam şarjı                 =     12 Wh\n' +
'  5.300 ÷ 12                              ≈    442 şarj\n' +
'\n' +
'🏭 KARBON\n' +
'  1 kg çikolata                           ≈ 19.000 g CO₂\n' +
'  bir telefon şarjı                       ≈    5,5 g CO₂\n' +
'  19.000 ÷ 5,5                            ≈  3.455 şarj kadar karbon\n' +
'\n' +
'💧 SU  (kakao ağacından geriye doğru)\n' +
'  kakao ağacı yılda ~1.500 mm yağmur ister\n' +
'  hektarda ~1.100 ağaç  →  ağaç başına ~9 m²\n' +
'  1.500 mm × 9 m²                         = 13.500 L/yıl\n' +
'    yani haftada ~260 L × 52 hafta\n' +
'  bir ağaç yılda ~1 kg çekirdek verir\n' +
'  ilk ~5 yıl hiç ürün vermez → o suyun hesabı da bu kiloya yazılır\n' +
'  üstüne süt ve şekerin suyu eklenir\n' +
'  ────────────────────────────────────────────────────\n' +
'  1 kg çikolata                           ≈ 17.000 L\n' +
'  17.000 ÷ 0,5 L (bir şişe)               = 34.000 şişe',
    kaynak: 'Poore & Nemecek (2018) / Our World in Data · Mekonnen & Hoekstra — kakao su ayak izi · FAO kakao yetiştirme kılavuzu'
  },

  /* --- GİRİŞ · Dijital dünya çıpası ---
     5 sn video, ölçümü YAPILMIŞ tek video değeridir (CogVideoX).
     Ticari video modelleri (Sora, Veo, Kling) hiçbir sayı yayımlamaz. */
  buzdolabi: {
    soru: 'Yapay zekâyla üretilen 5 saniyelik bir video, A++ bir buzdolabının kaç günlük enerjisini yer?',
    birim: 'gün',
    varsayilan: 1,
    gercek: [
      { etiket: '🎬 5 sn video',      deger: '944 Wh',      not: 'ölçülen: 3,4 milyon joule' },
      { etiket: '🧊 A++ buzdolabı',   deger: '493 Wh/gün',  not: 'yılda ~180 kWh' },
      { etiket: '📐 Sonuç',           deger: '≈ 1,9 gün',   not: 'yani neredeyse iki gün boyunca buzdolabın' },
      { etiket: '📱 Aynı enerji',     deger: '≈ 79 şarj',   not: '💧 3,5 litre su · 🏭 118 g CO₂' }
    ],
    hesap:
'🎬 5 SANİYELİK VİDEO  (CogVideoX, 16 kare/sn — ölçüm)\n' +
'  ölçülen enerji                          = 3.400.000 joule\n' +
'  1 kWh                                   = 3.600.000 joule\n' +
'  3.400.000 ÷ 3.600.000                   =    0,94 kWh = 944 Wh\n' +
'\n' +
'🧊 A++ BUZDOLABI\n' +
'  yıllık tüketim (enerji etiketi)         ≈    180 kWh\n' +
'  180.000 Wh ÷ 365 gün                    ≈    493 Wh/gün\n' +
'\n' +
'📐 SONUÇ\n' +
'  944 Wh ÷ 493 Wh/gün                     ≈    1,9 gün\n' +
'\n' +
'  944 ÷ 12 Wh                             ≈     79 telefon şarjı\n' +
'  944 ÷ 1000 × 3,69 L                     ≈    3,5 litre su\n' +
'  944 × 0,125 g                           ≈    118 g CO₂\n' +
'\n' +
'⚠️ Ölçüm açık bir araştırma modelinde yapıldı. Sora, Veo, Kling gibi\n' +
'   ticari video araçları hiçbir enerji verisi yayımlamıyor.',
    kaynak: 'MIT Technology Review (2025) — Hugging Face + ML.Energy ölçümü · AB enerji etiketi (A++ buzdolabı)'
  },

  /* --- FAZ 3 · Düşünme bütçesi --- */
  dusunme: {
    soru: 'Bir modelde “düşünmeyi” açmak, aynı soruda enerjiyi kaç kat artırır?',
    birim: 'kat',
    varsayilan: 2,
    gercek: [
      { etiket: '🌙 Düşünme kapalı', deger: '0,05 Wh', not: '1.000 sorguda 49,5 Wh' },
      { etiket: '🧠 Düşünme açık',   deger: '7,63 Wh', not: 'aynı model, aynı soru · 1.000 sorguda 7.627 Wh' },
      { etiket: '📐 Aradaki fark',   deger: '≈ 154 kat', not: 'ölçülen 166 modelde ortalama 30 kat' }
    ],
    hesap:
'Aynı model, aynı soru — tek fark düşünmenin açık olması:\n' +
'  düşünme kapalı   1.000 sorgu  =    49,5 Wh  →  0,05 Wh/sorgu\n' +
'  düşünme açık     1.000 sorgu  = 7.627,0 Wh  →  7,63 Wh/sorgu\n' +
'  7,63 ÷ 0,05                                 ≈  154 kat\n' +
'\n' +
'Neden bu kadar? Düşünen model, cevabı yazmadan önce\n' +
'300–800 kat daha fazla GİZLİ token üretiyor.',
    kaynak: 'Hugging Face — AI Energy Score v2 (2025), CodeCarbon ile ölçüm'
  },

  /* --- FAZ 3 · Metin < Görsel < Video --- */
  gorselMetin: {
    soru: '1 görsel üretmek, 1 metin cevabından kaç kat pahalı?',
    birim: 'kat',
    varsayilan: 2,
    gercek: [
      { etiket: '💬 1 metin cevabı',  deger: '≈ 0,30 Wh', not: 'token başına 1 hafif geçiş' },
      { etiket: '🖼️ 1 görsel',        deger: '≈ 1,50 Wh', not: '~30 ağır geçiş — her difüzyon adımı bir tam geçiş' },
      { etiket: '🎬 5 sn video',      deger: '≈ 944 Wh',  not: 'her kare bir görsel gibi · ~3.000 kat' }
    ],
    hesap:
'💬 METİN      1 boyutlu dizi, token başına 1 hafif geçiş  ≈   0,30 Wh\n' +
'🖼️ GÖRSEL     2 boyutlu ızgara × ~30 difüzyon adımı       ≈   1,50 Wh   (5 kat)\n' +
'🎬 VİDEO      görsel × kare sayısı × saniye               ≈ 944,00 Wh   (~3.000 kat)\n' +
'\n' +
'Her difüzyon adımı, büyük modelden TAM bir geçiştir.\n' +
'Video buna bir de ZAMAN boyutu ekler: 5 sn × 16 kare = 80 kare.',
    kaynak: 'Luccioni vd. (2024) — Hugging Face / CMU · MIT Technology Review (2025)'
  }
};
