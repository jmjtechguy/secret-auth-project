const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req,res) => {
    res.render('login')
})

router.post('/', (req,res) => {
    const username = req.body.username
    const password = req.body.password

    User.findOne({email:username}, (err, foundUser) => {
        if(err) {
            console.log(err)
        } else {
            if(foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets")
                }
            }
        }

    })
})


module.exports = router