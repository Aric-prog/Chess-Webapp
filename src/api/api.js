const express = require('express')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router()
const db = admin.firestore();

// register authorization middleware
router.use('/user/*', auth)

// query to firebase using service account
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

module.exports = router