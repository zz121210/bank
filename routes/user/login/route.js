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
      res.cookie("set-cookie",m_id)
      res.redirect('/admin')
    }
  })
})


router.get("/findEmail", (req, res) => {
  res.render("../../routes/user/login/views/findEmail.ejs",
    {
      layout : "../../components/layout/loginLayout.ejs"
    }
  )
})

router.post("/process/findEmail_process", (req, res) => {
  const {m_phone} = req.body
  memberGetId = new Promise((resolve) => {
    db.query("select * from waw_member_info where m_phone=?", [m_phone], (err, result) => {
      if(result.length > 0) {
        resolve(result[0].waw_id)
      }
    })
  })
  memberGetId.then(memberId => {
    db.query("select * from waw_member where waw_id = ?", [memberId], (err, result) => {
      
      const arr = result[0].m_id.toString().split("@");
      let str = arr[0].substr(0, arr[0].length - 3) + '***'
      str += '@'
      str += ('***'+arr[1].substr(3, arr[0].length))
      console.log(str)
      res.redirect("/login/checkEmail?m_id=" + str)
    })
  })
  
})

router.get("/checkEmail", (req, res) => {
  const {m_id} = req.query
  res.render("../../routes/user/login/views/checkEmail.ejs",
    {
      layout : "../../components/layout/loginLayout.ejs",
      m_id
    }
  )
})

router.get("/findPw", (req, res) => {
 
  res.render("../../routes/user/login/views/findPw.ejs",
    {
      layout : "../../components/layout/loginLayout.ejs"
    }
  )
})

router.post("/process/findPw_process", (req, res) => {
  const {m_id} = req.body
  db.query("select * from waw_member where m_id=?", [m_id], (err, result) => {
    if(result.length > 0) {
      base64EncodedText = Buffer.from(m_id, "utf8").toString('base64');
      common.sendMail(m_id, "비밀번호 인증 메일입니다.", '<a href="http://localhost:3000/login/auth/'+ base64EncodedText + '/changePw"><p> 비밀번호를 바꾸시려면 여기를 클릭하세요 </p></a>')  
    }    
  })
})

router.get("/auth/:authUrl/changePw", (req, res) => {
  const {authUrl} = req.params
  base64DecodedText = Buffer.from(authUrl, "base64").toString('utf8')
  res.render("../../routes/user/login/views/changePw.ejs",
    {
      layout : "../../components/layout/loginLayout.ejs",
      m_id: base64DecodedText
    }
  )
})

router.post("/process/changePw_process", (req, res) => {
  const {m_id, m_pw} = req.body
  memberGetId = new Promise((resolve) => {
    db.query("select * from waw_member where m_id=?", [m_id], (err, result) => {
      if(result.length > 0) {
        resolve(result[0].waw_id)
      } 
    })
  })
  
  memberGetId.then(memberId => {
    db.query("update waw_member set m_pw=? where waw_id=?", [m_pw, memberId], (err) => {
      res.redirect("/login")
    })
  })
})




module.exports = router;