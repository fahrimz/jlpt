import { TWord } from "@data";

export const getShownJapanese = (word: TWord) =>
  word.hiragana ?? word.katakana ?? word.kanji;

export function getRandomItems(dictionary: TWord[], size: number) {
  const shuffled = [...dictionary].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

export function getAnswerOptions(
  currentWord: TWord,
  dictionary: TWord[]
): string[] {
  const shuffled = [...dictionary].sort(() => 0.5 - Math.random());
  const answerOptions = shuffled.filter(
    (word) => word.english !== currentWord.english
  );

  const incorrectOptions = answerOptions.slice(0, 2).map(getShownJapanese);
  return [...incorrectOptions, getShownJapanese(currentWord)].sort(
    () => 0.5 - Math.random()
  ) as string[];
}
