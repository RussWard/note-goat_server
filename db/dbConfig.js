require('dotenv').config();
const mongoose = require('mongoose');
const dburl = process.env.MONGODB_URI;

mongoose.connect(dburl, {
  useMongoClient: true
});

const gracefulShutdown = function(msg, cb) {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    cb();
  });
};

// for nodemon restarts 
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// for app termination
process.on('SIGINT', () => {
  gracefulShutdown('App termination (SIGINT)', () => {
    process.exit(0);
  });
});

// for Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('App termination (SIGTERM)', () => {
    process.exit(0);
  })
})

module.exports = mongoose.connection;