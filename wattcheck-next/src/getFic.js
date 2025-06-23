"use server";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { getChapters } from "./getChapter";

export async function getFic(url) {
  if (!url) {
    throw new Error("error.empty_url");
  }
  if (!url.startsWith("https://www.wattpad.com/story/")) {
    throw new Error("error.invalid_url");
  }

  const story = await getStory(url);
  story.chapters = await getChapters(url);
  return story;
}

/**
 *  Returns details of Wattpad story
 * @param url url to whole story
 * @returns Promise of Story objects representing single story details [check below]
 */
export const getStory = async function (url) {
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
      details.tagList.push($(this).text().trim());
    });

  return details;
};

// Structures of returned data [for documentation purposes]

// type Response = {
//         title: string, // story title
//         url: string, // again url,
//         cover: string, // url to author avatar
//         author: string, // author nickname
//         stats: { // object containing story stats
//             status: string, // 'complete/in progress"
//             views: string, // all views
//             votes: string, // all votes/stars
//             parts: string // number of chapters
//         },
//         tagList: string[], // list of tags for the story
//         description: string // story description
//         chapters: chapter[], list of chapters added in chapter.js in separate call
//     }
