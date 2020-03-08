const express = require('express');
const bodyParser = require('body-parser');

const v3 = require('watson-developer-cloud/personality-insights/v3');

const auth = new v3({
    username: "apikey",
    password: "XXX",
    version: "2017-10-13"
});

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/api/upload-text', (req, res) => {
    let params = {
        content: req.body.textContent,
        content_type: 'text/plain',
        accept: 'text/csv',
        consumption_preferences: true
    };

    auth.profile(params, (err, response) => {
        if (err) {
            console.log('Error:', error);
        } else {
            res.send(
                JSON.stringify(response)
            );
        }
    })
});
