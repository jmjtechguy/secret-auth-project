const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req,res) => {
    res.render('register')
})

router.post('/', (req,res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    })

    newUser.save(err => {
        if (err) {
            console.log(err)
        } else {
            res.render('secrets')
        }
    })
})


module.exports = router