import * as cheerio from "cheerio";


export async function POST(request) {
  const { url } = await request.json();
  const res = await fetch(encodeURI(url));
  const html = await res.text();
  const $ = cheerio.load(html);

  let details = {
    title: $(
      '[data-testid="story-details-page"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)'
    )
      .text()
      .trim(),
    url: url,
    chapters: [],
    cover: $('[data-testid="cover"] > img').attr("src"),
    author: $(
      '[data-testid="story-details-page"] > div:nth-child(2) > div:nth-child(1) > [data-testid="story-badges"] > div:nth-child(1)'
    )
      .text()
      .trim(),
    stats: {
      status: $(
        '[data-testid="story-details-page"] > div:nth-child(2) > div:nth-child(1) > [data-testid="story-badges"] > div:nth-child(2) > div:nth-child(1)'
      )
        .text()
        .trim()
        .split(", ")[0],
      publish:
        $(
          '[data-testid="story-details-page"] > div:nth-child(2) > div:nth-child(1) > [data-testid="story-badges"] > div:nth-child(2) > span'
        )
          .text()
          .trim()
          .split(",")[1]
          ?.trim() || "",
      views: $(
        '[data-testid="story-details-page"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > ul > li:nth-child(1) > .stats-value >  div:nth-child(1) > div:nth-child(1) > span:nth-child(1)'
      )
        .text()
        .trim(),
      votes: $(
        '[data-testid="story-details-page"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > ul > li:nth-child(2) > .stats-value >  div:nth-child(1) > div:nth-child(1) > span:nth-child(1)'
      )
        .text()
        .trim(),
      parts: $(
        '[data-testid="story-details-page"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > ul > li:nth-child(3) > .stats-value >  div:nth-child(1) > div:nth-child(1) > span:nth-child(1)'
      )
        .text()
        .trim(),
    },
    tagList: [],
    description: $(
      '[data-testid="story-details-page"] > div:nth-child(2) > div:nth-child(1) div:nth-child(5) > pre'
    )
      .contents()
      .filter(function () {
        return this.type === "text";
      })
      .map(function () {
        return $(this).text();
      })
      .get()
      .join("")
      .trim()
      .replace(/  +/g, ""),
  };
  $('[data-testid="tag-carousel"]')
    .find(" a")
    .each(function () {
      if (details.tagList.includes($(this).text().trim())) return;
      details.tagList.push($(this).text().trim());
    });

  return Response.json(details);
}