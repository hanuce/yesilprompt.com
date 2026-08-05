/* =========================================================
   GİRİŞ sayfası
   - Etik sorgulama kartları (aşağıdaki ETHICS dizisinden)
   - Künye  (config/site.config.js → KUNYE)
   - Materyal & kaynak havuzu (config/site.config.js → MATERIALS)
   ========================================================= */
(function () {
  const $ = (id) => document.getElementById(id);

  /* --- Düşündüren / etik sorular (BURADAN DÜZENLE) --- */
  const ETHICS = [
    'Bir resmi üretmek için harcanan suyu, onu içecek biri olsaydı yine ister miydin?',
    'Yapay zekâ “bilmiyorum” demek yerine uyduruyorsa sorumluluk kimde: modelde mi, soruyu soranda mı?',
    'Bir tıkla 10 görsel üretmek “bedava” geliyorsa, bedeli kim ve nerede ödüyor?',
    'İnternetteki yazını ve çizimini izin almadan eğitime kullanan bir model adil mi?',
    'Aynı işi daha az kaynakla yapabilecekken fazlasını harcamak bir tercih mi, alışkanlık mı?',
    'Verimlilik “en kısa prompt” mu, yoksa “en az toplam deneme” mi olmalı?'
  ];

  function renderEthics() {
    const host = $('ethicsCards'); if (!host) return;
    host.innerHTML = ETHICS.map((q, i) =>
      '<div class="card q-card">' +
        '<span class="q-num">' + (i + 1) + '</span>' +
        '<span class="q-txt text-soft">' + q + '</span>' +
      '</div>'
    ).join('');
  }

  function renderKunye() {
    const host = $('kunyeBox'); if (!host || !window.KUNYE) return;
    const k = window.KUNYE;
    const rows = [
      ['Program', k.program], ['Proje', k.proje], ['Proje No', k.projeNo],
      ['Atölye', k.atolye], ['Tarih', k.tarih], ['Yer', k.yer],
      ['Yürütücü', k.yurutucu], ['Eğitmen', k.egitmen], ['Hedef kitle', k.hedef]
    ];
    host.innerHTML =
      '<dl>' + rows.map(r => '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>').join('') + '</dl>' +
      '<p class="src mt">' + k.not + '</p>';
  }

  function renderMaterials() {
    const host = $('materialsPool'); if (!host || !window.MATERIALS) return;
    const icon = { dosya: '⬇️', arac: '↗', kaynak: '📖' };
    host.innerHTML = window.MATERIALS.map(m =>
      '<a class="chip" href="' + m.url + '"' +
      (m.download ? ' download' : ' target="_blank" rel="noopener"') + '>' +
      (icon[m.kind] || '•') + ' ' + m.label + '</a>'
    ).join('');
  }

  function init() { renderEthics(); renderKunye(); renderMaterials(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
