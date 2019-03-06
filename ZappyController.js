const express = require('express');
const router = express.Router();
const ZappyService = require('./ZappyService');
const TwitterService = require('./TwitterService');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let zappyService = new ZappyService();
let twitterService = new TwitterService();
router.get('/', (req, res) => {
    zappyService.getTweets((err, tweets) => {
        if (err) {
            return res.status(500).send('There was a problem finding tweets.');
        }
        res.status(200).send({ tweets });
    });
});
router.post('/', (req, res) => {
    twitterService.getTweets(req.query.message, (errors, upsertedTweets) => {
        if (errors.length > 0) {
            return res.status(500).send('There was a problem.');
        }
        res.status(200).send({ tweets: upsertedTweets });
    });
});


module.exports = router;