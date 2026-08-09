/* =========================================================
   ANASAYFA = YEŞİL PROMPT RESİM SERGİSİ
   ---------------------------------------------------------
   Sergi kendi başına bir salondur: menü, başlık ve tanıtım
   metni YOKTUR. Ziyaretçiyi doğrudan ilk eser karşılar.

   1) Sabit 3'lü ızgara (dar ekranda 2, telefonda 1'e iner).
      Her eserin altında müze etiketi gibi bir künye durur:
      eser adı · üreten · model · enerji.
   2) Lightbox — esere tıklayınca; bilgiler altta kompakt bir şerit.
   3) Sağ altta yuvarlak atölye kapısı düğmesi.

   İçerik config/site.config.js içindedir (SERGI, GALLERY).
   ========================================================= */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var U = function () { return window.Units; };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
  }

  /* Tarih config'e sıralanabilir olsun diye ISO yazılır (2026-03-14);
     ekranda künyedeki biçimde görünür (14.03.2026). Başka bir biçimde
     yazılmışsa (ör. "Mart 2026") olduğu gibi bırakılır. */
  function fmtDate(v) {
    var s = String(v == null ? '' : v).trim();
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    return m ? m[3] + '.' + m[2] + '.' + m[1] : s;
  }

  var items = [];

  /* Bir eserin toplam enerjisi.
     Çoğu araç tek "üret"te birden fazla alternatif verir (4'lü ızgara gibi);
     harcanan enerji seçilen tek görselin değil, ÜRETİLEN HEPSİNİN enerjisidir.
       Toplam = tek görsel × denemedeki görsel sayısı × deneme sayısı
     variants yazılmamışsa 1 kabul edilir (eski kayıtlar bozulmaz). */
  function totalWh(it) {
    return (it.wh || 0) * (it.variants || 1) * (it.attempts || 1);
  }

  /* ---------- GALERİ ---------- */
  function renderGallery() {
    var host = $('gallery'); if (!host) return;

    if (!items.length) {
      host.innerHTML = '<p class="gal-empty">Henüz eser eklenmedi. ' +
        'Öğrenci eserleri için <code>assets/img/galeri/</code> klasörüne resim ekleyin.</p>';
      return;
    }

    var U_ = U();
    host.innerHTML = items.map(function (it, i) {
      var media = it.img
        ? '<img class="gal-img" src="' + esc(it.img) + '" alt="' + esc(it.title) + '" loading="lazy">'
        : '<span class="gal-ph ' + esc(it.ph || 'ph-a') + '">' + esc(it.emoji || '🌿') + '</span>';

      var wh = totalWh(it);
      var badge = (U_ ? U_.fmt(wh, 1) : wh) + ' Wh';

      /* Künye satırı: üreten ve model. Emojiler lightbox'takilerle
         aynıdır (👤 üreten, 🧩 model) — dil her yerde tutarlı kalsın.
         Boş alanlar hiç yazılmaz; tarih burada değil, lightbox'ta durur. */
      var meta = [];
      if (it.by)    meta.push('<span title="Üreten">👤 ' + esc(it.by) + '</span>');
      if (it.model) meta.push('<span title="Model">🧩 ' + esc(it.model) + '</span>');

      return (
        '<button class="gal-item" type="button" data-i="' + i + '" ' +
          'aria-label="' + esc(it.title) + ' — büyüt">' +
          '<span class="gal-frame">' + media + '</span>' +
          '<span class="gal-cap">' +
            '<span class="gal-name">' + esc(it.title) + '</span>' +
            '<span class="gal-line">' +
              '<span class="gal-meta">' + meta.join('') + '</span>' +
              '<span class="gal-wh">⚡ ' + esc(badge) + '</span>' +
            '</span>' +
          '</span>' +
        '</button>'
      );
    }).join('');

    /* Dosya bulunamazsa kırık resim ikonu yerine yer tutucuya dön —
       eser listesindeki yol yanlışsa galeri yine düzgün görünür. */
    Array.prototype.forEach.call(host.querySelectorAll('.gal-img'), function (img) {
      img.addEventListener('error', function () {
        var btn = img.closest('.gal-item');
        var it = (btn && items[+btn.dataset.i]) || {};
        var span = document.createElement('span');
        span.className = 'gal-ph ' + (it.ph || 'ph-a');
        span.textContent = it.emoji || '🌿';
        if (img.parentNode) img.parentNode.replaceChild(span, img);
      });
    });

    host.addEventListener('click', function (e) {
      var b = e.target.closest('.gal-item');
      if (b) openBox(+b.dataset.i);
    });
  }

  /* ---------- LIGHTBOX ---------- */
  var boxIndex = -1;
  var lastFocus = null;

  /* Damga çipleri: etiket yerine EMOJİ gösterilir.
     Emojiler sitenin başka yerlerinde kullanılanlarla aynıdır
     (⚡ enerji, 💧 su, 🏭 karbon…) ki dil her yerde tutarlı olsun.
     Metin etiketi kaybolmasın diye title olarak kalır — üzerine
     gelince görünür ve ekran okuyucuya bilgi verir. */
  function infoHtml(it) {
    var U_ = U();
    var wh = totalWh(it);
    var e = U_ ? U_.equivalents(wh) : null;

    /* Eşdeğer HER ZAMAN telefon şarjı cinsinden — eserler böyle
       birbiriyle karşılaştırılabilir olur (bkz. Units.phoneText). */
    var eq = U_ ? U_.phoneText(wh) : '—';

    /* [emoji, etiket, değer] */
    var chips = [
      ['🧩', 'Model',    it.model],
      ['🔁', 'Deneme',   '×' + (it.attempts || 1)],
      ['⚡', 'Enerji',   (U_ ? U_.fmt(wh, 2) : wh) + ' Wh'],
      ['💧', 'Su',       e ? U_.fmt(e.waterMl, 1) + ' mL' : '—'],
      ['🏭', 'Karbon',   e ? U_.fmt(e.co2g, 2) + ' g CO₂' : '—'],
      ['📱', 'Eşdeğer',  eq]
    ];
    /* Tek denemede birden fazla görsel üretildiyse bunu da göster */
    if ((it.variants || 1) > 1) {
      chips.splice(2, 0, ['🖼️', 'Her denemede', it.variants + ' görsel']);
    }
    /* Üreten ve tarih en başa: eserin kim tarafından ne zaman
       yapıldığı, maliyet rakamlarından önce okunur. */
    if (it.date) chips.unshift(['📅', 'Oluşturulma tarihi', fmtDate(it.date)]);
    if (it.by) chips.unshift(['👤', 'Üreten', it.by]);

    return (
      '<div class="box-head">' +
        '<h2 class="box-title">' + esc(it.title) + '</h2>' +
        '<span class="box-pos">' + (boxIndex + 1) + ' / ' + items.length + '</span>' +
      '</div>' +
      (it.prompt ? '<p class="box-prompt"><b>Prompt:</b> ' + esc(it.prompt) + '</p>' : '') +
      '<div class="box-chips">' + chips.map(function (c) {
        return '<span class="box-chip" title="' + esc(c[1]) + '">' +
                 '<b aria-hidden="true">' + c[0] + '</b>' +
                 '<span class="sr-only">' + esc(c[1]) + ': </span>' +
                 esc(c[2]) +
               '</span>';
      }).join('') + '</div>'
    );
  }

  function paintBox() {
    var it = items[boxIndex]; if (!it) return;
    var media = $('boxMedia'), info = $('boxInfo');

    if (media) {
      media.innerHTML = it.img
        ? '<img class="box-img" src="' + esc(it.img) + '" alt="' + esc(it.title) + '">'
        : '<div class="box-ph ' + esc(it.ph || 'ph-a') + '">' + esc(it.emoji || '🌿') + '</div>';
    }
    if (info) info.innerHTML = infoHtml(it);
  }

  function openBox(i) {
    var box = $('lightbox'); if (!box || !items[i]) return;
    lastFocus = document.activeElement;
    boxIndex = i;
    paintBox();
    box.hidden = false;
    document.body.classList.add('box-open');
    if ($('boxClose')) $('boxClose').focus();
  }

  function closeBox() {
    var box = $('lightbox'); if (!box) return;
    box.hidden = true;
    document.body.classList.remove('box-open');
    boxIndex = -1;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(d) {
    if (boxIndex < 0) return;
    boxIndex = (boxIndex + d + items.length) % items.length;
    paintBox();
  }

  function wireBox() {
    var box = $('lightbox'); if (!box) return;

    if ($('boxClose')) $('boxClose').addEventListener('click', closeBox);
    if ($('boxPrev')) $('boxPrev').addEventListener('click', function () { step(-1); });
    if ($('boxNext')) $('boxNext').addEventListener('click', function () { step(1); });

    // Boşluğa tıklayınca kapat (esere ya da bilgi şeridine tıklayınca kapanmaz)
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.id === 'boxMedia') closeBox();
    });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); closeBox(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    });
  }

  /* ---------- SAĞ ALT DÜĞME ---------- */
  function wireCta() {
    var a = $('sergiCta'); if (!a) return;
    var S = window.SERGI || {};
    if (S.ctaHref) a.href = S.ctaHref;
    if (S.ctaLabel) {
      a.setAttribute('aria-label', S.ctaLabel);
      var lbl = a.querySelector('.fab-label');
      if (lbl) lbl.textContent = S.ctaLabel;
    }
  }

  /* ---------- Başlat ---------- */
  function init() {
    items = window.GALLERY || [];
    renderGallery();
    wireBox();
    wireCta();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
