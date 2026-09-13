/* =========================================================
   ÖLÇ & SERGİLE (hesaplayici.html) — mekanikler
   ---------------------------------------------------------
   Üç tür üretimin maliyetini hesaplar. Üstteki tür seçicisi
   hangi kartın açık olacağını belirler; sonuç kartı ortaktır.

   FORMÜLLER
     Metin  = (girdi/1000 × in) + (cikti/1000 × out)
              + (gizli/1000 × out)              , × deneme
     Görsel = temel(Wh) × (en × boy ÷ 1024²) × varyant × deneme
     Video  = saniye başına Wh × süre × deneme

   Görselde enerji piksel sayısıyla YAKLAŞIK orantılı kabul edilir;
   çok yüksek çözünürlükte gerçek maliyeti bir miktar düşük tahmin eder.

   VARYANT NEDEN VAR? Çoğu araç tek "üret" tıklamasında birden fazla
   alternatif verir. Kullanıcı birini seçse bile HEPSİNİN enerjisi
   harcanmıştır.

   ❌ Hiçbir giriş kaydedilmez.
   ========================================================= */
(function () {
'use strict';

var $ = YP.$, $$ = YP.$$, esc = YP.esc, sayi = YP.sayi, nit = YP.nitelik;

var TEMEL_PX = 1024 * 1024;

var turSec = $('#turSec');
var kart   = $('#sonucKart');
if (!turSec) return;

var KARTLAR = { metin: $('#kartMetin'), gorsel: $('#kartGorsel'), video: $('#kartVideo') };


/* ---------- Hangi tür seçili? ---------- */
function tur() {
  return turSec.querySelector('button.active').dataset.tur;
}


/* ---------- Hesap ----------
   Her tür kendi dökümünü de döndürür; sonuç kartı onu basar. */
function hesapla() {
  var t = tur();

  if (t === 'metin') {
    var m = $('#metinArac').selectedOptions[0];
    var d = $('#metinDusunme').querySelector('button.active');
    var deneme = +$('#metinDeneme').value;

    var girdiTok = YP.token($('#metinPrompt').value).sayi;
    var cikti    = nit(m, 'cikti', 300);
    var girdiWh  = girdiTok / 1000 * nit(m, 'in', 0);
    var ciktiWh  = cikti    / 1000 * nit(m, 'out', 0);
    var gizliWh  = nit(d, 'gizli', 0) / 1000 * nit(m, 'out', 0);
    var tek = girdiWh + ciktiWh + gizliWh;

    return {
      tur: t, tek: tek, toplam: tek * deneme,
      teknik: 'tek prompt ' + sayi(tek, 2) + ' Wh × ' + deneme,
      dokum: [
        ['Girdi: promptu okumak (' + girdiTok + ' token)', girdiWh],
        ['Çıktı: cevabı yazmak (' + cikti + ' token)',     ciktiWh],
        ['Cevaptan önceki gizli düşünme',                  gizliWh]
      ]
    };
  }

  if (t === 'gorsel') {
    var g = $('#gorselArac').selectedOptions[0];
    var b = $('#sizeSel').selectedOptions[0];
    var varyant = +$('#variants').value, dg = +$('#attempts').value;

    var olcek = (nit(b, 'en', 1024) * nit(b, 'boy', 1024)) / TEMEL_PX;
    var tekGorsel = nit(g, 'wh', 0) * olcek;

    return {
      tur: t, tekGorsel: tekGorsel, toplam: tekGorsel * varyant * dg,
      teknik: 'tek görsel ' + sayi(tekGorsel, 2) + ' Wh × ' + varyant + ' görsel × ' + dg + ' deneme',
      dokum: [
        ['Tek görsel (' + nit(b, 'en', 0) + '×' + nit(b, 'boy', 0) + ')', tekGorsel],
        ['Bir denemede üretilen ' + varyant + ' görsel', tekGorsel * varyant]
      ]
    };
  }

  var v = $('#videoArac').selectedOptions[0];
  var sure = +$('#videoSure').value, dv = +$('#videoDeneme').value;
  var saniyeWh = nit(v, 'wh-sn', 0);

  return {
    tur: t, toplam: saniyeWh * sure * dv,
    teknik: 'saniyede ' + sayi(saniyeWh, 0) + ' Wh × ' + sure + ' sn × ' + dv + ' deneme',
    dokum: [
      ['Saniye başına',              saniyeWh],
      [sure + ' saniyelik tek video', saniyeWh * sure]
    ]
  };
}


/* ---------- Sonucu çiz ---------- */
function ciz() {
  var r = hesapla();
  var e = YP.cevrim(r.toplam);

  var sinif = 'green', yazi = '🌱 Verimli';
  if (r.toplam > nit(kart, 'esik-yuksek', 8))    { sinif = 'red';   yazi = '🔴 Yüksek maliyet'; }
  else if (r.toplam > nit(kart, 'esik-orta', 3)) { sinif = 'amber'; yazi = '⚠️ Orta maliyet'; }
  $('#status').className = 'status ' + sinif;
  $('#status').textContent = yazi;

  /* Eşdeğerler hep TEK birimden: enerji → telefon şarjı, su → şişe */
  $('#human').textContent      = YP.telefon(r.toplam);
  $('#humanWater').textContent = '💧 ' + YP.su(e.suMl);
  $('#tech').textContent       = 'teknik: ' + sayi(r.toplam, 2) + ' Wh  ·  ' + r.teknik;

  $('#metrics').innerHTML = [
    ['⚡', sayi(r.toplam, 2),   'Wh enerji'],
    ['💧', sayi(e.suMl, 1),     'mL su'],
    ['🏭', sayi(e.co2g, 2),     'g CO₂'],
    ['📱', sayi(e.telefon, 2),  'telefon şarjı'],
    ['💡', YP.sure(e.ledDk),    'LED ampul'],
    ['📺', YP.sure(e.videoDk),  'video izleme']
  ].map(function (t) {
    return '<div class="metric"><div class="icon">' + t[0] + '</div>' +
           '<div class="v">' + t[1] + '</div><div class="l">' + t[2] + '</div></div>';
  }).join('');

  $('#dokum').innerHTML = '<div class="text-mute mb">Döküm</div>' +
    r.dokum.map(function (b) {
      return '<div class="breakdown-row"><span class="text-soft">' + b[0] + '</span>' +
             '<span class="text-green">' + sayi(b[1], 3) + ' Wh</span></div>';
    }).join('');

  if (r.tur === 'gorsel') {
    $('#pxNote').textContent = sayi(nit($('#sizeSel').selectedOptions[0], 'en', 0) *
                                    nit($('#sizeSel').selectedOptions[0], 'boy', 0) / 1e6, 2) + ' MP';
    damgaOnizleme(r, e);
    damgaKodu(r);
  }
}


/* ---------- Seçilen aracın dayanağı — asla gizlenmez ---------- */
function metinNot() {
  var m = $('#metinArac').selectedOptions[0];
  $('#metinNot').innerHTML =
    '<span class="tag ' + esc(m.dataset.rozet) + '">' + esc(m.dataset.rozetAd) + '</span> ' +
    esc(m.dataset.kaynak);
  $('#metinCikti').textContent = nit(m, 'cikti', 300).toLocaleString('tr-TR');
}

function metinDusunmeNot() {
  var b = $('#metinDusunme').querySelector('button.active');
  $('#metinDusunmeNot').textContent =
    b.dataset.not + ' (+' + nit(b, 'gizli', 0).toLocaleString('tr-TR') + ' gizli token)';
}

function gorselNot() {
  var a = $('#gorselArac').selectedOptions[0];
  $('#gorselNot').innerHTML =
    (a.dataset.free === 'evet' ? '<span class="tag tag-free">ücretsiz</span> ' : '') +
    (a.dataset.basis === 'olcum'
      ? '<span class="tag tag-meas">ölçüm</span>'
      : '<span class="tag tag-est">tahmin</span>') + ' ' + esc(a.dataset.src) +
    ' · <a href="' + esc(a.dataset.url) + '" target="_blank" rel="noopener">aracı aç ↗</a>';
}

function videoNot() {
  var a = $('#videoArac').selectedOptions[0];
  $('#videoNot').innerHTML =
    '<span class="tag tag-est">tahmin</span> ' + esc(a.dataset.src) +
    ' · <a href="' + esc(a.dataset.url) + '" target="_blank" rel="noopener">aracı aç ↗</a>';
}


/* ---------- Sergi damgası (yalnızca görsel) ----------
   ⚠️ Çip sırası sergideki lightbox ile AYNIDIR. */
function aracAdi() {
  return $('#gorselArac').selectedOptions[0].textContent.split('—')[0].trim();
}

function damgaOnizleme(r, e) {
  var varyant = +$('#variants').value;
  var tarih = $('#dateIn').value;

  var cipler = [];
  if (tarih) cipler.push(['📅', YP.tarih(tarih)]);
  cipler.push(['🧩', aracAdi()]);
  cipler.push(['🔁', '×' + $('#attempts').value]);
  if (varyant > 1) cipler.push(['🖼️', varyant + ' görsel']);
  cipler.push(['⚡', sayi(r.toplam, 2) + ' Wh']);
  cipler.push(['💧', sayi(e.suMl, 1) + ' mL']);
  cipler.push(['🏭', sayi(e.co2g, 2) + ' g CO₂']);
  cipler.push(['📱', YP.telefon(r.toplam)]);

  $('#stampPreview').innerHTML = cipler.map(function (c) {
    return '<span class="stamp-chip"><b>' + c[0] + '</b>' + esc(c[1]) + '</span>';
  }).join('');
}

/* ⚠️ sergi.html'deki eser bloğunun yapısı değişirse burası da değişir.
   wh = TEK GÖRSELİN enerjisi; toplamı sergi.js kendisi hesaplar. */
function damgaKodu(r) {
  var baslik = $('#titleIn').value.trim() || 'Eser adı';
  var ureten = $('#byIn').value.trim();
  var tarih  = $('#dateIn').value;
  var prompt = $('#gorselPrompt').value.trim();
  var model  = aracAdi();

  var meta = '';
  if (ureten) meta += '\n            <span title="Üreten">👤 ' + ureten + '</span>';
  meta += '\n            <span title="Model">🧩 ' + model + '</span>';

  var blok =
'<button class="gal-item" type="button"\n' +
'        data-baslik="' + baslik + '"\n' +
(ureten ? '        data-ureten="' + ureten + '"\n' : '') +
(tarih  ? '        data-tarih="' + tarih + '"\n' : '') +
'        data-model="' + model + '"\n' +
'        data-prompt="' + prompt + '"\n' +
'        data-wh="' + (+r.tekGorsel.toFixed(2)) + '" data-varyant="' + $('#variants').value +
          '" data-deneme="' + $('#attempts').value + '"\n' +
'        data-ph="ph-a" data-emoji="🌿">\n' +
'  <span class="gal-frame">\n' +
'    <img class="gal-img" src="../resim/galeri/DOSYA_ADI.png" alt="' + baslik + '" loading="lazy">\n' +
'  </span>\n' +
'  <span class="gal-cap">\n' +
'    <span class="gal-name">' + baslik + '</span>\n' +
'    <span class="gal-line">\n' +
'      <span class="gal-meta">' + meta + '\n' +
'      </span>\n' +
'      <span class="gal-wh"></span>\n' +
'    </span>\n' +
'  </span>\n' +
'</button>';

  $('#stampCode').textContent = blok;
  $('#stampCode').dataset.ham = blok;
}


/* ---------- Prompt token sayaçları ---------- */
function tokenSay() {
  $('#metinToken').textContent  = YP.token($('#metinPrompt').value).sayi;
  $('#gorselToken').textContent = YP.token($('#gorselPrompt').value).sayi;
  $('#videoToken').textContent  = YP.token($('#videoPrompt').value).sayi;
}


/* ---------- Tür değiştir: kartları aç/kapa ---------- */
function turDegisti() {
  var t = tur();
  Object.keys(KARTLAR).forEach(function (k) { KARTLAR[k].hidden = (k !== t); });
  /* Sergi damgası yalnızca görsel için anlamlı */
  $('#sergiBlok').hidden  = (t !== 'gorsel');
  $('#damgaBlok').hidden  = (t !== 'gorsel');
  ciz();
}

turSec.addEventListener('click', function (e) {
  var b = e.target.closest('button[data-tur]');
  if (!b) return;
  $$('button', this).forEach(function (x) { x.classList.toggle('active', x === b); });
  turDegisti();
});


/* ---------- Araç tablosundaki "telefon şarjı" sütunu ---------- */
$$('#toolTable tbody tr').forEach(function (satir) {
  var h = $('.arac-sarj', satir);
  if (h) h.textContent = sayi(YP.cevrim(nit(satir, 'wh', 0)).telefon, 2);
});


/* ---------- Kopyala ---------- */
$('#copyBtn').addEventListener('click', function () {
  var dugme = this, kod = $('#stampCode');
  var metin = kod.dataset.ham || '';

  function oldu() {
    dugme.textContent = '✅ Kopyalandı';
    setTimeout(function () { dugme.textContent = '📋 Kopyala'; }, 1800);
  }
  /* Pano izni yoksa: metni seç, kullanıcı Ctrl+C yapsın */
  function elle() {
    var sec = window.getSelection(), aralik = document.createRange();
    aralik.selectNodeContents(kod);
    sec.removeAllRanges(); sec.addRange(aralik);
    dugme.textContent = 'Ctrl+C ile kopyala';
    setTimeout(function () { dugme.textContent = '📋 Kopyala'; }, 2600);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(metin).then(oldu, elle);
  } else { elle(); }
});


/* ---------- Bağlantılar ---------- */
$('#metinArac').addEventListener('change', function () { metinNot(); ciz(); });
$('#metinPrompt').addEventListener('input', function () { tokenSay(); ciz(); });
$('#metinDeneme').addEventListener('input', function () { $('#metinDenemeLbl').textContent = this.value; ciz(); });
$('#metinDusunme').addEventListener('click', function (e) {
  var b = e.target.closest('button[data-gizli]');
  if (!b) return;
  $$('button', this).forEach(function (x) { x.classList.toggle('active', x === b); });
  metinDusunmeNot(); ciz();
});

$('#gorselArac').addEventListener('change', function () { gorselNot(); ciz(); });
$('#gorselPrompt').addEventListener('input', function () { tokenSay(); ciz(); });
$('#sizeSel').addEventListener('change', ciz);
$('#variants').addEventListener('input', function () { $('#varLbl').textContent = this.value; ciz(); });
$('#attempts').addEventListener('input', function () { $('#attLbl').textContent = this.value; ciz(); });
$('#titleIn').addEventListener('input', ciz);
$('#byIn').addEventListener('input', ciz);
$('#dateIn').addEventListener('change', ciz);

$('#videoArac').addEventListener('change', function () { videoNot(); ciz(); });
$('#videoPrompt').addEventListener('input', function () { tokenSay(); ciz(); });
$('#videoSure').addEventListener('input', function () { $('#videoSureLbl').textContent = this.value; ciz(); });
$('#videoDeneme').addEventListener('input', function () { $('#videoDenemeLbl').textContent = this.value; ciz(); });

window.addEventListener('token-hazir', function () { tokenSay(); ciz(); });

/* Varsayılan tarih: bugün (yerel saate göre — toISOString UTC'ye kaydırır) */
(function bugun() {
  var d = new Date(), iki = function (n) { return (n < 10 ? '0' : '') + n; };
  $('#dateIn').value = d.getFullYear() + '-' + iki(d.getMonth() + 1) + '-' + iki(d.getDate());
})();

metinNot();
metinDusunmeNot();
gorselNot();
videoNot();
tokenSay();
turDegisti();

})();
