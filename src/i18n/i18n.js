import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "lang",
      caches: ["localStorage"],
    },
  });

// Apply dir and font based on current language
const applyLanguageAttributes = (lng) => {
  const isAr = lng === "ar";
  document.documentElement.setAttribute("dir", isAr ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", isAr ? "ar" : "en");
  document.body.style.fontFamily = isAr
    ? '"Cairo", "Inter", system-ui, sans-serif'
    : '"Inter", system-ui, sans-serif';
};

// Apply on init
applyLanguageAttributes(i18n.language);

// Apply on language change
i18n.on("languageChanged", applyLanguageAttributes);

export default i18n;
