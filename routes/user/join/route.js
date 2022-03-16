const express = require('express')
const router = express.Router()
const common = require('../../../conf/common')
const db = require('../../../conf/db')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

router.get("/", (req, res) => {
  res.render("../../routes/user/join/views/index.ejs",
    {
      layout : "../../components/layout/loginLayout.ejs"
    }
  )
})

router.post("/process/join_process", (req, res) => {
  const { m_id, m_pw, m_role, m_phone } = req.body;
  
  db.query(`INSERT INTO waw_member (m_id, m_pw, reg_date) VALUES (?, ?, NOW())`, [m_id, m_pw], (err) => {}) 
  
  memberGetId = new Promise((resolve) => {
    db.query("select * from waw_member where m_id=? and m_pw=?", [m_id, m_pw], (err, result1) => {
      resolve(result1[0].waw_id)
    })
  })
  
  memberGetId.then(memberId => {
    db.query("insert into waw_member_info (waw_member_id, m_role, m_phone) values(?, ?, ?)", [memberId, m_role, m_phone], (err) => {

      try {
        const mailConfig = {
          service: 'Naver',
          host: 'smtp.naver.com',
          port: 587,
          auth: {
            user: "smy4778",
            pass: "password"
          }
        }
        const message = {
          from: "smy4778@naver.com",
          to: m_id,
          subject: '이메일 인증 요청 메일입니다.',
          html: '<a href="localhost:3000/' + m_id + '/'+ m_pw + '"><p> 이메일을 인증하려면 여기를 클릭하세요 </p></a>' // localhost변경 및 모르는 사람에게 메일이 왔을시
        }
        const transporter = nodemailer.createTransport(mailConfig)
        transporter.sendMail(message)
      } catch (error) {
        console.log(error)
      }

      res.redirect("/login")
    })
  })
})


router.post("/ajax/idValid", (req, res) => {
  const {m_id} = req.body

  db.query("select * from waw_member where m_id=?", [m_id], (err, result) => {
    if(result.length > 0) {
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

router.get("/:m_id/:m_pw", (req, res) => {
  const {m_id, m_pw} = req.params;
  memberGetId = new Promise((resolve) => {
    db.query("select * from waw_member where m_id=? and m_pw=?", [m_id, m_pw], (err, result) => {
      resolve(result[0].waw_id)
    })
  })
  memberGetId.then(memberId => {
    console.log(memberId)
    db.query("update waw_member set email_valid = 1 where waw_id=?", [memberId], (err) => {
      res.redirect("/login")
    })
  })
})


module.exports = router;