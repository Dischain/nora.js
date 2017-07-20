'use strict';

const Algorithm = require('./algorithm.js');

/**
 * Extends <Algorithm>
 * Not changes the initial `container`
 */

function ParallelLimited(container, limit) {
  Algorithm.call(this, container);
 
  this._limit = limit;
}

ParallelLimited.prototype = Object.create(Algorithm.prototype);
ParallelLimited.prototype.constructor = ParallelLimited;

/**
 * `cb` should be executed after all async tasks complete.
 */
ParallelLimited.prototype.run = function(cb) {
  var running = 1,
       that = this;
  function next() {
    --running;

    if (!that._container.hasMore() && running === 0) {    	
      cb();
    }

    while(running < that._limit && that._container.hasMore()) {
    	var curTask = that._container.next();
      (function (task) {
        task.run(next);
      })(curTask);
      running++;
    }
  }
  next();
}

module.exports = ParallelLimited;