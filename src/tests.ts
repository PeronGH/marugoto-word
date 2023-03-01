import { getVocabulary, MarugotoWord, searchVocabulary } from "../mod.ts";

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

Deno.test("get all words and save", async () => {
  const processWord = (w: MarugotoWord) =>
    JSON.stringify(
      {
        kanji: w.KANJI !== w.KANA ? w.KANJI : undefined,
        kana: w.KANA,
        romaji: w.ROMAJI,
        english: w.UWRD,
      },
    );

  const wordSet = new Set<string>();

  for (const letter of "aiueo") {
    console.debug(`Searching for words including ${letter}...`);
    const words = await searchVocabulary(letter);
    words.forEach((w) => wordSet.add(processWord(w)));
    console.debug(`Word set size: ${wordSet.size}`);
  }

  const wordList = [...wordSet]
    .map((w) => JSON.parse(w))
    .sort((a, b) => a.romaji.localeCompare(b.romaji));

  await Deno.writeTextFile(
    "marugoto-katsudoo-words.json",
    JSON.stringify(
      {
        data: wordList,
      },
      null,
      2,
    ),
  );
});
