const jwt = require("jwt-simple")
const bcrypt = require("bcrypt")

const User = require("../models/User")
const { validateUsername, validateName, validatePassword } = require("../utils/validation")

module.exports.verifyJwt = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const userId = jwt.decode(token, process.env.JWT_SECRET).id
			const user = await User.findOne({ _id: userId }, "_id username name avatar bio")

			if (user) {
				resolve(user)
			} else {
				reject("Not authorized")
			}
		} catch (err) {
			reject("Not authorized")
		}
	})
}

module.exports.requireAuth = async (req, res, next) => {
	const { authorization } = req.headers
	if (!authorization) return res.status(401).send({ error: "Not authorized." })

	try {
		const user = await this.verifyJwt(authorization)

		// Allow other middlewares to access the authenticated user details.
		res.locals.user = user
	} catch (err) {
		return res.status(401).send({ error: err })
	}

	return next()
}

module.exports.optionalAuth = async (req, res, next) => {
	const { authorization } = req.headers

	if (authorization) {
		try {
			const user = await this.verifyJwt(authorization)

			// Allow other middlewares to access the authenticated user details.
			res.locals.user = user
		} catch (err) {
			return res.status(401).send({ error: err })
		}
	}

	return next()
}

module.exports.register = async (req, res, next) => {
	const { username, name, password } = req.body

	// Validation
	usernameError = validateUsername(username)
	if (usernameError) return res.status(400).json({ error: usernameError })

	nameError = validateName(name)
	if (nameError) return res.status(400).json({ error: nameError })

	passwordError = validatePassword(password)
	if (passwordError) return res.status(400).json({ error: passwordError })

	try {
		if (await User.exists({ username }))
			return res.status(409).json({ error: "A user with that username already exists" })

		const user = new User({
			username,
			name,
			password,
		})

		await user.save()

		return res.status(201).json({
			user: {
				username: user.username,
			},
			token: jwt.encode({ id: user._id }, process.env.JWT_SECRET),
		})
	} catch (err) {
		console.error("Caught error - registration")
		res.json({ error: "There has been an issue registering the user" })
	}
}

module.exports.login = async (req, res, next) => {
	const { authorization } = req.headers
	const { username, password } = req.body

	if (authorization) {
		try {
			const user = await this.verifyJwt(authorization)
			return res.json({
				user: {
					id: user._id,
					username: user.username,
					avatar: user.avatar,
				},
				token: authorization,
			})
		} catch (err) {
			return res.status(401).json({ error: err })
		}
	}

	if (!username || !password) {
		return res.status(401).json({
			error: "A username and a password is required",
		})
	}

	try {
		const user = await User.findOne({ username })

		if (!user) {
			return res.status(401).json({
				error: "The credentials you have provided are incorrect",
			})
		}

		const match = await bcrypt.compare(password, user.password)
		if (!match)
			return res.status(401).json({
				error: "The credentials you have provided are incorrect",
			})

		res.json({
			user: {
				id: user._id,
				username: user.username,
				avatar: user.avatar,
			},
			token: jwt.encode({ id: user._id }, process.env.JWT_SECRET),
		})
	} catch (err) {
		next(err)
	}
}

module.exports.updatePassword = async (req, res, next) => {
	const { oldPassword, newPassword } = req.body
	const user = res.locals.user
	const currentPassword = undefined

	try {
		const userDocument = await User.findById(user._id)
		currentPassword = userDocument.password

		const oldPasswordMatch = await bcrypt.compare(oldPassword, currentPassword)
		if (!oldPasswordMatch)
			return res.status(401).json({
				error: "Your old password was entered incorrectly",
			})

		const newPasswordError = validatePassword(newPassword)
		if (newPasswordError) return res.status(400).json({ error: newPasswordError })

		userDocument.password = newPassword
		await userDocument.save()
		return res.status(204).send()
	} catch (err) {
		next(err)
	}
}
