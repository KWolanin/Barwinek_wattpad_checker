'use client'
import "@/i18n";
import { FanficContext } from "@/context/fanfic-context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";


function Description() {
  const {fanfic} = useContext(FanficContext);
  if (!fanfic) return null;
  const description = fanfic.description;
    const { t } = useTranslation();


  return (
    <div className="bg-gray-100 border border-own-orange rounded-2xl shadow p-4 col-span-2 text-amber-800 font-bold">
      <h3 className="text-xl font-bold mb-2">
        {t('summary')}
      </h3>
      <p className=" font-semibold text-center">{description}</p>
    </div>
  );
}

export default Description;
