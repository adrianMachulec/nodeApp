const app = require('./app')

const port = 80;

app.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie ${port}`)
});