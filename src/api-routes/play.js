var express = require('express')
var auth = require('../middleware/auth')
var router = express.Router()

router.use('/', auth)
router.post('/api/move', function(req,res){
    
})

module.exports = router