'use strict'

//Test PQ
const AsyncPQ  = require('./src/async/asyncPQ.js'),
      AsyncQueue = require('./src/async/asyncQueue.js'),
      readFile = require('fs').readFile;

let apq = new /*AsyncPQ*/AsyncQueue([
  [ ['./test/test1'], readFile, (data) => console.log(data.toString()), 0 ],
  [ ['./test/test2'], readFile, (data) => console.log(data.toString()), 5 ],
  [ ['./test/test3'], readFile, (data) => console.log(data.toString()), 2 ]
]);

//Parallel limited
//apq.parallelLimited(2).run(() => { console.log('completed'); })

//Parallel
//apq.parallel().run(() => { console.log('completed parallel'); })

//Series
apq.series().run(() => { console.log('completed serial'); })