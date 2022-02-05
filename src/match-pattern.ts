import {WordList} from './fetch-word-list'

export function isAlpha(chr: string): boolean {
	return /[a-z]/gi.test(chr)
}

export function matchPattern(pattern: string, words: WordList): WordList {
	const chars = pattern.split('')
	// word list will always be length 5
	return words.filter(candidate => {
		return chars.every((chr, curCharIndex) => {
			if (isAlpha(chr)) return candidate.charAt(curCharIndex) === chr
			return true
		})
	})
}
