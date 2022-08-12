const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/', (req,res) => {
    res.render('register')
})

router.post('/', (req,res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const newUser = new User({
            email: req.body.username,
            password: hash
        })

        newUser.save(err => {
            if (err) {
                console.log(err)
            } else {
                res.render('secrets')
            }
        })
    })
})


module.exports = router