const express = require('express')
const router = express.Router()
const common = require('../../../conf/common')
const db = require('../../../conf/db')


router.get("/", (req, res) => {
  res.render("../../routes/user/join/views/index.ejs",
    {
      layout : "../../components/layout/loginLayout.ejs"
    }
  )
})


router.post("/process/join_process", (req, res) => {
  const { m_id, m_pw, m_role, m_phone } = req.body;

  
  db.query(`INSERT INTO waw_member (m_id, m_pw, reg_date) VALUES (?, ?, NOW())`, [m_id, m_pw], (err) => { })

  memberGetId = new Promise((resolve) => {
    db.query("select * from waw_member where m_id=? and m_pw=?", [m_id, m_pw], (err, result) => {
      resolve(result[0].waw_id)
    })
  })

  memberGetId.then(memberId => {

    db.query("insert into waw_member_info (waw_member_id, m_role, m_phone) values(?, ?, ?)", [memberId, m_role, m_phone], (err) => {

      base64EncodedText = Buffer.from(m_id+':'+m_pw, "utf8").toString('base64');
      common.sendMail(m_id, "이메일 인증메일입니다.", '<a href="http://localhost:3000/join/auth/'+ base64EncodedText + '"><p> 이메일을 인증하려면 여기를 클릭하세요 </p></a>')
      res.redirect("/login")
    })
  })
})



router.post("/ajax/idValid", (req, res) => {
  const {m_id} = req.body

  db.query("select * from waw_member where m_id=?", [m_id], (err, result) => {
    if (result.length > 0) {
      res.json(true)
    }
    else {
      res.json(false)
    }
  })
})


router.post("/ajax/phoneValid", (req, res) => {
  const {m_phone} = req.body
  db.query("select * from waw_member_info where m_phone=?", [m_phone], (err, result) => {
    
    if(result.length > 0) {
      res.json(true)
    }
    else {
      res.json(false)
    }
  })
})


router.get("/auth/:authUrl", (req, res) => {
  const {authUrl} = req.params;
  base64DecodedText = Buffer.from(authUrl, "base64").toString('utf8').split(':');
  const m_id = base64DecodedText[0]
  const m_pw = base64DecodedText[1]

  memberGetId = new Promise((resolve) => {
    db.query("select * from waw_member where m_id=? and m_pw=?", [m_id, m_pw], (err, result) => {
      resolve(result[0].waw_id)
    })
  })
  memberGetId.then(memberId => {
    db.query("update waw_member set email_valid = 1 where waw_id=?", [memberId], (err) => {
      res.redirect("/login")
    })
  })
})

module.exports = router;