"use client";
import "@/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import formatDate from "@/src/date";

function ChapterBar({ chapter, onChapterLoaded, index }) {
  const [isLoading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    views: 0,
    stars: 0,
    comments: 0,
  });
  const { i18n } = useTranslation();

  useEffect(() => {
    async function getStats() {
      const res = await fetch("/api/chapterStats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: chapter.link }),
      });
      const result = await res.json();
      setStats(result);
      const singleStats = {
        stats: result,
        title: chapter.title,
        chapterNo: index + 1,
      };
      onChapterLoaded(singleStats);
      setLoading(false);
    }
    setLoading(true);
    getStats();
  }, []);

  return (
    <a
      href={chapter.link}
      target="_blank"
      className="flex justify-between items-center px-4 py-2 bg-gray-100 border border-own-orange rounded-2xl shadow hover:bg-own-salmon transition-colors text-gray-800 "
    >
      <div className="flex items-center space-x-2 max-w-[70%] overflow-hidden relative">
        <span className="text-xs text-gray-500 font-semibold whitespace-nowrap">
          {chapter.no}
        </span>


        <span className="font-semibold truncate text-amber-800">
          {chapter.title}
        </span>
        <span className="flex space-x-2 text-xs text-white">
          <span className="flex items-center bg-emerald-500 rounded px-2 py-0.5 space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {!isLoading && <span>{stats.views}</span>}
            {isLoading && (
              <span className="w-4 h-3 bg-emerald-300 rounded animate-pulse"></span>
            )}
          </span>

          <span className="flex items-center bg-own-violet rounded px-2 py-0.5 space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.538 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.783.57-1.838-.196-1.538-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
            </svg>
            {!isLoading && <span>{stats.stars}</span>}
            {isLoading && (
              <span className="w-4 h-3 bg-purple-300 rounded animate-pulse"></span>
            )}
          </span>

          <span className="flex items-center bg-sky-500 rounded px-2 py-0.5 space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8h10M7 12h5m-5 4h7m-7-8v8a2 2 0 002 2h6l4 4V8a2 2 0 00-2-2H7z"
              />
            </svg>
            {!isLoading && <span>{stats.comments}</span>}
            {isLoading && (
              <span className="w-4 h-3 bg-sky-300 rounded animate-pulse"></span>
            )}
          </span>
        </span>
      </div>

      <span className="text-sm text-gray-500 whitespace-nowrap">
        {formatDate(new Date(chapter.date), i18n.language)}
      </span>
    </a>
  );
}

export default ChapterBar;
