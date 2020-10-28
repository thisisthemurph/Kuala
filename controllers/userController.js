const User = require("../models/User")
const Exhibit = require("../models/Exhibit")
const QA = require("../models/QA")

module.exports.allUsers = async (req, res, next) => {
	try {
		const users = await User.find()
		if (!users || users.length === 0)
			return res.status(404).json({ error: "There don't seem to be any users to find" })

		return res.json(users)
	} catch (err) {
		next(err)
	}
}

/**
 * Retrieves all users that have the isAssessor flag set to true
 */
module.exports.getAssessors = async (req, res, next) => {
	function getNumQAs(user) {
		return new Promise(async (resolve, reject) => {
			try {
				const qas = await QA.find({ "assessments.0.assessor": user })
				resolve(qas.length)
			} catch (err) {
				reject("There has been an isse determining the number of QAs")
			}
		})
	}

	try {
		const users = await User.find({ isAssessor: true }, "_id username name isAssessor")
		if (!users || users.length === 0)
			return res.status(404).json({ error: "There don't seem to be any assessors to find" })

		const promises = []
		users.forEach((user) => {
			promises.push(getNumQAs(user))
		})

		const countsPerUser = await Promise.all(promises)
		const assessors = users.map((user, idx) => ({
			user,
			info: {
				qaCount: countsPerUser[idx],
			},
		}))

		return res.json(assessors)
	} catch (err) {
		next(err)
	}
}

module.exports.getUser = async (req, res, next) => {
	const { username } = req.params

	try {
		const user = await User.findOne({ username }, "_id username name avatar bio notifications")

		if (!user)
			return res.status(404).json({ error: "Could not find a user with the given username" })

		return res.json({ user })
	} catch (err) {
		next(err)
	}
}

module.exports.updateUser = async (req, res, next) => {
	const { username } = req.params

	try {
		const user = await User.findOne({ username })
		if (!user) return res.status(404).json({ error: "Could not find a user" })

		await User.findByIdAndUpdate(user._id, req.body)
		res.status(204).send()
	} catch (err) {
		next(err)
	}
}

module.exports.deleteUser = async (req, res, next) => {
	const { username } = req.params

	try {
		await User.findOneAndUpdate({ username }, { markedDeleted: true })
		return res.status(204).send()
	} catch (err) {
		next(err)
	}
}

module.exports.reviveUser = async (req, res, next) => {
	const { username } = req.params

	try {
		await User.findOneAndUpdate({ username }, { markedDeleted: false })
		return res.status(204).send()
	} catch (err) {
		next(err)
	}
}

module.exports.getAllCases = async (req, res, next) => {
	const { username } = req.params

	try {
		const analyst = await User.findOne({ username })
		if (!analyst)
			return res.status(404).json({ error: "The user with that username does not exist" })

		const exhibits = await Exhibit.find({ analyst })

		const cases = {}
		for (let i = 0; i < exhibits.length; i++) {
			const exhibit = exhibits[i]

			if (Object.keys(cases).includes(exhibit.caseReference)) {
				cases[exhibit.caseReference].push(exhibit)
			} else {
				cases[exhibit.caseReference] = [exhibit]
			}
		}

		return res.json({ numCases: cases.length, cases })
	} catch (err) {
		next(err)
	}
}

/**
 * returns the QAs the the user has submitted or are assigned to them
 * TODO: Complete!
 */
module.exports.getQAs = async (req, res, next) => {
	const { username, query } = req.params
	const activeOnly = req.query.activeOnly === "true"

	try {
		const user = await User.findOne({ username })
		if (!user) return res.status(400).json({ error: "Could not find the specified user" })

		if (query === "submitted") {
			key = "author"
		} else if (query === "assigned") {
			key = "assessments.0.assessor"
		} else {
			return res.status(400).json({
				error: `Expected to look for 'submitted' or 'assigned' QAs. Request says '${query}'`,
			})
		}

		let locatedQAs = null
		if (activeOnly) {
			locatedQAs = await QA.find({ author: user, "assessments.0.complete": false }).populate([
				"author",
				"exhibit",
				"assessments.0.assessor",
			])
		} else {
			locatedQAs = await QA.find({ author: user }).populate([
				"author",
				"exhibit",
				"assessments.0.assessor",
			])
		}

		return res.json(locatedQAs)
	} catch (err) {
		next(err)
	}
}
