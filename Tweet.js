const mongoose = require('mongoose');

let TweetSchema = new mongoose.Schema({
    _id: String,
    created_at: String,
    // id: String,
    text: String,
    truncated: Boolean,
    user: {
        id: String,
        name: String,
        screen_name: String
    }
}, { _id: false });

mongoose.model('Tweet', TweetSchema);
module.exports = mongoose.model('Tweet');