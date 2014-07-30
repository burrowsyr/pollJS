'use strict';

module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },

  all: {
    src: [
        'poll.js',
        'test/**/*.js'
    ]
  }
};
