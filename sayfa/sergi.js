/* =========================================================
   SERGİ — mekanikler
   ---------------------------------------------------------
   Eserlerin kendisi sergi.html içindedir. Burada üç iş var:
     1) Her eserin ⚡ enerji rozetini hesaplayıp yazmak
     2) Resim bulunamazsa yer tutucuya düşmek
     3) Esere tıklayınca açılan büyük görünüm (lightbox)
   ========================================================= */
(function () {
'use strict';

var $ = YP.$, $$ = YP.$$, esc = YP.esc;

var eserler = $$('#galeri .gal-item');
var sira = -1;            /* lightbox'ta açık eserin sırası */
var sonOdak = null;

/* Bir eserin TOPLAM enerjisi.
   Çoğu araç tek "üret" tıklamasında birden fazla alternatif verir;
   harcanan enerji seçtiğin tek görselin değil, üretilen hepsinindir. */
function toplamWh(el) {
  return YP.nitelik(el, 'wh', 0) * YP.nitelik(el, 'varyant', 1) * YP.nitelik(el, 'deneme', 1);
}


/* ---------- 1) Künye şeridindeki ⚡ rozeti ---------- */
eserler.forEach(function (el) {
  var rozet = $('.gal-wh', el);
  if (rozet) rozet.textContent = '⚡ ' + YP.sayi(toplamWh(el), 1) + ' Wh';
});


/* ---------- 2) Resim yoksa yer tutucu ---------- */
$$('#galeri .gal-img').forEach(function (img) {
  img.addEventListener('error', function () {
    var el = img.closest('.gal-item');
    var yer = document.createElement('span');
    yer.className = 'gal-ph ' + (el.dataset.ph || 'ph-a');
    yer.textContent = el.dataset.emoji || '🌿';
    if (img.parentNode) img.parentNode.replaceChild(yer, img);
  });
});


/* ---------- 3) Lightbox ----------
   Çip sırası bilinçlidir: önce eserin KİMLİĞİ (kim, ne zaman, neyle),
   sonra MALİYETİ okunur. Emoji etiketin yerini tutar; metin karşılığı
   title ve .sr-only içinde kalır (ekran okuyucu için). */

function bilgiHtml(el) {
  var wh = toplamWh(el);
  var e = YP.cevrim(wh);
  var varyant = YP.nitelik(el, 'varyant', 1);
  var d = el.dataset;

  var cipler = [];
  if (d.ureten) cipler.push(['👤', 'Üreten', d.ureten]);
  if (d.tarih)  cipler.push(['📅', 'Oluşturulma tarihi', YP.tarih(d.tarih)]);
  if (d.model)  cipler.push(['🧩', 'Model', d.model]);
  cipler.push(['🔁', 'Deneme', '×' + YP.nitelik(el, 'deneme', 1)]);
  if (varyant > 1) cipler.push(['🖼️', 'Her denemede', varyant + ' görsel']);
  cipler.push(['⚡', 'Enerji',   YP.sayi(wh, 2) + ' Wh']);
  cipler.push(['💧', 'Su',       YP.sayi(e.suMl, 1) + ' mL']);
  cipler.push(['🏭', 'Karbon',   YP.sayi(e.co2g, 2) + ' g CO₂']);
  cipler.push(['📱', 'Eşdeğer',  YP.telefon(wh)]);

  return (
    '<div class="box-head">' +
      '<h2 class="box-title">' + esc(d.baslik) + '</h2>' +
      '<span class="box-pos">' + (sira + 1) + ' / ' + eserler.length + '</span>' +
    '</div>' +
    (d.prompt ? '<p class="box-prompt"><b>Prompt:</b> ' + esc(d.prompt) + '</p>' : '') +
    '<div class="box-chips">' + cipler.map(function (c) {
      return '<span class="box-chip" title="' + esc(c[1]) + '">' +
               '<b aria-hidden="true">' + c[0] + '</b>' +
               '<span class="sr-only">' + esc(c[1]) + ': </span>' + esc(c[2]) +
             '</span>';
    }).join('') + '</div>'
  );
}

function ciz() {
  var el = eserler[sira];
  if (!el) return;
  var img = $('.gal-img', el);
  $('#boxMedia').innerHTML = img
    ? '<img class="box-img" src="' + esc(img.getAttribute('src')) + '" alt="' + esc(el.dataset.baslik) + '">'
    : '<div class="box-ph ' + esc(el.dataset.ph || 'ph-a') + '">' + esc(el.dataset.emoji || '🌿') + '</div>';
  $('#boxInfo').innerHTML = bilgiHtml(el);
}

function ac(i) {
  var kutu = $('#lightbox');
  if (!kutu || !eserler[i]) return;
  sonOdak = document.activeElement;
  sira = i;
  ciz();
  kutu.hidden = false;
  document.body.classList.add('box-open');
  $('#boxClose').focus();
}

function kapat() {
  $('#lightbox').hidden = true;
  document.body.classList.remove('box-open');
  sira = -1;
  if (sonOdak && sonOdak.focus) sonOdak.focus();
}

function kaydir(yon) {
  if (sira < 0) return;
  sira = (sira + yon + eserler.length) % eserler.length;
  ciz();
}

eserler.forEach(function (el, i) {
  el.addEventListener('click', function () { ac(i); });
});

$('#boxClose').addEventListener('click', kapat);
$('#boxPrev').addEventListener('click', function () { kaydir(-1); });
$('#boxNext').addEventListener('click', function () { kaydir(1); });

/* Boşluğa tıklayınca kapanır; esere ya da bilgi şeridine tıklayınca kapanmaz */
$('#lightbox').addEventListener('click', function (e) {
  if (e.target === this || e.target.id === 'boxMedia') kapat();
});

document.addEventListener('keydown', function (e) {
  if ($('#lightbox').hidden) return;
  if (e.key === 'Escape')          { e.preventDefault(); kapat(); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); kaydir(1); }
  else if (e.key === 'ArrowLeft')  { e.preventDefault(); kaydir(-1); }
});

})();
