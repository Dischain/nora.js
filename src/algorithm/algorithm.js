'use strict';

const deepCopy = require('../util').deepCopy;

function Algorithm(container) {
  this._running = false;
  this._paused = false;
  this._stopped = false;

  this._container = container;
  //this._container = deepCopy(container);
  //this._copyContainer = deepCopy(container);
}

Algorithm.prototype.run = function(cb) {}

Algorithm.prototype.pause = function(cb) {}

Algorithm.prototype.stop = function(cb) {}

Algorithm.prototype.restart = function() {}

Algorithm.prototype.running = function() { return this._running; }

Algorithm.prototype.paused = function() { return this._paused; }

Algorithm.prototype.stopped = function() { return this._stopped; }

module.exports = Algorithm;