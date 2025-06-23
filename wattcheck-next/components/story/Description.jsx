'use client'
import "@/i18n";
import { FanficContext } from "@/context/fanfic-context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";


function Description() {
  const fanfic = useContext(FanficContext);
  if (!fanfic) return null;
  const description = fanfic.description;
    const { t } = useTranslation();


  return (
    <div className="bg-amber-200 border border-amber-800 rounded shadow p-4 col-span-2">
      <h3 className="text-xl font-bold mb-2">
        {t('summary')}
      </h3>
      <p className="text-left">{description}</p>
    </div>
  );
}

export default Description;
