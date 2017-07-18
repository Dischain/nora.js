'use strict';

const PrioritisedAsyncTask = require('../task/prioritisedAsyncTask.js'),
      PQ                   = require('../collections/pq.js');

/**
 * Must be used only for tasks with priorities
 *
 * Extends <AsyncRunener>
 *
 * Example:
 * let paq = new AsyncPQ([
 *   [ ['asyncQueue.js'], fs.readFile, (data) => console.log(data.toString()), 0],
 *   [ ['../collections/pq.js'], fs.readFile, (data) => console.log(data.toString()), 4],
 *   [ ['../collections'], fs.stat, (data) => console.log(data.toString()), 2],
 *   [ ['../collections'], fs.readdir, (data) => console.log(data.toString()), 12]
 * ]);
 *
 */
function AsyncPQ(tasks) {
	let items = [];

 	if (arguments.length == 1 && Array.isArray(tasks)) {
    tasks.forEach((task) => {
      let args = task[0],
          asyncFunc = task[1],
          userCallback = task[2],
          priority = task[3],

          asyncTask = 
          	new PrioritisedAsyncTask(args, asyncFunc, userCallback, priority);
      
      items.push(asyncTask);
    });
  } else {
    throw new Error('Incompatible arguments at AsyncPQ');
  }

  this._tasks = new PQ(items);
}