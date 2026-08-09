/* =========================================================
   HESAPLAYICI sayfası
   ---------------------------------------------------------
   Öğrenci kendi ürettiği görselin tahmini maliyetini hesaplar:
     model + görüntü boyutu + deneme sayısı  →  Wh · mL su · g CO₂
   Çıktı, sergide yayımlanan damganın aynısıdır; ayrıca galeriye
   yapıştırılabilir hazır bir config satırı üretir.

   Veriler: config/imagetools.config.js (IMAGE_TOOLS, IMAGE_SIZES)
   Çeviriler: core/units.js (Wh → şarj / su / CO₂)
   ========================================================= */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var U = function () { return window.Units; };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
  }

  /* Tarih: config'e ISO (2026-03-14) yazılır, ekranda 14.03.2026 görünür —
     galerideki gösterimin aynısı (bkz. pages/anasayfa.js → fmtDate). */
  function fmtDate(v) {
    var s = String(v == null ? '' : v).trim();
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    return m ? m[3] + '.' + m[2] + '.' + m[1] : s;
  }

  /* Bugünün tarihi — yerel saate göre (toISOString UTC'ye kaydırır) */
  function todayISO() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  var TOOLS = window.IMAGE_TOOLS || [];
  var SIZES = window.IMAGE_SIZES || [];
  var BASE_PX = 1024 * 1024;          // temel alınan görüntü alanı

  var state = { tool: null, size: null, attempts: 1, variants: 1 };

  function toolByKey(k) {
    for (var i = 0; i < TOOLS.length; i++) if (TOOLS[i].key === k) return TOOLS[i];
    return null;
  }

  /* ---------- Açılır listeleri doldur ---------- */
  function fillSelects() {
    var sel = $('toolSel');
    if (sel) {
      var groups = window.IMAGE_TOOLS_GROUPS || [];
      sel.innerHTML = groups.map(function (g) {
        var rows = TOOLS.filter(function (t) { return t.group === g; });
        if (!rows.length) return '';
        return '<optgroup label="' + esc(g) + '">' + rows.map(function (t) {
          return '<option value="' + esc(t.key) + '">' + esc(t.label) +
                 ' — ' + t.wh.toLocaleString('tr-TR') + ' Wh' +
                 (t.basis === 'tahmin' ? ' (tahmin)' : '') + '</option>';
        }).join('') + '</optgroup>';
      }).join('');
      // Varsayılan: ölçümü olan, verimli bir açık model
      sel.value = toolByKey('flux-schnell') ? 'flux-schnell' : (TOOLS[0] && TOOLS[0].key);
      state.tool = toolByKey(sel.value);
    }

    var sz = $('sizeSel');
    if (sz) {
      sz.innerHTML = SIZES.map(function (s, i) {
        return '<option value="' + i + '">' + esc(s.label) + '</option>';
      }).join('');
      var def = 2 < SIZES.length ? 2 : 0;      // 1024×1024
      sz.value = String(def);
      state.size = SIZES[def];
    }
  }

  /* ---------- Hesap ----------
     Toplam = Temel(Wh) × (piksel ÷ 1024²) × denemedeki görsel × deneme
     perImage = tek bir görselin enerjisi
     perRun   = bir "üret" tıklamasının enerjisi (alternatifler dahil) */
  function compute() {
    var t = state.tool, s = state.size;
    if (!t || !s) return null;
    var scale = (s.w * s.h) / BASE_PX;
    var perImage = t.wh * scale;
    var perRun = perImage * state.variants;
    return {
      perImage: perImage,
      perRun: perRun,
      total: perRun * state.attempts,
      scale: scale
    };
  }

  /* ---------- Seçilen aracın notu ---------- */
  function renderToolNote() {
    var t = state.tool, host = $('toolNote');
    if (!t || !host) return;
    var tags = '';
    if (t.free) tags += '<span class="tag tag-free">ücretsiz</span> ';
    if (t.open) tags += '<span class="tag tag-open">açık</span> ';
    tags += t.basis === 'olcum'
      ? '<span class="tag tag-meas">ölçüm</span>'
      : '<span class="tag tag-est">tahmin</span>';

    var link = t.url
      ? ' · <a href="' + esc(t.url) + '" target="_blank" rel="noopener">aracı aç ↗</a>'
      : '';

    host.innerHTML = tags + '<br>' + esc(t.org) +
      (t.steps ? ' · ~' + t.steps + ' difüzyon adımı' : '') +
      '<br>' + esc(t.note) +
      '<br><em>Dayanak: ' + esc(t.src) + '</em>' + link;
  }

  /* ---------- Sonuçları çiz ---------- */
  function render() {
    var r = compute(); if (!r) return;
    var U_ = U(); if (!U_) return;
    var e = U_.equivalents(r.total);

    /* Durum rozeti: toplam maliyete göre (uzunluğa değil) */
    var cls = 'green', txt = '🌱 Verimli';
    if (r.total > 8) { cls = 'red'; txt = '🔴 Yüksek maliyet'; }
    else if (r.total > 3) { cls = 'amber'; txt = '⚠️ Orta maliyet'; }
    $('status').className = 'status ' + cls;
    $('status').textContent = txt;

    /* Eşdeğer hep telefon şarjı cinsinden — sergideki damgayla aynı dil */
    $('human').textContent = U_.phoneText(r.total);
    $('tech').textContent = 'teknik: ' + U_.fmt(r.total, 2) + ' Wh  ·  tek görsel ' +
      U_.fmt(r.perImage, 2) + ' Wh × ' + state.variants + ' görsel × ' +
      state.attempts + ' deneme';

    var tiles = [
      { icon: '⚡', v: U_.fmt(r.total, 2), l: 'Wh enerji' },
      { icon: '💧', v: U_.fmt(e.waterMl, 1), l: 'mL su' },
      { icon: '🏭', v: U_.fmt(e.co2g, 2), l: 'g CO₂' },
      { icon: '📱', v: U_.fmt(e.phones, 2), l: 'telefon şarjı' },
      { icon: '💡', v: U_.dur(e.ledMin), l: 'LED ampul' },
      { icon: '📺', v: U_.dur(e.videoMin), l: 'video izleme' }
    ];
    $('metrics').innerHTML = tiles.map(function (t) {
      return '<div class="metric"><div class="icon">' + t.icon + '</div>' +
             '<div class="v">' + t.v + '</div><div class="l">' + t.l + '</div></div>';
    }).join('');

    /* Sergideki damganın birebir önizlemesi */
    var dateVal = ($('dateIn') && $('dateIn').value) || '';
    var chips = [
      ['🧩', state.tool.label],
      ['🔁', '×' + state.attempts],
      ['⚡', U_.fmt(r.total, 2) + ' Wh'],
      ['💧', U_.fmt(e.waterMl, 1) + ' mL'],
      ['🏭', U_.fmt(e.co2g, 2) + ' g CO₂'],
      ['📱', U_.phoneText(r.total)]
    ];
    if (state.variants > 1) chips.splice(2, 0, ['🖼️', state.variants + ' görsel']);
    /* Tarih en başa — sergideki çip sırasıyla aynı */
    if (dateVal) chips.unshift(['📅', fmtDate(dateVal)]);
    $('stampPreview').innerHTML = chips.map(function (c) {
      return '<span class="stamp-chip"><b>' + c[0] + '</b>' + esc(c[1]) + '</span>';
    }).join('');

    /* Döküm */
    $('breakdown').innerHTML =
      '<div class="text-mute mb">Maliyet dökümü</div>' +
      '<div class="breakdown-row"><span class="text-soft">Temel (1024×1024)</span>' +
        '<span class="text-green">' + U_.fmt(state.tool.wh, 2) + ' Wh</span></div>' +
      '<div class="breakdown-row"><span class="text-soft">Boyut çarpanı (' +
        state.size.w + '×' + state.size.h + ')</span>' +
        '<span class="text-green">×' + U_.fmt(r.scale, 2) + '</span></div>' +
      '<div class="breakdown-row"><span class="text-soft">Denemedeki görsel sayısı</span>' +
        '<span class="text-green">×' + state.variants + '</span></div>' +
      '<div class="breakdown-row"><span class="text-soft">Deneme sayısı</span>' +
        '<span class="text-green">×' + state.attempts + '</span></div>';

    $('pxNote').textContent = U_.fmt(state.size.w * state.size.h / 1e6, 2) + ' MP';

    renderStampCode(r, U_);
  }

  /* ---------- Galeriye yapıştırılacak hazır satır ---------- */
  function renderStampCode(r, U_) {
    var host = $('stampCode'); if (!host) return;
    var title = ($('titleIn') && $('titleIn').value.trim()) || 'Eser adı';
    var by = ($('byIn') && $('byIn').value.trim()) || '';
    var date = ($('dateIn') && $('dateIn').value) || '';
    var prompt = ($('promptIn') && $('promptIn').value.trim()) || '';

    /* Tek tırnak içinde duracağı için tek tırnakları kaçır */
    function q(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }

    /* wh = TEK GÖRSELİN enerjisi. Galeri toplamı
       wh × variants × attempts olarak kendisi hesaplar. */
    var perImage = +(r.perImage).toFixed(2);
    var line =
      "{ title: '" + q(title) + "', by: '" + q(by) + "', date: '" + q(date) + "',\n" +
      "  img: 'assets/img/galeri/DOSYA_ADI.png', ph: 'ph-a', emoji: '🌿',\n" +
      "  prompt: '" + q(prompt) + "',\n" +
      "  model: '" + q(state.tool.label) + "', attempts: " + state.attempts +
      ", variants: " + state.variants + ", wh: " + perImage + " },";

    host.textContent = line;
    host.dataset.raw = line;
  }

  /* ---------- Prompt notu (token sayısı + uyarı) ---------- */
  function renderPromptNote() {
    var host = $('promptNote'); if (!host) return;
    var txt = ($('promptIn') && $('promptIn').value) || '';
    var n = window.tokenize ? window.tokenize(txt).count : 0;
    host.innerHTML = 'Prompt: <b class="text-green">' + n + '</b> token · ' +
      'Görselde prompt uzunluğunun enerjiye etkisi <b>ihmal edilebilir</b> — ' +
      'asıl maliyet difüzyon adımlarındadır. Ama net prompt, deneme sayısını düşürür.';
  }

  /* ---------- Araç karşılaştırma tablosu ---------- */
  function renderTable() {
    var host = $('toolTable'); if (!host) return;
    var U_ = U();
    var rows = TOOLS.slice().sort(function (a, b) { return a.wh - b.wh; });

    host.innerHTML =
      '<thead><tr><th>Araç</th><th>Sınıf</th><th class="num">Wh</th>' +
      '<th class="num">telefon şarjı</th><th>Dayanak</th></tr></thead><tbody>' +
      rows.map(function (t) {
        var e = U_ ? U_.equivalents(t.wh) : null;
        var tags = (t.free ? '<span class="tag tag-free">ücretsiz</span>' : '') +
                   (t.open ? '<span class="tag tag-open">açık</span>' : '');
        /* Araç adı doğrudan kendi sayfasına gider — öğrenci hangi
           modelden söz edildiğini tek tıkla görebilsin. */
        var name = t.url
          ? '<a href="' + esc(t.url) + '" target="_blank" rel="noopener">' +
              esc(t.label) + ' <span class="ext">↗</span></a>'
          : esc(t.label);
        return '<tr>' +
          '<td><b>' + name + '</b><div class="src">' + esc(t.org) + ' ' + tags + '</div></td>' +
          '<td class="src">' + esc(t.group) + '</td>' +
          '<td class="num text-green"><b>' + (U_ ? U_.fmt(t.wh, 2) : t.wh) + '</b></td>' +
          '<td class="num">' + (e ? U_.fmt(e.phones, 2) : '—') + '</td>' +
          '<td>' + (t.basis === 'olcum'
              ? '<span class="tag tag-meas">ölçüm</span>'
              : '<span class="tag tag-est">tahmin</span>') +
            '<div class="src">' + esc(t.src) + '</div></td>' +
        '</tr>';
      }).join('') + '</tbody>';
  }

  /* ---------- Kopyala ---------- */
  function wireCopy() {
    var btn = $('copyBtn'); if (!btn) return;
    btn.addEventListener('click', function () {
      var code = $('stampCode');
      var text = (code && code.dataset.raw) || '';
      var done = function () {
        btn.textContent = '✅ Kopyalandı';
        setTimeout(function () { btn.textContent = '📋 Kopyala'; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }

      function fallback() {
        // Pano izni yoksa: metni seç, kullanıcı Ctrl+C yapsın
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(code);
        sel.removeAllRanges(); sel.addRange(range);
        btn.textContent = 'Ctrl+C ile kopyala';
        setTimeout(function () { btn.textContent = '📋 Kopyala'; }, 2600);
      }
    });
  }

  /* ---------- Bağlantılar ---------- */
  function wire() {
    if (!$('toolSel')) return;

    $('toolSel').addEventListener('change', function (e) {
      state.tool = toolByKey(e.target.value);
      renderToolNote(); render();
    });
    $('sizeSel').addEventListener('change', function (e) {
      state.size = SIZES[+e.target.value]; render();
    });
    $('variants').addEventListener('input', function (e) {
      state.variants = +e.target.value;
      $('varLbl').textContent = e.target.value;
      render();
    });
    $('attempts').addEventListener('input', function (e) {
      state.attempts = +e.target.value;
      $('attLbl').textContent = e.target.value;
      render();
    });
    $('promptIn').addEventListener('input', function () { renderPromptNote(); render(); });
    $('titleIn').addEventListener('input', render);
    $('byIn').addEventListener('input', render);
    if ($('dateIn')) {
      $('dateIn').value = todayISO();          // varsayılan: bugün
      $('dateIn').addEventListener('change', render);
    }

    wireCopy();
  }

  function init() {
    if (!TOOLS.length) return;
    fillSelects();
    wire();
    renderToolNote();
    renderPromptNote();
    renderTable();
    render();
    // Gerçek tokenizer CDN'den gelince prompt token sayısını tazele
    window.addEventListener('tokenizer-ready', renderPromptNote);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
