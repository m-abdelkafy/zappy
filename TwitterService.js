const TwitterDal = require('./TwitterDal');
const ZappyDal = require('./ZappyDal');

let zappyDal = new ZappyDal();
let twitterDal = new TwitterDal();

class TwitterService {
    getTweets(message, callback) {
        if (this.containsGo(message)) {
            console.debug('inside containsGo');
            return twitterDal.getTweets(this.errorHandling, this.upsertTweets);
        }
        return callback(false, []);
    }

    containsGo(message) {
        return message.toLowerCase().indexOf('go') !== -1;
    }

    errorHandling(err) {
        console.log('ERROR [%s]', err);
    }

    upsertTweets(data, callback) {
        console.debug('start upsert');
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
        // let tweets = this.mapResponseToTweet(data);
        return zappyDal.upsertTweets(tweets, (err, tweets)=>{
            return callback(err, tweets);
        });
    }

    mapResponseToTweet(data) {
        console.debug(data);
        let parsedData = JSON.parse(data);
        return parsedData.map(element => {
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
    }
}

module.exports = TwitterService;