/* =========================================================
   TOKEN LAB (token-lab.html) — mekanikler
   ---------------------------------------------------------
   Sayfada tek mekanik kaldı: TOKEN AVI.
   Akış slaytı tamamen statiktir; ölçme aracı Ölç menüsüne
   taşındı (bkz. hesaplayici.html → tür seçici).

   ⚠️ Görsel ve videoda token sayısı GÖSTERİLİR ama enerjiye
      KATILMAZ — öğrencinin göreceği şey "prompt uzun ama fark
      etmiyor" gerçeğidir.

   ❌ Yazılan hiçbir şey kaydedilmez.
   ========================================================= */
(function () {
'use strict';

var $ = YP.$, $$ = YP.$$, esc = YP.esc, sayi = YP.sayi, nit = YP.nitelik;

var kutular = $$('.avci');
if (!kutular.length) return;


/* Kutunun türü, enerjinin nasıl hesaplanacağını söyler:
     metin  → (girdi token ÷ 1000 × data-in) + (data-cikti ÷ 1000 × data-out)
     gorsel → data-wh                      (prompt uzunluğu KATILMAZ)
     video  → data-wh-sn × data-saniye     (prompt uzunluğu KATILMAZ) */
function enerji(kutu, tokenSayisi) {
  var o = $('.av-model', kutu).selectedOptions[0];
  var tur = kutu.dataset.tur;
  if (tur === 'metin') {
    return tokenSayisi / 1000 * nit(o, 'in', 0) +
           nit(o, 'cikti', 300) / 1000 * nit(o, 'out', 0);
  }
  if (tur === 'gorsel') return nit(o, 'wh', 0);
  return nit(o, 'wh-sn', 0) * nit(kutu, 'saniye', 5);
}

function ciz(kutu) {
  var metin = $('.av-prompt', kutu).value;
  var r = YP.token(metin);
  var n = metin.trim() ? r.sayi : 0;
  var wh = enerji(kutu, n);
  var e = YP.cevrim(wh);

  $('.av-token', kutu).textContent = n;
  $('.av-wh', kutu).textContent    = sayi(wh, 2);
  $('.av-su', kutu).textContent    = sayi(e.suMl, 1) + ' mL';
  $('.av-sarj', kutu).textContent  = YP.telefon(wh);

  $('.av-cipler', kutu).innerHTML = r.parcalar.slice(0, 60).map(function (p, i) {
    return '<span class="tok tok-c' + ((i % 6) + 1) + '">' +
             '<span class="' + (p.bosluk ? 'ws' : '') + '">' +
             (p.bosluk ? '␣' : esc(p.metin)) + '</span></span>';
  }).join('');
}

kutular.forEach(function (kutu) {
  $('.av-prompt', kutu).addEventListener('input', function () { ciz(kutu); });
  $('.av-model', kutu).addEventListener('change', function () { ciz(kutu); });
  ciz(kutu);
});


/* ---------- Token sayacının durumu ---------- */
function motorNotu() {
  var el = $('#avciMotor');
  if (!el) return;
  el.textContent = YP.token('a').yaklasik
    ? '≈ Hızlı tahmin kullanılıyor; kesin sayaç internetten yükleniyor…'
    : '✓ Gerçek tokenizer (o200k_base) yüklendi — sayımlar kesin.';
}

/* Gerçek tokenizer geç gelirse bütün sayımları tazele */
window.addEventListener('token-hazir', function () {
  motorNotu();
  kutular.forEach(ciz);
});

motorNotu();

})();
