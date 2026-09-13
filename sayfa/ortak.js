/* =================================================================
   ORTAK.JS — sitenin tek paylaşılan dosyası
   =================================================================
   DOSYA YERLEŞİMİ
     /index.html          → sitenin kapısı (kökte durur)
     /style.css           → tüm görünüm
     /veri/  /resim/      → CSV'ler ve galeri görselleri
     /sayfa/              → diğer bütün sayfalar ve onların .js dosyaları

   Her sayfa iki script yükler:  ortak.js  +  kendi adındaki .js

   Bu dosyada İÇERİK YOKTUR (bir istisna: aşağıdaki 1. bölümdeki
   menü ve künye — onlar 9 sayfada birden göründüğü için tek yerde
   durmak zorunda; 9 dosyaya kopyalanırsa menü değiştirmek 9 dosya
   düzenlemek demek olurdu).

   Sayfaya ait metin, sayı ve liste ne varsa o sayfanın .html
   dosyasının içindedir. Buradaki her şey MEKANİKTİR.

   İÇİNDEKİLER
     1) SİTE BİLGİLERİ  ← menü ve künye (tek düzenleme noktası)
     2) KATSAYILAR      ← Wh → şarj / su / karbon çevrim sayıları
     3) KÜÇÜK YARDIMCILAR
     4) BİRİM ÇEVİRİCİ
     5) ÜST MENÜ + EĞİTMEN ŞERİDİ
     6) FOOTER
     7) SLAYT MOTORU
     8) ÇİZGİ GRAFİĞİ (paylaşılan SVG çizici)
     9) TOKEN SAYACI
    10) AÇ / KAPA DÜĞMELERİ
   ================================================================= */
(function () {
'use strict';


/* ===== 1) SİTE BİLGİLERİ ==========================================
   Menü satırını değiştirmek, künyeyi güncellemek istiyorsan
   sadece burayı düzenle. Başka hiçbir yere dokunma. */

var MENU = [
  { ad: 'Giriş',        href: 'atolye.html' },
  { ad: 'Veri',         href: 'veri-labi.html' },
  { ad: 'Token Lab',    href: 'token-lab.html' },
  { ad: 'Yeşil Prompt', href: 'prompt-muhendisligi.html' },
  { ad: 'Ölç',          href: 'hesaplayici.html' }
];

/* Menünün sağındaki küçük, gri bağlantılar */
var MENU_EK = [
  { ad: 'Meraklısına', href: 'modeller.html' },
  { ad: 'Kaynaklar',   href: 'kaynaklar.html' },
  { ad: 'Sergi',       href: 'sergi.html' }
];

/* Footer künyesi — boş bıraktığın satır hiç basılmaz */
var KUNYE = [
  ['Proje',    'Yeni Bir Gelecek Fikri: Alternatif Enerji-2'],
  ['Proje No', '325B003'],
  ['Atölye',   'Sürdürülebilir Yeşil Prompt Atölyesi'],
  ['Tarih',    'Eylül 2026'],
  ['Yer',      'Üsküdar Ahmet Yüksel Özemre Bilim ve Sanat Merkezi']
];

var FOOTER = {
  hakkinda: 'Sürdürülebilir Yeşil Prompt Atölyesi; veri okuryazarlığı, yapay zekâ ' +
            'okuryazarlığı ve sürdürülebilir sanat temalarını birleştirir. Amacı, bir ' +
            'sorgunun ya da bir görselin görünmeyen enerji ve su maliyetini gündelik ' +
            'birimlerle anlaşılır kılmaktır.',
  uyari:    'Sayılar eğitim amaçlı tahminlerdir; model, donanım, veri merkezi ve enerji ' +
            'kaynağına göre değişir. Kaynakça her sayfada APA biçiminde verilir.',
  sahip:    'Yeşil Prompt Atölyesi',
  yil:      2026
};


/* ===== 2) KATSAYILAR ==============================================
   Enerji her yerde Wh (watt-saat) tutulur, ekranda hep gündelik
   birime çevrilir. Bir sayıyı değiştirmek istersen sadece burayı
   değiştir — site baştan sona o sayıyı kullanır. */

var K = {
  telefonSarjiWh:  12,     /* 📱 bir tam telefon şarjı kaç Wh */
  ledWatt:          8,     /* 💡 sürekli yanan bir LED ampulün gücü */
  videoWhSaat:    100,     /* 📺 bir saat HD video (cihaz + ağ) */
  suLitreKwh:    3.69,     /* 💧 veri merkezi soğutması, kWh başına litre
                              ("How hungry is AI?", 2025) */
  suSiseMl:       500,     /* 💧 standart pet şişe — suyun TEK birimi */
  co2GramWh:    0.125,     /* 🏭 Wh başına gram CO₂ (temiz şebeke tahmini) */

  /* 🏞️ Baraj kurulu güçleri (MW). Yalnızca dev EĞİTİM enerjilerini
     anlatmak için; telefon şarjıyla anlamsızlaşan büyüklükler. */
  barajlar: [
    { ad: 'Atatürk Barajı',  mw: 2400 },
    { ad: 'Karakaya Barajı', mw: 1800 },
    { ad: 'Keban Barajı',    mw: 1330 },
    { ad: 'Ilısu Barajı',    mw: 1200 }
  ]
};


/* ===== 3) KÜÇÜK YARDIMCILAR ======================================= */

function $(sec, kok) { return (kok || document).querySelector(sec); }
function $$(sec, kok) { return Array.prototype.slice.call((kok || document).querySelectorAll(sec)); }

/* HTML'e gömülecek metni zararsız hâle getirir */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

/* Sayıyı Türkçe biçimde yaz: 1234.5 → "1.234,5" */
function sayi(n, basamak) {
  basamak = (basamak == null) ? 2 : basamak;
  if (!isFinite(n)) return '—';
  if (n === 0) return '0';
  if (Math.abs(n) < 0.01) return n.toExponential(1).replace('.', ',');
  if (Math.abs(n) >= 1000) return Math.round(n).toLocaleString('tr-TR');
  return n.toLocaleString('tr-TR', { maximumFractionDigits: basamak });
}

/* '2026-03-14' → '14.03.2026'. Başka biçimde yazılmışsa dokunmaz. */
function tarih(v) {
  var s = String(v == null ? '' : v).trim();
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? m[3] + '.' + m[2] + '.' + m[1] : s;
}

/* HTML içine gömülü <script type="application/json"> bloğunu okur.
   Sayfaya ait liste/tablo verisi böyle tutulur — içerik HTML'de kalsın. */
function veri(id) {
  var el = document.getElementById(id);
  if (!el) return null;
  try { return JSON.parse(el.textContent); }
  catch (e) { console.error('Bozuk JSON: #' + id, e); return null; }
}

/* data-* değerini sayıya çevirir */
function nitelik(el, ad, varsayilan) {
  if (!el) return varsayilan;
  var v = parseFloat(el.getAttribute('data-' + ad));
  return isFinite(v) ? v : varsayilan;
}


/* ===== 4) BİRİM ÇEVİRİCİ ==========================================
   Wh → telefon şarjı, su, karbon, LED, video, baraj.

   ⚠️ Eşdeğer HER ZAMAN telefon şarjıdır, su HER ZAMAN 500 mL şişedir.
   Değere göre birim seçen bir yardımcı YOKTUR: kaydırıcı oynayınca
   birim de değişirse yan yana duran iki sonuç kıyaslanamaz. */

function cevrim(wh) {
  return {
    wh:       wh,
    telefon:  wh / K.telefonSarjiWh,
    ledDk:    (wh / K.ledWatt) * 60,
    videoDk:  (wh / K.videoWhSaat) * 60,
    suMl:     (wh / 1000) * K.suLitreKwh * 1000,
    co2g:     wh * K.co2GramWh
  };
}

/* "1,4 telefon şarjı" · "telefon şarjının %4 kadarı" */
function telefon(wh) {
  var p = wh / K.telefonSarjiWh;
  if (p >= 1) return sayi(p, 1) + ' telefon şarjı';
  var yuzde = p * 100;
  if (yuzde < 0.1) return 'telefon şarjının %0,1 kadarından az';
  return 'telefon şarjının %' + sayi(yuzde, yuzde < 1 ? 2 : 0) + ' kadarı';
}

/* "2,5 şişe su (0,5 L)" · "bir şişe suyun %12 kadarı" */
function su(ml) {
  var b = ml / K.suSiseMl;
  if (b >= 1)    return sayi(b, 1) + ' şişe su (0,5 L)';
  if (b >= 0.5)  return 'yarım şişe sudan biraz fazla';
  if (b >= 0.24) return 'bir şişenin dörtte biri kadar su';
  var yuzde = b * 100;
  if (yuzde < 0.1) return 'bir şişenin binde biri kadarından az su';
  return 'bir şişe suyun %' + sayi(yuzde, yuzde < 1 ? 2 : 0) + ' kadarı';
}

/* 90 dk → "1,5 saat" */
function sure(dk) {
  if (dk < 1)    return sayi(dk * 60, 0) + ' sn';
  if (dk < 90)   return sayi(dk, 1) + ' dk';
  if (dk < 1440) return sayi(dk / 60, 1) + ' saat';
  return sayi(dk / 1440, 1) + ' gün';
}

/* Dev enerjiler için: "Atatürk Barajı'nın 3,2 günlük üretimi" */
function baraj(wh) {
  var b = K.barajlar[0];
  if (!b) return '';
  var saat = wh / (b.mw * 1e6);
  if (saat >= 24) return b.ad + '’nın ' + sayi(saat / 24, 1) + ' günlük üretimi';
  if (saat >= 1)  return b.ad + '’nın ' + sayi(saat, 1) + ' saatlik üretimi';
  return b.ad + '’nın ' + sayi(saat * 60, 0) + ' dakikalık üretimi';
}


/* ===== 5) ÜST MENÜ + EĞİTMEN ŞERİDİ ===============================
   HTML'de yalnızca şu durur:  <nav class="nav"><div class="wrap"></div></nav>

   ❌ Menüde NUMARA DAMGASI yoktur — sırayı dizilişin kendisi söyler.
   ❌ Öğrenci ekranında SÜRE YAZMAZ.

   EĞİTMEN MODU: adrese ?egitmen=1 eklenince altta ince bir şerit
   açılır (süre, geri sayım, ne söylenecek, tartışma soruları).
   Şeridin içeriği o sayfanın kendi HTML'indedir:
     <script type="application/json" id="egitmenNotu">
       { "sure": 12, "soyle": "…", "sorular": ["…"] }
     </script>
   Böyle bir blok yoksa şerit hiç açılmaz. */

var EG_ANAHTAR = 'yp.egitmen';

function sayfaAdi() {
  return location.pathname.split('/').pop() || 'index.html';
}

/* Ana giriş kökte, diğer sayfalar /sayfa/ klasöründedir. Bağlantılar
   iki yerde de çalışsın diye önek buradan hesaplanır:
     SAYFA_YOLU → bir sayfaya giden yol
     KOK_YOLU   → köke (index.html'e) giden yol */
var icerideyiz  = /\/sayfa\/[^\/]*$/.test(location.pathname);
var SAYFA_YOLU  = icerideyiz ? '' : 'sayfa/';
var KOK_YOLU    = icerideyiz ? '../' : '';

function egitmenMi() {
  var q = new URLSearchParams(location.search);
  try {
    if (q.get('egitmen') === '1') { sessionStorage.setItem(EG_ANAHTAR, '1'); return true; }
    if (q.get('egitmen') === '0') { sessionStorage.removeItem(EG_ANAHTAR); return false; }
    return sessionStorage.getItem(EG_ANAHTAR) === '1';
  } catch (e) { return q.get('egitmen') === '1'; }
}

function menuKur() {
  var yuva = $('.nav .wrap');
  if (!yuva) return;

  var simdiki = sayfaAdi();
  var eg = egitmenMi();
  var adres = function (h) { return SAYFA_YOLU + h + (eg ? '?egitmen=1' : ''); };

  var adimlar = MENU.map(function (m) {
    var aktif = (m.href === simdiki) ? ' active' : '';
    return '<li><a class="faz-step' + aktif + '" href="' + esc(adres(m.href)) + '">' +
             '<span class="faz-ad">' + esc(m.ad) + '</span></a></li>';
  }).join('');

  var ekler = MENU_EK.map(function (m) {
    var aktif = (m.href === simdiki) ? ' active' : '';
    return '<li><a class="faz-ek-link' + aktif + '" href="' + esc(adres(m.href)) + '">' +
             esc(m.ad) + '</a></li>';
  }).join('');

  yuva.innerHTML =
    '<a class="brand" href="' + esc(KOK_YOLU + 'index.html') + '">' +
      '<span class="mark">🌿</span> Yeşil <span class="text-grad">Prompt</span></a>' +
    '<button class="nav-toggle" type="button" aria-label="Menü">☰</button>' +
    '<ol class="nav-links faz-rail">' + adimlar +
      '<li class="faz-ayrac" aria-hidden="true"></li>' + ekler +
    '</ol>';

  /* Mobil menü aç/kapa */
  var dugme = $('.nav-toggle', yuva), liste = $('.nav-links', yuva);
  dugme.addEventListener('click', function () { liste.classList.toggle('open'); });
  $$('a', liste).forEach(function (a) {
    a.addEventListener('click', function () { liste.classList.remove('open'); });
  });

  if (eg) egitmenSeridi();
}

function egitmenSeridi() {
  var not = veri('egitmenNotu');
  if (!not) return;

  var baslik = (MENU.filter(function (m) { return m.href === sayfaAdi(); })[0] || {}).ad || '';
  var sorular = (not.sorular || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');

  var serit = document.createElement('div');
  serit.className = 'egitmen-bar';
  serit.innerHTML =
    '<div class="eg-sol">' +
      '<span class="eg-rozet">EĞİTMEN</span><b>' + esc(baslik) + '</b>' +
      '<span class="eg-sure">' + esc(not.sure) + ' dk</span>' +
    '</div>' +
    '<div class="eg-orta">' +
      (not.soyle ? '<p class="eg-soyle">' + esc(not.soyle) + '</p>' : '') +
      (sorular ? '<ul class="eg-sorular">' + sorular + '</ul>' : '') +
    '</div>' +
    '<div class="eg-sag">' +
      '<span class="eg-saat" id="egSaat">' + esc(not.sure) + ':00</span>' +
      '<button class="btn btn-ghost btn-sm" id="egBasla" type="button">▶ Başlat</button>' +
      '<button class="btn btn-ghost btn-sm" id="egKapat" type="button" aria-label="Kapat">✕</button>' +
    '</div>';
  document.body.appendChild(serit);
  document.body.classList.add('eg-on');

  var kalan = (not.sure || 0) * 60, sayac = null;
  var saat = $('#egSaat', serit);
  function yaz() {
    var d = Math.floor(Math.abs(kalan) / 60), s = Math.abs(kalan) % 60;
    saat.textContent = (kalan < 0 ? '-' : '') + d + ':' + (s < 10 ? '0' : '') + s;
    saat.classList.toggle('eg-bitti', kalan <= 0);
  }
  $('#egBasla', serit).addEventListener('click', function () {
    if (sayac) { clearInterval(sayac); sayac = null; this.textContent = '▶ Devam'; return; }
    this.textContent = '⏸ Durdur';
    sayac = setInterval(function () { kalan--; yaz(); }, 1000);
  });
  $('#egKapat', serit).addEventListener('click', function () {
    if (sayac) clearInterval(sayac);
    try { sessionStorage.removeItem(EG_ANAHTAR); } catch (e) {}
    serit.remove();
    document.body.classList.remove('eg-on');
  });
  yaz();
}


/* ===== 6) FOOTER ==================================================
   Künye + site haritası + telif. Sergi hariç her sayfada.

   NEDEN SON SLAYT? Slayt sayfalarında .fp-root ekranı tamamen kaplar;
   gövdenin sonuna konan bir <footer> hiçbir zaman görünmez. Bu yüzden
   footer .fp-track'ın son slaytı olarak eklenir — slayt motoru onu
   kendiliğinden sayar. Sergide .fp-track yok, footer da yok. */

function footerKur() {
  var ray = $('.fp-track');
  if (!ray) return;

  var simdi = new Date().getFullYear();
  var telifYili = FOOTER.yil < simdi ? FOOTER.yil + '–' + simdi : String(FOOTER.yil);

  /* Site haritası menüden üretilir — ayrı bir liste tutulmaz */
  var harita = [{ ad: 'Yeşil Prompt', href: KOK_YOLU + 'index.html' }]
    .concat(MENU.concat(MENU_EK).map(function (m) {
      return { ad: m.ad, href: SAYFA_YOLU + m.href };
    }))
    .map(function (m) { return '<li><a href="' + esc(m.href) + '">' + esc(m.ad) + '</a></li>'; })
    .join('');

  var satirlar = KUNYE.filter(function (r) { return r[1]; })
    .map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; })
    .join('');

  var slayt = document.createElement('section');
  slayt.className = 'fp-section fp-footer';
  slayt.id = 'kunye';
  slayt.dataset.title = 'Künye & site haritası';
  slayt.innerHTML =
    '<div class="fp-inner"><div class="foot-grid">' +
      '<div class="foot-col">' +
        '<a class="foot-mark" href="' + esc(KOK_YOLU + 'index.html') + '">🌿 Yeşil Prompt <span>Atölyesi</span></a>' +
        '<p class="foot-about">' + esc(FOOTER.hakkinda) + '</p>' +
        '<p class="foot-note">' + esc(FOOTER.uyari) + '</p>' +
      '</div>' +
      '<nav class="foot-col" aria-label="Site haritası">' +
        '<h3 class="foot-h">Site haritası</h3>' +
        '<ul class="foot-links">' + harita + '</ul>' +
      '</nav>' +
      '<div class="foot-col">' +
        '<h3 class="foot-h">Etkinlik künyesi</h3>' +
        '<dl class="foot-dl">' + satirlar + '</dl>' +
      '</div>' +
    '</div>' +
    '<div class="foot-bar">© ' + telifYili + ' ' + esc(FOOTER.sahip) + '</div></div>';

  ray.appendChild(slayt);
}


/* ===== 7) SLAYT MOTORU ============================================
   Sayfadaki her <section class="fp-section"> bir slayttır. Sayısı
   sabit değildir — HTML'e slayt ekleyip çıkarmak yeterlidir; noktalar,
   oklar ve sayaç kendiliğinden güncellenir.

   Sergi (sergi.html) bu motoru KULLANMAZ, normal kaydırılır. */

function slaytMotoru() {
  var kok = $('.fp-root'), ray = $('.fp-track');
  if (!kok || !ray) return;

  var slaytlar = $$('.fp-section', ray);
  if (!slaytlar.length) return;

  var i = 0, gecisTe = false;
  var BEKLE = 850;   /* iki geçiş arası en az süre (ms) */

  document.body.classList.add('fp-on');

  /* Sağ kenar noktaları */
  var noktalar = document.createElement('div');
  noktalar.className = 'fp-dots';
  slaytlar.forEach(function (s, n) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', (n + 1) + '. slayt');
    b.title = s.dataset.title || ('Slayt ' + (n + 1));
    b.addEventListener('click', function () { git(n); });
    noktalar.appendChild(b);
  });
  document.body.appendChild(noktalar);

  /* Sağ alt ileri/geri */
  var oklar = document.createElement('div');
  oklar.className = 'fp-arrows';
  oklar.innerHTML =
    '<button type="button" data-prev aria-label="Önceki slayt">&#8593;</button>' +
    '<span class="count"></span>' +
    '<button type="button" data-next aria-label="Sonraki slayt">&#8595;</button>';
  document.body.appendChild(oklar);

  var geriDugme = $('[data-prev]', oklar), ileriDugme = $('[data-next]', oklar);
  var sayacEl = $('.count', oklar);
  geriDugme.addEventListener('click', function () { git(i - 1); });
  ileriDugme.addEventListener('click', function () { git(i + 1); });

  function boyutla() {
    var h = kok.clientHeight;
    slaytlar.forEach(function (s) { s.style.height = h + 'px'; });
  }

  function ciz() {
    ray.style.transform = 'translateY(' + (-i * kok.clientHeight) + 'px)';
    slaytlar.forEach(function (s, n) { s.classList.toggle('active', n === i); });
    $$('button', noktalar).forEach(function (b, n) { b.classList.toggle('active', n === i); });
    sayacEl.textContent = (i + 1) + '/' + slaytlar.length;
    geriDugme.disabled = (i === 0);
    ileriDugme.disabled = (i === slaytlar.length - 1);
    if (slaytlar[i].id) history.replaceState(null, '', '#' + slaytlar[i].id);
  }

  function git(n) {
    n = Math.max(0, Math.min(slaytlar.length - 1, n));
    if (n === i || gecisTe) return;
    i = n; gecisTe = true; ciz();
    setTimeout(function () { gecisTe = false; }, BEKLE);
  }

  /* Slayt içeriği ekrandan uzunsa önce iç kaydırmaya izin ver */
  function kenarda(yon) {
    var el = slaytlar[i];
    if (el.scrollHeight <= el.clientHeight + 2) return true;
    if (yon > 0) return Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 1;
    return el.scrollTop <= 1;
  }

  var tekerKilit = false;
  kok.addEventListener('wheel', function (e) {
    var yon = e.deltaY > 0 ? 1 : -1;
    if (!kenarda(yon)) return;
    e.preventDefault();
    if (tekerKilit || gecisTe || Math.abs(e.deltaY) < 8) return;
    tekerKilit = true;
    git(i + yon);
    setTimeout(function () { tekerKilit = false; }, BEKLE);
  }, { passive: false });

  window.addEventListener('keydown', function (e) {
    var t = document.activeElement.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      if (kenarda(1)) { e.preventDefault(); git(i + 1); }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      if (kenarda(-1)) { e.preventDefault(); git(i - 1); }
    } else if (e.key === 'Home') { e.preventDefault(); git(0); }
    else if (e.key === 'End') { e.preventDefault(); git(slaytlar.length - 1); }
  });

  var zaman;
  window.addEventListener('resize', function () {
    clearTimeout(zaman);
    var eski = ray.style.transition;
    ray.style.transition = 'none';
    boyutla();
    ray.style.transform = 'translateY(' + (-i * kok.clientHeight) + 'px)';
    zaman = setTimeout(function () { ray.style.transition = eski; }, 60);
  });

  /* Sayfa içi <a href="#slayt-id"> bağlantıları */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var n = -1;
    slaytlar.forEach(function (s, x) { if (s.id && '#' + s.id === a.getAttribute('href')) n = x; });
    if (n < 0) return;
    e.preventDefault();
    git(n);
  });

  /* Dokunma */
  var dokunY = null;
  kok.addEventListener('touchstart', function (e) { dokunY = e.touches[0].clientY; }, { passive: true });
  kok.addEventListener('touchend', function (e) {
    if (dokunY === null) return;
    var dy = dokunY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 55 && kenarda(dy > 0 ? 1 : -1)) git(i + (dy > 0 ? 1 : -1));
    dokunY = null;
  }, { passive: true });

  /* Açılışta adresteki #hash'e git */
  if (location.hash) {
    slaytlar.forEach(function (s, n) { if ('#' + s.id === location.hash && n > 0) i = n; });
  }
  boyutla();
  ciz();
}


/* ===== 8) ÇİZGİ GRAFİĞİ ===========================================
   Tek eksenli, çok serili zaman serisi çizer. İki sayfa kullanır:
   Giriş (şirket değerleri) ve Meraklısına (aynı grafik, geniş hâli).

   Beklediği veri (sayfanın HTML'indeki JSON bloğundan gelir):
     { "yillar": [2019, 2020, …],
       "seriler": [ { "anahtar": "nvidia", "ad": "NVIDIA",
                      "degerler": [0.14, 0.32, …] } ] }

   anahtar = CSS renk sınıfı (era-<anahtar>) — renkler style.css 15.3'te.
   degerler[i], yillar[i] ile eşleşir. null = O YIL VERİ YOK; çizgi
   orada başlamaz, nokta konmaz. Sıfır gibi gösterilmez. */

function cizgiGrafik(yuva, V, secenek) {
  if (!yuva || !V) return;
  secenek = secenek || {};

  var W = secenek.genislik || 560, H = secenek.yukseklik || 320;
  var solB = 40, sagB = 14, ustB = 16, altB = 34;
  var n = V.yillar.length;

  var enBuyuk = 0;
  V.seriler.forEach(function (s) {
    s.degerler.forEach(function (v) { if (v != null && v > enBuyuk) enBuyuk = v; });
  });
  var tavan = Math.max(1, Math.ceil(enBuyuk));

  var x = function (i) { return solB + (i / (n - 1)) * (W - solB - sagB); };
  var y = function (v) { return H - altB - (v / tavan) * (H - ustB - altB); };

  /* Küçük tavanlarda her tam sayı bir kademe; büyükse 4 kademe yeter */
  var kademe = (tavan <= 8) ? tavan : 4;

  var izgara = '';
  for (var g = 0; g <= kademe; g++) {
    var deger = tavan * g / kademe;
    izgara += '<line class="era-grid" x1="' + solB + '" y1="' + y(deger) + '" x2="' + (W - sagB) +
      '" y2="' + y(deger) + '"></line>' +
      '<text class="era-axis" x="' + (solB - 6) + '" y="' + (y(deger) + 3) + '" text-anchor="end">' +
        sayi(deger, 1) + '</text>';
  }

  var yilEtiket = V.yillar.map(function (yil, i) {
    return '<text class="era-axis" x="' + x(i) + '" y="' + (H - altB + 16) + '" text-anchor="middle">' +
      esc(yil) + '</text>';
  }).join('');

  var cizgiler = V.seriler.map(function (s) {
    var sinif = 'era-' + s.anahtar, noktalar = [], daire = '';
    s.degerler.forEach(function (v, i) {
      if (v == null) return;
      noktalar.push(x(i) + ',' + y(v));
      daire += '<circle class="era-dot ' + sinif + '" cx="' + x(i) + '" cy="' + y(v) + '" r="3">' +
        '<title>' + esc(s.ad) + ' · ' + esc(V.yillar[i]) + ': ' + sayi(v, 2) +
        (V.birim ? ' ' + esc(V.birim) : '') + '</title></circle>';
    });
    return '<polyline class="era-line ' + sinif + '" points="' + noktalar.join(' ') + '"></polyline>' + daire;
  }).join('');

  var aciklama = '<div class="era-legend">' + V.seriler.map(function (s) {
    return '<span class="era-key era-' + s.anahtar + '">' + esc(s.ad) + '</span>';
  }).join('') + '</div>';

  yuva.innerHTML =
    '<svg class="era-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' +
      esc(secenek.aciklama || 'Zaman serisi grafiği') + '">' +
      izgara + yilEtiket + cizgiler +
    '</svg>' + aciklama;
}


/* ===== 9) TOKEN SAYACI ============================================
   Gerçek o200k_base tokenizer'ı CDN'den yükler. Yüklenince
   "token-hazir" olayı tetiklenir; sayfa isterse yeniden sayar.
   CDN açılmazsa ~4 karakter = 1 token yaklaşımına düşer. */

var gercekTokenizer = null;

function tokenizerYukle() {
  import('https://esm.sh/gpt-tokenizer@2/encoding/o200k_base')
    .then(function (mod) {
      var encode = mod.encode || (mod.default && mod.default.encode);
      var decode = mod.decode || (mod.default && mod.default.decode);
      if (!encode || !decode) return;
      gercekTokenizer = { encode: encode, decode: decode };
      window.dispatchEvent(new Event('token-hazir'));
    })
    .catch(function (e) {
      console.warn('Tokenizer CDN yüklenemedi; yaklaşık moda geçildi.', e);
    });
}

/* metin → { sayi, parcalar:[{metin, bosluk}], yaklasik } */
function token(metin) {
  if (!metin) return { sayi: 0, parcalar: [], yaklasik: !gercekTokenizer };
  if (gercekTokenizer) {
    try {
      var ids = gercekTokenizer.encode(metin);
      return {
        sayi: ids.length,
        yaklasik: false,
        parcalar: ids.map(function (id) {
          var s = '·';
          try { s = gercekTokenizer.decode([id]); } catch (e) {}
          return { metin: s, bosluk: /^\s+$/.test(s) };
        })
      };
    } catch (e) { /* aşağıdaki yaklaşıma düş */ }
  }
  var parcalar = (metin.match(/\s+|[^\s]+/g) || []).map(function (p) {
    return { metin: p, bosluk: /^\s+$/.test(p) };
  });
  return { sayi: Math.max(1, Math.round(metin.length / 4)), parcalar: parcalar, yaklasik: true };
}


/* ===== 10) AÇ / KAPA DÜĞMELERİ ====================================
   HTML'de içerik hazır durur, düğme yalnızca görünürlüğü değiştirir:

     <button class="btn btn-primary btn-sm ac-kapa"
             data-hedef="cikolataCevap"
             data-kapali="👁️ Cevabı Gör" data-acik="🙈 Cevabı Gizle">👁️ Cevabı Gör</button>
     <div id="cikolataCevap" hidden> … </div>

   ❌ KİLİT YOKTUR: öğrenci istediği zaman açar, kapatır, tekrar açar. */

function acKapaKur() {
  $$('.ac-kapa').forEach(function (d) {
    var hedef = document.getElementById(d.dataset.hedef);
    if (!hedef) return;
    d.addEventListener('click', function () {
      var acikti = !hedef.hidden;
      hedef.hidden = acikti;
      d.textContent = acikti ? (d.dataset.kapali || 'Göster') : (d.dataset.acik || 'Gizle');
    });
  });
}


/* ===== BAŞLAT =====================================================
   Sayfa dosyalarının (atolye.js, sergi.js…) kullandığı araçlar. */

window.YP = {
  $: $, $$: $$, esc: esc, sayi: sayi, tarih: tarih, veri: veri, nitelik: nitelik,
  cevrim: cevrim, telefon: telefon, su: su, sure: sure, baraj: baraj,
  token: token, cizgiGrafik: cizgiGrafik, K: K
};

/* Sıra önemlidir: footer slaytı, slayt motoru saymadan ÖNCE eklenir. */
function basla() {
  menuKur();
  footerKur();
  slaytMotoru();
  acKapaKur();
  tokenizerYukle();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', basla);
else basla();

})();
