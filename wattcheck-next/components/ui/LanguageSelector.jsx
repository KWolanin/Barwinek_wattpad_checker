"use client";

import { useState, useEffect } from "react";
import i18n from "@/i18n";

const supportedLngs = ["pl", "en"];

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState(null);

  useEffect(() => {
    setCurrentLang(i18n.language || "pl");
  }, []);

  const changeLanguage = (lng) => {
    if (i18n?.changeLanguage) {
      i18n.changeLanguage(lng);
      setCurrentLang(lng);
    }
  };

  const classes =
    "px-2 py-1 rounded text-sm font-semibold border transition-colors duration-200";

  if (!currentLang) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-2 px-3 py-1 rounded">
      {supportedLngs.map((lng) => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          className={
            currentLang === lng
              ? `${classes} bg-own-orange text-white`
              : `${classes} bg-white text-amber-700 hover:bg-own-salmon`
          }
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
