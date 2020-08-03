const mongoose = require("mongoose")
const Schema = mongoose.Schema

const QASchema = new Schema(
	{
		author: {
			type: Schema.ObjectId,
			ref: "User",
		},
		exhibit: {
			type: Schema.ObjectId,
			ref: "Exhibit",
		},
		assessments: [
			{
				assessor: {
					type: Schema.ObjectId,
					ref: "User",
				},
				comments: [
					{
						text: {
							type: String,
							maxlength: 280,
						},
						created: {
							type: Date,
							default: Date.now(),
						},
					},
				],
				scores: {
					presentation: {
						type: Number,
						default: 0,
					},
					notes: {
						type: Number,
						default: 0,
					},
					methodology: {
						type: Number,
						default: 0,
					},
					exhibitedData: {
						type: Number,
						default: 0,
					},
					prevQA: {
						type: Number,
						default: 0,
					},
					neglectful: {
						type: Number,
						default: 0,
					},
				},
				complete: {
					type: Boolean,
					default: false,
				},
			},
			{ timestamps: true },
		],
	},
	{ timestamps: true }
)

const QA = mongoose.model("QA", QASchema)
module.exports = QA
