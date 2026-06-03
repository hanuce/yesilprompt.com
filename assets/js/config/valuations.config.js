/* =========================================================
   ⚙️ YAPAY ZEKA RALLİSİ — ŞİRKET DEĞERLERİ (BURAYI DÜZENLE)
   ---------------------------------------------------------
   "Yapay Zeka Rallisi" slaytındaki barlar ve zaman çizelgesi.
   Değerler TRİLYON dolar (T$) cinsindendir. Veriler kamuya açık
   kaynaklardan (CompaniesMarketCap, Axios/CNBC, Crunchbase)
   alınmış GÜNCEL tahminlerdir; piyasa her gün değişir.

   asOf  = bu sayıların hangi tarihe ait olduğu
   valT  = trilyon dolar olarak değer
   kind  = 'tech' (borsada işlem gören dev) | 'ai' (YZ girişimi)
   ========================================================= */
window.RALLY = {
  asOf: 'Haziran 2026',

  /* Dünyanın en değerli halka açık şirketleri (karşılaştırma için) */
  companies: [
    { name: 'NVIDIA',        tag: 'çip / GPU',        valT: 5.23, kind: 'tech' },
    { name: 'Alphabet',      tag: 'Google · arama/YZ',valT: 4.63, kind: 'tech' },
    { name: 'Apple',         tag: 'donanım',          valT: 4.53, kind: 'tech' },
    { name: 'Microsoft',     tag: 'yazılım/YZ',       valT: 3.11, kind: 'tech' },
    { name: 'Amazon',        tag: 'bulut/ticaret',    valT: 2.87, kind: 'tech' },
    { name: 'Saudi Aramco',  tag: 'petrol',           valT: 1.60, kind: 'tech' }
  ],

  /* YZ girişimleri (çoğu borsada değil; özel turlardaki değerleme) */
  ai: [
    { name: 'xAI + SpaceX',  tag: 'özel (birleşik)',  valT: 1.25, kind: 'ai' },
    { name: 'Anthropic',     tag: 'özel · Seri H',    valT: 0.965, kind: 'ai' },
    { name: 'OpenAI',        tag: 'özel · IPO yolda', valT: 0.852, kind: 'ai' }
  ],

  /* Kaç yılda nereden nereye? (zaman çizelgesi) */
  milestones: [
    { year: '2021',     text: 'OpenAI ~14 milyar $ değerleniyordu — bugünün ~60’ta biri.' },
    { year: '2023',     text: 'NVIDIA, YZ patlamasıyla ilk kez 1 trilyon doları aştı.' },
    { year: 'Tem 2025', text: 'NVIDIA, 4 trilyon dolara ulaşan ilk şirket oldu.' },
    { year: 'Eki 2025', text: 'NVIDIA, 5 trilyon dolara ulaşan ilk şirket oldu.' },
    { year: 'Mar 2026', text: 'OpenAI 120 milyar $ tur ile 852 milyar $ değerlendi; IPO başvurusu yaptı.' },
    { year: 'May 2026', text: 'Anthropic 965 milyar $ ile en değerli YZ girişimi oldu (Seri H).' },
    { year: '2026 →',   text: 'Tahmin: çip talebi ve YZ yatırımı sürerse trilyon-dolar kulübü genişler. (Tahmindir, kesin değil.)' }
  ]
};
