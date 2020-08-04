const User = require("../models/User")
const { findOneAndUpdate } = require("../models/User")

module.exports.createNotification = async (req, res, next) => {
	const { username, message, link } = req.body
	const author = res.locals.user

	try {
		const user = await User.findOne({ username })
		if (!user)
			return res.status(404).json({ error: "Could not find a user with the given username" })

		user.notifications.push({ message, link, author })
		await user.save()

		return res.json({ user, notification: { message, link, author } })
	} catch (err) {
		console.error(err)
		next(err)
	}
}

module.exports.getNotifications = async (req, res, next) => {
	const unactionedOnly = req.query.unactionedOnly === "true"

	try {
		const user = await User.findById(res.locals.user._id, "notifications")
		if (!user)
			return res.status(404).json({
				error: "There has been an issue retrieving the notofocations from the user",
			})

		let notifications = user.notifications
		if (unactionedOnly) {
			notifications = notifications.filter((notification) => !notification.actioned)
		}

		return res.json(notifications)
	} catch (err) {
		next(err)
	}
}

module.exports.deleteNotification = async (req, res, next) => {
	const { id } = req.params

	try {
		const user = await User.findById(res.locals.user._id, "notifications")
		if (!user)
			return res.status(404).json({
				error: "There has been an issue retrieving the notofocations from the user",
			})

		user.notifications.pull(id)
		user.save()

		return res.status(204).send()
	} catch (err) {
		next(err)
	}
}

module.exports.setActioned = async (req, res, next) => {
	const { id } = req.params
	const { actioned } = req.body

	// Validate

	if (typeof actioned !== "boolean")
		return res.status(400).json({
			error: `Expected actioned param in body to be of type 'boolean', got '${typeof actioned}' instead`,
		})

	try {
		const user = await User.findOne({ _id: res.locals.user._id })
		if (!user)
			return res.status(404).json({
				error: "There has been an issue retrieving the notofocations from the user",
			})

		const notification = user.notifications.id(id)
		notification.actioned = actioned
		user.save()

		return res.status(204).send()
	} catch (err) {
		console.error(err)
		next(err)
	}
}
