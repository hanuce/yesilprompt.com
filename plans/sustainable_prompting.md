## Sürdülebilir Yeşil Prompt Atölyesi
ETKİNLİK PLANI: 
Etkinlik No : 01
Etkinlik Tarihi : .../.../202...
Etkinliğin Adı : Sürdülebilir Yeşil Prompt Atölyesi
Hedef Kitle : 
Etkinliği Yaptıracak Kişi : -
Etkinliğin Amacı :
1. Fiziksel ve dijital aktivitelerin enerji tüketimlerini (karbon ayak izini) gerçek verilerle karşılaştırarak farkındalık oluşturmak.
2. Büyük Dil Modellerinin (LLM) çalışma mantığındaki "Token" kavramını ve enerji maliyetini kavramak.
3. Yapay zeka araçlarını kullanırken en az enerjiyle en verimli sonucu alma (Prompt Mühendisliği) becerisi kazanmak.
Etkinliğin Konusu : Veri Görselleştirme, Yapay Zeka Okuryazarlığı ve Sürdürülebilir Sanat
Etkinliğin Süresi : 40 + 40 (Blok Uygulama)
Kullanılacak Materyaller :
•	Veri Analizi: Bilgisayar/Tablet, CODAP (Common Online Data Analysis Platform) erişimi.
•	Üretim: Nanobanana (Görsel Üretim Aracı), Canva (Etiketleme için).
•	Hesaplama: "Token & Enerji Hesaplayıcı" websitesi.
•	Kaynak Dosya: Enerji Tüketim Verileri (CSV formatında dosya).
Katılımcı Sayısı : 20-25
---
### ETKİNLİĞİN DETAYLI AKIŞI
1. AŞAMA: GİRİŞ (Engage) - Görünmeyen Buzdağı (15 Dk.)
Eğitmen derse elinde bir kutu çikolata ve bir cep telefonu ile girer.
•	Soru: "Sizce bu bir kutu çikolatayı üretmek için harcanan enerjiyle, bu telefonu kaç kere şarj edebilirim?"
•	Bilgi: Öğrencilerin tahminleri alındıktan sonra gerçek açıklanır: “Bir kutu çikolata (1 kg) üretimi yaklaşık 19.000 gram CO2 salar. Bir telefonu şarj etmek ise sadece 5-7 gram CO2'dir. Yani bir çikolata yediğinizde, yaklaşık 3000 telefon şarjı kadar karbon ayak izi bırakırsınız.”
•	Köprü: "Peki ya dijital dünya? Şu an Nanobanana veya ChatGPT kullanırken arkada ne yakıyoruz? Bir resim çizdirmek bedava mı, yoksa bir bedeli var mı?"
---
2. AŞAMA: KEŞFETME (Explore) - Veri ile Yüzleşme (CODAP) (30 Dk.)
Bu aşamada öğrencilere hazır bir veri seti verilir ve bu veriyi görselleştirmeleri istenir.
Adım 1: Veri Setinin Hazırlanması
Eğitmen, enerji_verileri.csv dosyasını ve öğrencilere gönderir ve CODAPP üzerinde açmalarını ister.
Adım 2: CODAP Uygulaması
1.	Öğrenciler codap.concord.org adresine girer.
2.	CSV dosyasını sürükleyip ekrana bırakırlar.
3.	Görevler:
    - "Grafik" (Graph) aracını kullanarak X eksenine Aktivite, Y eksenine CO2_Salinimi_Gram değerini atarlar.
    - Soru: "Yapay Zeka ile görsel üretmek, dijital dünyadaki diğer hangi eyleme en yakın?" 
    - Fiziksel ve Dijital tüketimleri renklerine göre ayırıp ("Tür" sütununu grafiğin ortasına sürükleyerek) farkları ve YZ'nin tüketimlerini analiz ederler.
---
3. AŞAMA: AÇIKLAMA (Explain) - Token Nedir? (20 Dk.)
Öğrenciler veriyi gördükten sonra öğretmen teknik açıklamayı yapar:
- Token: "Yapay zeka kelimeleri bizim gibi okumaz. Onları 'Token' dediğimiz hece parçalarına böler. 'Merhaba' kelimesi YZ için 1 token değil, 'Mer-ha-ba' gibi 2 veya 3 parçadır. İşlemci her parçayı hesaplamak için elektrik harcar."
- Hesaplama: Ortalama 1000 Token = 750 Kelime.
- Prompt Mühendisliği: "Yapay zekaya 'Bana güzel bir resim yap' demekle, 'Gün batımında, fütüristik, camdan kuleleri olan İstanbul manzarası, 8k çözünürlük' demek arasında enerji farkı vardır. İlkinde YZ kararsız kalır, defalarca işlem yapar. İkincisinde hedefe kitlenir."
---
4. AŞAMA: DERİNLEŞTİRME (Elaborate) - Yeşil Prompt Hackathonu & Üretim (40 Dk.)
Bu aşamada öğrenciler, öğretmenin Github üzerinden yayınladığı "Token & Enerji Hesaplayıcı" aracını kullanarak en verimli komutu yazmaya çalışırlar.
Adım 1: Token Hesaplayıcı Aracı (Github Pages)
Eğitmen tek bir index.html dosyası olan aracı Github'a yükler ve Github Pages ile canlıya alır. Link öğrencilere verilir.
Adım 2: Hackathon Görevi
1. Öğrencilere Nanobanana aracı açtırılır.
2. Görev: "2050 yılında yenilenebilir enerji ile çalışan bir İstanbul" görseli üretmek.
3.  Kural: Öğrenciler promptlarını önce Github sitesindeki kutuya yazarlar.
    - Eğer sayaç "Kırmızı" (Warning) yanarsa, prompt çok uzun ve verimsizdir.
    - Amaç: En kısa kelimelerle en doğru görseli anlatmak.
4.	Onaylanan prompt Nanobanana'ya yapıştırılır ve görsel üretilir.
---
5. AŞAMA: DEĞERLENDİRME (Evaluate) - Dijital Sergi & Damgalama (15 Dk.)
Adım 1: Bilgi Barı Ekleme (Canva)
Öğrenciler ürettikleri görseli indirir ve Canva'ya yükler. Görselin altına bir şerit (dikdörtgen) eklerler ve Github sitesindeki hesaplayıcıdan aldıkları verileri yazarlar:
    - Model: Nanobanana v1
    - Prompt: (Kullandıkları prompt)
    - Deneme Sayısı: (Kaç kere 'generate' butonuna bastılar?)
    - Harcanan Enerji: (Github sitesindeki "% Şarj" değeri x Deneme Sayısı)
Adım 2: Dijital Galeri
Öğrencilerin hazırladığı damgalı görseller toplanır. Eğitmen bu görselleri Github reposundaki index.html dosyasının altındaki "Sürdürülebilir Prompt Galerisi" bölümüne <img> etiketleri ile ekler ve siteyi günceller.
Böylece projenin sonunda, tüm okulun ziyaret edebileceği, her eserin çevreye maliyetinin şeffafça görüldüğü, yaşayan bir "YZ ile Yeşil Sanat Galerisi" ortaya çıkar.
