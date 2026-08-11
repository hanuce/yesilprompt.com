/* =========================================================
   MODELLER & TARİH sayfası — render mantığı
   İçerik config dosyalarından gelir:
     timeline.config.js   → AI_TIMELINE
     training.config.js   → TRAINING_DATA, DATA_PROJECTS, TRAINING_COSTS
     families.config.js   → MODEL_FAMILIES
     valuations.config.js → AI_ERA
   Not: "Transformer teknolojisi" ve "Model nedir, nasıl eğitilir?"
   slaytları (kod, örnek veri, epoch animasyonu) doğrudan
   modeller.html içinde statik durur; render gerektirmez.
   ========================================================= */
(function () {
  const $ = (id) => document.getElementById(id);
  const slug = (s) => s.toLowerCase().replace(/[^a-z]/g, '');

  /* --- 1) Zaman tüneli --- */
  function renderTimeline() {
    const host = $('timeline'); if (!host || !window.AI_TIMELINE) return;
    host.innerHTML = '<div class="timeline">' + window.AI_TIMELINE.map(t =>
      '<div class="tl-item">' +
        '<div class="tl-year">' + t.year + '</div>' +
        '<div class="tl-body">' +
          '<div class="tl-title">' + t.title + '</div>' +
          '<div class="src mb-0">' + t.by + '</div>' +
          '<p class="text-soft m-0">' + t.body + '</p>' +
        '</div>' +
      '</div>'
    ).join('') + '</div>';
  }

  /* --- 2) Modeller veriyi nereden buluyor (tablo) --- */
  function renderDataMix() {
    const host = $('dataTable'); if (!host || !window.TRAINING_DATA) return;
    const d = window.TRAINING_DATA;
    host.innerHTML =
      '<thead><tr><th>Veri kaynağı</th><th class="num">Boyut</th><th class="num">Pay</th>' +
      '<th class="num">Kaç kez okundu</th></tr></thead><tbody>' +
      d.rows.map(r =>
        '<tr><td><b>' + r.name + '</b><div class="src">' + r.note + '</div></td>' +
        '<td class="num">' + r.size + '</td><td class="num">' + r.share + '</td>' +
        '<td class="num text-green"><b>' + r.reps + '</b></td></tr>'
      ).join('') + '</tbody>';

    const rest = $('dataRest');
    if (rest) rest.textContent = d.restNote;
    const cap = $('dataCaption');
    if (cap) {
      cap.innerHTML = 'Kaynak: ' + d.cite +
        ' · <a href="' + d.url + '" target="_blank" rel="noopener">makaleyi aç ↗</a>';
    }
  }

  /* --- 3) Veri düzenleme / sınıflandırma projeleri --- */
  function renderDataProjects() {
    const host = $('dataProjects'); if (!host || !window.DATA_PROJECTS) return;
    host.innerHTML = window.DATA_PROJECTS.map(p =>
      '<div class="card">' +
        '<div class="between"><h3 class="m-0">' + p.name + '</h3><span class="ref-tag">' + p.year + '</span></div>' +
        '<div class="src mb">' + p.who + '</div>' +
        '<p class="text-soft m-0">' + p.what + '</p>' +
      '</div>'
    ).join('');
  }

  /* --- 4) Eğitim enerjisi kartları --- */
  function renderCosts() {
    const host = $('trainingCards'); if (!host || !window.TRAINING_COSTS) return;
    const U = window.Units;
    host.innerHTML = window.TRAINING_COSTS.map(t => {
      const phones = U ? U.fmt(t.wh / 12 / 1e6, 1) : '?';   // milyon telefon şarjı
      const dam = U ? U.damSentence(t.wh) : '';
      return (
        '<div class="card card-top">' +
          '<h3 class="m-0">' + t.model + '</h3>' +
          '<div class="src mb">' + t.co2 + ' · ' + t.src + '</div>' +
          '<div class="metric mb"><div class="icon">📱</div>' +
            '<div class="v">' + phones + ' milyon</div><div class="l">telefon şarjı kadar</div></div>' +
          '<div class="metric"><div class="icon">🏞️</div>' +
            '<div class="v v-sm">' + dam + '</div><div class="l">eşdeğeri</div></div>' +
          '<p class="src mt mb-0">' + t.extra + '</p>' +
        '</div>'
      );
    }).join('');
  }

  /* --- 5) Model aileleri (ülke + tanıtım) ---
     "Güvenlik & etik" slaytıyla aynı sade kart düzeni:
     üstte bayrak ikonu, başlık, ülke·kurum, kısa açıklama. */
  function renderFamilies() {
    const host = $('families'); if (!host || !window.MODEL_FAMILIES) return;
    host.innerHTML = '<div class="grid cols-3">' + window.MODEL_FAMILIES.map(f =>
      '<div class="card card-top">' +
        '<div class="big-emoji">' + f.flag + '</div>' +
        '<h3 class="m-0">' + f.name + '</h3>' +
        '<div class="src mb">' + f.country + ' · ' + f.org + '</div>' +
        '<p class="text-soft m-0">' + f.blurb + '</p>' +
      '</div>'
    ).join('') + '</div>';
  }

  /* --- 6) Yapay Zeka Çağı: etkiler + değer grafiği + kilometre taşları --- */
  function eraChartSVG(E) {
    const W = 560, H = 320, padL = 40, padR = 14, padT = 16, padB = 34;
    const years = E.years, n = years.length;
    let maxV = 0;
    E.series.forEach(s => s.values.forEach(v => { if (v != null && v > maxV) maxV = v; }));
    const niceMax = Math.max(1, Math.ceil(maxV));
    const x = (i) => padL + (i / (n - 1)) * (W - padL - padR);
    const y = (v) => H - padB - (v / niceMax) * (H - padT - padB);

    let grid = '';
    for (let g = 0; g <= niceMax; g++) {
      const gy = y(g);
      grid += '<line class="era-grid" x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '"></line>';
      grid += '<text class="era-axis" x="' + (padL - 6) + '" y="' + (gy + 3) + '" text-anchor="end">' + g + '</text>';
    }
    let xlab = '';
    years.forEach((yr, i) => {
      xlab += '<text class="era-axis" x="' + x(i) + '" y="' + (H - padB + 16) + '" text-anchor="middle">' + yr + '</text>';
    });
    let lines = '';
    E.series.forEach(s => {
      const cls = 'era-' + (s.key || slug(s.name));
      const pts = [];
      s.values.forEach((v, i) => { if (v != null) pts.push(x(i) + ',' + y(v)); });
      lines += '<polyline class="era-line ' + cls + '" points="' + pts.join(' ') + '"></polyline>';
      s.values.forEach((v, i) => {
        if (v != null) lines += '<circle class="era-dot ' + cls + '" cx="' + x(i) + '" cy="' + y(v) + '" r="3"></circle>';
      });
    });
    const legend = '<div class="era-legend">' + E.series.map(s =>
      '<span class="era-key era-' + (s.key || slug(s.name)) + '">' + s.name + '</span>'
    ).join('') + '</div>';
    return '<svg class="era-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
      'aria-label="YZ şirketlerinin yıllara göre değeri (trilyon dolar)">' +
      grid + xlab + lines + '</svg>' + legend;
  }

  function renderEra() {
    const E = window.AI_ERA; if (!E) return;
    const asOf = $('eraAsOf'); if (asOf) asOf.textContent = E.asOf;

    const ih = $('eraImpacts');
    if (ih) ih.innerHTML = E.impacts.map(p =>
      '<div class="card card-top">' +
        '<div class="big-emoji">' + p.icon + '</div>' +
        '<h3 class="m-0">' + p.area + '</h3>' +
        '<p class="text-soft m-0">' + p.ex + '</p>' +
      '</div>'
    ).join('');

    const ch = $('eraChart');
    if (ch) ch.innerHTML = eraChartSVG(E);
  }


  /* ---------- DİLLER VE TOKEN (Token Lab'dan buraya taşındı) ----------
     "Model önce İngilizceye mi çeviriyor?" mitini öğrenci KENDİ
     kelimesiyle ölçerek yıkar. Eklenenler oturum içidir; kaydedilmez. */
  const PAIRS = [
    { tr: 'Su', en: 'Water' },
    { tr: 'Merhaba', en: 'Hello' },
    { tr: 'Sürdürülebilirlik', en: 'Sustainability' },
    { tr: 'evlerimizdekilerden', en: 'from those in our houses' }
  ];
  let EK_CIFTLER = [];

  function esc2(s) { return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

  function renderPairs() {
    const el = $('pairTable'); if (!el || !window.tokenize) return;
    el.innerHTML =
      '<thead><tr><th>Türkçe</th><th class="num">tok</th><th>İngilizce</th><th class="num">tok</th></tr></thead><tbody>' +
      PAIRS.concat(EK_CIFTLER).map(p => {
        const a = window.tokenize(p.tr).count, b = window.tokenize(p.en).count;
        return '<tr><td class="text-soft">' + esc2(p.tr) + '</td>' +
          '<td class="num text-green"><b>' + a + '</b></td>' +
          '<td class="text-soft">' + esc2(p.en) + '</td>' +
          '<td class="num text-water"><b>' + b + '</b></td></tr>';
      }).join('') + '</tbody>';
  }

  function wirePairs() {
    const btn = $('pairAdd'); if (!btn) return;
    btn.addEventListener('click', () => {
      const tr = $('pairTr').value.trim(), en = $('pairEn').value.trim();
      if (!tr || !en) return;
      EK_CIFTLER.push({ tr, en });
      $('pairTr').value = ''; $('pairEn').value = '';
      renderPairs();
    });
    renderPairs();
    window.addEventListener('tokenizer-ready', renderPairs);
  }

  function init() {
    renderTimeline(); renderDataMix(); renderDataProjects();
    renderCosts(); renderFamilies(); renderEra(); wirePairs();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
