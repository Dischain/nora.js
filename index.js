'use strict'

const AsyncPQ  = require('./src/async/asyncPQ.js'),
      AsyncQueue = require('./src/async/asyncQueue.js');

module.exports = {
	AsyncPQ: AsyncPQ,
	AsyncQueue: AsyncQueue
};