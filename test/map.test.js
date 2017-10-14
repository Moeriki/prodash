'use strict';

const delay = require('delay');
const pDefer = require('p-defer');

const { proMap } = require('../');

describe('proMap', () => {

  let double;

  beforeEach(() => {
    double = jest.fn((number) => number * 2);
  })

  it('should map an array', () => {
    const iteratee = double;
    return expect(proMap([1, 2, 3], iteratee)).resolves.toEqual([2, 4, 6]);
  });

  it('should map promises', () => {
    const iteratee = (number) => delay(5).then(() => double(number));
    return expect(proMap([1, 2, 3], iteratee)).resolves.toEqual([2, 4, 6]);
  });

  it('should respect concurrency', () => {
    const defer1 = pDefer();
    const defer2 = pDefer();
    const defer3 = pDefer();
    const iteratee = jest.fn()
      .mockReturnValueOnce(defer1.promise)
      .mockReturnValueOnce(defer2.promise)
      .mockReturnValueOnce(defer3.promise)
    ;
    const result = proMap([1, 2, 3], iteratee, { concurrency: 1 });
    return delay(5).then(() => {
      expect(iteratee).toHaveBeenCalledWith(1, 0, [1, 2, 3]);
      expect(iteratee).not.toHaveBeenCalledWith(2, 1, [1, 2, 3]);
      expect(iteratee).not.toHaveBeenCalledWith(3, 2, [1, 2, 3]);
      defer1.resolve();
      return delay(5).then(() => {
        expect(iteratee).toHaveBeenCalledWith(1, 0, [1, 2, 3]);
        expect(iteratee).toHaveBeenCalledWith(2, 1, [1, 2, 3]);
        expect(iteratee).not.toHaveBeenCalledWith(3, 2, [1, 2, 3]);
        defer2.resolve();
        return delay(5).then(() => {
          expect(iteratee).toHaveBeenCalledWith(1, 0, [1, 2, 3]);
          expect(iteratee).toHaveBeenCalledWith(2, 1, [1, 2, 3]);
          expect(iteratee).toHaveBeenCalledWith(3, 2, [1, 2, 3]);
          defer3.resolve();
          return result;
        });
      });
    });
  });

  it('should respect order', () => {
    const defer1 = pDefer();
    const defer2 = pDefer();
    const defer3 = pDefer();
    const iteratee = jest.fn()
      .mockReturnValueOnce(defer1.promise)
      .mockReturnValueOnce(defer2.promise)
      .mockReturnValueOnce(defer3.promise)
    ;
    const result = proMap([1, 2, 3], iteratee, { concurrency: 1 });
    return delay(5).then(() => {
      defer3.resolve(3);
      return delay(5).then(() => {
        defer2.resolve(2);
        return delay(5).then(() => {
          defer1.resolve(1);
          return expect(result).resolves.toEqual([1, 2, 3]);
        });
      });
    });
  });

});
