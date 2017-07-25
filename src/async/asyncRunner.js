'use strict';

const ParallelLimited = require('../algorithm/parallelLimited.js'),
      Parallel        = require('../algorithm/parallel.js'),
      Series          = require('../algorithm/series.js');

// Represents a super class for async queues and provides methods
// for async algorithms initialization. Also provides `run()` method
// for current algorithm invocation and `running()` and `completed()`
// predicate functions

/**
 * Initializes inner iterable collection .
 *
 * @param {PQ|AsyncPQ} container implements <Iterable>s
 * @constructor
 */
function AsyncRunner(container) {
  this._algorithm;
  this._container = container;
}

/**
 * Set the current async algorithm to `Parallel Limited` with `limit`
 * of parallel running tasks. If limit  * is not defined, it should be 
 * set as the cpus` number on the current machine.
 *
 * @param {Number} limit of parallel running tasks.
 * @returns {AsyncRunner}
 * @public
 */
AsyncRunner.prototype.parallelLimited = function(limit) {
  this._algorithm = new ParallelLimited(this._container, limit);

  return this;
};

/**
 * Set the current async algorithm to `Parallel`.
 *
 * @returns {AsyncRunner}
 * @public
 */
AsyncRunner.prototype.parallel = function() {
  this._algorithm = new Parallel(this._container);

  return this;
};

/**
 * Set the current async algorithm to `Series`.
 *
 * @returns {AsyncRunner}
 * @public
 */
AsyncRunner.prototype.series = function() {
  this._algorithm = new Series(this._container);

  return this;
};

/**
 * Run the task queue according to selected algorithm and invokes a
 * `callback`, when all tasks in queue completed.
 *
 * @param {Function} callback
 * @public
 */
AsyncRunner.prototype.run = function(callback) {
  this._validateAlgoInitialised();
  this._algorithm.run(callback)
};

/**
 * Check whether async queue is now on executing tasks. If algorithm
 * is not defined, throw an Error.
 *
 * @returns {Boolean}
 * @public
 */
AsyncRunner.prototype.running = function() {
  this._validateAlgoInitialised();
  return this._algorithm.running();
};

/**
 * Check whether async queue is now completed tasks execution. If 
 * algorithm is not defined, throw an Error.
 *
 * @returns {Boolean}
 * @public
 */
AsyncRunner.prototype.completed = function() {
  this._validateAlgoInitialised();
  return this._algorithm.completed();
};

/**
 * Check whether async algoritm defined.
 *
 * @protected
 */
AsyncRunner.prototype._validateAlgoInitialised = function() {
  if (!this._algorithm) {
    throw new Error('You need to specify a correct algorithm');
  }
}

module.exports = AsyncRunner;