/* =========================================================
   NAVBAR (paylaşılan) — mobil menü aç/kapa
   Aktif menü: HTML'de ilgili <a> etiketine class="active" ekle.
   ========================================================= */
(function () {
  function init() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
