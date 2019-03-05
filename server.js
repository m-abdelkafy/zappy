const app = require('./app');
// process.env.NODE_ENV = 'development';
const config = require('./config');
const port = global.gConfig.port || 3000;
const server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});