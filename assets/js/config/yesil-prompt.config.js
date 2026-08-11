/* =========================================================
   ⚙️ YEŞİL PROMPT (Faz 4) — İÇERİK
   ---------------------------------------------------------
   İki slayt:
     1) Yeşil Prompt Kuralları — atölyenin özeti
     2) Sergi için resim üretimi — öğrenci gerçek bir araçla
        TEK bir görsel üretir, sonra Ölç fazına gider.

   ❌ Öğrenci cevabı toplanmaz, kaydedilmez (SITE_RULES 2c).

   Her kural BİR maliyet kalemine bağlıdır; "azaltir" alanı
   hangisine dokunduğunu söyler. Kaynak: revised_plan.md → EK F.1
   ========================================================= */

window.KURALLAR = [
  { no: 1, ikon: '🎯', ad: 'Net ol, ilk seferde doğru iste',
    azaltir: 'Deneme sayısı',
    ornek: '“güzel bir resim” değil → konu + stil + ışık + kompozisyon, hepsi tek promptta.' },

  { no: 2, ikon: '✂️', ad: 'Çıktının sınırını sen çiz',
    azaltir: 'Çıktı token’ı',
    ornek: '“3 maddede, her madde tek cümle” de. Çıktı, girdiden kat kat pahalıdır.' },

  { no: 3, ikon: '💬', ad: 'Görsel şart değilse metinle yetin',
    azaltir: 'Üretim türü',
    ornek: 'Metin ≈ 0,3 Wh · görsel ≈ 1,5 Wh · 5 sn video ≈ 944 Wh. Aradaki fark ~3.000 kat.' },

  { no: 4, ikon: '🧠', ad: 'Basit işte düşünmeyi kıs',
    azaltir: 'Gizli düşünme token’ı',
    ornek: '“2+2 kaç eder” sorusunda derin düşünme açık kalırsa enerji ~30 kat artıyor.' },

  { no: 5, ikon: '🧵', ad: 'Bağlamı şişirme',
    azaltir: 'Girdi token’ı',
    ornek: 'Uzun sohbette her turda tüm geçmiş yeniden okunur. Yeni konuya yeni sohbet aç.' },

  { no: 6, ikon: '📋', ad: 'Baştan tam tarif et',
    azaltir: 'Deneme × üretim',
    ornek: '“Şunu ekle, bunu değiştir” demek her seferinde TAM yeni bir üretimdir.' },

  { no: 7, ikon: '🧪', ad: 'Önce metinde prova, sonra tek görsel',
    azaltir: 'Üretim türü',
    ornek: 'Fikri sohbette olgunlaştır, sonra tek seferde üret. Prova metinde, gösteri görselde.' },

  { no: 8, ikon: '💾', ad: 'İyi promptu sakla',
    azaltir: 'Deneme sayısı',
    ornek: 'Çalışan bir promptu kaydet; her seferinde sıfırdan denemeye başlama.' }
];

window.KURALLAR_OZET =
  'Sekiz kuralın hepsi tek bir cümleye iner: <b>amaç en kısa prompt değil, en az toplam maliyet.</b>' +
  '<br>Toplam ≈ Girdi + Çıktı + (Deneme × üretim) + Düşünme. ' +
  'Net ama biraz uzun bir prompt, belirsiz kısa bir prompttan <b>toplamda daha ucuzdur</b>.';

/* --- SERGİ İÇİN RESİM ÜRETİMİ ------------------------------
   Öğrenci burada gerçek bir araca gidip TEK görsel üretir.
   Ekolojik tutarlılık: atölyenin mesajı "boşa üretme" olduğuna
   göre atölyenin kendisi de boşa üretmez. */
window.URETIM_ADIMLARI = [
  { no: 1, ikon: '💭', b: 'Hayal et',
    m: 'Sergide görmek istediğin resmi kafanda netleştir. Konu ne? Nerede geçiyor? Hangi duyguyu versin?' },
  { no: 2, ikon: '✍️', b: 'Promptunu yaz',
    m: 'Aşağıdaki reçeteyi kullan ve <b>Yeşil Prompt Kuralları</b>na uy. Yazarken token sayacına bak.' },
  { no: 3, ikon: '🧩', b: 'Tek araç seç',
    m: 'Aşağıdaki listeden bir tanesini aç. Hangisini seçtiğini not et — Ölç fazında lazım olacak.' },
  { no: 4, ikon: '🎨', b: 'TEK seferde üret',
    m: 'Takım başına <b>1, en fazla 2</b> görsel. Beğenmezsen önce promptu düzelt, sonra tekrar üret.' },
  { no: 5, ikon: '🧮', b: 'Ölç fazına geç',
    m: 'Kaç kez ürettiğini say ve <b>Ölç</b> menüsüne git: enerji, su ve karbon maliyetini hesapla, sergi damgasını al.' }
];

/* Bir görsel promptunun parçaları — öğrenci bunu doldurarak yazar */
window.RECETE = [
  { p: 'Konu',        o: 'ne / kim görünüyor?',           ornek: 'yenilenebilir enerjiyle çalışan bir şehir' },
  { p: 'Zaman & ışık', o: 'gündüz mü, gün batımı mı?',    ornek: 'gündüz, yumuşak ışık' },
  { p: 'Ayrıntı',     o: 'sahneyi ayırt eden 2-3 şey',    ornek: 'güneş panelli çatılar, yeşil teraslar' },
  { p: 'Stil',        o: 'nasıl çizilsin?',               ornek: 'izometrik illüstrasyon' },
  { p: 'Kısıt',       o: 'ne OLMASIN / biçim',            ornek: 'kare, yazısız' }
];

window.URETIM_UYARI =
  '⚠️ <b>Neden tek görsel?</b> Bir aracın “üret” tuşuna her basışın tam bedel öder — ' +
  'beğenmediğin görselin enerjisi de harcanmıştır. Üstelik çoğu araç tek tıkta 4 alternatif ' +
  'üretir; sen birini seçsen bile <b>dördünün de</b> bedeli ödenir. ' +
  'Bu yüzden önce promptu düzelt, sonra üret.';
