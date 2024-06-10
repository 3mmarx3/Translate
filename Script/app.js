let body = document.getElementById('body');

let currentLanguage = localStorage.getItem("selectedLanguage") || "en";
function changeLanguage(language) {
    if (currentLanguage !== language) {
        currentLanguage = language;
        localStorage.setItem("selectedLanguage", language);
        updateCurrentLanguage();
        setTimeout(updateGoogleTranslateLanguage, 1000); // Add a slight delay
    }
}

function updateCurrentLanguage() {
    const currentLangElement = document.querySelector(".current-lang .lang-text");
    const currentLangFlag = document.querySelector(".current-lang .lang-flag");
    if (currentLanguage === "en") {
        currentLangElement.textContent = "English";
        currentLangFlag.src = "https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_United_Kingdom.png";
        body.style.direction = 'ltr';
    } else if (currentLanguage === "ar") {
        currentLangElement.textContent = "اللغة العربية";
        currentLangFlag.src = "https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_Saudi_Arabia.png";
        body.style.direction = 'rtl';
    }

    // Update text based on language
    const element = document.getElementById('title');
    if (currentLanguage === "en") {
        element.textContent = element.getAttribute('data-meaning-en');
    } else if (currentLanguage === "ar") {
        element.textContent = element.getAttribute('data-meaning-ar');
    }
}

function updateGoogleTranslateLanguage() {
    const googleTranslateSelect = document.querySelector("#google_element select.goog-te-combo");
    if (currentLanguage === "en") {
        googleTranslateSelect.value = "en";
    } else if (currentLanguage === "ar") {
        googleTranslateSelect.value = "ar";
    }
    localStorage.setItem("googleTranslateLang", googleTranslateSelect.value);
    googleTranslateSelect.dispatchEvent(new Event('change'));
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ defaultLanguage: 'en', includedLanguages: 'en,ar' }, 'google_element');
    updateCurrentLanguage();
    setTimeout(updateGoogleTranslateLanguage, 1000); // Add a slight delay to ensure Google Translate is initialized
}
