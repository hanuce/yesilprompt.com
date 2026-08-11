/* =========================================================
   FAZ 2 · VERİLERLE YAPAY ZEKA KULLANIMI  (veri-labi.html)
   ---------------------------------------------------------
   Site TEK BİR grafik çizer: ilk slayttaki büyüme eğrisi.
   Geri kalan bütün grafikleri CODAP'ta ÖĞRENCİ kurar —
   ikisi adım adım gösterilir, kalanı yalnızca SORU olarak verilir.

   ❌ Öğrenci cevabı toplanmaz, kaydedilmez (SITE_RULES 2c).

   İçerik: config/veri-labi.config.js
   Grafik görünümü: style.css → 15.3 (.era-*) yeniden kullanılır
   ========================================================= */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function fmt(n) {
    if (n == null) return '—';
    return Number(n).toLocaleString('tr-TR', { maximumFractionDigits: 1 });
  }

  /* ---------- 1) BÜYÜME GRAFİĞİ ----------
     Çift Y eksenli çizgi grafiği. İki seri farklı birimde olduğu için
     her biri KENDİ en büyük değerine göre ölçeklenir; sol eksen
     kullanıcıyı, sağ eksen token'ı okur. Amaç mutlak değerleri
     karşılaştırmak değil, İKİ EĞRİNİN EĞİMİNİ yan yana görmektir.

     Görünüm için 15.3'teki .era-* sınıfları yeniden kullanılır
     (SITE_RULES 6: önce mevcut bileşenleri kullan). */
  function buyumeSVG(K) {
    /* padT bilerek geniş: son noktanın üstündeki değer etiketi kartın
       kenarına yapışmasın. */
    var W = 720, H = 350, padL = 58, padR = 62, padT = 40, padB = 44;
    var yillar = K.yillar, n = yillar.length;

    var x = function (i) { return padL + (i / (n - 1)) * (W - padL - padR); };

    /* Her serinin kendi tavanı — "güzel" bir yuvarlak sayıya çıkarılır */
    function tavan(vals) {
      var m = 0;
      vals.forEach(function (v) { if (v != null && v > m) m = v; });
      var basamak = Math.pow(10, Math.floor(Math.log10(m)));
      return Math.ceil(m / basamak) * basamak;
    }
    var sol = K.seriler[0], sag = K.seriler[1];
    var solMax = tavan(sol.degerler), sagMax = tavan(sag.degerler);
    var y = function (v, max) { return H - padB - (v / max) * (H - padT - padB); };

    /* Yatay ızgara + iki eksenin etiketleri (4 kademe) */
    var grid = '', KADEME = 4;
    for (var g = 0; g <= KADEME; g++) {
      var gy = padT + (g / KADEME) * (H - padT - padB);
      grid += '<line class="era-grid" x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '"></line>';
      var solV = solMax * (1 - g / KADEME), sagV = sagMax * (1 - g / KADEME);
      grid += '<text class="era-axis era-kullanici" x="' + (padL - 8) + '" y="' + (gy + 4) + '" text-anchor="end">' + fmt(solV) + '</text>';
      grid += '<text class="era-axis era-token" x="' + (W - padR + 8) + '" y="' + (gy + 4) + '" text-anchor="start">' + fmt(sagV) + '</text>';
    }

    /* Yıl etiketleri */
    var xlab = '';
    yillar.forEach(function (yr, i) {
      xlab += '<text class="era-axis" x="' + x(i) + '" y="' + (H - padB + 18) + '" text-anchor="middle">' + esc(yr) + '</text>';
    });

    /* İki çizgi + noktalar + son noktanın değeri */
    var lines = '';
    K.seriler.forEach(function (s) {
      var max = (s.eksen === 'sol') ? solMax : sagMax;
      var pts = [];
      s.degerler.forEach(function (v, i) { if (v != null) pts.push(x(i) + ',' + y(v, max)); });
      lines += '<polyline class="era-line era-' + s.key + '" points="' + pts.join(' ') + '"></polyline>';
      s.degerler.forEach(function (v, i) {
        if (v == null) return;
        lines += '<circle class="era-dot era-' + s.key + '" cx="' + x(i) + '" cy="' + y(v, max) + '" r="4">' +
                 '<title>' + esc(s.ad) + ' · ' + esc(s.notlar[i]) + ': ' + fmt(v) + ' ' + esc(s.birim) + '</title></circle>';
      });
      /* Son noktanın üstüne değeri yaz — grafiğin mesajı orada */
      var son = s.degerler.length - 1;
      lines += '<text class="era-axis era-' + s.key + ' buyume-son" x="' + (x(son) - 6) + '" y="' +
               (y(s.degerler[son], max) - 12) + '" text-anchor="end">' +
               fmt(s.degerler[son]) + ' ' + esc(s.birim) + '</text>';
    });

    var legend = '<div class="era-legend">' + K.seriler.map(function (s) {
      return '<span class="era-key era-' + s.key + '">' + esc(s.ad) + '</span>';
    }).join('') + '</div>';

    /* ⚠️ ÇİFT EKSENİN TUZAĞI:
       Her seri KENDİ tavanına göre ölçeklendiği için iki çizgi de grafiğin
       tepesine çıkar; bakan kişi "ikisi de aynı hızda büyümüş" sanabilir.
       Oysa asıl mesaj tam tersi. Bu yüzden grafiğin altına, AYNI ARALIKTA
       (ilk ortak yıldan son yıla) hesaplanmış kat artışları basılır. */
    var ilk = 0;
    K.seriler.forEach(function (s) {
      var i = s.degerler.findIndex(function (v) { return v != null; });
      if (i > ilk) ilk = i;
    });
    var son = K.yillar.length - 1;
    var katlar = '<div class="kat-serit">' +
      '<span class="kat-aralik">' + esc(K.yillar[ilk]) + ' → ' + esc(K.yillar[son]) + ' arasında</span>' +
      K.seriler.map(function (s) {
        var k = s.degerler[son] / s.degerler[ilk];
        return '<span class="kat-rozet era-' + s.key + '">' +
          '<b>×' + fmt(Math.round(k)) + '</b> ' + esc(s.kisa || s.ad) + '</span>';
      }).join('') + '</div>';

    return '<svg class="era-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
      'aria-label="Yapay zekâ kullanıcı sayısı ve işlenen token miktarının yıllara göre değişimi">' +
      grid + xlab + lines + '</svg>' + legend + katlar;
  }

  function buyume() {
    var K = window.KULLANIM_SERISI; if (!K || !$('buyumeChart')) return;
    $('buyumeChart').innerHTML = buyumeSVG(K);
    $('buyumeDers').innerHTML = K.ders;
    $('buyumeKaynak').textContent = 'Kaynak: ' + K.kaynak;
  }

  /* ---------- 2) İndirilecek veri dosyaları ---------- */
  function dosyalar() {
    var host = $('veriDosyalari'); if (!host) return;
    host.innerHTML = (window.VERI_DOSYALARI || []).map(function (d) {
      return '<div class="mb">' +
        '<a class="btn btn-primary btn-sm" href="' + esc(d.url) + '" download>⬇️ ' + esc(d.ad) + '</a>' +
        '<p class="src mt mb-0">' + esc(d.aciklama) + '</p>' +
      '</div>';
    }).join('');
  }

  /* ---------- 3) Adım adım iki örnek ---------- */
  function ornekler() {
    var host = $('ornekGrafikler'); if (!host) return;
    host.innerHTML = (window.ORNEK_GRAFIKLER || []).map(function (o) {
      var adim = o.adimlar.map(function (a) { return '<li>' + a + '</li>'; }).join('');
      return '<div class="card card-top gorev">' +
        '<div class="gorev-head">' +
          '<span class="gorev-num">' + o.no + '</span>' +
          '<div class="gorev-baslik">' + esc(o.baslik) + '</div>' +
        '</div>' +
        '<span class="tag tag-free">' + esc(o.dosya) + '</span>' +
        '<ol class="adimlar mt">' + adim + '</ol>' +
        '<div class="gorev-adim mt">' +
          '<span class="gorev-etiket">NE GÖRECEKSİN</span>' +
          '<p class="text-soft m-0">' + o.beklenen + '</p>' +
        '</div>' +
        '<p class="gorev-kesif mt">' + o.ders + '</p>' +
      '</div>';
    }).join('');
  }

  /* ---------- 4) Öğrencinin kendi kuracağı sorular ---------- */
  function sorular() {
    var host = $('ogrenciSorulari'); if (!host) return;
    host.innerHTML = (window.OGRENCI_SORULARI || []).map(function (q, i) {
      return '<div class="card card-top q-card">' +
        '<span class="q-num">' + (i + 1) + '</span>' +
        '<span class="q-txt">' +
          '<b>' + esc(q.soru) + '</b>' +
          '<span class="src"><br>' + esc(q.ipucu) + '</span>' +
          '<br><span class="tag tag-free">' + esc(q.dosya) + '</span>' +
        '</span>' +
      '</div>';
    }).join('');
  }

  /* ---------- 5) Şeffaflık tablosu ---------- */
  function seffaflik() {
    var T = window.SEFFAFLIK_TABLOSU; if (!T || !$('seffaflikTablo')) return;
    $('seffaflikBaslik').textContent = T.baslik;
    $('seffaflikAciklama').textContent = T.aciklama;

    $('seffaflikTablo').innerHTML =
      '<thead><tr><th>Araç</th><th>Resmî</th>' +
      '<th class="num">KAGGLE.COM</th><th class="num">EPOCH.AI</th>' +
      '<th class="num">Şarj birimi</th></tr></thead><tbody>' +
      T.satirlar.map(function (r) {
        var bos = (r.sarj === '—');
        return '<tr>' +
          '<td><b>' + esc(r.model) + '</b></td>' +
          '<td>' + (r.resmi
            ? '<span class="tag tag-resmi">evet</span>'
            : '<span class="tag tag-tahmini">hayır</span>') + '</td>' +
          '<td class="num src">' + esc(r.kaggle) + '</td>' +
          '<td class="num src">' + esc(r.epoch) + '</td>' +
          '<td class="num ' + (bos ? 'text-mute' : 'text-green') + '"><b>' + esc(r.sarj) + '</b></td>' +
        '</tr>';
      }).join('') + '</tbody>';

    $('seffaflikDers').innerHTML = T.ders;
    $('seffaflikKaynak').textContent = 'Kaynak: ' + T.kaynak;
  }

  /* ---------- 6) Eğitim vs Kullanım ---------- */
  function egitimKullanim() {
    var E = window.EGITIM_VS_KULLANIM; if (!E || !$('ekBaslik')) return;
    $('ekBaslik').textContent = E.baslik;
    $('ekGiris').innerHTML = E.giris;

    $('ekKartlar').innerHTML = E.kartlar.map(function (k) {
      return '<div class="card card-top center">' +
        '<div class="big-emoji">' + k.ikon + '</div>' +
        '<div class="chip mb">' + esc(k.baslik) + '</div>' +
        '<div class="skor-num">' + esc(k.buyuk) + '</div>' +
        '<div class="skor-alt">' + esc(k.alt) + '</div>' +
        '<p class="text-soft mt mb-0">' + k.detay + '</p>' +
      '</div>';
    }).join('');

    $('ekHesap').textContent = E.hesap;
    $('ekSonuc').innerHTML = E.sonuc;
    $('ekDers').innerHTML = E.ders;

    $('ekNeden').innerHTML = E.neden.map(function (n) {
      return '<div class="card">' +
        '<div class="big-emoji">' + n.ikon + '</div>' +
        '<h3 class="m-0">' + esc(n.b) + '</h3>' +
        '<p class="text-soft m-0">' + n.m + '</p>' +
      '</div>';
    }).join('');

    $('ekKaynak').textContent = 'Kaynak: ' + E.kaynak;
  }

  /* ---------- 7) Tartışma ---------- */
  function tartisma() {
    var host = $('tartismaSorular'); if (!host) return;
    host.innerHTML = (window.TARTISMA_SORULARI || []).map(function (p, i) {
      return '<div class="card q-card">' +
        '<span class="q-num">' + (i + 1) + '</span>' +
        '<span class="q-txt"><b>' + esc(p.s) + '</b>' +
        '<span class="src"><br>' + esc(p.c) + '</span></span>' +
      '</div>';
    }).join('');
  }

  function init() {
    buyume(); dosyalar(); ornekler(); sorular();
    seffaflik(); egitimKullanim(); tartisma();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
