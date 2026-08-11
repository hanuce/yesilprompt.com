/* =========================================================
   KAYNAKLAR sayfası
   ---------------------------------------------------------
   Materyal havuzunu basar. Kaynakçanın kendisi HTML'de
   statiktir — APA kayıtları yapısal içeriktir, config'e
   taşımak anlamsız olurdu (SITE_RULES 1.3 istisnası).

   İçerik: config/site.config.js → MATERIALS
   ========================================================= */
(function () {
  'use strict';

  function init() {
    var host = document.getElementById('materialsPool');
    if (!host || !window.MATERIALS) return;
    var icon = { dosya: '⬇️', arac: '↗', kaynak: '📖' };
    host.innerHTML = window.MATERIALS.map(function (m) {
      return '<a class="chip" href="' + m.url + '"' +
        (m.download ? ' download' : ' target="_blank" rel="noopener"') + '>' +
        (icon[m.kind] || '•') + ' ' + m.label + '</a>';
    }).join('');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
