const express = require('express')
const router = express.Router()
const common = require('../../../conf/common')
const db = require('../../../conf/db')

router.get("/", (req, res) => {
  res.render("../../routes/user/login/views/index.ejs",
    {
      layout : "../../components/layout/loginLayout.ejs"
    }
  )
})

router.post("/process/login_process", (req, res) => {
  const {m_id, m_pw} = req.body

  db.query("select * from waw_member where m_id=? and m_pw=?", [m_id, m_pw], (err, result) => {
    if(result.length > 0) {
      req.session.id = result.m_id
      req.session.save(() => {
        res.redirect('/admin')
      })
    }
  })
})

//

router.get("/findEmail", (req, res) => {
  res.render("../../routes/user/login/views/findEmail.ejs",
    {
      layout : "../../components/layout/loginLayout.ejs"
    }
  )
})

router.post("/process/findEmail_process", (req, res) => {
  res.render("/login/checkEamil")
})

router.get("/checkEmail", (req, res) => {
  res.render("../../routes/user/login/views/checkEmail.ejs",
    {
      layout : "../../components/layout/loginLayout.ejs"
    }
  )
})

//

router.get("/findPw", (req, res) => {
  res.render("../../routes/user/login/views/findPw.ejs",
    {
      layout : "../../components/layout/loginLayout.ejs"
    }
  )
})

router.post("/process/findPw_process", (req, res) => {
  res.redirect("/login/changePw")
})

router.get("/changePw", (req, res) => {
  res.render("../../routes/user/login/views/changePw.ejs",
    {
      layout : "../../components/layout/loginLayout.ejs"
    }
  )
})

router.post("/process/changePw_process", (req, res) => {
  res.redirect("/login")
})




module.exports = router;