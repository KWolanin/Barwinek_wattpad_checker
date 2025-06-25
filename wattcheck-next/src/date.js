"use client";
import { format } from "date-fns";
import { pl, enUS } from "date-fns/locale";

export default function formatDate(date, language, relative) {
  const localeMap = {
    pl: pl,
    "pl-PL": pl,
    en: enUS,
    "en-US": enUS,
  };
  const selectedLocale = localeMap[language] || enUS;

  if (relative) {
    if (selectedLocale.code === "pl") {
      return translateRelativeTime(date);
    } else return date
  }

  return format(date, "d MMMM yyyy", { locale: selectedLocale });
}

function translateRelativeTime(str) {
  return str
    .replace(/about/, "około")
    .replace(/hours?/, "godzin")
    .replace(/minutes?/, "minut")
    .replace(/days?/, "dni")
    .replace(/ago/, "temu")
    .replace(/an? /, "1 ");
}
