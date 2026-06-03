/* =========================================================
   ⚙️ MODEL AİLELERİ — BURAYI DÜZENLEYEBİLİRSİN
   ---------------------------------------------------------
   "Neden herkes model yapamıyor?" bölümünde gösterilen kartlar.
   Her ailenin: adı, LOGO dosyası, menşei ülke (bayrak) ve kısa
   tanıtımı vardır.

   LOGO DEĞİŞTİRMEK:
   - Logolar  assets/img/logos/  klasöründe durur.
   - Gerçek logoyu indirip AYNI dosya adıyla (örn. chatgpt.svg)
     o klasöre atarsan otomatik görünür. Şu an şık birer
     placeholder (yer tutucu) konuldu.
   ========================================================= */
window.MODEL_FAMILIES = [
  { name: 'ChatGPT (GPT)', org: 'OpenAI',           country: 'ABD',    flag: '🇺🇸',
    logo: 'assets/img/logos/chatgpt.svg',
    blurb: 'Üretken yapay zekâyı 2022’de ChatGPT ile kamuoyuna taşıyan GPT ailesi.' },

  { name: 'Gemini', org: 'Google DeepMind',         country: 'ABD',    flag: '🇺🇸',
    logo: 'assets/img/logos/gemini.svg',
    blurb: 'Metin+görsel+ses+video işleyen çok-kipli aile; arama ve Android’e gömülü.' },

  { name: 'Claude', org: 'Anthropic',               country: 'ABD',    flag: '🇺🇸',
    logo: 'assets/img/logos/claude.svg',
    blurb: 'Güvenlik odaklı; “Anayasal YZ” (Constitutional AI) yaklaşımını geliştirdi.' },

  { name: 'Grok', org: 'xAI',                        country: 'ABD',    flag: '🇺🇸',
    logo: 'assets/img/logos/grok.svg',
    blurb: 'Elon Musk’ın xAI’si; X (eski Twitter) platformuna entegre çalışır.' },

  { name: 'Llama', org: 'Meta',                      country: 'ABD',    flag: '🇺🇸',
    logo: 'assets/img/logos/llama.svg',
    blurb: 'Açık ağırlıklı (open-weight): indirip kendi cihazında çalıştırabilirsin.' },

  { name: 'Mistral', org: 'Mistral AI',             country: 'Fransa', flag: '🇫🇷',
    logo: 'assets/img/logos/mistral.svg',
    blurb: 'Avrupa’nın YZ egemenliği; Paris merkezli, açık ağırlıklı modeller.' },

  { name: 'DeepSeek', org: 'DeepSeek (High-Flyer)',  country: 'Çin',    flag: '🇨🇳',
    logo: 'assets/img/logos/deepseek.svg',
    blurb: 'Hangzhou’da 2023’te kuruldu; düşük maliyetli güçlü modelleriyle dikkat çekti.' },

  { name: 'Qwen', org: 'Alibaba',                    country: 'Çin',    flag: '🇨🇳',
    logo: 'assets/img/logos/qwen.svg',
    blurb: 'Alibaba’nın çok dilli, açık ağırlıklı ailesi (Tongyi Qianwen).' },

  { name: 'Nemotron', org: 'NVIDIA',                 country: 'ABD',    flag: '🇺🇸',
    logo: 'assets/img/logos/nemotron.svg',
    blurb: 'GPU üreticisi NVIDIA’nın açık ailesi; DeepSeek R1’den damıtılmış sürümleri var.' }
];
