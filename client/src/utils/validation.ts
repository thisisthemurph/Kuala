export const validateUsername = (username: string): string | false => {
	if (!username) {
		return "Please enter a username"
	} else if (username.length < 3) {
		return "Your username must be at least three characters in length"
	} else if (!username.match(/^[a-zA-Z\-_]{1,20}\.[a-zA-Z\-_]{1,20}$/)) {
		return "Please ensure your username follows the correct format of 'firstname.surname'"
	}

	return false
}

export const validateName = (name: string): string | false => {
	if (!name) {
		return "Please enter your name"
	} else if (name.length < 3) {
		return "Your username must be at least three characters in length"
	} else if (!name.match(/^[a-zA-Z\-_]{1,20} [a-zA-Z\-_]{1,20}$/)) {
		return "Your name can only include letters, underscores and hyphens and must follow the pattern 'Joe Bloggs'."
	}

	return false
}

export const validatePassword = (password: string): string | false => {
	if (!password) {
		return "Please enter a password."
	} else if (password.length < 6) {
		return "For security purposes we require a password to be at least 6 characters."
	}
	// else if (!password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/)) {
	// 	return "A password needs to have at least one uppercase letter, one lowercase letter, one special character and one number."
	// }

	return false
}
