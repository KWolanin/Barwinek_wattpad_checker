import * as cheerio from "cheerio";

/**
 * Returns Wattpad story chapters titles, publish dates and links to
 * @param url url to whole story
 * @returns Promise of list of Chapter objects representing chapters
 */
export async function POST(request) {
  const { url } = await request.json();
  const res = await fetch(encodeURI(url));
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
  );

  return Response.json(uniqueChapters);
}