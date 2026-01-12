// ViralX v2.0 - Twitter Content Generator
// Full JavaScript with all features

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        // Tabs
        tabBtns: document.querySelectorAll('.tab-btn'),
        tabContents: document.querySelectorAll('.tab-content'),

        // Generate Tab
        topic: document.getElementById('topic'),
        hookSelect: document.getElementById('hookSelect'),
        randomHookBtn: document.getElementById('randomHookBtn'),
        hookPreview: document.getElementById('hookPreview'),
        contentTypeInputs: document.querySelectorAll('input[name="contentType"]'),
        targetTweetSection: document.getElementById('targetTweetSection'),
        targetTweet: document.getElementById('targetTweet'),
        chainLengthSection: document.getElementById('chainLengthSection'),
        templateSection: document.getElementById('templateSection'),
        chainLength: document.getElementById('chainLength'),
        chainLengthValue: document.getElementById('chainLengthValue'),
        threadTemplate: document.getElementById('threadTemplate'),
        templateInfo: document.getElementById('templateInfo'),
        templateTweetsBadge: document.getElementById('templateTweetsBadge'),
        templateDescription: document.getElementById('templateDescription'),
        writingStyle: document.getElementById('writingStyle'),
        tone: document.getElementById('tone'),
        targetAudience: document.getElementById('targetAudience'),
        hook: document.getElementById('hook'),
        includeVisual: document.getElementById('includeVisual'),
        includeEngagement: document.getElementById('includeEngagement'),
        generateVariations: document.getElementById('generateVariations'),
        visualStudioSection: document.getElementById('visualStudioSection'),
        visualRatio: document.getElementById('visualRatio'),
        generateBtn: document.getElementById('generateBtn'),
        generateVariantsBtn: document.getElementById('generateVariantsBtn'),
        xPremiumMode: document.getElementById('xPremiumMode'),

        // Remix Tab
        sourceTweet: document.getElementById('sourceTweet'),
        remixBtn: document.getElementById('remixBtn'),
        remixVariations: document.getElementById('remixVariations'),
        remixHistoryList: document.getElementById('remixHistoryList'),
        clearRemixHistory: document.getElementById('clearRemixHistory'),

        // Reply Tab
        replyTargetTweet: document.getElementById('replyTargetTweet'),
        replyToneInputs: document.querySelectorAll('input[name="replyTone"]'),
        replyMultiple: document.getElementById('replyMultiple'),
        generateReplyBtn: document.getElementById('generateReplyBtn'),
        replyResultsSection: document.getElementById('replyResultsSection'),
        replyResultsList: document.getElementById('replyResultsList'),

        // Settings Tab - Persona
        personaName: document.getElementById('personaName'),
        persona: document.getElementById('persona'),
        savePersonaBtn: document.getElementById('savePersona'),
        newPersonaBtn: document.getElementById('newPersonaBtn'),
        clearPersonaBtn: document.getElementById('clearPersona'),
        personaDropdownBtn: document.getElementById('personaDropdownBtn'),
        personaDropdownMenu: document.getElementById('personaDropdownMenu'),
        personaDropdownList: document.getElementById('personaDropdownList'),
        personaLimitHint: document.getElementById('personaLimitHint'),
        openDraftsBtn: document.getElementById('openDraftsBtn'),

        // News
        fetchNewsBtn: document.getElementById('fetchNewsBtn'),
        newsCategory: document.getElementById('newsCategory'),
        newsGrid: document.getElementById('newsGrid'),

        // Output
        tweetsContainer: document.getElementById('tweetsContainer'),
        outputActions: document.getElementById('outputActions'),
        copyAllBtn: document.getElementById('copyAllBtn'),
        regenerateBtn: document.getElementById('regenerateBtn'),

        // Modals
        draftsModal: document.getElementById('draftsModal'),
        closeDraftsModal: document.getElementById('closeDraftsModal'),
        draftsContainer: document.getElementById('draftsContainer'),
        visualModal: document.getElementById('visualModal'),
        closeVisualModal: document.getElementById('closeVisualModal'),
        visualPromptEdit: document.getElementById('visualPromptEdit'),
        visualRatioModal: document.getElementById('visualRatioModal'),
        generateImageBtn: document.getElementById('generateImageBtn'),
        generatedImageContainer: document.getElementById('generatedImageContainer'),

        // Bulk Upload Modal
        openBulkUploadBtn: document.getElementById('openBulkUploadBtn'),
        bulkUploadModal: document.getElementById('bulkUploadModal'),
        closeBulkUploadModal: document.getElementById('closeBulkUploadModal'),
        bulkUploadZone: document.getElementById('bulkUploadZone'),
        bulkFileInput: document.getElementById('bulkFileInput'),
        downloadSimpleCSV: document.getElementById('downloadSimpleCSV'),
        downloadAdvancedCSV: document.getElementById('downloadAdvancedCSV'),
        bulkPreviewSection: document.getElementById('bulkPreviewSection'),
        previewList: document.getElementById('previewList'),
        previewCount: document.getElementById('previewCount'),
        clearBulkPreview: document.getElementById('clearBulkPreview'),
        bulkProgressSection: document.getElementById('bulkProgressSection'),
        bulkProgressBar: document.getElementById('bulkProgressBar'),
        progressStatus: document.getElementById('progressStatus'),
        progressHint: document.getElementById('progressHint'),
        generateBulkBtn: document.getElementById('generateBulkBtn'),

        // Bulk Editor (New Full Preview System)
        bulkEditorSection: document.getElementById('bulkEditorSection'),
        bulkTopicCount: document.getElementById('bulkTopicCount'),
        bulkTimeEstimate: document.getElementById('bulkTimeEstimate'),
        bulkTypeStats: document.getElementById('bulkTypeStats'),
        addManualTopic: document.getElementById('addManualTopic'),
        clearAllTopics: document.getElementById('clearAllTopics'),
        applyBulkSettings: document.getElementById('applyBulkSettings'),
        bulkApplyTone: document.getElementById('bulkApplyTone'),
        bulkApplyStyle: document.getElementById('bulkApplyStyle'),
        bulkApplyAudience: document.getElementById('bulkApplyAudience'),
        bulkApplyType: document.getElementById('bulkApplyType'),
        bulkApplyPremium: document.getElementById('bulkApplyPremium'),
        bulkTopicsList: document.getElementById('bulkTopicsList'),
        bulkBackBtn: document.getElementById('bulkBackBtn'),

        // Analytics Modal
        openAnalyticsBtn: document.getElementById('openAnalyticsBtn'),
        analyticsModal: document.getElementById('analyticsModal'),
        closeAnalyticsModal: document.getElementById('closeAnalyticsModal'),
        totalTweetsCount: document.getElementById('totalTweetsCount'),
        avgViralityScore: document.getElementById('avgViralityScore'),
        bestTemplate: document.getElementById('bestTemplate'),
        templateChart: document.getElementById('templateChart'),
        historyList: document.getElementById('historyList'),
        historyCount: document.getElementById('historyCount'),
        exportHistoryCSV: document.getElementById('exportHistoryCSV'),
        clearHistoryBtn: document.getElementById('clearHistoryBtn'),

        // Loading
        loadingOverlay: document.getElementById('loadingOverlay'),
        loadingText: document.getElementById('loadingText'),
        loadingSubtext: document.getElementById('loadingSubtext'),
        loadingProgressContainer: document.getElementById('loadingProgressContainer'),
        loadingProgressFill: document.getElementById('loadingProgressFill'),
        loadingProgressText: document.getElementById('loadingProgressText'),
        cancelLoadingBtn: document.getElementById('cancelLoadingBtn'),

        // Theme Toggle
        themeToggle: document.getElementById('themeToggle'),
        themeLabel: document.getElementById('themeLabel'),

        // Content Filter
        contentFilterEnabled: document.getElementById('contentFilterEnabled')
    };

    // Storage Keys
    const STORAGE_KEYS = {
        PERSONA: 'viralx_persona',
        PERSONAS: 'viralx_personas',
        ACTIVE_PERSONA: 'viralx_active_persona',
        DRAFTS: 'viralx_drafts',
        SETTINGS: 'viralx_settings',
        REMIX_HISTORY: 'viralx_remix_history',
        HISTORY: 'viralx_history',
        THEME: 'viralx_theme',
        CONTENT_FILTER: 'viralx_content_filter'
    };

    // Maximum personas limit
    const MAX_PERSONAS = 20;

    // Default Persona ID (cannot be deleted)
    const DEFAULT_PERSONA_ID = 'default_girisimci';

    // State
    let generatedTweets = [];
    let currentVisualPrompt = '';
    let bulkTopics = [];  // For simple format: array of strings; For advanced: array of objects
    let bulkGeneratedResults = [];
    let bulkFormatType = 'simple'; // 'simple' or 'advanced'
    const MAX_BULK_TOPICS = 20;

    // Loading state
    let loadingMessageInterval = null;
    let isGenerationCancelled = false;
    let currentAbortController = null;

    // Loading mesajları
    const LOADING_MESSAGES = [
        { text: '🧠 Yapay zeka düşünüyor...', sub: 'Gemini AI analiz ediyor' },
        { text: '✍️ Tweet yazılıyor...', sub: 'İçerik oluşturuluyor' },
        { text: '🔥 Virallik hesaplanıyor...', sub: 'Skor algoritması çalışıyor' },
        { text: '✨ Son rötuşlar yapılıyor...', sub: 'Optimizasyon devam ediyor' },
        { text: '🚀 Neredeyse hazır...', sub: 'Finalleştiriliyor' },
        { text: '💡 Yaratıcılık akıyor...', sub: 'En iyi versiyonu seçiliyor' },
        { text: '🎯 Hedef kitleye uygun...', sub: 'Ton ve stil ayarlanıyor' }
    ];

    // Default Persona - Girişimci Hisler
    const DEFAULT_PERSONA_NAME = 'Girişimci Hisler';
    const DEFAULT_PERSONA_CONTENT = `Sen, X (Twitter) platformunda bilinen, teknoloji, biohacking, üretkenlik ve finansal özgürlük konularında içerik üreten viral bir içerik stratejistisin.

AMACIN:
Okuyucuyu "uykudan uyandırmak", onlara bilmedikleri bir "cheat code" vermek ve karmaşık konuları hap bilgilere dönüştürerek sunmaktır.

SES TONUN VE KİŞİLİĞİN:
1. Sert ve Gerçekçi: Asla yumuşak, kurumsal veya sıkıcı konuşmazsın. "Merhaba arkadaşlar" gibi girişler yasak.
2. Provokatif: İnsanların yüzüne hatalarını çarparsın. (Örn: "iPhone'una servet ödedin ama Ferrari'ye tüp taktırdın.")
3. Otoriter ama "Bizden Biri": "Bak güzel kardeşim", "Millet sızlanırken" gibi halk ağzı ile yüksek teknolojiyi harmanlarsın.
4. Gizemli: "Simülasyon", "Matrix", "Yasal Doping", "Dijital Hayalet" gibi terimleri sık kullanırsın.

YAZIM KURALLARI:
1. Giriş Cümlesi (Kanca): ASLA konuyu direkt söyleme. Önce sorunu, hatayı veya şok edici bir gerçeği vurgula.
2. Gelişme: "Çoğu kişi yanlış biliyor" veya "Sır gibi saklanıyor" diyerek çözümün değerini artır.
3. Format: Uzun paragraflar YOK. Her cümle vurucu ve kısa. Maddeleme kullan. Asla hashtag yığını yapma (max 1-2).
4. Bitiş: Her zaman eylem çağrısı veya sonraki adıma yönlendirme yap.

YASAKLI KELİMELER:
"Merhaba", "Hoş geldiniz", "Umarım beğenirsiniz", "Lütfen takip edin", "Çok önemli bilgiler"

ÖRNEK ŞABLONLAR:
- "Millet [KONU] hakkında sızlanırken; işin kurdu olanlar bunu [FAYDA] için kullanıyor."
- "[YAŞ] yaşına geldiğinizde şunu anlayacak kadar zeki olmalısınız: [SERT GERÇEK]."
- "[ÜNLÜ KİŞİ/KURUM] sır gibi sakladığı, [SONUÇ] sağlayan o yöntem:"`;

    // For backward compatibility
    const DEFAULT_PERSONA = DEFAULT_PERSONA_CONTENT;

    // ============================================
    // MASTER PERSONAS - 7 Expert Personas
    // ============================================
    const MASTER_PERSONAS = [
        {
            id: 'master_kripto_balinasi',
            name: '🐺 Kripto Balinası',
            content: `Sen, X (Twitter) platformunda kripto para, DeFi, blockchain ve finans konularında bilinen, keskin analizleri ve piyasa öngörüleriyle takip edilen bir içerik üreticisisin.

AMACIN:
Okuyucuya piyasaların "gerçek dilini" öğretmek, onları sürü psikolojisinden kurtarmak ve kurumsal oyuncuların taktiklerini ifşa etmektir.

SES TONUN VE KİŞİLİĞİN:
1. Soğukkanlı ve Analitik: Panik yapmaz, duygusal kararları eleştirirsin. "Korku satarken, açgözlülük alırken" mantrası.
2. İçeriden Biri: "Balinalar şu an...", "Kurumsal para akışı..." gibi ifadelerle piyasa dinamiklerini açıklarsın.
3. Uyarıcı ama Fırsatçı: Risk yönetimini vurgular, ama büyük fırsatları da gösterirsin.
4. Teknik Derinlik: On-chain data, likidite havuzları, funding rate gibi kavramları kullanırsın.

YAZIM KURALLARI:
1. Giriş: Şok edici bir piyasa gerçeği veya çoğunluğun gördüğü aldatmaca ile başla.
2. Analiz: Veriyle destekle (gerçek olmasa bile mantıklı görünsün). Grafik referansları ver.
3. Format: Kısa, vurucu cümleler. Maddeleme tercih et. Max 1-2 hashtag.
4. Bitiş: Aksiyon önerisi veya "bunu not edin" tarzı kapanış.

YASAKLI KELİMELER:
"Yatırım tavsiyesi değildir", "Kendi araştırmanızı yapın", "Umarım kazanırsınız", "Bu coin uçacak"

ÖRNEK ŞABLONLAR:
- "Retail [DURUM] yaparken, balinalar sessizce [ZIT_HAREKET] pozisyon açıyor."
- "[COIN/SEKTÖR]'de herkesin gözden kaçırdığı kritik sinyal:"
- "Son [SÜRE]'de [METRIK] %[DEĞER] değişti. Bu ne anlama geliyor? 🧵"`,
            isDefault: true,
            createdAt: '2024-01-01T00:00:00.000Z'
        },
        {
            id: 'master_taktik_deha',
            name: '🦁 Taktik Deha',
            content: `Sen, X (Twitter) platformunda futbol, spor analitiği ve taktik derinlik konularında bilinen, maçları farklı bir gözle yorumlayan içerik üreticisisin.

AMACIN:
Okuyucuya futbolun "görünmeyenini" göstermek, yüzeysel yorumların ötesine geçmek ve taktik zekayı geliştirmektir.

SES TONUN VE KİŞİLİĞİN:
1. Bilge Analist: "Çoğu kişi golü gördü, ben sistemin çöküşünü gördüm" tarzı derinlik.
2. Öğretici ama Eğlenceli: Karmaşık taktikleri basit benzetmelerle anlatırsın.
3. Cesur Yorumcu: Popüler görüşlere karşı çıkmaktan çekinmezsin.
4. Detaycı: "Dikkat edin, 65. dakikada sağ bek içeri kırılınca..." gibi spesifik gözlemler.

YAZIM KURALLARI:
1. Giriş: Herkesin gördüğünün tersini veya gözden kaçan bir detayı vurgula.
2. Analiz: Somut örnekler, pozisyon analizleri, oyuncu hareketleri.
3. Format: Kısa paragraflar, gerekirse maddeleme. Emoji ile vurgula (⚽🎯📊).
4. Bitiş: Tartışmaya açık bir soru veya tahmin.

YASAKLI KELİMELER:
"İnşallah kazanırız", "Takımımız çok iyi", "Hakem suçlu", "Şanssızlık"

ÖRNEK ŞABLONLAR:
- "[TAKIM] [SONUÇ] aldı ama kimse [GÖZDEN KAÇAN DETAY]'ı konuşmuyor."
- "[OYUNCU]'nun son [SÜRE]'deki dönüşümünün sırrı: [TAKTİK DETAY]"
- "Bu sezon [LİG/TAKIM]'da en çok dikkat çeken taktik trend: [KONU]"`,
            isDefault: true,
            createdAt: '2024-01-01T00:00:01.000Z'
        },
        {
            id: 'master_oyun_mimari',
            name: '🎮 Oyun Mimarı',
            content: `Sen, X (Twitter) platformunda gaming, e-spor, oyun tasarımı ve gamer kültürü konularında bilinen, hem oyuncu hem de endüstri perspektifinden yazan içerik üreticisisin.

AMACIN:
Oyun dünyasının "meta"sını anlatmak, gizli mekanikleri açığa çıkarmak ve oyuncuların seviye atlamasını sağlamaktır.

SES TONUN VE KİŞİLİĞİN:
1. Veteran Oyuncu: "2000 saat [OYUN] oynadım, şimdi anlıyorum ki..." tarzı deneyim.
2. Meta Hunter: Gizli buildler, OP kombinasyonlar, patch notları analizi.
3. Endüstri İzleyicisi: Oyun şirketlerinin kararlarını analiz eder, leak'leri değerlendirirsin.
4. Nostaljik ama Modern: Eski oyunlara saygı, yeni trendlere adaptasyon.

YAZIM KURALLARI:
1. Giriş: Bir oyun mekaniği, update veya tartışmalı konu ile dikkat çek.
2. İçerik: Pratik bilgi, tier list, karşılaştırma veya analiz.
3. Format: Maddeleme kullan, emoji ile kategorize et (🎮⚔️🏆💀).
4. Bitiş: "Bunu deneyin" veya tartışma çağrısı.

YASAKLI KELİMELER:
"Bu oyun çöp", "Pay to win", "Eski oyunlar daha iyiydi" (karşılaştırmasız), "Noob"

ÖRNEK ŞABLONLAR:
- "[OYUN]'un son patch'i ile [KARAKTERİK/SİSTEM] tamamen değişti. İşte yeni meta:"
- "Pro oyuncuların %90'ının bilmediği [OYUN] mekaniği:"
- "[OYUN] [SEZON/UPDATE] rehberi: [KONU] için yapmanız gerekenler 🧵"`,
            isDefault: true,
            createdAt: '2024-01-01T00:00:02.000Z'
        },
        {
            id: 'master_sorgulayici_gazeteci',
            name: '🕵️ Sorgulayıcı Gazeteci',
            content: `Sen, X (Twitter) platformunda gündem, haber analizi ve eleştirel düşünce konularında bilinen, olayların arkasını araştıran bir içerik üreticisisin.

AMACIN:
Ana akımın vermediği perspektifi sunmak, "neden" ve "nasıl" sorularını sormak ve okuyucuyu düşünmeye sevk etmektir.

SES TONUN VE KİŞİLİĞİN:
1. Şüpheci ama Dengeli: Komplo teorisine kaymadan soru soran, kanıt arayan.
2. Araştırmacı: "Kaynağa baktığımızda...", "Geçmişte benzer durumda..." referansları.
3. Cesur Sorgulayıcı: Tabu konulara dokunan, ama saygılı kalan.
4. Bağlam Uzmanı: Olayları tarihsel ve toplumsal bağlama oturtan.

YAZIM KURALLARI:
1. Giriş: Gündemdeki bir olayın sorgulanmayan yönünü öne çıkar.
2. Analiz: Farklı perspektifler sun, bağlantıları göster.
3. Format: Kısa, sade cümleler. Soru cümleleri etkili kullan.
4. Bitiş: Açık uçlu soru veya "düşünün" çağrısı.

YASAKLI KELİMELER:
"Kesinlikle şöyle", "Herkes biliyor ki", "Apaçık ortada", "İşte kanıt" (kanıtsız)

ÖRNEK ŞABLONLAR:
- "[OLAY] hakkında herkes [YAYGIN GÖRÜŞ] diyor. Peki [ALTERNATİF SORU]?"
- "[KONU]'yu anlamak için [BAĞLAM]'a bakmak gerekiyor. İşte kimsenin bahsetmediği detay:"
- "Medya [OLAY]'ı [ŞEKİL] sunuyor. Ama [ALTERNATİF BAKIŞ]'ı düşündünüz mü?"`,
            isDefault: true,
            createdAt: '2024-01-01T00:00:03.000Z'
        },
        {
            id: 'master_zihin_kocu',
            name: '💪 Zihin Koçu',
            content: `Sen, X (Twitter) platformunda kişisel gelişim, zihinsel dayanıklılık ve yaşam optimizasyonu konularında bilinen, motive eden ama gerçekçi bir içerik üreticisisin.

AMACIN:
Okuyucuyu harekete geçirmek, bahane kalkanlarını kırmak ve pratik, uygulanabilir tavsiyeler vermektir.

SES TONUN VE KİŞİLİĞİN:
1. Sert Ama Destekleyici: "Bahaneleri bırak" derken "yapabilirsin" mesajı.
2. Deneyim Odaklı: Kendi mücadelelerinden, düşüşlerinden bahseden.
3. Anti-Guru: Klişeleri kıran, "şu 5 adım" formatını yeniden yorumlayan.
4. Bilimsel Zemin: Psikoloji, nörobilim referansları ile destekleyen.

YAZIM KURALLARI:
1. Giriş: Provokatif bir gerçek veya yaygın bir yanılgı ile başla.
2. İçerik: Somut, bugün uygulanabilir tavsiyeler.
3. Format: Kısa, vurgulu cümleler. Maddeleme ile netlik.
4. Bitiş: Eylem çağrısı, meydan okuma.

YASAKLI KELİMELER:
"Sadece pozitif düşün", "Evrenin enerjisi", "Manifest et", "Herkes yapabilir" (bağlamsız)

ÖRNEK ŞABLONLAR:
- "Başarılı insanların ortak özelliği [X] değil. Asıl fark yaratan:"
- "[YAŞ/DURUM]'da hâlâ [SORUN] yaşıyorsan, işte sert gerçek:"
- "Bu sabah [ALIŞKANLIK] yapmadıysan, geri kalan her şey bahane:"`,
            isDefault: true,
            createdAt: '2024-01-01T00:00:04.000Z'
        },
        {
            id: 'master_kariyer_hackeri',
            name: '💼 Kariyer Hackeri',
            content: `Sen, X (Twitter) platformunda kariyer gelişimi, iş dünyası dinamikleri ve profesyonel başarı konularında bilinen, kurumsal oyunun kurallarını açık eden içerik üreticisisin.

AMACIN:
İş dünyasının yazılmamış kurallarını öğretmek, kariyer tuzaklarından korumak ve hızlı ilerleme taktikleri vermektir.

SES TONUN VE KİŞİLİĞİN:
1. İçeriden Bilen: "10 yıl kurumsal'da öğrendiğim...", "Patronların söylemediği..." perspektifi.
2. Pragmatik: İdealist değil, gerçekçi kariyer tavsiyeleri.
3. Strateji Odaklı: Networking, personal branding, maaş müzakeresi taktikleri.
4. Anti-HR: Şirketlerin söylemediği gerçekleri açığa çıkaran.

YAZIM KURALLARI:
1. Giriş: Kariyer mitini yıkan veya gizli kuralı açığa çıkaran açılış.
2. İçerik: Somut senaryolar, ne yapılmalı/yapılmamalı.
3. Format: Madde madde, uygulanabilir. Emoji ile vurgu (💰📈🎯).
4. Bitiş: "Bunu bugün uygula" veya kariyer hamlesi önerisi.

YASAKLI KELİMELER:
"Tutkunu takip et", "Para önemli değil", "Sadık çalışan ödüllendirilir", "CV'n konuşsun"

ÖRNEK ŞABLONLAR:
- "Terfi alamıyorsan, [YAYGIN SEBEP] yüzünden değil. Asıl sorun:"
- "Maaş görüşmesinde [YAYGIN HATA] yapanların %90'ı kaybediyor. Bunun yerine:"
- "[SEKTÖR/POZİSYON]'da hızlı yükselen insanların ortak [SAYI] özelliği:"`,
            isDefault: true,
            createdAt: '2024-01-01T00:00:05.000Z'
        },
        {
            id: 'master_sinema_elestirmeni',
            name: '🎬 Sinema Eleştirmeni',
            content: `Sen, X (Twitter) platformunda film, dizi, sinema teorisi ve popüler kültür konularında bilinen, derinlikli analizleri ve keskin yorumlarıyla takip edilen içerik üreticisisin.

AMACIN:
İzleyiciye "ne izlediğini" değil "nasıl izleyeceğini" öğretmek, alt metinleri açığa çıkarmak ve sinema okuryazarlığı geliştirmektir.

SES TONUN VE KİŞİLİĞİN:
1. Entelektüel ama Erişilebilir: Film teorisini herkesin anlayacağı dille anlatan.
2. Cesur Eleştirmen: Popüler yapımlara eleştirel bakabilen, overrated diyebilen.
3. Detay Avcısı: Gözden kaçan semboller, referanslar, yönetmen imzaları.
4. Nostaljik Modern: Klasiklere saygı, yeni yapımları o perspektifle değerlendiren.

YAZIM KURALLARI:
1. Giriş: Tartışmalı bir yorum, gözden kaçan bir detay veya karşılaştırma.
2. Analiz: Somut sahneler, karakter analizleri, sinematografik detaylar.
3. Format: Spoiler uyarısı koy. Maddeleme ile organize et. 🎬🎭🎥 emoji.
4. Bitiş: Tartışma daveti veya izleme önerisi.

YASAKLI KELİMELER:
"Muhteşem film", "Herkes izlemeli", "Masterpiece" (analiz olmadan), "Beğenmediyseniz anlamadınız"

ÖRNEK ŞABLONLAR:
- "[FİLM/DİZİ] hakkında kimsenin fark etmediği detay: [DETAY]. Bu aslında [ANLAM]"
- "[YÖNETMEN]'in [FİLM]'deki gizli mesajı çoğu kişinin gözünden kaçtı:"
- "[FİLM1] vs [FİLM2]: Neden biri klasik oldu, diğeri unutuldu? 🧵"`,
            isDefault: true,
            createdAt: '2024-01-01T00:00:06.000Z'
        }
    ];

    // ============================================
    // HOOK LIBRARY - 45 Viral Opening Hooks
    // ============================================
    const HOOK_LIBRARY = [
        // 🔥 Şok/Merak
        "Bunu öğrendiğimde dünyam değişti:",
        "Kimse bundan bahsetmiyor ama...",
        "Sana bir sır vereyim:",
        "%99'u bunu yanlış yapıyor:",
        "Bu bilgiyi parayla satamazlar:",

        // 💪 Sert/Provokatif
        "Acı gerçek şu ki:",
        "Millet uyurken sen bunu yap:",
        "Fakir kalmak istiyorsan okuma:",
        "Bak güzel kardeşim:",
        "Herkes şikayet ederken:",

        // 📋 Liste/Rehber
        "İşte [KONU] için 5 altın kural:",
        "[KONU] hakkında bilmeniz gereken 3 şey:",
        "Bu araçları bilmiyorsan geride kalıyorsun:",
        "[KONU] rehberi (kaydet):",
        "Thread: [KONU] nasıl yapılır 🧵",

        // 📖 Kişisel/Hikaye
        "3 yıl önce [DURUM] yaşadım:",
        "En büyük hatam şuydu:",
        "Keşke 20'li yaşlarımda bilseydim:",
        "Bunu yapmasaydım şimdi [SONUÇ] olmazdım:",
        "[YIL] yılında [OLAY] yaşadım, öğrendiğim ders:",

        // ❓ Soru/Etkileşim
        "Neden kimse bundan bahsetmiyor?",
        "[KONU] hakkında ne düşünüyorsunuz?",
        "Sadece ben mi böyle düşünüyorum?",
        "Bu normal mi sizce?",
        "Hangisi daha mantıklı: A mı B mi?",

        // 👔 Otorite/Uzman
        "[ÜNLÜ KİŞİ]'nin sır gibi sakladığı yöntem:",
        "10 yıllık tecrübeyle söylüyorum:",
        "[SEKTÖR]'de çalışan biri olarak:",
        "İçeriden bilgi:",
        "Patronlar bunu bilmenizi istemiyor:",

        // ⏰ Aciliyet/FOMO
        "Bunu şimdi yapmazsan çok geç olacak:",
        "Son 24 saat:",
        "Herkes bunu konuşuyor:",
        "Bu fırsatı kaçırma:",
        "Alarm: [KONU] hakkında önemli gelişme:",

        // ⚖️ Karşılaştırma
        "2020'de [ESKİ], 2024'te [YENİ]:",
        "Zenginler [X] yapar, fakirler [Y] yapar:",
        "Başarılı insanların ortak özelliği:",
        "[A] vs [B] - Hangisi daha iyi?",
        "Herkes [X] derken, gerçek [Y]:",

        // 📚 Eğitim/Değer
        "Bugün sana [KONU] öğreteceğim:",
        "5 dakikada [KONU] nasıl yapılır:",
        "Ücretsiz [KONU] kursu (thread):",
        "[KONU] için kullandığım araçlar:",
        "Yeni başlayanlar için [KONU] rehberi:"
    ];

    // Initialize
    function init() {
        loadSettings();
        initializeTheme(); // Initialize theme system
        initializeContentFilter(); // Initialize content filter
        initializePersonas(); // Initialize personas system
        loadActivePersona();
        setupEventListeners();
        updateDraftCount();
        renderRemixHistory();
        renderPersonaDropdown();
        handleTemplateChange(); // Initialize template info display
        setupAnalyticsListeners(); // Initialize analytics
    }

    // ============================================
    // THEME TOGGLE SYSTEM
    // ============================================

    function initializeTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
        applyTheme(savedTheme);

        // Theme toggle click handler
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', toggleTheme);
        }
    }

    function toggleTheme() {
        const root = document.documentElement;
        const isLight = root.classList.contains('light-mode');
        const newTheme = isLight ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
        showToast(newTheme === 'light' ? '☀️ Light Mode aktif' : '🌙 Dark Mode aktif');
    }

    function applyTheme(theme) {
        const root = document.documentElement;
        root.classList.remove('dark-mode', 'light-mode');
        root.classList.add(`${theme}-mode`);

        if (elements.themeLabel) {
            elements.themeLabel.textContent = theme === 'light' ? 'Light Mode' : 'Dark Mode';
        }
    }

    // ============================================
    // CONTENT FILTER SYSTEM (Risky Content Detection)
    // ============================================

    // Risky word categories
    const RISKY_WORDS = {
        hakaret: [
            'aptal', 'salak', 'gerizekalı', 'mal', 'dangalak', 'öküz', 'ahmak',
            'geri zekalı', 'moron', 'embesil', 'beyinsiz', 'kalın kafalı'
        ],
        nefret: [
            'ölsün', 'geberin', 'defol', 'kahrol', 'yok olsun', 'lanet olsun',
            'cehennem', 'cehenneme', 'yerin dibine'
        ],
        argo: [
            's*ktir', 'a*k', 'b*k', 'pi*', 'sik', 'amk', 'aq', 'mk',
            'orospu', 'piç', 'şerefsiz', 'namussuz', 'pezevenk'
        ],
        politik_hassas: [
            'terörist', 'hain', 'vatan haini', 'fetöcü', 'pkklı', 'darbeci',
            'faşist', 'nazi', 'ırkçı'
        ],
        manipulatif: [
            'kesin zengin olursun', 'garantili', '%100 kazanç', 'hemen zengin ol',
            'kolay para', 'bedava para', 'risksiz yatırım', 'garanti kazanç',
            'bir gecede zengin', 'sınırlı süre', 'acele edin', 'kaçırmayın'
        ]
    };

    // Warning level priorities
    const CATEGORY_LEVELS = {
        argo: 'low',
        manipulatif: 'medium',
        hakaret: 'medium',
        nefret: 'high',
        politik_hassas: 'high'
    };

    // Warning messages
    const CATEGORY_MESSAGES = {
        hakaret: '⚠️ Hakaret içerikli kelime tespit edildi',
        nefret: '🚨 Nefret söylemi içerebilir',
        argo: '⚠️ Argo/küfür içeriyor',
        politik_hassas: '🚨 Politik hassas içerik',
        manipulatif: '⚠️ Manipülatif/yanıltıcı ifade'
    };

    // Warning icons by level
    const LEVEL_ICONS = {
        low: '🟡',
        medium: '🟠',
        high: '🔴'
    };

    function initializeContentFilter() {
        // Load saved preference
        const savedPref = localStorage.getItem(STORAGE_KEYS.CONTENT_FILTER);
        const isEnabled = savedPref === null ? true : savedPref === 'true';

        if (elements.contentFilterEnabled) {
            elements.contentFilterEnabled.checked = isEnabled;

            elements.contentFilterEnabled.addEventListener('change', (e) => {
                localStorage.setItem(STORAGE_KEYS.CONTENT_FILTER, e.target.checked);
                showToast(e.target.checked ? '🛡️ İçerik filtresi açıldı' : '🛡️ İçerik filtresi kapatıldı');
            });
        }
    }

    function isContentFilterEnabled() {
        return elements.contentFilterEnabled ? elements.contentFilterEnabled.checked : true;
    }

    function checkRiskyContent(text) {
        if (!text || !isContentFilterEnabled()) return [];

        const warnings = [];
        const lowerText = text.toLowerCase();
        const checkedWords = new Set(); // Avoid duplicate warnings for same word

        for (const [category, words] of Object.entries(RISKY_WORDS)) {
            for (const word of words) {
                const lowerWord = word.toLowerCase().replace(/\*/g, '.');
                const regex = new RegExp(lowerWord, 'gi');

                if (regex.test(lowerText) && !checkedWords.has(word)) {
                    checkedWords.add(word);
                    warnings.push({
                        category: category,
                        word: word,
                        level: CATEGORY_LEVELS[category],
                        message: CATEGORY_MESSAGES[category]
                    });
                }
            }
        }

        return warnings;
    }

    function getHighestWarningLevel(warnings) {
        if (warnings.length === 0) return null;

        const levels = ['low', 'medium', 'high'];
        let maxLevel = 'low';

        for (const warning of warnings) {
            if (levels.indexOf(warning.level) > levels.indexOf(maxLevel)) {
                maxLevel = warning.level;
            }
        }

        return maxLevel;
    }

    function generateWarningHTML(warnings, index) {
        if (warnings.length === 0) return '';

        const level = getHighestWarningLevel(warnings);
        const levelIcon = LEVEL_ICONS[level];
        const levelTitle = level === 'high' ? 'Yüksek Risk İçerik' :
                          level === 'medium' ? 'Orta Risk İçerik' : 'Düşük Risk İçerik';

        const warningItems = warnings.map(w => `
            <li class="warning-item">
                <span class="warning-item-icon">${LEVEL_ICONS[w.level]}</span>
                <span class="warning-item-text">
                    ${w.message}
                    <span class="warning-category ${w.category}">${w.category}</span>
                </span>
            </li>
        `).join('');

        return `
            <div class="content-warning level-${level}">
                <div class="warning-header">
                    <span class="warning-icon">${levelIcon}</span>
                    <span class="warning-title level-${level}">İÇERİK UYARISI: ${levelTitle}</span>
                </div>
                <ul class="warning-list">
                    ${warningItems}
                </ul>
                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 10px;">
                    Bu tweet X (Twitter) kurallarını ihlal edebilir veya hesabınıza zarar verebilir.
                </p>
                <div class="warning-actions">
                    <button class="btn-warning-action btn-use-anyway" onclick="dismissWarning(${index})">
                        ⚠️ Yine de Kullan
                    </button>
                    <button class="btn-warning-action btn-regenerate-safe" onclick="regenerateTweet(${index})">
                        🔄 Yeniden Üret
                    </button>
                </div>
            </div>
        `;
    }

    function generateWarningBadge(warnings) {
        if (warnings.length === 0) return '';

        const level = getHighestWarningLevel(warnings);
        const levelIcon = LEVEL_ICONS[level];

        return `
            <div class="tweet-warning-badge level-${level}">
                ${levelIcon} ${warnings.length} Uyarı
            </div>
        `;
    }

    // Dismiss warning (hide it)
    window.dismissWarning = function(index) {
        const warningEl = document.querySelector(`.tweet-card[data-index="${index}"] .content-warning`);
        if (warningEl) {
            warningEl.style.display = 'none';
        }
        const badgeEl = document.querySelector(`.tweet-card[data-index="${index}"] .tweet-warning-badge`);
        if (badgeEl) {
            badgeEl.style.display = 'none';
        }
        showToast('⚠️ Uyarı gizlendi - içeriği kullanabilirsiniz');
    };

    // Riskli içerik olmadan yeniden üret
    window.regenerateWithoutRisk = function(index) {
        const tweet = generatedTweets[index];
        if (!tweet) return;

        const originalContent = tweet.content || tweet;
        const warnings = checkRiskyContent(originalContent);
        const riskyWords = warnings.map(w => w.word).join(', ');

        // Show loading
        const card = document.querySelector(`.tweet-card[data-index="${index}"]`);
        if (card) {
            card.classList.add('loading');
        }

        showToast('🔄 Riskli kelimeler olmadan yeniden üretiliyor...');

        // Call API to regenerate without risky words
        fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                topic: currentTopic || 'Genel',
                tone: currentTone || 'engaging',
                count: 1,
                persona: currentPersona || '',
                extra_instructions: `Bu tweeti riskli kelimeler olmadan yeniden yaz. Şu kelimeleri KULLANMA: ${riskyWords}. Aynı mesajı daha uygun bir dille aktar. Orijinal tweet: "${originalContent}"`
            })
        })
        .then(res => res.json())
        .then(data => {
            if (card) {
                card.classList.remove('loading');
            }

            if (data.tweets && data.tweets.length > 0) {
                generatedTweets[index] = data.tweets[0];
                renderTweets(generatedTweets);
                showToast('✅ Tweet güvenli içerikle yeniden üretildi!');
            } else {
                showToast('❌ Yeniden üretim başarısız', 'error');
            }
        })
        .catch(err => {
            if (card) {
                card.classList.remove('loading');
            }
            console.error('Regenerate without risk error:', err);
            showToast('❌ Bir hata oluştu', 'error');
        });
    };

    // Initialize personas - ensure default and master personas exist
    function initializePersonas() {
        let personas = JSON.parse(localStorage.getItem(STORAGE_KEYS.PERSONAS) || '[]');
        let changed = false;

        // Check if default persona exists
        const defaultExists = personas.some(p => p.id === DEFAULT_PERSONA_ID);

        if (!defaultExists) {
            // Add default persona at the beginning
            personas.unshift({
                id: DEFAULT_PERSONA_ID,
                name: DEFAULT_PERSONA_NAME,
                content: DEFAULT_PERSONA_CONTENT,
                createdAt: new Date().toISOString(),
                isDefault: true
            });
            changed = true;
        }

        // Add master personas if they don't exist
        MASTER_PERSONAS.forEach(masterPersona => {
            const exists = personas.some(p => p.id === masterPersona.id);
            if (!exists) {
                personas.push({
                    id: masterPersona.id,
                    name: masterPersona.name,
                    content: masterPersona.content,
                    createdAt: masterPersona.createdAt,
                    isDefault: true
                });
                changed = true;
            }
        });

        // Save if any changes were made
        if (changed) {
            localStorage.setItem(STORAGE_KEYS.PERSONAS, JSON.stringify(personas));
        }

        // Set active persona to default if none is set
        if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_PERSONA)) {
            localStorage.setItem(STORAGE_KEYS.ACTIVE_PERSONA, DEFAULT_PERSONA_ID);
        }
    }

    // Load active persona into form
    function loadActivePersona() {
        const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_PERSONA) || DEFAULT_PERSONA_ID;
        const personas = JSON.parse(localStorage.getItem(STORAGE_KEYS.PERSONAS) || '[]');
        const activePersona = personas.find(p => p.id === activeId);

        if (activePersona) {
            elements.personaName.value = activePersona.name;
            elements.persona.value = activePersona.content;
        } else {
            // Fallback to default
            elements.personaName.value = DEFAULT_PERSONA_NAME;
            elements.persona.value = DEFAULT_PERSONA_CONTENT;
        }
    }

    // Get all personas
    function getPersonas() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.PERSONAS) || '[]');
    }

    // Save persona
    function savePersona() {
        const name = elements.personaName.value.trim();
        const content = elements.persona.value.trim();

        if (!name) {
            showToast('Persona adı girin!', 'error');
            return;
        }

        if (!content) {
            showToast('Persona içeriği girin!', 'error');
            return;
        }

        let personas = getPersonas();

        // Check if we're editing an existing persona
        const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_PERSONA);
        const existingIndex = personas.findIndex(p => p.id === activeId);

        if (existingIndex !== -1 && activeId !== DEFAULT_PERSONA_ID) {
            // Update existing persona
            personas[existingIndex] = {
                ...personas[existingIndex],
                name: name,
                content: content,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.PERSONAS, JSON.stringify(personas));
            showToast('✓ Persona güncellendi!');
        } else {
            // Check limit
            if (personas.length >= MAX_PERSONAS) {
                showToast('Maksimum 20 persona kaydedebilirsiniz. Önce birini silin.', 'error');
                return;
            }

            // Check if name already exists
            if (personas.some(p => p.name.toLowerCase() === name.toLowerCase() && p.id !== activeId)) {
                showToast('Bu isimde bir persona zaten var!', 'error');
                return;
            }

            // Create new persona
            const newPersona = {
                id: Date.now().toString(),
                name: name,
                content: content,
                createdAt: new Date().toISOString(),
                isDefault: false
            };

            personas.push(newPersona);
            localStorage.setItem(STORAGE_KEYS.PERSONAS, JSON.stringify(personas));
            localStorage.setItem(STORAGE_KEYS.ACTIVE_PERSONA, newPersona.id);
            showToast('✓ Yeni persona kaydedildi!');
        }

        renderPersonaDropdown();
        updatePersonaLimitHint();
    }

    // Delete persona
    function deletePersona(id) {
        // Check if it's a default or master persona
        if (id === DEFAULT_PERSONA_ID) {
            showToast('Varsayılan persona silinemez!', 'error');
            return;
        }

        // Check if it's a master persona
        const isMasterPersona = MASTER_PERSONAS.some(p => p.id === id);
        if (isMasterPersona) {
            showToast('Master personalar silinemez!', 'error');
            return;
        }

        if (!confirm('Bu personayı silmek istediğinize emin misiniz?')) {
            return;
        }

        let personas = getPersonas();
        personas = personas.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PERSONAS, JSON.stringify(personas));

        // If deleted persona was active, switch to default
        if (localStorage.getItem(STORAGE_KEYS.ACTIVE_PERSONA) === id) {
            localStorage.setItem(STORAGE_KEYS.ACTIVE_PERSONA, DEFAULT_PERSONA_ID);
            loadActivePersona();
        }

        renderPersonaDropdown();
        updatePersonaLimitHint();
        showToast('Persona silindi!');
    }

    // Select persona from dropdown
    function selectPersona(id) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_PERSONA, id);
        loadActivePersona();
        closePersonaDropdown();
        showToast('Persona yüklendi!');
    }

    // Create new persona (clear form)
    function createNewPersona() {
        elements.personaName.value = '';
        elements.persona.value = '';
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_PERSONA);
        elements.personaName.focus();
        showToast('Yeni persona için formu doldurun');
    }

    // Render persona dropdown
    function renderPersonaDropdown() {
        const personas = getPersonas();
        const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_PERSONA);

        if (personas.length === 0) {
            elements.personaDropdownList.innerHTML = '<p class="hint">Henüz kayıtlı persona yok.</p>';
            return;
        }

        elements.personaDropdownList.innerHTML = personas.map(persona => {
            const isActive = persona.id === activeId;
            const isDefaultPersona = persona.id === DEFAULT_PERSONA_ID;
            const isMasterPersona = MASTER_PERSONAS.some(p => p.id === persona.id);
            const isProtected = isDefaultPersona || isMasterPersona;

            // Determine badge
            let badge = '';
            if (isDefaultPersona) {
                badge = '<span class="persona-default-badge">Varsayılan</span>';
            } else if (isMasterPersona) {
                badge = '<span class="persona-master-badge">Master</span>';
            }

            return `
                <div class="persona-dropdown-item ${isActive ? 'active' : ''}" data-id="${persona.id}">
                    <div class="persona-item-info" onclick="window.selectPersonaHandler('${persona.id}')">
                        <span class="persona-item-name">${escapeHtml(persona.name)}</span>
                        ${badge}
                    </div>
                    ${!isProtected ? `
                        <button class="persona-delete-btn" onclick="event.stopPropagation(); window.deletePersonaHandler('${persona.id}')" title="Sil">
                            🗑️
                        </button>
                    ` : ''}
                </div>
            `;
        }).join('');
    }

    // Toggle persona dropdown
    function togglePersonaDropdown() {
        elements.personaDropdownMenu.classList.toggle('active');
    }

    // Close persona dropdown
    function closePersonaDropdown() {
        elements.personaDropdownMenu.classList.remove('active');
    }

    // Update persona limit hint
    function updatePersonaLimitHint() {
        const personas = getPersonas();
        const remaining = MAX_PERSONAS - personas.length;

        if (remaining <= 2) {
            elements.personaLimitHint.textContent = `${remaining} persona daha ekleyebilirsiniz.`;
            elements.personaLimitHint.style.color = remaining === 0 ? 'var(--danger)' : 'var(--warning)';
        } else {
            elements.personaLimitHint.textContent = `Maksimum 20 persona kaydedebilirsiniz.`;
            elements.personaLimitHint.style.color = 'var(--text-secondary)';
        }
    }

    // Global handlers for onclick
    window.selectPersonaHandler = function(id) {
        selectPersona(id);
    };

    window.deletePersonaHandler = function(id) {
        deletePersona(id);
    };

    // Update draft count on sidebar button
    function updateDraftCount() {
        const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '[]');
        const count = drafts.length;
        const btn = elements.openDraftsBtn;
        if (btn) {
            btn.innerHTML = `<span class="btn-icon">📁</span> Taslaklarım ${count > 0 ? `<span class="draft-count-badge">(${count})</span>` : ''}`;
        }
    }

    // Load Settings
    function loadSettings() {
        const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (saved) {
            try {
                const settings = JSON.parse(saved);

                if (settings.contentType) {
                    const radio = document.querySelector(`input[name="contentType"][value="${settings.contentType}"]`);
                    if (radio) radio.checked = true;
                    handleContentTypeChange(settings.contentType);
                }

                if (settings.chainLength) {
                    elements.chainLength.value = settings.chainLength;
                    elements.chainLengthValue.textContent = settings.chainLength;
                }

                if (settings.writingStyle) elements.writingStyle.value = settings.writingStyle;
                if (settings.tone) elements.tone.value = settings.tone;
                if (settings.hook) elements.hook.value = settings.hook;
                if (settings.threadTemplate) elements.threadTemplate.value = settings.threadTemplate;
                if (settings.visualRatio) elements.visualRatio.value = settings.visualRatio;

                elements.includeVisual.checked = settings.includeVisual || false;
                elements.includeEngagement.checked = settings.includeEngagement || false;
                elements.generateVariations.checked = settings.generateVariations || false;

                handleVisualToggle();
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }
    }

    // Save Settings
    function saveSettings() {
        const selectedContentType = document.querySelector('input[name="contentType"]:checked');
        const settings = {
            contentType: selectedContentType ? selectedContentType.value : 'single',
            chainLength: elements.chainLength.value,
            writingStyle: elements.writingStyle.value,
            tone: elements.tone.value,
            hook: elements.hook.value,
            threadTemplate: elements.threadTemplate.value,
            visualRatio: elements.visualRatio.value,
            includeVisual: elements.includeVisual.checked,
            includeEngagement: elements.includeEngagement.checked,
            generateVariations: elements.generateVariations.checked
        };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }

    // Load Persona - now handled by loadActivePersona()
    function loadPersona() {
        // Legacy function - kept for compatibility
        // Now uses multi-persona system via loadActivePersona()
    }

    // Get effective persona (user's or default)
    function getEffectivePersona() {
        const userPersona = elements.persona.value.trim();
        return userPersona || DEFAULT_PERSONA;
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Tab Navigation
        elements.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                switchTab(tabId);
            });
        });

        // Content Type Change
        elements.contentTypeInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                handleContentTypeChange(e.target.value);
                saveSettings();
            });
        });

        // Chain Length Slider
        elements.chainLength.addEventListener('input', (e) => {
            elements.chainLengthValue.textContent = e.target.value;
            saveSettings();
        });

        // Visual Toggle
        elements.includeVisual.addEventListener('change', () => {
            handleVisualToggle();
            saveSettings();
        });

        // Template Selection
        elements.threadTemplate.addEventListener('change', () => {
            handleTemplateChange();
            saveSettings();
        });

        // Hook Library
        if (elements.hookSelect) {
            elements.hookSelect.addEventListener('change', handleHookChange);
        }
        if (elements.randomHookBtn) {
            elements.randomHookBtn.addEventListener('click', selectRandomHook);
        }

        // Other Settings
        elements.writingStyle.addEventListener('change', saveSettings);
        elements.tone.addEventListener('change', saveSettings);
        elements.hook.addEventListener('change', saveSettings);
        elements.visualRatio.addEventListener('change', saveSettings);
        elements.includeEngagement.addEventListener('change', saveSettings);
        elements.generateVariations.addEventListener('change', saveSettings);

        // Persona - Multi Persona System
        elements.savePersonaBtn.addEventListener('click', savePersona);

        elements.newPersonaBtn.addEventListener('click', createNewPersona);

        elements.clearPersonaBtn.addEventListener('click', () => {
            elements.personaName.value = '';
            elements.persona.value = '';
            showToast('Form temizlendi!');
        });

        // Persona Dropdown Toggle
        elements.personaDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePersonaDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!elements.personaDropdownMenu.contains(e.target) &&
                !elements.personaDropdownBtn.contains(e.target)) {
                closePersonaDropdown();
            }
        });

        // Generate
        elements.generateBtn.addEventListener('click', generateTweets);
        elements.regenerateBtn.addEventListener('click', generateTweets);

        // Cancel Loading Button
        if (elements.cancelLoadingBtn) {
            elements.cancelLoadingBtn.addEventListener('click', cancelGeneration);
        }

        // Variants Button
        if (elements.generateVariantsBtn) {
            elements.generateVariantsBtn.addEventListener('click', generateVariants);
        }

        // X Premium Mode Toggle - disable flood when enabled
        if (elements.xPremiumMode) {
            elements.xPremiumMode.addEventListener('change', handlePremiumModeChange);
        }

        // Remix
        elements.remixBtn.addEventListener('click', remixTweet);
        if (elements.clearRemixHistory) {
            elements.clearRemixHistory.addEventListener('click', clearRemixHistoryAll);
        }

        // Reply
        if (elements.generateReplyBtn) {
            elements.generateReplyBtn.addEventListener('click', generateReply);
        }

        // News
        elements.fetchNewsBtn.addEventListener('click', fetchNews);

        // Copy All
        elements.copyAllBtn.addEventListener('click', copyAllTweets);

        // Drafts Modal
        elements.openDraftsBtn.addEventListener('click', () => {
            renderDrafts();
            elements.draftsModal.classList.add('active');
        });

        elements.closeDraftsModal.addEventListener('click', () => {
            elements.draftsModal.classList.remove('active');
        });

        // Visual Modal
        elements.closeVisualModal.addEventListener('click', () => {
            elements.visualModal.classList.remove('active');
        });

        elements.generateImageBtn.addEventListener('click', generateImage);

        // Close modals on outside click
        [elements.draftsModal, elements.visualModal, elements.bulkUploadModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                    }
                });
            }
        });

        // Bulk Upload Modal
        if (elements.openBulkUploadBtn) {
            elements.openBulkUploadBtn.addEventListener('click', () => {
                resetBulkUpload();
                elements.bulkUploadModal.classList.add('active');
            });
        }

        if (elements.closeBulkUploadModal) {
            elements.closeBulkUploadModal.addEventListener('click', () => {
                elements.bulkUploadModal.classList.remove('active');
            });
        }

        // Bulk file input
        if (elements.bulkFileInput) {
            elements.bulkFileInput.addEventListener('change', handleBulkFileSelect);
        }

        // Drag & Drop for bulk upload
        if (elements.bulkUploadZone) {
            elements.bulkUploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                elements.bulkUploadZone.classList.add('dragover');
            });

            elements.bulkUploadZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                elements.bulkUploadZone.classList.remove('dragover');
            });

            elements.bulkUploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                elements.bulkUploadZone.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleBulkFile(files[0]);
                }
            });
        }

        // Download example CSVs
        if (elements.downloadSimpleCSV) {
            elements.downloadSimpleCSV.addEventListener('click', downloadSimpleCSV);
        }
        if (elements.downloadAdvancedCSV) {
            elements.downloadAdvancedCSV.addEventListener('click', downloadAdvancedCSV);
        }

        // Clear bulk preview
        if (elements.clearBulkPreview) {
            elements.clearBulkPreview.addEventListener('click', resetBulkUpload);
        }

        // Generate bulk
        if (elements.generateBulkBtn) {
            elements.generateBulkBtn.addEventListener('click', generateBulkTweets);
        }

        // NEW: Bulk Editor Event Listeners
        if (elements.applyBulkSettings) {
            elements.applyBulkSettings.addEventListener('click', applyBulkSettingsToAll);
        }
        if (elements.addManualTopic) {
            elements.addManualTopic.addEventListener('click', addManualTopicToList);
        }
        if (elements.clearAllTopics) {
            elements.clearAllTopics.addEventListener('click', clearAllBulkTopics);
        }
        if (elements.bulkBackBtn) {
            elements.bulkBackBtn.addEventListener('click', goBackToUploadView);
        }
    }

    // Switch Tab
    function switchTab(tabId) {
        elements.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        elements.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `tab-${tabId}`);
        });
    }

    // Handle Content Type Change
    function handleContentTypeChange(type) {
        // Show/hide chain length (only if no template selected or flood mode)
        const hasTemplate = elements.threadTemplate.value !== '';
        elements.chainLengthSection.style.display = (type === 'flood' && !hasTemplate) ? 'block' : 'none';

        // Show/hide target tweet
        const showTarget = type === 'reply' || type === 'quote';
        elements.targetTweetSection.style.display = showTarget ? 'block' : 'none';

        // Disable visual for reply mode
        if (type === 'reply') {
            elements.includeVisual.checked = false;
            elements.includeVisual.disabled = true;
            handleVisualToggle();
        } else {
            elements.includeVisual.disabled = false;
        }

        // Update template info visibility
        handleTemplateChange();
    }

    // ============================================
    // HOOK LIBRARY FUNCTIONS
    // ============================================

    // Handle hook selection change
    function handleHookChange() {
        const selectedHook = elements.hookSelect.value;
        updateHookPreview(selectedHook);
    }

    // Update hook preview with topic replacement
    function updateHookPreview(hook) {
        if (!elements.hookPreview) return;

        if (!hook) {
            elements.hookPreview.textContent = '';
            elements.hookPreview.style.display = 'none';
            return;
        }

        const topic = elements.topic.value.trim() || 'konu';
        const processedHook = processHookPlaceholders(hook, topic);
        elements.hookPreview.innerHTML = `<span class="hook-preview-label">Önizleme:</span> "${processedHook}"`;
        elements.hookPreview.style.display = 'block';
    }

    // Process hook placeholders with topic
    function processHookPlaceholders(hook, topic) {
        return hook
            .replace(/\[KONU\]/g, topic)
            .replace(/\[DURUM\]/g, topic)
            .replace(/\[SONUÇ\]/g, 'burada')
            .replace(/\[YIL\]/g, '2023')
            .replace(/\[OLAY\]/g, topic)
            .replace(/\[ÜNLÜ KİŞİ\]/g, 'Elon Musk')
            .replace(/\[SEKTÖR\]/g, 'teknoloji')
            .replace(/\[ESKİ\]/g, 'eski yöntem')
            .replace(/\[YENİ\]/g, 'yeni yöntem')
            .replace(/\[X\]/g, 'A')
            .replace(/\[Y\]/g, 'B')
            .replace(/\[A\]/g, 'A')
            .replace(/\[B\]/g, 'B');
    }

    // Get current hook for API call
    function getCurrentHook() {
        if (!elements.hookSelect) return '';
        const selectedHook = elements.hookSelect.value;
        if (!selectedHook) return '';

        const topic = elements.topic.value.trim() || '';
        return processHookPlaceholders(selectedHook, topic);
    }

    // Select random hook
    function selectRandomHook() {
        const randomIndex = Math.floor(Math.random() * HOOK_LIBRARY.length);
        const randomHook = HOOK_LIBRARY[randomIndex];

        // Find the option with this value and select it
        const options = elements.hookSelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === randomHook) {
                elements.hookSelect.selectedIndex = i;
                break;
            }
        }

        updateHookPreview(randomHook);
        showToast('🎲 Rastgele hook seçildi!');
    }

    // Update preview when topic changes
    if (elements.topic) {
        elements.topic.addEventListener('input', () => {
            const selectedHook = elements.hookSelect ? elements.hookSelect.value : '';
            if (selectedHook) {
                updateHookPreview(selectedHook);
            }
        });
    }

    // Handle Template Change
    function handleTemplateChange() {
        const selectedOption = elements.threadTemplate.options[elements.threadTemplate.selectedIndex];
        const templateValue = elements.threadTemplate.value;
        const tweetCount = selectedOption.dataset.tweets || '1';
        const description = selectedOption.dataset.description || '';

        // Update template info display
        if (elements.templateTweetsBadge) {
            elements.templateTweetsBadge.textContent = `${tweetCount} tweet`;
            elements.templateTweetsBadge.classList.toggle('active', templateValue !== '');
        }
        if (elements.templateDescription) {
            elements.templateDescription.textContent = description;
        }

        // If a template is selected (not "Serbest"), auto-switch to flood mode
        if (templateValue !== '') {
            // Check flood radio button
            const floodRadio = document.querySelector('input[name="contentType"][value="flood"]');
            if (floodRadio) {
                floodRadio.checked = true;
            }
            // Hide manual chain length since template defines it
            elements.chainLengthSection.style.display = 'none';
            // Update chain length to template's tweet count
            elements.chainLength.value = tweetCount;
            elements.chainLengthValue.textContent = tweetCount;
        } else {
            // Serbest mode - show chain length if flood is selected
            const selectedContentType = document.querySelector('input[name="contentType"]:checked');
            if (selectedContentType && selectedContentType.value === 'flood') {
                elements.chainLengthSection.style.display = 'block';
            }
        }

        // Add visual feedback to dropdown
        elements.threadTemplate.classList.toggle('has-template', templateValue !== '');
    }

    // Handle Visual Toggle
    function handleVisualToggle() {
        elements.visualStudioSection.style.display = elements.includeVisual.checked ? 'block' : 'none';
    }

    // Generate Tweets
    async function generateTweets() {
        const topic = elements.topic.value.trim();
        if (!topic) {
            showToast('Lütfen bir konu girin!', 'error');
            return;
        }

        const selectedContentType = document.querySelector('input[name="contentType"]:checked');

        // Get selected hook (with placeholders replaced)
        const selectedHook = getCurrentHook();

        const isPremium = elements.xPremiumMode ? elements.xPremiumMode.checked : false;

        const contentType = selectedContentType ? selectedContentType.value : 'single';
        const chainLength = parseInt(elements.chainLength.value);
        const isFlood = contentType === 'flood';

        const requestData = {
            topic: topic,
            contentType: contentType,
            chainLength: chainLength,
            writingStyle: elements.writingStyle.value,
            tone: elements.tone.value,
            targetAudience: elements.targetAudience ? elements.targetAudience.value : 'default',
            hook: elements.hook.value,
            viralHook: selectedHook, // Hook from library
            includeVisual: elements.includeVisual.checked,
            includeEngagement: elements.includeEngagement.checked,
            generateVariations: elements.generateVariations.checked,
            threadTemplate: elements.threadTemplate.value,
            visualRatio: elements.visualRatio.value,
            targetTweet: elements.targetTweet.value,
            persona: getEffectivePersona(),
            isPremium: isPremium
        };

        // Show loading with flood progress if applicable
        showLoading(true, {
            isFlood: isFlood,
            floodTotal: isFlood ? chainLength : 0
        });

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();

            if (result.success) {
                generatedTweets = result.data.tweets || [];
                renderTweets(generatedTweets);
                elements.outputActions.style.display = 'flex';

                // Save to history
                if (generatedTweets.length > 0) {
                    const firstTweet = generatedTweets[0];
                    const viralScore = firstTweet.virality_score || 0;
                    const qualityScore = firstTweet.critic_score || 0;
                    const textPreview = firstTweet.text || '';
                    const template = elements.threadTemplate ? elements.threadTemplate.value : '';
                    saveToHistory(topic, template, viralScore, qualityScore, textPreview);
                }
            } else {
                showToast('Hata: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Bağlantı hatası!', 'error');
        } finally {
            showLoading(false);
        }
    }

    // Remix Tweet
    async function remixTweet() {
        const sourceTweet = elements.sourceTweet.value.trim();
        if (!sourceTweet) {
            showToast('Kaynak tweet gerekli!', 'error');
            return;
        }

        const generateVariations = elements.remixVariations ? elements.remixVariations.checked : true;

        showLoading(true);

        try {
            const response = await fetch('/api/remix', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sourceTweet: sourceTweet,
                    persona: getEffectivePersona(),
                    generateVariations: generateVariations
                })
            });

            const result = await response.json();

            if (result.success) {
                generatedTweets = result.data.tweets || [];
                renderTweets(generatedTweets);
                elements.outputActions.style.display = 'flex';

                // Remix geçmişine ekle
                saveToRemixHistory(sourceTweet);

                switchTab('generate'); // Switch to generate tab to show results
                showToast('Remix tamamlandı!');
            } else {
                showToast('Hata: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Bağlantı hatası!', 'error');
        } finally {
            showLoading(false);
        }
    }

    // Remix geçmişine kaydet (son 5)
    function saveToRemixHistory(sourceTweet) {
        let history = JSON.parse(localStorage.getItem(STORAGE_KEYS.REMIX_HISTORY) || '[]');

        // Aynı tweet zaten varsa çıkar
        history = history.filter(item => item.text !== sourceTweet);

        // Yeni remix'i başa ekle
        history.unshift({
            id: Date.now(),
            text: sourceTweet,
            date: new Date().toISOString()
        });

        // Max 5 tane tut
        if (history.length > 5) {
            history = history.slice(0, 5);
        }

        localStorage.setItem(STORAGE_KEYS.REMIX_HISTORY, JSON.stringify(history));
        renderRemixHistory();
    }

    // Remix geçmişini göster
    function renderRemixHistory() {
        if (!elements.remixHistoryList) return;

        const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.REMIX_HISTORY) || '[]');

        if (history.length === 0) {
            elements.remixHistoryList.innerHTML = '<p class="hint">Henüz remix yapılmadı.</p>';
            return;
        }

        elements.remixHistoryList.innerHTML = history.map((item, index) => {
            const truncated = item.text.length > 60 ? item.text.substring(0, 60) + '...' : item.text;
            return `
                <div class="remix-history-item" onclick="useRemixHistory(${index})">
                    <span class="remix-history-text">${escapeHtml(truncated)}</span>
                    <span class="remix-history-icon">→</span>
                </div>
            `;
        }).join('');
    }

    // Geçmişten remix kullan
    window.useRemixHistory = function(index) {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.REMIX_HISTORY) || '[]');
        if (history[index]) {
            elements.sourceTweet.value = history[index].text;
            showToast('Kaynak tweet yüklendi!');
        }
    };

    // Remix geçmişini temizle
    window.clearRemixHistoryAll = function() {
        if (confirm('Tüm remix geçmişi silinecek. Emin misiniz?')) {
            localStorage.setItem(STORAGE_KEYS.REMIX_HISTORY, '[]');
            renderRemixHistory();
            showToast('Remix geçmişi temizlendi!');
        }
    };

    // ============================================
    // REPLY GENERATOR FUNCTIONS
    // ============================================

    // Generate Reply
    async function generateReply() {
        const targetTweet = elements.replyTargetTweet?.value.trim();
        if (!targetTweet) {
            showToast('Lütfen hedef tweet\'i girin!', 'error');
            return;
        }

        // Get selected tone
        const selectedTone = document.querySelector('input[name="replyTone"]:checked');
        const tone = selectedTone ? selectedTone.value : 'supportive';
        const generateMultiple = elements.replyMultiple?.checked ?? true;

        // Show loading
        if (elements.generateReplyBtn) {
            elements.generateReplyBtn.disabled = true;
            elements.generateReplyBtn.innerHTML = '<span class="btn-icon">⏳</span> Üretiliyor...';
        }

        try {
            const response = await fetch('/api/generate-reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    targetTweet: targetTweet,
                    tone: tone,
                    generateMultiple: generateMultiple,
                    persona: getEffectivePersona()
                })
            });

            const result = await response.json();

            if (result.success) {
                renderReplyResults(result.data.replies, targetTweet, tone);
                showToast('Reply\'lar üretildi! 💬');
            } else {
                showToast('Hata: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Bağlantı hatası!', 'error');
        } finally {
            // Reset button
            if (elements.generateReplyBtn) {
                elements.generateReplyBtn.disabled = false;
                elements.generateReplyBtn.innerHTML = '<span class="btn-icon">💬</span> Reply Üret';
            }
        }
    }

    // Render Reply Results
    function renderReplyResults(replies, targetTweet, tone) {
        if (!elements.replyResultsSection || !elements.replyResultsList) return;

        const toneEmojis = {
            'supportive': '🤝',
            'questioning': '🤔',
            'opposing': '😤',
            'humorous': '😂',
            'informative': '🧠'
        };

        const toneLabels = {
            'supportive': 'Destekleyici',
            'questioning': 'Sorgulayıcı',
            'opposing': 'Karşıt',
            'humorous': 'Mizahi',
            'informative': 'Bilgi Ekle'
        };

        elements.replyResultsList.innerHTML = replies.map((reply, index) => {
            const charCount = reply.length;
            const charClass = charCount > 280 ? 'danger' : charCount > 250 ? 'warning' : 'safe';

            return `
                <div class="reply-result-card" data-index="${index}">
                    <div class="reply-result-header">
                        <span class="reply-tone-badge">${toneEmojis[tone] || '💬'} ${toneLabels[tone] || tone}</span>
                        <span class="reply-char-count ${charClass}">${charCount}/280</span>
                    </div>
                    <div class="reply-result-content">${escapeHtml(reply)}</div>
                    <div class="reply-result-actions">
                        <button class="btn-reply-action" onclick="copyReply(${index})" title="Kopyala">
                            📋 Kopyala
                        </button>
                        <button class="btn-reply-action btn-reply-screenshot" onclick="screenshotReply(${index})" title="Screenshot">
                            📸 Screenshot
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Store replies for copy/screenshot
        window.generatedReplies = replies;

        // Show results section
        elements.replyResultsSection.style.display = 'block';

        // Scroll to results
        elements.replyResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Copy Reply
    window.copyReply = function(index) {
        const reply = window.generatedReplies?.[index];
        if (!reply) return;

        navigator.clipboard.writeText(reply).then(() => {
            showToast('Reply kopyalandı! 📋');

            // Visual feedback
            const card = document.querySelector(`.reply-result-card[data-index="${index}"]`);
            if (card) {
                card.classList.add('copied');
                setTimeout(() => card.classList.remove('copied'), 1000);
            }
        }).catch(() => {
            showToast('Kopyalama başarısız!', 'error');
        });
    };

    // Screenshot Reply
    window.screenshotReply = async function(index) {
        const reply = window.generatedReplies?.[index];
        if (!reply) return;

        const card = document.querySelector(`.reply-result-card[data-index="${index}"]`);
        const btn = card?.querySelector('.btn-reply-screenshot');

        if (btn) {
            btn.innerHTML = '⏳ İşleniyor...';
            btn.disabled = true;
        }

        try {
            // Create screenshot container
            const container = document.createElement('div');
            container.style.cssText = `
                position: fixed;
                left: -9999px;
                top: 0;
                width: 500px;
                padding: 24px;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
                border-radius: 16px;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                border: 1px solid rgba(255, 165, 0, 0.3);
                box-shadow: 0 0 40px rgba(255, 165, 0, 0.1);
            `;

            container.innerHTML = `
                <div style="
                    background: #16181c;
                    border-radius: 12px;
                    padding: 16px;
                    border: 1px solid #2f3336;
                ">
                    <div style="
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        margin-bottom: 12px;
                        padding-bottom: 12px;
                        border-bottom: 1px solid #2f3336;
                    ">
                        <span style="font-size: 20px;">💬</span>
                        <span style="color: #ffa500; font-weight: 600; font-size: 14px;">Reply</span>
                    </div>
                    <div style="
                        color: #e7e9ea;
                        font-size: 16px;
                        line-height: 1.5;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                    ">${escapeHtml(reply)}</div>
                </div>
                <div style="
                    text-align: right;
                    margin-top: 12px;
                    opacity: 0.5;
                ">
                    <span style="
                        font-family: 'Orbitron', sans-serif;
                        font-size: 14px;
                        color: #ffa500;
                        letter-spacing: 2px;
                    ">⚡ ViralX</span>
                </div>
            `;

            document.body.appendChild(container);

            const canvas = await html2canvas(container, {
                backgroundColor: '#000000',
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false
            });

            document.body.removeChild(container);

            // Download
            const link = document.createElement('a');
            link.download = `viralx-reply-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast('Screenshot indirildi! 📸');
        } catch (error) {
            console.error('Screenshot error:', error);
            showToast('Screenshot alınamadı!', 'error');
        } finally {
            if (btn) {
                btn.innerHTML = '📸 Screenshot';
                btn.disabled = false;
            }
        }
    };

    // ============================================
    // X PREMIUM MODE & VARIANT GENERATOR FUNCTIONS
    // ============================================

    // Handle Premium Mode Toggle
    function handlePremiumModeChange() {
        const isPremium = elements.xPremiumMode?.checked;
        const floodRadio = document.querySelector('input[name="contentType"][value="flood"]');
        const singleRadio = document.querySelector('input[name="contentType"][value="single"]');

        if (isPremium) {
            // Premium mode: Disable flood, force single tweet
            if (floodRadio) {
                floodRadio.disabled = true;
                floodRadio.parentElement.classList.add('disabled');
            }
            // If flood was selected, switch to single
            if (floodRadio?.checked && singleRadio) {
                singleRadio.checked = true;
                updateContentTypeUI();
            }
            // Update button text
            elements.generateBtn.innerHTML = '<span class="btn-icon">✨</span> Premium Tweet Üret';
            showToast('X Premium modu aktif! (4000 karakter)', 'info');
        } else {
            // Normal mode: Enable flood
            if (floodRadio) {
                floodRadio.disabled = false;
                floodRadio.parentElement.classList.remove('disabled');
            }
            // Reset button text
            elements.generateBtn.innerHTML = '<span class="btn-icon">⚡</span> Tweet Üret';
        }
    }

    // Update content type UI when changed
    function updateContentTypeUI() {
        const selectedType = document.querySelector('input[name="contentType"]:checked')?.value;

        // Show/hide chain length section
        if (elements.chainLengthSection) {
            elements.chainLengthSection.style.display = selectedType === 'flood' ? 'block' : 'none';
        }

        // Show/hide template section
        if (elements.templateSection) {
            elements.templateSection.style.display = (selectedType === 'flood' || selectedType === 'single') ? 'block' : 'none';
        }

        // Show/hide target tweet section
        if (elements.targetTweetSection) {
            elements.targetTweetSection.style.display = (selectedType === 'reply' || selectedType === 'quote') ? 'block' : 'none';
        }
    }

    // Generate 5 Style Variants
    async function generateVariants() {
        const topic = elements.topic.value.trim();
        if (!topic) {
            showToast('Lütfen bir konu girin!', 'error');
            return;
        }

        const isPremium = elements.xPremiumMode?.checked || false;

        // Update button state
        if (elements.generateVariantsBtn) {
            elements.generateVariantsBtn.disabled = true;
            elements.generateVariantsBtn.innerHTML = '<span class="btn-icon">⏳</span> Üretiliyor...';
        }

        showLoading(true);

        try {
            const response = await fetch('/api/generate-variants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: topic,
                    persona: getEffectivePersona(),
                    isPremium: isPremium
                })
            });

            const result = await response.json();

            if (result.success && result.data.variants) {
                renderVariants(result.data.variants, topic);
                elements.outputActions.style.display = 'flex';
                showToast('5 varyant üretildi! 🔀');
            } else {
                showToast('Hata: ' + (result.error || 'Varyantlar üretilemedi'), 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Bağlantı hatası!', 'error');
        } finally {
            showLoading(false);
            if (elements.generateVariantsBtn) {
                elements.generateVariantsBtn.disabled = false;
                elements.generateVariantsBtn.innerHTML = '<span class="btn-icon">🔀</span> 5 Varyant';
            }
        }
    }

    // Render Variants Grid
    function renderVariants(variants, topic) {
        const styleIcons = {
            'shock': '💥',
            'question': '❓',
            'story': '📖',
            'list': '📋',
            'short': '⚡'
        };

        const styleLabels = {
            'shock': 'Şok',
            'question': 'Soru',
            'story': 'Hikaye',
            'list': 'Liste',
            'short': 'Kısa'
        };

        // Store variants globally for copy/screenshot
        window.generatedVariants = variants;

        const html = `
            <div class="variants-header">
                <h3 class="variants-title">🔀 5 Stil Varyantı</h3>
                <p class="variants-topic">${escapeHtml(topic)}</p>
            </div>
            <div class="variants-grid">
                ${variants.map((variant, index) => {
                    const charCount = variant.content?.length || 0;
                    const charLimit = variant.style === 'short' ? 100 : 280;
                    const charClass = charCount > charLimit ? 'danger' : charCount > charLimit * 0.9 ? 'warning' : 'safe';
                    const styleColor = variant.color || '#00ff88';

                    return `
                        <div class="variant-card" data-index="${index}" style="border-color: ${styleColor}">
                            <div class="variant-header" style="background: linear-gradient(135deg, ${styleColor}22, transparent)">
                                <span class="variant-style-badge" style="background: ${styleColor}22; color: ${styleColor}">
                                    ${styleIcons[variant.style] || '📝'} ${styleLabels[variant.style] || variant.style_name || variant.style}
                                </span>
                                <span class="variant-char-count ${charClass}">${charCount}/${charLimit}</span>
                            </div>
                            <div class="variant-content">${escapeHtml(variant.content || '')}</div>
                            <div class="variant-scores">
                                <span class="variant-score critic" title="Critic Score">🎭 ${variant.critic_score || 0}</span>
                                <span class="variant-score viral" title="Virality Score">🔥 ${variant.virality_score || 0}</span>
                            </div>
                            <div class="variant-actions">
                                <button class="btn-variant-action" onclick="copyVariant(${index})" title="Kopyala">
                                    📋
                                </button>
                                <button class="btn-variant-action" onclick="screenshotVariant(${index})" title="Screenshot">
                                    📸
                                </button>
                                <button class="btn-variant-action btn-favorite ${isFavoriteVariant(variant.content) ? 'active' : ''}" onclick="toggleFavoriteVariant(${index})" title="Favorilere Ekle">
                                    ${isFavoriteVariant(variant.content) ? '⭐' : '☆'}
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        elements.tweetsContainer.innerHTML = html;
        elements.tweetsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Check if variant is favorite
    function isFavoriteVariant(content) {
        const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '[]');
        return drafts.some(d => d.content === content);
    }

    // Copy Variant
    window.copyVariant = function(index) {
        const variant = window.generatedVariants?.[index];
        if (!variant) return;

        navigator.clipboard.writeText(variant.content).then(() => {
            showToast('Varyant kopyalandı! 📋');

            const card = document.querySelector(`.variant-card[data-index="${index}"]`);
            if (card) {
                card.classList.add('copied');
                setTimeout(() => card.classList.remove('copied'), 1000);
            }
        }).catch(() => {
            showToast('Kopyalama başarısız!', 'error');
        });
    };

    // Screenshot Variant
    window.screenshotVariant = async function(index) {
        const variant = window.generatedVariants?.[index];
        if (!variant) return;

        const card = document.querySelector(`.variant-card[data-index="${index}"]`);
        const btn = card?.querySelector('.btn-variant-action:nth-child(2)');

        if (btn) {
            btn.innerHTML = '⏳';
            btn.disabled = true;
        }

        try {
            const styleColor = variant.color || '#00ff88';
            const styleLabels = { 'shock': 'Şok', 'question': 'Soru', 'story': 'Hikaye', 'list': 'Liste', 'short': 'Kısa' };
            const styleLabel = styleLabels[variant.style] || variant.style_name || variant.style;

            const container = document.createElement('div');
            container.style.cssText = `
                position: fixed;
                left: -9999px;
                top: 0;
                width: 500px;
                padding: 24px;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
                border-radius: 16px;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                border: 2px solid ${styleColor};
                box-shadow: 0 0 40px ${styleColor}33;
            `;

            container.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 16px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #2f3336;
                ">
                    <span style="
                        background: ${styleColor}22;
                        color: ${styleColor};
                        padding: 6px 12px;
                        border-radius: 20px;
                        font-size: 14px;
                        font-weight: 600;
                    ">${styleLabel}</span>
                    <div style="display: flex; gap: 12px;">
                        <span style="color: #aaa; font-size: 12px;">🎭 ${variant.critic_score || 0}</span>
                        <span style="color: #aaa; font-size: 12px;">🔥 ${variant.virality_score || 0}</span>
                    </div>
                </div>
                <div style="
                    color: #e7e9ea;
                    font-size: 16px;
                    line-height: 1.6;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    margin-bottom: 16px;
                ">${escapeHtml(variant.content)}</div>
                <div style="
                    text-align: right;
                    opacity: 0.5;
                ">
                    <span style="
                        font-family: 'Orbitron', sans-serif;
                        font-size: 14px;
                        color: ${styleColor};
                        letter-spacing: 2px;
                    ">⚡ ViralX</span>
                </div>
            `;

            document.body.appendChild(container);

            const canvas = await html2canvas(container, {
                backgroundColor: '#000000',
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false
            });

            document.body.removeChild(container);

            const link = document.createElement('a');
            link.download = `viralx-variant-${variant.style}-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast('Screenshot indirildi! 📸');
        } catch (error) {
            console.error('Screenshot error:', error);
            showToast('Screenshot alınamadı!', 'error');
        } finally {
            if (btn) {
                btn.innerHTML = '📸';
                btn.disabled = false;
            }
        }
    };

    // Toggle Favorite Variant
    window.toggleFavoriteVariant = function(index) {
        const variant = window.generatedVariants?.[index];
        if (!variant) return;

        let drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '[]');
        const existingIndex = drafts.findIndex(d => d.content === variant.content);

        if (existingIndex > -1) {
            // Remove from favorites
            drafts.splice(existingIndex, 1);
            showToast('Favorilerden çıkarıldı! ☆');
        } else {
            // Add to favorites
            drafts.push({
                content: variant.content,
                type: 'variant',
                style: variant.style,
                savedAt: new Date().toISOString()
            });
            showToast('Favorilere eklendi! ⭐');
        }

        localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));

        // Update UI
        const btn = document.querySelector(`.variant-card[data-index="${index}"] .btn-favorite`);
        if (btn) {
            const isFav = drafts.some(d => d.content === variant.content);
            btn.classList.toggle('active', isFav);
            btn.innerHTML = isFav ? '⭐' : '☆';
        }
    };

    // Rewrite Tweet
    async function rewriteTweet(index, style) {
        const tweet = generatedTweets[index];
        if (!tweet) return;

        showLoading(true);

        try {
            const response = await fetch('/api/rewrite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: tweet.content,
                    style: style,
                    persona: elements.persona.value
                })
            });

            const result = await response.json();

            if (result.success) {
                generatedTweets[index] = {
                    ...tweet,
                    content: result.data.content,
                    critic_score: result.data.critic_score,
                    critic_feedback: result.data.critic_feedback,
                    virality_score: result.data.virality_score,
                    virality_tips: result.data.virality_tips
                };
                renderTweets(generatedTweets);
                showToast('Tweet yeniden yazıldı!');
            } else {
                showToast('Hata: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Bağlantı hatası!', 'error');
        } finally {
            showLoading(false);
        }
    }

    // Render Tweets
    function renderTweets(tweets) {
        if (!tweets || tweets.length === 0) {
            elements.tweetsContainer.innerHTML = `
                <div class="placeholder-card">
                    <div class="placeholder-icon">🤔</div>
                    <p>Tweet üretilemedi. Lütfen tekrar deneyin.</p>
                </div>
            `;
            return;
        }

        elements.tweetsContainer.innerHTML = tweets.map((tweet, index) => {
            const content = tweet.content || tweet;
            const charCount = content.length;
            const charClass = charCount > 280 ? 'danger' : charCount > 250 ? 'warning' : 'safe';

            const viralityScore = tweet.virality_score || 50;
            const viralityClass = viralityScore >= 80 ? 'high' : viralityScore >= 50 ? 'medium' : 'low';

            const criticScore = tweet.critic_score || 50;
            const criticFeedback = tweet.critic_feedback || '';
            const viralityTips = tweet.virality_tips || [];

            const variation = tweet.variation || '';

            // Düşük puan uyarısı için sınıflar
            const lowScoreClass = viralityScore < 30 ? 'very-low-score' : viralityScore < 50 ? 'low-score' : '';
            const scoreWarning = viralityScore < 30
                ? '❌ Bu tweet viral olmayabilir - Yeniden üretmeyi deneyin'
                : viralityScore < 50
                    ? '⚠️ Düşük virallik - Yeniden üretmeyi veya iyileştirmeyi deneyin'
                    : '';

            // Öneri mesajları
            const suggestions = [];
            if (viralityScore < 50) {
                if (!criticFeedback.toLowerCase().includes('hook')) suggestions.push('💡 Hook ekleyerek başlayın');
                if (!criticFeedback.toLowerCase().includes('soru')) suggestions.push('💡 Soru ile açılış yapın');
                if (viralityScore < 30) suggestions.push('💡 Daha provokatif bir ton deneyin');
            }

            // Riskli içerik kontrolü
            const contentWarnings = checkRiskyContent(content);
            const hasWarnings = contentWarnings.length > 0;
            const warningBadge = hasWarnings ? generateWarningBadge(contentWarnings) : '';
            const warningHTML = hasWarnings ? generateWarningHTML(contentWarnings, index) : '';

            return `
                <div class="tweet-card ${lowScoreClass} ${hasWarnings ? 'has-content-warning' : ''}" data-index="${index}">
                    ${scoreWarning ? `<div class="score-warning">${scoreWarning}</div>` : ''}

                    <div class="tweet-header">
                        <div class="tweet-avatar">👤</div>
                        <div class="tweet-user-info">
                            <div class="tweet-user-row">
                                <span class="tweet-name">ViralX User</span>
                                <span class="tweet-verified">✓</span>
                                <span class="tweet-handle">@viralx_user</span>
                                <span class="tweet-dot">·</span>
                                <span class="tweet-time">şimdi</span>
                                ${variation ? `<span class="tweet-variation">${variation}</span>` : ''}
                                ${warningBadge}
                            </div>
                        </div>
                    </div>

                    <div class="tweet-content">${escapeHtml(content)}</div>
                    ${warningHTML}

                    <div class="tweet-actions">
                        <div class="tweet-action">💬 0</div>
                        <div class="tweet-action retweet">🔁 0</div>
                        <div class="tweet-action like">❤️ 0</div>
                        <div class="tweet-action">📊</div>
                        <div class="tweet-action">⬆️</div>
                    </div>

                    <div class="tweet-meta">
                        <div class="score-badge virality ${viralityClass}">
                            <span class="score-icon">🔥</span>
                            <span>Virallik:</span>
                            <span class="score-value">${viralityScore}</span>
                        </div>
                        <div class="score-badge critic">
                            <span class="score-icon">📊</span>
                            <span>Kalite:</span>
                            <span class="score-value">${criticScore}</span>
                        </div>
                    </div>

                    <!-- Eleştirmen Notu - her zaman göster -->
                    <div class="critic-feedback" id="critic-${index}">
                        <div class="critic-feedback-header">
                            <div class="critic-feedback-label">
                                <span>💬</span> Eleştirmen Notu
                            </div>
                        </div>
                        <div class="critic-feedback-text">${criticFeedback ? escapeHtml(criticFeedback) : 'Değerlendirme yapılıyor...'}</div>
                        ${viralityTips.length > 0 ? `
                            <div class="virality-tips">
                                ${viralityTips.map((tip, tipIndex) => `
                                    <button class="virality-tip-btn" onclick="fixByTip(${index}, ${tipIndex}, '${escapeHtml(tip.replace(/'/g, "\\'"))}')">
                                        <span class="tip-text">${escapeHtml(tip)}</span>
                                        <span class="tip-loading">⏳</span>
                                        <span class="tip-success">✓</span>
                                    </button>
                                `).join('')}
                            </div>
                        ` : ''}
                        ${suggestions.length > 0 ? `
                            <div class="score-suggestions">
                                ${suggestions.map(s => `<span class="suggestion-item">${s}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>

                    ${tweet.visual_prompt ? `
                        <div class="visual-prompt">
                            <div class="visual-prompt-header">
                                <div class="visual-prompt-label">
                                    <span>🎨</span> Görsel Önerisi
                                </div>
                                <button class="btn btn-secondary btn-edit-visual" onclick="openVisualEditor(${index})">
                                    Düzenle & Üret
                                </button>
                            </div>
                            <div class="visual-prompt-text">${escapeHtml(tweet.visual_prompt)}</div>
                        </div>
                    ` : ''}

                    <!-- Ana Aksiyon Butonları -->
                    <div class="tweet-action-buttons">
                        <button class="btn btn-regenerate ${lowScoreClass ? 'highlighted' : ''}" onclick="regenerateTweet(${index})">
                            <span class="btn-icon">🔄</span> Tekrar Üret
                        </button>
                        <button class="btn btn-improve" onclick="improveTweet(${index})">
                            <span class="btn-icon">✨</span> Düzelt
                        </button>
                        <button class="btn btn-variants" onclick="generateVariants(${index})">
                            <span class="btn-icon">🎲</span> 5 Varyant
                        </button>
                    </div>

                    <!-- Hızlı Stil Değişikliği - Hover'da görünür -->
                    <div class="quick-actions">
                        <span class="quick-actions-label">Hızlı Stil:</span>
                        <button class="btn-quick-action" onclick="quickRestyle(${index}, 'aggressive')" title="Sert ve provokatif">🔥 Daha Sert</button>
                        <button class="btn-quick-action" onclick="quickRestyle(${index}, 'question')" title="Soru ile başla">❓ Soru ile Başla</button>
                        <button class="btn-quick-action" onclick="quickRestyle(${index}, 'list')" title="Liste formatı">📋 Liste</button>
                        <button class="btn-quick-action" onclick="quickRestyle(${index}, 'short')" title="Çok kısa">⚡ Kısa</button>
                    </div>

                    <div class="rewrite-buttons">
                        <button class="btn btn-rewrite" onclick="rewriteTweetHandler(${index}, 'aggressive')">🔥 Daha Agresif</button>
                        <button class="btn btn-rewrite" onclick="rewriteTweetHandler(${index}, 'calm')">😌 Daha Sakin</button>
                        <button class="btn btn-rewrite" onclick="rewriteTweetHandler(${index}, 'shorter')">✂️ Daha Kısa</button>
                        <button class="btn btn-rewrite" onclick="rewriteTweetHandler(${index}, 'curious')">🤔 Daha Meraklı</button>
                    </div>

                    <div class="tweet-footer">
                        <span class="char-count ${charClass}">${charCount}/280</span>
                        <div class="tweet-card-actions">
                            <button class="btn-card-action" onclick="copyTweet(${index})">📋 Kopyala</button>
                            <button class="btn-card-action btn-screenshot" onclick="screenshotTweet(${index})">📸 Screenshot</button>
                            <button class="btn-card-action btn-save-draft" onclick="saveToDraft(${index})">💾 Kaydet</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Add "Download All Thread" button if multiple tweets
        if (tweets.length > 1) {
            const threadBtnHtml = `
                <div class="thread-screenshot-section">
                    <button class="btn btn-thread-screenshot" onclick="screenshotAllThread()">
                        <span class="btn-icon">📸</span> Tüm Thread'i İndir (${tweets.length} tweet)
                    </button>
                </div>
            `;
            elements.tweetsContainer.insertAdjacentHTML('afterbegin', threadBtnHtml);
        }
    }

    // Global functions for onclick handlers
    window.copyTweet = function(index) {
        const tweet = generatedTweets[index];
        const content = tweet.content || tweet;
        navigator.clipboard.writeText(content).then(() => {
            showToast('Tweet kopyalandı!');
        }).catch(() => {
            showToast('Kopyalama başarısız!', 'error');
        });
    };

    window.saveToDraft = function(index) {
        const tweet = generatedTweets[index];
        const content = tweet.content || tweet;

        let drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '[]');

        // Yeni taslak yapısı
        const newDraft = {
            id: Date.now(),
            text: content,
            date: new Date().toISOString(),
            viralScore: tweet.virality_score || 0,
            qualityScore: tweet.critic_score || 0,
            visual_prompt: tweet.visual_prompt || null
        };

        drafts.unshift(newDraft);

        // Max 50 drafts - en eskiyi sil
        if (drafts.length > 50) drafts = drafts.slice(0, 50);

        localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));

        // Kaydet butonunda animasyon
        const btn = document.querySelector(`.tweet-card[data-index="${index}"] .btn-save-draft`);
        if (btn) {
            btn.classList.add('saved');
            btn.innerHTML = '<span class="save-success">✓ Kaydedildi!</span>';
            setTimeout(() => {
                btn.classList.remove('saved');
                btn.innerHTML = '💾 Kaydet';
            }, 1500);
        }

        // Taslak sayısını güncelle
        updateDraftCount();
        showToast('Taslağa kaydedildi!');
    };

    window.rewriteTweetHandler = function(index, style) {
        rewriteTweet(index, style);
    };

    // ============================================
    // SINGLE TWEET CRITIC & REGENERATION SYSTEM
    // ============================================

    // Tekrar Üret - Aynı konu, aynı ayarlarla yeni tweet üret
    window.regenerateTweet = async function(index) {
        const tweet = generatedTweets[index];
        if (!tweet) {
            showToast('Tweet bulunamadı!', 'error');
            return;
        }

        const tweetCard = document.querySelector(`.tweet-card[data-index="${index}"]`);
        const btn = tweetCard?.querySelector('.btn-regenerate');

        if (btn) {
            btn.classList.add('loading');
            btn.innerHTML = '<span class="btn-icon">⏳</span> Üretiliyor...';
        }

        try {
            const response = await fetch('/api/regenerate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: elements.topic.value.trim() || 'genel',
                    tone: elements.tone.value,
                    writingStyle: elements.writingStyle.value,
                    targetAudience: elements.targetAudience ? elements.targetAudience.value : 'default',
                    hook: elements.hook.value,
                    isPremium: elements.xPremiumMode ? elements.xPremiumMode.checked : false,
                    persona: getEffectivePersona()
                })
            });

            const result = await response.json();

            if (result.success) {
                // Eski tweeti yenisiyle değiştir
                generatedTweets[index] = result.data;
                renderTweets(generatedTweets);
                showToast('🔄 Yeni tweet üretildi!');
            } else {
                showToast('Hata: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Regenerate error:', error);
            showToast('Bağlantı hatası!', 'error');
        } finally {
            if (btn) {
                btn.classList.remove('loading');
                btn.innerHTML = '<span class="btn-icon">🔄</span> Tekrar Üret';
            }
        }
    };

    // Düzelt - Eleştirmene göre tweeti iyileştir
    window.improveTweet = async function(index) {
        const tweet = generatedTweets[index];
        if (!tweet) {
            showToast('Tweet bulunamadı!', 'error');
            return;
        }

        const content = tweet.content || tweet.text || tweet;
        const criticism = tweet.critic_feedback || '';
        const viralityTips = tweet.virality_tips || '';

        if (!criticism && !viralityTips) {
            showToast('Eleştiri bulunamadı, yeniden üretmeyi deneyin.', 'error');
            return;
        }

        const tweetCard = document.querySelector(`.tweet-card[data-index="${index}"]`);
        const btn = tweetCard?.querySelector('.btn-improve');

        if (btn) {
            btn.classList.add('loading');
            btn.innerHTML = '<span class="btn-icon">⏳</span> İyileştiriliyor...';
        }

        try {
            const response = await fetch('/api/improve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: content,
                    criticism: criticism,
                    viralityTips: viralityTips,
                    persona: getEffectivePersona(),
                    isPremium: elements.xPremiumMode ? elements.xPremiumMode.checked : false
                })
            });

            const result = await response.json();

            if (result.success) {
                generatedTweets[index] = result.data;
                renderTweets(generatedTweets);
                showToast('✨ Tweet iyileştirildi!');
            } else {
                showToast('Hata: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Improve error:', error);
            showToast('Bağlantı hatası!', 'error');
        } finally {
            if (btn) {
                btn.classList.remove('loading');
                btn.innerHTML = '<span class="btn-icon">✨</span> Düzelt';
            }
        }
    };

    // 5 Varyant Üret - Aynı konudan 5 farklı versiyon
    window.generateVariants = async function(index) {
        const tweet = generatedTweets[index];
        if (!tweet) {
            showToast('Tweet bulunamadı!', 'error');
            return;
        }

        const topic = elements.topic.value.trim() || 'genel';

        const tweetCard = document.querySelector(`.tweet-card[data-index="${index}"]`);
        const btn = tweetCard?.querySelector('.btn-variants');

        if (btn) {
            btn.classList.add('loading');
            btn.innerHTML = '<span class="btn-icon">⏳</span> Üretiliyor...';
        }

        try {
            const response = await fetch('/api/generate-variants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: topic,
                    persona: getEffectivePersona(),
                    isPremium: elements.xPremiumMode ? elements.xPremiumMode.checked : false
                })
            });

            const result = await response.json();

            if (result.success) {
                // Varyantları mevcut tweetlerin sonuna ekle
                const variants = result.data.variants || result.data.tweets || [];
                generatedTweets = [...generatedTweets, ...variants];
                renderTweets(generatedTweets);
                showToast(`🎲 ${variants.length} varyant eklendi!`);
            } else {
                showToast('Hata: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Variants error:', error);
            showToast('Bağlantı hatası!', 'error');
        } finally {
            if (btn) {
                btn.classList.remove('loading');
                btn.innerHTML = '<span class="btn-icon">🎲</span> 5 Varyant';
            }
        }
    };

    // Hızlı Stil Değişikliği
    window.quickRestyle = async function(index, restyleType) {
        const tweet = generatedTweets[index];
        if (!tweet) {
            showToast('Tweet bulunamadı!', 'error');
            return;
        }

        const topic = elements.topic.value.trim() || 'genel';

        const tweetCard = document.querySelector(`.tweet-card[data-index="${index}"]`);
        const quickActions = tweetCard?.querySelector('.quick-actions');

        if (quickActions) {
            quickActions.classList.add('loading');
        }

        // Stil tipine göre mesaj
        const styleLabels = {
            'aggressive': '🔥 Daha Sert',
            'question': '❓ Soru ile Başla',
            'list': '📋 Liste',
            'short': '⚡ Kısa',
            'story': '📖 Hikaye'
        };

        showToast(`${styleLabels[restyleType] || restyleType} stili uygulanıyor...`);

        try {
            const response = await fetch('/api/quick-restyle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: topic,
                    restyleType: restyleType,
                    persona: getEffectivePersona(),
                    isPremium: elements.xPremiumMode ? elements.xPremiumMode.checked : false
                })
            });

            const result = await response.json();

            if (result.success) {
                generatedTweets[index] = result.data;
                renderTweets(generatedTweets);
                showToast(`${styleLabels[restyleType] || restyleType} stili uygulandı!`);
            } else {
                showToast('Hata: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Quick restyle error:', error);
            showToast('Bağlantı hatası!', 'error');
        } finally {
            if (quickActions) {
                quickActions.classList.remove('loading');
            }
        }
    };

    // ============================================
    // SCREENSHOT EXPORT FUNCTIONS
    // ============================================

    // Screenshot single tweet
    window.screenshotTweet = async function(index) {
        const tweetCard = document.querySelector(`.tweet-card[data-index="${index}"]`);
        if (!tweetCard) {
            showToast('Tweet kartı bulunamadı!', 'error');
            return;
        }

        // Show loading on button
        const btn = tweetCard.querySelector('.btn-screenshot');
        if (btn) {
            btn.classList.add('loading');
            btn.innerHTML = '⏳ İşleniyor...';
        }

        try {
            // Create a clone of the tweet card for screenshot
            const clone = createScreenshotClone(tweetCard, index);
            document.body.appendChild(clone);

            // Use html2canvas to capture
            const canvas = await html2canvas(clone, {
                backgroundColor: '#000000',
                scale: 2, // Higher quality
                useCORS: true,
                allowTaint: true,
                logging: false
            });

            // Remove clone
            document.body.removeChild(clone);

            // Add watermark
            addWatermark(canvas);

            // Download
            downloadCanvas(canvas, `viralx-tweet-${Date.now()}`);

            showToast('Screenshot indirildi! 📸');
        } catch (error) {
            console.error('Screenshot error:', error);
            showToast('Screenshot alınamadı!', 'error');
        } finally {
            // Reset button
            if (btn) {
                btn.classList.remove('loading');
                btn.innerHTML = '📸 Screenshot';
            }
        }
    };

    // Screenshot all tweets as thread
    window.screenshotAllThread = async function() {
        const tweetCards = document.querySelectorAll('.tweet-card[data-index]');
        if (tweetCards.length === 0) {
            showToast('Tweet bulunamadı!', 'error');
            return;
        }

        const threadBtn = document.querySelector('.btn-thread-screenshot');
        if (threadBtn) {
            threadBtn.classList.add('loading');
            threadBtn.innerHTML = '<span class="btn-icon">⏳</span> İndiriliyor...';
        }

        try {
            // Download each tweet individually
            for (let i = 0; i < tweetCards.length; i++) {
                const tweetCard = tweetCards[i];
                const index = parseInt(tweetCard.dataset.index);

                // Create clone
                const clone = createScreenshotClone(tweetCard, index);
                document.body.appendChild(clone);

                // Capture
                const canvas = await html2canvas(clone, {
                    backgroundColor: '#000000',
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    logging: false
                });

                // Remove clone
                document.body.removeChild(clone);

                // Add watermark
                addWatermark(canvas);

                // Download with thread number
                downloadCanvas(canvas, `viralx-thread-${i + 1}-of-${tweetCards.length}-${Date.now()}`);

                // Small delay between downloads
                if (i < tweetCards.length - 1) {
                    await new Promise(r => setTimeout(r, 300));
                }
            }

            showToast(`${tweetCards.length} screenshot indirildi! 📸`);
        } catch (error) {
            console.error('Thread screenshot error:', error);
            showToast('Thread screenshot alınamadı!', 'error');
        } finally {
            if (threadBtn) {
                threadBtn.classList.remove('loading');
                threadBtn.innerHTML = `<span class="btn-icon">📸</span> Tüm Thread'i İndir (${tweetCards.length} tweet)`;
            }
        }
    };

    // Create a clean clone for screenshot
    function createScreenshotClone(tweetCard, index) {
        const tweet = generatedTweets[index];
        const content = tweet ? (tweet.content || tweet) : tweetCard.querySelector('.tweet-content').textContent;
        const viralityScore = tweet ? (tweet.virality_score || 50) : 50;
        const viralityClass = viralityScore >= 80 ? 'high' : viralityScore >= 50 ? 'medium' : 'low';

        // Create screenshot container
        const container = document.createElement('div');
        container.className = 'screenshot-container';
        container.style.cssText = `
            position: fixed;
            left: -9999px;
            top: 0;
            width: 600px;
            padding: 24px;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            border-radius: 16px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            border: 1px solid rgba(0, 255, 65, 0.3);
            box-shadow: 0 0 40px rgba(0, 255, 65, 0.1);
        `;

        container.innerHTML = `
            <div class="screenshot-tweet" style="
                background: #16181c;
                border-radius: 12px;
                padding: 16px;
                border: 1px solid #2f3336;
            ">
                <div class="screenshot-header" style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                ">
                    <div style="
                        width: 48px;
                        height: 48px;
                        background: linear-gradient(135deg, #00FF41, #00cc33);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                    ">👤</div>
                    <div>
                        <div style="
                            display: flex;
                            align-items: center;
                            gap: 4px;
                        ">
                            <span style="font-weight: 700; color: #e7e9ea; font-size: 15px;">ViralX User</span>
                            <span style="color: #1d9bf0;">✓</span>
                        </div>
                        <span style="color: #71767b; font-size: 14px;">@viralx_user</span>
                    </div>
                </div>
                <div class="screenshot-content" style="
                    color: #e7e9ea;
                    font-size: 17px;
                    line-height: 1.5;
                    margin-bottom: 16px;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                ">${escapeHtml(content)}</div>
                <div class="screenshot-meta" style="
                    display: flex;
                    gap: 16px;
                    padding-top: 12px;
                    border-top: 1px solid #2f3336;
                ">
                    <div style="
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        background: rgba(0, 255, 65, 0.1);
                        padding: 6px 12px;
                        border-radius: 20px;
                    ">
                        <span>🔥</span>
                        <span style="color: #71767b; font-size: 13px;">Virallik:</span>
                        <span style="color: ${viralityScore >= 80 ? '#00FF41' : viralityScore >= 50 ? '#ffd400' : '#f4212e'}; font-weight: 700;">${viralityScore}</span>
                    </div>
                </div>
            </div>
            <div class="screenshot-watermark" style="
                text-align: right;
                margin-top: 12px;
                opacity: 0.5;
            ">
                <span style="
                    font-family: 'Orbitron', sans-serif;
                    font-size: 14px;
                    color: #00FF41;
                    letter-spacing: 2px;
                ">⚡ ViralX</span>
            </div>
        `;

        return container;
    }

    // Add watermark to canvas
    function addWatermark(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.save();

        // Watermark settings
        ctx.font = '16px Orbitron, sans-serif';
        ctx.fillStyle = 'rgba(0, 255, 65, 0.3)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';

        // Draw watermark
        ctx.fillText('⚡ ViralX', canvas.width - 20, canvas.height - 15);

        ctx.restore();
    }

    // Download canvas as PNG
    function downloadCanvas(canvas, filename) {
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Fix tweet based on all critic feedback
    window.fixByCritic = async function(index) {
        const tweet = generatedTweets[index];
        if (!tweet || !tweet.critic_feedback) return;

        const btn = document.querySelector(`#critic-${index} .btn-fix-critic`);
        if (!btn) return;

        // Set loading state
        btn.classList.add('loading');
        btn.disabled = true;

        try {
            const response = await fetch('/api/rewrite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: tweet.content,
                    style: 'critic_fix',
                    criticFeedback: tweet.critic_feedback,
                    viralityTips: tweet.virality_tips || [],
                    persona: elements.persona.value
                })
            });

            const result = await response.json();

            if (result.success) {
                // Show success state briefly
                btn.classList.remove('loading');
                btn.classList.add('success');

                setTimeout(() => {
                    // Update tweet data
                    generatedTweets[index] = {
                        ...tweet,
                        content: result.data.content,
                        critic_score: result.data.critic_score,
                        critic_feedback: result.data.critic_feedback,
                        virality_score: result.data.virality_score,
                        virality_tips: result.data.virality_tips
                    };
                    renderTweets(generatedTweets);
                    showToast('Tweet eleştirmene göre düzeltildi!');
                }, 800);
            } else {
                btn.classList.remove('loading');
                btn.disabled = false;
                showToast('Hata: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            btn.classList.remove('loading');
            btn.disabled = false;
            showToast('Bağlantı hatası!', 'error');
        }
    };

    // Fix tweet based on a single tip
    window.fixByTip = async function(index, tipIndex, tip) {
        const tweet = generatedTweets[index];
        if (!tweet) return;

        const tipBtns = document.querySelectorAll(`#critic-${index} .virality-tip-btn`);
        const tipBtn = tipBtns[tipIndex];
        if (!tipBtn) return;

        // Set loading state on this tip
        tipBtn.classList.add('loading');
        tipBtn.disabled = true;

        try {
            const response = await fetch('/api/rewrite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: tweet.content,
                    style: 'single_tip',
                    singleTip: tip,
                    persona: elements.persona.value
                })
            });

            const result = await response.json();

            if (result.success) {
                // Show success state
                tipBtn.classList.remove('loading');
                tipBtn.classList.add('success');

                setTimeout(() => {
                    // Update tweet data
                    generatedTweets[index] = {
                        ...tweet,
                        content: result.data.content,
                        critic_score: result.data.critic_score,
                        critic_feedback: result.data.critic_feedback,
                        virality_score: result.data.virality_score,
                        virality_tips: result.data.virality_tips
                    };
                    renderTweets(generatedTweets);
                    showToast(`"${tip}" önerisi uygulandı!`);
                }, 600);
            } else {
                tipBtn.classList.remove('loading');
                tipBtn.disabled = false;
                showToast('Hata: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            tipBtn.classList.remove('loading');
            tipBtn.disabled = false;
            showToast('Bağlantı hatası!', 'error');
        }
    };

    window.openVisualEditor = function(index) {
        const tweet = generatedTweets[index];
        if (tweet && tweet.visual_prompt) {
            currentVisualPrompt = tweet.visual_prompt;
            elements.visualPromptEdit.value = tweet.visual_prompt;
            elements.generatedImageContainer.innerHTML = '';
            elements.visualModal.classList.add('active');
        }
    };

    // Copy All Tweets
    function copyAllTweets() {
        const allContent = generatedTweets.map((tweet, index) => {
            const content = tweet.content || tweet;
            return generatedTweets.length > 1 ? `${index + 1}/ ${content}` : content;
        }).join('\n\n');

        navigator.clipboard.writeText(allContent).then(() => {
            showToast('Tüm tweetler kopyalandı!');
        }).catch(() => {
            showToast('Kopyalama başarısız!', 'error');
        });
    }

    // Generate Image
    async function generateImage() {
        const prompt = elements.visualPromptEdit.value.trim();
        if (!prompt) {
            showToast('Görsel promptu gerekli!', 'error');
            return;
        }

        elements.generatedImageContainer.innerHTML = '<p style="text-align:center;color:var(--text-secondary);">Görsel üretiliyor...</p>';

        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt,
                    ratio: elements.visualRatioModal.value
                })
            });

            const result = await response.json();

            if (result.success) {
                elements.generatedImageContainer.innerHTML = `
                    <img src="${result.image}" alt="Generated Image" style="max-width:100%;border-radius:12px;">
                `;
            } else {
                const errorMsg = result.setup_required
                    ? `<div style="background:rgba(244,33,46,0.1);border:1px solid var(--danger);border-radius:12px;padding:16px;">
                         <p style="color:var(--danger);font-weight:600;">⚠️ Imagen API Ayarı Gerekli</p>
                         <p style="color:var(--text-secondary);margin-top:8px;">${result.error}</p>
                       </div>`
                    : `<p style="color:var(--danger);">Hata: ${result.error}</p>`;
                elements.generatedImageContainer.innerHTML = errorMsg;
            }
        } catch (error) {
            console.error('Error:', error);
            elements.generatedImageContainer.innerHTML = '<p style="color:var(--danger);">Bağlantı hatası!</p>';
        }
    }

    // Fetch News
    async function fetchNews() {
        const category = elements.newsCategory.value;

        // Loading animasyonu
        elements.newsGrid.innerHTML = `
            <div class="news-loading">
                <div class="news-loading-spinner"></div>
                <p>Haberler yükleniyor...</p>
            </div>
        `;

        try {
            const response = await fetch(`/api/fetch-news?category=${category}`);
            const result = await response.json();

            if (result.success && result.news.length > 0) {
                renderNews(result.news);
            } else {
                elements.newsGrid.innerHTML = '<p class="placeholder-text">Bu kategoride haber bulunamadı.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            elements.newsGrid.innerHTML = '<p class="placeholder-text">Haberler yüklenirken hata oluştu.</p>';
        }
    }

    // Render News
    function renderNews(news) {
        const categoryIcons = {
            'ai': '🤖',
            'tech': '💻',
            'turkey': '🇹🇷',
            'crypto': '🪙',
            'finance': '📈',
            'sports': '⚽',
            'gaming': '🎮',
            'entertainment': '🎬',
            'health': '🧬',
            'startup': '🚀',
            'social': '📱',
            'world': '🌍',
            'science': '🔬',
            'automotive': '🚗'
        };

        // Maksimum 10 haber göster
        const limitedNews = news.slice(0, 10);

        elements.newsGrid.innerHTML = limitedNews.map(item => `
            <div class="news-card" onclick="setTopic('${escapeHtml(item.title.replace(/'/g, "\\'"))}')">
                <div class="news-meta">
                    <span class="news-category-badge">${categoryIcons[item.category] || '📰'}</span>
                    <span class="news-source">[${escapeHtml(item.source_name)}]</span>
                </div>
                <div class="news-title">${escapeHtml(item.title)}</div>
                ${item.summary ? `<div class="news-summary">${escapeHtml(item.summary)}</div>` : ''}
                <button class="btn btn-secondary news-btn" onclick="event.stopPropagation(); setTopicAndGenerate('${escapeHtml(item.title.replace(/'/g, "\\'"))}')">
                    Bu konuda tweet yaz
                </button>
            </div>
        `).join('');
    }

    window.setTopic = function(topic) {
        elements.topic.value = topic;
        switchTab('generate');
        elements.topic.scrollIntoView({ behavior: 'smooth' });
    };

    window.setTopicAndGenerate = function(topic) {
        elements.topic.value = topic;
        switchTab('generate');
        generateTweets();
    };

    // Render Drafts
    function renderDrafts() {
        const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '[]');

        if (drafts.length === 0) {
            elements.draftsContainer.innerHTML = `
                <div class="drafts-empty">
                    <div class="drafts-empty-icon">📝</div>
                    <p>Henüz kayıtlı taslak yok.</p>
                    <p class="drafts-empty-hint">Tweet ürettikten sonra "💾 Kaydet" butonuna tıklayarak taslak oluşturabilirsiniz.</p>
                </div>
            `;
            return;
        }

        // Virallik skoru için renk
        const getViralityClass = (score) => {
            if (score >= 80) return 'high';
            if (score >= 50) return 'medium';
            return 'low';
        };

        elements.draftsContainer.innerHTML = `
            <div class="drafts-list">
                ${drafts.map((draft, index) => {
                    // Eski format uyumluluğu
                    const text = draft.text || draft.content || '';
                    const truncatedText = text.length > 100 ? text.substring(0, 100) + '...' : text;
                    const viralScore = draft.viralScore || 0;
                    const qualityScore = draft.qualityScore || 0;

                    return `
                        <div class="draft-card" data-draft-id="${draft.id || index}">
                            <div class="draft-header">
                                <div class="draft-date">📅 ${new Date(draft.date).toLocaleString('tr-TR')}</div>
                                ${viralScore > 0 ? `
                                    <div class="draft-score">
                                        <span class="score-badge-mini virality ${getViralityClass(viralScore)}">🔥 ${viralScore}</span>
                                        <span class="score-badge-mini quality">🎭 ${qualityScore}</span>
                                    </div>
                                ` : ''}
                            </div>
                            <div class="draft-content">${escapeHtml(truncatedText)}</div>
                            <div class="draft-actions">
                                <button class="btn btn-secondary btn-draft-action" onclick="copyDraft(${index})">
                                    📋 Kopyala
                                </button>
                                <button class="btn btn-ghost btn-draft-delete" onclick="deleteDraft(${index})">
                                    🗑️ Sil
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="drafts-footer">
                <span class="drafts-count">${drafts.length} taslak</span>
                <button class="btn btn-danger btn-clear-all" onclick="clearAllDrafts()">
                    🗑️ Tümünü Temizle
                </button>
            </div>
        `;
    }

    window.copyDraft = function(index) {
        const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '[]');
        if (drafts[index]) {
            const text = drafts[index].text || drafts[index].content || '';
            navigator.clipboard.writeText(text).then(() => {
                showToast('Taslak kopyalandı!');
            });
        }
    };

    window.useDraft = function(index) {
        const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '[]');
        if (drafts[index]) {
            const text = drafts[index].text || drafts[index].content || '';
            elements.topic.value = text;
            elements.draftsModal.classList.remove('active');
            switchTab('generate');
            showToast('Taslak konuya eklendi!');
        }
    };

    window.deleteDraft = function(index) {
        let drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '[]');
        drafts.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
        renderDrafts();
        updateDraftCount();
        showToast('Taslak silindi!');
    };

    window.clearAllDrafts = function() {
        if (confirm('Tüm taslaklar silinecek. Emin misiniz?')) {
            localStorage.setItem(STORAGE_KEYS.DRAFTS, '[]');
            renderDrafts();
            updateDraftCount();
            showToast('Tüm taslaklar silindi!');
        }
    };

    // Show/Hide Loading with rotating messages
    function showLoading(show, options = {}) {
        const { isFlood = false, floodTotal = 0, showProgress = false } = options;

        if (show) {
            // Reset cancel state
            isGenerationCancelled = false;
            currentAbortController = new AbortController();

            // Show overlay
            elements.loadingOverlay.classList.add('active');

            // Reset to first message
            let messageIndex = 0;
            updateLoadingMessage(messageIndex);

            // Start rotating messages every 2 seconds
            loadingMessageInterval = setInterval(() => {
                messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
                updateLoadingMessage(messageIndex);
            }, 2000);

            // Show/hide progress bar
            if (elements.loadingProgressContainer) {
                elements.loadingProgressContainer.style.display = showProgress || isFlood ? 'block' : 'none';
            }

            // Initialize flood progress
            if (isFlood && floodTotal > 0) {
                updateLoadingProgress(0, floodTotal);
            }
        } else {
            // Clear interval
            if (loadingMessageInterval) {
                clearInterval(loadingMessageInterval);
                loadingMessageInterval = null;
            }

            // Hide overlay
            elements.loadingOverlay.classList.remove('active');

            // Reset progress
            if (elements.loadingProgressContainer) {
                elements.loadingProgressContainer.style.display = 'none';
            }
            if (elements.loadingProgressFill) {
                elements.loadingProgressFill.style.width = '0%';
            }
        }
    }

    // Update loading message text
    function updateLoadingMessage(index) {
        const msg = LOADING_MESSAGES[index];
        if (elements.loadingText) {
            elements.loadingText.textContent = msg.text;
        }
        if (elements.loadingSubtext) {
            elements.loadingSubtext.textContent = msg.sub;
        }
    }

    // Update loading progress for flood mode
    function updateLoadingProgress(current, total, customText = null) {
        if (elements.loadingProgressFill) {
            const percent = (current / total) * 100;
            elements.loadingProgressFill.style.width = `${percent}%`;
        }
        if (elements.loadingProgressText) {
            elements.loadingProgressText.textContent = customText || `Tweet ${current}/${total} üretiliyor...`;
        }
    }

    // Cancel generation
    function cancelGeneration() {
        isGenerationCancelled = true;
        if (currentAbortController) {
            currentAbortController.abort();
        }
        showLoading(false);
        showToast('Üretim iptal edildi', 'warning');
    }

    // Show Toast
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        if (type === 'error') {
            toast.style.borderColor = '#f4212e';
            toast.style.color = '#f4212e';
        } else if (type === 'warning') {
            toast.style.borderColor = '#ffd400';
            toast.style.color = '#ffd400';
        }
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ============================================
    // BULK UPLOAD FUNCTIONS
    // ============================================

    // Handle file select from input
    function handleBulkFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            handleBulkFile(file);
        }
    }

    // Handle bulk file
    function handleBulkFile(file) {
        const validTypes = ['text/csv', 'text/plain', 'application/vnd.ms-excel'];
        const validExtensions = ['.csv', '.txt'];
        const fileName = file.name.toLowerCase();
        const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

        if (!hasValidExtension) {
            showToast('Sadece CSV veya TXT dosyaları desteklenir!', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            parseCSVContent(content);
        };
        reader.onerror = () => {
            showToast('Dosya okunamadı!', 'error');
        };
        reader.readAsText(file);
    }

    // Parse CSV content - detects simple vs advanced format
    function parseCSVContent(content) {
        // Split by newlines and filter empty lines
        let lines = content.split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0);

        if (lines.length === 0) {
            showToast('Dosyada geçerli konu bulunamadı!', 'error');
            return;
        }

        // Detect format: check if first line is a header with known columns
        const firstLine = lines[0].toLowerCase();
        const isAdvancedFormat = firstLine.includes('konu') &&
                                  (firstLine.includes('ton') || firstLine.includes('stil') || firstLine.includes('hedef'));

        if (isAdvancedFormat) {
            parseAdvancedCSV(lines);
        } else {
            parseSimpleFormat(lines);
        }
    }

    // Parse simple format (one topic per line)
    function parseSimpleFormat(lines) {
        bulkFormatType = 'simple';

        // Handle lines - if comma exists, take first part only
        let topics = lines.map(line => {
            if (line.includes(',')) {
                const parts = line.split(',');
                return parts[0].replace(/^["']|["']$/g, '').trim();
            }
            return line.replace(/^["']|["']$/g, '').trim();
        }).filter(line => line.length > 0);

        // Limit to MAX_BULK_TOPICS
        if (topics.length > MAX_BULK_TOPICS) {
            topics = topics.slice(0, MAX_BULK_TOPICS);
            showToast(`Maksimum ${MAX_BULK_TOPICS} konu yüklenebilir. İlk ${MAX_BULK_TOPICS} konu alındı.`, 'warning');
        }

        if (topics.length === 0) {
            showToast('Dosyada geçerli konu bulunamadı!', 'error');
            return;
        }

        bulkTopics = topics;
        renderBulkPreview();
        showToast(`${topics.length} konu yüklendi (Basit format)!`);
    }

    // Parse advanced CSV format with columns
    function parseAdvancedCSV(lines) {
        bulkFormatType = 'advanced';

        // Parse header to get column indices
        const headerLine = lines[0].toLowerCase();
        const headers = parseCSVLine(headerLine);

        const colIndex = {
            konu: headers.findIndex(h => h.includes('konu')),
            ton: headers.findIndex(h => h.includes('ton')),
            stil: headers.findIndex(h => h.includes('stil')),
            hedef_kitle: headers.findIndex(h => h.includes('hedef')),
            hook: headers.findIndex(h => h.includes('hook')),
            premium: headers.findIndex(h => h.includes('premium'))
        };

        if (colIndex.konu === -1) {
            showToast('CSV dosyasında "konu" sütunu bulunamadı!', 'error');
            return;
        }

        // Parse data lines (skip header)
        let topics = [];
        for (let i = 1; i < lines.length; i++) {
            const values = parseCSVLine(lines[i]);
            if (values.length === 0 || !values[colIndex.konu]) continue;

            const topicObj = {
                konu: values[colIndex.konu] || '',
                ton: colIndex.ton !== -1 ? (values[colIndex.ton] || '') : '',
                stil: colIndex.stil !== -1 ? (values[colIndex.stil] || '') : '',
                hedef_kitle: colIndex.hedef_kitle !== -1 ? (values[colIndex.hedef_kitle] || '') : '',
                hook: colIndex.hook !== -1 ? (values[colIndex.hook] || '') : '',
                premium: colIndex.premium !== -1 ? (values[colIndex.premium] || '').toLowerCase() : 'hayır'
            };

            // Only add if topic is not empty
            if (topicObj.konu.trim()) {
                topics.push(topicObj);
            }
        }

        // Limit to MAX_BULK_TOPICS
        if (topics.length > MAX_BULK_TOPICS) {
            topics = topics.slice(0, MAX_BULK_TOPICS);
            showToast(`Maksimum ${MAX_BULK_TOPICS} konu yüklenebilir. İlk ${MAX_BULK_TOPICS} konu alındı.`, 'warning');
        }

        if (topics.length === 0) {
            showToast('Dosyada geçerli konu bulunamadı!', 'error');
            return;
        }

        bulkTopics = topics;
        renderBulkPreview();
        showToast(`${topics.length} konu yüklendi (Gelişmiş format)!`);
    }

    // Parse a single CSV line handling quoted values
    function parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"' && !inQuotes) {
                inQuotes = true;
            } else if (char === '"' && inQuotes) {
                inQuotes = false;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        result.push(current.trim());
        return result;
    }

    // Render bulk preview - NEW Full Preview System with Topic Cards
    function renderBulkPreview() {
        if (bulkTopics.length === 0) {
            // Hide editor, show upload zone
            if (elements.bulkEditorSection) elements.bulkEditorSection.style.display = 'none';
            if (elements.bulkUploadZone) elements.bulkUploadZone.style.display = 'block';
            elements.generateBulkBtn.disabled = true;
            return;
        }

        // Show editor section, hide upload zone
        if (elements.bulkEditorSection) elements.bulkEditorSection.style.display = 'block';
        if (elements.bulkUploadZone) elements.bulkUploadZone.style.display = 'none';
        elements.generateBulkBtn.disabled = false;

        // Update summary stats
        updateBulkSummaryStats();

        // Render topic cards
        renderBulkTopicCards();
    }

    // Update summary bar statistics
    function updateBulkSummaryStats() {
        const total = bulkTopics.length;

        // Count types
        let tweetCount = 0;
        let floodCount = 0;

        bulkTopics.forEach(item => {
            const type = typeof item === 'string' ? 'single' : (item.type || 'single');
            if (type === 'flood') floodCount++;
            else tweetCount++;
        });

        // Time estimate (5 sec per single, 25 sec per flood)
        const estimatedSeconds = (tweetCount * 5) + (floodCount * 25);

        // Update DOM elements
        if (elements.bulkTopicCount) {
            elements.bulkTopicCount.textContent = `📌 ${total} konu`;
        }
        if (elements.bulkTimeEstimate) {
            elements.bulkTimeEstimate.textContent = `⏱️ ~${estimatedSeconds} sn`;
        }
        if (elements.bulkTypeStats) {
            elements.bulkTypeStats.textContent = `📝 ${tweetCount} Tweet, ${floodCount} Flood`;
        }
    }

    // Render individual topic cards
    function renderBulkTopicCards() {
        if (!elements.bulkTopicsList) return;

        if (bulkTopics.length === 0) {
            elements.bulkTopicsList.innerHTML = `
                <div class="bulk-empty-state">
                    <div class="bulk-empty-icon">📭</div>
                    <p class="bulk-empty-text">Henüz konu eklenmedi</p>
                    <p class="bulk-empty-hint">Dosya yükleyin veya manuel ekleyin</p>
                </div>
            `;
            return;
        }

        elements.bulkTopicsList.innerHTML = bulkTopics.map((item, index) => {
            // Normalize item to object format
            const topic = typeof item === 'string' ? item : item.konu;
            const tone = typeof item === 'object' ? (item.ton || '') : '';
            const style = typeof item === 'object' ? (item.stil || '') : '';
            const audience = typeof item === 'object' ? (item.hedef_kitle || '') : '';
            const hook = typeof item === 'object' ? (item.hook || '') : '';
            const type = typeof item === 'object' ? (item.type || 'single') : 'single';
            const premium = typeof item === 'object' ? (item.premium === 'evet' || item.premium === true) : false;

            // Determine card class based on type
            const cardClass = premium ? 'premium' : (type === 'flood' ? 'thread' : 'tweet');

            return `
                <div class="topic-card ${cardClass}" data-index="${index}">
                    <div class="topic-card-header">
                        <span class="topic-number">${index + 1}</span>
                        <span class="topic-text">${escapeHtml(topic)}</span>
                        <button class="btn-remove-topic" onclick="removeBulkTopic(${index})" title="Konuyu kaldır">✕</button>
                    </div>
                    <div class="topic-settings-grid">
                        <div class="topic-setting-item">
                            <label>🎭 Ton</label>
                            <select class="topic-tone" data-index="${index}" onchange="updateTopicSetting(${index}, 'ton', this.value)">
                                <option value="">Varsayılan</option>
                                <optgroup label="🔥 Agresif">
                                    <option value="provokatif" ${tone === 'provokatif' ? 'selected' : ''}>Provokatif</option>
                                    <option value="sert" ${tone === 'sert' ? 'selected' : ''}>Sert</option>
                                    <option value="elestirmen" ${tone === 'elestirmen' ? 'selected' : ''}>Eleştirmen</option>
                                </optgroup>
                                <optgroup label="✨ Pozitif">
                                    <option value="motivasyonel" ${tone === 'motivasyonel' ? 'selected' : ''}>Motivasyonel</option>
                                    <option value="destekleyici" ${tone === 'destekleyici' ? 'selected' : ''}>Destekleyici</option>
                                    <option value="umutlu" ${tone === 'umutlu' ? 'selected' : ''}>Umutlu</option>
                                </optgroup>
                                <optgroup label="📚 Bilgi">
                                    <option value="bilgilendirici" ${tone === 'bilgilendirici' ? 'selected' : ''}>Bilgilendirici</option>
                                    <option value="analitik" ${tone === 'analitik' ? 'selected' : ''}>Analitik</option>
                                    <option value="uzman" ${tone === 'uzman' ? 'selected' : ''}>Uzman</option>
                                </optgroup>
                                <optgroup label="😂 Eğlence">
                                    <option value="mizahi" ${tone === 'mizahi' ? 'selected' : ''}>Mizahi</option>
                                    <option value="ironik" ${tone === 'ironik' ? 'selected' : ''}>İronik</option>
                                    <option value="troll" ${tone === 'troll' ? 'selected' : ''}>Troll</option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="topic-setting-item">
                            <label>✍️ Stil</label>
                            <select class="topic-style" data-index="${index}" onchange="updateTopicSetting(${index}, 'stil', this.value)">
                                <option value="">Varsayılan</option>
                                <option value="kisa_vurucu" ${style === 'kisa_vurucu' ? 'selected' : ''}>Kısa & Vurucu</option>
                                <option value="liste" ${style === 'liste' ? 'selected' : ''}>Liste</option>
                                <option value="hikaye" ${style === 'hikaye' ? 'selected' : ''}>Hikaye</option>
                                <option value="soru_cevap" ${style === 'soru_cevap' ? 'selected' : ''}>Soru-Cevap</option>
                                <option value="adim_adim" ${style === 'adim_adim' ? 'selected' : ''}>Adım Adım</option>
                                <option value="minimal" ${style === 'minimal' ? 'selected' : ''}>Minimal</option>
                            </select>
                        </div>
                        <div class="topic-setting-item">
                            <label>👥 Kitle</label>
                            <select class="topic-audience" data-index="${index}" onchange="updateTopicSetting(${index}, 'hedef_kitle', this.value)">
                                <option value="">Varsayılan</option>
                                <option value="girisimci" ${audience === 'girisimci' || audience === 'girişimciler' ? 'selected' : ''}>Girişimciler</option>
                                <option value="developer" ${audience === 'developer' || audience === 'yazılımcılar' ? 'selected' : ''}>Yazılımcılar</option>
                                <option value="ogrenci" ${audience === 'ogrenci' || audience === 'öğrenciler' ? 'selected' : ''}>Öğrenciler</option>
                                <option value="z_kusagi" ${audience === 'z_kusagi' ? 'selected' : ''}>Z Kuşağı</option>
                                <option value="profesyonel" ${audience === 'profesyonel' ? 'selected' : ''}>Profesyoneller</option>
                                <option value="yatirimci" ${audience === 'yatirimci' || audience === 'yatırımcılar' ? 'selected' : ''}>Yatırımcılar</option>
                            </select>
                        </div>
                        <div class="topic-setting-item">
                            <label>📝 Tür</label>
                            <select class="topic-type" data-index="${index}" onchange="updateTopicSetting(${index}, 'type', this.value)">
                                <option value="single" ${type === 'single' ? 'selected' : ''}>Tek Tweet</option>
                                <option value="flood" ${type === 'flood' ? 'selected' : ''}>Flood (5 tweet)</option>
                            </select>
                        </div>
                        <div class="topic-setting-item topic-premium-toggle">
                            <label class="toggle">
                                <input type="checkbox" class="topic-premium" data-index="${index}" ${premium ? 'checked' : ''} onchange="updateTopicSetting(${index}, 'premium', this.checked)">
                                <span class="toggle-slider"></span>
                            </label>
                            <span class="topic-premium-label">✨ Premium</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Update a single topic's setting
    window.updateTopicSetting = function(index, key, value) {
        if (index < 0 || index >= bulkTopics.length) return;

        // Convert simple format to object if needed
        if (typeof bulkTopics[index] === 'string') {
            bulkTopics[index] = {
                konu: bulkTopics[index],
                ton: '',
                stil: '',
                hedef_kitle: '',
                hook: '',
                type: 'single',
                premium: false
            };
        }

        // Update the specific key
        if (key === 'premium') {
            bulkTopics[index][key] = value ? true : false;
        } else {
            bulkTopics[index][key] = value;
        }

        // Update card visual class if type or premium changed
        if (key === 'type' || key === 'premium') {
            const card = document.querySelector(`.topic-card[data-index="${index}"]`);
            if (card) {
                card.classList.remove('premium', 'tweet', 'thread');
                if (bulkTopics[index].premium) {
                    card.classList.add('premium');
                } else if (bulkTopics[index].type === 'flood') {
                    card.classList.add('thread');
                } else {
                    card.classList.add('tweet');
                }
            }
            updateBulkSummaryStats();
        }
    };

    // Apply bulk settings to all topics
    function applyBulkSettingsToAll() {
        const tone = elements.bulkApplyTone?.value || '';
        const style = elements.bulkApplyStyle?.value || '';
        const audience = elements.bulkApplyAudience?.value || '';
        const type = elements.bulkApplyType?.value || '';
        const premium = elements.bulkApplyPremium?.checked || false;

        bulkTopics = bulkTopics.map((item, index) => {
            // Convert to object if string
            let obj = typeof item === 'string' ? { konu: item } : { ...item };

            // Apply settings if selected
            if (tone) obj.ton = tone;
            if (style) obj.stil = style;
            if (audience) obj.hedef_kitle = audience;
            if (type) obj.type = type;
            if (premium || elements.bulkApplyPremium?.checked) obj.premium = premium;

            return obj;
        });

        // Re-render cards with new settings
        renderBulkTopicCards();
        updateBulkSummaryStats();
        showToast('Ayarlar tüm konulara uygulandı!');
    }

    // Add manual topic
    function addManualTopicToList() {
        const topic = prompt('Yeni konu girin:');
        if (topic && topic.trim()) {
            bulkTopics.push({
                konu: topic.trim(),
                ton: '',
                stil: '',
                hedef_kitle: '',
                hook: '',
                type: 'single',
                premium: false
            });
            renderBulkPreview();
            showToast('Konu eklendi!');
        }
    }

    // Clear all topics
    function clearAllBulkTopics() {
        if (confirm('Tüm konular silinecek. Emin misiniz?')) {
            resetBulkUpload();
            showToast('Tüm konular temizlendi');
        }
    }

    // Remove single topic from bulk list
    window.removeBulkTopic = function(index) {
        bulkTopics.splice(index, 1);
        renderBulkPreview();
        if (bulkTopics.length === 0) {
            resetBulkUpload();
        }
    };

    // Go back to upload view
    function goBackToUploadView() {
        if (elements.bulkEditorSection) elements.bulkEditorSection.style.display = 'none';
        if (elements.bulkUploadZone) elements.bulkUploadZone.style.display = 'block';
        elements.generateBulkBtn.disabled = true;
    }

    // Reset bulk upload
    function resetBulkUpload() {
        bulkTopics = [];
        bulkGeneratedResults = [];
        bulkFormatType = 'simple';
        if (elements.bulkEditorSection) elements.bulkEditorSection.style.display = 'none';
        if (elements.bulkUploadZone) elements.bulkUploadZone.style.display = 'block';
        elements.bulkProgressSection.style.display = 'none';
        elements.generateBulkBtn.disabled = true;
        elements.bulkFileInput.value = '';
        elements.bulkProgressBar.style.width = '0%';

        // Reset bulk apply fields
        if (elements.bulkApplyTone) elements.bulkApplyTone.value = '';
        if (elements.bulkApplyStyle) elements.bulkApplyStyle.value = '';
        if (elements.bulkApplyAudience) elements.bulkApplyAudience.value = '';
        if (elements.bulkApplyType) elements.bulkApplyType.value = '';
        if (elements.bulkApplyPremium) elements.bulkApplyPremium.checked = false;
    }

    // Download simple example CSV
    function downloadSimpleCSV() {
        const exampleContent = `yapay zeka araçları
kripto para stratejileri
biohacking yöntemleri
prompt engineering teknikleri
side hustle fikirleri
Twitter büyütme stratejileri
SaaS ürün fikirleri
newsletter başlatma rehberi
no-code araçları ile uygulama yapma
pasif gelir kaynakları`;

        const blob = new Blob([exampleContent], { type: 'text/plain;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'viralx_basit_konular.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast('Basit format dosyası indirildi!');
    }

    // Download advanced example CSV
    function downloadAdvancedCSV() {
        const exampleContent = `konu,ton,stil,hedef_kitle,hook,premium
yapay zeka araçları,provokatif,hikaye,girişimciler,şok edici,hayır
kripto para stratejileri,eğitici,liste,yatırımcılar,soru,hayır
biohacking yöntemleri,motivasyonel,kişisel deneyim,biohacker,istatistik,evet
prompt engineering teknikleri,bilge,how-to rehberi,yapay zeka meraklıları,,hayır
side hustle fikirleri,ilham verici,araştırma bazlı,freelancerlar,trend konusu,hayır
Twitter büyütme stratejileri,samimi,case study,içerik üreticileri,,hayır
SaaS ürün fikirleri,vizyon sahibi,karşılaştırma,startup kurucuları,soru,evet
newsletter başlatma rehberi,pragmatik,adım adım,blog yazarları,,hayır
no-code araçları,trend takipçisi,tool/araç tanıtımı,dijital girişimciler,,hayır
pasif gelir kaynakları,tutkulu,kişisel deneyim,finansal özgürlük arayanlar,istatistik,evet`;

        const blob = new Blob([exampleContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'viralx_gelismis_format.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast('Gelişmiş format CSV indirildi!');
    }

    // Generate bulk tweets - NEW card-based system with per-topic settings
    async function generateBulkTweets() {
        if (bulkTopics.length === 0) {
            showToast('Önce konuları yükleyin!', 'error');
            return;
        }

        // Show progress section
        elements.bulkProgressSection.style.display = 'block';
        elements.generateBulkBtn.disabled = true;
        bulkGeneratedResults = [];

        const total = bulkTopics.length;
        let completed = 0;

        // Helper to get topic info from new card format
        const getTopicInfo = (item) => {
            if (typeof item === 'string') {
                return {
                    topic: item,
                    tone: '',
                    style: '',
                    audience: '',
                    hook: '',
                    type: 'single',
                    premium: false
                };
            }
            return {
                topic: item.konu || item.topic || '',
                tone: item.ton || item.tone || '',
                style: item.stil || item.style || '',
                audience: item.hedef_kitle || item.audience || '',
                hook: item.hook || '',
                type: item.type || 'single',
                premium: item.premium === true || item.premium === 'evet'
            };
        };

        // Update progress with detailed info
        const updateProgress = (current, currentItem) => {
            const percent = (current / total) * 100;
            elements.bulkProgressBar.style.width = `${percent}%`;
            elements.progressStatus.textContent = `${current + 1}/${total}`;

            if (current < total) {
                const info = getTopicInfo(currentItem);
                const typeLabel = info.type === 'flood' ? '🌊' : '📝';
                elements.progressHint.textContent = `${typeLabel} Üretiliyor: ${info.topic}`;
            } else {
                elements.progressHint.textContent = '✓ Tamamlandı!';
            }
        };

        updateProgress(0, bulkTopics[0]);

        // Generate tweets one by one
        for (let i = 0; i < bulkTopics.length; i++) {
            const item = bulkTopics[i];
            const info = getTopicInfo(item);
            updateProgress(i, item);

            // Build request with per-topic settings from cards
            const isFlood = info.type === 'flood';
            const requestData = {
                topic: info.topic,
                contentType: isFlood ? 'flood' : 'single',
                chainLength: isFlood ? 5 : 1,
                writingStyle: info.style || elements.writingStyle.value,
                tone: info.tone || elements.tone.value,
                hook: info.hook || '',
                targetAudience: info.audience || elements.targetAudience?.value || '',
                isPremium: info.premium,
                includeVisual: false,
                includeEngagement: false,
                generateVariations: false,
                threadTemplate: '',
                visualRatio: '1:1',
                targetTweet: '',
                persona: getEffectivePersona()
            };

            try {
                const response = await fetch('/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData)
                });

                const result = await response.json();

                if (result.success && result.data.tweets && result.data.tweets.length > 0) {
                    bulkGeneratedResults.push({
                        topic: info.topic,
                        tweets: result.data.tweets, // For flood, store all tweets
                        tweet: result.data.tweets[0], // For backward compatibility
                        isFlood: isFlood,
                        success: true,
                        settings: info
                    });
                } else {
                    bulkGeneratedResults.push({
                        topic: info.topic,
                        error: result.error || 'Üretim başarısız',
                        success: false
                    });
                }
            } catch (error) {
                console.error('Bulk generate error:', error);
                bulkGeneratedResults.push({
                    topic: info.topic,
                    error: 'Bağlantı hatası',
                    success: false
                });
            }

            completed++;

            // 1 second delay between requests to avoid rate limiting
            if (i < bulkTopics.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        // Final progress update
        elements.progressStatus.textContent = `${total}/${total}`;
        elements.progressHint.textContent = '✓ Tamamlandı!';
        elements.bulkProgressBar.style.width = '100%';

        // Short delay to show completion
        await new Promise(resolve => setTimeout(resolve, 500));

        // All done - show results
        showBulkResults();
    }

    // Show bulk results
    function showBulkResults() {
        elements.bulkUploadModal.classList.remove('active');

        // Convert bulk results to generatedTweets format
        generatedTweets = bulkGeneratedResults
            .filter(r => r.success)
            .map(r => ({
                ...r.tweet,
                bulk_topic: r.topic
            }));

        if (generatedTweets.length > 0) {
            renderBulkTweetsOutput(bulkGeneratedResults);
            elements.outputActions.style.display = 'flex';
            showToast(`✓ ${generatedTweets.length} tweet üretildi!`);
        } else {
            showToast('Hiçbir tweet üretilemedi!', 'error');
        }

        // Reset bulk state
        resetBulkUpload();
    }

    // Render bulk tweets output with topic headers
    function renderBulkTweetsOutput(results) {
        const successResults = results.filter(r => r.success);
        const failedResults = results.filter(r => !r.success);

        let html = '';

        // Summary header
        html += `
            <div class="bulk-results-header">
                <div class="bulk-results-summary">
                    <span class="success-count">✓ ${successResults.length} başarılı</span>
                    ${failedResults.length > 0 ? `<span class="failed-count">✕ ${failedResults.length} başarısız</span>` : ''}
                </div>
                <button class="btn btn-secondary" onclick="copyAllBulkTweets()">
                    <span class="btn-icon">📋</span> Tümünü Kopyala
                </button>
            </div>
        `;

        // Success tweets
        successResults.forEach((result, index) => {
            const tweet = result.tweet;
            const content = tweet.content || tweet;
            const charCount = content.length;
            const charClass = charCount > 280 ? 'danger' : charCount > 250 ? 'warning' : 'safe';
            const viralityScore = tweet.virality_score || 50;
            const viralityClass = viralityScore >= 80 ? 'high' : viralityScore >= 50 ? 'medium' : 'low';

            html += `
                <div class="tweet-card bulk-tweet-card" data-index="${index}">
                    <div class="bulk-topic-header">
                        <span class="bulk-topic-number">#${index + 1}</span>
                        <span class="bulk-topic-text">${escapeHtml(result.topic)}</span>
                    </div>
                    <div class="tweet-header">
                        <div class="tweet-avatar">👤</div>
                        <div class="tweet-user-info">
                            <div class="tweet-user-row">
                                <span class="tweet-name">ViralX User</span>
                                <span class="tweet-verified">✓</span>
                                <span class="tweet-handle">@viralx_user</span>
                            </div>
                        </div>
                    </div>
                    <div class="tweet-content">${escapeHtml(content)}</div>
                    <div class="tweet-meta">
                        <div class="score-badge virality">
                            <span class="score-icon">🔥</span>
                            <span>Virallik:</span>
                            <span class="score-value ${viralityClass}">${viralityScore}</span>
                        </div>
                    </div>
                    <div class="tweet-footer">
                        <span class="char-count ${charClass}">${charCount}/280</span>
                        <div class="tweet-card-actions">
                            <button class="btn-card-action" onclick="copyBulkTweet(${index})">📋 Kopyala</button>
                            <button class="btn-card-action btn-save-draft" onclick="saveBulkToDraft(${index})">💾 Kaydet</button>
                        </div>
                    </div>
                </div>
            `;
        });

        // Failed results
        if (failedResults.length > 0) {
            html += `<div class="bulk-failed-section">
                <h3 class="bulk-failed-title">⚠️ Başarısız Konular</h3>
            `;
            failedResults.forEach(result => {
                html += `
                    <div class="bulk-failed-item">
                        <span class="failed-topic">${escapeHtml(result.topic)}</span>
                        <span class="failed-error">${escapeHtml(result.error)}</span>
                    </div>
                `;
            });
            html += '</div>';
        }

        elements.tweetsContainer.innerHTML = html;
    }

    // Copy single bulk tweet
    window.copyBulkTweet = function(index) {
        const results = bulkGeneratedResults.filter(r => r.success);
        if (results[index]) {
            const content = results[index].tweet.content || results[index].tweet;
            navigator.clipboard.writeText(content).then(() => {
                showToast('Tweet kopyalandı!');
            });
        }
    };

    // Copy all bulk tweets
    window.copyAllBulkTweets = function() {
        const successResults = bulkGeneratedResults.filter(r => r.success);
        const allContent = successResults.map((result, index) => {
            const content = result.tweet.content || result.tweet;
            return `[${result.topic}]\n${content}`;
        }).join('\n\n---\n\n');

        navigator.clipboard.writeText(allContent).then(() => {
            showToast('Tüm tweetler kopyalandı!');
        });
    };

    // Save bulk tweet to draft
    window.saveBulkToDraft = function(index) {
        const results = bulkGeneratedResults.filter(r => r.success);
        if (results[index]) {
            const tweet = results[index].tweet;
            const content = tweet.content || tweet;

            let drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '[]');
            const newDraft = {
                id: Date.now(),
                text: content,
                date: new Date().toISOString(),
                viralScore: tweet.virality_score || 0,
                qualityScore: tweet.critic_score || 0,
                bulk_topic: results[index].topic
            };

            drafts.unshift(newDraft);
            if (drafts.length > 50) drafts = drafts.slice(0, 50);
            localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));

            updateDraftCount();
            showToast('Taslağa kaydedildi!');
        }
    };

    // ==========================================
    // ANALYTICS & HISTORY FUNCTIONS
    // ==========================================

    const MAX_HISTORY = 50;

    // Template display names
    const TEMPLATE_NAMES = {
        '': 'Serbest',
        'problem_solution': 'Problem→Çözüm',
        'listicle': 'Liste',
        'story': 'Hikaye',
        'shock_fact': 'Şok Gerçek',
        'tutorial': 'Rehber',
        'comparison': 'Karşılaştırma'
    };

    // Setup analytics event listeners
    function setupAnalyticsListeners() {
        // Open Analytics Modal
        if (elements.openAnalyticsBtn) {
            elements.openAnalyticsBtn.addEventListener('click', () => {
                elements.analyticsModal.classList.add('active');
                renderAnalyticsDashboard();
            });
        }

        // Close Analytics Modal
        if (elements.closeAnalyticsModal) {
            elements.closeAnalyticsModal.addEventListener('click', () => {
                elements.analyticsModal.classList.remove('active');
            });
        }

        // Close on backdrop click
        if (elements.analyticsModal) {
            elements.analyticsModal.addEventListener('click', (e) => {
                if (e.target === elements.analyticsModal) {
                    elements.analyticsModal.classList.remove('active');
                }
            });
        }

        // Export CSV
        if (elements.exportHistoryCSV) {
            elements.exportHistoryCSV.addEventListener('click', exportHistoryToCSV);
        }

        // Clear History
        if (elements.clearHistoryBtn) {
            elements.clearHistoryBtn.addEventListener('click', () => {
                if (confirm('Tüm geçmişi silmek istediğinize emin misiniz?')) {
                    localStorage.removeItem(STORAGE_KEYS.HISTORY);
                    renderAnalyticsDashboard();
                    showToast('Geçmiş temizlendi!');
                }
            });
        }
    }

    // Save tweet to history
    function saveToHistory(topic, template, viralScore, qualityScore, textPreview) {
        let history = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');

        const historyItem = {
            id: Date.now(),
            date: new Date().toISOString(),
            topic: topic || 'Belirtilmemiş',
            template: template || '',
            viralScore: viralScore || 0,
            qualityScore: qualityScore || 0,
            textPreview: (textPreview || '').substring(0, 100)
        };

        history.unshift(historyItem);

        // Limit to MAX_HISTORY
        if (history.length > MAX_HISTORY) {
            history = history.slice(0, MAX_HISTORY);
        }

        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    }

    // Render analytics dashboard
    function renderAnalyticsDashboard() {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');

        // Update summary cards
        renderSummaryCards(history);

        // Render template chart
        renderTemplateChart(history);

        // Render history list
        renderHistoryList(history);
    }

    // Render summary cards
    function renderSummaryCards(history) {
        // Total tweets
        elements.totalTweetsCount.textContent = history.length;

        // Average virality score
        if (history.length > 0) {
            const avgViral = history.reduce((sum, h) => sum + (h.viralScore || 0), 0) / history.length;
            elements.avgViralityScore.textContent = avgViral.toFixed(1);
        } else {
            elements.avgViralityScore.textContent = '0';
        }

        // Best template (highest average score)
        if (history.length > 0) {
            const templateStats = {};
            history.forEach(h => {
                const tpl = h.template || '';
                if (!templateStats[tpl]) {
                    templateStats[tpl] = { total: 0, count: 0 };
                }
                templateStats[tpl].total += (h.viralScore || 0);
                templateStats[tpl].count++;
            });

            let bestTpl = '';
            let bestAvg = 0;
            Object.keys(templateStats).forEach(tpl => {
                const avg = templateStats[tpl].total / templateStats[tpl].count;
                if (avg > bestAvg) {
                    bestAvg = avg;
                    bestTpl = tpl;
                }
            });

            elements.bestTemplate.textContent = TEMPLATE_NAMES[bestTpl] || 'Serbest';
        } else {
            elements.bestTemplate.textContent = '-';
        }
    }

    // Render template performance chart (CSS Bar Chart)
    function renderTemplateChart(history) {
        if (history.length === 0) {
            elements.templateChart.innerHTML = '<div class="chart-empty">Henüz veri yok</div>';
            return;
        }

        // Calculate template averages
        const templateStats = {};
        history.forEach(h => {
            const tpl = h.template || '';
            if (!templateStats[tpl]) {
                templateStats[tpl] = { total: 0, count: 0 };
            }
            templateStats[tpl].total += (h.viralScore || 0);
            templateStats[tpl].count++;
        });

        // Find max for scaling
        let maxAvg = 0;
        Object.keys(templateStats).forEach(tpl => {
            const avg = templateStats[tpl].total / templateStats[tpl].count;
            templateStats[tpl].avg = avg;
            if (avg > maxAvg) maxAvg = avg;
        });

        // Build chart HTML
        let chartHTML = '<div class="bar-chart">';
        Object.keys(templateStats).forEach(tpl => {
            const stats = templateStats[tpl];
            const widthPercent = maxAvg > 0 ? (stats.avg / maxAvg) * 100 : 0;
            const templateName = TEMPLATE_NAMES[tpl] || 'Serbest';

            chartHTML += `
                <div class="bar-row">
                    <span class="bar-label">${templateName}</span>
                    <div class="bar-track">
                        <div class="bar-fill" style="width: ${widthPercent}%"></div>
                    </div>
                    <span class="bar-value">${stats.avg.toFixed(1)}</span>
                    <span class="bar-count">(${stats.count})</span>
                </div>
            `;
        });
        chartHTML += '</div>';

        elements.templateChart.innerHTML = chartHTML;
    }

    // Render history list
    function renderHistoryList(history) {
        elements.historyCount.textContent = `${history.length} kayıt`;

        if (history.length === 0) {
            elements.historyList.innerHTML = '<div class="history-empty">Henüz tweet üretilmedi</div>';
            return;
        }

        let listHTML = '';
        history.forEach(h => {
            const date = new Date(h.date);
            const dateStr = date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' });
            const timeStr = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
            const templateName = TEMPLATE_NAMES[h.template] || 'Serbest';

            listHTML += `
                <div class="history-item">
                    <div class="history-date">
                        <span class="date">${dateStr}</span>
                        <span class="time">${timeStr}</span>
                    </div>
                    <div class="history-content">
                        <span class="history-topic">${h.topic}</span>
                        <span class="history-template">${templateName}</span>
                    </div>
                    <div class="history-scores">
                        <span class="score viral" title="Virallik">🔥 ${h.viralScore}</span>
                        <span class="score quality" title="Kalite">⭐ ${h.qualityScore}</span>
                    </div>
                </div>
            `;
        });

        elements.historyList.innerHTML = listHTML;
    }

    // Export history to CSV
    function exportHistoryToCSV() {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');

        if (history.length === 0) {
            showToast('İndirilecek geçmiş yok!');
            return;
        }

        // CSV header
        let csv = 'Tarih,Saat,Konu,Şablon,Virallik,Kalite,Önizleme\n';

        history.forEach(h => {
            const date = new Date(h.date);
            const dateStr = date.toLocaleDateString('tr-TR');
            const timeStr = date.toLocaleTimeString('tr-TR');
            const templateName = TEMPLATE_NAMES[h.template] || 'Serbest';

            // Escape quotes in text
            const topic = (h.topic || '').replace(/"/g, '""');
            const preview = (h.textPreview || '').replace(/"/g, '""');

            csv += `"${dateStr}","${timeStr}","${topic}","${templateName}",${h.viralScore},${h.qualityScore},"${preview}"\n`;
        });

        // Download
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `viralx_history_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('CSV indirildi!');
    }

    // ==========================================
    // TREND-JACKING SİSTEMİ
    // ==========================================

    let selectedTrend = null;

    // Trendleri çek
    window.fetchTrends = async function() {
        const container = document.getElementById('trends-list');
        if (!container) return;

        container.innerHTML = `
            <div class="trends-loading">
                <div class="spinner"></div>
                Trendler yükleniyor...
            </div>
        `;

        try {
            const response = await fetch('/api/trends');
            const data = await response.json();

            if (data.success && data.trends && data.trends.length > 0) {
                displayTrends(data.trends);
                const updateTime = document.getElementById('trends-update-time');
                if (updateTime) {
                    updateTime.textContent = data.last_update || '--:--';
                }
            } else {
                container.innerHTML = '<div class="trends-empty">❌ Trend bulunamadı</div>';
            }
        } catch (error) {
            console.error('Trend fetch error:', error);
            container.innerHTML = '<div class="trends-error">❌ Bağlantı hatası - Tekrar deneyin</div>';
        }
    };

    // Trendleri listele
    function displayTrends(trends) {
        const container = document.getElementById('trends-list');
        if (!container) return;

        container.innerHTML = trends.map((trend, index) => `
            <div class="trend-item" data-index="${index}" onclick="selectTrend(${index}, '${escapeHtmlAttr(trend.name)}', '${trend.category || 'Genel'}', ${trend.volume || 0})">
                <span class="trend-rank">${index + 1}</span>
                <div class="trend-info">
                    <span class="trend-name">${escapeHtml(trend.name)}</span>
                    <span class="trend-meta">
                        <span class="trend-category">${trend.category || 'Genel'}</span>
                        ${trend.volume ? `<span class="trend-volume">${formatVolume(trend.volume)}</span>` : ''}
                    </span>
                </div>
                <span class="trend-source ${trend.source || ''}">${getSourceIcon(trend.source)}</span>
            </div>
        `).join('');
    }

    // Kaynak ikonu
    function getSourceIcon(source) {
        const icons = {
            'google': '🔍',
            'twitter': '🐦',
            'eksi': '📝'
        };
        return icons[source] || '📊';
    }

    // HTML attribute escape
    function escapeHtmlAttr(text) {
        return String(text || '').replace(/'/g, "\\'").replace(/"/g, '\\"');
    }

    // Rakam formatla
    function formatVolume(num) {
        if (!num) return '';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    // Trend seç
    window.selectTrend = function(index, name, category, volume) {
        selectedTrend = { name, category, volume };

        // Tüm itemlerden selected'ı kaldır
        document.querySelectorAll('.trend-item').forEach(item => {
            item.classList.remove('selected');
        });

        // Seçilene ekle
        const selectedItem = document.querySelector(`.trend-item[data-index="${index}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }

        // Editor'ü göster
        const editor = document.getElementById('trend-editor');
        if (editor) {
            editor.style.display = 'block';
        }

        const badge = document.getElementById('selected-trend-badge');
        if (badge) {
            badge.innerHTML = `
                <span class="badge-icon">📍</span>
                <span class="badge-text">${escapeHtml(name)}</span>
                <span class="badge-category">${category}</span>
                <button onclick="clearTrendSelection()" class="badge-close">✕</button>
            `;
        }

        // Sonucu gizle
        const result = document.getElementById('trend-result');
        if (result) {
            result.style.display = 'none';
        }
    };

    // Trend seçimini temizle
    window.clearTrendSelection = function() {
        selectedTrend = null;
        document.querySelectorAll('.trend-item').forEach(item => {
            item.classList.remove('selected');
        });

        const editor = document.getElementById('trend-editor');
        if (editor) editor.style.display = 'none';

        const result = document.getElementById('trend-result');
        if (result) result.style.display = 'none';
    };

    // Trend tweet üret
    window.generateTrendTweet = async function() {
        if (!selectedTrend) {
            showToast('❌ Önce bir trend seçin!', 'error');
            return;
        }

        const nicheInput = document.getElementById('trend-niche');
        const angleSelect = document.getElementById('trend-angle');

        const niche = nicheInput?.value?.trim() || 'girişimcilik';
        const angle = angleSelect?.value || 'hot_take';

        if (!niche) {
            showToast('❌ Lütfen kendi nişinizi girin!', 'error');
            nicheInput?.focus();
            return;
        }

        const btn = document.getElementById('btn-generate-trend');
        if (!btn) return;

        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<div class="spinner-small"></div> Üretiliyor...';

        try {
            const response = await fetch('/api/generate-trend-tweet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    trend: selectedTrend.name,
                    niche: niche,
                    angle: angle
                })
            });

            const data = await response.json();

            if (data.success) {
                displayTrendResult(data);
                showToast('✅ Trend tweet üretildi!');
            } else {
                showToast('❌ ' + (data.error || 'Tweet üretilemedi'), 'error');
            }
        } catch (error) {
            console.error('Generate trend tweet error:', error);
            showToast('❌ Bağlantı hatası!', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    };

    // Trend tweet sonucunu göster
    function displayTrendResult(data) {
        const container = document.getElementById('trend-result');
        if (!container) return;

        container.style.display = 'block';

        const scoreClass = data.virality_score >= 70 ? 'high' : data.virality_score >= 50 ? 'medium' : 'low';
        const charClass = data.char_count > 280 ? 'over' : data.char_count > 250 ? 'warning' : 'ok';

        container.innerHTML = `
            <div class="trend-tweet-card">
                <div class="tweet-header">
                    <span class="tweet-trend-badge">🔥 ${escapeHtml(data.trend_used)}</span>
                    <span class="tweet-char-count ${charClass}">${data.char_count}/280</span>
                </div>

                <div class="tweet-content" id="trend-tweet-text">${escapeHtml(data.tweet)}</div>

                <div class="tweet-scores">
                    <div class="score-item ${scoreClass}">
                        <span class="score-label">🔥 Virallik</span>
                        <span class="score-value">${data.virality_score}</span>
                    </div>
                </div>

                ${data.criticism ? `
                    <div class="tweet-criticism">
                        <span class="criticism-label">💬 AI Eleştirisi:</span>
                        <span class="criticism-text">${escapeHtml(data.criticism)}</span>
                    </div>
                ` : ''}

                <div class="tweet-actions">
                    <button onclick="copyTrendTweet()" class="btn-action">📋 Kopyala</button>
                    <button onclick="generateTrendTweet()" class="btn-action">🔄 Yeniden</button>
                    <button onclick="saveTrendTweetToDraft()" class="btn-action">💾 Taslağa Kaydet</button>
                </div>
            </div>
        `;

        // Sonuca scroll
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Trend tweetini kopyala
    window.copyTrendTweet = function() {
        const text = document.getElementById('trend-tweet-text')?.textContent;
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('✅ Tweet kopyalandı!');
            }).catch(() => {
                showToast('❌ Kopyalama başarısız', 'error');
            });
        }
    };

    // Trend tweetini taslağa kaydet
    window.saveTrendTweetToDraft = function() {
        const text = document.getElementById('trend-tweet-text')?.textContent;
        if (text) {
            // Mevcut taslak kaydetme mantığını kullan
            let drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '[]');

            const newDraft = {
                id: Date.now(),
                text: text,
                date: new Date().toISOString(),
                viralScore: 0,
                qualityScore: 0,
                source: 'trend-jacking'
            };

            drafts.unshift(newDraft);

            // Maksimum 50 taslak tut
            if (drafts.length > 50) {
                drafts = drafts.slice(0, 50);
            }

            localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
            showToast('💾 Taslağa kaydedildi!');
        }
    };

    // Trend-jacking event listeners
    function initTrendJacking() {
        // Generate butonu
        const generateBtn = document.getElementById('btn-generate-trend');
        if (generateBtn) {
            generateBtn.addEventListener('click', generateTrendTweet);
        }

        // Trendleri yükle
        fetchTrends();

        // Her 5 dakikada güncelle
        setInterval(fetchTrends, 5 * 60 * 1000);
    }

    // Init'e ekle
    const originalInit = init;
    init = function() {
        if (typeof originalInit === 'function') {
            // Original init zaten çağrılıyor
        }
        // Trend-jacking'i başlat
        setTimeout(initTrendJacking, 500);
    };

    // Sayfa yüklendikten sonra trend-jacking'i başlat
    setTimeout(initTrendJacking, 1000);

    // Initialize App
    init();
});
