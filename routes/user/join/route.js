const express = require('express')
const router = express.Router()
const common = require('../../../conf/common')
const db = require('../../../conf/db')

router.get("/", (req, res) => {
  res.render("../../routes/user/join/views/index.ejs")
})

router.post("/join_process", (req, res) => {
  const { m_id, m_pw, m_role } = req.body;
  
  db.query(`INSERT INTO waw_member (m_id, m_pw, reg_date) VALUES (?, ?, NOW())`, [m_id, m_pw], (err) => {}) 
  
  memberGetId = new Promise((resolve) => {
    db.query("select * from waw_member where m_id=? and m_pw=?", [m_id, m_pw], (err, result1) => {
      resolve(result1[0].waw_id)
    })
  })
  
  memberGetId.then(memberId => {
    db.query("insert into waw_member_info (waw_member_id, m_role) values(?, ?)", [memberId, m_role], (err) => {
      res.redirect("/login")
    })
  })
  
})

module.exports = router;