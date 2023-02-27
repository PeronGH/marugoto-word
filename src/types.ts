export type MarugotoWord = {
  ID: string;
  RAWID: string;
  KANA: string;
  KANJI: string;
  ROMAJI: string;
  UWRD: string;
  ATTR: MarugotoWordAttr[];
  HS: string;
  ROWDATA: string;
};

export type MarugotoWordAttr = {
  level: CEFRLevel;
  text: MarugotoTextbook;
  utext: string;
  topic: string;
  lesson: string;
  ulevel: string;
};

export type CEFRLevel = "A1" | "A2-1" | "A2-2";

export type MarugotoTextbook = "act" | "comp";

export type MarugotoAPIQueryParam = {
  levels?: CEFRLevel[];
  excluded_levels?: CEFRLevel[];
  topics?: number[];
  lessons?: number[];
  textbooks?: MarugotoTextbook[];
  excluded_wordclass?: string[];
};
