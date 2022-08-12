const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

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
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if(result === true) {
                        res.render('secrets')
                    }

                })
            }
        }

    })
})


module.exports = router