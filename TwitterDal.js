const Twitter = require('twitter-node-client').Twitter;
const config = require('./config.js');

let twitter = new Twitter(global.gConfig.twitter_keys);

class TwitterDal {
    getTweets(err, callback) {
        twitter.getUserTimeline({ screen_name: 'FictionFone2', count: '100' }, err, (data) => {
            callback(data);
        });
    }
}

module.exports = TwitterDal;