'use strict';

var DEFAULT_POLLING_INTERVAL = 1000;

function Poll() {
  this.pollingCount = 0;
  this.intervalId = undefined;
}

Poll.prototype.start = function (onPoll, pollingRate) {
  var self = this;

  this.intervalId = setInterval(function () {
    self.pollingCount += 1;

    if (onPoll) {
      onPoll(self.pollingCount);
    }
  }, pollingRate || DEFAULT_POLLING_INTERVAL);
};

Poll.prototype.stop = function () {
  clearInterval(this.intervalId);
  this.pollingCount = 0;
};

module.exports = Poll;
