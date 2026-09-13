/* =========================================================
   MERAKLISINA (modeller.html) — mekanikler
   ---------------------------------------------------------
   Sayfanın neredeyse tamamı düz HTML'dir. Burada üç iş var:
     1) Eğitim enerjisi kartlarındaki eşdeğerleri hesaplamak
        (Wh → milyon telefon şarjı · baraj üretimi)
     2) Şirket değerleri grafiğini çizmek
     3) Türkçe / İngilizce token karşılaştırma tablosu

   ❌ Eklenen kelime çiftleri oturum içidir; kaydedilmez.
   ========================================================= */
(function () {
'use strict';

var $ = YP.$, $$ = YP.$$, esc = YP.esc;


/* ===== 1) EĞİTİM ENERJİSİ KARTLARI ===============================
   Bu enerjiler telefon şarjıyla anlamsızlaşacak kadar büyüktür;
   bu yüzden burada AYRICA baraj cümlesi kullanılır. */
$$('.egitim-kart').forEach(function (kart) {
  var wh = YP.nitelik(kart, 'wh', 0);
  $('.egitim-sarj', kart).textContent  = YP.sayi(wh / YP.K.telefonSarjiWh / 1e6, 1) + ' milyon';
  $('.egitim-baraj', kart).textContent = YP.baraj(wh);
});


/* ===== 2) ŞİRKET DEĞERLERİ GRAFİĞİ ===============================
   Çizimi ortak.js yapar (8. bölüm); veri HTML'deki
   <script id="cagVerisi"> bloğundadır. */
YP.cizgiGrafik($('#eraChart'), YP.veri('cagVerisi'), {
  birim: 'trilyon $',
  aciklama: 'Yapay zekâ şirketlerinin yıllara göre değeri (trilyon dolar)'
});


/* ===== 3) TÜRKÇE / İNGİLİZCE TOKEN TABLOSU =======================
   "Model önce İngilizceye mi çeviriyor?" mitini öğrenci KENDİ
   kelimesiyle ölçerek yıkar. Sayıları gerçek tokenizer verir. */
(function ciftler() {
  var tablo = $('#pairTable tbody');
  if (!tablo) return;

  function say() {
    $$('tr', tablo).forEach(function (satir) {
      var h = $$('td', satir);
      h[1].innerHTML = '<b>' + YP.token(satir.dataset.tr).sayi + '</b>';
      h[3].innerHTML = '<b>' + YP.token(satir.dataset.en).sayi + '</b>';
    });
  }

  $('#pairAdd').addEventListener('click', function () {
    var tr = $('#pairTr').value.trim(), en = $('#pairEn').value.trim();
    if (!tr || !en) return;

    var satir = document.createElement('tr');
    satir.dataset.tr = tr;
    satir.dataset.en = en;
    satir.innerHTML =
      '<td class="text-soft">' + esc(tr) + '</td>' +
      '<td class="num text-green"></td>' +
      '<td class="text-soft">' + esc(en) + '</td>' +
      '<td class="num text-water"></td>';
    tablo.appendChild(satir);

    $('#pairTr').value = '';
    $('#pairEn').value = '';
    say();
  });

  window.addEventListener('token-hazir', say);
  say();
})();

})();
