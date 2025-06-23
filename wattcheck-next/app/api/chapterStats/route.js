import * as cheerio from "cheerio";

/**
 * Returns Wattpad chapter statistics like number of views, stars and comments
 * @param url url to single chapter
 * @returns Promise of object with stats [check below]
 */
export async function POST(request) {
  const { url } = await request.json();
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

  return Response.json({
    views: parseNumber(matches[0] || "0"),
    stars: parseNumber(matches[1] || "0"),
    comments: parseNumber(matches[2] || "0"),
  });
}