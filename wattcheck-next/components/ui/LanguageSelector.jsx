"use client";

import i18n from "@/i18n";

const supportedLngs = ["pl", "en"];

export default function LanguageSelector() {

  const changeLanguage = (lng) => {
    if (i18n?.changeLanguage) {
      i18n.changeLanguage(lng);
    }
  };
  const currentLang = i18n.language || 'pl'


  const classes =
    "px-2 py-1 rounded text-sm font-semibold border transition-colors duration-200";

  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-2 px-3 py-1 rounded">
      {supportedLngs.map((lng) => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          className={
            currentLang === lng
              ? `${classes} bg-amber-500 text-white border-amber-700`
              : `${classes} bg-white text-amber-700 border-amber-300 hover:bg-amber-100`
          }
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
