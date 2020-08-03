const express = require("express")
const authRouter = express.Router()

const { register, login, updatePassword } = require("../controllers/authController")

authRouter.post("/login", login)
authRouter.post("/register", register)
authRouter.put("/password", updatePassword)

module.exports = authRouter
