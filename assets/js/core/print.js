/* Yazdır butonu (#printBtn) → tarayıcı yazdırma penceresi. */
(function () {
  function init() {
    const b = document.getElementById('printBtn');
    if (b) b.addEventListener('click', () => window.print());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
