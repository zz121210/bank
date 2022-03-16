const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser');
router.use(cookieParser())

const loginRouter = require('./login/route')
const joinRouter = require('./join/route')

router.get("/", (req, res) => {
  res.render("../../routes/user/index/views/index.ejs")
})

router.get("/login", (req, res) => {
  res.render("../../routes/user/login/views/index.ejs")
})

router.get("/join", (req, res) => {
  res.render("../../routes/user/join/views/index.ejs")
})

router.use('/login', loginRouter)
router.use('/join', joinRouter)

module.exports = router;