import {matchPattern, isAlpha} from '../match-pattern'

describe('isAlpha', () => {
	it('should match lower-case alphabetical chars', () => {
		expect(isAlpha('a')).toBe(true)
	})

	it('should match upper-case alphabetical chars', () => {
		expect(isAlpha('A')).toBe(true)
	})

	it('should be false for non-alpha chars', () => {
		expect(isAlpha('*')).toBe(false)
	})
})

describe('matchPattern', () => {
	describe('given some input with missing spaces', () => {
		const TEST_INPUT = 'al**t'

		it('should return all matches', () => {
			const TEST_DATA = [
				'allot',
				'aloft',
				'bloat',
			]
			const matches = matchPattern(TEST_INPUT, TEST_DATA)
			expect(matches).toEqual(['allot', 'aloft'])
		})
	})
})


