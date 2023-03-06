const express = require("express");
const path = require("path");
const ejsLayouts = require('express-ejs-layouts')
const app = express();

// init databsase
require('./db/mongoose')

// view engine
app.set("view engine", "ejs");
app.use(ejsLayouts)
app.set('layout', './layouts/main')
app.set("views", path.join(__dirname + "/../views"));

//public folder
app.use(express.static('public'))

//body parser
app.use(express.urlencoded({extended:true}))

// middlewares
app.use('/', require('./middleware/view-variables'))

// mount routers

app.use(require('./routes/web'))

module.exports = app