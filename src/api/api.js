var express = require('express')
var auth = require('../middleware/auth')
var router = express.Router()

router.use('/api', auth)
router.post('/api/history', function(req,res){
    
})
module.exports = router