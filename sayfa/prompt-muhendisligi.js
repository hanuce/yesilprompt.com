/* =========================================================
   YEŞİL PROMPT (prompt-muhendisligi.html) — mekanikler
   ---------------------------------------------------------
   Sayfanın tek mekaniği: taslak kutusundaki promptu ölçmek.
   Kurallar, üretim adımları, reçete ve araç listesi HTML'dedir.

   ❌ Taslak kutusu KAYDEDİLMEZ; sayfa yenilenince kaybolur.
   ========================================================= */
(function () {
'use strict';

var kutu = YP.$('#taslak');
if (!kutu) return;

/* Reçetenin kaç parçasının yazıldığını sayar.
   Kesin bir ölçüm değil — yalnızca "reçeteyi hatırla" dürtüsü:
   virgül, noktalı virgül ve satır sonuyla ayrılmış öbekler sayılır. */
var receteToplam = YP.$$('#receteTablo tbody tr').length;

function ciz() {
  var metin = kutu.value.trim();

  YP.$('#taslakTok').textContent = metin ? YP.token(metin).sayi : 0;

  var parca = metin
    ? metin.split(/[,;·\n]+/).filter(function (s) { return s.trim().length > 2; }).length
    : 0;
  YP.$('#taslakRecete').textContent = Math.min(parca, receteToplam) + ' / ' + receteToplam;
}

kutu.addEventListener('input', ciz);
window.addEventListener('token-hazir', ciz);
ciz();

})();
