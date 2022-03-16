const express = require('express')
const router = express.Router()
const common = require('../../../conf/common')
const db = require('../../../conf/db')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

const createSalt = () => new Promise( async(resolve, reject) => {
  crypto.randomBytes(64, (err, buf) => {
    if(err) {
      reject(err)
    } else {
      resolve(buf.toString('base64'))
    }
  })
})

const createHashedPassword = (password) => new Promise(async(resolve, reject) => {
  const salt = await createSalt();
  crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
    if(err) {
      reject(err)
    } else {
      resolve({password: key.toString('base64'), salt})
    }
  })
})

const makePasswordToHashed = (plainPassword, salt) => new Promise(async (resolve, reject) => {
  crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
    if(err) {
      reject(err)
    } else {
      resolve(key.toString('base64'))
    }
  })
})

router.get("/", (req, res) => {
  res.render("../../routes/user/join/views/index.ejs")
})

router.post("/join_process", async (req, res) => {
  const { m_id, m_pw, m_role } = req.body;

  
  const {password, salt} = await createHashedPassword(m_pw);
  
  db.query(`INSERT INTO waw_member (m_id, m_pw, reg_date) VALUES (?, ?, NOW())`, [m_id, m_pw], (err) => { })

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

router.post("/ajax/valid", (req, res) => {
  const { m_id } = req.body

  db.query("select * from waw_member where m_id=?", [m_id], (err, result) => {
    if (result.length > 0) {
      res.json(true)
    }
    else {
      res.json(false)
    }
  })
})

router.post("/mail/valid", (req, res) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.주소.com',
    secure: true,  //다른 포트를 사용해야 되면 false값을 주어야 합니다.
    //port: 587,   //다른 포트를 사용시 여기에 해당 값을 주어야 합니다.
    auth: {
      user: mailAddress,
      pass: mailPassword
    }
  })
  let info = transporter.sendMail({
    from: `"보내는사람이름" <보내는사람@주소.com>`,
    to: '받는사람1@주소.com, 받는사람2@주소.com',
    cc: '참조1@주소.com, 참조2@주소.com',
    bcc : '숨은참조1@주소.com, 숨은참조2@주소.com',
    subject: '메일제목입니다.',
    text: '텍스트로 보낼 때 사용됩니다.',
    html:'<div>HTML형식으로 보낼 때 사용됩니다.</div>',
    attachments: []
});
})



module.exports = router;