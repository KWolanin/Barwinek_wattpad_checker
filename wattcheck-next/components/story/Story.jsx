import { FanficContext } from "@/app/page";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

function Story() {
  const fanfic = useContext(FanficContext);
  if (!fanfic) return null;

  const { t } = useTranslation();

  return (
    <div className="bg-amber-200 border border-amber-800 rounded shadow p-4 col-span-1">
      <h3 className="text-xl font-bold mb-2">{t("stats")}</h3>
      <a href={fanfic.url} target="_blank" className="hover:underline">
        {fanfic.title}
      </a>
      <p>
        {fanfic.stats.views}
        &ensp;{t("views")}
      </p>
      <p>
        {fanfic.stats.votes}
        &ensp;{t("votes")}
      </p>
      <p>
        {fanfic.stats.parts}
        &ensp;{t("parts")}
      </p>
    </div>
  );
}

export default Story;
