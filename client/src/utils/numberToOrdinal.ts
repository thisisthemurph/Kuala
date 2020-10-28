/**
 * Converts a number into it's ordinal (1st, 2nd, 3rd etc)
 * @param n number to be converted
 */
const numberToOrdinal = (n: number): string => {
	const s = ["th", "st", "nd", "rd"]
	const v = n % 100
	return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export default numberToOrdinal
