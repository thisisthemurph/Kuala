const Exhibit = require("../models/Exhibit")
const User = require("../models/User")

module.exports.allCases = async (req, res, next) => {
	try {
		const allExhibits = await Exhibit.find()

		const cases = {}
		for (let i = 0; i < allExhibits.length; i++) {
			const exhibit = allExhibits[i]
			cases[exhibit.caseReference] = exhibit
		}

		return res.json(cases)
	} catch (err) {
		next(err)
	}
}

module.exports.getCase = async (req, res, next) => {
	const { caseReference } = req.params

	try {
		const exhibits = await Exhibit.find({ caseReference })

		if (!exhibits || exhibits.length === 0)
			return res
				.status(404)
				.json({ error: "A case with the given reference could not be located" })

		return res.json({
			caseReference,
			numExhibits: exhibits.length,
			exhibits,
		})
	} catch (err) {
		next(err)
	}
}

module.exports.addExhibit = async (req, res, next) => {
	const { caseReference } = req.params
	const { username, reference } = req.body

	try {
		const user = await User.findOne({ username })
		if (!user)
			return res.status(404).json({ error: "Could not find a user with the given username" })

		const existingExhibit = await Exhibit.findOne({ reference, caseReference })
		if (existingExhibit) return res.status(400).json({ error: "That exhibit already exists" })

		const exhibit = new Exhibit({
			reference,
			caseReference,
			analyst: user,
		})

		await exhibit.save()

		return res.json({ exhibit })
	} catch (err) {
		next(err)
	}
}

module.exports.updateExhibit = async (req, res, next) => {
	const { reference, caseReference } = req.params
	let update = req.body

	try {
		const exhibit = await Exhibit.findOne({ reference, caseReference })
		if (!exhibit)
			return res.status(400).json({ error: "Could not locate the specified exhibit" })

		// If the analyst is being updated, determine the analyst
		if (Object.keys(req.body).includes("analyst")) {
			const analyst = await User.findOne({ username: req.body.analyst })
			if (!analyst)
				return res.status(404).json({
					error: "Could not find the speccified username in the exhbit update",
				})

			update = {
				...req.body,
				analyst: analyst._id,
			}
		}

		await Exhibit.findByIdAndUpdate(exhibit._id, update)
		res.status(204).send()
	} catch (err) {
		next(err)
	}
}

module.exports.deleteExhibit = async (req, res, next) => {
	const { reference, caseReference } = req.params

	try {
		const exhibit = await Exhibit.findOne({ reference, caseReference })
		if (!exhibit) return res.status(404).json({ error: "The exhibit does not exist" })

		const exhibitDeleted = await Exhibit.findByIdAndDelete(exhibit._id)
		if (!exhibitDeleted)
			return res.status(500).json({ error: "Could not delete the exhibit from the case" })

		return res.status(204).send()
	} catch (err) {
		next(err)
	}
}
