const express = require('express')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router()
const db = admin.firestore();

router.use('/user/*', auth)
router.get('/user/history', function(req,res){
    const uid = res.locals.uid;
    db.collection("history").doc(uid).get().then(
        doc => {
            if(doc.exists){
                return res.status(200).json(doc.data())
            } else{
                return res.status(200).json({history : "No data"})
            }
        }
    )
})

router.get('/token', function(req,res){
    const uid = req.uid
    admin
        .auth()
        .createCustomToken(uid)
        .then((customToken) => {
            return res.status(200).json({
                authorization : "Bearer " + customToken
            })
        })
        .catch((error) => {
            return res.status(500)
        });

})

module.exports = router