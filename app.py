from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import feedparser
import requests
import base64
import os
import json
import re
import time

load_dotenv()

app = Flask(__name__)
CORS(app)

# API Configuration
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# Gemini API yapılandırması - gemini-2.5-flash modeli (metin üretimi için)
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('models/gemini-2.5-flash')

# Görsel üretimi için ayrı model (Nano Banana - gemini-2.5-flash-image)
image_model = genai.GenerativeModel('models/gemini-2.5-flash-image')

# API Endpoints
TEXT_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
IMAGE_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent"

# RSS kaynakları - Kategorilere göre gruplandırılmış
RSS_FEEDS = {
    # 🤖 AI / Yapay Zeka
    'techcrunch_ai': {
        'url': 'https://techcrunch.com/category/artificial-intelligence/feed/',
        'name': 'TechCrunch AI',
        'category': 'ai'
    },
    # 💻 Teknoloji
    'theverge': {
        'url': 'https://www.theverge.com/rss/index.xml',
        'name': 'The Verge',
        'category': 'tech'
    },
    # 🇹🇷 Türkiye Gündem
    'webrazzi': {
        'url': 'https://webrazzi.com/feed/',
        'name': 'Webrazzi',
        'category': 'turkey'
    },
    # 🪙 Kripto / Blockchain
    'coindesk': {
        'url': 'https://www.coindesk.com/arc/outboundfeeds/rss/',
        'name': 'CoinDesk',
        'category': 'crypto'
    },
    # 📈 Finans / Ekonomi
    'bloomberg': {
        'url': 'https://feeds.bloomberg.com/markets/news.rss',
        'name': 'Bloomberg',
        'category': 'finance'
    },
    # ⚽ Spor
    'espn': {
        'url': 'https://www.espn.com/espn/rss/news',
        'name': 'ESPN',
        'category': 'sports'
    },
    # 🎮 Gaming / Oyun
    'gamespot': {
        'url': 'https://www.gamespot.com/feeds/mashup/',
        'name': 'GameSpot',
        'category': 'gaming'
    },
    # 🎬 Eğlence / Popüler Kültür
    'variety': {
        'url': 'https://variety.com/feed/',
        'name': 'Variety',
        'category': 'entertainment'
    },
    # 🧬 Sağlık / Biohacking
    'medicalnews': {
        'url': 'https://www.medicalnewstoday.com/rss',
        'name': 'Medical News Today',
        'category': 'health'
    },
    # 🚀 Startup / Girişimcilik
    'ycombinator': {
        'url': 'https://news.ycombinator.com/rss',
        'name': 'Y Combinator',
        'category': 'startup'
    },
    # 📱 Sosyal Medya Trendleri
    'hackernews': {
        'url': 'https://hnrss.org/frontpage',
        'name': 'Hacker News',
        'category': 'social'
    },
    # 🌍 Dünya Haberleri
    'bbc_world': {
        'url': 'https://feeds.bbci.co.uk/news/world/rss.xml',
        'name': 'BBC World',
        'category': 'world'
    },
    # 🔬 Bilim
    'sciencedaily': {
        'url': 'https://www.sciencedaily.com/rss/all.xml',
        'name': 'Science Daily',
        'category': 'science'
    },
    # 🚗 Otomotiv / EV
    'electrek': {
        'url': 'https://electrek.co/feed/',
        'name': 'Electrek',
        'category': 'automotive'
    }
}

# Kategori isimleri
CATEGORY_NAMES = {
    'all': '🔥 Tümü',
    'ai': '🤖 AI / Yapay Zeka',
    'tech': '💻 Teknoloji',
    'turkey': '🇹🇷 Türkiye Gündem',
    'crypto': '🪙 Kripto / Blockchain',
    'finance': '📈 Finans / Ekonomi',
    'sports': '⚽ Spor',
    'gaming': '🎮 Gaming / Oyun',
    'entertainment': '🎬 Eğlence',
    'health': '🧬 Sağlık / Biohacking',
    'startup': '🚀 Startup',
    'social': '📱 Sosyal Medya',
    'world': '🌍 Dünya Haberleri',
    'science': '🔬 Bilim',
    'automotive': '🚗 Otomotiv / EV'
}

# Thread şablonları - Genişletilmiş
THREAD_TEMPLATES = {
    'problem_solution': {
        'name': '🎯 Problem → Çözüm → CTA',
        'tweets': 4,
        'structure': '''
Tweet 1: Problemi tanımla - hook ile başla, acı noktasını vurgula
Tweet 2: Çözümün ana fikrini açıkla
Tweet 3: Çözümün detaylarını ver, nasıl uygulanır?
Tweet 4: CTA - "Kaydet, RT yap, takip et" gibi eylem çağrısı
'''
    },
    'listicle': {
        'name': '📋 Hook → Liste → Özet',
        'tweets': 6,
        'structure': '''
Tweet 1: Dikkat çekici hook - "Thread başlıyor" sinyali ver
Tweet 2: 1. madde - numara ile başla
Tweet 3: 2. madde - numara ile başla
Tweet 4: 3. madde - numara ile başla
Tweet 5: 4. madde - numara ile başla
Tweet 6: Özet ve CTA - ana çıkarımı özetle, kaydet/paylaş de
'''
    },
    'story': {
        'name': '📖 Hikaye → Ders → Uygula',
        'tweets': 4,
        'structure': '''
Tweet 1: Kişisel hikaye veya örnek olay - hook ile başla
Tweet 2: Hikayenin devamı - zorluklar, dönüm noktası
Tweet 3: Çıkarılan ders - "Bu bana şunu öğretti:" formatında
Tweet 4: Nasıl uygulanır + CTA - okuyucuya somut adım ver
'''
    },
    'shock_fact': {
        'name': '💥 Şok Gerçek → Kanıt → CTA',
        'tweets': 4,
        'structure': '''
Tweet 1: Şok edici istatistik veya gerçek - "Biliyor musunuz?" veya "%90'ınız bunu bilmiyor"
Tweet 2: Bu gerçeğin kanıtları ve açıklaması
Tweet 3: Bunun neden önemli olduğu, etkileri
Tweet 4: Ne yapmalı + CTA - somut aksiyon öner, kaydet de
'''
    },
    'tutorial': {
        'name': '🧠 Adım Adım Rehber (Araç & Promptlu)',
        'tweets': 7,
        'structure': '''
Tweet 1: BAŞLIK (BÜYÜK HARF) + Provokatif Hook
- "Millet [konu] denince [yanlış anlama]. Ama asıl vurgun [doğru yol]'da."
- Sonunda: "Kaydet, karlı bir iş modeli."

Tweet 2: GİRİŞ + GEREKLİ ARAÇLAR
- "Sadece 3 araca ihtiyacın var:"
- Madde madde araç listesi (örn: Midjourney, ChatGPT, HeyGen vb.)

Tweet 3: ADIM 1 - KURULUM/BAŞLANGIÇ
- Başlık: "1. [Adım Adı]:"
- Açıklama paragrafı
- "Strateji:" pratik ipucu

Tweet 4: ADIM 2 - KRİTİK DETAY
- Başlık: "2. [Adım Adı]:"
- Herkesin kaçırdığı kritik nokta
- "Kritik Ayar:" teknik detay

Tweet 5: ADIM 3 - SONUÇ ALMA / MONETİZASYON
- Başlık: "3. [Adım Adı]:"
- Para kazanma veya sonuç alma yöntemi
- Somut örnek veya platform önerisi

Tweet 6: HAZIR PROMPTLAR
- Başlık: "PROMPTLAR:"
- Her prompt için:
  * Prompt başlığı (Karakter Oluşturma, Metin Yazdırma vb.)
  * PROMPT: "..." şeklinde tırnak içinde İngilizce prompt
- Kullanıcı direkt kopyala-yapıştır yapabilmeli

Tweet 7: KAPANIŞ CTA
- "Bu tarz 'yasaklı' bilgiler için takipte kal."
- "Kaydet, RT yap, lazım olacak."
- Takip çağrısı

GENEL KURALLAR:
- Üslup: "Sana balık vermiyorum, balık tutmayı öğretiyorum ama oltayı da ben veriyorum"
- Her adımda somut araç/site adı ver
- Teorik değil, PRATİK ol
- Okuyucu bu threadi okuyunca HEMEN uygulayabilmeli
- "Strateji:" ve "Kritik Ayar:" notları şart
''',
        'special_instruction': '''
[ÖZEL FORMAT: TUTORIAL FLOOD]
Bu konu için 'Girişimci Hisler' tonunda, teknik ve detaylı bir flood yaz.
SOMUT araç isimleri ver (ChatGPT, Midjourney, HeyGen, Runway, ElevenLabs vb.)
Her adım PRATİK ve UYGULANABILIR olmalı.
PROMPTLAR bölümünde gerçek, çalışan İngilizce promptlar yaz.
Okuyucu bu thread'i okuyunca 30 dakika içinde başlayabilmeli.
'''
    },
    'comparison': {
        'name': '⚔️ Eski vs Yeni Karşılaştırma',
        'tweets': 4,
        'structure': '''
Tweet 1: Hook - "Eskiden şöyleydi, şimdi böyle" formatı, dikkat çekici giriş
Tweet 2: Eski yöntem - sorunları, dezavantajları, neden işe yaramıyor
Tweet 3: Yeni yöntem - avantajları, neden daha iyi, fark yaratan noktalar
Tweet 4: Somut örnek + CTA - gerçek bir örnek ver, kaydet/paylaş de
'''
    }
}


def extract_image_prompt(content):
    """Tweet içeriğinden [IMAGE_PROMPT]: ile başlayan kısmı ayır"""
    result = {
        'content': content,
        'image_prompt': None
    }

    if not content:
        return result

    # [IMAGE_PROMPT]: pattern'ini ara
    patterns = [
        r'\[IMAGE_PROMPT\]:\s*(.+?)$',
        r'\[IMAGE_PROMPT\]\s*:\s*(.+?)$',
        r'\[GÖRSEL\]:\s*(.+?)$',
        r'\[GÖRSEL\]\s*:\s*(.+?)$',
    ]

    for pattern in patterns:
        match = re.search(pattern, content, re.IGNORECASE | re.DOTALL)
        if match:
            image_prompt = match.group(1).strip()
            # İçerikten görsel prompt'u çıkar
            clean_content = re.sub(pattern, '', content, flags=re.IGNORECASE | re.DOTALL).strip()
            result['content'] = clean_content
            result['image_prompt'] = image_prompt
            break

    return result


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/generate', methods=['POST'])
def generate_content():
    try:
        data = request.json

        topic = data.get('topic', '')
        content_type = data.get('contentType', 'single')
        chain_length = data.get('chainLength', 5)
        writing_style = data.get('writingStyle', 'punchy')
        tone = data.get('tone', 'informative')
        hook = data.get('hook', '')
        viral_hook = data.get('viralHook', '')  # Hook Library'den seçilen viral açılış
        include_visual = data.get('includeVisual', False)
        include_engagement = data.get('includeEngagement', False)
        persona = data.get('persona', '')
        thread_template = data.get('threadTemplate', '')
        generate_variations = data.get('generateVariations', False)
        visual_ratio = data.get('visualRatio', '1:1')
        target_tweet = data.get('targetTweet', '')  # Reply/Quote için
        is_premium = data.get('isPremium', False)  # X Premium uzun tweet modu
        target_audience = data.get('targetAudience', 'default')  # Hedef kitle

        # Karakter limiti - Premium ise 4000, değilse 280
        char_limit = 4000 if is_premium else 280

        # Genişletilmiş Yazım Stili Açıklamaları
        style_descriptions = {
            'default': 'Doğal ve akıcı bir şekilde yaz.',
            'kisa_vurucu': 'ÇOK KISA ve VURUCU yaz. Tek cümle, punch-line tarzında. Gereksiz kelime YOK.',
            'liste': 'MADDE MADDE liste formatında yaz. Her maddeyi numara veya emoji ile başlat.',
            'hikaye': 'HİKAYE ANLATIR gibi yaz. Başlangıç, gelişme, sonuç olsun. Duygusal bağ kur.',
            'soru_cevap': 'SORU-CEVAP formatında yaz. Önce çarpıcı bir soru sor, sonra cevapla.',
            'oncesi_sonrasi': 'ÖNCESİ vs SONRASI karşılaştırması yap. Dramatik farkı vurgula.',
            'adim_adim': 'ADIM ADIM REHBER formatında yaz. 1, 2, 3 şeklinde sırala.',
            'caps_lock': 'BAZI KELİMELERİ BÜYÜK HARFLE yaz. Vurgu için CAPS kullan. ENERJİK ol.',
            'emoji_agirlikli': 'BOL BOL EMOJİ kullan 🚀💡🔥. Her cümlede en az 1-2 emoji olsun 😎✨',
            'minimal': 'MİNİMAL ve SADE yaz. Emoji KULLANMA. Düz, net, profesyonel.',
            'thread_baslangic': 'THREAD BAŞLANGICI gibi yaz. Merak uyandır, "devamı aşağıda" hissi ver. 🧵'
        }

        # Genişletilmiş Ton Açıklamaları (24 farklı ton)
        tone_descriptions = {
            # Agresif Tonlar
            'provokatif': 'PROVOKATİF ve KIŞKIRTICI bir ton kullan. Tartışma aç, insanları düşündür. Cesur ol.',
            'sert': 'SERT ve DOBRA bir ton kullan. Lafı dolandırma, direkt söyle. "Bak güzel kardeşim" tarzı.',
            'elestirmen': 'ELEŞTİRMEN gibi yaz. Acımasız ama haklı ol. Zayıf noktaları vurgula.',
            'isyankar': 'İSYANKAR bir ton kullan. Sisteme, statükoya karşı çık. Devrimci ruh kat.',

            # Pozitif Tonlar
            'motivasyonel': 'MOTİVASYONEL ve İLHAM VERİCİ yaz. Enerji ver, harekete geçir. "Yapabilirsin!" hissi.',
            'destekleyici': 'DESTEKLEYİCİ ve SAMİMİ ol. Empati kur, anladığını hissettir.',
            'umutlu': 'UMUTLU ve POZİTİF yaz. İyimser ol, geleceğe güven aşıla.',
            'kutlayici': 'KUTLAYICI bir ton kullan. Başarıyı öv, tebrik et, gurur duy.',

            # Bilgi Tonları
            'bilgilendirici': 'BİLGİLENDİRİCİ ve ÖĞRETİCİ yaz. Net, anlaşılır, değerli bilgi ver.',
            'analitik': 'ANALİTİK ve VERİ ODAKLI yaz. Sayılar, istatistikler kullan. Mantıksal ol.',
            'uzman': 'UZMAN gibi yaz. Otoriter, güvenilir, "ben bunu biliyorum" havası ver.',
            'arastirmaci': 'ARAŞTIRMACI gibi yaz. Detaylı, kapsamlı, derinlemesine incele.',

            # Eğlence Tonları
            'mizahi': 'MİZAHİ ve KOMİK yaz. Espri yap, güldür. Eğlenceli ol.',
            'ironik': 'İRONİK ve ALAYCI yaz. İnce espri, zeka göster. Tam tersini ima et.',
            'troll': 'TROLL gibi yaz. Dalga geç ama kırıcı olma. Eğlenceli provokasyon.',
            'absurt': 'ABSÜRT ve SAÇMA yaz. Beklenmedik, mantıksız, şaşırtıcı ol.',

            # Duygusal Tonlar
            'nostaljik': 'NOSTALJİK yaz. Geçmişe özlem, "eski güzel günler" havası ver.',
            'melankolik': 'MELANKOLİK yaz. Hafif hüzünlü, düşündürücü, derin.',
            'romantik': 'ROMANTİK yaz. Duygusal, aşk dolu, kalbe dokunan.',
            'felsefi': 'FELSEFİ yaz. Derin düşünce, varoluşsal sorular, anlam ara.',

            # Özel Tonlar
            'gizemli': 'GİZEMLİ yaz. Merak uyandır, her şeyi söyleme, "daha fazlası var" hissi.',
            'fisiltı': 'FISILTIR gibi yaz. Sır veriyor gibi, "bunu kimseye söyleme ama..." havası.',
            'acil': 'ACİL ve FOMO yaratan yaz. "Şimdi yapmazsan kaçıracaksın" hissi ver.',
            'hikayeci': 'HİKAYECİ gibi yaz. Anlatıcı, sürükleyici, merak uyandıran.'
        }

        # Hedef Kitle Açıklamaları
        audience_descriptions = {
            'default': '',
            'girisimci': 'GİRİŞİMCİLER için yaz. İş, para, büyüme, strateji odaklı. Startup jargonu kullan.',
            'developer': 'YAZILIMCILAR için yaz. Teknik ama anlaşılır. Kod, araç, verimlilik odaklı.',
            'ogrenci': 'ÖĞRENCİLER için yaz. Kariyer, sınav, gelecek kaygısı, bütçe dostu.',
            'z_kusagi': 'Z KUŞAĞI için yaz. Güncel slang, meme referansları, kısa dikkat süresi.',
            'profesyonel': 'PROFESYONELLER için yaz. Kurumsal ama samimi, kariyer odaklı.',
            'ebeveyn': 'EBEVEYNLER için yaz. Aile, çocuk, denge, pratik çözümler.',
            'yatirimci': 'YATIRIMCILAR için yaz. Finans, portföy, risk, getiri odaklı.',
            'sanatci': 'SANATÇILAR/KREATİFLER için yaz. Yaratıcılık, ilham, özgünlük vurgula.',
            'sporcu': 'SPORSEVERLER için yaz. Motivasyon, disiplin, performans odaklı.'
        }

        # Şablon seçilmişse, flood modunu zorla ve tweet sayısını ayarla
        template_structure = ''
        template_tweet_count = chain_length
        if thread_template and thread_template in THREAD_TEMPLATES:
            template_info = THREAD_TEMPLATES[thread_template]
            template_tweet_count = template_info.get('tweets', chain_length)
            content_type = 'flood'  # Şablon seçilince otomatik flood modu

            # Özel talimat varsa ekle (tutorial şablonu için)
            special_instruction = template_info.get('special_instruction', '')

            template_structure = f"""

THREAD ŞABLONU: {template_info['name']}
Bu içeriği aşağıdaki yapıda yaz. Her tweet ayrı, akıcı geçişler olsun.
TAM OLARAK {template_tweet_count} TWEET ÜRET.

YAPI:
{template_info['structure']}
{special_instruction}

ÖNEMLİ: Yukarıdaki yapıya BIREBIR uy. Her tweeti belirtilen formatta yaz."""

        # İçerik türü açıklamaları
        effective_chain_length = template_tweet_count if thread_template else chain_length

        # Premium mod için özel talimat
        premium_instruction = f'''X PREMIUM UZUN TWEET MODU AKTİF!
- Maksimum {char_limit} karakter kullanabilirsin
- Detaylı, kapsamlı ve derin bir içerik yaz
- Birden fazla paragraf kullanabilirsin
- Liste, madde işaretleri kullanabilirsin
- Başlık ve alt başlıklar ekleyebilirsin
- Tek bir uzun tweet yaz, flood YAPMA''' if is_premium else ''

        content_type_instructions = {
            'single': f'Tek bir tweet yaz. {char_limit} karakteri geçme.{" " + premium_instruction if is_premium else ""}',
            'flood': f'{effective_chain_length} tweetlik bir flood/zincir yaz. Her tweeti ayrı numara ile belirt. Her tweet {char_limit} karakteri geçmemeli.',
            'reply': f'Bu tweet bir CEVAP olacak. Hedef tweet: "{target_tweet}". Ona cevap verir gibi yaz. {char_limit} karakteri geçme.',
            'quote': f'Bu tweet bir ALINTI olacak. Alıntılanan tweet: "{target_tweet}". Ona yorum yapar gibi yaz. {char_limit} karakteri geçme.'
        }

        # A/B Varyasyon talimatı
        variation_instruction = ''
        if generate_variations:
            variation_instruction = '''

A/B VARYASYONLARI:
Aynı içerik için 3 FARKLI VERSİYON üret:
- V1: Farklı bir hook ile başla
- V2: Başka bir hook ile başla
- V3: Üçüncü bir hook ile başla
Her versiyonda farklı bir CTA (call-to-action) kullan.
'''

        # Prompt oluştur
        prompt = f"""Sen viral Twitter içerikleri üreten bir uzmansın. Türkçe yaz.

{f'KARAKTERİN/PERSONAN: {persona}' if persona else ''}

KONU: {topic}

{f'HOOK (Açılış cümlesi olarak kullan): {hook}' if hook else ''}
{f'''
VİRAL AÇILIŞ (Bu cümle ile MUTLAKA başla): "{viral_hook}"
İlk tweeti/içeriği bu cümle ile açmak ZORUNLUDUR!
''' if viral_hook else ''}

İÇERİK TÜRÜ: {content_type_instructions.get(content_type, content_type_instructions['single'])}

YAZIM STİLİ: {style_descriptions.get(writing_style, style_descriptions.get('default', 'Doğal ve akıcı yaz.'))}

TON: {tone_descriptions.get(tone, tone_descriptions.get('bilgilendirici', 'Bilgilendirici yaz.'))}

{f'HEDEF KİTLE: ' + audience_descriptions.get(target_audience, '') if target_audience != 'default' and audience_descriptions.get(target_audience) else ''}
{template_structure}
{variation_instruction}
{f'''
GÖRSEL ÖNERİSİ: Her tweetin SONUNA görsel için İngilizce prompt ekle.
Format: [IMAGE_PROMPT]: A cinematic shot of...
Görsel oranı: {visual_ratio}
Kurallar:
- Cyberpunk, Dark Mode, Neon Yeşil veya Matrix temalı olsun
- İnsan yüzleri yerine silüetler veya semboller kullan
- Asla metin (text) içermesin
- Profesyonel, yüksek kaliteli görsel tarifi yaz
''' if include_visual else ''}

{'''
ENGAGEMENT TAKTİKLERİ: Her tweete soru, CTA veya tartışma açıcı element ekle.
''' if include_engagement else ''}

ÖNEMLİ KURALLAR:
- Her tweet {char_limit} karakteri ASLA geçmemeli
- Emoji kullanabilirsin ama abartma
- Hashtag kullanma
- Türkçe karakterleri doğru kullan
{f'- X PREMIUM MODU: Uzun, detaylı ve kapsamlı içerik yaz' if is_premium else ''}

Yanıtını şu JSON formatında ver:
{{
    "tweets": [
        {{
            "content": "tweet metni",
            "visual_prompt": "görsel önerisi (varsa, null değilse)",
            "variation": "V1/V2/V3 (varyasyon varsa)"
        }}
    ]
}}
"""

        response = model.generate_content(prompt)
        response_text = response.text

        # JSON parse
        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            try:
                result = json.loads(json_match.group())
                tweets = result.get('tweets', [])

                # Her tweet için IMAGE_PROMPT ayır ve critic/virality skoru ekle
                for tweet in tweets:
                    content = tweet.get('content', '')

                    # [IMAGE_PROMPT]: ile başlayan kısmı ayır
                    extracted = extract_image_prompt(content)
                    tweet['content'] = extracted['content']

                    # Eğer visual_prompt yoksa veya boşsa, extracted'dan al
                    if not tweet.get('visual_prompt') and extracted['image_prompt']:
                        tweet['visual_prompt'] = extracted['image_prompt']

                    # Critic ve virality skorlarını ayrı API çağrısı ile al
                    scores = get_tweet_scores(extracted['content'], persona)
                    tweet['critic_score'] = scores.get('critic_score', 50)
                    tweet['critic_feedback'] = scores.get('critic_feedback', '')
                    tweet['virality_score'] = scores.get('virality_score', 50)
                    tweet['virality_tips'] = scores.get('virality_tips', [])

                return jsonify({'success': True, 'data': {'tweets': tweets}})
            except json.JSONDecodeError:
                return jsonify({'success': True, 'data': {'tweets': [{'content': response_text, 'visual_prompt': None}]}})
        else:
            return jsonify({'success': True, 'data': {'tweets': [{'content': response_text, 'visual_prompt': None}]}})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


def get_tweet_scores(tweet_content, persona=''):
    """Tweet için critic ve virality skorlarını hesapla"""
    try:
        prompt = f"""Bir Twitter içerik eleştirmeni olarak bu tweeti değerlendir:

TWEET: "{tweet_content}"

{f'PERSONA: {persona}' if persona else ''}

Şu kriterlere göre puanla ve JSON formatında yanıt ver:

1. CRITIC SKORU (0-100): Bot hissi, sıkıcılık, cringe seviyesini değerlendir. 100 = mükemmel, doğal, ilgi çekici.

2. CRITIC GERİBİLDİRİMİ: Tek cümlelik "Nasıl daha iyi olur?" önerisi.

3. VİRALLİK SKORU (0-100): Bu tweetin viral olma potansiyeli. Hook gücü, paylaşılabilirlik, tartışma potansiyeli.

4. VİRALLİK İPUÇLARI: 1-2 kısa öneri.

JSON formatı:
{{
    "critic_score": 75,
    "critic_feedback": "Hook'u daha güçlü yapabilirsin",
    "virality_score": 80,
    "virality_tips": ["Soru ekle", "CTA güçlendir"]
}}
"""
        response = model.generate_content(prompt)
        response_text = response.text

        json_match = re.search(r'\{[\s\S]*?\}', response_text)
        if json_match:
            return json.loads(json_match.group())
    except:
        pass

    return {
        'critic_score': 50,
        'critic_feedback': 'Değerlendirme yapılamadı',
        'virality_score': 50,
        'virality_tips': []
    }


@app.route('/api/remix', methods=['POST'])
def remix_tweet():
    """Viral Remix - Mevcut tweeti persona'ya göre yeniden yaz"""
    try:
        data = request.json
        source_tweet = data.get('sourceTweet', '')
        persona = data.get('persona', '')
        generate_variations = data.get('generateVariations', True)

        if not source_tweet:
            return jsonify({'success': False, 'error': 'Kaynak tweet gerekli'}), 400

        # Varyasyon sayısına göre prompt ayarla
        if generate_variations:
            variation_instruction = """- 3 farklı versiyon üret
- Her versiyonda farklı bir açı veya ton kullan"""
            json_format = """{{
    "tweets": [
        {{"content": "versiyon 1", "variation": "V1"}},
        {{"content": "versiyon 2", "variation": "V2"}},
        {{"content": "versiyon 3", "variation": "V3"}}
    ]
}}"""
        else:
            variation_instruction = "- Tek bir versiyon üret"
            json_format = """{{
    "tweets": [
        {{"content": "yeniden yazılmış tweet", "variation": ""}}
    ]
}}"""

        prompt = f"""Sen bir Twitter içerik uzmanısın. Aşağıdaki viral tweeti, verilen persona'ya göre TÜRKÇE olarak yeniden yaz.

KAYNAK TWEET:
"{source_tweet}"

{f'HEDEF PERSONA: {persona}' if persona else 'Genel bir Türk kullanıcı gibi yaz.'}

KURALLAR:
- Orijinal fikri koru ama kendi tarzınla yeniden yaz
- 280 karakter sınırına uy
- Türkçe yaz
- Kopya değil, esinlenme olsun
{variation_instruction}

JSON formatında yanıt ver:
{json_format}
"""

        response = model.generate_content(prompt)
        response_text = response.text

        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            result = json.loads(json_match.group())
            tweets = result.get('tweets', [])

            # Skorları ekle
            for tweet in tweets:
                content = tweet.get('content', '')
                scores = get_tweet_scores(content, persona)
                tweet.update(scores)

            return jsonify({'success': True, 'data': {'tweets': tweets}})

        return jsonify({'success': False, 'error': 'Parse hatası'}), 500

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/generate-reply', methods=['POST'])
def generate_reply():
    """Tweet'e viral reply üret"""
    try:
        data = request.json
        target_tweet = data.get('targetTweet', '')
        tone = data.get('tone', 'supportive')
        generate_multiple = data.get('generateMultiple', True)
        persona = data.get('persona', '')

        if not target_tweet:
            return jsonify({'success': False, 'error': 'Hedef tweet gerekli'}), 400

        # Ton açıklamaları
        tone_instructions = {
            'supportive': 'DESTEKLEYICI ton kullan. Tweete katıl, onaylayan ve değer ekleyen bir cevap yaz. "Kesinlikle!", "Tam da bunu düşünüyordum" gibi başlangıçlar kullanabilirsin.',
            'questioning': 'SORGULAYICI ton kullan. Akıllı, düşündürücü bir soru sor. Merak uyandır. "Peki şu durumda ne olacak?", "Bunu hiç düşündün mü?" gibi yaklaşımlar kullan.',
            'opposing': 'KARŞIT ton kullan. Saygılı ama net bir şekilde karşı çık. Argümanını güçlü kur. "Katılmıyorum çünkü...", "Tam tersini düşünüyorum" gibi başla. Hakaret etme, sadece fikre karşı çık.',
            'humorous': 'MİZAHİ ton kullan. Zekice bir espri yap, komik bir bakış açısı sun. İroni veya absürt mizah kullanabilirsin. Kırıcı olma, eğlenceli ol.',
            'informative': 'BİLGİ EKLE. İlgili bir gerçek, istatistik veya kaynak paylaş. "Buna ek olarak...", "İlginç bir veri:" gibi başlangıçlar kullan. Değerli bilgi ekle.'
        }

        reply_count = 3 if generate_multiple else 1

        prompt = f"""Sen viral Twitter reply'ları yazan bir uzmansın. Türkçe yaz.

{f'KARAKTERİN/PERSONAN: {persona}' if persona else ''}

ORİJİNAL TWEET:
"{target_tweet}"

GÖREV: Bu tweet'e {reply_count} adet farklı reply yaz.

TON: {tone_instructions.get(tone, tone_instructions['supportive'])}

KURALLAR:
- Her reply maksimum 280 karakter
- Doğal ve samimi ol, robot gibi yazma
- Her reply birbirinden FARKLI olsun (farklı açılar, farklı yaklaşımlar)
- Viral potansiyeli yüksek, etkileşim alabilecek cevaplar üret
- Emoji kullanımı opsiyonel ama abartma

JSON formatında yanıt ver:
{{"replies": ["reply1", "reply2", "reply3"]}}

{f'Not: Sadece {reply_count} reply üret.' if reply_count == 1 else ''}
"""

        response = model.generate_content(prompt)
        response_text = response.text.strip()

        # JSON parse
        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            result = json.loads(json_match.group())
            replies = result.get('replies', [])

            if replies:
                return jsonify({
                    'success': True,
                    'data': {
                        'replies': replies,
                        'targetTweet': target_tweet,
                        'tone': tone
                    }
                })

        return jsonify({'success': False, 'error': 'Reply üretilemedi'}), 500

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/generate-variants', methods=['POST'])
def generate_variants():
    """5 farklı stil varyantı üret (Şok, Soru, Hikaye, Liste, Kısa)"""
    try:
        data = request.json
        topic = data.get('topic', '')
        persona = data.get('persona', '')
        is_premium = data.get('isPremium', False)

        if not topic:
            return jsonify({'success': False, 'error': 'Konu gerekli'}), 400

        char_limit = 4000 if is_premium else 280

        prompt = f"""Sen viral Twitter içerikleri üreten bir uzmansın. Türkçe yaz.

{f'KARAKTERİN/PERSONAN: {persona}' if persona else ''}

KONU: {topic}

GÖREV: Aynı konu için 5 FARKLI STİLDE tweet varyantı üret.

VARYANT STİLLERİ:
1. ŞOK (shock): Şok edici, provokatif, dikkat çekici açılış. "Çoğu kişi bunu bilmiyor ama...", "%99'u bunu yanlış yapıyor" gibi.
2. SORU (question): Merak uyandıran soru ile başla. "Hiç düşündünüz mü?", "Neden kimse bundan bahsetmiyor?" gibi.
3. HİKAYE (story): Kişisel anekdot veya hikaye ile başla. "3 yıl önce...", "Bir gün fark ettim ki..." gibi.
4. LİSTE (list): Madde madde liste formatında. "3 şey öğrendim:", "5 kritik nokta:" gibi.
5. KISA (short): Çok kısa, vurucu, punch-line tarzı. Maksimum 100 karakter.

KURALLAR:
- Her varyant {char_limit} karakteri geçmemeli (KISA için 100 karakter)
- Her stil birbirinden TAMAMEN FARKLI olmalı
- Aynı fikirleri farklı açılardan sun
- Türkçe yaz
- Emoji kullanabilirsin ama abartma

JSON formatında yanıt ver:
{{
    "variants": [
        {{"style": "shock", "style_name": "Şok", "content": "tweet metni", "color": "#ff4444"}},
        {{"style": "question", "style_name": "Soru", "content": "tweet metni", "color": "#4488ff"}},
        {{"style": "story", "style_name": "Hikaye", "content": "tweet metni", "color": "#44ff88"}},
        {{"style": "list", "style_name": "Liste", "content": "tweet metni", "color": "#ffaa44"}},
        {{"style": "short", "style_name": "Kısa", "content": "tweet metni", "color": "#aa44ff"}}
    ]
}}
"""

        response = model.generate_content(prompt)
        response_text = response.text.strip()

        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            result = json.loads(json_match.group())
            variants = result.get('variants', [])

            if variants:
                # Her varyant için skor ekle
                for variant in variants:
                    content = variant.get('content', '')
                    scores = get_tweet_scores(content, persona)
                    variant.update(scores)

                return jsonify({
                    'success': True,
                    'data': {
                        'variants': variants,
                        'topic': topic
                    }
                })

        return jsonify({'success': False, 'error': 'Varyantlar üretilemedi'}), 500

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/rewrite', methods=['POST'])
def rewrite_tweet():
    """Tweeti belirli bir stilde yeniden yaz"""
    try:
        data = request.json
        tweet_content = data.get('content', '')
        style = data.get('style', '')  # aggressive, calm, shorter, curious, critic_fix, single_tip
        persona = data.get('persona', '')
        critic_feedback = data.get('criticFeedback', '')
        virality_tips = data.get('viralityTips', [])
        single_tip = data.get('singleTip', '')

        style_instructions = {
            'aggressive': 'Daha agresif, provokatif ve cesur bir ton kullan. Dikkat çekici ve tartışma açıcı yap.',
            'calm': 'Daha sakin, dengeli ve profesyonel bir ton kullan. Yumuşat ama etkisini koru.',
            'shorter': 'Çok daha kısa ve öz yap. Gereksiz kelimeleri at. Punch line gibi olsun.',
            'curious': 'Daha merak uyandırıcı yap. Okuyucuyu "devamını merak ettiren" bir şekilde yaz.'
        }

        # Eleştirmene göre düzeltme modu
        if style == 'critic_fix':
            tips_text = '\n'.join([f'- {tip}' for tip in virality_tips]) if virality_tips else ''
            prompt = f"""Bu tweeti ELEŞTİRMEN GERİBİLDİRİMİNE göre düzelt:

ORİJİNAL TWEET: "{tweet_content}"

ELEŞTİRMEN NOTU: {critic_feedback}

{f'UYGULANACAK ÖNERİLER:{chr(10)}{tips_text}' if tips_text else ''}

{f'PERSONA: {persona}' if persona else ''}

TALİMATLAR:
- Eleştirmenin söylediği TÜM noktaları uygula
- Önerilerin hepsini tweete yansıt
- Ana fikri koru ama daha etkili hale getir
- 280 karakter sınırı
- Türkçe yaz

JSON formatında yanıt ver:
{{"content": "düzeltilmiş tweet"}}
"""
        # Tek öneri uygulama modu
        elif style == 'single_tip':
            prompt = f"""Bu tweeti SADECE şu öneriyi uygulayarak düzelt:

ORİJİNAL TWEET: "{tweet_content}"

UYGULANACAK ÖNERİ: {single_tip}

{f'PERSONA: {persona}' if persona else ''}

TALİMATLAR:
- SADECE bu öneriyi uygula, başka şey değiştirme
- Ana mesajı koru
- 280 karakter sınırı
- Türkçe yaz

JSON formatında yanıt ver:
{{"content": "düzeltilmiş tweet"}}
"""
        else:
            prompt = f"""Bu tweeti yeniden yaz:

ORİJİNAL: "{tweet_content}"

STİL: {style_instructions.get(style, 'Daha iyi yap')}

{f'PERSONA: {persona}' if persona else ''}

KURALLAR:
- 280 karakter sınırı
- Türkçe
- Tek bir tweet döndür

JSON formatında yanıt ver:
{{"content": "yeniden yazılmış tweet"}}
"""

        response = model.generate_content(prompt)
        response_text = response.text

        json_match = re.search(r'\{[\s\S]*?\}', response_text)
        if json_match:
            result = json.loads(json_match.group())
            content = result.get('content', tweet_content)
            scores = get_tweet_scores(content, persona)
            result.update(scores)
            return jsonify({'success': True, 'data': result})

        return jsonify({'success': False, 'error': 'Parse hatası'}), 500

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/regenerate', methods=['POST'])
def regenerate_tweet():
    """Aynı parametrelerle yeni tweet üret - farklı sonuç verir"""
    try:
        data = request.json
        topic = data.get('topic', '')
        tone = data.get('tone', 'bilgilendirici')
        writing_style = data.get('writingStyle', 'default')
        target_audience = data.get('targetAudience', 'default')
        hook = data.get('hook', '')
        is_premium = data.get('isPremium', False)
        persona = data.get('persona', '')

        if not topic:
            return jsonify({'success': False, 'error': 'Konu gerekli'}), 400

        char_limit = 4000 if is_premium else 280

        # Randomness için farklı bir yaklaşım kullan
        prompt = f"""Sen viral Twitter içerikleri üreten bir uzmansın. TÜRKÇE yaz.

{f'PERSONA/KARAKTERİN: {persona}' if persona else ''}

KONU: {topic}

{f'AÇILIŞ HOOK: "{hook}" ile başla' if hook else ''}

YAZIM STİLİ: {writing_style}
TON: {tone}
HEDEF KİTLE: {target_audience}

GÖREV: Bu konu için YEPYENİ ve FARKLI bir tweet yaz.
- Önceki versiyonlardan TAMAMEN FARKLI olsun
- Farklı bir açı, farklı bir hook, farklı bir yaklaşım kullan
- Yaratıcı ve beklenmedik ol
- {char_limit} karakter sınırına uy

JSON formatında yanıt ver:
{{"content": "yeni tweet metni"}}
"""

        response = model.generate_content(prompt)
        response_text = response.text

        json_match = re.search(r'\{[\s\S]*?\}', response_text)
        if json_match:
            result = json.loads(json_match.group())
            content = result.get('content', '')
            scores = get_tweet_scores(content, persona)

            return jsonify({
                'success': True,
                'data': {
                    'content': content,
                    'critic_score': scores.get('critic_score', 50),
                    'critic_feedback': scores.get('critic_feedback', ''),
                    'virality_score': scores.get('virality_score', 50),
                    'virality_tips': scores.get('virality_tips', [])
                }
            })

        return jsonify({'success': False, 'error': 'Üretim başarısız'}), 500

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/improve', methods=['POST'])
def improve_tweet():
    """Eleştirmene göre tweeti iyileştir"""
    try:
        data = request.json
        original_content = data.get('content', '')
        criticism = data.get('criticism', '')
        virality_tips = data.get('viralityTips', [])
        persona = data.get('persona', '')
        is_premium = data.get('isPremium', False)

        if not original_content:
            return jsonify({'success': False, 'error': 'Tweet içeriği gerekli'}), 400

        char_limit = 4000 if is_premium else 280

        tips_text = '\n'.join([f'- {tip}' for tip in virality_tips]) if virality_tips else ''

        prompt = f"""Sen bir Twitter içerik iyileştirme uzmanısın. TÜRKÇE yaz.

{f'PERSONA: {persona}' if persona else ''}

ORİJİNAL TWEET:
"{original_content}"

ELEŞTİRMEN GERİBİLDİRİMİ:
{criticism}

{f'UYGULANMASI GEREKEN ÖNERİLER:{chr(10)}{tips_text}' if tips_text else ''}

GÖREV: Bu tweeti yukarıdaki eleştiri ve önerilere göre İYİLEŞTİR.

KURALLAR:
- Eleştirmenin TÜM noktalarını dikkate al
- Önerilerin hepsini uygula
- Ana fikri koru ama daha etkili hale getir
- Daha viral, daha dikkat çekici yap
- {char_limit} karakter sınırına uy
- Türkçe yaz

JSON formatında yanıt ver:
{{"content": "iyileştirilmiş tweet metni"}}
"""

        response = model.generate_content(prompt)
        response_text = response.text

        json_match = re.search(r'\{[\s\S]*?\}', response_text)
        if json_match:
            result = json.loads(json_match.group())
            content = result.get('content', '')
            scores = get_tweet_scores(content, persona)

            return jsonify({
                'success': True,
                'data': {
                    'content': content,
                    'critic_score': scores.get('critic_score', 50),
                    'critic_feedback': scores.get('critic_feedback', ''),
                    'virality_score': scores.get('virality_score', 50),
                    'virality_tips': scores.get('virality_tips', []),
                    'improved': True
                }
            })

        return jsonify({'success': False, 'error': 'İyileştirme başarısız'}), 500

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/quick-restyle', methods=['POST'])
def quick_restyle():
    """Hızlı stil değişikliği - belirli bir stil ile tekrar üret"""
    try:
        data = request.json
        topic = data.get('topic', '')
        restyle_type = data.get('restyleType', '')  # aggressive, question, list
        persona = data.get('persona', '')
        is_premium = data.get('isPremium', False)

        if not topic:
            return jsonify({'success': False, 'error': 'Konu gerekli'}), 400

        char_limit = 4000 if is_premium else 280

        restyle_instructions = {
            'aggressive': 'ÇOK SERT ve PROVOKATİF yaz. Tartışma açıcı, cesur, dikkat çekici. "Bak güzel kardeşim" tarzı.',
            'question': 'SORU İLE BAŞLA. Merak uyandırıcı, düşündürücü bir soru ile aç. "Hiç düşündünüz mü?", "Neden kimse bunu söylemiyor?" gibi.',
            'list': 'LİSTE FORMATI kullan. "3 şey:", "5 kritik nokta:" gibi madde madde yaz.',
            'short': 'ÇOK KISA ve VURUCU yaz. Maksimum 100 karakter. Punch-line tarzı.',
            'story': 'HİKAYE ile başla. "3 yıl önce...", "Bir gün fark ettim ki..." gibi kişisel anekdot.'
        }

        instruction = restyle_instructions.get(restyle_type, 'Daha etkili ve viral yaz.')

        prompt = f"""Sen viral Twitter içerikleri üreten bir uzmansın. TÜRKÇE yaz.

{f'PERSONA: {persona}' if persona else ''}

KONU: {topic}

STİL TALİMATI: {instruction}

GÖREV: Bu konuda yukarıdaki stilde YEPYENİ bir tweet yaz.

KURALLAR:
- Belirtilen stile KESINLIKLE uy
- {char_limit} karakter sınırı {'(KISA stil için 100 karakter)' if restyle_type == 'short' else ''}
- Türkçe yaz
- Dikkat çekici ve viral olsun

JSON formatında yanıt ver:
{{"content": "tweet metni"}}
"""

        response = model.generate_content(prompt)
        response_text = response.text

        json_match = re.search(r'\{[\s\S]*?\}', response_text)
        if json_match:
            result = json.loads(json_match.group())
            content = result.get('content', '')
            scores = get_tweet_scores(content, persona)

            return jsonify({
                'success': True,
                'data': {
                    'content': content,
                    'restyleType': restyle_type,
                    'critic_score': scores.get('critic_score', 50),
                    'critic_feedback': scores.get('critic_feedback', ''),
                    'virality_score': scores.get('virality_score', 50),
                    'virality_tips': scores.get('virality_tips', [])
                }
            })

        return jsonify({'success': False, 'error': 'Stil değişikliği başarısız'}), 500

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/generate-image', methods=['POST'])
def generate_image():
    """Nano Banana (gemini-2.5-flash-image) ile görsel üret"""
    try:
        data = request.json
        prompt = data.get('prompt', '')
        ratio = data.get('ratio', '1:1')

        if not prompt:
            return jsonify({'success': False, 'error': 'Görsel promptu gerekli'}), 400

        # Aspect ratio bilgisini prompt'a ekle
        ratio_descriptions = {
            '1:1': 'square format, 1:1 aspect ratio',
            '16:9': 'wide landscape format, 16:9 aspect ratio',
            '9:16': 'vertical portrait format, 9:16 aspect ratio'
        }

        # Görsel üretim promptu oluştur
        full_prompt = f"""Generate an image based on this description:

{prompt}

Image specifications:
- Format: {ratio_descriptions.get(ratio, 'square format')}
- Style: High quality, detailed, professional
- Output: Generate the image directly"""

        try:
            # Nano Banana modeli ile görsel üret
            response = image_model.generate_content(full_prompt)

            # Yanıttan görsel verisi çıkar
            if response.candidates:
                candidate = response.candidates[0]
                if candidate.content and candidate.content.parts:
                    for part in candidate.content.parts:
                        # Inline data (görsel) kontrolü
                        if hasattr(part, 'inline_data') and part.inline_data:
                            image_data = part.inline_data
                            if hasattr(image_data, 'data'):
                                image_base64 = base64.b64encode(image_data.data).decode('utf-8')
                                mime_type = getattr(image_data, 'mime_type', 'image/png')
                                return jsonify({
                                    'success': True,
                                    'image': f'data:{mime_type};base64,{image_base64}'
                                })

            # Görsel bulunamadıysa metin yanıtı kontrol et
            if response.text:
                return jsonify({
                    'success': False,
                    'error': f'Model görsel üretemedi. Yanıt: {response.text[:200]}',
                    'text_response': response.text
                }), 400

            return jsonify({
                'success': False,
                'error': 'Görsel üretilemedi. Model yanıt vermedi.'
            }), 500

        except Exception as api_error:
            error_message = str(api_error)
            if 'SAFETY' in error_message.upper():
                return jsonify({
                    'success': False,
                    'error': 'Görsel güvenlik filtresi tarafından engellendi. Lütfen farklı bir prompt deneyin.'
                }), 400
            elif 'quota' in error_message.lower():
                return jsonify({
                    'success': False,
                    'error': 'API kotası aşıldı. Lütfen daha sonra tekrar deneyin.'
                }), 429
            else:
                return jsonify({
                    'success': False,
                    'error': f'Görsel üretim hatası: {error_message}'
                }), 500

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/fetch-news', methods=['GET'])
def fetch_news():
    """Gündem haberlerini kategoriye göre çek"""
    try:
        category = request.args.get('category', 'all')
        all_news = []

        for source_key, source_data in RSS_FEEDS.items():
            # Kategori filtresi
            if category != 'all' and source_data['category'] != category:
                continue

            try:
                feed = feedparser.parse(source_data['url'])
                for entry in feed.entries[:5]:
                    # Tarih parse etme
                    published = entry.get('published', entry.get('updated', ''))
                    published_parsed = entry.get('published_parsed', entry.get('updated_parsed', None))

                    news_item = {
                        'title': entry.get('title', 'Başlık yok'),
                        'link': entry.get('link', '#'),
                        'source': source_key,
                        'source_name': source_data['name'],
                        'category': source_data['category'],
                        'summary': (entry.get('summary', entry.get('description', ''))[:200] + '...') if entry.get('summary') or entry.get('description') else '',
                        'published': published,
                        'published_timestamp': time.mktime(published_parsed) if published_parsed else 0
                    }
                    all_news.append(news_item)
            except Exception as e:
                print(f"Error fetching {source_key}: {e}")
                continue

        # Tarihe göre sırala (en yeni üstte)
        all_news.sort(key=lambda x: x.get('published_timestamp', 0), reverse=True)

        return jsonify({'success': True, 'news': all_news, 'category': category})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/thread-templates', methods=['GET'])
def get_thread_templates():
    """Thread şablonlarını döndür"""
    templates = [
        {'id': key, 'name': val['name']}
        for key, val in THREAD_TEMPLATES.items()
    ]
    return jsonify({'success': True, 'templates': templates})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5800, debug=True)
