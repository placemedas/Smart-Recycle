const express = require('express')
const app = express()
const port = 3000

const image = require('./routes/api/image');

app.use(function(req, res, next) {
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


//Below code calls Cloud Vision API and uses both object detection and label detection to fetch image tags
async function detectimage(fileName) {
    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');
    const fs = require('fs');

    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: 'smart-recycle-12345-758a032defdf.json'
    });

    const request = {
        image: { content: fs.readFileSync(fileName) },
    };

    //below part of the code fetches the predicted objects
    const [result] = await client.objectLocalization(request);
    var pred_flag = true

    const objects = result.localizedObjectAnnotations;
    //console.log(objects)
    var arr_obj_det = [];
    var lab_obj_det = '';
    objects.forEach(object => {
        arr_obj_det.push(object.name);
        lab_obj_det = arr_obj_det.slice(1, 3).join(' ');
        console.log(lab_obj_det);
    });

    //below code fetches the predicted labels
    var arr_lab_det = [];
    var lab_lab_det = '';
    var newVar = await client.labelDetection(fileName);
    const labels = newVar[0].labelAnnotations;
    labels.forEach(label => {
        arr_lab_det.push(label.description);
        lab_lab_det = arr_lab_det.slice(1, 3).join(' ');
    })
    console.log(lab_lab_det);
    final_string = lab_obj_det + " " + lab_lab_det;
    console.log(`Search String is:${final_string}`);
}

const fileName = './beer-bottles.jpg';
detectimage(fileName);