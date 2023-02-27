import { CEFRLevel, getVocabulary } from "../mod.ts";

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

Deno.test("save processed katsudoo words", async () => {
  const words = await getVocabulary({ textbooks: ["act"] });

  const processedWords = words.map((w) => ({
    kana: w.KANA.trim(),
    kanji: w.KANA !== w.KANJI ? w.KANJI.trim() : undefined,
    romaji: w.ROMAJI.trim(),
    english: w.UWRD.trim(),
    level: w.ATTR.find((a) => a.text === "act")!.level,
  }));

  const distinctMap = new Map<string, {
    kana: string;
    kanji: string | undefined;
    romaji: string;
    english: string;
    level: CEFRLevel;
  }>();

  processedWords.forEach((w) => {
    const key = w.romaji;
    if (distinctMap.has(key)) {
      const existing = distinctMap.get(key)!;
      if (
        existing.kana === w.kana && existing.kanji === w.kanji &&
        existing.english === w.english
      ) {
        return;
      }
    }
    distinctMap.set(key, w);
  });

  await Deno.writeTextFile(
    "marugoto-katsudoo-words.json",
    JSON.stringify({ data: [...distinctMap.values()], version: 1 }, null, 2),
  );
});
