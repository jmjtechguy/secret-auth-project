//jshint esversion:6
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
//--- require node libraries
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const expressLayouts = require('express-ejs-layouts')
const app = express()
const mongoose = require("mongoose")

//--- require controller/routes
const homeRouter = require('./routes/home')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')

const port = process.env.PORT || 3000 

//--- connect to database
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to Mongoose'))
//---

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

// --- use routes
app.use('/',homeRouter)
app.use('/register', registerRouter)
app.use('/login',loginRouter)

app.listen(port, (err) => {
    if(!err){
        console.log(`server started on port ${port}`)
    }

})
