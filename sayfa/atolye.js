/* =========================================================
   GİRİŞ (atolye.html) — mekanikler
   ---------------------------------------------------------
   İki iş var:
     1) İki sütun grafiği + altındaki kat şeridi (#kullanimVerisi)
     2) Şirket değerleri zaman serisi (#degerVerisi) — çizgi grafiğini
        ortak.js çizer, burada yalnızca çağrılır.

   ⚠️ İKİ AYRI GRAFİK, BİLEREK
   Tek grafikte çift eksen kullanılsaydı iki seri de tepeye
   çıkar ve "aynı hızda büyümüşler" yanılsaması doğardı.
   Ayrı grafikler + kat şeridi bunu önler.

   ❌ Veri olmayan yılın sütunu ÇİZİLMEZ; sıfır gibi gösterilmez.
   ========================================================= */
(function () {
'use strict';

var $ = YP.$, esc = YP.esc;

var V = YP.veri('kullanimVerisi');
if (!V) return;


/* Grafiğin tavanı — "güzel" bir yuvarlak sayıya çıkarılır */
function tavan(degerler) {
  var m = 0;
  degerler.forEach(function (v) { if (v != null && v > m) m = v; });
  if (m <= 0) return 1;
  var basamak = Math.pow(10, Math.floor(Math.log10(m)));
  return Math.ceil(m / basamak) * basamak;
}

/* Sütun üstündeki değer etiketi: 3200 → "3.200" · 9.7 → "9,7" */
function etiket(v) {
  return Number(v).toLocaleString('tr-TR', { maximumFractionDigits: 1 });
}


/* ---------- Sütun grafiği ---------- */
function sutunGrafik(yuva, s) {
  var W = 440, H = 260, solB = 46, sagB = 12, ustB = 26, altB = 42;
  var n = s.yillar.length;
  var enUst = tavan(s.degerler);

  var alan = W - solB - sagB;
  var bant = alan / n;                    /* her yıla ayrılan şerit */
  var kalinlik = bant * 0.54;
  var y = function (v) { return H - altB - (v / enUst) * (H - ustB - altB); };
  var orta = function (i) { return solB + bant * i + bant / 2; };

  /* Yatay ızgara + sol eksen (4 kademe) */
  var izgara = '', KADEME = 4;
  for (var g = 0; g <= KADEME; g++) {
    var gy = ustB + (g / KADEME) * (H - ustB - altB);
    izgara += '<line class="era-grid" x1="' + solB + '" y1="' + gy + '" x2="' + (W - sagB) + '" y2="' + gy + '"></line>' +
      '<text class="era-axis" x="' + (solB - 7) + '" y="' + (gy + 4) + '" text-anchor="end">' +
        etiket(enUst * (1 - g / KADEME)) + '</text>';
  }

  /* Sütunlar + yıl etiketleri */
  var sutunlar = '';
  s.degerler.forEach(function (v, i) {
    var x = orta(i);

    /* Yıl her zaman yazılır — veri olmayan yıl da eksende görünsün */
    sutunlar += '<text class="era-axis" x="' + x + '" y="' + (H - altB + 18) + '" text-anchor="middle">' +
      esc(s.yillar[i]) + '</text>';

    if (v == null) {
      sutunlar += '<text class="era-axis" x="' + x + '" y="' + (H - altB - 8) + '" text-anchor="middle">—</text>';
      return;
    }

    sutunlar +=
      '<rect class="era-' + s.anahtar + '" x="' + (x - kalinlik / 2) + '" y="' + y(v) + '" ' +
        'width="' + kalinlik + '" height="' + (H - altB - y(v)) + '" rx="4">' +
        '<title>' + esc(s.altAd) + ' · ' + esc(s.notlar[i]) + ': ' +
          etiket(v) + ' ' + esc(s.birim) + '</title>' +
      '</rect>' +
      '<text class="sutun-deger era-' + s.anahtar + '" x="' + x + '" y="' + (y(v) - 8) + '" ' +
        'text-anchor="middle">' + etiket(v) + '</text>';
  });

  yuva.innerHTML =
    '<svg class="era-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
      'aria-label="' + esc(s.ad) + ' — ' + esc(s.altAd) + ', yıllara göre">' +
      izgara + sutunlar +
    '</svg>' +
    '<p class="src center m-0">' + esc(s.birim) + '</p>';
}


/* ---------- Kat şeridi ----------
   İki serinin AYNI yıl aralığında kaç kat arttığını yazar.
   Aralık, iki seride de verisi olan ilk yıldan son yıla kadardır. */
function katSerit() {
  var yuva = $('#katSerit');
  if (!yuva) return;            /* şerit slayttan kaldırılmışsa sessizce geç */

  var seriler = [V.kullanici, V.token];

  var ilk = 0;
  seriler.forEach(function (s) {
    var i = s.degerler.findIndex(function (v) { return v != null; });
    if (i > ilk) ilk = i;
  });
  var son = V.kullanici.yillar.length - 1;

  yuva.innerHTML = '<div class="kat-serit">' +
    '<span class="kat-aralik">' + esc(V.kullanici.yillar[ilk]) + ' → ' +
      esc(V.kullanici.yillar[son]) + ' arasında</span>' +
    seriler.map(function (s) {
      var kat = s.degerler[son] / s.degerler[ilk];
      return '<span class="kat-rozet era-' + s.anahtar + '">' +
        '<b>×' + etiket(Math.round(kat)) + '</b> ' + esc(s.kisa) + '</span>';
    }).join('') + '</div>';
}


/* ---------- Şirket değerleri (çizimi ortak.js yapar) ---------- */
YP.cizgiGrafik($('#degerChart'), YP.veri('degerVerisi'), {
  yukseklik: 230,              /* basık grafik: kart tam genişlikte kalsın,
                                  yalnızca boyu kısalsın (varsayılan 320) */
  birim: 'trilyon $',
  aciklama: 'Yapay zekâ şirketlerinin ve Türkiye ekonomisinin yıllara göre büyüklüğü (trilyon dolar)'
});


/* ---------- Çiz ---------- */
[['kullanici', V.kullanici], ['token', V.token]].forEach(function (p) {
  var grafik = $('#' + p[0] + 'Chart');
  if (!grafik) return;          /* grafik slayttan kaldırılmışsa sessizce geç */

  var baslik = $('#' + p[0] + 'Baslik');
  var alt    = $('#' + p[0] + 'Alt');
  if (baslik) baslik.textContent = p[1].ad;
  if (alt)    alt.textContent    = p[1].altAd;
  sutunGrafik(grafik, p[1]);
});

katSerit();

})();
