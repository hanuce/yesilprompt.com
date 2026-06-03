/* =========================================================
   PROMPT MÜHENDİSLİĞİ sayfası
   İçerik tamamen bu dosyadaki dizilerden gelir — kod bilmeden
   metinleri değiştirebilirsin.
   ========================================================= */
(function () {
  const $ = (id) => document.getElementById(id);

  /* --- Shot tipleri (örnekle öğretme · resim çizdirme üzerinden) ---
     Bu atölyede resim çizdireceğimiz için örnekler görsel promptu odaklı. */
  const SHOTS = [
    { tag: 'Zero-shot', title: 'Örneksiz', emoji: '0️⃣',
      body: 'Hiç örnek/stil vermeden doğrudan ne çizilmesini istediğini yazarsın. Model stili kendi seçer.',
      ex: 'Bir bardak suyun içinde yüzen küçük bir yeşil yaprak çiz.' },
    { tag: 'One-shot', title: 'Tek örnek', emoji: '1️⃣',
      body: 'Tek bir stil örneği vererek istediğin görünümü gösterir, sonra yeni nesneyi istersin.',
      ex: 'Örnek stil: “düz vektör, pastel renkler, kalın dış çizgi.”\nAynı stilde: bir bisiklet çiz.' },
    { tag: 'Few-shot', title: 'Birkaç örnek', emoji: '🔢',
      body: 'Birkaç örnekle stili netçe öğretirsin; üretilen görsellerde tutarlılık artar.',
      ex: 'elma → düz vektör, pastel, kalın çizgi\nev → düz vektör, pastel, kalın çizgi\nkedi → düz vektör, pastel, kalın çizgi\nağaç →' }
  ];

  /* --- İyi promptun parçaları --- */
  const TECHNIQUES = [
    { icon: '🎭', t: 'Rol ver', d: '“Sen bir 9. sınıf biyoloji öğretmenisin.” Modelin tonunu ve uzmanlığını ayarlar.' },
    { icon: '🎯', t: 'Görevi net yaz', d: 'Ne istediğini açıkça söyle: “özetle”, “karşılaştır”, “üç fikir üret”.' },
    { icon: '🧩', t: 'Bağlam ekle', d: 'Hedef kitle, amaç, kısıtlar: “lise öğrencisine”, “sınav için”.' },
    { icon: '📐', t: 'Format belirt', d: '“Madde madde”, “tablo”, “tek cümle”, “JSON”. İstediğin biçimi söyle.' },
    { icon: '🖼️', t: 'Örnek ver', d: 'İstediğin çıktının bir örneğini koy (few-shot). Belirsizliği azaltır.' },
    { icon: '🚧', t: 'Kısıt koy', d: 'Uzunluk, dil, ton: “en fazla 100 kelime”, “resmî dil”, “Türkçe”.' },
    { icon: '🪜', t: 'Adım adım iste', d: 'Zor problemde “adım adım düşün” (chain-of-thought) doğruluğu artırır.' },
    { icon: '🔁', t: 'İyileştir', d: 'Çıktı eksikse promptu düzelt; baştan tam tarif, sonra tek üretim.' }
  ];

  /* --- Önce / sonra örnekleri --- */
  const BEFORE_AFTER = [
    { kind: '💬 Metin',
      bad: 'Bana yapay zeka ve çevre hakkında bir şeyler yaz.',
      good: 'Yapay zekânın su tüketimini 9. sınıf öğrencisine 3 maddede, her madde tek cümle anlat.' },
    { kind: '🖼️ Görsel',
      bad: 'Güzel bir gelecek şehri.',
      good: '2050, yenilenebilir enerjiyle çalışan İstanbul; gündüz, güneş panelli çatılar, yeşil teraslar, izometrik illüstrasyon.' }
  ];

  /* --- Yeşil prompt kuralları (Token Lab'dan taşındı) --- */
  const RULES = [
    'Net ol, ilk seferde doğru iste',
    'Kısa çıktı iste',
    'Görsel şart değilse metinle yetin',
    'Basit işte efforu kıs',
    'Bağlamı şişirme',
    'Baştan tam tarif et, iteratif düzeltme yapma',
    'Önce metinde prova, sonra tek görsel',
    'İyi prompt’u sakla, yeniden kullan'
  ];

  function renderShots() {
    const host = $('shots'); if (!host) return;
    host.innerHTML = SHOTS.map(s =>
      '<div class="card card-top">' +
        '<div class="big-emoji">' + s.emoji + '</div>' +
        '<div class="chip mb">' + s.tag + '</div>' +
        '<h3 class="m-0">' + s.title + '</h3>' +
        '<p class="text-soft">' + s.body + '</p>' +
        '<div class="prompt-box prompt-good">' + s.ex + '</div>' +
      '</div>'
    ).join('');
  }

  function renderTechniques() {
    const host = $('techniques'); if (!host) return;
    host.innerHTML = TECHNIQUES.map(t =>
      '<div class="card">' +
        '<div class="big-emoji">' + t.icon + '</div>' +
        '<h3 class="m-0">' + t.t + '</h3>' +
        '<p class="text-soft m-0">' + t.d + '</p>' +
      '</div>'
    ).join('');
  }

  function renderBeforeAfter() {
    const host = $('beforeAfter'); if (!host) return;
    host.innerHTML = BEFORE_AFTER.map(b =>
      '<div class="card">' +
        '<div class="chip mb">' + b.kind + '</div>' +
        '<div class="label">❌ Kötü</div>' +
        '<div class="prompt-box prompt-bad mb">' + b.bad + '</div>' +
        '<div class="label">✅ İyi</div>' +
        '<div class="prompt-box prompt-good">' + b.good + '</div>' +
      '</div>'
    ).join('');
  }

  function renderRules() {
    const host = $('rules'); if (!host) return;
    host.innerHTML = RULES.map((r, i) =>
      '<div class="card rule-card">' +
        '<span class="rule-num">' + (i + 1) + '</span>' +
        '<span class="text-soft rule-txt">' + r + '</span>' +
      '</div>'
    ).join('');
  }

  function init() { renderShots(); renderTechniques(); renderBeforeAfter(); renderRules(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
