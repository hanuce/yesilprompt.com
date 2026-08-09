/* =========================================================
   GİRİŞ sayfası
   - Açılış soruları (aşağıdaki ETHICS dizisinden)
   - Materyal & kaynak havuzu (config/site.config.js → MATERIALS)

   Künye artık burada değil: her sayfanın sonundaki ortak
   footer slaytında durur (core/footer.js).
   ========================================================= */
(function () {
  const $ = (id) => document.getElementById(id);

  /* --- Açılış soruları (BURADAN DÜZENLE) ---
     İki damar var; ikisi de atölyenin ilerleyen sayfalarında karşılığını bulur:
       (a) SÜRDÜRÜLEBİLİRLİK — enerji, su, deneme sayısı, verimli prompt
       (b) ÜRETME MANTIĞI    — token, difüzyon, eğitim/kullanım ayrımı, düşünme bütçesi
     Amaç cevabı burada vermek değil; Modeller & Tarih ile Token Lab'da
     cevabı bulunacak soruyu öğrencinin zihnine önceden yerleştirmek. */
  const ETHICS = [
    /* (a) sürdürülebilirlik */
    'Bir tıkla 10 görsel üretmek “bedava” geliyorsa, bedeli kim ve nerede ödüyor?',
    'Veri merkezini soğutan su buharlaşıp gidiyor. Tek bir promptun “birkaç damlası”, günde milyarlarca kez tekrarlanınca ne olur?',
    'Aynı cevabı küçük ve verimli bir modelden de alabiliyorsan, büyüğünü seçmek tercih mi, alışkanlık mı?',
    /* (b) üretme mantığı */
    'Model senin promptunu toplu okur ama cevabı tek tek üretir. Öyleyse tasarruf için promptu mu kısaltmalı, istenen cevabı mı?',
    'Yapay zekâ Türkçe soruyu önce İngilizceye çevirmiyor; metni kendi dilinde parçalıyor. Peki neden bazı Türkçe kelimeler daha çok parçaya bölünüyor?',
    'Bir görsel, gürültüden başlayıp onlarca adımda arıtılıyor. Adım sayısını yarıya indirmek neyi ucuzlatır, neyi kaybettirir?',
    /* (a+b birlikte) */
    'Bir modeli baştan eğitmek tek seferlik dev bir maliyet; her sorgu ise küçük ama milyarlarca kez tekrarlanıyor. Gezegen için hangisi daha belirleyici?',
    'Model basit bir soruda da uzun uzun “düşünebiliyor”. Bu düşünme bütçesini kim ayarlamalı: model mi, sen mi?',
    'Model, izin alınmadan toplanmış metin ve çizimlerden öğrendiyse; ürettiği eser gerçekten “yeni” mi?'
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

  function renderMaterials() {
    const host = $('materialsPool'); if (!host || !window.MATERIALS) return;
    const icon = { dosya: '⬇️', arac: '↗', kaynak: '📖' };
    host.innerHTML = window.MATERIALS.map(m =>
      '<a class="chip" href="' + m.url + '"' +
      (m.download ? ' download' : ' target="_blank" rel="noopener"') + '>' +
      (icon[m.kind] || '•') + ' ' + m.label + '</a>'
    ).join('');
  }

  function init() { renderEthics(); renderMaterials(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
