const express = require('express')
const router = express.Router()
const common = require('../../../conf/common')
const db = require('../../../conf/db')

router.get("/", (req, res) => {
  res.render("../../routes/admin/paper/views/index.ejs",
    {
      layout : "../../components/layout/adminLayout.ejs"
    }
  )
})


router.get("/createPaper", (req, res) => {
  res.render("../../routes/admin/paper/views/createPaper.ejs",
    {
      layout : "../../components/layout/adminLayout.ejs"
    }
  )
})

module.exports = router;