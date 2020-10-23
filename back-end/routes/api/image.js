const express = require('express');
const router = express.Router();

router.post('/image', (req, res) => {
    return res.status('400').json({error: "Not implemented."});

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

    let url = "https://api.recollect.net/api/areas/RecycleBC/services/waste/pages?suggest=w&type=material&set=default&include_links=true&locale=en&accept_list=true&_=1603489840194";

    axios.get(url, data, config).then(result => {
        console.log(res);
    })
});