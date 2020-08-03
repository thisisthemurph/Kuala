module.exports.validateUsername = (username) => {
	if (!username) {
		return "A username must be entered"
	} else if (username.length < 3) {
		return "Please choose a username more than three characters in length"
	} else if (!username.match(/\b[a-z]+\.[a-z]+\b/)) {
		return "Please ensure your username follows the correct format of 'firstname.surname'"
	}

	return null
}

module.exports.validateName = (name) => {
	if (!name) {
		return "A name must be entered"
	} else if (name.length < 3) {
		return "Please choose a name more than three characters in length"
	} else if (!name.match(/\b[a-zA-Z]+\s[a-zA-Z]+\b/)) {
		return "Please ensure your name follows the correct format of 'firstname surname'"
	}

	return null
}

module.exports.validatePassword = (password) => {
	if (!password) {
		return "Enter a valid password."
	} else if (password.length < 6) {
		return "For security purposes we require a password to be at least 6 characters."
	} else if (!password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/)) {
		return "A password needs to have at least one uppercase letter, one lowercase letter, one special character and one number."
	}

	return null
}

module.exports.validateScoreType = (scoreType) => {
	const acceptedScoreTypes = [
		"presentation",
		"notes",
		"methodology",
		"exhibitedData",
		"prevQA",
		"neglectful",
	]

	if (!acceptedScoreTypes.includes(scoreType)) {
		const accepted = acceptedScoreTypes.join(", ")
		return `Parameter '${scoreType}' is not an accepted score, accepted scores are: ${accepted}`
	}

	return null
}
