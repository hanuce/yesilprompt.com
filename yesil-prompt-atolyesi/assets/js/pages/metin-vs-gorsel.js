/* =========================================================
   METİN vs GÖRSEL sayfası
   (1) difüzyon simülasyonu (canvas)  (2) karşılaştırma kartları
   ========================================================= */
(function () {
  const $ = (id) => document.getElementById(id);

  /* ---------- Difüzyon simülasyonu ---------- */
  const SIZE = 48, MAX = 40;
  let ctx = null, step = 0, timer = null, playing = false;
  const target = [];

  function buildTarget() {
    for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
      const cx = SIZE / 2, cy = SIZE / 2;
      const d = Math.hypot(x - cx, y - cy) / (SIZE / 2);
      const leaf = Math.sin(x / 4) * Math.cos(y / 5);
      let c;
      if (d < 0.30) c = [250, 204, 21];        // güneş
      else if (leaf > 0.10) c = [34, 197, 94]; // yaprak
      else c = [220, 240, 228];                // açık arka plan (beyaz tema)
      target.push(c);
    }
  }
  function draw() {
    if (!ctx) return;
    const img = ctx.createImageData(SIZE, SIZE);
    const t = step / MAX;
    for (let i = 0; i < target.length; i++) {
      const [r, g, b] = target[i];
      const noise = (1 - t) * 255 * (Math.random() - 0.5) * 1.4;
      img.data[i*4]   = clamp(r * t + (1 - t) * 235 + noise);
      img.data[i*4+1] = clamp(g * t + (1 - t) * 235 + noise);
      img.data[i*4+2] = clamp(b * t + (1 - t) * 235 + noise);
      img.data[i*4+3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    $('diffStep').textContent = step;
  }
  function clamp(v) { return Math.max(0, Math.min(255, v)); }
  function play() {
    if (playing) return; playing = true; step = 0;
    timer = setInterval(() => { step++; draw(); if (step >= MAX) { clearInterval(timer); playing = false; } }, 80);
  }
  function reset() { clearInterval(timer); playing = false; step = 0; draw(); }

  function initDiff() {
    const cv = $('diffCanvas'); if (!cv) return;
    cv.width = SIZE; cv.height = SIZE; ctx = cv.getContext('2d');
    $('diffMax').textContent = MAX;
    buildTarget(); draw();
    $('diffPlay').addEventListener('click', play);
    $('diffStepBtn').addEventListener('click', () => { step = Math.min(MAX, step + 1); draw(); });
    $('diffReset').addEventListener('click', reset);
  }

  /* ---------- Karşılaştırma kartları (birimlerle) ---------- */
  function renderCompare() {
    const host = $('compareCards'); if (!host || !window.COMPARE_BASELINE) return;
    const U = window.Units;
    const B = window.COMPARE_BASELINE;
    const order = ['text', 'image', 'video'];
    const icons = { text: '💬', image: '🖼️', video: '🎬' };
    host.innerHTML = order.map(k => {
      const b = B[k]; const e = U.equivalents(b.wh);
      return (
        '<div class="card card-top">' +
          '<div style="font-size:2rem">' + icons[k] + '</div>' +
          '<h3 style="margin:.2rem 0">' + b.label + '</h3>' +
          '<div class="src" style="margin-bottom:.7rem">' + b.note + '</div>' +
          tile('📱', U.fmt(e.phones, 2), 'telefon şarjı') +
          tile('📺', U.dur(e.videoMin), 'video izleme') +
          tile('💡', U.dur(e.ledMin), 'LED ampul') +
        '</div>'
      );
    }).join('');
  }
  function tile(icon, v, l) {
    return '<div style="display:flex; justify-content:space-between; padding:.45rem 0; border-bottom:1px dashed var(--line)">' +
      '<span class="text-soft">' + icon + ' ' + l + '</span><span class="text-green"><b>' + v + '</b></span></div>';
  }

  function init() { initDiff(); renderCompare(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
