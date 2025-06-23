'use client'
import "@/i18n";
import { useTranslation } from "react-i18next";

function ClearBtn({ onClear }) {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <button
        className="bg-stone-500 text-white shadow-md px-4 py-2 rounded hover:bg-yellow-500 transition whitespace-nowrap flex items-center justify-center font-bold"
        onClick={() => onClear(null)}
      >
        {t("clear")}
      </button>
    </div>
  );
}

export default ClearBtn;
