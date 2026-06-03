/* =========================================================
   MODELLER & TARİH sayfası — render mantığı
   İçerik config dosyalarından gelir:
     timeline.config.js   → AI_TIMELINE
     training.config.js   → GPT3_DATA, DATA_PROJECTS, TRAINING_COSTS, TRAINING_FACTS
     families.config.js   → MODEL_FAMILIES
     valuations.config.js → RALLY
   ========================================================= */
(function () {
  const $ = (id) => document.getElementById(id);

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

  /* --- 2) Eğitim mantığı kartları --- */
  function renderFacts() {
    const host = $('trainingFacts'); if (!host || !window.TRAINING_FACTS) return;
    host.innerHTML = window.TRAINING_FACTS.map(f =>
      '<div class="card card-top">' +
        '<div class="big-emoji">' + f.icon + '</div>' +
        '<h3>' + f.title + '</h3>' +
        '<p class="text-soft m-0">' + f.body + '</p>' +
      '</div>'
    ).join('');
  }

  /* --- 3) GPT-3 hangi veriyle eğitildi (tablo) --- */
  function renderGpt3() {
    const host = $('gpt3Table'); if (!host || !window.GPT3_DATA) return;
    const d = window.GPT3_DATA;
    host.innerHTML =
      '<thead><tr><th>Veri kaynağı</th><th class="num">Boyut</th><th class="num">Ağırlık</th><th class="num">Epoch</th></tr></thead><tbody>' +
      d.rows.map(r =>
        '<tr><td><b>' + r.name + '</b><div class="src">' + r.note + '</div></td>' +
        '<td class="num">' + r.tokens + '</td><td class="num">' + r.share + '</td>' +
        '<td class="num text-green"><b>' + r.epochs + '</b></td></tr>'
      ).join('') + '</tbody>';
    const cap = $('gpt3Caption');
    if (cap) cap.textContent = d.params + ' · ' + d.trainedTokens + ' üzerinde eğitildi.';
  }

  /* --- 4) Veri düzenleme / sınıflandırma projeleri --- */
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

  /* --- 5) Eğitim enerjisi kartları --- */
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

  /* --- 6) Model aileleri (logo + ülke) --- */
  function renderFamilies() {
    const host = $('families'); if (!host || !window.MODEL_FAMILIES) return;
    host.innerHTML = '<div class="family-grid">' + window.MODEL_FAMILIES.map(f => {
      const initial = f.name.trim().charAt(0);
      return (
        '<div class="card family-card">' +
          '<img class="family-logo" src="' + f.logo + '" alt="' + f.name + ' logosu" ' +
               'data-initial="' + initial + '">' +
          '<div>' +
            '<p class="family-name">' + f.name + '</p>' +
            '<div class="family-meta"><span class="flag">' + f.flag + '</span>' + f.country + ' · ' + f.org + '</div>' +
            '<p class="family-blurb">' + f.blurb + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join('') + '</div>';

    // Logo dosyası yoksa: baş harfli şık yer tutucuya düş
    host.querySelectorAll('.family-logo').forEach(img => {
      img.addEventListener('error', function () {
        const span = document.createElement('span');
        span.className = 'family-logo ph';
        span.textContent = this.dataset.initial;
        this.replaceWith(span);
      });
    });
  }

  /* --- 7) Yapay Zeka Rallisi (barlar + zaman çizelgesi) --- */
  function renderRally() {
    const host = $('rally'); if (!host || !window.RALLY) return;
    const R = window.RALLY;
    const all = R.companies.concat(R.ai);
    const max = Math.max.apply(null, all.map(c => c.valT));
    const bar = (c) => {
      const w = Math.max(4, (c.valT / max) * 100);
      return (
        '<div class="rally-row">' +
          '<div class="rally-name">' + c.name + '<br><span class="tag">' + c.tag + '</span></div>' +
          '<div class="rally-track"><span class="rally-bar ' + (c.kind === 'ai' ? 'ai' : '') + '" data-w="' + w + '"></span></div>' +
          '<div class="rally-val">' + c.valT.toLocaleString('tr-TR') + ' T$</div>' +
        '</div>'
      );
    };
    host.innerHTML = '<div class="rally">' + all.map(bar).join('') + '</div>';
    // Dinamik bar genişliği: yazılı markup'ta inline stil yok; runtime'da uygulanır.
    host.querySelectorAll('.rally-bar').forEach(b => { b.style.width = b.dataset.w + '%'; });

    const ms = $('rallyMilestones');
    if (ms) ms.innerHTML = '<div class="timeline">' + R.milestones.map(m =>
      '<div class="tl-item"><div class="tl-year">' + m.year + '</div>' +
      '<div class="tl-body"><p class="text-soft m-0">' + m.text + '</p></div></div>'
    ).join('') + '</div>';

    const asOf = $('rallyAsOf');
    if (asOf) asOf.textContent = R.asOf;
  }

  function init() {
    renderTimeline(); renderFacts(); renderGpt3(); renderDataProjects();
    renderCosts(); renderFamilies(); renderRally();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
