const express = require('express')
const port = 80

const app = express()

app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.get('/firmy/tworcastron', (req, res) => {
    res.send('Hello kontakt')
})

app.listen(port)