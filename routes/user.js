const express = require("express")
const userRouter = express.Router()

const {
	allUsers,
	getUser,
	updateUser,
	deleteUser,
	getAllCases,
	getQAs,
	reviveUser,
} = require("../controllers/userController")

userRouter.get("/all", allUsers)

userRouter.get("/:username", getUser)
userRouter.put("/:username", updateUser)
userRouter.delete("/:username", deleteUser)
userRouter.put("/:username/revive", reviveUser)

userRouter.get("/:username/cases", getAllCases)
userRouter.get("/:username/qa/:query", getQAs)

module.exports = userRouter
