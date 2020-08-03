const express = require("express")
const homeRouter = express.Router()

homeRouter.get("/", (req, res) => {
	res.json({ msg: "Welcome to the Koala API" })
})

module.exports = homeRouter
