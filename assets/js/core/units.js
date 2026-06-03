/* =========================================================
   BİRİM ÇEVİRİCİ (paylaşılan)
   ---------------------------------------------------------
   Wh (watt-saat) enerjiyi → telefon şarjı, video izleme,
   LED ampul süresi, baraj üretim süresi, su ve CO₂'ye çevirir.
   Ayarlar: config/units.config.js   (önce o yüklenmeli)

   Kullanım:
     Units.equivalents(0.5)   → { phones, videoMin, ledMin, dam, waterMl, co2g }
     Units.human(0.5)         → "≈ 2,5 dk video izleme"  (en uygun birimi seçer)
     Units.fmt(1234.5)        → "1.234,5"
   ========================================================= */
(function () {
  const C = window.UNITS_CONFIG || {};

  function fmt(n, d) {
    d = (d == null) ? 2 : d;
    if (!isFinite(n)) return '—';
    if (n === 0) return '0';
    if (Math.abs(n) < 0.01) return n.toExponential(1).replace('.', ',');
    if (Math.abs(n) >= 1000) return Math.round(n).toLocaleString('tr-TR');
    return n.toLocaleString('tr-TR', { maximumFractionDigits: d });
  }

  function equivalents(wh) {
    const phones   = wh / (C.phoneChargeWh || 12);
    const ledMin   = (wh / (C.ledWatt || 8)) * 60;
    const videoMin = (wh / (C.videoWhPerHour || 100)) * 60;
    const waterMl  = (wh / 1000) * (C.waterLitrePerKwh || 3.69) * 1000;
    const co2g     = wh * (C.co2GramPerWh || 0.125);

    // Baraj: enerji / kurulu güç → süre. En büyük baraj baz alınır.
    const dams = (C.dams || []).map(d => {
      const hours = wh / (d.mw * 1e6);   // Wh / W = saat
      return { name: d.name, mw: d.mw, hours, seconds: hours * 3600 };
    });

    return { wh, phones, ledMin, videoMin, waterMl, co2g, dams };
  }

  /* Süreyi okunaklı yaz: 90 sn → "1,5 dk", 5400 sn → "1,5 saat" */
  function dur(minutes) {
    if (minutes < 1)   return fmt(minutes * 60, 0) + ' sn';
    if (minutes < 90)  return fmt(minutes, 1) + ' dk';
    if (minutes < 1440) return fmt(minutes / 60, 1) + ' saat';
    return fmt(minutes / 1440, 1) + ' gün';
  }

  /* En anlaşılır tek cümle (otomatik birim seçer) */
  function human(wh) {
    const e = equivalents(wh);
    if (e.phones >= 0.5) return '≈ ' + fmt(e.phones, 1) + ' telefon şarjı';
    if (e.videoMin >= 1) return '≈ ' + dur(e.videoMin) + ' video izleme';
    return '≈ ' + dur(e.ledMin) + ' LED ampul';
  }

  /* Baraj cümlesi: büyük (eğitim) enerjiler için */
  function damSentence(wh) {
    const e = equivalents(wh);
    const d = e.dams[0];
    if (!d) return '';
    if (d.hours >= 24) return d.name + '’nın ' + fmt(d.hours / 24, 1) + ' günlük üretimi';
    if (d.hours >= 1)  return d.name + '’nın ' + fmt(d.hours, 1) + ' saatlik üretimi';
    return d.name + '’nın ' + fmt(d.hours * 60, 0) + ' dakikalık üretimi';
  }

  window.Units = { fmt, equivalents, human, dur, damSentence };
})();
