const express = require("express");
const path = require("path");
const ejsLayouts = require('express-ejs-layouts')
const app = express();
const cookieParser = require('cookie-parser')
const session = require('express-session');
const {sessionKeySecret} = require('./config')

// init databsase
require('./db/mongoose')

// session
app.use(session({
    secret: sessionKeySecret,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
    resave: false
}))

// view engine
app.set("view engine", "ejs");
app.use(ejsLayouts)
app.set('layout', './layouts/main')
app.set("views", path.join(__dirname + "/../views"));

//public folder
app.use(express.static('public'))

//body parser
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())

// middlewares
app.use('/', require('./middleware/view-variables-middleware'))
app.use('/', require('./middleware/user-middleware'))

app.use('/admin', require('./middleware/is-auth-middleware'))

// mount routers

app.use('/api', require('./routes/api'))
app.use(require('./routes/web'))

module.exports = app