'use strict';

const AsyncPQ    = require('../index.js').AsyncPQ,
      AsyncQueue = require('../index.js').AsyncQueue,

      expect = require('chai').expect,
      assert = require('assert');

describe('parallel', () => {
  describe('AsyncQueue', () => {
    let asyncQueue, call_order;

    function callback(err, result) {}

    function asyncFunction(resource, cb) {
      setTimeout(() => {
        call_order.push(resource);
        cb(null, resource)
      }, 50);
    }

    const resources = ['res1', 'res2', 'res3'];

    const tasks = [
      [['res1'], asyncFunction, callback],
      [['res2'], asyncFunction, callback],
      [['res3'], asyncFunction, callback],
    ];

    beforeEach(() => {
      asyncQueue = null,
      call_order = [];
    });

    it('apply async function to set of resources in parallel', (done) => {
      asyncQueue = new AsyncQueue(resources, null, asyncFunction, callback);
      asyncQueue.parallel().run(() => {
        expect(call_order).to.eql(['res1', 'res2', 'res3']);
        done();
      });
    });

    it('runs each task in parallel', (done) => {
      asyncQueue = new AsyncQueue(tasks);
      asyncQueue.parallel().run(() => {
        expect(call_order).to.eql(['res1', 'res2', 'res3']);
        done();
      })
    });
  });
});


