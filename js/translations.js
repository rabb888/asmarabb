const translations = {
    en: {
        heroHeading: "Empowering Ambitions. Elevating Businesses.",
        heroSub: "Your trusted partner in business transformation across the UAE",
        getStarted: "Get Started",
        visionTitle: "Our Vision",
        visionText: "To be the UAE's most trusted partner in business transformation...",
        // Add more keys for each text element
    },
    ar: {
        heroHeading: "تمكين الطموحات. رفع مستوى الأعمال.",
        heroSub: "شريكك الموثوق في تحويل الأعمال في جميع أنحاء الإمارات",
        getStarted: "ابدأ الآن",
        visionTitle: "رؤيتنا",
        visionText: "أن نكون الشريك الأكثر موثوقية في دولة الإمارات لتحويل الأعمال...",
        // Translate each key to Arabic
    }
};

function switchLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Highlight the active language
    document.querySelectorAll(".language-switcher a").forEach(a => {
        a.classList.remove("active");
        if (a.dataset.lang === lang) {
            a.classList.add("active");
        }
    });
}

document.querySelectorAll(".language-switcher a").forEach(a => {
    a.addEventListener("click", function (e) {
        e.preventDefault();
        const lang = this.dataset.lang;
        switchLanguage(lang);
    });
});

// Default language
switchLanguage("en");
 