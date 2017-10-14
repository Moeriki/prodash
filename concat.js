'use strict';

const concat = require('lodash/concat');

const proWrap = require('./prowrap');

// exports

module.exports = proWrap(concat, {
  arity: 2,
  arrayIndices: [0, 1],
});
