'use strict';

/**
 * Priority Queue constructor, based on simple js arrays.
 *
 * @param {Array} items - an array of tasks, which is not 
 * required. The set of tasks may be provided from the js
 * `arguments` object.
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
    this._items.shift();
  }
}

module.exports = Queue;