/* =========================================================
   TOKEN SAYACI yardımcısı (paylaşılan, klasik script)
   window.tokenize(text) → { count, pieces, approx }
   Gerçek tokenizer (tokenizer.module.js) hazırsa onu,
   değilse ~4 karakter/token yaklaşımını kullanır.
   ========================================================= */
(function () {
  window.tokenize = function (text) {
    if (!text) return { count: 0, pieces: [] };
    if (window.ecoTokenize) {
      try { return window.ecoTokenize(text); } catch (e) { /* fallback */ }
    }
    const pieces = (text.match(/\s+|[^\s]+/g) || []).map(p => ({ text: p, ws: /^\s+$/.test(p) }));
    return { count: Math.max(1, Math.round(text.length / 4)), pieces, approx: true };
  };
})();
