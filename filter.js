'use strict';

const filter = require('lodash/filter');

const proWrap = require('./prowrap');

// exports

module.exports = proWrap(filter, {
  arity: 2,
  arrayIndices: [0],
  iterateeIndex: 1,
});
