/* =========================================================
   TAHMİN KARTI  (paylaşılan bileşen)
   ---------------------------------------------------------
   Ritüel:  soru → öğrenci tahminini yazar → "Cevabı Gör" → gerçek + hesap

   ❌ KİLİT YOKTUR. Öğrenci istediği zaman cevabı açabilir,
      açtıktan sonra tahminini değiştirebilir. Amaç sınav değil,
      merak uyandırmak.
   ❌ VERİ TUTULMAZ. Yazılan hiçbir şey kaydedilmez, hiçbir yere
      gönderilmez, sayfa yenilenince kaybolur.

   KULLANIM (HTML):
     <div class="tahmin" data-tahmin="cikolata"></div>

   İÇERİK: config/tahminler.config.js → window.TAHMINLER
     {
       cikolata: {
         soru:   '…',
         birim:  'telefon şarjı',
         varsayilan: 50,
         gercek: [ { etiket:'⚡ Enerji', deger:'≈ 440 şarj', not:'…' }, … ],
         hesap:  'çok satırlı hesap dökümü (pre içinde basılır)',
         kaynak: 'APA kısaltması'
       }
     }
   ========================================================= */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function kur(host) {
    var anahtar = host.dataset.tahmin;
    var C = (window.TAHMINLER || {})[anahtar];
    if (!C) return;

    var satirlar = (C.gercek || []).map(function (g) {
      return '<div class="tahmin-satir">' +
        '<span class="tahmin-etiket">' + esc(g.etiket) + '</span>' +
        '<span class="tahmin-deger">' + esc(g.deger) + '</span>' +
        (g.not ? '<span class="tahmin-not">' + esc(g.not) + '</span>' : '') +
      '</div>';
    }).join('');

    host.innerHTML =
      '<div class="card card-top tahmin-kart">' +
        '<div class="tahmin-soru">' + esc(C.soru) + '</div>' +
        '<div class="tahmin-giris">' +
          '<input class="field tahmin-in" type="number" inputmode="numeric" ' +
            'min="0" value="' + (C.varsayilan != null ? C.varsayilan : '') + '" ' +
            'aria-label="Tahminin">' +
          '<span class="tahmin-birim">' + esc(C.birim || '') + '</span>' +
          '<button class="btn btn-primary btn-sm tahmin-ac" type="button">👁️ Cevabı Gör</button>' +
        '</div>' +
        '<div class="tahmin-reveal" hidden>' +
          '<div class="tahmin-gercek">' + satirlar + '</div>' +
          (C.hesap ? '<div class="tahmin-hesap"><div class="label">Bu sayı nasıl çıkıyor?</div>' +
                     '<pre class="code-box"><code>' + esc(C.hesap) + '</code></pre></div>' : '') +
          (C.kaynak ? '<p class="src m-0">Kaynak: ' + esc(C.kaynak) + '</p>' : '') +
        '</div>' +
      '</div>';

    var btn = host.querySelector('.tahmin-ac');
    var reveal = host.querySelector('.tahmin-reveal');

    btn.addEventListener('click', function () {
      var acik = !reveal.hidden;
      reveal.hidden = acik;
      btn.textContent = acik ? '👁️ Cevabı Gör' : '🙈 Cevabı Gizle';
    });
  }

  function init() {
    var hepsi = document.querySelectorAll('.tahmin[data-tahmin]');
    Array.prototype.forEach.call(hepsi, kur);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
