/* =========================================================
   YEŞİL PROMPT RESİM SERGİSİ — kürasyonlu galeri
   Öğeler config/site.config.js → GALLERY dizisinden gelir.
   Resim yoksa şık bir degrade placeholder gösterilir.
   ========================================================= */
(function () {
  const $ = (id) => document.getElementById(id);
  const U = () => window.Units;
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  function stamp(item) {
    const U_ = U();
    const total = (item.wh || 0) * (item.attempts || 1);
    const e = U_ ? U_.equivalents(total) : null;
    const water = e ? U_.fmt(e.waterMl, 1) + ' mL su' : '';
    const human = U_ ? U_.human(total) : '';
    return (
      '<b>Prompt:</b> ' + esc(item.prompt) + '<br>' +
      '<b>Model:</b> ' + esc(item.model) + ' · <b>Deneme:</b> ×' + (item.attempts || 1) + '<br>' +
      '<b>~' + (U_ ? U_.fmt(total, 2) : total) + ' Wh</b> · ' + water + ' · ' + human
    );
  }

  function render() {
    const host = $('gallery'); if (!host) return;
    const items = window.GALLERY || [];
    if (!items.length) {
      host.innerHTML = '<div class="gallery-empty">Henüz eser eklenmedi. Öğrenci eserleri için assets/img/galeri/ klasörüne resim ekle.</div>';
      return;
    }
    host.innerHTML = items.map((it, i) => {
      const media = it.img
        ? '<img class="gallery-img" src="' + esc(it.img) + '" alt="' + esc(it.title) + '">'
        : '<div class="ph ' + (it.ph || 'ph-a') + '">' + (it.emoji || '🌿') + '</div>';
      return (
        '<figure class="gallery-item gallery-figure">' +
          media +
          '<figcaption class="gallery-cap">' +
            '<div class="gallery-title">' + esc(it.title) + '</div>' +
            '<div class="gallery-stamp">' + stamp(it) + '</div>' +
          '</figcaption>' +
        '</figure>'
      );
    }).join('');

    const c = $('galleryCount');
    if (c) c.textContent = items.length;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
