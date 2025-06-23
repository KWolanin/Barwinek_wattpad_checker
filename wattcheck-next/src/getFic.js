export async function getFic(url) {
  if (!url) {
    throw new Error("error.empty_url");
  }
  if (!url.startsWith("https://www.wattpad.com/story/")) {
    throw new Error("error.invalid_url");
  }

  const storyRes = await fetch("/api/story", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!storyRes.ok) throw new Error("error.unknown");
  const story = await storyRes.json();

  const chaptersRes = await fetch("/api/chapters", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!chaptersRes.ok) throw new Error("error.unknown");
  story.chapters = await chaptersRes.json();

  return story;
}
