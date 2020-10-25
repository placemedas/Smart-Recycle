const express = require('express')
const app = express()
const port = 3000 // comment out if on remote
//const port = 8080; // comment out if on local
const bodyParser = require('body-parser');

const image = require('./routes/api/image');


app.use(bodyParser.json({limit: '50mb'})) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })) // for parsing application/x-www-form-urlencoded
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Please Recycle!')
})

app.use('/api/image', image);

app.listen(port, () => {
    console.log(`Example app listening at http://:${port}`)
})

