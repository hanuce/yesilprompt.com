/* =========================================================
   FON MÜZİĞİ — SİNEMATİK AMBİYANS (paylaşılan)
   ---------------------------------------------------------
   Ses dosyası YOKTUR. Müzik tarayıcıda Web Audio API ile
   ANLIK ÜRETİLİR: 0 KB indirme, telif sorunu yok, hiç bitmez.

   Katmanlar (aşağıdan yukarı):
     1) Pedal      — akorun kökü, çok derin sinüs (salonun zemini)
     2) Pad        — org/yaylı dokusu: detune'lu testere dalgaları,
                     alçak geçiren filtre, 4-5 sn'lik yavaş açılma
     3) Ostinato   — akor notaları üzerinde sakin arpej (arka plan nabzı)
     4) Yankı      — prosedürel katedral reverb (uzun kuyruklu)

   Ayarlar: config/site.config.js → AMBIENT   (önce o yüklenmeli)

   Kullanım:
     Ambient.arm()        → tarayıcı izin verir vermez başlat
     Ambient.toggle()     → aç / kapa  (true döner = artık çalıyor)
     Ambient.isOn()       → şu an çalıyor mu?
     Ambient.onChange(fn) → durum değişince haber ver (düğme için)

   NOT: Tarayıcılar kullanıcı etkileşimi olmadan ses çalmayı engeller.
   arm() bunu bilir: hemen dener, engellenirse ilk tıklama/tuş/kaydırmayı
   bekler. Kullanıcının aç/kapa tercihi localStorage'da hatırlanır.
   ========================================================= */
(function () {
  'use strict';

  var CFG = function () { return window.AMBIENT || {}; };
  var STORE_KEY = 'yp-ambient';

  var ctx = null;        // AudioContext
  var master = null;     // ana ses seviyesi (fade in/out burada)
  var dry = null;        // yankısız yol
  var wet = null;        // yankıya giden yol
  var pedalOsc = null;   // sürekli çalan derin kök nota
  var pedalGain = null;
  var playing = false;
  var chordIndex = 0;
  var timer = null;
  var listeners = [];

  /* ---------- Nota adı → frekans ---------- */
  var SEMI = { 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5,
               'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11 };

  /* Akor tipleri: kökten itibaren yarım ton aralıkları */
  var CHORDS = { min: [0, 3, 7], maj: [0, 4, 7], sus4: [0, 5, 7] };

  function midi(noteName, octave) {
    return 12 * (octave + 1) + (SEMI[noteName] || 0);
  }
  function hz(m) { return 440 * Math.pow(2, (m - 69) / 12); }

  /* ---------- Katedral yankısı (prosedürel impulse) ----------
     Üstel sönümlenen gürültü = geniş bir taş salonun yankısı.
     Stereo genişlik için iki kanal ayrı üretilir. */
  function buildReverb(seconds, decay) {
    var rate = ctx.sampleRate;
    var len = Math.floor(rate * seconds);
    var buf = ctx.createBuffer(2, len, rate);
    for (var c = 0; c < 2; c++) {
      var data = buf.getChannelData(c);
      for (var i = 0; i < len; i++) {
        var t = i / len;
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
      }
    }
    return buf;
  }

  /* ---------- Ses zincirini bir kez kur ---------- */
  function build() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = 0;

    // Sıcaklık: tiz uçları yumuşat, sert duyulmasın
    var warm = ctx.createBiquadFilter();
    warm.type = 'lowpass';
    warm.frequency.value = 2600;
    warm.Q.value = 0.4;

    // Sınırlayıcı: yalnızca tepe noktalarını yakalar, gövdeyi ezmez.
    // (Eşiği çok düşük tutarsak müzik boğuk ve cansız çıkar.)
    var comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -6;
    comp.knee.value = 6;
    comp.ratio.value = 8;
    comp.attack.value = 0.02;
    comp.release.value = 0.4;

    var verb = ctx.createConvolver();
    verb.normalize = true;              // yankı kuyruğunu ölçekle (yoksa çok gür çıkar)
    verb.buffer = buildReverb(5.5, 2.2);

    dry = ctx.createGain(); dry.gain.value = 0.55;
    wet = ctx.createGain(); wet.gain.value = 0.5;

    var verbOut = ctx.createGain(); verbOut.gain.value = 1;

    wet.connect(verb); verb.connect(verbOut); verbOut.connect(warm);
    dry.connect(warm);
    warm.connect(comp); comp.connect(master); master.connect(ctx.destination);

    // Sürekli derin pedal — akor değiştikçe yumuşakça yeni köke kayar
    pedalGain = ctx.createGain();
    pedalGain.gain.value = 0;
    pedalOsc = ctx.createOscillator();
    pedalOsc.type = 'sine';
    pedalOsc.frequency.value = hz(midi('D', 1));
    pedalOsc.connect(pedalGain);
    pedalGain.connect(dry);
    pedalGain.connect(wet);
    pedalOsc.start();

    return true;
  }

  /* ---------- Tek bir pad sesi (org / yaylı dokusu) ----------
     Üç hafif detune'lu testere + bir oktav üstü üçgen dalga.
     Yavaş açılıp yavaş kapanır; akorlar birbirinin içine geçer. */
  function voice(freq, t0, dur, peak) {
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);

    var flt = ctx.createBiquadFilter();
    flt.type = 'lowpass';
    flt.Q.value = 0.6;
    // Filtre yavaşça açılır: ses "nefes alır" gibi büyür
    flt.frequency.setValueAtTime(420, t0);
    flt.frequency.linearRampToValueAtTime(1500, t0 + dur * 0.55);
    flt.frequency.linearRampToValueAtTime(600, t0 + dur + 3);

    // Üst üste binen dalgaları topla: 3 testere + hava katmanı tek başına
    // 1.0'ı aşmasın diye önce kısılır (yoksa ses kırılır/cızırdar).
    var mix = ctx.createGain();
    mix.gain.value = 0.28;
    mix.connect(flt);

    var detunes = [-8, 0, 7];
    for (var i = 0; i < detunes.length; i++) {
      var o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = freq;
      o.detune.value = detunes[i];
      o.connect(mix);
      o.start(t0);
      o.stop(t0 + dur + 4);
    }
    // Oktav üstü üçgen: orgun parlaklığı
    var air = ctx.createOscillator();
    air.type = 'triangle';
    air.frequency.value = freq * 2;
    var airG = ctx.createGain();
    airG.gain.value = 0.22;
    air.connect(airG); airG.connect(mix);
    air.start(t0); air.stop(t0 + dur + 4);

    flt.connect(g);
    g.connect(dry);
    g.connect(wet);

    // Zarf: uzun açılma → tut → uzun kapanma
    var attack = dur * 0.38;
    g.gain.exponentialRampToValueAtTime(peak, t0 + attack);
    g.gain.setValueAtTime(peak, t0 + dur * 0.72);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + 3.5);
  }

  /* ---------- Arpej notası (arka plan nabzı) ---------- */
  function pluck(freq, t0, peak) {
    var o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = freq;

    var flt = ctx.createBiquadFilter();
    flt.type = 'lowpass';
    flt.frequency.value = 1800;

    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.9);

    o.connect(flt); flt.connect(g);
    g.connect(dry);
    g.connect(wet);
    o.start(t0);
    o.stop(t0 + 2.1);
  }

  /* ---------- Bir akoru planla ---------- */
  function scheduleChord(when) {
    var cfg = CFG();
    var prog = cfg.progression && cfg.progression.length
      ? cfg.progression
      : [['D', 'min']];
    var dur = cfg.chordSeconds || 13;
    var bpm = cfg.bpm || 72;

    var step = prog[chordIndex % prog.length];
    chordIndex++;

    var root = step[0];
    var intervals = CHORDS[step[1]] || CHORDS.min;

    // Pedal: yeni köke 3 saniyede yumuşakça kay
    var pedalHz = hz(midi(root, 1));
    pedalOsc.frequency.cancelScheduledValues(when);
    pedalOsc.frequency.setValueAtTime(pedalOsc.frequency.value, when);
    pedalOsc.frequency.linearRampToValueAtTime(pedalHz, when + 3);

    // Pad: akorun notaları 3. oktavda + kök 2. oktavda (gövde)
    voice(hz(midi(root, 2)), when, dur, 0.15);
    for (var i = 0; i < intervals.length; i++) {
      var m = midi(root, 3) + intervals[i];
      voice(hz(m), when, dur, 0.10);
    }
    // Bir ses 4. oktavda: tepede ince bir ışık
    voice(hz(midi(root, 4) + intervals[intervals.length - 1]), when, dur, 0.05);

    // Ostinato: akor notaları üzerinde inip çıkan sakin bir desen
    var beat = 60 / bpm;
    var pattern = [0, 1, 2, 1];           // akor notası sırası
    var notes = Math.floor(dur / beat);
    for (var n = 0; n < notes; n++) {
      var idx = pattern[n % pattern.length];
      var oct = (n % 8 < 4) ? 4 : 5;      // her 4 notada bir oktav değişir
      var f = hz(midi(root, oct) + intervals[idx]);
      // Başta sessiz, ortada belirgin, sonda tekrar sessiz
      var shape = Math.sin((n / notes) * Math.PI);
      pluck(f, when + n * beat, 0.012 + 0.020 * shape);
    }

    return dur;
  }

  /* ---------- Döngü ---------- */
  function loop() {
    if (!playing) return;
    var dur = scheduleChord(ctx.currentTime + 0.08);
    // Sonraki akoru, bu akor bitmeden biraz önce planla (kesintisiz geçiş)
    timer = setTimeout(loop, Math.max(1000, (dur - 1.2) * 1000));
  }

  function notify() {
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](playing); } catch (e) { /* yoksay */ }
    }
  }

  function fadeTo(value, seconds) {
    var now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(value, now + seconds);
  }

  /* ---------- Genel API ---------- */
  function start() {
    if (playing) return true;
    if (!ctx && !build()) return false;      // tarayıcı desteklemiyor
    if (ctx.state === 'suspended') ctx.resume();

    playing = true;
    chordIndex = 0;
    pedalGain.gain.setTargetAtTime(0.16, ctx.currentTime, 2);
    fadeTo(CFG().volume == null ? 0.14 : CFG().volume, 4);
    loop();
    notify();
    return true;
  }

  function stop() {
    if (!playing) return;
    playing = false;
    clearTimeout(timer);
    fadeTo(0.0001, 1.6);
    if (pedalGain) pedalGain.gain.setTargetAtTime(0, ctx.currentTime, 0.6);
    notify();
  }

  function toggle() {
    if (playing) { stop(); remember(false); return false; }
    var ok = start();
    if (ok) remember(true);
    return ok;
  }

  function remember(on) {
    try { localStorage.setItem(STORE_KEY, on ? 'on' : 'off'); } catch (e) { /* yoksay */ }
  }
  function preference() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }

  /* Tarayıcı izin verir vermez başlat.
     Doğrudan deneriz; engellenirse ilk kullanıcı hareketini bekleriz. */
  function arm() {
    if (preference() === 'off') { notify(); return; }   // kullanıcı kapatmış

    var armed = false;
    function tryStart() {
      if (armed || playing) return;
      armed = true;
      start();
      off();
    }
    function off() {
      ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (ev) {
        window.removeEventListener(ev, tryStart);
      });
    }
    ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (ev) {
      window.addEventListener(ev, tryStart, { once: true, passive: true });
    });

    // Bazı tarayıcılar (kullanıcı siteyle daha önce etkileşmişse) hemen izin verir
    if (!ctx && !build()) return;              // desteklenmiyorsa sessizce vazgeç
    if (ctx.state === 'running') { tryStart(); }
    else {
      ctx.resume().then(function () {
        if (ctx.state === 'running') tryStart();
      }).catch(function () { /* ilk hareketi bekle */ });
    }
  }

  /* Sekme arka plana geçince sesi kıs (pil ve nezaket) */
  document.addEventListener('visibilitychange', function () {
    if (!ctx || !playing) return;
    fadeTo(document.hidden ? 0.0001 : (CFG().volume == null ? 0.14 : CFG().volume), 1.2);
  });

  window.Ambient = {
    arm: arm,
    start: start,
    stop: stop,
    toggle: toggle,
    isOn: function () { return playing; },
    onChange: function (fn) { listeners.push(fn); fn(playing); }
  };
})();
