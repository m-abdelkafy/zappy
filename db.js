const mongoose = require('mongoose');
const config = require('./config');
const url = global.gConfig.database || 'mongodb://127.0.0.1:27017/zappy';

mongoose.connection.once('open', function() {
  console.info('MongoDB event open');
  console.debug(`MongoDB connected ${url}`);

  mongoose.connection.on('connected', function() {
    console.info('MongoDB event connected');
  });

  mongoose.connection.on('disconnected', function() {
    console.warn('MongoDB event disconnected');
  });

  mongoose.connection.on('reconnected', function() {
    console.info('MongoDB event reconnected');
  });

  mongoose.connection.on('error', function(err) {
    console.error(err);
  });
});

return mongoose.connect(
  url,
  {useNewUrlParser: true},
  err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  },
);