'use strict';

const Algorithm = require('./algorithm.js');

// Implements parallel execution order of tasks.
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
function Parallel(container) {
  Algorithm.call(this, container);
}

Parallel.prototype = Object.create(Algorithm.prototype);
Parallel.prototype.constructor = Parallel;

/**
 * Runs parallel algorithm with established iterable collection. Takes
 * `cb` parameter, which should be executed after all async tasks 
 * completed.
 *
 * @param {Funcgtion} cb - a callback.
 * @public
 */
Parallel.prototype.run = function(cb) {
  Algorithm.prototype.run.call(this);
  let that = this;
  
  this._container.forEach(function(item, index) {
    if (index === that._container.size() - 1) {
      that.complete();
      item.run(cb);
    } else {
      item.run();
    }
  });
}

module.exports = Parallel;