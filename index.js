const http = require('http')

const server = http.createServer(function(req, res) {
    console.log('Ktoś wszedł na serwer...')
})

server.listen(3000)