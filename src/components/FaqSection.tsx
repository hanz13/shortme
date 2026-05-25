import { useState } from "react";
import { Sparkles, Fingerprint, ShieldCheck, Smartphone, Clock, Layers, QrCode, ShieldAlert, ChevronDown } from "lucide-react";
import { useTranslation, LanguageCode } from "../i18n";

interface FaqSectionProps {
  isDark?: boolean;
}

interface LocalizedFeature {
  title: string;
  description: string;
}

interface LocalizedFaq {
  question: string;
  answer: string;
}

const LOCALIZED_DATA: Partial<Record<LanguageCode, { features: LocalizedFeature[]; faqs: LocalizedFaq[] }>> = {
  BG: {
    features: [
      { title: "Лесен за използване", description: "Съкратете дългите си URL адреси за секунди с един клик без сложни конфигурации." },
      { title: "Персонализиран суфикс", description: "Създавайте брандирани, доверени и лесни за запомняне връзки за вашите кампании." },
      { title: "Бързо и сигурно", description: "Насладете се на мигновени пренасочвания, подкрепени от параметри за дезинфекция." },
      { title: "Съвместимост с устройства", description: "Всички съкратени връзки са напълно адаптивни за браузъри, компютри и телефони." },
      { title: "Изтичане по избор", description: "Настройте динамични граници на изтичане, за да деактивирате автоматично връзките." },
      { title: "Масов съкратител", description: "Компресирайте и скъсете няколко URL адреса наведнъж с партидна обработка." },
      { title: "Поддръжка на QR код", description: "Генерирайте QR кодове с висока разделителна способност за офлайн медии директно." },
      { title: "Защита от спам", description: "Интелигентни щитове филтрират зловреден софтуер и предотвратяват атаки с brute force." }
    ],
    faqs: [
      { question: "Безопасно ли е използването на shortme.cyou?", answer: "Да, нашите системи разполагат с активна дезинфекция на връзки. Автоматично филтрираме зловреден код и забраняваме спам цели." },
      { question: "Как да изтегля QR кода на връзката?", answer: "Всеки съкратен линк се показва в историята по-долу. Просто щракнете върху иконата QR код и изберете Изтегли PNG." },
      { question: "Мога ли да задам персонализирана дата на изтичане?", answer: "Да! Докато конфигурирате вашата връзка, можете да изберете опциите от падащото меню за изтичане." },
      { question: "Безплатна ли е услугата?", answer: "Нашата платформа е напълно безплатна за използване от всички за по-бързо споделяне на връзки." }
    ]
  },
  BN: {
    features: [
      { title: "সহজ ব্যবহার পদ্ধতি", description: "কোনো জটিল কনফিগারেশন ছাড়াই মাত্র এক ক্লিকে আপনার দীর্ঘ ইউআরএল ছোট করুন।" },
      { title: "কাস্টম ইউআরএল স্লগ", description: "আপনার ব্র্যান্ডের প্রচারণা বা পরিচয়ের সাথে মিল রেখে মনে রাখার মতো শর্টলিঙ্ক তৈরি করুন।" },
      { title: "নিরাপদ ও দ্রুত গতি", description: "নিরাপদ প্রোটোকল ও গভীর স্যানিটাইজেশনের মাধ্যমে মাইক্রোসেকেন্ডে লিঙ্ক রিডাইরেক্ট হবে।" },
      { title: "যেকোনো ডিভাইসে উপযুক্ত", description: "সংক্ষিপ্ত করা লিঙ্কগুলি কম্পিউটার বা মোবাইল যেকোনো ওয়েব ব্রাউজারে সুন্দরভাবে কাজ করবে।" },
      { title: "মেয়াদ শেষ হওয়ার সীমা", description: "প্রচারণার প্রয়োজনের সাথে মিল রেখে লিঙ্কের ব্যবহারের জন্য একটি শেষ সময় নির্ধারণ করুন।" },
      { title: "একসাথে অনেক লিঙ্ক ছোট করুন", description: "হালকা ব্যাচ প্রসেসিংয়ের মাধ্যমে একসাথে একাধিক দীর্ঘ ইউআরএল সহজে ছোট করুন।" },
      { title: "QR কোড ডাউনলোড সুবিধা", description: "অফলাইন প্রচারের কাজে ব্যবহারের জন্য সরাসরি চমৎকার QR কোড তৈরি করুন।" },
      { title: "স্প্যাম ও ম্যালওয়ার সুরক্ষা", description: "স্মার্ট ফিল্টারের মাধ্যমে ক্ষতিকর স্ক্রিপ্ট ও ম্যালওয়ার আক্রান্ত ডোমেন স্বয়ংক্রিয়ভাবে ব্লক করা হয়।" }
    ],
    faqs: [
      { question: "shortme.cyou ব্যবহার করা কি ম্যালওয়ার মুক্ত?", answer: "হ্যাঁ, আমাদের প্ল্যাটফর্মে কড়া নিরাপত্তা ব্যবস্থা রয়েছে। ক্ষতিকর স্ক্রিপ্ট সনাক্ত হওয়া মাত্র তা নিষিদ্ধ করা হয়।" },
      { question: "আমি কীভাবে শর্টলিঙ্কের QR কোড ডাউনলোড করব?", answer: "নিচের তালিকায় আপনার তৈরি লিঙ্কের পাশে QR কোড অপশন ক্লিক করে বিনামূল্যে PNG ডাউনলোড করুন।" },
      { question: "মেয়াদ শেষের তারিখ কি নিজের মতো সেট করা যায়?", answer: "অবশ্যই। লিঙ্ক তৈরির সময় ড্রপডাউন অপশনে ক্লিক করে পਸন্দমতো সময় বেছে নিতে পারেন।" },
      { question: "এই সেবাটি কি সম্পূর্ণ ফ্রি?", answer: "সোশ্যাল মিডিয়া ও প্রফেশনাল ব্যবহারের জন্য এই penyingkat লিঙ্ক সেবাটি সবার জন্য সম্পূর্ণ ফ্রি।" }
    ]
  },
  DE: {
    features: [
      { title: "Einfach zu bedienen", description: "Verkürzen Sie Ihre langen URLs in Sekundenschnelle mit einem einzigen Klick ohne Konfiguration." },
      { title: "Eigene URL-Kürzel", description: "Erstellen Sie markenbezogene, vertrauenswürdige und einprägsame Kurzlinks für Ihre Kampagnen." },
      { title: "Sicher & Schnell", description: "Sofortige Weiterleitungen in Mikrosekunden, geschützt durch Sanitization-Parameter." },
      { title: "Gerätekompatibel", description: "Alle verkürzten Links sind reaktiv und auf PCs, Tablets sowie Smartphones perfekt lesbar." },
      { title: "Ablaufzeit konfigurieren", description: "Richten Sie Ablaufzeiten ein, um Links nach dem Ende einer Kampagne automatisch zu deaktivieren." },
      { title: "Massen-Verkürzer", description: "Verkürzen und verwalten Sie mehrere URLs gleichzeitig mit unserer hocheffizienten Batch-Übertragung." },
      { title: "QR-Code-Unterstützung", description: "Generieren Sie QR-Codes direkt im Dashboard, um Offline- und Online-Medien ideal zu verbinden." },
      { title: "Spamschutz-Schild", description: "Smarte Filter scannen Weiterleitungen auf Schadsoftware und verhindern Brute-Force-Angriffe." }
    ],
    faqs: [
      { question: "Ist shortme.cyou sicher vor Schadsoftware?", answer: "Ja, unsere Systeme filtern schädliche Code-Fragmente aus, blockieren Phishing-Domänen und schützen Ihre Besucher." },
      { question: "Wie lade ich den QR-Code herunter?", answer: "Klicken Sie in Ihrer Liste einfach auf das QR-Symbol neben dem Link und wählen Sie 'Download PNG'." },
      { question: "Kann ich ein benutzerdefiniertes Ablaufdatum festlegen?", answer: "Ja, Sie können beim Erstellen flexibel zwischen verschiedenen Ablaufzeiten im Dropdown wählen." },
      { question: "Ist dieser Dienst kostenlos?", answer: "Ja, unser Service ist für alle Nutzer komplett kostenlos, um Links schnell und unkompliziert zu teilen." }
    ]
  },
  EN: {
    features: [
      { title: "Easy to Use", description: "Shorten your long URLs in seconds with a single simple click, requiring no complex configurations." },
      { title: "Custom Url Slug", description: "Create branded, credible, and memorable custom link slugs to align with your campaigns or brand identity." },
      { title: "Secure & Fast", description: "Enjoy instant routing resolutions under microseconds backed by deep sanitization parameters and safe protocols." },
      { title: "Device (compatible any device)", description: "All shortened link routes are fully responsive, adaptive, and compatible across all web browsers and devices." },
      { title: "Custom Expired", description: "Configure dynamic link expiration timelines to automatically decommission links after campaigns end." },
      { title: "Bulk Shortener", description: "Compress, shorten, and bulk-manage multiple URLs simultaneously with lightweight batch processing." },
      { title: "Support QRCode", description: "Generate high-resolution custom QR codes directly for your links to bridge offline and online media easily." },
      { title: "Spam & Abuse Protection", description: "Smart shields scan destination targets for malware, sanitize scripts, and throttle crawler abuse." }
    ],
    faqs: [
      { question: "Is using shortme.cyou safe from harmful scripts?", answer: "Yes, our systems feature active deep link sanitization. We automatically filter malicious code fragments, block known malware domains, and forbid link submissions pointing to phishing targets." },
      { question: "How can I download the QR Code for my shortened link?", answer: "Every shortened redirect you generate appears in your active history directory below. Simply trigger the 'QR Code' icon alongside the copy button and select 'Download' to grab the PNG for free." },
      { question: "Can I define a custom expiration date?", answer: "Yes, absolutely! While configuring your link, you can adjust the Link Expiration dropdown options to schedule exact deadlines or limits. When the time passes, the system stops routing automatically." },
      { question: "Is this shortening service free?", answer: "Our platform is completely free to use for everyone to speed up social media sharing, marketing, and professional campaign redirects." }
    ]
  },
  ES: {
    features: [
      { title: "Fácil de usar", description: "Acorte sus URL largas en segundos con un solo clic, sin configuraciones complejas." },
      { title: "Alias personalizados", description: "Cree enlaces de marca memorables y confiables para alinearse con su identidad comercial." },
      { title: "Seguro y Rápido", description: "Disfrute de redireccionamientos en microsegundos respaldados por estrictos filtros de seguridad." },
      { title: "Compatible con Dispositivos", description: "Rutas responsivas perfectamente legibles en navegadores de PC, tabletas o teléfonos celulares." },
      { title: "Fechas de Expiración", description: "Configure plazos dinámicos para retirar automáticamente enlaces fuera de campaña." },
      { title: "Acortamiento Masivo", description: "Comprima y procese múltiples URL de destino en un único lote de alto rendimiento." },
      { title: "Soporte de Códigos QR", description: "Genere códigos QR de alta resolución para conectar fácilmente medios físicos y digitales." },
      { title: "Protección Contra Abusos", description: "Sistemas inteligentes que filtran malware, desinfectan scripts y limitan ataques de fuerza bruta." }
    ],
    faqs: [
      { question: "¿Es seguro usar shortme.cyou frente a scripts dañinos?", answer: "Sí. Filtramos fragmentos de código malicioso, bloqueamos dominios de phishing conocidos y protegemos a los destinatarios." },
      { question: "¿Cómo puedo descargar el código QR de mi enlace?", answer: "Busque el enlace deseado en la lista de abajo, haga clic en el icono QR y presione 'Descargar PNG' gratis." },
      { question: "¿Puedo configurar un tiempo de vencimiento personalizado?", answer: "Por supuesto. Puede predeterminar el plazo de vida del enlace utilizando la lista desplegable en el formulario." },
      { question: "¿Este servicio es totalmente gratuito?", answer: "Sí, la plataforma es 100% gratuita para acelerar el uso de campañas digitales y enlaces de redes sociales." }
    ]
  },
  FR: {
    features: [
      { title: "Facile à utiliser", description: "Raccourcissez vos URL longues en quelques secondes d'un simple clic, sans configuration." },
      { title: "Suffixes personnalisés", description: "Générez des liens de confiance, mémorables et pertinents pour vos campagnes marketing." },
      { title: "Sécurisé et Rapide", description: "Profitez de redirections fluides sous la microseconde avec un haut filtrage applicatif." },
      { title: "Tous Écrans", description: "Toutes les routes d'accès sont adaptatives et fonctionnent sur ordinateurs, tablettes et smartphones." },
      { title: "Expirations configurables", description: "Programmez des limites de temps pour désactiver automatiquement vos hyperliens obsolètes." },
      { title: "Raccourcisseur en masse", description: "Compressez et gérez plusieurs adresses à la fois grâce au traitement par lots." },
      { title: "Générateur QR Code", description: "Téléchargez des codes QR nets directement pour faciliter les scans sur médias physiques." },
      { title: "Bouclier Anti-Spam", description: "La détection intelligente bloque les malware, nettoie les scripts et limite les robots." }
    ],
    faqs: [
      { question: "shortme.cyou protège-t-il contre les virus ?", answer: "Tout à fait. Nos serveurs intègrent un protocole de nettoyage automatique des scripts et interdisent les sites malveillants." },
      { question: "Comment enregistrer le code QR du lien ?", answer: "Cliquez sur l'icône QR correspondante dans la liste historique ci-dessous, puis sur le bouton Télécharger." },
      { question: "Puis-je décider d'une fin de validité ?", answer: "Oui. Lors de la saisie, utilisez le menu déroulant d'expiration pour planifier la clôture automatique du lien." },
      { question: "Votre service est-il gratuit ?", answer: "La solution shortme.cyou est entièrement gratuite afin d'aider les créateurs et marketeurs à partager facilement." }
    ]
  },
  HE: {
    features: [
      { title: "קל לשימוש", description: "קצר את הקישורים הארוכים שלך בשניות בלחיצה פשוטה, ללא הגדרות מסובכות." },
      { title: "סיומת מותאמת אישית", description: "צור קישורים ממותגים, אמינים וקלים לזכירה המתאימים לקמפיין שלך." },
      { title: "מהיר ומאובטח", description: "ניתוב מיידי בפחות ממיקרו-שנייה, מגובה בפרמטרים קפדניים של סינון תוכן." },
      { title: "תואם לכל המכשירים", description: "הקישורים המקוצרים רספונסיביים לחלוטין ומותאמים למחשבים, טאבלטים וסלולריים." },
      { title: "תפוגה דינמית", description: "הגדר תאריכי תפוגה מוגדרים מראש כדי להשבית קישורים באופן אוטומטי בתום קמפיינים." },
      { title: "קיצור קישורים מרובים", description: "קצר ונהל קישורים מרובים במקביל באמצעות עיבוד קל ויעיל בסדרות." },
      { title: "תמיכה בקוד QR", description: "הפק קוד QR ברזולוציה גבוהה ישירות כדי לקשר בין המדיה הפיזית לדיגיטלית." },
      { title: "הגנה מפני שימוש לרעה", description: "מערכות אבטחה חכמות מסננות קוד זדוני, מנקות סקריפטים ומונעות פריצות." }
    ],
    faqs: [
      { question: "האם השימוש ב-shortme.cyou מאובטח?", answer: "כן, המערכת שלנו כוללת ניקוי קישורים אקטיבי. אנו חוסמים סקריפטים מזיקים ומטרות דיוג (Phishing)." },
      { question: "איך מורידים את קוד ה-QR של הקישור?", answer: "לחץ על סמל ה-QR בתוך רשימת ההיסטוריה שלך למטה ובחר 'הורד קוד PNG' בחינם." },
      { question: "האם ניתן להגדיר תוקף מותאם לקישור?", answer: "בהחלט. בעת יצירת הקישור, ניתן לבחור בקלות את זמן התפוגה הרצוי מתוך התפריט." },
      { question: "האם השירות כרוך בתשלום?", answer: "הפלטפורמה שלנו חינמית לחלוטין לשימוש עבור כולם כדי לקצר ולשתף קישורים ברשתות החברתיות." }
    ]
  },
  HI: {
    features: [
      { title: "उपयोग करने में आसान", description: "बिना किसी जटिल कॉन्फ़िगरेशन के एक क्लिक में अपने लंबे यूआरएल को सेकंडों में छोटा करें।" },
      { title: "कस्टम लिंक बनाएं", description: "अपने ब्रांड अभियान के अनुसार आसानी से याद रखे जाने योग्य कस्टम लिंक तैयार करें।" },
      { title: "सुरक्षित और तेज़", description: "सुरक्षित प्रोटोकॉल और गहन सुरक्षा मापदंडों के साथ तत्काल माइक्रोसेकंड रीडायरेक्ट का आनंद लें।" },
      { title: "सभी उपकरणों के अनुकूल", description: "छोटा किया गया लिंक कंप्यूटर या मोबाइल सभी उपकरणों पर बिना किसी बाधा के सुचारू रूप से काम करता है।" },
      { title: "कस्टम लिंक समाप्ति", description: "अपना अभियान समाप्त होने के बाद लिंक को स्वतः निष्क्रिय करने के लिए समय सीमा निर्धारित करें।" },
      { title: "थोक लिंक जेनरेटर", description: "एक साथ कई लंबे यूआरएल को संपीड़ित करें और बैच प्रक्रिया के माध्यम से प्रबंधित करें।" },
      { title: "क्यूआर कोड समर्थन", description: "ऑफ़लाइन प्रचार के लिए लिंक का उच्च-गुणवत्ता वाला सुंदर क्यूआर कोड तुरंत डाउनलोड करें।" },
      { title: "स्पैम और दुरुपयोग सुरक्षा", description: "स्मार्ट फ़िल्टर दुर्भावनापूर्ण सामग्री को स्कैन कर ब्लॉक करते हैं और सुरक्षित माहौल प्रदान करते हैं।" }
    ],
    faqs: [
      { question: "क्या shortme.cyou सुरक्षित माध्यम है?", answer: "हाँ, हमारी प्रणालियों में सक्रिय लिंक स्वच्छता तकनीक है। हम संदिग्ध फ़िशिंग लक्ष्यों को ब्लॉक करते हैं।" },
      { question: "शॉर्टलिंक का क्यूआर कोड कैसे डाउनलोड करें?", answer: "इतिहास सूची में लिंक के आगे क्यूआर आइकन पर क्लिक करें और मुफ्त में PNG डाउनलोड करें।" },
      { question: "क्या मैं कस्टम समाप्ति समय निर्धारित कर सकता हूँ?", answer: "बिलकुल। फॉर्म सबमिट करते समय ड्रॉपडाउन सूची से अपनी इच्छित समय सीमा का चयन करें।" },
      { question: "क्या यह सेवा मुफ्त है?", answer: "सोशल मीडिया शेयरिंग और व्यावसायिक अभियानों को बढ़ावा देने के लिए यह मंच पूरी तरह से मुफ्त है।" }
    ]
  },
  ID: {
    features: [
      { title: "Mudah Digunakan", description: "Perpendek URL panjang Anda dalam hitungan detik dengan satu klik mudah tanpa konfigurasi rumit." },
      { title: "Kustom Slug Tautan", description: "Buat tautan branded, kredibel, dan mudah diingat sesuai dengan kebutuhan kampanye atau identitas bisnis Anda." },
      { title: "Aman & Cepat", description: "Nikmati perutean instan di bawah mikrodetik yang didukung jaminan sanitasi link dan protokol bersertifikasi aman." },
      { title: "Kompatibel Semua Perangkat", description: "Tautan hasil perpendek optimal, adaptif, dan kompatibel untuk semua platform browser di PC maupun smartphone." },
      { title: "Atur Batas Kedaluwarsa", description: "Atur batas waktu kedaluwarsa klik dinamis untuk mengamankan link dari akses yang melewati batas waktu kampanye." },
      { title: "Penyingkat Massal", description: "Kompres, persingkat, dan kelola seluruh daftar URL panjang Anda secara sekaligus dengan efisiensi tinggi." },
      { title: "Mendukung QR Code", description: "Hasilkan QR code beresolusi tinggi langsung dari dashboard untuk memudahkan pemindaian media fisik." },
      { title: "Anti-Spam & Eksploitasi", description: "Sistem cerdas memfilter payload malware, mendisinfeksi skrip jahat, serta memitigasi serangan brute force." }
    ],
    faqs: [
      { question: "Apakah menggunakan shortme.cyou aman dari virus?", answer: "Ya, sistem kami dilengkapi sanitasi tautan otomatis. Kami menyaring skrip berbahaya dan melarang pembuatan shortlink phishing." },
      { question: "Bagaimana cara mendownload QR Code link?", answer: "Setiap shortlink yang sudah Anda buat akan muncul di daftar riwayat link di bawah. Cukup klik ikon QR Code lalu klik 'Unduh PNG' gratis." },
      { question: "Dapatkah saya mengatur batas kedaluwarsa kustom?", answer: "Tentu saja. Saat membuat slug, Anda dapat memilih waktu kedaluwarsa otomatis sesuai keinginan dari pilihan menu drop-down." },
      { question: "Apakah layanan ini gratis?", answer: "Layanan penyingkat link shortme.cyou sepenuhnya gratis untuk digunakan oleh semua orang demi mempercepat akses tautan sosial media Anda." }
    ]
  },
  IT: {
    features: [
      { title: "Facile da usare", description: "Accorcia le tue URL lunghe in pochi secondi con un solo clic, senza faticose configurazioni." },
      { title: "Slug personalizzati", description: "Crea link brandizzati e facili da ricordare integrati con il tuo stile o marchio." },
      { title: "Sicuro & Velocissimo", description: "Instadati all'istante sotto al microsecondo grazie a moderni protocolli di sanitizzazione." },
      { title: "Compatibile con Dispositivi", description: "Visualizzazione perfetta delle re-ascoltazioni su qualsiasi browser desktop o smartphone." },
      { title: "Scadenza Programmabile", description: "Configura tempi di cessazione automatici per dismettere i collegamenti oltre i termini di campagna." },
      { title: "Riduci in blocco", description: "Accorcia e gestisci decine di link contemporaneamente grazie all'upload multiplo." },
      { title: "Supporto codice QR", description: "Crea file QR di alta qualità per collegare supporti analogici e la nostra infrastruttura online." },
      { title: "Filtro anti-abuso", description: "Sistemi intelligenti respingono malware, ripuliscono script maligni e evitano spam automatico." }
    ],
    faqs: [
      { question: "shortme.cyou è sicuro contro malware e frodi?", answer: "Sì. Analizziamo e puliamo le URL, escludendo script dannosi, e vietiamo l'uso di target di phishing noti." },
      { question: "Come scarico l'immagine QR del link?", answer: "Clicca sull'icona QR di fianco al pulsante copia nella lista in basso e premi l'apposito tasto Scarica PNG." },
      { question: "Posso decidere quando far scadere il link?", answer: "Certamente. In fase di creazione seleziona l'intervallo temporale desiderato dall'apposito menu di scadenza." },
      { question: "Questo tool di reindirizzamento è gratuito?", answer: "Sì, shortme.cyou è completamente gratuito per tutti al fine di velocizzare e ottimizzare le vostre promozioni online." }
    ]
  },
  JA: {
    features: [
      { title: "簡単に使える", description: "複雑な設定なしで、ワンクリックで長いURLを数秒で短縮できます。" },
      { title: "カスタムURLスラッグ", description: "キャンペーンやブランドのアイデンティティに合わせて、ブランディングされた信頼できる記憶に残りやすいカスタムURLスラッグを作成できます。" },
      { title: "安全＆高速", description: "安全なプロトコルとディープサニタイズ（クレンジング）に裏打ちされた、マイクロ秒単位の即時リダイレクトをお楽しみください。" },
      { title: "全デバイス対応", description: "短縮されたすべてのリンクは、PC、タブレット、スマートフォンなどのすべてのデバイスとWEBブラウザで完全に動作・最適化されます。" },
      { title: "カスタム有効期限", description: "キャンペーン終了後にリンクを自動的に無効化するために、動的なリンク有効期限を設定できます。" },
      { title: "一括URL短縮", description: "軽量なバッチ処理により、複数のURLを同時に圧縮、短縮、一括管理できます。" },
      { title: "QRコード対応", description: "オンラインとオフラインメディアを簡単に繋ぐために、高解像度のカスタムQRコードを直接生成できます。" },
      { title: "スパム＆不正利用防止", description: "スマートシールドが転送先のマルウェアをスキャンし、悪意あるスクリプトをサニタイズしてクローラ攻撃を防ぎます。" }
    ],
    faqs: [
      { question: "shortme.cyouの使用は有害なスクリプトから安全ですか？", answer: "はい、当社のシステムには強力なリンククレンジングが備わっています。悪意のあるコードフラグメントを自動的にフィルタリングし、判明しているマルウェアドメインをブロックし、フィッシングサイトへのリンク登録を禁止しています。" },
      { question: "短縮リンクのQRコードはどうやってダウンロードしますか？", answer: "作成したリダイレクト用リンクはすべて下の履歴インジケーターに表示されます。コピーボタンの隣にある『QRコード』アイコンをクリックして、無料でPNG画像をダウンロードしてください。" },
      { question: "カスタム有効期限は設定できますか？", answer: "はい、もちろんです！ リンクを作成または設定するときに、有効期限ドロップダウンから選択してスケジュールを設定できます。期限が過ぎると、自動的に転送が停止します。" },
      { question: "このリンク短縮サービスは完全に無料ですか？", answer: "はい、当社のプラットフォームは誰でも完全に無料で利用可能です。ソーシャルメディアでの共有、マーケティング、そしてプロのキャンペーンの転送をスピードアップさせることができます。" }
    ]
  },
  PT: {
    features: [
      { title: "Fácil de usar", description: "Encurte suas URLs longas em segundos com um único clique simples, sem configurações complexas." },
      { title: "Slug personalizado", description: "Crie identificadores de link personalizados, confiáveis e fáceis de lembrar para alinhar com suas campanhas." },
      { title: "Seguro e Rápido", description: "Aproveite resoluções de redirecionamento instantâneas em microssegundos com tecnologia de higienização de links." },
      { title: "Compatibilidade total", description: "Todas as rotas de links encurtados são totalmente responsivas e compatíveis com qualquer navegador e dispositivo." },
      { title: "Expiração personalizada", description: "Configure prazos de validade dinâmicos para desativar automaticamente as conexões após o término das campanhas." },
      { title: "Encurtador em Massa", description: "Comprima, encurte e gerencie várias URLs ao mesmo tempo com o processador em lote de alta velocidade." },
      { title: "Suporte a QR Code", description: "Gere códigos QR customizados de alta resolução para conectar mídias físicas e digitais com facilidade." },
      { title: "Proteção contra Spam", description: "Escudos inteligentes analisam links de destino em busca de malware, limpam scripts e evitam abusos de robôs." }
    ],
    faqs: [
      { question: "Usar o shortme.cyou é seguro contra scripts perigosos?", answer: "Sim, nossos sistemas possuem higienização profunda ativa. Filtramos fragmentos de código malicioso, bloqueamos domínios de phishing conhecidos e proibimos links para páginas perigosas." },
      { question: "Como posso baixar o código QR do meu link encurtado?", answer: "Cada redirecionamento criado aparece no histórico abaixo. Basta clicar no ícone do 'Código QR' ao lado do botão copiar e escolher 'Download PNG' gratuitamente." },
      { question: "Posso definir uma data de expiração personalizada?", answer: "Sim, absolutamente! Ao gerar o seu link, selecione no menu de expiração o prazo ideal para as suas necessidades. Após essa data, o redirecionamento expira." },
      { question: "Este serviço de encurtamento é gratuito?", answer: "Nossa plataforma é 100% gratuita para ajudar todos a otimizarem o compartilhamento em redes sociais, marketing e campanhas profissionais." }
    ]
  },
  PL: {
    features: [
      { title: "Łatwy w użyciu", description: "Skracaj długie adresy URL w kilka sekund za pomocą jednego kliknięcia, bez skomplikowanych konfiguracji." },
      { title: "Własny alias URL", description: "Twórz markowe, wiarygodne i łatwe do zapamiętania krótkie linki dopasowane do Twoich kampanii." },
      { title: "Bezpieczne i szybkie", description: "Błyskawiczne przekierowania w mikrosekundy poparte zaawansowanymi algorytmami oczyszczania linków." },
      { title: "Kompatybilność", description: "Wszystkie skrócone linki są w pełni responsywne i działają na komputerach oraz urządzeniach mobilnych." },
      { title: "Czas wygaśnięcia", description: "Ustawiaj elastyczne terminy ważności, aby automatycznie dezaktywować linki po zakończeniu kampanii." },
      { title: "Skracanie masowe", description: "Kompresuj, skracaj i zarządzaj wieloma adresami URL jednocześnie dzięki funkcji przetwarzania wsadowego." },
      { title: "Obsługa kodów QR", description: "Generuj kody QR w wysokiej rozdzielczości, aby łatwo połączyć media drukowane i internetowe." },
      { title: "Ochrona przed spamem", description: "Inteligentne zapory skanują linki docelowe pod kątem złośliwego oprogramowania i blokują nadużycia." }
    ],
    faqs: [
      { question: "Czy korzystanie z shortme.cyou jest bezpieczne i chroni przed wirusami?", answer: "Tak, nasze systemy aktywnie analizują i oczyszczają linki. Automatycznie odrzucamy złośliwy kod, blokujemy domeny spamerskie i witryny wyłudzające dane." },
      { question: "Jak mogę pobrać kod QR dla mojego skróconego linku?", answer: "Każdy wygenerowany link pojawia się w historii poniżej. Kliknij ikonę 'Kod QR' obok przycisku kopiowania i wybierz 'Pobierz PNG' za darmo." },
      { question: "Czy mogę ustalić własną datę wygaśnięcia linku?", answer: "Tak, oczywiście! Podczas konfiguracji możesz wybrać z rozwijanej listy czas, po którym link przestanie automatycznie przekierowywać." },
      { question: "Czy ta usługa skracania linków jest bezpłatna?", answer: "Nasza platforma jest całkowicie darmowa dla każdego, by ułatwić i przyspieszyć udostępnianie linków w mediach społecznościowych i marketingu." }
    ]
  },
  RU: {
    features: [
      { title: "Простота использования", description: "Сокращайте длинные ссылки за секунды в один клик без каких-либо сложных настроек." },
      { title: "Собственные пути", description: "Создавайте брендированные, вызывающие доверие и легко запоминающиеся адреса для ваших кампаний." },
      { title: "Безопасно и быстро", description: "Мгновенная переадресация за микросекунды с использованием глубокой очистки входящих путей." },
      { title: "Любые устройства", description: "Все укороченные ссылки полностью адаптивны и совместимы с любыми смартфонами и браузерами." },
      { title: "Срок действия", description: "Настраивайте динамическое время жизни ссылок, чтобы автоматически отключать их после завершения акций." },
      { title: "Массовое сокращение", description: "Сжимайте и сокращайте множество URL-адресов одновременно с помощью пакетной обработки данных." },
      { title: "Поддерживает QR-коды", description: "Создавайте пользовательские QR-коды прямо в панели управления, совмещая офлайн и онлайн рекламу." },
      { title: "Защита от спама и угроз", description: "Интеллектуальные фильтры проверяют конечные цели на вирус, фишинг и вредоносный код." }
    ],
    faqs: [
      { question: "Безопасно ли использовать shortme.cyou от вредоносных скриптов?", answer: "Да, наша система имеет глубокую защиту и очистку ссылок. Мы автоматически фильтруем опасный код и блокируем фишинговые сайты." },
      { question: "Как скачать QR-код для сокращенной ссылки?", answer: "Каждая созданная ссылка сохраняется в истории ниже. Нажмите на иконку «QR-код» возле кнопки копирования и выберите «Скачать PNG»." },
      { question: "Можно ли настроить кастомную дату окончания действия ссылки?", answer: "Да, конечно! При создании ссылки выберите желаемый период работы в выпадающем меню, и ссылка отключится в указанный срок." },
      { question: "Бесплатна ли эта услуга?", answer: "Да, наш сервис полностью бесплатен для всех. Мы помогаем быстро делиться красивыми ссылками в социальных сетях." }
    ]
  },
  VI: {
    features: [
      { title: "Dễ dàng sử dụng", description: "Rút ngắn các URL dài của bạn trong vài giây chỉ với một cú nhấp chuột đơn giản mà không cần cấu hình phức tạp." },
      { title: "Đường dẫn tùy chỉnh", description: "Tạo các liên kết thương hiệu, đáng tin cậy và dễ nhớ để phù hợp hoàn hảo với chiến dịch của bạn." },
      { title: "An toàn & Tốc độ", description: "Trải nghiệm định tuyến chuyển hướng tức thời dưới một phần triệu giây với bộ lọc loại bỏ mã độc sâu." },
      { title: "Tương thích mọi thiết bị", description: "Tất cả các liên kết rút ngắn đều phản hồi linh hoạt và tương thích trên mọi trình duyệt web và thiết bị." },
      { title: "Hạn dùng tùy biến", description: "Đặt cấu hình mốc thời gian hết hạn linh hoạt để tự động hủy kích hoạt các liên kết sau khi chiến dịch kết thúc." },
      { title: "Rút ngắn hàng loạt", description: "Nén, thu gọn và quản lý hàng loạt nhiều URL cùng lúc thông qua quy trình xử lý hiệu suất cao." },
      { title: "Hỗ trợ Mã QR", description: "Tải mã QR độ phân giải cao trực tiếp cho các liên kết giúp bạn dễ dàng kết nối truyền thông trực tuyến và ngoại tuyến." },
      { title: "Vòng bảo vệ chống spam", description: "Hệ thống thông minh quét các liên kết đích để phát hiện phần mềm độc hại, làm sạch mã và ngăn chặn bot." }
    ],
    faqs: [
      { question: "shortme.cyou có an toàn và không chứa virus không?", answer: "Có, hệ thống của chúng tôi sở hữu tính năng dọn dẹp liên kết sâu. Chúng tôi tự động chặn mã độc và lọc bỏ các trang web lừa đảo." },
      { question: "Làm thế nào để tải về mã QR của link đã rút ngắn?", answer: "Mọi liên kết được tạo sẽ xuất hiện trong danh mục lịch sử bên dưới. Bạn chỉ cần ấn vào biểu tượng 'Mã QR' rồi chọn 'Tải xuống PNG' miễn phí." },
      { question: "Tôi có thể thiết lập thời hạn hết hạn riêng không?", answer: "Hoàn toàn được! Khi đang định dạng liên kết, bạn chọn mốc thời gian mong muốn tại menu hết hạn và hệ thống sẽ tự ngắt khi tới hạn." },
      { question: "Dịch vụ rút gọn link này có miễn phí không?", answer: "Nền tảng của chúng tôi hoàn toàn miễn phí cho tất cả mọi người giúp bạn dễ dàng chia sẻ trên mạng xã hội và trong các dự án của mình." }
    ]
  },
  TR: {
    features: [
      { title: "Kolay Kullanım", description: "Uzun URL'lerinizi saniyeler içinde, karmaşık yapılandırmalara gerek kalmadan tek bir tıklamayla kısaltın." },
      { title: "Özel URL Kısa Adı", description: "Kampanyalarınız veya marka kimliğinizle uyumlu, akılda kalıcı ve güvenilir kısa bağlantılar oluşturun." },
      { title: "Güvenli ve Hızlı", description: "Gelişmiş link temizleme algoritmaları ve güvenli protokollerle mikrosaniyeler içinde anında yönlendirmenin keyfini çıkarın." },
      { title: "Tüm Cihazlarla Uyumlu", description: "Kısaltılmış tüm bağlantı yolları duyarlıdır ve tüm web tarayıcılarında ve cihazlarda kusursuz çalışır." },
      { title: "Özel Son Kullanma", description: "Kampanyalarınız bittiğinde bağlantıları otomatik olarak devre dışı bırakmak için dinamik süre sınırları belirleyin." },
      { title: "Toplu Link Kısaltma", description: "Hafif toplu işlem aracılığıyla aynı anda birden fazla hedef URL'yi sıkıştırın ve kısaltın." },
      { title: "QR Kod Desteği", description: "Çevrimdışı ve çevrimiçi medyayı kolayca birleştirmek için bağlantılarınız için doğrudan yüksek kaliteli QR kodları oluşturun." },
      { title: "Spam ve Suistimal Koruması", description: "Akıllı kalkanlar hedef siteleri malware için tarar, zararlı kodları süzer ve bot trafiğini engeller." }
    ],
    faqs: [
      { question: "shortme.cyou kullanmak güvenli mi? Zararlı yazılımlardan korur mu?", answer: "Evet, sistemlerimiz gelişmiş derin URL sanitizasyonu özelliğine sahiptir. Kötü niyetli kodları süzer ve phishing sitelerini hemen engelleriz." },
      { question: "Kısa linkim için oluşturulan QR Kodunu nasıl indirebilirim?", answer: "Oluşturduğunuz her kısa bağlantı aşağıdaki geçmiş listesinde görünür. Kopyala butonunun yanındaki 'QR Kodu' simgesine dokunun ve ücretsiz indirin." },
      { question: "Özel bir son kullanma tarihi tanımlayabilir miyim?", answer: "Kesinlikle! Linkinizi oluştururken Son Kullanma açılır menüsünden dilediğiniz süreyi seçerek otomatik devre dışı kalmasını sağlayabilirsiniz." },
      { question: "Bu link kısaltma hizmeti ücretsiz mi?", answer: "Platformumuz sosyal medya paylaşımlarını, pazarlama projelerini ve kampanya yönlendirmelerini hızlandırmak amacıyla herkes için %100 ücretsizdir." }
    ]
  },
  KO: {
    features: [
      { title: "쉬운 사용법", description: "복잡한 설정 없이 단 한 번의 단출한 클릭으로 긴 URL을 수초 만에 줄여보세요." },
      { title: "맞춤형 링크 슬러그", description: "브랜드 정체성이나 캠페인에 맞춰 신뢰성을 제공하는 기억하기 쉬운 맞춤형 단축 단어를 지정할 수 있습니다." },
      { title: "안전성 및 신속성", description: "위험 감지 소독 패러독스와 규격화된 정밀 세이프 필터링을 바탕으로 한 마이크로초 단위 리디렉션을 지원합니다." },
      { title: "모든 기기 완벽 지원", description: "단축된 링크는 반응형 레이아웃으로 모바일 기기, 태블릿, PC 등 다양한 환경의 웹 브라우저에서 올바르게 동작합니다." },
      { title: "맞춤형 만료 시간", description: "캠페인이 종료된 후 혹은 일정 주기가 지나면 자동으로 만료되도록 동적 비활성화 예약을 설정할 수 있습니다." },
      { title: "대량 링크 단축", description: "여러 개의 긴 대상을 일괄 배치 프로세서를 이용하여 효율적이고 빠르게 동시 단축하고 관리할 수 있습니다." },
      { title: "QR 코드 지원", description: "오프라인 채널과의 유기적인 연동을 지원하기 위해 관리 패널에서 고해상도 맞춤형 QR 코드를 바로 제작하십시오." },
      { title: "스팸 및 어뷰징 탐지", description: "스마트 방화벽 가드가 이동지 유해성을 검출해 위험 이벤트를 통제하고 악성 삽입 스크립트를 조기 박멸합니다." }
    ],
    faqs: [
      { question: "shortme.cyou를 통한 리디렉션은 바이러스로부터 안전할까요?", answer: "네, 저희 시스템은 실시간 안전 처리를 수행합니다. 유해 스크립트를 방지하고, 피싱 목적으로 개설된 URL 바인딩을 금지합니다." },
      { question: "단축된 주소의 QR 코드는 어떻게 다운로드하나요?", answer: "생성된 모든 링크는 하단 히스토리 트랙에 누적됩니다. 'QR 코드'를 발급하는 버튼을 누르고 간편하게 PNG 파일을 즉시 소장해 보세요." },
      { question: "만기 기간을 내 마음대로 커스텀 지정할 수 있나요?", answer: "물론입니다! 주소 등록 당시 입력 칸 옆 드롭다운 정렬 목록을 체크하면 단기 시간부터 소멸 주기를 직접 통제하실 수 있습니다." },
      { question: "이 서비스의 전체 활용은 영구 무료인가요?", answer: "저희 플랫폼 서비스는 SNS 공유 및 마케터 분들의 캠페인 활동 보조를 장려하기 위해 일체의 비용 청구 없이 무료로 동작합니다." }
    ]
  },
  ZH_TW: {
    features: [
      { title: "簡單易用", description: "無需繁瑣配置，只需一鍵即可在數秒內輕鬆縮短冗長網址。" },
      { title: "自訂字尾", description: "為宣傳活動或個人品牌建立具備高信譽度且好記的專屬短網址，全方位提升轉化效率。" },
      { title: "安全高速", description: "極速微秒級響應，配備先進網址淨化系統與安全防護協議，保證跳轉極速平穩。" },
      { title: "全平台相容", description: "所有經縮短的轉向鏈接皆針對移動端與桌上型電腦全面優化，支援各種瀏覽器流暢開啟。" },
      { title: "自訂過期時間", description: "設定動態過期倒數計時，方便於宣傳週期結束後自動停用鏈接。" },
      { title: "批次縮短", description: "透過高性能批次處理機制，一鍵同時壓縮並生成多個目標網址。" },
      { title: "QRCode 生成", description: "後台即時轉化高清自定義 QR Code，打破虛擬與實體次元邊界，便於推廣。" },
      { title: "反垃圾與防護機制", description: "智慧防火牆深度過濾惡意代碼，嚴防注入攻擊，阻擋惡意第三方欺詐網站。" }
    ],
    faqs: [
      { question: "使用 shortme.cyou 縮短網址能免受有害代碼侵害嗎？", answer: "是的。我們的安全機制會深入檢查目標鏈接，全面過濾跳轉路徑中的有害代碼並阻絕釣魚欺詐網址。" },
      { question: "我該如何下載短網址專屬的 QR Code？", answer: "所有生成好的短連接皆會條理清晰地顯示在下方歷史紀錄。點擊右側的 QR 碼圖示，即可一鍵免費匯出 PNG。" },
      { question: "我可以自行決定短網址的有效期限嗎？", answer: "當然可以！在您建立鏈接時，能利用下拉式過期選單選擇合適的時間長度，到期後跳轉服務會自動中斷。" },
      { question: "此網址縮短工具適合個人 or 商業免費使用嗎？", answer: "我們的縮網址平台對所有人完全免費開放，隨時協助您在社群媒體分享、行銷推廣以及各類專案推動。" }
    ]
  },
  AR: {
    features: [
      { title: "سهولة الاستخدام", description: "قم بتقصير روابطك الطويلة في ثوانٍ معدودة بنقرة واحدة سريعة وبدون أي إعدادات معقدة." },
      { title: "اسم مخصص للرابط", description: "أنشئ روابط مخصصة وجذابة تحمل طابع علامتك التجارية وتكون سهلة الحفظ لتناسب حملاتك الإعلانية." },
      { title: "آمن وسريع للغاية", description: "استمتع بتحويل فوري وتوجيه فائق السرعة مدعوم ببروتوكولات فحص وتنقية عميقة للروابط لحفظ أمان المستخدم." },
      { title: "متوافق مع جميع الأجهزة", description: "جميع الروابط المختصرة مستجيبة بالكامل وتعمل بكفاءة على المتصفحات، الحواسيب، والهواتف الذكية." },
      { title: "تاريخ انتهاء محدد", description: "اضبط فترات صلاحية ديناميكية وروابط تنتهي تلقائياً فور انتهاء حملاتك الإعلانية أو الترويجية لراحة بالك." },
      { title: "تقصير روابط متعددة", description: "اضغط وقصر الكثير من الروابط الطويلة معًا وفي وقت واحد بفضل نظام المعالجة والرفع بالدفعة فائق السرعة." },
      { title: "دعم رمز الاستجابة السريع (QR)", description: "احصل على رموز QR فريدة مخصصة وعالية الدقة لروابطك مباشرة لربط المطبوعات الورقية بالإنترنت بسهولة." },
      { title: "حماية ضد السبام والاحتيال", description: "دروع حماية ذكية تفحص الوجهة المقصودة وتكشف البرمجيات الخبيثة وتمنع محاولات الاختراق تماماً." }
    ],
    faqs: [
      { question: "هل استخدام shortme.cyou آمن من النصوص الخبيثة البرمجية؟", answer: "نعم، أنظمتنا مزودة بفلترة وتطهير تلقائي للروابط. نحن نفحص ونمنع الروابط الخبيثة والبرمجيات الضارة والمواقع الاحتيالية ومواقع التصيد لراحة عملاءنا." },
      { question: "كيف يمكنني تحميل رمز الاستجابة السريع (QR Code) للرابط الخاص بي؟", answer: "كل رابط تم تقصيره سيظهر مباشرة في سجل التاريخ أدناه. اضغط على أيقونة رمز الاستجابة السريع 'QR Code' بجانب زر النسخ، وحمل صورة PNG مجاناً." },
      { question: "هل أستطيع تحديد وقت وصلاحية لانتهاء الرابط؟", answer: "بالطبع! عند تعبئة الحقول، يمكنك اختيار التوقيت المفضل لانتهاء الصلاحية من القائمة المنسدلة ليتوقف توجيه الرابط تلقائياً بعد مرور الزمن." },
      { question: "هل خدمة تقصير الروابط هذه مجانية بالكامل؟", answer: "إن خدمتنا مجانية 100% للجميع لمساعدتكم ومساندة أعمالكم ومشاركتكم الروابط الاحترافية على منصات التواصل الاجتماعي بكل سهولة وسرعة." }
    ]
  }
};

export default function FaqSection({ isDark }: FaqSectionProps) {
  const { language, t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeData = (LOCALIZED_DATA[language] || LOCALIZED_DATA.EN) as { features: LocalizedFeature[]; faqs: LocalizedFaq[] };

  const featuresWithIcons = activeData.features.map((feat, idx) => {
    const icons = [
      <Sparkles className="h-5 w-5 text-indigo-505" />,
      <Fingerprint className="h-5 w-5 text-indigo-505" />,
      <ShieldCheck className="h-5 w-5 text-indigo-505" />,
      <Smartphone className="h-5 w-5 text-indigo-505" />,
      <Clock className="h-5 w-5 text-indigo-505" />,
      <Layers className="h-5 w-5 text-indigo-505" />,
      <QrCode className="h-5 w-5 text-indigo-505" />,
      <ShieldAlert className="h-5 w-5 text-indigo-505" />
    ];
    return {
      ...feat,
      icon: icons[idx] || <Sparkles className="h-5 w-5 text-indigo-505" />
    };
  });

  return (
    <div className="mt-16 space-y-12">
      {/* Dynamic Visual Feature Listing */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className={`text-2xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
            {t("advantagesTitle")}
          </h2>
          <p className={`text-xs mt-2 ${isDark ? "text-zinc-400" : "text-zinc-500 font-medium"}`}>
            {t("advantagesSub")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuresWithIcons.map((feature, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                isDark
                  ? "bg-zinc-900/40 border-zinc-805/80 hover:bg-zinc-900/70"
                  : "bg-white border-slate-200/90 hover:border-indigo-200 shadow-md shadow-slate-100"
              }`}
            >
              <div className={`p-2 w-fit rounded-lg mb-3.5 ${
                isDark ? "bg-zinc-800/80" : "bg-indigo-50"
              }`}>
                {feature.icon}
              </div>
              <h4 className={`text-sm font-bold ${isDark ? "text-zinc-100" : "text-zinc-800"}`}>
                {feature.title}
              </h4>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion List FAQ Panel */}
      <div className={`border rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ${
        isDark
          ? "bg-zinc-900/25 border-zinc-800/80"
          : "bg-white border-slate-200 shadow-xl shadow-slate-100/30"
      }`}>
        <div className="mb-6">
          <h3 className={`text-lg font-extrabold ${isDark ? "text-white" : "text-zinc-900"}`}>
            {t("faqTitle")}
          </h3>
          <p className={`text-xs mt-1 ${isDark ? "text-zinc-400" : "text-zinc-500 font-medium"}`}>
            {t("faqSub")}
          </p>
        </div>

        <div className="space-y-3.5">
          {activeData.faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className={`border rounded-xl transition-all duration-200 ${
                  isOpen
                    ? isDark
                      ? "bg-zinc-900/60 border-indigo-500/30"
                      : "bg-indigo-50/40 border-indigo-200/80"
                    : isDark
                      ? "bg-zinc-950/40 border-zinc-900 hover:border-zinc-800"
                      : "bg-slate-50/50 border-slate-150 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs transition cursor-pointer"
                >
                  <span className={isDark ? "text-zinc-200" : "text-slate-750 font-bold"}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-indigo-505" : ""
                  }`} />
                </button>

                {isOpen && (
                  <div className={`px-4 pb-4 text-xs leading-relaxed animate-fade-in ${
                    isDark ? "text-zinc-400" : "text-slate-600"
                  }`}>
                    <div className="pt-1.5 border-t border-dashed border-zinc-800" style={{ borderColor: isDark ? "#1f1f23" : "#e2e8f0" }}>
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
