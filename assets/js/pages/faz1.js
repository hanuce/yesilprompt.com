/* =========================================================
   GİRİŞ  (atolye.html)
   ---------------------------------------------------------
   İki tahmin kartını core/tahmin.js kurar. Bu dosyanın işi:
     1) Tartışma kartlarını basmak (yalnızca okunur — kutu yok)
     2) Günlük yapay zekâ ayak izi ölçeri çalıştırmak

   ❌ Öğrenci cevabı toplanmaz, kaydedilmez, hiçbir yere gönderilmez.
      Tartışma sözlüdür; takım eşleştirmesini eğitmen sınıfta yapar.

   İçerik: site.config.js → TARTISMALAR
   Enerji: models.config.js → TEXT_MODELS, DUSUNME_MODU, ARAMA_WH
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

  /* ---------- 1) TARTIŞMA KARTLARI ---------- */
  function tartismalar() {
    var host = $('tartismaKartlari'); if (!host) return;
    host.innerHTML = (window.TARTISMALAR || []).map(function (t, i) {
      return '<div class="card card-top q-card">' +
        '<span class="q-num">' + (i + 1) + '</span>' +
        '<span class="q-txt text-soft">' + esc(t) + '</span>' +
      '</div>';
    }).join('');
  }

  /* ---------- 2) GÜNLÜK AYAK İZİ ÖLÇER ---------- */
  var ayak = { model: 'chatgpt', sorgu: 20, arama: 30, mod: 'hizli', cikti: 250 };

  var ROZET = {
    resmi:    ['tag-resmi', 'resmî'],
    beyan:    ['tag-beyan', 'şirket beyanı'],
    olculdu:  ['tag-olculdu', 'bağımsız ölçüm'],
    tahmini:  ['tag-tahmini', 'bağımsız tahmin']
  };

  /* Top 5 her zaman en üstte, ayrı bir grupta durur. */
  function modelSecenekleri() {
    var M = window.TEXT_MODELS || {};
    var top = [], diger = [];
    Object.keys(M).forEach(function (k) {
      var o = '<option value="' + k + '">' + esc(M[k].label) + '</option>';
      (M[k].top5 ? top : diger).push(o);
    });
    return '<optgroup label="⭐ En çok kullanılan 5">' + top.join('') + '</optgroup>' +
           (diger.length ? '<optgroup label="Diğer araçlar">' + diger.join('') + '</optgroup>' : '');
  }

  function modelNotu() {
    var m = (window.TEXT_MODELS || {})[ayak.model]; if (!m || !$('ayakModelNot')) return;
    var r = ROZET[m.seffaflik] || ROZET.tahmini;
    $('ayakModelNot').innerHTML = '<span class="tag ' + r[0] + '">' + r[1] + '</span> ' + esc(m.src || '');
  }

  function hesapla() {
    var m = (window.TEXT_MODELS || {})[ayak.model];
    var D = (window.DUSUNME_MODU || {})[ayak.mod] || { carpan: 1 };
    if (!m) return null;

    /* Tek sorgu: girdi (kısa bir soru ~30 token) + çıktı, düşünme çarpanıyla */
    var girdiWh = 30 / 1000 * m.inWh1k;
    var ciktiWh = ayak.cikti / 1000 * m.outWh1k;
    var sorguWh = (girdiWh + ciktiWh) * D.carpan;

    var llmWh   = sorguWh * ayak.sorgu;
    var aramaWh = (window.ARAMA_WH || 0.30) * ayak.arama;
    var gunluk  = llmWh + aramaWh;

    return { sorguWh: sorguWh, llmWh: llmWh, aramaWh: aramaWh, gunluk: gunluk, yillik: gunluk * 365 };
  }

  function ciz() {
    var r = hesapla(); if (!r || !$('ayakHuman')) return;
    var U_ = U(), e = U_.equivalents(r.gunluk), ey = U_.equivalents(r.yillik);

    $('ayakHuman').textContent = U_.phoneText(r.gunluk);
    $('ayakWater').textContent = '💧 ' + U_.waterText(e.waterMl);
    $('ayakTech').textContent  = 'teknik: ' + U_.fmt(r.gunluk, 2) + ' Wh/gün  ·  tek sorgu ' +
      U_.fmt(r.sorguWh, 3) + ' Wh';

    var tiles = [
      { icon: '⚡', v: U_.fmt(r.gunluk, 2), l: 'Wh / gün' },
      { icon: '💧', v: U_.fmt(e.waterMl, 1), l: 'mL su / gün' },
      { icon: '🏭', v: U_.fmt(e.co2g, 2), l: 'g CO₂ / gün' }
    ];
    $('ayakMetrics').innerHTML = tiles.map(function (t) {
      return '<div class="metric"><div class="icon">' + t.icon + '</div>' +
             '<div class="v">' + t.v + '</div><div class="l">' + t.l + '</div></div>';
    }).join('');

    $('ayakYillik').innerHTML =
      '<div class="skor-satir"><span>⚡ Enerji</span><b>' + U_.fmt(r.yillik / 1000, 1) + ' kWh</b></div>' +
      '<div class="skor-satir"><span>📱 Telefon şarjı</span><b>' + U_.fmt(ey.phones, 0) + ' şarj</b></div>' +
      '<div class="skor-satir"><span>💧 Su</span><b>' + U_.fmt(ey.waterMl / 1000, 1) + ' litre</b></div>' +
      '<div class="skor-satir"><span>🏭 Karbon</span><b>' + U_.fmt(ey.co2g / 1000, 2) + ' kg CO₂</b></div>';

    $('ayakDokum').innerHTML =
      '<div class="text-mute mb">Günlük döküm</div>' +
      '<div class="breakdown-row"><span class="text-soft">' + ayak.sorgu + ' yapay zekâ sorgusu</span>' +
        '<span class="text-green">' + U_.fmt(r.llmWh, 2) + ' Wh</span></div>' +
      '<div class="breakdown-row"><span class="text-soft">' + ayak.arama + ' Google araması</span>' +
        '<span class="text-green">' + U_.fmt(r.aramaWh, 2) + ' Wh</span></div>';
  }

  function ayakKur() {
    if (!$('ayakModel')) return;

    $('ayakModel').innerHTML = modelSecenekleri();
    ayak.model = $('ayakModel').value;

    var D = window.DUSUNME_MODU || {};
    $('ayakMod').innerHTML = Object.keys(D).map(function (k) {
      return '<button data-mod="' + k + '" class="' + (k === ayak.mod ? 'active' : '') + '">' +
        esc(D[k].label) + '</button>';
    }).join('');

    function modNotu() {
      if ($('ayakModNot')) $('ayakModNot').textContent = (D[ayak.mod] || {}).not || '';
    }

    $('ayakModel').addEventListener('change', function () {
      ayak.model = this.value; modelNotu(); ciz();
    });
    $('ayakSorgu').addEventListener('input', function () {
      ayak.sorgu = +this.value; $('ayakSorguLbl').textContent = this.value; ciz();
    });
    $('ayakArama').addEventListener('input', function () {
      ayak.arama = +this.value; $('ayakAramaLbl').textContent = this.value; ciz();
    });
    $('ayakCikti').addEventListener('input', function () {
      ayak.cikti = +this.value; $('ayakCiktiLbl').textContent = this.value; ciz();
    });
    $('ayakMod').addEventListener('click', function (e) {
      var b = e.target.closest('[data-mod]'); if (!b) return;
      ayak.mod = b.dataset.mod;
      this.querySelectorAll('button').forEach(function (x) { x.classList.toggle('active', x === b); });
      modNotu(); ciz();
    });

    modelNotu(); modNotu(); ciz();
  }

  function init() { tartismalar(); ayakKur(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
