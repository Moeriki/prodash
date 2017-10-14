'use strict';

const chunk = require('lodash/chunk');

const proWrap = require('./prowrap');

// exports

module.exports = proWrap(chunk, {
  callees: [
    {
      index: 2,
      input: [0, 1],
    },
  ],
});
