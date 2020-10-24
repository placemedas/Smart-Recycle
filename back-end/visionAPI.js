module.exports = {
    //Below code calls Cloud Vision API and uses both object detection and label detection to fetch image tags
    detectimage: async function detectimage(imageBase64) {
        // Imports the Google Cloud client libraries
        const vision = require('@google-cloud/vision');
        const fs = require('fs');
        const cryptoJSON = require('crypto-json');

        // console.log(imageBase64.length);
        // console.log('----HERE');
        // console.log(imageBase64);
        imageBase64 = imageBase64.replace('data:image/png;base64,','');
        // Decrypts the writtenObject
        let readFile;
        try {
            readFile = fs.readFileSync('writtenObject.json');
            readFile = JSON.parse(readFile);
            readFile = cryptoJSON.decrypt(readFile, 'SmartRecycle');
        } catch (error) {
            console.log(error);
        }

        // Creates a client
        const client = new vision.ImageAnnotatorClient({
            credentials: readFile
        });
        let request;
        try {
            request = {
                image: { content: imageBase64 },
            };
        } catch (error) {
            console.log(error);
        }

        //below part of the code fetches the predicted objects
        let result;
        let objects = [];
        var arr_obj_det = [];
        var lab_obj_det = '';
        try {
            [result] = await client.objectLocalization(request);
            objects.push(result.localizedObjectAnnotations);
            objects.forEach(object => {
                arr_obj_det.push(object.name);
                lab_obj_det = arr_obj_det.slice(1, 3).join(' ');
                // console.log(lab_obj_det);
            });
        } catch (error) {
            console.log(error);
        }
        var pred_flag = true

        //below code fetches the predicted labels
        var arr_lab_det = [];
        var lab_lab_det = '';
        let newVar;
        let labels = [];
        try {
            request['features'] = [{type: "LABEL_DETECTION"}];
            newVar = await client.annotateImage(request);
            labels = newVar[0].labelAnnotations;
            labels.forEach(label => {
                arr_lab_det.push(label.description);
                lab_lab_det = arr_lab_det.slice(1, 3).join(' ');
            })
        } catch (error) {
            console.log(error);
        }


        // console.log(lab_lab_det);
        return final_string = lab_obj_det + " " + lab_lab_det;
        // console.log(`Search String is:${final_string}`);

    }
}