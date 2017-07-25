'use strict';

const Algorithm = require('./algorithm.js');

// Implements parallel limited execution order of tasks.
// Note: all the type checking and other data validation should be
// executed into the outer scope.
// Extends <Algorithm>

/**
 * Constructor takes a `container` as the first parameter, which should 
 * implements <Iterable> interface and represents linear collection of 
 * items, and the `limit` of parallel running tasks at time. If limit
 * is not defined, it should be set as the cpus` number on the current
 * machine.
 *
 * @param {PQ|AsyncPQ} container implements <Iterable>
 * @param {Number} limit
 * @constructor
 */ 
function ParallelLimited(container, limit) {
  Algorithm.call(this, container);
 
  this._limit = limit || require('os').cpus().length;
}

ParallelLimited.prototype = Object.create(Algorithm.prototype);
ParallelLimited.prototype.constructor = ParallelLimited;

/**
 * Runs parallel limited algorithm with established iterable collection. 
 * Takes `cb` parameter, which should be executed after all async tasks 
 * completed.
 *
 * @param {Funcgtion} cb - a callback.
 * @public
 */
ParallelLimited.prototype.run = function(cb) {
	Algorithm.prototype.run.call(this);
  var running = 1,
       that = this;
  function next() {
    --running;

    if (!that._container.hasMore() && running === 0) {  
    	that.complete();  	
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