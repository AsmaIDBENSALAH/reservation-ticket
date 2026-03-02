import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      header: {
        trust1: "100% Secure & Guaranteed",
        trust2: "Over 5 Million Football Fans Served",
        trust3: "Excellent 4.9/5 Reviews",
        tagline: "Safe tickets. Real seats. Pure football.",
        searchPlaceholder: "Search for team, match, stadium or city",
        trackTickets: "Track your Tickets",
        home: "Home",
        worldCup: "World Cup 2026",
        trending: "Trending",
        premierLeague: "Premier League tickets",
        englishCups: "English Cups",
        otherCups: "Other Cups",
        otherCompetitions: "Other Competitions",
      },
      hero: {
        defaultTitle: "Your Football, Your Tickets",
        defaultSubtitle: "Get tickets to the biggest football matches worldwide",
        searchPlaceholder: "Search for team, match, stadium or city...",
        searchTickets: "Search Tickets",
      },
      popular: {
        now: "Popular Now",
        mostPopular: "Most popular Football tickets",
      },
      categories: {
        seeAll: "See all",
      },
      bestChampionships: {
        title: "Top football championships",
        subtitle: "Looking for a football match? You are in the right place!",
      },
      howItWorks: {
        title: "How does it work?",
        step1Title: "Pick a match",
        step1Desc: "Browse matches or competitions, then open a match to view details.",
        step2Title: "Select your tickets",
        step2Desc: "Choose a stadium zone and quantity, then reserve to start checkout.",
        step3Title: "Pay & track",
        step3Desc: "Pay securely to confirm your reservation, then track it in “Track your Tickets”.",
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "How do I find a match to book?",
            answer:
              "Go to All Matches or Competitions, then open a match to see its details and available ticket zones.",
          },
          {
            question: "How do I reserve tickets for a match?",
            answer:
              "On the match page, pick a stadium zone and quantity, then click Reserve to continue to checkout.",
          },
          {
            question: "What payment method is supported?",
            answer: "Checkout is card-based and runs through a secure payment form.",
          },
          {
            question: "Why am I redirected if I open checkout directly?",
            answer:
              "Checkout requires match and ticket details selected from the match page, so it must be started from Reserve.",
          },
          {
            question: "Where can I see my reservations after payment?",
            answer:
              "Open Track your Tickets from the header to view your reservation history (login required).",
          },
          {
            question: "How do I change the language?",
            answer:
              "Use the language selector in the header to switch between EN, FR, and AR.",
          },
        ],
      },
      matchRow: {
        from: "From",
        viewDetails: "View Details",
      },
      ticketCard: {
        category: "Category",
        available: "Available",
        pricePerTicket: "Price/ticket",
        quantity: "Quantity",
        reserve: "Reserve",
      },
      account: {
        title: "CREATE YOUR ACCOUNT",
        subtitle: "Track your football ticket purchases and manage your bookings all in one place.",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        password: "Password",
        agreePrefix: "Yes, I agree with the",
        privacy: "privacy policy",
        and: "and",
        terms: "terms and conditions",
        create: "Create Account",
      },
      footer: {
        company: "Company",
        topCategories: "Top Categories",
        bestSellers: "Best Sellers",
        homepages: "Homepages",
      },
      competition: {
        title: "All Competitions",
        subtitle: "Browse the full competition list. This page does not show competition details.",
        listTitle: "Competitions",
        loading: "Loading competitions...",
        empty: "No competitions found.",
      },
      championship: {
        matchesAvailable: "Matches Available",
        upcoming: "Upcoming Matches",
        loadMore: "More",
        loadingMore: "Loading...",
      },
      matches: {
        title: "All Matches",
        subtitle: "Browse every available match. Use the button below to load 10 more.",
        loadMore: "Show 10 More",
        loading: "Loading matches...",
        loadError: "Failed to load matches.",
        empty: "No matches found.",
      },
      matchDetail: {
        about: "About the event",
        more: "More +",
        reserveIntro:
          "Book your tickets now for the upcoming match between {{home}} ({{homeAbbr}}) and {{away}} ({{awayAbbr}}) at {{stadium}}, {{city}}, {{country}}, where they compete in {{status}} on {{date}}.",
      },
      checkout: {
        yourDetails: "Your Details",
        payment: "Payment",
        payNow: "Pay now",
        guarantee: "100% Money Back Guarantee",
        reserved: "The tickets are reserved for you.",
        remaining: "remaining to finish your order.",
        mobileTickets: "Mobile tickets",
        easySecure: "Easy and secure payments",
      },
      tickets: {
        title: "Track your Tickets",
        welcome: "Welcome {{name}}",
        empty: "You do not have any tickets yet",
        zone: "Zone",
        price: "Price",
      },
    },
  },
  fr: {
    translation: {
      header: {
        trust1: "100% sécurisé et garanti",
        trust2: "Plus de 5 millions de fans servis",
        trust3: "Excellentes notes 4,9/5",
        tagline: "Billets sûrs. Vraies places. Football pur.",
        searchPlaceholder: "Rechercher équipe, match, stade ou ville",
        trackTickets: "Suivre vos billets",
        home: "Accueil",
        worldCup: "Coupe du Monde 2026",
        trending: "Tendances",
        premierLeague: "Billets Premier League",
        englishCups: "Coupes anglaises",
        otherCups: "Autres coupes",
        otherCompetitions: "Autres compétitions",
      },
      hero: {
        defaultTitle: "Votre football, vos billets",
        defaultSubtitle: "Obtenez des billets pour les plus grands matchs",
        searchPlaceholder: "Rechercher équipe, match, stade ou ville...",
        searchTickets: "Rechercher des billets",
      },
      popular: {
        now: "Populaire maintenant",
        mostPopular: "Billets de football les plus populaires",
      },
      categories: {
        seeAll: "Tout voir",
      },
      bestChampionships: {
        title: "Les meilleurs championnats de football",
        subtitle: "Vous cherchez un match de football ? Vous êtes au bon endroit !",
      },
      howItWorks: {
        title: "Comment ça marche ?",
        step1Title: "Choisissez un match",
        step1Desc: "Parcourez les matchs ou les compétitions, puis ouvrez un match pour voir les détails.",
        step2Title: "Sélectionnez vos billets",
        step2Desc: "Choisissez une zone du stade et une quantité, puis réservez pour passer au paiement.",
        step3Title: "Payez & suivez",
        step3Desc: "Payez en toute sécurité pour confirmer la réservation, puis retrouvez-la dans « Suivre vos billets ».",
      },
      faq: {
        title: "Questions fréquentes",
        items: [
          {
            question: "Comment trouver un match à réserver ?",
            answer:
              "Allez dans Tous les matchs ou Compétitions, puis ouvrez un match pour voir les détails et les zones disponibles.",
          },
          {
            question: "Comment réserver des billets pour un match ?",
            answer:
              "Sur la page du match, choisissez une zone et une quantité, puis cliquez sur Réservez pour passer au paiement.",
          },
          {
            question: "Quel moyen de paiement est pris en charge ?",
            answer:
              "Le paiement se fait par carte via un formulaire de paiement sécurisé.",
          },
          {
            question: "Pourquoi suis-je redirigé si j’ouvre le checkout directement ?",
            answer:
              "Le checkout nécessite les informations du match et des billets, il doit être démarré depuis « Réservez ».",
          },
          {
            question: "Où retrouver mes réservations après paiement ?",
            answer:
              "Ouvrez Suivre vos billets dans l’en-tête pour voir votre historique (connexion requise).",
          },
          {
            question: "Comment changer de langue ?",
            answer:
              "Utilisez le sélecteur de langue dans l’en-tête pour passer à EN, FR ou AR.",
          },
        ],
      },
      matchRow: {
        from: "À partir de",
        viewDetails: "Voir détails",
      },
      ticketCard: {
        category: "Catégorie",
        available: "Disponible",
        pricePerTicket: "Prix/billet",
        quantity: "Quantité",
        reserve: "Réservez",
      },
      account: {
        title: "CRÉEZ VOTRE COMPTE",
        subtitle: "Suivez vos achats de billets et gérez vos réservations.",
        firstName: "Prénom",
        lastName: "Nom",
        email: "Adresse e-mail",
        password: "Mot de passe",
        agreePrefix: "Oui, j'accepte la",
        privacy: "politique de confidentialité",
        and: "et",
        terms: "les conditions générales",
        create: "Créer un compte",
      },
      footer: {
        company: "Entreprise",
        topCategories: "Top catégories",
        bestSellers: "Meilleures ventes",
        homepages: "Pages d'accueil",
      },
      competition: {
        title: "Toutes les compétitions",
        subtitle: "Parcourez la liste complète des compétitions.",
        listTitle: "Compétitions",
        loading: "Chargement des compétitions...",
        empty: "Aucune compétition trouvée.",
      },
      championship: {
        matchesAvailable: "Matchs disponibles",
        upcoming: "Matchs à venir",
        loadMore: "Plus",
        loadingMore: "Chargement...",
      },
      matches: {
        title: "Tous les matchs",
        subtitle: "Parcourez tous les matchs disponibles. Utilisez le bouton ci-dessous pour en afficher 10 de plus.",
        loadMore: "Afficher 10 de plus",
        loading: "Chargement des matchs...",
        loadError: "Impossible de charger les matchs.",
        empty: "Aucun match trouvé.",
      },
      matchDetail: {
        about: "À propos de l'événement",
        more: "Plus +",
        reserveIntro:
          "Réservez vos billets dès maintenant pour le prochain match entre {{home}} ({{homeAbbr}}) et {{away}} ({{awayAbbr}}) au {{stadium}}, {{city}}, {{country}}, où ils participent au {{status}} le {{date}}.",
      },
      checkout: {
        yourDetails: "Vos informations",
        payment: "Paiement",
        payNow: "Payer maintenant",
        guarantee: "Garantie de remboursement à 100%",
        reserved: "Les billets vous sont réservés.",
        remaining: "restantes pour terminer votre commande.",
        mobileTickets: "Billets mobiles",
        easySecure: "Paiement facile et sécurisé",
      },
      tickets: {
        title: "Suivre vos billets",
        welcome: "Bienvenue {{name}}",
        empty: "Vous n'avez pas encore de billets",
        zone: "Zone",
        price: "Prix",
      },
    },
  },
  ar: {
    translation: {
      header: {
        trust1: "آمن ومضمون 100%",
        trust2: "خدمنا أكثر من 5 ملايين مشجع",
        trust3: "تقييم ممتاز 4.9/5",
        tagline: "تذاكر آمنة. مقاعد حقيقية. كرة قدم خالصة.",
        searchPlaceholder: "ابحث عن فريق أو مباراة أو ملعب أو مدينة",
        trackTickets: "تتبع تذاكرك",
        home: "الرئيسية",
        worldCup: "كأس العالم 2026",
        trending: "الأكثر رواجًا",
        premierLeague: "تذاكر الدوري الإنجليزي",
        englishCups: "الكؤوس الإنجليزية",
        otherCups: "كؤوس أخرى",
        otherCompetitions: "مسابقات أخرى",
      },
      hero: {
        defaultTitle: "كرتك، تذاكرك",
        defaultSubtitle: "احصل على تذاكر أكبر مباريات كرة القدم",
        searchPlaceholder: "ابحث عن فريق أو مباراة أو ملعب أو مدينة...",
        searchTickets: "ابحث عن التذاكر",
      },
      popular: {
        now: "الأكثر شعبية الآن",
        mostPopular: "أشهر تذاكر كرة القدم",
      },
      categories: {
        seeAll: "عرض الكل",
      },
      bestChampionships: {
        title: "أفضل بطولات كرة القدم",
        subtitle: "تبحث عن مباراة كرة قدم؟ أنت في المكان الصحيح!",
      },
      howItWorks: {
        title: "كيف يعمل؟",
        step1Title: "اختر مباراة",
        step1Desc: "تصفح المباريات أو المسابقات، ثم افتح المباراة لعرض التفاصيل.",
        step2Title: "حدد تذاكرك",
        step2Desc: "اختر منطقة في الملعب والكمية، ثم اضغط «احجز» للانتقال للدفع.",
        step3Title: "ادفع وتتبع",
        step3Desc: "أكمل الدفع بأمان لتأكيد الحجز، ثم تتبعه من صفحة «تتبع تذاكرك».",
      },
      faq: {
        title: "الأسئلة الشائعة",
        items: [
          {
            question: "كيف أجد مباراة للحجز؟",
            answer:
              "اذهب إلى كل المباريات أو المسابقات، ثم افتح المباراة لعرض التفاصيل والمناطق المتاحة للتذاكر.",
          },
          {
            question: "كيف أحجز تذاكر لمباراة؟",
            answer:
              "في صفحة المباراة اختر المنطقة والكمية، ثم اضغط «احجز» للانتقال لصفحة الدفع.",
          },
          {
            question: "ما طريقة الدفع المتاحة؟",
            answer: "الدفع يتم بالبطاقة عبر نموذج دفع آمن.",
          },
          {
            question: "لماذا يتم تحويلي إذا فتحت صفحة الدفع مباشرة؟",
            answer:
              "صفحة الدفع تحتاج تفاصيل المباراة والتذاكر، لذلك يجب البدء من زر «احجز».",
          },
          {
            question: "أين أرى حجوزاتي بعد الدفع؟",
            answer:
              "افتح «تتبع تذاكرك» من الشريط العلوي لعرض سجل الحجوزات (يتطلب تسجيل الدخول).",
          },
          {
            question: "كيف أغيّر اللغة؟",
            answer:
              "استخدم مُحدد اللغة في الشريط العلوي للتبديل بين EN وFR وAR.",
          },
        ],
      },
      matchRow: {
        from: "ابتداءً من",
        viewDetails: "عرض التفاصيل",
      },
      ticketCard: {
        category: "الفئة",
        available: "المتاح",
        pricePerTicket: "السعر/تذكرة",
        quantity: "الكمية",
        reserve: "احجز",
      },
      account: {
        title: "أنشئ حسابك",
        subtitle: "تتبع مشتريات التذاكر وإدارة حجوزاتك من مكان واحد.",
        firstName: "الاسم الأول",
        lastName: "اسم العائلة",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        agreePrefix: "نعم، أوافق على",
        privacy: "سياسة الخصوصية",
        and: "و",
        terms: "الشروط والأحكام",
        create: "إنشاء حساب",
      },
      footer: {
        company: "الشركة",
        topCategories: "أهم الفئات",
        bestSellers: "الأكثر مبيعًا",
        homepages: "الصفحات الرئيسية",
      },
      competition: {
        title: "كل المسابقات",
        subtitle: "تصفح القائمة الكاملة للمسابقات.",
        listTitle: "المسابقات",
        loading: "جارٍ تحميل المسابقات...",
        empty: "لا توجد مسابقات.",
      },
      championship: {
        matchesAvailable: "مباريات متاحة",
        upcoming: "المباريات القادمة",
        loadMore: "المزيد",
        loadingMore: "جارٍ التحميل...",
      },
      matches: {
        title: "كل المباريات",
        subtitle: "تصفح جميع المباريات المتاحة. استخدم الزر بالأسفل لعرض 10 مباريات إضافية.",
        loadMore: "عرض 10 إضافية",
        loading: "جارٍ تحميل المباريات...",
        loadError: "تعذر تحميل المباريات.",
        empty: "لا توجد مباريات.",
      },
      matchDetail: {
        about: "حول الحدث",
        more: "المزيد +",
        reserveIntro:
          "احجز تذاكرك الآن للمباراة القادمة بين {{home}} ({{homeAbbr}}) و{{away}} ({{awayAbbr}}) في {{stadium}}، {{city}}، {{country}} ضمن {{status}} بتاريخ {{date}}.",
      },
      checkout: {
        yourDetails: "بياناتك",
        payment: "الدفع",
        payNow: "ادفع الآن",
        guarantee: "ضمان استرجاع 100%",
        reserved: "التذاكر محجوزة لك.",
        remaining: "متبقية لإكمال الطلب.",
        mobileTickets: "تذاكر الهاتف",
        easySecure: "دفع سهل وآمن",
      },
      tickets: {
        title: "تتبع تذاكرك",
        welcome: "مرحبًا {{name}}",
        empty: "ليس لديك تذاكر بعد",
        zone: "المنطقة",
        price: "السعر",
      },
    },
  },
};

const savedLanguage = localStorage.getItem("app_language") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("app_language", lng);
});

export default i18n;
