/* =========================================================
   GÖRSEL vs VIDEO sayfası — video maliyet hesaplayıcı
   Değerler: config/models.config.js → VIDEO_MODELS, IMAGE_MODELS
   ========================================================= */
(function () {
  const $ = (id) => document.getElementById(id);
  const state = { model: '', seconds: 5 };

  // "1 görsele kıyasla" için referans görsel enerjisi (SDXL ~1.5 Wh)
  const IMAGE_REF_WH = (window.IMAGE_MODELS && window.IMAGE_MODELS['sdxl']) ? window.IMAGE_MODELS['sdxl'].whPer : 1.5;

  function fill() {
    const sel = $('videoModel');
    sel.innerHTML = Object.keys(window.VIDEO_MODELS).map(k =>
      '<option value="' + k + '">' + window.VIDEO_MODELS[k].label + '</option>').join('');
    state.model = sel.value;
  }

  function render() {
    const U = window.Units;
    const m = window.VIDEO_MODELS[state.model];
    const total = m.whPerSecond * state.seconds;
    const frames = m.fps * state.seconds;
    const e = U.equivalents(total);

    $('frameCount').textContent = U.fmt(frames, 0);
    $('vsImage').textContent = '1 görsele kıyasla ×' + U.fmt(total / IMAGE_REF_WH, 0);

    // Durum (video genelde yüksek)
    const st = $('vStatus');
    let cls = 'green', txt = '🌱 Düşük';
    if (total > 200) { cls = 'red'; txt = '🔴 Çok yüksek'; }
    else if (total > 30) { cls = 'amber'; txt = '⚠️ Yüksek'; }
    st.className = 'status ' + cls; st.textContent = txt;

    $('vHuman').textContent = U.human(total);
    $('vTech').textContent = 'teknik: ' + U.fmt(total, 1) + ' Wh  ·  ' + U.fmt(m.whPerSecond, 0) + ' Wh/sn × ' + state.seconds + ' sn';

    const tiles = [
      { icon: '📱', v: U.fmt(e.phones, 2), l: 'telefon şarjı' },
      { icon: '📺', v: U.dur(e.videoMin), l: 'video izleme' },
      { icon: '💡', v: U.dur(e.ledMin), l: 'LED ampul' },
      { icon: '💧', v: U.fmt(e.waterMl, 1), l: 'mL su' },
      { icon: '🏭', v: U.fmt(e.co2g, 2), l: 'g CO₂' },
      { icon: '🖼️', v: U.fmt(total / IMAGE_REF_WH, 0), l: 'görsel kadar' }
    ];
    $('vMetrics').innerHTML = tiles.map(t =>
      '<div class="metric"><div class="icon">' + t.icon + '</div><div class="v">' + t.v + '</div><div class="l">' + t.l + '</div></div>'
    ).join('');
  }

  function init() {
    fill();
    render();
    $('videoModel').addEventListener('change', e => { state.model = e.target.value; render(); });
    $('duration').addEventListener('input', e => { state.seconds = +e.target.value; $('durLbl').textContent = e.target.value; render(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
