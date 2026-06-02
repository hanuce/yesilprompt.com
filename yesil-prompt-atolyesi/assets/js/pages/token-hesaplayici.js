/* =========================================================
   TOKEN HESAPLAYICI sayfası
   3 parça: (1) tokenizasyon laboratuvarı (2) enerji hesaplayıcı
   (3) yeşil prompt kuralları. Değerler config/ dosyalarından gelir.
   ========================================================= */
(function () {
  const $ = (id) => document.getElementById(id);
  const U = () => window.Units;

  /* ---------- 1) TOKENIZASYON LABORATUVARI ---------- */
  const PAIRS = [
    { tr: 'Merhaba', en: 'Hello' },
    { tr: 'Su', en: 'Water' },
    { tr: 'Sürdürülebilirlik', en: 'Sustainability' },
    { tr: 'evlerimizdekilerden', en: 'from those in our houses' }
  ];
  const COLORS = ['#e7f6ee', '#e8f5fc', '#fdf3e2', '#eafbe2', '#f0e9fb', '#fde8ef'];

  function renderLab() {
    const input = $('tokInput'); if (!input) return;
    const r = window.tokenize(input.value);
    $('tokCount').textContent = r.count;
    $('tokChars').textContent = input.value.length;
    $('tokChips').innerHTML = r.pieces.map((p, i) =>
      '<span class="tok" style="background:' + COLORS[i % COLORS.length] + '">' +
      '<span class="' + (p.ws ? 'ws' : '') + '">' + (p.ws ? '␣' : escapeHtml(p.text)) + '</span></span>'
    ).join('');

    $('pairTable').innerHTML =
      '<thead><tr><th>Türkçe</th><th>tok</th><th>İngilizce</th><th>tok</th></tr></thead><tbody>' +
      PAIRS.map(p =>
        '<tr><td class="text-soft">' + p.tr + '</td><td class="text-green"><b>' + window.tokenize(p.tr).count + '</b></td>' +
        '<td class="text-soft">' + p.en + '</td><td class="text-water"><b>' + window.tokenize(p.en).count + '</b></td></tr>'
      ).join('') + '</tbody>';
  }

  function escapeHtml(s) { return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

  function markEngine() {
    const b = $('tokEngine'); if (!b) return;
    b.textContent = window.__tokenizerReal ? 'o200k_base · gerçek tokenizer' : 'yaklaşık mod (CDN bekleniyor)';
  }

  /* ---------- 2) ENERJİ HESAPLAYICI ---------- */
  const calc = { mode: 'text', textModel: '', imageModel: '', outTokens: 250, thinking: 'off', attempts: 1 };

  function fillSelects() {
    const tm = $('textModel'), im = $('imageModel');
    tm.innerHTML = Object.keys(window.TEXT_MODELS).map(k =>
      '<option value="' + k + '">' + window.TEXT_MODELS[k].label + '</option>').join('');
    im.innerHTML = Object.keys(window.IMAGE_MODELS).map(k =>
      '<option value="' + k + '">' + window.IMAGE_MODELS[k].label + '</option>').join('');
    calc.textModel = tm.value; calc.imageModel = im.value;

    // Düşünme segmenti
    $('thinkingSeg').innerHTML = Object.keys(window.THINKING_LEVELS).map((k, i) =>
      '<button data-think="' + k + '" class="' + (k === 'off' ? 'active' : '') + '" style="flex:1">' +
      window.THINKING_LEVELS[k].label + '</button>').join('');
  }

  function computeEnergy() {
    const inTok = window.tokenize($('calcPrompt').value).count;
    $('inTokens').textContent = inTok;
    let perRun = 0, breakdown = {};
    if (calc.mode === 'text') {
      const m = window.TEXT_MODELS[calc.textModel];
      const inWh = inTok / 1000 * m.inWh1k;
      const outWh = calc.outTokens / 1000 * m.outWh1k;
      const thinkWh = window.THINKING_LEVELS[calc.thinking].hidden / 1000 * m.outWh1k;
      perRun = inWh + outWh + thinkWh;
      breakdown = { 'Girdi token (prefill)': inWh, 'Çıktı token (decode)': outWh, 'Düşünme token (gizli)': thinkWh };
    } else {
      const m = window.IMAGE_MODELS[calc.imageModel];
      perRun = m.whPer;
      breakdown = { ['Difüzyon (' + m.label + ', ~' + m.steps + ' adım)']: m.whPer };
    }
    const total = perRun * calc.attempts;
    return { perRun, total, breakdown };
  }

  function render() {
    const { perRun, total, breakdown } = computeEnergy();
    const U_ = U(), e = U_.equivalents(total);

    // Durum
    const st = $('status');
    let cls = 'green', txt = '🌱 Verimli';
    if (total > 5) { cls = 'red'; txt = '🔴 Yüksek maliyet'; }
    else if (total > 1) { cls = 'amber'; txt = '⚠️ Orta maliyet'; }
    st.className = 'status ' + cls; st.textContent = txt;

    // İnsan-okur birim + teknik
    $('energyHuman').textContent = U_.human(total);
    $('energyTech').textContent = 'teknik: ' + U_.fmt(total, 2) + ' Wh  ·  tek üretim ' + U_.fmt(perRun, 2) + ' Wh × ' + calc.attempts + ' deneme';

    // Metrik kutuları (kWh DEĞİL — anlaşılır birimler)
    const tiles = [
      { icon: '📱', v: U_.fmt(e.phones, 2), l: 'telefon şarjı' },
      { icon: '📺', v: U_.dur(e.videoMin), l: 'video izleme' },
      { icon: '💡', v: U_.dur(e.ledMin), l: 'LED ampul' },
      { icon: '💧', v: U_.fmt(e.waterMl, 2), l: 'mL su' },
      { icon: '🏭', v: U_.fmt(e.co2g, 3), l: 'g CO₂' },
      { icon: '⚡', v: U_.fmt(total, 2), l: 'Wh (teknik)' }
    ];
    $('metrics').innerHTML = tiles.map(t =>
      '<div class="metric"><div class="icon">' + t.icon + '</div><div class="v">' + t.v + '</div><div class="l">' + t.l + '</div></div>'
    ).join('');

    // Döküm
    $('breakdown').innerHTML = '<div class="text-mute" style="margin-bottom:.3rem">Maliyet dökümü</div>' +
      Object.keys(breakdown).map(k =>
        '<div style="display:flex; justify-content:space-between"><span class="text-soft">' + k + '</span>' +
        '<span class="text-green">' + U_.fmt(breakdown[k], 3) + ' Wh</span></div>').join('');
  }

  function wireCalc() {
    fillSelects();

    $('modeText').addEventListener('click', () => setMode('text'));
    $('modeImage').addEventListener('click', () => setMode('image'));
    $('textModel').addEventListener('change', e => { calc.textModel = e.target.value; render(); });
    $('imageModel').addEventListener('change', e => { calc.imageModel = e.target.value; render(); });
    $('calcPrompt').addEventListener('input', render);
    $('outTokens').addEventListener('input', e => { calc.outTokens = +e.target.value; $('outTokensLbl').textContent = e.target.value; render(); });
    $('attempts').addEventListener('input', e => { calc.attempts = +e.target.value; $('attemptsLbl').textContent = e.target.value; render(); });
    $('thinkingSeg').addEventListener('click', e => {
      const b = e.target.closest('[data-think]'); if (!b) return;
      calc.thinking = b.dataset.think;
      $('thinkingSeg').querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
      render();
    });

    render();
  }

  function setMode(mode) {
    calc.mode = mode;
    $('modeText').classList.toggle('active', mode === 'text');
    $('modeImage').classList.toggle('active', mode === 'image');
    $('textModel').style.display = mode === 'text' ? '' : 'none';
    $('imageModel').style.display = mode === 'image' ? '' : 'none';
    $('textOnly').style.display = mode === 'text' ? '' : 'none';
    render();
  }

  /* ---------- 3) YEŞİL PROMPT KURALLARI ---------- */
  const RULES = [
    'Net ol, ilk seferde doğru iste',
    'Kısa çıktı iste',
    'Görsel şart değilse metinle yetin',
    'Basit işte düşünmeyi kıs',
    'Bağlamı şişirme',
    'Baştan tam tarif et',
    'Önce metinde prova, sonra tek görsel',
    'İyi prompt’u sakla'
  ];
  function renderRules() {
    const host = $('rules'); if (!host) return;
    host.innerHTML = RULES.map((r, i) =>
      '<div class="card" style="display:flex; gap:.7rem; align-items:flex-start">' +
      '<span style="flex:none;width:30px;height:30px;border-radius:9px;display:grid;place-items:center;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--green-500),var(--green-700))">' + (i + 1) + '</span>' +
      '<span class="text-soft" style="align-self:center">' + r + '</span></div>'
    ).join('');
  }

  /* ---------- Başlat ---------- */
  function init() {
    renderLab();
    $('tokInput').addEventListener('input', renderLab);
    markEngine();
    wireCalc();
    renderRules();
    // Tokenizer hazır olunca gerçek sayıma geç
    window.addEventListener('tokenizer-ready', () => { markEngine(); renderLab(); render(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
