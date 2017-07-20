'use strict';

const ParallelLimited = require('../algorithm/parallelLimited.js'),
      Parallel        = require('../algorithm/parallel.js'),
      Series          = require('../algorithm/series.js');

function AsyncRunner(container) {
  this._algorithm;
  this._container = container;
}

AsyncRunner.prototype.parallelLimited = function(limit) {
  this._algorithm = new ParallelLimited(this._container, limit);

  return this;
};

AsyncRunner.prototype.parallel = function() {
  this._algorithm = new Parallel(this._container);

  return this;
};

AsyncRunner.prototype.series = function() {
  this._algorithm = new Series(this._container);

  return this;
};

AsyncRunner.prototype.run = function(callback) {
  if (!this._algorithm) {
    throw new Error('You need to specify a correct algorithm');
  }
  this._algorithm.run(callback)
};

AsyncRunner.prototype.pause = function(callback) {
  this._algorithm.pause(callback);
};

AsyncRunner.prototype.stop = function(callback) {
  this._algorithm.stop(callback);
};

module.exports = AsyncRunner;