var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'humanalgorithms'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/humanalgorithms-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'humanalgorithms'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/humanalgorithms-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'humanalgorithms'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI
  }
};

module.exports = config[env];
