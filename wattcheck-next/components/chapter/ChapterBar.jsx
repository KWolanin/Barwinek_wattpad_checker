"use client";
import "@/i18n";
import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import formatDate from "@/src/date";
import { FanficContext } from "@/context/fanfic-context";
import Tooltip from "@/components/ui/Tooltip";

function ChapterBar({ chapter, onChapterLoaded, index }) {
  const [isLoading, setLoading] = useState(false);
  const [tooManyRequests, setTooManyRequests] = useState(false);
  const [stats, setStats] = useState({
    views: 0,
    stars: 0,
    comments: 0,
  });
  const { i18n, t } = useTranslation();
  const { getSignal } = useContext(FanficContext);

  const dateFormatted = useMemo(() => {
    let date = new Date(chapter.date);

    let relative = false;
    if (isNaN(date.getTime())) {
      date = chapter.date;
      relative = true;
    }

    try {
      return formatDate(date, i18n.language, relative);
    } catch (err) {
      return chapter.date;
    }
  }, [i18n.language]);

  useEffect(() => {
    async function getStats() {
      try {
        const res = await fetch("/api/chapterStats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: chapter.link }),
          signal: getSignal(),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || `HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        setStats(result);

        const singleStats = {
          stats: result,
          title: chapter.title,
          chapterNo: index + 1,
        };

        onChapterLoaded(singleStats);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        if (err.message == "Too Many Requests") {
          setStats({
            views: 0,
            stars: 0,
            comments: 0,
          });
          setTooManyRequests(true);
        }

        console.error("Error getting chapter stats:", err);
      } finally {
        setLoading(false);
      }
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
      <div className="flex items-center space-x-2 max-w-[70%]  relative">
        <span className="text-xs text-gray-500 font-semibold whitespace-nowrap">
          {chapter.no}
        </span>

        <span className="font-semibold truncate text-amber-800 overflow-hidden">
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
          {tooManyRequests && (
            <Tooltip text={t('too_many_requests')}>
             <span className="flex items-center bg-rose-500 rounded px-2 py-0.5 space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm-1-10h2v7h-2V7z"
                />
              </svg>
            </span> 
            </Tooltip>
            
          )}
        </span>
      </div>

      <span className="text-sm text-gray-500  whitespace-nowrap overflow-hidden">
        {dateFormatted}
      </span>
    </a>
  );
}

export default ChapterBar;
