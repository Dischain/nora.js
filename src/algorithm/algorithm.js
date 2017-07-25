'use strict';

const deepCopy = require('../util').deepCopy;

// Implements a common class for all algorithms in this framework and
// provides generic life sycle methods, such as `run()` and `complete()`
// with corresponding fuctions-predicates.

/**
 * Constuctor setup an internal protected iterable collection and establish
 * life sycle predicate variable.
 *
 * @param {PQ|AsyncPQ} container implements <Iterable>s

 */
function Algorithm(container) {
  this._running = false;
  this._completed = false;

  this._container = container;
}

Algorithm.prototype.run = function() {
	this._running = true;
}

Algorithm.prototype.complete = function() {
	this._completed = true;
	this._running = false;
}

Algorithm.prototype.running = function() { return this._running; };

Algorithm.prototype.completed = function() { return this._completed; };

module.exports = Algorithm;