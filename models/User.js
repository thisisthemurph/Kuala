const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			minlength: 8,
		},
		avatar: String,
		bio: {
			type: String,
			maxlength: 280,
		},
		isAssessor: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		theme: {
			type: String,
			default: "light",
		},
		markedDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

UserSchema.pre("save", async function (next) {
	if (this.modifiedPaths().includes("password")) {
		try {
			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(this.password, salt)
			this.password = hash

			next()
		} catch (err) {
			return next(err)
		}
	} else {
		next()
	}
})

const User = mongoose.model("User", UserSchema)
module.exports = User
