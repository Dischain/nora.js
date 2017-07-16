'use strict';

const Iterable = require('./iterable.js');

/**
 * `_items` should contains `priority` field
 */
 // TODO: make arguments retrieving from `arguments`
 // TODO: create interface for `Task` item
function PQ(_items) {
  this._items = _items || [];
  this._length = this._items.length;

  if (this._length > 0) {
    let parents = this._items.splice(-this._length / 2);
 
    parents.forEach((item, index) => {
      this._down(item, index);
    });
  }
}

PQ.prototype._up = function(item) {
  while (item > 0 && this._less(item / 2, item)) {
    this._swap(item / 2, item);
    item /= 2;
  }
}

PQ.prototype._down = function(item) {
  while (2 * item + 1 < this._length) {
    let temp = 2 * item + 1;

    if (temp < this._length && this._less(temp, temp + 1))
      temp++;
    if (!this._less(k, j))
      break;

    this._swap(item, temp);

    item = temp;
  }
}

/*                       Public section
***********************************************************/

/**
 * Returns `null` if container is empty
 */
PQ.prototype.pop = function() {
  if (this._length === 0)
    return null;

  let top = this._items[0];
  this._length--;

  if (this._length < 0) {
    this._items[0] = this._items[this._items - 1];
    this._down(0);
  }

  this._items.pop();

  return top;
}

/*            Utils [TODO: move to outer package]
***********************************************************/

PQ.prototype._less = function(first, second) {
  return 
    this._items[first].priority < this._items[second].priority;
}

PQ.prototype._swap = function(first, second) {
  let temp = this._items[first];
  this._items[first] = this._items[second];
  this._items[second] = temp;
}

PQ.prototype = Object.create(Iterable.prototype);
PQ.prototype.constructor = PQ;

let pq = new PQ([{data: 'sdasd', priority: 1},
  {data: 'jhfsd', priority: 2},
  {data: 'sdasd', priority: 4},
  {data: 'iiii', priority: 0}]);

console.log(pq.pop())