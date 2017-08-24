'use strict'

const AsyncPQ  = require('./src/async/asyncPQ.js'),
      AsyncQueue = require('./src/async/asyncQueue.js');

if (window) {
	window.nora = {
		AsyncPQ: AsyncPQ,
		AsyncQueue: AsyncQueue
	};
}

module.exports = {
	AsyncPQ: AsyncPQ,
	AsyncQueue: AsyncQueue
};