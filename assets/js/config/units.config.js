/* =========================================================
   ⚙️ BİRİM AYARLARI  —  BURAYI RAHATÇA DÜZENLEYEBİLİRSİN
   ---------------------------------------------------------
   Enerji her zaman içeride "Wh" (watt-saat) olarak tutulur,
   ama EKRANDA kWh göstermeyiz. Bunun yerine herkesin
   anlayacağı birimlere çeviririz:
     📱 telefon şarjı · 📺 video izleme · 💡 LED ampul · 🏞️ baraj

   Bir sayıyı değiştirmek için sadece "= ..." kısmını değiştir.
   Tırnak, virgül ve süslü parantezleri bozma.
   ========================================================= */

window.UNITS_CONFIG = {

  /* 📱 TELEFON ŞARJI — 1 tam şarj kaç Wh? (tipik telefon ~12 Wh) */
  phoneChargeWh: 12,

  /* 💡 LED AMPUL — sürekli yanan bir LED ampulün gücü (watt) */
  ledWatt: 8,

  /* 📺 VIDEO İZLEME — 1 saat video akışı (cihaz + ağ) yaklaşık kaç Wh?
     HD akış için makul bir orta değer. */
  videoWhPerHour: 100,

  /* 🏞️ TÜRKİYE BARAJLARI — kurulu güçleri (MW = megawatt).
     Büyük EĞİTİM enerjilerini "baraj X kadar süre üretti" diye anlatmak için.
     İstersen baraj ekle/çıkar; isim ve mw yeter. */
  dams: [
    { name: 'Atatürk Barajı',  mw: 2400 },
    { name: 'Karakaya Barajı', mw: 1800 },
    { name: 'Keban Barajı',    mw: 1330 },
    { name: 'Ilısu Barajı',    mw: 1200 }
  ],

  /* 💧 SU — veri merkezi soğutması: 1 kWh başına kaç litre su?
     ("How Hungry is AI?" 2025 → 3.69 L/kWh) */
  waterLitrePerKwh: 3.69,

  /* 💧 SU ŞİŞESİ — enerji için telefon şarjı ne yapıyorsa, su için bu yapar.
     Sitedeki her "bu kadar su" cümlesi TEK birimden okunur (bkz. SITE_RULES 7).
     Standart pet şişe = 500 mL. */
  waterBottleMl: 500,

  /* 🏭 KARBON — 1 Wh başına kaç gram CO₂? (temiz şebeke tahmini) */
  co2GramPerWh: 0.125
};
