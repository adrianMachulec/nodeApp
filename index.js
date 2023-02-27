const express = require('express')
const path = require('path')
const port = 80
const app = express()

// view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/firmy/:name', (req, res) => {
    const { name } = req.params
    const comapnies = [
        { slug: 'tworcastron', name: 'Tworca Stron.pl' },
        { slug: 'brukmode', name: 'Bruk Mode' }
    ]

    const company = comapnies.find(x => x.slug === name)
    
    res.render('company', { name: company?.name})
})

app.get('*', (req, res) => {
    res.render('errors/404')
})

app.listen(port)