'use strict';

const intersection = require('lodash/intersection');

const proWrap = require('./prowrap');

// exports

module.exports = proWrap(intersection, {
  arity: 2,
  arrayIndices: [0, 1],
});
