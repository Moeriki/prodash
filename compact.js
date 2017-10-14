'use strict';

const compact = require('lodash/compact');

const proWrap = require('./prowrap');

// exports

module.exports = proWrap(compact, {
  arity: 1,
  arrayIndices: [0],
});
