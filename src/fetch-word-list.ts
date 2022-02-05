import axios from 'axios'
import config from './config'

export type WordList = string[]

export async function fetchWordList(wordListUrl: string): Promise<WordList> {
	try {
		const wordsResp = await axios.get<string>(wordListUrl)
		return wordsResp.data.split('\n').filter(Boolean)
	} catch (err) {
		return []
	}
}

