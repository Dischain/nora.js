'use strict'

//Test
const AsyncPQ  = require('./src/async/asyncPQ.js'),
	    readFile = require('fs').readFile;

let apq = new AsyncPQ([
	[ ['./src/algorithm/parallelLimited.js'], readFile, (data) => console.log(data.toString()), 0 ],
	[ ['./src/algorithm/algorithm.js'], readFile, (data) => console.log(data.toString()), 5 ],
]);

apq.parallelLimited(2).run(() => { console.log('completed'); })