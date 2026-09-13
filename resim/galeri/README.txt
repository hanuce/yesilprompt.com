YEŞİL PROMPT RESİM SERGİSİ — GÖRSELLER
======================================
Öğrencilerin ürettiği görselleri buraya koy (jpg/png/webp).

Eklemek için:
1) Görseli bu klasöre at (örn. eser1.jpg).
2) assets/js/config/site.config.js dosyasını aç.
3) GALLERY listesine bir satır ekle ve "img" alanına yolu yaz:
      { title: 'Eser adı', img: 'assets/img/galeri/eser1.jpg',
        prompt: '...', model: '...', attempts: 1, wh: 0.5 }

"img" boş bırakılırsa şık bir degrade yer tutucu gösterilir.
