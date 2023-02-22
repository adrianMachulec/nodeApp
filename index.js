const express = require('express')
const port = 80

const app = express()

app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.get('/firmy/:name', (req, res) => {
    const { name } = req.params
    const comapnies = [
        { slug: 'tworcastron', name: 'Tworca Stron.pl' },
        { slug: 'brukmode', name: 'Bruk Mode' }
    ]

    const company = comapnies.find(x => x.slug === name)
    
    if(company){
        res.send(`Nazwa firmy: ${company.name}`)
    } else {
        res.send(`Nie znaleziono firmy`)
    }
})

app.listen(port)