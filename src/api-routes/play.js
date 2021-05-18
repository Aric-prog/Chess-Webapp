var express = require('express')
var auth = require('../middleware/auth')
var router = express.Router()

router.use('/', auth)
router.post('/api/move', function(req,res){
    // On valid move, post the current fen in firebase match history
    // Update the current fen of the room it was played in
    // Emit data back to the user
})

router.post('/api/history', function(req,res){
    
})
module.exports = router