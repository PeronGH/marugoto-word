import { MarugotoAPIQueryParam, MarugotoWord } from "./types.ts";

export async function getVocabulary(
  {
    levels,
    topics,
    lessons,
    textbooks,
    excluded_levels,
    excluded_wordclass,
  }: MarugotoAPIQueryParam,
) {
  const url = new URL("https://words.marugotoweb.jp/SearchCategoryAPI");
  url.searchParams.append("ut", "en");
  url.searchParams.append("lv", levels.join(","));
  url.searchParams.append("tp", topics?.join(",") ?? "");
  url.searchParams.append("ls", lessons?.join(",") ?? "");
  url.searchParams.append("tx", textbooks?.join(",") ?? "");
  url.searchParams.append("learn_ex", excluded_levels?.join(",") ?? "");
  url.searchParams.append("class_ex", excluded_wordclass?.join(",") ?? "");

  const response = await fetch(url).then((res) => res.json());
  return response.DATA as MarugotoWord[];
}
