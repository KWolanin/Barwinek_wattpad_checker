"use client";
import "@/i18n";

import { useEffect, useState, useRef } from "react";
import { getFic } from "@/src/getFic";
import { useTranslation } from "react-i18next";
import logo from "@/public/favicon.png";
import Image from "next/image";

const values_pl = [
  "Wczytywanie fika...",
  "To może zająć chwilę...",
  "Jeszcze moment...",
];
const values_en = [
  "Loading story...",
  "This may take a while...",
  "Almost there...",
];

export default function Selector({ onSetFic }) {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [mounted, setMounted] = useState(false);

  const { t, i18n } = useTranslation();
  const locale = i18n.language || "en";

  const indexRef = useRef(0);
  const intervalIdRef = useRef(null);

  async function getFicViaUrl(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await getFic(event.target.elements.url.value);
      onSetFic(result);
    } catch (err) {
      if (err instanceof Error) {
        const translatedError = t(err.message);
        setError(translatedError);
      } else setError(t("error.unknown"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentList = locale === "pl" ? values_pl : values_en;

    if (isLoading) {
      setLoadingMsg(currentList[0]);
      indexRef.current = 1;

      intervalIdRef.current = setInterval(() => {
        setLoadingMsg(currentList[indexRef.current]);
        indexRef.current = (indexRef.current + 1) % currentList.length;
      }, 3000);
    } else {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
      indexRef.current = 0;
      setLoadingMsg("");
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isLoading, mounted, locale]);

  if (!mounted) return null;

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="p-4 w-full flex flex-col items-center justify-center">
          <div className="relative w-48 h-24">
            <Image src={logo}
             alt="A flower" 
             priority
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             fill className="object-contain" />
          </div>
          <p className="text-white font-bold text-3xl p-4">{t("app_name")}</p>
          <p className="text-white font-bold text-xl p-4">{t("app_desc")}</p>
        </div>

        <form className="flex space-x-4" onSubmit={getFicViaUrl}>
          <input
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-200 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            type="text"
            placeholder={t("paste_here")}
            name="url"
          />
          <button
            className="bg-amber-500 text-white shadow-md px-4 py-2 rounded hover:bg-yellow-500 transition whitespace-nowrap flex items-center justify-center font-bold"
            disabled={isLoading}
            type="submit"
          >
            {!isLoading && <span>{t("load")}</span>}
            {isLoading && (
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
          </button>
        </form>

        <div className="block text-center mt-4">
          {error && <span className="text-red-400 font-bold">{error}</span>}
          {loadingMsg && (
            <span className="text-green-400 font-bold">{loadingMsg}</span>
          )}
        </div>
      </div>
    </main>
  );
}
