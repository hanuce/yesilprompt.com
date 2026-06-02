/* =========================================================
   TOKENIZER (paylaşılan, ES modülü)
   ---------------------------------------------------------
   Gerçek o200k_base tokenizer'ı CDN'den yükler ve
   window.ecoTokenize(text) fonksiyonunu hazırlar.
   Yüklenince "tokenizer-ready" olayını tetikler.
   CDN açılmazsa sayfalar yaklaşık moda düşer (4 karakter ≈ 1 token).

   Bu dosya <script type="module"> ile yüklenmelidir.
   ========================================================= */
try {
  const mod = await import('https://esm.sh/gpt-tokenizer@2/encoding/o200k_base');
  const encode = mod.encode || (mod.default && mod.default.encode);
  const decode = mod.decode || (mod.default && mod.default.decode);

  window.ecoTokenize = function (text) {
    if (!text) return { count: 0, pieces: [] };
    const ids = encode(text);
    const pieces = ids.map(id => {
      let s = '';
      try { s = decode([id]); } catch (e) { s = '·'; }
      return { text: s, ws: /^\s+$/.test(s) };
    });
    return { count: ids.length, pieces };
  };
  window.__tokenizerReal = true;
  window.dispatchEvent(new Event('tokenizer-ready'));
} catch (e) {
  console.warn('Tokenizer CDN yüklenemedi; yaklaşık moda geçiliyor.', e);
}
