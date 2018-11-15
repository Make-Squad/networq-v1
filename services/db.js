const mongoose = require('mongoose');
const dbURI = process.env.MONGODB || `mongodb://localhost/${process.env.npm_package_name}`;
const dbOptions = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500 // Reconnect every 500ms
};

module.exports = {
  connect() {
    mongoose.connect(dbURI, dbOptions);

    mongoose.connection.on('error', function(error) {
      console.error('\x1b[31m%s\x1b[0m', error.message.substr(error.message.lastIndexOf('['), error.message.length));
    });
    mongoose.connection.on('connected', function() {
      console.log('\x1b[36m%s\x1b[0m', `Mongoose connected URI: ${dbURI}\n`);
    });
    mongoose.connection.on('disconnected', function() {
      console.log('\x1b[31m%s\x1b[0m', `Mongoose disconnected URI: ${dbURI}`);
    });

    process.on('SIGINT', function() {
      mongoose.connection.close(function() {
        process.exit(0);
      });
    });
    return mongoose.connection;
  },
  isValidObjectId(t) {
    return mongoose.Types.ObjectId.isValid(t);
  },
  queryToAndDbQuery(q) {
    return {$and: Object.keys(q).map(k=>{return{[k]:q[k]}})};
  }
};