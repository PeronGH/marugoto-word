import { getVocabulary } from "../mod.ts";

Deno.test("Get all words", async () => {
  const words = await getVocabulary();
  console.log(words.length);
});
