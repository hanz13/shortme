import { LanguageCode } from "../i18n";

export interface ModalContent {
  about: {
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
  };
  privacy: {
    title: string;
    subtitle: string;
    intro: string;
    s1_t: string;
    s1_c: string;
    s2_t: string;
    s2_c: string;
    s3_t: string;
    s3_c: string;
  };
  terms: {
    title: string;
    subtitle: string;
    intro: string;
    s1_t: string;
    s1_c: string;
    s2_t: string;
    s2_c: string;
    s3_t: string;
    s3_c: string;
  };
  closeBtn: string;
}

export const MODAL_TRANSLATIONS: Record<LanguageCode, ModalContent> = {
  EN: {
    about: {
      title: "About Us",
      subtitle: "Blazing-fast Micro-redirects",
      p1: "shortme.cyou is a premier, latency-focused link compression and redirection platform designed for professional creators, social campaigns, and developers.",
      p2: "Built upon premium caching architectures and database pipelines, the system optimizes lookups to solve route queries at lightning speeds. By combining secure protocol filtering, customized expiring links, and clear click metrics, we enable safe sharing mechanisms for any targeted audience.",
      p3: "Our goal is to eliminate bloated redirections and messy landing processes, leaving developers and marketing strategists with perfectly clean, trustworthy short links."
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Privacy and Tracker Statement",
      intro: "At shortme.cyou, transparency represents our highest foundation point. We minimize client exposure records to secure completely risk-free navigation paths:",
      s1_t: "1. Absolute Tracker Cleanliness",
      s1_c: "We collect zero tracking cookies, coordinate profiles, tracking pixels, or advertisement campaigns. Your surfing behaviors are entirely private and invisible to our monitors.",
      s2_t: "2. Security Integrity",
      s2_c: "Client IP signatures are securely processed and compressed via hashed encryption blocks into volatile memory trackers solely to compute standard rate quotas. Raw location addresses are never written to disk.",
      s3_t: "3. Retained Shortlink Records",
      s3_c: "The platform stores origin link paths, chosen customized short-slugs, matching creation dates, and simple total activation clicks securely to yield your dashboard history screens."
    },
    terms: {
      title: "Terms & Conditions",
      subtitle: "Acceptable Use Policies",
      intro: "Welcome to shortme.cyou. By accessing our tools, dynamic micro-links, and databases, you explicitly consent to observe the strict usage rules set below:",
      s1_t: "1. Acceptable Use Only",
      s1_c: "We actively monitor redirection targets. You are strictly forbidden from compressor-shortening links that target phishing campaigns, script vulnerabilities, spam networks, credential harvesting, malware downloads, or illegal schemes.",
      s2_t: "2. Systematic Restrictions",
      s2_c: "Any abuse of the creation form, automated crawling spam, brute-force routing requests, or rate-limit saturation bypass attempts will trigger automated blocking mechanics on client origin addresses.",
      s3_t: "3. Disclaimer & Protection",
      s3_c: "Routing targets resolve transparently. We explicitly decline liability for external content hosted on designated user targets or potential outages that depend on third-party cloud infrastructure."
    },
    closeBtn: "Understood"
  },
  ID: {
    about: {
      title: "Tentang Kami",
      subtitle: "Pengalihan Mikro yang Sangat Cepat",
      p1: "shortme.cyou adalah platform kompresi dan pengalihan tautan utama yang berfokus pada latensi rendah, dirancang untuk kreator profesional, kampanye sosial, dan pengembang.",
      p2: "Dibangun di atas arsitektur caching premium dan sistem pipa basis data, sistem mengoptimalkan pencarian untuk menyelesaikan kueri rute dengan kecepatan kilat. Dengan menggabungkan pemfilteran protokol yang aman, masa kedaluwarsa tautan yang dapat disesuaikan, dan metrik klik yang jelas, kami menyediakan mekanisme berbagi yang aman untuk audiens target Anda.",
      p3: "Tujuan kami adalah menghilangkan pengalihan yang berbelit-belit dan proses mendarat yang berantakan, memberikan pengembang dan ahli strategi pemasaran tautan pendek yang bersih dan dapat dipercaya."
    },
    privacy: {
      title: "Kebijakan Privasi",
      subtitle: "Pernyataan Privasi dan Pelacak",
      intro: "Di shortme.cyou, transparansi merupakan pilar utama kami. Kami meminimalkan pencatatan aktivitas klien untuk memastikan jalur navigasi yang sepenuhnya bebas risiko:",
      s1_t: "1. Bersih dari Pelacak",
      s1_c: "Kami tidak mengumpulkan cookie pelacak, profil koordinat, piksel pelacak, atau kampanye iklan. Perilaku berselancar Anda sepenuhnya pribadi dan tidak terlihat oleh pengawas kami.",
      s2_t: "2. Integritas Keamanan",
      s2_c: "Alamat IP klien diproses dan dikompresi dengan aman melalui enkripsi hash ke dalam pelacak memori volatil murni untuk menghitung kuota batas akses. Alamat asal mentah tidak pernah disimpan di disk.",
      s3_t: "3. Penyimpanan Data Tautan",
      s3_c: "Platform menyimpan jalur tautan asal, teks pendek khusus yang dipilih, tanggal pembuatan, dan total klik aktif untuk menghasilkan layar riwayat dasbor Anda secara aman."
    },
    terms: {
      title: "Syarat & Ketentuan",
      subtitle: "Kebijakan Penggunaan yang Diperbolehkan",
      intro: "Selamat datang di shortme.cyou. Dengan mengakses alat kami, tautan mikro dinamis, dan basis data, Anda secara eksplisit menyetujui aturan penggunaan ketat di bawah ini:",
      s1_t: "1. Hanya untuk Penggunaan yang Sah",
      s1_c: "Kami aktif memantau target pengalihan. Anda sangat dilarang memperpendek tautan yang menargetkan kampanye phishing, kerentanan skrip, jaringan spam, pencurian kredensial, unduhan malware, atau skema ilegal lainnya.",
      s2_t: "2. Batasan Sistem",
      s2_c: "Setiap penyalahgunaan formulir pembuatan, spam perayapan otomatis, kueri rute paksa, atau upaya memotong kuota batas akses akan memicu pemblokiran otomatis pada IP klien asal.",
      s3_t: "3. Penafian & Perlindungan",
      s3_c: "Target rute dialihkan secara transparan. Kami menolak kewajiban atas konten eksternal yang di-host di target pengguna atau potensi gangguan yang bergantung pada infrastruktur cloud pihak ketiga."
    },
    closeBtn: "Mengerti"
  },
  ES: {
    about: {
      title: "Sobre Nosotros",
      subtitle: "Micro-redirecciones ultrarrápidas",
      p1: "shortme.cyou es una plataforma de compresión y redirección de enlaces de primer nivel orientada a la baja latencia, diseñada para creadores profesionales, campañas sociales y desarrolladores.",
      p2: "Construido sobre arquitecturas de almacenamiento en caché premium, el sistema optimiza las búsquedas para resolver consultas de rutas a velocidades relámpago. Al combinar filtrado de protocolos, expiraciones personalizadas y métricas de clics claras, facilitamos el intercambio seguro para cualquier público.",
      p3: "Nuestro objetivo es eliminar las redirecciones innecesarias y ofrecer un servicio impecable, brindando enlaces cortos confiables y limpios."
    },
    privacy: {
      title: "Política de Privacidad",
      subtitle: "Declaración de Privacidad y Rastreadores",
      intro: "En shortme.cyou, la transparencia es nuestra mayor prioridad. Minimizamos los datos de exposición del cliente para garantizar una navegación libre de riesgos:",
      s1_t: "1. Limpieza Absoluta de Rastreadores",
      s1_c: "No recopilamos cookies de seguimiento, perfiles de coordenadas, píxeles de seguimiento ni campañas publicitarias. Sus hábitos de navegación son completamente privados.",
      s2_t: "2. Integridad de Seguridad",
      s2_c: "Las firmas de IP se procesan de forma segura mediante cifrado hash para calcular las cuotas del límite de tasa. Las direcciones IP sin procesar nunca se guardan en el disco.",
      s3_t: "3. Registros Conservados",
      s3_c: "La plataforma almacena rutas de origen, alias personalizados elegidos, fechas de creación e historial de clics seguro para generar sus métricas en el panel."
    },
    terms: {
      title: "Términos y Condiciones",
      subtitle: "Políticas de Uso Aceptable",
      intro: "Bienvenido a shortme.cyou. Al acceder a nuestras herramientas y bases de datos, acepta cumplir estrictamente con las reglas de uso establecidas a continuación:",
      s1_t: "1. Solo Uso Aceptable",
      s1_c: "Monitoreamos activamente los destinos. Queda estrictamente prohibido acortar enlaces que apunten a phishing, spam, malware, robo de credenciales u otros esquemas ilegales.",
      s2_t: "2. Restricciones del Sistema",
      s2_c: "Cualquier abuso del formulario, solicitudes de fuerza bruta o intentos de saltarse los límites de tasa activarán bloqueos automáticos en las direcciones IP de origen.",
      s3_t: "3. Descargo de Responsabilidad",
      s3_c: "Las rutas se resuelven de manera transparente. No asumimos ninguna responsabilidad por el contenido de los sitios externos de destino."
    },
    closeBtn: "Entendido"
  },
  DE: {
    about: {
      title: "Über Uns",
      subtitle: "Blitzschnelle Mikro-Weiterleitungen",
      p1: "shortme.cyou ist eine erstklassige, latenzoptimierte Plattform zur Link-Kompression und -Weiterleitung für professionelle Entwickler, soziale Kampagnen und Ersteller.",
      p2: "Das System basiert auf Premium-Caching-Architekturen zur Beschleunigung von Suchanfragen. Mit sicherem Protokoll-Filtering, benutzerdefinierten Ablauffristen und klaren Klick-Metriken ermöglichen wir sicheres Teilen für jeden Zweck.",
      p3: "Unser Ziel ist es, aufgeblähte Weiterleitungen zu eliminieren und Entwicklern saubere, vertrauenswürdige Kurzlinks bereitzustellen."
    },
    privacy: {
      title: "Datenschutzrichtlinie",
      subtitle: "Datenschutz- und Tracker-Erklärung",
      intro: "Bei shortme.cyou steht Transparenz an erster Stelle. Wir minimieren Datenaufzeichnungen, um sichere Navigationspfade zu gewährleisten:",
      s1_t: "1. Absolute Tracker-Sauberkeit",
      s1_c: "Wir erfassen keine Tracking-Cookies, Standortprofile, Pixel-Tracker oder Werbe-Kampagnen. Ihr Surfverhalten bleibt vollständig privat.",
      s2_t: "2. Sicherheitsintegrität",
      s2_c: "IP-Adressen werden verschlüsselt und flüchtig aufbewahrt, um Standard-Zutrittsquoten zu verwalten. Unverschlüsselte IP-Adressen werden niemals fest gespeichert.",
      s3_t: "3. Gespeicherte Kurzlink-Historie",
      s3_c: "Die Plattform speichert Ursprungs-URLs, gewünschte Kurz-Kombinationen, Erstellungsdaten und Klickzahlen für Ihr persönliches Dashboard."
    },
    terms: {
      title: "Nutzungsbedingungen",
      subtitle: "Nutzungsrichtlinien",
      intro: "Willkommen bei shortme.cyou. Mit dem Zugriff auf unsere Funktionen und Link-Verzeichnisse akzeptieren Sie die folgenden Bedingungen vollumfänglich:",
      s1_t: "1. Zulässige Nutzung",
      s1_c: "Wir überprüfen Ziel-URLs aktiv. Der Missbrauch zur Erstellung von Phishing-Links, Spam-Netzwerken, Viren-Downloads oder betrügerische Schemata ist strengstens verboten.",
      s2_t: "2. Systematische Einschränkungen",
      s2_c: "Jegliche Überlastung des Formulars, automatisiertes Crawling oder Umgehungsversuche der API-Grenzwerte führen zum Ausschluss der IP-Adresse.",
      s3_t: "3. Haftungsausschluss",
      s3_c: "Wir haften nicht für externe Inhalte auf den Weiterleitungszielen oder für Ausfälle von beteiligten Cloud-Infrastrukturen."
    },
    closeBtn: "Verstanden"
  },
  FR: {
    about: {
      title: "À Propos",
      subtitle: "Micro-redirections ultra-rapides",
      p1: "shortme.cyou est une plateforme de compression et de redirection d'URL axée sur la performance pour les créateurs, campagnes et professionnels.",
      p2: "Notre architecture de cache premium garantit le traitement instantané des requêtes. En unissant filtres de sécurité, liens temporaires et mesures analytiques, nous fournissons un cadre d'échange fiable.",
      p3: "Nous visons l'élimination des redirections superflues pour n'offrir que des adresses courtes, nettes et sûres."
    },
    privacy: {
      title: "Politique de Confidentialité",
      subtitle: "Déclaration de traceurs et données",
      intro: "Chez shortme.cyou, la confidentialité est absolue. Nous limitons au strict minimum les données traitées :",
      s1_t: "1. Absence Totale de Traceurs",
      s1_c: "Aucun cookie de suivi, ciblage publicitaire ou profil géographique n'est employé chez nous. Vos visites demeurent strictement anonymes.",
      s2_t: "2. Sécurisation Éphémère",
      s2_c: "Les adresses IP sont hachées et stockées en mémoire volatile uniquement à des fins de contrôle de flux. Aucun enregistrement direct n'est effectué sur disque.",
      s3_t: "3. Données de Redirection",
      s3_c: "Nous conservons de manière sécurisée l'URL de destination, l'alias raccourci, la date de création et l'historique des clics pour alimenter votre rapport."
    },
    terms: {
      title: "Conditions d'Utilisation",
      subtitle: "Politique d'usage autorisé",
      intro: "Bienvenue sur shortme.cyou. En exploitant nos services, vous vous engagez à respecter rigoureusement les prérequis suivants :",
      s1_t: "1. Utilisation Légale Uniquement",
      s1_c: "Nous surveillons activement la pertinence des liens. La génération d'adresses pointant vers du piratage, du phishing, des virus ou du vol de coordonnées est formellement interdite.",
      s2_t: "2. Restrictions Techniques",
      s2_c: "Tout abus, requête industrielle outrancière ou contournement des protections entraînera le blocage immédiat des accès concernés.",
      s3_t: "3. Clause de Limites",
      s3_c: "Le transfert de requêtes se fait de façon transparente. Nous déclinons toute responsabilité légale quant au contenu exposé par les utilisateurs finaux."
    },
    closeBtn: "Compris"
  },
  BG: {
    about: {
      title: "За Нас",
      subtitle: "Светкавично бързи микро-пренасочвания",
      p1: "shortme.cyou е първокласна платформа за съкращаване и пренасочване на връзки, създадена за професионалисти и разработчици.",
      p2: "Използва бързи технологии за кеширане, за да разреши заявките за навигация в рамките на милисекунди.",
      p3: "Нашата мисия е да предоставим сигурни, лесни за управление и чисти цифрови адреси."
    },
    privacy: {
      title: "Поверителност",
      subtitle: "Политика за защита на данните",
      intro: "Ние ценим вашата поверителност. Не събираме бисквитки или рекламни проследяващи кодове.",
      s1_t: "1. Без Проследяване",
      s1_c: "Вашето поведение в мрежата остава изцяло лично и анонимно.",
      s2_t: "2. Сигурност на IP",
      s2_c: "IP адресите са криптирани в оперативна памет за защита на системата срещу злоупотреби.",
      s3_t: "3. Съхранявани Данни",
      s3_c: "Записват се само оригиналният URL, съкратеният код и брой кликвания за статистика."
    },
    terms: {
      title: "Общи Условия",
      subtitle: "Правила за приемлива употреба",
      intro: "Ползвайки shortme.cyou, вие приемате следните правила:",
      s1_t: "1. Забранено съдържание",
      s1_c: "Забранено е съкращаването на линкове към измами, кражба на пароли, вируси или хакерски атаки.",
      s2_t: "2. Технически лимити",
      s2_c: "Опитите за пренатоварване на формата или заобикаляне на лимитите водят до автоматичен бан.",
      s3_t: "3. Отговорност",
      s3_c: "Не носим отговорност за крайното съдържание на външните уеб сайтове."
    },
    closeBtn: "Разбрах"
  },
  BN: {
    about: {
      title: "আমাদের সম্পর্কে",
      subtitle: "তাত্ক্ষণিক ও দ্রুত পুনঃনির্দেশ",
      p1: "shortme.cyou হল পেশাদার ব্যবহারকারীদের এবং ডেভেলপারদের জন্য একটি উন্নত লিঙ্ক সংক্ষিপ্তকরণ প্ল্যাটফর্ম।",
      p2: "উচ্চ গতির ক্যাশিং ও উন্নত ডাটা পাইপলাইনের সাহায্যে লিঙ্ক রিডাইরেকশানের কাজ অত্যন্ত দ্রুত করা হয়।",
      p3: "পরিপাটি ও বিশ্বাসযোগ্য লিংক তৈরি করাই আমাদের প্রধান উদ্দেশ্য।"
    },
    privacy: {
      title: "গোপনীয়তা নীতি",
      subtitle: "গোপনীয়তার নিশ্চয়তা বিবরণ",
      intro: "আপনার গোপনীয়তা রক্ষা করা আমাদের প্রথম অঙ্গীকার। আমরা ন্যূনতম ডেটা সংগ্রহ করি:",
      s1_t: "১. কোনো ট্র্যাকার নেই",
      s1_c: "আমরা কোনো ট্র্যাকিং কুকি, বিজ্ঞাপন বা অবস্থান সংক্রান্ত ব্যক্তিগত তথ্য সংগ্রহ করি না।",
      s2_t: "২. ডেটা নিরাপত্তা",
      s2_c: "অস্থায়ী মেমরিতে আইপি এনক্রিপ্ট করে স্প্যাম বা অতিরিক্ত হিট প্রতিরোধ করা হয়।",
      s3_t: "৩. সংরক্ষিত তথ্য",
      s3_c: "শুধুমাত্র মূল ইউআরএল, সংক্ষিপ্ত কোড এবং মোট কতবার ভিজিট করা হলো তা সংরক্ষিত থাকে।"
    },
    terms: {
      title: "শর্তাবলী",
      subtitle: "ব্যবহারের নির্দেশিকা",
      intro: "shortme.cyou ব্যবহার করার মাধ্যমে আপনি নিম্নলিখিত শর্তাবলী মেনে নিতে সম্মতি প্রদান করছেন:",
      s1_t: "১. সৎ ব্যবহার",
      s1_c: "ফিশিং, স্প্যাম, ম্যালওয়্যার বা লাইসেন্সবিহীন কোনো অবৈধ কাজের জন্য লিঙ্ক ছোট করা সম্পূর্ণ নিষিদ্ধ।",
      s2_t: "২. কারিগরি সীমা",
      s2_c: "অতিরিক্ত হিট বা রোবট ক্রলিং করার চেষ্টা করলে আইপি ব্লক করে দেওয়া হবে।",
      s3_t: "৩. দায়মুক্তি",
      s3_c: "কোনো ব্যবহারকারী বাহ্যিকভাবে কোনো সাইটে কি কনটেন্ট রেখেছেন, তার জন্য আমরা দায়ী নই।"
    },
    closeBtn: "বুঝেছি"
  },
  HE: {
    about: {
      title: "אודותינו",
      subtitle: "הפניות מיקרו מהירות במיוחד",
      p1: "shortme.cyou היא פלטפורמת קיצור והפניית קישורים מתקדמת המתמקדת במהירות וביצועים.",
      p2: "באמצעות טכנולוגיית מטמון מתקדמת, המערכת פותרת הפניות בתוך מילישניות בודדות.",
      p3: "המטרה שלנו היא לספק קישורים קצרים, נקיים ובטוחים לשימוש."
    },
    privacy: {
      title: "מדיניות פרטיות",
      subtitle: "הצהרת פרטיות ומעקב",
      intro: "השקיפות היא חלק מרכזי בערכים שלנו. השימוש בנתונים הוא מינימלי בהחלט:",
      s1_t: "1. נקי לחלוטין ממעקבים",
      s1_c: "איננו אוספים קובצי מעקב (עוגיות), קוד מעקב או פרסומות. הגלישה שלכם פרטית לחלוטין.",
      s2_t: "2. אבטחה והצפנת IP",
      s2_c: "כתובות IP מוצפנות ונשמרות בזיכרון זמני לניהול מגבלות שימוש ולא נשמרות בדיסק המערכת.",
      s3_t: "3. נתונים שמורים",
      s3_c: "אנו שומרים רק את הקישור המקורי, הקוד המקוצר, תאריך היצירה וכמות הלחיצות."
    },
    terms: {
      title: "תנאי שימוש",
      subtitle: "מדיניות שימוש הוגן",
      intro: "ברוכים הבאים ל-shortme.cyou. בשימוש בשירותים שלנו הנך מסכים לכללים הבאים:",
      s1_t: "1. שימוש חוקי בלבד",
      s1_c: "חל איסור מוחלט לקצר קישורים המפנים להונאה (Phishing), תוכנות זדוניות, ספאם או פעולות בלתי חוקיות.",
      s2_t: "2. מגבלות טכנולוגיות",
      s2_c: "כל ניסיון לערוך מניפולציות על טפסי המערכת או לעקוף מגבלות קצב יגרור חסימה אוטומטית.",
      s3_t: "3. הגבלת אחריות",
      s3_c: "איננו נושאים באחריות על התכנים החיצוניים המארחים על ידי המשתמשים באתרי היעד."
    },
    closeBtn: "הבנתי"
  },
  HI: {
    about: {
      title: "हमारे बारे में",
      subtitle: "तेज़ माइक्रो-रीडायरेक्शन",
      p1: "shortme.cyou पेशेवर रचनाकारों और डेवलपर्स के लिए एक अत्यंत तेज़ लिंक संपीड़न प्लेटफॉर्म है।",
      p2: "उन्नत कैशिंग आर्किटेक्चर की बदौलत यह सिस्टम कुछ ही मिलीसेकेंड में रीडायरेक्शन पूरा करता है।",
      p3: "हमारा उद्देश्य आपको पूरी तरह से सुरक्षित, छोटे और साफ-सुथरे लिंक प्रदान करना है।"
    },
    privacy: {
      title: "गोपनीयता नीति",
      subtitle: "गोपनीयता और ट्रैकर विवरण",
      intro: "पारदर्शिता ही हमारा मुख्य आधार है। हम कम से कम डेटा रिकॉर्ड करते हैं:",
      s1_t: "1. कोई ट्रैकर नहीं",
      s1_c: "हम कोई ट्रैकिंग कुकीज़, विज्ञापन पिक्सेल या व्यक्तिगत प्रोफ़ाइल डेटा एकत्र नहीं करते हैं।",
      s2_t: "2. सुरक्षा अखंडता",
      s2_c: "उपयोगकर्ताओं के आईपी को केवल दर सीमा निर्धारित करने के लिए अस्थायी मेमोरी में सुरक्षित रूप से हैश किया जाता है।",
      s3_t: "3. संग्रहीत डेटा",
      s3_c: "हम केवल ओरिजिनल यूआरएल, चुने गए शॉर्ट कोड और कुल क्लिक संख्या को ही सहेजते हैं।"
    },
    terms: {
      title: "नियम और शर्तें",
      subtitle: "स्वीकार्य उपयोग नीतियां",
      intro: "shortme.cyou में आपका स्वागत है। हमारे टूल्स का उपयोग करके आप इन नियमों का पालन करने की सहमति देते हैं:",
      s1_t: "1. केवल वैध उपयोग",
      s1_c: "धोखाधड़ी (Phishing), स्पैम, वायरस डाउनलोड या किसी भी अवैध गतिविधियों से जुड़े लिंक को छोटा करना प्रतिबंधित है।",
      s2_t: "2. तकनीकी प्रतिबंध",
      s2_c: "सिस्टम का दुरुपयोग करने या अत्यधिक अनुरोध भेजकर सर्वर लोड बढ़ाने पर ऑटो-ब्लॉक किया जाएगा।",
      s3_t: "3. अस्वीकरण",
      s3_c: "हम उपयोगकर्ताओं के अंतिम गंतव्य यूआरएल की सामग्री के लिए जिम्मेदार नहीं हैं।"
    },
    closeBtn: "समझ गया"
  },
  IT: {
    about: {
      title: "Chi Siamo",
      subtitle: "Micro-reindirizzamenti ultra-rapidi",
      p1: "shortme.cyou è una piattaforma premium di redirezione e accorciamento URL ad alte prestazioni ideata per professionisti, sviluppatori e campagne.",
      p2: "Grazie ad algoritmi avanzati, ottimizziamo i tempi di lookup per garantire deviazioni istantanee. Sicurezza, scadenza personalizzata dei link e contatori precisi sono la nostra priorità.",
      p3: "Vogliamo liberare il web da collegamenti confusi e non sicuri."
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Informativa sulla privacy",
      intro: "La trasparenza è il nucleo del nostro servizio. Riduciamo l'esposizione dei dati al minimo:",
      s1_t: "1. Pulizia Totale dei Tracker",
      s1_c: "Non raccogliamo cookie di tracciamento, profili pubblicitari o pixel invisibili. La vostra privacy è garantita.",
      s2_t: "2. Protezione dell'indirizzo IP",
      s2_c: "Gli indirizzi IP dei visitatori vengono elaborati temporaneamente per motivi di sicurezza contro gli attacchi bruteforce.",
      s3_t: "3. Record Conservati",
      s3_c: "Conserviamo solo l'URL originale, il codice accorciato generato e i totali aritmetici dei clic."
    },
    terms: {
      title: "Termini e Condizioni",
      subtitle: "Condizioni d'uso del servizio",
      intro: "Benvenuto su shortme.cyou. Accedendo alla piattaforma acconsenti ad osservare le seguenti norme d'uso:",
      s1_t: "1. Esclusivo Uso Legittimo",
      s1_c: "È severamente vietato accorciare link che riconducano a campagne malware, truffe di phishing, estorsione o software illegali.",
      s2_t: "2. Restrizioni di Abuso",
      s2_c: "Qualsiasi comportamento automatico nocivo o superamento dei limiti di sicurezza comporterà il ban dell'IP.",
      s3_t: "3. Clausola Liberatoria",
      s3_c: "Non gestiamo e non siamo responsabili per i contenuti esterni ospitati sulle destinazioni collegate dai singoli utenti."
    },
    closeBtn: "Compreso"
  },
  JA: {
    about: {
      title: "私たちについて",
      subtitle: "超高速のマイクロ・リダイレクト",
      p1: "shortme.cyouは、プロのクリエイター、社会的キャンペーン、開発者のために設計された低遅延のURL短縮・転送プラットフォームです。",
      p2: "プレミアムキャッシュ構造により、リダイレクト処理をミリ秒単位で解決します。安全な転送フィルターとクリック分析を兼ね備えています。",
      p3: "乱雑なURLをシンプルで信頼性の高い短縮リンクへと最適化します。"
    },
    privacy: {
      title: "プライバシーポリシー",
      subtitle: "データプライバシーについて",
      intro: "透明性は当サービスにおいて最も重要です。収集するデータは最小限です：",
      s1_t: "1. トラッカーの全面的な排除",
      s1_c: "トラッキングクッキーや追跡ピクセル、広告用プロファイルは一切収集しません。行動履歴は非公開です。",
      s2_t: "2. セキュリティとIPハッシュ化",
      s2_c: "IPアドレスはメモリ上でのみハッシュ化され安全に処理され、レートリミット監視のためだけに使用されます。",
      s3_t: "3. 保持データ",
      s3_c: "作成された元URL、短縮コード、作成日時、およびクリック数のみを蓄積します。"
    },
    terms: {
      title: "利用規約",
      subtitle: "許容される利用要件",
      intro: "shortme.cyouをご利用いただきありがとうございます。当ツールへのアクセスにより、以下を遵守することに同意したものとみなします：",
      s1_t: "1. 合法的な利用に限定",
      s1_c: "フィッシング詐欺、スパム、マルウェアのダウンロード、不正アクセス目的での利用は禁止されています。",
      s2_t: "2. システム上の制限",
      s2_c: "大量リクエストや自動スクリプトによる負荷行為、制限回避の試みはIPブロックの対象となります。",
      s3_t: "3. 免責事項",
      s3_c: "リンク先の外部サーバー上のコンテンツ、およびプロバイダーの障害等については一切責任を負いません。"
    },
    closeBtn: "了解"
  },
  PT: {
    about: {
      title: "Sobre Nós",
      subtitle: "Micro-redirecionamentos Ultrarrápidos",
      p1: "shortme.cyou é uma plataforma premium de redirecionamento e compressão de links projetada para criadores e desenvolvedores profissionais.",
      p2: "Com arquitetura de cache otimizada, as buscas de caminhos são processadas instantaneamente no menor intervalo de milissegundos.",
      p3: "Fornecemos atalhos eficientes, transparentes e completamente limpos."
    },
    privacy: {
      title: "Política de Privacidade",
      subtitle: "Declaração de Rastreio e Privacidade",
      intro: "Sua privacidade é a nossa bandeira. Nós minimizamos ao máximo o uso de registros:",
      s1_t: "1. Limpeza de Trackers",
      s1_c: "Não adotamos cookies de rastreamento de publicidade nem perfis comportamentais. Navegação estritamente protegida.",
      s2_t: "2. Integridade dos IPs",
      s2_c: "Os endereços IP dos clientes são processados e armazenados apenas temporariamente em cache volátil contra spambots.",
      s3_t: "3. Informações Salvas",
      s3_c: "Apenas persistimos o link original, código curto gerado e a estatística simples de cliques."
    },
    terms: {
      title: "Termos e Condições",
      subtitle: "Uso Aceitável",
      intro: "Bem-vindo ao shortme.cyou. Ao interagir com nossos servidores, você declara plena concordância com os limites abaixo:",
      s1_t: "1. Somente Fins Lícitos",
      s1_c: "É vedado curto-circuitar links que propaguem engenharia social, phishing, roubo de senhas ou vírus nocivos.",
      s2_t: "2. Restrições aos Crawlers",
      s2_c: "Uso abusivo e tentativas de exaustão das cotas da API serão contidos através de bloqueios automáticos de firewall.",
      s3_t: "3. Exclusão de Danos",
      s3_c: "Não respondemos civil ou criminalmente pelo teor das páginas externas apontadas pelos usuários finais."
    },
    closeBtn: "Entendido"
  },
  PL: {
    about: {
      title: "O Nas",
      subtitle: "Błyskawiczne przekierowania mikro-adresów",
      p1: "shortme.cyou to zaawansowana technicznie platforma skracania i przekierowywania linków o minimalnym opóźnieniu.",
      p2: "Podstawę architektury stanowi system pamięci podręcznej, który błyskawicznie przetwarza żądania ruterów.",
      p3: "Udostępniamy programistom oraz twórcom całkowicie darmowe i bezpieczne narzędzie share."
    },
    privacy: {
      title: "Polityka Prywatności",
      subtitle: "Informator o przechowywaniu danych",
      intro: "Przejrzystość oraz ochrona użytkowników to kluczowe elementy naszego kodeksu:",
      s1_t: "1. Brak jakichkolwiek trackerów",
      s1_c: "Nie instalujemy plików cookie, pikseli śledzących ani kampanii reklamowych. Twoja aktywność jest anonimowa.",
      s2_t: "2. Bezpieczne przetwarzanie IP",
      s2_c: "Adresy IP uczestników podlegają tymczasowemu zaszyfrowaniu w celu zapobiegania atakom typu brute-force.",
      s3_t: "3. Logi statystyczne",
      s3_c: "Zbieramy wyłącznie ścieżki linków, ich unikalny kod, dzień zapisu oraz prosty licznik odwiedzin."
    },
    terms: {
      title: "Regulamin",
      subtitle: "Warunki bezpiecznego użytkowania",
      intro: "Dostęp do serwisu oznacza wyraźne poddanie się oraz akceptację poniższego regulaminu operacyjnego shortme.cyou:",
      s1_t: "1. Zgodność z prawem",
      s1_c: "Stanowczo zabrania się skracania adresów prowadzących do stron phishingowych, wirusów lub innych szkodliwych witryn.",
      s2_t: "2. Autoblokady",
      s2_c: "W przypadku wykrycia nadużyć systemu lub prób wysyłania spamu automatycznie blokujemy adres IP.",
      s3_t: "3. Odpowiedzialność",
      s3_c: "Nie ponosimy żadnej odpowiedzialności cywilnej za treść końcową stron należących do osób trzecich."
    },
    closeBtn: "Rozumiem"
  },
  RU: {
    about: {
      title: "О Нас",
      subtitle: "Мгновенное перенаправление ссылок",
      p1: "shortme.cyou — это высокотехнологичная платформа для сжатия и перенаправления URL-адресов с низкой задержкой.",
      p2: "Наше быстрое кэширование гарантирует, что переходы по коротким адресам обрабатываются за миллисекунды.",
      p3: "Мы создаем чистые и безопасные ссылки для обмена в социальных сетях и блогах."
    },
    privacy: {
      title: "Конфиденциальность",
      subtitle: "Политика конфиденциальности",
      intro: "Честность — наш приоритет. Мы не собираем личную информацию пользователей веба:",
      s1_t: "1. Никаких трекеров",
      s1_c: "Мы не используем рекламные файлы cookie, пиксели отслеживания или профилирование. Ваша жизнь скрыта.",
      s2_t: "2. Безопасность IP",
      s2_c: "IP-адреса кэшируются во временной памяти исключительно для защиты от спам-атак и флуда.",
      s3_t: "3. Базовая статистика",
      s3_c: "Мы записываем только целевой URL, созданный короткий код, дату сохранения и общее число кликов."
    },
    terms: {
      title: "Правила Использования",
      subtitle: "Условия приемлемого использования",
      intro: "Добро пожаловать в shortme.cyou. Применяя наши инструменты, вы соглашаетесь со следующими условиями:",
      s1_t: "1. Законное использование",
      s1_c: "Запрещается создавать ссылки на фишинговые ресурсы, сайты с опасными скриптами, спам или вирусы.",
      s2_t: "2. Технические ограничения",
      s2_c: "Попытки перегрузки системы запросами или парсинга страниц повлекут автоматическую блокировку IP.",
      s3_t: "3. Отказ от претензий",
      s3_c: "Мы не несем ответственности за информацию на сайтах, к которым ведут созданные вами сокращенные URL."
    },
    closeBtn: "Понятно"
  },
  VI: {
    about: {
      title: "Giới Thiệu",
      subtitle: "Chuyển Hướng Siêu Tốc Độ",
      p1: "shortme.cyou là nền tảng nén và chuyển hướng liên kết chuẩn mực tối ưu hóa băng thông cho nhà phát triển, creators.",
      p2: "Được tích hợp bộ đệm tối tân giúp chuyển tuyến nhanh nhất trong tíc tắc mà không có độ trễ hệ thống.",
      p3: "Mục tiêu duy nhất của chúng tôi là sản xuất những liên kết ngắn cực sạch và đáng tin cậy."
    },
    privacy: {
      title: "Bảo Mật",
      subtitle: "Cam kết an toàn dữ liệu khách hàng",
      intro: "Tại shortme.cyou, sự minh bạch là cam kết lớn nhất. Chúng tôi hạn chế lưu trữ lịch sử hoạt động:",
      s1_t: "1. Không Dùng Trình Thu Thập",
      s1_c: "Chúng tôi cam kết không cài cắm cookies quảng cáo, theo dõi vị trí hay tiếp thị liên kết ẩn.",
      s2_t: "2. An Toàn IP",
      s2_c: "Địa chỉ IP người dùng được nén mã hóa lưu giữ trên bộ nhớ tạm để phục vụ quản lý lưu lượng chống spam.",
      s3_t: "3. Nhập Liệu Tối Giản",
      s3_c: "Chỉ lưu giữ đường dẫn gốc, tên slug ngẫu nhiên, ngày tạo và tổng lượt truy cập."
    },
    terms: {
      title: "Điều Khoản",
      subtitle: "Quy ước điều khoản sử dụng",
      intro: "Chào mừng quý khách tới shortme.cyou. Việc truy cập sử dụng công cụ của chúng tôi đồng nghĩa bạn chấp thuận các quy chuẩn dưới đây:",
      s1_t: "1. Sử Dụng Đúng Mục Đích Lành Mạnh",
      s1_c: "Nghiêm cấm hành vi nén các đường dẫn liên quan mạo danh lừa đảo (phishing), virus, mã độc hoặc đánh cắp thông tin cá nhân.",
      s2_t: "2. Giới Hạn Tần Suất",
      s2_c: "Mọi nỗ lực can thiệp tự động tạo hàng loạt liên kết lớn hoặc spam yêu cầu sẽ bị máy chủ chặn IP tức thì.",
      s3_t: "3. Phạm Vi Trách Nhiệm",
      s3_c: "Chúng tôi không chịu bất cứ trách nhiệm pháp lý nào về nội dung của các trang web đích do người dùng cài đặt."
    },
    closeBtn: "Đã Hiểu"
  },
  TR: {
    about: {
      title: "Hakkımızda",
      subtitle: "Yıldırım Hızında Mikro Yönlendirmeler",
      p1: "shortme.cyou, geliştiriciler ve sosyal medya yöneticileri için sıfır gecikmeli bağlantı kısaltma aracıdır.",
      p2: "Uç önbellek mimarimiz sayesinde yönlendirme isteklerini milisaniyeler düzeyinde çözer.",
      p3: "Hedefimiz güvenilir, temiz ve profesyonel kısa link altyapısı sunmaktır."
    },
    privacy: {
      title: "Gizlilik Politikası",
      subtitle: "Gizlilik ve İzleyici Bildirgesi",
      intro: "shortme.cyou'da şeffaflık temel ilkemizdir. Kullanıcılardan en az miktarda veri toplarız:",
      s1_t: "1. İzleyici ve Reklam Karşıtlığı",
      s1_c: "Reklam çerezleri, izleme pikselleri ya da sosyal kimlik profilleri toplamıyoruz. Verileriniz size özeldir.",
      s2_t: "2. IP Adresi Güvenliği",
      s2_c: "İstemci IP adresleri sunucu trafiğini ve spam istekleri denetlemek için geçici bellekte şifrelenir.",
      s3_t: "3. Kayıtlı Bilgiler",
      s3_c: "Yalnızca yönlendirilen orijinal makro adresi, kısaltılmış kodu, oluşturulma tarihini ve tıklama sayılarını saklarız."
    },
    terms: {
      title: "Kullanım Şartları",
      subtitle: "Kabul Edilebilir Kullanım Politikaları",
      intro: "shortme.cyou'ya hoş geldiniz. Hizmetlerimize erişerek aşağıdaki kurallara uymayı kabul etmiş olursunuz:",
      s1_t: "1. Yalnızca Yasal Kullanım",
      s1_c: "Sistem üzerinde oltalama (phishing), zararlı yazılım dağıtımı, şifre çalma veya yasa dışı sitelere yönlendirme yapılamaz.",
      s2_t: "2. Sistematik Engeller",
      s2_c: "Aşırı yük oluşturma, bot trafiği basma ya da limitleri dolanma girişimleri IP'nin kapatılmasına yol açacaktır.",
      s3_t: "3. Sorumluluk Sınırı",
      s3_c: "Bağlantı yönlendirilen harici internet sitelerinin içeriklerinden ötürü Shortme hiçbir sorumluluk üstlenmez."
    },
    closeBtn: "Anladım"
  },
  KO: {
    about: {
      title: "소개",
      subtitle: "초고속 마이크로 리다이렉트",
      p1: "shortme.cyou는 전문 크리에이터와 개발자를 위해 설계된 대기시간 최소화 방식의 URL 단축 및 리다이렉션 서비스입니다.",
      p2: "우수한 캐싱 인프라를 바탕으로 유입 경로 처리를 밀리초 단위로 수습하고 신뢰할 수 있는 전송 흐름을 완성합니다.",
      p3: "잡다한 연계 주소들을 완벽하게 다듬어진 짧은 주소로 정리 제공합니다."
    },
    privacy: {
      title: "개인정보 처리방침",
      subtitle: "개인정보 및 트래커 방침",
      intro: "우리는 투명성을 최고 가치로 생각합니다. 개인정보 기록 보존은 최소화합니다:",
      s1_t: "1. 완전무결한 트래커 금지",
      s1_c: "어떠한 쿠키, 맞춤 광고용 프로필 정보, 트래킹 픽셀 등을 수집하지 않으므로 사용자의 웹 행위는 안전합니다.",
      s2_t: "2. 보안 무결성 수립",
      s2_c: "무한 반복 등 과도한 사용 제한 규격을 분석하고자 IP 주소의 임시 해시만을 저장소 메모리 안에서 연산합니다.",
      s3_t: "3. 보관 데이터 형태",
      s3_c: "단독 관리 화면을 구축할 수 있도록 설정된 원본 링크 경로, 단축 전용 코드, 보관 생성 기일, 클릭 카운트만 보관합니다."
    },
    terms: {
      title: "이용 약관",
      subtitle: "수용 가능한 이용 준칙",
      intro: "shortme.cyou를 찾아주셔서 감사드립니다. 해당 솔루션을 기동할 시 다음 사용 기준을 준수하는데 동의하시게 됩니다:",
      s1_t: "1. 적법한 가치 사용",
      s1_c: "메일 피싱 사기, 시스템 취약점을 유인하는 스크립트 배포, 불법 다운로드 배너 등을 내포한 주소의 등록을 절대 금지합니다.",
      s2_t: "2. 시스템적 악용 방지",
      s2_c: "자동화된 매크로 등록 시도, 봇 스팸 유입, 비정상적 가속 요청을 보낼 시 해당 가동 단말의 즉각적인 접속을 금합니다.",
      s3_t: "3. 귀책의 한계",
      s3_c: "회원 또는 비회원이 임의로 연계한 외부 목적지 웹사이트의 내부 가치 결과물에 대해서는 어떠한 책임도 지지 않습니다."
    },
    closeBtn: "확인하였습니다"
  },
  ZH_TW: {
    about: {
      title: "關於我們",
      subtitle: "極速微型跳轉平台",
      p1: "shortme.cyou 是一款專為專業創作者、行銷推廣和開發人員設計，主打極低延遲的短連結與網址跳轉平台。",
      p2: "基於優質快取系統，我們以毫秒級速度優化路由查詢。提供安全的協定過濾和清晰的點擊統計。",
      p3: "我們的願景是消除臃腫與混亂的網址尋址，留下最乾淨、最值得信任的短網址系統。"
    },
    privacy: {
      title: "隱私政策",
      subtitle: "隱私聲明與不追蹤聲明",
      intro: "在 shortme.cyou，透明度是我們的基石。我們將訪客曝露的資料降至最低：",
      s1_t: "1. 乾淨的不追蹤標準",
      s1_c: "本站完全不收集追蹤 Cookie、地理座標定位、廣告像素或進行營利宣傳。您的流覽行爲完全保密。",
      s2_t: "2. 安全性與 IP 保護",
      s2_c: "僅在易失性記憶體快取中對訪客 IP 進行雜湊加密與比對，以維護基本的速率限制。未經雜湊的 IP 不會儲存至硬碟。",
      s3_t: "3. 保存的數據結構",
      s3_c: "為產生您的歷史紀錄儀表板，我們僅保存原始連結、特定短代碼、創建日期與點擊計數。"
    },
    terms: {
      title: "服務條款",
      subtitle: "網路可容許使用規範",
      intro: "歡迎來到 shortme.cyou。存取我們的系統與動態網址即代表您明确同意並遵守以下規則：",
      s1_t: "1. 僅限合法用途",
      s1_c: "我們定期抽查網址。嚴格禁止縮短指向釣魚網站、詐騙網頁、木馬病毒散播、惡意下載或不法組織的網址。",
      s2_t: "2. 系統性濫用",
      s2_c: "任何利用腳本進行自動化註冊、爬蟲垃圾回覆或暴力猜測行為將觸發防禦並對來源 IP 進行自动黑名單處置。",
      s3_t: "3. 免責聲明",
      s3_c: "短連結完全透明跳轉。因此，我們對於第三方用戶自行連結與架設的站點內容及其衍生的損害，概不承擔責任。"
    },
    closeBtn: "完全理解"
  },
  AR: {
    about: {
      title: "من نحن",
      subtitle: "إعادة توجيه متناهية السرعة والدقة",
      p1: "shortme.cyou عبارة عن منصة متميزة في تقصير وعنونة الروابط بسرعة متناهية، مخصصة للمطورين والمبدعين المؤثرين في الشبكات الاجتماعية.",
      p2: "نعتمد على معمارية تخزين مؤقت ممتازة من أجل حل ومعالجة مسارات الانتقال خلال أجزاء صغيرة من الميلي ثانية.",
      p3: "هدفنا النهائي هو توفير روابط قصيرة آمنة وموثوقة خالية من التعقيدات."
    },
    privacy: {
      title: "سياسة الخصوصية",
      subtitle: "بيان حماية الخصوصية وتتبع الأثر",
      intro: "الشفافية الكاملة هي غايتنا في منصة shortme.cyou. نقوم بتقليص استخلاص البيانات إلى أقل الحدود الممكنة:",
      s1_t: "1. عدم وجود أي ملفات تتبع",
      s1_c: "نحن لا نجمع أي ملفات ارتباط (Cookies) للمعلومات الإعلانية أو أثر التصفح. زياراتك تظل سرية بالكامل.",
      s2_t: "2. سلامة عناوين الـ IP",
      s2_c: "يتم تشفير عناوين الـ IP الخاصة بالزوار ومعالجتها داخل ذاكرة مؤقتة لفرض حدود الاستهلاك وحماية مخدماتنا ضد الهجمات الفجائية.",
      s3_t: "3. البيانات المستبقاة",
      s3_c: "المنصة تسجل فقط مسار الرابط الأصلي، الرمز المختصر المختار، تاريخ الحفظ والعدد الإجمالي للنقرات الفعالة من أجل إحصائياتك."
    },
    terms: {
      title: "الشروط والأحكام",
      subtitle: "سياسات الاستخدام المقبولة",
      intro: "مرحباً بك في shortme.cyou. بدخولك إلى خدماتنا وأدواتنا فإنك توافق صراحة على الالتزام بالقواعد والإرشادات التالية:",
      s1_t: "1. الاستخدام المشروع فقط",
      s1_c: "يمنع منعاً باتاً تقصير الروابط التي توجه المستخدم إلى حملات التصيد (Phishing)، سرقة الهويات، البرمجيات الضارة أو الأفعال غير النظامية.",
      s2_t: "2. الحدود والقيود التقنية",
      s2_c: "أي تلاعب بنماذج المنصة أو إغراق بريدي مؤتمت باستخدام بوتات سيواجه بحظر فوري للـ IP وبشكل كلي.",
      s3_t: "3. إخلاء المسئولية",
      s3_c: "عملية التوجيه تحدث بتلقائية تامة. نحن لا نتحمل أي مسئولية أدبية أو قانونية تجاه محتوى الصفحات والمواقع الخارجية التي يربطها ناشر الروابط."
    },
    closeBtn: "موافق وعلمت"
  }
};
