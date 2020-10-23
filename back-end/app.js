const express = require('express')
const app = express()
const port = 3000

const image = require('./routes/api/image');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/image', image);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})