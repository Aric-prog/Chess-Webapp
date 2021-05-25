const express = require('express')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router()


router.use('/api/user/*', auth)
router.post('/api/user/history', function(req,res){
    
})
router.get('/api/token', function(req,res){
    const uid = "test"
    admin
        .auth()
        .createCustomToken(uid)
        .then((customToken) => {
            console.log(customToken)
            return res.status(200).json({
                authorization : "Bearer " + customToken
            })
        })
        .catch((error) => {
            console.log('Error creating custom token: ', error);
            return res.status(500)
        });

})

module.exports = router