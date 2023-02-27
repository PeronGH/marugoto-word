import { getVocabulary } from "../mod.ts";

Deno.test("count katsudoo words of different levels", async () => {
  const words = await getVocabulary({ textbooks: ["act"] });

  const wordLevels = words.flatMap((w) =>
    w.ATTR.filter((a) => a.text === "act").map((a) => a.level)
  );

  const levelCounts = wordLevels.reduce((acc, level) => {
    acc.set(level, (acc.get(level) ?? 0) + 1);
    return acc;
  }, new Map<string, number>());

  console.log(levelCounts);
});
