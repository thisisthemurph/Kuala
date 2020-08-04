const express = require("express")
const authRouter = express.Router()

const {
	getNotifications,
	createNotification,
	deleteNotification,
	setActioned,
} = require("../controllers/notificationController")
const { requireAuth } = require("../controllers/authController")

authRouter.get("/", requireAuth, getNotifications)
authRouter.post("/", requireAuth, createNotification)
authRouter.delete("/:id", requireAuth, deleteNotification)
authRouter.put("/:id", requireAuth, setActioned)

module.exports = authRouter
