/* =========================================================
   FAZ RAYI  (paylaşılan — atölye sayfalarının üst şeridi)
   ---------------------------------------------------------
   Atölye 80 dakikalık, beş fazlı bir akıştır. Düz bir menü bunu
   göstermez; bu ray gösterir: fazlar numaralı ve sıralıdır,
   bulunulan faz vurgulanır.

   ❌ Öğrenci ekranında SÜRE YAZMAZ. Dakika bütçesi yalnızca
   eğitmen şeridindedir (?egitmen=1) — süre eğitmenin işidir,
   öğrencinin üzerinde baskı kurmamalıdır.

   İÇERİK: config/site.config.js → window.FAZLAR
   GÖRÜNÜM: css/style.css → 19) ATÖLYE FAZLARI

   ── EĞİTMEN MODU ───────────────────────────────────────────
   Adres satırına ?egitmen=1 eklenince altta ince bir şerit açılır:
   fazın süresi, geri sayım, ne söyleneceği ve tartışma soruları.
   Mod sekme boyunca hatırlanır (sessionStorage), böylece eğitmen
   her sayfada tekrar yazmak zorunda kalmaz.
   ÖĞRENCİ EKRANINDA BU ŞERİT YOKTUR.

   KULLANIM (HTML): <nav class="nav faz-nav"><div class="wrap"></div></nav>
   ========================================================= */
(function () {
  'use strict';

  var EG_KEY = 'yp.egitmen';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function dosyaAdi() {
    var p = location.pathname.split('/').pop();
    return p || 'index.html';
  }

  function egitmenMi() {
    var q = new URLSearchParams(location.search);
    if (q.get('egitmen') === '1') { try { sessionStorage.setItem(EG_KEY, '1'); } catch (e) {} return true; }
    if (q.get('egitmen') === '0') { try { sessionStorage.removeItem(EG_KEY); } catch (e) {} return false; }
    try { return sessionStorage.getItem(EG_KEY) === '1'; } catch (e) { return false; }
  }

  /* Eğitmen modundayken fazlar arası bağlantılar da modu taşısın */
  function href(h, eg) { return eg ? (h + '?egitmen=1') : h; }

  function ray(F, simdiki, eg) {
    return F.map(function (f, i) {
      var durum = (f.href === simdiki) ? ' active' : '';
      return '<li><a class="faz-step' + durum + '" href="' + esc(href(f.href, eg)) + '">' +
        '<span class="faz-num">' + (i + 1) + '</span>' +
        '<span class="faz-ad">' + esc(f.ad) + '</span>' +
      '</a></li>';
    }).join('');
  }

  function ekLinkler(E, eg) {
    return (E || []).map(function (l) {
      return '<li><a class="faz-ek-link" href="' + esc(href(l.href, eg)) + '">' + esc(l.label) + '</a></li>';
    }).join('');
  }

  /* --- Eğitmen şeridi: süre + ne söylenecek + tartışma soruları --- */
  function egitmenSeridi(f) {
    var not = f.egitmen || {};
    var sorular = (not.sorular || []).map(function (s) {
      return '<li>' + esc(s) + '</li>';
    }).join('');

    var bar = document.createElement('div');
    bar.className = 'egitmen-bar';
    bar.innerHTML =
      '<div class="eg-sol">' +
        '<span class="eg-rozet">EĞİTMEN</span>' +
        '<b>' + esc(f.ad) + '</b>' +
        '<span class="eg-sure">' + esc(f.sure) + ' dk</span>' +
      '</div>' +
      '<div class="eg-orta">' +
        (not.soyle ? '<p class="eg-soyle">' + esc(not.soyle) + '</p>' : '') +
        (sorular ? '<ul class="eg-sorular">' + sorular + '</ul>' : '') +
      '</div>' +
      '<div class="eg-sag">' +
        '<span class="eg-saat" id="egSaat">' + esc(f.sure) + ':00</span>' +
        '<button class="btn btn-ghost btn-sm" id="egBasla" type="button">▶ Başlat</button>' +
        '<button class="btn btn-ghost btn-sm" id="egKapat" type="button" aria-label="Eğitmen şeridini kapat">✕</button>' +
      '</div>';
    document.body.appendChild(bar);
    document.body.classList.add('eg-on');

    /* Geri sayım — süre yönetimi eğitmenin en çok zorlandığı şey */
    var kalan = f.sure * 60, timer = null;
    var saat = bar.querySelector('#egSaat');
    function yaz() {
      var d = Math.floor(Math.abs(kalan) / 60), s = Math.abs(kalan) % 60;
      saat.textContent = (kalan < 0 ? '-' : '') + d + ':' + (s < 10 ? '0' : '') + s;
      saat.classList.toggle('eg-bitti', kalan <= 0);
    }
    bar.querySelector('#egBasla').addEventListener('click', function () {
      if (timer) { clearInterval(timer); timer = null; this.textContent = '▶ Devam'; return; }
      this.textContent = '⏸ Durdur';
      timer = setInterval(function () { kalan--; yaz(); }, 1000);
    });
    bar.querySelector('#egKapat').addEventListener('click', function () {
      if (timer) clearInterval(timer);
      try { sessionStorage.removeItem(EG_KEY); } catch (e) {}
      bar.remove();
      document.body.classList.remove('eg-on');
    });
    yaz();
  }

  function init() {
    var host = document.querySelector('.faz-nav .wrap');
    if (!host) return;

    var F = window.FAZLAR || [];
    var E = window.FAZ_EK || [];
    var eg = egitmenMi();
    var simdiki = dosyaAdi();

    host.innerHTML =
      '<a class="brand" href="index.html"><span class="mark">🌿</span> Yeşil <span class="text-grad">Prompt</span></a>' +
      '<button class="nav-toggle" aria-label="Menü">☰</button>' +
      '<ol class="nav-links faz-rail">' + ray(F, simdiki, eg) +
        '<li class="faz-ayrac" aria-hidden="true"></li>' + ekLinkler(E, eg) +
      '</ol>';

    var f = F.filter(function (x) { return x.href === simdiki; })[0];
    if (eg && f) egitmenSeridi(f);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
