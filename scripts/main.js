// Language translations
const translations = {
    pl: {
        mainTitle: "Wybierz jedno z najpotężniejszych narzędzi AI:",
        perplexityDesc: "Zaawansowana wyszukiwarka AI, która dostarcza dokładne odpowiedzi z aktualnych źródeł internetowych w czasie rzeczywistym.",
        googleDesc: "Platforma do prototypowania i testowania modeli AI Google, umożliwiająca tworzenie aplikacji z wykorzystaniem Gemini API.",
        gensparkDesc: "Kompleksowa platforma AI oferująca zaawansowane narzędzia do generowania treści, analizy danych i automatyzacji zadań biznesowych."
    },
    en: {
        mainTitle: "Choose one of the most powerful AI tools:",
        perplexityDesc: "Advanced AI search engine that provides accurate answers from current internet sources in real-time.",
        googleDesc: "Platform for prototyping and testing Google AI models, enabling application development with Gemini API.",
        gensparkDesc: "Comprehensive AI platform offering advanced tools for content generation, data analysis, and business task automation."
    },
    es: {
        mainTitle: "Elige una de las herramientas de IA más poderosas:",
        perplexityDesc: "Motor de búsqueda de IA avanzado que proporciona respuestas precisas de fuentes de internet actuales en tiempo real.",
        googleDesc: "Plataforma para crear prototipos y probar modelos de IA de Google, permitiendo el desarrollo de aplicaciones con Gemini API.",
        gensparkDesc: "Plataforma integral de IA que ofrece herramientas avanzadas para generación de contenido, análisis de datos y automatización empresarial."
    },
    hi: {
        mainTitle: "सबसे शक्तिशाली AI टूल्स में से एक चुनें:",
        perplexityDesc: "उन्नत AI सर्च इंजन जो वर्तमान इंटरनेट स्रोतों से रीयल-टाइम में सटीक उत्तर प्रदान करता है।",
        googleDesc: "Google AI मॉडल के प्रोटोटाइपिंग और परीक्षण के लिए प्लेटफॉर्म, Gemini API के साथ एप्लिकेशन विकास को सक्षम बनाता है।",
        gensparkDesc: "व्यापक AI प्लेटफॉर्म जो कंटेंट जेनरेशन, डेटा एनालिसिस और बिजनेस ऑटोमेशन के लिए उन्नत उपकरण प्रदान करता है।"
    },
    zh: {
        mainTitle: "选择最强大的AI工具之一：",
        perplexityDesc: "先进的AI搜索引擎，实时提供来自当前互联网资源的准确答案。",
        googleDesc: "用于原型设计和测试Google AI模型的平台，支持使用Gemini API开发应用程序。",
        gensparkDesc: "综合性AI平台，提供内容生成、数据分析和业务自动化的先进工具。"
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

// Current language
let currentLanguage = 'pl';

// DOM Elements
const languageBtn = document.getElementById('languageBtn');
const languageMenu = document.getElementById('languageMenu');
const currentLanguageSpan = document.getElementById('currentLanguage');
const mainTitle = document.getElementById('mainTitle');
const perplexityDesc = document.getElementById('perplexityDesc');
const googleDesc = document.getElementById('googleDesc');
const gensparkDesc = document.getElementById('gensparkDesc');
const toolCards = document.querySelectorAll('.tool-card');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('aiToolsLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        updateContent();
    }

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
                // Add loading state
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    window.open(url, '_blank', 'noopener,noreferrer');
                    this.style.transform = '';
                }, 150);
            }
        });

        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
});

// Update content based on selected language
function updateContent() {
    const trans = translations[currentLanguage];
    
    // Update language display
    currentLanguageSpan.textContent = languageNames[currentLanguage];
    
    // Update content
    mainTitle.textContent = trans.mainTitle;
    perplexityDesc.textContent = trans.perplexityDesc;
    googleDesc.textContent = trans.googleDesc;
    gensparkDesc.textContent = trans.gensparkDesc;
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Add smooth transition effect
    const elements = [mainTitle, perplexityDesc, googleDesc, gensparkDesc];
    elements.forEach(element => {
        element.style.opacity = '0.7';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 150);
    });
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization: Preload tool pages on hover
let preloadedUrls = new Set();

toolCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const url = this.getAttribute('data-url');
        if (url && !preloadedUrls.has(url)) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
            preloadedUrls.add(url);
        }
    });
});

// Add loading animation for better UX
function showLoadingState(card) {
    const originalContent = card.innerHTML;
    card.style.pointerEvents = 'none';
    
    setTimeout(() => {
        card.style.pointerEvents = 'auto';
    }, 300);
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key to close language menu
    if (e.key === 'Escape') {
        languageMenu.classList.remove('active');
    }
});

// Add focus styles for better accessibility
const style = document.createElement('style');
style.textContent = `
    .tool-card:focus {
        outline: 3px solid #667eea;
        outline-offset: 2px;
    }
    
    .language-btn:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
    
    .language-option:focus {
        background-color: #e2e8f0;
        outline: none;
    }
`;
document.head.appendChild(style);