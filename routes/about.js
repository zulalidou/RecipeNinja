var express = require('express')
const path = require('path')
var router = express.Router()

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/', 'about.html'))
  //res.sendFile(__dirname  + "/html/about.html");
})

module.exports = router
