'use strict';

const Algorithm = require('./algorithm.js');

// Implements series execution order of tasks.
// Note: all the type checking and other data validation should be
// executed into the outer scope.
// Extends <Algorithm>

/**
 * Constructor takes a `container` parameter, which should implements
 * <Iterable> interface and represents linear collection of items.
 *
 * @param {PQ|AsyncPQ} container implements <Iterable>
 * @constructor
 */ 
function Series(container) {
  Algorithm.call(this, container);
}

Series.prototype = Object.create(Algorithm.prototype);
Series.prototype.constructor = Series;

/**
 * Runs series algorithm with established iterable collection. Takes
 * `cb` parameter, which should be executed after all async tasks 
 * completed.
 *
 * @param {Funcgtion} cb - a callback.
 * @public
 */
Series.prototype.run = function(cb) {
  Algorithm.prototype.run.call(this);
  let that = this;
  
  function next() {
    let curTask = that._container.next();
    if (that._container.hasMore()) {
      that._complete();
      curTask.run(next);
    } else {
      curTask.run(cb);
    }
  }
  next();
}

module.exports = Series;