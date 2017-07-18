'use strict';

/**
 * A basic Async Task, which may invoke given `asyncFunc` 
 * function with given `args` and `userCallback`.
 * 
 * Implements <Runnable> interface to provide `run()` method.
 *
 * @param {Array} args - an array of arguments for the given
 * `asyncFunc`. Not strictly required
 * @param {Function} asyncFunc - asynchronouse function, whcich
 * should be invoked by this task
 * @param {Function} userCallback - callback function for given
 * async function. Not strictly required
 */
function AsyncTask(args, asyncFunc, userCallback) {
  this._args = args || [];
  this._function = asyncFunc;
  this._userCallback = userCallback || function() {};
}

/**
 * Run `asyncFunc` with given `args` and `userCallback` and finally 
 * invokes a `finalCallback`
 *
 * @param{Function} finalCallback Not strictly required
 */
AsyncTask.prototype.run = function(finalCallback) {
  // This `callback` should be invoked with target async function call and it
  // contains `_userCallback` invocation at its body
  let callback = function() {
    let results = Array.prototype.slice.call(arguments);
    this._userCallback(results);
    
    if (finalCallback) finalCallback();
  };

  callback = callback.bind(this);

  // To implement this, simply append `callback` to the end arguments list
  this._args.push(callback);
  
  this._function.apply(this, this._args);
}

module.exports = AsyncTask;