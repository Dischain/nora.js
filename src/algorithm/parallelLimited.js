'use strict';

const Algorithm = require('./algorithm.js'),
		  PQ        = require('../collections/pq.js');

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
       //curTask = this._container.next();
       //curTask,
       that = this;
  function next() {
    console.log('has more: ' + that._container.hasMore() + 
    	', running: ' + running + ' container length: ' + that._container._length)
    --running;

    if (!that._container.hasMore() && running === 0) {    	
      cb();
    }

    while(running < that._limit && that._container.hasMore()) {
    	var curTask = that._container.next();
      (function (task) {
      	console.log('running task ' + task._args[0])
        //task.run(next);
        task.run(function() { next(); });
      })(curTask);
      running++;
    }
  }
  next();
}

module.exports = ParallelLimited;

// TODO: think, where to place `_container` field!