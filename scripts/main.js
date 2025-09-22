// Language translations
const translations = {
    pl: {
        mainTitle: "Wybierz jedno z najpotężniejszych narzędzi AI:",
        perplexityDesc: "Zaawansowana wyszukiwarka AI, która dostarcza dokładne odpowiedzi z aktualnych źródeł internetowych w czasie rzeczywistym.",
        googleDesc: "Platforma do prototypowania i testowania modeli AI Google, umożliwiająca tworzenie aplikacji z wykorzystaniem Gemini API.",
        gensparkDesc: "Kompleksowa platforma AI oferująca zaawansowane narzędzia do generowania treści, analizy danych i automatyzacji zadań biznesowych.",
        stronaGlownaTab: "Strona główna",
        poradnikiTab: "Poradniki",
        guidesTitle: "Poradniki AI Tools",
        guidesSubtitle: "Szczegółowe instrukcje obsługi najpotężniejszych narzędzi AI"
    },
    en: {
        mainTitle: "Choose one of the most powerful AI tools:",
        perplexityDesc: "Advanced AI search engine that provides accurate answers from current internet sources in real-time.",
        googleDesc: "Platform for prototyping and testing Google AI models, enabling application development with Gemini API.",
        gensparkDesc: "Comprehensive AI platform offering advanced tools for content generation, data analysis, and business task automation.",
        stronaGlownaTab: "Main Page",
        poradnikiTab: "Guides",
        guidesTitle: "AI Tools Guides",
        guidesSubtitle: "Detailed instructions for using the most powerful AI tools"
    },
    es: {
        mainTitle: "Elige una de las herramientas de IA más poderosas:",
        perplexityDesc: "Motor de búsqueda de IA avanzado que proporciona respuestas precisas de fuentes de internet actuales en tiempo real.",
        googleDesc: "Plataforma para crear prototipos y probar modelos de IA de Google, permitiendo el desarrollo de aplicaciones con Gemini API.",
        gensparkDesc: "Plataforma integral de IA que ofrece herramientas avanzadas para generación de contenido, análisis de datos y automatización empresarial.",
        stronaGlownaTab: "Página Principal",
        poradnikiTab: "Guías",
        guidesTitle: "Guías de Herramientas AI",
        guidesSubtitle: "Instrucciones detalladas para usar las herramientas de IA más poderosas"
    },
    hi: {
        mainTitle: "सबसे शक्तिशाली AI टूल्स में से एक चुनें:",
        perplexityDesc: "उन्नत AI सर्च इंजन जो वर्तमान इंटरनेट स्रोतों से रीयल-टाइम में सटीक उत्तर प्रदान करता है।",
        googleDesc: "Google AI मॉडल के प्रोटोटाइपिंग और परीक्षण के लिए प्लेटफॉर्म, Gemini API के साथ एप्लिकेशन विकास को सक्षम बनाता है।",
        gensparkDesc: "व्यापक AI प्लेटफॉर्म जो कंटेंट जेनरेशन, डेटा एनालिसिस और बिजनेस ऑटोमेशन के लिए उन्नत उपकरण प्रदान करता है।",
        stronaGlownaTab: "मुख्य पृष्ठ",
        poradnikiTab: "गाइड",
        guidesTitle: "AI टूल्स गाइड",
        guidesSubtitle: "सबसे शक्तिशाली AI टूल्स का उपयोग करने के लिए विस्तृत निर्देश"
    },
    zh: {
        mainTitle: "选择最强大的AI工具之一：",
        perplexityDesc: "先进的AI搜索引擎，实时提供来自当前互联网资源的准确答案。",
        googleDesc: "用于原型设计和测试Google AI模型的平台，支持使用Gemini API开发应用程序。",
        gensparkDesc: "综合性AI平台，提供内容生成、数据分析和业务自动化的先进工具。",
        stronaGlownaTab: "主页",
        poradnikiTab: "指南",
        guidesTitle: "AI工具指南",
        guidesSubtitle: "使用最强大AI工具的详细说明"
    }
};

// Language names in their native scripts
const languageNames = {
    pl: "Polski",
    en: "English",
    es: "Español",
    hi: "हिन्दी",
    zh: "中文"
};

// Current language and active page
let currentLanguage = 'pl';
let activePage = 'strona-glowna';

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements 
    const languageBtn = document.getElementById('languageBtn');
    const languageMenu = document.getElementById('languageMenu');
    const currentLanguageSpan = document.getElementById('currentLanguage');
    const navTabs = document.querySelectorAll('.nav-tab');
    const pageContents = document.querySelectorAll('.page-content');
    const toolCards = document.querySelectorAll('.tool-card');

    // Load saved language preference
    const savedLanguage = localStorage.getItem('aiToolsLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    updateContent(); 

    // Navigation functionality
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            switchPage(targetPage, pageContents, navTabs);
        });
    });

    // Language dropdown functionality
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        languageMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageBtn.contains(e.target) && !languageMenu.contains(e.target)) {
            languageMenu.classList.remove('active');
        }
    });

    // Language option selection
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            if (selectedLang !== currentLanguage) {
                currentLanguage = selectedLang;
                updateContent();
                localStorage.setItem('aiToolsLanguage', currentLanguage);
            }
            languageMenu.classList.remove('active');
        });
    });

    // Tool card click handlers
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    window.open(url, '_blank', 'noopener,noreferrer');
                    this.style.transform = '';
                }, 150);
            }
        });

        // Keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Preload on hover
        card.addEventListener('mouseenter', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = url;
                document.head.appendChild(link);
            }
        });
    });

    // Initial page setup
    switchPage(activePage, pageContents, navTabs);
});

// Switch between pages
function switchPage(pageId, pageContents, navTabs) {
    if (pageId === activePage && document.querySelector('.page-content.active')) return;

    activePage = pageId;

    // Update navigation
    navTabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-page') === pageId);
    });

    // Update content
    pageContents.forEach(content => {
        content.classList.toggle('active', content.id === pageId);
    });

    // Load guides content if switching to guides page
    if (pageId === 'poradniki') {
        loadGuidesContent();
    }
}

// Load guides content dynamically
function loadGuidesContent() {
    // Redirect to dedicated guides page
    window.location.href = 'subpages/poradniki.html';
}

// Update content based on selected language
function updateContent() {
    const trans = translations[currentLanguage];
    
    // Update language display
    const currentLanguageSpan = document.getElementById('currentLanguage');
    if(currentLanguageSpan) {
        currentLanguageSpan.textContent = languageNames[currentLanguage];
    }
    
    // Update all translatable content by ID
    Object.keys(trans).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = trans[key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

// ESC key to close language menu
document.addEventListener('keydown', function(e) {
    const languageMenu = document.getElementById('languageMenu');
    if (e.key === 'Escape' && languageMenu.classList.contains('active')) {
        languageMenu.classList.remove('active');
    }
});