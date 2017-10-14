'use strict';

const proWrap = require('./prowrap');

// exports

module.exports = proWrap(null, {
  arity: 2,
  arrayIndices: [0],
  iterateeIndex: 1,
});
