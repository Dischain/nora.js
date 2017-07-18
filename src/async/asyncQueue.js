'use strict';

const AsyncTask = require('../task/asyncTask.js'),
      Queue     = require('../collections/queue.js');

/**
 * Must be used only for tasks without priotities. Converts
 * arguments list to `AsyncTask`.
 *
 * Extends <AsyncRunner>
 *
 * May take two types of arguments list:
 * 1). [ {Array} of {String} recourses, 
 *       {Array} of additional arguments,
 *       <Function> asynchronouse function,
 *       <Function> callback ]
 * 2). [ {Array} of {Array of arguments},
                    {Function} asynchronouse function,
 *                  <Function> callback ]
 *
 * In first case, you provide a set of recourses, for each of
 * the given async function should be invoked with additional
 * arguments and the given callback, so you specify async
 * function only once, but it should be invoked for each
 * specified recourse.
 *
 * Example:
 * let aq = new AsyncQueue(['asyncQueue.js'], null, 
 *   require('fs').readFile, (data) => console.log(data.toString()));
 *
 * In second case, you specify the same type of arguments, but
 * you can to provide absolutly different async functions with
 * different arguments etc. This set need to be wrapped into
 * an array.
 *
 * Example:
 * let aq = new AsyncQueue([
 *   [ ['asyncQueue.js'], fs.readFile, console.log],
 *   [ ['../collections/pq.js'], fs.stat, console.log],
 *   [ ['../collections'], fs.readDir, console.log]
 * ]);
 *
 */
function AsyncQueue(recourses, additionalArgs, asyncFunc, cb) {
  let tasks = [];

  // First case
  if (arguments.length > 1) {
    recourses.forEach((recourse) => {
      let args = [recourse]; 
          args = args.concat(additionalArgs);
      let asyncTask = new AsyncTask(args, asyncFunc, cb);
      tasks.push(asyncTask);
    });
  } 
  // Second case
  else if (arguments.length == 1 && Array.isArray(recourses)) {
    recourses.forEach((task) => {
      let args = task[0],
          asyncFunc = task[1],
          userCallback = task[2],

          asyncTask = new AsyncTask(args, asyncFunc, userCallback);

      tasks.push(asyncTask);
    });
  } else {
    throw new Error('Incompatible arguments at AsyncQueue');
  }

  this._tasks = new Queue(tasks);
}

module.exports = AsyncQueue;