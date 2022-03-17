// index 
// (ctrl+f)로 "(숫자)"를 검색
// (1). 숫자 세자리수의 콤마를 부여 < 20211018 김진우
// (2). 랜덤 숫자 함수  < 20211018 김진우
// (3). 랜덤 문자 함수 < 20211018 김진우
// (4). 랜덤 문자+숫자 함수 < 20211018 김진우

const nodemailer = require('nodemailer')

module.exports = {
  // (1)
  addComma : (num) => {
      var regexp = /\B(?=(\d{3})+(?!\d))/g;
      return num.toString().replace(regexp, ',');
  },

  // (2). min 미만이 될 수 없으며, max를 초과할 수 없다.
  randNum : (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
  },   

  // (3). a-z, A-Z 랜덤
  randStr : (num) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      const stringLength = num
      let randStr = ''
      for (let i = 0; i < stringLength; i++) {
        const rnum = Math.floor(Math.random() * chars.length)
        randStr += chars.substring(rnum, rnum + 1)
      }
      return randStr
  },

  // (4). a-z, A-Z, 0-9 랜덤
  randStrNum : (num) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const stringLength = num
      let randStr = ''
      for (let i = 0; i < stringLength; i++) {
        const rnum = Math.floor(Math.random() * chars.length)
        randStr += chars.substring(rnum, rnum + 1)
      }
      return randStr
  },

  createHashedPassword : (password) => new Promise(async(resolve, reject) => {
    crypto.randomBytes(64, (err,buf) => {
      crypto.pbkdf2(password, buf.toString('base64'), 9999, 64, 'sha512', (err, key) => {
        if(err) {
          reject(err)
        } else {
          resolve({password: key.toString('base64'), salt})
        }
      })
    })
  }),
  
  makePasswordToHashed : (plainPassword, salt) => new Promise(async (resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
      if(err) {
        reject(err)
      } else {
        resolve(key.toString('base64'))
      }
    })
  }),

  sendMail : (to, subject, html) => {try {
    const mailConfig = {
      service: 'Naver',
      host: 'smtp.naver.com',
      port: 587,
      auth: {
        user: "smy4778",
        pass: "sk13579"
      }
    }
    const message = {
      from: "smy4778@naver.com",
      to,
      subject,
      html
      // // localhost변경 및 모르는 사람에게 메일이 왔을시
    }
    const transporter = nodemailer.createTransport(mailConfig)
    transporter.sendMail(message)
  } catch (error) {
    console.log(error)
  }}
}