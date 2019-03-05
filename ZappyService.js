let ZappyDal = require('./ZappyDal');

let zappyDal = new ZappyDal();

class ZappyService {
    getTweets(callback) {
        zappyDal.getTweets((err, tweets) => {
            return callback(err, tweets);
        });
    }

}

module.exports = ZappyService;