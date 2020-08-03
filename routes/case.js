const express = require("express")
const caseRouter = express.Router()

const {
	allCases,
	newCase,
	getCase,
	updateCase,
	deleteCase,
	addExhibit,
	updateExhibit,
	deleteExhibit,
} = require("../controllers/caseController")

caseRouter.get("/", allCases)

caseRouter.get("/:caseReference", getCase)

caseRouter.post("/:caseReference", addExhibit)
caseRouter.put("/:caseReference/exhibit/:reference", updateExhibit)
caseRouter.delete("/:caseReference/exhibit/:reference", deleteExhibit)

module.exports = caseRouter
