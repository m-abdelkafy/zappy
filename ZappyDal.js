let Tweet = require('./Tweet.js');


class ZappyDal {
    getTweets(callback) {
        Tweet.find((err, tweets) => {
            return callback(err, tweets);
        });
    }
    upsertTweets(tweets, callback) {

        var upsertedTweets = [];
        var errors = [];
        tweets.forEach(tweet => {

            Tweet.findByIdAndUpdate(tweet._id, tweet, { upsert: true }, (err, result) => {
                if (err) {
                    errors.push(err);
                }
                upsertedTweets.push(result);
            });
        });
        callback(errors, tweets);
    }
}


module.exports = ZappyDal;