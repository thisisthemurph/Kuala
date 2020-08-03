const express = require("express")
const apiRouter = express.Router()

const homeRouter = require("./home")
const authRouter = require("./auth")
const userRouter = require("./user")
const caseRouter = require("./case")
const qaRouter = require("./qa")

apiRouter.use("/", homeRouter)
apiRouter.use("/auth", authRouter)
apiRouter.use("/user", userRouter)
apiRouter.use("/case", caseRouter)
apiRouter.use("/qa", qaRouter)

module.exports = apiRouter
