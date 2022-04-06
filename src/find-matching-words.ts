import { SingleBar, Presets as cliPresets } from "cli-progress";
import { WordList } from "./fetch-word-list";

export function findMatchingWords(
  word: string,
  wordList: WordList,
  blacklist: string = ""
): WordList {
  const bar = new SingleBar({}, cliPresets.legacy);
  bar.start(wordList.length, 0);
  const charArr = word.split("");
  const charsToIgnore = blacklist.split("");
  const matches = wordList.filter((candidate) => {
    bar.increment(1);
    return charArr.every(
      (chr) => candidate.includes(chr) && !charsToIgnore.includes(chr)
    );
  });
  bar.stop();
  return matches;
}
