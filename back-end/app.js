const express = require('express')
const app = express()
const port = 3000

const image = require('./routes/api/image');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/image', image);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const visionAPI = require('./visionAPI.js');
const fileName = './beer-bottles.jpg';
visionAPI.detectimage(fileName);