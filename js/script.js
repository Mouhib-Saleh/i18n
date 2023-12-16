let translations = {};

document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();

    const savedLang = localStorage.getItem('language') || 'en';
    translate(savedLang);

    document.getElementById('languageSwitcher').value = savedLang;

    document.getElementById('languageSwitcher').addEventListener('change', function () {
        translate(this.value);
        localStorage.setItem('language', this.value);
    });
});

async function loadTranslations() {
    const response = await fetch('../translations.json');
    translations = await response.json();
}

function translate(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[lang][key] || el.textContent;
    });
}
