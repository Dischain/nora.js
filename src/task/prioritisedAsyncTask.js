'use strict';

/**
 * Async Task with `priotity`, which may invoke given `asyncFunc` 
 * function with given `args` and `userCallback`.
 * 
 * Implements <Runnable> interface to provide `run()` method.
 * Extends <AsyncTask>
 *
 * @param {Array} args - an array of arguments for the given
 * `asyncFunc`. Not strictly required
 * @param {Function} asyncFunc - asynchronouse function, whcich
 * should be invoked by this task
 * @param {Function} userCallback - callback function for given
 * async function. Not strictly required
 * @param {Number} priority
 */

function PrioritisedAsyncTask(args, asyncFunc, userCallback, priority) {
  let temp = Array.prototype.slice.call(arguments); temp.pop();
  AsyncTask.apply(this, temp);

  this._priority = priority;
}

PrioritisedAsyncTask.prototype = Object.create(AsyncTask.prototype);
PrioritisedAsyncTask.prototype.constructor = PrioritisedAsyncTask;

PrioritisedAsyncTask.prototype.getPriority = function() { 
  return this._priority; 
};

module.exports = PrioritisedAsyncTask;