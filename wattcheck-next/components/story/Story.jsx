'use client'
import "@/i18n";
import { FanficContext } from "@/context/fanfic-context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

function Story() {
  const fanfic = useContext(FanficContext);
  if (!fanfic) return null;

  const { t } = useTranslation();

  return (
    <div className="bg-gray-100 border border-own-orange rounded-2xl shadow p-4 col-span-1 text-amber-800 font-bold">
      <h3 className="text-xl font-bold mb-2">{t("stats")}</h3>
      <a href={fanfic.url} target="_blank" className="hover:underline">
        {fanfic.title}
      </a>
      <p className="mt-2 font-semibold">
        {fanfic.stats.views}
        &ensp;{t("views")}
      </p>
      <p className="mt-2 font-semibold">
        {fanfic.stats.votes}
        &ensp;{t("votes")}
      </p>
      <p className="mt-2 font-semibold">
        {fanfic.stats.parts}
        &ensp;{t("parts")}
      </p>
    </div>
  );
}

export default Story;
