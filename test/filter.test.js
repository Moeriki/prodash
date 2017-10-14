'use strict';

const delay = require('delay');
const pDefer = require('p-defer');

const { proFilter } = require('../');

describe('proMap', () => {

  let isEven;

  beforeEach(() => {
    isEven = jest.fn((number) => number % 2 === 0);
  })

  it('should filter promises', () => {
    const predicate = (number) => delay(5).then(() => isEven(number));
    return expect(proFilter([1, 2, 3], predicate)).resolves.toEqual([2]);
  });

});
