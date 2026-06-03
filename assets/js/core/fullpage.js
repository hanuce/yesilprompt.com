/* =========================================================
   TAM EKRAN SLAYT MOTORU  (paylaşılan — her sayfa kullanır)
   ---------------------------------------------------------
   Ne yapar: Sayfadaki .fp-section bloklarını tam ekran "slayt"
   gibi gösterir; fare tekeri / klavye okları / dokunma / yan
   noktalar / alt ileri-geri ile her gesture'da TEK slayt kaydırır.

   Bu dosyayı DÜZENLEMENE GEREK YOK. İçeriği HTML'deki
   <section class="fp-section"> bloklarından değiştir.
   ========================================================= */
(function () {
  function initFullpage() {
    const root = document.querySelector('.fp-root');
    const track = document.querySelector('.fp-track');
    if (!root || !track) return;

    const sections = Array.from(track.querySelectorAll('.fp-section'));
    if (!sections.length) return;

    let index = 0;
    let animating = false;
    const COOLDOWN = 850;       // iki geçiş arası min süre (ms)

    document.body.classList.add('fp-on');

    /* --- Yan nokta göstergeleri --- */
    const dots = document.createElement('div');
    dots.className = 'fp-dots';
    sections.forEach((s, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', (i + 1) + '. slayt');
      b.title = s.dataset.title || ('Slayt ' + (i + 1));
      b.addEventListener('click', () => go(i));
      dots.appendChild(b);
    });
    document.body.appendChild(dots);

    /* --- Alt ileri/geri --- */
    const arrows = document.createElement('div');
    arrows.className = 'fp-arrows';
    /* Dikey yığın: yukarı ok · sayaç · aşağı ok (görünüm style.css → .fp-arrows) */
    arrows.innerHTML =
      '<button data-prev aria-label="Önceki slayt">&#8593;</button>' +
      '<span class="count"></span>' +
      '<button data-next aria-label="Sonraki slayt">&#8595;</button>';
    document.body.appendChild(arrows);
    const prevBtn = arrows.querySelector('[data-prev]');
    const nextBtn = arrows.querySelector('[data-next]');
    const countEl = arrows.querySelector('.count');
    prevBtn.addEventListener('click', () => go(index - 1));
    nextBtn.addEventListener('click', () => go(index + 1));

    function sizeSections() {
      const h = root.clientHeight;
      sections.forEach(s => { s.style.height = h + 'px'; });
    }

    function render() {
      track.style.transform = 'translateY(' + (-index * root.clientHeight) + 'px)';
      sections.forEach((s, i) => s.classList.toggle('active', i === index));
      dots.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === index));
      countEl.textContent = (index + 1) + '/' + sections.length;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === sections.length - 1;
      // URL hash güncelle (paylaşılabilir derin link)
      const id = sections[index].id;
      if (id) history.replaceState(null, '', '#' + id);
    }

    function go(i) {
      i = Math.max(0, Math.min(sections.length - 1, i));
      if (i === index || animating) return;
      index = i;
      animating = true;
      render();
      setTimeout(() => { animating = false; }, COOLDOWN);
    }

    /* --- İç kaydırma sınırı kontrolü ---
       Slayt içeriği ekrandan uzunsa, önce iç scroll'a izin ver;
       en alta/üste değince slayt değiştir. */
    function atEdge(dir) {
      const el = sections[index];
      const scrollable = el.scrollHeight > el.clientHeight + 2;
      if (!scrollable) return true;
      if (dir > 0) return Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 1;
      return el.scrollTop <= 1;
    }

    /* --- Fare tekeri --- */
    let wheelLock = false;
    root.addEventListener('wheel', (e) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      if (!atEdge(dir)) return;                 // iç scroll'a bırak
      e.preventDefault();
      if (wheelLock || animating) return;
      if (Math.abs(e.deltaY) < 8) return;
      wheelLock = true;
      go(index + dir);
      setTimeout(() => { wheelLock = false; }, COOLDOWN);
    }, { passive: false });

    /* --- Klavye --- */
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { if (atEdge(1)) { e.preventDefault(); go(index + 1); } }
      else if (['ArrowUp', 'PageUp'].includes(e.key)) { if (atEdge(-1)) { e.preventDefault(); go(index - 1); } }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(sections.length - 1); }
    });

    /* --- Yeniden boyutlandırmada hizayı koru --- */
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      const prev = track.style.transition; track.style.transition = 'none';
      sizeSections();
      track.style.transform = 'translateY(' + (-index * root.clientHeight) + 'px)';
      rt = setTimeout(() => { track.style.transition = prev; }, 60);
    });

    /* --- Dokunma --- */
    let touchY = null;
    root.addEventListener('touchstart', (e) => { touchY = e.touches[0].clientY; }, { passive: true });
    root.addEventListener('touchend', (e) => {
      if (touchY === null) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 55 && atEdge(dy > 0 ? 1 : -1)) go(index + (dy > 0 ? 1 : -1));
      touchY = null;
    }, { passive: true });

    /* --- Açılışta hash'e git --- */
    if (location.hash) {
      const i = sections.findIndex(s => '#' + s.id === location.hash);
      if (i > 0) index = i;
    }
    sizeSections();
    render();

    // Dışarıdan erişim (gerekirse)
    window.FP = { go, next: () => go(index + 1), prev: () => go(index - 1), get index() { return index; } };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initFullpage);
  else initFullpage();
})();
