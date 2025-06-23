'use client'
import "@/i18n";
import { useTranslation } from "react-i18next";

function ClearBtn({ onClear }) {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <button
        className="fixed top-4 left-4 z-50 px-2 py-1 rounded text-sm font-semibold border transition-colors duration-200
         bg-white text-amber-700 hover:bg-own-salmon
         "
        onClick={() => onClear(null)}
      >
        {t("clear").toUpperCase()}
      </button>
    </div>
  );
}

export default ClearBtn;
