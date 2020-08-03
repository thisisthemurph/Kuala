const express = require("express")
const qaRouter = express.Router()

const {
	getQAById,
	submit,
	newComment,
	deleteComment,
	incrementScore,
} = require("../controllers/qaController")

qaRouter.post("/", submit)
qaRouter.get("/:id", getQAById)

// Assessment ID not specified as you can only comment on the most recent QA assessment
qaRouter.post("/:id/comment", newComment)
qaRouter.delete("/comment/:commentId", deleteComment)
qaRouter.post("/:id/increment_score", incrementScore)

module.exports = qaRouter
