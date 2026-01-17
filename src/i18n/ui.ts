/**
 * UI Translation Strings
 *
 * All user-interface text strings for the Just FYI website.
 * Translations are organized by language and follow a nested structure.
 *
 * Key naming convention:
 * - nav.* - Navigation labels
 * - common.* - Common UI elements
 * - footer.* - Footer text
 * - language.* - Language switcher labels
 * - home.* - Home page specific strings
 * - meta.* - Meta descriptions and SEO text
 * - subscribe.* - Email subscription form strings
 */

/**
 * Type definition for UI translations structure
 */
export interface UITranslations {
  nav: {
    home: string;
    howItWorks: string;
    faq: string;
    about: string;
    contact: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  common: {
    readMore: string;
    learnMore: string;
    getStarted: string;
    contactUs: string;
    downloadApp: string;
    appStore: string;
    playStore: string;
    comingSoon: string;
    backToTop: string;
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    selectLanguage: string;
    currentLanguage: string;
    theme: string;
    toggleTheme: string;
    navigationMenu: string;
    mainNavigation: string;
    lightTheme: string;
    darkTheme: string;
    switchToLight: string;
    switchToDark: string;
  };
  footer: {
    copyright: string;
    tagline: string;
    legal: string;
    resources: string;
    openSource: string;
    madeWith: string;
  };
  language: {
    switcherLabel: string;
    current: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    featuresTitle: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
    feature3Title: string;
    feature3Description: string;
    ctaTitle: string;
    ctaDescription: string;
    screenshotAlt: string;
  };
  meta: {
    homeDescription: string;
    privacyPolicyDescription: string;
    termsDescription: string;
    faqDescription: string;
    howItWorksDescription: string;
    aboutDescription: string;
    contactDescription: string;
  };
  pages: {
    lastUpdated: string;
    tableOfContents: string;
  };
  subscribe: {
    title: string;
    placeholder: string;
    cityPlaceholder: string;
    button: string;
    buttonSubmitting: string;
    success: string;
    error: string;
    alreadySubscribed: string;
    privacyNote: string;
    networkError: string;
    timeout: string;
  };
}

/**
 * English translations (default)
 */
const en: UITranslations = {
  nav: {
    home: 'Home',
    howItWorks: 'How It Works',
    faq: 'FAQ',
    about: 'About',
    contact: 'Contact',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
  common: {
    readMore: 'Read More',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    contactUs: 'Contact Us',
    downloadApp: 'Download App',
    appStore: 'App Store',
    playStore: 'Google Play',
    comingSoon: 'Coming Soon',
    backToTop: 'Back to Top',
    skipToContent: 'Skip to Content',
    openMenu: 'Open Menu',
    closeMenu: 'Close Menu',
    selectLanguage: 'Select Language',
    currentLanguage: 'Current language',
    theme: 'Theme',
    toggleTheme: 'Toggle theme',
    navigationMenu: 'Navigation menu',
    mainNavigation: 'Main navigation',
    lightTheme: 'Light theme',
    darkTheme: 'Dark theme',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
  },
  footer: {
    copyright: 'Just FYI. All rights reserved.',
    tagline: 'Privacy-First Anonymous Contact Tracing',
    legal: 'Legal',
    resources: 'Resources',
    openSource: 'Open Source on GitHub (Apache 2.0)',
    madeWith: 'Made with privacy in mind',
  },
  language: {
    switcherLabel: 'Language',
    current: 'English',
  },
  home: {
    heroTitle: 'Stay Safe, Stay Anonymous',
    heroSubtitle: 'Private sexual health notifications for your community',
    heroDescription: 'Just FYI helps you privately notify past intimate partners if you test positive for a sexually transmitted infection, and get notified if someone you\'ve been with does the same.',
    featuresTitle: 'How Just FYI Protects You',
    feature1Title: 'Anonymous ID',
    feature1Description: 'Your identity is protected with a unique anonymous ID. No email, no phone number, no personal information required.',
    feature2Title: 'Bluetooth LE',
    feature2Description: 'Secure peer-to-peer interaction recording using Bluetooth Low Energy. Works offline and respects your privacy.',
    feature3Title: 'Privacy-First',
    feature3Description: 'Your data is encrypted and stored securely. Private notifications alert you to potential exposures without revealing identities.',
    ctaTitle: 'Ready to Get Started?',
    ctaDescription: 'Download Just FYI and join a community that values both health and privacy.',
    screenshotAlt: 'Just FYI app screenshot',
  },
  meta: {
    homeDescription: 'Download Just FYI - the free, anonymous STI notification app. Protect your privacy while notifying partners. No email or phone required. Available for Android & iOS.',
    privacyPolicyDescription: 'Your privacy matters. Read how Just FYI protects your identity with end-to-end encryption, anonymous IDs, and zero personal data collection.',
    termsDescription: 'Terms of Service for Just FYI anonymous contact tracing app. Simple, transparent terms for your peace of mind.',
    faqDescription: 'Got questions about anonymous STI notification? Find answers about privacy, Bluetooth tracing, data security, and how Just FYI works.',
    howItWorksDescription: 'See how Just FYI uses Bluetooth LE for anonymous contact tracing. No personal info needed - just download, connect, and stay informed.',
    aboutDescription: 'Just FYI: Built for privacy, designed for community health. Learn about our mission to make anonymous STI notification accessible to all.',
    contactDescription: 'Need help with Just FYI? Contact our team for support, report issues, or contribute to our project on GitHub.',
  },
  pages: {
    lastUpdated: 'Last Updated',
    tableOfContents: 'Table of Contents',
  },
  subscribe: {
    title: 'Get notified when Just FYI launches',
    placeholder: 'Enter your email',
    cityPlaceholder: 'Your city (optional)',
    button: 'Subscribe',
    buttonSubmitting: 'Subscribing...',
    success: 'Thanks for subscribing! We\'ll keep you posted.',
    error: 'Something went wrong. Please try again.',
    alreadySubscribed: 'You\'re already subscribed!',
    privacyNote: 'We\'ll only email you about JustFYI app updates. No spam, no sharing with third parties.',
    networkError: 'Unable to connect. Please check your connection and try again.',
    timeout: 'Request timed out. Please try again.',
  },
};

/**
 * German translations
 */
const de: UITranslations = {
  nav: {
    home: 'Startseite',
    howItWorks: 'So funktioniert es',
    faq: 'FAQ',
    about: 'Ueber uns',
    contact: 'Kontakt',
    privacyPolicy: 'Datenschutzerklaerung',
    termsOfService: 'Nutzungsbedingungen',
  },
  common: {
    readMore: 'Mehr lesen',
    learnMore: 'Mehr erfahren',
    getStarted: 'Jetzt starten',
    contactUs: 'Kontaktieren Sie uns',
    downloadApp: 'App herunterladen',
    appStore: 'App Store',
    playStore: 'Google Play',
    comingSoon: 'Demnachst',
    backToTop: 'Nach oben',
    skipToContent: 'Zum Inhalt springen',
    openMenu: 'Menue oeffnen',
    closeMenu: 'Menue schliessen',
    selectLanguage: 'Sprache waehlen',
    currentLanguage: 'Aktuelle Sprache',
    theme: 'Design',
    toggleTheme: 'Design umschalten',
    navigationMenu: 'Navigationsmenue',
    mainNavigation: 'Hauptnavigation',
    lightTheme: 'Helles Design',
    darkTheme: 'Dunkles Design',
    switchToLight: 'Zu hellem Design wechseln',
    switchToDark: 'Zu dunklem Design wechseln',
  },
  footer: {
    copyright: 'Just FYI. Alle Rechte vorbehalten.',
    tagline: 'Anonyme Kontaktverfolgung mit Datenschutz',
    legal: 'Rechtliches',
    resources: 'Ressourcen',
    openSource: 'Open Source auf GitHub (Apache 2.0)',
    madeWith: 'Mit Datenschutz im Sinn entwickelt',
  },
  language: {
    switcherLabel: 'Sprache',
    current: 'Deutsch',
  },
  home: {
    heroTitle: 'Sicher bleiben, anonym bleiben',
    heroSubtitle: 'Private Benachrichtigungen zur sexuellen Gesundheit fuer Ihre Gemeinschaft',
    heroDescription: 'Just FYI hilft Ihnen, fruehere intime Partner privat zu benachrichtigen, wenn Sie positiv auf eine sexuell uebertragbare Infektion getestet werden, und benachrichtigt zu werden, wenn jemand, mit dem Sie zusammen waren, dasselbe tut.',
    featuresTitle: 'Wie Just FYI Sie schuetzt',
    feature1Title: 'Anonyme ID',
    feature1Description: 'Ihre Identitaet ist durch eine einzigartige anonyme ID geschuetzt. Keine E-Mail, keine Telefonnummer, keine persoenlichen Informationen erforderlich.',
    feature2Title: 'Bluetooth LE',
    feature2Description: 'Sichere Peer-to-Peer-Interaktionsaufzeichnung mit Bluetooth Low Energy. Funktioniert offline und respektiert Ihre Privatsphaere.',
    feature3Title: 'Datenschutz zuerst',
    feature3Description: 'Ihre Daten sind verschluesselt und sicher gespeichert. Private Benachrichtigungen informieren Sie ueber moegliche Expositionen, ohne Identitaeten preiszugeben.',
    ctaTitle: 'Bereit loszulegen?',
    ctaDescription: 'Laden Sie Just FYI herunter und werden Sie Teil einer Gemeinschaft, die Gesundheit und Privatsphaere gleichermassen schaetzt.',
    screenshotAlt: 'Just FYI App Screenshot',
  },
  meta: {
    homeDescription: 'Just FYI ist eine datenschutzorientierte anonyme App fuer sexuelle Gesundheitsbenachrichtigungen, die Gemeinschaften hilft, sicher zu bleiben und gleichzeitig Ihre Identitaet zu schuetzen.',
    privacyPolicyDescription: 'Lesen Sie die Just FYI Datenschutzerklaerung, um zu verstehen, wie wir Ihre Daten und Privatsphaere schuetzen.',
    termsDescription: 'Lesen Sie die Just FYI Nutzungsbedingungen fuer die Nutzung unserer anonymen Kontaktverfolgungs-App.',
    faqDescription: 'Haeufig gestellte Fragen ueber Just FYI, die datenschutzorientierte anonyme Kontaktverfolgungs-App.',
    howItWorksDescription: 'Erfahren Sie, wie Just FYI Ihre Privatsphaere schuetzt und Sie gleichzeitig ueber moegliche Gesundheitsrisiken informiert.',
    aboutDescription: 'Erfahren Sie mehr ueber Just FYI, unsere Mission fuer datenschutzorientierte anonyme Kontaktverfolgung und die Gemeinschaften, denen wir dienen.',
    contactDescription: 'Kontaktieren Sie das Just FYI-Team fuer Support, Feedback oder Fragen zu unserer anonymen Kontaktverfolgungs-App.',
  },
  pages: {
    lastUpdated: 'Zuletzt aktualisiert',
    tableOfContents: 'Inhaltsverzeichnis',
  },
  subscribe: {
    title: 'Benachrichtigung erhalten, wenn Just FYI startet',
    placeholder: 'E-Mail-Adresse eingeben',
    cityPlaceholder: 'Ihre Stadt (optional)',
    button: 'Abonnieren',
    buttonSubmitting: 'Wird abonniert...',
    success: 'Danke fuer Ihre Anmeldung! Wir halten Sie auf dem Laufenden.',
    error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    alreadySubscribed: 'Sie sind bereits angemeldet!',
    privacyNote: 'Wir senden Ihnen nur E-Mails zu JustFYI App-Updates. Kein Spam, keine Weitergabe an Dritte.',
    networkError: 'Verbindung nicht moeglich. Bitte pruefen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
    timeout: 'Zeitlimit ueberschritten. Bitte versuchen Sie es erneut.',
  },
};

/**
 * Spanish translations
 */
const es: UITranslations = {
  nav: {
    home: 'Inicio',
    howItWorks: 'Como funciona',
    faq: 'Preguntas frecuentes',
    about: 'Sobre nosotros',
    contact: 'Contacto',
    privacyPolicy: 'Politica de Privacidad',
    termsOfService: 'Terminos de Servicio',
  },
  common: {
    readMore: 'Leer mas',
    learnMore: 'Saber mas',
    getStarted: 'Comenzar',
    contactUs: 'Contactenos',
    downloadApp: 'Descargar App',
    appStore: 'App Store',
    playStore: 'Google Play',
    comingSoon: 'Proximamente',
    backToTop: 'Volver arriba',
    skipToContent: 'Saltar al contenido',
    openMenu: 'Abrir menu',
    closeMenu: 'Cerrar menu',
    selectLanguage: 'Seleccionar idioma',
    currentLanguage: 'Idioma actual',
    theme: 'Tema',
    toggleTheme: 'Cambiar tema',
    navigationMenu: 'Menu de navegacion',
    mainNavigation: 'Navegacion principal',
    lightTheme: 'Tema claro',
    darkTheme: 'Tema oscuro',
    switchToLight: 'Cambiar a tema claro',
    switchToDark: 'Cambiar a tema oscuro',
  },
  footer: {
    copyright: 'Just FYI. Todos los derechos reservados.',
    tagline: 'Rastreo de contactos anonimo con privacidad primero',
    legal: 'Legal',
    resources: 'Recursos',
    openSource: 'Codigo abierto en GitHub (Apache 2.0)',
    madeWith: 'Hecho pensando en la privacidad',
  },
  language: {
    switcherLabel: 'Idioma',
    current: 'Espanol',
  },
  home: {
    heroTitle: 'Mantente seguro, mantente anonimo',
    heroSubtitle: 'Notificaciones privadas de salud sexual para tu comunidad',
    heroDescription: 'Just FYI te ayuda a notificar de forma privada a parejas intimas anteriores si das positivo en una infeccion de transmision sexual, y a recibir notificaciones si alguien con quien has estado hace lo mismo.',
    featuresTitle: 'Como Just FYI te protege',
    feature1Title: 'ID Anonimo',
    feature1Description: 'Tu identidad esta protegida con un ID anonimo unico. No se requiere correo electronico, numero de telefono ni informacion personal.',
    feature2Title: 'Bluetooth LE',
    feature2Description: 'Registro seguro de interacciones entre pares usando Bluetooth de Baja Energia. Funciona sin conexion y respeta tu privacidad.',
    feature3Title: 'Privacidad primero',
    feature3Description: 'Tus datos estan encriptados y almacenados de forma segura. Las notificaciones privadas te alertan sobre posibles exposiciones sin revelar identidades.',
    ctaTitle: 'Listo para comenzar?',
    ctaDescription: 'Descarga Just FYI y unete a una comunidad que valora tanto la salud como la privacidad.',
    screenshotAlt: 'Captura de pantalla de la app Just FYI',
  },
  meta: {
    homeDescription: 'Just FYI es una aplicacion de notificacion de salud sexual anonima con privacidad primero que ayuda a las comunidades a mantenerse seguras mientras protege tu identidad.',
    privacyPolicyDescription: 'Lee la Politica de Privacidad de Just FYI para entender como protegemos tus datos y privacidad.',
    termsDescription: 'Revisa los Terminos de Servicio de Just FYI para usar nuestra aplicacion de rastreo de contactos anonimo.',
    faqDescription: 'Preguntas frecuentes sobre Just FYI, la aplicacion de rastreo de contactos anonimo con privacidad primero.',
    howItWorksDescription: 'Aprende como Just FYI protege tu privacidad mientras te ayuda a mantenerte informado sobre posibles exposiciones de salud.',
    aboutDescription: 'Conoce sobre Just FYI, nuestra mision de rastreo de contactos anonimo con privacidad primero y las comunidades a las que servimos.',
    contactDescription: 'Ponte en contacto con el equipo de Just FYI para soporte, comentarios o preguntas sobre nuestra aplicacion de rastreo de contactos anonimo.',
  },
  pages: {
    lastUpdated: 'Ultima actualizacion',
    tableOfContents: 'Tabla de contenidos',
  },
  subscribe: {
    title: 'Recibe notificaciones cuando Just FYI se lance',
    placeholder: 'Ingresa tu correo electronico',
    cityPlaceholder: 'Tu ciudad (opcional)',
    button: 'Suscribirse',
    buttonSubmitting: 'Suscribiendo...',
    success: 'Gracias por suscribirte! Te mantendremos informado.',
    error: 'Algo salio mal. Por favor, intentalo de nuevo.',
    alreadySubscribed: 'Ya estas suscrito!',
    privacyNote: 'Solo te enviaremos correos sobre actualizaciones de la app JustFYI. Sin spam, sin compartir con terceros.',
    networkError: 'No se puede conectar. Por favor, verifica tu conexion e intentalo de nuevo.',
    timeout: 'La solicitud ha expirado. Por favor, intentalo de nuevo.',
  },
};

/**
 * French translations
 */
const fr: UITranslations = {
  nav: {
    home: 'Accueil',
    howItWorks: 'Comment ca marche',
    faq: 'FAQ',
    about: 'A propos',
    contact: 'Contact',
    privacyPolicy: 'Politique de confidentialite',
    termsOfService: 'Conditions d\'utilisation',
  },
  common: {
    readMore: 'Lire la suite',
    learnMore: 'En savoir plus',
    getStarted: 'Commencer',
    contactUs: 'Contactez-nous',
    downloadApp: 'Telecharger l\'app',
    appStore: 'App Store',
    playStore: 'Google Play',
    comingSoon: 'Bientot disponible',
    backToTop: 'Retour en haut',
    skipToContent: 'Aller au contenu',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    selectLanguage: 'Choisir la langue',
    currentLanguage: 'Langue actuelle',
    theme: 'Theme',
    toggleTheme: 'Changer de theme',
    navigationMenu: 'Menu de navigation',
    mainNavigation: 'Navigation principale',
    lightTheme: 'Theme clair',
    darkTheme: 'Theme sombre',
    switchToLight: 'Passer au theme clair',
    switchToDark: 'Passer au theme sombre',
  },
  footer: {
    copyright: 'Just FYI. Tous droits reserves.',
    tagline: 'Tracage de contacts anonyme axe sur la confidentialite',
    legal: 'Mentions legales',
    resources: 'Ressources',
    openSource: 'Open Source sur GitHub (Apache 2.0)',
    madeWith: 'Concu avec la confidentialite a l\'esprit',
  },
  language: {
    switcherLabel: 'Langue',
    current: 'Francais',
  },
  home: {
    heroTitle: 'Restez en securite, restez anonyme',
    heroSubtitle: 'Notifications privees de sante sexuelle pour votre communaute',
    heroDescription: 'Just FYI vous aide a notifier de maniere privee vos partenaires intimes precedents si vous etes teste positif pour une infection sexuellement transmissible, et a etre notifie si quelqu\'un avec qui vous avez ete fait de meme.',
    featuresTitle: 'Comment Just FYI vous protege',
    feature1Title: 'ID anonyme',
    feature1Description: 'Votre identite est protegee par un identifiant anonyme unique. Pas d\'email, pas de numero de telephone, aucune information personnelle requise.',
    feature2Title: 'Bluetooth LE',
    feature2Description: 'Enregistrement securise des interactions en pair-a-pair via Bluetooth Low Energy. Fonctionne hors ligne et respecte votre vie privee.',
    feature3Title: 'Confidentialite d\'abord',
    feature3Description: 'Vos donnees sont chiffrees et stockees de maniere securisee. Des notifications privees vous alertent des expositions potentielles sans reveler les identites.',
    ctaTitle: 'Pret a commencer?',
    ctaDescription: 'Telechargez Just FYI et rejoignez une communaute qui valorise la sante et la vie privee.',
    screenshotAlt: 'Capture d\'ecran de l\'application Just FYI',
  },
  meta: {
    homeDescription: 'Just FYI est une application de notification de sante sexuelle anonyme axee sur la confidentialite qui aide les communautes a rester en securite tout en protegeant votre identite.',
    privacyPolicyDescription: 'Lisez la Politique de confidentialite de Just FYI pour comprendre comment nous protegeons vos donnees et votre vie privee.',
    termsDescription: 'Consultez les Conditions d\'utilisation de Just FYI pour utiliser notre application de tracage de contacts anonyme.',
    faqDescription: 'Questions frequentes sur Just FYI, l\'application de tracage de contacts anonyme axee sur la confidentialite.',
    howItWorksDescription: 'Decouvrez comment Just FYI protege votre vie privee tout en vous tenant informe des expositions sanitaires potentielles.',
    aboutDescription: 'Decouvrez Just FYI, notre mission de tracage de contacts anonyme axe sur la confidentialite et les communautes que nous servons.',
    contactDescription: 'Contactez l\'equipe Just FYI pour du support, des commentaires ou des questions sur notre application de tracage de contacts anonyme.',
  },
  pages: {
    lastUpdated: 'Derniere mise a jour',
    tableOfContents: 'Table des matieres',
  },
  subscribe: {
    title: 'Soyez informe du lancement de Just FYI',
    placeholder: 'Entrez votre email',
    cityPlaceholder: 'Votre ville (optionnel)',
    button: 'S\'abonner',
    buttonSubmitting: 'Abonnement en cours...',
    success: 'Merci de vous etre abonne! Nous vous tiendrons informe.',
    error: 'Une erreur s\'est produite. Veuillez reessayer.',
    alreadySubscribed: 'Vous etes deja abonne!',
    privacyNote: 'Nous vous enverrons uniquement des emails concernant les mises a jour de l\'app JustFYI. Pas de spam, pas de partage avec des tiers.',
    networkError: 'Impossible de se connecter. Veuillez verifier votre connexion et reessayer.',
    timeout: 'La requete a expire. Veuillez reessayer.',
  },
};

/**
 * Portuguese translations
 */
const pt: UITranslations = {
  nav: {
    home: 'Inicio',
    howItWorks: 'Como funciona',
    faq: 'Perguntas frequentes',
    about: 'Sobre',
    contact: 'Contato',
    privacyPolicy: 'Politica de Privacidade',
    termsOfService: 'Termos de Servico',
  },
  common: {
    readMore: 'Leia mais',
    learnMore: 'Saiba mais',
    getStarted: 'Comecar',
    contactUs: 'Fale conosco',
    downloadApp: 'Baixar App',
    appStore: 'App Store',
    playStore: 'Google Play',
    comingSoon: 'Em breve',
    backToTop: 'Voltar ao topo',
    skipToContent: 'Pular para o conteudo',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    selectLanguage: 'Selecionar idioma',
    currentLanguage: 'Idioma atual',
    theme: 'Tema',
    toggleTheme: 'Alternar tema',
    navigationMenu: 'Menu de navegacao',
    mainNavigation: 'Navegacao principal',
    lightTheme: 'Tema claro',
    darkTheme: 'Tema escuro',
    switchToLight: 'Mudar para tema claro',
    switchToDark: 'Mudar para tema escuro',
  },
  footer: {
    copyright: 'Just FYI. Todos os direitos reservados.',
    tagline: 'Rastreamento de contatos anonimo com privacidade em primeiro lugar',
    legal: 'Juridico',
    resources: 'Recursos',
    openSource: 'Codigo aberto no GitHub (Apache 2.0)',
    madeWith: 'Feito com privacidade em mente',
  },
  language: {
    switcherLabel: 'Idioma',
    current: 'Portugues',
  },
  home: {
    heroTitle: 'Fique seguro, fique anonimo',
    heroSubtitle: 'Notificacoes privadas de saude sexual para sua comunidade',
    heroDescription: 'Just FYI ajuda voce a notificar de forma privada parceiros intimos anteriores se testar positivo para uma infeccao sexualmente transmissivel, e ser notificado se alguem com quem esteve fizer o mesmo.',
    featuresTitle: 'Como o Just FYI protege voce',
    feature1Title: 'ID Anonimo',
    feature1Description: 'Sua identidade e protegida com um ID anonimo unico. Sem email, sem numero de telefone, sem informacoes pessoais necessarias.',
    feature2Title: 'Bluetooth LE',
    feature2Description: 'Registro seguro de interacoes ponto a ponto usando Bluetooth de Baixa Energia. Funciona offline e respeita sua privacidade.',
    feature3Title: 'Privacidade primeiro',
    feature3Description: 'Seus dados sao criptografados e armazenados de forma segura. Notificacoes privadas alertam voce sobre possiveis exposicoes sem revelar identidades.',
    ctaTitle: 'Pronto para comecar?',
    ctaDescription: 'Baixe o Just FYI e junte-se a uma comunidade que valoriza tanto a saude quanto a privacidade.',
    screenshotAlt: 'Captura de tela do aplicativo Just FYI',
  },
  meta: {
    homeDescription: 'Just FYI e um aplicativo de notificacao de saude sexual anonimo com privacidade em primeiro lugar que ajuda as comunidades a ficarem seguras enquanto protege sua identidade.',
    privacyPolicyDescription: 'Leia a Politica de Privacidade do Just FYI para entender como protegemos seus dados e privacidade.',
    termsDescription: 'Revise os Termos de Servico do Just FYI para usar nosso aplicativo de rastreamento de contatos anonimo.',
    faqDescription: 'Perguntas frequentes sobre o Just FYI, o aplicativo de rastreamento de contatos anonimo com privacidade em primeiro lugar.',
    howItWorksDescription: 'Saiba como o Just FYI protege sua privacidade enquanto ajuda voce a se manter informado sobre possiveis exposicoes de saude.',
    aboutDescription: 'Conheca o Just FYI, nossa missao de rastreamento de contatos anonimo com privacidade em primeiro lugar e as comunidades que servimos.',
    contactDescription: 'Entre em contato com a equipe Just FYI para suporte, feedback ou perguntas sobre nosso aplicativo de rastreamento de contatos anonimo.',
  },
  pages: {
    lastUpdated: 'Ultima atualizacao',
    tableOfContents: 'Indice',
  },
  subscribe: {
    title: 'Receba notificacoes quando o Just FYI for lancado',
    placeholder: 'Digite seu email',
    cityPlaceholder: 'Sua cidade (opcional)',
    button: 'Inscrever-se',
    buttonSubmitting: 'Inscrevendo...',
    success: 'Obrigado por se inscrever! Manteremos voce informado.',
    error: 'Algo deu errado. Por favor, tente novamente.',
    alreadySubscribed: 'Voce ja esta inscrito!',
    privacyNote: 'Enviaremos apenas emails sobre atualizacoes do app JustFYI. Sem spam, sem compartilhamento com terceiros.',
    networkError: 'Nao foi possivel conectar. Por favor, verifique sua conexao e tente novamente.',
    timeout: 'A solicitacao expirou. Por favor, tente novamente.',
  },
};

/**
 * All UI translations indexed by language code
 */
export const ui: Record<string, UITranslations> = {
  en,
  de,
  es,
  fr,
  pt,
};

/**
 * Type for valid translation keys (dot-notation paths)
 */
export type UIKey =
  | `nav.${keyof UITranslations['nav']}`
  | `common.${keyof UITranslations['common']}`
  | `footer.${keyof UITranslations['footer']}`
  | `language.${keyof UITranslations['language']}`
  | `home.${keyof UITranslations['home']}`
  | `meta.${keyof UITranslations['meta']}`
  | `pages.${keyof UITranslations['pages']}`
  | `subscribe.${keyof UITranslations['subscribe']}`;
