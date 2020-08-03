const Exhibit = require("../models/Exhibit")
const User = require("../models/User")
const QA = require("../models/QA")

const { validateScoreType } = require("../utils/validation")

/**
 * Submit an exhibit for QA
 */
module.exports.submit = async (req, res, next) => {
	const { exhibitId, authorUsername, assessorUsername } = req.body

	try {
		const exhibit = await Exhibit.findById(exhibitId)
		if (!exhibit) return res.status(404).json({ error: "Could not find the specified exhibit" })

		const author = await User.findOne({ username: authorUsername })
		if (!author) return res.status(404).json({ error: "Could not locate the author" })

		const assessor = await User.findOne({ username: assessorUsername })
		if (!assessor) return res.status(404).json({ error: "Could not locate the assessor" })

		if (!assessor.isAssessor)
			return res
				.status(401)
				.json({ error: "The selected assessor is not an authorised peer reviewer" })

		// Does a QA already exist for this exhibit?

		const existingQA = await QA.findOne({ exhibit })
		if (existingQA) {
			// Check if that last QA is complete
			const mostRecentAssessment = existingQA.assessments[existingQA.assessments.length - 1]
			if (!mostRecentAssessment.complete)
				return res
					.status(400)
					.json({ error: "Cannot submit exhibit for QA when it is currently in QA" })

			// Add the new assessment to the QA
			existingQA.assessments.push({ assessor })
			await existingQA.save()
		} else {
			// Create a new QA
			const qa = new QA({
				author,
				exhibit,
				assessments: [
					{
						assessor,
					},
				],
			})

			await qa.save()
		}

		return res.status(204).send()
	} catch (err) {
		next(err)
	}
}

module.exports.getQAById = async (req, res, next) => {
	const { id } = req.params

	try {
		const qa = await QA.findById(id).populate(["author", "exhibit", "assessments.0.assessor"])
		if (!qa) res.status(404).json({ error: "No QA found with the given ID" })

		return res.json(qa)
	} catch (err) {
		next(err)
	}
}

module.exports.newComment = async (req, res, next) => {
	const { id } = req.params
	const { comment } = req.body

	try {
		const qa = await QA.findById(id)
		if (!qa) return res.status(404).json("A QA with the given ID does not exist")

		let assessment = qa.assessments[qa.assessments.length - 1]

		if (!assessment)
			return res.status(404).json({ error: "The given QA does not have an assessment" })

		assessment.comments.push({ text: comment })
		qa.save()

		return res.status(204).send()
	} catch (err) {
		next(err)
	}
}

module.exports.deleteComment = async (req, res, next) => {
	const { commentId } = req.params

	try {
		const qa = await QA.findOne({ "assessments.0.comments.0._id": commentId })
		if (!qa) return res.status(404).json({ error: "Could not find the specified comment" })

		let foundAndDeleted = false
		for (let i = 0; i < qa.assessments.length; i++) {
			const assessment = qa.assessments[i]

			for (let j = 0; j < assessment.comments.length; j++) {
				console.log(assessment.comments[j])
				if (assessment.comments[j]._id == commentId) {
					assessment.comments.splice(j, 1)
					foundAndDeleted = true
					break
				}
			}
		}

		qa.save()

		if (foundAndDeleted) {
			return res.status(204).send()
		} else {
			return res.status(404).json({ error: "Could not find the comment to delete" })
		}
	} catch (err) {
		next(err)
	}
}

module.exports.incrementScore = async (req, res, next) => {
	const { id } = req.params
	const { score, value } = req.body

	const scoreTypeError = validateScoreType(score)
	if (scoreTypeError) return res.status(400).json({ err: scoreTypeError })

	function valueToNumber(v) {
		const parsed = parseInt(v)
		if (isNaN(parsed)) return 0
		return parsed
	}

	const numericValue = valueToNumber(value)
	if (numericValue === 0) return res.status(204).send()

	try {
		const qa = await QA.findById(id)
		if (!qa) return res.status(404).json({ error: "Could not find a QA with the given ID" })

		const assessment = qa.assessments[qa.assessments.length - 1]
		assessment.scores[score] = assessment.scores[score] + numericValue

		await qa.save()
		return res.status(204).send()
	} catch (err) {
		next(err)
	}
}
