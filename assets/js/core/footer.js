/* =========================================================
   ORTAK FOOTER  (sergi hariç her sayfada)
   ---------------------------------------------------------
   NEDEN SLAYT OLARAK EKLENİYOR?
   Atölye sayfalarında `.fp-root` sabit konumludur (position: fixed)
   ve ekranı tamamen kaplar; gövdenin sonuna konan bir <footer>
   hiçbir zaman görünmez. Bu yüzden footer, `.fp-track`ın SON
   SLAYTI olarak eklenir — slayt motoru onu kendiliğinden sayar,
   noktası ve oku otomatik oluşur.

   SIRA ÖNEMLİ: bu dosya `core/fullpage.js`ten ÖNCE yüklenmelidir;
   yoksa slayt motoru footer'ı görmez.

   İçerik: config/site.config.js → FOOTER (+ KUNYE)
   Görünüm: css/style.css → 18) FOOTER
   ========================================================= */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
  }

  /* "© 2026" ya da yıl ilerlediyse "© 2026–2027" */
  function years(start) {
    var now = new Date().getFullYear();
    if (!start) return String(now);
    return start < now ? start + '–' + now : String(start);
  }

  function build() {
    var track = document.querySelector('.fp-track');
    if (!track) return;                 // sergi (index.html) footer kullanmaz

    var F = window.FOOTER || {};
    var K = window.KUNYE || {};

    /* Künye satırları — boş bırakılanlar hiç basılmaz */
    var rows = [
      ['Program', K.program], ['Proje', K.proje], ['Proje No', K.projeNo],
      ['Atölye', K.atolye], ['Tarih', K.tarih], ['Yer', K.yer],
      ['Yürütücü', K.yurutucu], ['Eğitmen', K.egitmen], ['Hedef kitle', K.hedef]
    ].filter(function (r) { return r[1]; });

    var links = (F.sitemap || []).map(function (l) {
      return '<li><a href="' + esc(l.href) + '">' + esc(l.label) + '</a></li>';
    }).join('');

    var sec = document.createElement('section');
    sec.className = 'fp-section fp-footer';
    sec.id = 'kunye';
    sec.dataset.title = F.title || 'Künye & site haritası';
    sec.innerHTML =
      '<div class="fp-inner">' +
        '<div class="foot-grid">' +

          '<div class="foot-col">' +
            '<a class="foot-mark" href="index.html">🌿 Yeşil Prompt ' +
              '<span>Atölyesi</span></a>' +
            '<p class="foot-about">' + esc(F.about) + '</p>' +
            '<p class="foot-note">' + esc(F.note) + '</p>' +
          '</div>' +

          '<nav class="foot-col" aria-label="Site haritası">' +
            '<h3 class="foot-h">Site haritası</h3>' +
            '<ul class="foot-links">' + links + '</ul>' +
          '</nav>' +

          '<div class="foot-col">' +
            '<h3 class="foot-h">Etkinlik künyesi</h3>' +
            '<dl class="foot-dl">' + rows.map(function (r) {
              return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>';
            }).join('') + '</dl>' +
            (K.not ? '<p class="foot-note">' + esc(K.not) + '</p>' : '') +
          '</div>' +

        '</div>' +

        '<div class="foot-bar">© ' + years(F.startYear) + ' ' + esc(F.owner) + '</div>' +
      '</div>';

    track.appendChild(sec);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
