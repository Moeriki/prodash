'use strict';

const memoize = require('lodash/memoize');

const identity = (value) => value;

function proMemoize(func, resolver = identity) {
  const memoized = memoize(func, resolver);

  return (...args) => memoized(...args)
    .then((result) => {
      memoized.cache.get(resolver(args)).result = result;
      return result;
    })
    .catch((err) => {
      memoized.cache.delete(resolver(args));
      throw err;
    })
  ;
};

module.exports = proMemoize;
