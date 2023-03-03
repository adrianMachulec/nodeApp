const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/katalog-firm'

mongoose.set('strictQuery', true)
mongoose.connect(url)