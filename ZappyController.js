const express = require('express');
const router = express.Router();
const Twitter = require('twitter-node-client').Twitter;
const config = require('./config.js');
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
let Tweet = require('./Tweet.js')

let twitter = new Twitter(global.gConfig.twitter_keys);
router.get('/', (req, res) => {
    Tweet.find((err, tweets) => {
        if (err) {
            return res.status(500).send('There was a problem finding tweets.');
        }
        res.status(200).send(tweets);
     });
});
router.post('/', (req, res) => {
    if (req.query.message.toLowerCase().indexOf('go') === -1) {
        return res.status(200).send({ message: "not what i'm waiting for" });
    }
    twitter.getUserTimeline({ screen_name: 'FictionFone2', count: '100' }, (err) => {
        console.log('ERROR [%s]', err);
    }, (data) => {
        let parsedData = JSON.parse(data);
        let tweets = parsedData.map(element => {
            return {
                _id: element.id_str,
                created_at: element.created_at,
                id: element.id_str,
                text: element.text,
                truncated: element.truncated,
                user: {
                    id: element.user.id_str,
                    name: element.user.name,
                    screen_name: element.user.screen_name
                }
            };
        });
        let upsertedtweets = [];
        tweets.forEach(tweet => {
            Tweet.findByIdAndUpdate(tweet._id, tweet, { upsert: true }, (err, result) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .send('There was a problem adding the information to the database.');
                }
                upsertedtweets.push(result);
            });
        });
        res.status(200).send({ tweets: upsertedtweets });
    });
});


module.exports = router;