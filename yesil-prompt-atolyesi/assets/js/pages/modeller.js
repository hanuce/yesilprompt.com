/* =========================================================
   MODELLER & TARİH sayfası
   İçeriği buradan düzenle: TIMELINE ve TRAINING dizileri.
   ========================================================= */
(function () {

  /* --- Zaman tüneli (yıl, başlık, açıklama) --- */
  const TIMELINE = [
    { year: '2017', title: '"Attention Is All You Need"', body: 'Transformer mimarisi — bugünkü tüm büyük modellerin temeli.' },
    { year: '2018–2020', title: 'BERT · GPT-2 · GPT-3 (175B)', body: 'Ölçek çağı başlar.' },
    { year: '2022', title: 'ChatGPT', body: 'Üretken yapay zeka günlük hayata girer; kamuoyu patlaması.' },
    { year: '2023–2024', title: 'Çok-kipli & açık ağırlık', body: 'Metin+görsel+ses; Llama / Mistral / Qwen açık ağırlıkla yayılır.' },
    { year: '2025–2026', title: '"Düşünen" modeller standart', body: 'Neredeyse tüm modeller düşünür; ayarlanabilir düşünme bütçesi.' }
  ];

  /* --- Eğitim maliyetleri (Wh cinsinden) ---
     gwh sadece gösterim için; wh = gerçek hesap (gwh * 1e9). */
  const TRAINING = [
    { model: 'GPT-3 (175B)', gwh: 1.287, wh: 1.287e9, co2: '~552 t CO₂', src: 'Patterson 2021' },
    { model: 'Llama ailesi', gwh: 2.638, wh: 2.638e9, co2: '~1.015 t CO₂', src: 'Meta kartları' },
    { model: 'BLOOM (176B)', gwh: 0.433, wh: 0.433e9, co2: '~25 t CO₂', src: 'Luccioni 2022' }
  ];

  function renderTimeline() {
    const host = document.getElementById('timeline');
    if (!host) return;
    host.innerHTML =
      '<div style="display:grid; grid-template-columns:repeat(5,1fr); gap:0; position:relative">' +
      '<div style="position:absolute; left:6%; right:6%; top:14px; height:3px; background:linear-gradient(90deg,var(--green-400),var(--leaf))"></div>' +
      TIMELINE.map(t =>
        '<div style="text-align:center; padding:0 .5rem; position:relative">' +
          '<div style="width:14px;height:14px;border-radius:50%;background:var(--green-600);margin:8px auto 14px;box-shadow:0 0 0 5px var(--mint-100)"></div>' +
          '<div style="font-family:var(--font-head);font-weight:800;color:var(--green-700)">' + t.year + '</div>' +
          '<div style="font-weight:700;font-size:.92rem;margin:.2rem 0">' + t.title + '</div>' +
          '<div class="text-soft" style="font-size:.83rem">' + t.body + '</div>' +
        '</div>'
      ).join('') +
      '</div>' +
      '<style>@media(max-width:720px){#timeline>div{grid-template-columns:1fr !important}#timeline>div>div:first-child{display:none}}</style>';
  }

  function renderTraining() {
    const host = document.getElementById('trainingCards');
    if (!host) return;
    const U = window.Units;
    host.innerHTML = TRAINING.map(t => {
      const phones = U ? U.fmt(t.wh / 12 / 1e6, 1) : '?';     // milyon telefon şarjı
      const dam = U ? U.damSentence(t.wh) : '';
      return (
        '<div class="card card-top">' +
          '<h3 style="margin:0 0 .2rem">' + t.model + '</h3>' +
          '<div class="text-soft" style="font-size:.86rem; margin-bottom:.8rem">' + t.co2 + ' · ' + t.src + '</div>' +
          '<div class="metric" style="margin-bottom:.5rem"><div class="icon">📱</div>' +
            '<div class="v">' + phones + ' milyon</div><div class="l">telefon şarjı</div></div>' +
          '<div class="metric"><div class="icon">🏞️</div>' +
            '<div class="v" style="font-size:1.05rem">' + dam + '</div><div class="l">eşdeğeri</div></div>' +
        '</div>'
      );
    }).join('');
  }

  function init() { renderTimeline(); renderTraining(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
