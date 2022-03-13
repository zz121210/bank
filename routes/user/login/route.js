const express = require('express')
const router = express.Router()
const common = require('../../../conf/common')
const db = require('../../../conf/db')

router.get("/", (req, res) => {
  res.render("../../routes/user/login/views/index.ejs")
})

router.post("/login_process", (req, res) => {
  const {m_id, m_pw} = req.body

  db.query("select * from waw_member where m_id=? and m_pw=?", [m_id, m_pw], (err, result) => {
    if(result.length > 0) {
      console.log("pass")
      req.session.id = result.m_id
      console.log(req.session.id)
      req.session.save(() => {
        res.redirect('/')
      })
    }
  })
})

module.exports = router;