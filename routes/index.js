const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
var router = express.Router()


//mongoose.model("usercollection", {username: String, email: String})

router.get('/', function (req, res) {
  //   db.on('error', console.error.bind(console, 'connection error:'))
  //
  //   db.once('open', function() {
  //       // we're connected!
  //       const kittySchema = new mongoose.Schema({
  //           name: String
  //       })
  //
  //       const Kitten = mongoose.model('Kitten', kittySchema)
  //
  //   })
  //
  //
  //
  // mongoose.model("randomFoods").find(function(err, users) {
  //     res.send(users)
  // })

  res.sendFile(path.join(__dirname, '../public/html', 'index.html'))
})

// router.get('/', function (req, res) {
//   var resultArr = []
//
//   MongoClient.connect(url, function(err, db) {
//       assert.equal(null, err)
//
//       var cursor = db.collection("usercollection").find()
//
//       cursor.forEach(function(doc, err) {
//           assert.equal(null, err)
//           resultArr.push(doc)
//       }, function () {
//           db.close()
//           console.log("\nDoe.. a deer\n")
//           console.log(resultArr)
//           res.sendFile(path.join(__dirname, '../public/html', 'index.html'), resultArr)
//       })
//
//   })
// })

module.exports = router
