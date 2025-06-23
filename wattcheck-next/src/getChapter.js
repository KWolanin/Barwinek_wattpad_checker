'use server'
import fetch from "node-fetch";
import * as cheerio from "cheerio";

/**
 * Returns Wattpad chapter statistics like number of views, stars and comments
 * @param url url to single chapter
 * @returns Promise of object with stats [check below]
 */
export const getChapterStats = async (url) => {
    const res = await fetch(encodeURI(url));
    const html = await res.text();

    const $ = cheerio.load(html);
    const matchingDivs = $(`div.story-stats`);

    let rawText = "";
    matchingDivs.each((_, el) => {
      rawText += $(el).text();
    });

    const cleaned = rawText.replace(/\s+/g, " ").trim();
    const matches = cleaned.match(/[\d.,]+[KkMm]?/g) || [];

    const parseNumber = (str) => {
      if (str.toLowerCase().includes("k")) {
        return parseFloat(str) * 1000;
      }
      if (str.toLowerCase().includes("m")) {
        return parseFloat(str) * 1_000_000;
      }
      return parseInt(str.replace(/[^\d]/g, ""), 10);
    };
    return {
      views: parseNumber(matches[0] || "0"),
      stars: parseNumber(matches[1] || "0"),
      comments: parseNumber(matches[2] || "0"),
    };
};




/**
 * Returns Wattpad story chapters titles, publish dates and links to
 * @param url url to whole story
 * @returns Promise of list of Chapter objects representing chapters
 */
export async function getChapters(url) {
   const res = await fetch(encodeURI(url));
  // const res = await (encodeURI(url))

  const html = await res.text();
  const $ = cheerio.load(html);

  const chapters = $('[aria-label="story-parts"]').find("li");
  const chapterList = [];

  chapters.each((i, el) => {
    const link = $(el).find("a").attr("href") || '';

    const title = $(el)
      .find("a > div")
      .first()
      .children("div")
      .first()
      .text()
      .trim();

    const date = $(el).find("a > div").last().text().trim();

    chapterList.push({ title, link, date });
  });
  const uniqueChapters = Array.from(
    new Map(chapterList.map(ch => [ch.link, ch])).values()
  )
  return uniqueChapters
}


// Structures of returned data (for documentation purpose)
/* type Chapter = {
  title: string,
  link: string,
  date: string
}

type Stats = {
  views: number,
  stars: number,
  comments: number
} */