'use strict';

/**
 * Priority Queue constructor, based on simple js arrays.
 *
 * Implements <Iterable> interface to provide `next()`, `hasMore()`,
 * `size()`, `forEach()` functions.
 *
 * @param {Array} items - an array of tasks, which is not 
 * required. The set of tasks may be provided from the js
 * `arguments` object. Type of `items` item is `AsyncTask`
 */
function Queue(items) {
  this._items = [];

  if (!Array.isArray(items)) {
    this._items = Array.prototype.slice.call(arguments);
  } else {
    this._items = Array.prototype.slice.call(items);
  }

  this._length = this._items.length;
}

/**
 * Returns and delete the most prioritized item. If inner
 * `_items` array is empty, returns null.
 *
 * @returns {Object} head of a queue
 * @public
 */
Queue.prototype.next = function() {
  if (this._length === 0) {
    return null;
  }
  else {
    -- this._length;
    return this._items.shift();
  }
}

Queue.prototype.size = function() {
  return this._length;
}

Queue.prototype.hasMore = function() {
  return this._length > 0;
}

Queue.prototype.forEach = function(callback) {
  this._items.forEach(callback);
}

module.exports = Queue;