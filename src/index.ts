import { Command } from "commander";
import config from "./config";
import {fetchWordList} from "./fetch-word-list";
import {findMatchingWords} from "./find-matching-words";

const prog = new Command()

const border = '*'.repeat(process.stdout.columns - 1)

const out = (words: string) => console.log(`
 ${border}
 ${words}
 ${border}
 `)

prog
	.option('-c, --chars <characters>', 'The list of characters you have in any order')
	.option('-l, --list <word-list-url>', 'a link to a plain text list of words split by newline. Optional')

async function main() {
	prog.parse(process.argv)

	let wordListUrl = config.word_list_url

	const {chars, list} = prog.opts()

	if (list) wordListUrl = list

	if (!chars) {
		console.error(prog.helpInformation())
		process.exit(1)
	}

	out(`
	Fetching word list from ${wordListUrl}
	Candidate for search: ${chars}
	`)

	const wordList = await fetchWordList(wordListUrl)

	const matches = findMatchingWords(chars.toLowerCase(), wordList)

	console.log('\n')
	console.log('Possible words:')
	matches.forEach(possibleMatch => {
		console.log(' > ' + possibleMatch)
	})

}

main()
