let Tweet = require('./Tweet.js');


class ZappyDal {
    getTweets(callback) {
        Tweet.find((err, tweets) => {
            return callback(err, tweets);
        });
    }
    upsertTweets(tweets, callback) {
        let upsertedTweets = [];
        let errors = [];
        tweets.forEach(tweet => {

            Tweet.findByIdAndUpdate(tweet._id, tweet, { upsert: true }, (err, result) => {
                if (err) {
                    errors.push(err);
                }
                if (!result) {
                    upsertedTweets.push(tweet);
                }
            });
        });
        if (typeof callback === "function") {
            callback(errors, upsertedTweets);
        }
    }
}


module.exports = ZappyDal;