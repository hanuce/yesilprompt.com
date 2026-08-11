/* =========================================================
   FAZ 3 · TOKEN LAB  (token-lab.html)
   ---------------------------------------------------------
   Altı parça:
     1) Nasıl çalışıyor — akış adımları + üç üretim türü
     2) Görsel neden pahalı — 3 sütun, ortada difüzyon tuvali
     3) Hangi parametre en çok değiştiriyor — canlı hesaplayıcı
     4) Senin elinde ne var — prompt mühendisliğinin çerçevesi
     5) Token avı — metin / görsel / video için üç kutu
     6) Önce / Sonra — üç bozuk promptu öğrenci düzeltir

   ⚠️ Cevabın uzunluğunu KULLANICI belirlemez; seçilen modelin
      `tipikCikti` değeri kullanılır (bkz. models.config.js).
   ❌ Yazılan hiçbir şey kaydedilmez (SITE_RULES 2c).

   İçerik: config/mekanizma.config.js · Enerji: config/models.config.js
   ========================================================= */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const U = () => window.Units;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* Sayının nereden geldiğini söyleyen rozet (SITE_RULES 1.4) */
  const ROZET = {
    resmi:   ['tag-resmi', 'resmî'],
    beyan:   ['tag-beyan', 'şirket beyanı'],
    olculdu: ['tag-olculdu', 'bağımsız ölçüm'],
    tahmini: ['tag-tahmini', 'bağımsız tahmin']
  };

  /* Top 5 her zaman en üstte, ayrı grupta (bkz. models.config.js) */
  function secenekler(M, secili) {
    const top = [], diger = [];
    Object.keys(M || {}).forEach(k => {
      const o = '<option value="' + k + '"' + (k === secili ? ' selected' : '') + '>' +
        esc(M[k].label) + '</option>';
      (M[k].top5 ? top : diger).push(o);
    });
    return (top.length ? '<optgroup label="⭐ En çok kullanılan 5">' + top.join('') + '</optgroup>' : '') +
           (diger.length ? '<optgroup label="Diğer araçlar">' + diger.join('') + '</optgroup>' : '');
  }

  /* ---------- 1) NASIL ÇALIŞIYOR ---------- */
  function akis() {
    const host = $('akisAdimlari');
    if (host) {
      host.innerHTML = '<ol class="akis">' + (window.AKIS_ADIMLARI || []).map(a =>
        '<li class="akis-adim' + (a.no === 6 ? ' akis-donus' : '') + '">' +
          '<span class="akis-no">' + a.no + '</span>' +
          '<span class="akis-ikon">' + a.ikon + '</span>' +
          '<span class="akis-govde"><b>' + esc(a.ad) + '</b><br>' +
            '<span class="text-soft">' + a.m + '</span></span>' +
        '</li>'
      ).join('') + '</ol>';
    }
    if ($('akisVurgu')) $('akisVurgu').innerHTML = window.AKIS_VURGU || '';

    const t = $('akisTurleri');
    if (t) {
      t.innerHTML = (window.AKIS_TURLERI || []).map(x =>
        '<div class="card card-top col-card">' +
          '<div class="big-emoji">' + x.ikon + '</div>' +
          '<h3 class="m-0">' + esc(x.ad) + '</h3>' +
          '<ol class="akis-mini">' + x.akis.map(s => '<li>' + esc(s) + '</li>').join('') + '</ol>' +
          '<p class="text-soft m-0">' + x.yuk + '</p>' +
          '<div class="chip mt">' + esc(x.maliyet) + '</div>' +
        '</div>'
      ).join('');
    }
  }

  /* ---------- 2) METİN < GÖRSEL < VIDEO ----------
     Üçü de TEK birimden — telefon şarjından — okunur; başka türlü
     yan yana duran üç sonuç karşılaştırılamaz (SITE_RULES 7). */
  function karsilastir() {
    const C = window.COMPARE_BASELINE, U_ = U();
    if (!C || !U_ || !$('cmpText')) return;
    $('cmpText').textContent  = U_.phoneText(C.text.wh);
    $('cmpImage').textContent = U_.phoneText(C.image.wh);
    $('cmpVideo').textContent = U_.phoneText(C.video.wh);
    $('cmpTextNote').textContent  = C.text.note  + ' · ~' + U_.fmt(C.text.wh, 2) + ' Wh';
    $('cmpVideoNote').textContent = C.video.note + ' · ~' + U_.fmt(C.video.wh, 0) + ' Wh';
  }

  function diffusionSim() {
    const cv = $('diffCanvas'); if (!cv) return;
    const N = 48, MAX = 40;
    cv.width = N; cv.height = N;
    const ctx = cv.getContext('2d');
    const target = new Uint8ClampedArray(N * N * 4);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const i = (y * N + x) * 4;
      target[i] = 60 + (x / N) * 120;
      target[i + 1] = 150 + (y / N) * 80;
      target[i + 2] = 110 + ((N - x) / N) * 120;
      target[i + 3] = 255;
    }
    let step = 0, timer = null;
    function draw() {
      const img = ctx.createImageData(N, N);
      const noiseAmt = 1 - step / MAX;
      for (let p = 0; p < N * N; p++) {
        const i = p * 4;
        for (let c = 0; c < 3; c++) {
          img.data[i + c] = target[i + c] * (1 - noiseAmt) + Math.random() * 255 * noiseAmt;
        }
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      if ($('diffStep')) $('diffStep').textContent = step;
    }
    const reset = () => { step = 0; draw(); };
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

  /* ---------- 3) HANGİ PARAMETRE EN ÇOK DEĞİŞTİRİYOR ---------- */
  const calc = { model: 'chatgpt', effort: 'standart', attempts: 1 };

  function modelNotu() {
    const m = (window.TEXT_MODELS || {})[calc.model];
    if (!m || !$('textModelNote')) return;
    const r = ROZET[m.seffaflik] || ROZET.tahmini;
    $('textModelNote').innerHTML = '<span class="tag ' + r[0] + '">' + r[1] + '</span> ' + esc(m.src || '');
    /* Cevabın uzunluğu MODELİN özelliğidir; kullanıcı ayarlamaz. */
    if ($('ciktiLbl')) $('ciktiLbl').textContent = (m.tipikCikti || 300).toLocaleString('tr-TR');
  }

  function efforNotu() {
    const e = (window.EFFORT_LEVELS || {})[calc.effort];
    if (e && $('effortNote')) {
      $('effortNote').textContent = e.not + ' (+' + e.gizliToken.toLocaleString('tr-TR') + ' gizli token)';
    }
  }

  function hesapla() {
    const m = (window.TEXT_MODELS || {})[calc.model];
    const e = (window.EFFORT_LEVELS || {})[calc.effort];
    if (!m || !e) return null;
    const inTok = window.tokenize($('calcPrompt').value).count;
    const cikti = m.tipikCikti || 300;
    const inWh = inTok / 1000 * m.inWh1k;
    const outWh = cikti / 1000 * m.outWh1k;
    const gizliWh = e.gizliToken / 1000 * m.outWh1k;
    const perRun = inWh + outWh + gizliWh;
    return { inTok, cikti, inWh, outWh, gizliWh, perRun, total: perRun * calc.attempts };
  }

  function ciz() {
    const r = hesapla(); if (!r || !$('status')) return;
    const U_ = U(), eq = U_.equivalents(r.total);

    if ($('inTokens')) $('inTokens').textContent = r.inTok;

    let cls = 'green', txt = '🌱 Verimli';
    if (r.total > 20) { cls = 'red'; txt = '🔴 Yüksek maliyet'; }
    else if (r.total > 4) { cls = 'amber'; txt = '⚠️ Orta maliyet'; }
    $('status').className = 'status ' + cls;
    $('status').textContent = txt;

    $('energyHuman').textContent = U_.phoneText(r.total);
    $('energyWater').textContent = '💧 ' + U_.waterText(eq.waterMl);
    $('energyTech').textContent = 'teknik: ' + U_.fmt(r.total, 2) + ' Wh  ·  tek prompt ' +
      U_.fmt(r.perRun, 2) + ' Wh × ' + calc.attempts;

    $('metrics').innerHTML = [
      { i: '⚡', v: U_.fmt(r.total, 2), l: 'Wh' },
      { i: '💧', v: U_.fmt(eq.waterMl, 1), l: 'mL su' },
      { i: '🏭', v: U_.fmt(eq.co2g, 2), l: 'g CO₂' }
    ].map(t => '<div class="metric"><div class="icon">' + t.i + '</div>' +
      '<div class="v">' + t.v + '</div><div class="l">' + t.l + '</div></div>').join('');

    $('breakdown').innerHTML = '<div class="text-mute mb">Tek promptun dökümü</div>' +
      [['Girdi: promptu okumak (' + r.inTok + ' token)', r.inWh],
       ['Çıktı: cevabı yazmak (' + r.cikti + ' token)', r.outWh],
       ['Cevaptan önceki gizli düşünme', r.gizliWh]
      ].map(b => '<div class="breakdown-row"><span class="text-soft">' + b[0] + '</span>' +
        '<span class="text-green">' + U_.fmt(b[1], 3) + ' Wh</span></div>').join('');
  }

  function parametreKur() {
    if (!$('textModel')) return;
    $('textModel').innerHTML = secenekler(window.TEXT_MODELS, calc.model);
    calc.model = $('textModel').value;

    $('effortSeg').innerHTML = Object.keys(window.EFFORT_LEVELS).map(k =>
      '<button data-effort="' + k + '" class="' + (k === calc.effort ? 'active' : '') + '">' +
      esc(window.EFFORT_LEVELS[k].label) + '</button>').join('');

    $('textModel').addEventListener('change', function () {
      calc.model = this.value; modelNotu(); ciz();
    });
    $('calcPrompt').addEventListener('input', ciz);
    $('attempts').addEventListener('input', function () {
      calc.attempts = +this.value; $('attemptsLbl').textContent = this.value; ciz();
    });
    $('effortSeg').addEventListener('click', function (ev) {
      const b = ev.target.closest('[data-effort]'); if (!b) return;
      calc.effort = b.dataset.effort;
      this.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
      efforNotu(); ciz();
    });

    modelNotu(); efforNotu(); ciz();
  }

  /* ---------- 4) SENİN ELİNDE NE VAR ---------- */
  function elinde() {
    const a = $('elindeDegil'), b = $('elindeVar');
    if (a) a.innerHTML = (window.ELINDE_DEGIL || []).map(x =>
      '<div class="elinde-satir pasif"><span class="elinde-ikon">' + x.ikon + '</span>' +
      '<span>' + esc(x.b) + '</span></div>').join('');
    if (b) b.innerHTML = (window.ELINDE || []).map(x =>
      '<div class="elinde-satir"><span class="elinde-ikon">' + x.ikon + '</span>' +
      '<span><b>' + esc(x.b) + '</b><br><span class="text-soft">' + x.m + '</span></span></div>').join('');
    if ($('elindeDers')) $('elindeDers').innerHTML = window.ELINDE_DERS || '';
  }

  /* ---------- 5) TOKEN AVI · üç tür ----------
     Her kutu kendi türünün model listesini kullanır. Görsel ve
     videoda prompt uzunluğu enerjiye KATILMAZ (bkz. SITE_RULES 4c);
     token sayısı yine de gösterilir, çünkü öğrencinin göreceği şey
     "prompt uzun ama fark etmiyor" gerçeğidir. */
  const AV_MODEL = {};

  function avEnerji(tur, key, inTok) {
    if (tur === 'metin') {
      const m = window.TEXT_MODELS[key];
      return inTok / 1000 * m.inWh1k + (m.tipikCikti || 300) / 1000 * m.outWh1k;
    }
    if (tur === 'gorsel') return window.IMAGE_MODELS[key].whPer;
    return window.VIDEO_MODELS[key].whPerSecond * 5;   // 5 saniyelik video
  }

  function avListe(tur) {
    return tur === 'metin' ? window.TEXT_MODELS
         : tur === 'gorsel' ? window.IMAGE_MODELS : window.VIDEO_MODELS;
  }

  function avCiz(tur) {
    const inp = $('av-' + tur), U_ = U();
    if (!inp) return;
    const r = window.tokenize(inp.value);
    const n = inp.value.trim() ? r.count : 0;
    const wh = avEnerji(tur, AV_MODEL[tur], n);
    const eq = U_.equivalents(wh);

    $('avTok-' + tur).textContent = n;
    $('avWh-' + tur).textContent = U_.fmt(wh, 2);
    $('avSarj-' + tur).textContent = U_.phoneText(wh);
    $('avSu-' + tur).textContent = U_.fmt(eq.waterMl, 1) + ' mL';
    $('avChips-' + tur).innerHTML = r.pieces.slice(0, 60).map((p, i) =>
      '<span class="tok tok-c' + ((i % 6) + 1) + '">' +
      '<span class="' + (p.ws ? 'ws' : '') + '">' + (p.ws ? '␣' : esc(p.text)) + '</span></span>'
    ).join('');
  }

  function avciKur() {
    const host = $('avciKutulari'); if (!host) return;
    const K = window.AVCI_KUTULARI || [];

    host.innerHTML = K.map(k => {
      const M = avListe(k.tur);
      const ilk = Object.keys(M)[0];
      AV_MODEL[k.tur] = ilk;
      return '<div class="card card-top col-card">' +
        '<div class="big-emoji">' + k.ikon + '</div>' +
        '<h3 class="m-0">' + esc(k.ad) + '</h3>' +
        '<label class="label mt" for="avm-' + k.tur + '">Araç</label>' +
        '<select class="field" id="avm-' + k.tur + '">' + secenekler(M, ilk) + '</select>' +
        '<label class="label mt" for="av-' + k.tur + '">' + esc(k.baslik) + '</label>' +
        '<textarea class="field" id="av-' + k.tur + '" rows="3">' + esc(k.ornek) + '</textarea>' +
        '<div class="tok-box mt" id="avChips-' + k.tur + '"></div>' +
        '<div class="av-olcum mt">' +
          '<span>token</span><b id="avTok-' + k.tur + '">0</b>' +
          '<span>enerji</span><b><span id="avWh-' + k.tur + '">0</span> Wh</b>' +
          '<span>su</span><b id="avSu-' + k.tur + '">0 mL</b>' +
        '</div>' +
        '<div class="huge-num center mt" id="avSarj-' + k.tur + '">—</div>' +
        '<p class="src mb-0">' + esc(k.not) + '</p>' +
      '</div>';
    }).join('');

    K.forEach(k => {
      $('av-' + k.tur).addEventListener('input', () => avCiz(k.tur));
      $('avm-' + k.tur).addEventListener('change', function () {
        AV_MODEL[k.tur] = this.value; avCiz(k.tur);
      });
      avCiz(k.tur);
    });
  }

  /* ---------- 6) ÖNCE / SONRA ----------
     Bozuk prompt solda sabit, öğrencinin hâli sağda. Fark, girdi
     token'ı üzerinden ölçülür — görsel ve videoda enerji farkı
     promptla değil, DENEME SAYISIYLA gelir; kart bunu söyler. */
  function onceSonraKur() {
    const host = $('onceSonra'); if (!host) return;
    const L = window.ONCE_SONRA || [];

    host.innerHTML = L.map((o, i) =>
      '<div class="os-satir">' +
        '<div class="card duello-col kotu">' +
          '<div class="chip mb">' + o.ikon + ' ' + esc(o.ad) + ' · ❌ verilen</div>' +
          '<div class="prompt-box prompt-bad">' + esc(o.kotu) + '</div>' +
          '<div class="av-olcum mt"><span>token</span><b id="osA-' + i + '">0</b></div>' +
        '</div>' +
        '<div class="card card-top duello-col">' +
          '<div class="chip mb">✅ senin hâlin</div>' +
          '<textarea class="field" id="osB-' + i + '" rows="3" placeholder="Daha verimli hâlini yaz…"></textarea>' +
          '<p class="src mt mb-0"><b>İpucu:</b> ' + esc(o.ipucu) + '</p>' +
          '<div class="av-olcum mt"><span>token</span><b id="osBTok-' + i + '">0</b></div>' +
          '<div class="os-bar"><div class="os-dolu" id="osBar-' + i + '"></div></div>' +
          '<div class="os-sonuc" id="osSonuc-' + i + '">Sağdaki kutuya yazmaya başla.</div>' +
        '</div>' +
      '</div>'
    ).join('');

    L.forEach((o, i) => {
      const aTok = window.tokenize(o.kotu).count;
      $('osA-' + i).textContent = aTok;
      const inp = $('osB-' + i);
      inp.addEventListener('input', () => osCiz(i, o, aTok));
      osCiz(i, o, aTok);
    });
  }

  function osCiz(i, o, aTok) {
    const inp = $('osB-' + i);
    const bTok = inp.value.trim() ? window.tokenize(inp.value).count : 0;
    $('osBTok-' + i).textContent = bTok;

    const bar = $('osBar-' + i), sonuc = $('osSonuc-' + i);
    if (!bTok) {
      bar.style.width = '0%';
      bar.className = 'os-dolu';
      sonuc.textContent = 'Sağdaki kutuya yazmaya başla.';
      return;
    }

    const fark = (aTok - bTok) / aTok * 100;
    bar.style.width = Math.min(100, Math.abs(fark)) + '%';
    bar.className = 'os-dolu' + (fark < 0 ? ' artis' : '');

    /* Metinde kısalık doğrudan kazanç; görsel ve videoda asıl kazanç
       NETLİKTEN gelir — kart bunu açıkça söyler ki öğrenci
       "kısa = iyi" diye yanlış bir kural çıkarmasın. */
    if (o.tur === 'metin') {
      sonuc.innerHTML = fark > 0
        ? 'Girdi <b>%' + Math.round(fark) + '</b> kısaldı. Asıl kazanç ise <b>net</b> olduğu için modelin kısa cevap vermesi.'
        : 'Girdi <b>%' + Math.round(-fark) + '</b> uzadı — sorun değil, <b>netse</b> toplamda kazandırır.';
    } else {
      sonuc.innerHTML = 'Burada kısalık önemli değil: bedel üretimde. ' +
        'Net prompt <b>tek seferde</b> tutturur, deneme sayısını düşürür.';
    }
  }

  /* ---------- Motor rozeti ---------- */
  function motor() {
    const b = $('avciMotor'); if (!b) return;
    b.textContent = window.__tokenizerReal
      ? '✓ Gerçek tokenizer (o200k_base) yüklendi — sayımlar kesin.'
      : '≈ Hızlı tahmin kullanılıyor; kesin sayaç internetten yükleniyor…';
  }

  /* ---------- Başlat ---------- */
  function init() {
    akis(); karsilastir(); diffusionSim();
    parametreKur(); elinde(); avciKur(); onceSonraKur(); motor();

    window.addEventListener('tokenizer-ready', () => {
      motor(); ciz();
      (window.AVCI_KUTULARI || []).forEach(k => avCiz(k.tur));
      onceSonraKur();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
