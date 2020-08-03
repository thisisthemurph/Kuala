const mongoose = require("mongoose")
mongoose.Promise = global.Promise

module.exports.connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})

		console.log("Connected to the database")
	} catch (err) {
		console.error("Issue connecting to the database")
		throw new Error(err)
	}
}
