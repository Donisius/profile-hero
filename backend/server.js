const express = require('express');
const bodyParser = require('body-parser');

const v3_PI = require('watson-developer-cloud/personality-insights/v3');
const v3_TA = require('watson-developer-cloud/tone-analyzer/v3');

const auth_PI = new v3_PI({
    username: "apikey",
    password: "XXX",
    version: "2017-10-13"
});

const auth_TA = new v3_TA({
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

    const toneParams = {
        tone_input: { 'text': req.body.textContent },
        content_type: 'application/json'
    };

    auth_TA.tone(toneParams)
        .then(toneAnalysis => {
            auth_PI.profile(params, (err, response) => {
                if (err) {
                    console.log('Error:', error);
                } else {
                    res.send(
                        JSON.stringify({
                            PI: response,
                            TONE: toneAnalysis
                        })
                    );
                }
            });
        })
        .catch(err => console.log(err));

});
