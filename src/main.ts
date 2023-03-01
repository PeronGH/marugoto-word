import { MarugotoAPIQueryParam, MarugotoWord } from "./types.ts";

export async function getVocabulary(
  {
    levels,
    topics,
    lessons,
    textbooks,
    excluded_levels,
    excluded_wordclass,
  }: MarugotoAPIQueryParam = {},
): Promise<MarugotoWord[]> {
  const url = new URL("https://words.marugotoweb.jp/SearchCategoryAPI?ut=en");

  url.searchParams.append("lv", levels?.join(",") ?? "A1,A2-1,A2-2");
  url.searchParams.append("tx", textbooks?.join(",") ?? "act,comp");

  if (topics) url.searchParams.append("tp", topics.join(","));
  if (lessons) url.searchParams.append("ls", lessons.join(","));

  url.searchParams.append("learn_ex", excluded_levels?.join(",") ?? "");
  url.searchParams.append("class_ex", excluded_wordclass?.join(",") ?? "");

  return fetch(url)
    .then((res) => res.json())
    .then((json) => json.DATA)
    .catch(() => []);
}

export function searchVocabulary(query: string): Promise<MarugotoWord[]> {
  const url = new URL(
    "https://words.marugotoweb.jp/keywords/searchAPI?ut=en&m=65535",
  );
  url.searchParams.append("q", query);

  return fetch(url)
    .then((res) => res.json())
    .then((json) => json.DATA)
    .catch(() => []);
}
