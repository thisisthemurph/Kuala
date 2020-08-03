const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
	message: {
		type: String,
		maxlength: 280,
	},
	link: String,
	created: {
		type: Date,
		default: Date.now(),
	},
	// The initial time the notification was presented to the user
	seen: {
		type: Date,
		default: null,
	},
	// The time the user clicked on the notification
	actioned: {
		type: Date,
		dafault: null,
	},
})

const Notification = mongoose.model("Notification", NotificationSchema)
module.exports = Notification
