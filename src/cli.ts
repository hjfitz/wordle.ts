import { Command } from "commander";
import config from "./config";
import {fetchWordList, WordList} from "./fetch-word-list";
import {findMatchingWords} from "./find-matching-words";
import {matchPattern} from './match-pattern'

const prog = new Command()

const border = '*'.repeat(process.stdout.columns - 1)

const out = (words: string) => console.log(`
 ${border}
 ${words}
 ${border}
 `)

prog
	.option('-c, --chars <characters>', 'The list of characters you have in any order')
	.option('-p, --pattern <pattern>', 'a pattern to match, if you know the positions. Eg: al**t')
	.option('-l, --list <word-list-url>', 'a link to a plain text list of words split by newline. Optional')

async function main() {
	prog.parse(process.argv)

	let wordListUrl = config.word_list_url

	const {chars, list, pattern} = prog.opts()

	if (list) wordListUrl = list

	if (!chars && !pattern) {
		console.error(prog.helpInformation())
		process.exit(1)
	}

	out(`
	${[
	`Fetching word list from ${wordListUrl}`,
	`${chars ? `Candidate for search: "${chars}"` : ''}`,
	`${pattern ? `Pattern to test: "${pattern}"` : ''}`
	].filter(Boolean).join('\n')}
	`)

	const wordList = await fetchWordList(wordListUrl)

	let matches: WordList = wordList

	if (chars) {
		matches = findMatchingWords(chars.toLowerCase(), wordList)
	}

	if (pattern) {
		matches = matchPattern(pattern, matches)
	}

	console.log('\n')
	console.log('Possible words:')
	matches.forEach(possibleMatch => {
		console.log(' > ' + possibleMatch)
	})

}

main()
