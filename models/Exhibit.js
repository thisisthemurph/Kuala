const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ExhibitSchema = new Schema(
	{
		reference: {
			type: String,
			required: true,
			lowercase: true,
		},
		caseReference: {
			type: String,
			required: true,
			lowercase: true,
		},
		make: String,
		model: String,
		analyst: {
			type: Schema.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
)

const Exhibit = mongoose.model("Exhibit", ExhibitSchema)
module.exports = Exhibit
