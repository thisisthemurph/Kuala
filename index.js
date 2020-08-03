const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const database = require("./db")
const apiRouter = require("./routes")

dotenv.config()

const app = express()
const PORT = process.env.port || 9000

// Database
database.connect()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/v1", apiRouter)

app.use((err, req, res, next) => {
	const basicErrMsg = "An unexpected error has occurred"

	if (!err.statusCode) {
		err.statusCode = 500
	}

	console.log(
		err.statusCode >= 500
			? `${basicErrMsg}, please try again later`
			: `${basicErrMsg}: '${err.message}'`
	)

	res.status(err.statusCode).json({
		error:
			err.statusCode >= 500
				? `${basicErrMsg}, please try again later`
				: `${basicErrMsg}: '${err.message}'`,
	})
})

const server = app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`))
