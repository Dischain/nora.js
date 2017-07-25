'use strict';

const deepCopy = require('../util').deepCopy;

// Represents a super class for all algorithms in this framework

/**
 * Constuctor setup an internal iterable collection and establish
 * life sycle predicate variable.
 *
 * @param {PQ|AsyncPQ} container implements <Iterable>s
 * @constructor
 */
function Algorithm(container) {
  this._running = false;
  this._completed = false;

  this._container = container;
}

Algorithm.prototype.run = function() {
	this._running = true;
}

Algorithm.prototype.running = function() { return this._running; };

Algorithm.prototype.completed = function() { return this._completed; };

/**
 * @protected
 */
Algorithm.prototype._complete = function() {
	this._completed = true;
	this._running = false;
}

module.exports = Algorithm;