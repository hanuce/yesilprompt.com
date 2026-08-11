/* =========================================================
   FAZ 4 · YEŞİL PROMPT  (prompt-muhendisligi.html)
   ---------------------------------------------------------
   İki slayt:
     1) Yeşil Prompt Kuralları — sekiz kural, her biri bir
        maliyet kalemine bağlı
     2) Sergi için resim üretimi — reçete + taslak kutusu +
        gerçek araç bağlantıları + Ölç fazına yönlendirme

   ❌ Taslak kutusu KAYDEDİLMEZ (SITE_RULES 2c).

   İçerik: config/yesil-prompt.config.js
   Araç listesi: config/imagetools.config.js (TEK kaynak —
   buraya ayrı bir liste yazılmaz, yoksa iki farklı gerçek olur)
   ========================================================= */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var U = function () { return window.Units; };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------- 1) YEŞİL PROMPT KURALLARI ---------- */
  function kurallar() {
    var host = $('kurallarKartlari'); if (!host) return;
    host.innerHTML = (window.KURALLAR || []).map(function (k) {
      return '<div class="card card-top kural-kart">' +
        '<div class="between">' +
          '<span class="rule-num">' + k.no + '</span>' +
          '<span class="big-emoji">' + k.ikon + '</span>' +
        '</div>' +
        '<h3 class="mt-0">' + esc(k.ad) + '</h3>' +
        '<span class="tag tag-meas">azaltır: ' + esc(k.azaltir) + '</span>' +
        '<p class="text-soft mt mb-0">' + esc(k.ornek) + '</p>' +
      '</div>';
    }).join('');

    if ($('kurallarOzet')) $('kurallarOzet').innerHTML = window.KURALLAR_OZET || '';
  }

  /* ---------- 2) ÜRETİM ADIMLARI ---------- */
  function adimlar() {
    var host = $('uretimAdimlari'); if (!host) return;
    host.innerHTML = (window.URETIM_ADIMLARI || []).map(function (a) {
      return '<div class="card card-top">' +
        '<span class="rule-num">' + a.no + '</span>' +
        '<div class="big-emoji mt">' + a.ikon + '</div>' +
        '<h3 class="m-0">' + esc(a.b) + '</h3>' +
        '<p class="text-soft m-0">' + a.m + '</p>' +
      '</div>';
    }).join('');
    if ($('uretimUyari')) $('uretimUyari').innerHTML = window.URETIM_UYARI || '';
  }

  /* ---------- 3) REÇETE + TASLAK ----------
     Reçete satırları promptun parçalarını hatırlatır.
     Taslak kutusu yalnızca token sayar; kaydedilmez. */
  function recete() {
    var host = $('receteTablo'); if (!host) return;
    host.innerHTML =
      '<thead><tr><th>Parça</th><th>Ne yazacaksın?</th><th>Örnek</th></tr></thead><tbody>' +
      (window.RECETE || []).map(function (r) {
        return '<tr>' +
          '<td><b>' + esc(r.p) + '</b></td>' +
          '<td class="src">' + esc(r.o) + '</td>' +
          '<td class="text-soft">' + esc(r.ornek) + '</td>' +
        '</tr>';
      }).join('') + '</tbody>';
  }

  function taslakCiz() {
    var el = $('taslak'); if (!el) return;
    var metin = el.value.trim();
    $('taslakTok').textContent = metin ? window.tokenize(metin).count : 0;

    /* Kaç parça yazılmış? Virgül/noktalı virgülle ayrılmış öbekler sayılır.
       Kesin bir ölçüm değil — yalnızca "reçeteyi hatırla" dürtüsü. */
    var parca = metin
      ? metin.split(/[,;·\n]+/).filter(function (s) { return s.trim().length > 2; }).length
      : 0;
    var toplam = (window.RECETE || []).length;
    $('taslakRecete').textContent = Math.min(parca, toplam) + ' / ' + toplam;
  }

  function taslakKur() {
    var el = $('taslak'); if (!el) return;
    el.addEventListener('input', taslakCiz);
    taslakCiz();
  }

  /* ---------- 4) ARAÇ BAĞLANTILARI ---------- */
  function araclar() {
    var host = $('uretimAraclari'); if (!host) return;
    var T = (window.IMAGE_TOOLS || []).slice();
    var U_ = U();

    /* Önce gerçekten ücretsiz olanlar, sonra en çok kullanılanlar,
       sonra enerjisi düşük olanlar — öğrenci en erişilebiliri görsün. */
    T.sort(function (a, b) {
      if (!!b.free !== !!a.free) return b.free ? 1 : -1;
      if (!!b.top5 !== !!a.top5) return b.top5 ? 1 : -1;
      return a.wh - b.wh;
    });

    host.innerHTML = T.map(function (t) {
      var rozet = (t.free ? '<span class="tag tag-free">ücretsiz</span>' : '') +
        (t.basis === 'olcum'
          ? '<span class="tag tag-meas">ölçüm</span>'
          : '<span class="tag tag-est">tahmin</span>');
      return '<a class="arac-satir" href="' + esc(t.url) + '" target="_blank" rel="noopener">' +
        '<span class="arac-ad">' + esc(t.label) + ' <span class="ext">↗</span>' +
          '<span class="src"> · ' + esc(t.org) + '</span></span>' +
        '<span class="arac-rozet">' + rozet + '</span>' +
        '<span class="arac-wh">' + (U_ ? U_.fmt(t.wh, 2) : t.wh) + ' Wh</span>' +
      '</a>';
    }).join('');
  }

  function init() {
    kurallar(); adimlar(); recete(); taslakKur(); araclar();
    window.addEventListener('tokenizer-ready', taslakCiz);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
