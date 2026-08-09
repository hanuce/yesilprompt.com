/* =========================================================
   TOKEN LAB sayfası
   1) Tokenizasyon laboratuvarı (canlı token sayacı)
   2) Token & çok dillilik (TR/EN karşılaştırma)
   3) Enerji & Su Hesaplayıcı (metin / görsel / VIDEO)
   4) Çıktı maliyeti + difüzyon simülasyonu
   Değerler config/ dosyalarından gelir.
   ========================================================= */
(function () {
  const $ = (id) => document.getElementById(id);
  const U = () => window.Units;
  function escapeHtml(s) { return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

  /* ---------- 1) TOKENIZASYON LABORATUVARI ---------- */
  const PAIRS = [
    { tr: 'Merhaba', en: 'Hello' },
    { tr: 'Su', en: 'Water' },
    { tr: 'Sürdürülebilirlik', en: 'Sustainability' },
    { tr: 'evlerimizdekilerden', en: 'from those in our houses' }
  ];

  function renderLab() {
    const input = $('tokInput'); if (!input) return;
    const r = window.tokenize(input.value);
    if ($('tokCount')) $('tokCount').textContent = r.count;
    if ($('tokChars')) $('tokChars').textContent = input.value.length;
    if ($('tokChips')) $('tokChips').innerHTML = r.pieces.map((p, i) =>
      '<span class="tok tok-c' + ((i % 6) + 1) + '">' +
      '<span class="' + (p.ws ? 'ws' : '') + '">' + (p.ws ? '␣' : escapeHtml(p.text)) + '</span></span>'
    ).join('');

    if ($('pairTable')) $('pairTable').innerHTML =
      '<thead><tr><th>Türkçe</th><th class="num">tok</th><th>İngilizce</th><th class="num">tok</th></tr></thead><tbody>' +
      PAIRS.map(p =>
        '<tr><td class="text-soft">' + p.tr + '</td><td class="num text-green"><b>' + window.tokenize(p.tr).count + '</b></td>' +
        '<td class="text-soft">' + p.en + '</td><td class="num text-water"><b>' + window.tokenize(p.en).count + '</b></td></tr>'
      ).join('') + '</tbody>';
  }

  function markEngine() {
    const b = $('tokEngine'); if (!b) return;
    if (window.__tokenizerReal) {
      b.textContent = '✓ gerçek tokenizer (o200k_base)';
    } else {
      b.textContent = '≈ hızlı tahmin (kesin sayaç yükleniyor…)';
    }
  }

  /* ---------- 2) ENERJİ & SU HESAPLAYICI ---------- */
  const calc = { mode: 'text', textModel: '', imageModel: '', videoModel: '',
                 outTokens: 250, effort: 'off', attempts: 1, duration: 5 };

  function fillSelects() {
    const tm = $('textModel'), im = $('imageModel'), vm = $('videoModel');
    if (tm) tm.innerHTML = Object.keys(window.TEXT_MODELS).map(k =>
      '<option value="' + k + '">' + window.TEXT_MODELS[k].label + '</option>').join('');
    if (im) im.innerHTML = Object.keys(window.IMAGE_MODELS).map(k =>
      '<option value="' + k + '">' + window.IMAGE_MODELS[k].label + '</option>').join('');
    if (vm) vm.innerHTML = Object.keys(window.VIDEO_MODELS).map(k =>
      '<option value="' + k + '">' + window.VIDEO_MODELS[k].label + '</option>').join('');
    calc.textModel = tm ? tm.value : '';
    calc.imageModel = im ? im.value : '';
    calc.videoModel = vm ? vm.value : '';

    // Efor segmenti
    if ($('effortSeg')) $('effortSeg').innerHTML = Object.keys(window.EFFORT_LEVELS).map(k =>
      '<button data-effort="' + k + '" class="' + (k === 'off' ? 'active' : '') + '">' +
      window.EFFORT_LEVELS[k].label + '</button>').join('');

    applyMaxOut();
  }

  /* Çıktı kaydırıcısının üst sınırı = MODELİN kendi max output'u */
  function applyMaxOut() {
    const m = window.TEXT_MODELS[calc.textModel]; if (!m || !$('outTokens')) return;
    const slider = $('outTokens');
    slider.max = m.maxOut;
    if (calc.outTokens > m.maxOut) { calc.outTokens = m.maxOut; slider.value = m.maxOut; }
    if ($('outTokensLbl')) $('outTokensLbl').textContent = calc.outTokens;
    if ($('maxOutNote')) $('maxOutNote').textContent =
      'Bu modelin tek cevapta üst sınırı: ' + m.maxOut.toLocaleString('tr-TR') + ' token (modeli sen değil, model belirler).';
  }

  function computeEnergy() {
    let perRun = 0, breakdown = {};
    if (calc.mode === 'text') {
      const inTok = window.tokenize($('calcPrompt').value).count;
      if ($('inTokens')) $('inTokens').textContent = inTok;
      const m = window.TEXT_MODELS[calc.textModel];
      const inWh = inTok / 1000 * m.inWh1k;
      const outWh = calc.outTokens / 1000 * m.outWh1k;
      const effortWh = window.EFFORT_LEVELS[calc.effort].hidden / 1000 * m.outWh1k;
      perRun = inWh + outWh + effortWh;
      breakdown = { 'Girdi: promptu okumak': inWh, 'Çıktı: cevabı yazmak': outWh, 'Cevaptan önceki düşünme': effortWh };
    } else if (calc.mode === 'image') {
      const m = window.IMAGE_MODELS[calc.imageModel];
      perRun = m.whPer;
      breakdown = { ['Difüzyon (' + m.label + ', ~' + m.steps + ' adım)']: m.whPer };
    } else {
      const m = window.VIDEO_MODELS[calc.videoModel];
      perRun = m.whPerSecond * calc.duration;
      const frames = m.fps * calc.duration;
      breakdown = { [calc.duration + ' sn × ' + m.whPerSecond + ' Wh/sn (≈' + frames + ' kare)']: perRun };
    }
    const total = perRun * calc.attempts;
    return { perRun, total, breakdown };
  }

  function render() {
    if (!$('status')) return;
    const { perRun, total, breakdown } = computeEnergy();
    const U_ = U(), e = U_.equivalents(total);

    let cls = 'green', txt = '🌱 Verimli';
    if (total > 5) { cls = 'red'; txt = '🔴 Yüksek maliyet'; }
    else if (total > 1) { cls = 'amber'; txt = '⚠️ Orta maliyet'; }
    $('status').className = 'status ' + cls; $('status').textContent = txt;

    /* Eşdeğer HER ZAMAN telefon şarjı cinsinden (bkz. SITE_RULES 7).
       human() değere göre birim değiştirirdi (şarj / video / LED); o zaman
       kaydırıcıyı oynatınca birim de değişir ve öğrenci iki sonucu
       birbiriyle karşılaştıramazdı. */
    $('energyHuman').textContent = U_.phoneText(total);
    $('energyTech').textContent = 'teknik: ' + U_.fmt(total, 2) + ' Wh  ·  tek üretim ' + U_.fmt(perRun, 2) + ' Wh × ' + calc.attempts + ' deneme';

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

    $('breakdown').innerHTML = '<div class="text-mute mb">Maliyet dökümü</div>' +
      Object.keys(breakdown).map(k =>
        '<div class="breakdown-row"><span class="text-soft">' + k + '</span>' +
        '<span class="text-green">' + U_.fmt(breakdown[k], 3) + ' Wh</span></div>').join('');
  }

  function setMode(mode) {
    calc.mode = mode;
    ['Text', 'Image', 'Video'].forEach(M => {
      const btn = $('mode' + M); if (btn) btn.classList.toggle('active', mode === M.toLowerCase());
    });
    // İlgili kontrol bloklarını göster/gizle (görünürlük JS ile, stil CSS'te)
    toggle('textControls', mode === 'text');
    toggle('imageControls', mode === 'image');
    toggle('videoControls', mode === 'video');
    toggle('promptRow', mode === 'text');
    render();
  }
  function toggle(id, on) { const el = $(id); if (el) el.hidden = !on; }

  function wireCalc() {
    if (!$('modeText')) return;
    fillSelects();
    $('modeText').addEventListener('click', () => setMode('text'));
    $('modeImage').addEventListener('click', () => setMode('image'));
    $('modeVideo').addEventListener('click', () => setMode('video'));
    $('textModel').addEventListener('change', e => { calc.textModel = e.target.value; applyMaxOut(); render(); });
    $('imageModel').addEventListener('change', e => { calc.imageModel = e.target.value; render(); });
    $('videoModel').addEventListener('change', e => { calc.videoModel = e.target.value; render(); });
    $('calcPrompt').addEventListener('input', render);
    $('outTokens').addEventListener('input', e => { calc.outTokens = +e.target.value; $('outTokensLbl').textContent = e.target.value; render(); });
    $('attempts').addEventListener('input', e => { calc.attempts = +e.target.value; $('attemptsLbl').textContent = e.target.value; render(); });
    $('duration').addEventListener('input', e => { calc.duration = +e.target.value; $('durLbl').textContent = e.target.value; render(); });
    $('effortSeg').addEventListener('click', e => {
      const b = e.target.closest('[data-effort]'); if (!b) return;
      calc.effort = b.dataset.effort;
      $('effortSeg').querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
      render();
    });
    setMode('text');
  }

  /* ---------- 3) ÇIKTI MALİYETİ: karşılaştırma kartları ----------
     Üç kart YAN YANA durur ve tek amaçları metin < görsel < video
     farkını göstermektir. Bu yüzden üçü de TEK birimden — telefon
     şarjından — okunur. human() kullanılsaydı ikisi LED/video,
     biri şarj çıkar ve karşılaştırma anlamını yitirirdi. */
  function renderCompare() {
    const host = $('compareCards'); if (!host || !window.COMPARE_BASELINE) return;
    const U_ = U();
    const order = ['text', 'image', 'video'];
    const icons = { text: '💬', image: '🖼️', video: '🎬' };
    host.innerHTML = order.map(k => {
      const c = window.COMPARE_BASELINE[k];
      return (
        '<div class="card card-top center">' +
          '<div class="big-emoji">' + icons[k] + '</div>' +
          '<h3>' + c.label + '</h3>' +
          '<div class="huge-num">' + U_.phoneText(c.wh) + '</div>' +
          '<div class="src">' + c.note + ' · ~' + U_.fmt(c.wh, 2) + ' Wh</div>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------- 4) DİFÜZYON SİMÜLASYONU ---------- */
  function diffusionSim() {
    const cv = $('diffCanvas'); if (!cv) return;
    const N = 48, MAX = 40;
    cv.width = N; cv.height = N;
    const ctx = cv.getContext('2d');
    // Hedef: yumuşak yeşil-mavi degrade "görsel"
    const target = new Uint8ClampedArray(N * N * 4);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const i = (y * N + x) * 4;
      target[i] = 60 + (x / N) * 120;
      target[i + 1] = 150 + (y / N) * 80;
      target[i + 2] = 110 + ((N - x) / N) * 120;
      target[i + 3] = 255;
    }
    let step = 0;
    function draw() {
      const img = ctx.createImageData(N, N);
      const noiseAmt = 1 - step / MAX;
      for (let p = 0; p < N * N; p++) {
        const i = p * 4;
        for (let c = 0; c < 3; c++) {
          const rnd = Math.random() * 255;
          img.data[i + c] = target[i + c] * (1 - noiseAmt) + rnd * noiseAmt;
        }
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      if ($('diffStep')) $('diffStep').textContent = step;
    }
    function reset() { step = 0; draw(); }
    let timer = null;
    function play() {
      if (timer) return;
      timer = setInterval(() => {
        step++; draw();
        if (step >= MAX) { clearInterval(timer); timer = null; }
      }, 90);
    }
    if ($('diffPlay')) $('diffPlay').addEventListener('click', () => { if (step >= MAX) reset(); play(); });
    if ($('diffStepBtn')) $('diffStepBtn').addEventListener('click', () => { if (step < MAX) { step++; draw(); } });
    if ($('diffReset')) $('diffReset').addEventListener('click', () => { clearInterval(timer); timer = null; reset(); });
    if ($('diffMax')) $('diffMax').textContent = MAX;
    reset();
  }

  /* ---------- Başlat ---------- */
  function init() {
    renderLab();
    if ($('tokInput')) $('tokInput').addEventListener('input', renderLab);
    markEngine();
    wireCalc();
    renderCompare();
    diffusionSim();
    window.addEventListener('tokenizer-ready', () => { markEngine(); renderLab(); render(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
