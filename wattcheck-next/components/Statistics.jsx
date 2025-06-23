"use client";
import "@/i18n";
import Author from "@/components/author/Author";
import Story from "@/components/story/Story";
import Description from "@/components/story/Description";
import { useContext, useState } from "react";
import { FanficContext } from "@/context/fanfic-context";
import Tag from "@/components/ui/Tag";
import ChapterBar from "@/components/chapter/ChapterBar";
import ChapterStatistics from "@/components/chapter/ChapterStatistics";
import { useTranslation } from "react-i18next";

function Statistics() {
  const fanfic = useContext(FanficContext);
  if (!fanfic) return null;
  const { t } = useTranslation();

  const [allStatistics, setAllStatistic] = useState([]);

  const addToStats = (chapterStats) => {
    setAllStatistic((prev) => {
      const exists = prev.some(
        (item) => item.chapterNo === chapterStats.chapterNo
      );
      if (exists) return prev;
      return [...prev, chapterStats];
    });
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <Author />
        <Story />
        <Description />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {fanfic.tagList.map((tag, index) => (
          <Tag key={`${tag}-${index}`} name={tag} />
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 mb-2  w-full">
          {fanfic.chapters.map((chapter, index) => (
            <ChapterBar
              chapter={chapter}
              key={chapter.link}
              onChapterLoaded={addToStats}
              index={index}
            />
          ))}
        </div>
        {allStatistics.length === fanfic.chapters.length ? (
          <ChapterStatistics chapters={allStatistics} />
        ) : (
          <p className="text-white font-bold">{t("charts_loading")}</p>
        )}
      </div>
    </div>
  );
}

export default Statistics;
