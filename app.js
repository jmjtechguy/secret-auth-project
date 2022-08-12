//jshint esversion:6
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const expressLayouts = require('express-ejs-layouts')
const app = express()
const indexRouter = require('./routes/index')
const mongoose = require("mongoose")

const port = process.env.PORT || 3000 

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to Mongoose'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


app.use('/',indexRouter)

app.get("/login", (req,res) => {
    res.render("login")
})

app.get("/register", (req,res) => {
    res.render("register")
})


app.listen(port, (err) => {
    if(!err){
        console.log(`server started on port ${port}`)
    }

})
