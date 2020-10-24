const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
const imageApi = require('../../visionAPI.js');

router.post('/', upload.array(), (req, res) => {
    // console.log(req.body);

    imageApi.detectimage(req.body.image).then(imageString => {
        let config = {
            headers: {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US, en;q=0.9",
                "content-type": "application/json",
                "cookie": "recollect-locale=en; temp-client-id=99A118AE-1547-11EB-B167-8F0069A2782F; recollect-cache={%22default_name%22:%22kohl%22%2C%22default_email%22:%22kohlglenn@gmail.com%22}",
                "referer": "https://api.recollect.net/w/home",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
                "x-recollect-place": "null",
                "x-requested-with": "XMLHttpRequest",
                "x-widget-instance": "99A118AE-1547-11EB-B167-8F0069A2782F",
                "x-widget-version": "0.11.1603482829",
            }
        };

        let data = {

        };

        // NEED TO REPLACE WITH STRING FROM GOOGLE VISION API! :)
        // let searchString = encodeURIComponent("wax paper");
        let searchString = imageString;

        let pagesUrl = `https://api.recollect.net/api/areas/RecycleBC/services/waste/pages?suggest=${searchString}&type=material&set=default&include_links=true&locale=en&accept_list=true&_=1603489840194`;

        axios.get(pagesUrl, data, config).then(result => {
            let id = result.data[0].id;
            console.log(id);
            let resultUrl = `https://api.recollect.net/api/areas/RecycleBC/services/waste/pages/en/${id}.json?widget_config=%7B%22js_host%22%3A%22https%3A%2F%2Fapi.recollect.net%22%2C%22version%22%3A%220.11.1603482829%22%2C%22api_host%22%3A%22https%3A%2F%2Fapi.recollect.net%22%2C%22base%22%3A%22https%3A%2F%2Frecollect.net%22%2C%22area%22%3A%22MMBC%22%2C%22name%22%3A%22wizard%22%7D&_=1603490576162`;
            return axios.get(resultUrl);
        }).then(newResult => {
            console.log(newResult.data);
            res.status(200).json(newResult.data);
        }).catch(error => {
            res.status(200).send('result unsuccessful');
        });
    }).catch(error => {
        console.log(error);
        res.status(400).json(error);
    });
});

module.exports = router;