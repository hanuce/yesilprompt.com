/* =========================================================
   GİRİŞ sayfası — "Görünmeyen Buzdağı" karbon barları
   Karşılaştırma satırlarını buradan düzenleyebilirsin.
   ========================================================= */
(function () {
  // g = gram CO₂ · color = bar rengi
  const ROWS = [
    { label: '1 metin sorusu (YZ)',  g: 0.03,  color: 'var(--leaf)' },
    { label: '1 görsel üretimi (YZ)',g: 0.19,  color: 'var(--water)' },
    { label: '1 telefon şarjı',      g: 5.5,   color: 'var(--green-600)' },
    { label: '1 kutu çikolata (1kg)',g: 19000, color: 'var(--amber)' }
  ];

  function render() {
    const host = document.getElementById('buzdagiBars');
    if (!host) return;
    const max = Math.max.apply(null, ROWS.map(r => r.g));
    host.innerHTML = ROWS.map(r => {
      const w = Math.max(3, (Math.log10(r.g + 1) / Math.log10(max + 1)) * 100);
      const val = window.Units ? window.Units.fmt(r.g, 2) : r.g;
      return (
        '<div style="margin-bottom:.9rem">' +
          '<div style="display:flex; justify-content:space-between; margin-bottom:.3rem">' +
            '<span class="text-soft">' + r.label + '</span>' +
            '<span class="text-mute" style="font-size:.85rem">' + val + ' g CO₂</span>' +
          '</div>' +
          '<div style="height:12px; border-radius:999px; background:var(--mint-100); overflow:hidden">' +
            '<span style="display:block; height:100%; width:' + w + '%; background:' + r.color + '; border-radius:999px"></span>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
